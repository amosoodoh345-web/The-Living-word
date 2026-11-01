# LIFEOS — The Living Word

LIFEOS — The Living Word is a Scripture, devotional, spiritual growth, and community application. The existing project combines a React single-page app, standalone HTML reading pages, local-first personal tools, and optional Supabase-backed community features. The web app can be installed as a Progressive Web App (PWA) on supported browsers.

For the full project report, architecture, data model, security notes, and submission limitations, see [LIFEOS_PROJECT_DOCUMENTATION.md](./LIFEOS_PROJECT_DOCUMENTATION.md).

## Features

- Installable home-screen app experience on supported browsers
- Responsive mobile-first layouts with scrollable small-screen navigation and large touch targets
- Bible reading with KJV, WEB, and BBE selection; the reader does not silently substitute translations
- Seven-session Life in the Spirit formation outline with locally saved progress
- Editable weekly prayer meeting and Bible study reminders, plus a simple personal practice tracker
- Daily devotional prompts, prayer intentions, Holy Spirit novena, Rosary, and Divine Mercy Chaplet guides
- Searchable set of 75 original wisdom reflections linked to Proverbs, Ecclesiastes, and Psalms
- Ministries directory starter and searchable song/hymn metadata catalogue
- Personal reflection journal, standalone daily reflection page, private testimony drafts, saved verses, and recent reading history
- St Paul preaching artwork in the Bible, seminar, and daily reflection heroes (Wikimedia Commons, public domain)
- Dark mode and offline app shell
- Personal preferences, reminder settings, growth check-ins, and notes saved locally on the device

The community testimony page currently includes account creation and sign-in controls for community submissions. The separate admin route requires moderator authorization; these are distinct flows.
## Launch readiness and content boundaries

- Seminar and devotional materials in this project are original learning aids and drafts. They have not been reviewed or approved as official Catholic formation. Obtain pastoral review before presenting them as parish or diocesan teaching.
- The prayer pages provide devotional prompts and sequence guides; they do not reproduce complete liturgical prayer texts.
- The song catalogue contains titles and creator metadata only. It does not include lyrics or recordings. Verify rights for each translation, arrangement, recording, and intended distribution before adding media.
- Seminar progress, journal entries, reading history, saved verses, reminders, growth check-ins, and private testimony drafts are stored in the current browser only.
- Community publishing uses Supabase authentication and database migrations. New testimony and comment submissions remain pending until moderator approval; approved content is public.
- Public release still requires an HTTPS deployment target, production configuration, review of Scripture/content licenses, and testing on supported devices and browsers.
## Pages

- `index.html` is the main React app. Its Bible, prayer, seminar, devotional, reminder, growth, ministry, song, testimony, journal, and saved-content views use in-app navigation.
- `church.html` is the daily reflection and Bible navigator page.
- `Bible.html` is the standalone Bible library.
- `genesis-1.html` is the standalone Genesis 1 reading page.
- `Life in the spirit.html` is the standalone devotional guide.
- `reflection.html` is the standalone daily reflection page.
- `privacy.html` is a draft privacy policy (replace the contact placeholder before publishing).

## Android packaging (Capacitor) - preparation

`capacitor.config.json` is prepared with a placeholder appId; set your final package ID before publishing, because it cannot change after release. Remaining steps, on a machine with Android Studio:

1. `npm i @capacitor/core @capacitor/cli @capacitor/android`
2. `npm run build`, then `npx cap add android` and `npx cap sync`
3. Set versionCode/versionName, create an upload keystore (keep it out of git), build an AAB.
4. Before Play submission: host the privacy policy, complete the Data Safety form, provide an account-deletion path for testimony accounts, compress `public/st-paul-preaching-athens.png` and the spirit icons, and obtain pastoral review of seminar and prayer content.

`npm test` runs the Node.js unit tests in `src/lib`.

Vite is configured to include the main React entry and the standalone HTML pages in the production build. The standalone pages are preserved alongside the React app.

### Home dashboard and navigation

The home page (`src/HomeDashboard.jsx`) is a mobile-first dashboard: verse of the day (rotating curated KJV passages, loaded from the Bible library), weekly reminder card with countdown, the seven seminar sessions with progress, devotional, shortcuts, and an informational "coming later" premium card. The mobile bottom bar is Home, Bible, Learn (the Explore page), Prayer, and Profile (`src/ProfilePage.jsx`, settings and library). The premium card is informational only; no payment system exists and every feature remains free.

## Run on your computer

