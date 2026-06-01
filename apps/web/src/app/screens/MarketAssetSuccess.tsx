import { useNavigate, useLocation } from "react-router";
import { motion } from "motion/react";
import { CheckCircle, Package, Home, ShieldCheck } from "lucide-react";
import { PageHeader } from "../components/PageHeader";

export function MarketAssetSuccess() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const orderId = `AST-ORD-${Date.now().toString().slice(-7)}`;
  const asset = state?.asset || { name: "Your Asset" };

  return (
    <div className="w-full max-w-md mx-auto min-h-screen bg-transparent font-sans pb-32">
      <PageHeader title="ORDER CONFIRMED!" showBack={false} />

      <div className="px-5 pt-8 space-y-6">
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", damping: 15, stiffness: 200 }}
          className="flex flex-col items-center gap-4 py-6"
        >
          <div className="w-24 h-24 rounded-full bg-[#059669]/12 border-[3px] border-[#059669] flex items-center justify-center shadow-[6px_6px_0_#059669]">
            <CheckCircle size={48} color="#059669" strokeWidth={2} />
          </div>
          <div className="text-center">
            <h2 className="text-2xl font-black text-[var(--app-text)] uppercase tracking-tighter">Order Confirmed!</h2>
            <p className="text-[12px] font-semibold text-[var(--color-secondary)]/60 mt-1">Your asset purchase is in progress</p>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
          className="bg-[var(--app-bg)] rounded-3xl border-[3px] border-[var(--app-text)] shadow-[6px_6px_0_var(--app-text)] overflow-hidden">
          <div className="bg-[var(--color-secondary)] px-5 py-3">
            <p className="text-[9px] font-black uppercase tracking-[0.3em] text-white/60">Order Details</p>
          </div>
          <div className="px-5 py-4 space-y-3">
            {[
              { label: "Order ID", value: orderId },
              { label: "Asset", value: asset.name },
              { label: "Deposit Paid", value: state?.deposit ? `K${Number(state.deposit).toLocaleString()}` : "—" },
              { label: "Escrow Status", value: "Funds Secured" },
              { label: "Next Step", value: "Asset Delivery" },
            ].map(({ label, value }) => (
              <div key={label} className="flex items-center justify-between py-2 border-b border-[var(--border)] last:border-0">
                <span className="text-[10px] font-black uppercase tracking-wide text-[var(--color-secondary)]/50">{label}</span>
                <span className={`text-[12px] font-bold ${label === "Escrow Status" ? "text-[#059669]" : "text-[var(--color-secondary)]"}`}>{value}</span>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }}
          className="bg-[#059669]/8 border-2 border-[#059669]/20 rounded-2xl p-4 flex gap-3">
          <ShieldCheck size={18} className="text-[#059669] shrink-0 mt-0.5" strokeWidth={2} />
          <p className="text-[11px] font-semibold text-[var(--color-secondary)]/70 leading-snug">
            Your deposit is held securely in escrow. You will be notified when the asset is ready for delivery. Payment is only released upon your confirmation.
          </p>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="space-y-3">
          <button onClick={() => navigate("/marketplace")}
            className="w-full py-4 rounded-2xl bg-[var(--color-secondary)] text-white font-black uppercase tracking-widest text-[12px] flex items-center justify-center gap-3 shadow-md active:scale-95 transition-all">
            <Package size={18} strokeWidth={2} />
            View Order
          </button>
          <button onClick={() => navigate("/")}
            className="w-full py-4 rounded-2xl border-2 border-[var(--border)] bg-[var(--app-bg)] text-[var(--color-secondary)] font-black uppercase tracking-widest text-[12px] flex items-center justify-center gap-3 active:scale-95 transition-all">
            <Home size={18} strokeWidth={2} />
            Back Home
          </button>
        </motion.div>
      </div>
    </div>
  );
}
