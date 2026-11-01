# LIFEOS — The Living Word

## 1. Project introduction

LIFEOS — The Living Word is an existing Christian Bible, devotional, spiritual-growth, and community web application. It combines a React-based single-page app with standalone HTML reading pages, local-first personal tools, and optional Supabase-backed community publishing.

The project is intended to make Scripture reading, reflection, prayer, and formation resources accessible from desktop and mobile browsers, including as an installable Progressive Web App (PWA).

## 2. Problem statement

People seeking a consistent Scripture and prayer practice often use separate tools for Bible reading, devotional reflection, personal notes, reminders, and community sharing. LIFEOS brings these activities together while keeping personal reading and reflection data on the user's device.

## 3. Project objectives

- Provide a searchable Bible library and useful reading controls.
- Offer daily devotional, wisdom, prayer, and seminar resources.
- Let users keep personal reading history, saved verses, journal notes, and practice progress locally.
- Support configurable weekly reminders, with clear browser-delivery limitations.
- Support moderated community testimonies, comments, and reports through Supabase.
- Preserve a responsive, installable web experience without introducing an unnecessary backend service.

## 4. Main features

### Bible reading and navigation

- The catalog lists 73 books and supports testament filtering and book search.
- The reader offers KJV, WEB, and BBE selections, chapter and verse navigation, in-chapter search, text sizing, prose/cards modes, copy, speech playback, and links into a passage from other features.
- Passages are resolved from an in-memory cache, browser `localStorage`, bundled passages, or `bible-api.com`, in that order. Network-loaded chapters are cached on the device. A passage/version not bundled or cached requires connectivity on first access; unavailable translations are not silently substituted.
- The standalone library and Genesis 1 pages remain available alongside the React reader.

### Daily devotional system

The React app rotates through the bundled devotional collection in `src/data/lifeosContent.js` and `src/data/extraDevotionals.js`. The selected item is calculated from the user's local calendar date, so it remains stable throughout the local day. Each entry contains an original reflection, a Scripture reference, and a prompt; it is not presented as a Bible quotation or official Church teaching.

### Bible reading history

The app stores up to eight recent verse references in browser storage and presents them with saved verses. History is recorded after an explicit reading action, not merely because the default Bible passage loaded at application startup. History is device/browser-specific and is not synchronized to Supabase.

### Personal journal

Users can write dated reflection entries, start a draft from a Bible verse or devotional, review saved entries, and delete entries. Journal content is stored in browser `localStorage`; it is not encrypted or synchronized across devices. The app does not currently provide journal account sync or a server-side backup.

### Favorite Scriptures

Users can save and remove verses, then reopen them from the saved-content view. Favorite records are stored in browser `localStorage`. Favorites are not synchronized, and the saved record does not distinguish the translation.

### Prayer and Bible study reminders

Three weekly reminders are provided by default: Monday and Saturday prayer meetings and Wednesday Bible study, at 6:30 PM local device time. Users can enable or disable them and change their times. Settings and delivery markers use browser `localStorage`.

Browser notifications are best-effort while the website or installed PWA is open and able to run. Background timer throttling can delay or miss a reminder, and the current web implementation cannot guarantee delivery after the website has closed. Closed-app web reminders would require a push service and server-side scheduler.

### Wisdom Readings

The app includes 75 original reflection notes: 25 each associated with Proverbs, Ecclesiastes, and Psalms. Users can filter by book, search the notes, and open the Scripture references in the Bible reader. The notes are bundled content and do not have saved progress.

### Life in the Spirit seminar

The project contains a seven-session original formation outline, including Scripture references, reflection questions, and session details. Completion progress is stored locally. The materials are drafts and have not been approved as official Catholic formation; pastoral review is needed before parish or diocesan use.

### Other prayer and reflection pages

Existing pages include daily prayer intentions, a Holy Spirit novena, Rosary and Divine Mercy Chaplet guides, an encouragement library, a daily reflection page, a ministries directory, and a song/hymn metadata catalogue. The catalogue does not include song lyrics or recordings.

### Community testimonies, comments, and reports

