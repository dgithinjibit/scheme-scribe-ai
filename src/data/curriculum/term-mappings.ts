import type { StrandInfo, SubStrandInfo } from "./types";
import { getHardcodedStrands } from "./index";
import { getLessonsPerWeek } from "./index";

/**
 * Term-to-strand mapping for the Kenyan CBC curriculum.
 * Based on the rationalized 2024 curriculum structure from KICD.
 *
 * Pattern types:
 * - "rotate": Each strand maps to one term (e.g., Environmental Activities)
 * - "split": A strand spans multiple terms, sub-strands are divided (e.g., Math Numbers T1-T2)
 * - "all": All strands appear every term (handled by languages, not here)
 * - "sequential": Strands are distributed across terms by lesson budget (fallback)
 */

// Keyword patterns to match strand names to terms
// Each entry maps a term to an array of strand keyword patterns
type StrandTermRule = Record<string, string[]>;

const STRAND_TERM_RULES: Record<string, StrandTermRule> = {
  // ─── Lower Primary ───
  "Environmental Activities": {
    "Term 1": ["Social"],
    "Term 2": ["Natural"],
    "Term 3": ["Resources"],
  },
  "Creative Activities": {
    "Term 1": ["Creating"],
    "Term 2": ["Performing"],
    "Term 3": ["Appreciation"],
  },

  // ─── Upper Primary ───
  "Science & Technology": {
    "Term 1": ["Living Things"],
    "Term 2": ["Matter"],
    "Term 3": ["Force", "Energy"],
  },
  "Creative Arts": {
    "Term 1": ["Creating"],
    "Term 2": ["Performing"],
    "Term 3": ["Appreciation"],
  },
};

// Subjects where "Numbers" strand spans Terms 1+2, rest in Term 3
const MATH_SUBJECT = "Mathematics";

/**
 * Returns the strands and their sub-strands allocated to a specific term.
 * Uses explicit KICD-based rules where available, falls back to sequential distribution.
 */
export function getTermAllocation(
  grade: string,
  subject: string,
  term: string
): { strandName: string; subStrands: SubStrandInfo[] }[] | null {
  const allStrands = getHardcodedStrands(grade, subject);
  if (!allStrands || allStrands.length === 0) return null;

  const termIndex = ["Term 1", "Term 2", "Term 3"].indexOf(term);
  if (termIndex === -1) return null;

  // ─── Mathematics: special handling ───
  if (subject === MATH_SUBJECT) {
    return getMathTermAllocation(allStrands, termIndex);
  }

  // ─── Explicit strand-to-term rules ───
  const rules = STRAND_TERM_RULES[subject];
  if (rules) {
    return getExplicitTermAllocation(allStrands, rules, term);
  }

  // ─── Fallback: sequential distribution by lesson budget ───
  return getSequentialTermAllocation(allStrands, grade, subject, termIndex);
}

/**
 * Math: Numbers in T1+T2 (split sub-strands), Measurement+Geometry+Data in T3
 */
function getMathTermAllocation(
  allStrands: StrandInfo[],
  termIndex: number
): { strandName: string; subStrands: SubStrandInfo[] }[] {
  const numbersStrand = allStrands.find(s => s.name.toLowerCase().includes("number"));
  const otherStrands = allStrands.filter(s => !s.name.toLowerCase().includes("number"));

  if (termIndex === 2) {
    // Term 3: everything except Numbers
    return otherStrands.map(s => ({ strandName: s.name, subStrands: s.subStrands }));
  }

  // Terms 1 & 2: split Numbers sub-strands
  if (!numbersStrand) return [];
  const subs = numbersStrand.subStrands;
  const half = Math.ceil(subs.length / 2);
  const termSubs = termIndex === 0 ? subs.slice(0, half) : subs.slice(half);

  return [{ strandName: numbersStrand.name, subStrands: termSubs }];
}

/**
 * Use explicit keyword rules to match strands to the selected term.
 */
function getExplicitTermAllocation(
  allStrands: StrandInfo[],
  rules: StrandTermRule,
  term: string
): { strandName: string; subStrands: SubStrandInfo[] }[] {
  const keywords = rules[term];
  if (!keywords) return [];

  const matched = allStrands.filter(s =>
    keywords.some(k => s.name.toLowerCase().includes(k.toLowerCase()))
  );

  return matched.map(s => ({ strandName: s.name, subStrands: s.subStrands }));
}

/**
 * Fallback: distribute strands sequentially across 3 terms by lesson budget.
 * Each term gets ~1/3 of total lessons.
 */
function getSequentialTermAllocation(
  allStrands: StrandInfo[],
  grade: string,
  subject: string,
  termIndex: number
): { strandName: string; subStrands: SubStrandInfo[] }[] {
  // Flatten all sub-strands with parent strand ref
  const items: { strand: StrandInfo; subStrand: SubStrandInfo }[] = [];
  for (const strand of allStrands) {
    for (const ss of strand.subStrands) {
      items.push({ strand, subStrand: ss });
    }
  }

  const totalLessons = items.reduce((sum, i) => sum + i.subStrand.lessons, 0);
  const targetPerTerm = Math.ceil(totalLessons / 3);

  // Walk through items, accumulating into terms
  let accumulated = 0;
  let currentTermIdx = 0;
  const termBuckets: { strand: StrandInfo; subStrand: SubStrandInfo }[][] = [[], [], []];

  for (const item of items) {
    termBuckets[currentTermIdx].push(item);
    accumulated += item.subStrand.lessons;

    // Move to next term if budget exceeded (but not on last term)
    if (accumulated >= targetPerTerm && currentTermIdx < 2) {
      accumulated = 0;
      currentTermIdx++;
    }
  }

  // Group the selected term's items by strand
  const termItems = termBuckets[termIndex];
  const grouped = new Map<string, { strandName: string; subStrands: SubStrandInfo[] }>();

  for (const item of termItems) {
    const existing = grouped.get(item.strand.name);
    if (existing) {
      existing.subStrands.push(item.subStrand);
    } else {
      grouped.set(item.strand.name, {
        strandName: item.strand.name,
        subStrands: [item.subStrand],
      });
    }
  }

  return Array.from(grouped.values());
}

/**
 * Get total lessons for a term allocation.
 */
export function getTermLessonCount(
  allocation: { strandName: string; subStrands: SubStrandInfo[] }[]
): number {
  return allocation.reduce(
    (sum, a) => sum + a.subStrands.reduce((s, ss) => s + ss.lessons, 0),
    0
  );
}
