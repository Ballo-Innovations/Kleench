import { useState } from "react";
import { useNavigate, useLocation } from "react-router";
import { motion } from "motion/react";
import { Plus, X, ArrowRight, Trash2 } from "lucide-react";
import { PageHeader } from "../components/PageHeader";

type Package = { name: string; price: string; features: string[]; deliverables: string };

const DEFAULTS: Package[] = [
  { name: "Basic", price: "", features: [""], deliverables: "" },
  { name: "Standard", price: "", features: ["", ""], deliverables: "" },
  { name: "Premium", price: "", features: ["", "", ""], deliverables: "" },
];
const COLORS = ["#059669", "var(--color-primary)", "#7C3AED", "#DC2626", "#D97706", "#0077B6"];
const STEPS = 5;

export function SellServicePackages() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const [packages, setPackages] = useState<Package[]>(DEFAULTS);

  const updatePkg = (i: number, key: keyof Package, value: string) =>
    setPackages((p) => p.map((pkg, j) => j === i ? { ...pkg, [key]: value } : pkg));
  const updateFeature = (pi: number, fi: number, value: string) =>
    setPackages((p) => p.map((pkg, j) => j === pi ? { ...pkg, features: pkg.features.map((f, k) => k === fi ? value : f) } : pkg));
  const addFeature = (pi: number) =>
    setPackages((p) => p.map((pkg, j) => j === pi ? { ...pkg, features: [...pkg.features, ""] } : pkg));
  const removeFeature = (pi: number, fi: number) =>
    setPackages((p) => p.map((pkg, j) => j === pi ? { ...pkg, features: pkg.features.filter((_, k) => k !== fi) } : pkg));
  const deletePkg = (i: number) =>
    setPackages((p) => p.filter((_, j) => j !== i));
  const addPkg = () =>
    setPackages((p) => [...p, { name: `Package ${p.length + 1}`, price: "", features: [""], deliverables: "" }]);

  const canContinue = packages.every((p) => p.price.trim()) && packages.length > 0;

  return (
    <div className="w-full max-w-md mx-auto bg-transparent font-sans pb-24">
      <PageHeader title="PACKAGES" subtitle="Step 3 of 5 — Service Packages" showBack />

      <div className="px-5 pt-5 space-y-5">
        <div className="flex gap-1.5">
          {Array.from({ length: STEPS }).map((_, i) => (
            <div key={i} className={`h-1.5 flex-1 rounded-full ${i < 3 ? "bg-[var(--color-primary)]" : "bg-[var(--border)]"}`} />
          ))}
        </div>

        {packages.map((pkg, pi) => {
          const color = COLORS[pi % COLORS.length];
          return (
            <motion.div key={pi} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: pi * 0.05 }}
              className="bg-[var(--app-bg)] rounded-2xl border border-[var(--border)] shadow-sm overflow-hidden">
              {/* Header row: editable name + delete */}
              <div className="px-4 py-3 flex items-center gap-3" style={{ backgroundColor: color + "12", borderBottom: `1px solid ${color}30` }}>
                <input
                  value={pkg.name}
                  onChange={(e) => updatePkg(pi, "name", e.target.value)}
                  className="flex-1 text-[12px] font-black uppercase tracking-widest bg-transparent outline-none"
                  style={{ color }}
                />
                {packages.length > 1 && (
                  <button onClick={() => deletePkg(pi)}
                    className="w-7 h-7 rounded-lg flex items-center justify-center active:scale-90 transition-all"
                    style={{ backgroundColor: color + "20" }}>
                    <Trash2 size={12} style={{ color }} strokeWidth={2} />
                  </button>
                )}
              </div>

              <div className="p-4 space-y-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-black uppercase tracking-wider text-[var(--color-secondary)]/60">Price (ZMW)</label>
                  <input value={pkg.price} onChange={(e) => updatePkg(pi, "price", e.target.value)} type="number" placeholder="0.00"
                    className="w-full border border-[var(--border)] rounded-xl px-4 py-2.5 text-[13px] font-semibold text-[var(--app-text)] bg-[var(--app-bg)] outline-none focus:border-[var(--app-text)] transition-all placeholder:text-[var(--color-secondary)]/30" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-wider text-[var(--color-secondary)]/60">Features</label>
                  {pkg.features.map((f, fi) => (
                    <div key={fi} className="flex items-center gap-2">
                      <input value={f} onChange={(e) => updateFeature(pi, fi, e.target.value)} placeholder={`Feature ${fi + 1}`}
                        className="flex-1 border border-[var(--border)] rounded-xl px-3 py-2 text-[12px] font-semibold text-[var(--app-text)] bg-[var(--app-bg)] outline-none focus:border-[var(--app-text)] transition-all placeholder:text-[var(--color-secondary)]/30" />
                      {pkg.features.length > 1 && (
                        <button onClick={() => removeFeature(pi, fi)} className="w-7 h-7 rounded-lg border border-[var(--border)] flex items-center justify-center text-[var(--color-secondary)]/50 active:scale-90">
                          <X size={10} />
                        </button>
                      )}
                    </div>
                  ))}
                  <button onClick={() => addFeature(pi)}
                    className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-wide text-[var(--color-primary)] active:opacity-70">
                    <Plus size={12} strokeWidth={2.5} /> Add feature
                  </button>
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-black uppercase tracking-wider text-[var(--color-secondary)]/60">Deliverables</label>
                  <input value={pkg.deliverables} onChange={(e) => updatePkg(pi, "deliverables", e.target.value)} placeholder="e.g. 100 edited photos, full-day coverage"
                    className="w-full border border-[var(--border)] rounded-xl px-4 py-2.5 text-[12px] font-semibold text-[var(--app-text)] bg-[var(--app-bg)] outline-none focus:border-[var(--app-text)] transition-all placeholder:text-[var(--color-secondary)]/30" />
                </div>
              </div>
            </motion.div>
          );
        })}

        {/* Add Package */}
        <button onClick={addPkg}
          className="w-full flex items-center justify-center gap-2 py-3.5 rounded-2xl border border-dashed border-[var(--color-primary)]/40 text-[var(--color-primary)] active:opacity-70 transition-all">
          <Plus size={16} strokeWidth={2.5} />
          <span className="text-[11px] font-black uppercase tracking-widest">Add Package</span>
        </button>
      </div>

      <div className="px-5 pt-4 pb-8">
        <button
          onClick={() => navigate("/marketplace/sell/product/boost", { state: { ...state, packages } })}
          disabled={!canContinue}
          className="w-full py-4 rounded-2xl bg-[var(--color-secondary)] text-white font-black uppercase tracking-widest text-[12px] flex items-center justify-center gap-3 disabled:opacity-40 disabled:cursor-not-allowed active:scale-95 transition-all"
        >
          Continue <ArrowRight size={18} />
        </button>
      </div>
    </div>
  );
}
