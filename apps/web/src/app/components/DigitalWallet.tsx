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
      {/* Streamlined Balance Card — Brutalist Edition */}
      <motion.div 
        className="relative w-full px-6 py-5 select-none border-2 border-[#003366] bg-[#003366] shadow-[5px_5px_0px_#003366] overflow-hidden"
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

        {/* Top Row: Label + Toggle */}
        <div className="relative z-10 flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <span className="text-white/30 text-[7px] tracking-[0.4em] font-black uppercase">Wallet Balance</span>
            <button 
              onClick={toggleVisibility}
              className="text-white/20 hover:text-white/50 transition-colors p-0.5"
            >
              {isHidden ? <Eye size={10} /> : <EyeOff size={10} />}
            </button>
          </div>
          <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-white/5 border border-white/5">
            <TrendingUp size={8} className="text-[#00C853]" />
            <span className="text-[7px] font-bold text-[#00C853]/80 uppercase tracking-wider">+2.4%</span>
          </div>
        </div>
        
        {/* Balance — significantly reduced */}
        <motion.div 
          key={displayValue}
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          className="relative z-10 text-xl text-white font-black tracking-tight leading-none"
        >
          {displayValue}
        </motion.div>

        {/* Bottom Row: Escrow Badge */}
        <div className="relative z-10 flex items-center gap-2 mt-3">
          <div className="px-2 py-0.5 rounded-full bg-white/5 border border-white/5 flex items-center gap-1.5">
            <ShieldCheck size={8} className="text-[#00C853]" />
            <span className="text-[6px] font-bold text-white/30 uppercase tracking-widest">Secured Escrow</span>
          </div>
        </div>

        {/* Subtle noise */}
        <div className="absolute inset-0 opacity-[0.04] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-soft-light" />
      </motion.div>
    </div>
  );
}
