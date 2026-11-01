# Third-party licences (moffee-site)
- Icons: Lucide (https://lucide.dev), ISC licence; a few icons derive from Feather (MIT). Inlined as SVG in `scripts/build.mjs`. Licence text: https://github.com/lucide-icons/lucide/blob/main/LICENSE
- Fonts (IBM Plex Sans, IBM Plex Sans Thai): SIL Open Font License 1.1, files in `src/assets/fonts`.
- Motion CSS/JS: own code (shared AA motion standard).

# App update files (read by the Moffee app)
- `docs/app/version.json` → `{ "latestVersionCode": N, "latestVersionName": "x.y" }`. Raise ONLY after that build is live on Google Play (the app shows "Update now" when N is above its own versionCode).
- `docs/app/content.json` → `{ "notices": [...], "changelog": [...] }` extra notices / changelog entries (merged with the ones bundled in the app by `id`). Edit `src/app/*.json`, run `node scripts/build.mjs`, commit, push.
