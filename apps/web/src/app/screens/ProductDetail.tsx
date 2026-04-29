import { useState } from "react";
import { useParams, Link, Navigate } from "react-router";
import { ArrowLeft, Star, ShieldCheck, Play, Wallet, CheckCircle, Zap, Shield, Send, type LucideIcon } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { ShareReferralModal } from "../components/ShareReferralModal";
import { PRODUCTS } from "../data/products";

import { usePageLoading } from "../components/PageSkeletons";
import { Skeleton } from "boneyard-js/react";

export function ProductDetail() {
  const loading = usePageLoading(1200);
  const { id } = useParams();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showShareModal, setShowShareModal] = useState(false);

  

  // Find the product by ID
  const productData = PRODUCTS.find((p) => p.id === Number(id));

  // Redirect to home if product not found
  if (!productData) {
    return <Navigate to="/" replace />;
  }

  // Ensure required fields have defaults
  const product = {
    ...productData,
    category: productData.category || "LIVE PROOF",
    currency: productData.currency || "USD",
    description: productData.description || "Premium product available on Kleench marketplace.",
    descriptionExtended: productData.descriptionExtended || "Quality guaranteed with secure escrow protection.",
    features: productData.features || [],
    hasDemo: productData.hasDemo ?? true,
    inStock: productData.inStock ?? true,
    commission: productData.commission || 5,
    images: productData.images || [productData.image],
    sellerAvatar: productData.sellerAvatar || "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&crop=faces",
    sellerVerified: productData.sellerVerified ?? true,
    sellerRating: productData.sellerRating || productData.rating,
    sellerTransactions: productData.sellerTransactions || 1000,
    stats: productData.stats || [
      { icon: "zap", label: "Fast Shipping", value: "2-Day Delivery", color: "text-[var(--trust-blue)]" },
      { icon: "shield", label: "Warranty", value: "1 Year Coverage", color: "text-[var(--action-gold-dark)]" },
    ],
    performance: productData.performance || [
      { label: "Customer Satisfaction", value: "+95.0%", type: "chart" },
      { label: "Units Sold", value: "5.0k", subtitle: "Total units sold across the Kleench marketplace.", type: "text" },
    ],
  };

  const iconMap: Record<string, LucideIcon> = {
    zap: Zap,
    shield: Shield,
  };

  return (
    <Skeleton loading={loading} name="productdetail">
    <div className="min-h-screen pb-32">
      {/* Top Navigation */}
      <div className="sticky top-0 z-50 bg-[var(--app-bg)]/80 backdrop-blur-xl shadow-sm">
        <div className="flex items-center justify-between px-6 py-3">
          <Link to="/" className="flex items-center justify-center h-10 w-10 rounded-full(--clean-slate)] active:scale-95 transition-all">
            <ArrowLeft size={20} className="text-[var(--ink-primary)]" />
          </Link>
          
          <div className="w-10 h-10 rounded-full bg-[var(--trust-blue)]/10 flex items-center justify-center overflow-hidden border border-white/20">
            <ImageWithFallback
              src={product.sellerAvatar}
              alt="User Profile"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>

      {/* Hero Media Gallery */}
      <section className="relative w-full h-[530px] bg-[var(--surface-raised)] overflow-hidden group">
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent z-10" />
        <AnimatePresence mode="wait">
          <motion.div
            key={currentImageIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full h-full"
          >
            <ImageWithFallback
              src={product.images[currentImageIndex]}
              alt={product.name}
              className="w-full h-full object-cover transform scale-105 transition-transform duration-1000"
            />
          </motion.div>
        </AnimatePresence>

        {/* Content Overlay */}
        <div className="absolute inset-0 z-20 flex flex-col justify-end p-8">
          <div className="flex items-center gap-3 mb-4">
            <span className="bg-[var(--action-gold)] text-[var(--ink-primary)] px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest flex items-center gap-1.5 animate-pulse">
              <span className="w-2 h-2 rounded-full bg-[var(--app-bg)]" />
              {product.category}
            </span>
            <span className="bg-[var(--app-bg)]/10 backdrop-blur-md text-white px-3 py-1 rounded-full text-xs font-medium">4K Demo</span>
          </div>
          <h2 className="font-extrabold text-white leading-tight max-w-2xl tracking-tight">
            {product.name}
          </h2>
        </div>

        {/* Play Button */}
        {product.hasDemo && (
          <motion.button
            whileTap={{ scale: 0.9 }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30 w-20 h-20 bg-[var(--trust-blue)]/90 backdrop-blur-lg rounded-full flex items-center justify-center shadow-2xl(--trust-blue)] transition-colors"
          >
            <Play size={32} fill="white" className="text-white ml-1" />
          </motion.button>
        )}

        {/* Image Indicators */}
        <div className="absolute bottom-24 left-0 right-0 flex items-center justify-center gap-2 z-20">
          {product.images.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentImageIndex(i)}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === currentImageIndex ? "bg-[var(--app-bg)] w-6 shadow-md" : "bg-[var(--app-bg)]/40 w-1.5"
              }`}
            />
          ))}
        </div>
      </section>

      {/* Trust Validation Panel */}
      <div className="max-w-4xl mx-auto px-6 mt-8">
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-wrap items-center justify-between gap-6 p-6 bg-[var(--clean-slate)] rounded-full shadow-sm"
        >
          <div className="flex items-center gap-4">
            <div className="relative">
              <ImageWithFallback
                src={product.sellerAvatar}
                alt={product.seller}
                className="w-14 h-14 rounded-full border-2 border-white object-cover"
              />
              <div className="absolute -bottom-1 -right-1 bg-[var(--trust-blue)] text-white rounded-full p-1 border-2 border-white shadow-sm">
                <ShieldCheck size={12} strokeWidth={3} />
              </div>
            </div>
            <div>
              <p className="font-bold text-[var(--ink-primary)] text-lg leading-tight">
                {product.seller}
              </p>
              <div className="flex items-center gap-2 mt-1">
                <span className="bg-[var(--trust-blue)]/10 text-[var(--trust-blue)] text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-tight border border-[var(--trust-blue)]/20">
                  Verified KYC
                </span>
                <div className="flex items-center gap-1 text-[var(--action-gold-dark)]">
                  <Star size={14} fill="var(--action-gold)" className="text-[var(--action-gold)]" strokeWidth={0} />
                  <span className="text-sm font-bold">{product.sellerRating}</span>
                  <span className="text-[var(--ink-muted)] text-xs font-normal ml-1">
                    ({product.reviews.toLocaleString()} deals)
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="text-right">
            <p className="text-[var(--ink-muted)] text-xs font-medium uppercase tracking-widest mb-1">Current Floor</p>
            <div className="flex items-baseline gap-1">
              <span className="font-black text-[var(--ink-primary)]">
                {product.price.toLocaleString()}
              </span>
              <span className="font-bold text-[var(--trust-blue)]">{product.currency}</span>
            </div>
          </div>
        </motion.section>

        {/* Information Layer */}
        <section className="mt-12 space-y-8">
          <div className="grid grid-cols-1 gap-8">
            {/* Left Column - Details */}
            <div className="md:col-span-2 space-y-6">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="font-bold text-[var(--ink-primary)]"
              >
                Master the Digital Economy
              </motion.h2>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="space-y-4 text-[var(--ink-secondary)] leading-relaxed"
              >
                <p className="font-[var(--font-body)] text-lg">{product.description}</p>
                <p className="font-[var(--font-body)]">{product.descriptionExtended}</p>
              </motion.div>

              {/* Bento Grid Stats */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="grid grid-cols-2 gap-4 pt-4"
              >
                {product.stats.map((stat, i) => {
                  const Icon = iconMap[stat.icon];
                  return (
                    <div key={i} className="bg-[var(--app-bg)] p-5 rounded-[2rem] border border-black/[0.04] shadow-sm">
                      <Icon size={24} className={`${stat.color} mb-2`} strokeWidth={2} />
                      <p className="text-xs text-[var(--ink-muted)] font-medium uppercase">{stat.label}</p>
                      <p className="text-xl font-bold text-[var(--ink-primary)]">{stat.value}</p>
                    </div>
                  );
                })}
              </motion.div>
            </div>

            {/* Right Column - Value Props & CTA */}
            <div className="space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="bg-[var(--clean-slate)] p-6 rounded-[2rem] space-y-4 shadow-sm"
              >
                <h3 className="font-bold text-[var(--ink-primary)]">Value Props</h3>
                <ul className="space-y-3">
                  {product.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <CheckCircle size={16} className="text-[var(--trust-blue)] mt-0.5 flex-shrink-0" strokeWidth={2.5} />
                      <span className="text-sm font-medium text-[var(--ink-primary)]">{feature}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>

              {/* Share & Earn CTA */}
              <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => setShowShareModal(true)}
                className="w-full bg-gradient-to-r from-[var(--action-gold)] to-[#E6B000](--action-gold)] transition-all duration-300 py-4 px-6 rounded-full flex items-center justify-between group shadow-lg glow-gold"
              >
                <div className="text-left">
                  <p className="text-[10px] font-bold text-[var(--ink-primary)] uppercase tracking-widest">Growth Loop</p>
                  <p className="text-[var(--ink-primary)] font-[var(--font-header)] font-bold">
                    Share & Earn {product.commission}%
                  </p>
                </div>
                <Send size={20} className="text-[var(--ink-primary)] transition-transform" strokeWidth={2.5} />
              </motion.button>
            </div>
          </div>
        </section>

        {/* Performance History */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.7 }}
          className="mt-16 pt-16 border-t border-[var(--surface-raised)]"
        >
          <h3 className="font-[var(--font-header)] text-xl font-bold mb-8 text-[var(--ink-primary)]">Performance History</h3>
          <div className="overflow-x-auto no-scrollbar">
            <div className="flex gap-6 pb-4">
              {product.performance.map((perf, i) => (
                <div key={i} className="w-72 flex-shrink-0 bg-[var(--app-bg)] p-6 rounded-[2rem] border border-black/[0.04] shadow-sm">
                  <p className="text-xs font-bold text-[var(--ink-muted)] uppercase mb-2">{perf.label}</p>
                  <p className={`text-3xl font-[var(--font-header)] font-black mb-4 ${
                    perf.type === "chart" ? "text-[var(--trust-blue)]" : "text-[var(--ink-primary)]"
                  }`}>
                    {perf.value}
                  </p>
                  {perf.type === "chart" ? (
                    <div className="h-12 w-full bg-[var(--trust-blue)]/5 rounded-lg flex items-end gap-1 px-2 pb-1">
                      <div className="w-full bg-[var(--trust-blue)] h-[30%] rounded-t-sm opacity-40" />
                      <div className="w-full bg-[var(--trust-blue)] h-[45%] rounded-t-sm opacity-50" />
                      <div className="w-full bg-[var(--trust-blue)] h-[60%] rounded-t-sm opacity-60" />
                      <div className="w-full bg-[var(--trust-blue)] h-[55%] rounded-t-sm opacity-70" />
                      <div className="w-full bg-[var(--trust-blue)] h-[85%] rounded-t-sm opacity-100" />
                    </div>
                  ) : (
                    <p className="text-sm text-[var(--ink-secondary)] leading-tight">{perf.subtitle}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </motion.section>
      </div>

      {/* Sticky Checkout Bar */}
      <div className="fixed bottom-0 left-0 w-full z-50 px-6 pb-8 pointer-events-none">
        <div className="max-w-4xl mx-auto w-full glass-strong backdrop-blur-2xl p-4 rounded-full shadow-[0_-8px_32px_rgba(0,0,0,0.12)] border border-white/20 flex items-center justify-between pointer-events-auto">
          <div className="hidden pl-4">
            <div className="flex items-center gap-2">
              <ShieldCheck size={16} className="text-[var(--trust-blue)]" strokeWidth={2.5} />
              <p className="text-[10px] font-bold text-[var(--ink-muted)] uppercase tracking-wider">
                Protected by Kleench Escrow
              </p>
            </div>
            <p className="text-[10px] text-[var(--ink-muted)]/60 mt-0.5">
              Funds are held securely until delivery is confirmed.
            </p>
          </div>
          <div className="flex items-center gap-4 w-full">
            <motion.button
              whileTap={{ scale: 0.95 }}
              className="flex-1 px-8 py-4 bg-gradient-to-r from-[var(--action-gold)] to-[#E6B000](--action-gold)] text-[var(--ink-primary)] font-black text-lg rounded-full transition-all flex items-center justify-center gap-3 shadow-lg glow-gold"
            >
              Purchase with Wallet
              <Wallet size={20} strokeWidth={2.5} />
            </motion.button>
          </div>
        </div>
      </div>

      {/* Share Modal */}
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
