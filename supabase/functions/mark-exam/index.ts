const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

interface LongAnswerItem {
  index: number;
  question: string;
  rubric: string;
  marks: number;
  studentAnswer: string;
}

const MARK_TOOL = {
  type: "function",
  function: {
    name: "submit_marks",
    description: "Submit marks for the long-answer questions.",
    parameters: {
      type: "object",
      properties: {
        results: {
          type: "array",
          items: {
            type: "object",
            properties: {
              index: { type: "number" },
              awarded: { type: "number" },
              feedback: { type: "string" },
            },
            required: ["index", "awarded", "feedback"],
            additionalProperties: false,
          },
        },
      },
      required: ["results"],
      additionalProperties: false,
    },
  },
} as const;

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { items, grade, subject } = (await req.json()) as {
      items: LongAnswerItem[];
      grade: string;
      subject: string;
    };

    if (!items?.length) {
      return new Response(JSON.stringify({ results: [] }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY not configured");

    const systemPrompt = `You are a fair, encouraging KICD CBC examiner marking ${grade} ${subject} long-answer questions.
For each item:
- Award marks (0 to maxMarks, integers only) based STRICTLY on the rubric.
- Be lenient with spelling/grammar for ${grade} (young learners).
- Focus on whether the CONCEPT is correctly demonstrated.
- Give one short encouraging feedback line (max 20 words).
Return ONLY via the submit_marks tool.`;

    const userPayload = items
      .map(
        (it) => `Q${it.index} (max ${it.marks} marks):
Question: ${it.question}
Rubric: ${it.rubric}
Student answer: ${it.studentAnswer || "(no answer)"}
`
      )
      .join("\n---\n");

    const response = await fetch(
      "https://ai.gateway.lovable.dev/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${LOVABLE_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "google/gemini-2.5-flash",
          messages: [
            { role: "system", content: systemPrompt },
            { role: "user", content: userPayload },
          ],
          tools: [MARK_TOOL],
          tool_choice: { type: "function", function: { name: "submit_marks" } },
        }),
      }
    );

    if (!response.ok) {
      const t = await response.text();
      console.error("AI gateway error:", response.status, t);
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: "Rate limit exceeded, try again shortly." }),
          {
            status: 429,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          }
        );
      }
      if (response.status === 402) {
        return new Response(
          JSON.stringify({
            error: "AI credits exhausted. Add credits in Workspace settings.",
          }),
          {
            status: 402,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          }
        );
      }
      throw new Error(`AI gateway: ${response.status}`);
    }

    const data = await response.json();
    const toolCall = data.choices?.[0]?.message?.tool_calls?.[0];
    if (!toolCall) throw new Error("No tool call returned");
    const args = JSON.parse(toolCall.function.arguments);

    return new Response(JSON.stringify({ results: args.results || [] }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("mark-exam error:", e);
    return new Response(
      JSON.stringify({
        error: e instanceof Error ? e.message : "Unknown error",
      }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});
