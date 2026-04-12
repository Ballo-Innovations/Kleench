import { useState } from "react";
import { PageHeader } from "../components/PageHeader";
import { Link } from "react-router";
import { motion } from "motion/react";
import { Plus, BarChart2, FileText, ChevronRight } from "lucide-react";
import { usePageLoading, PageSkeletons } from "../components/PageSkeletons";

import eczLogo from "@/assets/ecz logo.png";
import lazLogo from "@/assets/Laz Logo.jpeg";
import fazLogo from "@/assets/faz logo.png";
import ictazLogo from "@/assets/ictaz logo.jpeg";

const ACTIVE_SURVEYS = [
  { id: 1, title: "Customer Satisfaction Survey : Pick & Pay", percent: 37, color: "bg-green-500", logo: null },
  { id: 2, title: "ICT Usage : ICTAZ", percent: 64, color: "bg-[#00C853]", logo: ictazLogo },
  { id: 3, title: "Heath Breast Cancer :", percent: 19, color: "bg-[#00C853]", logo: null }
];

const SOCIAL_OPTIONS = [
  { id: "fb", label: "Facebook", bg: "bg-[#1877F2]", text: "text-white" },
  { id: "ig", label: "Instagram", bg: "bg-[#E4405F]", text: "text-white" },
  { id: "tt", label: "TikTok", bg: "bg-black", text: "text-white" }
];

const ACTIVE_POLLS = [
  { id: 1, title: "ECZ :", option1: "UNZA", option2: "Other", val1: 72, val2: 28, c1: "bg-[#E85D3F]", c2: "bg-[#00C853]", logo: eczLogo },
  { id: 2, title: "LAZ :", option1: "Charles", option2: "Mwansa", val1: 45, val2: 55, c1: "bg-[#1877F2]", c2: "bg-black", logo: lazLogo },
  { id: 3, title: "FAZ :", option1: "Thomas", option2: "Peter", val1: 10, val2: 90, c1: "bg-gray-300", c2: "bg-[#E85D3F]", logo: fazLogo }
];

