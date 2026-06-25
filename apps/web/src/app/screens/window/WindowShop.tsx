import { useState } from "react";
import { useNavigate } from "react-router";
import { motion } from "motion/react";
import { Star, ChevronRight, Bell } from "lucide-react";
import { PageHeader } from "../../components/PageHeader";
import { ImageWithFallback } from "../../components/figma/ImageWithFallback";
import {
  DuotoneSearch, DuotoneSmartphone, DuotoneTag, DuotoneBuilding,
  DuotoneHeart, DuotoneTruck, DuotoneWheat,
} from "../../components/DuotoneIcon";
import { WINDOW_STORES, WINDOW_PRODUCTS } from "../../data/windowShop";

const ALERT_CATS = [
  { label: "Electronics", Icon: DuotoneSmartphone },
  { label: "Fashion", Icon: DuotoneTag },
  { label: "Home", Icon: DuotoneBuilding },
  { label: "Beauty", Icon: DuotoneHeart },
  { label: "Auto", Icon: DuotoneTruck },
  { label: "Grocery", Icon: DuotoneWheat },
];

export function WindowShop() {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");

  const popular = WINDOW_STORES.slice(0, 4);
  const topDeals = WINDOW_PRODUCTS.filter((p) => p.oldPrice).slice(0, 6);

  const onSearch = () => navigate(`/marketplace/window/category/all${query ? `?q=${encodeURIComponent(query)}` : ""}`);

  return (
    <div className="w-full max-w-md mx-auto bg-transparent font-sans pb-24">
      <PageHeader title="MARKET WINDOW" subtitle="Window Shopping" showBack />

      <div className="px-5 pt-5 space-y-6">
        {/* Search */}
        <div className="relative">
          <DuotoneSearch size={18} className="absolute left-4 top-1/2 -translate-y-1/2" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && onSearch()}
            placeholder="Search products or services"
            className="w-full border border-[var(--border)] rounded-full pl-11 pr-4 py-3 text-[13px] font-semibold text-[var(--app-text)] bg-[var(--app-bg)] shadow-sm outline-none focus:border-[var(--color-primary)] transition-all placeholder:text-[var(--color-secondary)]/40"
          />
        </div>

        {/* Hero banner */}
        <motion.button initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
          onClick={() => navigate("/marketplace/window/categories")}
          className="w-full text-left bg-gradient-to-br from-[var(--color-primary)] to-[#ff6b00] rounded-3xl shadow-md overflow-hidden relative active:scale-[0.98] transition-all">
          <div className="absolute inset-0 opacity-20" style={{ backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)", backgroundSize: "18px 18px" }} />
          <div className="relative px-5 py-6 space-y-2">
            <p className="text-[18px] font-black text-white uppercase tracking-tight leading-tight">Everything you need<br />in one Window</p>
            <p className="text-[11px] font-semibold text-white/80 max-w-[80%]">Shop products and book services from trusted businesses near you.</p>
            <span className="inline-flex items-center gap-1.5 mt-1 bg-white text-[var(--color-primary)] text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full">
              Explore Now <ChevronRight size={12} strokeWidth={3} />
            </span>
          </div>
        </motion.button>

        {/* Enable Price Alerts */}
        <section className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-[var(--color-secondary)]/50">Enable Price Alerts</h3>
            <button onClick={() => navigate("/marketplace/window/categories")} className="text-[10px] font-black uppercase tracking-widest text-[var(--color-primary)] flex items-center gap-0.5">
              See All <ChevronRight size={11} strokeWidth={3} />
            </button>
          </div>
          <div className="flex gap-3 overflow-x-auto no-scrollbar -mx-1 px-1">
            {ALERT_CATS.map(({ label, Icon }) => (
              <button key={label} onClick={() => navigate("/marketplace/window/categories")} className="shrink-0 flex flex-col items-center gap-1.5 w-16">
                <div className="w-14 h-14 rounded-2xl bg-[var(--color-secondary)]/8 border border-[var(--border)] flex items-center justify-center relative">
                  <Icon size={24} />
                  <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-[var(--color-primary)] flex items-center justify-center shadow-sm">
                    <Bell size={9} className="text-white" strokeWidth={2.5} fill="white" />
                  </span>
                </div>
                <span className="text-[8px] font-black uppercase tracking-wide text-[var(--color-secondary)]/60 text-center leading-tight">{label}</span>
              </button>
            ))}
          </div>
        </section>

        {/* Popular Stores */}
        <section className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-[var(--color-secondary)]/50">Popular Stores</h3>
            <button onClick={() => navigate("/marketplace/window/stores")} className="text-[10px] font-black uppercase tracking-widest text-[var(--color-primary)] flex items-center gap-0.5">
              See All <ChevronRight size={11} strokeWidth={3} />
            </button>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {popular.map((s) => (
              <button key={s.id} onClick={() => navigate(`/marketplace/window/store/${s.id}`)}
                className="bg-[var(--app-bg)] border border-[var(--border)] rounded-2xl shadow-sm p-3 flex flex-col items-center gap-2 active:scale-95 transition-all">
                <div className="w-14 h-14 rounded-2xl overflow-hidden border border-[var(--border)] bg-[var(--muted)]">
                  <ImageWithFallback src={s.image} alt={s.name} className="w-full h-full object-cover" />
                </div>
                <p className="text-[10px] font-black text-[var(--app-text)] uppercase tracking-wide text-center leading-tight line-clamp-1">{s.name}</p>
                <p className="text-[8px] font-black text-[var(--color-secondary)]/50 uppercase tracking-widest text-center line-clamp-1">{s.category}</p>
                <div className="flex items-center gap-1">
                  <Star size={10} fill="#F59E0B" color="#F59E0B" />
                  <span className="text-[10px] font-black text-[var(--app-text)]">{s.rating}</span>
                  <span className="text-[9px] font-semibold text-[var(--color-secondary)]/40">({s.reviews})</span>
                </div>
              </button>
            ))}
          </div>
        </section>

        {/* Top Deals */}
        <section className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-[var(--color-secondary)]/50">Top Deals</h3>
            <span className="text-[8px] font-black text-white bg-[var(--color-primary)] px-2 py-0.5 rounded-full uppercase tracking-widest">Limited</span>
          </div>
          <div className="flex gap-3 overflow-x-auto no-scrollbar -mx-1 px-1 pb-1">
            {topDeals.map((p) => (
              <button key={p.id} onClick={() => navigate(`/marketplace/window/product/${p.id}`)}
                className="shrink-0 w-[120px] bg-[var(--app-bg)] border border-[var(--border)] rounded-2xl shadow-sm overflow-hidden flex flex-col active:scale-95 transition-all">
                <div className="aspect-square bg-[var(--muted)] border-b border-[var(--border)] relative">
                  <div className="absolute top-1.5 left-1.5 bg-[var(--color-primary)] text-white text-[7px] font-black px-1.5 py-0.5 rounded-sm uppercase z-10">Deal</div>
                  <ImageWithFallback src={p.image} alt={p.name} className="w-full h-full object-cover" />
                </div>
                <div className="p-2 flex flex-col gap-0.5">
                  <p className="text-[9px] font-black text-[var(--app-text)] uppercase leading-tight line-clamp-1">{p.name}</p>
                  <div className="flex items-center gap-1">
                    {p.oldPrice && <span className="text-[8px] font-black text-[var(--color-secondary)]/40 line-through">K{p.oldPrice.toLocaleString()}</span>}
                    <span className="text-[12px] font-black text-[var(--color-primary)]">K{p.price.toLocaleString()}</span>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
