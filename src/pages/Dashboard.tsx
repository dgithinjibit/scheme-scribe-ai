import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  ArrowLeft,
  GraduationCap,
  Loader2,
  Trophy,
  TrendingUp,
  BookOpen,
} from "lucide-react";

interface Attempt {
  id: string;
  pupil_name: string;
  grade: string;
  subject: string;
  term: string;
  awarded: number;
  total: number;
  percent: number;
  created_at: string;
}

const Dashboard = () => {
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [attempts, setAttempts] = useState<Attempt[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedPupil, setSelectedPupil] = useState<string | null>(null);

  useEffect(() => {
    if (!authLoading && !user) navigate("/auth");
  }, [user, authLoading, navigate]);

  useEffect(() => {
    if (!user) return;
    (async () => {
      const { data, error } = await supabase
        .from("exam_attempts")
        .select(
          "id, pupil_name, grade, subject, term, awarded, total, percent, created_at"
        )
        .order("created_at", { ascending: false });
      if (error) console.error(error);
      else setAttempts((data ?? []) as Attempt[]);
      setLoading(false);
    })();
  }, [user]);

  // Group by pupil
  const pupils = useMemo(() => {
    const map = new Map<string, Attempt[]>();
    for (const a of attempts) {
      const k = a.pupil_name.trim();
      if (!map.has(k)) map.set(k, []);
      map.get(k)!.push(a);
    }
    return Array.from(map.entries())
      .map(([name, list]) => {
        const avg =
          list.reduce((s, a) => s + a.percent, 0) / Math.max(list.length, 1);
        return { name, attempts: list, avg: Math.round(avg) };
      })
      .sort((a, b) => b.avg - a.avg);
  }, [attempts]);

  const selected = selectedPupil
    ? pupils.find((p) => p.name === selectedPupil)
    : null;

  // Per-subject summary for selected pupil
  const bySubject = useMemo(() => {
    if (!selected) return [];
    const map = new Map<string, Attempt[]>();
    for (const a of selected.attempts) {
      const k = a.subject;
      if (!map.has(k)) map.set(k, []);
      map.get(k)!.push(a);
    }
    return Array.from(map.entries()).map(([subject, list]) => {
      const best = Math.max(...list.map((a) => a.percent));
      const latest = list[0];
      const avg = Math.round(
        list.reduce((s, a) => s + a.percent, 0) / list.length
      );
      return { subject, best, latest, avg, attempts: list.length };
    });
  }, [selected]);

  if (authLoading || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-6 h-6 animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b">
        <div className="container max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate("/")}
              className="gap-1.5"
            >
              <ArrowLeft className="w-4 h-4" /> Home
            </Button>
            <div className="flex items-center gap-2">
              <GraduationCap className="w-5 h-5 text-primary" />
              <h1 className="text-xl font-bold">Pupil Dashboard</h1>
            </div>
          </div>
          <p className="text-xs text-muted-foreground hidden sm:block">
            {user?.email}
          </p>
        </div>
      </header>

      <main className="container max-w-6xl mx-auto px-4 py-8">
        {pupils.length === 0 ? (
          <Card className="p-12 text-center">
            <BookOpen className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
            <h2 className="text-lg font-semibold mb-1">No exam attempts yet</h2>
            <p className="text-sm text-muted-foreground mb-4">
              Once a pupil takes an exam, their score will appear here.
            </p>
            <Button onClick={() => navigate("/")}>Start an exam</Button>
          </Card>
        ) : !selected ? (
          <>
            <div className="mb-6">
              <h2 className="text-2xl font-bold mb-1">Your pupils</h2>
              <p className="text-sm text-muted-foreground">
                {pupils.length} pupil{pupils.length === 1 ? "" : "s"} •{" "}
                {attempts.length} total attempt
                {attempts.length === 1 ? "" : "s"}
              </p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {pupils.map((p) => (
                <Card
                  key={p.name}
                  className="p-5 cursor-pointer hover:shadow-md transition-shadow"
                  onClick={() => setSelectedPupil(p.name)}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="font-semibold text-lg">{p.name}</h3>
                      <p className="text-xs text-muted-foreground">
                        {p.attempts.length} exam
                        {p.attempts.length === 1 ? "" : "s"} taken
                      </p>
                    </div>
                    {p.avg >= 80 && (
                      <Trophy className="w-5 h-5 text-kenya-green" />
                    )}
                  </div>
                  <div className="space-y-1.5">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Average</span>
                      <span className="font-semibold">{p.avg}%</span>
                    </div>
                    <Progress value={p.avg} className="h-2" />
                  </div>
                </Card>
              ))}
            </div>
          </>
        ) : (
          <>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSelectedPupil(null)}
              className="mb-4 gap-1.5"
            >
              <ArrowLeft className="w-4 h-4" /> All pupils
            </Button>

            <div className="mb-6 flex items-end justify-between flex-wrap gap-3">
              <div>
                <h2 className="text-3xl font-bold">{selected.name}</h2>
                <p className="text-sm text-muted-foreground">
                  Overall average:{" "}
                  <span className="font-semibold text-foreground">
                    {selected.avg}%
                  </span>{" "}
                  • {selected.attempts.length} attempt
                  {selected.attempts.length === 1 ? "" : "s"}
                </p>
              </div>
              {selected.avg >= 80 && (
                <Badge className="bg-kenya-green/10 text-kenya-green border-kenya-green gap-1">
                  <Trophy className="w-3 h-3" /> Top performer
                </Badge>
              )}
            </div>

            <h3 className="font-semibold mb-3 flex items-center gap-1.5">
              <TrendingUp className="w-4 h-4" /> Subject performance
            </h3>
            <div className="grid sm:grid-cols-2 gap-4 mb-8">
              {bySubject.map((s) => (
                <Card key={s.subject} className="p-4">
                  <div className="flex justify-between mb-2">
                    <h4 className="font-semibold">{s.subject}</h4>
                    <Badge variant="outline">
                      {s.attempts} attempt{s.attempts === 1 ? "" : "s"}
                    </Badge>
                  </div>
                  <div className="grid grid-cols-3 gap-2 text-sm">
                    <div>
                      <p className="text-xs text-muted-foreground">Latest</p>
                      <p className="font-semibold">{s.latest.percent}%</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Best</p>
                      <p className="font-semibold text-kenya-green">
                        {s.best}%
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Average</p>
                      <p className="font-semibold">{s.avg}%</p>
                    </div>
                  </div>
                  <Progress value={s.avg} className="h-1.5 mt-3" />
                </Card>
              ))}
            </div>

            <h3 className="font-semibold mb-3">All attempts</h3>
            <Card className="divide-y">
              {selected.attempts.map((a) => (
                <div
                  key={a.id}
                  className="p-4 flex items-center justify-between gap-3"
                >
                  <div>
                    <p className="font-medium">
                      {a.subject}{" "}
                      <span className="text-muted-foreground font-normal">
                        — {a.grade}, {a.term}
                      </span>
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {new Date(a.created_at).toLocaleString()}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold">
                      {a.awarded}/{a.total}
                    </p>
                    <p
                      className={`text-xs ${
                        a.percent >= 80
                          ? "text-kenya-green"
                          : a.percent >= 50
                          ? "text-foreground"
                          : "text-kenya-red"
                      }`}
                    >
                      {a.percent}%
                    </p>
                  </div>
                </div>
              ))}
            </Card>
          </>
        )}
      </main>
    </div>
  );
};

export default Dashboard;
