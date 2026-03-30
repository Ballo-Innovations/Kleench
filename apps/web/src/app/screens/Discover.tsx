import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Play, TrendingUp, Plus } from "lucide-react";
import { useNavigate } from "react-router";
import { LottieIcon } from "../components/LottieIcon";
import kleenchLogo from "@/assets/kleench_logo.png";
import adAds from "@/assets/ads/Turn Ideas Into Stories.png";
import adLearn from "@/assets/ads/LEARN AND GROW.png";

const LEARNING_REELS = [
  { id: 1, title: "How to run Kleench Campaigns", views: "12.5k", gradient: "linear-gradient(135deg, #0D1B3E, #1e3a5f)", author: "Kleench Team" },
  { id: 2, title: "Maximize your Social Reach",   views: "8.2k",  gradient: "linear-gradient(135deg, #7C3AED, #5b21b6)", author: "Digital Pro"  },
  { id: 3, title: "Selling Solar Effectively",    views: "15.3k", gradient: "linear-gradient(135deg, #FF8C00, #c96a00)", author: "Energy Ltd"   },
  { id: 4, title: "UI Design for Beginners",      views: "9.7k",  gradient: "linear-gradient(135deg, #00695C, #004d3d)", author: "Creative Labs"},
];

const COMMUNITY_ADVERTS = [
  { id: 101, title: "Solar Light Installation",  reach: "45k", budget: "K500", icon: "rocket",   accent: "#FF8C00" },
  { id: 102, title: "Web Dev Bootcamp 2026",      reach: "12k", budget: "K200", icon: "megaphone", accent: "#7C3AED" },
];

/* Graceful transition builder */
const grace = (delay = 0) => ({
  delay, duration: 0.62, ease: [0.22, 1, 0.36, 1] as const,
});

/* Unified cross-hatch bg */
function CrossHatchBg() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 0 }}>
      <svg width="100%" height="100%" style={{ position: "absolute", inset: 0 }}>
        <defs>
          <pattern id="xhatch-disc" x="0" y="0" width="24" height="24" patternUnits="userSpaceOnUse">
            <line x1="0" y1="0" x2="24" y2="24" stroke="#FF8C00" strokeWidth="0.5" strokeOpacity="0.07"/>
            <line x1="24" y1="0" x2="0" y2="24" stroke="#FF8C00" strokeWidth="0.5" strokeOpacity="0.07"/>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#xhatch-disc)"/>
      </svg>
    </div>
  );
}

import { PageSkeletons, usePageLoading } from "../components/PageSkeletons";

