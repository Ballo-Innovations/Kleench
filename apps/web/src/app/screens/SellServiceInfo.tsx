import { useState } from "react";
import { useNavigate, useLocation } from "react-router";
import { ArrowRight } from "lucide-react";
import { PageHeader } from "../components/PageHeader";

const STEPS = 5;

export function SellServiceInfo() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [deliverables, setDeliverables] = useState("");
  const [revisions, setRevisions] = useState("");
  const [duration, setDuration] = useState("");

  const canContinue = name.trim() && description.trim() && deliverables.trim();

  return (
    <div className="w-full max-w-md mx-auto bg-transparent font-sans pb-24">
      <PageHeader title="SERVICE INFO" subtitle="Step 2 of 5 — Service Information" showBack />

      <div className="px-5 pt-5 space-y-5">
        <div className="flex gap-1.5">
          {Array.from({ length: STEPS }).map((_, i) => (
            <div key={i} className={`h-1.5 flex-1 rounded-full ${i < 2 ? "bg-[var(--color-primary)]" : "bg-[var(--border)]"}`} />
          ))}
        </div>

        <div className="bg-[var(--app-bg)] rounded-3xl border-[3px] border-[var(--app-text)] shadow-[6px_6px_0_var(--app-text)] p-5 space-y-4">
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[var(--color-secondary)]/50">Service Details</p>

          <div className="space-y-3">
            <div className="space-y-1">
              <label className="text-[10px] font-black uppercase tracking-wider text-[var(--color-secondary)]/60">Service Name <span className="text-[var(--color-primary)]">*</span></label>
              <input value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g. Professional Wedding Photography"
                className="w-full border-2 border-[var(--border)] rounded-xl px-4 py-3 text-[13px] font-semibold text-[var(--app-text)] bg-[var(--app-bg)] outline-none focus:border-[var(--app-text)] transition-all placeholder:text-[var(--color-secondary)]/30" />
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-black uppercase tracking-wider text-[var(--color-secondary)]/60">Description <span className="text-[var(--color-primary)]">*</span></label>
              <textarea value={description} onChange={(e) => setDescription(e.target.value)} rows={4}
                placeholder="Describe your service — experience, approach, outcomes..."
                className="w-full border-2 border-[var(--border)] rounded-xl px-4 py-3 text-[13px] font-semibold text-[var(--app-text)] bg-[var(--app-bg)] outline-none focus:border-[var(--app-text)] transition-all resize-none placeholder:text-[var(--color-secondary)]/30" />
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-black uppercase tracking-wider text-[var(--color-secondary)]/60">Deliverables <span className="text-[var(--color-primary)]">*</span></label>
              <input value={deliverables} onChange={(e) => setDeliverables(e.target.value)}
                placeholder="e.g. 200 edited photos, full-day coverage, online gallery"
                className="w-full border-2 border-[var(--border)] rounded-xl px-4 py-3 text-[13px] font-semibold text-[var(--app-text)] bg-[var(--app-bg)] outline-none focus:border-[var(--app-text)] transition-all placeholder:text-[var(--color-secondary)]/30" />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-[10px] font-black uppercase tracking-wider text-[var(--color-secondary)]/60">Revisions</label>
                <input value={revisions} onChange={(e) => setRevisions(e.target.value)} placeholder="e.g. 2"
                  className="w-full border-2 border-[var(--border)] rounded-xl px-4 py-3 text-[13px] font-semibold text-[var(--app-text)] bg-[var(--app-bg)] outline-none focus:border-[var(--app-text)] transition-all placeholder:text-[var(--color-secondary)]/30" />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-black uppercase tracking-wider text-[var(--color-secondary)]/60">Duration</label>
                <input value={duration} onChange={(e) => setDuration(e.target.value)} placeholder="e.g. 3 days"
                  className="w-full border-2 border-[var(--border)] rounded-xl px-4 py-3 text-[13px] font-semibold text-[var(--app-text)] bg-[var(--app-bg)] outline-none focus:border-[var(--app-text)] transition-all placeholder:text-[var(--color-secondary)]/30" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="px-5 pt-4 pb-8">
        <button
          onClick={() => navigate("/marketplace/sell/service/packages", {
            state: { ...state, serviceInfo: { name, description, deliverables, revisions, duration } }
          })}
          disabled={!canContinue}
          className="w-full py-4 rounded-2xl bg-[var(--color-secondary)] text-white font-black uppercase tracking-widest text-[12px] flex items-center justify-center gap-3 disabled:opacity-40 disabled:cursor-not-allowed active:scale-95 transition-all"
        >
          Continue <ArrowRight size={18} />
        </button>
      </div>
    </div>
  );
}
