import { useState } from "react";
import { useNavigate, useLocation } from "react-router";
import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { PageHeader } from "../components/PageHeader";
import { FileUploadZone, UploadedFile } from "../components/FileUploadZone";

const AGENT_LABEL: Record<string, string> = {
  onboarding: "Onboarding Agent",
  dealer: "Dealer Agent",
  advertising: "Advertising Agent",
  general: "General Agent",
};

export function AgentInfo() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const agentLabel = AGENT_LABEL[state?.agentType] || "Agent";

  const [entityType, setEntityType] = useState<"individual" | "company" | "">("");
  const [bizType, setBizType] = useState("");
  const [experience, setExperience] = useState("");
  const [agentCode, setAgentCode] = useState("");
  const [licenseFiles, setLicenseFiles] = useState<UploadedFile[]>([]);

  const canContinue = entityType && experience;

  return (
    <div className="w-full max-w-md mx-auto min-h-screen bg-transparent font-sans pb-32">
      <PageHeader title="REGISTER AGENT" subtitle={`Step 2 — Agent Information (${agentLabel})`} showBack />

      <div className="px-5 pt-5 space-y-5">
        <div className="flex gap-1.5">
          {Array.from({ length: 4 }).map((_, i) => (
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
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[var(--color-secondary)]/50">Details</p>

          {entityType === "company" && (
            <div className="space-y-1">
              <label className="text-[10px] font-black uppercase tracking-wider text-[var(--color-secondary)]/60">Business Type</label>
              <input value={bizType} onChange={(e) => setBizType(e.target.value)} placeholder="e.g. Marketing Agency"
                className="w-full border border-[var(--border)] rounded-xl px-4 py-3 text-[13px] font-semibold text-[var(--app-text)] bg-[var(--app-bg)] outline-none focus:border-[var(--app-text)] transition-all placeholder:text-[var(--color-secondary)]/30" />
            </div>
          )}

          <div className="space-y-1">
            <label className="text-[10px] font-black uppercase tracking-wider text-[var(--color-secondary)]/60">
              Years of Experience <span className="text-[var(--color-primary)]">*</span>
            </label>
            <div className="flex flex-wrap gap-2">
              {["0-1 years", "1-3 years", "3-5 years", "5+ years"].map((e) => (
                <button key={e} onClick={() => setExperience(e)}
                  className={`px-3 py-1.5 rounded-xl border text-[10px] font-black uppercase tracking-wide transition-all ${experience === e ? "border-[var(--color-primary)] bg-[var(--color-primary)]/10 text-[var(--color-primary)]" : "border-[var(--border)] text-[var(--color-secondary)]/60"}`}>
                  {e}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-[10px] font-black uppercase tracking-wider text-[var(--color-secondary)]/60">Referral / Agent Code <span className="text-[var(--color-secondary)]/40">(Optional)</span></label>
            <input value={agentCode} onChange={(e) => setAgentCode(e.target.value)} placeholder="e.g. KL-AG-2024"
              className="w-full border border-[var(--border)] rounded-xl px-4 py-3 text-[13px] font-semibold text-[var(--app-text)] bg-[var(--app-bg)] outline-none focus:border-[var(--app-text)] transition-all placeholder:text-[var(--color-secondary)]/30" />
          </div>

          <FileUploadZone
            label="License / Certificate"
            accept=".pdf,image/*"
            multiple={false}
            hint="Optional"
            onFilesChange={setLicenseFiles}
          />
        </motion.div>
      </div>

      <div className="px-5 pt-4 pb-8">
        <button onClick={() => navigate("/marketplace/agent/terms", { state: { ...state, entityType, bizType, experience, agentCode, license: licenseFiles[0] ? { name: licenseFiles[0].file.name, size: licenseFiles[0].file.size, preview: licenseFiles[0].preview } : null } })}
          disabled={!canContinue}
          className="w-full py-4 rounded-2xl bg-[var(--color-secondary)] text-white font-black uppercase tracking-widest text-[12px] flex items-center justify-center gap-3 disabled:opacity-40 disabled:cursor-not-allowed active:scale-95 transition-all">
          Continue <ArrowRight size={18} />
        </button>
      </div>
    </div>
  );
}
