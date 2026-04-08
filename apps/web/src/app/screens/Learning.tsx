import { 
  Play,
  ArrowRight,
  Search,
  Circle,
  Video,
  Newspaper,
  BookOpen,
  CloudUpload, 
  Send, 
  UserPlus,
  X,
  MessageCircle,
  Clock,
  User,
  Eye
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import { PageHeader } from "../components/PageHeader";
import { PageSkeletons, usePageLoading } from "../components/PageSkeletons";

// Imports from learning
import learnWoman from "@/assets/learning/learn_woman_1775596426630.png";
import learnBook from "@/assets/learning/learn_book_1775596454115.png";
import learnChart from "@/assets/learning/learn_chart_1775596868170.png";
import learnMountain from "@/assets/learning/learn_mountain_1775596850615.png";
import learnPresenter from "@/assets/learning/learn_presenter_1775596479989.png";

// Reused assets to match the volume of content needed
import adPodcast from "@/assets/ads/ad_podcast.png";
import adShopping from "@/assets/ads/ad_shopping.png";

export function Learning() {
  const loading = usePageLoading(800);
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeMedia, setActiveMedia] = useState<string | null>(null);

  const [activeSheet, setActiveSheet] = useState<null | "Upload" | "Share" | "Register Agent" | "Live Stream">(null);

  const handleActionClick = (actionName: string) => {
     if (actionName === "Live Stream") return toast.success("Live Stream starting...");
     setActiveSheet(actionName as "Upload" | "Share" | "Register Agent" | "Live Stream" | null);
  };

  const handleCourseClick = (courseId: number | string) => {
     navigate(`/learning/${courseId}`);
  };

  const handleMediaClick = (imageSrc: string) => {
     setActiveMedia(imageSrc);
  };

  const ROW_1 = [
    { id: 1, image: learnWoman },
    { id: 2, image: learnBook }, // Or an orange headphone equivalent
    { id: 3, image: learnChart }
  ];

  const ROW_2 = [
    { id: 1, image: learnMountain },
    { id: 2, image: learnBook },
    { id: 3, image: learnWoman }
  ];

  const ROW_3 = [
    { id: 1, image: learnPresenter },
    { id: 2, image: adPodcast },
    { id: 3, image: adShopping }
  ];

  const ROW_4 = [
    { id: 1, image: learnPresenter },
    { id: 2, image: learnBook },
    { id: 3, image: learnChart }
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
        <div className="px-4 mt-2 relative z-20 space-y-4">

          {/* Search Bar & Live Button */}
          <div className="flex items-center gap-3">
             <div className="flex-1 bg-white rounded-xl h-10 flex items-center px-4 shadow-sm border border-gray-100">
                <Search size={16} className="text-gray-400 mr-2 shrink-0" strokeWidth={2.5} />
                <input 
                   type="text" 
                   value={searchQuery}
                   onChange={(e) => setSearchQuery(e.target.value)}
                   placeholder="Search" 
                   className="flex-1 h-full bg-transparent outline-none text-slate-800 font-bold placeholder:text-gray-400 text-[13px]"
                />
             </div>
             <button onClick={() => handleActionClick("Live Stream")} className="h-10 bg-white rounded-xl px-4 flex items-center gap-2 border border-gray-300 shadow-sm active:scale-95 transition-transform shrink-0">
                <span className="text-[#E54D2E] font-black text-[13px] tracking-tight pt-[1.5px]">LIVE</span>
                <Circle className="fill-[#E54D2E] text-[#E54D2E]" size={8} />
             </button>
          </div>

          {/* Top Action Buttons (Upload, Share, Register Agent) - Circular Soft Brutalism */}
          <section className="px-2">
             <div className="flex items-start justify-between gap-2 px-2">
               {[
                 { id: 'upload', icon: CloudUpload, label: "Upload" },
                 { id: 'share', icon: Send, label: "Share" },
                 { id: 'gift', icon: UserPlus, label: "Register Agent" }
               ].map(btn => (
                 <motion.button 
                   key={btn.id}
                   onClick={() => handleActionClick(btn.label)}
                   whileTap={{ scale: 0.92 }}
                   className="flex flex-col items-center justify-center gap-1.5 group outline-none"
                 >
                   <div className="w-12 h-12 bg-white rounded-full flex flex-col items-center justify-center border border-slate-200 shadow-sm group-active:scale-95 transition-all">
                      <btn.icon size={20} className="text-slate-800" strokeWidth={1.5} />
                   </div>
                   <span className="font-bold text-slate-800 text-[8px] uppercase tracking-widest text-center leading-tight whitespace-normal break-words w-16">{btn.label}</span>
                 </motion.button>
               ))}
             </div>
          </section>

          {/* Main Interleaved Learning Feed */}
          <section className="space-y-6 pb-12 mt-6">
             {EXPLORE_MORE_VIDEOS.map((video, index) => (
                <div key={video.id} className="space-y-6">
                   
                   {/* Interleaved Carousels */}
                   {index === 0 && (
                     <div className="w-full">
                       <div className="flex justify-between items-end mb-3 px-1">
                          <h3 className="font-black text-slate-800 text-[11px] uppercase tracking-widest leading-none">Learn & Earn Videos</h3>
                          <span className="text-slate-400 font-bold text-[9px] uppercase tracking-widest whitespace-nowrap cursor-pointer hover:text-slate-600 transition-colors">See All</span>
                       </div>
                       <div className="flex overflow-x-auto gap-3 pb-2 px-1" style={{ scrollbarWidth: "none" }}>
                          {ROW_1.map(ad => (
                             <div onClick={() => handleMediaClick(ad.image)} key={ad.id} className="relative shrink-0 w-[160px] aspect-[4/3] rounded-2xl overflow-hidden cursor-pointer shadow-sm bg-white border border-slate-200 active:scale-95 transition-transform">
                                <img src={ad.image} alt="Learn Video" className="absolute inset-0 w-full h-full object-cover" />
                             </div>
                          ))}
                       </div>
                     </div>
                   )}

                   {index === 1 && (
                     <div className="w-full">
                       <div className="flex justify-between items-end mb-3 px-1">
                          <h3 className="font-black text-slate-800 text-[11px] uppercase tracking-widest leading-none">Free Videos</h3>
                          <span className="text-slate-400 font-bold text-[9px] uppercase tracking-widest whitespace-nowrap cursor-pointer hover:text-slate-600 transition-colors">See All</span>
                       </div>
                       <div className="flex overflow-x-auto gap-3 pb-2 px-1" style={{ scrollbarWidth: "none" }}>
                          {ROW_2.map(ad => (
                             <div onClick={() => handleMediaClick(ad.image)} key={ad.id} className="relative shrink-0 w-[180px] aspect-[16/10] rounded-2xl overflow-hidden cursor-pointer shadow-sm bg-white border border-slate-200 active:scale-95 transition-transform">
                                <img src={ad.image} alt="Free Video" className="absolute inset-0 w-full h-full object-cover" />
                             </div>
                          ))}
                       </div>
                     </div>
                   )}

                   {index === 2 && (
                     <div className="w-full">
                       <div className="flex justify-between items-end mb-3 px-1">
                          <h3 className="font-black text-slate-800 text-[11px] uppercase tracking-widest leading-none">Creator Showcases</h3>
                          <span className="text-slate-400 font-bold text-[9px] uppercase tracking-widest whitespace-nowrap cursor-pointer hover:text-slate-600 transition-colors">See All</span>
                       </div>
                       <div className="flex overflow-x-auto gap-3 pb-2 px-1" style={{ scrollbarWidth: "none" }}>
                          {ROW_3.map(ad => (
                             <div onClick={() => handleMediaClick(ad.image)} key={ad.id} className="relative shrink-0 w-[160px] aspect-[4/3] rounded-2xl overflow-hidden cursor-pointer shadow-sm bg-white border border-slate-200 active:scale-95 transition-transform">
                                <img src={ad.image} alt="Free Video" className="absolute inset-0 w-full h-full object-cover" />
                             </div>
                          ))}
                       </div>
                     </div>
                   )}

                   {index === 3 && (
                     <div className="w-full">
                       <div className="flex justify-between items-end mb-3 px-1">
                          <h3 className="font-black text-slate-800 text-[11px] uppercase tracking-widest leading-none">Premium Masterclasses</h3>
                          <span className="text-slate-400 font-bold text-[9px] uppercase tracking-widest whitespace-nowrap cursor-pointer hover:text-slate-600 transition-colors">See All</span>
                       </div>
                       <div className="flex overflow-x-auto gap-3 pb-2 px-1" style={{ scrollbarWidth: "none" }}>
                          {ROW_4.map(ad => (
                             <div onClick={() => handleMediaClick(ad.image)} key={ad.id} className="relative shrink-0 w-[180px] aspect-[16/10] rounded-2xl overflow-hidden cursor-pointer shadow-sm bg-white border border-slate-200 active:scale-95 transition-transform">
                                <img src={ad.image} alt="Premium Video" className="absolute inset-0 w-full h-full object-cover" />
                             </div>
                          ))}
                       </div>
                     </div>
                   )}

                   {/* Main Feed Post - Sleek Netflix UI */}
                   <div onClick={() => handleCourseClick(video.id)} className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-sm flex flex-col group cursor-pointer active:scale-[0.99] transition-transform">
                      <div className="relative w-full aspect-video bg-slate-100">
                         <img src={video.image} alt={video.title} className="absolute inset-0 w-full h-full object-cover transition-opacity" />
                         
                         {/* Details Overlay */}
                         <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent pointer-events-none" />
                         
                         <div className="absolute bottom-3 right-3 bg-black/60 backdrop-blur-md text-white border border-white/20 text-[9px] font-bold px-2 py-1 flex items-center gap-1 shadow-sm rounded-md">
                            <Clock size={10} />
                            {video.duration}
                         </div>
                      </div>
                      
                      <div className="p-4 flex flex-col bg-white">
                         <h4 className="font-bold text-slate-800 text-[12px] uppercase tracking-widest leading-none mb-1">{video.title}</h4>
                         <div className="flex items-center justify-between mt-2">
                            <div className="flex items-center gap-1.5 text-slate-500">
                               <User size={12} strokeWidth={2} />
                               <span className="text-[10px] font-bold tracking-widest uppercase">{video.author}</span>
                            </div>
                            <div className="flex items-center gap-1.5 text-slate-400">
                               <Eye size={12} strokeWidth={2} />
                               <span className="text-[10px] font-bold tracking-widest">{video.views}</span>
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
                  className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm max-w-md mx-auto"
                />
                <motion.div 
                  initial={{ y: "100%" }} animate={{ y: 0 }} exit={{ y: "100%" }} transition={{ type: "spring", damping: 25, stiffness: 200 }}
                  className="fixed bottom-0 left-0 right-0 z-[110] w-full max-w-md mx-auto bg-white rounded-t-[32px] overflow-hidden shadow-2xl pb-[env(safe-area-inset-bottom)]"
                >
                  <div className="p-6">
                    <div className="flex justify-between items-center mb-6">
                      <h3 className="text-xl font-black text-slate-800 uppercase tracking-tighter">{activeSheet}</h3>
                      <button onClick={() => setActiveSheet(null)} className="w-8 h-8 bg-slate-100 rounded-full flex items-center justify-center active:scale-90 transition-transform"><X size={16} className="text-slate-500" /></button>
                    </div>

                    {activeSheet === "Upload" && (
                      <div className="space-y-4">
                        <div className="border-2 border-dashed border-slate-300 bg-slate-50 rounded-3xl p-8 flex flex-col items-center justify-center text-center">
                          <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-sm border border-slate-100 mb-3">
                            <CloudUpload size={28} className="text-slate-400" strokeWidth={1.5} />
                          </div>
                          <h4 className="font-bold text-slate-700 text-sm mb-1">Drag & Drop media</h4>
                          <p className="text-slate-400 text-[10px] uppercase font-bold tracking-widest">or tap to browse files</p>
                        </div>
                        <button className="w-full h-14 bg-slate-900 text-white rounded-2xl flex items-center justify-center font-bold uppercase tracking-widest text-xs active:scale-95 transition-transform shadow-lg shadow-slate-900/20">
                          Choose from Gallery
                        </button>
                      </div>
                    )}

                    {activeSheet === "Share" && (
                      <div className="space-y-6">
                        <div className="grid grid-cols-4 gap-4">
                          {[
                            { name: "WhatsApp", bg: "bg-[#25D366]", icon: MessageCircle },
                            { name: "Twitter", bg: "bg-black", icon: 'X' },
                            { name: "Facebook", bg: "bg-[#1877F2]", icon: UserPlus },
                            { name: "Email", bg: "bg-slate-200", icon: Send }
                          ].map(social => (
                            <div key={social.name} className="flex flex-col items-center gap-2 group cursor-pointer active:scale-90 transition-transform">
                              <div className={`w-14 h-14 rounded-full flex items-center justify-center text-white shadow-sm ${social.bg} ${social.name==="Email" ? "text-slate-600":""}`}>
                                {typeof social.icon === "string" ? <span className="font-black text-xl">{social.icon}</span> : <social.icon size={20} />}
                              </div>
                              <span className="text-[9px] font-bold text-slate-500 uppercase tracking-widest">{social.name}</span>
                            </div>
                          ))}
                        </div>
                        <div>
                          <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2 ml-1">Copy Link</p>
                          <div className="flex h-12 bg-slate-100 rounded-2xl border border-slate-200 p-1">
                            <input type="text" readOnly value="https://kleench.com/a/48f9q" className="flex-1 bg-transparent px-3 text-xs font-bold text-slate-600 outline-none" />
                            <button className="px-4 bg-white rounded-xl font-bold text-[10px] uppercase tracking-widest border border-slate-200 shadow-sm active:scale-95 transition-transform">Copy</button>
                          </div>
                        </div>
                      </div>
                    )}

                    {activeSheet === "Register Agent" && (
                      <div className="space-y-4">
                        <div className="space-y-1">
                          <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1">Full Name</label>
                          <input type="text" placeholder="e.g. John Doe" className="w-full h-12 bg-slate-50 border border-slate-200 rounded-xl px-4 text-sm font-bold outline-none focus:border-slate-400 transition-colors" />
                        </div>
                        <div className="space-y-1">
                          <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1">Phone Number</label>
                          <input type="tel" placeholder="+260..." className="w-full h-12 bg-slate-50 border border-slate-200 rounded-xl px-4 text-sm font-bold outline-none focus:border-slate-400 transition-colors" />
                        </div>
                        <button onClick={() => { toast.success("Agent Registered Successfully!"); setActiveSheet(null); }} className="w-full h-14 bg-orange-500 text-white rounded-2xl flex items-center justify-center font-bold uppercase tracking-widest text-xs active:scale-95 transition-transform shadow-lg shadow-orange-500/30 mt-2">
                          Submit Application
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
                      <Play fill="white" className="text-white ml-1" size={32} />
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
