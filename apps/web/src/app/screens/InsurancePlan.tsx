import { useState } from "react";
import { useNavigate, useLocation } from "react-router";
import { motion } from "motion/react";
import { Check, ChevronRight, Star } from "lucide-react";
import { PageHeader } from "../components/PageHeader";

const PLANS = [
  {
    id: "basic",
    name: "Basic Plan",
    price: "ZMW 2,400",
    period: "/year",
    features: ["Third-party cover up to ZMW 500,000", "Road accident fund", "Policy document", "24/7 claims hotline"],
    popular: false,
    color: "#64748B",
  },
  {
    id: "standard",
    name: "Standard Plan",
    price: "ZMW 4,800",
    period: "/year",
    features: ["Own damage up to ZMW 150,000", "Third-party liability", "Fire & theft cover", "Towing assistance 50km", "Replacement vehicle 7 days"],
    popular: true,
    color: "#0077B6",
  },
  {
    id: "premium",
    name: "Premium Plan",
    price: "ZMW 8,200",
    period: "/year",
    features: ["Own damage up to ZMW 500,000", "Comprehensive cover", "Windscreen cover", "Towing assistance unlimited", "Replacement vehicle 14 days", "Personal accident cover"],
    popular: false,
    color: "#7C3AED",
  },
];

export function InsurancePlan() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const [selected, setSelected] = useState("standard");

  return (
    <div className="w-full max-w-md mx-auto bg-transparent font-sans pb-24">
      <PageHeader title="CHOOSE PLAN" subtitle="Step 3 of 5" showBack />

      <div className="px-5 pt-6 space-y-4">
        <div>
          <h2 className="font-black text-[20px] text-[var(--color-secondary)] uppercase tracking-tight mb-1">
            Insurance Plans
          </h2>
          <p className="text-[12px] font-semibold text-[var(--color-secondary)]/50">
            Pick the plan that best fits your needs and budget.
          </p>
        </div>

        <div className="space-y-3">
          {PLANS.map(({ id, name, price, period, features, popular, color }, i) => {
            const isSelected = selected === id;
            return (
              <motion.button
                key={id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.09 }}
                onClick={() => setSelected(id)}
                className={`w-full p-4 rounded-2xl border-2 text-left transition-all active:scale-[0.98] relative overflow-hidden ${
                  isSelected ? "border-[var(--color-primary)] shadow-md" : "border-[var(--border)] bg-[var(--app-bg)]"
                }`}
                style={isSelected ? { background: `linear-gradient(135deg, ${color}10, ${color}05)` } : {}}
              >
                {popular && (
                  <div className="absolute top-3 right-3 flex items-center gap-1 bg-[var(--color-primary)] text-white text-[8px] font-black uppercase tracking-widest px-2 py-1 rounded-full">
                    <Star size={8} fill="white" />
                    Popular
                  </div>
                )}
                <div className="flex items-start justify-between mb-3 pr-16">
                  <div>
                    <p className={`font-black text-[14px] uppercase tracking-wide ${isSelected ? "text-[var(--color-secondary)]" : "text-[var(--color-secondary)]"}`}>
                      {name}
                    </p>
                    <div className="flex items-baseline gap-1 mt-1">
                      <span className="font-black text-[22px] leading-none" style={{ color: isSelected ? color : "var(--color-secondary)" }}>
                        {price}
                      </span>
                      <span className="text-[11px] font-bold text-[var(--color-secondary)]/50">{period}</span>
                    </div>
                  </div>
                  <div className={`w-5 h-5 rounded-full border-2 shrink-0 flex items-center justify-center mt-1 transition-colors ${isSelected ? "border-[var(--color-primary)] bg-[var(--color-primary)]" : "border-[var(--border)]"}`}>
                    {isSelected && <div className="w-2 h-2 rounded-full bg-white" />}
                  </div>
                </div>
                <div className="space-y-1.5">
                  {features.map((f) => (
                    <div key={f} className="flex items-center gap-2">
                      <div className={`w-4 h-4 rounded-full flex items-center justify-center shrink-0 ${isSelected ? "bg-[var(--color-primary)]/15" : "bg-[var(--muted)]"}`}>
                        <Check size={10} strokeWidth={3} style={{ color: isSelected ? color : "var(--color-secondary)" }} />
                      </div>
                      <span className="text-[11px] font-semibold text-[var(--color-secondary)]/70">{f}</span>
                    </div>
                  ))}
                </div>
              </motion.button>
            );
          })}
        </div>
      </div>

      <div className="px-5 pt-2 pb-8">
        <div className="flex items-center justify-between mb-3">
          <span className="text-[11px] font-black uppercase tracking-wide text-[var(--color-secondary)]/50">Selected Plan</span>
          <span className="text-[13px] font-black uppercase text-[var(--color-primary)]">
            {PLANS.find((p) => p.id === selected)?.price}/yr
          </span>
        </div>
        <button
          onClick={() => navigate("/insurance/details", { state: { ...state, plan: selected } })}
          className="w-full py-4 rounded-2xl bg-[var(--color-primary)] text-white font-black uppercase tracking-widest text-[13px] flex items-center justify-center gap-3 shadow-[0_8px_20px_rgba(255,140,0,0.3)] active:scale-95 transition-all"
        >
          Continue <ChevronRight size={18} strokeWidth={2.5} />
        </button>
      </div>
    </div>
  );
}
