import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { spread, recessions } from '../data/yieldSpread.js';

// The 10-year minus 3-month Treasury spread, every month since 1962, from the
// recession-nowcasting project. On the home page it is the hero: drawn edge
// to edge with a large readout beside the name. Elsewhere (compact) it is a
// thin strip at the top of the page.

const VB_W = 1000;
const VB_H = 100;
const Y_MIN = -3;
const Y_MAX = 5;
const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

const n = spread.length;
const xOf = (i) => (i / (n - 1)) * VB_W;
const yOf = (v) => ((Y_MAX - v) / (Y_MAX - Y_MIN)) * VB_H;
const idxOf = (ym) => spread.findIndex(([d]) => d === ym);
const pct = (i) => (i / (n - 1)) * 100;

const DECADES = [1970, 1980, 1990, 2000, 2010, 2020].map((yr) => ({ yr, left: pct(idxOf(`${yr}-01`)) }));
const FIRST_YEAR = spread[0][0].slice(0, 4);
const LAST_YEAR = spread[n - 1][0].slice(0, 4);

// The draw-in plays on the first page view of a session only.
const DRAWN_KEY = 'horizon-drawn';

function alreadyDrawn() {
  try {
    return sessionStorage.getItem(DRAWN_KEY) === '1';
  } catch {
    return true;
  }
}

function label(ym) {
  const [y, m] = ym.split('-').map(Number);
  return `${MONTHS[m - 1]} ${y}`;
}

function signed(v) {
  return `${v < 0 ? '−' : v > 0 ? '+' : ''}${Math.abs(v).toFixed(2)}`;
}

const inRecession = (ym) => recessions.some(([a, b]) => ym >= a && ym <= b);

