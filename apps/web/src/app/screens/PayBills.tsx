import { motion } from "motion/react";
import { Search, Bell, ChevronRight } from "lucide-react";
import { PageHeader } from "../components/PageHeader";

// Logo imports
import zescoLogo from "@/assets/zesco logo.png";
import lusakaWaterLogo from "@/assets/Lusaka Water.png";
import dstvLogo from "@/assets/DSTV logo.png";

const BILLERS = [
  { id: 1, name: "Zesco", logo: zescoLogo },
  { id: 2, name: "Lusaka Water", logo: lusakaWaterLogo },
  { id: 3, name: "TV Payments", logo: dstvLogo },
  { id: 4, name: "Insurance", logo: null }, // Placeholder for Madison
  { id: 5, name: "", logo: null },
  { id: 6, name: "", logo: null },
  { id: 7, name: "", logo: null },
  { id: 8, name: "", logo: null },
  { id: 9, name: "", logo: null },
  { id: 10, name: "", logo: null },
  { id: 11, name: "", logo: null },
  { id: 12, name: "", logo: null },
];

export function PayBills() {
  return (
    <div className="min-h-screen bg-transparent text-[#0D1B2A] font-sans pb-32">
      <PageHeader showBack title="Pay Bills" />

      <div className="px-5 pt-4 space-y-8">
        {/* Search Bar */}
        <div className="bg-[#5D56D8]/10 rounded-2xl shadow-sm border border-[#5D56D8]/20 p-4 flex items-center gap-4">
          <Search size={22} className="text-[#0D1B2A]" />
          <div className="w-[1px] h-6 bg-[#6E7C91]/30" />
          <input 
            type="text" 
            placeholder="Search Bill" 
            className="bg-transparent border-none outline-none text-[13px] font-bold placeholder-[#6E7C91] w-full"
          />
        </div>

        {/* Bill Selection Card */}
        <div className="bg-white rounded-3xl p-6 border-2 border-[#0D1B2A] shadow-[4px_4px_0px_#0D1B2A] space-y-6">
          <h3 className="text-sm font-black uppercase tracking-tight">Choose Bill</h3>
          
          <div className="grid grid-cols-3 gap-4">
            {BILLERS.map((biller) => (
              <motion.button 
                key={biller.id}
                whileTap={{ scale: 0.95 }}
                className="aspect-square rounded-2xl bg-[#5D56D8]/10 shadow-[2px_2px_0px_rgba(93,86,216,0.2)] border border-[#5D56D8]/10 flex flex-col items-center justify-center p-2 gap-2"
              >
                {biller.logo ? (
                  <div className="w-10 h-10 rounded-full overflow-hidden bg-white flex items-center justify-center border border-slate-100 shadow-sm">
                    <img src={biller.logo} alt={biller.name} className="w-full h-full object-contain p-1" />
                  </div>
                ) : (
                  biller.name && (
                    <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center border border-slate-100 shadow-sm">
                       <span className="text-[14px]">🏦</span>
                    </div>
                  )
                )}
                {biller.name && (
                  <span className="text-[9px] font-black text-[#0D1B2A] uppercase tracking-tighter text-center leading-tight">
                    {biller.name}
                  </span>
                )}
              </motion.button>
            ))}
          </div>
        </div>

        {/* Notification Alert */}
        <div className="space-y-4">
          <h3 className="text-sm font-black uppercase tracking-tight ml-1">Notification</h3>
          
          <motion.div 
            whileTap={{ scale: 0.98 }}
            className="bg-white rounded-3xl p-5 border-2 border-[#0D1B2A] shadow-[4px_4px_0px_#0D1B2A] flex items-center gap-4 cursor-pointer"
          >
            <div className="relative">
              <Bell size={24} className="text-[#0D1B2A]" />
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-[#FF4B4B] rounded-full border-2 border-white flex items-center justify-center">
                <span className="text-white text-[8px] font-black">1</span>
              </div>
            </div>
            
            <div className="w-[1px] h-8 bg-[#6E7C91]/30" />
            
            <div className="flex-1">
              <p className="text-[12px] font-bold text-[#0D1B2A] leading-tight flex items-center gap-2">
                You have unpaid Bill for <span className="font-black underline decoration-[#5D56D8]">ZRA</span>
              </p>
            </div>
            
            <ChevronRight size={20} className="text-[#0D1B2A]" />
          </motion.div>
        </div>
      </div>
    </div>
  );
}
