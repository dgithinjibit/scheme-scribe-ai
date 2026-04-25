import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, XCircle, Loader2, Trophy } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export interface ExamQuestion {
  type: "mcq" | "short" | "long";
  strand: string;
  subStrand: string;
  question: string;
  options?: string[];
  answerIndex?: number;
  expectedAnswer?: string;
  acceptableKeywords?: string[];
  rubric?: string;
  marks: number;
}

interface MarkResult {
  awarded: number;
  max: number;
  correct: boolean;
  feedback?: string;
}

interface ExamRunnerProps {
  questions: ExamQuestion[];
  grade: string;
  subject: string;
  term: string;
  pupilName?: string;
  examId?: string | null;
}

const ExamRunner = ({
  questions,
  grade,
  subject,
  term,
  pupilName,
  examId,
}: ExamRunnerProps) => {
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [results, setResults] = useState<Record<number, MarkResult> | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const setAns = (i: number, v: string) =>
    setAnswers((p) => ({ ...p, [i]: v }));

  // Detect if a short-answer question asks for N items (e.g. "give two reasons",
  // "name 3 chores", "list four colours"). Returns N, or 1 if no count is implied.
  const detectExpectedCount = (question: string): number => {
    const wordMap: Record<string, number> = {
      one: 1, two: 2, three: 3, four: 4, five: 5, six: 6,
      moja: 1, mbili: 2, tatu: 3, nne: 4, tano: 5, sita: 6,
    };
    const verbs =
      "(?:name|list|give|state|mention|identify|write|provide|taja|andika|orodhesha|toa)";
    // Match "<verb> <number/word> ..."
    const re = new RegExp(`\\b${verbs}\\b[^.?!]*?\\b(\\d+|${Object.keys(wordMap).join("|")})\\b`, "i");
    const m = question.match(re);
    if (!m) return 1;
    const token = m[1].toLowerCase();
    const n = /^\d+$/.test(token) ? parseInt(token, 10) : wordMap[token];
    return n >= 2 && n <= 6 ? n : 1;
  };

  const setAnsAt = (i: number, slot: number, v: string, total: number) => {
    const current = (answers[i] ?? "").split("\n");
    const arr = Array.from({ length: total }, (_, k) => current[k] ?? "");
    arr[slot] = v;
    setAns(i, arr.join("\n"));
  };

  const getAnsAt = (i: number, slot: number): string => {
    return (answers[i] ?? "").split("\n")[slot] ?? "";
  };

  const handleSubmit = async () => {
    setSubmitting(true);
    const out: Record<number, MarkResult> = {};

    // Instant marking for MCQs only (objective)
    questions.forEach((q, i) => {
      if (q.type === "mcq") {
        const picked = parseInt(answers[i] ?? "-1");
        const correct = picked === q.answerIndex;
        out[i] = { awarded: correct ? q.marks : 0, max: q.marks, correct };
      }
    });

    // AI marking for both short AND long — judges meaning, not string equality
    const aiItems = questions
      .map((q, i) => ({ q, i }))
      .filter((x) => x.q.type === "short" || x.q.type === "long")
      .map((x) => ({
        index: x.i,
        type: x.q.type as "short" | "long",
        question: x.q.question,
        expectedAnswer: x.q.expectedAnswer || "",
        acceptableKeywords: x.q.acceptableKeywords || [],
        rubric: x.q.rubric || "",
        marks: x.q.marks,
        studentAnswer: answers[x.i] ?? "",
      }));

    if (aiItems.length) {
      try {
        const { data, error } = await supabase.functions.invoke("mark-exam", {
          body: { items: aiItems, grade, subject },
        });
        if (error) throw error;
        const list = (data?.results ?? []) as Array<{
          index: number;
          awarded: number;
          feedback: string;
        }>;
        list.forEach((r) => {
          const q = questions[r.index];
          const awarded = Math.max(0, Math.min(q.marks, Math.round(r.awarded)));
          out[r.index] = {
            awarded,
            max: q.marks,
            correct: awarded >= q.marks * 0.7,
            feedback: r.feedback,
          };
        });
      } catch (e) {
        console.error(e);
        toast.error("AI marking failed — showing partial results.");
        aiItems.forEach((it) => {
          if (!out[it.index])
            out[it.index] = { awarded: 0, max: it.marks, correct: false };
        });
      }
    }

    setResults(out);
    setSubmitting(false);

    // Save attempt to dashboard
    const totalMaxNow = questions.reduce((s, q) => s + q.marks, 0);
    const awardedNow = Object.values(out).reduce((s, r) => s + r.awarded, 0);
    const percentNow = totalMaxNow
      ? Math.round((awardedNow / totalMaxNow) * 100)
      : 0;

    if (examId && pupilName?.trim()) {
      try {
        const { data: userData } = await supabase.auth.getUser();
        const ownerId = userData?.user?.id;
        if (ownerId) {
          await supabase.from("exam_attempts").insert({
            exam_id: examId,
            owner_id: ownerId,
            pupil_name: pupilName.trim(),
            grade,
            subject,
            term,
            awarded: awardedNow,
            total: totalMaxNow,
            percent: percentNow,
            details: out as never,
          });
          toast.success(`Saved ${pupilName}'s score to dashboard`);
        }
      } catch (err) {
        console.error("Failed to save attempt:", err);
      }
    }
  };

  const totalMax = questions.reduce((s, q) => s + q.marks, 0);
  const totalAwarded = results
    ? Object.values(results).reduce((s, r) => s + r.awarded, 0)
    : 0;
  const percent = results ? Math.round((totalAwarded / totalMax) * 100) : 0;

  const sectionLabel = (t: ExamQuestion["type"]) =>
    t === "mcq"
      ? "Section A — Multiple Choice (1 mark each)"
      : t === "short"
      ? "Section B — Short Answer (2 marks each)"
      : "Section C — Long Answer (5 marks each)";

  let lastSection: ExamQuestion["type"] | null = null;

  return (
    <div className="space-y-6">
      {results && (
        <Card className="p-6 bg-primary/5 border-primary">
          <div className="flex items-center gap-4">
            <Trophy className="w-12 h-12 text-primary" />
            <div className="flex-1">
              <h3 className="text-2xl font-bold">
                {totalAwarded} / {totalMax} ({percent}%)
              </h3>
              <p className="text-sm text-muted-foreground">
                {percent >= 80
                  ? "Excellent work! 🎉"
                  : percent >= 50
                  ? "Good effort — keep practicing!"
                  : "Keep trying — review the topics and retake."}
              </p>
            </div>
          </div>
        </Card>
      )}

      {questions.map((q, i) => {
        const showHeader = q.type !== lastSection;
        lastSection = q.type;
        const r = results?.[i];
        return (
          <div key={i}>
            {showHeader && (
              <h4 className="font-semibold text-sm uppercase tracking-wide text-muted-foreground mt-6 mb-3">
                {sectionLabel(q.type)}
              </h4>
            )}
            <Card className="p-5 space-y-3">
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1">
                  <p className="font-medium">
                    <span className="text-muted-foreground mr-2">{i + 1}.</span>
                    {q.question}
                  </p>
                  <Badge variant="outline" className="mt-2 text-xs">
                    {q.subStrand}
                  </Badge>
                </div>
                {r && (
                  <div className="flex items-center gap-1.5 text-sm font-semibold">
                    {r.correct ? (
                      <CheckCircle2 className="w-5 h-5 text-kenya-green" />
                    ) : (
                      <XCircle className="w-5 h-5 text-kenya-red" />
                    )}
                    {r.awarded}/{r.max}
                  </div>
                )}
              </div>

              {q.type === "mcq" && q.options && (
                <RadioGroup
                  value={answers[i] ?? ""}
                  onValueChange={(v) => setAns(i, v)}
                  disabled={!!results}
                >
                  {q.options.map((opt, oi) => {
                    const isCorrect = results && oi === q.answerIndex;
                    const isPicked = parseInt(answers[i] ?? "-1") === oi;
                    return (
                      <div
                        key={oi}
                        className={`flex items-center space-x-2 p-2 rounded ${
                          isCorrect
                            ? "bg-kenya-green/10"
                            : isPicked && results && !isCorrect
                            ? "bg-kenya-red/10"
                            : ""
                        }`}
                      >
                        <RadioGroupItem value={String(oi)} id={`q${i}-o${oi}`} />
                        <Label htmlFor={`q${i}-o${oi}`} className="cursor-pointer">
                          {opt}
                        </Label>
                      </div>
                    );
                  })}
                </RadioGroup>
              )}

              {q.type === "short" && (
                <Input
                  value={answers[i] ?? ""}
                  onChange={(e) => setAns(i, e.target.value)}
                  placeholder="Your answer..."
                  disabled={!!results}
                />
              )}

              {q.type === "long" && (
                <Textarea
                  value={answers[i] ?? ""}
                  onChange={(e) => setAns(i, e.target.value)}
                  placeholder="Write your answer here..."
                  rows={5}
                  disabled={!!results}
                />
              )}

              {r && (
                <div className="text-xs text-muted-foreground pt-2 border-t space-y-1">
                  {q.type === "mcq" && q.options && q.answerIndex !== undefined && (
                    <p>
                      <strong>Correct answer:</strong> {q.options[q.answerIndex]}
                    </p>
                  )}
                  {q.type === "short" && q.expectedAnswer && (
                    <p>
                      <strong>Expected:</strong> {q.expectedAnswer}
                    </p>
                  )}
                  {r.feedback && (
                    <p>
                      <strong>Feedback:</strong> {r.feedback}
                    </p>
                  )}
                </div>
              )}
            </Card>
          </div>
        );
      })}

      {!results && (
        <Button
          onClick={handleSubmit}
          disabled={submitting}
          size="lg"
          className="w-full"
        >
          {submitting ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" /> Marking...
            </>
          ) : (
            "Submit Exam"
          )}
        </Button>
      )}
    </div>
  );
};

export default ExamRunner;
