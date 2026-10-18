# Benni Teacher Assistant

A phone-friendly teacher desk for Eddy’s Ghana-focused examination and assessment preparation.

## Open it in Chrome or another browser

Use the live browser URL supplied in the task handoff. It opens the phone-friendly web app directly. On a phone, use the browser menu and choose **Add to Home screen** if you want an app-like shortcut.

## Authentication

- The app now uses **Manus OAuth** for sign-in.
- The sign-in page also supports the Manus account sign-up flow if the teacher does not yet have an account.
- Sessions use the fixed `webdev_app_session` cookie required by the Webdev Preview contract.
- OAuth state is bound to a short-lived, single-use nonce cookie.
- The server validates the signed session, checks the project identity and expiry, and provides logout.
- Security headers are sent by the server; OAuth and authentication endpoints are not cached by the service worker.
- No separate email/password system was added. This avoids storing teacher passwords in this first secure-auth phase.

## Phone app mode and cloud-storage path

The app is now an installable Progressive Web App. In Chrome on Android, use the app's **Install app** button when it appears, or choose **Add to Home screen** from the browser menu. On iPhone, use Safari's **Share → Add to Home Screen**. It opens in a standalone app-like window and remains useful offline.

The Storage area uses **Google Drive for desktop** as the cloud transport (see "Google Drive encrypted backup" below). The app writes password-protected encrypted backups into a Drive-synchronised folder, or downloads the same file for manual placement. Passwords are never entered into the app's setup form.

The desktop and phone use the **same responsive app and the same feature set**. However, this beta stores records separately in each browser. It does not automatically copy laptop records to the phone. To move the work, open **Backup** on the laptop, choose **Encrypted backup**, transfer the downloaded JSON privately, then open **Backup → Import backup** on the phone and enter the same backup password. Import replaces the phone’s current records, so back up both devices first if both contain work.

## New laptop layout and Extras library

On a laptop, the main options now sit in a vertical sidebar on the left: **Home, Exams, Planner, Work & Tests, Scorebook, Projects, Inspection, Extras, Storage, and Settings**. On a phone, the same options become a compact bottom navigation so that the working area stays readable.

Open **Extras** and use the search box or category filter. Each pathway now has:

1. a clear age band and purpose;
2. skills to build and safety boundaries;
3. six starter sessions with an outcome, activity, and evidence to keep;
4. curriculum or institutional source links; and
5. a plain-English note explaining that it is optional teacher-designed enrichment, not an official certificate or compulsory national subject.

Choose **View pathway** to read the details. Choose **Load six sessions into the Planner** only when the pathway fits the selected class and term. The sessions remain editable, and their topics become available to the Exam Builder.

## Current data boundary

The authentication layer protects access to the app session, but the existing teaching records are still stored locally in the signed-in browser using user-scoped local storage. This means Eddy should continue to use **Backup → Export backup** before clearing browser data or changing phones. Cloud persistence, encrypted server-side records, staff roles and school-wide sharing are the next phase and require a managed database/storage design.

## What works now

- Mobile-first dashboard for the selected class.
- 12-week lesson planner with outcome, activity, evidence, resource, and status fields; saved planner topics become available in the Exam Builder.
- Topic-first examination generation: choose one class topic from the dropdown and generate a paper immediately; common ICT foundation topics use topic-specific questions.
- Saturday ICT Foundations loader with six editable sessions covering ICT basics, data, input/output, desktop, files/folders, and safety.
- Settings workspace with warm light, midnight, and high-contrast themes; compact spacing; reduced motion; delete confirmations; backup access; install controls; and account/local-mode controls.
- Exam draft builder with the agreed KG2–Basic 9/Form 3 question rules.
- Draft question paper, answer key, marking notes, print view and saved drafts.
- Records for exercises, homework, assignments and class tests.
- Anonymous-ID scorebook with percentages and average.
- Project work tracker.
- Inspection view with editable working targets, evidence gaps, checklist and class coverage.
- Searchable Extras pathway library with 12 source-linked, teacher-designed starter curricula: coding/digital making; sewing/clothing/textiles; visual/creative arts; agriculture/agri-tech; solar/green skills; electronics/repair; technical drawing/draftsmanship; construction/making; entrepreneurship/money skills; communication/languages; home economics/food/nutrition; and health/safety/citizenship.
- Local browser saving, JSON backup/import and print styles.

If the Manus sign-in flow is unavailable in a particular Studio browser, choose **Continue in local mode** on the sign-in screen. This opens the app immediately on that device only; it does not create a protected cloud session or sync records.

## Important limitation

This is a school planning and assessment tool, not an official GES or NaCCA system. Inspection targets are editable planning targets, not official requirements. The teacher must verify questions against the approved curriculum, scheme of work and what was actually taught. Do not enter real sensitive learner information into public AI tools.

## Run locally

```bash
npm start
```

The app listens on port 3000. In the managed preview, the server receives the Manus OAuth environment variables automatically.

## Private beta publication

The production container sets `NODE_ENV=production`. In that mode, the local-mode bypass is hidden and the app requires Manus sign-in. Teaching records remain browser-local in this beta, so the same account on another device will not yet show the first device's records. Use encrypted backup until private laptop storage and multi-device synchronization are completed.

## Enhanced examination workflow
The examination builder now supports a guided teacher-review flow. Choose the class and assessment type, choose a topic source (taught/reviewed lessons, completed work, or all class topics), select one or more topics from a dropdown, generate a question pool, and choose the exact final questions before saving or printing. The class-specific question-count rules remain enforced, and every paper remains marked as a teacher-review draft.

## Class Energizers
The separate Energizers area covers KG2 through Basic 9/Form 3. The teacher chooses the class, topic and available duration, then opens an optional 10-, 20-, or 30-minute activity. Each activity includes instructions, learner output, materials and a safety reminder. The activities are teacher-designed and curriculum-informed; they are not formal examinations and do not alter examination records.

## Examination Builder quality pass
The examination builder now uses an explicit curriculum-topic profile for every dropdown topic. Each topic produces a deterministic bank of unique questions with a type, difficulty, marks, answer/marking guidance, and curriculum-document-level mapping. The teacher can choose Section A and Section B counts, difficulty, and question type. The builder stops instead of repeating questions when the selected filters do not contain enough unique items. The review screen shows type, difficulty, topic, strand/sub-strand, and exact question metadata; the paper answer key is linked to the selected question objects.

## Google Drive encrypted backup
The app remains local-first. The Storage screen now targets Google Drive for desktop rather than Nextcloud. The teacher selects a private Google Drive-synchronized folder in a supported browser, enters a backup password, and the app writes an encrypted JSON envelope into that folder. If direct folder access is unavailable, the app downloads the same encrypted file for manual placement in Drive. The app records the last cloud-backup date and last restore/import date and warns when the recorded cloud backup is older than seven days. Readable learner records are not uploaded by this workflow. Keep an occasional second encrypted backup on an external drive, but do not keep it connected during normal app use.
