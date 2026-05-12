import { useState } from "react";
import { motion } from "motion/react";
import { Search, MapPin, TrendingUp, Briefcase, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router";
import { PageHeader } from "../components/PageHeader";

const grace = (delay = 0) => ({
  delay, duration: 0.45, ease: [0.22, 1, 0.36, 1] as const,
});

const FILTERS = ["All", "Individual", "Corporate", "NGO", "Government"];

const INVESTORS = [
  { id: "1", name: "Chanda Mwansa", type: "Individual", location: "Lusaka, Zambia", totalInvested: "125,000.00", portfolioCount: 4 },
  { id: "2", name: "Zambia Green Energy Ltd", type: "Corporate", location: "Ndola, Zambia", totalInvested: "2,500,000.00", portfolioCount: 12 },
  { id: "3", name: "Food Security Alliance", type: "NGO", location: "Livingstone, Zambia", totalInvested: "780,000.00", portfolioCount: 7 },
  { id: "4", name: "Southern Province Council", type: "Government", location: "Choma, Zambia", totalInvested: "5,000,000.00", portfolioCount: 3 },
];

const TYPE_COLORS: Record<string, string> = {
  Individual: "bg-[#E85D3F]/10 text-[#E85D3F]",
  Corporate: "bg-blue-100 text-blue-600",
  NGO: "bg-green-100 text-green-600",
  Government: "bg-purple-100 text-purple-600",
};

export function ListedInvestors() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");

  const filtered = INVESTORS.filter(inv => {
    const matchesSearch = inv.name.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = activeFilter === "All" || inv.type === activeFilter;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="w-full max-w-md mx-auto min-h-screen font-sans pb-32">
      <div className="sticky top-0 z-50">
        <PageHeader title="LISTED INVESTORS" showBack onBack={() => navigate(-1)} />
      </div>

      <div className="px-5 pt-5 space-y-4">
        <div className="flex items-center bg-[var(--card)] border border-[var(--border)] rounded-2xl h-[48px] px-4 gap-3">
          <Search size={18} className="text-[var(--color-secondary)]/40 shrink-0" strokeWidth={2} />
          <input type="text" value={search} onChange={e => setSearch(e.target.value)}
            placeholder="Search investors..."
            className="flex-1 bg-transparent outline-none font-bold text-[14px] text-[var(--color-secondary)] placeholder:text-[var(--color-secondary)]/30" />
        </div>

        <div className="flex gap-2 overflow-x-auto [&::-webkit-scrollbar]:hidden pb-1">
          {FILTERS.map(f => (
            <button key={f} onClick={() => setActiveFilter(f)}
              className={`shrink-0 px-4 py-2 rounded-full font-black text-[11px] uppercase tracking-widest transition-all active:scale-95 ${activeFilter === f ? 'bg-[#E85D3F] text-white shadow-sm' : 'bg-[var(--card)] border border-[var(--border)] text-[var(--color-secondary)]'}`}>
              {f}
            </button>
          ))}
        </div>

        <div className="space-y-3">
          {filtered.map((inv, i) => (
            <motion.div key={inv.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={grace(0.06 * i)}
              className="bg-[var(--card)] rounded-2xl border border-[var(--border)] p-4 shadow-sm">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <p className="font-black text-[14px] text-[var(--color-secondary)] uppercase tracking-wide leading-tight">{inv.name}</p>
                  <div className="flex items-center gap-1.5 mt-1">
                    <MapPin size={11} className="text-[var(--color-secondary)]/40" strokeWidth={2} />
                    <span className="text-[11px] font-semibold text-[var(--color-secondary)]/50">{inv.location}</span>
                  </div>
                </div>
                <span className={`text-[9px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full shrink-0 ${TYPE_COLORS[inv.type]}`}>{inv.type}</span>
              </div>
              <div className="flex gap-3">
                <div className="flex-1 bg-[var(--app-bg-muted)] rounded-xl p-2.5">
                  <div className="flex items-center gap-1 mb-0.5">
                    <TrendingUp size={11} className="text-[#E85D3F]" strokeWidth={2} />
                    <span className="text-[9px] font-black uppercase tracking-widest text-[var(--color-secondary)]/40">Total Invested</span>
                  </div>
                  <p className="font-black text-[13px] text-[var(--color-secondary)]">K {inv.totalInvested}</p>
                </div>
                <div className="flex-1 bg-[var(--app-bg-muted)] rounded-xl p-2.5">
                  <div className="flex items-center gap-1 mb-0.5">
                    <Briefcase size={11} className="text-[#E85D3F]" strokeWidth={2} />
                    <span className="text-[9px] font-black uppercase tracking-widest text-[var(--color-secondary)]/40">Portfolio</span>
                  </div>
                  <p className="font-black text-[13px] text-[var(--color-secondary)]">{inv.portfolioCount} projects</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.button initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={grace(0.3)}
          onClick={() => navigate("/crowdfunding/register-investor")}
          className="w-full py-4 rounded-2xl bg-[#E85D3F] text-white font-black uppercase tracking-widest text-[13px] flex items-center justify-center gap-3 shadow-md active:scale-95 transition-all">
          Register as Investor <ChevronRight size={18} />
        </motion.button>
      </div>
    </div>
  );
}
