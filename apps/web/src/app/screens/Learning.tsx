import { useState } from "react";
import { Play, Clock, Star, BookOpen, Eye, ArrowRight, Radio } from "lucide-react";
import { motion } from "motion/react";
import { Link } from "react-router";
import { PageHeader } from "../components/PageHeader";

/* ─── Images (High Fidelity References) ─── */
const REEL_1 = "https://images.unsplash.com/photo-1696013910376-c56f76dd8178?auto=format&fit=crop&w=400&q=80";
const REEL_2 = "https://images.unsplash.com/photo-1745509267945-b25cbb4d50ef?auto=format&fit=crop&w=400&q=80";
const REEL_3 = "https://images.unsplash.com/photo-1768141721979-25c398ebefd5?auto=format&fit=crop&w=400&q=80";
const COURSE_1 = "https://images.unsplash.com/photo-1769596722541-40dedee6789d?auto=format&fit=crop&w=400&q=80";
const COURSE_2 = "https://images.unsplash.com/photo-1762163516269-3c143e04175c?auto=format&fit=crop&w=400&q=80";
const COURSE_3 = "https://images.unsplash.com/photo-1768987439370-bd60d3d0b28b?auto=format&fit=crop&w=400&q=80";

/* ─── Data ─── */
const CATEGORIES = ["All Subjects", "Blockchain", "Digital Marketing", "NFTs", "Security", "E-commerce"];

const REELS = [
  { id: 1, title: "Wallet Security Tips",       views: "12.4K", img: REEL_1 },
  { id: 2, title: "Market Psychology 101",      views: "8.1K",  img: REEL_2 },
  { id: 3, title: "Why Mint on Kleench?",       views: "15.2K", img: REEL_3 },
];

const COURSES = [
  {
    id: 1,
    tag: "MARKETING",
    title: "Social Growth Strategies for Web3 Founders",
    instructor: "Dr. Elias Thorne",
    duration: "12h 45m",
    rating: 4.9,
    img: COURSE_1,
  },
  {
    id: 2,
    tag: "SECURITY",
    title: "The Vault: Advanced Smart Contract Auditing",
    instructor: "Sarah Chen",
    duration: "24h total",
    rating: 5.0,
    img: COURSE_2,
  },
  {
    id: 3,
    tag: "ECOMMERCE",
    title: "Scaling Your Boutique Store with Kleench API",
    instructor: "Marcus Vane",
    duration: "8h 20m",
    rating: 4.7,
    img: COURSE_3,
  },
];

const grace = (delay = 0) => ({
  duration: 0.62,
  delay,
  ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
});

import { PageSkeletons, usePageLoading } from "../components/PageSkeletons";

