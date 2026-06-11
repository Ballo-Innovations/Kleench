import { PageHeader } from "../components/PageHeader";
import { Search, ChevronRight } from "lucide-react";
import {
  DuotoneInsurance,
  DuotoneIdCard,
  DuotoneSprout,
  DuotoneArrowRight
} from "../components/DuotoneIcon";
import { motion } from "motion/react";
import { toast } from "sonner";
import { useNavigate } from "react-router";

// Import Brand Logos
import pacraLogo from "@/assets/pacra logo.png";
import rtsaLogo from "@/assets/Ratsa logo.png";
import zdaLogo from "@/assets/ZDA logo.png";
import zraLogo from "@/assets/ZRA logo.png";

const ESSENTIAL_SERVICES = [
  { id: "insurance", name: "Insurance", icon: DuotoneInsurance, type: 'icon', route: "/insurance" },
  { id: "road_tax", name: "Road Tax", icon: rtsaLogo, type: 'logo', route: "/road-tax" },
  { id: "vendor", name: "Become a Vendor", icon: DuotoneIdCard, type: 'icon', route: "/vendor" },
  { id: "pacra", name: "Pacra", icon: pacraLogo, type: 'logo', route: null },
  { id: "zra", name: "ZRA", icon: zraLogo, type: 'logo', route: null },
  { id: "microfin", name: "Microfin", icon: DuotoneSprout, type: 'icon', route: null },
  { id: "zda", name: "ZDA", icon: zdaLogo, type: 'logo', route: null },
  { id: "other", name: "Other", icon: DuotoneArrowRight, type: 'icon', route: null },
];

export function OnboardingPage() {
  const navigate = useNavigate();

  const handleServiceTap = (service: typeof ESSENTIAL_SERVICES[0]) => {
    if (service.route) {
      navigate(service.route);
    } else {
      toast.info(`${service.name} services coming soon!`);
    }
  };

  return (
    <div className="w-full relative min-h-[100dvh] bg-transparent font-sans pb-24">
      <PageHeader useLogo />

      <div className="px-5 mt-6 space-y-6">
        {/* 1. Header & Search Architecture */}
        <div className="space-y-4">
          <div className="relative w-full flex items-center bg-[var(--app-bg)] border-[3px] border-[var(--app-text)] rounded-2xl px-4 py-3 shadow-[4px_4px_0_var(--app-text)]">
            <Search size={20} className="text-[var(--app-text)] mr-3" strokeWidth={3} />
            <input
              type="text"
              placeholder="Search services..."
              className="flex-1 bg-transparent outline-none text-sm font-black text-[var(--app-text)] placeholder:text-[var(--app-text)]/30"
            />
            <div className="h-6 w-[2px] bg-[var(--app-shape-accent)]/20 mx-3" />
            <button
              onClick={() => toast.info("Opening categories...")}
              className="flex items-center gap-1 text-[11px] font-black text-[var(--app-text)] uppercase tracking-widest"
            >
              Categories <ChevronRight size={14} className="text-[var(--app-orange)]" strokeWidth={3} />
            </button>
          </div>

          <p className="text-[var(--app-text)]/60 text-[11px] font-black uppercase tracking-[0.1em] leading-relaxed px-1">
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
              onClick={() => handleServiceTap(service)}
              className="bg-[var(--app-bg)] rounded-3xl p-6 flex flex-col items-center justify-center gap-4 border-[3px] border-[var(--app-text)] shadow-[6px_6px_0_var(--app-text)] active:translate-x-1 active:translate-y-1 active:shadow-none transition-all cursor-pointer relative"
            >
              {service.route && (
                <span className="absolute top-2.5 right-2.5 w-2 h-2 rounded-full bg-emerald-400" />
              )}
              <div className="w-16 h-16 flex items-center justify-center">
                {service.type === 'logo' ? (
                  <img
                    src={service.icon as string}
                    alt={service.name}
                    className="w-full h-full object-contain"
                  />
                ) : (
                  <service.icon size={36} />
                )}
              </div>
              <span className="text-[11px] font-black text-[var(--app-text)] uppercase tracking-wider text-center leading-tight">
                {service.name}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
