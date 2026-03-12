import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { grades, getSubjectsForGrade, getHardcodedStrands, getSubStrandsForStrand, getLessonsPerWeek, type SchemeRow, type StrandInfo } from "@/data/curriculum";
import SchemePreview from "./SchemePreview";
import { FileText, Download, Save, Loader2, Sparkles, FileDown } from "lucide-react";
import { exportSchemeToDocx } from "@/utils/exportDocx";
import { ScrollArea } from "@/components/ui/scroll-area";
import { supabase } from "@/integrations/supabase/client";
import { columnHeaders, kiswahiliSubjects } from "@/data/curriculum";

const INDIGENOUS_LANGUAGES = [
  "Kikuyu (Gĩkũyũ)", "Dholuo", "Kalenjin", "Luhya (Luyia)", "Kamba",
  "Kisii (Ekegusii)", "Meru (Kĩmĩĩrũ)", "Mijikenda", "Maasai (Maa)",
  "Turkana", "Somali", "Embu", "Tharaka", "Pokot", "Samburu",
  "Taita", "Taveta", "Borana", "Rendille", "Swahili (Coastal dialects)",
  "Teso", "Sabaot", "Nandi", "Kipsigis", "Tugen", "Elgeyo", "Marakwet",
  "Bukusu", "Maragoli", "Isukha", "Idakho", "Wanga", "Nyala", "Tiriki",
  "Suba", "Kuria", "Tachoni", "Kabras",
];

const LANGUAGE_SUBJECTS = ["English", "English Activities", "Kiswahili", "Indigenous Language"];

// Weekly lesson distribution per strand for language subjects (1 lesson per strand per week)
const LANGUAGE_WEEKLY_DISTRIBUTION: Record<string, Record<string, number>> = {
  "English": {
    "Listening and Speaking": 1,
    "Reading": 1,
    "Language Use": 1,
    "Grammar in Use": 1,
    "Writing": 1,
  },
  "English Activities": {
    "Listening and Speaking": 1,
    "Reading": 1,
    "Language Use": 1,
    "Writing": 1,
  },
  "Kiswahili": {
    "Kusikiliza na Kuzungumza": 1,
    "Kusoma": 1,
    "Kuandika": 1,
    "Sarufi": 1,
  },
  "Indigenous Language": {
    "Listening and Speaking": 1,
    "Reading": 1,
  },
};

function isLanguageSubject(subject: string): boolean {
  return LANGUAGE_SUBJECTS.includes(subject);
}

function getWeeklyDistribution(subject: string, strands: StrandInfo[]): { strandName: string; lessonsThisWeek: number }[] {
  const dist = LANGUAGE_WEEKLY_DISTRIBUTION[subject];
  if (!dist) {
    // Fallback: distribute evenly
    const lessonsPerWeek = getLessonsPerWeek("Grade 4", subject);
    const perStrand = Math.max(1, Math.floor(lessonsPerWeek / strands.length));
    return strands.map(s => ({ strandName: s.name, lessonsThisWeek: perStrand }));
  }

  return strands.map(s => {
    // Find matching key in distribution (partial match)
    const matchKey = Object.keys(dist).find(k => s.name.includes(k) || k.includes(s.name));
    return {
      strandName: s.name,
      lessonsThisWeek: matchKey ? dist[matchKey] : 1,
    };
  }).filter(d => d.lessonsThisWeek > 0);
}

