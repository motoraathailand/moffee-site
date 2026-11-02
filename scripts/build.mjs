// Builds the whole static site into docs/ (GitHub Pages serves /docs of branch main).
//   index.html (intro = /about), join.html, privacy.html, delete-account.html, about/index.html (redirect), 404.html, sitemap.xml, robots.txt, assets/*
// Usage: node scripts/build.mjs        (no dependencies; QR code from scripts/qrcode.mjs = the app's vendored qrcode-generator, MIT)
import fs from 'node:fs'; import path from 'node:path'; import { fileURLToPath } from 'node:url';
import qrcode from './qrcode.mjs';
import { INTRO, JOIN } from '../src/strings.mjs';
import { LANGS, SOCIAL, makeContent } from '../src/content.mjs';
const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), '..'), SRC = path.join(ROOT, 'src'), OUT = path.join(ROOT, 'docs');
const cfg = JSON.parse(fs.readFileSync(path.join(ROOT, 'config/site.json'), 'utf8'));
for (const k of ['siteUrl', 'packageName', 'groupEmail', 'groupUrl', 'optInUrl', 'installUrl', 'contactEmail', 'operator', 'policyDate']) if (!cfg[k]) throw new Error('config/site.json: missing ' + k);
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const L = LANGS.map((x) => x[0]), SITE = cfg.siteUrl;
// ---- completeness: every language has every key / section ----
for (const [name, D] of [['INTRO', INTRO], ['JOIN', JOIN]]) { const keys = Object.keys(D.en); for (const l of L) { if (!D[l]) throw new Error(name + ' lacks ' + l); const miss = keys.filter((k) => !(k in D[l]) || !String(D[l][k]).trim() && D.en[k]); if (miss.length) throw new Error(name + '.' + l + ' misses ' + miss.join()); } }
const C = makeContent({ OPERATOR: cfg.operator, EMAIL: cfg.contactEmail, UPDATED: cfg.policyDate, SITE });
for (const name of ['PRIVACY', 'DELETE']) for (const l of L) { if (!C[name][l]) throw new Error(name + ' lacks ' + l); if (C[name][l].length !== C[name].en.length) throw new Error(name + '.' + l + ' has ' + C[name][l].length + ' sections, en has ' + C[name].en.length); }
const I = INTRO, J = JOIN;
// ---- helpers ----
const ICON = { tap: '<path d="M14 4.1 12 6"/><path d="m5.1 8-2.9-.8"/><path d="m6 12-1.9 2"/><path d="M7.2 2.2 8 5.1"/><path d="M9.037 9.69a.498.498 0 0 1 .653-.653l11 4.5a.5.5 0 0 1-.074.949l-4.349 1.041a1 1 0 0 0-.74.739l-1.04 4.35a.5.5 0 0 1-.95.074z"/>', print: '<path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><path d="M6 9V3a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v6"/><rect x="6" y="14" width="12" height="8" rx="1"/>', report: '<path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/><path d="M16 13H8"/><path d="M16 17H8"/><path d="M10 9H8"/>', lock: '<rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>', offline: '<path d="M12 20h.01"/><path d="M8.5 16.429a5 5 0 0 1 7 0"/><path d="M5 12.859a10 10 0 0 1 5.17-2.69"/><path d="M19 12.859a10 10 0 0 0-2.007-1.523"/><path d="M2 8.82a15 15 0 0 1 4.177-2.643"/><path d="M22 8.82a15 15 0 0 0-11.288-3.764"/><path d="m2 2 20 20"/>', menu: '<circle cx="13.5" cy="6.5" r=".5" fill="currentColor"/><circle cx="17.5" cy="10.5" r=".5" fill="currentColor"/><circle cx="8.5" cy="7.5" r=".5" fill="currentColor"/><circle cx="6.5" cy="12.5" r=".5" fill="currentColor"/><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z"/>', gift: '<rect x="3" y="8" width="18" height="4" rx="1"/><path d="M12 8v13"/><path d="M19 12v7a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-7"/><path d="M7.5 8a2.5 2.5 0 0 1 0-5A4.8 8 0 0 1 12 8a4.8 8 0 0 1 4.5-5 2.5 2.5 0 0 1 0 5"/>', card: '<rect width="20" height="14" x="2" y="5" rx="2"/><line x1="2" x2="22" y1="10" y2="10"/>', login: '<path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"/><path d="m10 17 5-5-5-5"/><path d="M15 12H3"/>', shield: '<path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/><path d="m9 12 2 2 4-4"/>', ads: '<path d="m3 11 18-5v12L3 14v-3z"/><path d="M11.6 16.8a3 3 0 1 1-5.8-1.6"/>', check: '<path d="M20 6 9 17l-5-5"/>' };
const svg = (n) => `<svg viewBox="0 0 24 24" aria-hidden="true">${ICON[n]}</svg>`;
const attr = (tag, key, extra = '', dict = I) => `<${tag} data-t="${key}"${extra ? ' ' + extra : ''}>${esc(dict.en[key])}</${tag}>`;
const LOGO = `<a class="logo" href="index.html" data-int aria-label="Moffee"><img src="assets/icon.svg" width="32" height="32" alt=""><span>Moffee</span></a>`;
const LANGSEL = (dict) => `<label class="lang"><svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c3 3.200 3 14.800 0 18M12 3c-3 3.200-3 14.800 0 18"/></svg><select id="lang" data-aria="langLabel" aria-label="${esc(dict.en.langLabel)}">${LANGS.map(([l, n]) => `<option value="${l}"${l === 'en' ? ' selected' : ''}>${esc(n)}</option>`).join('')}</select></label>`;
const HEADER = (dict) => `<header class="hd"><div class="hd-in">${LOGO}${LANGSEL(dict)}</div></header>`;
const FOOTER = (dict, madeKey) => `<footer class="ft"><div class="wrap"><div class="links"><a href="privacy.html" data-int data-t="privacy">${esc(dict.en.privacy)}</a><a href="delete-account.html" data-int data-t="del">${esc(dict.en.del)}</a><a href="mailto:${esc(cfg.contactEmail)}" data-t="contact">${esc(dict.en.contact)}</a></div>${madeKey ? `<p data-t="${madeKey}">${esc(dict.en[madeKey])}</p>` : ''}</div></footer>`;
// language chosen BEFORE first paint (no flash): ?lang= > saved > browser primary tag > English. Non-English keeps the page hidden (html.lw) until site.js has swapped the baked English text (fails open after 1.5 s).
const HEAD_SCRIPT = `<script>/* language first: ?lang= > saved choice > browser language (th/en/ko/zh/hi by primary subtag) > English */
(function(){var L=['th','en','ko','zh','hi'],l='en',x=0,d=document.documentElement;try{var m=/[?&]lang=(\\w\\w)/.exec(location.search),s=localStorage.getItem('moffee.site.lang'),a=navigator.languages&&navigator.languages.length?navigator.languages:[navigator.language],p='';if(m&&L.indexOf(m[1])>-1){l=m[1];x=1}else if(L.indexOf(s)>-1){l=s;x=1}else for(var i=0;i<a.length;i++){p=String(a[i]||'').toLowerCase().split(/[-_]/)[0];if(L.indexOf(p)>-1){l=p;break}}}catch(e){}window.__L=l;window.__LX=x;d.lang=l==='zh'?'zh-Hans':l;d.setAttribute('data-lang',l);if(l!=='en'){d.className+=' lw';setTimeout(function(){d.className=d.className.replace(/\\blw\\b/,'')},1500)}})();</script>`;
function shell({ page, file, title, desc, body, dictKey = 'intro', jsonld = '' }) {
  const url = `${SITE}/${file === 'index.html' ? '' : file}`;
  return `<!doctype html>
<html lang="en" data-lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>${esc(title)}</title>
<meta name="description" content="${esc(desc)}">
<meta name="robots" content="index, follow">
<meta name="theme-color" content="#f4f5f7" media="(prefers-color-scheme: light)"><meta name="theme-color" content="#0b0c10" media="(prefers-color-scheme: dark)">
<meta name="color-scheme" content="light dark">
<link rel="canonical" href="${url}">
<meta property="og:type" content="website"><meta property="og:site_name" content="Moffee">
<meta property="og:title" content="${esc(title)}"><meta property="og:description" content="${esc(desc)}"><meta property="og:url" content="${url}"><meta property="og:image" content="${SITE}/assets/img/og.jpg">
<meta name="twitter:card" content="summary_large_image"><meta name="twitter:title" content="${esc(title)}"><meta name="twitter:description" content="${esc(desc)}"><meta name="twitter:image" content="${SITE}/assets/img/og.jpg">
<link rel="icon" href="assets/icon.svg" type="image/svg+xml"><link rel="icon" href="assets/icon-192.png" sizes="192x192" type="image/png"><link rel="apple-touch-icon" href="assets/apple-touch-icon.png">
${HEAD_SCRIPT}
<link rel="stylesheet" href="assets/motion.css">
<link rel="stylesheet" href="assets/site.css">
</head>
<body data-page="${page}" data-lang-root>
${body}
<script src="assets/strings.js"></script>
<script src="assets/motion.js"></script>
<script src="assets/site.js"></script>${page === 'join' ? '\n<script src="assets/join.js"></script>' : ''}
</body>
</html>
`;
}
// ---- intro (index.html) ----
const features = [['tap', 'f1'], ['print', 'f2'], ['report', 'f3'], ['lock', 'f4'], ['offline', 'f5'], ['menu', 'f6']];
const goods = [['card', 'good1'], ['login', 'good2'], ['shield', 'good3'], ['ads', 'good4']];
const JOIN_ICON = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><line x1="19" x2="19" y1="8" y2="14"/><line x1="22" x2="16" y1="11" y2="11"/></svg>';
const chk = '<svg viewBox="0 0 24 24" aria-hidden="true">' + ICON.check + '</svg>';
const indexBody = `${HEADER(I)}
<main id="main">
<section class="hero"><div class="wrap hero-in">
  <div class="hero-copy" data-stagger>
    ${attr('p', 'eyebrow', 'class="eyebrow"')}
    ${attr('h1', 'h1')}
    ${attr('p', 'lead', 'class="lead"')}
    <div class="cta"><a class="btn" data-press data-ripple data-int href="join.html">${JOIN_ICON}<span data-t="ctaJoin">${esc(I.en.ctaJoin)}</span></a><a class="btn ghost" data-press data-ripple href="#features"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 5v14"/><path d="m19 12-7 7-7-7"/></svg><span data-t="ctaMore">${esc(I.en.ctaMore)}</span></a></div>
    <ul class="chips">${['chip1', 'chip2', 'chip3'].map((k) => `<li>${chk}<span data-t="${k}">${esc(I.en[k])}</span></li>`).join('')}</ul>
  </div>
  <div class="hero-vis m-rise">
    <figure class="dev tablet"><img src="assets/img/shot-order-light.webp" width="1280" height="800" alt="${esc(I.en.shotAlt)}" data-alt="shotAlt" fetchpriority="high"></figure>
    <figure class="dev phone"><img src="assets/img/shot-cart-phone.webp" width="412" height="915" alt="${esc(I.en.shotAlt2)}" data-alt="shotAlt2"></figure>
    ${attr('p', 'shotCap', 'class="cap"')}
  </div>
</div></section>
<section class="s" id="features"><div class="wrap">
  ${attr('h2', 'featH')}
  <ul class="grid">${features.map(([ic, k], n) => `<li class="card" data-reveal style="--i:${n % 3}"><div class="ic">${svg(ic)}</div>${attr('h3', k + 't')}${attr('p', k + 'd')}</li>`).join('')}</ul>
</div></section>
<section class="s"><div class="wrap">
  <div class="free" data-reveal><div class="ic">${svg('gift')}</div><div>${attr('h2', 'freeH')}${attr('p', 'freeD')}${attr('p', 'freeN', 'class="fn"')}</div></div>
</div></section>
<section class="s"><div class="wrap">
  ${attr('h2', 'shotsH')}${attr('p', 'shotsD', 'class="sub"')}
  <div class="shots"><figure data-reveal><img src="assets/img/shot-order-dark.webp" width="1280" height="800" loading="lazy" alt="${esc(I.en.s4a)}" data-alt="s4a">${attr('figcaption', 's4c')}</figure><figure data-reveal style="--i:1"><img src="assets/img/shot-manager.webp" width="1280" height="800" loading="lazy" alt="${esc(I.en.s3a)}" data-alt="s3a">${attr('figcaption', 's3c')}</figure></div>
</div></section>
<section class="s"><div class="wrap">
  ${attr('h2', 'goodH')}
  <ul class="good">${goods.map(([ic, k], n) => `<li data-reveal style="--i:${n % 2}"><div class="ic">${svg(ic)}</div>${attr('span', k)}</li>`).join('')}</ul>
  <p class="linkrow"><a href="privacy.html" data-int data-t="trustLink">${esc(I.en.trustLink)}</a></p>
</div></section>
<section class="joincta"><div class="wrap">
  ${attr('h2', 'joinH')}${attr('p', 'joinD')}
  <a class="btn" data-press data-ripple data-int href="join.html">${JOIN_ICON}<span data-t="joinB">${esc(I.en.joinB)}</span></a>
</div></section>
</main>
${FOOTER(I, 'made')}`;
// ---- join (join.html) ----
const live = !!cfg.optInLive;
const stepIcon = { 1: '<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>', 2: '<path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z"/>', 3: '<path d="M12 15V3"/><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><path d="m7 10 5 5 5-5"/>' };
const stepCard = (n, href, locked) => `<li class="step" id="c${n}" data-step="${n}"${locked ? ' data-locked' : ''}>
      <div class="pic" aria-hidden="true"><svg viewBox="0 0 24 24" focusable="false">${stepIcon[n]}</svg></div>
      <div class="body">
        <div class="head"><button class="num" type="button" data-press data-chk="${n}"><span>${n}</span><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12.500l4.500 4.500L19 7.500"/></svg></button>${attr('h2', 's' + n + 't', '', J)}${n === 1 ? '' : ''}</div>
        ${attr('p', 's' + n + 'd', 'class="desc"', J)}
        <a class="btn" data-press data-ripple data-go="${n}" href="${esc(href)}" target="_blank" rel="noopener"${locked ? ' aria-disabled="true"' : ''}><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 17L17 7M9 7h8v8"/></svg>${attr('span', 's' + n + 'b', '', J)}</a>
      </div>
    </li>`;
