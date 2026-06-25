import { useState } from "react";
import { useNavigate } from "react-router";
import { Building2 } from "lucide-react";
import { PageHeader } from "../components/PageHeader";
import { CtaButton } from "../components/CtaButton";

const STEPS = 6;

export function ListBizInfo() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [regNumber, setRegNumber] = useState("");
  const [bizType, setBizType] = useState<"Sole Trader" | "Partnership" | "Limited Company" | "">("");

  const canContinue = name.trim() && bizType;

  return (
    <div className="w-full max-w-md mx-auto bg-transparent font-sans pb-24">
      <PageHeader title="LIST YOUR BUSINESS" subtitle="Step 1 of 6 — Business Identity" showBack />

      <div className="px-5 pt-5 space-y-5">
        <div className="flex gap-1.5">
          {Array.from({ length: STEPS }).map((_, i) => (
            <div key={i} className={`h-1.5 flex-1 rounded-full ${i === 0 ? "bg-[var(--color-primary)]" : "bg-[var(--border)]"}`} />
          ))}
        </div>

        <div className="flex items-start gap-3 bg-[var(--color-primary)]/8 border border-[var(--color-primary)]/20 rounded-2xl px-4 py-3">
          <Building2 size={16} className="text-[var(--color-primary)] shrink-0 mt-0.5" strokeWidth={2} />
          <p className="text-[11px] font-semibold text-[var(--color-secondary)]/70 leading-snug">
            Make your business discoverable to thousands of buyers. Listings appear under <span className="font-black text-[var(--app-text)]">Business Listings</span>.
          </p>
        </div>

        <div className="bg-[var(--app-bg)] border border-[var(--border)] rounded-2xl shadow-sm p-5 space-y-4">
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[var(--color-secondary)]/50">Business Identity</p>

          <div className="space-y-3">
            <div className="space-y-1">
              <label className="text-[10px] font-black uppercase tracking-wider text-[var(--color-secondary)]/60">Business Name <span className="text-[var(--color-primary)]">*</span></label>
              <input value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g. Lusaka Tech Hub Ltd"
                className="w-full border border-[var(--border)] rounded-xl px-4 py-3 text-[13px] font-semibold text-[var(--app-text)] bg-[var(--app-bg)] outline-none focus:border-[var(--app-text)] transition-all placeholder:text-[var(--color-secondary)]/30" />
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-black uppercase tracking-wider text-[var(--color-secondary)]/60">PACRA Registration Number <span className="text-[var(--color-secondary)]/40">(Optional)</span></label>
              <input value={regNumber} onChange={(e) => setRegNumber(e.target.value)} placeholder="e.g. 120241234567"
                className="w-full border border-[var(--border)] rounded-xl px-4 py-3 text-[13px] font-semibold text-[var(--app-text)] bg-[var(--app-bg)] outline-none focus:border-[var(--app-text)] transition-all placeholder:text-[var(--color-secondary)]/30" />
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-wider text-[var(--color-secondary)]/60">Business Type <span className="text-[var(--color-primary)]">*</span></label>
              <div className="grid grid-cols-2 gap-2">
                {(["Sole Trader", "Partnership", "Limited Company"] as const).map((t) => (
                  <button key={t} onClick={() => setBizType(t)}
                    className={`py-3 px-3 rounded-xl border text-[10px] font-black uppercase tracking-wide transition-all ${bizType === t ? "border-[var(--color-primary)] bg-[var(--color-primary)]/10 text-[var(--color-primary)]" : "border-[var(--border)] text-[var(--color-secondary)]/60"}`}>
                    {t}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="px-5 pt-4 pb-8">
        <CtaButton onClick={() => navigate("/marketplace/list/category", { state: { name, regNumber, bizType } })} disabled={!canContinue}>Continue</CtaButton>
      </div>
    </div>
  );
}
