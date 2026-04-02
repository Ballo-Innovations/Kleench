import { Settings, Bell, Search, ChevronLeft, MessageCircle, X } from "lucide-react";
import { Link, useNavigate } from "react-router";
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import kleenchLogo from "@/assets/kleench_logo.png";

interface PageHeaderProps {
  title?: string;
  subtitle?: string;
  children?: React.ReactNode;
  showBack?: boolean;
  useLogo?: boolean;
  height?: string | number;
  searchValue?: string;
  onSearchChange?: (val: string) => void;
}

export function PageHeader({ 
  title, 
  subtitle, 
  children, 
  showBack = false, 
  useLogo = false, 
  height = 90,
  searchValue,
  onSearchChange
}: PageHeaderProps) {
  const navigate = useNavigate();
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <div 
      className="relative pt-4 pb-0 px-6 overflow-hidden flex flex-col justify-between"
      style={{ 
        background: "linear-gradient(135deg, #FF8C00, #e06900)", 
        boxShadow: "0 10px 30px rgba(255,140,0,0.12)",
        height: typeof height === "number" ? `${height}px` : height
      }}
    >
      {/* ── Premium grid texture ── */}
      <div className="absolute inset-0 opacity-[0.25]" style={{ WebkitMaskImage: 'radial-gradient(circle at top left, white, transparent 80%)', maskImage: 'radial-gradient(circle at top left, white, transparent 80%)' }}>
        <svg width="100%" height="100%">
          <defs>
            <pattern id="premium-header-grid" width="32" height="32" patternUnits="userSpaceOnUse">
              <path d="M 32 0 L 0 0 0 32" fill="none" stroke="white" strokeWidth="1.5" strokeOpacity="0.6"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#premium-header-grid)"/>
        </svg>
      </div>
      
      {/* ── Soft glow orbs ── */}
      <div className="absolute top-[-20%] left-[-10%] w-64 h-64 bg-white/20 rounded-full blur-[60px] pointer-events-none"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-48 h-48 bg-[#FFC300]/20 rounded-full blur-[50px] pointer-events-none"></div>

      {/* ── Header Top Layer (HUD Bar) ── */}
      <div className="relative z-[40] mt-0 flex items-center justify-between min-h-[40px]">
        {/* LEFT HUD: Back OR Logo */}
        <div className="flex items-center min-w-[24px]">
          {showBack ? (
            <motion.button 
              whileTap={{ scale: 0.9 }}
              onClick={() => navigate(-1)}
              className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md border border-white/10 text-white flex items-center justify-center shadow-lg active:bg-white/30 transition-all shrink-0"
            >
              <ChevronLeft size={24} />
            </motion.button>
          ) : useLogo ? (
            <div className="flex items-center h-full">
              <img src={kleenchLogo} alt="KLEENCH" className="h-[28px] w-auto brightness-0 invert opacity-100" />
            </div>
          ) : (
            <div />
          )}
        </div>
        
        {/* RIGHT HUD: Search, Chat, Settings, Notifications */}
        <div className="flex items-center gap-3.5 flex-shrink-0">
          <div className="flex items-center">
            <motion.div 
              layout
              initial={false}
              animate={{ width: isSearchOpen ? "160px" : "auto" }}
              className={`flex items-center text-white transition-all ${isSearchOpen ? 'bg-white/20 backdrop-blur-md border border-white/10 rounded-2xl px-2 h-9' : 'cursor-pointer hover:text-white/80 active:scale-95 px-1'}`}
              onClick={() => !isSearchOpen && setIsSearchOpen(true)}
            >
              <Search size={22} className="flex-shrink-0" />
              <AnimatePresence>
                {isSearchOpen && (
                  <motion.div 
                    initial={{ opacity: 0 }} 
                    animate={{ opacity: 1 }} 
                    exit={{ opacity: 0, transition: { duration: 0.1 } }}
                    className="flex items-center flex-1 ml-2 min-w-0"
                  >
                    <input 
                      autoFocus 
                      type="text" 
                      placeholder="Search..." 
                      value={searchValue || ""}
                      onChange={(e) => onSearchChange?.(e.target.value)}
                      className="bg-transparent text-white placeholder-white/70 text-[12px] font-bold outline-none flex-1 min-w-0" 
                    />
                    <button 
                      onClick={(e) => { 
                        e.stopPropagation(); 
                        if (searchValue) {
                          onSearchChange?.("");
                        } else {
                          setIsSearchOpen(false);
                        }
                      }}
                      className="ml-1 p-0.5 hover:text-white/80 transition-colors flex-shrink-0"
                    >
                      <X size={14} />
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
          <Link to="/messages" className="text-white hover:text-white/80 transition-all active:scale-95">
             <MessageCircle size={22} />
          </Link>
          <Link to="/settings" className="text-white hover:text-white/80 transition-all active:scale-95">
            <Settings size={22} />
          </Link>
          <Link to="/notifications" className="relative text-white hover:text-white/80 transition-all active:scale-95">
            <Bell size={22} />
            <span className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-[#FF3000] rounded-full border border-white" />
          </Link>
          <Link to="/profile" className="w-8 h-8 rounded-full border-2 border-white/40 overflow-hidden bg-white/20 shrink-0 shadow-sm hover:scale-105 transition-transform active:scale-95">
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

      <div className="relative z-10 space-y-0.5 mb-2 mt-1 px-1">
        {!useLogo && title && (
          <h1 className="text-white text-xl font-black tracking-tight uppercase" style={{ fontFamily: "system-ui, -apple-system, sans-serif" }}>{title}</h1>
        )}
        {subtitle && <p className="text-white/60 text-[10px] font-bold uppercase tracking-widest leading-tight">{subtitle}</p>}
      </div>

      {children}
    </div>
  );
}