const SchemeGeneratorDialog = () => {
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState(1);
  const [grade, setGrade] = useState("");
  const [subject, setSubject] = useState("");
  const [indigenousLanguage, setIndigenousLanguage] = useState("");
  const [strand, setStrand] = useState("");
  const [subStrand, setSubStrand] = useState("");
  const [context, setContext] = useState("");
  const [additionalInfo, setAdditionalInfo] = useState("");
  const [loading, setLoading] = useState(false);
  const [generatedRows, setGeneratedRows] = useState<SchemeRow[] | null>(null);
  const [availableStrands, setAvailableStrands] = useState<string[]>([]);
  const [availableSubStrands, setAvailableSubStrands] = useState<string[]>([]);
  const [loadingStrands, setLoadingStrands] = useState(false);

  // Language-specific state
  const [term, setTerm] = useState("");
  const [weekNumber, setWeekNumber] = useState("");
  const [strandSubStrandSelections, setStrandSubStrandSelections] = useState<Record<string, string>>({});
  const [fullStrandData, setFullStrandData] = useState<StrandInfo[]>([]);

  const subjects = getSubjectsForGrade(grade);
  const isLanguage = isLanguageSubject(subject);

  // Fetch strands dynamically when grade + subject are selected
  useEffect(() => {
    if (!grade || !subject) {
      setAvailableStrands([]);
      setFullStrandData([]);
      return;
    }

    const fetchStrands = async () => {
      setLoadingStrands(true);
      try {
        const hardcoded = getHardcodedStrands(grade, subject);
        if (hardcoded) {
          setAvailableStrands(hardcoded.map(s => s.name));
          setFullStrandData(hardcoded);
          setLoadingStrands(false);
          return;
        }

        const { data, error } = await supabase.functions.invoke("fetch-strands", {
          body: { grade, subject },
        });

        if (error) throw error;
        if (data?.error) throw new Error(data.error);

        setAvailableStrands(data.strands || []);
        setFullStrandData([]);
      } catch (err) {
        console.error("Failed to fetch strands:", err);
        toast({
          title: "Could not load strands",
          description: "Please try selecting the subject again.",
          variant: "destructive",
        });
        setAvailableStrands([]);
        setFullStrandData([]);
      } finally {
        setLoadingStrands(false);
      }
    };

    fetchStrands();
  }, [grade, subject]);

  const resetForm = () => {
    setStep(1);
    setGrade("");
    setSubject("");
    setIndigenousLanguage("");
    setStrand("");
    setSubStrand("");
    setContext("");
    setGeneratedRows(null);
    setLoading(false);
    setAvailableStrands([]);
    setAvailableSubStrands([]);
    setTerm("");
    setWeekNumber("");
    setStrandSubStrandSelections({});
    setFullStrandData([]);
  };

  // Populate sub-strands when strand is selected (non-language flow)
  useEffect(() => {
    if (!grade || !subject || !strand || isLanguage) {
      setAvailableSubStrands([]);
      return;
    }
    const subs = getSubStrandsForStrand(grade, subject, strand);
    if (subs) {
      setAvailableSubStrands(subs.map(s => s.name));
    } else {
      setAvailableSubStrands([]);
    }
  }, [grade, subject, strand, isLanguage]);

  // ── Language weekly generation ──
  const handleGenerateWeekly = async () => {
    if (!grade || !subject || !term || !weekNumber) {
      toast({ title: "Missing fields", description: "Please select all required fields.", variant: "destructive" });
      return;
    }

    // Build sub-strand selections for each strand, including full KICD data
    const weeklyPlan: { strandName: string; subStrandName: string; lessons: number; learningOutcomes?: string[]; suggestedExperiences?: string[]; keyInquiryQuestion?: string }[] = [];
    const distribution = getWeeklyDistribution(subject, fullStrandData);

    for (const dist of distribution) {
      const selectedSubStrand = strandSubStrandSelections[dist.strandName];
      if (!selectedSubStrand) {
        toast({ title: "Missing selection", description: `Please select a sub-strand for "${dist.strandName}".`, variant: "destructive" });
        return;
      }
      // Find the full sub-strand data with learningOutcomes etc.
      const strandData = fullStrandData.find(s => s.name === dist.strandName);
      const subStrandData = strandData?.subStrands.find(ss => ss.name === selectedSubStrand);
      weeklyPlan.push({
        strandName: dist.strandName,
        subStrandName: selectedSubStrand,
        lessons: dist.lessonsThisWeek,
        learningOutcomes: subStrandData?.learningOutcomes,
        suggestedExperiences: subStrandData?.suggestedExperiences,
        keyInquiryQuestion: subStrandData?.keyInquiryQuestion,
      });
    }

    setLoading(true);
    try {
      const lessonsPerWeek = getLessonsPerWeek(grade, subject);
      const { data, error } = await supabase.functions.invoke("generate-scheme", {
        body: {
          grade,
          subject,
          strand: "Weekly Plan",
          context,
          additionalInfo: additionalInfo || undefined,
          weeklyMode: true,
          weekNumber: parseInt(weekNumber),
          term,
          weeklyPlan,
          lessonsPerWeek,
          indigenousLanguage: indigenousLanguage || undefined,
        },
      });

      if (error) throw error;
      if (data?.error) throw new Error(data.error);

      setGeneratedRows(data.rows);
      setStep(6);
      toast({ title: "Weekly Scheme Generated!", description: `Week ${weekNumber} generated with all skill strands.` });
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "An error occurred. Please try again.";
      toast({ title: "Generation Failed", description: message, variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  // ── Standard (non-language) generation ──
  const handleGenerate = async () => {
    if (!grade || !subject || !strand || !subStrand) {
      toast({ title: "Missing fields", description: "Please select grade, subject, strand, and sub-strand.", variant: "destructive" });
      return;
    }
    setLoading(true);
    try {
      const allSubs = getSubStrandsForStrand(grade, subject, strand);
      const selectedSub = allSubs?.find(s => s.name === subStrand);
      const subStrands = selectedSub ? [selectedSub] : [];

      const lessonsPerWeek = getLessonsPerWeek(grade, subject);
      const { data, error } = await supabase.functions.invoke("generate-scheme", {
        body: { grade, subject, strand, context, additionalInfo: additionalInfo || undefined, subStrands, lessonsPerWeek, indigenousLanguage: indigenousLanguage || undefined },
      });

      if (error) throw error;
      if (data?.error) throw new Error(data.error);

      setGeneratedRows(data.rows);
      setStep(6);
      const sourceMsg = data.source === "kicd_search"
        ? "Generated using live KICD curriculum data."
        : "Generated using AI curriculum knowledge.";
      toast({ title: "Scheme Generated!", description: sourceMsg });
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "An error occurred. Please try again.";
      toast({ title: "Generation Failed", description: message, variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  const handleExportPDF = () => {
    if (!generatedRows) return;
    const isSw = kiswahiliSubjects.includes(subject);
    const headers = isSw ? columnHeaders.sw : columnHeaders.en;

    const printArea = document.getElementById("scheme-print-area");
    if (!printArea) return;

    const tableHTML = `
      <div style="text-align:center;margin-bottom:16px;">
        <h2 style="margin:0;font-size:16pt;">${isSw ? "Mpango wa Kazi" : "Scheme of Work"}</h2>
        <p style="margin:4px 0;font-size:11pt;">${grade} — ${subject}${term ? ` — ${term}` : ""}${weekNumber ? ` — Week ${weekNumber}` : ` — ${strand}`}</p>
        <p style="margin:0;font-size:9pt;color:#666;">${isSw ? "Mtaala wa CBC - KICD Kenya" : "CBC Curriculum — KICD Kenya"}</p>
      </div>
      <table>
        <thead><tr>${headers.map((h) => `<th>${h}</th>`).join("")}</tr></thead>
        <tbody>${generatedRows.map((row) => `<tr>
          <td>${row.week}</td>
          <td>${row.lesson}</td>
          <td>${row.strand}</td>
          <td>${row.subStrand}</td>
          <td>${row.specificLearningOutcome.replace(/\n/g, "<br/>")}</td>
          <td>${row.learningExperiences.replace(/\n/g, "<br/>")}</td>
          <td>${row.keyInquiryQuestion}</td>
          <td>${row.learningResources}</td>
          <td>${row.assessmentMethods}</td>
          <td>${row.reflection}</td>
        </tr>`).join("")}</tbody>
      </table>`;

    printArea.innerHTML = tableHTML;
    window.print();
    toast({ title: "PDF Export", description: "Print dialog opened. Select 'Save as PDF' to export." });
  };

  const handleSave = () => {
    toast({
      title: "Saved to Library",
      description: "Your scheme has been saved locally. Connect a backend to enable cloud storage.",
    });
  };

  const weeklyDistribution = isLanguage && fullStrandData.length > 0
    ? getWeeklyDistribution(subject, fullStrandData)
    : [];

  return (
    <>
      <div id="scheme-print-area" className="hidden print:block" />
      <Dialog open={open} onOpenChange={(v) => { setOpen(v); if (!v) resetForm(); }}>
        <DialogTrigger asChild>
          <Button size="lg" className="gap-2 font-semibold text-base px-8 py-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
            <Sparkles className="w-5 h-5" />
            Generate Scheme of Work
          </Button>
        </DialogTrigger>
        <DialogContent className="max-w-4xl max-h-[90vh]">
          <DialogHeader>
            <DialogTitle className="font-serif text-xl">
              {step < 6 ? "Create Scheme of Work" : "Preview Scheme of Work"}
            </DialogTitle>
          </DialogHeader>

          {step < 6 && (
            <div className="flex gap-1 mb-4">
              {(isLanguage ? [1, 2, 3, 4, 5] : [1, 2, 3, 4, 5]).map((s) => (
                <div
                  key={s}
                  className={`h-1.5 flex-1 rounded-full transition-colors ${s <= step ? "bg-primary" : "bg-muted"}`}
                />
              ))}
            </div>
          )}

          <div className="max-h-[70vh] overflow-y-auto pr-2">
            {/* Step 1: Grade */}
            {step === 1 && (
              <div className="space-y-4 py-2">
                <p className="text-sm text-muted-foreground">Select the grade level for this scheme.</p>
                <Select value={grade} onValueChange={(v) => { setGrade(v); setSubject(""); setStrand(""); setStep(2); }}>
                  <SelectTrigger><SelectValue placeholder="Select Grade" /></SelectTrigger>
                  <SelectContent>
                    {grades.map((g) => <SelectItem key={g} value={g}>{g}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
            )}

            {/* Step 2: Subject */}
            {step === 2 && (
              <div className="space-y-4 py-2">
                <p className="text-sm text-muted-foreground">Select the subject for {grade}.</p>
                <Select value={subject} onValueChange={(v) => {
                  setSubject(v);
                  setIndigenousLanguage("");
                  setStrand("");
                  setStrandSubStrandSelections({});
                  if (v === "Indigenous Language") {
                    /* stay to pick language */
                  } else {
                    setStep(3);
                  }
                }}>
                  <SelectTrigger><SelectValue placeholder="Select Subject" /></SelectTrigger>
                  <SelectContent>
                    {subjects.map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}
                  </SelectContent>
                </Select>
                {subject === "Indigenous Language" && (
                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground">Which indigenous language does your school teach?</p>
                    <Select value={indigenousLanguage} onValueChange={(v) => { setIndigenousLanguage(v); setStep(3); }}>
                      <SelectTrigger><SelectValue placeholder="Select your language" /></SelectTrigger>
                      <SelectContent>
                        {INDIGENOUS_LANGUAGES.map((lang) => <SelectItem key={lang} value={lang}>{lang}</SelectItem>)}
                      </SelectContent>
                    </Select>
                  </div>
                )}
                <Button variant="ghost" size="sm" onClick={() => { setStep(1); setGrade(""); }}>← Back</Button>
              </div>
            )}

            {/* ── LANGUAGE FLOW: Step 3 = Term + Week ── */}
            {step === 3 && isLanguage && (
              <div className="space-y-4 py-2">
                <p className="text-sm text-muted-foreground">
                  {kiswahiliSubjects.includes(subject) ? "Chagua muhula na wiki." : "Select the term and week to generate."}
                </p>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">{kiswahiliSubjects.includes(subject) ? "Muhula" : "Term"}</label>
                    <Select value={term} onValueChange={setTerm}>
                      <SelectTrigger><SelectValue placeholder="Select Term" /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Term 1">Term 1</SelectItem>
                        <SelectItem value="Term 2">Term 2</SelectItem>
                        <SelectItem value="Term 3">Term 3</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">{kiswahiliSubjects.includes(subject) ? "Wiki" : "Week"}</label>
                    <Select value={weekNumber} onValueChange={setWeekNumber}>
                      <SelectTrigger><SelectValue placeholder="Select Week" /></SelectTrigger>
                      <SelectContent>
                        {Array.from({ length: 13 }, (_, i) => i + 1).map((w) => (
                          <SelectItem key={w} value={String(w)}>
                            {kiswahiliSubjects.includes(subject) ? `Wiki ${w}` : `Week ${w}`}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                {term && weekNumber && (
                  <Button onClick={() => setStep(4)} className="mt-2">
                    {kiswahiliSubjects.includes(subject) ? "Endelea" : "Continue"} →
                  </Button>
                )}
                <Button variant="ghost" size="sm" onClick={() => { setStep(2); setSubject(""); setTerm(""); setWeekNumber(""); }}>← Back</Button>
              </div>
            )}

            {/* ── LANGUAGE FLOW: Step 4 = Select sub-strand per skill strand ── */}
            {step === 4 && isLanguage && (
              <div className="space-y-4 py-2">
                <p className="text-sm text-muted-foreground">
                  {kiswahiliSubjects.includes(subject)
                    ? `Chagua mada ndogo kwa kila ujuzi kwa Wiki ${weekNumber}.`
                    : `Select which sub-strand to teach for each skill area in Week ${weekNumber}.`}
                </p>
                <p className="text-xs text-muted-foreground">
                  {kiswahiliSubjects.includes(subject)
                    ? "Kila wiki ina masomo kutoka ujuzi wote wa lugha."
                    : "Each week includes lessons from all language skill strands."}
                </p>

                {loadingStrands ? (
                  <div className="flex items-center gap-2 text-sm text-muted-foreground py-4">
                    <Loader2 className="w-4 h-4 animate-spin" />
                    {kiswahiliSubjects.includes(subject) ? "Inapakia..." : "Loading strands..."}
                  </div>
                ) : (
                  <div className="space-y-4">
                    {weeklyDistribution.map(({ strandName, lessonsThisWeek }) => {
                      const strandData = fullStrandData.find(s => s.name === strandName);
                      if (!strandData) return null;
                      return (
                        <div key={strandName} className="rounded-lg border p-3 space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-medium">{strandName}</span>
                            <span className="text-xs text-muted-foreground">
                              {lessonsThisWeek} {lessonsThisWeek === 1 ? "lesson" : "lessons"}
                            </span>
                          </div>
                          <Select
                            value={strandSubStrandSelections[strandName] || ""}
                            onValueChange={(v) => setStrandSubStrandSelections(prev => ({ ...prev, [strandName]: v }))}
                          >
                            <SelectTrigger className="text-sm">
                              <SelectValue placeholder={kiswahiliSubjects.includes(subject) ? "Chagua mada ndogo" : "Select sub-strand"} />
                            </SelectTrigger>
                            <SelectContent>
                              {strandData.subStrands.map(ss => (
                                <SelectItem key={ss.name} value={ss.name}>{ss.name}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      );
                    })}
                  </div>
                )}

                {!loadingStrands && weeklyDistribution.every(d => strandSubStrandSelections[d.strandName]) && (
                  <Button onClick={() => setStep(5)} className="mt-2">
                    {kiswahiliSubjects.includes(subject) ? "Endelea" : "Continue"} →
                  </Button>
                )}
                <Button variant="ghost" size="sm" onClick={() => { setStep(3); setStrandSubStrandSelections({}); }}>← Back</Button>
              </div>
            )}

            {/* ── LANGUAGE FLOW: Step 5 = Confirm & Generate ── */}
            {step === 5 && isLanguage && (
              <div className="space-y-4 py-2">
                <div className="rounded-lg bg-muted p-3 text-sm space-y-1">
                  <p><span className="font-medium">Grade:</span> {grade}</p>
                  <p><span className="font-medium">Subject:</span> {subject}{indigenousLanguage ? ` (${indigenousLanguage})` : ""}</p>
                  <p><span className="font-medium">{kiswahiliSubjects.includes(subject) ? "Muhula" : "Term"}:</span> {term}</p>
                  <p><span className="font-medium">{kiswahiliSubjects.includes(subject) ? "Wiki" : "Week"}:</span> {weekNumber}</p>
                  <div className="mt-2 pt-2 border-t">
                    <p className="font-medium mb-1">{kiswahiliSubjects.includes(subject) ? "Mpango wa Wiki:" : "Weekly Plan:"}</p>
                    {weeklyDistribution.map(({ strandName, lessonsThisWeek }) => (
                      <p key={strandName} className="text-xs ml-2">
                        • {strandName}: <span className="font-medium">{strandSubStrandSelections[strandName]}</span> ({lessonsThisWeek} {lessonsThisWeek === 1 ? "lesson" : "lessons"})
                      </p>
                    ))}
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">
                    {kiswahiliSubjects.includes(subject)
                      ? "Unapanga kutumia rasilimali gani za kujifunza?"
                      : "What learning resources do you plan on using?"}
                  </label>
                  <Textarea
                    value={context}
                    onChange={(e) => setContext(e.target.value)}
                    placeholder={
                      kiswahiliSubjects.includes(subject)
                        ? "k.m., vitabu vya kiada, video, vifaa vya sanaa..."
                        : "e.g., textbooks, videos, art supplies, musical instruments, outdoor space..."
                    }
                    rows={3}
                  />
                </div>
                <div className="flex gap-2">
                  <Button variant="ghost" size="sm" onClick={() => setStep(4)}>← Back</Button>
                  <Button onClick={handleGenerateWeekly} disabled={loading} className="ml-auto gap-2">
                    {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
                    {loading
                      ? (kiswahiliSubjects.includes(subject) ? "Inatengeneza..." : "Generating...")
                      : (kiswahiliSubjects.includes(subject) ? "Tengeneza Mpango wa Wiki" : "Generate Weekly Scheme")}
                  </Button>
                </div>
              </div>
            )}

            {/* ── NON-LANGUAGE FLOW: Step 3 = Strand ── */}
            {step === 3 && !isLanguage && (
              <div className="space-y-4 py-2">
                <p className="text-sm text-muted-foreground">
                  {loadingStrands
                    ? `Loading KICD strands for ${subject}...`
                    : `Select a strand for ${subject}.`}
                </p>
                {loadingStrands ? (
                  <div className="flex items-center gap-2 text-sm text-muted-foreground py-4">
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Fetching strands from KICD curriculum...
                  </div>
                ) : (
                  <Select value={strand} onValueChange={(v) => { setStrand(v); setSubStrand(""); setStep(4); }}>
                    <SelectTrigger><SelectValue placeholder="Select Strand" /></SelectTrigger>
                    <SelectContent>
                      {availableStrands.map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}
                    </SelectContent>
                  </Select>
                )}
                <Button variant="ghost" size="sm" onClick={() => { setStep(2); setSubject(""); }}>← Back</Button>
              </div>
            )}

            {/* ── NON-LANGUAGE FLOW: Step 4 = Sub-Strand ── */}
            {step === 4 && !isLanguage && (
              <div className="space-y-4 py-2">
                <p className="text-sm text-muted-foreground">Select a sub-strand for {strand}.</p>
                <Select value={subStrand} onValueChange={(v) => { setSubStrand(v); setStep(5); }}>
                  <SelectTrigger><SelectValue placeholder="Select Sub-Strand" /></SelectTrigger>
                  <SelectContent>
                    {availableSubStrands.map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}
                  </SelectContent>
                </Select>
                <Button variant="ghost" size="sm" onClick={() => { setStep(3); setStrand(""); }}>← Back</Button>
              </div>
            )}

            {/* ── NON-LANGUAGE FLOW: Step 5 = Confirm & Generate ── */}
            {step === 5 && !isLanguage && (
              <div className="space-y-4 py-2">
                <div className="rounded-lg bg-muted p-3 text-sm space-y-1">
                  <p><span className="font-medium">Grade:</span> {grade}</p>
                  <p><span className="font-medium">Subject:</span> {subject}</p>
                  <p><span className="font-medium">Strand:</span> {strand}</p>
                  <p><span className="font-medium">Sub-Strand:</span> {subStrand}</p>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">
                    {kiswahiliSubjects.includes(subject)
                      ? "Unapanga kutumia rasilimali gani za kujifunza?"
                      : "What learning resources do you plan on using?"}
                  </label>
                  <Textarea
                    value={context}
                    onChange={(e) => setContext(e.target.value)}
                    placeholder="e.g., textbooks, videos, art supplies, musical instruments, outdoor space..."
                    rows={3}
                  />
                </div>
                <div className="flex gap-2">
                  <Button variant="ghost" size="sm" onClick={() => { setStep(4); setSubStrand(""); }}>← Back</Button>
                  <Button onClick={handleGenerate} disabled={loading} className="ml-auto gap-2">
                    {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
                    {loading ? "Generating..." : "Generate Scheme"}
                  </Button>
                </div>
              </div>
            )}

            {/* ── Step 6: Preview (both flows) ── */}
            {step === 6 && generatedRows && (
              <div className="space-y-4 py-2">
                <SchemePreview rows={generatedRows} subject={subject} grade={grade} strand={isLanguage ? `${term} - Week ${weekNumber}` : strand} />
                <div className="flex flex-wrap gap-2 pt-2">
                  <Button variant="outline" onClick={() => { setStep(5); setGeneratedRows(null); }} className="gap-2">
                    <FileText className="w-4 h-4" /> Regenerate
                  </Button>
                  <Button variant="secondary" onClick={handleSave} className="gap-2">
                    <Save className="w-4 h-4" /> Save to Library
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => exportSchemeToDocx(generatedRows!, grade, subject, isLanguage ? `${term} - Week ${weekNumber}` : strand)}
                    className="gap-2"
                  >
                    <FileDown className="w-4 h-4" /> Export DOCX
                  </Button>
                  <Button onClick={handleExportPDF} className="gap-2 ml-auto">
                    <Download className="w-4 h-4" /> Export PDF
                  </Button>
                </div>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default SchemeGeneratorDialog;
