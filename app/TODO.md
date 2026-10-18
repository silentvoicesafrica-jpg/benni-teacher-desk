# Benni Teacher Assistant — Implementation Checklist

- [x] Deliver a mobile-first dashboard that shows current term, class counts, exercise/class-test/assignment/project counts, and urgent inspection gaps.
- [x] Deliver a 12-week lesson planner with weekly outcome, activity, evidence, resource/offline alternative, status, edit/delete controls, and automatic topic availability in the Exam Builder.
- [x] Deliver an exam builder that enforces KG2–Basic 2 as 30 questions; Basic 3–Basic 4 as 40 Section A questions plus 5 Section B questions with answer 3; and Basic 5–Basic 9/Form 3 as 40 Section A questions plus 6 Section B questions with answer 4.
- [x] Deliver topic-first generation from a class topic dropdown, with topic-specific ICT foundation prompts and immediate generation using the selected class examination rules.
- [x] Deliver an editable six-session Saturday ICT Foundations track covering ICT basics, data/information, input/output devices, desktop/computer parts, files/folders/saving, and ICT safety.
- [x] Deliver exam draft generation using the selected class, topics, and the teacher’s supplied KG1/KG2 scheme topics; show a Draft — Teacher Review Required label and provide answer key, marking guide, curriculum-notes field, save, and print.
- [x] Deliver work tracking for classwork, homework, assignments, exercises, and class tests with class, topic, date, status, and evidence note.
- [x] Deliver a lightweight scorebook using anonymous learner IDs, scores, totals, percentages, and comments without diagnosing learners.
- [x] Deliver project records with deadline, status, evidence, and rubric fields.
- [x] Deliver an inspection page with editable teacher-set targets, counts by class and work type, gaps, and readiness checklist; do not present targets as official GES requirements.
- [x] Deliver an extracurricular catalogue and records for coding, sewing, visual/creative arts, digital skills, entrepreneurship, agriculture/environment, practical trades, communication, health, citizenship, and green skills; include source notes and mark activities as teacher-planned rather than official mandates.
- [x] Deliver local browser persistence, JSON export/import backup, password-protected AES-GCM encrypted backup export/import, print styles, and explicit confirmation before destructive record deletion.
- [x] Deliver Settings with warm-light, midnight, and high-contrast themes; compact spacing; reduced motion; deletion preference; backup/install access; account controls; and a clearly labelled local-device mode when protected sign-in is unavailable.
- [x] Fix the authentication display boundary so the sign-in gate is hidden after successful Manus or local-mode entry instead of remaining visible over the workspace.
- [x] Serve `/manus-routes.json` with the root route declaration.
- [x] Verify JavaScript syntax, authentication endpoints, responsive layout source, core event handlers, and static app/PWA assets.
- [x] Prepare private-beta deployment with a production Dockerfile, unauthenticated health endpoint, deployment health configuration, and production-only disabling of local-mode bypass.
- [x] Redesign the authenticated workspace so Home, Exams, Planner, Work & Tests, Scorebook, Projects, Inspection, Extras, Storage and Settings are arranged in a persistent vertical left sidebar on laptop/desktop screens, while retaining a readable touch-friendly bottom navigation on phones.
- [x] Replace the short Extras cards with a searchable/filterable library of 12 named pathways: Coding and Digital Making; Sewing, Clothing and Textiles; Visual and Creative Arts; Agriculture and Agri-Tech; Solar and Green Skills; Electronics and Repair; Technical Drawing and Draftsmanship; Construction and Making; Entrepreneurship and Money Skills; Communication and Languages; Home Economics, Food and Nutrition; and Health, Safety and Citizenship.
- [x] For every researched pathway, show an age band, purpose, practical skills, safety boundaries, six sequenced starter sessions, learner outcome, low-cost activity, evidence to keep, source links, and a plain-English caveat that distinguishes official curriculum evidence from a teacher-designed optional club adaptation.
- [x] Let the teacher open a pathway detail view, add it to activity ideas, and load its six sessions into the selected class and term in the existing Planner; loading must keep sessions editable and add their topics to the Exam Builder.
- [x] Preserve local storage, encrypted backup/import, PWA behaviour, and print-friendly paper output after the navigation and Extras redesign.

## Explicit boundary before school-wide deployment

The signed-in browser still stores working records in user-scoped local storage. Use the encrypted backup option for portable protected copies, keep learner identifiers minimal, and do not treat browser local storage as a fully encrypted database. Full encrypted server-side storage, staff roles, and multi-device synchronization require the laptop/private-storage phase and a managed database design.

## Deliberately skipped

Claude project import is intentionally excluded from the current project scope at Eddy’s request.

## Added in the current continuation
- [x] Add a topic-source selector for taught/reviewed lessons, completed work, or all class topics.
- [x] Add a native multi-select topic dropdown for class-test and examination setup.
- [x] Add select-all and clear-topic controls for faster paper setup.
- [x] Generate a larger question pool and require teacher review before final selection.
- [x] Require the exact class-rule question count before applying a selected paper.
- [x] Preserve selected questions in the draft, answer key, marking notes, and print view.

## Added in the current continuation
- [x] Add a separate Energizers view for every class from KG2 through Basic 9/Form 3.
- [x] Add class, topic and duration filters.
- [x] Add 30 low-cost, offline-capable, curriculum-informed energizer activities.
- [x] Add teacher instruction, learner output, materials and safety guidance.
- [x] Keep energizers separate from examination generation and assessment records.

## Completed examination quality pass
- [x] Replace limited repeated/template generation with explicit profiles for all 54 dropdown topics.
- [x] Add 12 deterministic unique bank questions per topic.
- [x] Label question type, difficulty, marks, answer, and marking guidance.
- [x] Add teacher controls for Section A count, Section B count, difficulty, and question type.
- [x] Reject insufficient filtered banks instead of repeating questions.
- [x] Add exact-question answer keys and curriculum-document-level strand/sub-strand mapping.
- [x] Preserve a verification note instead of inventing official content-standard or indicator codes.

## Completed storage quality pass
- [x] Choose Google Drive for desktop as the practical cloud transport.
- [x] Add direct encrypted-save action for a user-selected Drive-synchronized folder.
- [x] Add safe manual-download fallback when the browser lacks folder access.
- [x] Add cloud-backup date, selected-folder status, and last-restore/import date.
- [x] Add a seven-day stale-backup warning.
- [x] Keep local-first operation and occasional external-drive backup guidance.
- [x] Avoid uploading readable learner records through the cloud-backup workflow.
