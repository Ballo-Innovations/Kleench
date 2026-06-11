import { useNavigate, useParams } from "react-router";
import { motion } from "motion/react";
import { TrendingUp, TrendingDown, Bell, Share2, AlertTriangle } from "lucide-react";
import { PageHeader } from "../components/PageHeader";

const INTEL_DATA: Record<string, {
  title: string; unit: string; price: string; prev: string; change: string; up: boolean;
  graph: string; desc: string; context: string; source: string;
  history: { period: string; price: string }[];
}> = {
  maize: {
    title: "MAIZE", unit: "per 50kg bag", price: "K280", prev: "K265", change: "+5.7%", up: true,
    graph: "M 0 40 L 10 30 L 20 45 L 30 15 L 40 25 L 50 10 L 60 20",
    desc: "White maize meal — Zambia staple commodity",
    context: "Prices have risen due to reduced harvest output in Southern and Eastern provinces. National strategic reserves remain above buffer stock levels.",
    source: "FRA / ZABS Market Reports",
    history: [
      { period: "Jan 2026", price: "K240" }, { period: "Feb 2026", price: "K255" },
      { period: "Mar 2026", price: "K260" }, { period: "Apr 2026", price: "K265" },
      { period: "May 2026", price: "K280" },
    ],
  },
  fuel: {
    title: "FUEL", unit: "per litre (petrol)", price: "K29.50", prev: "K31.00", change: "-4.8%", up: false,
    graph: "M 0 20 L 10 40 L 25 5 L 40 25 L 50 35 L 60 15",
    desc: "Petrol retail pump price — Lusaka average",
    context: "ERB reduced pump prices following a drop in global crude oil prices. Diesel remains unchanged at K28.90/litre.",
    source: "ERB Zambia Price Regulation Bulletin",
    history: [
      { period: "Jan 2026", price: "K33.20" }, { period: "Feb 2026", price: "K32.50" },
      { period: "Mar 2026", price: "K31.80" }, { period: "Apr 2026", price: "K31.00" },
      { period: "May 2026", price: "K29.50" },
    ],
  },
  zinc: {
    title: "ZINC", unit: "per metric tonne (USD)", price: "$2,400", prev: "$2,310", change: "+3.9%", up: true,
    graph: "M 0 15 L 10 35 L 20 10 L 30 15 L 40 25 L 50 8 L 60 18",
    desc: "Zinc spot price — LME benchmark",
    context: "Zinc prices rallied amid supply disruptions in major producing regions. Zambia's zinc output from NFC Africa remains steady.",
    source: "London Metal Exchange (LME)",
    history: [
      { period: "Jan 2026", price: "$2,180" }, { period: "Feb 2026", price: "$2,240" },
      { period: "Mar 2026", price: "$2,290" }, { period: "Apr 2026", price: "$2,310" },
      { period: "May 2026", price: "$2,400" },
    ],
  },
  cement: {
    title: "CEMENT", unit: "per 50kg bag", price: "K150", prev: "K155", change: "-3.2%", up: false,
    graph: "M 0 35 L 10 25 L 20 20 L 30 10 L 40 5 L 50 12 L 60 8",
    desc: "Portland cement — retail construction grade",
    context: "Cement prices softened after Lafarge and Zambezi Portland increased production capacity. Bulk buyers can negotiate lower rates.",
    source: "ZABS / Construction Industry Council",
    history: [
      { period: "Jan 2026", price: "K162" }, { period: "Feb 2026", price: "K160" },
      { period: "Mar 2026", price: "K158" }, { period: "Apr 2026", price: "K155" },
      { period: "May 2026", price: "K150" },
    ],
  },
};

