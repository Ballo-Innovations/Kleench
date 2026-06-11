import { useState } from "react";
import { useParams, Navigate, useNavigate } from "react-router";
import { motion } from "motion/react";
import { Star, ShieldCheck, CheckCircle, Share2, ShoppingCart } from "lucide-react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { ShareReferralModal } from "../components/ShareReferralModal";
import { PageHeader } from "../components/PageHeader";
import { PRODUCTS } from "../data/products";
import { usePageLoading } from "../components/PageSkeletons";
import { Skeleton } from "boneyard-js/react";

export function ProductDetail() {
  const loading = usePageLoading(800);
  const { id } = useParams();
  const navigate = useNavigate();
  const [currentImage, setCurrentImage] = useState(0);
  const [showShareModal, setShowShareModal] = useState(false);

  const productData = PRODUCTS.find((p) => p.id === Number(id));
  if (!productData) return <Navigate to="/" replace />;

  const product = {
    ...productData,
    category: productData.category || "General",
    currency: productData.currency || "USD",
    description: productData.description || "Quality product available on KLeench Marketplace.",
    features: productData.features || [],
    images: productData.images?.length ? productData.images : [productData.image],
    sellerRating: productData.sellerRating || productData.rating,
    sellerVerified: productData.sellerVerified ?? true,
    commission: productData.commission || 5,
  };

  return (
    <Skeleton loading={loading} name="productdetail">
      <div className="w-full max-w-md mx-auto bg-transparent font-sans pb-24">

        <PageHeader title={product.category.toUpperCase()} showBack />

        {/* Hero Image */}
        <div className="relative w-full h-[260px] overflow-hidden bg-[var(--muted)]">
          <ImageWithFallback
            src={product.images[currentImage]}
            alt={product.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
          {product.badge && (
            <span className="absolute top-3 left-3 bg-[var(--color-primary)] text-white text-[8px] font-black px-2.5 py-1 rounded-full uppercase tracking-widest shadow-sm">
              {product.badge}
            </span>
          )}
          {product.images.length > 1 && (
            <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-1.5">
              {product.images.map((_, i) => (
                <button key={i} onClick={() => setCurrentImage(i)}
                  className={`h-1.5 rounded-full transition-all ${i === currentImage ? "w-5 bg-white" : "w-1.5 bg-white/50"}`} />
              ))}
            </div>
          )}
        </div>

        {/* Thumbnail strip */}
        {product.images.length > 1 && (
          <div className="flex gap-2 px-5 pt-3 pb-1 overflow-x-auto scrollbar-hide no-scrollbar">
            {product.images.map((img, i) => (
              <button key={i} onClick={() => setCurrentImage(i)}
                className={`shrink-0 w-14 h-14 rounded-xl overflow-hidden border transition-all ${i === currentImage ? "border-[var(--color-primary)]" : "border-[var(--border)]"}`}>
                <ImageWithFallback src={img} alt="" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        )}

        <div className="px-5 pt-4 space-y-4">

          {/* Product title + price */}
          <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
            <div className="flex items-start justify-between gap-3">
              <h1 className="text-[16px] font-black text-[var(--app-text)] uppercase tracking-tight leading-tight flex-1">{product.name}</h1>
              <div className="text-right shrink-0">
                <p className="text-[22px] font-black text-[var(--color-primary)] leading-none">{product.currency} {product.price.toLocaleString()}</p>
                {product.originalPrice && (
                  <p className="text-[10px] font-semibold text-[var(--color-secondary)]/50 line-through mt-0.5">{product.currency} {product.originalPrice.toLocaleString()}</p>
                )}
              </div>
            </div>
          </motion.div>

          {/* Seller info */}
          <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.06 }}
            className="flex items-center gap-3 bg-[var(--app-bg)] border border-[var(--border)] rounded-2xl shadow-sm p-3">
            <div className="w-10 h-10 rounded-full bg-[var(--muted)] border border-[var(--border)] flex items-center justify-center overflow-hidden shrink-0">
              {productData.sellerAvatar ? (
                <ImageWithFallback src={productData.sellerAvatar} alt={product.seller} className="w-full h-full object-cover" />
              ) : (
                <span className="text-[13px] font-black text-[var(--color-secondary)]">{product.seller[0]}</span>
              )}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1.5">
                <p className="text-[12px] font-black text-[var(--app-text)] uppercase tracking-wide truncate">{product.seller}</p>
                {product.sellerVerified && (
                  <ShieldCheck size={12} color="var(--color-secondary)" strokeWidth={2.5} className="shrink-0" />
                )}
              </div>
              <div className="flex items-center gap-1 mt-0.5">
                <Star size={10} fill="#F59E0B" color="#F59E0B" />
                <span className="text-[10px] font-black text-[var(--app-text)]">{product.sellerRating}</span>
                <span className="text-[10px] font-semibold text-[var(--color-secondary)]/50">· {product.reviews.toLocaleString()} reviews</span>
              </div>
            </div>
            {product.inStock !== false && (
              <span className="text-[8px] font-black uppercase tracking-widest text-[#059669] bg-[#059669]/10 border border-[#059669]/20 px-2 py-1 rounded-full shrink-0">In Stock</span>
            )}
          </motion.div>

          {/* Description */}
          <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            className="bg-[var(--app-bg)] border border-[var(--border)] rounded-2xl shadow-sm p-4 space-y-2">
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[var(--color-secondary)]/50">About this product</p>
            <p className="text-[12px] font-semibold text-[var(--color-secondary)]/70 leading-relaxed">{product.description}</p>
            {productData.descriptionExtended && (
              <p className="text-[11px] font-semibold text-[var(--color-secondary)]/50 leading-relaxed">{productData.descriptionExtended}</p>
            )}
          </motion.div>

          {/* Features */}
          {product.features.length > 0 && (
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
          )}

          {/* Stats */}
          {productData.stats && productData.stats.length > 0 && (
            <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.18 }}
              className="grid grid-cols-2 gap-3">
              {productData.stats.map((stat, i) => (
                <div key={i} className="bg-[var(--app-bg)] border border-[var(--border)] rounded-2xl shadow-sm p-4">
                  <p className="text-[9px] font-black uppercase tracking-widest text-[var(--color-secondary)]/50 mb-1">{stat.label}</p>
                  <p className="text-[14px] font-black text-[var(--color-primary)]">{stat.value}</p>
                </div>
              ))}
            </motion.div>
          )}

          {/* Trust badge */}
          <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.22 }}
            className="flex items-center gap-3 bg-[#059669]/6 border border-[#059669]/15 rounded-2xl p-3">
            <ShieldCheck size={16} color="#059669" strokeWidth={2} className="shrink-0" />
            <p className="text-[10px] font-semibold text-[var(--color-secondary)]/60 leading-snug">
              Protected by <span className="font-black text-[var(--app-text)]">KLeench Escrow</span> — funds held until delivery is confirmed.
            </p>
          </motion.div>
        </div>

        {/* CTAs */}
        <div className="px-5 pt-4 pb-8 space-y-3">
          <button
            onClick={() => navigate("/marketplace/order/summary", {
              state: {
                product: { title: product.name, price: product.price, image: product.images[0] },
                quantity: 1,
                availableDelivery: ["pickup", "courier", "kleench"],
              },
            })}
            className="w-full py-4 rounded-2xl bg-[var(--color-primary)] text-white font-black uppercase tracking-widest text-[12px] flex items-center justify-center gap-3 shadow-md active:scale-95 transition-all"
          >
            <ShoppingCart size={18} strokeWidth={2} />
            Buy Now — {product.currency} {product.price.toLocaleString()}
          </button>
          <button
            onClick={() => setShowShareModal(true)}
            className="w-full py-3.5 rounded-2xl border border-[var(--border)] bg-[var(--app-bg)] text-[var(--color-secondary)] font-black uppercase tracking-widest text-[11px] flex items-center justify-center gap-2 active:scale-95 transition-all"
          >
            <Share2 size={15} strokeWidth={2} /> Share & Earn {product.commission}% Commission
          </button>
        </div>

        <ShareReferralModal
          isOpen={showShareModal}
          onClose={() => setShowShareModal(false)}
          productTitle={product.name}
          productPrice={product.price}
          productId={product.id}
        />
      </div>
    </Skeleton>
  );
}
