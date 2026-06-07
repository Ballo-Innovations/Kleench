import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { motion } from "motion/react";
import { Search, X, Star, Building2, MapPin } from "lucide-react";
import { PageHeader } from "../components/PageHeader";

interface Business {
  id: string;
  name: string;
  category: string;
  type: string;
  listing: "ordinary" | "priority";
  province: string;
  tagline?: string;
  desc?: string;
  visibility?: string;
}

const SEED: Business[] = [
  { id: "biz1", name: "Zambia Tech Solutions", category: "Technology", type: "SME", listing: "ordinary", province: "Lusaka", tagline: "Digital transformation for Zambian enterprises" },
  { id: "biz2", name: "African Grain Traders Ltd", category: "Agriculture", type: "Local Company", listing: "priority", province: "Eastern", tagline: "Connecting farmers to markets across Southern Africa" },
  { id: "biz3", name: "Copperbelt Automotive Hub", category: "Automotive", type: "SME", listing: "ordinary", province: "Copperbelt", tagline: "Your one-stop vehicle service centre" },
  { id: "biz4", name: "Mwanza Health Clinic", category: "Health & Wellness", type: "Sole Proprietor", listing: "priority", province: "Southern", tagline: "Affordable quality healthcare for every family" },
  { id: "biz5", name: "EduZambia Institute", category: "Education", type: "NGO", listing: "ordinary", province: "Lusaka", tagline: "Empowering the next generation through skills training" },
];

const CATEGORIES = ["All", "Technology", "Agriculture", "Automotive", "Health & Wellness", "Education", "Finance & Banking", "Retail & Commerce", "Logistics"];

export function BusinessListings() {
  const navigate = useNavigate();
  const [businesses, setBusinesses] = useState<Business[]>([]);
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  useEffect(() => {
    try {
      const stored = JSON.parse(localStorage.getItem("kleench_businesses") || "null");
      setBusinesses(Array.isArray(stored) && stored.length ? stored : SEED);
    } catch {
      setBusinesses(SEED);
    }
  }, []);

  const filtered = businesses.filter((b) => {
    const matchesSearch = !search || b.name.toLowerCase().includes(search.toLowerCase()) || b.category.toLowerCase().includes(search.toLowerCase()) || (b.tagline || "").toLowerCase().includes(search.toLowerCase());
    const matchesCat = activeCategory === "All" || b.category === activeCategory;
    return matchesSearch && matchesCat;
  });

  const priorityFirst = [...filtered].sort((a, b) => (b.listing === "priority" ? 1 : 0) - (a.listing === "priority" ? 1 : 0));

  return (
    <div className="w-full max-w-md mx-auto min-h-screen bg-transparent font-sans pb-32">
      <PageHeader title="BUSINESS LISTINGS" showBack />

      <div className="px-5 pt-4 space-y-4">
        {/* Search */}
        <div className="relative">
          <Search size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--color-secondary)]/40" strokeWidth={2} />
          <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search businesses..."
            className="w-full border border-[var(--border)] rounded-2xl pl-9 pr-9 py-3 text-[13px] font-semibold text-[var(--app-text)] bg-[var(--app-bg)] outline-none focus:border-[var(--app-text)] transition-all shadow-sm placeholder:text-[var(--color-secondary)]/30" />
          {search && (
            <button onClick={() => setSearch("")} className="absolute right-3.5 top-1/2 -translate-y-1/2">
              <X size={14} className="text-[var(--color-secondary)]/40" strokeWidth={2} />
            </button>
          )}
        </div>

        {/* Category chips */}
        <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
          {CATEGORIES.map((cat) => (
            <button key={cat} onClick={() => setActiveCategory(cat)}
              className={`shrink-0 px-3.5 py-1.5 rounded-full border text-[10px] font-black uppercase tracking-wide transition-all ${activeCategory === cat ? "bg-[var(--color-secondary)] border-[var(--color-secondary)] text-white" : "border-[var(--border)] text-[var(--color-secondary)]/60 bg-[var(--app-bg)]"}`}>
              {cat}
            </button>
          ))}
        </div>

        {/* Stats */}
        <div className="flex items-center justify-between">
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[var(--color-secondary)]/40">{priorityFirst.length} listing{priorityFirst.length !== 1 ? "s" : ""}</p>
          <span className="text-[8px] font-black uppercase tracking-widest text-[var(--color-primary)] bg-[var(--color-primary)]/8 px-2 py-0.5 rounded-full">
            {priorityFirst.filter((b) => b.listing === "priority").length} priority
          </span>
        </div>

        {/* Listings */}
        {priorityFirst.length === 0 ? (
          <div className="bg-[var(--app-bg)] border border-[var(--border)] rounded-2xl shadow-sm p-8 text-center space-y-2">
            <Building2 size={32} className="text-[var(--color-secondary)]/30 mx-auto" strokeWidth={1} />
            <p className="text-[12px] font-black uppercase tracking-wide text-[var(--color-secondary)]/50">No businesses found</p>
            <p className="text-[10px] font-semibold text-[var(--color-secondary)]/40">Try a different search or category</p>
          </div>
        ) : (
          <div className="space-y-3 pb-4">
            {priorityFirst.map((biz, i) => (
              <motion.div key={biz.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
                onClick={() => navigate(`/marketplace/business/${biz.id}`, { state: biz })}
                className="bg-[var(--app-bg)] border border-[var(--border)] rounded-2xl shadow-sm p-4 cursor-pointer active:scale-[0.98] transition-all">
                <div className="flex items-start gap-3">
                  {/* Avatar */}
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${biz.listing === "priority" ? "bg-[var(--color-secondary)]" : "bg-[var(--color-secondary)]/10"}`}>
                    <Building2 size={20} color={biz.listing === "priority" ? "white" : "var(--color-secondary)"} strokeWidth={1.5} />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <p className="text-[13px] font-black text-[var(--app-text)] uppercase tracking-wide leading-tight">{biz.name}</p>
                      {biz.listing === "priority" && (
                        <Star size={10} color="var(--color-primary)" fill="var(--color-primary)" />
                      )}
                    </div>
                    {biz.tagline && <p className="text-[10px] font-semibold text-[var(--color-secondary)]/60 mt-0.5 leading-snug line-clamp-2">{biz.tagline}</p>}
                    <div className="flex flex-wrap items-center gap-2 mt-2">
                      <span className="text-[8px] font-black uppercase tracking-widest text-[var(--color-secondary)] bg-[var(--color-secondary)]/10 px-2 py-0.5 rounded-full">{biz.category}</span>
                      <span className="text-[8px] font-black uppercase tracking-widest text-[var(--color-secondary)]/50">{biz.type}</span>
                      <div className="flex items-center gap-1">
                        <MapPin size={9} className="text-[var(--color-secondary)]/40" strokeWidth={2} />
                        <span className="text-[8px] font-semibold text-[var(--color-secondary)]/50">{biz.province}</span>
                      </div>
                    </div>
                  </div>

                  {biz.listing === "priority" && (
                    <span className="text-[7px] font-black px-2 py-0.5 bg-[var(--color-primary)] text-white rounded uppercase tracking-widest shrink-0">Priority</span>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
