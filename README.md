# animeshshrestha.com

Personal site of Animesh Shrestha — economics and mathematics, Georgia State University.

React + Vite, plain CSS, no UI or animation libraries. Deployed on Vercel.

```bash
npm install
npm run dev       # http://localhost:5173
npm run build     # outputs dist/
npm run preview   # serve the build
```

## Where things are

| Path | What it holds |
| --- | --- |
| `src/content.js` | Every fact on the site: research, experience, education, writing, news. Edit this, not the components. The CV is the source of truth. |
| `public/assets/Animesh_CV.pdf` | The CV. Replace the file (same name) to update it; `/cv` redirects here. |
| `src/data/yieldSpread.js` | Monthly 10y–3m Treasury spread and NBER recession months, 1962–2025, from the `recession-nowcasting` repo. Drives the line under the name, the figure in §1.4, the favicon, and `public/og.png`. |
| `src/index.css` | The design system: tokens (color, type, spacing) at the top, then components. Light/dark palettes share token names. |
| `src/components/Horizon.jsx` | The full-width spread line under the name. Hover, touch, or arrow keys read out a month. |
| `src/components/CommandPalette.jsx` | Ctrl/⌘ K menu. |
| `public/game/` | The small runner game, loaded only when the "Intermission" is opened. |
| `vercel.json` | SPA rewrites (so `/blogs` and unknown paths resolve) and the `/cv` shortcut. |

## Type and color

Newsreader for text and display, IBM Plex Sans for labels, dates, and navigation (both from Google Fonts). One accent — oxblood `#8a2c1d` in light mode, `#e39a7e` in dark — used for links and for the months the yield curve was inverted.
