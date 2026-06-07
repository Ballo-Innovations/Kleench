import { useState } from "react";
import { useNavigate, useLocation } from "react-router";
import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { PageHeader } from "../components/PageHeader";

export function AgentSpecializedInfo() {
  const navigate = useNavigate();
  const { state } = useLocation();

  const [entityType, setEntityType] = useState<"individual" | "company" | "">("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [province, setProvince] = useState("");

  const PROVINCES = ["Lusaka", "Copperbelt", "Eastern", "Southern", "Western", "Northern", "North-Western", "Luapula", "Muchinga", "Central"];

  const canContinue = entityType && name.trim() && province;

  return (
    <div className="w-full max-w-md mx-auto min-h-screen bg-transparent font-sans pb-32">
      <PageHeader title="SPECIALIZED AGENT" subtitle="Step 2 — Agent Information" showBack />

      <div className="px-5 pt-5 space-y-5">
        <div className="flex gap-1.5">
          {Array.from({ length: 7 }).map((_, i) => (
            <div key={i} className={`h-1.5 flex-1 rounded-full ${i < 2 ? "bg-[var(--color-primary)]" : "bg-[var(--border)]"}`} />
          ))}
        </div>

        <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}
          className="bg-[var(--app-bg)] border border-[var(--border)] rounded-2xl shadow-sm p-5 space-y-4">
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[var(--color-secondary)]/50">Entity Type</p>
          <div className="grid grid-cols-2 gap-2.5">
            {(["individual", "company"] as const).map((t) => (
              <button key={t} onClick={() => setEntityType(t)}
                className={`py-3.5 px-3 rounded-xl border text-[11px] font-black uppercase tracking-wide transition-all capitalize ${entityType === t ? "border-[var(--color-primary)] bg-[var(--color-primary)]/10 text-[var(--color-primary)]" : "border-[var(--border)] text-[var(--color-secondary)]/60"}`}>
                {t}
              </button>
            ))}
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
          className="bg-[var(--app-bg)] border border-[var(--border)] rounded-2xl shadow-sm p-5 space-y-4">
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[var(--color-secondary)]/50">Contact Details</p>

          <div className="space-y-1">
            <label className="text-[10px] font-black uppercase tracking-wider text-[var(--color-secondary)]/60">
              {entityType === "company" ? "Company Name" : "Full Name"} <span className="text-[var(--color-primary)]">*</span>
            </label>
            <input value={name} onChange={(e) => setName(e.target.value)} placeholder={entityType === "company" ? "e.g. Zambia Data Corp Ltd" : "e.g. Mwansa Tembo"}
              className="w-full border border-[var(--border)] rounded-xl px-4 py-3 text-[13px] font-semibold text-[var(--app-text)] bg-[var(--app-bg)] outline-none focus:border-[var(--app-text)] transition-all placeholder:text-[var(--color-secondary)]/30" />
          </div>

          <div className="space-y-1">
            <label className="text-[10px] font-black uppercase tracking-wider text-[var(--color-secondary)]/60">Phone Number <span className="text-[var(--color-secondary)]/40">(Optional)</span></label>
            <input value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+260 97X XXX XXX" type="tel"
              className="w-full border border-[var(--border)] rounded-xl px-4 py-3 text-[13px] font-semibold text-[var(--app-text)] bg-[var(--app-bg)] outline-none focus:border-[var(--app-text)] transition-all placeholder:text-[var(--color-secondary)]/30" />
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-wider text-[var(--color-secondary)]/60">Base Province <span className="text-[var(--color-primary)]">*</span></label>
            <div className="flex flex-wrap gap-2">
              {PROVINCES.map((p) => (
                <button key={p} onClick={() => setProvince(p)}
                  className={`px-3 py-1.5 rounded-xl border text-[10px] font-black uppercase tracking-wide transition-all ${province === p ? "border-[var(--color-primary)] bg-[var(--color-primary)]/10 text-[var(--color-primary)]" : "border-[var(--border)] text-[var(--color-secondary)]/60"}`}>
                  {p}
                </button>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      <div className="px-5 pt-4 pb-8">
        <button onClick={() => navigate("/marketplace/agent/specialized/data", { state: { ...state, entityType, name, phone, province } })}
          disabled={!canContinue}
          className="w-full py-4 rounded-2xl bg-[var(--color-secondary)] text-white font-black uppercase tracking-widest text-[12px] flex items-center justify-center gap-3 disabled:opacity-40 disabled:cursor-not-allowed active:scale-95 transition-all">
          Continue <ArrowRight size={18} />
        </button>
      </div>
    </div>
  );
}
