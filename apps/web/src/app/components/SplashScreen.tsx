import { motion } from "motion/react";
import { useEffect } from "react";
import kleenchLogo from "@/assets/kleench_logo.png";

interface SplashScreenProps {
  onComplete: () => void;
}

export function SplashScreen({ onComplete }: SplashScreenProps) {
  useEffect(() => {
    const timer = setTimeout(() => onComplete(), 2200);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
      className="fixed inset-0 z-[100] bg-[var(--clean-slate)] flex items-center justify-center overflow-hidden"
    >
      {/* Grid */}
      <div className="absolute inset-0 grid-pattern opacity-60" />

      {/* Subtle static ambient glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(255,140,0,0.05) 0%, transparent 70%)' }} />

      {/* Content */}
      <div className="relative z-10 text-center">
        <motion.div
          initial={{ scale: 0.6, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="relative mx-auto mb-8 flex items-center justify-center"
        >
          <motion.img 
            src={kleenchLogo} 
            alt="KLEENCH Logo" 
            className="h-20 w-auto object-contain"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          />
        </motion.div>

        <div className="flex items-center justify-center gap-0 mb-3">
          {"KLEENCH".split("").map((letter, i) => (
            <motion.span
              key={i}
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 + i * 0.06, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="text-5xl font-[var(--font-header)] font-bold text-[var(--ink-primary)] tracking-wider"
            >
              {letter}
            </motion.span>
          ))}
        </div>

        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.9, duration: 0.6 }}
          className="text-sm font-[var(--font-body)] text-[var(--ink-muted)] uppercase tracking-[0.3em]"
        >
          Social Commerce
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="mt-12 mx-auto w-32 h-0.5 bg-[var(--surface-raised)] rounded-full overflow-hidden"
        >
          <motion.div
            className="h-full bg-gradient-to-r from-[#FB3616] to-[#FF8810] rounded-full"
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ delay: 1.3, duration: 0.8, ease: "easeInOut" }}
          />
        </motion.div>
      </div>
    </motion.div>
  );
}
