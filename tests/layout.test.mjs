// Layout audit (run after `node scripts/build.mjs`): node tests/layout.test.mjs [only-lang] [only-size]
// 4 pages x 5 languages x 5 viewports (360x800, 390x844, 412x915, tablet 820x1180, desktop 1280x800):
// no horizontal overflow, nothing clipped at the viewport edge, header never covers content (anchor jumps + focus), header parts do not overlap,
// language-select focus ring stays inside the viewport, hero images never overlap the caption/neighbours, no clipped text in buttons/chips/cards,
// no mid-word line breaks (ko/en/hi: words must not be split across lines).
import fs from 'node:fs'; import path from 'node:path'; import http from 'node:http'; import { fileURLToPath } from 'node:url'; import { createRequire } from 'node:module';
const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), '..'), DOCS = path.join(ROOT, 'docs');
let pass = 0, fail = 0; const ok = (n, c, x = '') => { console.log((c ? 'PASS' : 'FAIL') + '  ' + n + (x ? '  ' + x : '')); c ? pass++ : fail++; };
const { chromium } = (() => { for (const d of [process.env.PLAYWRIGHT_CORE_DIR, '/workspace/fieldreport', '/workspace/nammanthuk', '/workspace/project-reborn'].filter(Boolean)) { try { return createRequire(path.join(d, 'package.json'))('playwright-core'); } catch (e) {} } throw new Error('playwright-core not found; set PLAYWRIGHT_CORE_DIR'); })();
const MIME = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript', '.css': 'text/css', '.svg': 'image/svg+xml', '.webp': 'image/webp', '.jpg': 'image/jpeg', '.png': 'image/png', '.woff2': 'font/woff2', '.json': 'application/json' };
const server = http.createServer((q, r) => { let p = decodeURIComponent(q.url.split('?')[0]).replace(/^\/moffee-site/, ''); let f = path.join(DOCS, p); if (fs.existsSync(f) && fs.statSync(f).isDirectory()) f = path.join(f, 'index.html'); if (!fs.existsSync(f)) { r.writeHead(404); return r.end(); } r.writeHead(200, { 'content-type': MIME[path.extname(f)] || 'application/octet-stream' }); r.end(fs.readFileSync(f)); });
await new Promise((res) => server.listen(0, '127.0.0.1', res));
const BASE = process.env.SITE_BASE || `http://127.0.0.1:${server.address().port}/moffee-site/`;
const browser = await chromium.launch({ executablePath: '/usr/bin/google-chrome', args: ['--no-sandbox'], headless: true });
const LANGS = process.argv[2] && process.argv[2] !== 'all' ? [process.argv[2]] : ['th', 'en', 'ko', 'zh', 'hi'];
const SIZES = (process.argv[3] ? [process.argv[3]] : ['360x800', '390x844', '412x915', '820x1180', '1280x800']).map((s) => s.split('x').map(Number));
const PAGES = ['index', 'join', 'privacy', 'delete-account'];

