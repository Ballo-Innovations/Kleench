import { 
  X,
  MoreVertical,
  Bookmark
} from "lucide-react";
import { 
  DuotoneUpload as Upload, 
  DuotoneSend as Send, 
  DuotoneUserPlus as UserPlus, 
  DuotoneHeadphones as Headphones, 
  DuotoneHeart as Heart, 
  DuotoneMessageSquare as MessageCircle, 
  DuotonePlay as Play,
  DuotoneVolume as Volume2
} from "../components/DuotoneIcon";
import { motion, AnimatePresence } from "motion/react";
import { useState } from "react";
import { useNavigate } from "react-router";
// Removed unused toast import
import { PageHeader } from "../components/PageHeader";
import { usePageLoading, PageSkeletons } from "../components/PageSkeletons";

// Our custom generated placeholder images
import adCar from "@/assets/ads/ad_car.png";
import adBurger from "@/assets/ads/ad_burger.png";
import adBeach from "@/assets/ads/ad_beach.png";
import adShopping from "@/assets/ads/ad_shopping.png";
import adPodcast from "@/assets/ads/ad_podcast.png";
import adHealth from "@/assets/ads/ad_health.png";
import adCode from "@/assets/ads/ad_code.png";

// New high-quality generated assets
import adEvCar from "@/assets/ads/ad_ev_car.png";
import adResort from "@/assets/ads/ad_resort.png";
import adHeadphones from "@/assets/ads/ad_headphones.png";
import adSmarthome from "@/assets/ads/ad_smarthome.png";
import adSneakers from "@/assets/ads/ad_sneakers.png";

