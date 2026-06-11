import { useState } from "react";
import { motion } from "motion/react";
import { ChevronRight, Wallet, Smartphone, CreditCard, Globe } from "lucide-react";
import { useNavigate, useLocation, useParams } from "react-router";
import { PageHeader } from "../components/PageHeader";

const grace = (delay = 0) => ({
  delay, duration: 0.45, ease: [0.22, 1, 0.36, 1] as const,
});

const PAYMENT_METHODS = [
  { id: "wallet", label: "Kleench Wallet", desc: "Pay from your Kleench balance", icon: Wallet },
  { id: "mobile", label: "Mobile Money", desc: "MTN, Airtel or Zamtel Money", icon: Smartphone },
  { id: "card", label: "Bank Card", desc: "Visa, Mastercard or bank debit card", icon: CreditCard },
  { id: "external", label: "External Wallet", desc: "PayPal, Skrill or other wallets", icon: Globe },
];

export function InvestmentConfirmation() {
  const navigate = useNavigate();
  const location = useLocation();
  const { projectId } = useParams();
  const { title, amount, monthly } = (location.state as { title?: string; amount?: number; monthly?: boolean }) || {};

  const [paymentMethod, setPaymentMethod] = useState("");

  const fee = ((amount ?? 0) * 0.02);
  const total = (amount ?? 0) + fee;

  return (
    <div className="w-full max-w-md mx-auto font-sans pb-24">
      <div className="sticky top-0 z-50">
        <PageHeader title="CONFIRM INVESTMENT" showBack onBack={() => navigate(-1)} />
      </div>

      <div className="px-5 pt-5 space-y-5">
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={grace(0.05)}
          className="bg-[var(--card)] rounded-2xl border border-[var(--border)] shadow-sm p-4">
          <p className="text-[10px] font-black uppercase tracking-widest text-[#E85D3F] mb-3">Investment Summary</p>
          {[
            { label: "Project", value: title ?? "—" },
            { label: "Amount", value: `K ${(amount ?? 0).toFixed(2)}` },
            { label: "Platform Fee (2%)", value: `K ${fee.toFixed(2)}` },
            { label: "Total", value: `K ${total.toFixed(2)}` },
          ].map(({ label, value }) => (
            <div key={label} className="flex justify-between items-center py-2.5 border-b border-[var(--border)] last:border-0">
              <span className="text-[11px] font-black uppercase tracking-widest text-[var(--color-secondary)]/40">{label}</span>
              <span className={`font-black text-[13px] ${label === "Total" ? "text-[#E85D3F] text-[16px]" : "text-[var(--color-secondary)]"}`}>{value}</span>
            </div>
          ))}
          {monthly && (
            <p className="text-[10px] font-bold text-[var(--color-secondary)]/40 mt-2">Recurring monthly until cancelled</p>
          )}
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={grace(0.15)}>
          <label className="text-[10px] font-black uppercase tracking-widest text-[var(--color-secondary)]/50 block mb-3">Payment Method</label>
          <div className="space-y-3">
            {PAYMENT_METHODS.map(({ id, label, desc, icon: Icon }, i) => (
              <motion.button key={id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={grace(0.05 * i)}
                onClick={() => setPaymentMethod(id)}
                className={`w-full p-4 rounded-2xl border-2 flex items-center gap-4 text-left transition-all active:scale-[0.98] ${paymentMethod === id ? 'border-[#E85D3F] bg-[#E85D3F]/5' : 'border-[var(--border)] bg-[var(--card)]'}`}>
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-colors ${paymentMethod === id ? 'bg-[#E85D3F] text-white' : 'bg-[var(--app-bg-muted)] text-[var(--color-secondary)]/50'}`}>
                  <Icon size={20} strokeWidth={1.5} />
                </div>
                <div className="flex-1">
                  <p className={`font-black text-[13px] uppercase tracking-wide ${paymentMethod === id ? 'text-[#E85D3F]' : 'text-[var(--color-secondary)]'}`}>{label}</p>
                  <p className="text-[11px] font-semibold text-[var(--color-secondary)]/50 mt-0.5">{desc}</p>
                </div>
                <div className={`w-5 h-5 rounded-full border-2 shrink-0 flex items-center justify-center transition-colors ${paymentMethod === id ? 'border-[#E85D3F] bg-[#E85D3F]' : 'border-[var(--border)]'}`}>
                  {paymentMethod === id && <div className="w-2 h-2 rounded-full bg-white" />}
                </div>
              </motion.button>
            ))}
          </div>
        </motion.div>

        <button disabled={!paymentMethod}
          onClick={() => navigate(`/crowdfunding/project/${projectId}/success`, { state: { title, amount, monthly } })}
          className="w-full py-4 rounded-2xl bg-[#E85D3F] text-white font-black uppercase tracking-widest text-[13px] flex items-center justify-center gap-3 disabled:opacity-40 shadow-md active:scale-95 transition-all">
          Confirm Investment <ChevronRight size={18} />
        </button>
      </div>
    </div>
  );
}