The testimony page supports account sign-in, submission of testimonies and praise reports for review, display of approved stories, comments subject to moderation, and reports on approved stories. User submissions are pending until a moderator approves them. Private testimony drafts are a separate device-local feature.

The current testimony page includes account creation and sign-in controls. This is existing functionality; this work did not add another registration or login flow. Whether new accounts can actually register also depends on the Supabase Auth project settings.

### Admin access and moderation

`src/AdminAccess.jsx` restores a Supabase session and calls the `is_moderator()` database function before showing the admin dashboard. An account that fails the moderator check is signed out and denied the admin view. The database policies—not client-side visibility—must remain the authorization boundary.

The admin dashboard includes community statistics and testimony search/status filtering with approve/reject actions. Its dedicated Comments, Reports, and Settings tabs are placeholders. The current testimony page contains the operative pending-comment and open-report moderation queues, including report resolution.

Although the database policies permit authors to delete their own pending content, the current user interface does not expose delete controls for submitted community testimonies or comments. The privacy policy must not promise an in-app deletion control that is not present.

## 5. Technology stack

- React 18 and React DOM
- Vite 5 and `@vitejs/plugin-react`
- JavaScript ES modules and CSS
- `@supabase/supabase-js` for browser-side authentication and database access
- Node.js built-in test runner for unit tests
- Browser APIs for local storage, notifications, speech synthesis, sharing, and PWA installation
- A service worker and web manifest for install/offline support

The repository does not contain a separate application server. Supabase supplies the optional authentication and database services. Bible passages not available locally may be fetched from `bible-api.com`.

## 6. Frontend architecture

- `index.html` mounts the React application.
- `src/main.jsx` mounts `src/App.jsx`, imports global styles, and registers the service worker for production builds.
- `src/App.jsx` owns page routing, Bible-reader state, local user state, and shared navigation.
- `src/HomeDashboard.jsx`, `src/LifeOSPages.jsx`, `src/RemindersPage.jsx`, `src/ProfilePage.jsx`, and `src/SpiritualGrowthPage.jsx` implement the primary feature views.
- `src/data/` contains bundled Bible, devotional, prayer, seminar, and wisdom content.
- `src/lib/` contains focused local-data and calculation helpers, including the Bible, devotional-date, reading-history, reminder, and spiritual-growth logic.
- `public/` contains PWA assets, the service worker, and shared navigation styling.
- `vite.config.js` includes the React app and standalone HTML pages in the multi-page production build.
- `LIFEOS_ARCHIVE/` contains preserved legacy project material and is not the active React entry point.

## 7. Supabase integration and database structure

The Supabase client is created in `src/lib/supabase.js` only when both `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` are available. The anon/publishable key is intended for browser use and is not a substitute for database policies. The frontend does not need or use a service-role key.

The repository's ordered migrations define:

| Table | Purpose and principal data |
|---|---|
| `public.testimonies` | Author ID, title, body, category, moderation status, and timestamps. |
| `public.testimony_comments` | Parent testimony, author ID, comment body, moderation status, and timestamps. |
| `public.testimony_reports` | Reported testimony, reporter ID, reason, open/resolved status, resolver, and resolution time. |
| `public.moderators` | User IDs that are authorized to moderate. |

Migration files:

1. `supabase/migrations/202610160001_create_testimonies.sql`
2. `supabase/migrations/202610160002_moderation_workflow.sql`
3. `supabase/migrations/202610160003_testimony_comments.sql`
4. `supabase/migrations/202611010004_complete_report_moderation.sql`

### Security and Row Level Security (RLS)

The checked-in migrations enable RLS for the testimony, comment, report, and moderator tables. The policy model in the migration source is designed so that:

- Anonymous and authenticated readers can read approved testimonies and approved comments on approved testimonies.
- Authors can read their own submissions/comments and can edit or delete only their own pending content.
- Authenticated users can submit pending testimonies/comments and report approved testimonies under author-identity checks.
- Reporters can read their own reports; moderators can read reports and change their resolution state.
- Moderator-only review/status changes are gated by `public.is_moderator()`. The moderator table is not directly granted to ordinary clients, and the function's execution grants are limited to authenticated users.

