import { useState } from "react";
import { useNavigate, useLocation } from "react-router";
import { Plus, X, ArrowRight } from "lucide-react";
import { PageHeader } from "../components/PageHeader";

const STEPS = 7;

export function SellServiceInfo() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const [name, setName] = useState("");
  const [shortDesc, setShortDesc] = useState("");
  const [detailedDesc, setDetailedDesc] = useState("");
  const [highlights, setHighlights] = useState<string[]>([""]);

  const addHighlight = () => setHighlights((p) => [...p, ""]);
  const removeHighlight = (i: number) => setHighlights((p) => p.filter((_, j) => j !== i));
  const updateHighlight = (i: number, v: string) => setHighlights((p) => p.map((h, j) => j === i ? v : h));

  const canContinue = name.trim() && shortDesc.trim() && detailedDesc.trim();

  return (
    <div className="w-full max-w-md mx-auto min-h-screen bg-transparent font-sans pb-32">
      <PageHeader title="SERVICE INFO" subtitle="Step 4 of 7" showBack />

      <div className="px-5 pt-5 space-y-5">
        <div className="flex gap-1.5">
          {Array.from({ length: STEPS }).map((_, i) => (
            <div key={i} className={`h-1.5 flex-1 rounded-full ${i < 4 ? "bg-[var(--color-primary)]" : "bg-[var(--border)]"}`} />
          ))}
        </div>

        <div className="bg-[var(--app-bg)] rounded-3xl border-[3px] border-[var(--app-text)] shadow-[6px_6px_0_var(--app-text)] p-5 space-y-4">
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[var(--color-secondary)]/50">Service Details</p>

          <div className="space-y-3">
            <div className="space-y-1">
              <label className="text-[10px] font-black uppercase tracking-wider text-[var(--color-secondary)]/60">Service Name</label>
              <input value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g. Professional Wedding Photography"
                className="w-full border-2 border-[var(--border)] rounded-xl px-4 py-3 text-[13px] font-semibold text-[var(--app-text)] bg-[var(--app-bg)] outline-none focus:border-[var(--app-text)] transition-all placeholder:text-[var(--color-secondary)]/30" />
            </div>
            <div className="space-y-1">
              <label className="text-[10px] font-black uppercase tracking-wider text-[var(--color-secondary)]/60">Short Description</label>
              <input value={shortDesc} onChange={(e) => setShortDesc(e.target.value)} placeholder="One-line summary of your service"
                className="w-full border-2 border-[var(--border)] rounded-xl px-4 py-3 text-[13px] font-semibold text-[var(--app-text)] bg-[var(--app-bg)] outline-none focus:border-[var(--app-text)] transition-all placeholder:text-[var(--color-secondary)]/30" />
            </div>
            <div className="space-y-1">
              <label className="text-[10px] font-black uppercase tracking-wider text-[var(--color-secondary)]/60">Detailed Description</label>
              <textarea value={detailedDesc} onChange={(e) => setDetailedDesc(e.target.value)} rows={4}
                placeholder="Describe your service in detail — experience, approach, outcomes..."
                className="w-full border-2 border-[var(--border)] rounded-xl px-4 py-3 text-[13px] font-semibold text-[var(--app-text)] bg-[var(--app-bg)] outline-none focus:border-[var(--app-text)] transition-all resize-none placeholder:text-[var(--color-secondary)]/30" />
            </div>
          </div>
        </div>

        <div className="bg-[var(--app-bg)] rounded-3xl border-[3px] border-[var(--app-text)] shadow-[6px_6px_0_var(--app-text)] p-5 space-y-4">
          <div className="flex items-center justify-between">
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[var(--color-secondary)]/50">Key Highlights</p>
            <span className="text-[9px] font-black text-[var(--color-secondary)]/40 uppercase tracking-wide">Optional</span>
          </div>
          <div className="space-y-2">
            {highlights.map((h, i) => (
              <div key={i} className="flex items-center gap-2">
                <input value={h} onChange={(e) => updateHighlight(i, e.target.value)} placeholder={`Highlight ${i + 1}`}
                  className="flex-1 border-2 border-[var(--border)] rounded-xl px-4 py-2.5 text-[12px] font-semibold text-[var(--app-text)] bg-[var(--app-bg)] outline-none focus:border-[var(--app-text)] transition-all placeholder:text-[var(--color-secondary)]/30" />
                {highlights.length > 1 && (
                  <button onClick={() => removeHighlight(i)} className="w-8 h-8 rounded-full border border-[var(--border)] flex items-center justify-center text-[var(--color-secondary)]/50 active:scale-90 transition-all">
                    <X size={12} />
                  </button>
                )}
              </div>
            ))}
          </div>
          <button onClick={addHighlight}
            className="w-full flex items-center justify-center gap-2 py-2.5 border-2 border-dashed border-[var(--color-primary)]/40 rounded-xl text-[10px] font-black uppercase tracking-widest text-[var(--color-primary)] active:opacity-70 transition-all">
            <Plus size={14} strokeWidth={2.5} /> Add Highlight
          </button>
        </div>
      </div>

      <div className="px-5 pt-4 pb-8">
        <button
          onClick={() => navigate("/marketplace/sell/service/packages", { state: { ...state, serviceInfo: { name, shortDesc, detailedDesc, highlights: highlights.filter(Boolean) } } })}
          disabled={!canContinue}
          className="w-full py-4 rounded-2xl bg-[var(--color-secondary)] text-white font-black uppercase tracking-widest text-[12px] flex items-center justify-center gap-3 disabled:opacity-40 disabled:cursor-not-allowed active:scale-95 transition-all"
        >
          Continue <ArrowRight size={18} />
        </button>
      </div>
    </div>
  );
}
