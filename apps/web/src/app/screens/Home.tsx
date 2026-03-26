import { Link } from "react-router";
import { useState } from "react";
import { 
  Settings, Bell, Search, Eye, EyeOff, 
  Send, X, ArrowDownToLine, ArrowUpFromLine,
  Play, GraduationCap, ClipboardList, Users,
  Heart, MessageCircle, Share2, MoreHorizontal, PlayCircle
} from "lucide-react";
import { motion, AnimatePresence, type PanInfo } from "motion/react";

import kleenchLogo from "@/assets/kleench_logo.png";
import { BackspaceKey } from "../components/KleenchIcons";
import { PageSkeletons, usePageLoading } from "../components/PageSkeletons";


export function Home() {
  const loading = usePageLoading(800);
  const [balanceHidden, setBalanceHidden] = useState(true);
  const [pinInput, setPinInput] = useState("");
  const [showPinModal, setShowPinModal] = useState(false);
  const [pinError, setPinError] = useState("");
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

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
    <div className="w-full relative min-h-[100dvh] bg-transparent overflow-x-hidden font-sans pb-28">
      
      {/* Home Content Flowing over Global Dashed Grid */}

      {/* ── Unified Dashboard Header ── */}
      <div className="relative pt-11 pb-0 px-5 overflow-hidden rounded-b-[40px] shadow-lg flex flex-col justify-between h-[200px]"
        style={{ background: "linear-gradient(135deg, #FF8C00, #e06900)", boxShadow: "0 10px 30px rgba(255,140,0,0.12)" }}>
        
        {/* Premium grid texture with depth matching Wallet */}
        <div className="absolute inset-0 opacity-[0.25]" style={{ WebkitMaskImage: 'radial-gradient(circle at top left, white, transparent 80%)', maskImage: 'radial-gradient(circle at top left, white, transparent 80%)' }}>
          <svg width="100%" height="100%">
            <defs>
              <pattern id="home-premium-grid" width="32" height="32" patternUnits="userSpaceOnUse">
                <path d="M 32 0 L 0 0 0 32" fill="none" stroke="white" strokeWidth="1.5" strokeOpacity="0.6"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#home-premium-grid)"/>
          </svg>
        </div>
        {/* Soft glow orbs for architectural lighting matching Wallet */}
        <div className="absolute top-[-20%] left-[-10%] w-64 h-64 bg-white/20 rounded-full blur-[60px] pointer-events-none"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-48 h-48 bg-[#FFC300]/20 rounded-full blur-[50px] pointer-events-none"></div>

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
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="bg-transparent text-white placeholder-white/70 text-[13px] outline-none flex-1 min-w-0" 
                    />
                    <button 
                      onClick={(e) => { 
                        e.stopPropagation(); 
                        if (searchQuery) {
                          setSearchQuery("");
                        } else {
                          setIsSearchOpen(false);
                        }
                      }}
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
            <Link to="/messages" className="text-white hover:text-white/80 transition-all active:scale-95">
              <MessageCircle size={20} />
            </Link>
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
        {/* ── Section 02. EARN TODAY (Swiss International Style) ── */}
        <motion.section 
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={grace(0.3)} 
          className="relative z-10 space-y-6"
        >
          <div className="flex items-center gap-3">
             <span className="text-[#FF8C00] font-black text-xs tracking-[0.3em]">02.</span>
             <h3 className="font-black text-[10px] uppercase tracking-[0.4em] text-[#003366]/40">Earn Today</h3>
             <div className="flex-1 h-[2px] bg-[#003366]/5" />
          </div>

          <div className="grid grid-cols-1 gap-0 border-2 border-[#003366] bg-[#003366] divide-y-2 divide-[#003366]/10 shadow-[6px_6px_0px_#FF8C00]">
            {[
              { id: 1, title: "Watch & Earn", label: "Watch Ads", icon: Play, to: "/ads", tag: "Hot" },
              { id: 2, title: "Masterclass", label: "Education", icon: GraduationCap, to: "/learning", tag: "Learn" },
              { id: 3, title: "Data Survey", label: "Feedback", icon: ClipboardList, to: "/surveys", tag: "Earn" },
              { id: 4, title: "Invite Friends", label: "Community", icon: Users, to: "/socials", tag: "Grow" },
            ].filter(item => 
              item.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
              item.label.toLowerCase().includes(searchQuery.toLowerCase())
            ).map((item, idx) => (
              <Link key={item.id} to={item.to}>
                <motion.div 
                  whileTap={{ backgroundColor: "#003366" }}
                  className="bg-white p-5 flex items-center justify-between group transition-all hover:bg-[#003366]/[0.02]"
                >
                  <div className="flex items-center gap-6">
                    <span className="text-[10px] font-black text-[#003366]/15 tracking-widest">{(idx + 1).toString().padStart(2, '0')}.</span>
                    <div className="flex flex-col">
                      <span className="text-[#FF8C00] font-black text-[7px] uppercase tracking-[0.3em] mb-1.5">{item.label}</span>
                      <h3 className="text-[#003366] font-black text-[14px] uppercase tracking-tighter leading-none group-hover:text-[#FF8C00] transition-colors">
                        {item.title}
                      </h3>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                     <span className="text-[8px] font-black uppercase tracking-widest px-2 py-1 bg-[#003366]/5 text-[#003366]/40 border border-[#003366]/10">{item.tag}</span>
                     <div className="w-8 h-8 border border-[#003366]/10 flex items-center justify-center text-[#003366]/30 group-hover:text-[#FF8C00] group-hover:border-[#FF8C00] transition-all">
                        <item.icon size={16} />
                     </div>
                  </div>
                </motion.div>
              </Link>
            ))}
          </div>
        </motion.section>

        {/* ── MEDIA & VIDEO FEED (The 40%+ Viewport Rule) ── */}
        <motion.section 
          initial={{ opacity: 0, y: 30 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={grace(0.4)} 
          className="-mx-5 pt-4 pb-4"
        >
          {/* Feed Title */}
          <div className="mb-6 px-6">
            <h3 className="text-xl font-black text-[#003366] tracking-tight" style={{ fontFamily: "system-ui, -apple-system, sans-serif" }}>For You</h3>
          </div>

          <div className="flex flex-col gap-4 px-2">
            {[
              { 
                id: 1, 
                user: "Lusaka_Times", 
                avatar: "https://i.pravatar.cc/150?u=1", 
                title: "How to save 30% on building materials this season", 
                reward: "K5.00", 
                image: "https://picsum.photos/seed/build1/600/800",
                views: "12.4k"
              },
              { 
                id: 2, 
                user: "Chef_Mwape", 
                avatar: "https://i.pravatar.cc/150?u=2", 
                title: "Traditional recipes that earn you points", 
                reward: "K2.50", 
                image: "https://picsum.photos/seed/food2/600/800",
                views: "8.1k"
              },
              { 
                id: 3, 
                user: "ZambiaMining", 
                avatar: "https://i.pravatar.cc/150?u=3", 
                title: "New copper tech explained in 60 seconds", 
                reward: "K10.00", 
                image: "https://picsum.photos/seed/mine3/600/800",
                views: "24.9k"
              }
            ].map((feed) => (
              <motion.div 
                key={feed.id} 
                initial={{ opacity: 0, scale: 0.93, y: 40 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                whileTap={{ scale: 0.98 }}
                className="relative rounded-[32px] overflow-hidden h-[460px] shadow-xl group border border-black/5 mb-2"
              >
                {/* Background Media */}
                <img src={feed.image} alt={feed.title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/20 to-transparent"></div>

                {/* Video Play Overlay */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <PlayCircle size={64} className="text-white fill-white/10 backdrop-blur-sm rounded-full" />
                </div>

                {/* Earnings Badge */}
                <div className="absolute top-5 right-5 z-20">
                  <div className="bg-[#FFC300] text-black px-4 py-1.5 rounded-full text-[11px] font-black shadow-xl flex items-center gap-1.5 border border-black/10">
                    <span className="w-2 h-2 rounded-full bg-black animate-pulse"></span>
                    EARN {feed.reward}
                  </div>
                </div>

                {/* Media Metadata & Interaction Overlay (Social Style) */}
                <div className="absolute inset-0 flex flex-col justify-end p-6 z-10">
                  <div className="flex items-end justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2.5 mb-3">
                        <div className="w-10 h-10 rounded-full border-2 border-[#FFC300] overflow-hidden shadow-md">
                          <img src={feed.avatar} alt={feed.user} className="w-full h-full object-cover" />
                        </div>
                        <span className="text-white font-black text-sm tracking-tight shadow-sm">@{feed.user}</span>
                      </div>
                      <h4 className="text-white font-black text-[22px] leading-[1.1] tracking-tight mb-4 drop-shadow-lg" style={{ fontFamily: "Inter, sans-serif" }}>
                        {feed.title}
                      </h4>
                      <div className="flex items-center gap-4 text-white/70 text-[11px] font-bold uppercase tracking-widest drop-shadow-sm">
                         <span>{feed.views} Views</span>
                         <span className="w-1 h-1 rounded-full bg-white/40"></span>
                         <span>2h ago</span>
                      </div>
                    </div>

                    {/* Interaction Column */}
                    <div className="flex flex-col gap-5 items-center pb-2">
                      <button className="flex flex-col items-center gap-1 group/btn">
                         <div className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20 transition-all group-hover/btn:bg-[#FFC300] group-hover/btn:text-black">
                           <Heart size={22} className="group-active/btn:scale-125 transition-transform" />
                         </div>
                         <span className="text-white text-[10px] font-black">1.2k</span>
                      </button>
                      <button className="flex flex-col items-center gap-1 group/btn">
                         <div className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20 transition-all group-hover/btn:bg-white group-hover/btn:text-black">
                           <MessageCircle size={22} />
                         </div>
                         <span className="text-white text-[10px] font-black">42</span>
                      </button>
                      <button className="flex flex-col items-center gap-1 group/btn">
                         <div className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20 transition-all group-hover/btn:bg-white group-hover/btn:text-black">
                           <Share2 size={22} />
                         </div>
                         <span className="text-white text-[10px] font-black">Share</span>
                      </button>
                      <button className="text-white/60 hover:text-white pt-2">
                         <MoreHorizontal size={24} />
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* End of Feed Message (Minimalist Feedback) */}
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="mt-4 pb-2 px-6 border-t border-black/5 flex flex-col items-center justify-center text-center opacity-40 hover:opacity-100 transition-opacity"
          >
            <div className="w-12 h-1 bg-black/10 rounded-full mb-4"></div>
            <h4 className="text-sm font-black text-[#003366] mb-1">You're all caught up!</h4>
            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest leading-none">Check back soon for new rewards</p>
          </motion.div>
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
