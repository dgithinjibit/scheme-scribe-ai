const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

interface SubStrandInfo {
  name: string;
  lessons: number;
  learningOutcomes?: string[];
  keyInquiryQuestion?: string;
}

interface StrandAllocation {
  strandName: string;
  subStrands: SubStrandInfo[];
}

interface MCQ {
  type: "mcq";
  strand: string;
  subStrand: string;
  question: string;
  options: string[];
  answerIndex: number;
  marks: number;
}
interface ShortQ {
  type: "short";
  strand: string;
  subStrand: string;
  question: string;
  expectedAnswer: string;
  acceptableKeywords: string[];
  marks: number;
}
interface LongQ {
  type: "long";
  strand: string;
  subStrand: string;
  question: string;
  rubric: string;
  marks: number;
}

type ExamQuestion = MCQ | ShortQ | LongQ;

const KISWAHILI = "Kiswahili";

function buildSystemPrompt(
  grade: string,
  subject: string,
  term: string,
  allocation: StrandAllocation[],
  counts: { mcq: number; short: number; long: number }
): string {
  const isSw = subject === KISWAHILI;
  const lang = isSw ? "Kiswahili" : "English";

  const scopeBlock = allocation
    .map((s) => {
      const subs = s.subStrands
        .map(
          (ss) =>
            `    - ${ss.name} (lessons: ${ss.lessons})${
              ss.learningOutcomes?.length
                ? `\n      Outcomes: ${ss.learningOutcomes.slice(0, 4).join("; ")}`
                : ""
            }`
        )
        .join("\n");
      return `  • ${s.strandName}\n${subs}`;
    })
    .join("\n");

  return `You are a senior KICD CBC assessment writer for ${grade} ${subject}, ${term}.
Generate an end-of-term exam in ${lang}.

═══ NON-NEGOTIABLE SCOPE RULE ═══
You MUST ONLY ask questions on the strands and sub-strands listed below.
Do NOT introduce ANY topic, concept, vocabulary or skill that is not in this list.
Do NOT use content from previous or future terms.
If a sub-strand is not listed, it is OUT OF SCOPE — ignore it completely.

IN-SCOPE CONTENT FOR ${term}:
${scopeBlock}

═══ EXAM STRUCTURE (STRICT) ═══
- ${counts.mcq} multiple-choice questions (Section A) — exactly 4 options each, ONE correct answer, 1 mark each
- ${counts.short} short-answer questions (Section B) — one-line answer, 2 marks each
- ${counts.long} long/structured questions (Section C) — 5 marks each, requires explanation

═══ DIFFICULTY (Grade 2 appropriate) ═══
- Use simple, age-appropriate ${lang} vocabulary
- Questions must be answerable by a 7-8 year old
- No trick questions, no double negatives
- For Mathematics: keep numbers within the term's taught range

═══ DISTRIBUTION RULE ═══
- Distribute questions across sub-strands PROPORTIONALLY to "lessons" count
- A sub-strand with 6 lessons gets ~2x the questions of one with 3 lessons
- Every listed sub-strand MUST get at least one question if total questions allow

═══ ANSWER QUALITY ═══
- MCQ: provide answerIndex (0-3) of the ONE correct option
- Short: provide the model expectedAnswer AND a list of acceptableKeywords a learner could use
- Long: provide a clear rubric (what earns full marks, what earns partial)

═══ STRAND/SUB-STRAND LABELS (EXACT) ═══
- The "strand" field MUST be copied EXACTLY as listed above (including leading numbering like "1.0 Numbers").
- The "subStrand" field MUST be copied EXACTLY as listed above (including numbering like "1.4 Subtraction").
- Do NOT shorten, rename, translate or invent labels.

Return ONLY via the submit_exam tool. No prose, no markdown.`;
}

const QUESTION_TOOL = {
  type: "function",
  function: {
    name: "submit_exam",
    description: "Submit the generated exam paper.",
    parameters: {
      type: "object",
      properties: {
        questions: {
          type: "array",
          items: {
            type: "object",
            properties: {
              type: { type: "string", enum: ["mcq", "short", "long"] },
              strand: { type: "string" },
              subStrand: { type: "string" },
              question: { type: "string" },
              options: { type: "array", items: { type: "string" } },
              answerIndex: { type: "number" },
              expectedAnswer: { type: "string" },
              acceptableKeywords: { type: "array", items: { type: "string" } },
              rubric: { type: "string" },
              marks: { type: "number" },
            },
            required: ["type", "strand", "subStrand", "question", "marks"],
            additionalProperties: false,
          },
        },
      },
      required: ["questions"],
      additionalProperties: false,
    },
  },
} as const;

function normalize(s: string): string {
  return (s || "")
    .toLowerCase()
    .replace(/^[\d.\s]+/, "") // strip leading "1.2 " numbering
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

function validateScope(
  questions: ExamQuestion[],
  allocation: StrandAllocation[]
): ExamQuestion[] {
  const strandMap = new Map<string, string>();
  const subStrandMap = new Map<string, string>();
  for (const a of allocation) {
    strandMap.set(normalize(a.strandName), a.strandName);
    for (const ss of a.subStrands) {
      subStrandMap.set(normalize(ss.name), ss.name);
    }
  }

  const result: ExamQuestion[] = [];
  for (const q of questions) {
    const strandKey = normalize(q.strand);
    const subKey = normalize(q.subStrand);
    // Allow substring match in either direction so "Subtraction" matches "1.4 Subtraction"
    let matchedStrand: string | undefined = strandMap.get(strandKey);
    if (!matchedStrand) {
      for (const [k, v] of strandMap) {
        if (k.includes(strandKey) || strandKey.includes(k)) {
          matchedStrand = v;
          break;
        }
      }
    }
    let matchedSub: string | undefined = subStrandMap.get(subKey);
    if (!matchedSub) {
      for (const [k, v] of subStrandMap) {
        if (k.includes(subKey) || subKey.includes(k)) {
          matchedSub = v;
          break;
        }
      }
    }
    if (matchedStrand && matchedSub) {
      result.push({ ...q, strand: matchedStrand, subStrand: matchedSub });
    } else {
      console.warn(
        `Dropped Q — strand="${q.strand}" sub="${q.subStrand}" (no match)`
      );
    }
  }
  return result;
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const body = await req.json();
    const {
      grade,
      subject,
      term,
      allocation,
      counts = { mcq: 15, short: 8, long: 2 },
    } = body as {
      grade: string;
      subject: string;
      term: string;
      allocation: StrandAllocation[];
      counts?: { mcq: number; short: number; long: number };
    };

    if (!grade || !subject || !term || !allocation?.length) {
      return new Response(
        JSON.stringify({ error: "Missing required fields" }),
        {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY not configured");

    const systemPrompt = buildSystemPrompt(
      grade,
      subject,
      term,
      allocation,
      counts
    );

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
            {
              role: "user",
              content: `Generate the ${grade} ${subject} ${term} exam now. Stay strictly in-scope.`,
            },
          ],
          tools: [QUESTION_TOOL],
          tool_choice: { type: "function", function: { name: "submit_exam" } },
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
    let questions: ExamQuestion[] = args.questions || [];

    // Scope guardrail
    const before = questions.length;
    questions = validateScope(questions, allocation);
    if (questions.length < before) {
      console.warn(
        `Filtered out ${before - questions.length} out-of-scope questions`
      );
    }

    return new Response(
      JSON.stringify({
        questions,
        meta: { grade, subject, term, total: questions.length },
      }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  } catch (e) {
    console.error("generate-exam error:", e);
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
