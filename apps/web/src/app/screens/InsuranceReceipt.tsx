import { useNavigate, useLocation } from "react-router";
import { motion } from "motion/react";
import { Download, Share2, Home, ShieldCheck } from "lucide-react";
import { PageHeader } from "../components/PageHeader";
import { toast } from "sonner";

const PLAN_PRICES: Record<string, string> = { basic: "ZMW 2,400", standard: "ZMW 4,800", premium: "ZMW 8,200" };

export function InsuranceReceipt() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const plan = state?.plan || "standard";
  const details = state?.vehicleDetails || {};
  const policyRef = `KL-INS-${Date.now().toString().slice(-8)}`;
  const today = new Date();
  const expiry = new Date(today);
  expiry.setFullYear(today.getFullYear() + 1);
  const fmt = (d: Date) => d.toLocaleDateString("en-ZM", { day: "2-digit", month: "short", year: "numeric" });

  return (
    <div className="w-full max-w-md mx-auto min-h-screen bg-transparent font-sans pb-36">
      <PageHeader title="POLICY RECEIPT" showBack />

      <div className="px-5 pt-6 space-y-4">
        {/* Receipt Card */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-[var(--app-bg)] rounded-3xl border-[3px] border-[var(--app-text)] shadow-[6px_6px_0_var(--app-text)] overflow-hidden"
        >
          {/* Receipt Header */}
          <div className="bg-[var(--color-secondary)] px-6 py-6 flex flex-col items-center text-white">
            <div className="w-14 h-14 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center mb-3">
              <ShieldCheck size={28} strokeWidth={1.5} className="text-white" />
            </div>
            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-white/60 mb-1">Insurance Policy</p>
            <h3 className="font-black text-[18px] uppercase tracking-tight">{(plan as string).charAt(0).toUpperCase() + (plan as string).slice(1)} Plan</h3>
            <div className="mt-3 px-4 py-1.5 bg-emerald-500 rounded-full">
              <span className="text-[10px] font-black uppercase tracking-widest">Active</span>
            </div>
          </div>

          {/* Receipt Body */}
          <div className="px-5 py-4 space-y-0">
            {[
              { label: "Policy Reference", value: policyRef },
              { label: "Policyholder", value: details.ownerName || "—" },
              { label: "Vehicle Reg.", value: details.regNumber || "—" },
              { label: "Vehicle", value: details.make && details.model ? `${details.make} ${details.model} (${details.year})` : "—" },
              { label: "Coverage", value: state?.coverage ? state.coverage.split("-").map((s: string) => s.charAt(0).toUpperCase() + s.slice(1)).join(" ") : "Comprehensive" },
              { label: "Commencement", value: fmt(today) },
              { label: "Expiry Date", value: fmt(expiry) },
            ].map(({ label, value }) => (
              <div key={label} className="flex items-center justify-between py-3 border-b border-[var(--border)] last:border-0">
                <span className="text-[10px] font-black uppercase tracking-wide text-[var(--color-secondary)]/50">{label}</span>
                <span className="text-[12px] font-bold text-[var(--color-secondary)] text-right max-w-[55%]">{value}</span>
              </div>
            ))}
          </div>

          {/* Receipt Footer */}
          <div className="mx-5 mb-5 bg-[var(--color-primary)]/8 border border-[var(--color-primary)]/20 rounded-2xl p-4 flex items-center justify-between">
            <span className="text-[11px] font-black uppercase tracking-wide text-[var(--color-secondary)]/60">Annual Premium</span>
            <span className="text-[20px] font-black text-[var(--color-primary)]">{PLAN_PRICES[plan] || "ZMW 4,800"}</span>
          </div>
        </motion.div>

        {/* Provider Info */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="bg-[var(--app-bg)] rounded-2xl border-2 border-[var(--border)] p-4 flex items-center gap-3"
        >
          <div className="w-10 h-10 rounded-xl bg-[var(--muted)] flex items-center justify-center">
            <ShieldCheck size={20} className="text-[var(--color-secondary)]/60" strokeWidth={1.5} />
          </div>
          <div>
            <p className="text-[11px] font-black uppercase tracking-wide text-[var(--color-secondary)] mb-0.5">Regulated by PIA Zambia</p>
            <p className="text-[10px] font-semibold text-[var(--color-secondary)]/50">Pensions and Insurance Authority · License No. PIA/2024/001</p>
          </div>
        </motion.div>

        {/* Actions */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="space-y-3"
        >
          <button
            onClick={() => toast.success("Receipt downloaded!")}
            className="w-full py-4 rounded-2xl bg-[var(--color-secondary)] text-white font-black uppercase tracking-widest text-[12px] flex items-center justify-center gap-3 shadow-md active:scale-95 transition-all"
          >
            <Download size={18} strokeWidth={2} />
            Download Receipt
          </button>
          <button
            onClick={() => toast.success("Sharing policy...")}
            className="w-full py-4 rounded-2xl border-2 border-[var(--color-primary)] bg-[var(--color-primary)]/5 text-[var(--color-primary)] font-black uppercase tracking-widest text-[12px] flex items-center justify-center gap-3 active:scale-95 transition-all"
          >
            <Share2 size={18} strokeWidth={2} />
            Share Policy
          </button>
          <button
            onClick={() => navigate("/")}
            className="w-full py-4 rounded-2xl border-2 border-[var(--border)] bg-[var(--app-bg)] text-[var(--color-secondary)] font-black uppercase tracking-widest text-[12px] flex items-center justify-center gap-3 active:scale-95 transition-all"
          >
            <Home size={18} strokeWidth={2} />
            Back Home
          </button>
        </motion.div>
      </div>
    </div>
  );
}
