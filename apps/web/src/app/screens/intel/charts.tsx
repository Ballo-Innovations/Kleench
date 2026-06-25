// Lightweight SVG charts for the Market Intelligence flow.
// Pure presentational — match the existing inline-SVG / token styling.

type Series = { id: string; label: string; color: string; data: number[] };

function indexed(data: number[]) {
  const base = data[0] || 1;
  return data.map((v) => (v / base) * 100);
}

function pointFor(v: number, i: number, len: number, w: number, h: number, min: number, max: number) {
  const range = max - min || 1;
  const x = len > 1 ? (i / (len - 1)) * w : 0;
  const y = h - ((v - min) / range) * h;
  return { x, y };
}

function buildPath(data: number[], w: number, h: number, min: number, max: number) {
  const points = data.map((v, i) => pointFor(v, i, data.length, w, h, min, max));
  if (points.length < 2) return "";

  return points.reduce((path, point, i) => {
    if (i === 0) return `M ${point.x.toFixed(2)} ${point.y.toFixed(2)}`;
    const prev = points[i - 1];
    const midX = (prev.x + point.x) / 2;
    return `${path} C ${midX.toFixed(2)} ${prev.y.toFixed(2)} ${midX.toFixed(2)} ${point.y.toFixed(2)} ${point.x.toFixed(2)} ${point.y.toFixed(2)}`;
  }, "");
}

/** Single-series sparkline (used in list rows / small cards). */
export function Sparkline({ data, color = "var(--color-primary)", className = "", strokeWidth = 2 }: {
  data: number[]; color?: string; className?: string; strokeWidth?: number;
}) {
  const w = 100, h = 40;
  const min = Math.min(...data), max = Math.max(...data);
  const path = buildPath(data, w, h, min, max);
  const start = pointFor(data[0], 0, data.length, w, h, min, max);
  const end = pointFor(data[data.length - 1], data.length - 1, data.length, w, h, min, max);
  const baseY = pointFor(data[0], 0, data.length, w, h, min, max).y;
  const gid = `spark-${color.replace(/[^a-zA-Z0-9]/g, "")}-${data.length}`;
  return (
    <svg viewBox={`0 0 ${w} ${h}`} className={className} preserveAspectRatio="none">
      <defs>
        <linearGradient id={gid} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.16" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      <line x1="0" y1={baseY} x2={w} y2={baseY} stroke="currentColor" strokeOpacity="0.1" strokeWidth="1" vectorEffect="non-scaling-stroke" strokeDasharray="3 4" />
      <path d={`${path} L ${w} ${h} L 0 ${h} Z`} fill={`url(#${gid})`} />
      <path d={path} fill="none" stroke={color}
        strokeWidth={strokeWidth} vectorEffect="non-scaling-stroke" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx={start.x} cy={start.y} r="2" fill="var(--app-bg)" stroke={color} strokeWidth="1.5" vectorEffect="non-scaling-stroke" opacity="0.75" />
      <circle cx={end.x} cy={end.y} r="2.6" fill={color} vectorEffect="non-scaling-stroke" />
    </svg>
  );
}

/** Single-series area line with axis labels (commodity trend). */
export function AreaLine({ data, color = "var(--color-primary)", axis, className = "" }: {
  data: number[]; color?: string; axis?: string[]; className?: string;
}) {
  const w = 280, h = 90;
  const min = Math.min(...data), max = Math.max(...data);
  const path = buildPath(data, w, h, min, max);
  const gid = `area-${color.replace(/[^a-zA-Z0-9]/g, "")}-${data.length}`;
  const range = max - min || 1;
  const toX = (i: number) => (i / (data.length - 1)) * w;
  const toY = (v: number) => h - ((v - min) / range) * h;
  const baselineY = toY(data[0]);
  return (
    <div className={className}>
      <svg viewBox={`0 0 ${w} ${h}`} className="w-full h-[120px]" preserveAspectRatio="none">
        <defs>
          <linearGradient id={gid} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={color} stopOpacity="0.18" />
            <stop offset="100%" stopColor={color} stopOpacity="0" />
          </linearGradient>
        </defs>
        <path d={`${path} L ${w} ${h} L 0 ${h} Z`} fill={`url(#${gid})`} />
        <line x1="0" y1={baselineY} x2={w} y2={baselineY} stroke="var(--color-secondary)" strokeWidth="1" strokeOpacity="0.22" strokeDasharray="6 5" vectorEffect="non-scaling-stroke" />
        {[0.25, 0.5, 0.75].map((g) => (
          <line key={g} x1="0" y1={h * g} x2={w} y2={h * g}
            stroke="var(--border)" strokeWidth="1" vectorEffect="non-scaling-stroke" opacity="0.45" />
        ))}
        <path d={path} fill="none" stroke={color} strokeWidth="2.5"
          vectorEffect="non-scaling-stroke" strokeLinecap="round" strokeLinejoin="round" />
        {data.map((v, i) => (
          <circle key={i} cx={toX(i)} cy={toY(v)} r={i === data.length - 1 ? "3.2" : "2.3"} fill={i === data.length - 1 ? color : "var(--app-bg)"} stroke={color} strokeWidth="2" vectorEffect="non-scaling-stroke" />
        ))}
      </svg>
      {axis && (
        <div className="flex justify-between mt-1.5">
          {axis.map((a, i) => (
            <span key={i} className="text-[7px] font-black uppercase tracking-wide text-[var(--app-text)]/30">{a}</span>
          ))}
        </div>
      )}
    </div>
  );
}

