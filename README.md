# Animesh Shrestha

Source for my personal site. It has my research, experience, education, projects, writing, and CV.

Live site: https://www.animeshshrestha.com

## Development

```bash
npm install
npm run dev       # localhost:5173
npm run build     # writes dist/
npm run preview   # serves dist/
```

## Structure

```text
src/content.js        all site text: research, experience, education, projects, writing, news
src/data/             the Treasury spread series used by the charts
src/components/       page sections, the charts, the command menu
src/index.css         the whole stylesheet; colors, type, and spacing are variables at the top
public/assets/        CV, portrait, research poster
```

To update the site, edit `src/content.js`. To update the CV, replace `public/assets/Animesh_CV.pdf` and keep the file name. The site links to that path, and `/cv` serves the same file.

## Stack

- React 18 and React Router
- Vite
- Plain CSS, no framework
- STIX Two Text and STIX Two Math, self-hosted via Fontsource

There are no animation or UI libraries. The interactive parts are the charts, the command menu, and the theme toggle.

## The line under my name

The line across the top of the home page is the 10-year minus 3-month Treasury spread, monthly from 1962 to 2025. Months where it was negative are filled in the accent blue. NBER recessions are shaded. The data are FRED series (GS10, TB3MS, USREC) from my [recession-nowcasting](https://github.com/Animeshav14/recession-nowcasting) project, converted to a small array in `src/data/yieldSpread.js`.

`Horizon.jsx` draws it as one SVG path, stretched to the window width with `preserveAspectRatio="none"` and a non-scaling stroke, so it stays a hairline at any size. Hovering, dragging on a phone, or focusing it and using the arrow keys shows the month and value. The same data drives the chart in the research section (`SpreadChart.jsx`) and the link-preview image, `public/og.png`, which `npm run og` regenerates (`scripts/og.mjs`, Playwright). The favicon is a hand-drawn sketch of it.

## Other details

- Ctrl+K (⌘K on a Mac), or the "Command menu" button in the footer, opens a menu for jumping to sections, opening the CV, or copying my email.
- Light and dark themes follow the system setting until you pick one. The choice is saved in `localStorage` and applied before first paint.
- With reduced motion on, the line's draw-in and the smooth scrolling are turned off.

## Deployment

Hosted on Vercel. `vercel.json` rewrites every path to `index.html`, so client-side routes like `/writing` load when opened directly. `/blogs`, the old address of the writing page, redirects there permanently.
