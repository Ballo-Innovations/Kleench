import { useParams, useNavigate } from "react-router";
import { motion, AnimatePresence } from "motion/react";
import { Play, Verified, Star, CheckCircle2, Send, Shield, Wallet, X, Clock, Trophy } from "lucide-react";
import { useState } from "react";
import { PageHeader } from "../components/PageHeader";

const HERO_BG = "https://images.unsplash.com/photo-1575388902449-6bca946ad549?auto=format&fit=crop&w=1080&q=80";
const INSTRUCTOR_AVATAR = "https://images.unsplash.com/photo-1758685734511-4f49ce9a382b?auto=format&fit=crop&w=1080&q=80";

export function LearningDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [showVideoModal, setShowVideoModal] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);

  const handleEnroll = () => {
    navigate("/wallet", { state: { enrollCourse: true, courseId: id, coursePrice: 49.99 } });
  };

  const grace = (delay = 0) => ({
    duration: 0.62,
    delay,
    ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
  });

  return (
    <div className="min-h-screen bg-transparent pb-32 font-sans overflow-x-hidden">
      
      {/* ── Standardized Academy Detail Header ── */}
      <PageHeader 
        title="Course Detail" 
        subtitle="Academy Masterclass Session"
        showBack
        height={180}
      />

      <main className="px-5 -mt-20 relative z-20 space-y-12">
        
        {/* ── SECTION 01: CINEMATIC PREVIEW ── */}
        <motion.section 
          initial={{ opacity: 0, y: 15 }} 
          animate={{ opacity: 1, y: 0 }}
          className="relative aspect-video border-2 border-[#003366] overflow-hidden shadow-[6px_6px_0px_#003366] bg-black group"
        >
           <img src={HERO_BG} className="absolute inset-0 w-full h-full object-cover opacity-70 transition-transform duration-1000 group-hover:scale-110" />
           <div className="absolute inset-0 bg-gradient-to-t from-[#003366]/90 via-transparent to-transparent" />
           
           {/* Play Trigger */}
           <div className="absolute inset-0 flex items-center justify-center">
              <motion.button 
                whileTap={{ scale: 0.9 }}
                onClick={() => setShowVideoModal(true)}
                className="w-16 h-16 bg-white shadow-[4px_4px_0px_#FF8C00] flex items-center justify-center text-[#003366] active:shadow-none transition-all"
              >
                 <Play size={24} fill="#003366" />
              </motion.button>
           </div>

           {/* Badge HUD */}
           <div className="absolute top-4 right-4 bg-[#FFC300] text-[#003366] px-3 py-1.5 border border-[#003366] shadow-[2px_2px_0px_#003366] flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-[#003366] animate-pulse" />
              <span className="text-[9px] font-black uppercase tracking-widest">Live Demo</span>
           </div>
        </motion.section>

        {/* ── SECTION 02: TRUST LEDGER ── */}
        <motion.section initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={grace(0.3)} className="space-y-6">
           <div className="flex items-center gap-3">
              <span className="text-[#FF8C00] font-black text-xs tracking-[0.3em]">01.</span>
              <h3 className="font-black text-[10px] uppercase tracking-[0.4em] text-[#003366]/40">Trust Ledger</h3>
              <div className="flex-1 h-[2px] bg-[#003366]/5" />
           </div>

           <div className="bg-white border-2 border-[#003366] p-6 shadow-[6px_6px_0px_#FF8C00] flex flex-wrap items-center justify-between gap-6">
              <div className="flex items-center gap-4">
                 <div className="relative">
                    <div className="w-14 h-14 border-2 border-[#003366] overflow-hidden">
                       <img src={INSTRUCTOR_AVATAR} className="w-full h-full object-cover" />
                    </div>
                    <div className="absolute -bottom-1 -right-1 bg-[#FF8C00] text-white p-1 border border-[#003366] shadow-sm">
                       <Verified size={10} />
                    </div>
                 </div>
                 <div>
                    <h4 className="text-[#003366] text-lg font-black uppercase tracking-tight leading-none mb-1">EliteNodes Alpha</h4>
                    <div className="flex items-center gap-2">
                       <span className="bg-[#003366]/5 text-[#003366] px-1.5 py-0.5 text-[8px] font-black uppercase tracking-widest border border-[#003366]/10">Verified KYC</span>
                       <div className="flex items-center gap-1 text-[#FFC300]">
                          <Star size={12} fill="#FFC300" />
                          <span className="text-[11px] font-black text-[#003366]">4.9</span>
                       </div>
                    </div>
                 </div>
              </div>
              <div className="text-right border-l-2 border-[#003366]/5 pl-6">
                 <p className="text-[#003366]/40 text-[9px] font-black uppercase tracking-widest mb-1">Asset Value</p>
                 <div className="flex items-baseline gap-1">
                    <span className="text-[#003366] text-3xl font-black tracking-tighter leading-none">49.99</span>
                    <span className="text-[#FF8C00] text-xs font-black">USD</span>
                 </div>
              </div>
           </div>
        </motion.section>

        {/* ── SECTION 03: SYLLABUS & STATS ── */}
        <motion.section initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={grace(0.5)} className="space-y-8">
           <div className="flex items-center gap-3">
              <span className="text-[#FF8C00] font-black text-xs tracking-[0.3em]">02.</span>
              <h3 className="font-black text-[10px] uppercase tracking-[0.4em] text-[#003366]/40">Intelligence Hub</h3>
           </div>

           <div className="grid grid-cols-2 gap-4">
              <div className="bg-[#003366]/5 border-2 border-[#003366] p-5 shadow-[4px_4px_0px_#003366]">
                 <div className="text-[#FF8C00] mb-3"><Clock size={16} /></div>
                 <p className="text-[#003366]/40 text-[8px] font-black uppercase tracking-widest mb-1">Duration</p>
                 <p className="text-[#003366] text-lg font-black uppercase tracking-tight">8 Sessions</p>
              </div>
              <div className="bg-[#003366]/5 border-2 border-[#003366] p-5 shadow-[4px_4px_0px_#FF8C00]">
                 <div className="text-[#FF8C00] mb-3"><Trophy size={16} /></div>
                 <p className="text-[#003366]/40 text-[8px] font-black uppercase tracking-widest mb-1">Status</p>
                 <p className="text-[#003366] text-lg font-black uppercase tracking-tight">Verified</p>
              </div>
           </div>

           <div className="bg-white border-2 border-[#003366] p-6 shadow-[6px_6px_0px_#003366] space-y-4">
              <h4 className="text-[#003366] text-sm font-black uppercase tracking-widest border-b-2 border-[#003366]/5 pb-3">What You Will Master</h4>
              <ul className="grid grid-cols-1 gap-4">
                 {[
                   "Advanced Component Architecture",
                   "Scalable Design Systems",
                   "Portfolio-Ready Projects",
                   "Live Q&A Masterclasses"
                 ].map((item, idx) => (
                   <li key={idx} className="flex items-center gap-3">
                      <div className="w-5 h-5 bg-[#003366]/5 flex items-center justify-center text-[#FF8C00] border border-[#003366]/20">
                         <CheckCircle2 size={12} />
                      </div>
                      <span className="text-[11px] font-black text-[#003366]/60 uppercase tracking-widest leading-none">{item}</span>
                   </li>
                 ))}
              </ul>
           </div>

           {/* Share & Earn Loop */}
           <motion.button
              whileTap={{ scale: 0.97 }}
              className="w-full bg-[#FF8C00] text-white p-5 border-2 border-[#003366] shadow-[6px_6px_0px_#003366] flex items-center justify-between group active:shadow-none transition-all"
              onClick={() => setShowShareModal(true)}
           >
              <div className="text-left">
                 <p className="text-white/60 text-[8px] font-black uppercase tracking-widest mb-1">Circle Growth Loop</p>
                 <p className="text-white text-lg font-black uppercase tracking-tight leading-none">Share & Earn 5%</p>
              </div>
              <Send size={20} className="group-hover:translate-x-1 transition-transform" />
           </motion.button>
        </motion.section>

      </main>

      {/* ── STICKY CHECKOUT HUD ── */}
      <div className="fixed bottom-0 left-0 w-full z-50 px-5 pb-28 pointer-events-none">
        <motion.div 
           initial={{ y: 50, opacity: 0 }}
           animate={{ y: 0, opacity: 1 }}
           className="max-w-md mx-auto w-full bg-white border-4 border-[#003366] p-5 shadow-[0_-15px_40px_rgba(0,0,0,0.12)] pointer-events-auto"
        >
           <div className="flex items-center justify-between gap-4">
              <div className="hidden sm:block">
                 <div className="flex items-center gap-2">
                    <Shield size={14} className="text-[#FF8C00]" />
                    <p className="text-[9px] font-black text-[#003366] uppercase tracking-widest">Kleench Escrow</p>
                 </div>
                 <p className="text-[8px] text-[#003366]/40 font-black uppercase tracking-tighter mt-1">Funds held securely in treasury</p>
              </div>
              <motion.button
                whileTap={{ scale: 0.95 }}
                className="flex-1 bg-[#003366] text-white py-4 px-6 flex items-center justify-center gap-3 shadow-[4px_4px_0px_#FF8C00] group active:shadow-none transition-all"
                onClick={handleEnroll}
              >
                 <span className="text-[12px] font-black uppercase tracking-[0.2em]">Enroll with Wallet</span>
                 <Wallet size={18} className="text-[#FF8C00] group-hover:rotate-12 transition-transform" />
              </motion.button>
           </div>
        </motion.div>
      </div>

      {/* ── Video Modal (Industrial HUD) ── */}
      <AnimatePresence>
        {showVideoModal && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[100] bg-[#003366]/95 backdrop-blur-xl flex items-center justify-center p-5">
            <div className="relative w-full aspect-video border-4 border-white shadow-2xl">
              <button className="absolute -top-12 right-0 text-white hover:text-[#FF8C00] transition-colors" onClick={() => setShowVideoModal(false)}>
                <X size={32} />
              </button>
              <iframe className="w-full h-full" src="https://www.youtube.com/embed/dQw4w9WgXcQ" title="Course Preview" frameBorder="0" allowFullScreen />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Share Modal ── */}
      <AnimatePresence>
        {showShareModal && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[100] bg-[#003366]/95 backdrop-blur-xl flex items-center justify-center p-8">
            <div className="bg-white border-4 border-[#003366] p-8 w-full max-w-sm shadow-[12px_12px_0px_#FF8C00] relative">
              <button className="absolute top-4 right-4 text-[#003366]" onClick={() => setShowShareModal(false)}>
                <X size={24} />
              </button>
              <h2 className="text-[#003366] text-2xl font-black uppercase tracking-tight mb-4">Share & Earn</h2>
              <p className="text-[#003366]/60 text-[11px] font-black uppercase tracking-widest leading-relaxed mb-8">
                Distribute your unique referral loop and receive 5% asset dividends on every successful enrollment.
              </p>
              <div className="space-y-4">
                <div className="p-4 bg-[#003366]/5 border-2 border-[#003366]/10 text-[11px] font-black text-[#003366] break-all">
                  https://kleench.app/academy/m123
                </div>
                <button className="w-full bg-[#003366] text-white py-4 text-[12px] font-black uppercase tracking-widest shadow-[4px_4px_0px_#FF8C00]" onClick={() => setShowShareModal(false)}>
                  Copy Referral Hook
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}