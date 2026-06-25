import { useState } from "react";
import { useNavigate } from "react-router";
import { motion } from "motion/react";
import { ChevronRight } from "lucide-react";
import { PageHeader } from "../../components/PageHeader";
import { DuotoneSearch } from "../../components/DuotoneIcon";
import { WINDOW_CATEGORIES } from "../../data/windowShop";
import { CategoryIcon } from "./categoryIcon";

export function WindowCategories() {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");

  const filtered = WINDOW_CATEGORIES.filter((c) =>
    c.label.toLowerCase().includes(query.toLowerCase()) || c.sub.toLowerCase().includes(query.toLowerCase()),
  );

  return (
    <div className="w-full max-w-md mx-auto bg-transparent font-sans pb-24">
      <PageHeader title="CATEGORIES" subtitle="Window Shopping" showBack />

      <div className="px-5 pt-5 space-y-4">
        <div className="relative">
          <DuotoneSearch size={18} className="absolute left-4 top-1/2 -translate-y-1/2" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search products or services"
            className="w-full border border-[var(--border)] rounded-full pl-11 pr-4 py-3 text-[13px] font-semibold text-[var(--app-text)] bg-[var(--app-bg)] shadow-sm outline-none focus:border-[var(--color-primary)] transition-all placeholder:text-[var(--color-secondary)]/40"
          />
        </div>

        <div className="space-y-2.5">
          {filtered.map((c, i) => (
            <motion.button key={c.id} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }}
              onClick={() => navigate(`/marketplace/window/category/${c.id}`)}
              className="w-full flex items-center gap-4 p-3.5 bg-[var(--app-bg)] border border-[var(--border)] rounded-2xl shadow-sm active:scale-[0.98] transition-all text-left">
              <div className="w-11 h-11 rounded-2xl bg-[var(--color-secondary)]/8 flex items-center justify-center shrink-0">
                <CategoryIcon icon={c.icon} size={22} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[12px] font-black text-[var(--app-text)] uppercase tracking-wide">{c.label}</p>
                <p className="text-[10px] font-semibold text-[var(--color-secondary)]/50 truncate">{c.sub}</p>
              </div>
              <ChevronRight size={16} className="text-[var(--color-secondary)]/30 shrink-0" strokeWidth={2.5} />
            </motion.button>
          ))}
        </div>
      </div>
    </div>
  );
}
