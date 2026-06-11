import { motion } from "motion/react";
import { TrendingUp, ChevronRight } from "lucide-react";
import { useNavigate, useLocation } from "react-router";
import { LottieIcon } from "../components/LottieIcon";

const grace = (delay = 0) => ({
  delay, duration: 0.5, ease: [0.22, 1, 0.36, 1] as const,
});

export function InvestmentSuccess() {
  const navigate = useNavigate();
  const location = useLocation();
  const { title, amount, monthly } = (location.state as { title?: string; amount?: number; monthly?: boolean }) || {};

  return (
    <div className="w-full max-w-md mx-auto font-sans flex flex-col items-center justify-center px-8 text-center">
      <motion.div initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ type: "spring", stiffness: 200, damping: 18, delay: 0.05 }}>
        <LottieIcon icon="success" size={110} />
      </motion.div>

      <motion.h1 initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={grace(0.32)}
        className="font-black text-[26px] uppercase tracking-tight text-[var(--color-secondary)] mb-3 mt-6">
        Investment Placed!
      </motion.h1>

      <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={grace(0.40)}
        className="text-[13px] font-semibold text-[var(--color-secondary)]/60 leading-relaxed mb-6 max-w-[260px]">
        Your investment in <span className="text-[var(--color-secondary)] font-black">{title ?? "this project"}</span> has been confirmed and is now active.
        {monthly && " Monthly contributions are set up."}
      </motion.p>

      {amount && (
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={grace(0.46)}
          className="bg-[#E85D3F]/8 border border-[#E85D3F]/20 rounded-2xl px-6 py-4 mb-4 w-full">
          <p className="text-[10px] font-black uppercase tracking-widest text-[var(--color-secondary)]/40 mb-1">Amount Invested</p>
          <p className="font-black text-[26px] text-[#E85D3F]">K {amount.toFixed(2)}</p>
        </motion.div>
      )}

      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={grace(0.52)}
        className="bg-[var(--card)] border border-[var(--border)] rounded-2xl p-4 mb-8 w-full shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-[#00C853]/10 flex items-center justify-center shrink-0">
            <TrendingUp size={20} className="text-[#00C853]" strokeWidth={1.5} />
          </div>
          <div className="text-left">
            <p className="font-black text-[13px] text-[var(--color-secondary)] uppercase tracking-wide">Portfolio Tracking</p>
            <p className="text-[11px] font-semibold text-[var(--color-secondary)]/50">Your investment is now active and tracked</p>
          </div>
        </div>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={grace(0.58)} className="w-full space-y-3">
        <button onClick={() => navigate("/wallet")}
          className="w-full py-4 rounded-2xl bg-[#E85D3F] text-white font-black uppercase tracking-widest text-[13px] shadow-md active:scale-95 transition-all flex items-center justify-center gap-2">
          View Portfolio <ChevronRight size={16} strokeWidth={3} />
        </button>
        <button onClick={() => navigate("/crowdfunding")}
          className="w-full py-4 rounded-2xl border border-[var(--border)] bg-[var(--card)] text-[var(--color-secondary)] font-black uppercase tracking-widest text-[12px] active:scale-95 transition-all">
          Return to Home Page
        </button>
      </motion.div>
    </div>
  );
}
