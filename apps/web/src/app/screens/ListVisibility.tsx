import { useState } from "react";
import { useNavigate, useLocation } from "react-router";
import { motion } from "motion/react";
import { ArrowRight, Globe, Lock, MapPin, Map } from "lucide-react";
import { PageHeader } from "../components/PageHeader";

export function ListVisibility() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const isPriority = state?.listingType === "priority";
  const totalSteps = isPriority ? 10 : 8;
  const stepIndex = isPriority ? 9 : 7;

  const [visibility, setVisibility] = useState<"public" | "private">("public");
  const [area, setArea] = useState<"nationwide" | "specific">("nationwide");
  const [province, setProvince] = useState("");

  const PROVINCES = ["Lusaka", "Copperbelt", "Eastern", "Southern", "Western", "Northern", "North-Western", "Luapula", "Muchinga", "Central"];

  const canContinue = visibility && area && (area === "nationwide" || province);
  const nextPath = isPriority ? "/marketplace/list/priority/success" : "/marketplace/list/success";

  return (
    <div className="w-full max-w-md mx-auto min-h-screen bg-transparent font-sans pb-32">
      <PageHeader title="LIST YOUR BUSINESS" subtitle={`Step ${stepIndex} — Visibility`} showBack />

      <div className="px-5 pt-5 space-y-5">
        <div className="flex gap-1.5">
          {Array.from({ length: totalSteps }).map((_, i) => (
            <div key={i} className={`h-1.5 flex-1 rounded-full ${i < stepIndex ? "bg-[var(--color-primary)]" : "bg-[var(--border)]"}`} />
          ))}
        </div>

        <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}
          className="bg-[var(--app-bg)] border border-[var(--border)] rounded-2xl shadow-sm p-5 space-y-4">
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[var(--color-secondary)]/50">Listing Visibility</p>
          <div className="grid grid-cols-2 gap-2.5">
            {([
              { id: "public" as const, label: "Public", desc: "Visible to all", icon: Globe },
              { id: "private" as const, label: "Private", desc: "By referral only", icon: Lock },
            ]).map((opt) => {
              const Icon = opt.icon;
              return (
                <button key={opt.id} onClick={() => setVisibility(opt.id)}
                  className={`p-3.5 rounded-xl border text-left transition-all ${visibility === opt.id ? "border-[var(--color-primary)] bg-[var(--color-primary)]/8" : "border-[var(--border)]"}`}>
                  <Icon size={18} color={visibility === opt.id ? "var(--color-primary)" : "var(--color-secondary)"} strokeWidth={1.5} />
                  <p className={`text-[11px] font-black uppercase tracking-wide mt-1.5 ${visibility === opt.id ? "text-[var(--color-primary)]" : "text-[var(--app-text)]"}`}>{opt.label}</p>
                  <p className="text-[9px] font-semibold text-[var(--color-secondary)]/50 mt-0.5">{opt.desc}</p>
                </button>
              );
            })}
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
          className="bg-[var(--app-bg)] border border-[var(--border)] rounded-2xl shadow-sm p-5 space-y-4">
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[var(--color-secondary)]/50">Coverage Area</p>
          <div className="grid grid-cols-2 gap-2.5">
            {([
              { id: "nationwide" as const, label: "Nationwide", desc: "All provinces", icon: Map },
              { id: "specific" as const, label: "Specific Area", desc: "Select province", icon: MapPin },
            ]).map((opt) => {
              const Icon = opt.icon;
              return (
                <button key={opt.id} onClick={() => setArea(opt.id)}
                  className={`p-3.5 rounded-xl border text-left transition-all ${area === opt.id ? "border-[var(--color-primary)] bg-[var(--color-primary)]/8" : "border-[var(--border)]"}`}>
                  <Icon size={18} color={area === opt.id ? "var(--color-primary)" : "var(--color-secondary)"} strokeWidth={1.5} />
                  <p className={`text-[11px] font-black uppercase tracking-wide mt-1.5 ${area === opt.id ? "text-[var(--color-primary)]" : "text-[var(--app-text)]"}`}>{opt.label}</p>
                  <p className="text-[9px] font-semibold text-[var(--color-secondary)]/50 mt-0.5">{opt.desc}</p>
                </button>
              );
            })}
          </div>

          {area === "specific" && (
            <div className="flex flex-wrap gap-2 pt-1">
              {PROVINCES.map((p) => (
                <button key={p} onClick={() => setProvince(p)}
                  className={`px-3 py-1.5 rounded-xl border text-[10px] font-black uppercase tracking-wide transition-all ${province === p ? "border-[var(--color-primary)] bg-[var(--color-primary)]/10 text-[var(--color-primary)]" : "border-[var(--border)] text-[var(--color-secondary)]/60"}`}>
                  {p}
                </button>
              ))}
            </div>
          )}
        </motion.div>
      </div>

      <div className="px-5 pt-4 pb-8">
        <button onClick={() => navigate(nextPath, { state: { ...state, visibility, area, province } })}
          disabled={!canContinue}
          className="w-full py-4 rounded-2xl bg-[var(--color-secondary)] text-white font-black uppercase tracking-widest text-[12px] flex items-center justify-center gap-3 disabled:opacity-40 disabled:cursor-not-allowed active:scale-95 transition-all">
          Publish Listing <ArrowRight size={18} />
        </button>
      </div>
    </div>
  );
}
