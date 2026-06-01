import { useNavigate, useParams } from "react-router";
import { motion } from "motion/react";
import { TrendingUp, TrendingDown, ArrowRight } from "lucide-react";
import { PageHeader } from "../components/PageHeader";

const FORECAST_DATA: Record<string, {
  title: string; price: string; change: string; up: boolean;
  historical: number[]; projected: number[];
  demand: string; supply: string; sentiment: string; sentimentColor: string;
  predictions: { month: string; low: string; high: string }[];
}> = {
  maize: {
    title: "MAIZE", price: "K280", change: "+5.7%", up: true,
    historical: [240, 255, 260, 265, 280],
    projected: [280, 295, 308, 315],
    demand: "High", supply: "Moderate", sentiment: "Bullish", sentimentColor: "#059669",
    predictions: [{ month: "Jun 2026", low: "K285", high: "K310" }, { month: "Jul 2026", low: "K295", high: "K325" }, { month: "Aug 2026", low: "K300", high: "K340" }],
  },
  fuel: {
    title: "FUEL", price: "K29.50", change: "-4.8%", up: false,
    historical: [33.2, 32.5, 31.8, 31.0, 29.5],
    projected: [29.5, 28.8, 28.2, 29.0],
    demand: "Stable", supply: "High", sentiment: "Bearish", sentimentColor: "#DC2626",
    predictions: [{ month: "Jun 2026", low: "K27.50", high: "K30.00" }, { month: "Jul 2026", low: "K27.00", high: "K30.50" }, { month: "Aug 2026", low: "K28.00", high: "K31.00" }],
  },
  zinc: {
    title: "ZINC", price: "$2,400", change: "+3.9%", up: true,
    historical: [2180, 2240, 2290, 2310, 2400],
    projected: [2400, 2460, 2510, 2480],
    demand: "Strong", supply: "Low", sentiment: "Bullish", sentimentColor: "#059669",
    predictions: [{ month: "Jun 2026", low: "$2,380", high: "$2,520" }, { month: "Jul 2026", low: "$2,420", high: "$2,580" }, { month: "Aug 2026", low: "$2,400", high: "$2,560" }],
  },
  cement: {
    title: "CEMENT", price: "K150", change: "-3.2%", up: false,
    historical: [162, 160, 158, 155, 150],
    projected: [150, 147, 144, 146],
    demand: "Moderate", supply: "High", sentiment: "Neutral", sentimentColor: "#D97706",
    predictions: [{ month: "Jun 2026", low: "K142", high: "K155" }, { month: "Jul 2026", low: "K140", high: "K158" }, { month: "Aug 2026", low: "K143", high: "K160" }],
  },
};

