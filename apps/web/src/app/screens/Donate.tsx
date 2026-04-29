import React, { useState } from "react";
import { PageHeader } from "../components/PageHeader";
import { ChevronRight } from "lucide-react";
import { 
  DuotoneSearch, 
  DuotonePlus, 
  DuotoneUsers, 
  DuotoneSend, 
  DuotoneUpload as DuotoneArrowUpToLine, 
  DuotoneShare, 
  DuotoneInfo, 
  DuotoneCheck as DuotoneCheckCircle2, 
  DuotoneEye, 
  DuotoneStar 
} from "../components/DuotoneIcon";
import { usePageLoading } from "../components/PageSkeletons";
import { toast } from "sonner";
import { useNavigate } from "react-router";

// Relative Asset Mapping for Vercel Pipeline
import schoolChildrenImg from "@/assets/donate_school_children.png";
import accidentImg from "@/assets/donate_accident.png";
import waterImg from "@/assets/donate_clean_water.png";

type FallbackImageProps = React.ImgHTMLAttributes<HTMLImageElement>;

const ImageWithFallback = ({ src, alt, className, ...props }: FallbackImageProps) => {
  const [error, setError] = useState(false);
  if (error || !src) {
    return (
      <div className={`bg-[var(--muted)] flex items-center justify-center text-[var(--muted-foreground)] ${className}`}>
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
  { label: "CREATE", icon: DuotonePlus, color: "text-[#E85D3F]" },
  { label: "DONORS", icon: DuotoneUsers, color: "text-[var(--app-text)]" },
  { label: "REFERRAL", icon: DuotoneSend, color: "text-[#00C853]" }
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
  const navigate = useNavigate();
  const [activeAction, setActiveAction] = useState("CREATE");

  const handleAction = (label: string) => {
    setActiveAction(label);
    if (label === "REFERRAL") navigate("/referral");
    else if (label === "CREATE") toast.info("Campaign creation coming soon.");
    else if (label === "DONORS") toast("Loading donor network...");
  };

  return (
    <div className="w-full relative min-h-[100dvh] bg-transparent overflow-x-hidden font-sans pb-32">
      
      {/* ── Standardized Header ── */}
      <PageHeader 
        title="DONATE" 
        useLogo
      />

      {loading ? (
        <div className="px-5 mt-6 space-y-4">
           {/* Replace with actual skeletons later if needed, simple fake skeletons here */}
           <div className="h-12 bg-[var(--app-bg)] rounded-2xl w-full border-[3px] border-[var(--border)] animate-pulse" />
           <div className="h-24 bg-[var(--app-bg)] rounded-2xl w-full border-[3px] border-[var(--border)] animate-pulse" />
           <div className="h-48 bg-[var(--app-bg)] rounded-2xl w-full border-[3px] border-[var(--border)] animate-pulse" />
        </div>
      ) : (
        <div className="relative z-10 w-full mt-6 space-y-6">
          
          {/* Search Bar */}
          <div className="px-5">
             <div className="flex items-center bg-[var(--app-bg)] border border-[var(--app-text)]/20 rounded-2xl h-[52px] px-3 shadow-md shadow-[var(--app-text)]/10">
                 <DuotoneSearch size={22} primary="var(--app-text)" className="shrink-0 ml-1" />
                <input 
                  type="text" 
                  placeholder="Search Product..." 
                  className="flex-1 bg-transparent border-none outline-none font-bold text-[var(--app-text)] placeholder:text-[var(--app-text)]/40 text-[14px] px-3 w-full" 
                />
                <div className="h-[28px] w-[2px] bg-[var(--muted)] mx-1 shrink-0" />
                <button className="flex items-center gap-1 text-[var(--app-text)] font-black uppercase text-[12px] tracking-widest shrink-0 px-2 active:opacity-50">
                  Categories <ChevronRight size={16} strokeWidth={3} className="text-[var(--app-text)]" />
                </button>
             </div>
          </div>

          {/* Pill Filters */}
          <div className="relative pt-1 border-b-2 border-transparent mb-2 [mask-image:linear-gradient(to_right,black_90%,transparent_100%)] w-full">
             <div className="flex gap-2.5 overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] pb-2 px-5 pointer-events-auto">
                {FILTERS.map((cat, i) => (
                   <button 
                     key={cat.label} 
                     className={`h-8 rounded-full flex items-center pr-1.5 pl-3 shrink-0 active:scale-95 transition-all ${i === 0 ? 'bg-[var(--app-shape-accent)] text-white shadow-[2px_2px_0_var(--app-text)]' : 'bg-[#e2e8f0]/60 text-[var(--app-text)] hover:bg-[var(--muted)]'}`}
                   >
                      <span className={`text-[11px] font-black uppercase whitespace-nowrap ${i === 0 ? 'text-white' : 'text-[var(--app-text)]'}`}>{cat.label}</span>
                      {cat.count && (
                        <div className={`ml-2 w-[18px] h-[18px] rounded-full flex items-center justify-center text-[9px] font-black ${i === 0 ? 'bg-[var(--app-bg)]/20 text-white' : 'bg-[var(--app-bg)] text-[var(--app-text)]'}`}>
                           {cat.count}
                        </div>
                      )}
                   </button>
                ))}
             </div>
          </div>

          {/* Primary Action Row - Segmented Pill Bar */}
          <div className="px-5">
             <div className="flex bg-[var(--app-bg)] border border-[var(--app-text)]/20 rounded-full shadow-md shadow-[var(--app-text)]/10 p-1 mt-2 mb-2">
                {ACTIONS.map((act) => {
                   const isActive = activeAction === act.label;
                   return (
                     <button
                       key={act.label}
                       onClick={() => handleAction(act.label)}
                       className={`flex-1 flex items-center justify-center gap-2 h-[46px] rounded-full transition-all duration-200 ${isActive ? 'bg-[var(--app-shape-accent)] text-white shadow-inner' : 'bg-transparent text-[var(--app-text)] hover:bg-[var(--muted)]'}`}
                     >
                       <act.icon size={18} strokeWidth={isActive ? 3 : 2.5} className={isActive ? 'text-white' : act.color} />
                       <span className="text-[11px] font-black tracking-widest uppercase">{act.label}</span>
                     </button>
                   );
                })}
             </div>
          </div>

          {/* Fundraising Projects Header */}
          <div className="px-5 pb-2">
             <div className="flex items-center justify-between border border-[var(--app-text)]/10 bg-[var(--app-bg)] px-4 py-3 shadow-md shadow-[var(--app-text)]/8 rounded-xl">
                <h2 className="text-[var(--app-text)] font-black text-[15px] uppercase tracking-wider drop-shadow-sm">FUNDRAISING PROJECTS</h2>
                <button onClick={() => toast.success("Loading full catalogue...")} className="text-[#E85D3F] font-black text-[11px] flex items-center gap-1 active:scale-95 transition-transform uppercase tracking-widest">
                  See All <div className="bg-[var(--app-shape-accent)] text-white rounded-full flex items-center justify-center w-4 h-4 ml-0.5"><ChevronRight size={12} strokeWidth={4} /></div>
                </button>
             </div>
          </div>

          {/* Secondary Event Feeds & Cards */}
          <div className="px-5 flex flex-col gap-5 pb-8">
             {PROJECTS.map((proj) => (
                <div key={proj.id} className="w-full bg-[#f4ebe1]/30 border border-[var(--app-text)]/15 rounded-2xl p-3 shadow-lg shadow-[var(--app-text)]/12">
                   {/* Title */}
                   <h3 className="text-[#E85D3F] font-black text-[12px] uppercase tracking-widest mb-2 drop-shadow-sm">{proj.title}</h3>
                   
                   <div className="flex gap-3 mb-4">
                      {/* Left: Event Thumbnail */}
                      <div className="w-[125px] h-[95px] shrink-0 border-[2px] border-[var(--app-text)] rounded-xl overflow-hidden shadow-sm bg-[var(--app-bg)]">
                         <ImageWithFallback src={proj.image} alt={proj.title} className="w-full h-full object-cover" />
                      </div>
                      
                      {/* Right: Info & Actions */}
                      <div className="flex flex-col justify-between flex-1 py-0.5">
                         <p className="text-[9px] font-black text-[var(--app-text)] leading-[1.3] uppercase break-words pr-1">{proj.desc}</p>
                         {/* Main Interaction Action Base */}
                         <div className="flex items-center gap-3 pt-2">
                             <button onClick={() => toast.success("Donation portal secure. Initiating...")} className="flex-1 bg-[#ff7345] text-white shadow-lg shadow-[#ff7345]/25 active:scale-95 h-11 rounded-xl text-[12px] font-black uppercase flex items-center justify-center gap-2 transition-all">
                                <DuotoneArrowUpToLine size={16} primary="#fff" /> DONATE
                             </button>
                             <button onClick={() => toast("Share link copied to clipboard!")} className="flex-1 bg-[#1877F2] text-white shadow-lg shadow-blue-500/25 active:scale-95 h-11 rounded-xl text-[12px] font-black uppercase flex items-center justify-center gap-2 transition-all">
                                <DuotoneShare size={16} primary="#fff" className="-ml-1" /> SHARE
                             </button>
                         </div>
                      </div>
                   </div>

                   {/* Progress Visualizer */}
                   <div className="flex justify-between items-end mb-1 px-1">
                      <span className="text-[10px] font-black text-[var(--app-text)] uppercase tracking-wider">RAISED K{proj.raised}</span>
                      <span className="text-[10px] font-black text-[var(--app-text)] uppercase tracking-wider">TARGET K{proj.target}</span>
                   </div>
                   <div className="w-full h-[22px] border border-[var(--app-text)]/20 rounded-full mb-4 overflow-hidden flex shadow-sm">
                      <div className={`h-full bg-[#E85D3F] flex items-center ${proj.percent <= 15 ? 'justify-start pl-[5px]' : 'justify-center'} border-r-[2px] border-[var(--app-text)]`} style={{ width: `${proj.percent}%` }}>
                         <span className="text-[10px] font-black text-white whitespace-nowrap drop-shadow-md tracking-tighter" style={{ fontSize: proj.percent <= 15 ? '8.5px' : '10px' }}>{proj.percent}%</span>
                      </div>
                      <div className="h-full bg-[var(--muted)] flex items-center justify-center" style={{ width: `${100 - proj.percent}%` }} />
                   </div>

                   {/* Footer Metadata */}
                   <div className="flex items-end justify-between border-t-[2px] border-[var(--app-text)]/10 pt-2.5">
                      <div className="flex flex-col gap-0.5">
                         <span className="text-[7.5px] font-black text-[var(--muted-foreground)] uppercase tracking-widest">DATE OF CREATED : {proj.date}</span>
                         <span className="text-[7.5px] font-black text-[var(--muted-foreground)] uppercase tracking-widest">{proj.days} DAYS REMAINING..........</span>
                      </div>
                      
                      <div className="flex items-center gap-1.5 text-[var(--app-text)]/60">
                         <div className="flex flex-col items-center group cursor-pointer">
                            <DuotoneInfo size={14} />
                            <span className="text-[5px] font-black uppercase mt-0.5">INFORMATION</span>
                         </div>
                         <div className="flex flex-col items-center group cursor-pointer">
                            <DuotoneCheckCircle2 size={14} primary="#00C853" />
                            <span className="text-[5px] font-black uppercase mt-0.5">VERIFICATION</span>
                         </div>
                         <div className="flex flex-col items-center group cursor-pointer">
                            <div className="flex gap-0.5 text-[#FFC300] mb-[2px]">
                               <DuotoneStar size={7} primary="#FFC300" secondaryOpacity={1} />
                               <DuotoneStar size={7} primary="#FFC300" secondaryOpacity={1} />
                               <DuotoneStar size={7} primary="#FFC300" secondaryOpacity={1} />
                               <DuotoneStar size={7} primary="#d1d5db" />
                            </div>
                            <span className="text-[5px] font-black uppercase text-transparent selection:text-transparent">STARS</span>
                         </div>
                         <div className="flex flex-col items-center group cursor-pointer">
                            <DuotoneEye size={14} />
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
