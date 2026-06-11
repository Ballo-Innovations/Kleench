import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import { motion } from "motion/react";
import { ShoppingBag, Briefcase, Building2, ChevronRight, Star } from "lucide-react";
import { PageHeader } from "../components/PageHeader";

const COMMODITY_META: Record<string, { title: string; desc: string; tags: string[] }> = {
  maize: { title: "MAIZE", desc: "Based on rising maize prices, these opportunities are relevant to agricultural buyers and food processors.", tags: ["Agriculture", "Food"] },
  fuel: { title: "FUEL", desc: "Fuel price movements impact transport, logistics, and fleet operations. See related listings.", tags: ["Logistics", "Automotive"] },
  zinc: { title: "ZINC", desc: "Zinc market strength signals opportunity in mining, construction materials, and industrial equipment.", tags: ["Mining", "Construction"] },
  cement: { title: "CEMENT", desc: "Cement price trends affect construction costs. Explore related services and suppliers.", tags: ["Construction", "Property"] },
};

const BUSINESSES = [
  { id: 1, name: "TOYOTA ZAMBIA", category: "Automotive", tag: "Automotive" },
  { id: 2, name: "JET MOBILE ADS", category: "Digital Media", tag: "Logistics" },
  { id: 3, name: "PICK N PAY ZAMBIA", category: "Retail Store", tag: "Food" },
];

const SEED_PRODUCTS = [
  { id: "seed-1", name: "Smartphone", category: "Electronics", price: "2500" },
  { id: "seed-2", name: "Running Shoes", category: "Clothing & Fashion", price: "275" },
  { id: "seed-3", name: "Hand Bag", category: "Clothing & Fashion", price: "200" },
  { id: "seed-4", name: "Laptop", category: "Electronics", price: "7500" },
  { id: "seed-5", name: "Mountain Bicycle", category: "Sports", price: "1200" },
];

const SEED_SERVICES = [
  { id: "svc-1", name: "Wedding Photography", category: "Photography & Media", provider: "Chisenga Studios", rating: 4.8, price: "3500" },
  { id: "svc-2", name: "Web Development", category: "Technology", provider: "LusakaTech", rating: 4.7, price: "8000" },
  { id: "svc-3", name: "Event Catering", category: "Hospitality", provider: "Chef Masters ZM", rating: 4.6, price: "5000" },
  { id: "svc-4", name: "Business Consulting", category: "Consulting", provider: "Zenith Advisory", rating: 4.8, price: "12000" },
];

