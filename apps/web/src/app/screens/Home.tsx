import { Link } from "react-router";
import { useState } from "react";
import { Settings, Bell, Search, Plus, ChevronRight, ArrowRight, User, Eye, EyeOff } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import kleenchLogo from "@/assets/kleench_logo.png";
import { BackspaceKey } from "../components/KleenchIcons";
import adBanner from "@/assets/ads/Boost Your Daily Earnings.png";

import { PageSkeletons, usePageLoading } from "../components/PageSkeletons";

const ACTIVE_OFFERS = [
  {
    id: 1,
    title: "Solar Lights Promotion",
    price: "80.00",
    earn: "10.00",
    image: "https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?w=200&q=80",
    type: "Solar",
  },
  {
    id: 2,
    title: "Cetane Network Feedback",
    price: "8.00",
    earn: "1.00",
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=200&q=80",
    type: "Network",
  },
];

const RECENT_EARNINGS = [
  { id: 1, amount: "+ K5.00", title: "Friend Referral", type: "Refer & Earn", typeColor: "bg-[#ff8c00] text-white" },
  { id: 2, amount: "+ K1.00", title: "Survey Completed", type: "Sponsor Collect", typeColor: "bg-orange-50 text-[#ff8c00]" },
  { id: 3, amount: "+ K0.20", title: "Watched Adverts", type: "Sponsor Collect", typeColor: "bg-orange-50 text-[#ff8c00]" },
];