/** Multi-series line chart (Market Overview / Product Comparison). */
export function MultiLine({ series, axis, className = "", mode = "indexed" }: {
  series: Series[]; axis?: string[]; className?: string; mode?: "indexed" | "raw";
}) {
  const w = 300, h = 130;
  const plotted = series.map((s) => ({ ...s, data: mode === "indexed" ? indexed(s.data) : s.data }));
  const all = plotted.flatMap((s) => s.data);
  if (!all.length) return null;
  const min = Math.min(...all), max = Math.max(...all);
  const range = max - min || 1;
  const toX = (i: number, len: number) => (i / (len - 1)) * w;
  const toY = (v: number) => h - ((v - min) / range) * h;
  return (
    <div className={className}>
      {mode === "indexed" && (
        <div className="flex items-center justify-between mb-1">
          <span className="text-[8px] font-black uppercase tracking-widest text-[var(--app-text)]/35">Indexed: Start = 100</span>
          <span className="text-[8px] font-black uppercase tracking-widest text-[var(--app-text)]/35">30D</span>
        </div>
      )}
      <svg viewBox={`0 0 ${w} ${h}`} className="w-full h-[150px]" preserveAspectRatio="none">
        {[0.25, 0.5, 0.75].map((g) => (
          <line key={g} x1="0" y1={h * g} x2={w} y2={h * g}
            stroke="var(--border)" strokeWidth="1" vectorEffect="non-scaling-stroke" opacity="0.5" />
        ))}
        {mode === "indexed" && (
          <line x1="0" y1={toY(100)} x2={w} y2={toY(100)} stroke="var(--color-secondary)" strokeWidth="1.2" strokeOpacity="0.26" strokeDasharray="6 5" vectorEffect="non-scaling-stroke" />
        )}
        {plotted.map((s, seriesIndex) => (
          <path key={s.id} d={buildPath(s.data, w, h, min, max)} fill="none" stroke={s.color}
            strokeWidth={seriesIndex === 0 ? "2.6" : "2.15"} strokeDasharray={seriesIndex === 1 ? "6 5" : seriesIndex === 2 ? "2 5" : undefined}
            vectorEffect="non-scaling-stroke" strokeLinecap="round" strokeLinejoin="round" />
        ))}
        {plotted.map((s) => (
          <g key={`${s.id}-points`}>
            {s.data.map((v, i) => (
              <circle key={i} cx={toX(i, s.data.length)} cy={toY(v)} r={i === s.data.length - 1 ? "3" : "2"} fill={i === s.data.length - 1 ? s.color : "var(--app-bg)"} stroke={s.color} strokeWidth="1.75" vectorEffect="non-scaling-stroke" />
            ))}
          </g>
        ))}
        {plotted.map((s) => {
          const end = s.data[s.data.length - 1];
          return (
            <text key={`${s.id}-end`} x={w - 2} y={toY(end) - 5} textAnchor="end" fill={s.color} fontSize="7" fontWeight="900">
              {mode === "indexed" ? end.toFixed(1) : s.label}
            </text>
          );
        })}
      </svg>
      {axis && (
        <div className="flex justify-between mt-1.5">
          {axis.map((a, i) => (
            <span key={i} className="text-[7px] font-black uppercase tracking-wide text-[var(--app-text)]/30">{a}</span>
          ))}
        </div>
      )}
    </div>
  );
}

/** Vertical bar chart (Maize price comparison across markets). */
export function BarChart({ bars, format = (n) => `${n}`, className = "" }: {
  bars: { label: string; value: number; color: string }[];
  format?: (n: number) => string;
  className?: string;
}) {
  if (!bars.length) {
    return (
      <div className={`${className} h-[150px] flex items-center justify-center rounded-2xl border border-dashed border-[var(--border)]`}>
        <span className="text-[9px] font-black uppercase tracking-widest text-[var(--app-text)]/35">Select at least one market</span>
      </div>
    );
  }
  const max = Math.max(...bars.map((b) => b.value)) || 1;
  return (
    <div className={className}>
      <div className="flex items-end justify-between gap-2 h-[150px]">
        {bars.map((b) => (
          <div key={b.label} className="flex-1 flex flex-col items-center justify-end h-full gap-1">
            <span className="text-[8px] font-black text-[var(--app-text)]/60">{format(b.value)}</span>
            <div className="w-full rounded-t-lg transition-all" style={{ height: `${(b.value / max) * 100}%`, background: b.color }} />
          </div>
        ))}
      </div>
      <div className="flex justify-between gap-2 mt-2">
        {bars.map((b) => (
          <span key={b.label} className="flex-1 text-center text-[8px] font-black uppercase tracking-wide text-[var(--app-text)]/50 truncate">{b.label}</span>
        ))}
      </div>
    </div>
  );
}

export type { Series };
