import { useNavigate, useLocation } from "react-router";
import { motion } from "motion/react";
import { CheckCircle } from "lucide-react";
import { PageHeader } from "../../components/PageHeader";
import { CtaButton } from "../../components/CtaButton";

const CONFETTI = [
  { c: "#FF8C00", x: "12%", y: "18%" }, { c: "#059669", x: "82%", y: "14%" },
  { c: "#3B82F6", x: "24%", y: "40%" }, { c: "#EAB308", x: "70%", y: "38%" },
  { c: "#DC2626", x: "44%", y: "10%" }, { c: "#7C3AED", x: "88%", y: "46%" },
  { c: "#FF8C00", x: "8%", y: "52%" }, { c: "#059669", x: "60%", y: "54%" },
];

export function WindowSuccess() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const orderId = state?.orderId || `Ord-${new Date().getFullYear()}-00045876`;
  const total = state?.total;

  return (
    <div className="w-full max-w-md mx-auto bg-transparent font-sans pb-24">
      <PageHeader title="ORDER PLACED" showBack={false} />

      <div className="px-5 pt-10 space-y-6">
        <motion.div initial={{ scale: 0.6, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ type: "spring", damping: 14, stiffness: 200 }}
          className="relative flex flex-col items-center gap-5 py-6">
          {/* Confetti */}
          {CONFETTI.map((p, i) => (
            <motion.span key={i} initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.2 + i * 0.05 }}
              className="absolute w-2.5 h-2.5 rounded-sm" style={{ backgroundColor: p.c, left: p.x, top: p.y, rotate: `${i * 40}deg` }} />
          ))}
          <div className="w-24 h-24 rounded-full bg-[#059669] flex items-center justify-center shadow-xl relative z-10">
            <CheckCircle size={48} color="white" strokeWidth={2} />
          </div>
          <div className="text-center space-y-1.5 relative z-10">
            <h2 className="text-[24px] font-black text-[var(--app-text)] uppercase tracking-tighter">Order Placed Successful</h2>
            <p className="text-[12px] font-semibold text-[var(--color-secondary)]/60 max-w-[80%] mx-auto">Your order has been placed and is being processed.</p>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
          className="bg-[var(--app-bg)] border border-[var(--border)] rounded-2xl shadow-sm overflow-hidden">
          <div className="px-5 py-4 text-center border-b border-[var(--border)]">
            <p className="text-[9px] font-black uppercase tracking-[0.3em] text-[var(--color-secondary)]/40">Order ID</p>
            <p className="text-[18px] font-black text-[var(--app-text)] tracking-wider mt-1">{orderId}</p>
          </div>
          {total != null && (
            <div className="flex items-center justify-between px-5 py-3">
              <span className="text-[11px] font-black uppercase tracking-widest text-[var(--color-secondary)]/50">Amount Paid</span>
              <span className="text-[15px] font-black text-[var(--color-primary)]">ZMW {Number(total).toLocaleString()}</span>
            </div>
          )}
        </motion.div>
      </div>

      <div className="px-5 pt-6 pb-8 space-y-3">
        <CtaButton onClick={() => navigate("/marketplace/window")}>View Order</CtaButton>
        <button onClick={() => navigate("/marketplace")}
          className="w-full py-4 rounded-full border border-[var(--border)] bg-[var(--app-bg)] text-[var(--color-secondary)] font-black uppercase tracking-widest text-[12px] flex items-center justify-center active:scale-95 transition-all">
          Back to Marketplace
        </button>
      </div>
    </div>
  );
}
