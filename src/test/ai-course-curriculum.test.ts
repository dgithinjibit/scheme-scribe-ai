import { describe, expect, it } from "vitest";
import { getHardcodedStrands, getLessonsPerWeek } from "@/data/curriculum";

const aiGrades = [
  { grade: "Grade 6", weeklyLessons: 2, termLessons: 66 },
  { grade: "Grade 7", weeklyLessons: 3, termLessons: 99 },
  { grade: "Grade 8", weeklyLessons: 3, termLessons: 99 },
  { grade: "Grade 9", weeklyLessons: 3, termLessons: 99 },
  { grade: "Grade 10", weeklyLessons: 4, termLessons: 132 },
  { grade: "Grade 11", weeklyLessons: 4, termLessons: 132 },
  { grade: "Grade 12", weeklyLessons: 4, termLessons: 132 },
];

function getSubStrand(grade: string, targetName: string) {
  const strands = getHardcodedStrands(grade, "AI");
  if (!strands) return undefined;
  return strands.flatMap((strand) => strand.subStrands).find((subStrand) => subStrand.name === targetName);
}

describe("AI engineering course mapping", () => {
  it("preserves the existing weekly and per-term lesson allocations", () => {
    for (const { grade, weeklyLessons, termLessons } of aiGrades) {
      const strands = getHardcodedStrands(grade, "AI");
      expect(getLessonsPerWeek(grade, "AI")).toBe(weeklyLessons);
      expect(strands).not.toBeNull();
      expect(strands?.flatMap((strand) => strand.subStrands).reduce((sum, item) => sum + item.lessons, 0)).toBe(termLessons);
    }
  });

  it("keeps exactly three learning outcomes for every AI sub-strand", () => {
    for (const { grade } of aiGrades) {
      const strands = getHardcodedStrands(grade, "AI");
      expect(strands).not.toBeNull();
      for (const subStrand of strands?.flatMap((strand) => strand.subStrands) ?? []) {
        expect(subStrand.learningOutcomes).toHaveLength(3);
      }
    }
  });

  it("places advanced engineering topics in the senior grades", () => {
    expect(getSubStrand("Grade 10", "4.2 Retrieval-Grounded AI Applications")).toBeDefined();
    expect(getSubStrand("Grade 11", "3.3 Neural Networks, Attention and Transformer Models")).toBeDefined();
    expect(getSubStrand("Grade 11", "4.3 AI Evaluation and Reliability Engineering")).toBeDefined();
    expect(getSubStrand("Grade 12", "3.3 Multi-Agent Systems and Tool Protocols")).toBeDefined();
    expect(getSubStrand("Grade 12", "4.2 AI Deployment, Serving and MLOps")).toBeDefined();
    expect(getSubStrand("Grade 6", "4.2 Retrieval-Grounded AI Applications")).toBeUndefined();
  });
});