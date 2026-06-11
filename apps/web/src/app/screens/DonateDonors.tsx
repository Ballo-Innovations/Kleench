import { useState } from "react";
import { motion } from "motion/react";
import { ChevronRight, Search, ShieldCheck, Users } from "lucide-react";
import { useNavigate } from "react-router";
import { PageHeader } from "../components/PageHeader";

const grace = (delay = 0) => ({
  delay, duration: 0.45, ease: [0.22, 1, 0.36, 1] as const,
});

const FILTER_CATS = ["All", "Individual", "NGO", "Corporate", "Government"];

const MOCK_DONORS = [
  { id: 1, name: "Bwalya Investments Ltd", type: "Corporate", total: "K 245,000", projects: 12, verified: true, causes: ["Education", "Health"] },
  { id: 2, name: "Chanda Mwansa Foundation", type: "NGO", total: "K 87,500", projects: 7, verified: true, causes: ["Disaster", "Water"] },
  { id: 3, name: "Mutale Phiri", type: "Individual", total: "K 14,200", projects: 3, verified: true, causes: ["Education"] },
  { id: 4, name: "Zambia Dev Agency", type: "Government", total: "K 1,200,000", projects: 45, verified: true, causes: ["Agriculture", "Community"] },
  { id: 5, name: "Lesa Banda", type: "Individual", total: "K 8,400", projects: 2, verified: false, causes: ["Health"] },
];

const INITIALS_COLORS = ["bg-[#E85D3F]", "bg-[#000080]", "bg-[#00C853]", "bg-[#FF9500]", "bg-[#9C27B0]"];

export function DonateDonors() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");

  const filtered = MOCK_DONORS.filter(d => {
    const matchSearch = d.name.toLowerCase().includes(search.toLowerCase());
    const matchFilter = activeFilter === "All" || d.type === activeFilter;
    return matchSearch && matchFilter;
  });

  return (
    <div className="w-full max-w-md mx-auto font-sans pb-24">
      <div className="sticky top-0 z-50">
        <PageHeader title="DONORS" showBack onBack={() => navigate(-1)} />
      </div>

      <div className="px-5 pt-5 space-y-4">
        {/* Search */}
        <div className="flex items-center bg-[var(--card)] border border-[var(--border)] rounded-2xl h-[52px] px-4 gap-3 shadow-sm focus-within:border-[#E85D3F] transition-colors">
          <Search size={18} className="text-[var(--color-secondary)]/40 shrink-0" strokeWidth={1.5} />
          <input value={search} onChange={e => setSearch(e.target.value)}
            placeholder="Search donors..."
            className="flex-1 bg-transparent outline-none font-bold text-[14px] text-[var(--color-secondary)] placeholder:text-[var(--color-secondary)]/30" />
        </div>

        {/* Filter chips */}
        <div className="flex gap-2 overflow-x-auto pb-1 [&::-webkit-scrollbar]:hidden">
          {FILTER_CATS.map(cat => (
            <button key={cat} onClick={() => setActiveFilter(cat)}
              className={`px-4 py-2 rounded-full font-black text-[11px] uppercase tracking-wider shrink-0 transition-all ${activeFilter === cat ? 'bg-[#E85D3F] text-white shadow-sm' : 'bg-[var(--card)] border border-[var(--border)] text-[var(--color-secondary)]/60'}`}>
              {cat}
            </button>
          ))}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-[var(--card)] rounded-2xl border border-[var(--border)] p-4 shadow-sm">
            <p className="font-black text-[22px] text-[var(--color-secondary)]">{MOCK_DONORS.length}</p>
            <p className="text-[10px] font-black uppercase tracking-widest text-[var(--color-secondary)]/40">Registered Donors</p>
          </div>
          <div className="bg-[var(--card)] rounded-2xl border border-[var(--border)] p-4 shadow-sm">
            <p className="font-black text-[22px] text-[var(--color-secondary)]">K 1.5M</p>
            <p className="text-[10px] font-black uppercase tracking-widest text-[var(--color-secondary)]/40">Total Donated</p>
          </div>
        </div>

        {/* Donor list */}
        <div className="space-y-3">
          {filtered.map((donor, i) => (
            <motion.div key={donor.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={grace(0.05 * i)}
              className="bg-[var(--card)] rounded-2xl border border-[var(--border)] shadow-sm p-4 flex items-center gap-3 active:scale-[0.99] transition-transform cursor-pointer">
              <div className={`w-12 h-12 rounded-full ${INITIALS_COLORS[i % INITIALS_COLORS.length]} flex items-center justify-center text-white font-black text-[14px] shrink-0`}>
                {donor.name.split(" ").map(w => w[0]).slice(0, 2).join("")}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5 mb-0.5">
                  <p className="font-black text-[13px] text-[var(--color-secondary)] truncate">{donor.name}</p>
                  {donor.verified && <ShieldCheck size={13} className="text-green-500 shrink-0" strokeWidth={2.5} />}
                </div>
                <p className="text-[10px] font-bold text-[var(--color-secondary)]/40 uppercase tracking-wide mb-1.5">{donor.type}</p>
                <div className="flex gap-2 flex-wrap">
                  {donor.causes.map(c => (
                    <span key={c} className="text-[9px] font-black uppercase tracking-wide bg-[var(--app-bg-muted)] text-[var(--color-secondary)]/60 px-2 py-0.5 rounded-full">{c}</span>
                  ))}
                </div>
              </div>
              <div className="text-right shrink-0">
                <p className="font-black text-[12px] text-[#E85D3F]">{donor.total}</p>
                <div className="flex items-center gap-1 justify-end mt-1">
                  <Users size={10} className="text-[var(--color-secondary)]/30" />
                  <p className="text-[10px] font-bold text-[var(--color-secondary)]/40">{donor.projects} projects</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Sticky bottom CTA */}
      <div className="fixed bottom-20 left-0 right-0 max-w-md mx-auto px-5 z-40">
        <button onClick={() => navigate("/donate/register-donor")}
          className="w-full py-4 rounded-2xl bg-[#E85D3F] text-white font-black uppercase tracking-widest text-[13px] shadow-xl flex items-center justify-center gap-2 active:scale-95 transition-all">
          Register as Donor <ChevronRight size={16} strokeWidth={3} />
        </button>
      </div>
    </div>
  );
}
