import { useState } from "react";
import { useNavigate, useLocation } from "react-router";
import { motion } from "motion/react";
import { ShieldCheck, Shield, ChevronRight } from "lucide-react";
import { PageHeader } from "../components/PageHeader";

const COVERAGE_OPTIONS = [
  {
    id: "comprehensive",
    label: "Comprehensive",
    tagline: "Full Protection",
    desc: "Covers damage to your vehicle, third-party liability, theft, fire and natural disasters",
    features: ["Own damage cover", "Third-party liability", "Theft & fire", "Natural disasters", "Towing assistance"],
    recommended: true,
  },
  {
    id: "third-party",
    label: "Third Party Only",
    tagline: "Legal Minimum",
    desc: "Covers damage and injury you cause to other people and their property only",
    features: ["Third-party liability", "Bodily injury cover", "Property damage"],
    recommended: false,
  },
  {
    id: "third-party-fire-theft",
    label: "Third Party, Fire & Theft",
    tagline: "Mid-Range Cover",
    desc: "Third-party cover plus protection against fire damage and vehicle theft",
    features: ["Third-party liability", "Fire damage", "Vehicle theft"],
    recommended: false,
  },
];

export function InsuranceCoverage() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const [selected, setSelected] = useState("");

  return (
    <div className="w-full max-w-md mx-auto min-h-screen bg-transparent font-sans pb-32">
      <PageHeader title="COVERAGE TYPE" subtitle="Step 2 of 5" showBack />

      <div className="px-5 pt-6 space-y-4">
        <div>
          <h2 className="font-black text-[20px] text-[var(--color-secondary)] uppercase tracking-tight mb-1">
            Select Coverage
          </h2>
          <p className="text-[12px] font-semibold text-[var(--color-secondary)]/50">
            Choose the level of protection that suits you best.
          </p>
        </div>

        <div className="space-y-3">
          {COVERAGE_OPTIONS.map(({ id, label, tagline, desc, features, recommended }, i) => {
            const isSelected = selected === id;
            return (
              <motion.button
                key={id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                onClick={() => setSelected(id)}
                className={`w-full p-4 rounded-2xl border-2 text-left transition-all active:scale-[0.98] ${
                  isSelected
                    ? "border-[var(--color-primary)] bg-gradient-to-br from-[var(--color-primary)]/8 to-[var(--color-primary)]/3 shadow-md"
                    : "border-[var(--border)] bg-[var(--app-bg)]"
                }`}
              >
                <div className="flex items-start gap-3 mb-3">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${isSelected ? "bg-[var(--color-primary)] text-white" : "bg-[var(--muted)] text-[var(--color-secondary)]/50"}`}>
                    {recommended ? <ShieldCheck size={20} strokeWidth={1.5} /> : <Shield size={20} strokeWidth={1.5} />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                      <p className={`font-black text-[13px] uppercase tracking-wide ${isSelected ? "text-[var(--color-primary)]" : "text-[var(--color-secondary)]"}`}>
                        {label}
                      </p>
                      {recommended && (
                        <span className="text-[8px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full bg-[var(--color-primary)] text-white">
                          Recommended
                        </span>
                      )}
                    </div>
                    <p className="text-[10px] font-black uppercase tracking-widest text-[var(--color-secondary)]/40">{tagline}</p>
                  </div>
                  <div className={`w-5 h-5 rounded-full border-2 shrink-0 flex items-center justify-center mt-0.5 transition-colors ${isSelected ? "border-[var(--color-primary)] bg-[var(--color-primary)]" : "border-[var(--border)]"}`}>
                    {isSelected && <div className="w-2 h-2 rounded-full bg-white" />}
                  </div>
                </div>
                <p className="text-[11px] font-semibold text-[var(--color-secondary)]/60 mb-3 leading-snug">{desc}</p>
                <div className="flex flex-wrap gap-1.5">
                  {features.map((f) => (
                    <span key={f} className={`text-[9px] font-black uppercase tracking-wide px-2 py-1 rounded-full border ${isSelected ? "border-[var(--color-primary)]/30 bg-[var(--color-primary)]/10 text-[var(--color-primary)]" : "border-[var(--border)] bg-[var(--muted)] text-[var(--color-secondary)]/50"}`}>
                      {f}
                    </span>
                  ))}
                </div>
              </motion.button>
            );
          })}
        </div>
      </div>

      <div className="px-5 pt-2 pb-8">
        <button
          disabled={!selected}
          onClick={() => navigate("/insurance/plan", { state: { ...state, coverage: selected } })}
          className="w-full py-4 rounded-2xl bg-[var(--color-primary)] text-white font-black uppercase tracking-widest text-[13px] flex items-center justify-center gap-3 disabled:opacity-40 shadow-[0_8px_20px_rgba(255,140,0,0.3)] active:scale-95 transition-all"
        >
          Continue <ChevronRight size={18} strokeWidth={2.5} />
        </button>
      </div>
    </div>
  );
}