Install [Node.js](https://nodejs.org/) first, then open a terminal in this folder and run:

```bash
npm install
npm run dev -- --host 0.0.0.0 --port 4173
```

Open `http://localhost:4173` in your browser. Vite's development server defaults to port `5173`; the command above overrides it to `4173`. To check the production build:

```bash
npm run build
npm run preview -- --host 0.0.0.0 --port 4173
```

The production files are generated in `dist`.

## Install on a phone

To install it on a phone, publish the production build (`dist`) to a static web host that serves the app over HTTPS. Open that HTTPS link on the phone and select **Install app** or **Add to Home Screen** in the browser. A project folder on its own is not a phone installer (APK); this PWA install flow is the downloadable, home-screen version.

After opening the installed app online once, the app shell and bundled content can load offline. Browser storage is device-specific; notes and saved verses do not sync between devices.

## Reminders and future mobile support

The default local schedule is Monday and Saturday at 6:30 PM for Prayer Meeting, and Wednesday at 6:30 PM for Bible Study. Times use the device's local timezone (West Africa Time for devices set to Nigeria). Reminder settings and basic Scripture/prayer/reflection check-ins are stored locally and are not synced.

Browser reminders are best-effort while the website or installed PWA is open. Browsers can throttle background tabs, and JavaScript timers cannot deliver a reminder after the website has closed. Reliable closed-site web reminders would need Web Push and a server-side scheduler. The future Android direction is Capacitor with OS-scheduled local notifications; Capacitor has not been added yet.

This release does not implement premium access, payments, or subscriptions. For future Nigeria-first website purchases, Paystack can be evaluated with payment verification performed on a trusted server. Digital purchases in a Play Store Android app must follow Google Play's billing policies; Google Play Billing is the planned Android route. Neither payment route is wired in this project.

## Scripture content note

The reader includes a 73-book catalog and loads chapters on demand from bible-api.com when a passage is not bundled locally. Supported selections are KJV, WEB, and BBE. Each selected translation is requested and cached separately; if the source does not return that version, the reader shows an error instead of substituting KJV. An internet connection is required the first time a chapter is opened; offline availability grows as chapters are read. Translation and source availability can vary by passage.

## Supabase community setup

The testimony page supports a Supabase-backed community feed, reviewed submissions, moderated comments, and reports. The repository contains four ordered SQL migrations. Their presence does not prove they have been applied to the configured Supabase project; verify the live project before enabling community features. `.env.local` is ignored by Git; keep project configuration local and never commit privileged credentials.

1. Create a Supabase project.
2. Copy `.env.example` to `.env.local` and set `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` using the project URL and browser-safe anon/publishable key. Do not put a service-role key in a `VITE_` variable or in client code.
3. Apply all four migrations in order using the Supabase SQL Editor or Supabase CLI: `202610160001_create_testimonies.sql`, `202610160002_moderation_workflow.sql`, `202610160003_testimony_comments.sql`, then `202611010004_complete_report_moderation.sql`.
4. Configure Supabase Auth email confirmation and add the local and production app URLs to the Auth redirect allowlist. Create and confirm the account that will be the first moderator.
5. In the Supabase SQL Editor, replace the placeholder email and grant that confirmed account moderator access. Run this only as a trusted project owner:

	```sql
	insert into public.moderators (user_id)
	select id from auth.users where email = 'MODERATOR_EMAIL'
	on conflict (user_id) do nothing;
	```

6. Sign in with the moderator account. The testimony page contains the pending-story, comment, and report moderation queues. The separate admin dashboard's comments, reports, and settings tabs are placeholders; the testimony-management tab supports testimony review. Database RLS policies are the security boundary, not the visibility of UI controls.
7. Set the same two public client variables in the hosting provider's build environment, then rebuild and deploy the app over HTTPS.

The frontend must never use a Supabase service-role key. RLS is required even when the UI hides an action. The testimony page currently includes account creation and sign-in controls; actual registration availability also depends on Supabase Auth settings. Review privacy/retention terms, moderation response times, abuse handling, and account-recovery procedures before public release.

## Vercel deployment

Create or import the existing repository as a Vite project in Vercel. Use `npm run build` as the build command and `dist` as the output directory. Set `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` in the Vercel project's environment settings for the intended deployment environments, then deploy over HTTPS. Do not copy `.env.local` into the repository or use a service-role key in frontend configuration. The repository does not contain evidence that a Vercel deployment has been completed.

## Git workflow

Before creating a release commit, inspect `git status`, review the staged diff, run `npm test`, `npm run build`, and `git diff --check`. Never stage `.env.local`, credentials, generated `dist` output, or unrelated files. Push only the reviewed commit to the intended branch; do not force-push.
