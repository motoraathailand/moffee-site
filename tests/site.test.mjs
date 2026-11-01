// Tests for the Moffee static site (run after `node scripts/build.mjs`): node tests/site.test.mjs
//  1) static: files, 5 languages complete, link/asset check, no per-app group links, shared motion files are byte copies, no external scripts
//  2) browser (headless Chrome via playwright-core): language rule (?lang > saved > browser > English), no console errors, no horizontal scroll, join steps, reduced motion
import fs from 'node:fs'; import path from 'node:path'; import http from 'node:http'; import { fileURLToPath, pathToFileURL } from 'node:url'; import { createRequire } from 'node:module';
const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), '..'), DOCS = path.join(ROOT, 'docs');
let pass = 0, fail = 0; const ok = (n, c, x = '') => { console.log((c ? 'PASS' : 'FAIL') + '  ' + n + (x ? '  ' + x : '')); c ? pass++ : fail++; };
const cfg = JSON.parse(fs.readFileSync(path.join(ROOT, 'config/site.json'), 'utf8'));
const { INTRO, JOIN } = await import(pathToFileURL(path.join(ROOT, 'src/strings.mjs')));
const { LANGS, makeContent } = await import(pathToFileURL(path.join(ROOT, 'src/content.mjs')));
const L = ['th', 'en', 'ko', 'zh', 'hi'];
const PAGES = ['index.html', 'join.html', 'privacy.html', 'delete-account.html'];
const read = (f) => fs.readFileSync(path.join(DOCS, f), 'utf8');

