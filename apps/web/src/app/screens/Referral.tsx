import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowLeft, Copy, CheckCircle, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router";
import { LottieIcon } from "../components/LottieIcon";
import adBanner from "@/assets/ads/Boost Your Daily Earnings.png";


const REFERRAL_CODE = "KELCH-BX2R9";
const REFERRAL_LINK = `https://kleench.com/join?ref=${REFERRAL_CODE}`;

const TIERS = [
  { level: "Bronze",   range: "K0–K50",    pct: "3%",  current: false, accent: "#CD7F32", glow: "rgba(205,127,50,0.15)"  },
  { level: "Silver",   range: "K51–K200",  pct: "5%",  current: true,  accent: "#9CA3AF", glow: "rgba(156,163,175,0.15)" },
  { level: "Gold",     range: "K201–K500", pct: "8%",  current: false, accent: "#FFC300", glow: "rgba(255,195,0,0.15)"   },
  { level: "Platinum", range: "K500+",     pct: "12%", current: false, accent: "#0077B6", glow: "rgba(0,119,182,0.15)"   },
];

const HISTORY = [
  { id: 1, name: "Chanda M.", joined: "Mar 18, 2026", earned: "K5.00", active: true  },
  { id: 2, name: "Gift N.",   joined: "Mar 15, 2026", earned: "K5.00", active: true  },
  { id: 3, name: "Moses K.",  joined: "Mar 12, 2026", earned: "K2.50", active: false },
];

/* Shared graceful transition builder */
const grace = (delay = 0) => ({
  delay,
  duration: 0.62,
  ease: [0.22, 1, 0.36, 1] as const,
});

import { PageSkeletons, usePageLoading } from "../components/PageSkeletons";

