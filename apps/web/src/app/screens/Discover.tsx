import { useState } from "react";
import { motion } from "motion/react";
import { Play, TrendingUp, Users, Target as TargetIcon, Plus } from "lucide-react";

const LEARNING_REELS = [
  { id: 1, title: "How to run Kleench Campaigns", views: "12.5k", color: "from-[var(--trust-blue)] to-blue-800", author: "Kleench Team" },
  { id: 2, title: "Maximize your Social Reach", views: "8.2k", color: "from-rose-500 to-pink-700", author: "Digital Pro" },
  { id: 3, title: "Selling Solar Effectively", views: "15.3k", color: "from-amber-500 to-orange-700", author: "Energy Ltd" },
  { id: 4, title: "UI Design for Beginners", views: "9.7k", color: "from-cyan-500 to-teal-700", author: "Creative Labs" },
];

const COMMUNITY_ADVERTS = [
  { id: 101, title: "Solar Light Installation", reach: "45k", budget: "K500" },
  { id: 102, title: "Web Dev Bootcamp 2026", reach: "12k", budget: "K200" },
];

export function Discover() {
  const [activeTab, setActiveTab] = useState<"advertising" | "learning">("advertising");

  return (
    <div className="flex flex-col gap-6 pb-24 min-h-screen font-[var(--font-body)] relative z-10 w-full">
      {/* Header Section */}
      <div className="relative pt-12 pb-24 px-4 bg-gradient-to-b from-[#ff8c00] to-[#e67e00] rounded-b-[40px] shadow-[0_12px_40px_rgba(255,140,0,0.15)] overflow-hidden">
        {/* Premium Orange Grid/Texture Overlay */}
        <div className="absolute inset-0 opacity-[0.15]" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.8) 1px, transparent 0)', backgroundSize: '8px 8px' }} />
        <div className="absolute inset-0 opacity-[0.1]" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.3) 1px, transparent 1px)', backgroundSize: '32px 32px' }} />

        <div className="relative z-10 flex justify-between items-center mb-6">
          <h1 className="text-white font-[var(--font-header)] font-bold text-2xl tracking-tighter" style={{ fontFamily: 'Agrandir, sans-serif' }}>
            Discover
          </h1>
        </div>

        {/* Segmented Control */}
        <div className="relative z-10 bg-white/20 backdrop-blur-md p-1 rounded-2xl flex border border-white/20">
          <button
            onClick={() => setActiveTab("advertising")}
            className={`flex-1 py-2 rounded-xl text-[13px] font-bold transition-all ${
              activeTab === "advertising" ? "bg-white text-[#ff8c00] shadow-sm" : "text-white/80 hover:text-white"
            }`}
          >
            Advertising Engine
          </button>
          <button
            onClick={() => setActiveTab("learning")}
            className={`flex-1 py-2 rounded-xl text-[13px] font-bold transition-all ${
              activeTab === "learning" ? "bg-white text-[#ff8c00] shadow-sm" : "text-white/80 hover:text-white"
            }`}
          >
            Education & Learning
          </button>
        </div>
      </div>

      <div className="px-4 -mt-16 space-y-6 relative z-10 w-full">
        {activeTab === "advertising" && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
            {/* Advertising Dashboard Overlapping Card */}
            <div className="bg-white rounded-[28px] p-5 shadow-[0_8px_30px_rgba(0,0,0,0.06)] border border-gray-100/50 mb-6 flex flex-col items-center">
              <h2 className="text-[#191c1e] text-[20px] mb-4 text-center font-bold" style={{ fontFamily: 'Agrandir, sans-serif' }}>
                Launch your next campaign
              </h2>
              <motion.button whileTap={{scale: 0.95}} className="w-full bg-gradient-to-br from-[#ff8c00] to-[#e67e00] text-white py-4 px-4 rounded-2xl font-bold flex items-center justify-center gap-2 shadow-[0_8px_20px_rgba(255,140,0,0.25)] text-[16px]" style={{ fontFamily: 'Agrandir, sans-serif' }}>
                <Plus size={20} className="text-white" strokeWidth={3} /> Launch Campaign
              </motion.button>
              
              <div className="grid grid-cols-3 gap-2 w-full mt-6 border-t border-gray-100 pt-5">
                <div className="text-center flex flex-col items-center">
                  <div className="w-8 h-8 rounded-full bg-orange-50 mb-2 flex items-center justify-center">
                    <TargetIcon size={14} className="text-[#ff8c00]" />
                  </div>
                  <p className="text-[14px] font-bold text-[#191c1e]" style={{ fontFamily: 'Agrandir, sans-serif' }}>68%</p>
                  <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Target</p>
                </div>
                <div className="text-center flex flex-col items-center">
                  <div className="w-8 h-8 rounded-full bg-orange-50 mb-2 flex items-center justify-center">
                    <TrendingUp size={14} className="text-[#ff8c00]" />
                  </div>
                  <p className="text-[14px] font-bold text-[#191c1e]" style={{ fontFamily: 'Agrandir, sans-serif' }}>K850</p>
                  <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Spent</p>
                </div>
                <div className="text-center flex flex-col items-center">
                  <div className="w-8 h-8 rounded-full bg-[var(--trust-blue)]/10 mb-2 flex items-center justify-center">
                    <Users size={14} className="text-[var(--trust-blue)]" />
                  </div>
                  <p className="text-[14px] font-bold text-[var(--trust-blue)]" style={{ fontFamily: 'Agrandir, sans-serif' }}>12.4k</p>
                  <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Reach</p>
                </div>
              </div>
            </div>

            {/* High Performing Adverts */}
            <div>
              <div className="flex justify-between items-center mb-4 px-2">
                <h3 className="font-bold text-[#191c1e] text-[18px]" style={{fontFamily: 'Agrandir, sans-serif'}}>Top Community Adverts</h3>
                <span className="text-[12px] font-bold text-[#ff8c00]">View All</span>
              </div>
              <div className="flex flex-col gap-3">
                {COMMUNITY_ADVERTS.map(ad => (
                  <div key={ad.id} className="bg-white border border-gray-100 p-4 rounded-3xl flex items-center justify-between shadow-[0_4px_20px_rgba(0,0,0,0.03)]">
                    <div>
                      <h4 className="font-bold text-[#191c1e] text-[14px] mb-1">{ad.title}</h4>
                      <p className="text-[12px] text-gray-400 font-medium">Budget: <span className="text-gray-600">{ad.budget}</span></p>
                    </div>
                    <div className="bg-orange-50 px-3 py-1.5 rounded-full">
                      <p className="text-[11px] font-bold text-[#ff8c00] flex items-center gap-1"><TrendingUp size={10} /> {ad.reach}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === "learning" && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="pt-2">
            <div className="grid grid-cols-2 gap-3">
              {LEARNING_REELS.map((reel, i) => (
                <motion.div key={reel.id} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.05 }}>
                  <div className={`relative rounded-[24px] overflow-hidden bg-gradient-to-br ${reel.color} aspect-[9/15] shadow-md border border-white/10`}>
                    <div className="absolute inset-0 mix-blend-overlay opacity-30" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.8) 1px, transparent 0)', backgroundSize: '8px 8px' }} />
                    <div className="absolute inset-0 flex flex-col justify-between p-3.5">
                      <div className="flex justify-end">
                        <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/20 shadow-sm">
                          <Play size={12} fill="white" className="text-white ml-0.5" />
                        </div>
                      </div>
                      <div>
                        <span className="bg-white/20 text-white backdrop-blur-md px-2 py-0.5 rounded text-[9px] font-bold mb-1.5 inline-block border border-white/20 uppercase tracking-wider">{reel.author}</span>
                        <h3 className="text-[14px] font-[var(--font-header)] font-bold text-white leading-tight mb-1" style={{ fontFamily: 'Agrandir, sans-serif' }}>{reel.title}</h3>
                        <p className="text-[11px] font-[var(--font-body)] text-white/80 font-medium">{reel.views} viewers</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
