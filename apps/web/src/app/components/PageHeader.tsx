import { Settings, Bell, Search, ChevronLeft, MessageCircle, X, Eye, EyeOff, ArrowUpFromLine, ArrowDownToLine, UserPlus, ShieldCheck, User, Settings as SettingsIcon, HelpCircle, LogOut } from "lucide-react";
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

  const [showNotifications, setShowNotifications] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  return (
    <>
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
          <Link to="/messages" className="text-white/80 transition-transform active:scale-95 outline-none">
            <MessageCircle size={20} />
          </Link>
          <button onClick={() => setShowSettings(true)} className="text-white/80 transition-transform active:scale-95 outline-none">
            <Settings size={20} />
          </button>
          <button onClick={() => setShowNotifications(true)} className="relative text-white/80 transition-transform active:scale-95 outline-none">
            <Bell size={20} />
            <span className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-[#FFC300] rounded-full border border-[#e06900]" />
          </button>
          <button onClick={() => setShowSettings(true)} className="w-8 h-8 rounded-full border-2 border-white/40 overflow-hidden bg-white/20 shrink-0 shadow-sm transition-transform active:scale-95 outline-none">
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
          </button>
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

    {/* MODALS RENDERED PORTAL-STYLE */}
    <AnimatePresence>
      {showNotifications && (
        <>
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => setShowNotifications(false)}
            className="fixed inset-0 z-[100] bg-black/40 backdrop-blur-sm max-w-md mx-auto"
          />
          <motion.div 
            initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -20, opacity: 0 }}
            className="fixed top-16 right-4 left-4 z-[110] bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden max-w-[380px] mx-auto"
          >
            <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
              <h3 className="font-black text-slate-800 uppercase tracking-widest text-xs">Notifications</h3>
              <button onClick={() => setShowNotifications(false)} className="text-slate-400 active:scale-90 transition-transform"><X size={16} /></button>
            </div>
            <div className="divide-y divide-slate-50 max-h-[60vh] overflow-y-auto" style={{ scrollbarWidth: "none" }}>
              {[
                { id: 1, title: "Transaction Successful", desc: "You received ZMW 500.00 from John Doe.", time: "10m ago", icon: ArrowDownToLine, color: "text-emerald-500", bg: "bg-emerald-50" },
                { id: 2, title: "New Agent Referral", desc: "Jane joined using your code. You earned K10.", time: "1h ago", icon: UserPlus, color: "text-blue-500", bg: "bg-blue-50" },
                { id: 3, title: "Kleench Security", desc: "A new login was detected from Lusaka.", time: "Yesterday", icon: ShieldCheck, color: "text-amber-500", bg: "bg-amber-50" }
              ].map(notif => (
                <div key={notif.id} className="p-4 flex gap-4 active:bg-slate-50 cursor-pointer transition-colors">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${notif.bg} ${notif.color}`}>
                    <notif.icon size={16} strokeWidth={2.5} />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-800 text-[11px] mb-1 leading-tight">{notif.title}</h4>
                    <p className="text-slate-500 text-[10px] leading-snug mb-1.5">{notif.desc}</p>
                    <span className="text-slate-400 text-[8px] uppercase font-bold tracking-widest">{notif.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </>
      )}

      {showSettings && (
        <>
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => setShowSettings(false)}
            className="fixed inset-0 z-[100] bg-black/40 backdrop-blur-sm max-w-md mx-auto"
          />
          <motion.div 
            initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }} transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed top-0 bottom-0 right-0 w-[85%] max-w-[320px] bg-white z-[110] shadow-2xl flex flex-col"
          >
            <div className="p-6 bg-slate-50 border-b border-slate-100 flex items-start justify-between">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-full border-2 border-slate-200 overflow-hidden bg-white shrink-0 shadow-sm">
                  {localStorage.getItem("userProfilePhoto") ? (
                    <img src={localStorage.getItem("userProfilePhoto")!} alt="Profile" className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-slate-400 text-lg font-black uppercase">K</div>
                  )}
                </div>
                <div>
                  <h4 className="font-black text-slate-800 text-sm leading-tight mb-1">
                    {(() => {
                      const raw = localStorage.getItem("userKyc");
                      return raw ? JSON.parse(raw).fullName : "Kleench User"
                    })()}
                  </h4>
                  <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest">Free Account</p>
                </div>
              </div>
              <button onClick={() => setShowSettings(false)} className="text-slate-400 active:scale-90 transition-transform bg-white w-8 h-8 rounded-full flex items-center justify-center shadow-sm border border-slate-100"><X size={16} /></button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-4 space-y-2">
              <h5 className="text-[10px] uppercase font-black tracking-[0.2em] text-slate-400 ml-2 mb-4 mt-2">Account Hub</h5>
              {[
                { icon: User, label: "My Profile", to: "/profile" },
                { icon: ShieldCheck, label: "Verification (KYC)", to: "/wallet" },
                { icon: SettingsIcon, label: "App Preferences", to: "#" },
                { icon: HelpCircle, label: "Help & Support", to: "#" },
              ].map((item, i) => (
                <button key={i} onClick={() => { setShowSettings(false); if(item.to !== "#") navigate(item.to); }} className="w-full flex items-center gap-4 p-3 rounded-2xl active:bg-slate-50 transition-colors text-left group">
                  <div className="w-10 h-10 rounded-xl bg-slate-50 text-slate-600 flex items-center justify-center group-active:scale-95 transition-transform"><item.icon size={18} strokeWidth={2} /></div>
                  <span className="font-bold text-slate-700 text-xs">{item.label}</span>
                </button>
              ))}
              
              <div className="mt-8 pt-6 border-t border-slate-100 px-2">
                <button onClick={() => { setShowSettings(false); navigate("/"); }} className="flex items-center gap-4 text-red-500 font-bold text-xs uppercase tracking-widest active:opacity-50 transition-opacity">
                  <LogOut size={16} strokeWidth={2.5} /> Sign Out
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
    </>
  );
}
