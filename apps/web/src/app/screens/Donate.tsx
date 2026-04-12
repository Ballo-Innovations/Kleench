import React, { useState } from "react";
import { PageHeader } from "../components/PageHeader";
import { Link } from "react-router";
import { Search, ChevronRight, Plus, Users, Link as LinkIcon, Share, ArrowUpToLine, Info, Eye, CheckCircle2, Star } from "lucide-react";
import { motion } from "motion/react";
import { usePageLoading, PageSkeletons } from "../components/PageSkeletons";

// @ts-ignore - Let vite resolve these dynamically from artifacts folder
import schoolChildrenImg from "file:///C:/Users/Situ%20Aj/.gemini/antigravity/brain/46896b33-01f9-423e-b937-ba4bce2cc18c/donate_school_children_1776018860173.png";
import accidentImg from "file:///C:/Users/Situ%20Aj/.gemini/antigravity/brain/46896b33-01f9-423e-b937-ba4bce2cc18c/donate_accident_event_1776018882260.png";
import waterImg from "file:///C:/Users/Situ%20Aj/.gemini/antigravity/brain/46896b33-01f9-423e-b937-ba4bce2cc18c/donate_clean_water_1776018904961.png";

type FallbackImageProps = React.ImgHTMLAttributes<HTMLImageElement>;

const ImageWithFallback = ({ src, alt, className, ...props }: FallbackImageProps) => {
  const [error, setError] = useState(false);
  if (error || !src) {
    return (
      <div className={`bg-gray-200 flex items-center justify-center text-gray-400 ${className}`}>
        <span className="text-[10px] uppercase font-black tracking-widest">Image</span>
      </div>
    );
  }
  return <img src={src} alt={alt} className={className} onError={() => setError(true)} {...props} />;
};

const FILTERS = [
  { label: "Education", count: 20 },
  { label: "Health", count: 9 },
  { label: "Disaster", count: 4 },
  { label: "Scholarships", count: 14 },
  { label: "Others" }
];

const ACTIONS = [
  { label: "CREATE", icon: Plus, color: "text-[#E85D3F]" },
  { label: "DONORS", icon: Users, color: "text-[#003366]" },
  { label: "REFERRAL", icon: LinkIcon, color: "text-[#00C853]" }
];

const PROJECTS = [
  {
    id: 1,
    title: "SUPPORT SCHOOL CHILDREN",
    desc: "PROVIDING BOOKS AND SUPPLIES TO RURAL SCHOOLS IN SOUTHERN PROVINCE MAGOYE AREA",
    image: schoolChildrenImg,
    raised: "56,002.00",
    target: "100,002.00",
    percent: 56,
    date: "30TH MARCH 2026",
    days: "13"
  },
  {
    id: 2,
    title: "EVENT: ACCIDENT VICTIMS",
    desc: "TO RAISE FUNDS FOR A ROAD SHOW EVENT TO HELP SPREAD ROAD SAFETY MEASURES IN ZAMBIA",
    image: accidentImg,
    raised: "5,002.00",
    target: "90,000.00",
    percent: 5,
    date: "24TH MARCH 2026",
    days: "31"
  },
  {
    id: 3,
    title: "CLEAN WATER FOR VILLAGES",
    desc: "BUILDING WELLS AND SAFE WATER SOURCES FOR THE PEOPLE IN MTENDERE",
    image: waterImg,
    raised: "20,002.00",
    target: "100,000.00",
    percent: 20,
    date: "12TH JANUARY 2026",
    days: "5"
  }
];

