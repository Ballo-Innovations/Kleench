import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { motion } from "motion/react";
import { Search, SlidersHorizontal, X, ShoppingBag } from "lucide-react";
import { PageHeader } from "../components/PageHeader";
import smartphoneImg from "@/assets/products/smartphone.png";
import shoesImg from "@/assets/products/shoes.png";
import handbagImg from "@/assets/products/hand_bag.png";
import laptopImg from "@/assets/products/laptop.png";

const SEED_PRODUCTS = [
  { id: "seed-1", name: "Smartphone", category: "Electronics", condition: "Brand New", price: "2500", images: [smartphoneImg], sellerName: "KLeench Store" },
  { id: "seed-2", name: "Running Shoes", category: "Clothing & Fashion", condition: "Brand New", price: "275", images: [shoesImg], sellerName: "Style Hub ZM" },
  { id: "seed-3", name: "Hand Bag", category: "Clothing & Fashion", condition: "Like New", price: "200", images: [handbagImg], sellerName: "Fashion Forward" },
  { id: "seed-4", name: "Laptop", category: "Electronics", condition: "Good", price: "7500", images: [laptopImg], sellerName: "TechWorld ZM" },
  { id: "seed-5", name: "Mountain Bicycle", category: "Sports", condition: "Good", price: "1200", images: [], sellerName: "Sports Direct ZM" },
];

const CONDITION_COLORS: Record<string, string> = {
  "Brand New": "#059669",
  "Like New": "var(--color-primary)",
  "Good": "#0077B6",
  "Fair": "#D97706",
  "For Parts": "#DC2626",
};

export function FeaturedProducts() {
  const navigate = useNavigate();
  const [products, setProducts] = useState(SEED_PRODUCTS);
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  useEffect(() => {
    try {
      const stored = JSON.parse(localStorage.getItem("kleench_products") || "null");
      if (Array.isArray(stored) && stored.length > 0) setProducts(stored);
    } catch {}
  }, []);

  const categories = ["All", ...Array.from(new Set(products.map((p) => p.category)))];

  const filtered = products.filter((p) => {
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase()) || p.category.toLowerCase().includes(search.toLowerCase());
    const matchCat = activeCategory === "All" || p.category === activeCategory;
    return matchSearch && matchCat;
  });

  return (
    <div className="w-full max-w-md mx-auto bg-transparent font-sans pb-24">
      <PageHeader title="FEATURED PRODUCTS" showBack />

      <div className="px-5 pt-4 space-y-4">
        {/* Search */}
        <div className="relative">
          <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--app-text)]/40" strokeWidth={2} />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search products..."
            className="w-full bg-[var(--app-bg)] border border-[var(--border)] rounded-2xl pl-10 pr-10 py-3 text-[13px] font-semibold text-[var(--app-text)] outline-none focus:border-[var(--app-text)]/40 shadow-sm transition-all placeholder:text-[var(--app-text)]/40"
          />
          {search && (
            <button onClick={() => setSearch("")} className="absolute right-3.5 top-1/2 -translate-y-1/2">
              <X size={13} className="text-[var(--app-text)]/40" />
            </button>
          )}
        </div>

        {/* Category chips */}
        <div className="flex gap-2 overflow-x-auto scrollbar-hide no-scrollbar pb-1">
          {categories.map((cat) => (
            <button key={cat} onClick={() => setActiveCategory(cat)}
              className={`shrink-0 px-3 py-1.5 rounded-full border text-[10px] font-black uppercase tracking-wide transition-all ${activeCategory === cat ? "bg-[var(--app-shape-accent)] text-white border-[var(--app-shape-accent)]" : "border-[var(--border)] text-[var(--app-text)]/60 bg-[var(--app-bg)]"}`}>
              {cat}
            </button>
          ))}
        </div>

        {/* Results count */}
        <div className="flex items-center justify-between">
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[var(--app-text)]/40">{filtered.length} listing{filtered.length !== 1 ? "s" : ""}</p>
          <button className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-wide text-[var(--color-primary)] active:opacity-70">
            <SlidersHorizontal size={11} strokeWidth={2.5} /> Filter
          </button>
        </div>

        {/* Product grid */}
        {filtered.length > 0 ? (
          <div className="grid grid-cols-2 gap-3">
            {filtered.map((product, i) => (
              <motion.button
                key={product.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.04 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => navigate("/marketplace/order/summary", {
                  state: { product: { title: product.name, price: Number(product.price), image: product.images?.[0] || null }, quantity: 1, availableDelivery: ["pickup", "courier", "kleench"] }
                })}
                className="flex flex-col bg-[var(--app-bg)] rounded-2xl border border-[var(--border)] shadow-sm overflow-hidden text-left active:scale-95 transition-all"
              >
                <div className="aspect-square bg-[var(--muted)] relative overflow-hidden">
                  {product.images?.[0] ? (
                    <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <ShoppingBag size={32} className="text-[var(--app-text)]/20" strokeWidth={1.5} />
                    </div>
                  )}
                  <span className="absolute top-2 left-2 text-[8px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full text-white"
                    style={{ backgroundColor: (CONDITION_COLORS[product.condition] || "#059669") }}>
                    {product.condition}
                  </span>
                </div>
                <div className="p-3 space-y-1">
                  <p className="text-[11px] font-black uppercase tracking-tight text-[var(--app-text)] leading-tight line-clamp-1">{product.name}</p>
                  <p className="text-[9px] font-semibold text-[var(--app-text)]/50 uppercase tracking-widest line-clamp-1">{product.sellerName}</p>
                  <div className="flex items-center justify-between pt-1">
                    <p className="text-[14px] font-black text-[var(--color-primary)]">K{Number(product.price).toLocaleString()}</p>
                    <span className="text-[8px] font-black uppercase tracking-widest text-[var(--color-primary)] bg-[var(--color-primary)]/8 px-2 py-0.5 rounded-full">BUY</span>
                  </div>
                </div>
              </motion.button>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center gap-3 py-12 text-center">
            <div className="w-14 h-14 rounded-full bg-[var(--border)]/30 flex items-center justify-center">
              <ShoppingBag size={24} className="text-[var(--app-text)]/30" strokeWidth={1.5} />
            </div>
            <p className="text-[12px] font-black uppercase tracking-widest text-[var(--app-text)]/40">No products found</p>
            <p className="text-[11px] font-semibold text-[var(--app-text)]/30">Try adjusting your search or filters</p>
          </div>
        )}
      </div>
    </div>
  );
}