const q = qrcode(0, 'M'); q.addData(SITE + '/join.html'); q.make(); const qn = q.getModuleCount(), qz = 2; let qd = '';
for (let r = 0; r < qn; r++) for (let c = 0; c < qn; c++) if (q.isDark(r, c)) qd += `M${c + qz} ${r + qz}h1v1h-1z`;
const qrSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${qn + 2 * qz} ${qn + 2 * qz}" shape-rendering="crispEdges"><rect width="100%" height="100%" fill="#fff"/><path d="${qd}" fill="#12141a"/></svg>\n`;
const joinBody = `${HEADER(J)}
<main id="main">
<section class="jhero"><div class="wrap narrow">
  ${attr('h1', 'h1', '', J)}
  <div class="gmail" role="note"><svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="3"/><path d="M4 7.500l8 6 8-6"/></svg><div>${attr('b', 'gm', '', J)}${attr('span', 'gmD', '', J)}</div></div>
  <div class="prog"><div class="bar" aria-hidden="true"><i id="barFill"></i></div><p id="progTxt" aria-live="polite"></p></div>
</div></section>
<section class="wrap narrow steps" id="steps">
  <ol class="cards" data-stagger>
    ${stepCard(1, cfg.groupUrl, false)}
    ${stepCard(2, cfg.optInUrl, !live)}
    ${stepCard(3, cfg.installUrl, !live)}
  </ol>
  <p class="pend" id="pend" role="note"${live ? ' hidden' : ''} data-t="pend">${esc(J.en.pend)}</p>
  <p class="remind" data-t="remH">${esc(J.en.remH)}</p>
  <div class="all" id="all" hidden role="status"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12.500l4.500 4.500L19 7.500"/></svg><div>${attr('b', 'allT', '', J)}${attr('p', 'allD', '', J)}</div></div>
  <div class="retry"><b data-t="retryH">${esc(J.en.retryH)}</b><p class="desc" data-t="retryD">${esc(J.en.retryD)}</p><button class="btn soft" id="reset" type="button" data-press><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/></svg><span data-t="retryB">${esc(J.en.retryB)}</span></button></div>
  <div class="two">
    <div class="panel"><h2 data-t="shareH">${esc(J.en.shareH)}</h2><div class="row"><button class="btn" id="share" type="button" data-press data-ripple><svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" x2="15.42" y1="13.51" y2="17.49"/><line x1="15.41" x2="8.59" y1="6.51" y2="10.49"/></svg><span data-t="share">${esc(J.en.share)}</span></button></div><p class="note" id="shareNote" aria-live="polite"></p></div>
    <div class="panel qr"><h2 data-t="qrH">${esc(J.en.qrH)}</h2><p class="note" data-t="qrD">${esc(J.en.qrD)}</p><img src="assets/join-qr.svg" width="168" height="168" alt="${esc(J.en.qrAlt)}" data-alt="qrAlt"></div>
  </div>
  <div class="faq"><h2 data-t="faqH">${esc(J.en.faqH)}</h2><div class="faqs">${[1, 2, 3, 4, 5, 6, 7, 8].map((n) => `<details><summary data-t="q${n}">${esc(J.en['q' + n])}</summary><p data-t="a${n}">${esc(J.en['a' + n])}</p></details>`).join('')}</div></div>
</section>
</main>
${FOOTER(J, '')}`;
// ---- legal pages (privacy.html, delete-account.html) ----
const mail = (s) => esc(s).replace(new RegExp(esc(cfg.contactEmail).replace(/\./g, '\\.'), 'g'), `<a href="mailto:${esc(cfg.contactEmail)}">${esc(cfg.contactEmail)}</a>`);
const blocks = (bs) => bs.map((b) => typeof b === 'string' ? `<p>${mail(b)}</p>` : b.ul ? `<ul>${b.ul.map((x) => `<li>${mail(x)}</li>`).join('')}</ul>` : `<ol>${b.ol.map((x) => `<li>${mail(x)}</li>`).join('')}</ol>`).join('');
function legal({ file, titleKey, content, otherFile, otherKey }) {
  const sections = LANGS.map(([l]) => { const U = C.UI[l]; return `<section class="lg" lang="${l === 'zh' ? 'zh-Hans' : l}" id="s-${l}"><h1>${esc(U[titleKey])}</h1><p class="meta">${esc(U.app)} · ${esc(U.updated)}: ${esc(cfg.policyDate)}</p>${content[l].map(([h, b]) => `<h2>${esc(h)}</h2>${blocks(b)}`).join('')}<p class="links"><a href="${otherFile}" data-int>${esc(U[otherKey])}</a></p></section>`; }).join('\n');
  const body = `<header class="hd"><div class="hd-in"><a class="back" href="index.html" data-int>← <span data-t="home">${esc(I.en.home)}</span></a>${LANGSEL(I)}</div></header>
<main id="main" class="wrap narrow legal${file === 'privacy.html' ? ' privacy' : ' delete'}">
${sections}
</main>
${FOOTER(I, '')}`;
  const titles = Object.fromEntries(LANGS.map(([l]) => [l, `${C.UI[l][titleKey]} — Moffee`]));
  return { html: shell({ page: file === 'privacy.html' ? 'privacy' : 'delete', file, title: titles.en, desc: titles.en + '. ' + C.UI.en.updated + ': ' + cfg.policyDate, body }), titles };
}
const priv = legal({ file: 'privacy.html', titleKey: 'privacyTitle', content: C.PRIVACY, otherFile: 'delete-account.html', otherKey: 'other' });
const del = legal({ file: 'delete-account.html', titleKey: 'deleteTitle', content: C.DELETE, otherFile: 'privacy.html', otherKey: 'otherP' });
// ---- write ----
fs.rmSync(OUT, { recursive: true, force: true }); fs.mkdirSync(path.join(OUT, 'assets'), { recursive: true }); fs.mkdirSync(path.join(OUT, 'about'), { recursive: true });
const W = (f, s) => fs.writeFileSync(path.join(OUT, f), s);
W('index.html', shell({ page: 'index', file: 'index.html', title: I.en.title, desc: I.en.desc, body: indexBody }));
W('join.html', shell({ page: 'join', file: 'join.html', title: J.en.title, desc: J.en.desc, body: joinBody }));
W('privacy.html', priv.html); W('delete-account.html', del.html);
W('about/index.html', `<!doctype html><html lang="en"><head><meta charset="utf-8"><title>Moffee</title><meta name="robots" content="noindex"><link rel="canonical" href="${SITE}/"><meta http-equiv="refresh" content="0; url=../"><script>location.replace('../'+location.search+location.hash)</script></head><body><p><a href="../">Moffee</a></p></body></html>\n`);
W('404.html', `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Moffee — page not found</title><meta name="robots" content="noindex"><style>body{font:18px/1.6 system-ui,sans-serif;margin:0;display:grid;place-items:center;min-height:100vh;background:#f4f5f7;color:#12141a;text-align:center}a{color:#1d4ed8;font-weight:600}</style></head><body><main><h1>Moffee</h1><p>Page not found.</p><p><a href="${SITE}/">Home</a> · <a href="${SITE}/join.html">Join the test</a> · <a href="${SITE}/privacy.html">Privacy</a></p></main></body></html>\n`);
W('robots.txt', `User-agent: *\nAllow: /\nSitemap: ${SITE}/sitemap.xml\n`);
W('sitemap.xml', `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.w3.org/2005/sitemap/0.9">\n${['', 'join.html', 'privacy.html', 'delete-account.html'].map((p) => `  <url><loc>${SITE}/${p}</loc><lastmod>${cfg.policyDate}</lastmod></url>`).join('\n')}\n</urlset>\n`);
W('.nojekyll', '');
fs.writeFileSync(path.join(OUT, 'assets/strings.js'), '/* generated by scripts/build.mjs from src/strings.mjs and src/content.mjs: do not edit */\nwindow.SITE_STR = ' + JSON.stringify({ intro: INTRO, join: JOIN, titles: { index: Object.fromEntries(L.map((l) => [l, INTRO[l].title])), join: Object.fromEntries(L.map((l) => [l, JOIN[l].title])), privacy: priv.titles, delete: del.titles }, descs: { index: Object.fromEntries(L.map((l) => [l, INTRO[l].desc])), join: Object.fromEntries(L.map((l) => [l, JOIN[l].desc])) } }) + ';\n');
fs.writeFileSync(path.join(OUT, 'assets/join-qr.svg'), qrSvg);
for (const f of ['site.css', 'site.js', 'join.js', 'icon.svg', 'icon-192.png', 'icon-512.png', 'apple-touch-icon.png', 'motion.css', 'motion.js']) fs.copyFileSync(path.join(SRC, 'assets', f), path.join(OUT, 'assets', f));
fs.mkdirSync(path.join(OUT, 'app'), { recursive: true }); for (const f of ['version.json', 'content.json']) { JSON.parse(fs.readFileSync(path.join(SRC, 'app', f), 'utf8')); fs.copyFileSync(path.join(SRC, 'app', f), path.join(OUT, 'app', f)); }   // the Moffee app reads these two files (in-app update notice + notices/changelog)
fs.cpSync(path.join(SRC, 'assets/fonts'), path.join(OUT, 'assets/fonts'), { recursive: true }); fs.cpSync(path.join(SRC, 'assets/img'), path.join(OUT, 'assets/img'), { recursive: true });
console.log(`built docs/: 4 pages x ${L.length} languages (${L.join(', ')}); optInLive=${live}; policy date ${cfg.policyDate}`);
