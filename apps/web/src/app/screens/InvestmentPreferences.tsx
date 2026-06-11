import { useState } from "react";
import { motion } from "motion/react";
import { ChevronRight, Zap, RefreshCw, BarChart2, Calendar } from "lucide-react";
import { useNavigate } from "react-router";
import { PageHeader } from "../components/PageHeader";

const grace = (delay = 0) => ({
  delay, duration: 0.45, ease: [0.22, 1, 0.36, 1] as const,
});

const FREQUENCIES = [
  { id: "one-off", label: "One-Off Investor", desc: "Invest once per project at your convenience", icon: Zap },
  { id: "monthly", label: "Ongoing Investor (Monthly)", desc: "Commit regular monthly investment contributions", icon: RefreshCw },
  { id: "quarterly", label: "Quarterly Investor", desc: "Invest once every three months", icon: BarChart2 },
  { id: "annual", label: "Annual Investor", desc: "Make one strategic investment per year", icon: Calendar },
];

const RANGES = ["K1K–5K", "K5K–25K", "K25K–100K", "K100K+"];

export function InvestmentPreferences() {
  const navigate = useNavigate();
  const [frequency, setFrequency] = useState("");
  const [range, setRange] = useState("");

  const isValid = frequency.length > 0 && range.length > 0;

  return (
    <div className="w-full max-w-md mx-auto font-sans pb-24">
      <div className="sticky top-0 z-50">
        <PageHeader title="INVESTMENT PREFERENCES" showBack onBack={() => navigate(-1)} />
      </div>

      <div className="px-5 pt-6 space-y-6">
        <div>
          <h2 className="font-black text-[20px] text-[var(--color-secondary)] uppercase tracking-tight mb-1">Your Preferences</h2>
          <p className="text-[13px] font-semibold text-[var(--color-secondary)]/50">Set your investment frequency and budget range.</p>
        </div>

        <div>
          <label className="text-[10px] font-black uppercase tracking-widest text-[var(--color-secondary)]/50 block mb-3">Investment Frequency</label>
          <div className="space-y-3">
            {FREQUENCIES.map(({ id, label, desc, icon: Icon }, i) => (
              <motion.button key={id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={grace(0.06 * i)}
                onClick={() => setFrequency(id)}
                className={`w-full p-4 rounded-2xl border-2 flex items-center gap-4 text-left transition-all active:scale-[0.98] ${frequency === id ? 'border-[#E85D3F] bg-[#E85D3F]/5' : 'border-[var(--border)] bg-[var(--card)]'}`}>
                <div className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 transition-colors ${frequency === id ? 'bg-[#E85D3F] text-white' : 'bg-[var(--app-bg-muted)] text-[var(--color-secondary)]/50'}`}>
                  <Icon size={20} strokeWidth={1.5} />
                </div>
                <div className="flex-1">
                  <p className={`font-black text-[13px] uppercase tracking-wide ${frequency === id ? 'text-[#E85D3F]' : 'text-[var(--color-secondary)]'}`}>{label}</p>
                  <p className="text-[11px] font-semibold text-[var(--color-secondary)]/50 mt-0.5 leading-snug">{desc}</p>
                </div>
                <div className={`w-5 h-5 rounded-full border-2 shrink-0 flex items-center justify-center transition-colors ${frequency === id ? 'border-[#E85D3F] bg-[#E85D3F]' : 'border-[var(--border)]'}`}>
                  {frequency === id && <div className="w-2 h-2 rounded-full bg-white" />}
                </div>
              </motion.button>
            ))}
          </div>
        </div>

        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={grace(0.28)}>
          <label className="text-[10px] font-black uppercase tracking-widest text-[var(--color-secondary)]/50 block mb-3">Investment Range</label>
          <div className="grid grid-cols-2 gap-2">
            {RANGES.map(r => (
              <button key={r} onClick={() => setRange(r)}
                className={`py-4 rounded-2xl font-black text-[12px] border-2 transition-all active:scale-95 ${range === r ? 'bg-[#E85D3F] border-[#E85D3F] text-white shadow-md' : 'bg-[var(--card)] border-[var(--border)] text-[var(--color-secondary)]'}`}>
                {r}
              </button>
            ))}
          </div>
        </motion.div>

        <button disabled={!isValid} onClick={() => navigate("/crowdfunding/register-investor/review")}
          className="w-full py-4 rounded-2xl bg-[#E85D3F] text-white font-black uppercase tracking-widest text-[13px] flex items-center justify-center gap-3 disabled:opacity-40 shadow-md active:scale-95 transition-all">
          Continue <ChevronRight size={18} />
        </button>
      </div>
    </div>
  );
}
