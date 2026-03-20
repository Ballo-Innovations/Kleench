import { Link } from "react-router";
import { useState } from "react";
import { Search, Plus, Gift, Target, Share2, ChevronRight, ArrowRight, User, Eye, EyeOff } from "lucide-react";
import { motion } from "motion/react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import kleenchLogo from "@/assets/kleench_logo.png";

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
  const [balanceHidden, setBalanceHidden] = useState(true);
  const [pinInput, setPinInput] = useState("");
  const [showPinModal, setShowPinModal] = useState(false);
  const [pinError, setPinError] = useState("");
  
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
    const savedPin = localStorage.getItem("userPin") || "1234"; // Default fallback if no pin was set during onboarding
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

  return (
    <>
      <div className="flex flex-col gap-6 pb-24 min-h-screen font-[var(--font-body)] relative z-10">
        {/* Header Section */}
        <div className="relative pt-12 pb-24 px-4 bg-gradient-to-b from-[#ff8c00] to-[#e67e00] rounded-b-[40px] shadow-[0_12px_40px_rgba(255,140,0,0.15)] overflow-hidden">
          {/* Premium Orange Grid/Texture Overlay */}
          <div className="absolute inset-0 opacity-[0.15]" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.8) 1px, transparent 0)', backgroundSize: '8px 8px' }} />
          <div className="absolute inset-0 opacity-[0.1]" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.3) 1px, transparent 1px)', backgroundSize: '32px 32px' }} />

          {/* Top Bar */}
          <div className="relative z-10 flex justify-between items-center mb-6">
            <div className="flex items-center">
              <img src={kleenchLogo} alt="KLEENCH" className="h-10 w-auto object-contain brightness-0 invert" />
            </div>
            <div className="flex items-center gap-3">
              <button className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/10 text-white shadow-sm">
                <Target size={18} />
              </button>
              <button className="relative w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/10 text-white shadow-sm">
                <Gift size={18} />
                <span className="absolute top-0 right-0 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-[#ff8c00]" />
              </button>
            </div>
          </div>
        </div>

        {/* Content Overlapping Header */}
        <div className="px-4 -mt-24 space-y-6 relative z-10 w-full max-w-md mx-auto">
          {/* Opportunities Card */}
          <div className="bg-white rounded-[28px] p-5 shadow-[0_8px_30px_rgba(0,0,0,0.06)] border border-gray-100/50">
            <h2 className="text-[#191c1e] text-[22px] mb-4" style={{ fontFamily: 'Agrandir, sans-serif', fontWeight: 800, letterSpacing: "-0.02em" }}>
              Opportunities to Earn
            </h2>
            
            <div className="relative mb-6">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input type="text" placeholder="Search products, services or Courses" className="w-full bg-[#f8f9fb] rounded-2xl py-3.5 pl-11 pr-4 text-[13px] font-medium focus:outline-none focus:ring-2 focus:ring-[#ff8c00]/20 transition-all border border-transparent placeholder-gray-400" />
            </div>

            <div className="flex justify-between items-end border-t border-gray-100 pt-5">
              <div>
                <div className="flex items-center gap-1.5 mb-1">
                  <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">WALLET</p>
                  <button onClick={handleToggleBalance} className="text-gray-400 p-1">
                    {balanceHidden ? <EyeOff size={11} /> : <Eye size={11} />}
                  </button>
                </div>
                <p className={`text-xl font-bold text-[#191c1e] ${balanceHidden ? 'font-mono' : ''}`} style={{ fontFamily: balanceHidden ? 'monospace' : 'Agrandir, sans-serif' }}>
                  {balanceHidden ? '••••••' : 'K145.20'}
                </p>
              </div>
              <div className="text-center">
                <p className="text-[10px] text-gray-400 font-bold mb-1 uppercase tracking-wider">Rewards Today</p>
                <p className={`text-xl font-bold text-[#ff8c00] ${balanceHidden ? 'font-mono' : ''}`} style={{ fontFamily: balanceHidden ? 'monospace' : 'Agrandir, sans-serif' }}>
                  {balanceHidden ? '•••' : 'K3.40'}
                </p>
              </div>
              <div className="text-right">
                <p className="text-[10px] text-gray-400 font-bold mb-1 uppercase tracking-wider">Pending Escrow</p>
                <p className={`text-xl font-bold text-gray-300 ${balanceHidden ? 'font-mono' : ''}`} style={{ fontFamily: balanceHidden ? 'monospace' : 'Agrandir, sans-serif' }}>
                  {balanceHidden ? '••••' : 'K850'}
                </p>
              </div>
            </div>
          </div>

          {/* Action Grid */}
          <div className="grid grid-cols-2 gap-3">
            <motion.button whileTap={{scale: 0.95}} className="bg-gradient-to-br from-[#ff8c00] to-[#e67e00] text-white py-4 px-4 rounded-2xl font-bold flex items-center justify-center gap-2 shadow-[0_8px_20px_rgba(255,140,0,0.25)] text-[15px]" style={{ fontFamily: 'Agrandir, sans-serif' }}>
              <Plus size={18} strokeWidth={3} /> Post Advert
            </motion.button>
            <motion.button whileTap={{scale: 0.95}} className="bg-gradient-to-br from-[#ff8c00] to-[#e67e00] text-white py-4 px-4 rounded-2xl font-bold flex items-center justify-center gap-2 shadow-[0_8px_20px_rgba(255,140,0,0.25)] text-[15px]" style={{ fontFamily: 'Agrandir, sans-serif' }}>
              <Plus size={18} strokeWidth={3} /> Sell Product
            </motion.button>
            <motion.button whileTap={{scale: 0.95}} className="bg-gradient-to-br from-[#ff8c00] to-[#e67e00] text-white py-4 px-4 rounded-2xl font-bold flex items-center justify-center gap-2 shadow-[0_8px_20px_rgba(255,140,0,0.25)] text-[15px]" style={{ fontFamily: 'Agrandir, sans-serif' }}>
              <Plus size={18} strokeWidth={3} /> Create Poll
            </motion.button>
            <motion.button whileTap={{scale: 0.95}} className="bg-gradient-to-br from-[#ff8c00] to-[#e67e00] text-white py-4 px-4 rounded-2xl font-bold flex items-center justify-center gap-2 shadow-[0_8px_20px_rgba(255,140,0,0.25)] text-[15px]" style={{ fontFamily: 'Agrandir, sans-serif' }}>
              <Share2 size={18} strokeWidth={3} /> Refer & Earn
            </motion.button>
          </div>

          {/* Active Offers */}
          <div>
            <div className="flex justify-between items-center mb-4 px-1">
              <h3 className="flex items-center gap-2 font-bold text-[#191c1e] text-[17px]" style={{fontFamily: 'Agrandir, sans-serif'}}>
                <div className="w-5 h-5 rounded-full border-2 border-orange-100 flex items-center justify-center">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#ff8c00] shadow-[0_0_8px_rgba(255,140,0,0.6)] animate-pulse" />
                </div>
                Active Offers
              </h3>
              <span className="text-[11px] font-bold text-[#ff8c00] uppercase tracking-wider bg-orange-50 px-3 py-1 rounded-full">See all</span>
            </div>
            
            <div className="flex flex-col gap-3">
              {ACTIVE_OFFERS.map((offer) => (
                <Link to={`/offer/${offer.id}`} key={offer.id}>
                  <div className="bg-white border border-gray-100/80 p-3 rounded-2xl flex items-center gap-4 shadow-[0_4px_16px_rgba(0,0,0,0.03)] transition-all hover:shadow-[0_4px_20px_rgba(0,0,0,0.06)]">
                    <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-orange-100 to-orange-50 flex items-center justify-center flex-shrink-0 overflow-hidden relative border border-orange-100/50">
                      {offer.type === 'Solar' ? (
                        <ImageWithFallback src={offer.image} alt={offer.title} className="w-full h-full object-cover" />
                      ) : (
                        <User size={24} className="text-[#ff8c00]" />
                      )}
                      {offer.type !== 'Solar' && (
                        <div className="absolute inset-0 bg-white/20 backdrop-blur-[1px]" />
                      )}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-bold text-[#191c1e] mb-1.5 text-[15px] leading-tight" style={{ fontFamily: 'Agrandir, sans-serif' }}>
                        {offer.title}
                      </h4>
                      <p className="text-[13px] text-gray-500 font-medium">
                        K{offer.price} <span className="opacity-40 line-through">K100.00</span>
                      </p>
                    </div>
                    <ChevronRight className="text-gray-300 w-5 h-5 mr-1" />
                  </div>
                </Link>
              ))}
            </div>

            {/* Invite & Earn Banner */}
            <div className="mt-4 relative rounded-2xl overflow-hidden bg-[#191c1e] h-[88px] flex items-center justify-between px-5 shadow-lg group cursor-pointer border border-[#191c1e]">
              <div className="absolute inset-0 opacity-40">
                <img src="https://images.unsplash.com/photo-1557683316-973673baf926?w=400&q=80" alt="bg" className="w-full h-full object-cover" />
              </div>
              <div className="relative z-10 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20">
                  <Share2 size={18} className="text-white" />
                </div>
                <span className="text-white font-bold text-[15px]" style={{ fontFamily: 'Agrandir, sans-serif' }}>Invite Friends & Earn</span>
              </div>
              <button className="relative z-10 bg-gradient-to-br from-[#ff8c00] to-[#e67e00] text-white text-[13px] font-bold px-4 py-2.5 rounded-xl shadow-lg border border-white/10">
                Invite & Earn
              </button>
            </div>
          </div>

          {/* Recent Earnings */}
          <div className="mt-4 bg-white rounded-[24px] p-5 shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-gray-100/50">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-bold text-[#191c1e] text-[17px]" style={{fontFamily: 'Agrandir, sans-serif'}}>Recent Earnings</h3>
              <span className="text-[10px] font-bold text-[#ff8c00] uppercase tracking-widest bg-orange-50 px-3 py-1.5 rounded-full">Live Timeline</span>
            </div>
            
            <div className="flex flex-col gap-0 relative">
              <div className="flex flex-col gap-1">
                {RECENT_EARNINGS.map((item) => (
                  <div key={item.id} className="flex justify-between items-center py-2.5 border-b border-gray-50 last:border-0">
                    <div className="flex items-center gap-3">
                      <div className="w-6 h-6 rounded-full bg-orange-50 flex items-center justify-center">
                        <ArrowRight className="w-3 h-3 text-[#ff8c00]" />
                      </div>
                      <div className="flex flex-col">
                        <span className="font-bold text-[#191c1e] text-[13px]">{item.amount} <span className="text-gray-400 font-medium ml-1 text-[12px]">- {item.title}</span></span>
                      </div>
                    </div>
                    <span className={`text-[10px] font-bold px-3 py-1.5 rounded-full ${item.typeColor}`}>
                      {item.type}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* PIN Verification Modal */}
      {showPinModal && (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-end bg-black/40 backdrop-blur-sm">
          <motion.div 
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="w-full max-w-md bg-white rounded-t-[32px] p-6 pb-12 shadow-2xl relative"
          >
            <button 
              onClick={() => setShowPinModal(false)}
              className="absolute top-5 right-5 w-8 h-8 flex items-center justify-center bg-gray-100 rounded-full text-gray-500"
            >
              ✕
            </button>
            <div className="text-center mb-8">
              <h3 className="text-xl font-bold text-[#191c1e] mb-2" style={{ fontFamily: 'Agrandir, sans-serif' }}>Enter Security PIN</h3>
              <p className="text-[14px] text-gray-500">Provide your 4-digit PIN to show balances</p>
            </div>
            
            <div className="flex justify-center gap-4 mb-6">
              {[0, 1, 2, 3].map((i) => (
                <div key={i} className="w-5 h-5 rounded-full border-2 transition-all" style={{ backgroundColor: pinInput.length > i ? '#ff8c00' : 'transparent', borderColor: pinInput.length > i ? '#ff8c00' : '#e5e7eb' }} />
              ))}
            </div>
            
            {pinError && <p className="text-red-500 text-center text-sm font-bold mb-4">{pinError}</p>}
            
            <div className="grid grid-cols-3 gap-3">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, "", 0, "⌫"].map((key, idx) => {
                if (key === "") return <div key={idx} />;
                return (
                  <motion.button
                    key={idx}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => {
                      if (key === "⌫") {
                        setPinInput(p => p.slice(0, -1));
                      } else {
                        handlePinPress(String(key));
                      }
                    }}
                    className="h-16 rounded-2xl bg-[#f8f9fb] text-[#191c1e] text-2xl font-bold flex items-center justify-center font-[var(--font-header)]"
                  >
                    {key}
                  </motion.button>
                );
              })}
            </div>
          </motion.div>
        </div>
      )}
    </>
  );
}

