import React, { useState } from "react";
import { PageHeader } from "../components/PageHeader";
import { Search, ChevronRight, TrendingUp, Briefcase, History, LineChart, BadgeCheck } from "lucide-react";
import { motion } from "motion/react";
import { usePageLoading } from "../components/PageSkeletons";

// Loading constraints
import solarFarmImg from "file:///C:/Users/Situ%20Aj/.gemini/antigravity/brain/46896b33-01f9-423e-b937-ba4bce2cc18c/crowdfund_solar_farm_1776020846856.png";
import poultryImg from "file:///C:/Users/Situ%20Aj/.gemini/antigravity/brain/46896b33-01f9-423e-b937-ba4bce2cc18c/crowdfund_poultry_automation_1776020866807.png";
import realEstateImg from "file:///C:/Users/Situ%20Aj/.gemini/antigravity/brain/46896b33-01f9-423e-b937-ba4bce2cc18c/crowdfund_real_estate_1776020884723.png";

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
  { label: "Energy", count: 12 },
  { label: "Agriculture", count: 8 },
  { label: "Real Estate", count: 5 },
  { label: "Tech", count: 18 },
  { label: "Retail" }
];

const ACTIONS = [
  { label: "INVEST", icon: TrendingUp, color: "text-[#E85D3F]" },
  { label: "PORTFOLIO", icon: Briefcase, color: "text-[#003366]" },
  { label: "RETURNS", icon: History, color: "text-[#00C853]" }
];

const PROJECTS = [
  {
    id: 1,
    title: "SOLAR FARM EXPANSION - LUSAKA",
    desc: "SCALING UP RENEWABLE ENERGY INFRASTRUCTURE TO POWER 50,000 HOMES IN PERI-URBAN LUSAKA.",
    image: solarFarmImg,
    category: "Energy",
    minInvestment: "5,000.00",
    target: "500,000.00",
    funded: "120,000.00",
    roi: "15% Annually",
    percent: 24
  },
  {
    id: 2,
    title: "AGRI-TECH POULTRY AUTOMATION",
    desc: "MODERNIZING POULTRY FARMING WITH SMART SENSORS AND AUTOMATED FEEDING SYSTEMS.",
    image: poultryImg,
    category: "Agriculture",
    minInvestment: "2,500.00",
    target: "250,000.00",
    funded: "105,000.00",
    roi: "18% Annually",
    percent: 42
  },
  {
    id: 3,
    title: "RESIDENTIAL REAL ESTATE FUND",
    desc: "CONSTRUCTING MODERN, AFFORDABLE HOUSING COMPLEXES FOR MIDDLE-INCOME FAMILIES.",
    image: realEstateImg,
    category: "Real Estate",
    minInvestment: "10,000.00",
    target: "1,500,000.00",
    funded: "1,275,000.00",
    roi: "12% Annually",
    percent: 85
  }
];

