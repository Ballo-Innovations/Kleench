import { useState } from "react";
import { useNavigate } from "react-router";
import { motion, AnimatePresence } from "motion/react";
import { TrendingUp, TrendingDown, ChevronRight, ChevronDown } from "lucide-react";
import { PageHeader } from "../../components/PageHeader";
import { DuotoneSearch, DuotoneSparkles } from "../../components/DuotoneIcon";
import {
  COMMODITIES, HUB_STATS, TREND_SERIES, TREND_AXIS,
} from "../../data/marketIntel";
import { CommodityIcon } from "./CommodityIcon";
import { Sparkline, MultiLine } from "./charts";

const TABS = ["All Products", "Market Overview", "Product Comparison", "Category"] as const;
type Tab = (typeof TABS)[number];

const shortUnit = (u: string) => u.replace("per ", "").replace(" (USD)", "").replace(" bag", "");
const indexSeries = (data: number[]) => data.map((v) => (v / (data[0] || 1)) * 100);

function aggregateMarketPulse() {
  const indexed = COMMODITIES.slice(0, 5).map((c) => indexSeries(c.trend));
  return indexed[0].map((_, i) => indexed.reduce((sum, row) => sum + row[i], 0) / indexed.length);
}

function pulsePath(data: number[], w = 300, h = 60) {
  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;
  return data
    .map((v, i) => {
      const x = (i / (data.length - 1)) * w;
      const y = h - ((v - min) / range) * (h - 10) - 5;
      return `${i === 0 ? "M" : "L"} ${x.toFixed(1)} ${y.toFixed(1)}`;
    })
    .join(" ");
}

