import { useState } from "react";
import { motion } from "motion/react";
import { ChevronRight, ShieldCheck, RefreshCw } from "lucide-react";
import { useNavigate, useLocation, useParams } from "react-router";
import { PageHeader } from "../components/PageHeader";

const grace = (delay = 0) => ({
  delay, duration: 0.45, ease: [0.22, 1, 0.36, 1] as const,
});

const PRESET_AMOUNTS = [2500, 5000, 10000, 25000, 50000];

export function InvestmentAmount() {
  const navigate = useNavigate();
  const location = useLocation();
  const { projectId } = useParams();
  const { title } = (location.state as { title?: string }) || { title: "Investment" };

  const [selected, setSelected] = useState<number | null>(null);
  const [custom, setCustom] = useState("");
  const [monthly, setMonthly] = useState(false);

  const amount = selected ?? (custom ? parseFloat(custom) : 0);
  const isValid = amount > 0;

  return (
    <div className="w-full max-w-md mx-auto min-h-screen font-sans pb-32">
      <div className="sticky top-0 z-50">
        <PageHeader title="INVEST" showBack onBack={() => navigate(-1)} />
      </div>

      <div className="px-5 pt-5 space-y-5">
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={grace(0.05)}
          className="bg-[#E85D3F]/8 border border-[#E85D3F]/20 rounded-2xl px-4 py-3">
          <p className="text-[10px] font-black uppercase tracking-widest text-[#E85D3F] mb-0.5">Investing in</p>
          <p className="font-black text-[14px] text-[var(--color-secondary)] uppercase tracking-wide">{title}</p>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={grace(0.1)}>
          <label className="text-[10px] font-black uppercase tracking-widest text-[var(--color-secondary)]/50 block mb-3">Select Amount</label>
          <div className="grid grid-cols-3 gap-2">
            {PRESET_AMOUNTS.map(amt => (
              <button key={amt} onClick={() => { setSelected(amt); setCustom(""); }}
                className={`py-4 rounded-2xl font-black text-[11px] border-2 transition-all active:scale-95 ${selected === amt ? 'bg-[#E85D3F] border-[#E85D3F] text-white shadow-md' : 'bg-[var(--card)] border-[var(--border)] text-[var(--color-secondary)]'}`}>
                K{amt.toLocaleString()}
              </button>
            ))}
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={grace(0.18)}>
          <label className="text-[10px] font-black uppercase tracking-widest text-[var(--color-secondary)]/50 block mb-2">Or Enter Custom Amount</label>
          <div className="flex items-center px-4 py-3.5 rounded-2xl border-2 bg-[var(--card)] gap-2 transition-colors focus-within:border-[#E85D3F] border-[var(--border)]">
            <span className="font-black text-[18px] text-[var(--color-secondary)]">K</span>
            <input type="number" value={custom}
              onChange={e => { setCustom(e.target.value); setSelected(null); }}
              placeholder="0.00"
              className="flex-1 bg-transparent outline-none font-bold text-[16px] text-[var(--color-secondary)] placeholder:text-[var(--color-secondary)]/30" />
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={grace(0.26)}
          className="bg-[var(--card)] rounded-2xl border border-[var(--border)] p-4 flex items-center gap-3 shadow-sm">
          <div className="w-10 h-10 rounded-full bg-[#E85D3F]/10 flex items-center justify-center shrink-0">
            <RefreshCw size={18} className="text-[#E85D3F]" strokeWidth={1.5} />
          </div>
          <div className="flex-1">
            <p className="font-black text-[13px] text-[var(--color-secondary)] uppercase tracking-wide">Make it Recurring</p>
            <p className="text-[11px] font-semibold text-[var(--color-secondary)]/50">Auto-invest every month</p>
          </div>
          <button onClick={() => setMonthly(m => !m)}
            className={`w-12 h-6 rounded-full transition-all relative ${monthly ? 'bg-[#E85D3F]' : 'bg-[var(--border)]'}`}>
            <div className={`w-5 h-5 rounded-full bg-white shadow-sm absolute top-0.5 transition-all ${monthly ? 'left-6' : 'left-0.5'}`} />
          </button>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={grace(0.34)}
          className="flex items-center gap-3 px-4 py-3 bg-green-50 border border-green-200 rounded-2xl">
          <ShieldCheck size={20} className="text-green-500 shrink-0" strokeWidth={2} />
          <p className="text-[11px] font-bold text-green-700 leading-snug">All investments are encrypted and processed securely. Kleench never stores your payment details.</p>
        </motion.div>

        {isValid && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={grace(0.1)}
            className="bg-[var(--card)] rounded-2xl border border-[var(--border)] p-4 shadow-sm">
            <div className="flex justify-between items-center">
              <span className="text-[11px] font-black uppercase tracking-widest text-[var(--color-secondary)]/40">Total to Invest</span>
              <span className="font-black text-[22px] text-[#E85D3F]">K {amount.toFixed(2)}</span>
            </div>
            {monthly && <p className="text-[10px] font-bold text-[var(--color-secondary)]/40 mt-1">Recurring monthly until cancelled</p>}
          </motion.div>
        )}

        <button disabled={!isValid}
          onClick={() => navigate(`/crowdfunding/project/${projectId}/confirm`, { state: { title, amount, monthly } })}
          className="w-full py-4 rounded-2xl bg-[#E85D3F] text-white font-black uppercase tracking-widest text-[13px] flex items-center justify-center gap-3 disabled:opacity-40 shadow-md active:scale-95 transition-all">
          Continue <ChevronRight size={18} />
        </button>
      </div>
    </div>
  );
}
