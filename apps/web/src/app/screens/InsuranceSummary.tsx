import { useNavigate, useLocation } from "react-router";
import { motion } from "motion/react";
import { ShieldCheck, Car, User, ChevronRight, Edit2, CheckCircle } from "lucide-react";
import { PageHeader } from "../components/PageHeader";

const PLAN_PRICES: Record<string, string> = { basic: "ZMW 2,400", standard: "ZMW 4,800", premium: "ZMW 8,200" };

export function InsuranceSummary() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const details = state?.vehicleDetails || {};
  const plan = state?.plan || "standard";

  const SummaryRow = ({ label, value }: { label: string; value: string }) => (
    <div className="flex items-center justify-between py-2.5 border-b border-[var(--border)] last:border-0">
      <span className="text-[11px] font-black uppercase tracking-wide text-[var(--color-secondary)]/50">{label}</span>
      <span className="text-[12px] font-black text-[var(--color-secondary)]">{value || "—"}</span>
    </div>
  );

  return (
    <div className="w-full max-w-md mx-auto min-h-screen bg-transparent font-sans pb-36">
      <PageHeader title="REVIEW SUMMARY" subtitle="Step 5 of 5" showBack />

      <div className="px-5 pt-6 space-y-4">
        <div>
          <h2 className="font-black text-[20px] text-[var(--color-secondary)] uppercase tracking-tight mb-1">
            Policy Summary
          </h2>
          <p className="text-[12px] font-semibold text-[var(--color-secondary)]/50">
            Review your details before proceeding to payment.
          </p>
        </div>

        {/* Insurance Details Card */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-[var(--app-bg)] rounded-2xl border-2 border-[var(--border)] overflow-hidden shadow-sm"
        >
          <div className="flex items-center justify-between px-4 py-3 bg-[var(--color-secondary)] text-white">
            <div className="flex items-center gap-2">
              <ShieldCheck size={16} strokeWidth={2} />
              <span className="text-[11px] font-black uppercase tracking-widest">Insurance Details</span>
            </div>
            <button onClick={() => navigate(-4)} className="flex items-center gap-1 text-white/70 active:scale-90 transition-all">
              <Edit2 size={12} />
              <span className="text-[9px] font-black uppercase">Edit</span>
            </button>
          </div>
          <div className="px-4 py-1">
            <SummaryRow label="Type" value={state?.insuranceType ? state.insuranceType.charAt(0).toUpperCase() + state.insuranceType.slice(1) : "Motor"} />
            <SummaryRow label="Coverage" value={state?.coverage ? state.coverage.split("-").map((s: string) => s.charAt(0).toUpperCase() + s.slice(1)).join(" ") : "Comprehensive"} />
            <SummaryRow label="Plan" value={plan.charAt(0).toUpperCase() + plan.slice(1)} />
            <SummaryRow label="Annual Premium" value={PLAN_PRICES[plan] || "ZMW 4,800"} />
          </div>
        </motion.div>

        {/* Vehicle Details Card */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-[var(--app-bg)] rounded-2xl border-2 border-[var(--border)] overflow-hidden shadow-sm"
        >
          <div className="flex items-center justify-between px-4 py-3 bg-[var(--color-secondary)] text-white">
            <div className="flex items-center gap-2">
              <Car size={16} strokeWidth={2} />
              <span className="text-[11px] font-black uppercase tracking-widest">Vehicle Details</span>
            </div>
            <button onClick={() => navigate(-1)} className="flex items-center gap-1 text-white/70 active:scale-90 transition-all">
              <Edit2 size={12} />
              <span className="text-[9px] font-black uppercase">Edit</span>
            </button>
          </div>
          <div className="px-4 py-1">
            <SummaryRow label="Registration" value={details.regNumber} />
            <SummaryRow label="Make & Model" value={`${details.make} ${details.model}`} />
            <SummaryRow label="Year" value={details.year} />
            <SummaryRow label="Engine" value={details.engine ? `${details.engine} cc` : "—"} />
            <SummaryRow label="Usage" value={details.usage ? details.usage.charAt(0).toUpperCase() + details.usage.slice(1) : "Private"} />
          </div>
        </motion.div>

        {/* Owner Details Card */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="bg-[var(--app-bg)] rounded-2xl border-2 border-[var(--border)] overflow-hidden shadow-sm"
        >
          <div className="flex items-center justify-between px-4 py-3 bg-[var(--color-secondary)] text-white">
            <div className="flex items-center gap-2">
              <User size={16} strokeWidth={2} />
              <span className="text-[11px] font-black uppercase tracking-widest">Owner Details</span>
            </div>
          </div>
          <div className="px-4 py-1">
            <SummaryRow label="Full Name" value={details.ownerName} />
            <SummaryRow label="NRC Number" value={details.nrc} />
            <SummaryRow label="Phone" value={details.phone ? `+260 ${details.phone}` : "—"} />
          </div>
        </motion.div>

        {/* Assurance Card */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-emerald-50 border-2 border-emerald-200 rounded-2xl p-4 flex gap-3"
        >
          <CheckCircle size={20} className="text-emerald-500 shrink-0 mt-0.5" strokeWidth={2} />
          <div>
            <p className="text-[11px] font-black uppercase tracking-wide text-emerald-800 mb-1">Your Policy is Protected</p>
            <p className="text-[11px] font-semibold text-emerald-700/70 leading-snug">
              This policy is regulated by the Pensions and Insurance Authority of Zambia. Your coverage starts immediately after payment.
            </p>
          </div>
        </motion.div>
      </div>

      <div className="px-5 pt-2 pb-8">
        <div className="flex items-center justify-between mb-3">
          <span className="text-[11px] font-black uppercase tracking-wide text-[var(--color-secondary)]/50">Total Premium</span>
          <span className="text-[16px] font-black text-[var(--color-primary)]">{PLAN_PRICES[plan] || "ZMW 4,800"}/yr</span>
        </div>
        <button
          onClick={() => navigate("/insurance/payment", { state })}
          className="w-full py-4 rounded-2xl bg-[var(--color-primary)] text-white font-black uppercase tracking-widest text-[13px] flex items-center justify-center gap-3 shadow-[0_8px_20px_rgba(255,140,0,0.3)] active:scale-95 transition-all"
        >
          Proceed to Payment <ChevronRight size={18} strokeWidth={2.5} />
        </button>
      </div>
    </div>
  );
}
