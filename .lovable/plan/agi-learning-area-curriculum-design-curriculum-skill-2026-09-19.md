# AGI Learning Area — Curriculum Design + Curriculum Skill

Add a new learning area called **AGI** to the app, so teachers can generate schemes of work (and exams) for it exactly like any other subject. The design is derived from your framework document, benchmarked against how other countries structure school AI education, and extended with senior-school programming in MeTTa and Wolfram Language.

## What the design is based on

Three sources, blended into one Kenyan CBE structure:

- **Your framework document** — tiered progression, CBC core competency alignment, activity catalogue, ethics emphasis.
- **UNESCO AI Competency Framework for Students** — 12 competencies across four dimensions (human-centred mindset, AI ethics, AI techniques and applications, AI system design) at three levels: Understand, Apply, Create. This maps cleanly onto CBE strands. [1](https://www.unesco.org/en/articles/ai-competency-framework-students)
- **China's 2025 national AI general-education guide** — the clearest tiered national model: primary = experience and interest, junior = technical logic and project work, senior = model building, systems thinking and social responsibility. [2](https://www.cse.edu.cn/index/detail.html?category=31&id=4240)

## Coverage

Senior school is the focus; the lower grades get a light on-ramp.

| Level | Grades | Emphasis |
| --- | --- | --- |
| Upper primary | 4-6 | Recognising AI around us, data basics, safe and honest use |
| Junior school | 7-9 | How machines learn, data handling, visual/block ML projects, bias and ethics |
| Senior school | 10-12 | Symbolic and neural AI, MeTTa and Wolfram Language, model building, agents, AI policy and enterprise |

Grades 10-12 do not exist in the app yet, so they get added alongside a senior-school subject list.

## Strand structure

Five strands across all levels, spiralling in depth (each grade gets its own sub-strands and lesson counts):

1. **Foundations of Intelligence** — what intelligence is, human vs machine, history, AI in Kenyan life
2. **Data and Representation** — collecting, cleaning, labelling, bias in data, knowledge representation
3. **AI Techniques and Programming** — rule-based systems, machine learning, neural networks; MeTTa (symbolic/AGI reasoning) and Wolfram Language (computation, symbolic maths, built-in ML) at senior level, block-based tools lower down
4. **AI System Design and Projects** — problem framing, building, testing, evaluating; capstone projects tied to Kenyan contexts (agriculture, health, Swahili language tech)
5. **Ethics, Society and AI Policy** — human-centred mindset, privacy, fairness, jobs, Kenyan data-protection law, AI sovereignty

Term mapping: Term 1 = strands 1-2, Term 2 = strands 3-4, Term 3 = strand 5 plus capstone — added as an explicit rule so scheme generation is deterministic.

## Learning resources

AGI has no KLB Visionary title. Resources will reference the KICD-style design document for the learning area plus named open tools (MeTTa/Hyperon docs, Wolfram Language documentation, Teachable Machine, Scratch AI extensions) — never invented textbook titles.

## Technical changes

- `src/data/curriculum/senior-school/agi.ts` — new strand data for Grades 4-12 (`grade4AGI` … `grade12AGI`), each with sub-strands, lesson counts, official-style learning outcomes, suggested experiences and key inquiry questions, so the generator has real KICD-shaped source data rather than inventing content.
- `src/data/curriculum/index.ts` — register the new entries in `hardcodedStrands`; add `"Grade 10"`, `"Grade 11"`, `"Grade 12"` to `grades`; add a `seniorSchoolSubjects` list and a senior branch in `getSubjectsForGrade`; add `"AGI"` to upper-primary and junior-secondary subject lists; add lesson-per-week allocations (AGI = 3 for upper primary/junior, 4 for senior).
- `src/data/curriculum/term-mappings.ts` — add an `"AGI"` entry to `STRAND_TERM_RULES` matching the term split above.
- Resource selection in `supabase/functions/generate-scheme/index.ts` — add an AGI branch so it does not fall back to a KLB Visionary title.
- Existing KSA verb guardrails, LLO ordering rules and anti-hallucination rules apply unchanged; the new outcomes are authored to already satisfy a) Knowledge, b) Skills, c) Attitudes.

## Curriculum skill

A reusable skill at `.agents/skills/curriculum-skill/`, then activated. It captures the house rules for authoring **any** curriculum data in this project, not just AGI:

- File layout and `StrandInfo` / `SubStrandInfo` shape, where files live, how to register a grade+subject
- Rigid LLO rule: a) Knowledge verb, b) Skills verb, c) Attitudes verb — with the approved verb lists and the banned-verb replacement table
- Learning-resource rules (KLB Visionary titles for Grades 1-3; never generic "Curriculum Design"; never invented titles)
- Column header wording in English and Kiswahili
- Term-mapping conventions and lesson-allocation tables
- A checklist for adding a new grade or learning area end to end

## Verification

Run the guardrail test suite, then generate a Grade 10 AGI Term 2 scheme in the preview and confirm the strands, LLO ordering and resources come out correct.
