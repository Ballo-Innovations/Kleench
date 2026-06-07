import { useState } from "react";
import { useNavigate, useLocation } from "react-router";
import { motion } from "motion/react";
import { ArrowRight, MapPin } from "lucide-react";
import { PageHeader } from "../components/PageHeader";

export function ListPriorityLocation() {
  const navigate = useNavigate();
  const { state } = useLocation();

  const [headOffice, setHeadOffice] = useState("");
  const [countries, setCountries] = useState("");
  const [website, setWebsite] = useState("");
  const [email, setEmail] = useState("");

  const canContinue = headOffice.trim().length >= 2;

  return (
    <div className="w-full max-w-md mx-auto min-h-screen bg-transparent font-sans pb-32">
      <PageHeader title="LIST YOUR BUSINESS" subtitle="Step 6 — Business Location" showBack />

      <div className="px-5 pt-5 space-y-5">
        <div className="flex gap-1.5">
          {Array.from({ length: 10 }).map((_, i) => (
            <div key={i} className={`h-1.5 flex-1 rounded-full ${i < 6 ? "bg-[var(--color-primary)]" : "bg-[var(--border)]"}`} />
          ))}
        </div>

        <div className="flex items-start gap-3 bg-[var(--color-secondary)]/8 border border-[var(--color-secondary)]/20 rounded-2xl px-4 py-3">
          <MapPin size={15} className="text-[var(--color-secondary)] shrink-0 mt-0.5" strokeWidth={2} />
          <p className="text-[11px] font-semibold text-[var(--color-secondary)]/70 leading-snug">
            Priority listings include full location details and contact info — helping buyers and partners find you faster.
          </p>
        </div>

        <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}
          className="bg-[var(--app-bg)] border border-[var(--border)] rounded-2xl shadow-sm p-5 space-y-4">
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[var(--color-secondary)]/50">Location & Contact</p>

          <div className="space-y-1">
            <label className="text-[10px] font-black uppercase tracking-wider text-[var(--color-secondary)]/60">
              Head Office Address <span className="text-[var(--color-primary)]">*</span>
            </label>
            <input value={headOffice} onChange={(e) => setHeadOffice(e.target.value)} placeholder="e.g. Plot 45, Cairo Road, Lusaka"
              className="w-full border border-[var(--border)] rounded-xl px-4 py-3 text-[13px] font-semibold text-[var(--app-text)] bg-[var(--app-bg)] outline-none focus:border-[var(--app-text)] transition-all placeholder:text-[var(--color-secondary)]/30" />
          </div>

          <div className="space-y-1">
            <label className="text-[10px] font-black uppercase tracking-wider text-[var(--color-secondary)]/60">Operating Countries <span className="text-[var(--color-secondary)]/40">(Optional)</span></label>
            <input value={countries} onChange={(e) => setCountries(e.target.value)} placeholder="e.g. Zambia, Zimbabwe, Malawi"
              className="w-full border border-[var(--border)] rounded-xl px-4 py-3 text-[13px] font-semibold text-[var(--app-text)] bg-[var(--app-bg)] outline-none focus:border-[var(--app-text)] transition-all placeholder:text-[var(--color-secondary)]/30" />
          </div>

          <div className="space-y-1">
            <label className="text-[10px] font-black uppercase tracking-wider text-[var(--color-secondary)]/60">Website <span className="text-[var(--color-secondary)]/40">(Optional)</span></label>
            <input value={website} onChange={(e) => setWebsite(e.target.value)} placeholder="e.g. www.yourbusiness.co.zm"
              className="w-full border border-[var(--border)] rounded-xl px-4 py-3 text-[13px] font-semibold text-[var(--app-text)] bg-[var(--app-bg)] outline-none focus:border-[var(--app-text)] transition-all placeholder:text-[var(--color-secondary)]/30" />
          </div>

          <div className="space-y-1">
            <label className="text-[10px] font-black uppercase tracking-wider text-[var(--color-secondary)]/60">Business Email <span className="text-[var(--color-secondary)]/40">(Optional)</span></label>
            <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="info@yourbusiness.co.zm" type="email"
              className="w-full border border-[var(--border)] rounded-xl px-4 py-3 text-[13px] font-semibold text-[var(--app-text)] bg-[var(--app-bg)] outline-none focus:border-[var(--app-text)] transition-all placeholder:text-[var(--color-secondary)]/30" />
          </div>
        </motion.div>
      </div>

      <div className="px-5 pt-4 pb-8">
        <button onClick={() => navigate("/marketplace/list/references", { state: { ...state, headOffice, countries, website, email } })}
          disabled={!canContinue}
          className="w-full py-4 rounded-2xl bg-[var(--color-secondary)] text-white font-black uppercase tracking-widest text-[12px] flex items-center justify-center gap-3 disabled:opacity-40 disabled:cursor-not-allowed active:scale-95 transition-all">
          Continue <ArrowRight size={18} />
        </button>
      </div>
    </div>
  );
}
