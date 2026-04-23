import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Loader2, FileQuestion } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { getSubjectsForGrade, grades } from "@/data/curriculum";
import { getTermAllocation } from "@/data/curriculum/term-mappings";
import ExamRunner, { type ExamQuestion } from "./ExamRunner";

const ExamGeneratorDialog = () => {
  const [open, setOpen] = useState(false);
  const [grade, setGrade] = useState<string>("");
  const [subject, setSubject] = useState<string>("");
  const [term, setTerm] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState<ExamQuestion[] | null>(null);

  const availableSubjects = grade ? getSubjectsForGrade(grade) : [];

  const reset = () => {
    setGrade("");
    setSubject("");
    setTerm("");
    setQuestions(null);
  };

  const handleGenerate = async () => {
    if (!grade || !subject || !term) {
      toast.error("Pick grade, subject and term");
      return;
    }
    const allocation = getTermAllocation(grade, subject, term);
    if (!allocation || allocation.length === 0) {
      toast.error("No curriculum allocation available for this selection.");
      return;
    }

    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke("generate-exam", {
        body: {
          grade,
          subject,
          term,
          allocation,
          counts: { mcq: 15, short: 8, long: 2 },
        },
      });
      if (error) throw error;
      if (data?.error) throw new Error(data.error);
      const qs = (data?.questions ?? []) as ExamQuestion[];
      if (!qs.length) {
        toast.error("No questions returned. Try again.");
        return;
      }
      setQuestions(qs);
      toast.success(`Generated ${qs.length} questions`);
    } catch (e) {
      console.error(e);
      toast.error(e instanceof Error ? e.message : "Failed to generate exam");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(o) => {
        setOpen(o);
        if (!o) reset();
      }}
    >
      <DialogTrigger asChild>
        <Button size="lg" variant="outline" className="gap-2">
          <FileQuestion className="w-4 h-4" /> Generate Term Exam
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {questions ? `${grade} ${subject} — ${term} Exam` : "Generate Term Exam"}
          </DialogTitle>
        </DialogHeader>

        {!questions ? (
          <div className="space-y-4 py-4">
            <p className="text-sm text-muted-foreground">
              The exam will be drawn ONLY from sub-strands taught in the selected
              term. 15 MCQs + 8 short + 2 long answers, marked instantly in-app.
            </p>

            <div className="space-y-2">
              <Label>Grade</Label>
              <Select
                value={grade}
                onValueChange={(g) => {
                  setGrade(g);
                  setSubject("");
                }}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Pick grade" />
                </SelectTrigger>
                <SelectContent>
                  {grades.map((g) => (
                    <SelectItem key={g} value={g}>
                      {g}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Subject</Label>
              <Select value={subject} onValueChange={setSubject} disabled={!grade}>
                <SelectTrigger>
                  <SelectValue placeholder={grade ? "Pick subject" : "Pick grade first"} />
                </SelectTrigger>
                <SelectContent>
                  {availableSubjects.map((s) => (
                    <SelectItem key={s} value={s}>
                      {s}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Term</Label>
              <Select value={term} onValueChange={setTerm}>
                <SelectTrigger>
                  <SelectValue placeholder="Pick term" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Term 1">Term 1</SelectItem>
                  <SelectItem value="Term 2">Term 2</SelectItem>
                  <SelectItem value="Term 3">Term 3</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button
              onClick={handleGenerate}
              disabled={loading || !grade || !subject || !term}
              className="w-full"
              size="lg"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" /> Generating exam...
                </>
              ) : (
                "Generate Exam"
              )}
            </Button>
          </div>
        ) : (
          <div className="py-2">
            <div className="flex justify-between items-center mb-4">
              <p className="text-sm text-muted-foreground">
                Total marks:{" "}
                {questions.reduce((s, q) => s + q.marks, 0)} • {questions.length}{" "}
                questions
              </p>
              <Button variant="ghost" size="sm" onClick={reset}>
                New exam
              </Button>
            </div>
            <ExamRunner
              questions={questions}
              grade={grade}
              subject={subject}
              term={term}
            />
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default ExamGeneratorDialog;
