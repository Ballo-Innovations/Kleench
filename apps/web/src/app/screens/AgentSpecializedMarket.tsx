import { useState } from "react";
import { useNavigate, useLocation } from "react-router";
import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { PageHeader } from "../components/PageHeader";

const FREQUENCIES = ["Daily", "Twice a week", "Weekly", "Bi-weekly", "Monthly"];
const DATA_SOURCES = ["Local Market", "Farm Gate", "Wholesale", "Retail", "Government", "FRA", "ERB", "NGO Reports"];
const DATA_POINTS = ["Price per unit", "Availability", "Quality grade", "Volume traded", "Price trend", "Seasonal notes"];

export function AgentSpecializedMarket() {
  const navigate = useNavigate();
  const { state } = useLocation();

  const [frequency, setFrequency] = useState("");
  const [sources, setSources] = useState<string[]>([]);
  const [points, setPoints] = useState<string[]>([]);

  const toggle = (item: string, list: string[], setList: (v: string[]) => void) => {
    setList(list.includes(item) ? list.filter((x) => x !== item) : [...list, item]);
  };

  const canContinue = frequency && sources.length > 0 && points.length > 0;

  return (
    <div className="w-full max-w-md mx-auto min-h-screen bg-transparent font-sans pb-32">
      <PageHeader title="SPECIALIZED AGENT" subtitle="Step 4 — Market Intelligence Data" showBack />

      <div className="px-5 pt-5 space-y-5">
        <div className="flex gap-1.5">
          {Array.from({ length: 7 }).map((_, i) => (
            <div key={i} className={`h-1.5 flex-1 rounded-full ${i < 4 ? "bg-[var(--color-primary)]" : "bg-[var(--border)]"}`} />
          ))}
        </div>

        <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}
          className="bg-[var(--app-bg)] border border-[var(--border)] rounded-2xl shadow-sm p-5 space-y-3">
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[var(--color-secondary)]/50">Reporting Frequency <span className="text-[var(--color-primary)]">*</span></p>
          <div className="flex flex-wrap gap-2">
            {FREQUENCIES.map((f) => (
              <button key={f} onClick={() => setFrequency(f)}
                className={`px-3 py-1.5 rounded-xl border text-[10px] font-black uppercase tracking-wide transition-all ${frequency === f ? "border-[var(--color-primary)] bg-[var(--color-primary)]/10 text-[var(--color-primary)]" : "border-[var(--border)] text-[var(--color-secondary)]/60"}`}>
                {f}
              </button>
            ))}
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
          className="bg-[var(--app-bg)] border border-[var(--border)] rounded-2xl shadow-sm p-5 space-y-3">
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[var(--color-secondary)]/50">Data Sources <span className="text-[var(--color-primary)]">*</span></p>
          <div className="flex flex-wrap gap-2">
            {DATA_SOURCES.map((s) => (
              <button key={s} onClick={() => toggle(s, sources, setSources)}
                className={`px-3 py-1.5 rounded-xl border text-[10px] font-black uppercase tracking-wide transition-all ${sources.includes(s) ? "border-[var(--color-primary)] bg-[var(--color-primary)]/10 text-[var(--color-primary)]" : "border-[var(--border)] text-[var(--color-secondary)]/60"}`}>
                {s}
              </button>
            ))}
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}
          className="bg-[var(--app-bg)] border border-[var(--border)] rounded-2xl shadow-sm p-5 space-y-3">
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[var(--color-secondary)]/50">Data Points to Report <span className="text-[var(--color-primary)]">*</span></p>
          <div className="flex flex-wrap gap-2">
            {DATA_POINTS.map((p) => (
              <button key={p} onClick={() => toggle(p, points, setPoints)}
                className={`px-3 py-1.5 rounded-xl border text-[10px] font-black uppercase tracking-wide transition-all ${points.includes(p) ? "border-[var(--color-primary)] bg-[var(--color-primary)]/10 text-[var(--color-primary)]" : "border-[var(--border)] text-[var(--color-secondary)]/60"}`}>
                {p}
              </button>
            ))}
          </div>
        </motion.div>
      </div>

      <div className="px-5 pt-4 pb-8">
        <button onClick={() => navigate("/marketplace/agent/terms", { state: { ...state, frequency, dataSources: sources, dataPoints: points } })}
          disabled={!canContinue}
          className="w-full py-4 rounded-2xl bg-[var(--color-secondary)] text-white font-black uppercase tracking-widest text-[12px] flex items-center justify-center gap-3 disabled:opacity-40 disabled:cursor-not-allowed active:scale-95 transition-all">
          Continue <ArrowRight size={18} />
        </button>
      </div>
    </div>
  );
}
