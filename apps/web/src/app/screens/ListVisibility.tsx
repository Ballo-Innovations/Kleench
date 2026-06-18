import { useState } from "react";
import { useNavigate, useLocation } from "react-router";
import { motion } from "motion/react";
import { Globe, Lock, Map, MapPin, CheckSquare, Square } from "lucide-react";
import { PageHeader } from "../components/PageHeader";
import { CtaButton } from "../components/CtaButton";

export function ListVisibility() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const isPriority = state?.listingType === "priority";
  const totalSteps = isPriority ? 10 : 8;
  const stepIndex = isPriority ? 9 : 7;

  const [visibility, setVisibility] = useState<"public" | "private">("public");
  const [area, setArea] = useState<"nationwide" | "specific">("nationwide");
  const [province, setProvince] = useState("");
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  const PROVINCES = ["Lusaka", "Copperbelt", "Eastern", "Southern", "Western", "Northern", "North-Western", "Luapula", "Muchinga", "Central"];

  const canContinue = visibility && area && (area === "nationwide" || province) && agreedToTerms;
  const nextPath = isPriority ? "/marketplace/list/priority/success" : "/marketplace/list/success";

  return (
    <div className="w-full bg-transparent font-sans pb-24">
      <PageHeader title="LIST YOUR BUSINESS" subtitle={`Step ${stepIndex} — Visibility`} showBack />

      <div className="px-5 pt-5 space-y-5">
        <div className="flex gap-1.5">
          {Array.from({ length: totalSteps }).map((_, i) => (
            <div key={i} className={`h-1.5 flex-1 rounded-full ${i < stepIndex ? "bg-[var(--color-primary)]" : "bg-[var(--border)]"}`} />
          ))}
        </div>

        {/* Visibility */}
        <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}
          className="bg-[var(--app-bg)] border border-[var(--border)] rounded-2xl shadow-sm p-5 space-y-4">
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[var(--color-secondary)]/50">Business Visibility</p>
          <div className="space-y-2.5">
            {([
              { id: "public" as const, label: "Public", sub: "Visible to everyone on Kleench Market", icon: Globe, recommended: true },
              { id: "private" as const, label: "Private (Hidden)", sub: "Only visible to select audience", icon: Lock },
            ]).map((opt) => {
              const Icon = opt.icon;
              const isSelected = visibility === opt.id;
              return (
                <button key={opt.id} onClick={() => setVisibility(opt.id)}
                  className={`w-full flex items-center gap-3 p-4 rounded-xl border-2 text-left transition-all active:scale-[0.98] ${isSelected ? "border-[var(--color-primary)] bg-[var(--color-primary)]/6" : "border-[var(--border)]"}`}>
                  <div className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${isSelected ? "bg-[var(--color-primary)]/12" : "bg-[var(--border)]/30"}`}>
                    <Icon size={17} color={isSelected ? "var(--color-primary)" : "var(--color-secondary)"} strokeWidth={1.8} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <p className={`text-[12px] font-black uppercase tracking-wide ${isSelected ? "text-[var(--color-primary)]" : "text-[var(--app-text)]"}`}>{opt.label}</p>
                      {opt.recommended && <span className="text-[7px] font-black px-1.5 py-0.5 rounded bg-[var(--color-primary)] text-white uppercase tracking-widest">Recommended</span>}
                    </div>
                    <p className="text-[10px] font-semibold text-[var(--color-secondary)]/55 mt-0.5">{opt.sub}</p>
                  </div>
                  <div className={`w-5 h-5 rounded-full border-2 shrink-0 flex items-center justify-center ${isSelected ? "border-[var(--color-primary)] bg-[var(--color-primary)]" : "border-[var(--border)]"}`}>
                    {isSelected && <div className="w-2 h-2 rounded-full bg-white" />}
                  </div>
                </button>
              );
            })}
          </div>
        </motion.div>

        {/* Service Area */}
        <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }}
          className="bg-[var(--app-bg)] border border-[var(--border)] rounded-2xl shadow-sm p-5 space-y-4">
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[var(--color-secondary)]/50">Service Area</p>
          <p className="text-[11px] font-semibold text-[var(--color-secondary)]/60">Where do you offer your service?</p>
          <div className="space-y-2">
            <button onClick={() => setArea("nationwide")}
              className={`w-full py-3.5 rounded-xl font-black text-[12px] uppercase tracking-widest transition-all active:scale-[0.98] ${area === "nationwide" ? "bg-[var(--color-primary)] text-white shadow-md" : "bg-[var(--border)]/30 text-[var(--color-secondary)]/60"}`}>
              Nationwide
            </button>
            <button onClick={() => setArea("specific")}
              className={`w-full py-3.5 rounded-xl font-black text-[12px] uppercase tracking-widest transition-all active:scale-[0.98] border-2 ${area === "specific" ? "border-[var(--color-primary)] text-[var(--color-primary)] bg-[var(--color-primary)]/6" : "border-[var(--border)] text-[var(--color-secondary)]/60"}`}>
              Select Specific Areas
            </button>
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

        {/* T&C */}
        <button onClick={() => setAgreedToTerms(!agreedToTerms)}
          className="flex items-center gap-3 active:scale-[0.98] transition-all">
          {agreedToTerms
            ? <CheckSquare size={18} className="text-[var(--color-primary)] shrink-0" strokeWidth={2} />
            : <Square size={18} className="text-[var(--color-secondary)]/40 shrink-0" strokeWidth={2} />
          }
          <p className="text-[11px] font-semibold text-[var(--color-secondary)]/70 text-left leading-snug">
            I agree to the <span className="text-[var(--color-primary)] font-black underline">Terms & Conditions</span> and <span className="text-[var(--color-primary)] font-black underline">Privacy Policy</span>
          </p>
        </button>
      </div>

      <div className="px-5 pt-4 pb-8 space-y-3">
        <CtaButton onClick={() => navigate(nextPath, { state: { ...state, visibility, area, province } })} disabled={!canContinue}>{isPriority ? "Publish Priority Listing" : "Publish Listing"}</CtaButton>
        <button onClick={() => navigate("/marketplace")}
          className="w-full py-4 rounded-2xl border border-[var(--border)] bg-[var(--app-bg)] text-[var(--color-secondary)] font-black uppercase tracking-widest text-[12px] active:scale-95 transition-all">
          Save as Draft
        </button>
      </div>
    </div>
  );
}
