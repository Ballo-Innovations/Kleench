import { useState } from "react";
import { motion } from "motion/react";
import { ChevronRight, Check } from "lucide-react";
import { useNavigate } from "react-router";
import { PageHeader } from "../components/PageHeader";

const grace = (delay = 0) => ({
  delay, duration: 0.4, ease: [0.22, 1, 0.36, 1] as const,
});

const CAUSES = [
  "Education", "Health", "Disaster Relief", "Water & Sanitation",
  "Women & Girls", "Youth & Children", "Environment", "Community",
  "Agriculture", "Others",
];

export function DonorRegDetails() {
  const navigate = useNavigate();
  const [selected, setSelected] = useState<string[]>([]);

  const toggle = (cause: string) => {
    setSelected(prev => prev.includes(cause) ? prev.filter(c => c !== cause) : [...prev, cause]);
  };

  return (
    <div className="w-full max-w-md mx-auto min-h-screen font-sans pb-32">
      <div className="sticky top-0 z-50">
        <PageHeader title="CAUSES OF INTEREST" showBack onBack={() => navigate(-1)} />
      </div>

      <div className="px-5 pt-6">
        <h2 className="font-black text-[20px] text-[var(--color-secondary)] uppercase tracking-tight mb-2">Select Your Causes</h2>
        <p className="text-[13px] font-semibold text-[var(--color-secondary)]/50 mb-6">Choose the causes you want to support. Select all that apply.</p>

        <div className="grid grid-cols-2 gap-3 mb-10">
          {CAUSES.map((cause, i) => {
            const isSelected = selected.includes(cause);
            return (
              <motion.button key={cause} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={grace(0.04 * i)}
                onClick={() => toggle(cause)}
                className={`p-4 rounded-2xl border-2 flex flex-col items-start gap-3 text-left transition-all active:scale-[0.97] ${isSelected ? 'border-[#E85D3F] bg-[#E85D3F]/5' : 'border-[var(--border)] bg-[var(--card)]'}`}>
                <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${isSelected ? 'border-[#E85D3F] bg-[#E85D3F]' : 'border-[var(--border)]'}`}>
                  {isSelected && <Check size={12} className="text-white" strokeWidth={3} />}
                </div>
                <span className={`font-black text-[12px] uppercase tracking-wide leading-tight ${isSelected ? 'text-[#E85D3F]' : 'text-[var(--color-secondary)]'}`}>{cause}</span>
              </motion.button>
            );
          })}
        </div>

        {selected.length > 0 && (
          <p className="text-center text-[11px] font-black text-[#E85D3F] uppercase tracking-widest mb-4">
            {selected.length} cause{selected.length > 1 ? 's' : ''} selected
          </p>
        )}

        <button disabled={selected.length === 0} onClick={() => navigate("/donate/register-donor/preferences", { state: { causes: selected } })}
          className="w-full py-4 rounded-2xl bg-[#E85D3F] text-white font-black uppercase tracking-widest text-[13px] flex items-center justify-center gap-3 disabled:opacity-40 shadow-md active:scale-95 transition-all">
          Continue <ChevronRight size={18} />
        </button>
      </div>
    </div>
  );
}
