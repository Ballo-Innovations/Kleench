import { useState } from "react";
import { useNavigate, useLocation } from "react-router";
import { ArrowRight, Plus, X } from "lucide-react";
import { PageHeader } from "../components/PageHeader";

const STEPS = 6;

export function ListBizDescription() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const [overview, setOverview] = useState("");
  const [services, setServices] = useState<string[]>([""]);

  const addService = () => setServices((p) => [...p, ""]);
  const setService = (i: number, v: string) => setServices((p) => p.map((s, j) => j === i ? v : s));
  const removeService = (i: number) => setServices((p) => p.filter((_, j) => j !== i));

  const canContinue = overview.trim().length >= 20;

  return (
    <div className="w-full max-w-md mx-auto min-h-screen bg-transparent font-sans pb-32">
      <PageHeader title="LIST YOUR BUSINESS" subtitle="Step 3 of 6 — Description" showBack />

      <div className="px-5 pt-5 space-y-5">
        <div className="flex gap-1.5">
          {Array.from({ length: STEPS }).map((_, i) => (
            <div key={i} className={`h-1.5 flex-1 rounded-full ${i < 3 ? "bg-[var(--color-primary)]" : "bg-[var(--border)]"}`} />
          ))}
        </div>

        <div className="bg-[var(--app-bg)] border border-[var(--border)] rounded-2xl shadow-sm p-5 space-y-4">
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[var(--color-secondary)]/50">Business Overview</p>
          <textarea value={overview} onChange={(e) => setOverview(e.target.value)}
            placeholder="Describe what your business does, your mission, and what makes you stand out..."
            rows={5}
            className="w-full border border-[var(--border)] rounded-xl px-4 py-3 text-[13px] font-semibold text-[var(--app-text)] bg-[var(--app-bg)] outline-none focus:border-[var(--app-text)] transition-all resize-none placeholder:text-[var(--color-secondary)]/30" />
          <p className="text-[9px] font-semibold text-[var(--color-secondary)]/40">{overview.length} chars · min 20</p>
        </div>

        <div className="bg-[var(--app-bg)] border border-[var(--border)] rounded-2xl shadow-sm p-5 space-y-4">
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[var(--color-secondary)]/50">Services Offered</p>
          <div className="space-y-2">
            {services.map((s, i) => (
              <div key={i} className="flex items-center gap-2">
                <input value={s} onChange={(e) => setService(i, e.target.value)} placeholder={`Service ${i + 1}...`}
                  className="flex-1 border border-[var(--border)] rounded-xl px-4 py-2.5 text-[13px] font-semibold text-[var(--app-text)] bg-[var(--app-bg)] outline-none focus:border-[var(--app-text)] transition-all placeholder:text-[var(--color-secondary)]/30" />
                {services.length > 1 && (
                  <button onClick={() => removeService(i)} className="w-8 h-8 rounded-xl border border-[var(--border)] flex items-center justify-center active:scale-90 transition-all">
                    <X size={12} className="text-[var(--color-secondary)]/60" />
                  </button>
                )}
              </div>
            ))}
          </div>
          <button onClick={addService}
            className="flex items-center gap-2 text-[11px] font-black text-[var(--color-primary)] uppercase tracking-wide active:opacity-70 transition-all">
            <Plus size={14} strokeWidth={2.5} /> Add Service
          </button>
        </div>
      </div>

      <div className="px-5 pt-4 pb-8">
        <button
          onClick={() => navigate("/marketplace/list/media", { state: { ...state, overview, services: services.filter(Boolean) } })}
          disabled={!canContinue}
          className="w-full py-4 rounded-2xl bg-[var(--color-secondary)] text-white font-black uppercase tracking-widest text-[12px] flex items-center justify-center gap-3 disabled:opacity-40 disabled:cursor-not-allowed active:scale-95 transition-all"
        >
          Continue <ArrowRight size={18} />
        </button>
      </div>
    </div>
  );
}