export function MarketIntelOpportunities() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const meta = COMMODITY_META[id ?? ""] ?? COMMODITY_META.maize;

  const [products, setProducts] = useState(SEED_PRODUCTS);
  const [services, setServices] = useState(SEED_SERVICES);

  useEffect(() => {
    try {
      const storedP = JSON.parse(localStorage.getItem("kleench_products") || "null");
      if (Array.isArray(storedP) && storedP.length > 0) setProducts(storedP.slice(0, 4));
    } catch {}
    try {
      const storedS = JSON.parse(localStorage.getItem("kleench_services") || "null");
      if (Array.isArray(storedS) && storedS.length > 0) setServices(storedS.slice(0, 3));
    } catch {}
  }, []);

  const relatedBusinesses = BUSINESSES.filter((b) => meta.tags.some((t) => b.tag === t || b.category.includes(t))).slice(0, 3);
  const displayBusinesses = relatedBusinesses.length > 0 ? relatedBusinesses : BUSINESSES.slice(0, 2);

  return (
    <div className="w-full max-w-md mx-auto bg-transparent font-sans pb-24">
      <PageHeader title="OPPORTUNITIES" showBack />

      <div className="px-5 pt-4 space-y-5">
        {/* Intro */}
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
          className="bg-[var(--app-bg)] rounded-2xl border border-[var(--border)] shadow-sm p-4">
          <p className="text-[9px] font-black uppercase tracking-[0.3em] text-[var(--color-primary)] mb-1">{meta.title} Market Insights</p>
          <p className="text-[11px] font-semibold text-[var(--app-text)]/60 leading-snug">{meta.desc}</p>
        </motion.div>

        {/* Related Products */}
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.08 }}>
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <ShoppingBag size={13} className="text-[var(--app-text)]/40" strokeWidth={2} />
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[var(--app-text)]/40">Related Products</p>
            </div>
            <button onClick={() => navigate("/marketplace/featured")} className="text-[9px] font-black text-[var(--color-primary)] uppercase tracking-widest flex items-center gap-0.5 active:opacity-70">
              See All <ChevronRight size={10} strokeWidth={2.5} />
            </button>
          </div>
          <div className="flex gap-3 overflow-x-auto scrollbar-hide no-scrollbar pb-1">
            {products.slice(0, 4).map((p) => (
              <button key={p.id}
                onClick={() => navigate("/marketplace/order/summary", { state: { product: { title: p.name, price: Number(p.price), image: null }, quantity: 1, availableDelivery: ["pickup", "courier"] } })}
                className="shrink-0 w-[120px] bg-[var(--app-bg)] rounded-xl border border-[var(--border)] shadow-sm overflow-hidden text-left active:scale-95 transition-all">
                <div className="aspect-square bg-[var(--muted)] flex items-center justify-center">
                  <ShoppingBag size={20} className="text-[var(--app-text)]/20" strokeWidth={1.5} />
                </div>
                <div className="p-2">
                  <p className="text-[9px] font-black uppercase tracking-tight text-[var(--app-text)] line-clamp-1">{p.name}</p>
                  <p className="text-[11px] font-black text-[var(--color-primary)] mt-0.5">K{Number(p.price).toLocaleString()}</p>
                </div>
              </button>
            ))}
          </div>
        </motion.div>

        {/* Related Services */}
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.14 }}>
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Briefcase size={13} className="text-[var(--app-text)]/40" strokeWidth={2} />
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[var(--app-text)]/40">Related Services</p>
            </div>
            <button onClick={() => navigate("/marketplace/services")} className="text-[9px] font-black text-[var(--color-primary)] uppercase tracking-widest flex items-center gap-0.5 active:opacity-70">
              See All <ChevronRight size={10} strokeWidth={2.5} />
            </button>
          </div>
          <div className="space-y-2">
            {services.slice(0, 3).map((s) => (
              <button key={s.id} onClick={() => navigate(`/marketplace/service/${s.id}`, { state: { service: s } })}
                className="w-full flex items-center gap-3 p-3 bg-[var(--app-bg)] rounded-xl border border-[var(--border)] shadow-sm text-left active:scale-95 transition-all">
                <div className="w-10 h-10 rounded-xl bg-[var(--color-primary)]/10 flex items-center justify-center shrink-0">
                  <Briefcase size={16} color="var(--color-primary)" strokeWidth={1.5} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[11px] font-black uppercase tracking-tight text-[var(--app-text)] line-clamp-1">{s.name}</p>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <Star size={9} fill="#F59E0B" color="#F59E0B" />
                    <span className="text-[9px] font-black text-[var(--app-text)]">{s.rating}</span>
                    <span className="text-[9px] font-semibold text-[var(--app-text)]/40">· {s.provider}</span>
                  </div>
                </div>
                <p className="text-[11px] font-black text-[var(--color-primary)] shrink-0">K{Number(s.price).toLocaleString()}</p>
              </button>
            ))}
          </div>
        </motion.div>

        {/* Related Businesses */}
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <div className="flex items-center gap-2 mb-3">
            <Building2 size={13} className="text-[var(--app-text)]/40" strokeWidth={2} />
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[var(--app-text)]/40">Related Businesses</p>
          </div>
          <div className="space-y-2">
            {displayBusinesses.map((b) => (
              <button key={b.id} onClick={() => navigate(`/marketplace/asset/${b.id}`)}
                className="w-full flex items-center gap-3 p-3 bg-[var(--app-bg)] rounded-xl border border-[var(--border)] shadow-sm text-left active:scale-95 transition-all">
                <div className="w-10 h-10 rounded-xl bg-[var(--color-secondary)]/8 flex items-center justify-center shrink-0">
                  <Building2 size={16} color="var(--color-secondary)" strokeWidth={1.5} />
                </div>
                <div className="flex-1">
                  <p className="text-[11px] font-black uppercase tracking-tight text-[var(--app-text)]">{b.name}</p>
                  <p className="text-[9px] font-semibold text-[var(--app-text)]/50 mt-0.5">{b.category}</p>
                </div>
                <ChevronRight size={13} className="text-[var(--app-text)]/30 shrink-0" strokeWidth={2} />
              </button>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
