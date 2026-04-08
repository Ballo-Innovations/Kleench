import {
  Search,
  ShoppingCart,
  TrendingUp,
  CloudUpload,
  Send,
  UserPlus,
  Headphones,
  X,
  MessageCircle,
  Play,
  Volume2,
  Heart,
  Share,
  MoreHorizontal
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";
import { PageHeader } from "../components/PageHeader";
import { PageSkeletons, usePageLoading } from "../components/PageSkeletons";

// Our custom generated placeholder images
import adCar from "@/assets/ads/ad_car.png";
import adBurger from "@/assets/ads/ad_burger.png";
import adBeach from "@/assets/ads/ad_beach.png";
import adShopping from "@/assets/ads/ad_shopping.png";
import adPodcast from "@/assets/ads/ad_podcast.png";
import adHealth from "@/assets/ads/ad_health.png";
import adCode from "@/assets/ads/ad_code.png";

export function Advert() {
  const loading = usePageLoading(800);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeMedia, setActiveMedia] = useState<string | null>(null);

  const [activeSheet, setActiveSheet] = useState<null | "Upload" | "Share" | "Register Agent">(null);

  const handleActionClick = (actionName: string) => {
     setActiveSheet(actionName as "Upload" | "Share" | "Register Agent" | null);
  };

  const handleMediaClick = (imageSrc: string) => {
     setActiveMedia(imageSrc);
  };

  const VIDEO_ADS = [
    { id: 1, title: "DRIVE LUXURY", image: adCar },
    { id: 2, title: "DELICIOUS BURGER", image: adBurger },
    { id: 3, title: "SALE 50% OFF", image: adShopping }
  ];

  const PICTURE_ADS = [
    { id: 1, title: "SUMMER VACATION", image: adBeach },
    { id: 2, title: "NEW ARRIVALS", image: adShopping },
    { id: 3, title: "GET FIT NOW!", image: adBurger }
  ];

  const AUDIO_ADS = [
    { id: 1, title: "BUSINESS PODCAST", image: adPodcast, time: "2:15" },
    { id: 2, title: "HEALTH TIPS", image: adHealth, time: "1:30" },
    { id: 3, title: "LEARN TO CODE", image: adCode, time: "5:00" }
  ];

  const FEED_POSTS = [
    { id: 1, brand: "Solar Pro Zambia", avatarBg: "bg-orange-500", media: adCar },
    { id: 2, brand: "Delicious Burger", avatarBg: "bg-yellow-500", media: adBurger },
    { id: 3, brand: "Travel Hub", avatarBg: "bg-blue-500", media: adBeach },
    { id: 4, brand: "Daily Podcast", avatarBg: "bg-indigo-300", media: adPodcast }
  ];

  return (
    <div className="w-full pb-32 relative min-h-screen bg-transparent overflow-x-hidden font-sans text-slate-800">
      
      {/* ── Standardized Header ── */}
      <PageHeader 
        useLogo
        title="ADVERT" 
        searchValue={searchQuery}
        onSearchChange={setSearchQuery}
      />

      {loading ? (
        <PageSkeletons.Generic />
      ) : (
        <div className="px-4 mt-1 relative z-20 space-y-4">

          {/* Top Action Buttons */}
          <section className="px-2 pt-1">
             <div className="flex items-start justify-between gap-2 px-6">
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

          {/* Main Interleaved Feed Area */}
          <section className="space-y-6 pb-12 mt-4">
             {FEED_POSTS.map((post, index) => (
                <div key={post.id} className="space-y-6">
                   
                   {/* Interleaved Carousels */}
                   {index === 1 && (
                     <div className="space-y-6">
                        {/* Video Ads */}
                        <div>
                          <h3 className="font-black text-slate-800 text-[11px] uppercase tracking-widest mb-3 px-1">Video Ads</h3>
                          <div className="flex overflow-x-auto gap-3 pb-2 px-1" style={{ scrollbarWidth: "none" }}>
                             {VIDEO_ADS.map(ad => (
                                <div onClick={() => handleMediaClick(ad.image)} key={ad.id} className="relative shrink-0 w-[140px] h-[180px] rounded-2xl overflow-hidden group cursor-pointer shadow-sm bg-white border border-slate-200 active:scale-95 transition-transform">
                                   <img src={ad.image} alt={ad.title} className="absolute inset-0 w-full h-full object-cover" />
                                   <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent" />
                                   
                                   <div className="absolute inset-0 flex flex-col justify-end p-3 pb-3">
                                      <span className="font-bold text-white text-[10px] uppercase tracking-wide leading-tight line-clamp-2">{ad.title}</span>
                                   </div>
            
                                   <div className="absolute inset-0 flex items-center justify-center">
                                      <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md border border-white/50 flex items-center justify-center transition-transform group-active:scale-90">
                                         <Play fill="white" className="text-white ml-0.5" size={18} />
                                      </div>
                                   </div>
                                </div>
                             ))}
                          </div>
                        </div>

                        {/* Picture Ads */}
                        <div>
                          <h3 className="font-black text-slate-800 text-[11px] uppercase tracking-widest mb-3 px-1">Picture Ads</h3>
                          <div className="flex overflow-x-auto gap-3 pb-2 px-1" style={{ scrollbarWidth: "none" }}>
                             {PICTURE_ADS.map(ad => (
                                <div onClick={() => handleMediaClick(ad.image)} key={ad.id} className="relative shrink-0 w-[140px] h-[140px] rounded-2xl overflow-hidden group cursor-pointer shadow-sm bg-white border border-slate-200 active:scale-95 transition-transform">
                                   <img src={ad.image} alt={ad.title} className="absolute inset-0 w-full h-full object-cover" />
                                   <div className="absolute inset-0 bg-gradient-to-t from-slate-900/70 to-transparent" />
                                   
                                   <div className="absolute inset-0 flex flex-col justify-end p-3 text-center">
                                      <span className="font-bold text-white text-[10px] uppercase tracking-wide leading-tight line-clamp-2">{ad.title}</span>
                                   </div>
                                </div>
                             ))}
                          </div>
                        </div>
                     </div>
                   )}

                   {index === 2 && (
                     <div>
                       <h3 className="font-black text-slate-800 text-[11px] uppercase tracking-widest mb-3 px-1">Audio Ads</h3>
                       <div className="flex overflow-x-auto gap-3 pb-2 px-1" style={{ scrollbarWidth: "none" }}>
                          {AUDIO_ADS.map(ad => (
                             <div onClick={() => handleMediaClick(ad.image)} key={ad.id} className="relative shrink-0 w-[140px] h-[140px] rounded-2xl overflow-hidden group cursor-pointer shadow-sm bg-slate-900 border border-slate-200 active:scale-95 transition-transform">
                                <img src={ad.image} alt={ad.title} className="absolute inset-0 w-full h-full object-cover opacity-60 mix-blend-overlay" />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-slate-900/40 to-slate-900/80" />
                                
                                <div className="absolute inset-0 flex items-center justify-center pb-2 z-10">
                                   <div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md border border-white/30 flex items-center justify-center">
                                      <Headphones className="text-white" size={18} strokeWidth={1.5} />
                                   </div>
                                </div>
                                
                                <div className="absolute inset-0 flex flex-col justify-between p-3 z-10 pointer-events-none">
                                   <span className="font-bold text-white/90 text-[9px] uppercase tracking-wide text-center leading-tight line-clamp-2 mt-1">{ad.title}</span>
                                   
                                   {/* Sleek Audio Player Bar */}
                                   <div className="flex items-center gap-1.5 mt-auto w-full px-1 mb-1">
                                      <Volume2 size={10} className="text-white/80 shrink-0" />
                                      <div className="flex-1 h-[2px] bg-white/20 rounded-full relative">
                                         <div className="absolute left-0 top-0 bottom-0 w-[40%] bg-[#FF8C00] rounded-full" />
                                         <div className="absolute left-[40%] top-1/2 -translate-y-1/2 w-[6px] h-[6px] bg-white rounded-full translate-x-[-50%] shadow-sm" />
                                      </div>
                                      <span className="text-[8px] font-bold text-white/80 shrink-0">{ad.time}</span>
                                   </div>
                                </div>
                             </div>
                          ))}
                       </div>
                     </div>
                   )}

                   {/* Main Feed Post - Sleek Netflix UI */}
                   <div className="bg-white border border-slate-200 rounded-3xl shadow-sm flex flex-col w-full overflow-hidden relative">
                      {/* Header */}
                      <div className="flex items-center justify-between p-4 bg-white relative z-10">
                         <div className="flex items-center gap-3">
                            <div className={`w-8 h-8 rounded-full shadow-sm ${post.avatarBg}`} />
                            <span className="font-bold text-slate-800 text-[10px] uppercase tracking-widest">{post.brand}</span>
                         </div>
                         <button className="w-8 h-8 flex items-center justify-center rounded-full transition-all text-slate-400 active:bg-slate-50">
                            <MoreHorizontal size={18} />
                         </button>
                      </div>
                      
                      {/* Media Segment */}
                      <div onClick={() => handleMediaClick(post.media)} className={`w-full aspect-[4/5] relative bg-slate-100 active:scale-[0.99] transition-transform cursor-pointer overflow-hidden`}>
                         <img src={post.media} alt={post.brand} className="absolute inset-0 w-full h-full object-cover" />
                         {post.id % 2 !== 0 && (
                            <div className="absolute inset-0 flex items-center justify-center bg-black/5 pointer-events-none group cursor-pointer">
                               <div className="w-14 h-14 rounded-full bg-black/20 backdrop-blur-md border border-white/50 flex items-center justify-center shadow-lg transition-transform group-active:scale-95">
                                  <Play fill="white" className="text-white ml-1 mt-0.5" size={24} />
                               </div>
                            </div>
                         )}
                      </div>
                      
                      {/* Footer Actions */}
                      <div className="flex items-center gap-6 px-5 py-4 bg-white">
                         <button className="flex items-center gap-1.5 text-slate-800 active:scale-95 transition-all">
                            <Heart size={22} strokeWidth={1.5} />
                         </button>
                         <button className="flex items-center gap-1.5 text-slate-800 active:scale-95 transition-all">
                            <MessageCircle size={22} strokeWidth={1.5} />
                         </button>
                         <button className="flex items-center gap-1.5 text-slate-800 active:scale-95 transition-all ml-auto">
                            <Share size={20} strokeWidth={1.5} />
                         </button>
                      </div>
                   </div>
                </div>
             ))}
             
             {/* Infinite Scroll Loader Placeholder */}
             <div className="py-8 flex items-center justify-center">
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
                        <button onClick={() => { /* toast.success("Agent Registered Successfully!"); */ setActiveSheet(null); }} className="w-full h-14 bg-orange-500 text-white rounded-2xl flex items-center justify-center font-bold uppercase tracking-widest text-xs active:scale-95 transition-transform shadow-lg shadow-orange-500/30 mt-2">
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
