import { useNavigate, useLocation } from "react-router";
import { motion } from "motion/react";
import { CheckCircle, ShieldCheck } from "lucide-react";
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
          <div className="w-20 h-20 rounded-full bg-[#059669] flex items-center justify-center shadow-lg">
            <CheckCircle size={40} color="white" strokeWidth={2} />
          </div>
          <div className="bg-[var(--color-secondary)] px-6 py-1.5 rounded-full">
            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-white">Registered</p>
          </div>
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
              { label: "Status", value: "Active" },
            ].map(({ label, value }) => (
              <div key={label} className="flex items-center justify-between py-2.5 border-b border-[var(--border)] last:border-0">
                <span className="text-[10px] font-black uppercase tracking-wide text-[var(--color-secondary)]/50">{label}</span>
                <span className={`text-[12px] font-bold ${label === "Status" ? "text-[var(--color-primary)]" : "text-[var(--color-secondary)]"}`}>{value}</span>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
          className="bg-[var(--app-bg)] border border-[var(--border)] rounded-2xl shadow-sm p-5 text-center space-y-1">
          <p className="text-[9px] font-black uppercase tracking-[0.3em] text-[var(--color-secondary)]/50">Earnings</p>
          <p className="text-[28px] font-black text-[var(--app-text)]">K0.00</p>
          <p className="text-[10px] font-semibold text-[var(--color-secondary)]/50">Start earning by onboarding users and completing transactions</p>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }}
          className="flex items-start gap-3 bg-[#059669]/8 border border-[#059669]/20 rounded-2xl px-4 py-3">
          <ShieldCheck size={15} className="text-[#059669] shrink-0 mt-0.5" strokeWidth={2} />
          <p className="text-[11px] font-semibold text-[var(--color-secondary)]/70 leading-snug">
            Your agent account is now active. You can start creating listings, managing campaigns, and earning commissions.
          </p>
        </motion.div>
      </div>

      <div className="px-5 pt-4 pb-8 space-y-3">
        <CtaButton onClick={() => navigate("/marketplace/agent")}>Get Started</CtaButton>
        <button onClick={() => navigate("/")}
          className="w-full py-4 rounded-2xl border border-[var(--border)] bg-[var(--app-bg)] text-[var(--color-secondary)] font-black uppercase tracking-widest text-[12px] flex items-center justify-center active:scale-95 transition-all">
          Return to Home Page
        </button>
      </div>
    </div>
  );
}
