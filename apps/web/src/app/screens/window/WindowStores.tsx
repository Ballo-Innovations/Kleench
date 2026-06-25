import { useState } from "react";
import { useNavigate } from "react-router";
import { motion } from "motion/react";
import { Star, MapPin } from "lucide-react";
import { PageHeader } from "../../components/PageHeader";
import { ImageWithFallback } from "../../components/figma/ImageWithFallback";
import { DuotoneSearch } from "../../components/DuotoneIcon";
import { WINDOW_STORES } from "../../data/windowShop";

export function WindowStores() {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");

  const filtered = WINDOW_STORES.filter((s) =>
    s.name.toLowerCase().includes(query.toLowerCase()) || s.category.toLowerCase().includes(query.toLowerCase()),
  );

  return (
    <div className="w-full max-w-md mx-auto bg-transparent font-sans pb-24">
      <PageHeader title="STORES" subtitle="Window Shopping" showBack />

      <div className="px-5 pt-5 space-y-4">
        <div className="relative">
          <DuotoneSearch size={18} className="absolute left-4 top-1/2 -translate-y-1/2" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search stores"
            className="w-full border border-[var(--border)] rounded-full pl-11 pr-4 py-3 text-[13px] font-semibold text-[var(--app-text)] bg-[var(--app-bg)] shadow-sm outline-none focus:border-[var(--color-primary)] transition-all placeholder:text-[var(--color-secondary)]/40"
          />
        </div>

        <div className="space-y-3">
          {filtered.map((s, i) => (
            <motion.div key={s.id} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }}
              className="flex items-center gap-3 p-3 bg-[var(--app-bg)] border border-[var(--border)] rounded-2xl shadow-sm">
              <div className="w-14 h-14 rounded-2xl overflow-hidden border border-[var(--border)] bg-[var(--muted)] shrink-0">
                <ImageWithFallback src={s.image} alt={s.name} className="w-full h-full object-cover" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[12px] font-black text-[var(--app-text)] uppercase tracking-wide truncate">{s.name}</p>
                <p className="text-[9px] font-black text-[var(--color-secondary)]/50 uppercase tracking-widest truncate">{s.category}</p>
                <div className="flex items-center gap-2 mt-1">
                  <div className="flex items-center gap-0.5">
                    <Star size={10} fill="#F59E0B" color="#F59E0B" />
                    <span className="text-[10px] font-black text-[var(--app-text)]">{s.rating}</span>
                    <span className="text-[9px] font-semibold text-[var(--color-secondary)]/40">({s.reviews})</span>
                  </div>
                  <div className="flex items-center gap-0.5 text-[var(--color-secondary)]/40">
                    <MapPin size={9} strokeWidth={2.5} />
                    <span className="text-[9px] font-semibold truncate">{s.location}</span>
                  </div>
                </div>
              </div>
              <button onClick={() => navigate(`/marketplace/window/store/${s.id}`)}
                className="shrink-0 px-3 py-2 rounded-full bg-[var(--color-secondary)] text-white text-[9px] font-black uppercase tracking-widest active:scale-95 transition-all">
                View Store
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
