import { useNavigate, useLocation } from "react-router";
import { motion } from "motion/react";
import { CheckCircle, FileText, Home } from "lucide-react";
import { CtaButton } from "../components/CtaButton";
import { PageHeader } from "../components/PageHeader";

const PLAN_PRICES: Record<string, string> = { basic: "ZMW 2,400", standard: "ZMW 4,800", premium: "ZMW 8,200" };

export function InsurancePayment() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const plan = state?.plan || "standard";
  const policyRef = `KL-INS-${Date.now().toString().slice(-8)}`;
  const today = new Date();
  const expiry = new Date(today);
  expiry.setFullYear(today.getFullYear() + 1);
  const fmt = (d: Date) => d.toLocaleDateString("en-ZM", { day: "2-digit", month: "short", year: "numeric" });

  return (
    <div className="w-full max-w-md mx-auto bg-transparent font-sans">
      <PageHeader title="PAYMENT DONE" showBack />

      <div className="px-5 pt-10 pb-36 flex flex-col items-center space-y-6">
        {/* Success Badge */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", bounce: 0.45, delay: 0.1 }}
          className="relative"
        >
          <div className="w-28 h-28 rounded-full bg-emerald-500 flex items-center justify-center shadow-[0_0_40px_rgba(34,197,94,0.4)]">
            <CheckCircle size={56} className="text-white" strokeWidth={1.5} />
          </div>
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.5, type: "spring", bounce: 0.6 }}
            className="absolute -top-2 -right-2 w-10 h-10 bg-[var(--color-primary)] rounded-full border-4 border-[var(--app-bg)] flex items-center justify-center"
          >
            <span className="text-white text-[14px]">✓</span>
          </motion.div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="text-center">
          <h2 className="font-black text-[24px] text-[var(--color-secondary)] uppercase tracking-tight mb-2">Payment Successful!</h2>
          <p className="text-[13px] font-semibold text-[var(--color-secondary)]/50">Your insurance policy is now active.</p>
        </motion.div>

        {/* Payment Metadata */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45 }}
          className="w-full bg-[var(--app-bg)] rounded-2xl border-2 border-[var(--border)] overflow-hidden shadow-sm"
        >
          <div className="px-4 py-3 bg-[var(--color-secondary)] text-white">
            <span className="text-[10px] font-black uppercase tracking-[0.2em]">Policy Information</span>
          </div>
          {[
            { label: "Policy Reference", value: policyRef },
            { label: "Plan", value: (plan as string).charAt(0).toUpperCase() + (plan as string).slice(1) + " Plan" },
            { label: "Amount Paid", value: PLAN_PRICES[plan] || "ZMW 4,800" },
            { label: "Start Date", value: fmt(today) },
            { label: "Expiry Date", value: fmt(expiry) },
            { label: "Status", value: "Active ✓" },
          ].map(({ label, value }) => (
            <div key={label} className="flex items-center justify-between px-4 py-2.5 border-b border-[var(--border)] last:border-0">
              <span className="text-[10px] font-black uppercase tracking-wide text-[var(--color-secondary)]/50">{label}</span>
              <span className={`text-[12px] font-black ${label === "Status" ? "text-emerald-500" : "text-[var(--color-secondary)]"}`}>{value}</span>
            </div>
          ))}
        </motion.div>

        {/* CTA Buttons */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }} className="w-full space-y-3">
          <CtaButton onClick={() => navigate("/insurance/receipt", { state })}><FileText size={18} strokeWidth={2} /> View Policy Receipt</CtaButton>
          <button
            onClick={() => navigate("/")}
            className="w-full py-4 rounded-2xl border-2 border-[var(--border)] bg-[var(--app-bg)] text-[var(--color-secondary)] font-black uppercase tracking-widest text-[12px] flex items-center justify-center gap-3 active:scale-95 transition-all"
          >
            <Home size={18} strokeWidth={2} />
            Go Home
          </button>
        </motion.div>
      </div>
    </div>
  );
}
