import { useState } from "react";
import { useNavigate, useLocation } from "react-router";
import { motion } from "motion/react";
import { Car, Heart, ShieldCheck, Home, MoreHorizontal, ChevronRight } from "lucide-react";
import { PageHeader } from "../components/PageHeader";

const TYPES = [
  { id: "motor", label: "Motor Insurance", desc: "Cover your vehicle against accidents, theft and third-party claims", icon: Car, color: "#0077B6" },
  { id: "health", label: "Health Insurance", desc: "Medical coverage for you and your family including hospitalization", icon: Heart, color: "#DC2626" },
  { id: "life", label: "Life Insurance", desc: "Financial protection for your loved ones in case of unexpected events", icon: ShieldCheck, color: "#059669" },
  { id: "property", label: "Property Insurance", desc: "Protect your home, business premises and personal property", icon: Home, color: "#7C3AED" },
  { id: "others", label: "Other Insurance", desc: "Travel, marine, agriculture and specialized insurance products", icon: MoreHorizontal, color: "#D97706" },
];

export function InsuranceType() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const [selected, setSelected] = useState(state?.category || "");

  return (
    <div className="w-full max-w-md mx-auto bg-transparent font-sans pb-24">
      <PageHeader title="INSURANCE TYPE" subtitle="Step 1 of 5" showBack />

      <div className="px-5 pt-6 space-y-4">
        <div>
          <h2 className="font-black text-[20px] text-[var(--color-secondary)] uppercase tracking-tight mb-1">
            Insurance Category
          </h2>
          <p className="text-[12px] font-semibold text-[var(--color-secondary)]/50">
            Select the type of insurance coverage you need.
          </p>
        </div>

        <div className="space-y-3">
          {TYPES.map(({ id, label, desc, icon: Icon, color }, i) => (
            <motion.button
              key={id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.07, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              onClick={() => setSelected(id)}
              className={`w-full p-4 rounded-2xl border-2 flex items-center gap-4 text-left transition-all active:scale-[0.98] ${
                selected === id
                  ? "border-[var(--color-primary)] bg-[var(--color-primary)]/5 shadow-md"
                  : "border-[var(--border)] bg-[var(--app-bg)]"
              }`}
            >
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0 transition-colors"
                style={{ backgroundColor: selected === id ? color + "20" : "var(--muted)" }}
              >
                <Icon size={22} strokeWidth={1.5} style={{ color: selected === id ? color : "var(--color-secondary)" }} />
              </div>
              <div className="flex-1 min-w-0">
                <p className={`font-black text-[13px] uppercase tracking-wide ${selected === id ? "text-[var(--color-primary)]" : "text-[var(--color-secondary)]"}`}>
                  {label}
                </p>
                <p className="text-[11px] font-semibold text-[var(--color-secondary)]/50 mt-0.5 leading-snug">{desc}</p>
              </div>
              <div
                className={`w-5 h-5 rounded-full border-2 shrink-0 flex items-center justify-center transition-colors ${
                  selected === id ? "border-[var(--color-primary)] bg-[var(--color-primary)]" : "border-[var(--border)]"
                }`}
              >
                {selected === id && <div className="w-2 h-2 rounded-full bg-white" />}
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      <div className="px-5 pt-2 pb-8">
        <button
          disabled={!selected}
          onClick={() => navigate("/insurance/coverage", { state: { ...state, insuranceType: selected } })}
          className="w-full py-4 rounded-2xl bg-[var(--color-primary)] text-white font-black uppercase tracking-widest text-[13px] flex items-center justify-center gap-3 disabled:opacity-40 shadow-[0_8px_20px_rgba(255,140,0,0.3)] active:scale-95 transition-all"
        >
          Continue <ChevronRight size={18} strokeWidth={2.5} />
        </button>
      </div>
    </div>
  );
}
