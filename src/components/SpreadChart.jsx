import React, { useEffect, useMemo, useRef, useState } from 'react';
import { spread, recessions } from '../data/yieldSpread.js';

// The research figure. The viewBox follows the container's pixel width, so
// axis text stays the same size whether the chart is 330 or 1300px wide.

const PAD = { top: 16, right: 8, bottom: 26, left: 30 };
const Y_MIN = -3;
const Y_MAX = 5;

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

// The 2022–24 inversion: the months the spread stayed below zero.
const LATE = spread.filter(([d, v]) => d >= '2022-01' && v < 0);
const LATE_FROM = LATE[0][0];
const LATE_TO = LATE[LATE.length - 1][0];

function monthIndex(ym) {
  const [y, m] = ym.split('-').map(Number);
  return y * 12 + (m - 1);
}

function formatMonth(ym) {
  const [y, m] = ym.split('-').map(Number);
  return `${MONTHS[m - 1]} ${y}`;
}

function formatValue(v) {
  const sign = v < 0 ? '−' : v > 0 ? '+' : '';
  return `${sign}${Math.abs(v).toFixed(2)}`;
}

export default function SpreadChart() {
  const wrapRef = useRef(null);
  const [W, setW] = useState(640);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el || typeof ResizeObserver === 'undefined') return;
    const ro = new ResizeObserver(([entry]) => setW(Math.max(280, Math.round(entry.contentRect.width))));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const H = Math.round(Math.min(Math.max(W * 0.3, 220), 400));
  const first = monthIndex(spread[0][0]);
  const last = monthIndex(spread[spread.length - 1][0]);
  const x = (ym) => PAD.left + ((monthIndex(ym) - first) / (last - first)) * (W - PAD.left - PAD.right);
  const y = (v) => PAD.top + ((Y_MAX - v) / (Y_MAX - Y_MIN)) * (H - PAD.top - PAD.bottom);

  const { line, inverted, recRects, yearTicks } = useMemo(() => {
    const pts = spread.map(([d, v]) => [x(d), y(v)]);
    const linePath = 'M' + pts.map(([a, b]) => `${a.toFixed(1)},${b.toFixed(1)}`).join('L');
    const zero = y(0).toFixed(1);
    const invPath =
      `M${pts[0][0].toFixed(1)},${zero}` +
      spread.map(([d, v]) => `L${x(d).toFixed(1)},${y(Math.min(v, 0)).toFixed(1)}`).join('') +
      `L${pts[pts.length - 1][0].toFixed(1)},${zero}Z`;
    const rects = recessions.map(([a, b]) => ({ key: a, x: x(a), w: Math.max(x(b) - x(a), 1.5) }));
    const step = W < 520 ? 20 : 10;
    const ticks = [];
    for (let yr = 1970; yr <= 2020; yr += step) ticks.push({ yr, x: x(`${yr}-01`) });
    return { line: linePath, inverted: invPath, recRects: rects, yearTicks: ticks };
  }, [W, H]);

  const [active, setActive] = useState(null);
  const svgRef = useRef(null);

  const pick = (clientX) => {
    const rect = svgRef.current.getBoundingClientRect();
    const px = ((clientX - rect.left) / rect.width) * W;
    const t = (px - PAD.left) / (W - PAD.left - PAD.right);
    const i = Math.round(Math.min(Math.max(t, 0), 1) * (spread.length - 1));
    setActive(i);
  };

  const onKey = (e) => {
    if (e.key !== 'ArrowLeft' && e.key !== 'ArrowRight') return;
    e.preventDefault();
    const step = e.shiftKey ? 12 : 1;
    setActive((i) => {
      const cur = i ?? spread.length - 1;
      return Math.min(Math.max(cur + (e.key === 'ArrowRight' ? step : -step), 0), spread.length - 1);
    });
  };

  const inRecession = (ym) => recessions.some(([a, b]) => ym >= a && ym <= b);
  const point = active != null ? spread[active] : null;

  const lateX1 = x(LATE_FROM);
  const lateX2 = x(LATE_TO);
  const lateY = y(-2.2);

  return (
    <div className="chart" ref={wrapRef}>
      <svg
        ref={svgRef}
        viewBox={`0 0 ${W} ${H}`}
        width={W}
        height={H}
        role="img"
        aria-label="Line chart of the 10-year minus 3-month Treasury spread, monthly, 1962 to 2025, with recessions shaded. The spread turns negative before each recession; it was also negative from November 2022 to November 2024, with no recession following. Use left and right arrow keys to read values."
        tabIndex={0}
        onPointerMove={(e) => pick(e.clientX)}
        onPointerDown={(e) => pick(e.clientX)}
        onPointerLeave={() => setActive(null)}
        onKeyDown={onKey}
        onBlur={() => setActive(null)}
      >
        <g aria-hidden="true">
          {recRects.map((r) => (
            <rect key={r.key} className="rec" x={r.x} y={PAD.top} width={r.w} height={H - PAD.top - PAD.bottom} />
          ))}
          <g className="grid">
            {[-2, 2, 4].map((v) => (
              <line key={v} x1={PAD.left} x2={W - PAD.right} y1={y(v)} y2={y(v)} />
            ))}
          </g>
          <path className="inverted" d={inverted} />
          <line className="zero" x1={PAD.left} x2={W - PAD.right} y1={y(0)} y2={y(0)} />
          <path className="series" d={line} />
          <g className="note-mark">
            <line x1={lateX1} x2={lateX2} y1={lateY} y2={lateY} />
            <line x1={lateX1} x2={lateX1} y1={lateY - 4} y2={lateY} />
            <line x1={lateX2} x2={lateX2} y1={lateY - 4} y2={lateY} />
            <text x={lateX2} y={lateY + 16} textAnchor="end">
              2022–24: inverted, no recession
            </text>
          </g>
          <g className="axis">
            {[-2, 0, 2, 4].map((v) => (
              <text key={v} x={PAD.left - 8} y={y(v) + 4} textAnchor="end">
                {v < 0 ? `−${-v}` : v}
              </text>
            ))}
            {yearTicks.map((t) => (
              <text key={t.yr} x={t.x} y={H - 6} textAnchor="middle">
                {t.yr}
              </text>
            ))}
          </g>
          {point && (
            <g className="cursor">
              <line x1={x(point[0])} x2={x(point[0])} y1={PAD.top} y2={H - PAD.bottom} />
              <circle cx={x(point[0])} cy={y(point[1])} r={4} />
            </g>
          )}
        </g>
      </svg>
      <p className="chart-readout" aria-live="polite">
        {point ? (
          <>
            {formatMonth(point[0])}: {formatValue(point[1])} pp
            {inRecession(point[0]) ? ' · NBER recession' : ''}
          </>
        ) : (
          <span className="muted">Hover, or focus and use the arrow keys, to read a month.</span>
        )}
      </p>
    </div>
  );
}
