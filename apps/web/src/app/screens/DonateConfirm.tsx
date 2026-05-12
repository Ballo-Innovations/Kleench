import { useState } from "react";
import { motion } from "motion/react";
import { Wallet, Smartphone, CreditCard, Globe, Check } from "lucide-react";
import { useNavigate, useLocation, useParams } from "react-router";
import { PageHeader } from "../components/PageHeader";

const grace = (delay = 0) => ({
  delay, duration: 0.45, ease: [0.22, 1, 0.36, 1] as const,
});

const PAYMENT_METHODS = [
  { id: "wallet", label: "Kleench Wallet", desc: "Pay from your Kleench balance", icon: Wallet },
  { id: "mobile", label: "Mobile Money", desc: "MTN, Airtel, Zamtel, Zed Mobile", icon: Smartphone },
  { id: "card", label: "Bank Card", desc: "Visa or Mastercard", icon: CreditCard },
  { id: "external", label: "External Wallet", desc: "PayPal, Chipper, or other wallets", icon: Globe },
];

export function DonateConfirm() {
  const navigate = useNavigate();
  const location = useLocation();
  const { campaignId } = useParams();
  const { title, amount, monthly } = location.state || { title: "Campaign", amount: 50, monthly: false };
  const [payMethod, setPayMethod] = useState("wallet");
  const [confirming, setConfirming] = useState(false);

  const fee = (amount * 0.02).toFixed(2);
  const total = (amount + parseFloat(fee)).toFixed(2);

  const handleConfirm = () => {
    setConfirming(true);
    setTimeout(() => navigate(`/donate/campaign/${campaignId}/success`, { state: { title, amount, monthly } }), 1400);
  };

  return (
    <div className="w-full max-w-md mx-auto min-h-screen font-sans pb-32">
      <div className="sticky top-0 z-50">
        <PageHeader title="CONFIRM DONATION" showBack onBack={() => navigate(-1)} />
      </div>

      <div className="px-5 pt-5 space-y-5">
        {/* Donation summary */}
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={grace(0.05)}
          className="bg-[var(--card)] rounded-2xl border border-[var(--border)] shadow-sm p-5">
          <p className="text-[10px] font-black uppercase tracking-widest text-[var(--color-secondary)]/40 mb-4">Donation Summary</p>
          <div className="space-y-3">
            <div className="flex justify-between items-start">
              <span className="text-[12px] font-bold text-[var(--color-secondary)]/60 uppercase tracking-wide">Campaign</span>
              <span className="text-[13px] font-black text-[var(--color-secondary)] text-right max-w-[180px] leading-tight">{title}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[12px] font-bold text-[var(--color-secondary)]/60 uppercase tracking-wide">Donation</span>
              <span className="text-[13px] font-black text-[var(--color-secondary)]">K {Number(amount).toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[12px] font-bold text-[var(--color-secondary)]/60 uppercase tracking-wide">Platform fee</span>
              <span className="text-[13px] font-black text-[var(--color-secondary)]">K {fee}</span>
            </div>
            {monthly && (
              <div className="flex justify-between">
                <span className="text-[12px] font-bold text-[var(--color-secondary)]/60 uppercase tracking-wide">Frequency</span>
                <span className="text-[13px] font-black text-[#E85D3F]">Monthly</span>
              </div>
            )}
            <div className="pt-3 border-t border-[var(--border)] flex justify-between items-center">
              <span className="text-[12px] font-black uppercase tracking-widest text-[var(--color-secondary)]">Total</span>
              <span className="font-black text-[22px] text-[#E85D3F]">K {total}</span>
            </div>
          </div>
        </motion.div>

        {/* Payment method */}
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={grace(0.15)}>
          <label className="text-[10px] font-black uppercase tracking-widest text-[var(--color-secondary)]/50 block mb-3">Payment Method</label>
          <div className="space-y-2">
            {PAYMENT_METHODS.map(({ id, label, desc, icon: Icon }) => (
              <button key={id} onClick={() => setPayMethod(id)}
                className={`w-full p-4 rounded-2xl border-2 flex items-center gap-3 text-left transition-all active:scale-[0.98] ${payMethod === id ? 'border-[#E85D3F] bg-[#E85D3F]/5' : 'border-[var(--border)] bg-[var(--card)]'}`}>
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-colors ${payMethod === id ? 'bg-[#E85D3F] text-white' : 'bg-[var(--app-bg-muted)] text-[var(--color-secondary)]/50'}`}>
                  <Icon size={18} strokeWidth={1.5} />
                </div>
                <div className="flex-1">
                  <p className={`font-black text-[13px] tracking-wide ${payMethod === id ? 'text-[#E85D3F]' : 'text-[var(--color-secondary)]'}`}>{label}</p>
                  <p className="text-[11px] font-semibold text-[var(--color-secondary)]/50">{desc}</p>
                </div>
                <div className={`w-5 h-5 rounded-full border-2 shrink-0 flex items-center justify-center transition-colors ${payMethod === id ? 'border-[#E85D3F] bg-[#E85D3F]' : 'border-[var(--border)]'}`}>
                  {payMethod === id && <Check size={11} className="text-white" strokeWidth={3} />}
                </div>
              </button>
            ))}
          </div>
        </motion.div>

        <button onClick={handleConfirm} disabled={confirming}
          className="w-full py-4 rounded-2xl bg-[#E85D3F] text-white font-black uppercase tracking-widest text-[13px] shadow-md active:scale-95 transition-all disabled:opacity-70">
          {confirming ? "Processing..." : "Confirm Donation"}
        </button>
      </div>
    </div>
  );
}
