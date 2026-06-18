import { useNavigate, useLocation } from "react-router";
import { motion } from "motion/react";
import { CheckCircle, ShieldCheck, Home } from "lucide-react";
import { CtaButton } from "../components/CtaButton";
import { PageHeader } from "../components/PageHeader";

const AGENT_LABEL: Record<string, string> = {
  onboarding: "Onboarding Agent",
  dealer: "Dealer Agent",
  advertising: "Advertising Agent",
  general: "General Agent",
};

export function AgentSuccess() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const agentLabel = AGENT_LABEL[state?.agentType] || "Agent";
  const agentId = `AGT-${Date.now().toString().slice(-6)}`;

  return (
    <div className="w-full max-w-md mx-auto bg-transparent font-sans pb-24">
      <PageHeader title="REGISTRATION COMPLETE" />

      <div className="px-5 pt-8 space-y-5">
        <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ type: "spring", stiffness: 200 }}
          className="flex flex-col items-center gap-3 py-6">
          <div className="w-20 h-20 rounded-full bg-[#059669]/15 flex items-center justify-center">
            <CheckCircle size={40} color="#059669" strokeWidth={1.5} />
          </div>
          <p className="text-[10px] font-black uppercase tracking-[0.3em] text-[#059669]">Agent Activated!</p>
          <p className="text-[22px] font-black text-[var(--app-text)] uppercase tracking-tight text-center leading-tight">{agentLabel}</p>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
          className="bg-[var(--app-bg)] border border-[var(--border)] rounded-2xl shadow-sm overflow-hidden">
          <div className="bg-[var(--color-secondary)] px-5 py-4">
            <p className="text-[9px] font-black uppercase tracking-[0.3em] text-white/50">Agent Reference</p>
            <p className="text-[18px] font-black text-white tracking-wider">{agentId}</p>
          </div>
          <div className="px-5 py-4">
            {[
              { label: "Agent Type", value: agentLabel },
              { label: "Entity", value: state?.entityType === "company" ? "Company" : "Individual" },
              { label: "Experience", value: state?.experience || "—" },
              { label: "Status", value: "Under Review" },
            ].map(({ label, value }) => (
              <div key={label} className="flex items-center justify-between py-2.5 border-b border-[var(--border)] last:border-0">
                <span className="text-[10px] font-black uppercase tracking-wide text-[var(--color-secondary)]/50">{label}</span>
                <span className={`text-[12px] font-bold ${label === "Status" ? "text-[var(--color-primary)]" : "text-[var(--color-secondary)]"}`}>{value}</span>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
          className="flex items-start gap-3 bg-[#059669]/8 border border-[#059669]/20 rounded-2xl px-4 py-3">
          <ShieldCheck size={15} className="text-[#059669] shrink-0 mt-0.5" strokeWidth={2} />
          <p className="text-[11px] font-semibold text-[var(--color-secondary)]/70 leading-snug">
            Your registration is under review. You will be notified within 48 hours once your agent account is approved.
          </p>
        </motion.div>
      </div>

      <div className="px-5 pt-4 pb-8">
        <CtaButton onClick={() => navigate("/")}><Home size={18} strokeWidth={2} /> Back Home</CtaButton>
      </div>
    </div>
  );
}