export function MarketIntelligence() {
  const navigate = useNavigate();
  const [tab, setTab] = useState<Tab>("All Products");
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<string[]>(["zinc", "maize", "cement", "copper"]);
  const [usd, setUsd] = useState(true);
  const marketPulse = aggregateMarketPulse();
  const marketPulsePath = pulsePath(marketPulse);

  const toggleSelect = (id: string) =>
    setSelected((p) => (p.includes(id) ? p.filter((x) => x !== id) : p.length < 4 ? [...p, id] : p));

  return (
    <div className="w-full max-w-md mx-auto bg-transparent font-sans pb-24">
      <PageHeader title="MARKET" subtitle="Market Intelligence" showBack />

      {/* Persistent top tab nav (4.1.0–4.1.3) */}
      <div className="sticky top-[115px] z-30 bg-[var(--app-bg)] border-b border-[var(--border)]">
        <div className="flex gap-5 px-5 overflow-x-auto no-scrollbar">
          {TABS.map((t) => {
            const active = tab === t;
            return (
              <button key={t} onClick={() => setTab(t)} className="relative shrink-0 py-3">
                <span className={`text-[11px] font-black uppercase tracking-wide whitespace-nowrap ${active ? "text-[var(--color-primary)]" : "text-[var(--app-text)]/45"}`}>{t}</span>
                {active && <motion.div layoutId="intelTab" className="absolute left-0 right-0 -bottom-px h-[2.5px] bg-[var(--color-primary)] rounded-full" />}
              </button>
            );
          })}
        </div>
      </div>

      <div className="px-5 pt-4 space-y-5">
        <AnimatePresence mode="wait">
          {/* ── 4.1.0 ALL PRODUCTS ── */}
          {tab === "All Products" && (
            <motion.div key="all" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="space-y-5">
              {/* Live overview banner with wave */}
              <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[var(--color-primary)] to-[#ff6b00] shadow-md">
                <div className="absolute inset-0 opacity-20" style={{ backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)", backgroundSize: "16px 16px" }} />
                <div className="relative px-5 pt-4 pb-1 flex items-start justify-between">
                  <div>
                    <p className="text-[13px] font-black text-white uppercase tracking-tight">Live Market Overview</p>
                    <p className="text-[9px] font-bold text-white/70 uppercase tracking-widest mt-0.5">Updated just now</p>
                  </div>
                  <span className="flex items-center gap-1.5 bg-white/20 border border-white/30 rounded-full px-3 py-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse block" />
                    <span className="text-[9px] font-black text-white uppercase tracking-widest">Live</span>
                  </span>
                </div>
                <svg viewBox="0 0 300 60" preserveAspectRatio="none" className="relative w-full h-[52px]">
                  <defs>
                    <linearGradient id="bannerWave" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="white" stopOpacity="0.35" />
                      <stop offset="100%" stopColor="white" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                  <path d={`${marketPulsePath} L300 60 L0 60 Z`} fill="url(#bannerWave)" />
                  <path d={marketPulsePath} fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" vectorEffect="non-scaling-stroke" />
                  {marketPulse.map((v, i) => {
                    const x = (i / (marketPulse.length - 1)) * 300;
                    const y = 60 - ((v - Math.min(...marketPulse)) / ((Math.max(...marketPulse) - Math.min(...marketPulse)) || 1)) * 50 - 5;
                    return <circle key={i} cx={x} cy={y} r="2.2" fill="white" opacity="0.9" />;
                  })}
                </svg>
              </div>

              {/* Search with dropdown affordance */}
              <div className="relative">
                <DuotoneSearch size={18} className="absolute left-4 top-1/2 -translate-y-1/2" />
                <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search category"
                  className="w-full border border-[var(--border)] rounded-full pl-11 pr-10 py-3 text-[13px] font-semibold text-[var(--app-text)] bg-[var(--app-bg)] shadow-sm outline-none focus:border-[var(--color-primary)] transition-all placeholder:text-[var(--color-secondary)]/40" />
                <ChevronDown size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-[var(--app-text)]/40" strokeWidth={2.5} />
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-3">
                {HUB_STATS.map((s, i) => (
                  <div key={s.label} className="bg-[var(--app-bg)] rounded-2xl border border-[var(--border)] shadow-sm p-3 text-center">
                    <p className="text-[7px] font-black uppercase tracking-widest text-[var(--app-text)]/40 leading-tight min-h-[18px]">{s.label}</p>
                    <p className="text-[18px] font-black leading-none mt-1" style={{ color: i === 0 ? "#059669" : i === 1 ? "var(--color-secondary)" : "var(--color-primary)" }}>{s.value}</p>
                  </div>
                ))}
              </div>

              {/* Top tracked products */}
              <section>
                <div className="flex items-center justify-between mb-3">
                  <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[var(--app-text)]/40">Top Tracked Products</p>
                  <button onClick={() => setTab("Category")} className="text-[10px] font-black uppercase tracking-widest text-[var(--color-primary)] flex items-center gap-0.5">View All <ChevronRight size={11} strokeWidth={3} /></button>
                </div>
                <div className="bg-[var(--app-bg)] rounded-2xl border border-[var(--border)] shadow-sm divide-y divide-[var(--border)] overflow-hidden">
                  {COMMODITIES.map((c) => (
                    <button key={c.id} onClick={() => navigate(`/marketplace/intel/${c.id}`)} className="w-full flex items-center gap-3 px-4 py-3 text-left active:bg-[var(--muted)]/30 transition-colors">
                      <span className="w-9 h-9 rounded-xl bg-[var(--color-secondary)]/8 border border-[var(--border)] flex items-center justify-center shrink-0">
                        <CommodityIcon id={c.id} size={18} primary={c.color} />
                      </span>
                      <div className="min-w-0 flex-1">
                        <p className="text-[11px] font-black text-[var(--app-text)] uppercase tracking-tight leading-none">{c.name} <span className="text-[var(--app-text)]/40">({shortUnit(c.unit)})</span></p>
                        <p className="text-[10px] font-bold text-[var(--app-text)]/45 mt-1">{c.price}</p>
                      </div>
                      <div className="w-[56px] h-[24px] shrink-0"><Sparkline data={c.spark} color={c.color} className="w-full h-full" /></div>
                      <div className={`flex items-center gap-0.5 shrink-0 w-[50px] justify-end ${c.up ? "text-[#059669]" : "text-[#DC2626]"}`}>
                        {c.up ? <TrendingUp size={11} strokeWidth={2.5} /> : <TrendingDown size={11} strokeWidth={2.5} />}
                        <span className="text-[10px] font-black">{c.change}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </section>

              <MarketInsight onClick={() => setTab("Market Overview")} />
            </motion.div>
          )}

          {/* ── 4.1.1 MARKET OVERVIEW ── */}
          {tab === "Market Overview" && (
            <motion.div key="overview" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="space-y-5">
              <div className="grid grid-cols-3 gap-3">
                <StatPill label="Avg Price Change" value="+2.4%" sub="30 days" tone="up" />
                <StatPill label="Most Stable" value="Cement" sub="+0.6%" tone="neutral" />
                <StatPill label="Most Active" value="Maize" sub="High Volatility" tone="primary" />
              </div>

              <section className="bg-[var(--app-bg)] rounded-2xl border border-[var(--border)] shadow-sm p-4 space-y-3">
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[var(--app-text)]/40">Price Trend Overview (30 Days)</p>
                <div className="flex flex-wrap gap-x-3 gap-y-1.5">
                  {TREND_SERIES.map((s) => (
                    <span key={s.id} className="flex items-center gap-1">
                      <span className="w-2.5 h-2.5 rounded-full" style={{ background: s.color }} />
                      <span className="text-[8px] font-black uppercase tracking-wide text-[var(--app-text)]/50">{s.label}</span>
                    </span>
                  ))}
                </div>
                <MultiLine series={TREND_SERIES} axis={TREND_AXIS} />
              </section>

              <MarketInsight onClick={() => navigate("/marketplace/intel/zinc")} />
            </motion.div>
          )}

          {/* ── 4.1.2 PRODUCT COMPARISON ── */}
          {tab === "Product Comparison" && (
            <motion.div key="compare" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="space-y-5">
              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[var(--app-text)]/40 mb-2">Select Products <span className="text-[var(--app-text)]/30">(max 4)</span></p>
                <div className="flex flex-wrap gap-2">
                  {COMMODITIES.map((c) => {
                    const on = selected.includes(c.id);
                    return (
                      <button key={c.id} onClick={() => toggleSelect(c.id)}
                        className={`px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-wide border transition-all ${on ? "text-white border-transparent" : "bg-[var(--app-bg)] text-[var(--app-text)]/50 border-[var(--border)]"}`}
                        style={on ? { background: c.color } : undefined}>
                        {c.name}{on ? " ✕" : ""}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-[11px] font-black uppercase tracking-wide text-[var(--app-text)]/60">Show in USD</span>
                <button onClick={() => setUsd((v) => !v)} className={`w-11 h-6 rounded-full p-0.5 transition-colors ${usd ? "bg-[var(--color-primary)]" : "bg-[var(--border)]"}`}>
                  <div className="w-5 h-5 rounded-full bg-white shadow-sm transition-all" style={{ marginLeft: usd ? "auto" : 0 }} />
                </button>
              </div>

              <section className="bg-[var(--app-bg)] rounded-2xl border border-[var(--border)] shadow-sm p-4 space-y-3">
                <MultiLine series={TREND_SERIES.filter((s) => selected.includes(s.id))} axis={TREND_AXIS} />
                <div className="flex flex-wrap gap-x-3 gap-y-1.5 pt-1">
                  {COMMODITIES.filter((c) => selected.includes(c.id)).map((c) => (
                    <span key={c.id} className="flex items-center gap-1">
                      <span className="w-2.5 h-2.5 rounded-full" style={{ background: c.color }} />
                      <span className="text-[8px] font-black uppercase tracking-wide text-[var(--app-text)]/50">{c.name} ({c.unit.includes("USD") ? "USD" : "ZMW"})</span>
                    </span>
                  ))}
                </div>
              </section>

              <section className="bg-[var(--app-bg)] rounded-2xl border border-[var(--border)] shadow-sm overflow-hidden">
                <div className="px-4 py-3 border-b border-[var(--border)]"><p className="text-[10px] font-black uppercase tracking-[0.2em] text-[var(--app-text)]/40">Summary (30 Days)</p></div>
                <div className="divide-y divide-[var(--border)]">
                  {COMMODITIES.filter((c) => selected.includes(c.id)).map((c) => (
                    <div key={c.id} className="flex items-center justify-between px-4 py-3">
                      <span className="text-[11px] font-black uppercase tracking-wide text-[var(--app-text)]">{c.name} <span className="text-[var(--app-text)]/40">({c.unit.includes("USD") ? "USD" : "ZMW"})</span></span>
                      <span className={`flex items-center gap-1 text-[11px] font-black ${c.up ? "text-[#059669]" : "text-[#DC2626]"}`}>
                        {c.up ? <TrendingUp size={11} strokeWidth={2.5} /> : <TrendingDown size={11} strokeWidth={2.5} />}{c.change}
                      </span>
                    </div>
                  ))}
                </div>
              </section>
            </motion.div>
          )}

          {/* ── 4.1.3 CATEGORY ── */}
          {tab === "Category" && (
            <motion.div key="category" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="space-y-5">
              <div className="relative">
                <DuotoneSearch size={18} className="absolute left-4 top-1/2 -translate-y-1/2" />
                <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search category"
                  className="w-full border border-[var(--border)] rounded-full pl-11 pr-10 py-3 text-[13px] font-semibold text-[var(--app-text)] bg-[var(--app-bg)] shadow-sm outline-none focus:border-[var(--color-primary)] transition-all placeholder:text-[var(--color-secondary)]/40" />
                <ChevronDown size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-[var(--app-text)]/40" strokeWidth={2.5} />
              </div>

              <section>
                <div className="flex items-center justify-between mb-3">
                  <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[var(--app-text)]/40">Popular Commodities</p>
                  <button onClick={() => navigate("/marketplace/intelligence/crops")} className="text-[10px] font-black uppercase tracking-widest text-[var(--color-primary)] flex items-center gap-0.5">View All <ChevronRight size={11} strokeWidth={3} /></button>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  {COMMODITIES.slice(0, 4).map((c, i) => {
                    const isFirst = i === 0;
                    return (
                      <button key={c.id} onClick={() => navigate(`/marketplace/intel/${c.id}`)}
                        className={`rounded-2xl shadow-sm p-3 text-left relative overflow-hidden active:scale-95 transition-all ${isFirst ? "bg-[var(--color-primary)]" : "bg-[var(--color-secondary)]"}`}>
                        <div className="flex items-center justify-between">
                          <p className="text-[9px] font-black uppercase tracking-[0.25em] text-white/80">{c.name}</p>
                          <CommodityIcon id={c.id} size={16} primary="#ffffff" secondaryOpacity={0.4} />
                        </div>
                        <div className="h-[46px] w-full mt-2"><Sparkline data={c.spark} color="#ffffff" className="w-full h-full" strokeWidth={2.5} /></div>
                        <p className="text-[10px] font-black text-white leading-none">{c.price}</p>
                      </button>
                    );
                  })}
                </div>
              </section>

              <section>
                <div className="flex items-center justify-between mb-3">
                  <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[var(--app-text)]/40">Market Overview</p>
                  <span className="flex items-center gap-1 text-[9px] font-black uppercase tracking-widest text-[var(--app-text)]/40">This Week <ChevronDown size={11} strokeWidth={3} /></span>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-[var(--app-bg)] rounded-2xl border border-[var(--border)] shadow-sm p-4">
                    <p className="text-[8px] font-black uppercase tracking-widest text-[var(--app-text)]/40">Total Commodities</p>
                    <div className="flex items-baseline gap-2 mt-1"><span className="text-[22px] font-black text-[var(--app-text)] leading-none">24</span><span className="flex items-center gap-0.5 text-[10px] font-black text-[#059669]">12 <TrendingUp size={10} strokeWidth={3} /></span></div>
                  </div>
                  <div className="bg-[var(--app-bg)] rounded-2xl border border-[var(--border)] shadow-sm p-4">
                    <p className="text-[8px] font-black uppercase tracking-widest text-[var(--app-text)]/40">Price Up</p>
                    <div className="flex items-baseline gap-2 mt-1"><span className="text-[22px] font-black text-[var(--app-text)] leading-none">12</span><TrendingDown size={12} className="text-[#DC2626]" strokeWidth={3} /></div>
                  </div>
                </div>
              </section>

              <section>
                <div className="flex items-center justify-between mb-3">
                  <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[var(--app-text)]/40">Price Trends</p>
                  <span className="flex items-center gap-1 text-[9px] font-black uppercase tracking-widest text-[var(--app-text)]/40">This Week <ChevronDown size={11} strokeWidth={3} /></span>
                </div>
                <div className="space-y-2">
                  {COMMODITIES.slice(0, 3).map((c) => (
                    <button key={c.id} onClick={() => navigate(`/marketplace/intel/${c.id}`)} className="w-full flex items-center justify-between bg-[var(--app-bg)] rounded-2xl border border-[var(--border)] shadow-sm px-4 py-3 active:scale-[0.98] transition-all">
                      <span className="flex items-center gap-2">
                        <span className="w-7 h-7 rounded-lg bg-[var(--color-secondary)]/8 border border-[var(--border)] flex items-center justify-center"><CommodityIcon id={c.id} size={15} primary={c.color} /></span>
                        <span className="text-[11px] font-black uppercase tracking-wide text-[var(--app-text)]">{c.name}</span>
                      </span>
                      <span className={`flex items-center gap-1 text-[11px] font-black ${c.up ? "text-[#059669]" : "text-[#DC2626]"}`}>
                        {c.up ? <TrendingUp size={12} strokeWidth={2.5} /> : <TrendingDown size={12} strokeWidth={2.5} />}{c.change}
                      </span>
                    </button>
                  ))}
                </div>
              </section>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

function StatPill({ label, value, sub, tone }: { label: string; value: string; sub: string; tone: "up" | "neutral" | "primary" }) {
  const color = tone === "up" ? "#059669" : tone === "primary" ? "var(--color-primary)" : "var(--color-secondary)";
  return (
    <div className="bg-[var(--app-bg)] rounded-2xl border border-[var(--border)] shadow-sm p-3 text-center">
      <p className="text-[7px] font-black uppercase tracking-widest text-[var(--app-text)]/40 leading-tight min-h-[18px]">{label}</p>
      <p className="text-[14px] font-black leading-none mt-1" style={{ color }}>{value}</p>
      <p className="text-[7px] font-black uppercase tracking-widest text-[var(--app-text)]/40 mt-1">{sub}</p>
    </div>
  );
}

function MarketInsight({ onClick }: { onClick: () => void }) {
  return (
    <div className="bg-[var(--color-primary)]/8 border-2 border-[var(--color-primary)]/20 rounded-2xl p-4 space-y-2">
      <div className="flex items-start gap-3">
        <span className="w-8 h-8 rounded-xl bg-[var(--color-primary)]/15 flex items-center justify-center shrink-0"><DuotoneSparkles size={16} primary="var(--color-primary)" /></span>
        <div>
          <p className="text-[10px] font-black uppercase tracking-widest text-[var(--color-primary)]">Market Insights</p>
          <p className="text-[11px] font-semibold text-[var(--color-secondary)]/70 leading-snug mt-1">Zinc prices are rising due to high demand in the mining sector.</p>
        </div>
      </div>
      <button onClick={onClick} className="ml-11 inline-flex items-center gap-1 bg-[var(--color-primary)] text-white text-[9px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full active:scale-95 transition-all">
        View full insights <ChevronRight size={11} strokeWidth={3} />
      </button>
    </div>
  );
}
