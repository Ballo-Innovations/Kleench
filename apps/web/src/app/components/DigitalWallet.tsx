/**
 * DigitalWallet Component
 * 
 * A high-fidelity interactive balance card tailored for the KLEENCH ecosystem.
 * Featuring:
 * - Premium Theme Blue (#003366) with grid texture
 * - Smooth 3D tilt animations via motion/react
 * - Integrated balance visibility toggle
 * - Professional mobile-first scale (approx 50%)
 */

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { ShieldCheck, Eye, EyeOff } from 'lucide-react';

// Utility for merging classes
function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// --- Types ---

interface DigitalWalletProps {
  balance?: string;
  className?: string;
  isBalanceHidden?: boolean;
  onToggleVisibility?: () => void;
}

// --- Main Component ---

export function DigitalWallet({ 
  balance = "ZMW 2,450.00", 
  className, 
  isBalanceHidden: isForcedHidden, 
  onToggleVisibility 
}: DigitalWalletProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isInternalHidden, setIsInternalHidden] = useState(false);

  const isHidden = isForcedHidden !== undefined ? isForcedHidden : isInternalHidden;
  const toggleVisibility = onToggleVisibility || (() => setIsInternalHidden(!isInternalHidden));

  const displayValue = isHidden ? "••••••" : balance;

  return (
    <div 
      className={cn("relative w-full h-[180px] flex flex-col items-center justify-center overflow-visible", className)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Premium Balance Card */}
      <motion.div 
        onMouseEnter={() => setIsHovered(true)}
        className="relative w-72 h-44 select-none bg-[#003366] rounded-[32px] shadow-[0_25px_50px_-12px_rgba(0,51,102,0.4)] border border-white/10 flex flex-col items-center justify-center text-center overflow-hidden"
        initial={false}
        animate={{
          rotateX: isHovered ? 6 : 0,
          rotateY: isHovered ? -6 : 0,
          scale: isHovered ? 1.02 : 1,
        }}
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
        style={{ perspective: 1000 }}
      >
        {/* Premium grid texture matching global theme */}
        <div className="absolute inset-0 opacity-[0.25]" style={{ WebkitMaskImage: 'radial-gradient(circle at center, white, transparent 90%)', maskImage: 'radial-gradient(circle at center, white, transparent 90%)' }}>
          <svg width="100%" height="100%">
            <defs>
              <pattern id="wallet-card-grid" width="24" height="24" patternUnits="userSpaceOnUse">
                <path d="M 24 0 L 0 0 0 24" fill="none" stroke="white" strokeWidth="1" strokeOpacity="0.4"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#wallet-card-grid)"/>
          </svg>
        </div>

        {/* Soft glow orbs for depth */}
        <div className="absolute top-[-20%] left-[-10%] w-32 h-32 bg-white/10 rounded-full blur-[30px] pointer-events-none"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-24 h-24 bg-[#FF8C00]/10 rounded-full blur-[25px] pointer-events-none"></div>

        {/* Balance Display Section */}
        <div className="relative z-40 flex flex-col items-center space-y-1.5">
          <div className="flex items-center gap-2">
            <span className="text-white/40 text-[8px] tracking-[0.4em] font-black uppercase">Wallet Balance</span>
            <button 
              onClick={toggleVisibility}
              className="text-white/20 hover:text-white transition-colors p-0.5"
            >
              {isHidden ? <Eye size={12} /> : <EyeOff size={12} />}
            </button>
          </div>
          
          <motion.div 
            key={displayValue}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-3xl text-white font-black tracking-tight"
          >
            {displayValue}
          </motion.div>
          
          <div className="flex items-center gap-2 pt-1">
             <div className="px-2 py-0.5 rounded-full bg-white/10 border border-white/5 flex items-center gap-1.5">
                <ShieldCheck size={9} className="text-[#00C853]" />
                <span className="text-[7px] font-bold text-white/40 uppercase tracking-widest">Secured Escrow</span>
             </div>
          </div>
        </div>

        {/* Subtle noise for metallic/matte finish */}
        <div className="absolute inset-0 opacity-10 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-soft-light" />
        
        {/* Shine effect that moves with hover */}
        <motion.div 
          animate={{
            x: isHovered ? [0, 100, 0] : 0,
            opacity: isHovered ? [0, 0.2, 0] : 0,
          }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent skew-x-12 -translate-x-full pointer-events-none"
        />
      </motion.div>
      
      {/* Decorative shadow depth */}
      <div className="absolute inset-x-10 bottom-4 h-4 bg-black/30 rounded-full blur-xl z-20 pointer-events-none" />
    </div>
  );
}
