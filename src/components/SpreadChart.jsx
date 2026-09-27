import React, { useMemo, useRef, useState } from 'react';
import { spread, recessions } from '../data/yieldSpread.js';

const W = 560;
const H = 190;
const PAD = { top: 8, right: 6, bottom: 20, left: 26 };
const Y_MIN = -3;
const Y_MAX = 5;

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

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
    const ticks = [];
    for (let yr = 1970; yr <= 2020; yr += 10) ticks.push({ yr, x: x(`${yr}-01`) });
    return { line: linePath, inverted: invPath, recRects: rects, yearTicks: ticks };
  }, []);

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

  return (
    <div className="chart">
      <svg
        ref={svgRef}
        viewBox={`0 0 ${W} ${H}`}
        role="img"
        aria-label="Line chart of the 10-year minus 3-month Treasury spread, monthly, 1962 to 2025, with recessions shaded. The spread turns negative before each recession. Use left and right arrow keys to read values."
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
          <g className="axis">
            {[-2, 0, 2, 4].map((v) => (
              <text key={v} x={PAD.left - 6} y={y(v) + 3.5} textAnchor="end">
                {v < 0 ? `−${-v}` : v}
              </text>
            ))}
            {yearTicks.map((t) => (
              <text key={t.yr} x={t.x} y={H - 5} textAnchor="middle">
                {t.yr}
              </text>
            ))}
          </g>
          {point && (
            <g className="cursor">
              <line x1={x(point[0])} x2={x(point[0])} y1={PAD.top} y2={H - PAD.bottom} />
              <circle cx={x(point[0])} cy={y(point[1])} r={3.5} />
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
