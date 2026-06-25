import { useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router";
import { motion, AnimatePresence } from "motion/react";
import {
  TrendingUp, TrendingDown, ArrowDown, ArrowUp, Map, FileText, Bell, ChevronRight, Newspaper,
} from "lucide-react";
import { PageHeader } from "../../components/PageHeader";
import { CtaButton } from "../../components/CtaButton";
import { getCommodity } from "../../data/marketIntel";
import { CommodityIcon } from "./CommodityIcon";
import { AreaLine, BarChart } from "./charts";

const TABS = ["Overview", "Price", "Market", "News"] as const;
type Tab = (typeof TABS)[number];

export function CommodityDetail() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [params, setParams] = useSearchParams();
  const data = getCommodity(id);
  const initialTab = (params.get("tab") as Tab) || "Overview";
  const [tab, setTab] = useState<Tab>(TABS.includes(initialTab) ? initialTab : "Overview");
  const [following, setFollowing] = useState(false);
  const [markets, setMarkets] = useState<string[]>(data.markets.slice(0, 4).map((m) => m.city));

  const setTabAndUrl = (t: Tab) => {
    setTab(t);
    params.set("tab", t);
    setParams(params, { replace: true });
  };

  const toggleMarket = (city: string) => {
    setMarkets((prev) =>
      prev.includes(city) ? prev.filter((c) => c !== city) : prev.length < 5 ? [...prev, city] : prev
    );
  };

  const selectedMarkets = data.markets.filter((m) => markets.includes(m.city));
  const priceList = data.markets.map((m) => m.price);
  const saving = Math.max(...priceList) - Math.min(...priceList);
  const curr = data.unit.includes("USD") ? "$" : "ZMW";
  const selectedPrices = selectedMarkets.map((m) => m.price);
  const selectedLow = Math.min(...selectedPrices);
  const selectedHigh = Math.max(...selectedPrices);

  return (
    <div className="w-full max-w-md mx-auto bg-transparent font-sans pb-24">
      <PageHeader title="MARKET" subtitle="Market Intelligence" showBack />

      {/* Product header */}
      <div className="px-5 pt-4">
        <div className="flex items-center gap-3">
          <span className="w-11 h-11 rounded-2xl bg-[var(--color-secondary)]/8 border border-[var(--border)] flex items-center justify-center shrink-0">
            <CommodityIcon id={data.id} size={24} primary={data.color} />
          </span>
          <div className="flex-1 min-w-0">
            <p className="text-[16px] font-black uppercase tracking-tight text-[var(--app-text)] leading-none">{data.name}</p>
            <p className="text-[10px] font-bold uppercase tracking-widest text-[var(--app-text)]/45 mt-1">{data.variety}</p>
          </div>
          <button onClick={() => setFollowing((v) => !v)}
            className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border transition-all active:scale-95 ${following ? "bg-[var(--color-primary)] text-white border-transparent" : "bg-[var(--app-bg)] text-[var(--color-primary)] border-[var(--color-primary)]/40"}`}>
            {following ? "Following" : "Follow"}
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="px-5 mt-3 border-b border-[var(--border)]">
        <div className="flex gap-6">
          {TABS.map((t) => {
            const active = tab === t;
            return (
              <button key={t} onClick={() => setTabAndUrl(t)} className="relative py-2.5">
                <span className={`text-[11px] font-black uppercase tracking-wide ${active ? "text-[var(--color-primary)]" : "text-[var(--app-text)]/45"}`}>{t}</span>
                {active && <motion.div layoutId="commodityTab" className="absolute left-0 right-0 -bottom-px h-[2px] bg-[var(--color-primary)] rounded-full" />}
              </button>
            );
          })}
        </div>
      </div>

      <div className="px-5 pt-4 space-y-5">
        <AnimatePresence mode="wait">
          {/* ── OVERVIEW (4.1.5) ── */}
          {tab === "Overview" && (
            <motion.div key="ov" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="space-y-5">
              <div className="bg-[var(--app-bg)] rounded-2xl border border-[var(--border)] shadow-sm p-4">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-[9px] font-black uppercase tracking-widest text-[var(--app-text)]/40">Average Price ({data.unit.replace("per ", "")})</p>
                    <p className="text-[22px] font-black text-[var(--app-text)] leading-none mt-1.5">{data.price}</p>
                    <p className="text-[9px] font-bold uppercase tracking-widest text-[var(--app-text)]/40 mt-1.5">This Week</p>
                  </div>
                  <span className={`flex items-center gap-1 text-[11px] font-black ${data.up ? "text-[#059669]" : "text-[#DC2626]"}`}>
                    {data.up ? <TrendingUp size={12} strokeWidth={2.5} /> : <TrendingDown size={12} strokeWidth={2.5} />}
                    {data.change}
                  </span>
                </div>
                <p className="text-[9px] font-bold text-[var(--app-text)]/45 mt-2 pt-2 border-t border-[var(--border)]">Last Week: {data.prev}</p>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div className="bg-[#059669]/8 border border-[#059669]/20 rounded-2xl p-3 text-center">
                  <p className="text-[7px] font-black uppercase tracking-widest text-[#059669]/70">Lowest Price</p>
                  <p className="text-[12px] font-black text-[#059669] leading-none mt-1.5">{data.lowest.price}</p>
                  <p className="text-[8px] font-bold uppercase tracking-wide text-[var(--app-text)]/40 mt-1">{data.lowest.place}</p>
                </div>
                <div className="bg-[#DC2626]/8 border border-[#DC2626]/20 rounded-2xl p-3 text-center">
                  <p className="text-[7px] font-black uppercase tracking-widest text-[#DC2626]/70">Highest Price</p>
                  <p className="text-[12px] font-black text-[#DC2626] leading-none mt-1.5">{data.highest.price}</p>
                  <p className="text-[8px] font-bold uppercase tracking-wide text-[var(--app-text)]/40 mt-1">{data.highest.place}</p>
                </div>
                <div className="bg-[var(--app-bg)] border border-[var(--border)] rounded-2xl p-3 text-center">
                  <p className="text-[7px] font-black uppercase tracking-widest text-[var(--app-text)]/40">Price Change</p>
                  <p className="text-[12px] font-black text-[var(--app-text)] leading-none mt-1.5">{data.changeAbs}</p>
                  <p className="text-[8px] font-bold uppercase tracking-wide text-[var(--app-text)]/40 mt-1">From Last Week</p>
                </div>
              </div>

              <section className="bg-[var(--app-bg)] rounded-2xl border border-[var(--border)] shadow-sm p-4">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[var(--app-text)]/40">Price Trend ({data.unit.replace("per ", "")})</p>
                  <span className="text-[9px] font-black uppercase tracking-widest text-[var(--app-text)]/40">This Week</span>
                </div>
                <AreaLine data={data.trend} color={data.color} axis={["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]} />
                <button onClick={() => navigate(`/marketplace/intel/${data.id}/forecast`)} className="w-full flex items-center justify-end gap-1 text-[9px] font-black uppercase tracking-widest text-[var(--color-primary)] mt-1">
                  View Full Trend <ChevronRight size={11} strokeWidth={3} />
                </button>
              </section>

              <button onClick={() => navigate(`/marketplace/intel/${data.id}/map`)}
                className="w-full flex items-center justify-center gap-2 bg-[var(--color-primary)] text-white font-black uppercase tracking-widest text-[12px] py-4 rounded-2xl active:scale-95 transition-all shadow-sm">
                <Map size={16} strokeWidth={2.5} /> Map &amp; List View
              </button>
            </motion.div>
          )}

          {/* ── PRICE (4.1.6) ── */}
          {tab === "Price" && (
            <motion.div key="pr" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="space-y-5">
              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[var(--app-text)]/40 mb-2">Select Market <span className="text-[var(--app-text)]/30">(Max 5)</span></p>
                <div className="bg-[var(--app-bg)] rounded-2xl border border-[var(--border)] shadow-sm p-3 flex flex-wrap gap-2">
                  {data.markets.map((m) => {
                    const on = markets.includes(m.city);
                    return (
                      <button key={m.city} onClick={() => toggleMarket(m.city)}
                        className={`px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-wide border transition-all ${on ? "bg-[var(--color-primary)]/12 text-[var(--color-primary)] border-[var(--color-primary)]/40" : "bg-[var(--app-bg)] text-[var(--app-text)]/50 border-[var(--border)]"}`}>
                        {m.city}{on ? " ✕" : ""}
                      </button>
                    );
                  })}
                </div>
              </div>

              <section className="bg-[var(--app-bg)] rounded-2xl border border-[var(--border)] shadow-sm p-4">
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[var(--app-text)]/40 mb-3">Price Comparison ({data.unit.replace("per ", "")})</p>
                <BarChart
                  bars={selectedMarkets.map((m) => ({
                    label: m.city,
                    value: m.price,
                    color: m.price === selectedLow ? "#00695C" : m.price === selectedHigh ? "#DC2626" : "#515D84",
                  }))}
                  format={(n) => n.toLocaleString()}
                />
              </section>

              <section>
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[var(--app-text)]/40 mb-2">Summary</p>
                <div className="bg-[var(--app-bg)] rounded-2xl border border-[var(--border)] shadow-sm p-4">
                  <p className="text-[11px] font-semibold text-[var(--app-text)]/70 leading-snug">
                    You can save up to <span className="font-black text-[var(--color-primary)]">{curr} {saving.toLocaleString()}</span> per {data.unit.replace("per ", "")} by buying in {data.lowest.place} instead of {data.highest.place}.
                  </p>
                </div>
              </section>
            </motion.div>
          )}

          {/* ── MARKET (4.1.7) ── */}
          {tab === "Market" && (
            <motion.div key="mk" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="space-y-5">
              <section>
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[var(--app-text)]/40 mb-2">Price Summary</p>
                <div className="bg-[var(--app-bg)] rounded-2xl border border-[var(--border)] shadow-sm divide-y divide-[var(--border)] overflow-hidden">
                  {data.summary.map((s, i) => (
                    <div key={i} className="flex items-start gap-2.5 px-4 py-3">
                      {i === 0 ? (
                        data.up ? <ArrowUp size={14} className="text-[#059669] shrink-0 mt-0.5" strokeWidth={2.5} /> : <ArrowDown size={14} className="text-[#DC2626] shrink-0 mt-0.5" strokeWidth={2.5} />
                      ) : i === 1 ? (
                        <ArrowDown size={14} className="text-[#059669] shrink-0 mt-0.5" strokeWidth={2.5} />
                      ) : (
                        <ArrowUp size={14} className="text-[#DC2626] shrink-0 mt-0.5" strokeWidth={2.5} />
                      )}
                      <p className="text-[11px] font-semibold text-[var(--app-text)]/70 leading-snug">{s}</p>
                    </div>
                  ))}
                </div>
              </section>

              <section>
                <div className="flex items-center justify-between mb-2">
                  <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[var(--app-text)]/40">Supply &amp; Demand</p>
                  <span className="text-[9px] font-black uppercase tracking-widest text-[var(--app-text)]/40">This Week</span>
                </div>
                <div className="bg-[var(--app-bg)] rounded-2xl border border-[var(--border)] shadow-sm p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-black uppercase tracking-widest text-[var(--app-text)]/50">Supply</span>
                    <span className="text-[10px] font-black uppercase tracking-widest text-[var(--app-text)]/50">Demand</span>
                  </div>
                  <div className="relative h-2 rounded-full bg-[var(--border)]">
                    <div className="absolute inset-y-0 left-0 rounded-full bg-[#059669]" style={{ width: `${data.supply}%` }} />
                    <div className="absolute top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-white border-2 border-[#059669] shadow-sm" style={{ left: `calc(${data.supply}% - 8px)` }} />
                  </div>
                </div>
              </section>

              <section>
                <div className="flex items-center justify-between mb-2">
                  <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[var(--app-text)]/40">Outlook</p>
                  <span className="text-[9px] font-black uppercase tracking-widest text-[var(--app-text)]/40">Next 2 Weeks</span>
                </div>
                <div className="bg-[var(--color-primary)]/8 border-2 border-[var(--color-primary)]/20 rounded-2xl p-4">
                  <p className="text-[11px] font-semibold text-[var(--color-secondary)]/70 leading-snug">{data.outlook}</p>
                </div>
              </section>

              <CtaButton onClick={() => navigate(`/marketplace/intel/${data.id}/forecast`)}>
                <FileText size={15} strokeWidth={2} /> View Full Report
              </CtaButton>
            </motion.div>
          )}

          {/* ── NEWS (4.1.10) ── */}
          {tab === "News" && (
            <motion.div key="nw" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="space-y-5">
              <section>
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[var(--app-text)]/40 mb-2">Headlines</p>
                <div className="space-y-2.5">
                  {data.news.map((n, i) => (
                    <div key={i} className="bg-[var(--app-bg)] rounded-2xl border border-[var(--border)] shadow-sm p-3 flex gap-3 active:scale-[0.99] transition-all">
                      <div className="w-12 h-12 rounded-xl bg-[var(--color-secondary)]/8 border border-[var(--border)] flex flex-col items-center justify-center shrink-0 gap-0.5">
                        <Newspaper size={13} className="text-[var(--color-secondary)]/50" strokeWidth={2} />
                        <span className="text-[7px] font-black uppercase tracking-tight text-[var(--color-secondary)]/70 leading-none">{sourceTag(n.source)}</span>
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-[11px] font-black text-[var(--app-text)] uppercase tracking-tight leading-snug line-clamp-2">{n.title}</p>
                        <div className="flex items-center justify-between mt-1">
                          <span className="text-[8px] font-black uppercase tracking-widest text-[var(--color-primary)] truncate">{n.source}</span>
                          <span className="text-[8px] font-bold text-[var(--app-text)]/40 shrink-0 ml-2">{n.date}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <button className="w-full flex items-center justify-center gap-1 text-[10px] font-black uppercase tracking-widest text-[var(--color-primary)] mt-3">
                  More <ChevronRight size={11} strokeWidth={3} />
                </button>
              </section>

              <section>
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[var(--app-text)]/40 mb-2">Top Stories</p>
                <div className="bg-[var(--app-bg)] rounded-2xl border border-[var(--border)] shadow-sm p-4">
                  <p className="text-[12px] font-black text-[var(--app-text)] uppercase tracking-tight leading-snug">{data.topStory.title}</p>
                  <p className="text-[11px] font-semibold text-[var(--app-text)]/55 leading-relaxed mt-2">{data.topStory.body}</p>
                  <button className="text-[10px] font-black uppercase tracking-widest text-[var(--color-primary)] mt-2">Read More</button>
                </div>
              </section>

              <button onClick={() => navigate("/marketplace/intelligence/alerts")}
                className="w-full flex items-center justify-center gap-2 bg-[var(--color-secondary)] text-white font-black uppercase tracking-widest text-[12px] py-4 rounded-2xl active:scale-95 transition-all shadow-sm">
                <Bell size={16} strokeWidth={2.5} /> Set Price Alert
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

function sourceTag(source: string): string {
  const words = source.split(/\s+/).filter(Boolean);
  if (words.length === 1) return words[0].slice(0, 3).toUpperCase();
  return words.map((w) => w[0]).join("").slice(0, 4).toUpperCase();
}
