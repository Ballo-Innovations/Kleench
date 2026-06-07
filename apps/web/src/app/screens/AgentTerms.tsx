import { useState } from "react";
import { useNavigate, useLocation } from "react-router";
import { motion } from "motion/react";
import { ArrowRight, FileText } from "lucide-react";
import { PageHeader } from "../components/PageHeader";

const TERMS = [
  "I agree to act as a representative of KLeench in good faith and within the law.",
  "I will not engage in fraudulent, misleading, or deceptive practices.",
  "I understand that my agent status may be suspended or revoked for violations of these terms.",
  "I consent to KLeench collecting and processing my registration data.",
  "I will maintain confidentiality of client information shared with me in my agent capacity.",
];

export function AgentTerms() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const isSpecialized = state?.agentType === "specialized";
  const successPath = isSpecialized ? "/marketplace/agent/specialized/success" : "/marketplace/agent/success";
  const currentStep = isSpecialized ? 6 : 3;
  const totalSteps = isSpecialized ? 7 : 4;

  const [agreed, setAgreed] = useState(false);

  return (
    <div className="w-full max-w-md mx-auto min-h-screen bg-transparent font-sans pb-32">
      <PageHeader title="REGISTER AGENT" subtitle={`Step ${currentStep} — Terms & Conditions`} showBack />

      <div className="px-5 pt-5 space-y-5">
        <div className="flex gap-1.5">
          {Array.from({ length: totalSteps }).map((_, i) => (
            <div key={i} className={`h-1.5 flex-1 rounded-full ${i < currentStep ? "bg-[var(--color-primary)]" : "bg-[var(--border)]"}`} />
          ))}
        </div>

        <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}
          className="bg-[var(--app-bg)] border border-[var(--border)] rounded-2xl shadow-sm p-5 space-y-4">
          <div className="flex items-center gap-2.5">
            <FileText size={16} className="text-[var(--color-secondary)]" strokeWidth={1.5} />
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[var(--color-secondary)]/50">Agent Agreement</p>
          </div>

          <div className="space-y-3">
            {TERMS.map((term, i) => (
              <div key={i} className="flex items-start gap-3 py-2.5 border-b border-[var(--border)] last:border-0">
                <div className="w-5 h-5 rounded-full bg-[var(--color-secondary)]/10 flex items-center justify-center shrink-0 mt-0.5">
                  <span className="text-[8px] font-black text-[var(--color-secondary)]">{i + 1}</span>
                </div>
                <p className="text-[11px] font-semibold text-[var(--color-secondary)]/70 leading-snug">{term}</p>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.button initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}
          onClick={() => setAgreed(!agreed)}
          className={`w-full flex items-center gap-3 p-4 rounded-2xl border transition-all text-left ${agreed ? "border-[var(--color-primary)] bg-[var(--color-primary)]/6" : "border-[var(--border)] bg-[var(--app-bg)]"}`}>
          <div className={`w-5 h-5 rounded border-2 flex items-center justify-center shrink-0 transition-all ${agreed ? "border-[var(--color-primary)] bg-[var(--color-primary)]" : "border-[var(--border)]"}`}>
            {agreed && <svg width="10" height="8" viewBox="0 0 10 8" fill="none"><path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>}
          </div>
          <p className="text-[11px] font-bold text-[var(--app-text)]">I have read and agree to the KLeench Agent Terms and Conditions</p>
        </motion.button>
      </div>

      <div className="px-5 pt-4 pb-8">
        <button onClick={() => navigate(successPath, { state: { ...state, agreedTerms: true } })}
          disabled={!agreed}
          className="w-full py-4 rounded-2xl bg-[var(--color-secondary)] text-white font-black uppercase tracking-widest text-[12px] flex items-center justify-center gap-3 disabled:opacity-40 disabled:cursor-not-allowed active:scale-95 transition-all">
          Submit Registration <ArrowRight size={18} />
        </button>
      </div>
    </div>
  );
}
