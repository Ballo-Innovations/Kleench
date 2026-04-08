import { 
  ArrowUp, 
  ArrowDown, 
  Eye,
  CloudUpload, 
  Send, 
  Search,
  Circle,
  Clock,
  User,
  UserPlus
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useState } from "react";
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
  const [searchQuery, setSearchQuery] = useState("");
  const [activeMedia, setActiveMedia] = useState<string | null>(null);

  const handleActionClick = (actionName: string) => {
     toast.success(`${actionName} coming soon`, {
        description: `This feature is currently in development.`,
        duration: 2000,
     });
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
        height="auto"
      >
        <div className="relative z-10 w-full mt-3 pb-4">
            <div className="h-[1px] w-full bg-white/20 mb-4" />
            <div className="flex items-center justify-between w-full bg-transparent border-[1.5px] border-white/40 rounded-full px-5 py-2.5">
                <div className="flex flex-col">
                   <span className="text-white/80 text-[9px] font-black uppercase tracking-widest pl-1 mb-0.5">Balance</span>
                   <div className="flex items-center gap-2">
                       <h2 className="text-white text-[18px] sm:text-[20px] font-bold leading-none tracking-tight">ZMW 2,450.00</h2>
                       <Eye size={16} className="text-white/80" strokeWidth={2} />
                   </div>
                </div>
                <div className="flex gap-2 shrink-0">
                  <button onClick={() => handleActionClick("Deposit")} className="w-8 h-8 sm:w-9 sm:h-9 rounded-full border-[1.5px] border-white/60 bg-[#FF8C00]/20 flex items-center justify-center hover:bg-white/20 transition-all active:scale-95">
                     <ArrowUp size={16} className="text-white" strokeWidth={3} />
                  </button>
                  <button onClick={() => handleActionClick("Withdraw")} className="w-8 h-8 sm:w-9 sm:h-9 rounded-full border-[1.5px] border-white/60 bg-[#FF8C00]/20 flex items-center justify-center hover:bg-white/20 transition-all active:scale-95">
                     <ArrowDown size={16} className="text-white" strokeWidth={3} />
                  </button>
                </div>
            </div>
        </div>
      </PageHeader>

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
             <div className="flex items-start justify-between sm:justify-around gap-2 px-2">
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
                   <div className="w-12 h-12 sm:w-14 sm:h-14 bg-white rounded-full flex flex-col items-center justify-center border-[1.5px] border-slate-800 shadow-sm group-active:translate-y-1 group-active:shadow-none transition-all">
                      <btn.icon size={20} className="text-slate-800" strokeWidth={2.2} />
                   </div>
                   <span className="font-bold text-slate-800 text-[10px] sm:text-xs text-center leading-tight whitespace-normal break-words w-20">{btn.label}</span>
                 </motion.button>
               ))}
             </div>
          </section>

          {/* Horizontal Scroll Categories */}
          <section className="space-y-6 pt-2">
            
            {/* Learn & Earn Videos */}
            <div className="w-full">
              <div className="flex justify-between items-end mb-3 px-1">
                 <h3 className="font-black text-slate-900 text-lg sm:text-xl tracking-tight leading-none">Learn & Earn Videos</h3>
                 <span className="text-slate-500 font-bold text-[12px] whitespace-nowrap hover:text-slate-800 transition-colors cursor-pointer">See All ≫</span>
              </div>
              <div className="flex overflow-x-auto scrollbar-hide gap-4 pb-4 px-1">
                 {ROW_1.map(ad => (
                    <div onClick={() => handleMediaClick(ad.image)} key={ad.id} className="relative shrink-0 w-[180px] sm:w-[200px] aspect-[4/3] rounded-2xl overflow-hidden cursor-pointer shadow-lg bg-white border-2 border-slate-800 active:scale-[0.98] transition-transform">
                       <img src={ad.image} alt="Learn Video" className="absolute inset-0 w-full h-full object-cover" />
                    </div>
                 ))}
              </div>
            </div>

            {/* Free Videos (1) */}
            <div className="w-full">
              <div className="flex justify-between items-end mb-3 px-1">
                 <h3 className="font-black text-slate-900 text-lg sm:text-xl tracking-tight leading-none">Free Videos</h3>
                 <span className="text-slate-500 font-bold text-[12px] whitespace-nowrap hover:text-slate-800 transition-colors cursor-pointer">See All ≫</span>
              </div>
              <div className="flex overflow-x-auto scrollbar-hide gap-4 pb-4 px-1">
                 {ROW_2.map(ad => (
                    <div onClick={() => handleMediaClick(ad.image)} key={ad.id} className="relative shrink-0 w-[200px] sm:w-[220px] aspect-[16/10] rounded-2xl overflow-hidden cursor-pointer shadow-lg bg-white border-2 border-slate-800 active:scale-[0.98] transition-transform">
                       <img src={ad.image} alt="Free Video" className="absolute inset-0 w-full h-full object-cover" />
                    </div>
                 ))}
              </div>
            </div>

            {/* Free Videos (2) */}
            <div className="w-full">
              <div className="flex justify-between items-end mb-3 px-1">
                 <h3 className="font-black text-slate-900 text-lg sm:text-xl tracking-tight leading-none">Free Videos</h3>
                 <span className="text-slate-500 font-bold text-[12px] whitespace-nowrap hover:text-slate-800 transition-colors cursor-pointer">See All ≫</span>
              </div>
              <div className="flex overflow-x-auto scrollbar-hide gap-4 pb-4 px-1">
                 {ROW_3.map(ad => (
                    <div onClick={() => handleMediaClick(ad.image)} key={ad.id} className="relative shrink-0 w-[160px] sm:w-[180px] aspect-[4/3] rounded-2xl overflow-hidden cursor-pointer shadow-lg bg-white border-2 border-slate-800 active:scale-[0.98] transition-transform">
                       <img src={ad.image} alt="Free Video" className="absolute inset-0 w-full h-full object-cover" />
                    </div>
                 ))}
              </div>
            </div>

            {/* Pay to Stream Videos */}
            <div className="w-full pb-6">
              <div className="flex justify-between items-end mb-3 px-1">
                 <h3 className="font-black text-slate-900 text-lg sm:text-xl tracking-tight leading-none">Pay to Stream Videos</h3>
                 <span className="text-slate-500 font-bold text-[12px] whitespace-nowrap hover:text-slate-800 transition-colors cursor-pointer">See All ≫</span>
              </div>
              <div className="flex overflow-x-auto scrollbar-hide gap-4 pb-4 px-1">
                 {ROW_4.map(ad => (
                    <div onClick={() => handleMediaClick(ad.image)} key={ad.id} className="relative shrink-0 w-[180px] sm:w-[200px] aspect-[16/10] rounded-2xl overflow-hidden cursor-pointer shadow-lg bg-white border-2 border-slate-800 active:scale-[0.98] transition-transform">
                       <img src={ad.image} alt="Premium Video" className="absolute inset-0 w-full h-full object-cover" />
                    </div>
                 ))}
              </div>
            </div>

          </section>

          {/* Main Feed Area (Infinite Scroll Structure) */}
          <section className="space-y-6 pb-12 mt-8">
             <h3 className="font-black text-slate-900 text-lg sm:text-xl tracking-tight mb-4 px-1">Explore More</h3>
             <div className="flex flex-col gap-6">
                {EXPLORE_MORE_VIDEOS.map((video) => (
                   <div onClick={() => handleMediaClick(video.image)} key={video.id} className="bg-white border-2 border-slate-800 rounded-xl overflow-hidden shadow-md flex flex-col group cursor-pointer active:translate-y-1 transition-transform">
                      <div className="relative w-full aspect-video border-b-2 border-slate-800 bg-gray-100">
                         <img src={video.image} alt={video.title} className="absolute inset-0 w-full h-full object-cover group-hover:opacity-95 transition-opacity" />
                         
                         {/* Duration Pill */}
                         <div className="absolute bottom-2 right-2 bg-slate-800 text-white text-[10px] font-bold px-2 py-1 rounded-md flex items-center gap-1 shadow-sm">
                            <Clock size={10} />
                            {video.duration}
                         </div>
                      </div>
                      
                      <div className="p-4 flex flex-col">
                         <h4 className="font-black text-slate-900 text-[14px] uppercase tracking-tight leading-tight line-clamp-2">{video.title}</h4>
                         <div className="flex items-center justify-between mt-3">
                            <div className="flex items-center gap-1.5 text-slate-600">
                               <User size={12} strokeWidth={2.5} />
                               <span className="text-[11px] font-bold tracking-wide">{video.author}</span>
                            </div>
                            <div className="flex items-center gap-1.5 text-slate-500">
                               <Eye size={12} strokeWidth={2.5} />
                               <span className="text-[11px] font-bold">{video.views}</span>
                            </div>
                         </div>
                      </div>
                   </div>
                ))}
             </div>
             
             {/* Infinite Scroll Loader Placeholder */}
             <div className="pt-8 pb-4 flex items-center justify-center">
                 <div className="w-6 h-6 border-[3px] border-slate-800 border-t-transparent rounded-full animate-spin" />
             </div>
          </section>

          {/* Full Screen Media Modal */}
          <AnimatePresence>
            {activeMedia && (
               <motion.div 
                 initial={{ opacity: 0 }}
                 animate={{ opacity: 1 }}
                 exit={{ opacity: 0 }}
                 onClick={() => setActiveMedia(null)}
                 className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-md flex items-center justify-center p-4 cursor-zoom-out"
               >
                  <motion.div
                     initial={{ scale: 0.9, opacity: 0 }}
                     animate={{ scale: 1, opacity: 1 }}
                     exit={{ scale: 0.9, opacity: 0 }}
                     transition={{ type: "spring", damping: 25, stiffness: 300 }}
                     className="w-full max-w-lg aspect-auto max-h-[85vh] rounded-2xl overflow-hidden border border-white/20 shadow-2xl relative"
                  >
                     <img src={activeMedia} alt="Media View" className="w-full h-full object-contain" />
                  </motion.div>
                  <div className="absolute top-6 right-6 text-white text-[12px] font-bold uppercase tracking-widest bg-white/10 px-3 py-1.5 rounded-full border border-white/20 pointer-events-none">
                     Tap anywhere to close
                  </div>
               </motion.div>
            )}
          </AnimatePresence>

        </div>
      )}
    </div>
  );
}