export function Referral() {
  const loading = usePageLoading(800);
  const navigate = useNavigate();
  const [copied, setCopied] = useState(false);
  const [showStickyTop, setShowStickyTop] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);



  /* Show sticky-top CTA once the hero scrolls out of view */
  useEffect(() => {
    const el = heroRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => setShowStickyTop(!entry.isIntersecting),
      { threshold: 0 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const handleCopy = () => {
    navigator.clipboard.writeText(REFERRAL_LINK);
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  return (
    <div className="w-full max-w-md mx-auto pb-16 relative">

      {/* ── Sticky top CTA (visible after hero scrolls out) ── */}
      <AnimatePresence>
        {showStickyTop && (
          <motion.div
            initial={{ opacity: 0, y: -48 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -48 }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="fixed top-0 left-0 right-0 z-50 px-4 pt-3 pb-2"
            style={{ background: "rgba(248,249,251,0.92)", backdropFilter: "blur(16px)", borderBottom: "1px solid rgba(13,27,62,0.06)", maxWidth: "28rem", margin: "0 auto" }}>
            <motion.button
              whileTap={{ scale: 0.975 }} whileHover={{ y: -1 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="w-full py-3 rounded-2xl text-white font-bold flex items-center justify-center gap-2"
              style={{ background: "linear-gradient(135deg, #FF8C00, #0D1B3E)", fontFamily: "Agrandir, sans-serif", fontSize: "14px", boxShadow: "0 6px 24px rgba(255,140,0,0.25)" }}>
              <LottieIcon icon="share" size={22} /> Invite Friends Now
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Cross-hatch grid bg ── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 0 }}>
        <svg width="100%" height="100%" style={{ position: "absolute", inset: 0 }}>
          <defs>
            <pattern id="ref-x" x="0" y="0" width="24" height="24" patternUnits="userSpaceOnUse">
              <line x1="0" y1="0" x2="24" y2="24" stroke="#FF8C00" strokeWidth="0.5" strokeOpacity="0.07"/>
              <line x1="24" y1="0" x2="0" y2="24" stroke="#FF8C00" strokeWidth="0.5" strokeOpacity="0.07"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#ref-x)"/>
        </svg>
      </div>

      {/* ── Standardized Orange Header ── */}
      <div className="relative pt-4 pb-0 px-6 overflow-hidden rounded-b-[40px] flex flex-col justify-between h-[90px] mb-4"
        style={{ background: "linear-gradient(135deg, #FF8C00, #e06900)", boxShadow: "0 10px 30px rgba(255,140,0,0.12)" }}>
        
        {/* grid texture */}
        <div className="absolute inset-0 opacity-[0.1]">
          <svg width="100%" height="100%">
            <defs>
              <pattern id="ref-grid" width="20" height="20" patternUnits="userSpaceOnUse">
                <path d="M 20 0 L 0 0 0 20" fill="none" stroke="white" strokeWidth="0.5"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#ref-grid)"/>
          </svg>
        </div>

        <div className="relative z-10 flex items-center justify-between mt-2 h-10 gap-2">
          <button onClick={() => navigate(-1)} 
            className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/10 text-white shadow-sm transition-all/30 active:scale-95">
            <ArrowLeft size={18} />
          </button>
          <h1 className="text-white text-[12px] font-black uppercase tracking-[0.2em] opacity-80" style={{ fontFamily: "Agrandir, sans-serif" }}>
            Referrals
          </h1>
          <div className="w-10" /> {/* Spacer */}
        </div>

        <div className="relative z-10 space-y-0.5 mb-2">
          <h2 className="text-white text-xl font-black tracking-tight" style={{ fontFamily: "system-ui, -apple-system, sans-serif" }}>Refer & Earn</h2>
          <p className="text-white/80 text-[13px] font-medium">Earn up to 12% commission on your network.</p>
        </div>
      </div>

      {loading ? (
        <div className="px-5 mt-4">
          <PageSkeletons.Generic />
        </div>
      ) : (
        <>
      {/* ── Banner Ad ── */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }} 
        animate={{ opacity: 1, scale: 1 }}
        transition={grace(0.1)}
        className="relative z-10 mb-8 rounded-[32px] overflow-hidden shadow-lg border border-white/20">
        <img src={adBanner} alt="Boost Your Daily Earnings" className="w-full h-auto object-cover" />
      </motion.div>

      {/* ── Hero earnings card (navy) — attach ref so we detect scroll ── */}
      <motion.div
        ref={heroRef}
        initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
        transition={grace(0.05)}
        className="relative z-10 rounded-3xl overflow-hidden mb-8"
        style={{ background: "#0D1B3E", boxShadow: "0 20px 48px rgba(13,27,62,0.22)" }}>
        {/* Inner grid texture */}
        <div className="absolute inset-0 opacity-[0.07]">
          <svg width="100%" height="100%">
            <defs>
              <pattern id="hero-g2" width="16" height="16" patternUnits="userSpaceOnUse">
                <path d="M 16 0 L 0 0 0 16" fill="none" stroke="white" strokeWidth="0.5"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#hero-g2)"/>
          </svg>
        </div>
        <div className="relative p-6 flex items-center gap-5">
          <div className="w-18 h-18 rounded-2xl flex items-center justify-center overflow-hidden flex-shrink-0"
            style={{ background: "rgba(255,140,0,0.14)", width: 72, height: 72 }}>
            <LottieIcon icon="gift" size={60} />
          </div>
          <div className="flex-1">
            <p className="text-[9px] font-bold uppercase tracking-widest" style={{ color: "rgba(255,255,255,0.35)" }}>Total Earned</p>
            <p className="font-black text-4xl leading-none text-white mt-1 mb-3" style={{ fontFamily: "Agrandir, sans-serif" }}>K12.50</p>
            <div className="flex gap-7">
              {[["14","Referrals"],["11","Active"],["Silver","Tier"]].map(([val, lbl]) => (
                <div key={lbl}>
                  <p className="font-black text-lg text-white leading-none" style={{ fontFamily: "Agrandir, sans-serif" }}>{val}</p>
                  <p className="text-[8px] uppercase font-bold tracking-wide mt-0.5" style={{ color: "rgba(255,255,255,0.35)" }}>{lbl}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="h-1" style={{ background: "linear-gradient(90deg, #FF8C00, rgba(255,140,0,0))" }}/>
      </motion.div>

      {/* ── Invite link card ── */}
      <motion.div
        initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 10 }} /* sits 10px lower: staggered rhythm */
        transition={grace(0.14)}
        className="relative z-10 bg-white border rounded-3xl p-5 mb-8"
        style={{ borderColor: "rgba(13,27,62,0.06)", boxShadow: "0 4px 20px rgba(13,27,62,0.05)" }}>
        <p className="text-[9px] font-bold uppercase tracking-widest mb-3" style={{ color: "rgba(13,27,62,0.38)" }}>Your Invite Link</p>
        <div className="flex items-center gap-2 mb-4">
          <div className="flex-1 rounded-xl px-3.5 py-2.5 border overflow-hidden" style={{ background: "#F8F9FB", borderColor: "rgba(13,27,62,0.06)" }}>
            <p className="text-[11px] font-bold truncate" style={{ color: "#FF8C00" }}>{REFERRAL_LINK}</p>
          </div>
          <motion.button
            whileTap={{ scale: 0.88 }} whileHover={{ scale: 1.06 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            onClick={handleCopy}
            className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
            style={{ background: copied ? "#00695C" : "#FF8C00", transition: "background 0.5s ease" }}>
            {copied ? <CheckCircle size={16} className="text-white"/> : <Copy size={16} className="text-white"/>}
          </motion.button>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <motion.button whileTap={{ scale: 0.96 }} whileHover={{ y: -2 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="py-3 rounded-2xl text-white font-bold text-[12px] flex items-center justify-center gap-1.5"
            style={{ background: "#FF8C00", boxShadow: "0 4px 16px rgba(255,140,0,0.25)" }}>
            <LottieIcon icon="share" size={20} /> Share Link
          </motion.button>
          <motion.button whileTap={{ scale: 0.96 }} whileHover={{ y: -2 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            onClick={handleCopy}
            className="py-3 rounded-2xl font-bold text-[12px] flex items-center justify-center gap-1.5 border"
            style={{ background: "#F8F9FB", color: "#0D1B3E", borderColor: "rgba(13,27,62,0.08)" }}>
            <Copy size={13}/> Copy Code
          </motion.button>
        </div>
      </motion.div>

      {/* ── Commission tiers ── */}
      <motion.div
        initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
        transition={grace(0.22)}
        className="relative z-10 mb-8">
        <div className="flex items-center gap-2.5 mb-5">
          <LottieIcon icon="trophy" size={32} />
          <h3 className="font-black" style={{ fontFamily: "Agrandir, sans-serif", fontSize: "1.05rem", color: "#0D1B3E" }}>Commission Tiers</h3>
        </div>

        {/* 2-col grid with staggered vertical rhythm */}
        <div className="grid grid-cols-2 gap-4">
          {TIERS.map((tier, i) => {
            const yOffset = i % 2 === 1 ? 14 : 0; /* odd column sits lower */
            return (
              <motion.div key={tier.level}
                initial={{ opacity: 0, y: yOffset + 20 }}
                animate={{ opacity: 1, y: yOffset }}
                transition={grace(0.28 + i * 0.07)}
                whileHover={{ y: yOffset - 4 }}
                className="p-5 rounded-3xl relative overflow-hidden border-2"
                style={{
                  background: tier.current ? "#0D1B3E" : "white",
                  borderColor: tier.current ? "#FF8C00" : "rgba(13,27,62,0.07)",
                  boxShadow: tier.current ? `0 0 32px ${tier.glow}` : "0 2px 12px rgba(13,27,62,0.04)",
                  transition: "box-shadow 0.6s ease",
                }}>
                {tier.current && (
                  <div className="absolute top-2.5 right-2.5 px-2 py-0.5 rounded-full text-[8px] font-bold"
                    style={{ background: "#FF8C00", color: "white" }}>CURRENT</div>
                )}
                <div className="flex items-center gap-2 mb-2">
                  <LottieIcon icon="coin" size={28} />
                  <p className="font-black text-[12px]" style={{ color: tier.current ? "#FF8C00" : "#0D1B3E", fontFamily: "Agrandir, sans-serif" }}>
                    {tier.level}
                  </p>
                </div>
                <p className="font-black text-3xl leading-none" style={{ color: tier.current ? "white" : "#0D1B3E", fontFamily: "Agrandir, sans-serif" }}>
                  {tier.pct}
                </p>
                <p className="text-[9px] mt-1.5" style={{ color: tier.current ? "rgba(255,255,255,0.38)" : "rgba(13,27,62,0.35)" }}>
                  {tier.range}
                </p>
              </motion.div>
            );
          })}
        </div>
      </motion.div>

      {/* ── Referral history ── */}
      <motion.div
        initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
        transition={grace(0.38)}
        className="relative z-10">
        <div className="flex items-center gap-2.5 mb-5">
          <LottieIcon icon="users" size={32} />
          <h3 className="font-black" style={{ fontFamily: "Agrandir, sans-serif", fontSize: "1.05rem", color: "#0D1B3E" }}>Referred Users</h3>
        </div>
        <div className="bg-white border rounded-3xl overflow-hidden" style={{ borderColor: "rgba(13,27,62,0.06)", boxShadow: "0 3px 16px rgba(13,27,62,0.05)" }}>
          {HISTORY.map((h, idx) => (
            <motion.div key={h.id}
              initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }}
              transition={grace(0.42 + idx * 0.07)}
              className={`flex items-center gap-4 px-5 py-4 ${idx < HISTORY.length - 1 ? "border-b" : ""}`}
              style={{ borderColor: "rgba(13,27,62,0.05)" }}>
              <div className="w-10 h-10 rounded-full flex items-center justify-center font-black text-[14px] flex-shrink-0"
                style={{ background: "#FFF7ED", color: "#FF8C00" }}>
                {h.name[0]}
              </div>
              <div className="flex-1">
                <p className="font-bold text-[13px]" style={{ color: "#0D1B3E" }}>{h.name}</p>
                <p className="text-[9px] mt-0.5" style={{ color: "rgba(13,27,62,0.38)" }}>Joined {h.joined}</p>
              </div>
              <div className="text-right">
                <p className="font-bold text-[14px]" style={{ color: "#FF8C00" }}>{h.earned}</p>
                <span className="text-[9px] font-bold px-2 py-0.5 rounded-full"
                  style={h.active ? { background: "#F0FDF9", color: "#00695C" } : { background: "#FFF7ED", color: "#FF8C00" }}>
                  {h.active ? "active" : "pending"}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
        <button className="w-full py-4 text-[11px] font-semibold flex items-center justify-center gap-1 mt-1"
          style={{ color: "rgba(13,27,62,0.38)" }}>
          View all referrals <ChevronRight size={13}/>
        </button>
      </motion.div>

      {/* ── Bottom invite CTA (visible only when sticky top is NOT showing) ── */}
      <AnimatePresence>
        {!showStickyTop && (
          <motion.div
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 16 }}
            transition={grace(0.5)}
            className="relative z-10 mt-8">
            <motion.button
              whileTap={{ scale: 0.975 }} whileHover={{ y: -2 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="w-full py-4 rounded-2xl text-white font-bold flex items-center justify-center gap-2"
              style={{ background: "linear-gradient(135deg, #FF8C00, #0D1B3E)", fontFamily: "Agrandir, sans-serif", fontSize: "15px", boxShadow: "0 12px 36px rgba(255,140,0,0.28)" }}>
              <LottieIcon icon="share" size={26} /> Invite Friends Now
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
      </>
      )}
    </div>
  );
}