export function SurveysPolls() {
  const isLoading = usePageLoading();
  const [selectedSocial, setSelectedSocial] = useState<string | null>(null);

  if (isLoading) {
    return <PageSkeletons.Social />;
  }

  return (
    <div className="w-full relative min-h-[100dvh] bg-transparent overflow-x-hidden font-sans pb-28">
      
      {/* Sticky Header with global balance HUD */}
      <div className="sticky top-0 z-50">
        <PageHeader title="SURVEYS & POLLS" />
      </div>

      <div className="w-full relative z-10">
          {/* Quick Action Bar */}
          <div className="px-5 py-4 border-b-[3px] border-[#E85D3F]">
            <div className="flex gap-4">
              <Link to="/poll/create" className="flex-1">
                <motion.button 
                  whileTap={{ scale: 0.95 }}
                  className="w-full h-[60px] rounded-xl border-[3px] border-[#E85D3F] bg-[#E85D3F] text-white flex items-center justify-center gap-2 shadow-[4px_4px_0_#003366] active:translate-x-1 active:translate-y-1 active:shadow-none transition-all"
                >
                  <div className="w-6 h-6 rounded-full border-2 border-white flex items-center justify-center">
                    <Plus size={16} strokeWidth={3} />
                  </div>
                  <span className="font-black tracking-wider uppercase text-[12px]">Survey</span>
                </motion.button>
              </Link>
              <Link to="/poll/create" className="flex-1">
                 <motion.button 
                  whileTap={{ scale: 0.95 }}
                  className="w-full h-[60px] rounded-xl border-[3px] border-[#E85D3F] bg-[#E85D3F] text-white flex items-center justify-center gap-2 shadow-[4px_4px_0_#003366] active:translate-x-1 active:translate-y-1 active:shadow-none transition-all"
                >
                  <div className="w-6 h-6 rounded-full border-2 border-white flex items-center justify-center">
                    <Plus size={16} strokeWidth={3} />
                  </div>
                  <span className="font-black tracking-wider uppercase text-[12px]">Poll</span>
                </motion.button>
              </Link>
            </div>
          </div>

          {/* Active Survey Section */}
          <section className="px-5 py-5 border-b-[3px] border-gray-200">
            <h3 className="text-[#003366] font-black tracking-[0.2em] text-[16px] mb-4 uppercase drop-shadow-sm">Active Survey</h3>
            <div className="bg-white rounded-2xl border-[3px] border-[#003366] shadow-[6px_6px_0_#FF8C00] p-4 mb-6">
               {ACTIVE_SURVEYS.map((survey, i) => (
                  <div key={survey.id} className="mb-4 last:mb-0 relative py-1">
                     <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2 max-w-[70%]">
                           <div className="w-6 h-6 text-[#003366]/40 shrink-0 flex items-center justify-center overflow-hidden">
                              {survey.logo ? (
                                <img src={survey.logo} alt="" className="w-full h-full object-contain mix-blend-multiply" />
                              ) : (
                                <FileText size={16} />
                              )}
                           </div>
                           <p className="text-[11px] font-black text-[#003366] leading-tight break-words">{survey.title}</p>
                        </div>
                        <div className="flex items-center gap-3 shrink-0">
                           <div className="w-16 h-4 bg-gray-200 rounded-full overflow-hidden flex">
                              <div className={`h-full ${survey.color}`} style={{ width: `${survey.percent}%` }} />
                           </div>
                           <span className="text-[12px] font-black text-[#003366] w-8 text-right">{survey.percent}%</span>
                        </div>
                     </div>
                     {i !== ACTIVE_SURVEYS.length - 1 && <div className="border-b border-gray-100 w-full mt-3" />}
                  </div>
               ))}
            </div>

            {/* Interactive Element */}
            <div className="bg-white rounded-2xl border-[3px] border-[#003366] shadow-[6px_6px_0_#FF8C00] p-2">
               <div className="inline-block bg-[#E85D3F] text-white px-4 py-1.5 rounded-full font-black text-[12px] uppercase border-[3px] border-[#003366] shadow-[2px_2px_0_#003366] -ml-2 mb-4 z-10 relative">
                  Favorite Social Media Platform?
               </div>
               
               <div className="flex flex-wrap gap-2 p-3 pt-0">
                  {SOCIAL_OPTIONS.map((opt) => (
                     <button 
                        key={opt.id} 
                        onClick={() => setSelectedSocial(opt.id)} 
                        className={`flex items-center justify-center px-5 py-2.5 rounded-full border-[3px] border-[#003366] font-black text-[12px] uppercase shadow-[2px_2px_0_#003366] active:shadow-none active:translate-x-0.5 active:translate-y-0.5 transition-all ${selectedSocial === opt.id ? opt.bg + ' ' + opt.text : 'bg-white text-[#003366]'}`}
                     >
                        {opt.label}
                     </button>
                  ))}
               </div>
            </div>
          </section>

          {/* Active Poll Section */}
          <section className="px-5 py-8 border-b-[3px] border-[#003366] bg-gray-50/50">
            <h3 className="text-[#003366] font-black tracking-[0.2em] text-[16px] mb-4 uppercase drop-shadow-sm">Active Poll</h3>
            
            <div className="bg-white rounded-2xl border-[3px] border-[#003366] shadow-[6px_6px_0_#00C853] p-4">
               {ACTIVE_POLLS.map((poll, i) => (
                  <div key={poll.id} className="mb-4 last:mb-0 relative">
                     <div className="flex items-center justify-between mb-2">
                        <div className="flex flex-col gap-1 w-[140px] shrink-0">
                           <div className="flex items-center gap-2">
                              {poll.logo && (
                                <div className="w-5 h-5 shrink-0 overflow-hidden flex items-center justify-center">
                                  <img src={poll.logo} alt={poll.title} className="w-full h-full object-contain mix-blend-multiply" />
                                </div>
                              )}
                              <span className="text-[10px] font-bold text-[#003366]/50 uppercase tracking-widest leading-none">{poll.title}</span>
                              <div className="flex flex-col text-[12px] font-black text-[#003366] leading-tight gap-0.5 max-w-[85px] truncate">
                                 <span className="truncate">{poll.option1}</span>
                                 <span className="truncate">{poll.option2}</span>
                              </div>
                           </div>
                        </div>
                        <div className="flex flex-col w-[120px] shrink-0 justify-center">
                           <div className="w-full h-[22px] border-[2px] border-[#003366] rounded-full flex overflow-hidden shadow-sm">
                              <div className={`h-full flex items-center justify-start pl-2 ${poll.c1}`} style={{ width: `${poll.val1}%` }}>
                                 <span className="text-[10px] font-black text-white whitespace-nowrap">{poll.val1}%</span>
                              </div>
                              <div className={`h-full flex items-center justify-end pr-2 ${poll.c2}`} style={{ width: `${poll.val2}%` }}>
                                 <span className="text-[10px] font-black text-white whitespace-nowrap">{poll.val2}%</span>
                              </div>
                           </div>
                        </div>
                     </div>
                     {i !== ACTIVE_POLLS.length - 1 && <div className="border-b border-gray-100 w-full mt-3" />}
                  </div>
               ))}
               
               <div className="mt-4 pt-3 border-t border-gray-200 flex justify-center">
                  <span className="text-[11px] font-black text-[#FF8C00] uppercase tracking-widest cursor-pointer active:scale-95 transition-transform flex items-center gap-1">
                     View Results & Analytics <ChevronRight size={14} strokeWidth={3} />
                  </span>
               </div>
            </div>
          </section>

          {/* Survey & Poll Analytics header */}
          <section className="px-5 py-6">
            <div className="grid grid-cols-2 gap-4 mb-6">
               <h4 className="text-[#FF8C00] font-black text-[14px] text-center uppercase tracking-wide">Survey Analytics</h4>
               <h4 className="text-[#FF8C00] font-black text-[14px] text-center uppercase tracking-wide">Polls Analytics</h4>
            </div>

            {/* Neo-brutalist interaction bar */}
            <div className="flex w-full bg-[#E0F2FE] border-[3px] border-[#003366] rounded-2xl items-stretch h-[54px] z-20 relative shadow-[4px_4px_0_rgba(0,51,102,1)] overflow-hidden">
               <button className="flex-1 flex items-center justify-center gap-2 border-r-[3px] border-[#003366] text-[#003366] active:bg-[#003366]/10 transition-colors">
                  <BarChart2 size={18} strokeWidth={3} />
                  <span className="text-[13px] font-black uppercase tracking-widest mt-[2px]">View Results</span>
               </button>
               <button className="flex-1 flex items-center justify-center gap-2 text-[#003366] active:bg-[#003366]/10 transition-colors">
                  <FileText size={18} strokeWidth={3} />
                  <span className="text-[13px] font-black uppercase tracking-widest mt-[2px]">Analyze</span>
               </button>
            </div>
            
          </section>

        </div>
    </div>
  );
}
