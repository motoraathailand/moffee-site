# Moffee site
Free static site for the Moffee cafe app (GitHub Pages, served from `docs/` on `main`): intro, tester join, privacy policy, account deletion, in 5 languages (th, en, ko, zh, hi), plus the two JSON files the app reads (`docs/app/version.json`, `docs/app/content.json`).
- Build: `node scripts/build.mjs` (sources in `src/`, settings in `config/site.json`) · Test: `node tests/site.test.mjs`
- Update notice for the app: edit `src/app/version.json` (raise `latestVersionCode` only after the new build is live on Google Play), rebuild, commit, push.
- Licences: see `LICENSES.md`. Contact: motoraathailand@gmail.com
