import { useParams, useNavigate } from "react-router";
import { motion, AnimatePresence } from "motion/react";
import { Play, Verified, Star, CheckCircle2, Send, Shield, Wallet, X, Clock, Trophy } from "lucide-react";
import { useState } from "react";
import { PageHeader } from "../components/PageHeader";

const HERO_BG = "https://images.unsplash.com/photo-1575388902449-6bca946ad549?auto=format&fit=crop&w=1080&q=80";
const INSTRUCTOR_AVATAR = "https://images.unsplash.com/photo-1758685734511-4f49ce9a382b?auto=format&fit=crop&w=1080&q=80";

import { usePageLoading } from "../components/PageSkeletons";
import { Skeleton } from "boneyard-js/react";

export function LearningDetail() {
  const loading = usePageLoading(850);
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
    <Skeleton loading={loading} name="learningdetail">
    <div className="min-h-screen bg-transparent pb-32 font-sans overflow-x-hidden text-slate-800">
      
      {/* ── Standardized Academy Detail Header ── */}
      <PageHeader 
        title="Course Detail" 
        subtitle="Academy Masterclass Session"
        showBack
      />

      <main className="px-4 mt-4 relative z-20 space-y-8">
        
        {/* ── SECTION 01: CINEMATIC PREVIEW ── */}
        <motion.section 
          initial={{ opacity: 0, y: 15 }} 
          animate={{ opacity: 1, y: 0 }}
          className="relative aspect-video rounded-2xl overflow-hidden shadow-lg bg-black group border border-[#003366]/20"
        >
           <img src={HERO_BG} className="absolute inset-0 w-full h-full object-cover opacity-80 transition-transform duration-1000" />
           <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
           
           {/* Play Trigger */}
           <div className="absolute inset-0 flex items-center justify-center">
              <motion.button 
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowVideoModal(true)}
                className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-md border-[2px] border-white flex items-center justify-center shadow-lg transition-transform group-active:scale-95"
              >
                 <Play fill="white" className="text-white ml-1" size={28} />
              </motion.button>
           </div>

           {/* Badge HUD */}
           <div className="absolute top-4 right-4 bg-white text-slate-800 px-3 py-1.5 rounded-full border border-[#003366]/20 shadow-sm flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-[#E54D2E] animate-pulse" />
              <span className="text-[10px] font-black uppercase tracking-wide">Live Demo</span>
           </div>
        </motion.section>

        {/* ── SECTION 02: TRUST LEDGER ── */}
        <motion.section initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={grace(0.3)} className="space-y-4">
           
           <div className="bg-white border border-[#003366]/20 rounded-2xl p-5 shadow-lg flex flex-col justify-between gap-5">
              <div className="flex items-center gap-4">
                 <div className="relative">
                    <div className="w-14 h-14 border border-[#003366]/20 rounded-full overflow-hidden">
                       <img src={INSTRUCTOR_AVATAR} className="w-full h-full object-cover" />
                    </div>
                    <div className="absolute -bottom-1 -right-1 bg-blue-500 text-white p-0.5 rounded-full border-2 border-white">
                       <Verified size={12} strokeWidth={3} />
                    </div>
                 </div>
                 <div>
                    <h4 className="text-slate-900 text-[16px] font-black uppercase tracking-tight leading-none mb-1.5">EliteNodes Alpha</h4>
                    <div className="flex items-center gap-2">
                       <span className="bg-slate-100 text-slate-700 px-2 py-0.5 rounded-md text-[9px] font-bold uppercase tracking-widest">Verified KYC</span>
                       <div className="flex items-center gap-1 text-yellow-500">
                          <Star size={12} fill="currentColor" />
                          <span className="text-[12px] font-black text-slate-700">4.9</span>
                       </div>
                    </div>
                 </div>
              </div>
              
              <div className="sm:text-right border-l-2 border-slate-100 pl-4">
                 <p className="text-slate-400 text-[9px] font-black uppercase tracking-widest mb-0.5">Asset Value</p>
                 <div className="flex items-baseline gap-1">
                    <span className="text-slate-900 text-3xl font-black tracking-tighter leading-none">49.99</span>
                    <span className="text-slate-500 text-xs font-bold uppercase">USD</span>
                 </div>
              </div>
           </div>
        </motion.section>

        {/* ── SECTION 03: SYLLABUS & STATS ── */}
        <motion.section initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={grace(0.5)} className="space-y-6">
           
           <div className="grid grid-cols-2 gap-4">
              <div className="bg-white border border-[#003366]/20 rounded-xl p-4 shadow-sm flex flex-col items-center justify-center text-center">
                 <Clock size={20} strokeWidth={2.5} className="text-slate-800 mb-2" />
                 <p className="text-slate-400 text-[9px] font-black uppercase tracking-widest mb-0.5">Duration</p>
                 <p className="text-slate-900 text-[14px] font-black uppercase tracking-tight">8 Sessions</p>
              </div>
              <div className="bg-white border border-[#003366]/20 rounded-xl p-4 shadow-sm flex flex-col items-center justify-center text-center">
                 <Trophy size={20} strokeWidth={2.5} className="text-slate-800 mb-2" />
                 <p className="text-slate-400 text-[9px] font-black uppercase tracking-widest mb-0.5">Status</p>
                 <p className="text-slate-900 text-[14px] font-black uppercase tracking-tight">Verified</p>
              </div>
           </div>

           <div className="bg-white border border-[#003366]/20 rounded-2xl p-5 shadow-lg space-y-4">
              <h4 className="text-slate-900 text-[13px] font-black uppercase tracking-wide border-b-2 border-slate-100 pb-3">What You Will Master</h4>
              <ul className="grid grid-cols-1 gap-3.5">
                 {[
                   "Advanced Component Architecture",
                   "Scalable Design Systems",
                   "Portfolio-Ready Projects",
                   "Live Q&A Masterclasses"
                 ].map((item, idx) => (
                   <li key={idx} className="flex items-center gap-3">
                      <div className="w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center shrink-0">
                         <CheckCircle2 size={14} className="text-slate-800" strokeWidth={2.5} />
                      </div>
                      <span className="text-[12px] font-bold text-slate-700 tracking-wide leading-tight">{item}</span>
                   </li>
                 ))}
               </ul>
           </div>

           {/* Share & Earn Loop */}
           <motion.button
              whileTap={{ scale: 0.98 }}
              className="w-full bg-[#E54D2E] text-white p-5 rounded-2xl shadow-lg shadow-[#E54D2E]/25 flex items-center justify-between group active:scale-[0.99] transition-all"
              onClick={() => setShowShareModal(true)}
           >
              <div className="text-left">
                 <p className="text-white/80 text-[10px] font-bold uppercase tracking-wider mb-0.5">Referral Gateway</p>
                 <p className="text-white text-[16px] font-black uppercase tracking-tight leading-none mt-1">Share & Earn 5%</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center/30 transition-colors">
                <Send size={18} className="text-white transition-transform" />
              </div>
           </motion.button>
        </motion.section>

      </main>

      {/* ── STICKY CHECKOUT HUD ── */}
      <div className="fixed bottom-0 left-0 w-full z-50 px-4 pb-24 pointer-events-none">
        <motion.div 
           initial={{ y: 50, opacity: 0 }}
           animate={{ y: 0, opacity: 1 }}
           className="max-w-md mx-auto w-full bg-slate-900 rounded-2xl border border-[#003366]/20 p-4 shadow-2xl pointer-events-auto"
        >
           <div className="flex items-center justify-between gap-4">
              <div className="hidden">
                 <div className="flex items-center gap-1.5">
                    <Shield size={14} className="text-white/60" />
                    <p className="text-[10px] font-bold text-white uppercase tracking-wider mt-0.5">Kleench Escrow</p>
                 </div>
                 <p className="text-[9px] text-white/50 font-medium tracking-wide mt-1">Funds securely held</p>
              </div>
              <motion.button
                whileTap={{ scale: 0.95 }}
                className="flex-1 bg-white text-slate-900 py-3.5 px-6 rounded-xl flex items-center justify-center gap-2 border-[1.5px] border-slate-200 active:bg-slate-100 transition-colors shadow-sm"
                onClick={handleEnroll}
              >
                 <span className="text-[13px] font-black uppercase tracking-tight pt-0.5">Enroll with Wallet</span>
                 <Wallet size={16} className="text-slate-900" strokeWidth={2.5} />
              </motion.button>
           </div>
        </motion.div>
      </div>

      {/* ── Video Modal ── */}
      <AnimatePresence>
        {showVideoModal && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-md flex items-center justify-center p-4">
            <div className="relative w-full max-w-2xl aspect-video rounded-2xl overflow-hidden border border-white/20 shadow-2xl">
              <button className="absolute -top-12 right-0 text-white/60 transition-colors" onClick={() => setShowVideoModal(false)}>
                <X size={28} />
              </button>
              <iframe className="w-full h-full" src="https://www.youtube.com/embed/dQw4w9WgXcQ" title="Course Preview" frameBorder="0" allowFullScreen />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Share Modal ── */}
      <AnimatePresence>
        {showShareModal && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[100] bg-slate-900/40 backdrop-blur-sm flex items-end justify-center p-4 pb-8">
            <div className="bg-white rounded-3xl border border-gray-100 p-6 w-full max-w-sm shadow-xl relative mt-auto">
              <button className="absolute top-5 right-5 text-slate-400 bg-slate-100 rounded-full p-1.5 transition-colors" onClick={() => setShowShareModal(false)}>
                <X size={18} />
              </button>
              <h2 className="text-slate-900 text-[20px] font-black uppercase tracking-tight mb-2">Share & Earn</h2>
              <p className="text-slate-500 text-[12px] font-medium leading-relaxed mb-6">
                Distribute your unique referral loop and receive 5% asset dividends on every successful enrollment.
              </p>
              <div className="space-y-4">
                <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl text-[12px] font-bold text-slate-700 break-all text-center">
                  https://kleench.app/academy/m123
                </div>
                <button className="w-full bg-slate-900 text-white py-3.5 rounded-xl text-[13px] font-black uppercase tracking-wide active:scale-[0.98] transition-transform shadow-sm" onClick={() => setShowShareModal(false)}>
                  Copy Referral Link
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
      </Skeleton>
  );
}