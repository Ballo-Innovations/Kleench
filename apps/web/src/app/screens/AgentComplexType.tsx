import { useState } from "react";
import { useNavigate } from "react-router";
import { motion } from "motion/react";
import { Car, Home, Factory, Wrench } from "lucide-react";
import { CtaButton } from "../components/CtaButton";
import { PageHeader } from "../components/PageHeader";

const ASSET_TYPES = [
  { id: "vehicle", label: "Vehicle", desc: "Cars, trucks, motorcycles, buses & commercial vehicles", icon: Car, color: "var(--color-primary)", examples: ["Sedans", "SUVs", "Pickups", "Minibuses"] },
  { id: "property", label: "Property", desc: "Residential, commercial, or industrial real estate", icon: Home, color: "#7C3AED", examples: ["Houses", "Land", "Flats", "Commercial Units"] },
  { id: "machinery", label: "Machinery", desc: "Industrial and agricultural machinery & plant equipment", icon: Factory, color: "#059669", examples: ["Excavators", "Tractors", "Generators", "Cranes"] },
  { id: "equipment", label: "Equipment", desc: "Business equipment, tools, and specialized devices", icon: Wrench, color: "var(--color-secondary)", examples: ["Medical", "IT Hardware", "Workshop Tools", "Mining"] },
];

export function AgentComplexType() {
  const navigate = useNavigate();
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <div className="w-full max-w-md mx-auto bg-transparent font-sans pb-24">
      <PageHeader title="COMPLEX ASSET LISTING" subtitle="Step 1 — Asset Type" showBack />

      <div className="px-5 pt-5 space-y-5">
        <div className="flex gap-1.5">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className={`h-1.5 flex-1 rounded-full ${i === 1 ? "bg-[var(--color-primary)]" : "bg-[var(--border)]"}`} />
          ))}
        </div>

        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[var(--color-secondary)]/50">What type of asset are you selling?</p>

        <div className="space-y-3">
          {ASSET_TYPES.map((type) => {
            const Icon = type.icon;
            const isSelected = selected === type.id;
            return (
              <motion.button key={type.id} whileTap={{ scale: 0.98 }} onClick={() => setSelected(type.id)}
                className={`w-full flex items-start gap-4 p-4 bg-[var(--app-bg)] rounded-2xl border transition-all text-left shadow-sm ${isSelected ? "border-[var(--color-primary)] bg-[var(--color-primary)]/5" : "border-[var(--border)]"}`}>
                <div className="w-11 h-11 rounded-2xl flex items-center justify-center shrink-0" style={{ backgroundColor: type.color + "15" }}>
                  <Icon size={20} style={{ color: type.color }} strokeWidth={1.5} />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <p className="text-[13px] font-black text-[var(--app-text)] uppercase tracking-wide">{type.label}</p>
                    <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${isSelected ? "bg-[var(--color-primary)] border-[var(--color-primary)]" : "border-[var(--border)]"}`}>
                      {isSelected && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                    </div>
                  </div>
                  <p className="text-[10px] font-semibold text-[var(--color-secondary)]/60 mt-0.5 leading-snug">{type.desc}</p>
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    {type.examples.map((ex) => (
                      <span key={ex} className="text-[8px] font-black uppercase tracking-wide px-2 py-0.5 rounded-full"
                        style={{ backgroundColor: type.color + "10", color: type.color }}>{ex}</span>
                    ))}
                  </div>
                </div>
              </motion.button>
            );
          })}
        </div>
      </div>

      <div className="px-5 pt-4 pb-8">
        <CtaButton onClick={() => navigate("/marketplace/sell/complex/info", { state: { sellType: "complex", agentMode: true, assetType: selected } })} disabled={!selected}>Continue</CtaButton>
      </div>
    </div>
  );
}
