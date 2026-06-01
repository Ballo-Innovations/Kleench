import { useState } from "react";
import { useNavigate } from "react-router";
import { motion, AnimatePresence } from "motion/react";
import { Package, Briefcase, ShoppingBag, Truck, Building2, ArrowRight, ChevronLeft } from "lucide-react";
import { PageHeader } from "../components/PageHeader";

export function SellHub() {
  const navigate = useNavigate();
  const [hubStep, setHubStep] = useState<1 | 2>(1);
  const [sellType, setSellType] = useState<"product" | "service" | null>(null);
  const [saleType, setSaleType] = useState<"simple" | "delivery" | "complex" | null>(null);

  const handleSellTypeSelect = (type: "product" | "service") => {
    setSellType(type);
    setSaleType(null);
    if (type === "service") {
      setHubStep(2);
    } else {
      setHubStep(2);
    }
  };

  const handleBack = () => {
    if (hubStep === 2) {
      setHubStep(1);
      setSaleType(null);
    } else {
      navigate(-1);
    }
  };

  const canContinue = hubStep === 1
    ? sellType !== null
    : sellType === "service" || saleType !== null;

  const handleContinue = () => {
    if (hubStep === 1) {
      setHubStep(2);
      return;
    }
    if (!sellType) return;
    if (sellType === "service") {
      navigate("/marketplace/sell/identity", { state: { sellType: "service" } });
    } else if (saleType === "complex") {
      navigate("/marketplace/sell/identity", { state: { sellType: "complex" } });
    } else {
      navigate("/marketplace/sell/identity", { state: { sellType: "product", saleType } });
    }
  };

  return (
    <div className="w-full max-w-md mx-auto min-h-screen bg-transparent font-sans pb-32">
      <PageHeader
        title="SELL HUB"
        subtitle={hubStep === 1 ? "Step 1 of 2 — What are you selling?" : "Step 2 of 2 — How would you like to sell?"}
        showBack
        onBack={handleBack}
      />

      <div className="px-5 pt-5 space-y-6">
        {/* Progress bar */}
        <div className="flex gap-1.5">
          {[1, 2].map((step) => (
            <div key={step} className={`h-1.5 flex-1 rounded-full transition-colors duration-300 ${step <= hubStep ? "bg-[var(--color-primary)]" : "bg-[var(--border)]"}`} />
          ))}
        </div>

        <AnimatePresence mode="wait">
          {hubStep === 1 && (
            <motion.div key="step1" initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -16 }}
              className="space-y-3">
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[var(--color-secondary)]/50">What would you like to sell?</p>
              {([
                { id: "product", label: "Sell a Product", icon: Package, desc: "Physical goods, merchandise, or equipment" },
                { id: "service", label: "Offer a Service", icon: Briefcase, desc: "Professional services, skills, or experiences" },
              ] as const).map((opt) => (
                <motion.button
                  key={opt.id}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setSellType(opt.id)}
                  className={`w-full flex items-center gap-4 p-4 rounded-2xl border-[3px] transition-all text-left ${
                    sellType === opt.id
                      ? "border-[var(--app-text)] shadow-[4px_4px_0_var(--app-text)] bg-[var(--color-primary)]/8"
                      : "border-[var(--border)] bg-[var(--app-bg)]"
                  }`}
                >
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${sellType === opt.id ? "bg-[var(--color-primary)]/15" : "bg-[var(--border)]/30"}`}>
                    <opt.icon size={24} style={{ color: sellType === opt.id ? "var(--color-primary)" : "var(--color-secondary)" }} strokeWidth={2} />
                  </div>
                  <div className="flex-1">
                    <p className="text-[13px] font-black text-[var(--app-text)] uppercase tracking-wide">{opt.label}</p>
                    <p className="text-[11px] font-semibold text-[var(--color-secondary)]/60">{opt.desc}</p>
                  </div>
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 ${sellType === opt.id ? "border-[var(--color-primary)] bg-[var(--color-primary)]" : "border-[var(--border)]"}`}>
                    {sellType === opt.id && <div className="w-2 h-2 rounded-full bg-white" />}
                  </div>
                </motion.button>
              ))}
            </motion.div>
          )}

          {hubStep === 2 && sellType === "product" && (
            <motion.div key="step2-product" initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 16 }}
              className="space-y-3">
              <div className="flex items-center gap-2 mb-1">
                <button onClick={handleBack} className="w-7 h-7 rounded-lg bg-[var(--border)]/40 flex items-center justify-center active:scale-95 transition-all">
                  <ChevronLeft size={14} className="text-[var(--color-secondary)]" strokeWidth={2.5} />
                </button>
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[var(--color-secondary)]/50">How would you like to sell?</p>
              </div>
              {([
                { id: "simple", label: "Simple Sale", desc: "Direct pickup or local delivery — fastest listing", icon: ShoppingBag, badge: "QUICK" },
                { id: "delivery", label: "Delivery Sale", desc: "Nationwide courier delivery via KLeench logistics", icon: Truck, badge: "POPULAR" },
                { id: "complex", label: "Complex Sale", desc: "High-value assets, vehicles & industrial equipment", icon: Building2, badge: "ESCROW" },
              ] as const).map((opt) => (
                <motion.button
                  key={opt.id}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setSaleType(opt.id)}
                  className={`w-full flex items-center gap-4 p-4 rounded-2xl border-[3px] transition-all text-left ${
                    saleType === opt.id
                      ? "border-[var(--app-text)] shadow-[4px_4px_0_var(--app-text)] bg-[var(--color-primary)]/8"
                      : "border-[var(--border)] bg-[var(--app-bg)]"
                  }`}
                >
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${saleType === opt.id ? "bg-[var(--color-primary)]/15" : "bg-[var(--border)]/30"}`}>
                    <opt.icon size={20} style={{ color: saleType === opt.id ? "var(--color-primary)" : "var(--color-secondary)" }} strokeWidth={2} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <p className="text-[12px] font-black text-[var(--app-text)] uppercase tracking-wide">{opt.label}</p>
                      <span className={`text-[7px] font-black px-1.5 py-0.5 rounded uppercase tracking-widest ${saleType === opt.id ? "bg-[var(--color-primary)] text-white" : "bg-[var(--border)]/50 text-[var(--color-secondary)]/60"}`}>{opt.badge}</span>
                    </div>
                    <p className="text-[10px] font-semibold text-[var(--color-secondary)]/60 mt-0.5">{opt.desc}</p>
                  </div>
                  <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0 ${saleType === opt.id ? "border-[var(--color-primary)] bg-[var(--color-primary)]" : "border-[var(--border)]"}`}>
                    {saleType === opt.id && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                  </div>
                </motion.button>
              ))}
            </motion.div>
          )}

          {hubStep === 2 && sellType === "service" && (
            <motion.div key="step2-service" initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 16 }}
              className="space-y-3">
              <div className="flex items-center gap-2 mb-1">
                <button onClick={handleBack} className="w-7 h-7 rounded-lg bg-[var(--border)]/40 flex items-center justify-center active:scale-95 transition-all">
                  <ChevronLeft size={14} className="text-[var(--color-secondary)]" strokeWidth={2.5} />
                </button>
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[var(--color-secondary)]/50">You're listing a service</p>
              </div>
              <div className="bg-[var(--app-bg)] rounded-3xl border-[3px] border-[var(--app-text)] shadow-[4px_4px_0_var(--app-text)] p-5 space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-[var(--color-primary)]/15 flex items-center justify-center">
                    <Briefcase size={24} color="var(--color-primary)" strokeWidth={2} />
                  </div>
                  <div>
                    <p className="text-[13px] font-black text-[var(--app-text)] uppercase tracking-wide">Service Listing</p>
                    <p className="text-[10px] font-semibold text-[var(--color-secondary)]/60">Packages, availability & audience targeting</p>
                  </div>
                </div>
                <div className="border-t border-[var(--border)] pt-3 space-y-2">
                  {["Define service packages & pricing", "Set availability & location", "Target your ideal clients", "Boost your listing (optional)"].map((step, i) => (
                    <div key={i} className="flex items-center gap-2.5">
                      <div className="w-5 h-5 rounded-full bg-[var(--color-primary)]/15 border border-[var(--color-primary)]/30 flex items-center justify-center shrink-0">
                        <span className="text-[8px] font-black text-[var(--color-primary)]">{i + 1}</span>
                      </div>
                      <span className="text-[11px] font-semibold text-[var(--color-secondary)]/70">{step}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="px-5 pt-6 pb-8">
        <button
          onClick={handleContinue}
          disabled={!canContinue}
          className="w-full py-4 rounded-2xl bg-[var(--color-secondary)] text-white font-black uppercase tracking-widest text-[12px] flex items-center justify-center gap-3 disabled:opacity-40 disabled:cursor-not-allowed active:scale-95 transition-all"
        >
          {hubStep === 1 ? "Next" : "Continue"} <ArrowRight size={18} />
        </button>
      </div>
    </div>
  );
}
