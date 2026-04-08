import { Settings, Bell, Search, ChevronLeft, MessageCircle, X, Eye, EyeOff, ArrowUpFromLine, ArrowDownToLine } from "lucide-react";
import { Link, useNavigate } from "react-router";
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import kleenchLogo from "@/assets/kleench_logo.png";

interface PageHeaderProps {
  title?: string;
  subtitle?: string;
  children?: React.ReactNode; 
  customBalanceHUD?: React.ReactNode; // For Wallet overrides
  showBack?: boolean;
  useLogo?: boolean;
  searchValue?: string;
  onSearchChange?: (val: string) => void;
}

export function PageHeader({ 
  title, 
  subtitle, 
  children,
  customBalanceHUD,
  showBack = false, 
  useLogo = false, 
  searchValue,
  onSearchChange
}: PageHeaderProps) {
  const navigate = useNavigate();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [balanceHidden, setBalanceHidden] = useState(false);

  return (
    <div 
      className="relative pt-2 pb-3 px-5 overflow-hidden shadow-lg flex flex-col justify-between shrink-0"
      style={{ 
        background: "linear-gradient(135deg, #FF8C00, #e06900)", 
        boxShadow: "0 10px 30px rgba(255,140,0,0.12)",
        height: "115px", // STRICTLY LOCKED ENFORCED HEIGHT FOR ALL PAGES
        minHeight: "115px",
        maxHeight: "115px"
      }}
    >
      {/* ── Grid texture ── */}
      <div className="absolute inset-0 opacity-[0.25]" style={{ WebkitMaskImage: "radial-gradient(circle at top left, white, transparent 80%)", maskImage: "radial-gradient(circle at top left, white, transparent 80%)" }}>
        <svg width="100%" height="100%">
          <defs>
            <pattern id="home-grid" width="32" height="32" patternUnits="userSpaceOnUse">
              <path d="M 32 0 L 0 0 0 32" fill="none" stroke="white" strokeWidth="1.5" strokeOpacity="0.6" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#home-grid)" />
        </svg>
      </div>
      <div className="absolute top-[-20%] left-[-10%] w-64 h-64 bg-white/20 rounded-full blur-[60px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-48 h-48 bg-[#FFC300]/20 rounded-full blur-[50px] pointer-events-none" />

      {/* Top Nav Row */}
      <div className="relative z-10 flex items-center justify-between h-12 gap-3 mt-0 border-b border-white/20 pb-2 mb-1">
        
        {/* LEFT HUD: Back, Logo, and PAGE TITLE */}
        <div className="flex items-center flex-shrink-0 z-10 gap-2">
          {showBack && (
             <motion.button 
               whileTap={{ scale: 0.9 }}
               onClick={() => navigate(-1)}
               className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-md border border-white/10 text-white flex items-center justify-center shadow-sm transition-transform shrink-0"
             >
               <ChevronLeft size={20} />
             </motion.button>
          )}

          {useLogo && (
             <Link to="/" className="flex-shrink-0 flex items-center">
               <img src={kleenchLogo} alt="KLEENCH" className="h-6 w-auto object-contain brightness-0 invert" />
             </Link>
          )}

          {title && (
             <div className="flex flex-col min-w-0 flex-1 ml-1">
               <h1 className="text-white text-[16px] leading-tight font-black tracking-wide uppercase truncate drop-shadow-sm" style={{ fontFamily: "Agrandir, system-ui, -apple-system, sans-serif" }}>
                  {title}
               </h1>
               {subtitle && <span className="text-white/80 text-[8px] font-bold uppercase tracking-[0.2em] mt-[1px] truncate">{subtitle}</span>}
             </div>
          )}
        </div>

        {/* Expandable Search */}
        <div className="flex-1 flex justify-end overflow-hidden ml-2">
          <motion.div
            layout initial={false}
            animate={{ width: isSearchOpen ? "100%" : "auto" }}
            className={`flex items-center text-white transition-all ${isSearchOpen ? "bg-white/20 backdrop-blur-md border border-white/10 rounded-2xl px-3 h-9" : "cursor-pointer active:scale-95 px-2"}`}
            onClick={() => !isSearchOpen && setIsSearchOpen(true)}
          >
            <Search size={20} className="flex-shrink-0" />
            <AnimatePresence>
              {isSearchOpen && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, transition: { duration: 0.1 } }} className="flex items-center flex-1 ml-2 min-w-0">
                  <input 
                     autoFocus 
                     type="text" 
                     placeholder="Search..." 
                     value={searchValue || ""} 
                     onChange={(e) => onSearchChange?.(e.target.value)} 
                     className="bg-transparent text-white placeholder-white/70 text-[13px] font-bold outline-none flex-1 min-w-0" 
                  />
                  <button 
                     onClick={(e) => { 
                        e.stopPropagation(); 
                        if(searchValue) onSearchChange?.(""); 
                        else setIsSearchOpen(false); 
                     }} 
                     className="ml-1 transition-colors flex-shrink-0 active:scale-90"
                  >
                    <X size={15} />
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>

        {/* Nav Icons */}
        <div className="flex items-center gap-3.5 flex-shrink-0 pr-1 ml-1">
          <Link to="/messages" className="text-white/80 transition-transform active:scale-95">
            <MessageCircle size={20} />
          </Link>
          <Link to="/settings" className="text-white/80 transition-transform active:scale-95">
            <Settings size={20} />
          </Link>
          <Link to="/notifications" className="relative text-white/80 transition-transform active:scale-95">
            <Bell size={20} />
            <span className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-[#FFC300] rounded-full border border-[#e06900]" />
          </Link>
          <Link to="/profile" className="w-8 h-8 rounded-full border-2 border-white/40 overflow-hidden bg-white/20 shrink-0 shadow-sm transition-transform active:scale-95">
            {localStorage.getItem("userProfilePhoto") ? (
              <img src={localStorage.getItem("userProfilePhoto")!} alt="Profile" className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-white text-[10px] font-black uppercase">
                {(() => {
                  const raw = localStorage.getItem("userKyc");
                  if (raw) {
                    const kyc = JSON.parse(raw);
                    return kyc.fullName?.split(" ").map((n: string) => n[0]).join("") || "K";
                  }
                  return "K";
                })()}
              </div>
            )}
          </Link>
        </div>
      </div>

      <div className="relative z-10 w-full mt-2">
        {customBalanceHUD ? (
          // Renders custom wallet HUD but restricts to the same spatial box
          <div className="h-[46px] flex items-center w-full">
            {customBalanceHUD}
          </div>
        ) : (
          // Default Dashboard Balance HUD
          <motion.div
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="flex items-center justify-between bg-white/10 backdrop-blur-md border border-white/20 rounded-full py-[6px] px-3 shadow-[0_4px_24px_rgba(0,0,0,0.06)] w-full mx-auto"
          >
            <div className="flex items-center gap-2">
              <div className="min-w-0">
                <p className="text-white/60 text-[8px] font-bold uppercase tracking-widest leading-none mb-1">Balance</p>
                <div className="flex items-center gap-2">
                  <h2 className="text-white text-[15px] font-black tracking-tight leading-none">
                    {balanceHidden ? "••••••" : "ZMW 2,450.00"}
                  </h2>
                  <button onClick={() => setBalanceHidden(!balanceHidden)} className="text-white/40 transition-colors">
                    {balanceHidden ? <EyeOff size={12} /> : <Eye size={12} />}
                  </button>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-1.5 pl-2.5 border-l border-white/15">
              {[
                { icon: ArrowUpFromLine, label: "Withdraw", to: "/wallet" },
                { icon: ArrowDownToLine, label: "Deposit", to: "/wallet" },
              ].map(({ icon: Icon, label, to }) => (
                <Link key={label} to={to} title={label}
                  className="w-7 h-7 rounded-full bg-white/20/30 flex items-center justify-center text-white transition-all active:scale-95 border border-white/10 shadow-sm">
                  <Icon size={14} />
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </div>

      {children}
    </div>
  );
}
