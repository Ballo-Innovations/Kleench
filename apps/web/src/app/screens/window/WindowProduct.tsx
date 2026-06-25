import { useState } from "react";
import { useNavigate, useParams, Navigate } from "react-router";
import { motion } from "motion/react";
import { Star, Heart, CheckCircle, ShoppingBasket, ShieldCheck } from "lucide-react";
import { PageHeader } from "../../components/PageHeader";
import { ImageWithFallback } from "../../components/figma/ImageWithFallback";
import { CtaButton } from "../../components/CtaButton";
import { toast } from "sonner";
import { getProduct, getStore, addToCart } from "../../data/windowShop";

export function WindowProduct() {
  const navigate = useNavigate();
  const { id } = useParams();
  const product = getProduct(id);
  const [saved, setSaved] = useState(false);

  if (!product) return <Navigate to="/marketplace/window" replace />;
  const store = getStore(product.storeId);

  const buyNow = () => { addToCart(product.id); navigate("/marketplace/window/cart"); };
  const addBasket = () => { addToCart(product.id); toast.success("Added to cart"); };

  return (
    <div className="w-full max-w-md mx-auto bg-transparent font-sans pb-24">
      <PageHeader title="PRODUCT DETAIL" subtitle="Window Shopping" showBack />

      {/* Hero image */}
      <div className="relative w-full h-[280px] bg-[var(--muted)] overflow-hidden">
        <ImageWithFallback src={product.image} alt={product.name} className="w-full h-full object-cover" />
        {product.oldPrice && (
          <span className="absolute top-3 left-3 bg-[var(--color-primary)] text-white text-[8px] font-black px-2.5 py-1 rounded-full uppercase tracking-widest shadow-sm">Deal</span>
        )}
        <button onClick={() => setSaved(!saved)}
          className={`absolute top-3 right-3 w-10 h-10 rounded-full flex items-center justify-center shadow-md backdrop-blur-md transition-all active:scale-90 ${saved ? "bg-[var(--color-primary)]" : "bg-white/80"}`}>
          <Heart size={18} fill={saved ? "white" : "none"} color={saved ? "white" : "var(--color-secondary)"} strokeWidth={2} />
        </button>
      </div>

      {/* Thumbnail strip (single image repeated for visual parity) */}
      <div className="flex gap-2 px-5 pt-3 overflow-x-auto no-scrollbar">
        {[0, 1, 2, 3].map((i) => (
          <div key={i} className={`shrink-0 w-14 h-14 rounded-xl overflow-hidden border ${i === 0 ? "border-[var(--color-primary)]" : "border-[var(--border)]"}`}>
            <ImageWithFallback src={product.image} alt="" className="w-full h-full object-cover" />
          </div>
        ))}
      </div>

      <div className="px-5 pt-4 space-y-4">
        {/* Title + price */}
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="flex items-start justify-between gap-3">
          <div className="flex-1">
            <h1 className="text-[16px] font-black text-[var(--app-text)] uppercase tracking-tight leading-tight">{product.name}</h1>
            <div className="flex items-center gap-1 mt-1">
              <Star size={11} fill="#F59E0B" color="#F59E0B" />
              <span className="text-[11px] font-black text-[var(--app-text)]">{product.rating}</span>
              <span className="text-[10px] font-semibold text-[var(--color-secondary)]/50">({product.reviews})</span>
            </div>
          </div>
          <div className="text-right shrink-0">
            <p className="text-[22px] font-black text-[var(--color-primary)] leading-none">K{product.price.toLocaleString()}</p>
            {product.oldPrice && <p className="text-[10px] font-semibold text-[var(--color-secondary)]/50 line-through mt-0.5">K{product.oldPrice.toLocaleString()}</p>}
          </div>
        </motion.div>

        {/* Seller chip */}
        {store && (
          <motion.button initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.06 }}
            onClick={() => navigate(`/marketplace/window/store/${store.id}`)}
            className="w-full flex items-center gap-3 bg-[var(--app-bg)] border border-[var(--border)] rounded-2xl shadow-sm p-3 active:scale-[0.98] transition-all text-left">
            <div className="w-10 h-10 rounded-full overflow-hidden border border-[var(--border)] bg-[var(--muted)] shrink-0">
              <ImageWithFallback src={store.image} alt={store.name} className="w-full h-full object-cover" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[12px] font-black text-[var(--app-text)] uppercase tracking-wide truncate">{store.name}</p>
              <p className="text-[9px] font-black text-[var(--color-secondary)]/50 uppercase tracking-widest">{store.category}</p>
            </div>
            <span className="text-[8px] font-black uppercase tracking-widest text-[var(--color-primary)] bg-[var(--color-primary)]/10 px-2 py-1 rounded-full shrink-0">Visit Store</span>
          </motion.button>
        )}

        {/* Description */}
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
          className="bg-[var(--app-bg)] border border-[var(--border)] rounded-2xl shadow-sm p-4 space-y-2">
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[var(--color-secondary)]/50">About this product</p>
          <p className="text-[12px] font-semibold text-[var(--color-secondary)]/70 leading-relaxed">{product.description}</p>
        </motion.div>

        {/* Key features */}
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.14 }}
          className="bg-[var(--app-bg)] border border-[var(--border)] rounded-2xl shadow-sm p-4 space-y-3">
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[var(--color-secondary)]/50">Key Features</p>
          {product.features.map((f, i) => (
            <div key={i} className="flex items-center gap-2.5">
              <CheckCircle size={13} color="var(--color-primary)" strokeWidth={2.5} className="shrink-0" />
              <span className="text-[12px] font-semibold text-[var(--app-text)]">{f}</span>
            </div>
          ))}
        </motion.div>

        {/* Trust */}
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.18 }}
          className="flex items-center gap-3 bg-[#059669]/6 border border-[#059669]/15 rounded-2xl p-3">
          <ShieldCheck size={16} color="#059669" strokeWidth={2} className="shrink-0" />
          <p className="text-[10px] font-semibold text-[var(--color-secondary)]/60 leading-snug">
            Protected by <span className="font-black text-[var(--app-text)]">KLeench Escrow</span> — funds held until delivery is confirmed.
          </p>
        </motion.div>
      </div>

      {/* CTAs */}
      <div className="px-5 pt-4 pb-8 space-y-3">
        <CtaButton onClick={buyNow}>Buy Now — K{product.price.toLocaleString()}</CtaButton>
        <button onClick={addBasket}
          className="w-full py-3.5 rounded-full border border-[var(--border)] bg-[var(--app-bg)] text-[var(--color-secondary)] font-black uppercase tracking-widest text-[11px] flex items-center justify-center gap-2 active:scale-95 transition-all">
          <ShoppingBasket size={16} strokeWidth={2} /> Add to Cart
        </button>
      </div>
    </div>
  );
}
