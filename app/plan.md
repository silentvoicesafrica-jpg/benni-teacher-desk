# Benni Teacher Assistant — Implementation Plan

## Product scope

A mobile-first, local-first web app for Eddy, a Ghanaian ICT teacher. The first release must help him prepare examination papers, generate practical draft activities, record exercises/class tests/assignments/projects, and show inspection readiness before the end of the month. It must work in a phone browser without coding, preserve teacher review, and support export/import backup.

The first release does not require login, a server, a database, cloud AI, or real student data. It uses browser local storage so the app is immediately usable and private on the device. A later app version can add a managed backend and AI generation after the examination deadline.

## Required first-release modules

- Dashboard: current term, inspection counters, urgent gaps, and quick actions.
- Exam Builder: class/term/exam setup, exam structure rules, topic selection, draft question paper, answer key, marking guide, print view, and saved drafts.
- Work & Tests: add classwork, homework, assignment, exercise, and class-test records with dates, topic, class, status, and evidence note.
- Scorebook: lightweight anonymous learner IDs and assessment scores, with totals and percentages.
- Projects: project records, deadlines, rubric fields, and completion status.
- Inspection: editable targets, counts by class/type, gaps, and a “ready for inspection” checklist. Targets are user-set examples, not official GES requirements.
- Extras: extracurricular activity catalogue and activity records.
- Backup: export all app data to JSON and import it back. Clear data requires explicit confirmation.

## Content seed

Seed KG1/KG2 from Eddy’s uploaded scheme of work: What is ICT, ICT Around Us, Computer Parts, Using a Mouse, Using a Keyboard, Staying Safe, Drawing on Computer, More Drawing, Playing Educational Games, ICT at Home, and Fun Review. The app will allow the teacher to add the other class topics, because a single photograph does not contain the complete schemes for Basic 1–9.

Exam rules:

- KG2–Basic 2: 30 questions and age-appropriate oral, picture-based, matching, tracing, colouring, or practical activities.
- Basic 3–Basic 4: 40 compulsory Section A questions; Section B has 5 questions; learners answer 3.
- Basic 5–Basic 9/Form 3: 40 compulsory Section A questions; Section B has 6 questions; learners answer 4.

The app labels generated papers as drafts and requires teacher approval before printing/sharing.

## Interaction design

Use a guided form instead of a prompt box. Each flow asks only for the next necessary information. Every record has a status: Draft, In progress, Completed, Approved, or Archived. Use large touch targets, clear English, short instructions, and visible save/undo paths. Provide empty states that tell the teacher what to do next.

## Design direction

- Design movement: **calm field notebook meets Ghanaian classroom dashboard**.
- Core principles: practical first, readable at a glance, respectful of teacher control, and evidence-oriented for inspection.
- Color philosophy: deep indigo for trust and structure, warm ochre for progress and Ghanaian warmth, soft cream for paper-like surfaces, and green for completed work. Red is reserved for gaps and overdue actions.
- Layout paradigm: a left-hand vertical “teacher desk” sidebar on laptop/desktop, with a compact touch-friendly bottom navigation on phones; key metrics sit in a compact status strip, while work is handled through wide reading columns, stacked cards and step panels rather than a flat grid.
- Signature elements: paper-card surfaces with subtle ruled lines, small “inspector-ready” stamps for approved records, and progress rings/bars for counts and coverage.
- Interaction philosophy: every action explains what it will save; destructive actions are separated and confirmed; generated content is visibly marked Draft.
- Animation: short slide/fade transitions only for panel changes and toast feedback; no decorative motion that distracts from data entry.
- Typography: Inter for interface text, with a sturdy serif accent such as Source Serif 4 for page titles and printable paper headings. If unavailable, use system sans/serif fallbacks.
- Brand essence: “A practical digital desk for a Ghanaian teacher who wants evidence of real learning.” Personality: calm, useful, accountable.
- Brand voice: direct, encouraging, non-technical. Example: “You have 3 exercises recorded for Basic 4.” and “This paper is a draft. Review it before printing.”
- Wordmark/mark: a simple open exercise-book shape with a small check mark, used as a CSS mark rather than an external image.
- Signature brand color: deep indigo #243B64.

## Project structure

- `package.json`: scripts for the local preview server.
- `server.mjs`: minimal static server on the configured port.
- `index.html`: app shell and semantic sections.
- `styles.css`: responsive, mobile-first design system and print styles.
- `app.js`: state, localStorage, seeded data, navigation, forms, draft generation, export/import, print actions, Extras search/filter, pathway details and Planner loading.
- `extra-curriculum.js`: source-linked extracurricular pathway catalogue with age bands, skills, safety rules, six sessions, evidence prompts and caveats.
- `EXTRAS_CURRICULUM_RESEARCH.md`: readable research record and source list for the pathway catalogue.
- `public/manus-routes.json`: declared page route `/`.
- `README.md`: phone use, backup, and current limitations.

## Material constraints and future path

This first version is intentionally local-first. It does not pretend to be an official GES or NaCCA record system, and its sample inspection targets are adjustable. The Extras pathways are optional teacher-designed adaptations: source links inform the content but do not grant accreditation, compulsory status or a CTVET certificate. Practical pathways keep conservative limits around mains electricity, hazardous e-waste, flames, chemicals, food, sharps and unsupervised off-site work. A future AI/backend version can use official curriculum files and a structured question bank, but it should be added only after the local workflow has been tested.