export default function Horizon({ compact = false, head = null }) {
  const { line, inv, bands, zero } = useMemo(() => {
    const z = yOf(0);
    return {
      line: 'M' + spread.map(([, v], i) => `${xOf(i).toFixed(2)},${yOf(v).toFixed(2)}`).join('L'),
      inv:
        `M0,${z}` +
        spread.map(([, v], i) => `L${xOf(i).toFixed(2)},${yOf(Math.min(v, 0)).toFixed(2)}`).join('') +
        `L${VB_W},${z}Z`,
      bands: recessions.map(([a, b]) => {
        const i = Math.max(idxOf(a), 0);
        const j = idxOf(b) < 0 ? n - 1 : idxOf(b);
        return { key: a, x: xOf(i), w: Math.max(xOf(j) - xOf(i), 1.2) };
      }),
      zero: z,
    };
  }, []);

  const [i, setI] = useState(null);
  const ref = useRef(null);
  const [animate] = useState(() => !compact && !alreadyDrawn());

  useEffect(() => {
    if (!animate) return;
    try {
      sessionStorage.setItem(DRAWN_KEY, '1');
    } catch {
      /* storage unavailable: nothing to remember */
    }
  }, [animate]);

  const pick = (clientX) => {
    const r = ref.current.getBoundingClientRect();
    const t = Math.min(Math.max((clientX - r.left) / r.width, 0), 1);
    setI(Math.round(t * (n - 1)));
  };

  const onKey = (e) => {
    const map = { ArrowLeft: -1, ArrowRight: 1, Home: -Infinity, End: Infinity };
    if (!(e.key in map)) return;
    e.preventDefault();
    const step = map[e.key] * (e.shiftKey ? 12 : 1);
    setI((cur) => Math.min(Math.max((cur ?? n - 1) + step, 0), n - 1));
  };

  const p = i != null ? spread[i] : null;
  const leftPct = i != null ? pct(i) : 0;
  const topPct = p ? (yOf(p[1]) / VB_H) * 100 : 0;

  // The large readout shows the latest month until someone points at the line.
  const shown = p ?? spread[n - 1];
  const flags = [shown[1] < 0 && 'inverted', inRecession(shown[0]) && 'recession'].filter(Boolean);

  const plot = (
    <div
      ref={ref}
      className="horizon-plot"
      tabIndex={0}
      role="img"
      aria-label={`The 10-year minus 3-month U.S. Treasury spread, monthly from ${FIRST_YEAR} to ${LAST_YEAR}. Periods when it falls below zero are filled in blue; recessions are shaded. Arrow keys step through months, Shift with an arrow steps a year.`}
      onPointerMove={(e) => pick(e.clientX)}
      onPointerDown={(e) => pick(e.clientX)}
      onPointerLeave={(e) => e.pointerType === 'mouse' && setI(null)}
      onKeyDown={onKey}
      onBlur={() => setI(null)}
    >
      <svg viewBox={`0 0 ${VB_W} ${VB_H}`} preserveAspectRatio="none" aria-hidden="true">
        {bands.map((b) => (
          <rect key={b.key} className="h-rec" x={b.x} y="0" width={b.w} height={VB_H} />
        ))}
        <line className="h-zero" x1="0" x2={VB_W} y1={zero} y2={zero} vectorEffect="non-scaling-stroke" />
        <path className="h-inv" d={inv} />
        <path className="h-line" d={line} vectorEffect="non-scaling-stroke" />
      </svg>
      {p && (
        <>
          <span className="h-cursor" style={{ left: `${leftPct}%` }} aria-hidden="true" />
          <span className="h-dot" style={{ left: `${leftPct}%`, top: `${topPct}%` }} aria-hidden="true" />
        </>
      )}
    </div>
  );

  if (compact) {
    return (
      <div className="horizon compact">
        <div className="horizon-stage">
          {plot}
          {/* Outside the role="img" element so screen readers announce it. */}
          <p className={`h-read ${leftPct > 70 ? 'flip' : ''}`} style={{ left: `${leftPct}%` }} aria-live="polite">
            {p && (
              <>
                <b>{label(p[0])}</b> {signed(p[1])} pp
                {flags.map((f) => (
                  <em key={f}> {f}</em>
                ))}
              </>
            )}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className={['horizon', 'hero-horizon', animate && 'animate'].filter(Boolean).join(' ')}>
      <div className="frame horizon-head">
        {head}
        <div className={`h-big${shown[1] < 0 ? ' is-inv' : ''}`} aria-live="polite" aria-atomic="true">
          <p className="h-big-when">
            {label(shown[0])}
            {!p && <span className="h-big-note">, latest month</span>}
          </p>
          <p className="h-big-val">
            {signed(shown[1])}
            <span className="h-big-unit"> pp</span>
          </p>
          <p className="h-big-flags">
            {flags.length ? flags.join(', ') : '10-year minus 3-month'}
          </p>
        </div>
      </div>

      <div className="horizon-stage">
        {plot}
        <span className="h-zero-label" style={{ top: `${(zero / VB_H) * 100}%` }} aria-hidden="true">
          0
        </span>
      </div>

      <div className="h-axis" aria-hidden="true">
        {DECADES.map((d) => (
          <span key={d.yr} className={d.yr % 20 === 0 ? 'major' : undefined} style={{ left: `${d.left}%` }}>
            {d.yr}
          </span>
        ))}
      </div>

      <div className="frame horizon-legend meta">
        <span className="h-legend-items">
          <span>
            10-year minus 3-month Treasury spread, monthly, {FIRST_YEAR}–{LAST_YEAR}, percentage points
          </span>
          <span className="nowrap">
            <span className="h-key-inv" aria-hidden="true" />
            inverted
          </span>
          <span className="nowrap">
            <span className="h-key-rec" aria-hidden="true" />
            recession
          </span>
        </span>
        <Link className="hit" to={{ pathname: '/', hash: '#yield-curve' }}>
          What is this line?
        </Link>
      </div>
    </div>
  );
}

// A static, silent copy of the line for the foot of every page.
export function SpreadRule() {
  const z = yOf(0);
  const line = 'M' + spread.map(([, v], i) => `${xOf(i).toFixed(1)},${yOf(v).toFixed(1)}`).join('L');
  const inv =
    `M0,${z}` + spread.map(([, v], i) => `L${xOf(i).toFixed(1)},${yOf(Math.min(v, 0)).toFixed(1)}`).join('') + `L${VB_W},${z}Z`;
  return (
    <svg className="spread-rule" viewBox={`0 0 ${VB_W} ${VB_H}`} preserveAspectRatio="none" aria-hidden="true" focusable="false">
      <path className="h-inv" d={inv} />
      <path className="h-line" d={line} vectorEffect="non-scaling-stroke" />
    </svg>
  );
}