export function Crowdfunding() {
  const loading = usePageLoading(600);

  return (
    <div className="w-full relative min-h-[100dvh] bg-transparent overflow-x-hidden font-sans pb-32">
      
      {/* ── Standardized Header ── */}
      <PageHeader 
        title="CROWDFUND" 
        useLogo
      />

      {loading ? (
        <div className="px-5 mt-6 space-y-4">
           <div className="h-12 bg-white rounded-2xl w-full border-[3px] border-gray-200 animate-pulse" />
           <div className="h-24 bg-white rounded-2xl w-full border-[3px] border-gray-200 animate-pulse" />
           <div className="h-64 bg-white rounded-2xl w-full border-[3px] border-gray-200 animate-pulse" />
        </div>
      ) : (
        <div className="relative z-10 w-full mt-6 space-y-6">
          
          {/* Search Bar */}
          <div className="px-5">
             <div className="flex items-center bg-white border-[3px] border-[#003366] rounded-2xl h-[52px] px-3 shadow-[4px_4px_0_#003366]">
                <Search size={22} className="text-[#003366]/40 shrink-0 ml-1" strokeWidth={2.5} />
                <input 
                  type="text" 
                  placeholder="Search Opportunities..." 
                  className="flex-1 bg-transparent border-none outline-none font-bold text-[#003366] placeholder:text-[#003366]/40 text-[14px] px-3 w-full" 
                />
                <div className="h-[28px] w-[2px] bg-gray-200 mx-1 shrink-0" />
                <button className="flex items-center gap-1 text-[#003366] font-black uppercase text-[12px] tracking-widest shrink-0 px-2 active:opacity-50">
                  Filters <ChevronRight size={16} strokeWidth={3} className="text-[#003366]" />
                </button>
             </div>
          </div>

          {/* Pill Filters */}
          <div className="flex gap-2.5 overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] pt-1 -mx-5 px-10 border-b-2 border-transparent" style={{ paddingLeft: '20px', paddingRight: '20px' }}>
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

          {/* Investment Projects Header */}
          <div className="px-5 pb-2">
             <div className="flex items-center justify-between border-[3px] border-[#003366]/20 bg-white px-4 py-3 shadow-[2px_2px_0_#003366]/20 rounded-xl">
                <h2 className="text-[#003366] font-black text-[15px] uppercase tracking-wider drop-shadow-sm">INVESTMENT DEALS</h2>
                <span className="text-[#E85D3F] font-black text-[11px] flex items-center gap-1 cursor-pointer active:scale-95 transition-transform uppercase tracking-widest">
                  See All <div className="bg-[#003366] text-white rounded-full flex items-center justify-center w-4 h-4 ml-0.5"><ChevronRight size={12} strokeWidth={4} /></div>
                </span>
             </div>
          </div>

          {/* Crowdfunding Property Cards */}
          <div className="px-5 flex flex-col gap-5 pb-8">
             {PROJECTS.map((proj) => (
                <div key={proj.id} className="w-full bg-[#f4ebe1]/40 border-[3px] border-[#003366] rounded-[24px] p-3 shadow-[6px_6px_0_#003366] relative z-0 overflow-hidden">
                   
                   {/* Header Tag - Verified Business Badge */}
                   <div className="absolute top-5 right-5 z-20 flex items-center gap-1 bg-[#00C853] border-[2px] border-[#003366] text-white px-2 py-1 rounded-full shadow-[6px_6px_0_#003366]">
                      <BadgeCheck size={12} strokeWidth={3} />
                      <span className="text-[8.5px] font-black uppercase tracking-widest">VERIFIED BUSINESS</span>
                   </div>

                   {/* Title */}
                   <h3 className="text-[#E85D3F] font-black text-[13px] uppercase tracking-widest mb-2 pl-1 drop-shadow-sm pr-32 leading-[1.1] pt-1">{proj.title}</h3>
                   
                   {/* Full Width Image Container */}
                   <div className="w-full h-[190px] relative rounded-[14px] border-[3px] border-[#003366] overflow-hidden mb-3 bg-white shadow-inner">
                      <ImageWithFallback src={proj.image} alt={proj.title} className="w-full h-full object-cover" />
                      
                      {/* Inner Category Pill */}
                      <div className="absolute bottom-3 left-3 bg-white/80 backdrop-blur-md border-[2px] border-[#003366] px-2.5 py-1 rounded-full flex items-center shadow-sm">
                         <span className="text-[9px] font-black text-[#003366] uppercase tracking-widest">{proj.category}</span>
                      </div>
                   </div>
                      
                   {/* Context & Description */}
                   <p className="text-[10px] font-black text-[#003366] leading-[1.3] uppercase mb-4 px-1">{proj.desc}</p>

                   {/* Key Metrics Grid */}
                   <div className="grid grid-cols-3 gap-2 mb-4">
                      <div className="bg-white border-[2.5px] border-[#003366] rounded-xl p-2 flex flex-col items-center justify-center text-center shadow-[2px_2px_0_#003366]">
                         <span className="text-[8px] font-black text-[#003366] uppercase tracking-widest mb-0.5">MIN. INVEST</span>
                         <span className="text-[10px] font-black text-[#003366] tracking-tighter">K{proj.minInvestment}</span>
                      </div>
                      <div className="bg-white border-[2.5px] border-[#003366] rounded-xl p-2 flex flex-col items-center justify-center text-center shadow-[2px_2px_0_#003366]">
                         <span className="text-[8px] font-black text-[#003366] uppercase tracking-widest mb-0.5">EST. ROI</span>
                         <span className="text-[10px] font-black text-[#00C853] tracking-tighter">{proj.roi}</span>
                      </div>
                      <div className="bg-white border-[2.5px] border-[#003366] rounded-xl p-2 flex flex-col items-center justify-center text-center shadow-[2px_2px_0_#003366]">
                         <span className="text-[8px] font-black text-[#003366] uppercase tracking-widest mb-0.5">TARGET</span>
                         <span className="text-[10px] font-black text-[#003366] tracking-tighter">K{proj.target}</span>
                      </div>
                   </div>

                   {/* Segmented Dual Tone Progress */}
                   <div className="flex justify-between items-end mb-1 px-1">
                      <span className="text-[10px] font-black text-[#E85D3F] uppercase tracking-wider">FUNDED K{proj.funded}</span>
                      <span className="text-[10px] font-black text-[#003366] uppercase tracking-wider">AVAILABLE EQUITY</span>
                   </div>
                   <div className="w-full h-[24px] border-[2px] border-[#003366] rounded-full mb-2 overflow-hidden flex shadow-[2px_2px_0_#003366]">
                      <div className={`h-full bg-[#E85D3F] flex items-center ${proj.percent <= 15 ? 'justify-start pl-[5px]' : 'justify-center'} border-r-[2px] border-[#003366]`} style={{ width: `${proj.percent}%` }}>
                         <span className="text-[10px] font-black text-white whitespace-nowrap drop-shadow-md tracking-tighter" style={{ fontSize: proj.percent <= 15 ? '8.5px' : '10px' }}>{proj.percent}%</span>
                      </div>
                      <div className="h-full bg-gray-200 flex items-center justify-center" style={{ width: `${100 - proj.percent}%` }} />
                   </div>

                   {/* Main Interaction Action Base */}
                   <div className="flex items-center gap-3 pt-2">
                      <button className="flex-1 bg-[#1877F2] text-white border-[3px] border-[#003366] shadow-[3px_3px_0_#003366] hover:brightness-110 active:translate-x-0.5 active:translate-y-0.5 active:shadow-none h-11 rounded-xl text-[12px] font-black uppercase flex items-center justify-center gap-2 transition-all group">
                         <LineChart size={16} strokeWidth={3} className="-ml-1 group-active:scale-110 transition-transform" /> VIEW PROSPECTUS
                      </button>
                      <button className="flex-1 bg-[#ff7345] text-white border-[3px] border-[#003366] shadow-[3px_3px_0_#003366] hover:brightness-110 active:translate-x-0.5 active:translate-y-0.5 active:shadow-none h-11 rounded-xl text-[12px] font-black uppercase flex items-center justify-center gap-2 transition-all group">
                         <TrendingUp size={16} strokeWidth={3} className="group-active:scale-110 transition-transform" /> INVEST NOW
                      </button>
                   </div>
                </div>
             ))}
          </div>
          
        </div>
      )}
    </div>
  );
}