export function MarketIntelDetail() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const data = INTEL_DATA[id ?? ""] ?? INTEL_DATA.maize;

  return (
    <div className="w-full max-w-md mx-auto bg-transparent font-sans pb-24">
      <PageHeader title="MARKET INTEL" showBack />

      <div className="px-5 pt-5 space-y-5">
        {/* Price Hero */}
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
          className="bg-[var(--color-secondary)] rounded-2xl shadow-md overflow-hidden">
          <div className="px-5 pt-5 pb-4">
            <div className="flex items-start justify-between mb-1">
              <div>
                <p className="text-[9px] font-black uppercase tracking-[0.3em] text-white/40">{data.unit}</p>
                <p className="text-[28px] font-black text-white leading-none mt-1">{data.price}</p>
              </div>
              <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border ${data.up ? "bg-[#059669]/20 border-[#059669]/40" : "bg-red-500/20 border-red-500/30"}`}>
                {data.up ? <TrendingUp size={12} color="#059669" strokeWidth={2.5} /> : <TrendingDown size={12} color="#f87171" strokeWidth={2.5} />}
                <span className={`text-[10px] font-black ${data.up ? "text-[#059669]" : "text-red-400"}`}>{data.change}</span>
              </div>
            </div>
            <p className="text-[11px] font-bold text-white/50 mt-1">vs. {data.prev} last period</p>
            <h2 className="text-[22px] font-black text-white uppercase tracking-widest mt-3">{data.title}</h2>
            <p className="text-[11px] font-semibold text-white/60 mt-0.5">{data.desc}</p>
          </div>

          {/* Sparkline */}
          <div className="px-5 pb-4 h-[90px] relative">
            <svg className="w-full h-full" viewBox="0 0 60 50" preserveAspectRatio="none">
              <defs>
                <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="white" stopOpacity="0.2" />
                  <stop offset="100%" stopColor="white" stopOpacity="0" />
                </linearGradient>
              </defs>
              <path d={`${data.graph} L 60 50 L 0 50 Z`} fill="url(#areaGrad)" />
              <path d={data.graph} fill="none" stroke="white" strokeWidth="2.5"
                vectorEffect="non-scaling-stroke" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>

          <div className="border-t border-white/10 px-5 py-3 flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-white animate-pulse block" />
              <span className="text-[8px] font-black uppercase tracking-widest text-white/40">LIVE DATA</span>
            </div>
            <span className="text-[8px] font-black tracking-widest text-white/30">Source: {data.source}</span>
          </div>
        </motion.div>

        {/* Price History */}
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
          className="bg-[var(--app-bg)] rounded-2xl border border-[var(--border)] shadow-md p-5 space-y-3">
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[var(--color-secondary)]/50">Price History</p>
          {data.history.map(({ period, price }) => (
            <div key={period} className="flex items-center justify-between py-2 border-b border-[var(--border)] last:border-0">
              <span className="text-[11px] font-bold text-[var(--color-secondary)]/60">{period}</span>
              <span className="text-[13px] font-black text-[var(--app-text)]">{price}</span>
            </div>
          ))}
        </motion.div>

        {/* Market Context */}
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
          className="bg-[var(--color-primary)]/8 border-2 border-[var(--color-primary)]/20 rounded-2xl p-4 flex gap-3">
          <AlertTriangle size={16} className="text-[var(--color-primary)] shrink-0 mt-0.5" strokeWidth={2} />
          <p className="text-[11px] font-semibold text-[var(--color-secondary)]/70 leading-snug">{data.context}</p>
        </motion.div>
      </div>

      <div className="px-5 pt-4 pb-8 space-y-3">
        <button onClick={() => navigate(`/marketplace/intel/${id}/forecast`)}
          className="w-full py-4 rounded-2xl bg-[var(--color-secondary)] text-white font-black uppercase tracking-widest text-[11px] flex items-center justify-center gap-2 active:scale-95 transition-all">
          <Bell size={16} strokeWidth={2} /> View Forecast
        </button>
        <button onClick={() => navigate(`/marketplace/intel/${id}/opportunities`)}
          className="w-full py-4 rounded-2xl border border-[var(--border)] bg-[var(--app-bg)] text-[var(--color-secondary)] font-black uppercase tracking-widest text-[11px] flex items-center justify-center gap-2 active:scale-95 transition-all">
          <Share2 size={16} strokeWidth={2} /> Related Opportunities
        </button>
      </div>
    </div>
  );
}