function audit() {
  const vw = document.documentElement.clientWidth, out = {};
  const vis = (e) => { const r = e.getBoundingClientRect(), s = getComputedStyle(e); return r.width > 0 && r.height > 0 && s.visibility !== 'hidden' && s.display !== 'none'; };
  const rect = (s) => { const e = document.querySelector(s); return e && vis(e) ? e.getBoundingClientRect() : null; };
  const hit = (a, b) => a && b && a.left < b.right - 0.5 && a.right > b.left + 0.5 && a.top < b.bottom - 0.5 && a.bottom > b.top + 0.5;
  out.overflowX = document.documentElement.scrollWidth - vw;
  // elements poking out of the viewport sideways (ignoring ripple layers, skip link, and things inside intentionally hidden ancestors)
  out.edge = [...document.body.querySelectorAll('*')].filter((e) => vis(e) && !e.closest('.m-rip-w,.skip,svg,option') && e.tagName !== 'path').filter((e) => { const r = e.getBoundingClientRect(); return r.right > vw + 1 || r.left < -1; }).slice(0, 5).map((e) => e.tagName + '.' + e.className);
  // clipped content inside overflow:hidden boxes
  out.clipped = [...document.querySelectorAll('.btn,.chips li,.eyebrow,.lang,.step,.card,.good li,.free,.panel,summary')].filter((e) => vis(e)).filter((e) => e.scrollWidth > e.clientWidth + 1).slice(0, 5).map((e) => e.className + ':' + e.scrollWidth + '>' + e.clientWidth);
  // header
  const hd = rect('.hd'), logo = rect('.logo,.back'), hub = rect('.hubh'), lang = rect('.lang');
  out.hdr = { h: hd && Math.round(hd.height), overlap: hit(logo, hub) || hit(logo, lang) || hit(hub, lang), langRight: lang && Math.round(lang.right), vw, inside: !!(lang && hd && lang.top >= hd.top && lang.bottom <= hd.bottom && lang.right + 4 <= vw && hub.right <= lang.left) };
  // language select focus ring stays inside the viewport and the header
  const sel = document.querySelector('#lang'); sel.focus({ focusVisible: true }); const lg = document.querySelector('.lang').getBoundingClientRect(), cs = getComputedStyle(document.querySelector('.lang')), off = parseFloat(cs.outlineOffset) + parseFloat(cs.outlineWidth);
  out.ring = { ok: lg.right + off <= vw && lg.left - off >= 0 && lg.top - off >= hd.top && lg.bottom + off <= hd.bottom, outline: cs.outlineStyle, selOutline: getComputedStyle(sel).outlineStyle }; sel.blur();
  // hero images vs caption (home only)
  const t = rect('.dev.tablet'), ph = rect('.dev.phone'), cap = rect('.hero-vis .cap');
  if (t) out.hero = { phoneCoversCaption: hit(ph, cap), tabletCoversCaption: hit(t, cap), phoneInsideTabletX: ph.left >= t.left - 1, phoneBelowChips: ph.top > (rect('.chips') || { bottom: 0 }).bottom - 1 || document.querySelector('.hero-in').getBoundingClientRect().width > 700, capVisible: cap.right <= vw + 1 && cap.left >= -1 };
  // mid-word breaks: a space-delimited word whose characters sit on different lines
  const bad = [];
  if (['ko', 'en', 'hi'].includes(document.documentElement.getAttribute('data-lang'))) {
    const walker = document.createTreeWalker(document.querySelector('main'), NodeFilter.SHOW_TEXT);
    for (let n; (n = walker.nextNode());) {
      const el = n.parentElement; if (!el || !vis(el) || el.closest('select,option,script,style,[hidden]')) continue;
      const re = /[\p{L}\p{N}]+/gu; let m; while ((m = re.exec(n.nodeValue))) {
        if (m[0].length < 3) continue; const r = document.createRange(); r.setStart(n, m.index); r.setEnd(n, m.index + m[0].length);
        const rs = [...r.getClientRects()].filter((x) => x.width > 0.5); if (rs.length < 2) continue;
        const tops = rs.map((x) => Math.round(x.top)); if (Math.max(...tops) - Math.min(...tops) > rs[0].height * 0.6) bad.push(m[0].slice(0, 24));
      }
    }
  }
  out.midword = bad.slice(0, 6);
  return out;
}

