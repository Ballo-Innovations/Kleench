/**
 * DigitalWallet Component — Tamed Edition
 * 
 * A streamlined balance card that blends naturally into the page.
 * Less intrusive, lighter gradient, smaller balance text.
 */

import { useState } from 'react';
import { motion } from 'motion/react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { ShieldCheck, Eye, EyeOff, TrendingUp } from 'lucide-react';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface DigitalWalletProps {
  balance?: string;
  className?: string;
  isBalanceHidden?: boolean;
  onToggleVisibility?: () => void;
}

export function DigitalWallet({ 
  balance = "ZMW 2,450.00", 
  className, 
  isBalanceHidden: isForcedHidden, 
  onToggleVisibility 
}: DigitalWalletProps) {
  const [isInternalHidden, setIsInternalHidden] = useState(false);

  const isHidden = isForcedHidden !== undefined ? isForcedHidden : isInternalHidden;
  const toggleVisibility = onToggleVisibility || (() => setIsInternalHidden(!isInternalHidden));

  const displayValue = isHidden ? "••••••" : balance;

  return (
    <div className={cn("relative w-full flex flex-col items-center justify-center", className)}>
      {/* Streamlined Balance Card — Premium Edition */}
      <motion.div 
        className="relative w-full px-5 py-4 select-none rounded-2xl bg-[var(--app-shape-accent)] shadow-lg shadow-[var(--app-text)]/20 overflow-hidden"
        initial={false}
      >
        {/* Subtle grid texture */}
        <div className="absolute inset-0 opacity-[0.08]" style={{ WebkitMaskImage: 'radial-gradient(circle at center, white, transparent 90%)', maskImage: 'radial-gradient(circle at center, white, transparent 90%)' }}>
          <svg width="100%" height="100%">
            <defs>
              <pattern id="wallet-card-grid" width="20" height="20" patternUnits="userSpaceOnUse">
                <path d="M 20 0 L 0 0 0 20" fill="none" stroke="white" strokeWidth="0.5" strokeOpacity="0.5"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#wallet-card-grid)"/>
          </svg>
        </div>

        {/* Sleek Horizontal Strip Layout */}
        <div className="relative z-10 flex flex-row items-center justify-between w-full">
           <div className="flex flex-col gap-1.5">
             <div className="flex items-center gap-2">
               <span className="text-white/50 text-[10px] tracking-[0.2em] font-black uppercase">Balance</span>
               <button onClick={toggleVisibility} className="text-white/40 transition-colors p-0.5">
                 {isHidden ? <Eye size={12} /> : <EyeOff size={12} />}
               </button>
             </div>
             <motion.div key={displayValue} initial={{ opacity: 0, x: -5 }} animate={{ opacity: 1, x: 0 }} className="text-[28px] text-white font-black tracking-tighter leading-none mt-1">
               {displayValue}
             </motion.div>
           </div>
           
           <div className="flex flex-col items-end gap-2.5">
              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[var(--app-bg)]/10 backdrop-blur-sm shadow-sm">
                <TrendingUp size={10} className="text-[#00C853]" />
                <span className="text-[9px] font-bold text-white uppercase tracking-wider">+2.4%</span>
              </div>
              <div className="flex items-center gap-1 opacity-60">
                <ShieldCheck size={12} className="text-white" />
                <span className="text-[8px] font-bold text-white uppercase tracking-widest">Escrow</span>
              </div>
           </div>
        </div>

        {/* Subtle noise */}
        <div className="absolute inset-0 opacity-[0.04] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-soft-light" />
      </motion.div>
    </div>
  );
}
