#!/usr/bin/env node
/**
 * Generates ar/index.html from index.html + translations.js.
 *
 * Why this exists: the Arabic site used to be the same URL with the text
 * swapped in by JavaScript on click. Crawlers only ever saw the English
 * page, so roughly 3,900 characters of Arabic — the whole Arabic site —
 * were invisible to Google, in the country where most of the search
 * demand is Arabic. This pre-renders Arabic as real HTML at its own URL.
 *
 * English stays the source of truth: translations.js is still the only
 * place Arabic strings live, so nothing is maintained twice. Re-run this
 * after editing index.html or translations.js:
 *
 *     node build-ar.js
 *
 * Paths: ar/index.html lives one level down, so every relative asset
 * reference is rewritten to an absolute /path. script.js was changed to
 * use absolute paths for the same reason.
 */

const fs = require('fs');
const path = require('path');

const ROOT = __dirname;
const SRC = path.join(ROOT, 'index.html');
const OUT_DIR = path.join(ROOT, 'ar');
const OUT = path.join(OUT_DIR, 'index.html');

// ── load translations the same way the browser does ──────────────────
const win = {};
new Function('window', fs.readFileSync(path.join(ROOT, 'translations.js'), 'utf8'))(win);
const t = win.DR_USMAN_I18N && win.DR_USMAN_I18N.ar;
if (!t) { console.error('No Arabic translations found'); process.exit(1); }

const get = (obj, keyPath) =>
  keyPath.split('.').reduce((o, k) => (o == null ? undefined : o[k]), obj);

const esc = s => String(s)
  .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const escAttr = s => esc(s).replace(/"/g, '&quot;');

let html = fs.readFileSync(SRC, 'utf8');
const miss = [];

// ── 1. text nodes: data-i18n ─────────────────────────────────────────
// Hero words wrap their text in .hero-word-inner for the GSAP reveal;
// the runtime swaps that inner span, so do the same here.
html = html.replace(
  /(<([a-z0-9]+)\b[^>]*\bdata-i18n="([^"]+)"[^>]*>)([\s\S]*?)(<\/\2>)/gi,
  (m, open, tag, key, inner, close) => {
    const val = get(t, key);
    if (val === undefined) { miss.push(key); return m; }
    if (/hero-word-inner/.test(inner)) {
      return open + inner.replace(
        /(<span class="hero-word-inner"[^>]*>)([\s\S]*?)(<\/span>)/i,
        (mm, a, _b, c) => a + esc(val) + c
      ) + close;
    }
    return open + esc(val) + close;
  }
);

// ── 2. markup: data-i18n-html ────────────────────────────────────────
html = html.replace(
  /(<([a-z0-9]+)\b[^>]*\bdata-i18n-html="([^"]+)"[^>]*>)([\s\S]*?)(<\/\2>)/gi,
  (m, open, tag, key, _inner, close) => {
    const val = get(t, key);
    if (val === undefined) { miss.push(key); return m; }
    return open + val + close;
  }
);

// ── 3. placeholders ──────────────────────────────────────────────────
html = html.replace(
  /<(input|textarea|option)\b([^>]*\bdata-i18n-placeholder="([^"]+)"[^>]*)>/gi,
  (m, tag, attrs, key) => {
    const val = get(t, key);
    if (val === undefined) { miss.push(key); return m; }
    const withPh = /\bplaceholder="/.test(attrs)
      ? attrs.replace(/\bplaceholder="[^"]*"/, `placeholder="${escAttr(val)}"`)
      : attrs + ` placeholder="${escAttr(val)}"`;
    // <option> shows its text, not a placeholder attribute
    return tag.toLowerCase() === 'option'
      ? `<${tag}${withPh}>`
      : `<${tag}${withPh}>`;
  }
);
// the disabled "Procedure of Interest" option carries its label as text
html = html.replace(
  /(<option value="" disabled selected data-i18n-placeholder="contact\.phProc">)[^<]*/i,
  (m, open) => open + esc(t.contact.phProc)
);

// ── 4. procedure accordion ───────────────────────────────────────────
html = html.replace(
  /<div class="pac-item([^"]*)"([^>]*\bdata-proc-idx="(\d+)"[^>]*)>([\s\S]*?)(?=<div class="pac-item|<\/div>\s*<\/div>\s*<\/section>)/gi,
  (m, cls, attrs, idx, body) => {
    const p = t.proc && t.proc.items && t.proc.items[+idx];
    if (!p) { miss.push('proc.items[' + idx + ']'); return m; }
    let b = body
      .replace(/(<[^>]*class="pac-cat"[^>]*>)[\s\S]*?(<\/)/i,   (x, a, c) => a + esc(p.cat) + c)
      .replace(/(<[^>]*class="pac-title"[^>]*>)[\s\S]*?(<\/)/i, (x, a, c) => a + esc(p.title) + c)
      .replace(/(<[^>]*class="pac-desc"[^>]*>)[\s\S]*?(<\/)/i,  (x, a, c) => a + esc(p.desc) + c);
    return `<div class="pac-item${cls}"${attrs}>` + b;
  }
);

