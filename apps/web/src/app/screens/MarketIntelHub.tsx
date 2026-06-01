import { useNavigate } from "react-router";
import { motion } from "motion/react";
import { TrendingUp, TrendingDown, ChevronRight, Newspaper } from "lucide-react";
import { PageHeader } from "../components/PageHeader";

const COMMODITIES = [
  { id: "maize", title: "MAIZE", unit: "per 50kg bag", price: "K280", change: "+5.7%", up: true, graph: "M 0 40 L 10 30 L 20 45 L 30 15 L 40 25" },
  { id: "fuel", title: "FUEL", unit: "per litre", price: "K29.50", change: "-4.8%", up: false, graph: "M 0 20 L 10 40 L 25 5 L 40 25" },
  { id: "zinc", title: "ZINC", unit: "per tonne (USD)", price: "$2,400", change: "+3.9%", up: true, graph: "M 0 15 L 10 35 L 20 10 L 30 15 L 40 25" },
  { id: "cement", title: "CEMENT", unit: "per 50kg bag", price: "K150", change: "-3.2%", up: false, graph: "M 0 35 L 10 25 L 20 20 L 30 10 L 40 5" },
];

const NEWS = [
  { title: "FRA Revises Maize Floor Price Upward", date: "May 30, 2026", blurb: "The Food Reserve Agency has adjusted the floor price for maize by 6% citing reduced harvest projections." },
  { title: "ERB Cuts Fuel Pump Price for June", date: "May 29, 2026", blurb: "Energy Regulation Board announces a K1.50 reduction in petrol pump price effective June 1." },
  { title: "Zinc Exports Hit 3-Year High on LME Rally", date: "May 27, 2026", blurb: "Zambia's zinc export earnings increased 18% in Q1 2026 driven by strong London Metal Exchange pricing." },
];

export function MarketIntelHub() {
  const navigate = useNavigate();

  return (
    <div className="w-full max-w-md mx-auto min-h-screen bg-transparent font-sans pb-32">
      <PageHeader title="MARKET INTELLIGENCE" showBack />

      <div className="px-5 pt-4 space-y-5">
        {/* Live ticker strip */}
        <div className="flex gap-2 overflow-x-auto scrollbar-hide no-scrollbar py-1">
          {COMMODITIES.map((c) => (
            <div key={c.id} className="shrink-0 flex items-center gap-1.5 bg-[var(--color-secondary)] rounded-full px-3 py-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse block" />
              <span className="text-[9px] font-black text-white/70 uppercase tracking-widest">{c.title}</span>
              <span className="text-[9px] font-black text-white">{c.price}</span>
              <span className={`text-[8px] font-black ${c.up ? "text-white" : "text-white/60"}`}>{c.change}</span>
            </div>
          ))}
        </div>

        {/* Section: Commodities */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[var(--app-text)]/40">Commodities</p>
            <span className="text-[8px] font-black uppercase tracking-widest text-[var(--color-primary)] bg-[var(--color-primary)]/8 px-2 py-0.5 rounded-full">Live</span>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {COMMODITIES.map((c, i) => (
              <motion.button
                key={c.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.06 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => navigate(`/marketplace/intel/${c.id}`)}
                className="flex flex-col bg-[var(--color-secondary)] rounded-2xl shadow-sm p-4 text-left relative overflow-hidden"
              >
                <div className="absolute inset-0 opacity-20 pointer-events-none flex flex-col justify-between p-3">
                  <span className="text-[6px] font-black text-white">100</span>
                  <span className="text-[6px] font-black text-white">0</span>
                </div>
                <p className="text-[9px] font-black uppercase tracking-[0.25em] text-white/60 z-10">{c.title}</p>
                <p className="text-[9px] font-semibold text-white/40 z-10 leading-none mb-1">{c.unit}</p>
                <p className="text-[18px] font-black text-white z-10 leading-none">{c.price}</p>
                <div className={`flex items-center gap-1 z-10 mt-1 ${c.up ? "text-white" : "text-white/70"}`}>
                  {c.up ? <TrendingUp size={10} strokeWidth={2.5} /> : <TrendingDown size={10} strokeWidth={2.5} />}
                  <span className="text-[9px] font-black">{c.change}</span>
                </div>
                <div className="h-[36px] w-full relative z-10 mt-2">
                  <svg className="w-full h-full" viewBox="0 0 40 50" preserveAspectRatio="none">
                    <path d={c.graph} fill="none" stroke="white" strokeWidth="3"
                      vectorEffect="non-scaling-stroke" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <div className="flex items-center justify-between mt-2 pt-2 border-t border-white/10 z-10">
                  <div className="flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse block" />
                    <span className="text-[7px] font-black uppercase tracking-widest text-white/40">LIVE</span>
                  </div>
                  <ChevronRight size={10} className="text-white/30" strokeWidth={2.5} />
                </div>
              </motion.button>
            ))}
          </div>
        </div>

        {/* Section: Market News */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <Newspaper size={13} className="text-[var(--app-text)]/40" strokeWidth={2} />
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[var(--app-text)]/40">Market News</p>
          </div>
          <div className="bg-[var(--app-bg)] rounded-2xl border border-[var(--border)] shadow-sm overflow-hidden divide-y divide-[var(--border)]">
            {NEWS.map((item, i) => (
              <div key={i} className="px-4 py-3.5">
                <div className="flex items-start justify-between gap-2">
                  <p className="text-[12px] font-black text-[var(--app-text)] uppercase tracking-tight leading-snug flex-1">{item.title}</p>
                  <span className="text-[8px] font-semibold text-[var(--app-text)]/40 shrink-0 pt-0.5">{item.date}</span>
                </div>
                <p className="text-[10px] font-semibold text-[var(--app-text)]/50 mt-1 leading-snug">{item.blurb}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