This is a review of repository migration source, not a live database inspection or penetration test. The repository cannot prove which migrations are applied to a hosted Supabase project or whether its current policies match these files. Verify the migration history, RLS status, policies, Auth settings, and moderator account in the correct Supabase project before production. Do not disable RLS to work around an access issue.

### Security review notes

- The source reads the browser-safe URL and anon key from environment variables.
- No service-role/secret-key reference was found in the active frontend source or migrations during this review.
- `.env.local` is ignored by Git and was not read; do not commit it.
- Community sign-up controls already exist in `TestimoniesPage`. Confirm whether public account registration is intended and configure Supabase Auth accordingly before launch.
- The `comments`, `reports`, and `settings` areas in the separate admin dashboard are currently placeholders; moderation of those items is handled in the testimony page.

## 8. Environment configuration

Copy `.env.example` to `.env.local` for local development and set:

```dotenv
VITE_SUPABASE_URL=
VITE_SUPABASE_ANON_KEY=
```

Use the project URL and browser-safe anon/publishable key only. Never put a service-role key or other privileged secret in a `VITE_` variable, frontend source, documentation, or Git. `.env.local` is excluded by `.gitignore`.

Without these public client settings, the local-first Bible, journal, favorites, devotional, reminder, and other personal features remain available, but Supabase-backed community features cannot connect.

## 9. Installation and development

Requirements: a supported Node.js release and npm.

```powershell
npm install
npm run dev
```

Open the local URL printed by Vite (default: `http://localhost:5173/`).

Build and preview:

```powershell
npm run build
npm run preview
```

The production output is generated in `dist/`. The project has no separate backend server to start.

## 10. Testing and verification

Run the unit tests:

```powershell
npm test
```

The configured Node test suite covers daily Scripture selection, local-day devotional rotation, explicit reading-history intent, reminders, and spiritual-growth calculations.

Production build:

```powershell
npm run build
```

Before a submission commit, also run:

```powershell
git diff --check
git status --short
git diff --cached --check
```

Browser smoke testing should cover the React routes, standalone HTML pages, responsive widths, key navigation, and representative local data interactions. Supabase moderation requires a configured test project/account; do not perform destructive tests against production.

## 11. GitHub workflow

1. Inspect the active branch and both staged and unstaged diffs.
2. Confirm secrets, local environment files, and generated build output are not staged.
3. Run unit tests, the production build, and diff checks.
4. Stage only reviewed files and commit with a clear message.
5. Push to the intended remote/branch without force-pushing.

This documentation does not create, commit, or push a change.

## 12. Vercel deployment

For the existing Vite app, configure the Vercel build command as `npm run build` and the output directory as `dist`. Add `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` in Vercel project settings for the intended build environments. Apply and verify the database migrations separately, configure Auth redirects, ensure a moderator is assigned, and deploy over HTTPS.

The repository contains no evidence that a Vercel deployment has been completed. Do not treat a successful local build as proof of deployment or live database readiness.

## 13. Current limitations and release checklist

- Most personal data is device-local browser storage: it does not sync, is not encrypted by the app, and may be removed by the browser or device.
- Bible text coverage depends on bundled passages, prior cache, and third-party API/version availability.
- Browser notifications cannot guarantee reminders after the app is closed.
- The app does not include cross-device accounts for personal content, journal backup, payments, or premium access.
- The admin dashboard's dedicated comments, reports, and settings views are unfinished placeholders.
- The community user interface does not currently expose account deletion or deletion controls for submitted testimonies/comments; provide and document a support-based request process before public launch.
- The privacy policy at `privacy.html` is a draft and still contains a contact placeholder. Replace it and obtain appropriate review before public launch.
- Confirm Scripture/content licensing, pastoral review of formation materials, production Supabase migrations/RLS/Auth configuration, privacy/retention rules, and mobile/browser support before release.
- `capacitor.config.json` is preparation only; Capacitor Android dependencies/platform packaging are not installed or verified.

## 14. Future improvements

Possible future work, subject to product approval, includes completing the admin comments/report queue, reviewing the community registration policy, adding secure personal-data export/backup, expanding automated browser tests, improving Bible offline downloads, and implementing reliable scheduled push notifications. These are recommendations, not features currently claimed by LIFEOS.
