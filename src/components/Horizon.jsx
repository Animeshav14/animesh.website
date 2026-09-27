import React, { useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { spread, recessions } from '../data/yieldSpread.js';

// The line under the name: the 10-year minus 3-month Treasury spread, every
// month since 1962, from the recession-nowcasting project. Drawn edge to edge,
// stretched with a non-scaling stroke so it stays a hairline at any width.

const VB_W = 1000;
const VB_H = 100;
const Y_MIN = -3;
const Y_MAX = 5;
const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

const n = spread.length;
const xOf = (i) => (i / (n - 1)) * VB_W;
const yOf = (v) => ((Y_MAX - v) / (Y_MAX - Y_MIN)) * VB_H;
const idxOf = (ym) => spread.findIndex(([d]) => d === ym);

function label(ym) {
  const [y, m] = ym.split('-').map(Number);
  return `${MONTHS[m - 1]} ${y}`;
}

function signed(v) {
  return `${v < 0 ? '−' : v > 0 ? '+' : ''}${Math.abs(v).toFixed(2)}`;
}

export default function Horizon({ compact = false }) {
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
  const inRec = p && recessions.some(([a, b]) => p[0] >= a && p[0] <= b);
  const leftPct = i != null ? (i / (n - 1)) * 100 : 0;
  const topPct = p ? (yOf(p[1]) / VB_H) * 100 : 0;

  return (
    <div className={compact ? 'horizon compact' : 'horizon'}>
      <div
        ref={ref}
        className="horizon-plot"
        tabIndex={0}
        role="img"
        aria-label="The 10-year minus 3-month U.S. Treasury spread, monthly from 1962 to 2025. Periods when it falls below zero are filled in blue; recessions are shaded. Arrow keys step through months."
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
            <span
              className={`h-read ${leftPct > 70 ? 'flip' : ''}`}
              style={{ left: `${leftPct}%` }}
              aria-live="polite"
            >
              <b>{label(p[0])}</b> {signed(p[1])} pp{inRec ? <em> recession</em> : null}
              {p[1] < 0 ? <em> inverted</em> : null}
            </span>
          </>
        )}
      </div>
      {!compact && (
      <div className="frame horizon-legend meta">
        <span className="h-legend-items">
          <span>10-year minus 3-month Treasury spread, 1962–2025</span>
          <span className="nowrap">
            <span className="h-key-inv" aria-hidden="true" />
            inverted
          </span>
          <span className="nowrap">
            <span className="h-key-rec" aria-hidden="true" />
            recession
          </span>
        </span>
        <Link to={{ pathname: '/', hash: '#yield-curve' }}>What is this line?</Link>
      </div>
      )}
    </div>
  );
}
