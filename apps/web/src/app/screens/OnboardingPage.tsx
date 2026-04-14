import { PageHeader } from "../components/PageHeader";
import { Search, ChevronRight, ShieldCheck, CreditCard, Sprout, ArrowRight } from "lucide-react";
import { motion } from "motion/react";
import { toast } from "sonner";

// Import Brand Logos
import pacraLogo from "@/assets/pacra logo.png";
import rtsaLogo from "@/assets/Ratsa logo.png";
import zdaLogo from "@/assets/ZDA logo.png";
import zraLogo from "@/assets/ZRA logo.png";

const ESSENTIAL_SERVICES = [
  { id: "insurance", name: "Insurance", icon: ShieldCheck, type: 'icon' },
  { id: "road_tax", name: "Road Tax", icon: rtsaLogo, type: 'logo' },
  { id: "pacra", name: "Pacra", icon: pacraLogo, type: 'logo' },
  { id: "zra", name: "ZRA", icon: zraLogo, type: 'logo' },
  { id: "bank", name: "Open Bank Account", icon: CreditCard, type: 'icon' },
  { id: "microfin", name: "Microfin", icon: Sprout, type: 'icon' },
  { id: "zda", name: "ZDA", icon: zdaLogo, type: 'logo' },
  { id: "other", name: "Other", icon: ArrowRight, type: 'icon' },
];

export function OnboardingPage() {
  return (
    <div className="w-full relative min-h-[100dvh] bg-transparent overflow-x-hidden font-sans pb-32">
      <PageHeader useLogo />
      
      <div className="px-5 mt-6 space-y-6">
        {/* 1. Header & Search Architecture */}
        <div className="space-y-4">
          <div className="relative w-full flex items-center bg-white border-[3px] border-[#003366] rounded-2xl px-4 py-3 shadow-[4px_4px_0_#003366]">
            <Search size={20} className="text-[#003366] mr-3" strokeWidth={3} />
            <input 
              type="text" 
              placeholder="Search Product..." 
              className="flex-1 bg-transparent outline-none text-sm font-black text-[#003366] placeholder:text-[#003366]/30"
            />
            <div className="h-6 w-[2px] bg-[#003366]/20 mx-3" />
            <button 
              onClick={() => toast.info("Opening categories...")}
              className="flex items-center gap-1 text-[11px] font-black text-[#003366] uppercase tracking-widest"
            >
              Categories <ChevronRight size={14} className="text-[#FF8C00]" strokeWidth={3} />
            </button>
          </div>
          
          <p className="text-[#003366]/60 text-[11px] font-black uppercase tracking-[0.1em] leading-relaxed px-1">
            Get onboard with essential services quickly and easily.
          </p>
        </div>

        {/* 2. Services Grid Layout */}
        <div className="grid grid-cols-2 gap-4 pt-2">
          {ESSENTIAL_SERVICES.map((service, i) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              onClick={() => toast.info(`${service.name} services initializing...`)}
              className="bg-white rounded-3xl p-6 flex flex-col items-center justify-center gap-4 border-[3px] border-[#003366] shadow-[6px_6px_0_#003366] active:translate-x-1 active:translate-y-1 active:shadow-none transition-all cursor-pointer"
            >
              <div className="w-16 h-16 flex items-center justify-center">
                {service.type === 'logo' ? (
                  <img 
                    src={service.icon as string} 
                    alt={service.name} 
                    className="w-full h-full object-contain"
                  />
                ) : (
                  <service.icon size={36} className="text-[#FF8C00]" strokeWidth={2.5} />
                )}
              </div>
              <span className="text-[11px] font-black text-[#003366] uppercase tracking-wider text-center leading-tight">
                {service.name}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
