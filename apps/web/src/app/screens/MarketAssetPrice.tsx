import { useState } from "react";
import { useNavigate, useLocation, useParams } from "react-router";
import { motion } from "motion/react";
import { Calculator, Shield } from "lucide-react";
import { PageHeader } from "../components/PageHeader";
import { CtaButton } from "../components/CtaButton";

const INSTALLMENT_OPTIONS = [3, 6, 12] as const;

export function MarketAssetPrice() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { state } = useLocation();
  const asset = state?.asset || { name: "Asset", price: 850000, deposit: 85000 };

  const price = asset.price || 850000;
  const deposit = asset.deposit || price * 0.1;
  const tax = price * 0.16;
  const serviceFee = price * 0.015;
  const total = price + tax + serviceFee;
  const balance = total - deposit;

  const [installments, setInstallments] = useState<3 | 6 | 12>(6);
  const monthlyPayment = Math.round(balance / installments);

  return (
    <div className="w-full max-w-md mx-auto bg-transparent font-sans pb-24">
      <PageHeader title="PRICE ANALYSIS" showBack />

      <div className="px-5 pt-5 space-y-5">
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
          className="bg-[var(--app-bg)] rounded-3xl border-[3px] border-[var(--app-text)] shadow-[6px_6px_0_var(--app-text)] p-5">
          <div className="flex items-center gap-2 mb-4">
            <Calculator size={16} className="text-[var(--color-primary)]" strokeWidth={2.5} />
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[var(--color-secondary)]/50">Price Breakdown</p>
          </div>
          <div className="space-y-0">
            {[
              { label: "Asset Sale Price", value: `K${price.toLocaleString()}` },
              { label: "VAT (16%)", value: `K${Math.round(tax).toLocaleString()}` },
              { label: "Service Fee (1.5%)", value: `K${Math.round(serviceFee).toLocaleString()}` },
            ].map(({ label, value }) => (
              <div key={label} className="flex items-center justify-between py-3 border-b border-[var(--border)]">
                <span className="text-[11px] font-semibold text-[var(--color-secondary)]/70">{label}</span>
                <span className="text-[12px] font-bold text-[var(--color-secondary)]">{value}</span>
              </div>
            ))}
            <div className="flex items-center justify-between pt-4">
              <span className="text-[13px] font-black uppercase tracking-wide text-[var(--app-text)]">Total Cost</span>
              <span className="text-[24px] font-black text-[var(--color-primary)]">K{Math.round(total).toLocaleString()}</span>
            </div>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
          className="space-y-3">
          {[
            { label: "Required Deposit", value: `K${deposit.toLocaleString()}`, desc: "Paid now to secure the asset", color: "var(--color-primary)" },
            { label: "Balance on Delivery", value: `K${Math.round(balance).toLocaleString()}`, desc: "Paid upon confirmed delivery", color: "var(--color-secondary)" },
          ].map(({ label, value, desc, color }) => (
            <div key={label} className="bg-[var(--app-bg)] rounded-2xl border-[3px] border-[var(--app-text)] shadow-[4px_4px_0_var(--app-text)] p-4 flex items-center justify-between">
              <div>
                <p className="text-[12px] font-black text-[var(--app-text)] uppercase tracking-wide">{label}</p>
                <p className="text-[10px] font-semibold text-[var(--color-secondary)]/50 mt-0.5">{desc}</p>
              </div>
              <p className="text-[20px] font-black" style={{ color }}>{value}</p>
            </div>
          ))}
        </motion.div>

        {/* Installment Calculator */}
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}
          className="bg-[var(--app-bg)] rounded-3xl border-[3px] border-[var(--app-text)] shadow-[6px_6px_0_var(--app-text)] p-5 space-y-4">
          <div className="flex items-center gap-2">
            <Calculator size={16} className="text-[var(--color-secondary)]" strokeWidth={2.5} />
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[var(--color-secondary)]/50">Installment Estimator</p>
          </div>
          <p className="text-[11px] font-semibold text-[var(--color-secondary)]/60 leading-snug -mt-1">Estimate monthly payments on the remaining balance of <span className="font-black text-[var(--app-text)]">K{Math.round(balance).toLocaleString()}</span></p>
          <div className="flex gap-2">
            {INSTALLMENT_OPTIONS.map((n) => (
              <button key={n} onClick={() => setInstallments(n)}
                className={`flex-1 py-2.5 rounded-xl border-2 text-[11px] font-black uppercase tracking-wide transition-all ${installments === n ? "border-[var(--color-primary)] bg-[var(--color-primary)]/10 text-[var(--color-primary)]" : "border-[var(--border)] text-[var(--color-secondary)]/60"}`}>
                {n} mo
              </button>
            ))}
          </div>
          <div className="bg-[var(--color-primary)]/8 rounded-2xl border border-[var(--color-primary)]/20 p-4 text-center">
            <p className="text-[9px] font-black uppercase tracking-widest text-[var(--color-secondary)]/50">Estimated Monthly Payment</p>
            <p className="text-[32px] font-black text-[var(--color-primary)] leading-none mt-1">K{monthlyPayment.toLocaleString()}</p>
            <p className="text-[9px] font-semibold text-[var(--color-secondary)]/40 mt-1">for {installments} months · subject to approval</p>
          </div>
          <p className="text-[9px] font-semibold text-[var(--color-secondary)]/40 leading-snug">Installment plans are indicative only. Final terms are set by the seller and KLeench Finance at order stage.</p>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
          className="bg-[#059669]/8 border-2 border-[#059669]/20 rounded-2xl p-4 flex gap-3">
          <Shield size={18} className="text-[#059669] shrink-0 mt-0.5" strokeWidth={2} />
          <p className="text-[11px] font-semibold text-[var(--color-secondary)]/70 leading-snug">
            All high-value transactions are protected by <span className="font-black text-[var(--app-text)]">KLeench Escrow</span>. Funds are held securely until asset delivery is confirmed.
          </p>
        </motion.div>
      </div>

      <div className="px-5 pt-4 pb-8">
        <CtaButton onClick={() => navigate(`/marketplace/asset/${id}/order`, { state: { ...state, total: Math.round(total), deposit } })}>Proceed To Order</CtaButton>
      </div>
    </div>
  );
}