export function Discover() {
  const loading = usePageLoading(850);
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<"advertising" | "learning">("advertising");



  return (
    <div className="w-full max-w-md mx-auto pb-32 relative min-h-screen">
      <CrossHatchBg />

      {/* ── Standardized Orange Header ── */}
      <div className="relative pt-4 pb-0 px-6 overflow-hidden rounded-b-[40px] flex flex-col justify-between h-[90px] mb-6"
        style={{ background: "linear-gradient(135deg, #FF8C00, #e06900)", boxShadow: "0 10px 30px rgba(255,140,0,0.12)" }}>
        
        {/* grid texture */}
        <div className="absolute inset-0 opacity-[0.1]">
          <svg width="100%" height="100%">
            <defs>
              <pattern id="disc-grid" width="20" height="20" patternUnits="userSpaceOnUse">
                <path d="M 20 0 L 0 0 0 20" fill="none" stroke="white" strokeWidth="0.5"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#disc-grid)"/>
          </svg>
        </div>

        <div className="relative z-10 flex items-center justify-between mt-2 h-10 gap-2">
          <div className="flex items-center gap-2">
            <img src={kleenchLogo} alt="KLEENCH" className="h-8 w-auto object-contain brightness-0 invert" />
            <span className="text-white font-black text-xl tracking-tight opacity-90" style={{ fontFamily: "system-ui, -apple-system, sans-serif" }}>Discover</span>
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/20 border border-white/30 backdrop-blur-md">
            <div className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
            <span className="text-[10px] font-bold uppercase tracking-wider text-white">Live</span>
          </div>
        </div>

        {/* Segmented control */}
        <div className="relative z-10 bg-white/10 backdrop-blur-md p-1 rounded-2xl flex border border-white/10 mb-2">
          {(["advertising", "learning"] as const).map((tab) => (
            <button key={tab}
              onClick={() => setActiveTab(tab)}
              className="flex-1 py-2.5 rounded-xl text-[12.5px] font-bold transition-all"
              style={activeTab === tab
                ? { background: "white", color: "#FF8C00" }
                : { color: "rgba(255,255,255,0.65)", transition: "all 0.5s ease" }}>
              {tab === "advertising" ? "Advertising" : "Education"}
            </button>
          ))}
        </div>
      </div>

      {/* ── Content (overlaps hero by -mt-14) ── */}
      {loading ? (
        <PageSkeletons.Discover />
      ) : (
        <div className="px-4 -mt-4 relative z-10">
        <AnimatePresence mode="wait">

          {/* ── Advertising tab ── */}
          {activeTab === "advertising" && (
            <motion.div key="adv"
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              className="space-y-6">

              {/* Banner Ad */}
              <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={grace(0.1)}
                className="rounded-[32px] overflow-hidden shadow-lg border border-white/10">
                <img src={adAds} alt="Turn Ideas Into Stories" className="w-full h-auto object-cover" />
              </motion.div>

              {/* Launch card */}
              <div className="bg-white rounded-3xl p-6 shadow-xl border"
                style={{ borderColor: "rgba(13,27,62,0.06)", boxShadow: "0 16px 48px rgba(13,27,62,0.1)" }}>
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 rounded-2xl flex items-center justify-center overflow-hidden flex-shrink-0"
                    style={{ background: "#FFF7ED" }}>
                    <LottieIcon icon="megaphone" size={52} />
                  </div>
                  <div>
                    <p className="text-[9px] font-bold uppercase tracking-widest mb-1" style={{ color: "rgba(13,27,62,0.38)" }}>Campaign Center</p>
                    <h2 className="font-black text-[18px] leading-tight" style={{ fontFamily: "Agrandir, sans-serif", color: "#0D1B3E" }}>
                      Launch your next campaign
                    </h2>
                  </div>
                </div>

                <motion.button whileTap={{ scale: 0.975 }} whileHover={{ y: -2 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  onClick={() => navigate("/ads/post")}
                  className="w-full py-4 rounded-2xl text-white font-bold flex items-center justify-center gap-2 mb-6"
                  style={{ background: "linear-gradient(135deg, #FF8C00, #e06900)", fontFamily: "Agrandir, sans-serif", fontSize: "15px", boxShadow: "0 8px 28px rgba(255,140,0,0.28)" }}>
                  <Plus size={18} strokeWidth={2.5}/> Create Campaign
                </motion.button>

                <div className="border-t pt-5 grid grid-cols-3 gap-3" style={{ borderColor: "rgba(13,27,62,0.06)" }}>
                  {[
                    { icon: "target",   label: "Target",  value: "68%",  accent: "#FF8C00" },
                    { icon: "chart",    label: "Spent",   value: "K850", accent: "#0D1B3E" },
                    { icon: "users",    label: "Reach",   value: "12.4k",accent: "#00695C" },
                  ].map((stat, i) => (
                    <motion.div key={stat.label} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: i % 2 === 1 ? 6 : 0 }}
                      transition={grace(0.1 + i * 0.07)}
                      className="flex flex-col items-center text-center">
                      <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-2 overflow-hidden"
                        style={{ background: `${stat.accent}12` }}>
                        <LottieIcon icon={stat.icon} size={32} />
                      </div>
                      <p className="font-black text-[15px]" style={{ fontFamily: "Agrandir, sans-serif", color: stat.accent }}>{stat.value}</p>
                      <p className="text-[9px] font-bold uppercase tracking-wide mt-0.5" style={{ color: "rgba(13,27,62,0.35)" }}>{stat.label}</p>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Top community adverts */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-black text-[16px]" style={{ fontFamily: "Agrandir, sans-serif", color: "#0D1B3E" }}>
                    Top Community Adverts
                  </h3>
                  <span className="text-[11px] font-bold" style={{ color: "#FF8C00" }}>View All</span>
                </div>
                <div className="space-y-4">
                  {COMMUNITY_ADVERTS.map((ad, i) => {
                    const yOff = i % 2 === 1 ? 8 : 0;
                    return (
                      <motion.div key={ad.id}
                        initial={{ opacity: 0, y: yOff + 16 }} animate={{ opacity: 1, y: yOff }}
                        transition={grace(0.1 + i * 0.1)}
                        whileHover={{ y: yOff - 3 }}
                        className="bg-white border rounded-3xl p-5 flex items-center gap-4"
                        style={{ borderColor: "rgba(13,27,62,0.06)", boxShadow: "0 3px 16px rgba(13,27,62,0.05)", transition: "box-shadow 0.5s ease" }}>
                        <div className="w-13 h-13 rounded-2xl flex items-center justify-center flex-shrink-0 overflow-hidden"
                          style={{ background: `${ad.accent}12`, width: 52, height: 52 }}>
                          <LottieIcon icon={ad.icon} size={40} />
                        </div>
                        <div className="flex-1">
                          <p className="font-bold text-[14px]" style={{ fontFamily: "Agrandir, sans-serif", color: "#0D1B3E" }}>{ad.title}</p>
                          <p className="text-[11px] mt-0.5" style={{ color: "rgba(13,27,62,0.42)" }}>Budget: <span style={{ color: "#0D1B3E", fontWeight: 700 }}>{ad.budget}</span></p>
                        </div>
                        <div className="px-3 py-1.5 rounded-full flex items-center gap-1.5"
                          style={{ background: "#FFF7ED" }}>
                          <TrendingUp size={10} style={{ color: "#FF8C00" }}/>
                          <p className="text-[11px] font-bold" style={{ color: "#FF8C00" }}>{ad.reach}</p>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          )}

          {/* ── Learning tab ── */}
          {activeTab === "learning" && (
            <motion.div key="learn"
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              className="pt-2 space-y-6">
              
              {/* Banner Ad */}
              <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={grace(0.1)}
                className="rounded-[32px] overflow-hidden shadow-lg border border-white/10">
                <img src={adLearn} alt="Learn and Grow" className="w-full h-auto object-cover" />
              </motion.div>

              <div className="grid grid-cols-2 gap-4">
                {LEARNING_REELS.map((reel, i) => {
                  const yOffset = i % 2 === 1 ? 16 : 0;
                  return (
                    <motion.div key={reel.id}
                      initial={{ opacity: 0, y: yOffset + 20 }}
                      animate={{ opacity: 1, y: yOffset }}
                      transition={grace(i * 0.08)}
                      whileHover={{ y: yOffset - 4 }}
                      className="relative rounded-3xl overflow-hidden cursor-pointer"
                      style={{ aspectRatio: "9/15", background: reel.gradient, boxShadow: "0 8px 28px rgba(13,27,62,0.15)", transition: "box-shadow 0.5s ease" }}>
                      {/* Subtle inner grid */}
                      <div className="absolute inset-0 opacity-[0.08]">
                        <svg width="100%" height="100%">
                          <defs>
                            <pattern id={`reel-g-${reel.id}`} width="12" height="12" patternUnits="userSpaceOnUse">
                              <path d="M 12 0 L 0 0 0 12" fill="none" stroke="white" strokeWidth="0.5"/>
                            </pattern>
                          </defs>
                          <rect width="100%" height="100%" fill={`url(#reel-g-${reel.id})`}/>
                        </svg>
                      </div>
                      <div className="absolute inset-0 flex flex-col justify-between p-4">
                        <div className="flex justify-end">
                          <div className="w-9 h-9 rounded-full flex items-center justify-center"
                            style={{ background: "rgba(255,255,255,0.18)", backdropFilter: "blur(6px)", border: "1px solid rgba(255,255,255,0.2)" }}>
                            <Play size={12} fill="white" className="text-white ml-0.5"/>
                          </div>
                        </div>
                        <div>
                          <span className="text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-lg inline-block mb-2"
                            style={{ background: "rgba(255,255,255,0.18)", color: "white", backdropFilter: "blur(4px)" }}>
                            {reel.author}
                          </span>
                          <h3 className="text-[13px] font-black text-white leading-tight mb-1" style={{ fontFamily: "Agrandir, sans-serif" }}>
                            {reel.title}
                          </h3>
                          <p className="text-[10px]" style={{ color: "rgba(255,255,255,0.65)" }}>{reel.views} viewers</p>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      )}
    </div>
  );
}