export function Advert() {
  const navigate = useNavigate();
  const loading = usePageLoading(800);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeMedia, setActiveMedia] = useState<string | null>(null);

  const [activeSheet, setActiveSheet] = useState<null | "Upload" | "Share" | "Register Agent" | "Options">(null);

  const handleActionClick = (actionName: string) => {
    if (actionName === "Upload") return navigate("/advert/upload");
    if (actionName === "Register Agent") return navigate("/advert/agent-registration");
    setActiveSheet(actionName as "Upload" | "Share" | "Register Agent" | null);
  };

  const handleMediaClick = (_imageSrc: string, tab: "video" | "picture" | "audio" = "video") => {
     navigate(`/advert/view-ads?tab=${tab}`);
  };

  const VIDEO_ADS = [
    { id: 1, title: "FUTURE TECH", image: adEvCar },
    { id: 2, title: "LUXURY ESCAPE", image: adResort },
    { id: 3, title: "DRIVE LUXURY", image: adCar },
    { id: 4, title: "SMART LIVING", image: adSmarthome },
    { id: 5, title: "DELICIOUS BURGER", image: adBurger },
    { id: 6, title: "SALE 50% OFF", image: adShopping },
    { id: 7, title: "PREMIUM SOUND", image: adHeadphones }
  ];

  const PICTURE_ADS = [
    { id: 1, title: "URBAN STYLE", image: adSneakers },
    { id: 2, title: "SUMMER VACATION", image: adBeach },
    { id: 3, title: "NEW ARRIVALS", image: adShopping },
    { id: 4, title: "GET FIT NOW!", image: adHealth },
    { id: 5, title: "AUTO SALES", image: adCar },
    { id: 6, title: "DELICIOUS BURGER", image: adBurger },
    { id: 7, title: "RESORT VIEW", image: adResort }
  ];

  const AUDIO_ADS = [
    { id: 1, title: "DEEP FOCUS", image: adPodcast, time: "2:15" },
    { id: 2, title: "TECH TALKS", image: adCode, time: "5:00" },
    { id: 3, title: "STUDIO SESSIONS", image: adHeadphones, time: "4:20" },
    { id: 4, title: "HEALTH TIPS", image: adHealth, time: "1:30" },
    { id: 5, title: "FUTURE GADGETS", image: adEvCar, time: "3:45" },
    { id: 6, title: "SMART HOME", image: adSmarthome, time: "0:50" },
    { id: 7, title: "CITY VIBES", image: adSneakers, time: "2:10" }
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
        <div className="px-4 mt-0.5 relative z-20 space-y-2">

          {/* Top Action Buttons */}
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
                    <div className="w-10 h-10 bg-[var(--app-bg)] rounded-full flex flex-col items-center justify-center border border-slate-200 shadow-sm group-active:scale-95 transition-all mx-2">
                       <UserPlus size={18} />
                    </div>
                    <span className="font-bold text-slate-800 text-[6px] uppercase tracking-[0.15em] text-center leading-tight whitespace-normal break-words w-16">Register Agent</span>
                  </motion.button>
              </div>
          </section>

          {/* Main Interleaved Feed Area */}
          <section className="space-y-3 pb-12 mt-1">
             {FEED_POSTS.map((post) => (
                <div key={post.id} className="space-y-3">
                   
                   {/* 01. Video Ads Carousel — Multi-card Grid */}
                   <div>
                     <div className="flex items-center justify-between mb-1 px-1">
                       <div className="flex items-center gap-2">
                         <span className="w-[3px] h-3.5 rounded-full bg-orange-500 shrink-0" />
                         <h3 className="text-[9px] font-black text-slate-700 uppercase tracking-[0.2em] leading-none">Video Ads</h3>
                       </div>
                       <span onClick={() => navigate("/advert/view-ads?tab=video")} className="text-slate-400 font-bold text-[8px] uppercase tracking-widest whitespace-nowrap cursor-pointer">See All</span>
                     </div>
                     {/* Bleed to screen edges */}
                     <div className="-mx-5 flex gap-3 overflow-x-auto pb-2 pl-5 pr-5 scrollbar-hide no-scrollbar" style={{ scrollbarWidth: "none" }}>
                        {VIDEO_ADS.map(ad => (
                           <motion.div
                             whileTap={{ scale: 0.96 }}
                             onClick={() => handleMediaClick(ad.image, "video")}
                             key={ad.id}
                             className="relative flex-shrink-0 w-28 h-40 bg-[var(--app-text-slate)] border border-slate-200 overflow-hidden shadow-sm group rounded-xl cursor-pointer"
                           >
                              <img src={ad.image} alt={ad.title} className="absolute inset-0 w-full h-full object-cover grayscale-[0.1] transition-all duration-700" />
                              {/* Deep gradient for text legibility */}
                              <div className="absolute inset-0 bg-gradient-to-t from-black/100 via-black/40 to-transparent" />
                              
                              {/* Glassmorphism play badge */}
                              <div className="absolute top-1.5 right-1.5 w-6 h-6 rounded-full bg-[var(--app-bg)]/20 backdrop-blur-md border border-white/30 ring-1 ring-white/10 flex items-center justify-center shadow-lg">
                                 <Play primary="#fff" size={12} />
                              </div>

                              {/* Title strip and Share Dots */}
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

                   {/* 02. Picture Ads Carousel — Multi-card Grid */}
                   <div>
                     <div className="flex items-center justify-between mb-1 px-1">
                       <div className="flex items-center gap-2">
                         <span className="w-[3px] h-3.5 rounded-full bg-orange-500 shrink-0" />
                         <h3 className="text-[9px] font-black text-slate-700 uppercase tracking-[0.2em] leading-none">Picture Ads</h3>
                       </div>
                       <span onClick={() => navigate("/advert/view-ads?tab=picture")} className="text-slate-400 font-bold text-[8px] uppercase tracking-widest whitespace-nowrap cursor-pointer">See All</span>
                     </div>
                     <div className="-mx-5 flex gap-3 overflow-x-auto pb-2 pl-5 pr-5 scrollbar-hide no-scrollbar" style={{ scrollbarWidth: "none" }}>
                        {PICTURE_ADS.map(ad => (
                           <motion.div
                             whileTap={{ scale: 0.96 }}
                             onClick={() => handleMediaClick(ad.image, "picture")}
                             key={ad.id}
                             className="relative flex-shrink-0 w-28 h-40 bg-[var(--app-text-slate)] border border-slate-200 overflow-hidden shadow-sm group rounded-xl cursor-pointer"
                           >
                              <img src={ad.image} alt={ad.title} className="absolute inset-0 w-full h-full object-cover grayscale-[0.1] transition-all duration-700" />
                              <div className="absolute inset-0 bg-gradient-to-t from-black/100 via-black/20 to-transparent" />
                              
                              {/* Bottom title and Share Dots */}
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

                   {/* 03. Audio Ads Carousel — Multi-card Grid */}
                   <div>
                     <div className="flex items-center justify-between mb-1 px-1">
                       <div className="flex items-center gap-2">
                         <span className="w-[3px] h-3.5 rounded-full bg-orange-500 shrink-0" />
                         <h3 className="text-[9px] font-black text-slate-700 uppercase tracking-[0.2em] leading-none">Audio Ads</h3>
                       </div>
                       <span onClick={() => navigate("/advert/view-ads?tab=audio")} className="text-slate-400 font-bold text-[8px] uppercase tracking-widest whitespace-nowrap cursor-pointer">See All</span>
                     </div>
                     <div className="-mx-5 flex gap-3 overflow-x-auto pb-2 pl-5 pr-5 scrollbar-hide no-scrollbar" style={{ scrollbarWidth: "none" }}>
                        {AUDIO_ADS.map(ad => (
                           <motion.div
                             whileTap={{ scale: 0.96 }}
                             onClick={() => handleMediaClick(ad.image, "audio")}
                             key={ad.id}
                             className="relative flex-shrink-0 w-28 h-40 bg-slate-950 border border-slate-700 overflow-hidden shadow-sm group rounded-xl cursor-pointer"
                           >
                              <img src={ad.image} alt={ad.title} className="absolute inset-0 w-full h-full object-cover opacity-50 mix-blend-luminosity transition-all duration-700" />
                              <div className="absolute inset-0 bg-gradient-to-t from-black via-slate-900/60 to-slate-900/30" />
                              
                              {/* Glassmorphism headphone badge — centred */}
                              <div className="absolute inset-0 flex items-center justify-center">
                                 <div className="w-8 h-8 rounded-full bg-[var(--app-bg)]/15 backdrop-blur-md border border-white/30 ring-1 ring-white/10 flex items-center justify-center shadow-lg transition-transform">
                                    <Headphones primary="#fff" size={14} />
                                 </div>
                              </div>

                              {/* Title + waveform + Share Dots */}
                              <div className="absolute bottom-2 left-2 right-2 flex flex-col gap-1">
                                 <div className="flex justify-between items-start">
                                    <p className="block text-white/95 font-black text-[10px] uppercase tracking-tighter leading-snug drop-shadow-2xl pr-1">{ad.title}</p>
                                    <button 
                                      onClick={(e) => { e.stopPropagation(); setActiveSheet("Options"); }}
                                      className="w-5 h-5 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center text-white shrink-0 active:scale-90 transition-transform -mt-1 -mr-1"
                                    >
                                       <MoreVertical size={12} color="#fff" />
                                    </button>
                                 </div>
                                 <div className="flex items-center gap-1 mt-0.5">
                                    <Volume2 size={10} primary="#fb923c" />
                                    <div className="flex-1 h-[2px] bg-[var(--app-bg)]/20 rounded-full relative overflow-hidden">
                                       <div className="absolute left-0 top-0 bottom-0 w-[38%] bg-orange-500 rounded-full" />
                                    </div>
                                    <div className="text-[5px] font-black text-white/60 ml-0.5">{ad.time}</div>
                                 </div>
                              </div>
                           </motion.div>
                        ))}
                     </div>
                   </div>

                   {/* 04. Full-Width Ad Post — premium card */}
                   <div className="bg-[var(--app-bg)] rounded-2xl overflow-hidden shadow-[0_2px_20px_rgba(0,0,0,0.07)] border border-slate-100 relative">
                      {/* Coloured left-accent bar */}
                      <div className={`absolute left-0 top-0 bottom-0 w-[3px] ${post.avatarBg}`} />

                      {/* Brand header */}
                      <div className="flex items-center justify-between px-4 py-3 pl-5">
                         <div className="flex items-center gap-2.5">
                            <div className={`w-7 h-7 rounded-full ${post.avatarBg} shadow-sm ring-2 ring-white ring-offset-1`} />
                            <div className="flex flex-col">
                               <span className="font-black text-[var(--app-text-slate)] text-[10px] uppercase tracking-widest leading-none">{post.brand}</span>
                               <span className="text-[8px] font-semibold text-slate-400 tracking-wide mt-0.5">Sponsored</span>
                            </div>
                         </div>
                         <button 
                            onClick={(e) => { e.stopPropagation(); setActiveSheet("Options"); }}
                            className="w-7 h-7 flex items-center justify-center rounded-full text-slate-400 active:bg-[var(--app-bg-muted)] transition-all"
                         >
                            <MoreVertical size={16} />
                         </button>
                      </div>
                      
                      {/* Media */}
                      <div
                        onClick={() => handleMediaClick(post.media)}
                        className="w-full aspect-[4/5] relative bg-slate-100 cursor-pointer overflow-hidden active:scale-[0.99] transition-transform"
                      >
                         <img src={post.media} alt={post.brand} className="absolute inset-0 w-full h-full object-cover" />
                         <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                         {post.id % 2 !== 0 && (
                            <div className="absolute inset-0 flex items-center justify-center">
                               <div className="w-14 h-14 rounded-full bg-[var(--app-bg)]/20 backdrop-blur-md border border-white/40 ring-1 ring-white/20 flex items-center justify-center shadow-2xl">
                                  <Play primary="#fff" size={22} />
                               </div>
                            </div>
                         )}
                      </div>
                      
                      {/* Action row */}
                      <div className="flex items-center gap-5 px-5 py-3 border-t border-slate-50 pl-6 relative">
                         <button className="flex items-center gap-1.5 text-slate-700 active:scale-90 transition-all">
                            <Heart size={20} />
                         </button>
                         <button className="flex items-center gap-1.5 text-slate-700 active:scale-90 transition-all">
                            <MessageCircle size={20} />
                         </button>
                         {/* Share button accessed via three dots at bottom right */}
                         <div className="absolute bottom-3 right-4 flex items-center justify-center">
                           <button 
                              onClick={() => setActiveSheet("Options")}
                              className="w-8 h-8 rounded-full bg-[var(--app-bg-muted)] flex items-center justify-center text-slate-500 hover:text-slate-700 active:scale-90 transition-all shadow-sm border border-slate-100"
                           >
                              <MoreVertical size={18} />
                           </button>
                         </div>
                      </div>
                   </div>

                </div>
             ))}
             
             {/* Infinite Scroll Loader */}
             <div className="py-8 flex items-center justify-center">
                 <div className="w-5 h-5 border-[2px] border-slate-300 border-t-orange-500 rounded-full animate-spin" />
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
                  className="fixed bottom-0 left-0 right-0 z-[1010] w-full max-w-md mx-auto bg-[var(--app-bg)] rounded-t-[40px] border-t border-[var(--app-text)]/15 shadow-[0_-20px_60px_rgba(0,51,102,0.12)] overflow-hidden pb-[env(safe-area-inset-bottom)]"
                >
                  <div className="p-6">
                    <div className="flex justify-between items-center mb-8">
                      <h3 className="text-xl font-black text-[var(--app-text-slate)] uppercase tracking-tighter">{activeSheet}</h3>
                      <button onClick={() => setActiveSheet(null)} className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center active:scale-90 transition-all border border-slate-200">
                        <X size={20} className="text-slate-600" />
                      </button>
                    </div>

                    {activeSheet === "Upload" && (
                      <div className="space-y-6">
                        <div className="border-2 border-dashed border-[var(--app-text)]/25 bg-[var(--app-bg-muted)] rounded-[32px] p-10 flex flex-col items-center justify-center text-center shadow-md shadow-[var(--app-text)]/8">
                          <div className="w-20 h-20 bg-[var(--app-bg)] rounded-full flex items-center justify-center shadow-lg shadow-[var(--app-text)]/15 border border-[var(--app-text)]/15 mb-4">
                            <Upload size={32} />
                          </div>
                          <h4 className="font-black text-[var(--app-text-slate)] text-sm mb-1 uppercase tracking-tight">Drag & Drop media</h4>
                          <p className="text-slate-500 text-[10px] uppercase font-black tracking-[0.2em]">or tap to browse files</p>
                        </div>
                        <button className="w-full h-16 bg-[var(--app-shape-accent)] text-white rounded-2xl flex items-center justify-center font-black uppercase tracking-[0.2em] text-xs active:scale-95 transition-all shadow-lg shadow-[var(--app-text)]/25">
                          Choose from Gallery
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
                          ].map(social => (
                            <div key={social.name} className="flex flex-col items-center gap-3 group cursor-pointer active:scale-90 transition-all">
                              <div className={`w-16 h-16 rounded-2xl flex items-center justify-center text-white shadow-md shadow-slate-900/15 ${social.bg} ${social.name==="Email" ? "text-[var(--app-text-slate)]":""}`}>
                                {typeof social.icon === "string" ? <span className="font-black text-2xl">{social.icon}</span> : <social.icon size={28} />}
                              </div>
                              <span className="text-[9px] font-black text-[var(--app-text-slate)] uppercase tracking-widest leading-none">{social.name}</span>
                            </div>
                          ))}
                        </div>
                        <div className="space-y-3">
                          <p className="text-[10px] font-black text-[var(--app-text-slate)] uppercase tracking-widest ml-1">Universal Link</p>
                          <div className="flex h-14 bg-[var(--app-bg-muted)] rounded-2xl border border-[var(--app-text)]/20 shadow-md shadow-[var(--app-text)]/10 p-1.5 focus-within:border-[var(--app-text)]/40 transition-all">
                            <input type="text" readOnly value="https://kleench.com/a/48f9q" className="flex-1 bg-transparent px-4 text-xs font-black text-slate-700 outline-none" />
                            <button className="px-6 bg-[var(--app-shape-accent)] text-white rounded-xl font-black text-[10px] uppercase tracking-widest active:scale-95 transition-all">Copy</button>
                          </div>
                        </div>
                      </div>
                    )}

                    {activeSheet === "Register Agent" && (
                      <div className="space-y-5">
                        <div className="space-y-2">
                          <label className="text-[10px] font-black text-[var(--app-text-slate)] uppercase tracking-widest ml-1">Full Name</label>
                          <input type="text" placeholder="e.g. John Doe" className="w-full h-14 bg-[var(--app-bg)] border border-[var(--app-text)]/20 rounded-2xl px-5 text-sm font-black outline-none shadow-md shadow-[var(--app-text)]/10 focus:border-[var(--app-text)]/40 transition-all" />
                        </div>
                        <div className="space-y-2">
                          <label className="text-[10px] font-black text-[var(--app-text-slate)] uppercase tracking-widest ml-1">Phone Number</label>
                          <input type="tel" placeholder="+260..." className="w-full h-14 bg-[var(--app-bg)] border border-[var(--app-text)]/20 rounded-2xl px-5 text-sm font-black outline-none shadow-md shadow-[var(--app-text)]/10 focus:border-[var(--app-text)]/40 transition-all" />
                        </div>
                        <button onClick={() => { setActiveSheet(null); }} className="w-full h-16 bg-orange-500 text-white rounded-2xl flex items-center justify-center font-black uppercase tracking-[0.2em] text-xs active:scale-95 transition-all shadow-lg shadow-orange-500/25 mt-4">
                          Secure Application
                        </button>
                      </div>
                    )}

                    {activeSheet === "Options" && (
                      <div className="space-y-3">
                         <button 
                           onClick={() => setActiveSheet("Share")}
                           className="w-full h-14 bg-[var(--app-bg-muted)] flex items-center gap-4 px-6 rounded-xl active:scale-95 transition-all text-[var(--app-text-slate)] border border-slate-200 shadow-sm"
                         >
                            <div className="w-8 h-8 rounded-full bg-[var(--app-shape-accent)]/10 flex items-center justify-center">
                               <Send color="var(--app-text)" />
                            </div>
                            <span className="font-black text-[11px] uppercase tracking-widest">Share to peers</span>
                         </button>
                         <button 
                           onClick={() => setActiveSheet(null)}
                           className="w-full h-14 bg-[var(--app-bg-muted)] flex items-center gap-4 px-6 rounded-xl active:scale-95 transition-all text-[var(--app-text-slate)] border border-slate-200 shadow-sm"
                         >
                            <div className="w-8 h-8 rounded-full bg-[var(--app-shape-accent)]/10 flex items-center justify-center">
                               <Bookmark size={16} className="text-[var(--app-text)]" />
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
                   <button onClick={() => setActiveMedia(null)} className="w-10 h-10 bg-[var(--app-bg)]/10 backdrop-blur-md rounded-full flex items-center justify-center text-white border border-white/20 active:scale-90 transition-transform"><X size={20} /></button>
                 </div>
                 
                 <div className="relative w-full aspect-[4/5] bg-[var(--app-text-slate)] border-y border-white/10 flex items-center justify-center overflow-hidden">
                   <img src={activeMedia} alt="Media" className="absolute inset-0 w-full h-full object-cover opacity-60" />
                   
                   <div className="relative z-10 w-20 h-20 rounded-full bg-[var(--app-bg)]/20 backdrop-blur-md border-[2px] border-white flex items-center justify-center shadow-2xl active:scale-90 transition-transform cursor-pointer">
                      <Play primary="#fff" size={32} />
                   </div>
                 </div>

                 <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black via-black/80 to-transparent flex flex-col gap-4 pb-[env(safe-area-inset-bottom)]">
                   <div className="w-full h-1 bg-[var(--app-bg)]/20 rounded-full overflow-hidden">
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
