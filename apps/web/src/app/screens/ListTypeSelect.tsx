import { useState } from "react";
import { useNavigate } from "react-router";
import { motion } from "motion/react";
import { Building2, Star, ArrowRight } from "lucide-react";
import { PageHeader } from "../components/PageHeader";

const TYPES = [
  {
    id: "ordinary" as const,
    label: "Ordinary Listing",
    desc: "Standard directory entry — free, visible to all KLeench users",
    icon: Building2,
    badges: ["Free", "Public Directory", "Basic Profile"],
  },
  {
    id: "priority" as const,
    label: "Priority Listing",
    desc: "Premium placement — featured position, more profile fields, business references",
    icon: Star,
    badges: ["Featured", "Full Profile", "References"],
    premium: true,
  },
];

export function ListTypeSelect() {
  const navigate = useNavigate();
  const [selected, setSelected] = useState<"ordinary" | "priority" | null>(null);

  return (
    <div className="w-full max-w-md mx-auto min-h-screen bg-transparent font-sans pb-32">
      <PageHeader title="LIST YOUR BUSINESS" subtitle="Step 1 — Choose Listing Type" showBack />

      <div className="px-5 pt-5 space-y-5">
        <div className="flex gap-1.5">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className={`h-1.5 flex-1 rounded-full ${i < 1 ? "bg-[var(--color-primary)]" : "bg-[var(--border)]"}`} />
          ))}
        </div>

        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[var(--color-secondary)]/50">Which listing type suits you?</p>

        <div className="space-y-3">
          {TYPES.map((opt) => {
            const Icon = opt.icon;
            const isSelected = selected === opt.id;
            return (
              <motion.button key={opt.id} whileTap={{ scale: 0.98 }} onClick={() => setSelected(opt.id)}
                className={`w-full flex items-start gap-4 p-4 rounded-2xl border transition-all text-left ${isSelected ? "border-[var(--color-primary)] bg-[var(--color-primary)]/6 shadow-sm" : "border-[var(--border)] bg-[var(--app-bg)] shadow-sm"}`}>
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 ${opt.premium ? (isSelected ? "bg-[var(--color-secondary)]" : "bg-[var(--color-secondary)]/10") : (isSelected ? "bg-[var(--color-primary)]/15" : "bg-[var(--border)]/30")}`}>
                  <Icon size={22} strokeWidth={1.5} color={opt.premium ? (isSelected ? "white" : "var(--color-secondary)") : (isSelected ? "var(--color-primary)" : "var(--color-secondary)")} />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-0.5">
                    <p className="text-[13px] font-black text-[var(--app-text)] uppercase tracking-wide">{opt.label}</p>
                    {opt.premium && <span className="text-[7px] font-black px-1.5 py-0.5 rounded bg-[var(--color-secondary)] text-white uppercase tracking-widest">Premium</span>}
                  </div>
                  <p className="text-[10px] font-semibold text-[var(--color-secondary)]/60 leading-snug">{opt.desc}</p>
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    {opt.badges.map((b) => (
                      <span key={b} className={`text-[8px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full ${isSelected ? "bg-[var(--color-primary)] text-white" : "bg-[var(--border)]/50 text-[var(--color-secondary)]/60"}`}>{b}</span>
                    ))}
                  </div>
                </div>
                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 mt-0.5 ${isSelected ? "border-[var(--color-primary)] bg-[var(--color-primary)]" : "border-[var(--border)]"}`}>
                  {isSelected && <div className="w-2 h-2 rounded-full bg-white" />}
                </div>
              </motion.button>
            );
          })}
        </div>
      </div>

      <div className="px-5 pt-6 pb-8">
        <button onClick={() => navigate("/marketplace/list/biz-type", { state: { listingType: selected } })}
          disabled={!selected}
          className="w-full py-4 rounded-2xl bg-[var(--color-secondary)] text-white font-black uppercase tracking-widest text-[12px] flex items-center justify-center gap-3 disabled:opacity-40 disabled:cursor-not-allowed active:scale-95 transition-all">
          Continue <ArrowRight size={18} />
        </button>
      </div>
    </div>
  );
}
