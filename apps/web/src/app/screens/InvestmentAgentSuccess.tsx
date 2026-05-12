import { motion } from "motion/react";
import { useNavigate } from "react-router";
import { LottieIcon } from "../components/LottieIcon";

const grace = (delay = 0) => ({
  delay, duration: 0.5, ease: [0.22, 1, 0.36, 1] as const,
});

const AGENT_CODE = "KIA-" + Math.random().toString(36).substring(2, 8).toUpperCase();

export function InvestmentAgentSuccess() {
  const navigate = useNavigate();

  return (
    <div className="w-full max-w-md mx-auto min-h-screen font-sans flex flex-col items-center justify-center px-8 text-center">
      <motion.div initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ type: "spring", stiffness: 200, damping: 18, delay: 0.05 }}>
        <LottieIcon icon="success" size={110} />
      </motion.div>

      <motion.h1 initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={grace(0.32)}
        className="font-black text-[26px] uppercase tracking-tight text-[var(--color-secondary)] mb-3 mt-6">
        Agent Registration Complete!
      </motion.h1>

      <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={grace(0.40)}
        className="text-[13px] font-semibold text-[var(--color-secondary)]/60 leading-relaxed mb-6 max-w-[260px]">
        Your investment agent profile is now active. Share your code with investors and start earning commissions.
      </motion.p>

      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={grace(0.48)}
        className="bg-[#E85D3F]/8 border border-[#E85D3F]/20 rounded-2xl px-6 py-4 mb-8 w-full">
        <p className="text-[10px] font-black uppercase tracking-widest text-[var(--color-secondary)]/40 mb-1">Your Agent Code</p>
        <p className="font-black text-[22px] text-[#E85D3F] tracking-widest">{AGENT_CODE}</p>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={grace(0.56)} className="w-full space-y-3">
        <button onClick={() => navigate("/crowdfunding")}
          className="w-full py-4 rounded-2xl bg-[#E85D3F] text-white font-black uppercase tracking-widest text-[13px] shadow-md active:scale-95 transition-all">
          Get Started
        </button>
        <button onClick={() => navigate("/crowdfunding")}
          className="w-full py-4 rounded-2xl border border-[var(--border)] bg-[var(--card)] text-[var(--color-secondary)] font-black uppercase tracking-widest text-[12px] active:scale-95 transition-all">
          Return to Home Page
        </button>
      </motion.div>
    </div>
  );
}
