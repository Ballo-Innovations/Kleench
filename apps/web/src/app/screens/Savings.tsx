import { motion } from "motion/react";
import { 
  DuotoneArrowUp, 
  DuotoneArrowDown, 
  DuotonePiggyBank
} from "../components/DuotoneIcon";
import { PageHeader } from "../components/PageHeader";

/* --- Kinetic Animation variants inspired by Wallet --- */
const grace = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { 
    delay,
    duration: 0.6, 
    ease: [0.22, 1, 0.36, 1] as const 
  }
});

export function Savings() {
  // Load real user data (Matching Profile.tsx pattern)
  const localKycRaw = localStorage.getItem("userKyc");
  const localKyc = localKycRaw ? JSON.parse(localKycRaw) : null;
  const localPhoto = localStorage.getItem("userProfilePhoto");
  
  const displayName = localKyc?.fullName || "Sarah Martinez";
  const displayId = localKyc?.userName ? `KL-${localKyc.userName.slice(0, 4).toUpperCase()}` : "KL-9022";
  const initials = displayName.split(" ").filter(Boolean).map((n: string) => n[0]).join("").toUpperCase();

  const ledgerData = [
    { id: 1, date: "April 08", source: "Airtel Money", amount: "K450.00" },
    { id: 2, date: "April 05", source: "Wallet Transfer", amount: "K200.00" },
    { id: 3, date: "April 02", source: "Reward Program", amount: "K120.00" },
    { id: 4, date: "April 01", source: "MTN Deposit", amount: "K150.00" },
  ];

  return (
    <div className="w-full pb-32 relative min-h-screen bg-transparent overflow-x-hidden font-sans text-[var(--app-text)]">
      {/* ── PageHeader matching Wallet style ── */}
      <PageHeader 
        showBack 
        useLogo
        title="Savings" 
        customBalanceHUD={
          <div className="flex items-center justify-between w-full bg-[var(--app-bg)]/10 backdrop-blur-md border border-white/20 rounded-full py-[6px] px-3 shadow-[0_4px_24px_rgba(0,0,0,0.06)] shrink-0">
            <div className="flex flex-col justify-center min-w-0 pl-1">
              <p className="text-white/60 text-[8px] font-bold uppercase tracking-widest leading-none mb-1">Savings Balance</p>
              <h2 className="text-white text-[16px] font-black tracking-tight leading-none" style={{ fontFamily: "Agrandir, system-ui, sans-serif" }}>ZMW 8,400.00</h2>
            </div>
            <div className="flex items-center">
              <div className="w-8 h-8 rounded-full bg-[var(--app-bg)]/20 flex items-center justify-center border border-white/30 text-white">
                <DuotonePiggyBank size={16} primary="#ffffff" />
              </div>
            </div>
          </div>
        }
      />

      <div className="px-4 mt-3 relative z-10 space-y-6">
        
        {/* Section 01. PROFILE IDENTITY */}
        <section className="space-y-4">
          <div className="flex items-center gap-3 mb-4">
             <span className="text-[#F5A623] font-black text-sm tracking-widest">01.</span>
             <h3 className="font-black text-[13px] uppercase tracking-[0.2em] text-[#999999]">Identity</h3>
             <div className="flex-1 h-[2px] bg-[#E0E0E0]" />
          </div>

          <motion.div 
            {...grace(0.1)}
            className="bg-[var(--app-bg)] rounded-2xl border border-slate-200 p-5 shadow-sm active:scale-[0.99] transition-all"
          >
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-full border border-slate-100 overflow-hidden bg-[var(--app-bg-muted)] flex items-center justify-center shrink-0 shadow-inner">
                {localPhoto ? (
                  <img src={localPhoto} alt={displayName} className="w-full h-full object-cover" />
                ) : (
                  <span className="text-lg font-black text-[var(--app-text)]">{initials}</span>
                )}
              </div>
              <div className="flex flex-col min-w-0">
                <h4 className="font-black text-[var(--app-text)] text-sm uppercase tracking-tight truncate">{displayName}</h4>
                <div className="flex items-center gap-2 mt-0.5">
                  <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest leading-none px-2 py-1 bg-[var(--app-bg-muted)] rounded-full border border-slate-100">
                    ID: {displayId}
                  </span>
                  <span className="text-[9px] font-black text-[var(--app-orange)] uppercase tracking-widest leading-none">Verified Access</span>
                </div>
              </div>
            </div>
          </motion.div>
        </section>

        {/* Section 02. CAPITAL CONTROLS */}
        <section className="space-y-4 pt-2">
          <div className="flex items-center gap-3 mb-4">
             <span className="text-[#F5A623] font-black text-sm tracking-widest">02.</span>
             <h3 className="font-black text-[13px] uppercase tracking-[0.2em] text-[#999999]">Capital Controls</h3>
             <div className="flex-1 h-[2px] bg-[#E0E0E0]" />
          </div>

          <div className="grid grid-cols-2 gap-3">
            {[
              { label: "Top Up", icon: DuotoneArrowUp, color: "bg-[var(--app-shape-accent)] text-white", primary: "#ffffff" },
              { label: "Withdraw", icon: DuotoneArrowDown, color: "bg-[#FFC55A] text-[var(--app-text)]", primary: "var(--app-text)" }
            ].map((btn, i) => (
              <motion.button 
                key={btn.label}
                {...grace(0.2 + i * 0.1)}
                whileTap={{ scale: 0.95 }}
                className={`flex items-center justify-center gap-3 p-4 rounded-2xl font-black uppercase tracking-widest text-[10px] shadow-sm transition-all ${btn.color}`}
              >
                <btn.icon size={16} primary={btn.primary} />
                {btn.label}
              </motion.button>
            ))}
          </div>

          {/* Secondary Action Block */}
          <motion.button 
            {...grace(0.4)}
            whileTap={{ scale: 0.96 }}
            className="w-full bg-[var(--app-bg)] rounded-2xl border border-slate-200 p-4 flex items-center justify-between shadow-sm active:scale-95 transition-all"
          >
            <div className="flex items-center gap-3">
               <div className="w-8 h-8 rounded-full bg-[var(--app-bg-muted)] flex items-center justify-center border border-slate-100">
                  <DuotonePiggyBank size={16} primary="var(--app-text)" />
               </div>
               <span className="text-[10px] font-black text-[var(--app-text)] uppercase tracking-widest">Growth Rules</span>
            </div>
            <span className="text-[#F5A623] font-black text-[9px] uppercase tracking-widest">Configure</span>
          </motion.button>
        </section>

        {/* Section 03. SAVINGS LEDGER */}
        <section className="space-y-4 pt-4">
          <div className="flex items-center gap-3 mb-4">
             <span className="text-[#F5A623] font-black text-sm tracking-widest">03.</span>
             <h3 className="font-black text-[13px] uppercase tracking-[0.2em] text-[#999999]">History Ledger</h3>
             <div className="flex-1 h-[2px] bg-[#E0E0E0]" />
          </div>

          <div className="bg-[var(--app-bg)] rounded-[24px] border border-slate-100 shadow-sm overflow-hidden divide-y divide-slate-50">
            {ledgerData.map((tx, idx) => (
              <motion.div 
                key={tx.id}
                {...grace(0.5 + idx * 0.05)}
                className="p-4 flex items-center justify-between active:bg-[var(--app-bg-muted)] transition-colors"
                style={{ backgroundImage: "radial-gradient(#e5e7eb 0.5px, transparent 0.5px)", backgroundSize: "16px 16px" }}
              >
                <div className="flex flex-col relative z-10">
                  <span className="font-black text-[var(--app-text)] text-xs uppercase tracking-tight">{tx.source}</span>
                  <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider mt-0.5">{tx.date}</span>
                </div>
                <div className="text-right flex flex-col items-end relative z-10">
                  <span className="font-black text-[#00C853] text-[13px] tracking-tight">+{tx.amount}</span>
                  <span className="text-[8px] font-bold text-slate-300 uppercase tracking-widest mt-0.5">Credited</span>
                </div>
              </motion.div>
            ))}
            
            <div className="p-4 flex items-center justify-center bg-[var(--app-bg-muted)]/50">
               <span className="text-[8px] font-black text-slate-300 uppercase tracking-[0.3em]">EndOfRecords</span>
            </div>
          </div>
        </section>

        {/* Achievement / Security Wrap */}
        <motion.div 
          {...grace(0.8)}
          className="rounded-2xl shadow-md bg-[var(--app-shape-accent)] overflow-hidden aspect-[4/1] relative flex items-center justify-center"
        >
          <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />
          <p className="relative z-10 text-white font-black uppercase tracking-[0.4em] text-[10px]">Active Vault Protected</p>
        </motion.div>
      </div>

      <div className="h-10" />
    </div>
  );
}
