import { useNavigate, useLocation, useParams } from "react-router";
import { motion } from "motion/react";
import { Building2, Shield, ArrowRight, AlertTriangle } from "lucide-react";
import { PageHeader } from "../components/PageHeader";

export function MarketAssetOrder() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { state } = useLocation();
  const asset = state?.asset || { name: "Asset", price: 850000 };
  const total = state?.total || asset.price;
  const deposit = state?.deposit || total * 0.1;

  return (
    <div className="w-full max-w-md mx-auto bg-transparent font-sans pb-24">
      <PageHeader title="ORDER SUMMARY" showBack />

      <div className="px-5 pt-5 space-y-5">
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
          className="bg-[var(--app-bg)] rounded-3xl border-[3px] border-[var(--app-text)] shadow-[6px_6px_0_var(--app-text)] overflow-hidden">
          <div className="bg-[var(--color-secondary)] px-5 py-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-white/10 flex items-center justify-center">
              <Building2 size={20} className="text-white" strokeWidth={2} />
            </div>
            <div>
              <p className="text-[9px] font-black uppercase tracking-[0.3em] text-white/50">Asset</p>
              <p className="text-[13px] font-black text-white uppercase tracking-tight">{asset.name}</p>
            </div>
          </div>
          <div className="px-5 py-4 space-y-0">
            {[
              { label: "Asset Price", value: `K${(asset.price || 0).toLocaleString()}` },
              { label: "Condition", value: asset.condition || "Excellent" },
              { label: "Year", value: String(asset.year || "—") },
              { label: "Seller", value: asset.seller || "Verified Seller" },
            ].map(({ label, value }) => (
              <div key={label} className="flex items-center justify-between py-3 border-b border-[var(--border)] last:border-0">
                <span className="text-[10px] font-black uppercase tracking-wide text-[var(--color-secondary)]/50">{label}</span>
                <span className="text-[12px] font-bold text-[var(--color-secondary)]">{value}</span>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
          className="bg-[var(--app-bg)] rounded-3xl border-[3px] border-[var(--app-text)] shadow-[6px_6px_0_var(--app-text)] p-5 space-y-0">
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[var(--color-secondary)]/50 mb-3">Payment Structure</p>
          {[
            { label: "Total Cost", value: `K${total.toLocaleString()}`, highlight: false },
            { label: "Deposit Now", value: `K${deposit.toLocaleString()}`, highlight: true },
            { label: "Balance on Delivery", value: `K${(total - deposit).toLocaleString()}`, highlight: false },
          ].map(({ label, value, highlight }) => (
            <div key={label} className={`flex items-center justify-between py-3 border-b border-[var(--border)] last:border-0 ${highlight ? "bg-[var(--color-primary)]/5 -mx-5 px-5" : ""}`}>
              <span className={`text-[11px] font-${highlight ? "black" : "semibold"} ${highlight ? "text-[var(--app-text)] uppercase tracking-wide" : "text-[var(--color-secondary)]/70"}`}>{label}</span>
              <span className={`font-black ${highlight ? "text-[22px] text-[var(--color-primary)]" : "text-[12px] text-[var(--color-secondary)]"}`}>{value}</span>
            </div>
          ))}
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
          className="bg-[#D97706]/8 border-2 border-[#D97706]/20 rounded-2xl p-4 flex gap-3">
          <AlertTriangle size={18} className="text-[#D97706] shrink-0 mt-0.5" strokeWidth={2} />
          <p className="text-[11px] font-semibold text-[var(--color-secondary)]/70 leading-snug">
            This is a <span className="font-black text-[var(--app-text)]">high-value transaction</span>. Ensure you have inspected the asset before completing payment. KLeench escrow protects your funds.
          </p>
        </motion.div>
      </div>

      <div className="px-5 pt-4 pb-8">
        <button
          onClick={() => navigate(`/marketplace/asset/${id}/escrow`, { state: { ...state, deposit } })}
          className="w-full py-4 rounded-2xl bg-[var(--color-primary)] text-white font-black uppercase tracking-widest text-[12px] flex items-center justify-center gap-3 shadow-md active:scale-95 transition-all"
        >
          Pay Now — K{deposit.toLocaleString()} <ArrowRight size={18} />
        </button>
      </div>
    </div>
  );
}
