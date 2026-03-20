import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { Search, Plus, Star, ShieldCheck, TrendingUp, Sparkles, Grid3x3 } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { ShareReferralModal } from "../components/ShareReferralModal";
import adBanner from "@/assets/ads/Your MarketPlace Anytime.png";

/* ─── Categories ─── */
const CATEGORIES = [
  { id: "all", label: "All", icon: Grid3x3 },
  { id: "electronics", label: "Electronics", icon: Sparkles },
  { id: "fashion", label: "Fashion", icon: TrendingUp },
  { id: "courses", label: "Courses", icon: null },
  { id: "services", label: "Services", icon: null },
  { id: "digital", label: "Digital", icon: null },
];

/* ─── Mock Products ─── */
const PRODUCTS = [
  {
    id: 1,
    title: "Pro Noise-Cancelling Headphones",
    seller: "AudioTech Store",
    sellerVerified: true,
    price: 89.99,
    originalPrice: 129.99,
    rating: 4.8,
    reviews: 124,
    image: "https://images.unsplash.com/photo-1612858249937-1cc0852093dd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3aXJlbGVzcyUyMGhlYWRwaG9uZXMlMjBwcm9kdWN0JTIwd2hpdGUlMjBiYWNrZ3JvdW5kfGVufDF8fHx8MTc3Mzg1NzU0NHww&ixlib=rb-4.1.0&q=80&w=400",
    badge: "Hot",
    category: "electronics",
    escrowProtected: true,
  },
  {
    id: 2,
    title: "Premium Leather Sneakers",
    seller: "Street Kicks Co.",
    sellerVerified: true,
    price: 119.0,
    originalPrice: null,
    rating: 4.6,
    reviews: 87,
    image: "https://images.unsplash.com/photo-1771726588700-e3baad15ae16?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsZWF0aGVyJTIwc25lYWtlcnMlMjBzaG9lcyUyMHByb2R1Y3R8ZW58MXx8fHwxNzczOTA5NTI0fDA&ixlib=rb-4.1.0&q=80&w=400",
    badge: null,
    category: "fashion",
    escrowProtected: true,
  },
  {
    id: 3,
    title: "Minimalist Wrist Watch",
    seller: "TimePiece Lab",
    sellerVerified: true,
    price: 74.99,
    originalPrice: 99.0,
    rating: 4.9,
    reviews: 203,
    image: "https://images.unsplash.com/photo-1758887952896-8491d393afe2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtaW5pbWFsJTIwd2F0Y2glMjB3cmlzdCUyMHByb2R1Y3R8ZW58MXx8fHwxNzczOTA5NTI1fDA&ixlib=rb-4.1.0&q=80&w=400",
    badge: "Sale",
    category: "fashion",
    escrowProtected: true,
  },
  {
    id: 4,
    title: "Glow Skincare Set",
    seller: "Pure Botanics",
    sellerVerified: false,
    price: 44.5,
    originalPrice: null,
    rating: 4.7,
    reviews: 56,
    image: "https://images.unsplash.com/photo-1656103743126-656ce0ed6291?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxza2luY2FyZSUyMGJlYXV0eSUyMHByb2R1Y3QlMjBmbGF0bGF5fGVufDF8fHx8MTc3MzgwMzQyM3ww&ixlib=rb-4.1.0&q=80&w=400",
    badge: "New",
    category: "fashion",
    escrowProtected: true,
  },
  {
    id: 5,
    title: "Urban Laptop Backpack",
    seller: "CarryOn Goods",
    sellerVerified: true,
    price: 59.0,
    originalPrice: 79.0,
    rating: 4.5,
    reviews: 142,
    image: "https://images.unsplash.com/photo-1585501954260-372cec60d355?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsYXB0b3AlMjBiYWclMjBiYWNrcGFjayUyMHByb2R1Y3R8ZW58MXx8fHwxNzczOTA5NTI2fDA&ixlib=rb-4.1.0&q=80&w=400",
    badge: "Sale",
    category: "electronics",
    escrowProtected: true,
  },
  {
    id: 6,
    title: "Retro UV Sunglasses",
    seller: "LensWorld",
    sellerVerified: false,
    price: 32.0,
    originalPrice: null,
    rating: 4.4,
    reviews: 91,
    image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdW5nbGFzc2VzJTIwcHJvZHVjdCUyMHJldHJvfGVufDF8fHx8MTc3NDA1NTExMHww&ixlib=rb-4.1.0&q=80&w=400",
    badge: null,
    category: "fashion",
    escrowProtected: true,
  },
  {
    id: 101,
    title: "Complete React Masterclass",
    seller: "Sarah Martinez",
    sellerVerified: true,
    price: 149.0,
    originalPrice: null,
    rating: 5.0,
    reviews: 342,
    image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZWFjdCUyMGNvZGluZyUyMGRldmVsb3BtZW50JTIwY291cnNlfGVufDF8fHx8MTc3NDA1NTExMHww&ixlib=rb-4.1.0&q=80&w=400",
    badge: "Bestseller",
    category: "courses",
    escrowProtected: true,
  },
  {
    id: 102,
    title: "UI Design System Templates",
    seller: "Sarah Martinez",
    sellerVerified: true,
    price: 79.0,
    originalPrice: 120.0,
    rating: 4.8,
    reviews: 156,
    image: "https://images.unsplash.com/photo-1748801583967-3038967d7279?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2JpbGUlMjBVSSUyMGRlc2lnbiUyMHNjcmVlbiUyMHByb3RvdHlwZXxlbnwxfHx8fDE3NzM5MDY2Nzh8MA&ixlib=rb-4.1.0&q=80&w=400",
    badge: null,
    category: "digital",
    escrowProtected: true,
  },
];

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  animate: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, delay: i * 0.05, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
  }),
};

