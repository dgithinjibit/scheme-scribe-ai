import type { StrandInfo, SubStrandInfo } from "../types";

/**
 * Blockchain Learning Area — shared scaffolding.
 *
 * Kenyan CBE-aligned design, Grades 6-12, 5 lessons per week (55 lessons per term).
 *
 * Age-appropriateness is handled by what each grade does inside the same five
 * strands, benchmarked against published school programmes:
 *  - K9-12 blockchain teaching materials (theory + hands-on, Univ. of Liechtenstein)
 *  - Wyoming Blockchain Education for Everyone (WyoBEE) high-school modules
 *  - "Blockchain & FinTech" youth curriculum (ages 15-24), industry co-designed
 *
 * Progression rule applied throughout:
 *  Grade 6      — records, trust and digital safety only. No trading, no coding.
 *  Grades 7-8   — how a chain of records works, unplugged cryptography, scam awareness.
 *  Grade 9      — wallets, keys, tokens as technology; consumer protection.
 *  Grades 10-11 — smart contracts, programming, decentralised applications, market risk.
 *  Grade 12     — systems, regulation, enterprise use and career pathways.
 *
 * Trading, speculation and investment decisions are never taught as activities;
 * from Grade 9 they are studied as risks under consumer protection and law.
 *
 * Every sub-strand carries learning outcomes in the rigid KSA order required by
 * this project: a) Knowledge, b) Skills, c) Attitudes.
 */

export const BLOCKCHAIN_STRANDS = [
  "1.0 Records, Trust and Value",
  "2.0 Blockchain Technology and Cryptography",
  "3.0 Digital Assets and Digital Finance",
  "4.0 Smart Contracts and Applications",
  "5.0 Ethics, Law and Society",
] as const;

export function ss(
  name: string,
  lessons: number,
  keyInquiryQuestion: string,
  learningOutcomes: string[],
  suggestedExperiences: string[],
): SubStrandInfo {
  return { name, lessons, keyInquiryQuestion, learningOutcomes, suggestedExperiences };
}

export function build(subs: SubStrandInfo[][]): StrandInfo[] {
  return BLOCKCHAIN_STRANDS.map((name, i) => ({ name, subStrands: subs[i] }));
}