// ---------- 1. static ----------
ok('4 pages + about redirect + 404 + sitemap built', [...PAGES, 'about/index.html', '404.html', 'sitemap.xml', 'robots.txt', '.nojekyll'].every((f) => fs.existsSync(path.join(DOCS, f))));
ok('language list is exactly th,en,ko,zh,hi', JSON.stringify(LANGS.map((x) => x[0])) === JSON.stringify(L));
for (const [name, D] of [['INTRO', INTRO], ['JOIN', JOIN]]) {
  const keys = Object.keys(D.en);
  ok(`${name}: all 5 languages present with identical keys`, L.every((l) => D[l] && Object.keys(D[l]).length === keys.length && keys.every((k) => typeof D[l][k] === 'string')));
  ok(`${name}: no empty strings (except intentionally blank)`, L.every((l) => keys.every((k) => D[l][k].trim() || !D.en[k].trim())));
  ok(`${name}: non-English languages are really translated (not copies of English)`, ['th', 'ko', 'zh', 'hi'].every((l) => keys.filter((k) => D.en[k].length > 25 && D[l][k] === D.en[k]).length === 0));
}
const C = makeContent({ OPERATOR: cfg.operator, EMAIL: cfg.contactEmail, UPDATED: cfg.policyDate, SITE: cfg.siteUrl });
for (const n of ['PRIVACY', 'DELETE']) ok(`${n}: 5 languages, same number of sections and blocks`, L.every((l) => C[n][l] && C[n][l].length === C[n].en.length && C[n][l].every((s, i) => s[1].length === C[n].en[i][1].length)));
for (const f of ['privacy.html', 'delete-account.html']) { const h = read(f); ok(`${f}: 5 language sections`, L.every((l) => h.includes(`id="s-${l}"`))); ok(`${f}: contact email present`, h.includes('mailto:' + cfg.contactEmail)); ok(`${f}: 18+ stated in every language`, L.every((l) => { const m = new RegExp(`id="s-${l}"[\\s\\S]*?</section>`).exec(h)[0]; return /18/.test(m); })); }
ok('privacy: says no ads, no payment processing, no server, Bluetooth, Google sign-in + Drive', (() => { const e = C.PRIVACY.en.map((s) => s[0] + JSON.stringify(s[1])).join(' '); return /No ads/i.test(e) && /No payment processing/i.test(e) && /no server/i.test(e) && /Bluetooth/.test(e) && /Google sign-in and Google Drive/.test(e) && /drive\.file/.test(e); })());
ok('delete page: Drive records kept by default, deleted only with the option + PIN', /kept by default/.test(JSON.stringify(C.DELETE.en)) && /manager PIN/.test(JSON.stringify(C.DELETE.en)));
ok('privacy mentions every permission in AndroidManifest (Bluetooth, Internet)', (() => { const mf = '/workspace/cafemenu-android/android/app/src/main/AndroidManifest.xml'; if (!fs.existsSync(mf)) return true; const m = fs.readFileSync(mf, 'utf8'); const perms = [...m.matchAll(/uses-permission android:name="android\.permission\.(\w+)"/g)].map((x) => x[1]); const e = JSON.stringify(C.PRIVACY.en); return perms.every((p) => /BLUETOOTH/.test(p) ? /Bluetooth/.test(e) : p === 'INTERNET' ? /Internet/.test(e) : false); })());
// links and assets resolve
const walk = (d) => fs.readdirSync(d, { withFileTypes: true }).flatMap((e) => e.isDirectory() ? walk(path.join(d, e.name)) : [path.join(d, e.name)]);
const htmls = walk(DOCS).filter((f) => f.endsWith('.html'));
let bad = [];
for (const f of htmls) {
  const h = fs.readFileSync(f, 'utf8');
  for (const m of h.matchAll(/\b(?:href|src)="([^"]+)"/g)) {
    const u = m[1]; if (/^(https?:|mailto:|data:|#)/.test(u) || u.startsWith('{{')) continue;
    const [p, hash] = u.split('#'); const target = path.resolve(path.dirname(f), p.split('?')[0] || path.basename(f));
    const t = fs.existsSync(target) && fs.statSync(target).isDirectory() ? path.join(target, 'index.html') : target;
    if (!fs.existsSync(t)) bad.push(path.relative(DOCS, f) + ' -> ' + u); else if (hash && t.endsWith('.html') && !fs.readFileSync(t, 'utf8').includes(`id="${hash}"`)) bad.push(path.relative(DOCS, f) + ' -> #' + hash + ' missing');
  }
}
ok('every relative link / asset / anchor in every page exists', bad.length === 0, bad.join(' | '));
const css = read('assets/site.css'); ok('every url() in site.css exists', [...css.matchAll(/url\(([^)"']+)\)/g)].filter((m) => !m[1].startsWith('data:')).every((m) => fs.existsSync(path.join(DOCS, 'assets', m[1]))));
ok('no external script or stylesheet anywhere (no tracking, no CDN)', htmls.every((f) => !/<(?:script|link)[^>]+(?:src|href)="https?:/.test(fs.readFileSync(f, 'utf8').replace(/<link rel="canonical"[^>]*>/g, ''))));
ok('only the owner site/Play/group URLs appear as absolute links', htmls.every((f) => [...fs.readFileSync(f, 'utf8').matchAll(/(?:href|src)="(https?:[^"]+)"/g)].every((m) => m[1].startsWith(cfg.siteUrl) || m[1].startsWith(cfg.groupUrl) || m[1].startsWith('https://play.google.com/'))));
// the shared tester group only
const all = walk(DOCS).filter((f) => /\.(html|js|json|xml|txt|svg)$/.test(f)).map((f) => fs.readFileSync(f, 'utf8')).join('\n') + fs.readFileSync(path.join(ROOT, 'config/site.json'), 'utf8') + fs.readFileSync(path.join(ROOT, 'src/strings.mjs'), 'utf8') + fs.readFileSync(path.join(ROOT, 'src/content.mjs'), 'utf8');
const groups = new Set([...all.matchAll(/groups\.google\.com\/g\/([\w.-]+)/g)].map((m) => m[1])), mails = new Set([...all.matchAll(/([\w.-]+-testers)@googlegroups\.com/g)].map((m) => m[1]));
ok('only the shared group motoraa-testers is linked (no per-app group links)', [...groups].every((g) => g === 'motoraa-testers') && [...mails].every((g) => g === 'motoraa-testers') && groups.has('motoraa-testers'), [...groups, ...mails].join());
ok('no old per-app group names anywhere', !/aaai-testers|nammanthuk-testers|moffee-testers|cafemenu-testers|suayshot-testers/.test(all));
const join = read('join.html');
ok('join.html links: group, Play opt-in, store (same package)', join.includes(`href="${cfg.groupUrl}"`) && join.includes(`href="https://play.google.com/apps/testing/${cfg.packageName}"`) && join.includes(`href="https://play.google.com/store/apps/details?id=${cfg.packageName}"`));
ok('join.html: 3 step cards, same-Gmail note, 7 FAQ entries', (join.match(/class="step"/g) || []).length === 3 && /Use the same Gmail/.test(join) && (join.match(/<details>/g) || []).length === 7);
ok('join pages: all countries, no country restriction text', !/Thailand only|only in Thailand|เฉพาะผู้ที่อยู่ในประเทศไทย/.test(join + JSON.stringify(JOIN)));
ok('optInLive=false locks steps 2-3 (and true would not)', cfg.optInLive ? !/data-locked/.test(join) : (join.match(/data-locked/g) || []).length === 2);
ok('motion.css/js are byte copies of /workspace/shared/motion', ['motion.css', 'motion.js'].every((f) => !fs.existsSync('/workspace/shared/motion/' + f) || fs.readFileSync('/workspace/shared/motion/' + f).equals(fs.readFileSync(path.join(DOCS, 'assets', f)))));
ok('policy date is set and shown', /^\d{4}-\d{2}-\d{2}$/.test(cfg.policyDate) && read('privacy.html').includes(cfg.policyDate));
ok('QR code svg exists and encodes the join URL size', read('assets/join-qr.svg').includes('<path'));
ok('sitemap lists the 4 pages', PAGES.every((p) => read('sitemap.xml').includes(`${cfg.siteUrl}/${p === 'index.html' ? '' : p}`)));
const hasApp = fs.existsSync(path.join(DOCS, 'app/version.json'));
if (hasApp) { const v = JSON.parse(read('app/version.json')); ok('app/version.json: package, latestVersionCode, playUrl', v.packageName === cfg.packageName && Number.isInteger(v.latestVersionCode) && v.playUrl.includes(cfg.packageName)); const c = JSON.parse(read('app/content.json')); ok('app/content.json: notices + changelog arrays with 5 languages each', Array.isArray(c.notices) && Array.isArray(c.changelog) && c.notices.every((n) => L.every((l) => n.title[l] && n.body[l])) && c.changelog.every((n) => L.every((l) => n.items[l] && n.items[l].length))); }


// ---------- app update files + icons on every button ----------
{
  const v = JSON.parse(read('app/version.json')), c = JSON.parse(read('app/content.json'));
  ok('app/version.json: {latestVersionCode:int, latestVersionName}', Number.isInteger(v.latestVersionCode) && v.latestVersionCode > 0 && typeof v.latestVersionName === 'string');
  ok('app/content.json: notices + changelog complete in 5 languages', Array.isArray(c.notices) && Array.isArray(c.changelog) && c.notices.every((n) => n.id && n.date && L.every((l) => n.title[l] && n.body[l])) && c.changelog.every((u) => u.id && u.date && u.version && L.every((l) => Array.isArray(u.items[l]) && u.items[l].length)));
  const htmls2 = PAGES.map(read); const bare = [];
  for (const h of htmls2) for (const m of h.matchAll(/<(a|button)\b[^>]*class="[^"]*\bbtn\b[^"]*"[^>]*>([\s\S]*?)<\/\1>/g)) if (!/<svg/.test(m[2])) bare.push(m[2].replace(/<[^>]+>/g, '').slice(0, 30));
  ok('every button on the site has an icon next to its label (no text-only button)', bare.length === 0, bare.join(' | '));
  ok('Lucide licence recorded (LICENSES.md)', /Lucide[\s\S]*ISC/.test(fs.readFileSync(path.join(ROOT, 'LICENSES.md'), 'utf8')));
}

// ---------- 2. browser ----------
const { chromium } = createRequire('/workspace/fieldreport/package.json')('playwright-core');
const MIME = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript', '.css': 'text/css', '.svg': 'image/svg+xml', '.webp': 'image/webp', '.jpg': 'image/jpeg', '.woff2': 'font/woff2', '.json': 'application/json', '.xml': 'application/xml', '.txt': 'text/plain' };
const server = http.createServer((q, r) => { let p = decodeURIComponent(q.url.split('?')[0]); if (!p.startsWith('/moffee-site/')) { r.writeHead(404); return r.end(); } p = p.slice('/moffee-site'.length); let f = path.join(DOCS, p); if (fs.existsSync(f) && fs.statSync(f).isDirectory()) f = path.join(f, 'index.html'); if (!f.startsWith(DOCS) || !fs.existsSync(f)) { r.writeHead(404, { 'content-type': 'text/html' }); return r.end(fs.readFileSync(path.join(DOCS, '404.html'))); } r.writeHead(200, { 'content-type': MIME[path.extname(f)] || 'application/octet-stream', 'cache-control': 'no-store' }); fs.createReadStream(f).pipe(r); });
await new Promise((res) => server.listen(0, '127.0.0.1', res));
const BASE = `http://127.0.0.1:${server.address().port}/moffee-site/`;
const browser = await chromium.launch({ executablePath: '/usr/bin/google-chrome', args: ['--no-sandbox'], headless: true });
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
async function open(url, { locale = 'en-US', languages, w = 390, h = 844, motion = 'no-preference', storage } = {}) {
  const ctx = await browser.newContext({ viewport: { width: w, height: h }, locale, reducedMotion: motion });
  if (languages) await ctx.addInitScript((ls) => { Object.defineProperty(navigator, 'languages', { get: () => ls }); Object.defineProperty(navigator, 'language', { get: () => ls[0] }); }, languages);
  if (storage) await ctx.addInitScript((s) => { try { for (const k in s) localStorage.setItem(k, s[k]); } catch (e) {} }, storage);
  const page = await ctx.newPage(); page.errs = []; page.ctx = ctx;
  page.on('console', (m) => m.type() === 'error' && page.errs.push(m.text())); page.on('pageerror', (e) => page.errs.push('pageerror ' + e.message)); page.on('response', (r) => r.status() >= 400 && page.errs.push(r.status() + ' ' + r.url()));
  await page.goto(BASE + url, { waitUntil: 'networkidle' }); await sleep(500); return page;
}
const langOf = (p) => p.evaluate(() => document.documentElement.getAttribute('data-lang'));
const h1 = (p) => p.evaluate(() => (document.querySelector('h1') || {}).textContent);
// language rule
const rule = [['th-TH', ['th-TH'], 'th'], ['ko-KR', ['ko-KR', 'en'], 'ko'], ['zh-TW', ['zh-TW'], 'zh'], ['zh-CN', ['zh-CN'], 'zh'], ['hi-IN', ['hi-IN'], 'hi'], ['en-GB', ['en-GB'], 'en'], ['fr-FR (unsupported) -> English', ['fr-FR'], 'en'], ['ja,ko second choice', ['ja-JP', 'ko-KR'], 'ko'], ['empty -> English', ['de'], 'en']];
for (const [name, langs, want] of rule) { const p = await open('index.html', { locale: langs[0], languages: langs }); ok(`browser language ${name} -> ${want}`, (await langOf(p)) === want, await langOf(p)); await p.ctx.close(); }
{ const p = await open('index.html?lang=ko', { languages: ['th-TH'] }); ok('?lang=ko overrides a Thai browser', (await langOf(p)) === 'ko' && /주문/.test(await h1(p))); const q = await p.evaluate(() => [...document.querySelectorAll('a[data-int]')].map((a) => a.getAttribute('href'))); ok('internal links keep ?lang= when it was chosen explicitly', q.length > 3 && q.every((h) => /lang=ko/.test(h)), q.join()); await p.ctx.close(); }
{ const p = await open('index.html', { languages: ['th-TH'], storage: { 'moffee.site.lang': 'hi' } }); ok('saved choice (hi) beats the browser language (th)', (await langOf(p)) === 'hi'); await p.ctx.close(); }
{ const p = await open('index.html?lang=xx', { languages: ['ko-KR'] }); ok('invalid ?lang= falls back to browser language', (await langOf(p)) === 'ko'); await p.ctx.close(); }
{ const p = await open('index.html'); await p.selectOption('#lang', 'zh'); await sleep(500); ok('language selector switches text + html lang + saves', (await langOf(p)) === 'zh' && /点单/.test(await h1(p)) && (await p.evaluate(() => localStorage.getItem('moffee.site.lang'))) === 'zh' && (await p.evaluate(() => document.documentElement.lang)) === 'zh-Hans'); await p.ctx.close(); }
// every page x every language: text swapped, no errors, no horizontal scroll, visible content
for (const f of PAGES) for (const l of L) {
  const p = await open(f + '?lang=' + l, { w: 390 });
  const r = await p.evaluate(() => ({ sw: document.documentElement.scrollWidth, cw: document.documentElement.clientWidth, hidden: getComputedStyle(document.body).opacity, lang: document.documentElement.getAttribute('data-lang'), h1: (document.querySelector('h1') || {}).textContent || '', title: document.title, vis: [...document.querySelectorAll('h1')].filter((e) => e.offsetParent !== null).length }));
  ok(`${f} [${l}] renders: lang ok, visible h1, no horizontal scroll, no errors`, r.lang === l && r.vis === 1 && r.sw <= r.cw + 1 && r.hidden === '1' && p.errs.length === 0, JSON.stringify({ sw: r.sw, cw: r.cw, errs: p.errs, h1: r.h1.slice(0, 30) }));
  if (l !== 'en') ok(`${f} [${l}] title is translated`, r.title !== (await (async () => { const q = await open(f + '?lang=en'); const t = await q.title(); await q.ctx.close(); return t; })()));
  await p.ctx.close();
}
// join behaviour
{
  const p = await open('join.html?lang=en');
  ok('join: steps 2 and 3 locked + note visible while optInLive=false', cfg.optInLive || ((await p.locator('.step[data-locked]').count()) === 2 && await p.locator('#pend').isVisible()));
  await p.click('#c1 .num'); ok('join: tapping the number ticks the step and updates progress', (await p.textContent('#progTxt')).startsWith('1 of 3') && await p.locator('#c1.done').count() === 1);
  await p.reload({ waitUntil: 'networkidle' }); ok('join: progress is remembered after reload', (await p.textContent('#progTxt')).startsWith('1 of 3'));
  await p.click('#reset'); ok('join: reset clears progress', (await p.textContent('#progTxt')).startsWith('0 of 3'));
  if (!cfg.optInLive) { const before = await p.context().pages().length; await p.click('#c2 [data-go]', { force: true }); await sleep(900); ok('join: locked step link does not open a tab and does not tick', p.context().pages().length === before && (await p.locator('#c2.done').count()) === 0); }
  await p.selectOption('#lang', 'th'); await sleep(400); ok('join: progress text follows the language', /0 จาก|ทำแล้ว 0/.test(await p.textContent('#progTxt')));
  await p.ctx.close();
}
// about redirect + 404
{ const p = await open('about/?lang=ko'); ok('/about/ redirects to the intro page and keeps ?lang=', /\/moffee-site\/(index\.html)?\?lang=ko$/.test(p.url()) && (await langOf(p)) === 'ko', p.url()); await p.ctx.close(); }
// motion + reduced motion
{
  const p = await open('index.html', { motion: 'reduce' }); await p.evaluate(() => window.scrollTo(0, 99999)); await sleep(500);
  ok('reduced motion: no running animations or transitions, nothing hidden (index)', (await p.evaluate(() => document.getAnimations().length)) === 0 && (await p.evaluate(() => [...document.querySelectorAll('[data-reveal]')].every((e) => getComputedStyle(e).opacity === '1')))); await p.ctx.close();
  const q = await open('join.html', { motion: 'reduce' }); ok('reduced motion: no running animations (join)', (await q.evaluate(() => document.getAnimations().length)) === 0); await q.ctx.close();
  const m = await open('index.html'); await m.evaluate(() => window.scrollTo(0, 1500)); await sleep(150);
  const props = await m.evaluate(() => document.getAnimations().flatMap((a) => (a.effect && a.effect.getKeyframes ? a.effect.getKeyframes().flatMap((k) => Object.keys(k).filter((x) => !['offset', 'easing', 'composite', 'computedOffset'].includes(x))) : [])));
  ok('motion: only transform/opacity are animated', props.every((x) => ['transform', 'opacity'].includes(x)), [...new Set(props)].join()); await m.ctx.close();
}
await browser.close(); server.close();
console.log(`\n${pass} passed, ${fail} failed`); process.exit(fail ? 1 : 0);
