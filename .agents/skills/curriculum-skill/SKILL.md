---
name: curriculum-skill
description: House rules for authoring Kenyan CBE curriculum data in this project — file layout, StrandInfo shape, rigid KSA lesson-outcome ordering, learning-resource titles, term mappings and lesson allocations. Use when adding or editing a grade, learning area or strand data file.
---

# Authoring curriculum data

## Where data lives

- `src/data/curriculum/lower-primary/<subject>.ts` (Grades 1-3)
- `src/data/curriculum/upper-primary/<subject>.ts` (Grades 4-6)
- `src/data/curriculum/senior-school/<subject>.ts` (Grades 7-12 and cross-level areas such as AGI)

Each file exports `grade<N><Subject>: StrandInfo[]`.

## Shape

```ts
interface SubStrandInfo {
  name: string;                    // "1.1 Sub-strand title"
  lessons: number;
  learningOutcomes?: string[];     // exactly 3, in KSA order
  suggestedExperiences?: string[];
  keyInquiryQuestion?: string;
}
interface StrandInfo { name: string; subStrands: SubStrandInfo[] }
```

Strand names carry the official numbering prefix: `"1.0 Foundations of Intelligence"`.

## Rigid LLO rule (non-negotiable)

Every sub-strand's `learningOutcomes` has exactly three entries, in this order:

- a) **Knowledge** — identify, explain, describe, name, list, state, classify, define, recognize
- b) **Skills** — practice, observe, demonstrate, conduct, sort, measure, role-play, apply, build
- c) **Attitudes** — value, appreciate, show, commit, care, embrace

Banned informal verbs and their replacements: carry out → practice, find out → identify,
look at → observe, learn about → identify, talk about → describe, go through → explore,
get to know → recognize.

## Learning resources

- Grades 1-3: official **KLB Visionary** learner's book titles only.
- Never write generic "Curriculum Design" as a resource.
- Never invent textbook titles. For learning areas without a KLB title (e.g. AGI),
  reference the KICD learning-area design plus named real tools and documentation.

## Column headers

English: WK, LSN, Strand, Sub-Strand, Lesson Learning Outcomes, Lesson Learning Experiences,
Key Inquiry Question, Learning Resources, Assessment, Refl.

Kiswahili: WIKI, SOMO, MADA, MADA NDOGO, MATOKEO MAALUM YANAYOTARAJIWA,
MAPENDEKEZO YA SHUGHULI ZA UJIFUNZAJI, SWALI DADISI, MAREJELEO, TATHMINI, MAONI.

## Registering a new grade + learning area

1. Write the data file exporting `grade<N><Subject>`.
2. Register in `src/data/curriculum/index.ts`: re-export, import, add to `hardcodedStrands`
   under key `"Grade N|Subject"`.
3. Add the subject to the right subject list and lessons-per-week map in the same file.
4. Add the grade to `grades` if it is new.
5. Add a `STRAND_TERM_RULES` entry in `term-mappings.ts` so term allocation is deterministic.
6. Add a learning-resource branch in `supabase/functions/generate-scheme/index.ts`
   (`getKLBBookTitle`) if the area has no KLB title.
7. Run `bunx vitest run` and generate one scheme in the preview to confirm.