export function Learning() {
  const loading = usePageLoading(850);
  const [activeCategory, setActiveCategory] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");



  const filteredReels = REELS.filter(r => r.title.toLowerCase().includes(searchQuery.toLowerCase()));
  const filteredCourses = COURSES.filter(c => {
     const matchCategory = activeCategory === 0 || c.tag.toLowerCase() === CATEGORIES[activeCategory].toLowerCase();
     const matchSearch = c.title.toLowerCase().includes(searchQuery.toLowerCase()) || c.instructor.toLowerCase().includes(searchQuery.toLowerCase());
     return matchCategory && matchSearch;
  });

  return (
    <div className="w-full relative min-h-[100dvh] bg-transparent overflow-x-hidden font-sans pb-32">
      {/* ── Standardized Academy Header ── */}
      <PageHeader 
        title="Academy" 
        subtitle="Learn and Earn Assets Today."
        height={90}
        searchValue={searchQuery}
        onSearchChange={setSearchQuery}
      />

      {loading ? (
        <PageSkeletons.Academy />
      ) : (
        <>
      {/* Hero Section: Progress Tracking Ledger */}
      <div className="px-5 mt-4 relative z-20">
        <motion.div
           initial={{ opacity: 0, y: 15 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ delay: 0.1 }}
           className="bg-white border-2 border-[#003366] p-6 shadow-[6px_6px_0px_#003366] relative overflow-hidden group"
        >
           <div className="absolute top-0 left-0 w-1.5 h-full bg-[#FF8C00]" />
           
           <div className="flex items-start justify-between mb-6">
              <div className="flex flex-col gap-1">
                 <span className="text-[#FF8C00] text-[8px] font-black uppercase tracking-[0.3em]">Module In Progress</span>
                 <h2 className="text-[#003366] text-xl font-black uppercase tracking-tight leading-none">Mastering Crypto Basics</h2>
              </div>
              <div className="w-10 h-10 border-2 border-[#003366] flex items-center justify-center text-[#003366]">
                 <BookOpen size={20} />
              </div>
           </div>

           <div className="space-y-3 mb-6">
              <div className="flex justify-between items-end">
                 <span className="text-[10px] font-black text-[#003366]/40 uppercase tracking-widest">65% Absolute Progress</span>
                 <span className="text-[10px] font-black text-[#003366]">CH. 04 / 07</span>
              </div>
              <div className="h-2 w-full bg-[#003366]/5 border border-[#003366]/10">
                 <motion.div 
                    initial={{ width: 0 }} 
                    animate={{ width: "65%" }} 
                    className="h-full bg-[#FF8C00]" 
                 />
              </div>
           </div>

           <Link to="/learning/1">
              <motion.button 
                whileTap={{ scale: 0.97 }}
                className="w-full bg-[#003366] text-white py-4 flex items-center justify-center gap-3 shadow-[4px_4px_0px_#FF8C00] active:shadow-none active:translate-x-[2px] active:translate-y-[2px] transition-all"
              >
                 <span className="text-[11px] font-black uppercase tracking-[0.2em]">Resume Your Journey</span>
                 <ArrowRight size={16} className="text-[#FF8C00]" />
              </motion.button>
           </Link>
        </motion.div>
      </div>

      <div className="px-5 mt-10 relative z-10 space-y-12">
        
        {/* SECTION 01: DISCOVERY REELS */}
        <motion.section initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={grace(0.3)} className="space-y-6">
           <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                 <span className="text-[#FF8C00] font-black text-xs tracking-[0.3em]">01.</span>
                 <h3 className="font-black text-[10px] uppercase tracking-[0.4em] text-[#003366]/40 text-nowrap">Discovery Reels</h3>
              </div>
              <button className="text-[9px] font-black text-[#FF8C00] uppercase tracking-widest border-b border-[#FF8C00]/20 pb-0.5">Explore All</button>
           </div>

           <div className="flex gap-4 overflow-x-auto pb-4 -mx-5 px-5 no-scrollbar scrollbar-hide">
              {filteredReels.map((reel) => (
                <div key={reel.id} className="w-[140px] aspect-[9/16] border-2 border-[#003366] relative overflow-hidden flex-shrink-0 group shadow-[4px_4px_0px_#FF8C00]">
                   <img src={reel.img} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                   <div className="absolute inset-0 bg-gradient-to-t from-[#003366]/90 via-transparent to-transparent opacity-80" />
                   
                   <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="w-10 h-10 bg-white shadow-[3px_3px_0px_#FF8C00] flex items-center justify-center text-[#003366]">
                         <Play size={16} fill="#003366" />
                      </div>
                   </div>

                   <div className="absolute bottom-3 left-3 right-3 space-y-1">
                      <div className="flex items-center gap-1.5 text-white/60">
                         <Eye size={10} />
                         <span className="text-[8px] font-black uppercase tracking-widest">{reel.views} Views</span>
                      </div>
                      <p className="text-white text-[10px] font-black leading-tight uppercase tracking-tight line-clamp-2">{reel.title}</p>
                   </div>
                </div>
              ))}
           </div>
        </motion.section>

        {/* SECTION 02: SKILL HUB */}
        <motion.section initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={grace(0.5)} className="space-y-6">
           <div className="flex items-center gap-3">
              <span className="text-[#FF8C00] font-black text-xs tracking-[0.3em]">02.</span>
              <h3 className="font-black text-[10px] uppercase tracking-[0.4em] text-[#003366]/40">Skill Hub</h3>
              <div className="flex-1 h-[2px] bg-[#003366]/5" />
           </div>

           {/* Category Picker (Integrated) */}
           <div className="flex gap-2 overflow-x-auto pb-2 -mx-5 px-5 no-scrollbar scrollbar-hide">
              {CATEGORIES.map((cat, i) => (
                <button 
                  key={cat} 
                  onClick={() => setActiveCategory(i)}
                  className={`px-4 py-2 border-2 transition-all text-nowrap text-[9px] font-black uppercase tracking-widest ${
                    activeCategory === i 
                    ? "bg-[#003366] border-[#003366] text-white shadow-[3px_3px_0px_#FF8C00]" 
                    : "bg-white border-[#003366]/10 text-[#003366]/40 hover:border-[#003366]/20"
                  }`}
                >
                  {cat}
                </button>
              ))}
           </div>

           <div className="space-y-6">
              {filteredCourses.map((course) => (
                <Link key={course.id} to={`/learning/${course.id}`} className="block group">
                   <div className="bg-white border-2 border-[#003366] flex overflow-hidden shadow-[6px_6px_0px_#003366] group-hover:shadow-[6px_6px_0px_#FF8C00] transition-all active:translate-x-[2px] active:translate-y-[2px] active:shadow-none">
                      <div className="w-24 h-full bg-[#003366]/5 border-r-2 border-[#003366] flex-shrink-0 overflow-hidden">
                         <img src={course.img} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-90 group-hover:opacity-100" />
                      </div>
                      <div className="p-4 flex flex-col justify-between flex-1">
                         <div>
                            <div className="flex items-center justify-between gap-2 mb-2">
                               <span className="text-[#FF8C00] text-[8px] font-black uppercase tracking-[0.2em]">{course.tag}</span>
                               <div className="flex items-center gap-1">
                                  <Star size={10} fill="#FFC300" className="text-[#FFC300]" />
                                  <span className="text-[10px] font-black text-[#003366]">{course.rating}</span>
                               </div>
                            </div>
                            <h4 className="text-[#003366] text-xs font-black uppercase tracking-tight leading-tight group-hover:text-[#FF8C00] transition-colors">{course.title}</h4>
                            <p className="text-[9px] font-bold text-[#003366]/30 uppercase tracking-widest mt-1">Ins. {course.instructor}</p>
                         </div>
                         <div className="flex items-center justify-between mt-4">
                            <div className="flex items-center gap-1.5 text-[#003366]/40">
                               <Clock size={12} />
                               <span className="text-[9px] font-black uppercase tracking-widest">{course.duration}</span>
                            </div>
                            <span className="text-[#FF8C00] text-[10px] font-black uppercase tracking-widest">Enroll →</span>
                         </div>
                      </div>
                   </div>
                </Link>
              ))}
           </div>
        </motion.section>

        {/* SECTION 03: LIVE CLASSES */}
        <motion.section initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={grace(0.7)} className="pb-12">
           <div className="bg-[#003366] p-6 shadow-[8px_8px_0px_#FF8C00] relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-16 -mt-16 blur-xl" />
              <div className="flex items-center justify-between mb-4">
                 <div className="flex items-center gap-3">
                    <span className="text-[#FF8C00] font-black text-xs tracking-[0.3em]">03.</span>
                    <h3 className="font-black text-[10px] uppercase tracking-[0.4em] text-white/40 text-nowrap">Live Events</h3>
                 </div>
                 <Radio size={18} className="text-[#FFC300] animate-pulse" />
              </div>
              <h4 className="text-white text-xl font-black uppercase tracking-tight mb-2">Join Mining Masterclass</h4>
              <p className="text-white/60 text-[10px] font-black uppercase tracking-[0.2em] leading-relaxed mb-6">
                 Real-time mentorship with industry-leading experts in the copper exploration ecosystem.
              </p>
              <button className="w-full bg-white text-[#003366] py-3 text-[11px] font-black uppercase tracking-[0.3em] shadow-[4px_4px_0px_#FF8C00] active:shadow-none transition-all">
                 Join Live Cast
              </button>
           </div>
        </motion.section>

      </div>
      </>
      )}
    </div>
  );
}
