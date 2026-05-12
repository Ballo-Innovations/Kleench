import { motion } from "motion/react";
import { HeartHandshake } from "lucide-react";
import { useNavigate, useLocation } from "react-router";
import { LottieIcon } from "../components/LottieIcon";

const grace = (delay = 0) => ({
  delay, duration: 0.5, ease: [0.22, 1, 0.36, 1] as const,
});

export function DonateSuccess() {
  const navigate = useNavigate();
  const location = useLocation();
  const { title, amount, monthly } = location.state || { title: "Campaign", amount: 50, monthly: false };

  return (
    <div className="w-full max-w-md mx-auto min-h-screen font-sans flex flex-col items-center justify-center px-8 text-center">
      <motion.div initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ type: "spring", stiffness: 200, damping: 18, delay: 0.05 }}>
        <LottieIcon icon="success" size={110} />
      </motion.div>

      <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={grace(0.3)}
        className="inline-flex items-center gap-2 px-4 py-2 bg-[#E85D3F]/10 text-[#E85D3F] rounded-full mt-4 mb-4">
        <HeartHandshake size={15} strokeWidth={2} />
        <span className="font-black text-[11px] uppercase tracking-widest">Donation Successful</span>
      </motion.div>

      <motion.h1 initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={grace(0.38)}
        className="font-black text-[28px] uppercase tracking-tight text-[var(--color-secondary)] mb-3">
        Thank You!
      </motion.h1>

      <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={grace(0.45)}
        className="text-[13px] font-semibold text-[var(--color-secondary)]/60 leading-relaxed mb-6 max-w-[270px]">
        Your donation is making a real difference. The world is better because of generous people like you.
      </motion.p>

      {/* Receipt card */}
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={grace(0.52)}
        className="w-full bg-[var(--card)] border border-[var(--border)] rounded-2xl p-5 mb-8 shadow-sm text-left">
        <p className="text-[10px] font-black uppercase tracking-widest text-[var(--color-secondary)]/40 mb-3">Donation Receipt</p>
        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="text-[11px] font-bold text-[var(--color-secondary)]/50 uppercase tracking-wide">Amount</span>
            <span className="font-black text-[14px] text-[#E85D3F]">K {Number(amount).toFixed(2)}</span>
          </div>
          <div className="flex justify-between items-start">
            <span className="text-[11px] font-bold text-[var(--color-secondary)]/50 uppercase tracking-wide">Campaign</span>
            <span className="font-black text-[12px] text-[var(--color-secondary)] text-right max-w-[160px] leading-tight">{title}</span>
          </div>
          {monthly && (
            <div className="flex justify-between">
              <span className="text-[11px] font-bold text-[var(--color-secondary)]/50 uppercase tracking-wide">Type</span>
              <span className="font-black text-[12px] text-[var(--color-secondary)]">Monthly</span>
            </div>
          )}
        </div>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={grace(0.58)} className="w-full space-y-3">
        <button onClick={() => navigate("/donate")}
          className="w-full py-4 rounded-2xl bg-[#E85D3F] text-white font-black uppercase tracking-widest text-[13px] shadow-md active:scale-95 transition-all">
          Donate Again
        </button>
        <button onClick={() => navigate("/")}
          className="w-full py-4 rounded-2xl border border-[var(--border)] bg-[var(--card)] text-[var(--color-secondary)] font-black uppercase tracking-widest text-[12px] active:scale-95 transition-all">
          Return to Home Page
        </button>
      </motion.div>
    </div>
  );
}
