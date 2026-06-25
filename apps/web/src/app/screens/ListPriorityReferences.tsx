import { useState } from "react";
import { useNavigate, useLocation } from "react-router";
import { motion, AnimatePresence } from "motion/react";
import { Plus, Trash2, Award } from "lucide-react";
import { PageHeader } from "../components/PageHeader";
import { CtaButton } from "../components/CtaButton";

interface Reference { org: string; project: string; phone: string }

export function ListPriorityReferences() {
  const navigate = useNavigate();
  const { state } = useLocation();

  const [references, setReferences] = useState<Reference[]>([{ org: "", project: "", phone: "" }]);

  const updateRef = (i: number, field: keyof Reference, val: string) => {
    setReferences((prev) => prev.map((r, idx) => idx === i ? { ...r, [field]: val } : r));
  };

  const addRef = () => setReferences((prev) => [...prev, { org: "", project: "", phone: "" }]);
  const removeRef = (i: number) => setReferences((prev) => prev.filter((_, idx) => idx !== i));

  const hasOne = references.some((r) => r.org.trim() && r.project.trim());

  return (
    <div className="w-full bg-transparent font-sans pb-24">
      <PageHeader title="LIST YOUR BUSINESS" subtitle="Step 8 — Business References" showBack />

      <div className="px-5 pt-5 space-y-5">
        <div className="flex gap-1.5">
          {Array.from({ length: 10 }).map((_, i) => (
            <div key={i} className={`h-1.5 flex-1 rounded-full ${i < 8 ? "bg-[var(--color-primary)]" : "bg-[var(--border)]"}`} />
          ))}
        </div>

        <div className="flex items-start gap-3 bg-[var(--color-primary)]/8 border border-[var(--color-primary)]/20 rounded-2xl px-4 py-3">
          <Award size={15} className="text-[var(--color-primary)] shrink-0 mt-0.5" strokeWidth={2} />
          <p className="text-[11px] font-semibold text-[var(--color-secondary)]/70 leading-snug">
            Add businesses or people you've worked with. This builds credibility with buyers.
          </p>
        </div>

        <AnimatePresence>
          {references.map((ref, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }}
              className="bg-[var(--app-bg)] border border-[var(--border)] rounded-2xl shadow-sm p-4 space-y-3">
              <div className="flex items-center justify-between">
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[var(--color-secondary)]/50">Reference {i + 1}</p>
                {references.length > 1 && (
                  <button onClick={() => removeRef(i)} className="w-7 h-7 rounded-full bg-red-50 border border-red-100 flex items-center justify-center active:scale-90 transition-all">
                    <Trash2 size={12} className="text-red-400" strokeWidth={2} />
                  </button>
                )}
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-black uppercase tracking-wider text-[var(--color-secondary)]/60">
                  Organisation / Business Name
                </label>
                <input value={ref.org} onChange={(e) => updateRef(i, "org", e.target.value)}
                  placeholder="e.g. Zambia Revenue Authority"
                  className="w-full border border-[var(--border)] rounded-xl px-3 py-2.5 text-[12px] font-semibold text-[var(--app-text)] bg-[var(--app-bg)] outline-none focus:border-[var(--app-text)] transition-all placeholder:text-[var(--color-secondary)]/30" />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-black uppercase tracking-wider text-[var(--color-secondary)]/60">
                  Project / Work Done
                </label>
                <input value={ref.project} onChange={(e) => updateRef(i, "project", e.target.value)}
                  placeholder="e.g. Tax Compliance Project"
                  className="w-full border border-[var(--border)] rounded-xl px-3 py-2.5 text-[12px] font-semibold text-[var(--app-text)] bg-[var(--app-bg)] outline-none focus:border-[var(--app-text)] transition-all placeholder:text-[var(--color-secondary)]/30" />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-black uppercase tracking-wider text-[var(--color-secondary)]/60">
                  Phone Number <span className="text-[var(--color-secondary)]/40">(Optional)</span>
                </label>
                <input value={ref.phone} onChange={(e) => updateRef(i, "phone", e.target.value)}
                  placeholder="e.g. +260 211 382 000" type="tel"
                  className="w-full border border-[var(--border)] rounded-xl px-3 py-2.5 text-[12px] font-semibold text-[var(--app-text)] bg-[var(--app-bg)] outline-none focus:border-[var(--app-text)] transition-all placeholder:text-[var(--color-secondary)]/30" />
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {references.length < 5 && (
          <button onClick={addRef}
            className="w-full py-3.5 rounded-2xl border-2 border-dashed border-[var(--border)] text-[10px] font-black uppercase tracking-widest text-[var(--color-secondary)]/50 flex items-center justify-center gap-2 active:scale-95 transition-all hover:border-[var(--color-primary)]/40 hover:text-[var(--color-primary)]">
            <Plus size={14} strokeWidth={2.5} /> Add Another Reference
          </button>
        )}
      </div>

      <div className="px-5 pt-4 pb-8 space-y-2.5">
        <CtaButton onClick={() => navigate("/marketplace/list/visibility", { state: { ...state, references } })} disabled={!hasOne}>Continue to Payment</CtaButton>
        <button onClick={() => navigate("/marketplace/list/visibility", { state: { ...state, references: [] } })}
          className="w-full py-3 text-[10px] font-black uppercase tracking-widest text-[var(--color-secondary)]/50 active:scale-95 transition-all">
          Skip for now
        </button>
      </div>
    </div>
  );
}
