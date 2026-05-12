import { motion } from "motion/react";
import { useNavigate } from "react-router";
import { LottieIcon } from "../components/LottieIcon";

const grace = (delay = 0) => ({
  delay, duration: 0.5, ease: [0.22, 1, 0.36, 1] as const,
});

export function DonateAgentSuccess() {
  const navigate = useNavigate();

  return (
    <div className="w-full max-w-md mx-auto min-h-screen font-sans flex flex-col items-center justify-center px-8 text-center">
      <motion.div initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ type: "spring", stiffness: 200, damping: 18, delay: 0.05 }}>
        <LottieIcon icon="success" size={110} />
      </motion.div>

      <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={grace(0.3)}
        className="inline-block bg-[#E85D3F] text-white px-6 py-2 rounded-full font-black text-[11px] uppercase tracking-widest mt-4 mb-5 shadow-md">
        Registered
      </motion.div>

      <motion.h1 initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={grace(0.38)}
        className="font-black text-[26px] uppercase tracking-tight text-[var(--color-secondary)] mb-3">
        Congratulations!
      </motion.h1>

      <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={grace(0.45)}
        className="text-[13px] font-semibold text-[var(--color-secondary)]/60 leading-relaxed mb-6 max-w-[260px]">
        Your agent profile is now active. Start referring campaigns and earn commissions on every successful donation.
      </motion.p>

      {/* Earnings display */}
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={grace(0.52)}
        className="w-full bg-white border border-[var(--border)] rounded-2xl p-5 mb-8 shadow-sm">
        <p className="text-[10px] font-black uppercase tracking-widest text-[var(--color-secondary)]/40 mb-1">Total Earnings</p>
        <p className="font-black text-[36px] text-[#E85D3F] leading-none">K 000.00</p>
        <p className="text-[11px] font-bold text-[var(--color-secondary)]/40 mt-1">Earnings appear as you complete tasks</p>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={grace(0.58)} className="w-full space-y-3">
        <button onClick={() => navigate("/donate")}
          className="w-full py-4 rounded-2xl bg-[#E85D3F] text-white font-black uppercase tracking-widest text-[13px] shadow-md active:scale-95 transition-all">
          Get Started
        </button>
        <button onClick={() => navigate("/")}
          className="w-full py-4 rounded-2xl border border-[var(--border)] bg-white text-[var(--color-secondary)] font-black uppercase tracking-widest text-[12px] active:scale-95 transition-all">
          Return to Home Page
        </button>
      </motion.div>
    </div>
  );
}