export function MarketIntelForecast() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const data = FORECAST_DATA[id ?? ""] ?? FORECAST_DATA.maize;

  // Build SVG path from data points
  const allPoints = [...data.historical, ...data.projected];
  const minY = Math.min(...allPoints);
  const maxY = Math.max(...allPoints);
  const range = maxY - minY || 1;
  const w = 240; const h = 80;
  const toX = (i: number, total: number) => (i / (total - 1)) * w;
  const toY = (v: number) => h - ((v - minY) / range) * h;

  const histPath = data.historical.map((v, i) => `${i === 0 ? "M" : "L"} ${toX(i, data.historical.length)} ${toY(v)}`).join(" ");
  const projStartX = toX(data.historical.length - 1, data.historical.length);
  const projStartY = toY(data.historical[data.historical.length - 1]);
  const projPath = data.projected.map((v, i) => {
    const x = projStartX + ((i + 1) / data.projected.length) * (w - projStartX);
    return `${i === 0 ? `M ${projStartX} ${projStartY} L` : "L"} ${x} ${toY(v)}`;
  }).join(" ");

  return (
    <div className="w-full max-w-md mx-auto min-h-screen bg-transparent font-sans pb-32">
      <PageHeader title="FORECAST" showBack />

      <div className="px-5 pt-4 space-y-5">
        {/* Hero */}
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
          className="bg-[var(--app-shape-accent)] rounded-2xl shadow-md px-5 py-4 flex items-center justify-between">
          <div>
            <p className="text-[9px] font-black uppercase tracking-[0.3em] text-white/40">{data.title} — Current Price</p>
            <p className="text-[26px] font-black text-white leading-none mt-1">{data.price}</p>
          </div>
          <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full ${data.up ? "bg-[#059669]/20" : "bg-red-500/20"}`}>
            {data.up ? <TrendingUp size={12} color="#059669" strokeWidth={2.5} /> : <TrendingDown size={12} color="#f87171" strokeWidth={2.5} />}
            <span className={`text-[10px] font-black ${data.up ? "text-[#059669]" : "text-red-400"}`}>{data.change}</span>
          </div>
        </motion.div>

        {/* Chart */}
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
          className="bg-[var(--app-bg)] rounded-2xl border border-[var(--border)] shadow-sm p-4 space-y-2">
          <div className="flex items-center justify-between">
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[var(--app-text)]/40">6-Month Trend & Forecast</p>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1"><div className="w-5 h-0.5 bg-[var(--color-primary)]" /><span className="text-[8px] font-black text-[var(--app-text)]/40">Actual</span></div>
              <div className="flex items-center gap-1"><div className="w-5 h-0.5 bg-[var(--color-primary)]/40 border-t border-dashed border-[var(--color-primary)]/40" /><span className="text-[8px] font-black text-[var(--app-text)]/40">Forecast</span></div>
            </div>
          </div>
          <svg viewBox={`0 0 ${w} ${h + 10}`} className="w-full h-[100px]" preserveAspectRatio="none">
            <defs>
              <linearGradient id="histGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="var(--color-primary)" stopOpacity="0.15" />
                <stop offset="100%" stopColor="var(--color-primary)" stopOpacity="0" />
              </linearGradient>
            </defs>
            <path d={`${histPath} L ${toX(data.historical.length - 1, data.historical.length)} ${h} L 0 ${h} Z`} fill="url(#histGrad)" />
            <path d={histPath} fill="none" stroke="var(--color-primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" vectorEffect="non-scaling-stroke" />
            <path d={projPath} fill="none" stroke="var(--color-primary)" strokeWidth="2" strokeDasharray="6 4" strokeLinecap="round" vectorEffect="non-scaling-stroke" opacity="0.6" />
          </svg>
        </motion.div>

        {/* Indicators */}
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}
          className="grid grid-cols-3 gap-3">
          {[
            { label: "Demand", value: data.demand, color: data.demand === "High" || data.demand === "Strong" ? "#059669" : "var(--color-primary)" },
            { label: "Supply", value: data.supply, color: data.supply === "Low" ? "#DC2626" : "var(--color-secondary)" },
            { label: "Sentiment", value: data.sentiment, color: data.sentimentColor },
          ].map(({ label, value, color }) => (
            <div key={label} className="bg-[var(--app-bg)] rounded-2xl border border-[var(--border)] shadow-sm p-3 text-center">
              <p className="text-[8px] font-black uppercase tracking-widest text-[var(--app-text)]/40 mb-1">{label}</p>
              <p className="text-[12px] font-black uppercase tracking-wide" style={{ color }}>{value}</p>
            </div>
          ))}
        </motion.div>

        {/* Price predictions */}
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
          className="bg-[var(--app-bg)] rounded-2xl border border-[var(--border)] shadow-sm overflow-hidden">
          <div className="px-4 py-3 border-b border-[var(--border)]">
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[var(--app-text)]/40">3-Month Price Prediction</p>
          </div>
          <div className="divide-y divide-[var(--border)]">
            {data.predictions.map(({ month, low, high }) => (
              <div key={month} className="flex items-center justify-between px-4 py-3">
                <span className="text-[11px] font-black text-[var(--app-text)] uppercase tracking-wide">{month}</span>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-semibold text-[var(--app-text)]/50">{low}</span>
                  <span className="text-[8px] text-[var(--app-text)]/30">–</span>
                  <span className="text-[10px] font-black text-[var(--color-primary)]">{high}</span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      <div className="px-5 pt-4 pb-8">
        <button onClick={() => navigate(`/marketplace/intel/${id}/opportunities`)}
          className="w-full py-4 rounded-2xl bg-[var(--color-secondary)] text-white font-black uppercase tracking-widest text-[12px] flex items-center justify-center gap-3 shadow-md active:scale-95 transition-all">
          View Related Opportunities <ArrowRight size={18} />
        </button>
      </div>
    </div>
  );
}
