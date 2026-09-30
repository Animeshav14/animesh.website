// Renders public/og.png (1200x630): the name above the 10y-3m spread line,
// in STIX Two Text on the site's black canvas.
//
//   npm run og
//
// Uses Playwright's Chromium (install once with `npx playwright install chromium`).
// Set CDP_URL to attach to a browser that is already running instead, for
// example CDP_URL=http://127.0.0.1:9222.

import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { chromium } from 'playwright';
import { spread, recessions } from '../src/data/yieldSpread.js';

const root = fileURLToPath(new URL('..', import.meta.url));
const font = (file) =>
  readFileSync(`${root}node_modules/@fontsource/stix-two-text/files/${file}`).toString('base64');

const color = {
  paper: '#000000',
  ink: '#f1f0ec',
  ink3: '#8d8c87',
  accent: '#5a84ff',
  shade: '#1f2024',
  zero: '#45464b',
};

const W = 1200;
const H = 170;
const n = spread.length;
const x = (i) => (i / (n - 1)) * W;
const y = (v) => ((5 - v) / 8) * H;
const index = new Map(spread.map(([d], i) => [d, i]));

const line = 'M' + spread.map(([, v], i) => `${x(i).toFixed(1)},${y(v).toFixed(1)}`).join('L');
const inverted =
  `M0,${y(0)}` + spread.map(([, v], i) => `L${x(i).toFixed(1)},${y(Math.min(v, 0)).toFixed(1)}`).join('') + `L${W},${y(0)}Z`;
const bands = recessions
  .map(([a, b]) => {
    const i = index.get(a) ?? 0;
    const j = index.get(b) ?? n - 1;
    return `<rect x="${x(i).toFixed(1)}" y="0" width="${Math.max(x(j) - x(i), 2).toFixed(1)}" height="${H}" fill="${color.shade}"/>`;
  })
  .join('');

const html = `<!doctype html>
<html><head><meta charset="utf-8"><style>
@font-face { font-family: 'STIX Two Text'; font-weight: 400; src: url(data:font/woff2;base64,${font('stix-two-text-latin-400-normal.woff2')}) format('woff2'); }
html, body { margin: 0; }
body { width: 1200px; height: 630px; position: relative; overflow: hidden; background: ${color.paper}; color: ${color.ink}; font-family: 'STIX Two Text', serif; }
.kicker { position: absolute; left: 80px; top: 78px; font-size: 24px; color: ${color.ink3}; }
.kicker span { margin: 0 12px; color: ${color.zero}; }
h1 { position: absolute; left: 80px; top: 118px; margin: 0; font-size: 116px; font-weight: 400; line-height: 1; letter-spacing: -0.015em; }
svg { position: absolute; left: 0; top: 330px; }
.foot { position: absolute; left: 80px; right: 80px; bottom: 60px; display: flex; justify-content: space-between; font-size: 24px; color: ${color.ink3}; }
.foot b { font-weight: 400; color: ${color.accent}; }
</style></head><body>
<div class="kicker">Economics &amp; mathematics<span>/</span>Georgia State University</div>
<h1>Animesh Shrestha</h1>
<svg width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">${bands}
<line x1="0" x2="${W}" y1="${y(0)}" y2="${y(0)}" stroke="${color.zero}" stroke-dasharray="3 4"/>
<path d="${inverted}" fill="${color.accent}" fill-opacity="0.88"/>
<path d="${line}" fill="none" stroke="${color.ink}" stroke-width="2" stroke-linejoin="round"/></svg>
<div class="foot"><span>Health-care price indices · trade agreements and capital flows · the yield curve</span><b>animeshshrestha.com</b></div>
</body></html>`;

const browser = process.env.CDP_URL ? await chromium.connectOverCDP(process.env.CDP_URL) : await chromium.launch();
const context = await browser.newContext({ viewport: { width: 1200, height: 630 } });
const page = await context.newPage();
await page.setContent(html);
await page.evaluate(() => document.fonts.ready);
await page.screenshot({ path: `${root}public/og.png` });
await context.close();
await browser.close();
console.log('wrote public/og.png');
