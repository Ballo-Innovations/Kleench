import { useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router";
import { motion } from "motion/react";
import { Star } from "lucide-react";
import { PageHeader } from "../../components/PageHeader";
import { ImageWithFallback } from "../../components/figma/ImageWithFallback";
import { DuotoneSearch } from "../../components/DuotoneIcon";
import { WINDOW_CATEGORIES, WINDOW_PRODUCTS } from "../../data/windowShop";

export function WindowCategory() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [params] = useSearchParams();
  const [query, setQuery] = useState(params.get("q") || "");

  const cat = WINDOW_CATEGORIES.find((c) => c.id === id);
  const title = id === "all" || !cat ? "All Products" : cat.label;

  const results = WINDOW_PRODUCTS.filter((p) => {
    const inCat = id === "all" || !cat ? true : p.category === id;
    const q = query.trim().toLowerCase();
    const inQuery = !q || p.name.toLowerCase().includes(q) || p.storeName.toLowerCase().includes(q);
    return inCat && inQuery;
  });

  return (
    <div className="w-full max-w-md mx-auto bg-transparent font-sans pb-24">
      <PageHeader title={title.toUpperCase()} subtitle="Window Shopping" showBack />

      <div className="px-5 pt-5 space-y-4">
        <div className="relative">
          <DuotoneSearch size={18} className="absolute left-4 top-1/2 -translate-y-1/2" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search in this category"
            className="w-full border border-[var(--border)] rounded-full pl-11 pr-4 py-3 text-[13px] font-semibold text-[var(--app-text)] bg-[var(--app-bg)] shadow-sm outline-none focus:border-[var(--color-primary)] transition-all placeholder:text-[var(--color-secondary)]/40"
          />
        </div>

        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[var(--color-secondary)]/40">{results.length} result{results.length !== 1 ? "s" : ""}</p>

        {results.length === 0 ? (
          <div className="py-20 text-center">
            <p className="text-[12px] font-bold text-[var(--color-secondary)]/50">No products found</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-3">
            {results.map((p, i) => (
              <motion.button key={p.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }}
                onClick={() => navigate(`/marketplace/window/product/${p.id}`)}
                className="bg-[var(--app-bg)] border border-[var(--border)] rounded-2xl shadow-sm overflow-hidden flex flex-col active:scale-95 transition-all text-left">
                <div className="aspect-square bg-[var(--muted)] border-b border-[var(--border)] relative">
                  {p.oldPrice && <div className="absolute top-2 left-2 bg-[var(--color-primary)] text-white text-[7px] font-black px-1.5 py-0.5 rounded-sm uppercase z-10">Deal</div>}
                  <ImageWithFallback src={p.image} alt={p.name} className="w-full h-full object-cover" />
                </div>
                <div className="p-2.5 flex flex-col gap-1">
                  <p className="text-[10px] font-black text-[var(--app-text)] uppercase leading-tight line-clamp-1">{p.name}</p>
                  <p className="text-[8px] font-black text-[var(--color-secondary)]/50 uppercase tracking-widest line-clamp-1">{p.storeName}</p>
                  <div className="flex items-center justify-between mt-0.5">
                    <span className="text-[13px] font-black text-[var(--color-primary)]">K{p.price.toLocaleString()}</span>
                    <div className="flex items-center gap-0.5">
                      <Star size={9} fill="#F59E0B" color="#F59E0B" />
                      <span className="text-[9px] font-black text-[var(--app-text)]">{p.rating}</span>
                      <span className="text-[8px] font-semibold text-[var(--color-secondary)]/40">({p.reviews})</span>
                    </div>
                  </div>
                </div>
              </motion.button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
