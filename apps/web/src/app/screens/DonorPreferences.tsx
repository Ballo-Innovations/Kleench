import { useState } from "react";
import { motion } from "motion/react";
import { ChevronRight, RefreshCw, Repeat2, CalendarDays, Infinity } from "lucide-react";
import { useNavigate, useLocation } from "react-router";
import { PageHeader } from "../components/PageHeader";

const grace = (delay = 0) => ({
  delay, duration: 0.45, ease: [0.22, 1, 0.36, 1] as const,
});

const FREQUENCIES = [
  { id: "one_time", label: "One-Time Donor", desc: "Donate when you choose to", icon: RefreshCw },
  { id: "monthly", label: "Monthly Donor", desc: "Automatic monthly contributions", icon: Repeat2 },
  { id: "quarterly", label: "Quarterly Donor", desc: "Donate every three months", icon: CalendarDays },
  { id: "annually", label: "Annually Donor", desc: "One major donation per year", icon: Infinity },
];

export function DonorPreferences() {
  const navigate = useNavigate();
  const location = useLocation();
  const passedState = location.state || {};
  const [selected, setSelected] = useState("");

  return (
    <div className="w-full max-w-md mx-auto min-h-screen font-sans pb-32">
      <div className="sticky top-0 z-50">
        <PageHeader title="DONATION FREQUENCY" showBack onBack={() => navigate(-1)} />
      </div>

      <div className="px-5 pt-6">
        <h2 className="font-black text-[20px] text-[var(--color-secondary)] uppercase tracking-tight mb-2">How Often?</h2>
        <p className="text-[13px] font-semibold text-[var(--color-secondary)]/50 mb-6">Choose how frequently you'd like to donate to causes.</p>

        <div className="space-y-3 mb-10">
          {FREQUENCIES.map(({ id, label, desc, icon: Icon }, i) => (
            <motion.button key={id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={grace(0.07 * i)}
              onClick={() => setSelected(id)}
              className={`w-full p-4 rounded-2xl border-2 flex items-center gap-4 text-left transition-all active:scale-[0.98] ${selected === id ? 'border-[#E85D3F] bg-[#E85D3F]/5' : 'border-[var(--border)] bg-[var(--card)]'}`}>
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 transition-colors ${selected === id ? 'bg-[#E85D3F] text-white' : 'bg-[var(--app-bg-muted)] text-[var(--color-secondary)]/50'}`}>
                <Icon size={20} strokeWidth={1.5} />
              </div>
              <div className="flex-1">
                <p className={`font-black text-[14px] tracking-wide ${selected === id ? 'text-[#E85D3F]' : 'text-[var(--color-secondary)]'}`}>{label}</p>
                <p className="text-[11px] font-semibold text-[var(--color-secondary)]/50 mt-0.5">{desc}</p>
              </div>
              <div className={`w-5 h-5 rounded-full border-2 shrink-0 flex items-center justify-center transition-colors ${selected === id ? 'border-[#E85D3F] bg-[#E85D3F]' : 'border-[var(--border)]'}`}>
                {selected === id && <div className="w-2 h-2 rounded-full bg-white" />}
              </div>
            </motion.button>
          ))}
        </div>

        <button disabled={!selected} onClick={() => navigate("/donate/register-donor/review", { state: { ...passedState, frequency: selected } })}
          className="w-full py-4 rounded-2xl bg-[#E85D3F] text-white font-black uppercase tracking-widest text-[13px] flex items-center justify-center gap-3 disabled:opacity-40 shadow-md active:scale-95 transition-all">
          Review Application <ChevronRight size={18} />
        </button>
      </div>
    </div>
  );
}
