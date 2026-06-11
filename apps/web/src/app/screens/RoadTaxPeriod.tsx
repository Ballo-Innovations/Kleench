import { useState } from "react";
import { useNavigate, useLocation } from "react-router";
import { motion } from "motion/react";
import { ChevronRight } from "lucide-react";
import { PageHeader } from "../components/PageHeader";

const PERIODS = [
  { id: "3months", label: "3 Months", months: 3, price: 480, save: null },
  { id: "6months", label: "6 Months", months: 6, price: 880, save: "Save ZMW 80" },
  { id: "12months", label: "12 Months (Annual)", months: 12, price: 1600, save: "Save ZMW 160" },
];

export function RoadTaxPeriod() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const [selected, setSelected] = useState("12months");
  const vehicleClass = state?.vehicleClass || "private";

  const multiplier = vehicleClass === "commercial" ? 1.8 : 1;

  return (
    <div className="w-full max-w-md mx-auto bg-transparent font-sans pb-36">
      <PageHeader title="TAX PERIOD" subtitle="Step 2 of 3" showBack />

      <div className="px-5 pt-6 space-y-4">
        <div>
          <h2 className="font-black text-[20px] text-[var(--color-secondary)] uppercase tracking-tight mb-1">Payment Period</h2>
          <p className="text-[12px] font-semibold text-[var(--color-secondary)]/50">
            Choose the road tax validity period for your vehicle.
          </p>
        </div>

        <div className="space-y-3">
          {PERIODS.map(({ id, label, months, price, save }, i) => {
            const finalPrice = Math.round(price * multiplier);
            const isSelected = selected === id;
            return (
              <motion.button key={id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
                onClick={() => setSelected(id)}
                className={`w-full p-4 rounded-2xl border-2 flex items-center justify-between text-left transition-all active:scale-[0.98] ${
                  isSelected ? "border-[var(--color-primary)] bg-[var(--color-primary)]/5 shadow-md" : "border-[var(--border)] bg-[var(--app-bg)]"
                }`}
              >
                <div className="flex items-center gap-3">
                  {/* Custom Radio */}
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${isSelected ? "border-[var(--color-primary)] bg-[var(--color-primary)]" : "border-[var(--border)]"}`}>
                    {isSelected && <div className="w-2 h-2 rounded-full bg-white" />}
                  </div>
                  <div>
                    <p className={`font-black text-[13px] uppercase tracking-wide ${isSelected ? "text-[var(--color-primary)]" : "text-[var(--color-secondary)]"}`}>{label}</p>
                    {save && (
                      <span className="text-[9px] font-black uppercase tracking-wide text-emerald-500">{save}</span>
                    )}
                  </div>
                </div>
                <div className="text-right">
                  <p className={`font-black text-[18px] ${isSelected ? "text-[var(--color-primary)]" : "text-[var(--color-secondary)]"}`}>
                    ZMW {finalPrice.toLocaleString()}
                  </p>
                  <p className="text-[10px] font-semibold text-[var(--color-secondary)]/50">
                    ZMW {Math.round(finalPrice / months)}/mo
                  </p>
                </div>
              </motion.button>
            );
          })}
        </div>

        {/* Vehicle Class Note */}
        {vehicleClass === "commercial" && (
          <div className="bg-amber-50 border-2 border-amber-200 rounded-xl p-3 flex gap-2">
            <span className="text-amber-500 text-[14px]">⚠</span>
            <p className="text-[11px] font-semibold text-amber-700/80 leading-snug">
              Commercial vehicle rates are 1.8× the standard private vehicle rate as per RTSA tariff schedule.
            </p>
          </div>
        )}
      </div>

      <div className="px-5 pt-2 pb-8">
        <div className="flex items-center justify-between mb-3">
          <span className="text-[11px] font-black uppercase tracking-wide text-[var(--color-secondary)]/50">Amount Due</span>
          <span className="text-[16px] font-black text-[var(--color-primary)]">
            ZMW {Math.round((PERIODS.find((p) => p.id === selected)?.price || 1600) * multiplier).toLocaleString()}
          </span>
        </div>
        <button onClick={() => navigate("/road-tax/policy", { state: { ...state, period: selected } })}
          className="w-full py-4 rounded-2xl bg-[var(--color-primary)] text-white font-black uppercase tracking-widest text-[13px] flex items-center justify-center gap-3 shadow-[0_8px_20px_rgba(255,140,0,0.3)] active:scale-95 transition-all">
          Review Policy <ChevronRight size={18} strokeWidth={2.5} />
        </button>
      </div>
    </div>
  );
}
