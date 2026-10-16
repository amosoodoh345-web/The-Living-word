# The Living Word

A phone-first devotional app for Scripture, prayer, and personal reflection. It can be installed from a secure website as a Progressive Web App (PWA), and its bundled passages and saved personal content are available offline after the app has loaded once.

## Features

- Installable home-screen app experience on supported browsers
- Responsive phone, tablet, and desktop layouts
- Bible reading with translation selection and bundled passages
- Seven-session Life in the Spirit formation outline with locally saved progress
- Daily devotional prompts, prayer intentions, Holy Spirit novena, Rosary, and Divine Mercy Chaplet guides
- Ministries directory starter and searchable song/hymn metadata catalogue
- Private reflection journal, private testimony drafts, saved verses, and recent reading history
- Dark mode and offline app shell
- Personal preferences and notes saved locally on the device

## Pages

- `index.html` is the main React app. Its Bible, prayer, seminar, devotional, ministry, song, testimony, journal, and saved-content views use in-app navigation.
- `church.html` is the daily reflection and Bible navigator page.
- `Bible.html` is the standalone Bible library.
- `genesis-1.html` is the standalone Genesis 1 reading page.
- `Life in the spirit.html` is the standalone devotional guide.
- `reflection.html` is the standalone daily reflection page.

Vite is configured to include all six HTML files in the production build. The legacy standalone pages are preserved alongside the React app.

## Run on your computer

Install [Node.js](https://nodejs.org/) first, then open a terminal in this folder and run:

```bash
npm install
npm run dev -- --host 0.0.0.0 --port 4173
```

Open `http://localhost:4173` in your browser. To check the production build:

```bash
npm run build
npm run preview -- --host 0.0.0.0 --port 4173
```

The production files are generated in `dist`.

## Install on a phone

To install it on a phone, publish the production build (`dist`) to a static web host that serves the app over HTTPS. Open that HTTPS link on the phone and select **Install app** or **Add to Home Screen** in the browser. A project folder on its own is not a phone installer (APK); this PWA install flow is the downloadable, home-screen version.

After opening the installed app online once, the app shell and bundled content can load offline. Browser storage is device-specific; notes and saved verses do not sync between devices.

## Scripture content note

The reader includes a 73-book catalog and loads chapters on demand from bible-api.com when a passage is not bundled locally. Successfully loaded chapters are cached on the device for later offline reading. An internet connection is required the first time a chapter is opened; offline availability grows as chapters are read. Translation and source availability can vary by passage.

## Launch readiness and content boundaries

- Seminar and devotional materials in this project are original learning aids and drafts. They have not been reviewed or approved as official Catholic formation. Obtain pastoral review before presenting them as parish or diocesan teaching.
- The prayer pages provide devotional prompts and sequence guides; they do not reproduce complete liturgical prayer texts.
- The song catalogue contains titles and creator metadata only. It does not include lyrics or recordings. Verify rights for each translation, arrangement, recording, and intended distribution before adding media.
- Seminar progress, journal entries, and testimony drafts are stored in the current browser only. Testimony drafts are private and are not submitted or visible to other users.
- Public community features still require a hosted backend, authentication and authorization, privacy and retention policies, moderation, and a reporting process. Do not treat the private draft form as a public testimony service.
- Public release still requires an HTTPS deployment target, production configuration, review of Scripture/content licenses, and testing on supported devices and browsers.

## Supabase community setup

The testimony page supports an optional Supabase-backed community feed. Without real project configuration and both database migrations, the app continues to build and only the private local-draft feature is available. `.env.local` is ignored by Git; replace template values locally and never commit credentials.

1. Create a Supabase project.
2. Copy `.env.example` to `.env.local` and set `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` using the project URL and browser-safe anon/publishable key. Do not put a service-role key in a `VITE_` variable or in client code.
3. Apply both migrations in order using the Supabase SQL Editor or Supabase CLI: `202610160001_create_testimonies.sql`, then `202610160002_moderation_workflow.sql`.
4. Configure Supabase Auth email confirmation and add the local and production app URLs to the Auth redirect allowlist. Create and confirm the account that will be the first moderator.
5. In the Supabase SQL Editor, replace the placeholder email and grant that confirmed account moderator access. Run this only as a trusted project owner:

	```sql
	insert into public.moderators (user_id)
	select id from auth.users where email = 'MODERATOR_EMAIL'
	on conflict (user_id) do nothing;
	```

6. Sign in with the moderator account. The in-app queue will show pending submissions and reports. Approvals, rejections, and report resolutions are restricted by database RLS; ordinary signed-in users cannot grant themselves moderator status.
7. Set the same two public client variables in the hosting provider's build environment, then rebuild and deploy the app over HTTPS.

The app never needs a Supabase service-role key. RLS is required even when the UI hides an action. Before enabling public registration, decide account recovery, privacy/retention terms, moderation response times, abuse handling, and signup rate limits/CAPTCHA. No live Supabase project is connected from this repository yet.
