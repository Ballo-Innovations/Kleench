import { 
  ArrowUp, 
  ArrowDown, 
  Eye,
  CloudUpload, 
  Send, 
  Play,
  Volume2,
  Heart,
  MessageCircle,
  Share,
  MoreHorizontal,
  Gift,
  Headphones
} from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
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
        height="auto"
      >
        <div className="relative z-10 w-full mt-3 pb-4">
            <div className="h-[1px] w-full bg-white/20 mb-4" />
            <div className="flex items-center justify-between w-full bg-white/10 backdrop-blur-sm border border-white/30 rounded-full px-5 py-2.5 shadow-inner">
                <div className="flex flex-col">
                   <span className="text-white/80 text-[8px] font-black uppercase tracking-widest pl-1 mb-0.5">Balance</span>
                   <div className="flex items-center gap-2">
                       <h2 className="text-white text-[18px] sm:text-[20px] font-black leading-none tracking-tight" style={{ fontFamily: "Agrandir, system-ui, sans-serif" }}>ZMW 2,450.00</h2>
                       <Eye size={14} className="text-white/60" strokeWidth={2.5} />
                   </div>
                </div>
                <div className="flex gap-2 shrink-0">
                  <button className="w-8 h-8 sm:w-9 sm:h-9 rounded-full border-[1.5px] border-white bg-[#FF8C00]/20 flex items-center justify-center hover:bg-white/20 transition-all shadow-sm">
                     <ArrowUp size={16} className="text-white" strokeWidth={3} />
                  </button>
                  <button className="w-8 h-8 sm:w-9 sm:h-9 rounded-full border-[1.5px] border-white bg-[#FF8C00]/20 flex items-center justify-center hover:bg-white/20 transition-all shadow-sm">
                     <ArrowDown size={16} className="text-white" strokeWidth={3} />
                  </button>
                </div>
            </div>
        </div>
      </PageHeader>

      {loading ? (
        <PageSkeletons.Generic />
      ) : (
        <div className="px-4 mt-6 relative z-20 space-y-10">

          {/* Top Action Buttons (Upload, Share, Register Agent) - Circular Soft Brutalism */}
          <section className="px-2">
             <div className="flex items-start justify-between sm:justify-around gap-2 px-2">
               {[
                 { id: 'upload', icon: CloudUpload, label: "Upload" },
                 { id: 'share', icon: Send, label: "Share" },
                 { id: 'gift', icon: Gift, label: "Gift" }
               ].map(btn => (
                 <motion.button 
                   key={btn.id}
                   whileTap={{ scale: 0.92 }}
                   className="flex flex-col items-center justify-center gap-3 group outline-none"
                 >
                   <div className="w-[64px] h-[64px] sm:w-[72px] sm:h-[72px] bg-white rounded-full flex flex-col items-center justify-center border-2 border-slate-800 shadow-md group-active:translate-y-1 group-active:shadow-none transition-all">
                      <btn.icon size={26} className="text-slate-800" strokeWidth={2.2} />
                   </div>
                   <span className="font-bold text-slate-800 text-[11px] sm:text-[13px] text-center leading-tight whitespace-normal break-words w-20">{btn.label}</span>
                 </motion.button>
               ))}
             </div>
          </section>

          {/* Horizontal Scroll Categories */}
          <section className="space-y-10">
            
            {/* Video Ads */}
            <div>
              <h3 className="font-black text-slate-900 text-lg sm:text-xl tracking-tight mb-4 px-1">Video Ads</h3>
              <div className="flex overflow-x-auto scrollbar-hide gap-4 pb-4 px-1">
                 {VIDEO_ADS.map(ad => (
                    <div key={ad.id} className="relative shrink-0 w-[160px] h-[160px] rounded-2xl overflow-hidden group cursor-pointer shadow-md bg-white border-2 border-slate-800">
                       <img src={ad.image} alt={ad.title} className="absolute inset-0 w-full h-full object-cover opacity-95" />
                       <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
                       
                       {/* Overlay details */}
                       <div className="absolute inset-0 flex flex-col justify-end p-3 pb-4">
                          <span className="font-black text-white text-[13px] uppercase drop-shadow-md leading-tight text-left">{ad.title}</span>
                       </div>

                       {/* Central Play Icon */}
                       <div className="absolute inset-0 flex items-center justify-center pb-2">
                          <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-md border-[2px] border-white flex items-center justify-center shadow-lg transition-transform group-active:scale-95">
                             <Play fill="white" className="text-white ml-1" size={24} />
                          </div>
                       </div>
                    </div>
                 ))}
              </div>
            </div>

            {/* Picture Ads */}
            <div>
              <h3 className="font-black text-slate-900 text-lg sm:text-xl tracking-tight mb-4 px-1">Picture Ads</h3>
              <div className="flex overflow-x-auto scrollbar-hide gap-4 pb-4 px-1">
                 {PICTURE_ADS.map(ad => (
                    <div key={ad.id} className="relative shrink-0 w-[140px] h-[140px] rounded-2xl overflow-hidden group cursor-pointer shadow-md bg-white border-2 border-slate-800">
                       <img src={ad.image} alt={ad.title} className="absolute inset-0 w-full h-full object-cover opacity-95" />
                       <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                       
                       {/* Overlay details */}
                       <div className="absolute inset-0 flex flex-col justify-end p-4">
                          <span className="font-black text-white text-[14px] uppercase drop-shadow-md leading-tight text-center">{ad.title}</span>
                       </div>
                    </div>
                 ))}
              </div>
            </div>

            {/* Audio Ads */}
            <div>
              <h3 className="font-black text-slate-900 text-lg sm:text-xl tracking-tight mb-4 px-1">Audio Ads</h3>
              <div className="flex overflow-x-auto scrollbar-hide gap-4 pb-6 px-1">
                 {AUDIO_ADS.map(ad => (
                    <div key={ad.id} className="relative shrink-0 w-[140px] h-[140px] rounded-2xl overflow-hidden group cursor-pointer shadow-md bg-white border-2 border-slate-800">
                       <img src={ad.image} alt={ad.title} className="absolute inset-0 w-full h-full object-cover opacity-90 mix-blend-multiply" />
                       <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/80" />
                       
                       <div className="absolute inset-0 flex items-center justify-center pb-2 z-10 pointer-events-none">
                          <div className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border-[2px] border-white flex items-center justify-center shadow-lg pointer-events-auto transition-transform group-active:scale-95">
                             <Headphones className="text-white" size={24} strokeWidth={2.5} />
                          </div>
                       </div>
                       
                       <div className="absolute inset-0 flex flex-col justify-between p-3 z-10 pointer-events-none">
                          <span className="font-black text-white text-[12px] uppercase text-center leading-tight drop-shadow-md mt-1 pointer-events-auto">{ad.title}</span>
                          
                          {/* Audio Player Bar */}
                          <div className="flex items-center gap-1.5 mt-auto w-full px-1 mb-1 pointer-events-auto">
                             <Volume2 size={12} className="text-white shrink-0 drop-shadow-md" />
                             <div className="flex-1 h-[3px] bg-white/30 rounded-full relative">
                                <div className="absolute left-0 top-0 bottom-0 w-[40%] bg-[#FF8C00] rounded-full" />
                                <div className="absolute left-[40%] top-1/2 -translate-y-1/2 w-[7px] h-[7px] bg-white rounded-full translate-x-[-50%] shadow-sm" />
                             </div>
                             <span className="text-[9px] font-black text-white shrink-0 drop-shadow-md">{ad.time}</span>
                          </div>
                       </div>
                    </div>
                 ))}
              </div>
            </div>

          </section>

          {/* Main Feed Area (Infinite Scroll Structure) */}
          <section className="space-y-8 pb-12 mt-10">
             <h3 className="font-black text-slate-900 text-lg sm:text-xl tracking-tight mb-4 px-1">Advert Feed</h3>
             {FEED_POSTS.map(post => (
                <div key={post.id} className="bg-white border-2 border-slate-800 rounded-2xl shadow-lg flex flex-col w-full overflow-hidden relative">
                   {/* Header */}
                   <div className="flex items-center justify-between p-4 border-b-2 border-slate-800 bg-white relative z-10">
                      <div className="flex items-center gap-3">
                         <div className={`w-10 h-10 border-2 border-slate-800 rounded-full ${post.avatarBg}`} />
                         <span className="font-black text-slate-800 text-[13px] sm:text-[14px] uppercase tracking-wide">{post.brand}</span>
                      </div>
                      <button className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-slate-100 transition-all text-slate-800">
                         <MoreHorizontal size={20} className="text-slate-800" />
                      </button>
                   </div>
                   
                   {/* Media Segment with Soft Brutalist Image Block */}
                   <div className={`w-full aspect-square relative bg-white`}>
                      <img src={post.media} alt={post.brand} className="absolute inset-0 w-full h-full object-cover" />
                      {post.id % 2 !== 0 && (
                         <div className="absolute inset-0 flex items-center justify-center bg-black/10 pointer-events-none group cursor-pointer">
                            <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-md border-[2px] border-white flex items-center justify-center shadow-lg transition-transform group-active:scale-95">
                               <Play fill="white" className="text-white ml-1 mt-0.5" size={28} />
                            </div>
                         </div>
                      )}
                   </div>
                   
                   {/* Footer Actions */}
                   <div className="flex items-center gap-4 p-4 border-t-2 border-slate-800 bg-gray-50/50">
                      <button className="flex items-center gap-2 text-slate-800 hover:text-[#EF476F] hover:scale-110 active:scale-95 transition-all font-bold">
                         <Heart size={26} strokeWidth={2} />
                      </button>
                      <button className="flex items-center gap-2 text-slate-800 hover:text-[#0077B6] hover:scale-110 active:scale-95 transition-all font-bold">
                         <MessageCircle size={26} strokeWidth={2} />
                      </button>
                      <button className="flex items-center gap-2 text-slate-800 hover:text-[#06D6A0] hover:scale-110 active:scale-95 transition-all font-bold ml-auto">
                         <Share size={26} strokeWidth={2} />
                      </button>
                   </div>
                </div>
             ))}
             
             {/* Infinite Scroll Loader Placeholder */}
             <div className="py-8 flex items-center justify-center">
                 <div className="w-6 h-6 border-[3px] border-slate-800 border-t-transparent rounded-full animate-spin" />
             </div>
          </section>

        </div>
      )}
    </div>
  );
}
