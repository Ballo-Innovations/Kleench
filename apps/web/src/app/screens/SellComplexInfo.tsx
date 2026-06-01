import { useState } from "react";
import { useNavigate, useLocation } from "react-router";
import { ArrowRight } from "lucide-react";
import { PageHeader } from "../components/PageHeader";

const CONDITIONS = ["Brand New", "Excellent", "Good", "Fair", "For Parts / Repair"];
const ASSET_CATEGORIES = ["Vehicles", "Industrial Machinery", "Agricultural Equipment", "Commercial Property", "Construction Equipment", "Medical Equipment", "Other"];
const STEPS = 7;

export function SellComplexInfo() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const [form, setForm] = useState({ name: "", category: "", condition: "", year: "", specs: "", description: "" });

  const set = (k: string, v: string) => setForm((p) => ({ ...p, [k]: v }));
  const canContinue = form.name && form.category && form.condition && form.description;

  return (
    <div className="w-full max-w-md mx-auto min-h-screen bg-transparent font-sans pb-32">
      <PageHeader title="ASSET INFO" subtitle="Step 3 of 7" showBack />

      <div className="px-5 pt-5 space-y-5">
        <div className="flex gap-1.5">
          {Array.from({ length: STEPS }).map((_, i) => (
            <div key={i} className={`h-1.5 flex-1 rounded-full ${i < 3 ? "bg-[var(--color-primary)]" : "bg-[var(--border)]"}`} />
          ))}
        </div>

        <div className="bg-[var(--app-bg)] rounded-3xl border-[3px] border-[var(--app-text)] shadow-[6px_6px_0_var(--app-text)] p-5 space-y-4">
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[var(--color-secondary)]/50">Asset Details</p>

          <div className="space-y-3">
            <div className="space-y-1">
              <label className="text-[10px] font-black uppercase tracking-wider text-[var(--color-secondary)]/60">Asset Name</label>
              <input value={form.name} onChange={(e) => set("name", e.target.value)} placeholder="e.g. 2020 Caterpillar Excavator 320"
                className="w-full border-2 border-[var(--border)] rounded-xl px-4 py-3 text-[13px] font-semibold text-[var(--app-text)] bg-[var(--app-bg)] outline-none focus:border-[var(--app-text)] transition-all placeholder:text-[var(--color-secondary)]/30" />
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-black uppercase tracking-wider text-[var(--color-secondary)]/60">Category</label>
              <select value={form.category} onChange={(e) => set("category", e.target.value)}
                className="w-full border-2 border-[var(--border)] rounded-xl px-4 py-3 text-[13px] font-semibold text-[var(--app-text)] bg-[var(--app-bg)] outline-none focus:border-[var(--app-text)] transition-all">
                <option value="">Select category</option>
                {ASSET_CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-wider text-[var(--color-secondary)]/60">Condition</label>
              <div className="flex flex-wrap gap-2">
                {CONDITIONS.map((c) => (
                  <button key={c} onClick={() => set("condition", c)}
                    className={`px-3 py-1.5 rounded-xl border-2 text-[10px] font-black uppercase tracking-wide transition-all ${form.condition === c ? "border-[var(--color-primary)] bg-[var(--color-primary)]/10 text-[var(--color-primary)]" : "border-[var(--border)] text-[var(--color-secondary)]/60"}`}>
                    {c}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-black uppercase tracking-wider text-[var(--color-secondary)]/60">Year of Manufacture</label>
              <input value={form.year} onChange={(e) => set("year", e.target.value)} placeholder="e.g. 2020" type="number"
                className="w-full border-2 border-[var(--border)] rounded-xl px-4 py-3 text-[13px] font-semibold text-[var(--app-text)] bg-[var(--app-bg)] outline-none focus:border-[var(--app-text)] transition-all placeholder:text-[var(--color-secondary)]/30" />
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-black uppercase tracking-wider text-[var(--color-secondary)]/60">Specifications</label>
              <textarea value={form.specs} onChange={(e) => set("specs", e.target.value)} rows={3}
                placeholder="Engine size, horsepower, capacity, model number..."
                className="w-full border-2 border-[var(--border)] rounded-xl px-4 py-3 text-[13px] font-semibold text-[var(--app-text)] bg-[var(--app-bg)] outline-none focus:border-[var(--app-text)] transition-all resize-none placeholder:text-[var(--color-secondary)]/30" />
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-black uppercase tracking-wider text-[var(--color-secondary)]/60">Description</label>
              <textarea value={form.description} onChange={(e) => set("description", e.target.value)} rows={4}
                placeholder="Full description of the asset, usage history, reason for selling..."
                className="w-full border-2 border-[var(--border)] rounded-xl px-4 py-3 text-[13px] font-semibold text-[var(--app-text)] bg-[var(--app-bg)] outline-none focus:border-[var(--app-text)] transition-all resize-none placeholder:text-[var(--color-secondary)]/30" />
            </div>
          </div>
        </div>
      </div>

      <div className="px-5 pt-4 pb-8">
        <button
          onClick={() => navigate("/marketplace/sell/complex/pricing", { state: { ...state, assetInfo: form } })}
          disabled={!canContinue}
          className="w-full py-4 rounded-2xl bg-[var(--color-secondary)] text-white font-black uppercase tracking-widest text-[12px] flex items-center justify-center gap-3 disabled:opacity-40 disabled:cursor-not-allowed active:scale-95 transition-all"
        >
          Save & Continue <ArrowRight size={18} />
        </button>
      </div>
    </div>
  );
}
