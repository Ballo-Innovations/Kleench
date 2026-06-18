import { useNavigate, useLocation } from "react-router";
import { motion } from "motion/react";
import { CheckCircle, Package, Home } from "lucide-react";
import { PageHeader } from "../components/PageHeader";
import { CtaButton } from "../components/CtaButton";

export function MarketOrderSuccess() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const orderId = `ORD-${Date.now().toString().slice(-8)}`;
  const product = state?.product || { title: "Your Order" };

  return (
    <div className="w-full max-w-md mx-auto bg-transparent font-sans pb-24">
      <PageHeader title="ORDER PLACED!" showBack={false} />

      <div className="px-5 pt-8 space-y-6">
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", damping: 15, stiffness: 200 }}
          className="flex flex-col items-center gap-4 py-6"
        >
          <div className="w-24 h-24 rounded-full bg-[var(--color-primary)]/12 border-[3px] border-[var(--color-primary)] flex items-center justify-center shadow-[6px_6px_0_var(--color-primary)]">
            <CheckCircle size={48} color="var(--color-primary)" strokeWidth={2} />
          </div>
          <div className="text-center">
            <h2 className="text-2xl font-black text-[var(--app-text)] uppercase tracking-tighter">Order Confirmed!</h2>
            <p className="text-[12px] font-semibold text-[var(--color-secondary)]/60 mt-1">Your order is being processed</p>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
          className="bg-[var(--app-bg)] rounded-3xl border-[3px] border-[var(--app-text)] shadow-[6px_6px_0_var(--app-text)] overflow-hidden">
          <div className="bg-[var(--color-secondary)] px-5 py-3">
            <p className="text-[9px] font-black uppercase tracking-[0.3em] text-white/60">Confirmation Details</p>
          </div>
          <div className="px-5 py-4 space-y-3">
            {[
              { label: "Order ID", value: orderId },
              { label: "Product", value: product.title },
              { label: "Total Paid", value: state?.total ? `K${Number(state.total).toFixed(2)}` : "—" },
              { label: "Delivery", value: state?.delivery === "pickup" ? "Pickup" : state?.delivery === "courier" ? "Courier (3–5 days)" : "KLeench (1–2 days)" },
              { label: "Status", value: "Confirmed" },
            ].map(({ label, value }) => (
              <div key={label} className="flex items-center justify-between py-2 border-b border-[var(--border)] last:border-0">
                <span className="text-[10px] font-black uppercase tracking-wide text-[var(--color-secondary)]/50">{label}</span>
                <span className={`text-[12px] font-bold ${label === "Status" ? "text-[#059669]" : "text-[var(--color-secondary)]"}`}>{value}</span>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="space-y-3">
          <CtaButton onClick={() => navigate("/marketplace")}><Package size={18} strokeWidth={2} /> View Order</CtaButton>
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
