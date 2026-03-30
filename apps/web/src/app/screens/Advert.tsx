import { motion } from "motion/react";
import { Play, Coins, ShieldCheck, ChevronRight } from "lucide-react";
import { PageHeader } from "../components/PageHeader";

const AD_VIDEOS = [
  { 
    id: 1, 
    creator: "Solar Pro Zambia", 
    title: "Why our 5kW Hybrid Inverters are dominant", 
    reward: "ZMW 0.50", 
    color: "from-[#FF8C00] to-[#003366]",
    views: "12k"
  },
  { 
    id: 2, 
    creator: "Zambia Mining News", 
    title: "New Copper Belt exploration updates", 
    reward: "ZMW 0.75", 
    color: "from-[#003366] to-[#0077B6]",
    views: "8.1k"
  },
  { 
    id: 3, 
    creator: "Growth Hub", 
    title: "Passive Income: The Kleench Strategy", 
    reward: "ZMW 1.00", 
    color: "from-[#10b981] to-[#065f46]",
    views: "24.9k"
  },
];

import { PageSkeletons, usePageLoading } from "../components/PageSkeletons";

export function Advert() {
  const loading = usePageLoading(800);


  return (
    <div className="w-full relative min-h-[100dvh] bg-transparent overflow-x-hidden font-sans pb-32">
      
      {/* ── Standardized Header ── */}
      <PageHeader 
        title="Watch Ads"
        subtitle="Earn rewards for your attention." 
        height={90}
      />

      {loading ? (
        <PageSkeletons.Generic />
      ) : (
        <div className="px-5 mt-4 relative z-20 space-y-10">
        
        <section className="space-y-6">

          <div className="space-y-6">
            {AD_VIDEOS.map((ad, idx) => (
              <motion.div
                key={ad.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.12 }}
                className="group relative bg-white border-2 border-[#003366] overflow-hidden shadow-[6px_6px_0px_#003366]"
              >
                {/* Visual Player Placeholder */}
                <div className={`aspect-video w-full bg-gradient-to-br ${ad.color} relative overflow-hidden`}>
                   <div className="absolute inset-0 opacity-[0.1] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#fff 1px, transparent 0)', backgroundSize: '12px 12px' }} />
                   
                   <div className="absolute inset-0 flex items-center justify-center">
                      <motion.button 
                        whileTap={{ scale: 0.9 }}
                        className="w-16 h-16 bg-white flex items-center justify-center text-[#003366] shadow-[4px_4px_0px_#FF8C00]"
                      >
                        <Play size={24} fill="#003366" />
                      </motion.button>
                   </div>

                   {/* Reward Badge */}
                   <div className="absolute top-4 left-4 bg-white border-2 border-[#003366] px-3 py-1.5 flex items-center gap-2 shadow-[3px_3px_0px_#FF8C00]">
                      <Coins size={14} className="text-[#FF8C00]" />
                      <span className="text-[11px] font-black uppercase text-[#003366] tracking-widest">{ad.reward}</span>
                   </div>
                   
                   {/* Views Badge */}
                   <div className="absolute bottom-4 right-4 text-white/60 text-[9px] font-black uppercase tracking-widest">
                      {ad.views} Views
                   </div>
                </div>

                {/* Metadata */}
                <div className="p-5 flex items-center justify-between group-hover:bg-[#003366]/[0.02] transition-colors">
                   <div className="flex flex-col gap-1">
                      <div className="flex items-center gap-1.5">
                         <span className="text-[8px] font-black uppercase tracking-[0.3em] text-[#FF8C00]">Ad Campaign</span>
                         <ShieldCheck size={12} className="text-[#003366]/20" />
                      </div>
                      <h4 className="font-black text-[#003366] text-sm uppercase tracking-tight leading-none">{ad.title}</h4>
                      <p className="text-[10px] font-bold text-gray-400 mt-1 uppercase tracking-widest leading-none">by {ad.creator}</p>
                   </div>
                   <ChevronRight size={20} className="text-[#003366]/10" />
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* SECTION 02. STATS */}
        <section className="bg-[#003366] p-6 shadow-[8px_8px_0px_#FF8C00] text-white">
           <div className="flex items-center gap-3 mb-6">
              <span className="text-[#FF8C00] font-black text-xs tracking-[0.3em]">02.</span>
              <h3 className="font-black text-[10px] uppercase tracking-[0.4em] opacity-40">Leaderboard Stats</h3>
           </div>
           
           <div className="grid grid-cols-2 gap-8">
              <div>
                 <p className="text-[8px] font-black uppercase tracking-[0.3em] opacity-40 mb-2">Total Earned</p>
                 <p className="text-2xl font-black tracking-tight" style={{ fontFamily: "Agrandir, sans-serif" }}>ZMW 45.50</p>
              </div>
              <div>
                 <p className="text-[8px] font-black uppercase tracking-[0.3em] opacity-40 mb-2">Ads Watched</p>
                 <p className="text-2xl font-black tracking-tight" style={{ fontFamily: "Agrandir, sans-serif" }}>92</p>
              </div>
           </div>
        </section>
      </div>
      )}
    </div>
  );
}
