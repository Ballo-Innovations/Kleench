import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { motion } from "motion/react";
import { Search, Star, Clock, X, Briefcase } from "lucide-react";
import { PageHeader } from "../components/PageHeader";

const SEED_SERVICES = [
  { id: "svc-1", name: "Professional Wedding Photography", category: "Photography & Media", serviceType: "Photography", provider: "Chisenga Studios", rating: 4.8, price: "3500", responseTime: "~2 hrs", location: "Lusaka" },
  { id: "svc-2", name: "Full-Stack Web Development", category: "Technology", serviceType: "Web Development", provider: "LusakaTech", rating: 4.7, price: "8000", responseTime: "~4 hrs", location: "Lusaka" },
  { id: "svc-3", name: "Brand Identity & Graphic Design", category: "Photography & Media", serviceType: "Branding", provider: "Creative ZM", rating: 4.9, price: "2500", responseTime: "~1 hr", location: "Copperbelt" },
  { id: "svc-4", name: "Premium Event Catering", category: "Hospitality", serviceType: "Catering", provider: "Chef Masters ZM", rating: 4.6, price: "5000", responseTime: "~3 hrs", location: "Lusaka" },
  { id: "svc-5", name: "Personal Fitness Training", category: "Health & Wellness", serviceType: "Personal Training", provider: "FitZone ZM", rating: 4.5, price: "800", responseTime: "~1 hr", location: "Lusaka" },
  { id: "svc-6", name: "Business Strategy Consulting", category: "Consulting", serviceType: "Business Consulting", provider: "Zenith Advisory", rating: 4.8, price: "12000", responseTime: "~6 hrs", location: "Lusaka" },
];

const CATEGORY_COLORS: Record<string, string> = {
  "Photography & Media": "#7C3AED",
  "Technology": "#0077B6",
  "Hospitality": "var(--color-primary)",
  "Health & Wellness": "#DC2626",
  "Consulting": "var(--color-secondary)",
  "Events": "#D97706",
};

export function ServicesMarketplace() {
  const navigate = useNavigate();
  const [services, setServices] = useState(SEED_SERVICES);
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  useEffect(() => {
    try {
      const stored = JSON.parse(localStorage.getItem("kleench_services") || "null");
      if (Array.isArray(stored) && stored.length > 0) setServices(stored);
    } catch {}
  }, []);

  const categories = ["All", ...Array.from(new Set(services.map((s) => s.category)))];

  const filtered = services.filter((s) => {
    const matchSearch = s.name.toLowerCase().includes(search.toLowerCase()) || s.provider.toLowerCase().includes(search.toLowerCase()) || s.serviceType.toLowerCase().includes(search.toLowerCase());
    const matchCat = activeCategory === "All" || s.category === activeCategory;
    return matchSearch && matchCat;
  });

  return (
    <div className="w-full max-w-md mx-auto min-h-screen bg-transparent font-sans pb-32">
      <PageHeader title="SERVICES" showBack />

      <div className="px-5 pt-4 space-y-4">
        {/* Search */}
        <div className="relative">
          <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--app-text)]/40" strokeWidth={2} />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search services or providers..."
            className="w-full bg-[var(--app-bg)] border border-[var(--border)] rounded-2xl pl-10 pr-10 py-3 text-[13px] font-semibold text-[var(--app-text)] outline-none focus:border-[var(--app-text)]/40 shadow-sm transition-all placeholder:text-[var(--app-text)]/40"
          />
          {search && <button onClick={() => setSearch("")} className="absolute right-3.5 top-1/2 -translate-y-1/2"><X size={13} className="text-[var(--app-text)]/40" /></button>}
        </div>

        {/* Category chips */}
        <div className="flex gap-2 overflow-x-auto scrollbar-hide no-scrollbar pb-1">
          {categories.map((cat) => (
            <button key={cat} onClick={() => setActiveCategory(cat)}
              className={`shrink-0 px-3 py-1.5 rounded-full border text-[10px] font-black uppercase tracking-wide transition-all ${activeCategory === cat ? "bg-[var(--app-shape-accent)] text-white border-[var(--app-shape-accent)]" : "border-[var(--border)] text-[var(--app-text)]/60 bg-[var(--app-bg)]"}`}>
              {cat === "Photography & Media" ? "Media" : cat}
            </button>
          ))}
        </div>

        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[var(--app-text)]/40">{filtered.length} service{filtered.length !== 1 ? "s" : ""} available</p>

        {/* Service list */}
        {filtered.length > 0 ? (
          <div className="space-y-3">
            {filtered.map((service, i) => {
              const accentColor = CATEGORY_COLORS[service.category] || "var(--color-primary)";
              return (
                <motion.button
                  key={service.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => navigate(`/marketplace/service/${service.id}`, { state: { service } })}
                  className="w-full flex gap-3 bg-[var(--app-bg)] rounded-2xl border border-[var(--border)] shadow-sm p-3 text-left active:scale-95 transition-all"
                >
                  {/* Cover */}
                  <div className="w-20 h-20 rounded-xl flex items-center justify-center shrink-0 overflow-hidden"
                    style={{ backgroundColor: accentColor + "15" }}>
                    <Briefcase size={24} style={{ color: accentColor }} strokeWidth={1.5} />
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0 space-y-1">
                    <p className="text-[12px] font-black uppercase tracking-tight text-[var(--app-text)] leading-tight line-clamp-2">{service.name}</p>
                    <p className="text-[10px] font-semibold text-[var(--app-text)]/50">{service.provider}</p>
                    <div className="flex items-center gap-2 flex-wrap">
                      <div className="flex items-center gap-0.5">
                        <Star size={9} fill="#F59E0B" color="#F59E0B" />
                        <span className="text-[9px] font-black text-[var(--app-text)]">{service.rating}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock size={9} className="text-[var(--app-text)]/40" strokeWidth={2} />
                        <span className="text-[9px] font-semibold text-[var(--app-text)]/50">{service.responseTime}</span>
                      </div>
                      <span className="text-[8px] font-black uppercase tracking-widest px-1.5 py-0.5 rounded-full"
                        style={{ backgroundColor: accentColor + "12", color: accentColor }}>
                        {service.serviceType}
                      </span>
                    </div>
                    <p className="text-[13px] font-black text-[var(--color-primary)]">from K{Number(service.price).toLocaleString()}</p>
                  </div>
                </motion.button>
              );
            })}
          </div>
        ) : (
          <div className="flex flex-col items-center gap-3 py-12 text-center">
            <div className="w-14 h-14 rounded-full bg-[var(--border)]/30 flex items-center justify-center">
              <Briefcase size={24} className="text-[var(--app-text)]/30" strokeWidth={1.5} />
            </div>
            <p className="text-[12px] font-black uppercase tracking-widest text-[var(--app-text)]/40">No services found</p>
            <p className="text-[11px] font-semibold text-[var(--app-text)]/30">Try a different search or category</p>
          </div>
        )}
      </div>
    </div>
  );
}
