import { useNavigate, useLocation, useParams } from "react-router";
import { motion } from "motion/react";
import { CheckCircle, ArrowRight, Shield, Home } from "lucide-react";
import { PageHeader } from "../components/PageHeader";

export function MarketServicePayment() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { state } = useLocation();

  const pkg = state?.selectedPackage || { name: "Standard", price: 6000 };
  const depositPct = 0.3;
  const deposit = Math.round(pkg.price * depositPct);
  const balance = pkg.price - deposit;
  const booking = state?.booking || {};

  return (
    <div className="w-full max-w-md mx-auto bg-transparent font-sans pb-24">
      <PageHeader title="PAYMENT" showBack />

      <div className="px-5 pt-5 space-y-5">
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
          className="bg-[var(--app-bg)] rounded-3xl border-[3px] border-[var(--app-text)] shadow-[6px_6px_0_var(--app-text)] overflow-hidden">
          <div className="bg-[var(--color-secondary)] px-5 py-3">
            <p className="text-[9px] font-black uppercase tracking-[0.3em] text-white/60">Booking Summary</p>
          </div>
          <div className="px-5 py-4 space-y-0">
            {[
              { label: "Package", value: pkg.name },
              { label: "Total Value", value: `K${(pkg.price || 0).toLocaleString()}` },
              { label: "Event Date", value: booking.date || "—" },
              { label: "Guests", value: booking.guests || "1" },
            ].map(({ label, value }) => (
              <div key={label} className="flex items-center justify-between py-3 border-b border-[var(--border)] last:border-0">
                <span className="text-[10px] font-black uppercase tracking-wide text-[var(--color-secondary)]/50">{label}</span>
                <span className="text-[12px] font-bold text-[var(--color-secondary)]">{value}</span>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
          className="bg-[var(--app-bg)] rounded-3xl border-[3px] border-[var(--app-text)] shadow-[6px_6px_0_var(--app-text)] p-5 space-y-4">
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[var(--color-secondary)]/50">Payment Breakdown</p>

          <div className="bg-[var(--color-primary)]/8 border border-[var(--color-primary)]/20 rounded-2xl p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[12px] font-black text-[var(--app-text)] uppercase tracking-wide">Deposit Now (30%)</p>
                <p className="text-[10px] font-semibold text-[var(--color-secondary)]/50">Required to confirm booking</p>
              </div>
              <p className="text-[22px] font-black text-[var(--color-primary)]">K{deposit.toLocaleString()}</p>
            </div>
          </div>

          <div className="flex items-center justify-between px-4 py-3 bg-[var(--border)]/30 rounded-xl">
            <div>
              <p className="text-[11px] font-black text-[var(--app-text)] uppercase tracking-wide">Balance on Day</p>
              <p className="text-[10px] font-semibold text-[var(--color-secondary)]/50">Paid on event day</p>
            </div>
            <p className="text-[16px] font-black text-[var(--color-secondary)]">K{balance.toLocaleString()}</p>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
          className="bg-[#059669]/8 border-2 border-[#059669]/20 rounded-2xl p-4 flex gap-3">
          <Shield size={18} className="text-[#059669] shrink-0 mt-0.5" strokeWidth={2} />
          <p className="text-[11px] font-semibold text-[var(--color-secondary)]/70 leading-snug">
            Your deposit is held securely by <span className="font-black text-[var(--app-text)]">KLeench Escrow</span>. It is only released to the provider after successful delivery.
          </p>
        </motion.div>
      </div>

      <div className="px-5 pt-4 pb-8 space-y-3">
        <button
          onClick={() => navigate("/marketplace/order/success", { state: { ...state, orderType: "service", total: deposit } })}
          className="w-full py-4 rounded-2xl bg-[var(--color-primary)] text-white font-black uppercase tracking-widest text-[12px] flex items-center justify-center gap-3 shadow-md active:scale-95 transition-all"
        >
          Pay Deposit — K{deposit.toLocaleString()} <ArrowRight size={18} />
        </button>
        <button onClick={() => navigate("/")}
          className="w-full py-4 rounded-2xl border-2 border-[var(--border)] bg-[var(--app-bg)] text-[var(--color-secondary)] font-black uppercase tracking-widest text-[12px] flex items-center justify-center gap-3 active:scale-95 transition-all">
          <Home size={18} strokeWidth={2} />
          Cancel
        </button>
      </div>
    </div>
  );
}