// ── 5. document language, direction, and the no-flash bootstrap ──────
html = html.replace('<html lang="en">', '<html lang="ar" dir="rtl">');
html = html.replace(
  /<script>\(function\(\)\{var t=localStorage[\s\S]*?\)\(\);<\/script>/,
  `<script>(function(){var t=localStorage.getItem('dr-usman-theme');document.documentElement.setAttribute('data-theme',t==='light'?'light':'dark');` +
  `/* Language is fixed by the URL here, not by localStorage — this page IS the Arabic one. */` +
  `document.documentElement.setAttribute('data-lang','ar');document.documentElement.setAttribute('dir','rtl');document.documentElement.setAttribute('lang','ar');})();</script>`
);

// ── 6. head: Arabic metadata, canonical and hreflang ─────────────────
const AR_TITLE = 'د. عثمان علي لياقت — جراحة التجميل والترميم | الخبر والدمام';
const AR_DESC  = 'د. عثمان علي لياقت — جراحة التجميل والترميم في الخبر والدمام بالمملكة العربية السعودية. أكثر من ٩ سنوات خبرة و‏٦٠٠٠+ عملية.';

html = html.replace(/<title>[\s\S]*?<\/title>/, `<title>${esc(AR_TITLE)}</title>`);
html = html.replace(/(<meta name="description" content=")[^"]*(")/, `$1${escAttr(AR_DESC)}$2`);
html = html.replace(
  /<meta name="keywords" content="[^"]*"\/>/,
  '<meta name="keywords" content="جراح تجميل الخبر, جراح تجميل الدمام, عمليات تجميل السعودية, شد البطن, نحت الجسم, تجميل الأنف, حقن المؤخرة"/>'
);
html = html.replace('<link rel="canonical" href="https://drusmanpk.com/"/>',
                    '<link rel="canonical" href="https://drusmanpk.com/ar/"/>');
html = html.replace(/<link rel="alternate" hreflang="ar" href="[^"]*"\/>/,
                    '<link rel="alternate" hreflang="ar" href="https://drusmanpk.com/ar/"/>');
html = html.replace(/(<meta property="og:url" content=")[^"]*(")/, '$1https://drusmanpk.com/ar/$2');
html = html.replace(/(<meta property="og:title" content=")[^"]*(")/, `$1${escAttr(AR_TITLE)}$2`);
html = html.replace(/(<meta property="og:description" content=")[^"]*(")/, `$1${escAttr(AR_DESC)}$2`);
html = html.replace(/(<meta name="twitter:title" content=")[^"]*(")/, `$1${escAttr(AR_TITLE)}$2`);
html = html.replace(/(<meta name="twitter:description" content=")[^"]*(")/, `$1${escAttr(AR_DESC)}$2`);
html = html.replace('<meta property="og:locale" content="en_US"/>', '<meta property="og:locale" content="ar_SA"/>');
html = html.replace('<meta property="og:locale:alternate" content="ar_SA"/>', '<meta property="og:locale:alternate" content="en_US"/>');
html = html.replace('"@id": "https://drusmanpk.com/#physician"', '"@id": "https://drusmanpk.com/ar/#physician"');
html = html.replace('"url": "https://drusmanpk.com/",\n        "image"', '"url": "https://drusmanpk.com/ar/",\n        "image"');

// ── 7. absolute asset paths (this file sits one directory down) ──────
const abs = u => /^(?:https?:|\/|#|mailto:|tel:|data:)/.test(u) ? u : '/' + u;
html = html
  // srcset is a comma-separated candidate list: every URL in it needs the
  // prefix, not just the first. Missing the later ones 404s silently at the
  // widths that actually get used on desktop.
  .replace(/\bsrcset="([^"]*)"/g, (m, list) =>
    'srcset="' + list.split(',').map(part => {
      const seg = part.trim().split(/\s+/);
      if (!seg[0]) return part.trim();
      seg[0] = abs(seg[0]);
      return seg.join(' ');
    }).join(', ') + '"')
  .replace(/(\b(?:href|src|data-src)=")([^"]*)"/g, (m, a, u) => a + abs(u) + '"')
  .replace(/("(?:before|after)":")([^"]*)"/g, (m, a, u) => a + abs(u) + '"');

// ── 8. language toggle becomes a real crawlable link ─────────────────
// A button swapping text client-side gives crawlers no path between the
// two language versions. hreflang alone is a hint; a real <a> is a route.
html = html.replace(
  /<a class="lang-toggle[^"]*" id="langToggle"[\s\S]*?<\/a>/,
  '<a class="lang-toggle lang-link" id="langToggle" href="/" hreflang="en" aria-label="Switch to English">\n' +
  '    <span class="lt-opt" data-val="en">EN</span>\n' +
  '    <span class="lt-opt lt-active" data-val="ar">AR</span>\n' +
  '    <span class="lt-indicator"></span>\n  </a>'
);

fs.mkdirSync(OUT_DIR, { recursive: true });
fs.writeFileSync(OUT, html, 'utf8');

const arChars = (html.replace(/<script[\s\S]*?<\/script>/g, '').match(/[؀-ۿ]/g) || []).length;
console.log('wrote ar/index.html');
console.log('  Arabic characters in indexable markup:', arChars);
if (miss.length) console.log('  MISSING translation keys:', [...new Set(miss)].join(', '));
