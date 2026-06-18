import { useNavigate, useLocation } from "react-router";
import { motion } from "motion/react";
import { CheckCircle, LayoutDashboard, Home } from "lucide-react";
import { PageHeader } from "../components/PageHeader";
import { CtaButton } from "../components/CtaButton";

export function SellComplexSuccess() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const listingId = `AST-${Date.now().toString().slice(-8)}`;
  const assetName = state?.assetInfo?.name || "Your Asset";

  return (
    <div className="w-full max-w-md mx-auto bg-transparent font-sans pb-24">
      <PageHeader title="PUBLISHED!" showBack={false} />

      <div className="px-5 pt-8 space-y-6">
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", damping: 15, stiffness: 200 }}
          className="flex flex-col items-center gap-4 py-6"
        >
          <div className="w-24 h-24 rounded-full bg-[#7C3AED]/12 border-[3px] border-[#7C3AED] flex items-center justify-center shadow-[6px_6px_0_#7C3AED]">
            <CheckCircle size={48} color="#7C3AED" strokeWidth={2} />
          </div>
          <div className="text-center">
            <h2 className="text-2xl font-black text-[var(--app-text)] uppercase tracking-tighter">Asset Listed!</h2>
            <p className="text-[12px] font-semibold text-[var(--color-secondary)]/60 mt-1">{assetName} is now visible to verified buyers</p>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
          className="bg-[var(--app-bg)] rounded-3xl border-[3px] border-[var(--app-text)] shadow-[6px_6px_0_var(--app-text)] overflow-hidden">
          <div className="bg-[var(--color-secondary)] px-5 py-3">
            <p className="text-[9px] font-black uppercase tracking-[0.3em] text-white/60">Listing Details</p>
          </div>
          <div className="px-5 py-4 space-y-3">
            {[
              { label: "Listing ID", value: listingId },
              { label: "Asset", value: assetName },
              { label: "Category", value: state?.assetInfo?.category || "—" },
              { label: "Condition", value: state?.assetInfo?.condition || "—" },
              { label: "Sale Price", value: state?.pricing?.price ? `ZMW ${Number(state.pricing.price).toLocaleString()}` : "—" },
              { label: "Status", value: "Under Review" },
            ].map(({ label, value }) => (
              <div key={label} className="flex items-center justify-between py-2 border-b border-[var(--border)] last:border-0">
                <span className="text-[10px] font-black uppercase tracking-wide text-[var(--color-secondary)]/50">{label}</span>
                <span className={`text-[12px] font-bold ${label === "Status" ? "text-[#D97706]" : "text-[var(--color-secondary)]"}`}>{value}</span>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="space-y-3">
          <CtaButton onClick={() => navigate("/marketplace")}><LayoutDashboard size={18} strokeWidth={2} /> Go To Dashboard</CtaButton>
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
