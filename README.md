# Moffee site
Free static site for the Moffee app (free, ad-supported counter order app for cafés, restaurants and shops) (GitHub Pages, served from `docs/` on `main`): intro, tester join, privacy policy, account deletion, in 5 languages (th, en, ko, zh, hi), plus the two JSON files the app reads (`docs/app/version.json`, `docs/app/content.json`).
- Build: `node scripts/build.mjs` (sources in `src/`, settings in `config/site.json`) · Test: `node tests/site.test.mjs`
- Update notice for the app: edit `src/app/version.json` (raise `latestVersionCode` only after the new build is live on Google Play), rebuild, commit, push.
- Look: v2.x design system (blue #2563eb, light/dark via `prefers-color-scheme`), icon 'Arch m' (`src/assets/icon.svg`, `scripts/icon-full.svg`), screenshots from the app's `docs/screenshots/v2.0/`. Share card + PNG icons: `node scripts/make-og.mjs` (needs playwright-core + Chrome).
- `docs-promo/` = recruiting copy and screenshots for MOTOR AA's Facebook post/hub card; not part of the site (only `docs/` is served).
- Model (owner, 2026-11-02): FREE; small banner ads ONLY after the official Play release (never full-screen/covering the screen); NO ads during development and testing (incl. the closed test). No subscription/paid copy. Don't claim the app is ad-free; the tests grep for that ("No ads during testing" is the allowed phrase).
- Licences: see `LICENSES.md`. Contact: motoraathailand@gmail.com