export function Marketplace() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [shareModalOpen, setShareModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<{ title: string; price: number; id: number } | null>(null);
  const navigate = useNavigate();
  const viewMode = "grid"; // Forced to grid in new design

  const filteredProducts = PRODUCTS.filter((product) => {
    const matchesCategory = activeCategory === "all" || product.category === activeCategory;
    const matchesSearch = product.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         product.seller.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  function _handleShareProduct(e: React.MouseEvent, product: typeof PRODUCTS[0]) {
    e.preventDefault();
    e.stopPropagation();
    setSelectedProduct({ title: product.title, price: product.price, id: product.id });
    setShareModalOpen(true);
  }
  // Suppress unused warning — share feature is wired but not yet connected to a UI button
  void _handleShareProduct;

  return (
    <div className="w-full max-w-md mx-auto pb-32 relative min-h-screen">
      
      {/* ── Unified cross-hatch bg ── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 0 }}>
        <svg width="100%" height="100%" style={{ position: "absolute", inset: 0 }}>
          <defs>
            <pattern id="xhatch-market" x="0" y="0" width="24" height="24" patternUnits="userSpaceOnUse">
              <line x1="0" y1="0" x2="24" y2="24" stroke="#FF8C00" strokeWidth="0.5" strokeOpacity="0.07"/>
              <line x1="24" y1="0" x2="0" y2="24" stroke="#FF8C00" strokeWidth="0.5" strokeOpacity="0.07"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#xhatch-market)"/>
        </svg>
      </div>

      {/* ── Orange hero header ── */}
      <div className="relative pt-8 pb-20 px-6 overflow-hidden rounded-b-[40px]"
        style={{ background: "linear-gradient(135deg, #FF8C00, #e06900)", boxShadow: "0 12px 40px rgba(255,140,0,0.15)" }}>
        
        {/* subtle grid on top of orange */}
        <div className="absolute inset-0 opacity-[0.1]">
          <svg width="100%" height="100%">
            <defs>
              <pattern id="market-grid" width="20" height="20" patternUnits="userSpaceOnUse">
                <path d="M 20 0 L 0 0 0 20" fill="none" stroke="white" strokeWidth="0.5"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#market-grid)"/>
          </svg>
        </div>

        <div className="relative z-10 space-y-6">
          <div className="flex items-center justify-between">
            <h1 className="text-white text-3xl font-black" style={{ fontFamily: "Agrandir, sans-serif" }}>Marketplace</h1>
            <motion.button 
              whileTap={{ scale: 0.94 }}
              onClick={() => navigate("/sell")}
              className="bg-white/20 backdrop-blur-md text-white font-bold py-2.5 px-5 rounded-xl border border-white/30 text-[13px] flex items-center gap-2">
              <Plus size={16} /> Sell Item
            </motion.button>
          </div>
          
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/50" size={18} />
            <input 
              type="text" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="What are you looking for?" 
              className="w-full pl-12 pr-4 py-4 rounded-2xl bg-white/12 backdrop-blur-md border border-white/20 text-white placeholder:text-white/50 outline-none"
            />
          </div>
        </div>
      </div>

      <div className="px-5 -mt-8 relative z-10 space-y-10">
        
        {/* Banner Ad */}
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="rounded-[32px] overflow-hidden shadow-2xl border border-white/20">
          <img src={adBanner} alt="Marketplace Anytime" className="w-full h-auto object-cover" />
        </motion.div>

        {/* Categories Scroller */}
        <div className="flex gap-2 overflow-x-auto pb-1" style={{ scrollbarWidth: "none" }}>
          {CATEGORIES.map((cat) => (
            <motion.button
              key={cat.id}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveCategory(cat.id)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-full font-bold whitespace-nowrap border transition-all ${
                activeCategory === cat.id
                  ? "bg-[#0D1B3E] text-white border-[#0D1B3E] shadow-lg shadow-[#0D1B3E]/20"
                  : "bg-white text-[#0D1B3E] border-[#0D1B3E]/10"
              }`}
              style={{ fontSize: "12.5px" }}>
              {cat.label}
            </motion.button>
          ))}
        </div>

      {/* Results Count */}
      <motion.div
        custom={2}
        variants={fadeUp}
        initial="initial"
        animate="animate"
        className="mb-3"
      >
        <p className="text-[10px] font-[var(--font-body)] text-[var(--ink-muted)]">
          {filteredProducts.length} {filteredProducts.length === 1 ? "product" : "products"} found
        </p>
      </motion.div>

      {/* Product Grid */}
      <motion.div
        custom={3}
        variants={fadeUp}
        initial="initial"
        animate="animate"
      >
        <AnimatePresence mode="wait">
          {viewMode === "grid" ? (
            <motion.div
              key="grid"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid grid-cols-2 gap-2.5"
            >
              {filteredProducts.map((product, i) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.04 }}
                >
                  <Link to={`/product/${product.id}`} className="block">
                    <div className="bg-white rounded-xl overflow-hidden shadow-sm border border-black/[0.04] hover:shadow-md transition-shadow">
                      {/* Image */}
                      <div className="relative aspect-square bg-[var(--surface-raised)]">
                        <ImageWithFallback
                          src={product.image}
                          alt={product.title}
                          className="w-full h-full object-cover"
                        />
                        {product.badge && (
                          <div
                            className={`absolute top-1.5 left-1.5 px-1.5 py-0.5 rounded-md text-white font-[var(--font-body)] uppercase tracking-wider shadow-sm ${
                              product.badge === "Hot"
                                ? "bg-[var(--live-red)]"
                                : product.badge === "Sale"
                                ? "bg-[var(--action-gold)]"
                                : product.badge === "New"
                                ? "bg-[var(--trust-blue)]"
                                : "bg-emerald-600"
                            }`}
                            style={{ fontSize: "8px", fontWeight: 700 }}
                          >
                            {product.badge}
                          </div>
                        )}
                      </div>

                      {/* Content */}
                      <div className="p-2.5">
                        <h3
                          className="font-[var(--font-body)] font-bold text-[var(--ink-primary)] line-clamp-2 mb-1 leading-snug"
                          style={{ fontSize: "11px" }}
                        >
                          {product.title}
                        </h3>

                        {/* Seller */}
                        <div className="flex items-center gap-1 mb-1.5">
                          <p className="text-[9px] font-[var(--font-body)] text-[var(--ink-muted)] truncate">
                            {product.seller}
                          </p>
                          {product.sellerVerified && (
                            <ShieldCheck size={9} className="text-[var(--trust-blue)] flex-shrink-0" />
                          )}
                        </div>

                        {/* Rating */}
                        <div className="flex items-center gap-1 mb-1.5">
                          <Star size={9} fill="var(--action-gold)" className="text-[var(--action-gold)]" strokeWidth={0} />
                          <span className="text-[10px] font-[var(--font-body)] font-bold text-[var(--ink-primary)]">
                            {product.rating}
                          </span>
                          <span className="text-[9px] font-[var(--font-body)] text-[var(--ink-muted)]">
                            ({product.reviews})
                          </span>
                        </div>

                        {/* Price */}
                        <div className="flex items-baseline gap-1 mb-1.5">
                          <span className="font-[var(--font-header)] font-bold text-[var(--ink-primary)]" style={{ fontSize: "14px" }}>
                            ${product.price.toFixed(2)}
                          </span>
                          {product.originalPrice && (
                            <span className="text-[9px] font-[var(--font-body)] text-[var(--ink-muted)] line-through">
                              ${product.originalPrice.toFixed(2)}
                            </span>
                          )}
                        </div>

                        {/* Escrow Badge */}
                        {product.escrowProtected && (
                          <div className="flex items-center gap-1 px-1.5 py-0.5 rounded-md bg-[var(--trust-blue)]/5 border border-[var(--trust-blue)]/10">
                            <ShieldCheck size={8} className="text-[var(--trust-blue)]" strokeWidth={2.5} />
                            <span className="text-[8px] font-[var(--font-body)] font-semibold text-[var(--trust-blue)] uppercase tracking-wider">
                              Escrow
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div
              key="list"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-2.5"
            >
              {filteredProducts.map((product, i) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.04 }}
                >
                  <Link to={`/product/${product.id}`} className="block">
                    <div className="bg-white rounded-xl overflow-hidden shadow-sm border border-black/[0.04] hover:shadow-md transition-shadow flex">
                      {/* Image */}
                      <div className="relative w-24 flex-shrink-0 bg-[var(--surface-raised)]">
                        <ImageWithFallback
                          src={product.image}
                          alt={product.title}
                          className="w-full h-full object-cover"
                        />
                        {product.badge && (
                          <div
                            className={`absolute top-1.5 left-1.5 px-1.5 py-0.5 rounded-md text-white font-[var(--font-body)] uppercase tracking-wider shadow-sm ${
                              product.badge === "Hot"
                                ? "bg-[var(--live-red)]"
                                : product.badge === "Sale"
                                ? "bg-[var(--action-gold)]"
                                : product.badge === "New"
                                ? "bg-[var(--trust-blue)]"
                                : "bg-emerald-600"
                            }`}
                            style={{ fontSize: "8px", fontWeight: 700 }}
                          >
                            {product.badge}
                          </div>
                        )}
                      </div>

                      {/* Content */}
                      <div className="p-2.5 flex-1 flex flex-col">
                        <h3
                          className="font-[var(--font-body)] font-bold text-[var(--ink-primary)] line-clamp-2 mb-1 leading-snug"
                          style={{ fontSize: "12px" }}
                        >
                          {product.title}
                        </h3>

                        {/* Seller */}
                        <div className="flex items-center gap-1 mb-1.5">
                          <p className="text-[9px] font-[var(--font-body)] text-[var(--ink-muted)] truncate">
                            {product.seller}
                          </p>
                          {product.sellerVerified && (
                            <ShieldCheck size={9} className="text-[var(--trust-blue)] flex-shrink-0" />
                          )}
                        </div>

                        {/* Rating */}
                        <div className="flex items-center gap-1 mb-auto">
                          <Star size={10} fill="var(--action-gold)" className="text-[var(--action-gold)]" strokeWidth={0} />
                          <span className="text-[10px] font-[var(--font-body)] font-bold text-[var(--ink-primary)]">
                            {product.rating}
                          </span>
                          <span className="text-[9px] font-[var(--font-body)] text-[var(--ink-muted)]">
                            ({product.reviews})
                          </span>
                        </div>

                        {/* Bottom row: Price + Escrow */}
                        <div className="flex items-center justify-between mt-1.5 pt-1.5 border-t border-black/[0.04]">
                          <div className="flex items-baseline gap-1">
                            <span className="font-[var(--font-header)] font-bold text-[var(--ink-primary)]" style={{ fontSize: "14px" }}>
                              ${product.price.toFixed(2)}
                            </span>
                            {product.originalPrice && (
                              <span className="text-[9px] font-[var(--font-body)] text-[var(--ink-muted)] line-through">
                                ${product.originalPrice.toFixed(2)}
                              </span>
                            )}
                          </div>
                          {product.escrowProtected && (
                            <div className="flex items-center gap-1">
                              <ShieldCheck size={9} className="text-[var(--trust-blue)]" strokeWidth={2.5} />
                              <span className="text-[8px] font-[var(--font-body)] font-semibold text-[var(--trust-blue)] uppercase tracking-wider">
                                Escrow
                              </span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
      </div>

      {/* Floating Action Button - List Product */}
      <div className="fixed bottom-28 right-5 z-40 max-w-md mx-auto left-0 right-0 flex justify-end pointer-events-none">
        <div className="px-5 pointer-events-auto">
          <motion.button
            whileTap={{ scale: 0.92 }}
            onClick={() => navigate("/wallet")}
            className="w-12 h-12 bg-[var(--action-gold)] text-[var(--ink-primary)] rounded-full flex items-center justify-center shadow-xl border-2 border-[var(--action-gold-dark)]/20"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5 }}
          >
            <Plus size={20} strokeWidth={3} />
            <motion.div
              className="absolute inset-0 rounded-full bg-[var(--action-gold)]"
              animate={{ opacity: [0.4, 0, 0.4] }}
              transition={{ duration: 2.5, repeat: Infinity }}
              style={{ filter: "blur(10px)" }}
            />
          </motion.button>
        </div>
      </div>

      {/* Share Referral Modal */}
      {shareModalOpen && selectedProduct && (
        <ShareReferralModal
          isOpen={shareModalOpen}
          onClose={() => setShareModalOpen(false)}
          productTitle={selectedProduct.title}
          productPrice={selectedProduct.price}
          productId={selectedProduct.id}
        />
      )}
    </div>
  );
}