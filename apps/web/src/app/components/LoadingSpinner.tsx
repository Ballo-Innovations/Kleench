import { motion } from "motion/react";

export function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center p-8">
      <motion.div
        className="w-12 h-12 rounded-full border-4 border-[var(--clean-slate)] border-t-[var(--trust-blue)]"
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
      />
    </div>
  );
}
