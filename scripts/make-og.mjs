// Dev tool (not run by the build): renders src/assets/img/og.jpg (1200x630 share card) with headless Chrome from the site's own fonts + a sample screen.
//   needs: playwright-core (from /workspace/fieldreport) + google-chrome.   Usage: node scripts/make-og.mjs
import { createRequire } from 'node:module'; import path from 'node:path'; import { fileURLToPath } from 'node:url'; import fs from 'node:fs';
const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), '..'), A = path.join(ROOT, 'src/assets');
const { chromium } = createRequire('/workspace/fieldreport/package.json')('playwright-core');
const css = fs.readFileSync(path.join(A, 'site.css'), 'utf8').split('\n').filter((l) => l.startsWith('@font-face')).join('\n').replace(/url\(fonts\//g, 'url(file://' + A + '/fonts/');
const html = `<!doctype html><meta charset=utf-8><style>${css}
body{margin:0;width:1200px;height:630px;background:radial-gradient(700px 400px at 90% -10%,rgba(212,176,98,.28),transparent 65%),#17150f;color:#fbf7ee;font-family:'IBM Plex Sans','IBM Plex Sans Thai',sans-serif;display:flex;align-items:center;gap:30px;padding:0 70px;box-sizing:border-box;overflow:hidden}
.t{flex:1}.k{color:#d4b062;font-weight:600;letter-spacing:.06em;text-transform:uppercase;font-size:22px}h1{font-size:92px;line-height:1;margin:14px 0 18px;letter-spacing:-.03em}p{font-size:34px;line-height:1.3;margin:0;color:rgba(251,247,238,.85)}
.i{display:flex;gap:14px;margin-top:34px}.i b{padding:8px 20px;border-radius:99px;background:rgba(255,255,255,.1);color:#d4b062;font-size:24px;font-weight:600}
img{width:560px;border-radius:22px;box-shadow:0 30px 60px -28px #000,0 0 0 8px #2a271d}</style>
<div class=t><div class=k>Counter order app for coffee shops</div><h1>Moffee</h1><p>Take orders. Print tickets.<br>Close the day.</p><div class=i><b>No ads</b><b>Works offline</b></div></div>
<img src="file://${A}/img/shot-order.webp">`;
fs.writeFileSync('/tmp/og.html', html);
const b = await chromium.launch({ executablePath: '/usr/bin/google-chrome', args: ['--no-sandbox', '--allow-file-access-from-files'], headless: true });
const p = await b.newPage({ viewport: { width: 1200, height: 630 } }); await p.goto('file:///tmp/og.html'); await p.waitForTimeout(600);
await p.screenshot({ path: path.join(A, 'img/og.jpg'), type: 'jpeg', quality: 86 }); await b.close(); console.log('og.jpg written');
