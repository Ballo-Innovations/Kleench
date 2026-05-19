import { useState } from "react";
import { useNavigate } from "react-router";
import { motion } from "motion/react";
import { Car, Truck, ChevronRight } from "lucide-react";
import { PageHeader } from "../components/PageHeader";
import rtsaLogo from "@/assets/Ratsa logo.png";

const VEHICLE_CLASSES = [
  {
    id: "private",
    label: "Private Vehicle",
    sublabel: "Personal use cars, SUVs, and light trucks",
    icon: Car,
    desc: "For vehicles registered for personal use by an individual or family.",
  },
  {
    id: "commercial",
    label: "Commercial Vehicle",
    sublabel: "Taxis, minibuses, trucks, and heavy goods vehicles",
    icon: Truck,
    desc: "For vehicles used for business, hire, or commercial transportation of goods.",
  },
];

export function RoadTaxEntry() {
  const navigate = useNavigate();
  const [selected, setSelected] = useState("");

  return (
    <div className="w-full max-w-md mx-auto min-h-screen bg-transparent font-sans pb-36">
      <PageHeader title="ROAD TAX" subtitle="RTSA Zambia" showBack />

      <div className="px-5 pt-6 space-y-5">
        {/* RTSA Branding */}
        <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-3 p-4 bg-[var(--app-bg)] rounded-2xl border-2 border-[var(--border)] shadow-sm">
          <img src={rtsaLogo} alt="RTSA" className="h-12 w-auto object-contain" />
          <div>
            <p className="text-[12px] font-black uppercase tracking-wide text-[var(--color-secondary)]">Road Transport & Safety Authority</p>
            <p className="text-[10px] font-semibold text-[var(--color-secondary)]/50">Official Road Tax Collection Portal</p>
          </div>
        </motion.div>

        <div>
          <h2 className="font-black text-[20px] text-[var(--color-secondary)] uppercase tracking-tight mb-1">Vehicle Class</h2>
          <p className="text-[12px] font-semibold text-[var(--color-secondary)]/50">
            Select your vehicle class to proceed with road tax payment.
          </p>
        </div>

        <div className="space-y-3">
          {VEHICLE_CLASSES.map(({ id, label, sublabel, icon: Icon, desc }, i) => {
            const isSelected = selected === id;
            return (
              <motion.button key={id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                onClick={() => setSelected(id)}
                className={`w-full p-5 rounded-2xl border-2 text-left transition-all active:scale-[0.98] ${
                  isSelected
                    ? "border-[var(--color-primary)] bg-gradient-to-br from-[var(--color-primary)]/8 to-[var(--color-primary)]/3 shadow-md"
                    : "border-[var(--border)] bg-[var(--app-bg)]"
                }`}
              >
                <div className="flex items-center gap-4 mb-3">
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-colors ${isSelected ? "bg-[var(--color-primary)] text-white" : "bg-[var(--muted)] text-[var(--color-secondary)]/50"}`}>
                    <Icon size={26} strokeWidth={1.5} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className={`font-black text-[14px] uppercase tracking-wide ${isSelected ? "text-[var(--color-primary)]" : "text-[var(--color-secondary)]"}`}>{label}</p>
                    <p className="text-[10px] font-semibold text-[var(--color-secondary)]/50 mt-0.5 leading-snug">{sublabel}</p>
                  </div>
                  <div className={`w-5 h-5 rounded-full border-2 shrink-0 flex items-center justify-center transition-colors ${isSelected ? "border-[var(--color-primary)] bg-[var(--color-primary)]" : "border-[var(--border)]"}`}>
                    {isSelected && <div className="w-2 h-2 rounded-full bg-white" />}
                  </div>
                </div>
                {isSelected && (
                  <motion.p initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }}
                    className="text-[11px] font-semibold text-[var(--color-primary)]/70 leading-snug border-t border-[var(--color-primary)]/20 pt-3">
                    {desc}
                  </motion.p>
                )}
              </motion.button>
            );
          })}
        </div>
      </div>

      <div className="px-5 pt-2 pb-8">
        <button disabled={!selected} onClick={() => navigate("/road-tax/details", { state: { vehicleClass: selected } })}
          className="w-full py-4 rounded-2xl bg-[var(--color-primary)] text-white font-black uppercase tracking-widest text-[13px] flex items-center justify-center gap-3 disabled:opacity-40 shadow-[0_8px_20px_rgba(255,140,0,0.3)] active:scale-95 transition-all">
          Continue <ChevronRight size={18} strokeWidth={2.5} />
        </button>
      </div>
    </div>
  );
}
