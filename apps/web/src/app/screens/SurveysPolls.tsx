import { useState } from "react";
import { PageHeader } from "../components/PageHeader";
import { Link } from "react-router";
import { motion } from "motion/react";
import { Plus, BarChart2, PieChart, FileText, Facebook, Instagram, Download, PlaySquare, ChevronRight } from "lucide-react";
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
  { id: "fb", label: "Facebook", icon: Facebook, color: "text-[#1877F2]", barColor: "bg-[#1877F2]", score: 45 },
  { id: "ig", label: "Instagram", icon: Instagram, color: "text-[#E4405F]", barColor: "bg-[#4267B2]", score: 20 },
  { id: "tt", label: "Tiktok", icon: PlaySquare, color: "text-black", barColor: "bg-[#4267B2]", score: 35 }
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
               
               <div className="space-y-3 p-3 pt-0">
                  {SOCIAL_OPTIONS.map((opt) => (
                     <div key={opt.id} onClick={() => setSelectedSocial(opt.id)} className={`flex items-center gap-4 cursor-pointer group rounded-full border-2 p-1.5 transition-colors ${selectedSocial === opt.id ? 'border-[#003366] bg-[#003366]/5' : 'border-gray-200 hover:border-gray-300 bg-white'}`}>
                        <div className="flex items-center gap-3 w-[120px] shrink-0 pl-1">
                           <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0 ${selectedSocial === opt.id ? 'border-[#003366]' : 'border-gray-300'}`}>
                              {selectedSocial === opt.id && <div className="w-2 h-2 rounded-full bg-[#003366]" />}
                           </div>
                           <span className="text-[11px] font-bold text-[#003366]">{opt.label}</span>
                        </div>
                        <div className="flex-1 flex items-center">
                           <div className={`h-4 rounded-full ${opt.barColor} transition-all duration-1000 ease-in-out`} style={{ width: selectedSocial ? `${opt.score}%` : '0%', opacity: selectedSocial ? 1 : 0 }} />
                        </div>
                     </div>
                  ))}
                  
                  {/* Fake x-axis metric */}
                  <div className="flex items-center justify-end pr-2 gap-4 text-[6px] font-bold text-gray-400 mt-2 opacity-60">
                     <span>0</span><span>10</span><span>20</span><span>30</span><span>40</span><span>50</span>
                  </div>
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
                              <span className="text-[11px] font-black text-[#003366] uppercase">{poll.title}</span>
                              <div className="flex flex-col text-[10px] font-bold text-[#003366]/80 leading-none gap-0.5 ml-1">
                                 <span>{poll.option1}</span>
                                 <span>{poll.option2}</span>
                              </div>
                           </div>
                        </div>
                        <div className="flex flex-col gap-1 w-[120px] shrink-0">
                           <div className="flex items-center justify-end gap-2">
                              <div className="w-14 h-3 bg-gray-200 rounded-full overflow-hidden flex justify-end">
                                 <div className={`h-full ${poll.c1}`} style={{ width: `${poll.val1}%` }} />
                              </div>
                              <span className="text-[10px] font-black text-[#003366] w-6 text-right">{poll.val1}%</span>
                           </div>
                           <div className="flex items-center justify-end gap-2">
                              <div className="w-14 h-3 bg-gray-200 rounded-full overflow-hidden flex justify-end">
                                 <div className={`h-full ${poll.c2}`} style={{ width: `${poll.val2}%` }} />
                              </div>
                              <span className="text-[10px] font-black text-[#003366] w-6 text-right">{poll.val2}%</span>
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

            {/* Simulated Data Blocks / Utility Row */}
            <div className="grid grid-cols-4 gap-2 text-center text-[#003366]">
               <div className="flex flex-col items-center gap-2 cursor-pointer group">
                  <div className="w-14 h-14 bg-white rounded-2xl border-[3px] border-[#003366] shadow-[4px_4px_0_#003366] group-active:translate-x-1 group-active:translate-y-1 group-active:shadow-none transition-all flex items-center justify-center text-[#E85D3F]">
                     <PieChart size={24} strokeWidth={2.5} />
                  </div>
                  <span className="text-[8px] font-black uppercase tracking-widest leading-tight mt-1">Survey<br/>Results</span>
               </div>
               <div className="flex flex-col items-center gap-2 cursor-pointer group">
                  <div className="w-14 h-14 bg-white rounded-2xl border-[3px] border-[#003366] shadow-[4px_4px_0_#003366] group-active:translate-x-1 group-active:translate-y-1 group-active:shadow-none transition-all flex items-center justify-center text-[#1877F2]">
                     <BarChart2 size={24} strokeWidth={2.5} />
                  </div>
                  <span className="text-[8px] font-black uppercase tracking-widest leading-tight mt-1">View<br/>Results</span>
               </div>
               <div className="flex flex-col items-center gap-2 cursor-pointer group">
                  <div className="w-14 h-14 bg-white rounded-2xl border-[3px] border-[#003366] shadow-[4px_4px_0_#003366] group-active:translate-x-1 group-active:translate-y-1 group-active:shadow-none transition-all flex items-center justify-center text-[#00C853]">
                     <FileText size={24} strokeWidth={2.5} />
                  </div>
                  <span className="text-[8px] font-black uppercase tracking-widest leading-tight mt-1">Analyze<br/>Feedback</span>
               </div>
               <div className="flex flex-col items-center gap-2 cursor-pointer group">
                  <div className="w-14 h-14 bg-white rounded-2xl border-[3px] border-[#003366] shadow-[4px_4px_0_#003366] group-active:translate-x-1 group-active:translate-y-1 group-active:shadow-none transition-all flex items-center justify-center text-[#FFC300]">
                     <Download size={24} strokeWidth={2.5} />
                  </div>
                  <span className="text-[8px] font-black uppercase tracking-widest leading-tight mt-1">Export<br/>Data</span>
               </div>
            </div>
            
          </section>

        </div>
    </div>
  );
}
