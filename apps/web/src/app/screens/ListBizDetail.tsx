import { useState } from "react";
import { useNavigate, useLocation } from "react-router";
import { motion } from "motion/react";
import { PageHeader } from "../components/PageHeader";
import { CtaButton } from "../components/CtaButton";

export function ListBizDetail() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const isPriority = state?.listingType === "priority";
  const totalSteps = isPriority ? 10 : 8;

  const [bizName, setBizName] = useState("");
  const [tagline, setTagline] = useState("");
  const [desc, setDesc] = useState("");

  const canContinue = bizName.trim().length >= 2 && desc.trim().length >= 10;
  const nextPath = isPriority ? "/marketplace/list/location" : "/marketplace/list/showcase";

  return (
    <div className="w-full max-w-md mx-auto bg-transparent font-sans pb-24">
      <PageHeader title="LIST YOUR BUSINESS" subtitle="Step 5 — Business Details" showBack />

      <div className="px-5 pt-5 space-y-5">
        <div className="flex gap-1.5">
          {Array.from({ length: totalSteps }).map((_, i) => (
            <div key={i} className={`h-1.5 flex-1 rounded-full ${i < 5 ? "bg-[var(--color-primary)]" : "bg-[var(--border)]"}`} />
          ))}
        </div>

        <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}
          className="bg-[var(--app-bg)] border border-[var(--border)] rounded-2xl shadow-sm p-5 space-y-4">
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[var(--color-secondary)]/50">Business Identity</p>

          <div className="space-y-1">
            <label className="text-[10px] font-black uppercase tracking-wider text-[var(--color-secondary)]/60">
              Business Name <span className="text-[var(--color-primary)]">*</span>
            </label>
            <input value={bizName} onChange={(e) => setBizName(e.target.value)} placeholder="e.g. Lusaka Tech Hub Ltd"
              className="w-full border border-[var(--border)] rounded-xl px-4 py-3 text-[13px] font-semibold text-[var(--app-text)] bg-[var(--app-bg)] outline-none focus:border-[var(--app-text)] transition-all placeholder:text-[var(--color-secondary)]/30" />
          </div>

          <div className="space-y-1">
            <label className="text-[10px] font-black uppercase tracking-wider text-[var(--color-secondary)]/60">Tagline <span className="text-[var(--color-secondary)]/40">(Optional)</span></label>
            <input value={tagline} onChange={(e) => setTagline(e.target.value)} placeholder="e.g. Innovation at the heart of Lusaka"
              className="w-full border border-[var(--border)] rounded-xl px-4 py-3 text-[13px] font-semibold text-[var(--app-text)] bg-[var(--app-bg)] outline-none focus:border-[var(--app-text)] transition-all placeholder:text-[var(--color-secondary)]/30" />
          </div>

          <div className="space-y-1">
            <label className="text-[10px] font-black uppercase tracking-wider text-[var(--color-secondary)]/60">
              Description <span className="text-[var(--color-primary)]">*</span>
            </label>
            <textarea value={desc} onChange={(e) => setDesc(e.target.value)} placeholder="Describe your business, what you offer and who you serve..." rows={4}
              className="w-full border border-[var(--border)] rounded-xl px-4 py-3 text-[13px] font-semibold text-[var(--app-text)] bg-[var(--app-bg)] outline-none focus:border-[var(--app-text)] transition-all placeholder:text-[var(--color-secondary)]/30 resize-none" />
            <p className="text-[9px] font-semibold text-[var(--color-secondary)]/40 text-right">{desc.length} chars</p>
          </div>
        </motion.div>
      </div>

      <div className="px-5 pt-4 pb-8">
        <CtaButton onClick={() => navigate(nextPath, { state: { ...state, bizName, tagline, desc } })} disabled={!canContinue}>Continue</CtaButton>
      </div>
    </div>
  );
}
