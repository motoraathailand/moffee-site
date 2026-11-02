// Dev tool (not run by the build): renders the share card src/assets/img/og.jpg (1200x630) AND the PNG icons (icon-192.png, apple-touch-icon.png)
// with headless Chrome from the site's own fonts, the "Arch m" icon (scripts/icon-full.svg = cafemenu-android/scripts/icon-src/icon-full.svg) and a sample screen.
//   needs: playwright-core (found in one of the workspace node_modules, or set PLAYWRIGHT_CORE_DIR) + google-chrome.   Usage: node scripts/make-og.mjs
import { createRequire } from 'node:module'; import path from 'node:path'; import { fileURLToPath } from 'node:url'; import fs from 'node:fs';
const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), '..'), A = path.join(ROOT, 'src/assets'), S = path.join(ROOT, 'scripts');
const cands = [process.env.PLAYWRIGHT_CORE_DIR, '/workspace/fieldreport', '/workspace/nammanthuk', '/workspace/project-reborn'].filter(Boolean);
let chromium; for (const d of cands) { try { ({ chromium } = createRequire(path.join(d, 'package.json'))('playwright-core')); break; } catch (e) {} }
if (!chromium) throw new Error('playwright-core not found; set PLAYWRIGHT_CORE_DIR');
const css = fs.readFileSync(path.join(A, 'site.css'), 'utf8').split('\n').filter((l) => l.startsWith('@font-face')).join('\n').replace(/url\(fonts\//g, 'url(file://' + A + '/fonts/');
const html = `<!doctype html><meta charset=utf-8><style>${css}
body{margin:0;width:1200px;height:630px;background:radial-gradient(760px 420px at 92% -12%,rgba(37,99,235,.18),transparent 64%),#f4f5f7;color:#12141a;font-family:'IBM Plex Sans','IBM Plex Sans Thai',sans-serif;display:flex;align-items:center;gap:36px;padding:0 72px;box-sizing:border-box;overflow:hidden}
.t{flex:1;min-width:0}.brand{display:flex;align-items:center;gap:20px}.brand img{width:92px;height:92px;border-radius:26px;box-shadow:0 18px 30px -16px rgba(37,99,235,.7)}
h1{font-size:92px;line-height:1;margin:0;letter-spacing:-.035em}.k{color:#1d4ed8;font-weight:600;font-size:25px;margin:26px 0 12px}
p{font-size:35px;line-height:1.28;margin:0;color:#646b7a;font-weight:500}
.i{display:flex;gap:10px;margin-top:34px;flex-wrap:wrap}.i b{padding:9px 18px;border-radius:14px;background:#fff;border:1px solid #e3e6ec;color:#12141a;font-size:22px;font-weight:600;box-shadow:0 8px 20px -12px rgba(18,20,26,.2)}.i b:first-child{background:#2563eb;border-color:#2563eb;color:#fff}
.s{width:560px;flex:none;border-radius:28px;overflow:hidden;box-shadow:0 40px 70px -30px rgba(18,20,26,.4),0 0 0 1px #e3e6ec;background:#fff}.s img{display:block;width:100%}</style>
<div class=t><div class=brand><img src="file://${A}/icon.svg"><h1>Moffee</h1></div><div class=k>Cafés · restaurants · shops</div><p>Take orders. Print tickets.<br>Close the day.</p><div class=i><b>Free</b><b>Banner ads only after release</b><b>Works offline</b></div></div>
<div class=s><img src="file://${A}/img/shot-order-light.webp"></div>`;
fs.writeFileSync('/tmp/og.html', html);
const b = await chromium.launch({ executablePath: '/usr/bin/google-chrome', args: ['--no-sandbox', '--allow-file-access-from-files'], headless: true });
const p = await b.newPage({ viewport: { width: 1200, height: 630 } }); await p.goto('file:///tmp/og.html'); await p.waitForTimeout(700);
await p.screenshot({ path: path.join(A, 'img/og.jpg'), type: 'jpeg', quality: 88 });
// PNG icons from the full-bleed icon source (iOS rounds the corners itself)
for (const [n, px] of [['apple-touch-icon.png', 180], ['icon-192.png', 192]]) {
  const q = await b.newPage({ viewport: { width: px, height: px } }); await q.setContent(`<style>html,body{margin:0}</style><img src="file://${S}/icon-full.svg" width="${px}" height="${px}" style="display:block">`); await q.waitForTimeout(300);
  await q.screenshot({ path: path.join(A, n), type: 'png', clip: { x: 0, y: 0, width: px, height: px } }); await q.close();
}
await b.close(); console.log('og.jpg, apple-touch-icon.png, icon-192.png written');