export function Home() {
  const loading = usePageLoading(800);
  const [balanceHidden, setBalanceHidden] = useState(true);
  const [pinInput, setPinInput] = useState("");
  const [showPinModal, setShowPinModal] = useState(false);
  const [pinError, setPinError] = useState("");
  
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
    <div className="w-full max-w-md mx-auto pb-32 relative min-h-screen">
      
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

      {/* ── Orange hero header ── */}
      <div className="relative pt-8 pb-32 px-6 overflow-hidden rounded-b-[40px]"
        style={{ background: "linear-gradient(135deg, #FF8C00, #e06900)", boxShadow: "0 12px 40px rgba(255,140,0,0.15)" }}>
        
        {/* grid texture */}
        <div className="absolute inset-0 opacity-[0.1]">
          <svg width="100%" height="100%">
            <defs>
              <pattern id="home-grid" width="20" height="20" patternUnits="userSpaceOnUse">
                <path d="M 20 0 L 0 0 0 20" fill="none" stroke="white" strokeWidth="0.5"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#home-grid)"/>
          </svg>
        </div>

        <div className="relative z-10 flex justify-between items-center mb-10">
          <img src={kleenchLogo} alt="KLEENCH" className="h-10 w-auto object-contain brightness-0 invert" />
          <div className="flex items-center gap-3">
            <Link to="/settings" className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/10 text-white shadow-sm transition-all hover:bg-white/30 active:scale-95">
              <Settings size={18} />
            </Link>
            <Link to="/notifications" className="relative w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/10 text-white shadow-sm transition-all hover:bg-white/30 active:scale-95">
              <Bell size={18} />
              <span className="absolute top-0 right-0 w-2.5 h-2.5 bg-[#FF8C00] rounded-full border-2 border-white" />
            </Link>
          </div>
        </div>

        <div className="relative z-10 space-y-2">
          <h1 className="text-white text-3xl font-black" style={{ fontFamily: "Agrandir, sans-serif" }}>Welcome!</h1>
          <p className="text-white/70 text-[13px] font-medium">Ready to boost your earnings today?</p>
        </div>
      </div>

      <div className="px-5 -mt-16 relative z-10 space-y-10">
        
        {/* Activity & Balance Card */}
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={grace(0.1)}
          className="bg-white rounded-[32px] p-6 shadow-2xl border border-black/[0.03]">
          
          <div className="flex gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
              <input type="text" placeholder="Search..." 
                className="w-full bg-gray-50 border border-transparent focus:border-[#FF8C00]/20 rounded-2xl py-3.5 pl-11 pr-4 text-[13px] outline-none transition-all" />
            </div>
            <Link to="/profile" className="w-12 h-12 rounded-2xl bg-gray-50 flex items-center justify-center border border-black/[0.03]">
              <User size={20} className="text-[#0D1B3E]" />
            </Link>
          </div>

          <div className="flex justify-between items-end bg-gray-50/50 p-6 rounded-[24px] border border-black/[0.02]">
            <div>
              <div className="flex items-center gap-2 mb-2 px-1">
                <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">WALLET</span>
                <button onClick={handleToggleBalance} className="text-gray-300 hover:text-[#FF8C00] transition-colors p-1">
                  {balanceHidden ? <EyeOff size={11} /> : <Eye size={11} />}
                </button>
              </div>
              <p className="text-2xl font-black text-[#0D1B3E]" style={{ fontFamily: "Agrandir, sans-serif" }}>
                {balanceHidden ? "••••••" : "K145.20"}
              </p>
            </div>
            <div className="text-right">
              <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-2 px-1 text-right">TODAY</span>
              <p className="text-2xl font-black text-[#FF8C00]" style={{ fontFamily: "Agrandir, sans-serif" }}>
                {balanceHidden ? "•••" : "K3.40"}
              </p>
            </div>
          </div>
        </motion.div>

        {/* Feature Grid */}
        <div className="grid grid-cols-2 gap-4">
          {[
            { label: "Post Advert", path: "/ads/post", icon: Plus, color: "#FF8C00" },
            { label: "Sell Product", path: "/sell", icon: Plus, color: "#00695C" },
            { label: "Create Poll", path: "/poll/create", icon: Plus, color: "#0D1B3E", full: true },
          ].map((action, i) => (
            <Link key={action.label} to={action.path} className={action.full ? "col-span-2" : ""}>
              <motion.button whileTap={{ scale: 0.96 }}
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={grace(0.2 + i * 0.1)}
                className={`w-full py-5 px-6 rounded-[28px] font-bold flex items-center justify-center gap-3 shadow-lg transition-all text-[15px] border ${
                  action.color === "#FF8C00" 
                    ? "bg-[#FF8C00] text-white border-[#FF8C00]/20 shadow-[#FF8C00]/20"
                    : action.color === "#00695C"
                    ? "bg-white text-[#00695C] border-[#00695C]/10 shadow-black/[0.02]"
                    : "bg-[#0D1B3E] text-white border-[#0D1B3E]/20 shadow-[#0D1B3E]/20"
                }`} style={{ fontFamily: "Agrandir, sans-serif" }}>
                <action.icon size={20} strokeWidth={3} /> {action.label}
              </motion.button>
            </Link>
          ))}
        </div>

        {/* Banner Ad */}
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={grace(0.3)}
          className="rounded-[32px] overflow-hidden shadow-xl border border-black/[0.03]">
          <img src={adBanner} alt="Boost Your Earnings" className="w-full h-auto object-cover" />
        </motion.div>

        {/* Active Offers */}
        <section className="space-y-5">
          <div className="flex items-center justify-between px-2">
            <h3 className="font-black text-xl" style={{ fontFamily: "Agrandir, sans-serif", color: "#0D1B3E" }}>Active Offers</h3>
            <Link to="/offers" className="text-[12px] font-bold text-[#FF8C00]">See all</Link>
          </div>
          
          <div className="space-y-4">
            {ACTIVE_OFFERS.map((offer, idx) => (
              <motion.div key={offer.id} 
                initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={grace(0.4 + idx * 0.1)}
              >
                <Link to={`/offer/${offer.id}`} className="bg-white p-4 rounded-[28px] shadow-sm border border-black/[0.03] flex items-center gap-4 hover:shadow-md transition-shadow">
                  <div className="w-16 h-16 rounded-2xl overflow-hidden bg-gray-50 flex-shrink-0 border border-black/[0.02]">
                    <ImageWithFallback src={offer.image} alt={offer.title} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bold text-[#0D1B3E] text-[14px] leading-tight mb-1">{offer.title}</h4>
                    <p className="text-[12px] font-bold text-[#FF8C00]">Earn K{offer.earn}</p>
                  </div>
                  <ChevronRight size={18} className="text-gray-300" />
                </Link>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Live Timeline */}
        <section className="space-y-5 pb-10">
          <div className="px-2">
            <h3 className="font-black text-xl" style={{ fontFamily: "Agrandir, sans-serif", color: "#0D1B3E" }}>Recent Activity</h3>
          </div>
          <div className="bg-white p-6 rounded-[32px] shadow-sm border border-black/[0.03] space-y-4">
            {RECENT_EARNINGS.map((item, idx) => (
              <motion.div key={item.id} 
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={grace(0.6 + idx * 0.1)}
                className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#FF8C00]/10 flex items-center justify-center">
                    <ArrowRight size={14} className="text-[#FF8C00]" />
                  </div>
                  <div>
                    <p className="font-bold text-[#0D1B3E] text-[13px]">{item.amount}</p>
                    <p className="text-[10px] text-gray-400 font-medium">{item.title}</p>
                  </div>
                </div>
                <span className={`text-[9px] font-black px-3 py-1.5 rounded-full uppercase tracking-wider ${item.typeColor}`}>
                  {item.type}
                </span>
              </motion.div>
            ))}
          </div>
        </section>
      </div>

      {/* PIN Verification Modal */}
      <AnimatePresence>
        {showPinModal && (
          <div className="fixed inset-0 z-50 flex flex-col items-center justify-end bg-[#0D1B3E]/60 backdrop-blur-md">
            <motion.div 
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="w-full max-w-md bg-white rounded-t-[48px] p-8 pb-12 shadow-2xl relative"
            >
              <div className="w-12 h-1.5 bg-gray-100 rounded-full mx-auto mb-8" />
              
              <div className="text-center mb-10">
                <h3 className="text-2xl font-black text-[#0D1B3E] mb-2" style={{ fontFamily: "Agrandir, sans-serif" }}>Security PIN</h3>
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
                      className="h-20 rounded-3xl bg-gray-50 text-[#0D1B3E] text-2xl font-black flex items-center justify-center transition-colors active:bg-[#FF8C00] active:text-white"
                      style={{ fontFamily: "Agrandir, sans-serif" }}
                    >
                      {val === "backspace" ? <BackspaceKey size={24} color="currentColor" /> : val}
                    </motion.button>
                  );
                })}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

