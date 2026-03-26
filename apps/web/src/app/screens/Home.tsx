import { Link } from "react-router";
import { useState } from "react";
import { 
  Settings, Bell, Search, Eye, EyeOff, 
  Send, X, ArrowDownToLine, ArrowUpFromLine,
  Play, GraduationCap, ClipboardList, Users
} from "lucide-react";
import { motion, AnimatePresence, type PanInfo } from "motion/react";

import kleenchLogo from "@/assets/kleench_logo.png";
import { BackspaceKey } from "../components/KleenchIcons";
import { PageSkeletons, usePageLoading } from "../components/PageSkeletons";

const trendingBanners = [
  { 
    id: 1, 
    title: "Cheapest Cement in Lusaka!", 
    buttonText: "View Deals", 
    image: "https://picsum.photos/seed/cement3/500/300", 
  },
  { 
    id: 2, 
    title: "Exclusive Event Tickets", 
    buttonText: "Buy Now", 
    image: "https://picsum.photos/seed/event3/500/300", 
  }
];

export function Home() {
  const loading = usePageLoading(800);
  const [balanceHidden, setBalanceHidden] = useState(true);
  const [pinInput, setPinInput] = useState("");
  const [showPinModal, setShowPinModal] = useState(false);
  const [pinError, setPinError] = useState("");
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  if (loading) return <PageSkeletons.Home />;

  const handleToggleBalance = () => {
    if (balanceHidden) {
      setShowPinModal(true);
      setPinInput("");
      setPinError("");
    } else {
      setBalanceHidden(true);
    }
  };

  const verifyPin = (pinStr: string) => {
    const savedPin = localStorage.getItem("userPin") || "1234";
    if (pinStr === savedPin) {
      setBalanceHidden(false);
      setShowPinModal(false);
    } else {
      setPinError("Incorrect PIN");
      setTimeout(() => {
        setPinInput("");
        setPinError("");
      }, 1000);
    }
  };

  const handlePinPress = (digit: string) => {
    if (pinInput.length < 4) {
      const updated = pinInput + digit;
      setPinInput(updated);
      if (updated.length === 4) {
        verifyPin(updated);
      }
    }
  };

  function grace(delay = 0) {
    return {
      duration: 0.62,
      delay,
      ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
    };
  }

  return (
    <div className="w-full relative min-h-[100dvh] bg-gray-50 overflow-x-hidden font-sans pb-32">
      
      {/* ── Unified cross-hatch bg ── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 0 }}>
        <svg width="100%" height="100%" style={{ position: "absolute", inset: 0 }}>
          <defs>
            <pattern id="xhatch-home" x="0" y="0" width="24" height="24" patternUnits="userSpaceOnUse">
              <line x1="0" y1="0" x2="24" y2="24" stroke="#FF8C00" strokeWidth="0.5" strokeOpacity="0.07"/>
              <line x1="24" y1="0" x2="0" y2="24" stroke="#FF8C00" strokeWidth="0.5" strokeOpacity="0.07"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#xhatch-home)"/>
        </svg>
      </div>

      {/* ── Unified Dashboard Header ── */}
      <div className="relative pt-4 pb-0 px-5 overflow-hidden rounded-b-[40px] shadow-lg flex flex-col justify-between h-[180px]"
        style={{ background: "linear-gradient(135deg, #FF8C00, #e06900)", boxShadow: "0 10px 30px rgba(255,140,0,0.12)" }}>
        
        {/* Premium grid texture with depth */}
        <div className="absolute inset-0 opacity-[0.2]" style={{ WebkitMaskImage: 'radial-gradient(circle at top left, white, transparent 80%)', maskImage: 'radial-gradient(circle at top left, white, transparent 80%)' }}>
          <svg width="100%" height="100%">
            <defs>
              <pattern id="premium-grid" width="32" height="32" patternUnits="userSpaceOnUse">
                <path d="M 32 0 L 0 0 0 32" fill="none" stroke="white" strokeWidth="1" strokeOpacity="0.4"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#premium-grid)"/>
          </svg>
        </div>
        {/* Soft glow effects */}
        <div className="absolute top-[-20%] left-[-10%] w-64 h-64 bg-white/10 rounded-full blur-[60px] pointer-events-none"></div>

        <div className="relative z-10 flex items-center justify-between h-10 gap-3 mt-2">
          {/* Logo */}
          <Link to="/" className="flex-shrink-0">
            <img src={kleenchLogo} alt="KLEENCH" className="h-6 w-auto object-contain brightness-0 invert" />
          </Link>

          {/* Expandable Search Bar Wrapper */}
          <div className="flex-1 flex justify-end overflow-hidden">
            <motion.div 
              layout
              initial={false}
              animate={{ width: isSearchOpen ? "100%" : "auto" }}
              className={`flex items-center text-white transition-all ${isSearchOpen ? 'bg-white/20 backdrop-blur-md border border-white/10 rounded-2xl px-3 h-10' : 'cursor-pointer hover:text-white/80 active:scale-95 px-2'}`}
              onClick={() => !isSearchOpen && setIsSearchOpen(true)}
            >
              <Search size={20} className="flex-shrink-0" />
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
                      className="bg-transparent text-white placeholder-white/70 text-[13px] outline-none flex-1 min-w-0" 
                    />
                    <button 
                      onClick={(e) => { e.stopPropagation(); setIsSearchOpen(false); }}
                      className="ml-1 p-1 hover:text-white/80 transition-colors flex-shrink-0"
                    >
                      <X size={14} />
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>

          {/* Icons */}
          <div className="flex items-center gap-3.5 flex-shrink-0 pr-1">
            <Link to="/settings" className="text-white hover:text-white/80 transition-all active:scale-95">
              <Settings size={20} />
            </Link>
            <Link to="/notifications" className="relative text-white hover:text-white/80 transition-all active:scale-95">
              <Bell size={20} />
              <span className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-[#FF8C00] rounded-full border border-[#e06900]" />
            </Link>
          </div>
        </div>

        {/* Integrated User & Wallet Bar */}
        <motion.div
           initial={{ opacity: 0, y: 10 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ delay: 0.1 }}
           className="relative z-10 flex items-center justify-between gap-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-[24px] p-2.5 shadow-sm mb-6"
        >
           {/* Profile & Name */}
           <div className="flex items-center gap-2.5">
             <Link to="/profile" className="w-10 h-10 rounded-full border-2 border-white/30 overflow-hidden bg-white/20 shrink-0 shadow-sm hover:scale-105 transition-transform">
               {localStorage.getItem("userProfilePhoto") ? (
                 <img src={localStorage.getItem("userProfilePhoto")!} alt="Profile" className="w-full h-full object-cover" />
               ) : (
                 <div className="w-full h-full flex items-center justify-center text-white text-[11px] font-black uppercase">
                   {(() => {
                     const localKycRaw = localStorage.getItem("userKyc");
                     if (localKycRaw) {
                       const kyc = JSON.parse(localKycRaw);
                       return kyc.fullName?.split(" ").map((n: string) => n[0]).join("") || "K";
                     }
                     return "K";
                   })()}
                 </div>
               )}
             </Link>
             <div className="min-w-0">
                <p className="text-white/60 text-[9px] font-bold uppercase tracking-wider leading-none mb-1">Total Balance</p>
                <div className="flex items-center gap-2">
                   <h2 className="text-white text-[18px] font-black tracking-tight leading-none">
                      {balanceHidden ? "••••••" : "K2,450.00"}
                   </h2>
                   <button onClick={handleToggleBalance} className="text-white/40 hover:text-white transition-colors">
                      {balanceHidden ? <EyeOff size={14} /> : <Eye size={14} />}
                   </button>
                </div>
             </div>
           </div>

           {/* Quick Actions */}
           <div className="flex items-center gap-1.5 pl-3 border-l border-white/10">
              <button 
                className="w-9 h-9 rounded-xl bg-white/20 hover:bg-white/30 flex items-center justify-center text-white transition-all active:scale-95 border border-white/20 shadow-sm"
                title="Deposit Money"
              >
                <ArrowDownToLine size={18} />
              </button>
              <button 
                className="w-9 h-9 rounded-xl bg-white/20 hover:bg-white/30 flex items-center justify-center text-white transition-all active:scale-95 border border-white/20 shadow-sm"
                title="Send Money"
              >
                <Send size={16} className="-rotate-12 translate-x-0.5" />
              </button>
              <button 
                className="w-9 h-9 rounded-xl bg-white/20 hover:bg-white/30 flex items-center justify-center text-white transition-all active:scale-95 border border-white/20 shadow-sm"
                title="Withdraw Money"
              >
                <ArrowUpFromLine size={18} />
              </button>
           </div>
        </motion.div>
      </div>

      <div className="px-5 mt-6 relative z-10 space-y-6">
        {/* ── EARN TODAY: V-GROWTH MINIMALIST STYLE ── */}
        <motion.section 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          transition={grace(0.3)} 
          className="relative z-10"
        >
          <div className="flex flex-col gap-2 overflow-hidden">
            
            {/* Watch Ads Card */}
            <motion.div 
              whileHover={{ height: 82, backgroundColor: "#FFC300" }} 
              initial={{ height: 58 }}
              className="group rounded-2xl overflow-hidden transition-colors duration-200"
            >
              <Link to="/ads" className="flex items-center h-full justify-between p-2">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-white shadow-sm flex items-center justify-center group-hover:bg-white/50 transition-colors">
                    <Play size={18} className="text-[#FFC300] fill-[#FFC300] group-hover:text-black group-hover:fill-black" />
                  </div>
                  <div className="flex flex-col justify-center">
                    <span className="text-[#0077B6] font-black text-[7px] uppercase tracking-widest leading-none mb-1 group-hover:text-black">Watch Ads</span>
                    <h3 className="text-[#003366] font-black text-lg tracking-tight leading-none group-hover:text-black transition-colors">
                      Watch & Earn
                    </h3>
                  </div>
                </div>
                <div className="pr-2 opacity-0 group-hover:opacity-100 transition-all scale-0 group-hover:scale-100">
                   <div className="bg-black text-[#FFC300] px-3 py-1 rounded-full text-[9px] font-black uppercase">Start</div>
                </div>
              </Link>
            </motion.div>

            {/* Masterclass Card */}
            <motion.div 
              whileHover={{ height: 82, backgroundColor: "#FFC300" }} 
              initial={{ height: 58 }}
              className="group rounded-2xl overflow-hidden transition-colors duration-200"
            >
              <Link to="/learning" className="flex items-center h-full justify-between p-2">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-white shadow-sm flex items-center justify-center group-hover:bg-white/50 transition-colors">
                    <GraduationCap size={18} className="text-[#FFC300] group-hover:text-black" />
                  </div>
                  <div className="flex flex-col justify-center">
                    <span className="text-[#0077B6] font-black text-[7px] uppercase tracking-widest leading-none mb-1 group-hover:text-black">Education</span>
                    <h3 className="text-[#003366] font-black text-lg tracking-tight leading-none group-hover:text-black transition-colors">
                      Masterclass
                    </h3>
                  </div>
                </div>
                <div className="pr-2 opacity-0 group-hover:opacity-100 transition-all scale-0 group-hover:scale-100">
                   <div className="bg-black text-[#FFC300] px-3 py-1 rounded-full text-[9px] font-black uppercase">Learn</div>
                </div>
              </Link>
            </motion.div>

            {/* Survey Card */}
            <motion.div 
              whileHover={{ height: 82, backgroundColor: "#FFC300" }} 
              initial={{ height: 58 }}
              className="group rounded-2xl overflow-hidden transition-colors duration-200"
            >
              <Link to="/surveys" className="flex items-center h-full justify-between p-2">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-white shadow-sm flex items-center justify-center group-hover:bg-white/50 transition-colors">
                    <ClipboardList size={18} className="text-[#FFC300] group-hover:text-black" />
                  </div>
                  <div className="flex flex-col justify-center">
                    <span className="text-[#0077B6] font-black text-[7px] uppercase tracking-widest leading-none mb-1 group-hover:text-black">Feedback</span>
                    <h3 className="text-[#003366] font-black text-lg tracking-tight leading-none group-hover:text-black transition-colors">
                      Data Survey
                    </h3>
                  </div>
                </div>
                <div className="pr-2 opacity-0 group-hover:opacity-100 transition-all scale-0 group-hover:scale-100">
                   <div className="bg-black text-[#FFC300] px-3 py-1 rounded-full text-[9px] font-black uppercase">Vote</div>
                </div>
              </Link>
            </motion.div>

            {/* Social Card */}
            <motion.div 
              whileHover={{ height: 82, backgroundColor: "#FFC300" }} 
              initial={{ height: 58 }}
              className="group rounded-2xl overflow-hidden transition-colors duration-200"
            >
              <Link to="/socials" className="flex items-center h-full justify-between p-2">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-white shadow-sm flex items-center justify-center group-hover:bg-white/50 transition-colors">
                    <Users size={18} className="text-[#FFC300] group-hover:text-black" />
                  </div>
                  <div className="flex flex-col justify-center">
                    <span className="text-[#0077B6] font-black text-[7px] uppercase tracking-widest leading-none mb-1 group-hover:text-black">Community</span>
                    <h3 className="text-[#003366] font-black text-lg tracking-tight leading-none group-hover:text-black transition-colors">
                      Invite Friends
                    </h3>
                  </div>
                </div>
                <div className="pr-2 opacity-0 group-hover:opacity-100 transition-all scale-0 group-hover:scale-100">
                   <div className="bg-black text-[#FFC300] px-3 py-1 rounded-full text-[9px] font-black uppercase">Grow</div>
                </div>
              </Link>
            </motion.div>

          </div>
        </motion.section>

        {/* Sponsored Banner perfectly matching the client mockup */}
        <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={grace(0.4)} className="py-2">
          <div className="relative rounded-[24px] h-[120px] bg-[#EF6C00] overflow-hidden shadow-md flex items-center group cursor-pointer active:scale-[0.98] transition-transform border border-black/[0.04]">
            <div className="absolute inset-0 w-full h-full">
              {/* Image from the right fading into the orange gradient */}
              <img src="https://picsum.photos/seed/cityscape/800/400" alt="Sponsored" className="w-full h-full object-cover opacity-90" />
              <div className="absolute inset-0 bg-gradient-to-r from-[#EF6C00] via-[#EF6C00] to-transparent w-[80%]"></div>
            </div>
            
            <div className="relative z-10 p-5 flex flex-col items-start w-full">
              <span className="text-white/90 text-[10px] italic font-semibold mb-1 drop-shadow-sm">Sponsored</span>
              <h2 className="text-white text-xl font-black mb-3 tracking-tight leading-none drop-shadow-sm">Watch & Earn K2</h2>
              <button className="bg-[#005a8d] hover:bg-[#003366] text-white font-bold py-1.5 px-4 rounded-lg text-[11px] transition-colors shadow-sm">
                Watch Now
              </button>
            </div>
          </div>
        </motion.section>

        {/* Trending Now / Stacked Banner Style matching screenshot */}
        <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={grace(0.5)} className="pb-6">
          <div className="flex justify-between items-center mb-3 px-1">
            <h3 className="text-sm font-black text-[#003366] tracking-wide" style={{ fontFamily: "system-ui, -apple-system, sans-serif" }}>Trending Now</h3>
          </div>
          <div className="flex flex-col gap-3">
            {trendingBanners.map((banner) => (
              <div key={banner.id} className="bg-[#EAECEE] rounded-[24px] shadow-sm border border-black/[0.04] overflow-hidden flex h-[110px] active:scale-[0.98] transition-transform cursor-pointer">
                <div className="w-[40%] h-full relative">
                  <img src={banner.image} alt={banner.title} className="absolute inset-0 w-full h-full object-cover" />
                </div>
                <div className="w-[60%] p-4 flex flex-col justify-center relative z-10">
                  <p className="text-[13px] font-bold text-[#003366] leading-snug mb-2">{banner.title}</p>
                  <button className="bg-[#005a8d] hover:bg-[#003366] text-white text-[11px] font-bold px-4 py-1.5 rounded-lg w-fit transition-colors shadow-sm">
                    {banner.buttonText}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </motion.section>
      </div>

      {/* PIN Verification Modal */}
      <AnimatePresence>
        {showPinModal && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex flex-col items-center justify-end bg-[#003366]/60 backdrop-blur-md"
            onClick={() => setShowPinModal(false)}
          >
            <motion.div 
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 26, stiffness: 220 }}
              drag="y"
              dragConstraints={{ top: 0 }}
              dragElastic={0.2}
              onDragEnd={(e: MouseEvent | TouchEvent | PointerEvent, { offset, velocity }: PanInfo) => {
                if (offset.y > 150 || velocity.y > 500) {
                  setShowPinModal(false);
                }
              }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-md bg-white rounded-t-[48px] p-8 pb-12 shadow-2xl relative"
            >
              {/* Drag Handle indicator */}
              <div className="absolute top-0 left-0 w-full h-8 flex justify-center pt-3 cursor-grab active:cursor-grabbing">
                <div className="w-12 h-1.5 bg-gray-200 rounded-full" />
              </div>
              
              <div className="text-center mb-10 mt-4">
                <h3 className="text-2xl font-black text-[#003366] mb-2" style={{ fontFamily: "system-ui, -apple-system, sans-serif" }}>Security PIN</h3>
                <p className="text-[14px] text-gray-500 font-medium px-10">Verification required to view sensitive wallet balances</p>
              </div>
              
              <div className="flex justify-center gap-5 mb-10">
                {[0, 1, 2, 3].map((i) => (
                  <motion.div key={i} animate={{ scale: pinInput.length > i ? 1.2 : 1 }}
                    className={`w-4 h-4 rounded-full border-2 transition-all ${pinInput.length > i ? "bg-[#FF8C00] border-[#FF8C00]" : "border-gray-200"}`} />
                ))}
              </div>
              
              {pinError && (
                <motion.p initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
                  className="text-red-500 text-center text-sm font-bold mb-6">{pinError}</motion.p>
              )}
              
              <div className="grid grid-cols-3 gap-4">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, "", 0, "backspace"].map((val, idx) => {
                  if (val === "") return <div key={idx} />;
                  return (
                    <motion.button
                      key={idx}
                      whileTap={{ scale: 0.92 }}
                      onClick={() => {
                        if (val === "backspace") {
                          setPinInput(p => p.slice(0, -1));
                        } else {
                          handlePinPress(String(val));
                        }
                      }}
                      className="h-20 rounded-3xl bg-gray-50 text-[#003366] text-2xl font-black flex items-center justify-center transition-colors active:bg-[#FF8C00] active:text-white"
                      style={{ fontFamily: "system-ui, -apple-system, sans-serif" }}
                    >
                      {val === "backspace" ? <BackspaceKey size={24} color="currentColor" /> : val}
                    </motion.button>
                  );
                })}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
