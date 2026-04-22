import { 
  Circle,
  X,
  MessageCircle,
  MoreVertical,
  Bookmark
} from "lucide-react";
import { 
  DuotoneSearch as Search, 
  DuotoneUpload as Upload, 
  DuotoneSend as Send, 
  DuotoneUserPlus as UserPlus, 
  DuotoneClock as Clock, 
  DuotoneUser as User, 
  DuotoneEye as Eye,
  DuotonePlay as Play
} from "../components/DuotoneIcon";
import { motion, AnimatePresence } from "motion/react";
import { useState } from "react";
import { useNavigate } from "react-router";
import { PageHeader } from "../components/PageHeader";
import { usePageLoading, PageSkeletons } from "../components/PageSkeletons";

// Imports from learning
import learnWoman from "@/assets/learning/learn_woman_1775596426630.png";
import learnBook from "@/assets/learning/learn_book_1775596454115.png";
import learnChart from "@/assets/learning/learn_chart_1775596868170.png";
import learnMountain from "@/assets/learning/learn_mountain_1775596850615.png";
import learnPresenter from "@/assets/learning/learn_presenter_1775596479989.png";

// Reused assets to match the volume of content needed
import adPodcast from "@/assets/ads/ad_podcast.png";
import adShopping from "@/assets/ads/ad_shopping.png";
import adCode from "@/assets/ads/ad_code.png";
import adHeadphones from "@/assets/ads/ad_headphones.png";
import adSmarthome from "@/assets/ads/ad_smarthome.png";

