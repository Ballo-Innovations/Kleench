import { useState } from "react";
import { useNavigate, useLocation, useParams } from "react-router";
import { motion } from "motion/react";
import { CheckCircle } from "lucide-react";
import { PageHeader } from "../components/PageHeader";
import { CtaButton } from "../components/CtaButton";

const MOCK_PACKAGES = [
  { name: "Basic", price: 3500, features: ["4 hours coverage", "200 edited photos", "Online gallery"], color: "#059669" },
  { name: "Standard", price: 6000, features: ["8 hours coverage", "400 edited photos", "Online gallery", "Drone shots"], color: "var(--color-primary)", popular: true },
  { name: "Premium", price: 9500, features: ["Full day coverage", "600+ edited photos", "Online gallery", "Drone shots", "Highlight video"], color: "#7C3AED" },
];

export function MarketServicePackages() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { state } = useLocation();
  const [selected, setSelected] = useState<string | null>(null);

  const packages = state?.service?.packages || MOCK_PACKAGES;

  return (
    <div className="w-full max-w-md mx-auto bg-transparent font-sans pb-24">
      <PageHeader title="SELECT PACKAGE" showBack />

      <div className="px-5 pt-5 space-y-4">
        {packages.map((pkg: any, i: number) => {
          const color = pkg.color || ["#059669", "var(--color-primary)", "#7C3AED"][i];
          const isSelected = selected === pkg.name;
          return (
            <motion.button
              key={pkg.name}
              whileTap={{ scale: 0.98 }}
              onClick={() => setSelected(pkg.name)}
              className={`w-full text-left rounded-2xl border-[3px] overflow-hidden transition-all relative ${
                isSelected ? "border-[var(--app-text)] shadow-[4px_4px_0_var(--app-text)]" : "border-[var(--border)] bg-[var(--app-bg)]"
              }`}
              style={isSelected ? { backgroundColor: color + "10" } : {}}
            >
              {pkg.popular && (
                <div className="absolute top-3 right-3 px-2.5 py-0.5 rounded-full text-[8px] font-black uppercase tracking-widest text-white" style={{ backgroundColor: color }}>
                  Popular
                </div>
              )}
              <div className="px-5 py-3 border-b border-[var(--border)]" style={{ backgroundColor: color + "15" }}>
                <div className="flex items-center gap-2">
                  <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0 ${isSelected ? "" : "border-[var(--border)]"}`} style={isSelected ? { borderColor: color, backgroundColor: color } : {}}>
                    {isSelected && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                  </div>
                  <p className="text-[12px] font-black uppercase tracking-widest" style={{ color }}>{pkg.name} Package</p>
                </div>
              </div>
              <div className="p-5">
                <p className="text-[24px] font-black text-[var(--app-text)]">K{(pkg.price || 0).toLocaleString()}</p>
                <div className="mt-3 space-y-2">
                  {(pkg.features || []).map((f: string) => (
                    <div key={f} className="flex items-center gap-2">
                      <CheckCircle size={13} style={{ color }} strokeWidth={2.5} className="shrink-0" />
                      <span className="text-[11px] font-semibold text-[var(--color-secondary)]/70">{f}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.button>
          );
        })}
      </div>

      <div className="px-5 pt-4 pb-8">
        <CtaButton onClick={() => navigate(`/marketplace/service/${id}/availability`, { state: { ...state, selectedPackage: packages.find((p: any) => p.name === selected) } })} disabled={!selected}>Continue</CtaButton>
      </div>
    </div>
  );
}
