import { useNavigate } from "react-router";
import { motion } from "motion/react";
import { Package, Briefcase, ArrowRight } from "lucide-react";
import { PageHeader } from "../components/PageHeader";

const SELL_OPTIONS = [
  {
    id: "product" as const,
    label: "Sell a Product",
    desc: "Physical goods and merchandise.",
    examples: ["Phones", "Clothing", "Electronics", "Furniture"],
    icon: Package,
    route: "/marketplace/sell/product",
  },
  {
    id: "service" as const,
    label: "Offer a Service",
    desc: "Professional and business services.",
    examples: ["Photography", "Consulting", "Training", "Construction"],
    icon: Briefcase,
    route: "/marketplace/sell/service",
  },
];

export function SellHub() {
  const navigate = useNavigate();

  return (
    <div className="w-full max-w-md mx-auto min-h-screen bg-transparent font-sans pb-32">
      <PageHeader title="SELL HUB" showBack />

      <div className="px-5 pt-6 space-y-6">
        <div className="space-y-1">
          <h2 className="text-[22px] font-black text-[var(--app-text)] uppercase tracking-tight leading-tight">
            What would you like to sell?
          </h2>
          <p className="text-[12px] font-semibold text-[var(--color-secondary)]/60 leading-snug">
            Create a product listing or offer a service to the KLeench marketplace.
          </p>
        </div>

        <div className="space-y-4">
          {SELL_OPTIONS.map((opt, i) => {
            const Icon = opt.icon;
            return (
              <motion.button
                key={opt.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => navigate(opt.route)}
                className="w-full bg-[var(--app-bg)] border border-[var(--border)] rounded-2xl shadow-sm overflow-hidden text-left active:shadow-md transition-all"
              >
                {/* Card header */}
                <div className="bg-[var(--color-secondary)] px-5 py-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-white/15 flex items-center justify-center">
                      <Icon size={20} color="white" strokeWidth={2} />
                    </div>
                    <p className="text-[14px] font-black text-white uppercase tracking-widest">{opt.label}</p>
                  </div>
                  <ArrowRight size={18} color="white" strokeWidth={2.5} />
                </div>

                {/* Card body */}
                <div className="px-5 py-4 space-y-3">
                  <p className="text-[12px] font-semibold text-[var(--color-secondary)]/70">{opt.desc}</p>
                  <div className="flex flex-wrap gap-2">
                    {opt.examples.map((ex) => (
                      <span key={ex}
                        className="text-[9px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full bg-[var(--color-secondary)]/8 text-[var(--color-secondary)]/60 border border-[var(--border)]">
                        {ex}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