for (const page of PAGES) for (const lang of LANGS) for (const [w, h] of SIZES) {
  const tag = `${page} [${lang}] ${w}x${h}`;
  const ctx = await browser.newContext({ viewport: { width: w, height: h }, reducedMotion: 'reduce', hasTouch: w < 800, isMobile: w < 800, deviceScaleFactor: 1 });
  const p = await ctx.newPage(); const errs = []; p.on('pageerror', (e) => errs.push(e.message)); p.on('response', (r) => r.status() >= 400 && errs.push(r.status() + ' ' + r.url()));
  await p.goto(`${BASE}${page}.html?lang=${lang}`, { waitUntil: 'networkidle' });
  await p.evaluate(() => document.querySelectorAll('img[loading=lazy]').forEach((i) => (i.loading = 'eager'))); await p.waitForTimeout(250);
  const r = await p.evaluate(audit);
  ok(`${tag}: no horizontal overflow, nothing past the edges, no clipped boxes, no errors`, r.overflowX <= 0 && r.edge.length === 0 && r.clipped.length === 0 && errs.length === 0, JSON.stringify({ ox: r.overflowX, edge: r.edge, clipped: r.clipped, errs }));
  ok(`${tag}: header parts inside the header, not overlapping, focus ring inside viewport`, r.hdr.inside && !r.hdr.overlap && r.ring.ok && r.ring.selOutline === 'none', JSON.stringify({ hdr: r.hdr, ring: r.ring }));
  ok(`${tag}: no word broken across lines`, r.midword.length === 0, r.midword.join(' | '));
  if (r.hero) ok(`${tag}: hero images do not cover the caption or each other's text`, !r.hero.phoneCoversCaption && !r.hero.tabletCoversCaption && r.hero.phoneInsideTabletX && r.hero.capVisible && r.hero.phoneBelowChips, JSON.stringify(r.hero));
  if (page === 'join') {
    const c = await p.evaluate(() => [...document.querySelectorAll('.panel, .retry, .pend, .all:not([hidden])')].filter((e) => e.getBoundingClientRect().width > 0).map((card) => { const cr = card.getBoundingClientRect(), cx = (cr.left + cr.right) / 2; const items = [...card.querySelectorAll('h2,b,img,.btn,.note,.desc,p')].filter((e) => e.getBoundingClientRect().width > 0 && !e.closest('.all') ); return { card: card.className, ta: getComputedStyle(card).textAlign, off: items.map((e) => { const r = e.getBoundingClientRect(); const block = ['IMG', 'A', 'BUTTON'].includes(e.tagName) || getComputedStyle(e).display.startsWith('inline') ? r : r; let mid = (r.left + r.right) / 2; if (!['IMG', 'A', 'BUTTON'].includes(e.tagName) && getComputedStyle(e).textAlign === 'center') { const rg = document.createRange(); rg.selectNodeContents(e); const rs = [...rg.getClientRects()]; if (rs.length) { mid = (Math.min(...rs.map((x) => x.left)) + Math.max(...rs.map((x) => x.right))) / 2; } } return [e.tagName + '.' + e.className, Math.round(Math.abs(mid - cx) * 10) / 10]; }) }; }));
    const worst = c.flatMap((x) => x.off.filter(([, d]) => d > 2.5).map(([n, d]) => x.card + '>' + n + ':' + d));
    ok(`${tag}: share / QR / retry cards are centred (title, text, buttons, QR block)`, c.length >= 3 && c.every((x) => x.ta === 'center') && worst.length === 0, JSON.stringify({ n: c.length, worst }));
  }
  // header never covers content on anchor jumps / focus
  const cover = async (label, act, sel) => { await act(); await p.waitForTimeout(450); const o = await p.evaluate((s) => { const e = document.querySelector(s), hb = document.querySelector('.hd').getBoundingClientRect().bottom; return { top: Math.round(e.getBoundingClientRect().top), hb: Math.round(hb) }; }, sel); ok(`${tag}: ${label} lands below the sticky header`, o.top >= o.hb - 1, JSON.stringify(o)); };
  if (page === 'index') await cover('#features jump', () => p.evaluate(() => { location.hash = '#features'; }), '#features h2');
  if (page === 'index') await cover('focus of footer hub button', () => p.focus('a.hub'), 'a.hub');
  if (page === 'join') await cover('focus of step 1 button', () => p.focus('#c1 .btn'), '#c1 .btn');
  await ctx.close();
}
await browser.close(); server.close();
console.log(`\n${pass} passed, ${fail} failed`); process.exit(fail ? 1 : 0);