export function Learning() {
  const loading = usePageLoading(800);
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeMedia, setActiveMedia] = useState<string | null>(null);

  const [activeSheet, setActiveSheet] = useState<null | "Upload" | "Share" | "Register Agent" | "Live Stream" | "Options">(null);

  const handleActionClick = (actionName: string) => {
    if (actionName === "Live Stream") return navigate("/learning/go-live");
    if (actionName === "Upload") return navigate("/learning/upload");
    if (actionName === "Register Agent") return navigate("/advert/agent-registration");
    setActiveSheet(actionName as "Upload" | "Share" | "Register Agent" | "Live Stream" | null);
  };

  const handleCourseClick = (courseId: number | string) => {
     navigate(`/learning/${courseId}`);
  };

  const handleMediaClick = (imageSrc: string) => {
     setActiveMedia(imageSrc);
  };

  const ROW_1 = [
    { id: 1, title: "MARKET PSYCHOLOGY", image: learnWoman },
    { id: 2, title: "SECURITY FUND", image: learnBook },
    { id: 3, title: "DATA VIZ", image: learnChart },
    { id: 4, title: "CODING 101", image: adCode },
    { id: 5, title: "STUDIO SESSIONS", image: adHeadphones },
    { id: 6, title: "ECOMMERCE", image: adShopping },
    { id: 7, title: "PRESENT STRATEGY", image: learnPresenter }
  ];

  const ROW_2 = [
    { id: 1, title: "TECH STARTUPS", image: learnMountain },
    { id: 2, title: "BIZ PODCAST", image: adPodcast },
    { id: 3, title: "MARKET STRATEGY", image: learnWoman },
    { id: 4, title: "SMART LIVING", image: adSmarthome },
    { id: 5, title: "DESIGN THINKING", image: learnBook },
    { id: 6, title: "DATA VIZ", image: learnChart },
    { id: 7, title: "CODING 101", image: adCode }
  ];

  const ROW_3 = [
    { id: 1, title: "PITCH PERFECT", image: learnPresenter },
    { id: 2, title: "STARTUP HUB", image: adPodcast },
    { id: 3, title: "GROWTH SECRETS", image: adShopping },
    { id: 4, title: "MINDSET & FOCUS", image: learnWoman },
    { id: 5, title: "DATA VIZ", image: learnChart },
    { id: 6, title: "STUDIO SESSIONS", image: adHeadphones },
    { id: 7, title: "TECH STARTUPS", image: learnMountain }
  ];



  const EXPLORE_MORE_VIDEOS = [
    { id: 1, title: "Crypto Security Fundamentals", author: "Dr. Elias Thorne", views: "12.4K", duration: "1:45:00", image: learnPresenter },
    { id: 2, title: "Mastering Market Psychology", author: "Sarah Chen", views: "8.1K", duration: "45:00", image: learnWoman },
    { id: 3, title: "Building a Tech Startup", author: "Marcus Vane", views: "15.2K", duration: "2:10:00", image: learnMountain },
    { id: 4, title: "Data Visualization Masterclass", author: "Elena Rostova", views: "24.5K", duration: "1:15:00", image: learnChart }
  ];

  return (
    <div className="w-full pb-32 relative min-h-screen bg-transparent overflow-x-hidden font-sans text-slate-800">
      
      {/* ── Standardized Header ── */}
      <PageHeader 
        useLogo
        title="LEARN" 
        searchValue={searchQuery}
        onSearchChange={setSearchQuery}
      />

      {loading ? (
        <PageSkeletons.Academy />
      ) : (
        <div className="px-4 mt-0 relative z-20 space-y-1.5">

          {/* Search Bar & Live Button */}
          <div className="flex items-center gap-2">
             <div className="flex-1 bg-white rounded-xl h-9 flex items-center px-3 shadow-sm border border-gray-100">
                <Search size={14} primary="#94a3b8" className="mr-2 shrink-0" />
                <input 
                   type="text" 
                   value={searchQuery}
                   onChange={(e) => setSearchQuery(e.target.value)}
                   placeholder="Search courses..." 
                   className="flex-1 h-full bg-transparent outline-none text-slate-800 font-bold placeholder:text-gray-400 text-[11px]"
                />
             </div>
             <button onClick={() => handleActionClick("Live Stream")} className="h-9 bg-white rounded-xl px-3 flex items-center gap-1.5 border border-gray-300 shadow-sm active:scale-95 transition-transform shrink-0">
                <span className="text-[#E54D2E] font-black text-[11px] tracking-tight pt-[1px]">LIVE</span>
                <Circle className="fill-[#E54D2E] text-[#E54D2E]" size={6} />
             </button>
          </div>

          {/* Top Action Buttons */}
          <section className="px-2 pt-0">
             <div className="flex items-center justify-between gap-4 px-4">
                <motion.button 
                  onClick={() => handleActionClick("Upload")}
                  whileTap={{ scale: 0.96 }}
                  className="flex-1 h-12 bg-orange-500 rounded-full flex items-center justify-center gap-2 shadow-md shadow-orange-500/20 active:scale-95 transition-all text-white"
                >
                   <Upload size={18} primary="#fff" />
                   <span className="font-black text-[11px] uppercase tracking-widest pl-1">Upload Content</span>
                </motion.button>
                
                <motion.button
                   onClick={() => handleActionClick("Register Agent")}
                   whileTap={{ scale: 0.92 }}
                   className="flex flex-col items-center justify-center gap-1 group outline-none shrink-0"
                 >
                   <div className="w-10 h-10 bg-white rounded-full flex flex-col items-center justify-center border border-slate-200 shadow-sm group-active:scale-95 transition-all mx-2">
                      <UserPlus size={18} />
                   </div>
                   <span className="font-bold text-slate-800 text-[6px] uppercase tracking-[0.15em] text-center leading-tight whitespace-normal break-words w-16">Register Agent</span>
                 </motion.button>
             </div>
          </section>

          {/* Main Interleaved Learning Feed */}
          <section className="space-y-2 pb-8 mt-1">
             {EXPLORE_MORE_VIDEOS.map((video) => (
                <div key={video.id} className="space-y-2">
                   
                   {/* 01. Learn & Earn Videos Carousel */}
                   <div>
                     <div className="flex justify-between items-center mb-0.5 px-1">
                        <div className="flex items-center gap-2">
                           <span className="w-[3px] h-3.5 rounded-full bg-orange-500 shrink-0" />
                           <h3 className="text-[9px] font-black text-slate-700 uppercase tracking-[0.2em] leading-none">Learn & Earn Videos</h3>
                        </div>
                        <span onClick={() => navigate("/learning/viewer?mode=learn-earn")} className="text-slate-400 font-bold text-[8px] uppercase tracking-widest whitespace-nowrap cursor-pointer transition-colors">See All</span>
                     </div>
                     <div className="-mx-5 flex gap-3 overflow-x-auto pb-2 pl-5 pr-5 scrollbar-hide no-scrollbar" style={{ scrollbarWidth: "none" }}>
                        {ROW_1.map(ad => (
                           <motion.div whileTap={{ scale: 0.96 }} onClick={() => handleMediaClick(ad.image)} key={ad.id} className="relative flex-shrink-0 w-28 h-40 bg-slate-900 border border-slate-200 overflow-hidden shadow-sm group rounded-xl cursor-pointer">
                              <img src={ad.image} alt={ad.title} className="absolute inset-0 w-full h-full object-cover grayscale-[0.1] transition-all duration-700" />
                              <div className="absolute inset-0 bg-gradient-to-t from-black/100 via-black/40 to-transparent" />
                              
                              <div className="absolute top-1.5 right-1.5 w-6 h-6 rounded-full bg-white/20 backdrop-blur-md border border-white/30 ring-1 ring-white/10 flex items-center justify-center shadow-lg">
                                 <Play primary="#fff" size={12} />
                              </div>

                              <div className="absolute bottom-2 left-2 right-2 flex justify-between items-end">
                                 <p className="flex-1 text-white font-black text-[10px] uppercase tracking-tighter leading-snug drop-shadow-2xl pr-1">{ad.title}</p>
                                 <button 
                                   onClick={(e) => { e.stopPropagation(); setActiveSheet("Options"); }}
                                   className="w-6 h-6 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center text-white shrink-0 active:scale-90 transition-transform"
                                 >
                                    <MoreVertical size={14} color="#fff" />
                                 </button>
                              </div>
                           </motion.div>
                        ))}
                     </div>
                   </div>

                   {/* 02. Free Videos Carousel */}
                   <div>
                     <div className="flex justify-between items-center mb-0.5 px-1">
                        <div className="flex items-center gap-2">
                           <span className="w-[3px] h-3.5 rounded-full bg-orange-500 shrink-0" />
                           <h3 className="text-[9px] font-black text-slate-700 uppercase tracking-[0.2em] leading-none">Free Videos</h3>
                        </div>
                        <span onClick={() => navigate("/learning/viewer?mode=free")} className="text-slate-400 font-bold text-[8px] uppercase tracking-widest whitespace-nowrap cursor-pointer transition-colors">See All</span>
                     </div>
                     <div className="-mx-5 flex gap-3 overflow-x-auto pb-2 pl-5 pr-5 scrollbar-hide no-scrollbar" style={{ scrollbarWidth: "none" }}>
                        {ROW_2.map(ad => (
                           <motion.div whileTap={{ scale: 0.96 }} onClick={() => handleMediaClick(ad.image)} key={ad.id} className="relative flex-shrink-0 w-28 h-40 bg-slate-900 border border-slate-200 overflow-hidden shadow-sm group rounded-xl cursor-pointer">
                              <img src={ad.image} alt={ad.title} className="absolute inset-0 w-full h-full object-cover grayscale-[0.1] transition-all duration-700" />
                              <div className="absolute inset-0 bg-gradient-to-t from-black/100 via-black/40 to-transparent" />
                              
                              <div className="absolute top-1.5 right-1.5 w-6 h-6 rounded-full bg-white/20 backdrop-blur-md border border-white/30 ring-1 ring-white/10 flex items-center justify-center shadow-lg">
                                 <Play primary="#fff" size={12} />
                              </div>

                              <div className="absolute bottom-2 left-2 right-2 flex justify-between items-end">
                                 <p className="flex-1 text-white font-black text-[10px] uppercase tracking-tighter leading-snug drop-shadow-2xl pr-1">{ad.title}</p>
                                 <button 
                                   onClick={(e) => { e.stopPropagation(); setActiveSheet("Options"); }}
                                   className="w-6 h-6 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center text-white shrink-0 active:scale-90 transition-transform"
                                 >
                                    <MoreVertical size={14} color="#fff" />
                                 </button>
                              </div>
                           </motion.div>
                        ))}
                     </div>
                   </div>

                   {/* 03. Creator Showcases Carousel */}
                   <div>
                     <div className="flex justify-between items-center mb-0.5 px-1">
                        <div className="flex items-center gap-2">
                           <span className="w-[3px] h-3.5 rounded-full bg-orange-500 shrink-0" />
                           <h3 className="text-[9px] font-black text-slate-700 uppercase tracking-[0.2em] leading-none">Creator Showcases</h3>
                        </div>
                        <span onClick={() => navigate("/learning/viewer?mode=pay-to-stream")} className="text-slate-400 font-bold text-[8px] uppercase tracking-widest whitespace-nowrap cursor-pointer transition-colors">See All</span>
                     </div>
                     <div className="-mx-5 flex gap-3 overflow-x-auto pb-2 pl-5 pr-5 scrollbar-hide no-scrollbar" style={{ scrollbarWidth: "none" }}>
                        {ROW_3.map(ad => (
                           <motion.div whileTap={{ scale: 0.96 }} onClick={() => handleMediaClick(ad.image)} key={ad.id} className="relative flex-shrink-0 w-28 h-40 bg-slate-900 border border-slate-200 overflow-hidden shadow-sm group rounded-xl cursor-pointer">
                              <img src={ad.image} alt={ad.title} className="absolute inset-0 w-full h-full object-cover grayscale-[0.1] transition-all duration-700" />
                              <div className="absolute inset-0 bg-gradient-to-t from-black/100 via-black/40 to-transparent" />
                              
                              <div className="absolute top-1.5 right-1.5 w-6 h-6 rounded-full bg-white/20 backdrop-blur-md border border-white/30 ring-1 ring-white/10 flex items-center justify-center shadow-lg">
                                 <Play primary="#fff" size={12} />
                              </div>

                              <div className="absolute bottom-2 left-2 right-2 flex justify-between items-end">
                                 <p className="flex-1 text-white font-black text-[10px] uppercase tracking-tighter leading-snug drop-shadow-2xl pr-1">{ad.title}</p>
                                 <button 
                                   onClick={(e) => { e.stopPropagation(); setActiveSheet("Options"); }}
                                   className="w-6 h-6 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center text-white shrink-0 active:scale-90 transition-transform"
                                 >
                                    <MoreVertical size={14} color="#fff" />
                                 </button>
                              </div>
                           </motion.div>
                        ))}
                     </div>
                   </div>

                   {/* 04. Single Full-Width Masterclass Post */}
                   <div onClick={() => handleCourseClick(video.id)} className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-[0_2px_20px_rgba(0,0,0,0.07)] flex flex-col group cursor-pointer active:scale-[0.99] transition-transform">
                      <div className="relative w-full aspect-[4/5] bg-slate-100">
                         <img src={video.image} alt={video.title} className="absolute inset-0 w-full h-full object-cover transition-opacity" />
                         
                         {/* Details Overlay */}
                         <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
                         
                         <div className="absolute bottom-3 right-3 bg-black/60 backdrop-blur-md text-white border border-white/20 text-[9px] font-bold px-2 py-1 flex items-center gap-1 shadow-sm rounded-md">
                            <Clock size={10} primary="#fff" />
                            {video.duration}
                         </div>
                         
                         <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-14 h-14 rounded-full bg-white/20 backdrop-blur-md border border-white/40 ring-1 ring-white/20 flex items-center justify-center shadow-2xl">
                               <Play primary="#fff" size={22} />
                            </div>
                         </div>
                      </div>
                      
                      <div className="p-4 flex flex-col bg-white border-t border-slate-50">
                         <h4 className="font-bold text-slate-800 text-[10px] uppercase tracking-widest leading-none mb-1">{video.title}</h4>
                         <div className="flex items-center justify-between mt-2">
                            <div className="flex items-center gap-1.5 text-slate-500">
                               <User size={12} primary="#94a3b8" />
                               <span className="text-[9px] font-bold tracking-widest uppercase">{video.author}</span>
                            </div>
                            <div className="flex items-center gap-3">
                               <div className="flex items-center gap-1.5 text-slate-400">
                                  <Eye size={12} primary="#94a3b8" />
                                  <span className="text-[9px] font-bold tracking-widest">{video.views}</span>
                               </div>
                               <button 
                                  onClick={(e) => { e.stopPropagation(); setActiveSheet("Options"); }}
                                  className="w-7 h-7 rounded-full bg-slate-50 flex items-center justify-center text-slate-500 hover:text-slate-700 active:scale-90 transition-all shadow-sm border border-slate-100"
                               >
                                  <MoreVertical size={16} />
                               </button>
                            </div>
                         </div>
                      </div>
                   </div>

                </div>
             ))}
             
             {/* Infinite Scroll Loader Placeholder */}
             <div className="pt-6 pb-2 flex items-center justify-center">
                 <div className="w-5 h-5 border-[2px] border-slate-400 border-t-transparent rounded-full animate-spin" />
             </div>
          </section>

          {/* High-Fidelity Bottom Sheets */}
          <AnimatePresence>
            {activeSheet && (
              <>
                <motion.div 
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  onClick={() => setActiveSheet(null)}
                  className="fixed inset-0 z-[1000] bg-black/60 backdrop-blur-sm max-w-md mx-auto"
                />
                <motion.div 
                  initial={{ y: "100%" }} animate={{ y: 0 }} exit={{ y: "100%" }} transition={{ type: "spring", damping: 25, stiffness: 200 }}
                  className="fixed bottom-0 left-0 right-0 z-[1010] w-full max-w-md mx-auto bg-white rounded-t-[40px] border-t border-[#003366]/15 shadow-[0_-20px_60px_rgba(0,51,102,0.12)] overflow-hidden pb-[env(safe-area-inset-bottom)]"
                >
                  <div className="p-6">
                    <div className="flex justify-between items-center mb-8">
                      <h3 className="text-xl font-black text-slate-900 uppercase tracking-tighter">{activeSheet}</h3>
                      <button onClick={() => setActiveSheet(null)} className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center active:scale-90 transition-all border border-slate-200 shadow-sm">
                        <X size={20} className="text-slate-600" />
                      </button>
                    </div>

                    {activeSheet === "Upload" && (
                      <div className="space-y-6">
                        <div className="border-2 border-dashed border-[#003366]/25 bg-slate-50 rounded-[32px] p-10 flex flex-col items-center justify-center text-center shadow-md shadow-[#003366]/8">
                          <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-lg shadow-[#003366]/15 border border-[#003366]/15 mb-4">
                            <Upload size={32} />
                          </div>
                          <h4 className="font-black text-slate-900 text-sm mb-1 uppercase tracking-tight">Post Educational Content</h4>
                          <p className="text-slate-500 text-[10px] uppercase font-black tracking-[0.2em]">Share your knowledge</p>
                        </div>
                        <button className="w-full h-16 bg-[#003366] text-white rounded-2xl flex items-center justify-center font-black uppercase tracking-[0.2em] text-xs active:scale-95 transition-all shadow-lg shadow-[#003366]/25">
                          Upload Material
                        </button>
                      </div>
                    )}

                    {activeSheet === "Share" && (
                      <div className="space-y-8">
                        <div className="grid grid-cols-4 gap-6">
                          {[
                            { name: "WhatsApp", bg: "bg-[#25D366]", icon: MessageCircle },
                            { name: "Twitter", bg: "bg-black", icon: 'X' },
                            { name: "Facebook", bg: "bg-[#1877F2]", icon: UserPlus },
                            { name: "Email", bg: "bg-slate-100", icon: Send }
                          ].map((social, idx) => (
                            <div key={idx} className="flex flex-col items-center gap-3 group cursor-pointer active:scale-90 transition-all">
                              <div className={`w-16 h-16 rounded-2xl flex items-center justify-center text-white shadow-md shadow-slate-900/15 ${social.bg} ${social.name==="Email" ? "text-slate-900":""}`}>
                                {typeof social.icon === "string" ? <span className="font-black text-2xl">{social.icon}</span> : <social.icon size={28} />}
                              </div>
                              <span className="text-[9px] font-black text-slate-900 uppercase tracking-widest leading-none">{social.name}</span>
                            </div>
                          ))}
                        </div>
                        <div className="space-y-3">
                          <p className="text-[10px] font-black text-slate-900 uppercase tracking-widest ml-1">Universal Link</p>
                          <div className="flex h-14 bg-slate-50 rounded-2xl border border-[#003366]/20 shadow-md shadow-[#003366]/10 p-1.5 focus-within:border-[#003366]/40 transition-all">
                            <input type="text" readOnly value="https://kleench.com/l/82d2x" className="flex-1 bg-transparent px-4 text-xs font-black text-slate-700 outline-none" />
                            <button className="px-6 bg-[#003366] text-white rounded-xl font-black text-[10px] uppercase tracking-widest active:scale-95 transition-all">Copy</button>
                          </div>
                        </div>
                      </div>
                    )}

                    {activeSheet === "Register Agent" && (
                      <div className="space-y-5">
                        <div className="space-y-2">
                          <label className="text-[10px] font-black text-slate-900 uppercase tracking-widest ml-1">Learning Track</label>
                          <select className="w-full h-14 bg-white border border-[#003366]/20 rounded-2xl px-5 text-sm font-black outline-none shadow-md shadow-[#003366]/10 focus:border-[#003366]/40 transition-all">
                             <option>Financial Literacy</option>
                             <option>Crypto Compliance</option>
                             <option>Business Management</option>
                          </select>
                        </div>
                        <div className="space-y-2">
                          <label className="text-[10px] font-black text-slate-900 uppercase tracking-widest ml-1">Phone Number</label>
                          <input type="tel" placeholder="+260..." className="w-full h-14 bg-white border border-[#003366]/20 rounded-2xl px-5 text-sm font-black outline-none shadow-md shadow-[#003366]/10 focus:border-[#003366]/40 transition-all" />
                        </div>
                        <button onClick={() => { setActiveSheet(null); }} className="w-full h-16 bg-blue-600 text-white rounded-2xl flex items-center justify-center font-black uppercase tracking-[0.2em] text-xs active:scale-95 transition-all shadow-lg shadow-blue-600/25 mt-4">
                          Secure Track Access
                        </button>
                      </div>
                    )}

                    {activeSheet === "Options" && (
                      <div className="space-y-3">
                         <button 
                           onClick={() => setActiveSheet("Share")}
                           className="w-full h-14 bg-slate-50 flex items-center gap-4 px-6 rounded-xl active:scale-95 transition-all text-slate-900 border border-slate-200 shadow-sm"
                         >
                            <div className="w-8 h-8 rounded-full bg-[#003366]/10 flex items-center justify-center">
                               <MessageCircle color="#003366" size={16} />
                            </div>
                            <span className="font-black text-[11px] uppercase tracking-widest">Share to peers</span>
                         </button>
                         <button 
                           onClick={() => setActiveSheet(null)}
                           className="w-full h-14 bg-slate-50 flex items-center gap-4 px-6 rounded-xl active:scale-95 transition-all text-slate-900 border border-slate-200 shadow-sm"
                         >
                            <div className="w-8 h-8 rounded-full bg-[#003366]/10 flex items-center justify-center">
                               <Bookmark size={16} className="text-[#003366]" />
                            </div>
                            <span className="font-black text-[11px] uppercase tracking-widest">Bookmark Video</span>
                         </button>
                      </div>
                    )}
                  </div>
                </motion.div>
              </>
            )}
          </AnimatePresence>

          {/* Premium Media Player Overlay */}
          <AnimatePresence>
            {activeMedia && (
               <motion.div 
                 initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                 className="fixed inset-0 z-[100] bg-black max-w-md mx-auto flex flex-col justify-center"
               >
                 <div className="absolute top-0 left-0 right-0 p-4 pt-8 flex justify-between items-center bg-gradient-to-b from-black/80 to-transparent z-10">
                   <h3 className="text-white font-bold text-xs uppercase tracking-widest">Media Player</h3>
                   <button onClick={() => setActiveMedia(null)} className="w-10 h-10 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center text-white border border-white/20 active:scale-90 transition-transform"><X size={20} /></button>
                 </div>
                 
                 <div className="relative w-full aspect-[4/5] bg-slate-900 border-y border-white/10 flex items-center justify-center overflow-hidden">
                   <img src={activeMedia} alt="Media" className="absolute inset-0 w-full h-full object-cover opacity-60" />
                   
                   <div className="relative z-10 w-20 h-20 rounded-full bg-white/20 backdrop-blur-md border-[2px] border-white flex items-center justify-center shadow-2xl active:scale-90 transition-transform cursor-pointer">
                      <Play primary="#fff" size={32} />
                   </div>
                 </div>

                 <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black via-black/80 to-transparent flex flex-col gap-4 pb-[env(safe-area-inset-bottom)]">
                   <div className="w-full h-1 bg-white/20 rounded-full overflow-hidden">
                      <div className="w-1/3 h-full bg-orange-500 rounded-full" />
                   </div>
                   <div className="flex justify-between items-center text-white/50 text-[10px] font-bold tracking-widest">
                      <span>00:00</span>
                      <span>-03:45</span>
                   </div>
                 </div>
               </motion.div>
            )}
          </AnimatePresence>

        </div>
      )}
    </div>
  );
}
