import { motion } from "motion/react";
import { Search, Bell, ChevronRight } from "lucide-react";
import { PageHeader } from "../components/PageHeader";
import { toast } from "sonner";

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
    <div className="min-h-screen bg-[var(--app-bg)] text-[var(--color-secondary)] font-sans pb-32">
      <PageHeader showBack title="Pay Bills" />

      <div className="px-5 pt-4 space-y-8">
        {/* Search Bar */}
        <div className="bg-[var(--color-secondary)]/5 rounded-2xl shadow-sm border border-[var(--border)] p-4 flex items-center gap-4">
          <Search size={22} className="text-[var(--color-secondary)]/40" />
          <div className="w-[1px] h-6 bg-[var(--border)]" />
          <input 
            type="text" 
            placeholder="Search Bill" 
            className="bg-transparent border-none outline-none text-[13px] font-black placeholder-[var(--color-secondary)]/30 w-full uppercase tracking-widest"
          />
        </div>

        {/* Bill Selection Card */}
        <div className="bg-[var(--app-bg)] rounded-[32px] p-6 border border-[var(--border)] shadow-md space-y-6">
          <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-[var(--color-secondary)]/60">Choose Bill</h3>
          
          <div className="grid grid-cols-3 gap-4">
            {BILLERS.map((biller) => (
              <motion.button 
                key={biller.id}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  if (biller.name) {
                    toast.info(`Payment for ${biller.name} is coming soon!`);
                  }
                }}
                className="aspect-square rounded-2xl bg-[var(--color-secondary)]/5 shadow-sm border border-[var(--border)] flex flex-col items-center justify-center p-2 gap-2 active:bg-[var(--color-secondary)]/10 transition-colors"
              >
                {biller.logo ? (
                  <div className="w-10 h-10 rounded-full overflow-hidden bg-white flex items-center justify-center border border-[var(--border)] shadow-sm">
                    <img src={biller.logo} alt={biller.name} className="w-full h-full object-contain p-1" />
                  </div>
                ) : (
                  biller.name && (
                    <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center border border-[var(--border)] shadow-sm">
                       <span className="text-[14px]">🏦</span>
                    </div>
                  )
                )}
                {biller.name && (
                  <span className="text-[9px] font-black text-[var(--color-secondary)] uppercase tracking-widest text-center leading-tight">
                    {biller.name}
                  </span>
                )}
              </motion.button>
            ))}
          </div>
        </div>

        {/* Notification Alert */}
        <div className="space-y-4">
          <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-[var(--color-secondary)]/60 ml-1">Notification</h3>
          
          <motion.div 
            whileTap={{ scale: 0.98 }}
            onClick={() => toast.info("Redirecting to ZRA PayPortal...")}
            className="bg-[var(--app-bg)] rounded-[32px] p-5 border border-[var(--border)] shadow-md flex items-center gap-4 cursor-pointer active:shadow-sm transition-all"
          >
            <div className="relative">
              <Bell size={24} className="text-[var(--color-primary)]" />
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full border-2 border-[var(--app-bg)] flex items-center justify-center">
                <span className="text-white text-[8px] font-black">1</span>
              </div>
            </div>
            
            <div className="w-[1px] h-8 bg-[var(--border)]" />
            
            <div className="flex-1">
              <p className="text-[12px] font-bold text-[var(--color-secondary)] leading-tight flex items-center gap-2">
                You have unpaid Bill for <span className="font-black underline decoration-[var(--color-primary)]">ZRA</span>
              </p>
            </div>
            
            <ChevronRight size={20} className="text-[var(--color-secondary)]/40" />
          </motion.div>
        </div>
      </div>
    </div>
  );
}