export function Donate() {
  const loading = usePageLoading(600);

  return (
    <div className="w-full relative min-h-[100dvh] bg-transparent overflow-x-hidden font-sans pb-32">
      
      {/* ── Standardized Header ── */}
      <PageHeader 
        title="DONATE" 
        useLogo
        hideAsk
      />

      {loading ? (
        <div className="px-5 mt-6 space-y-4">
           {/* Replace with actual skeletons later if needed, simple fake skeletons here */}
           <div className="h-12 bg-white rounded-2xl w-full border-[3px] border-gray-200 animate-pulse" />
           <div className="h-24 bg-white rounded-2xl w-full border-[3px] border-gray-200 animate-pulse" />
           <div className="h-48 bg-white rounded-2xl w-full border-[3px] border-gray-200 animate-pulse" />
        </div>
      ) : (
        <div className="relative z-10 w-full mt-6 space-y-6">
          
          {/* Search Bar */}
          <div className="px-5">
             <div className="flex items-center bg-white border-[3px] border-[#003366] rounded-2xl h-[52px] px-3 shadow-[4px_4px_0_#003366]">
                <Search size={22} className="text-[#003366]/40 shrink-0 ml-1" strokeWidth={2.5} />
                <input 
                  type="text" 
                  placeholder="Search Product..." 
                  className="flex-1 bg-transparent border-none outline-none font-bold text-[#003366] placeholder:text-[#003366]/40 text-[14px] px-3 w-full" 
                />
                <div className="h-[28px] w-[2px] bg-gray-200 mx-1 shrink-0" />
                <button className="flex items-center gap-1 text-[#003366] font-black uppercase text-[12px] tracking-widest shrink-0 px-2 active:opacity-50">
                  Categories <ChevronRight size={16} strokeWidth={3} className="text-[#003366]" />
                </button>
             </div>
          </div>

          {/* Pill Filters */}
          <div className="flex gap-2.5 overflow-x-auto no-scrollbar pt-1 -mx-5 px-10 border-b-2 border-transparent" style={{ paddingLeft: '20px', paddingRight: '20px' }}>
             {FILTERS.map((cat, i) => (
                <button 
                  key={cat.label} 
                  className={`h-8 rounded-full border-[2px] border-[#003366]/20 bg-white flex items-center pr-1.5 pl-3 shrink-0 active:scale-95 transition-transform ${i === 0 ? 'border-[#003366] shadow-[2px_2px_0_#003366]' : ''}`}
                >
                   <span className="text-[11px] font-black text-[#003366] uppercase whitespace-nowrap">{cat.label}</span>
                   {cat.count && (
                     <div className="ml-2 w-[18px] h-[18px] rounded-full bg-gray-200 flex items-center justify-center text-[9px] font-black text-[#003366]">
                        {cat.count}
                     </div>
                   )}
                </button>
             ))}
          </div>

          {/* Primary Action Row - Circular High Contrast */}
          <div className="px-5">
             <div className="flex justify-between items-center px-4 pt-2">
                {ACTIONS.map((act) => (
                   <motion.button 
                     key={act.label}
                     whileTap={{ scale: 0.9 }}
                     className="flex flex-col items-center gap-2 group cursor-pointer"
                   >
                      <div className={`w-[60px] h-[60px] rounded-full border-[3px] border-[#003366] bg-white flex items-center justify-center shadow-[4px_4px_0_#003366] group-active:shadow-none group-active:translate-y-1 group-active:translate-x-1 transition-all ${act.color}`}>
                         <act.icon size={26} strokeWidth={2.5} />
                      </div>
                      <span className="text-[10px] font-black tracking-widest text-[#003366] uppercase">{act.label}</span>
                   </motion.button>
                ))}
             </div>
          </div>

          {/* Fundraising Projects Header */}
          <div className="px-5 pb-2">
             <div className="flex items-center justify-between border-[3px] border-[#003366]/20 bg-white px-4 py-3 shadow-[2px_2px_0_#003366]/20 rounded-xl">
                <h2 className="text-[#003366] font-black text-[15px] uppercase tracking-wider drop-shadow-sm">FUNDRAISING PROJECTS</h2>
                <span className="text-[#E85D3F] font-black text-[11px] flex items-center gap-1 cursor-pointer active:scale-95 transition-transform uppercase tracking-widest">
                  See All <div className="bg-[#003366] text-white rounded-full flex items-center justify-center w-4 h-4 ml-0.5"><ChevronRight size={12} strokeWidth={4} /></div>
                </span>
             </div>
          </div>

          {/* Secondary Event Feeds & Cards */}
          <div className="px-5 flex flex-col gap-5 pb-8">
             {PROJECTS.map((proj) => (
                <div key={proj.id} className="w-full bg-[#f4ebe1]/30 border-[3px] border-[#003366] rounded-2xl p-3 shadow-[6px_6px_0_#003366]">
                   {/* Title */}
                   <h3 className="text-[#E85D3F] font-black text-[12px] uppercase tracking-widest mb-2 drop-shadow-sm">{proj.title}</h3>
                   
                   <div className="flex gap-3 mb-4">
                      {/* Left: Event Thumbnail */}
                      <div className="w-[125px] h-[95px] shrink-0 border-[2px] border-[#003366] rounded-xl overflow-hidden shadow-sm bg-white">
                         <ImageWithFallback src={proj.image} alt={proj.title} className="w-full h-full object-cover" />
                      </div>
                      
                      {/* Right: Info & Actions */}
                      <div className="flex flex-col justify-between flex-1 py-0.5">
                         <p className="text-[9px] font-black text-[#003366] leading-[1.3] uppercase break-words pr-1">{proj.desc}</p>
                         <div className="flex items-center gap-2 mt-2">
                            <button className="flex-1 bg-[#ff7345] text-white border-[2px] border-[#003366] shadow-[2px_2px_0_#003366] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none h-8 rounded text-[10px] font-black uppercase flex items-center justify-center gap-1.5 transition-all">
                               <ArrowUpToLine size={12} strokeWidth={3} /> DONATE
                            </button>
                            <button className="flex-1 bg-[#1877F2] text-white border-[2px] border-[#003366] shadow-[2px_2px_0_#003366] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none h-8 rounded text-[10px] font-black uppercase flex items-center justify-center gap-1.5 transition-all">
                               <Share size={12} strokeWidth={3} className="-ml-0.5" /> SHARE
                            </button>
                         </div>
                      </div>
                   </div>

                   {/* Progress Visualizer */}
                   <div className="w-full h-[6px] bg-gray-200 rounded-full mb-3 overflow-hidden flex">
                      <div className="h-full bg-[#00C853]" style={{ width: `${proj.percent}%` }} />
                   </div>

                   {/* Green Metric Pills */}
                   <div className="flex items-center justify-between mb-3">
                      <div className="bg-[#eaf8ed] border-[1.5px] border-[#00C853]/50 px-2 py-0.5 rounded-full flex items-center shadow-sm">
                         <span className="text-[8px] font-black text-[#00C853] uppercase tracking-wider">RAISED K{proj.raised}</span>
                      </div>
                      <div className="bg-[#eaf8ed] border-[1.5px] border-[#00C853]/50 px-2 py-0.5 rounded-full flex items-center shadow-sm">
                         <span className="text-[8px] font-black text-[#00C853] uppercase tracking-wider">TARGET K{proj.target}</span>
                      </div>
                   </div>

                   {/* Footer Metadata */}
                   <div className="flex items-end justify-between border-t-[2px] border-[#003366]/10 pt-2.5">
                      <div className="flex flex-col gap-0.5">
                         <span className="text-[7.5px] font-black text-gray-500 uppercase tracking-widest">DATE OF CREATED : {proj.date}</span>
                         <span className="text-[7.5px] font-black text-gray-500 uppercase tracking-widest">{proj.days} DAYS REMAINING..........</span>
                      </div>
                      
                      <div className="flex items-center gap-1.5 text-[#003366]/60">
                         <div className="flex flex-col items-center group cursor-pointer hover:text-[#003366]">
                            <Info size={14} strokeWidth={2.5} />
                            <span className="text-[5px] font-black uppercase mt-0.5">INFORMATION</span>
                         </div>
                         <div className="flex flex-col items-center group cursor-pointer hover:text-[#00C853]">
                            <CheckCircle2 size={14} strokeWidth={2.5} className="text-[#00C853]" />
                            <span className="text-[5px] font-black uppercase mt-0.5">VERIFICATION</span>
                         </div>
                         <div className="flex flex-col items-center group cursor-pointer">
                            <div className="flex gap-0.5 text-[#FFC300] mb-[2px]">
                               <Star size={7} strokeWidth={3} fill="#FFC300" />
                               <Star size={7} strokeWidth={3} fill="#FFC300" />
                               <Star size={7} strokeWidth={3} fill="#FFC300" />
                               <Star size={7} strokeWidth={3} className="text-gray-300" fill="transparent" />
                            </div>
                            <span className="text-[5px] font-black uppercase text-transparent selection:text-transparent">STARS</span>
                         </div>
                         <div className="flex flex-col items-center group cursor-pointer hover:text-[#003366]">
                            <Eye size={14} strokeWidth={2.5} />
                            <span className="text-[5px] font-black uppercase mt-0.5">KYC</span>
                         </div>
                      </div>
                   </div>
                </div>
             ))}
          </div>
          
        </div>
      )}
    </div>
  );
}
