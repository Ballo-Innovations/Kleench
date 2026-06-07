import { useState } from "react";
import { useNavigate, useLocation } from "react-router";
import { motion } from "motion/react";
import { ArrowRight, Upload, Image, FileText } from "lucide-react";
import { PageHeader } from "../components/PageHeader";

export function ListUpload() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const totalSteps = state?.listingType === "priority" ? 10 : 8;

  const [hasLogo, setHasLogo] = useState(false);
  const [hasCover, setHasCover] = useState(false);
  const [hasDocs, setHasDocs] = useState(false);

  const UPLOADS = [
    { key: "logo", label: "Business Logo", desc: "PNG or JPG, square format recommended", icon: Image, required: true, state: hasLogo, set: setHasLogo },
    { key: "cover", label: "Cover Image", desc: "Banner image for your business profile", icon: Image, required: false, state: hasCover, set: setHasCover },
    { key: "docs", label: "Registration Documents", desc: "PACRA certificate or equivalent (optional)", icon: FileText, required: false, state: hasDocs, set: setHasDocs },
  ];

  const canContinue = hasLogo;

  return (
    <div className="w-full max-w-md mx-auto min-h-screen bg-transparent font-sans pb-32">
      <PageHeader title="LIST YOUR BUSINESS" subtitle="Step 4 — Upload Profile" showBack />

      <div className="px-5 pt-5 space-y-5">
        <div className="flex gap-1.5">
          {Array.from({ length: totalSteps }).map((_, i) => (
            <div key={i} className={`h-1.5 flex-1 rounded-full ${i < 4 ? "bg-[var(--color-primary)]" : "bg-[var(--border)]"}`} />
          ))}
        </div>

        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[var(--color-secondary)]/50">Upload your business assets</p>

        <div className="space-y-3">
          {UPLOADS.map((item) => {
            const Icon = item.icon;
            return (
              <motion.div key={item.key} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}
                className={`bg-[var(--app-bg)] border rounded-2xl shadow-sm p-4 ${item.state ? "border-[var(--color-primary)]/40" : "border-[var(--border)]"}`}>
                <div className="flex items-center gap-3 mb-3">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${item.state ? "bg-[var(--color-primary)]/15" : "bg-[var(--border)]/30"}`}>
                    <Icon size={18} color={item.state ? "var(--color-primary)" : "var(--color-secondary)"} strokeWidth={1.5} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-1.5">
                      <p className="text-[12px] font-black text-[var(--app-text)] uppercase tracking-wide">{item.label}</p>
                      {item.required && <span className="text-[var(--color-primary)] text-[10px] font-black">*</span>}
                    </div>
                    <p className="text-[10px] font-semibold text-[var(--color-secondary)]/50">{item.desc}</p>
                  </div>
                  {item.state && (
                    <span className="text-[8px] font-black uppercase tracking-widest text-[var(--color-primary)] bg-[var(--color-primary)]/10 px-2 py-0.5 rounded-full">Uploaded</span>
                  )}
                </div>
                <button onClick={() => item.set(!item.state)}
                  className={`w-full py-3 rounded-xl border-2 border-dashed text-[10px] font-black uppercase tracking-widest flex items-center justify-center gap-2 transition-all active:scale-95 ${item.state ? "border-[var(--color-primary)]/40 text-[var(--color-primary)]" : "border-[var(--border)] text-[var(--color-secondary)]/50"}`}>
                  <Upload size={14} strokeWidth={2} />
                  {item.state ? "Replace File" : "Tap to Upload"}
                </button>
              </motion.div>
            );
          })}
        </div>
      </div>

      <div className="px-5 pt-4 pb-8">
        <button onClick={() => navigate("/marketplace/list/detail", { state: { ...state, hasLogo, hasCover, hasDocs } })}
          disabled={!canContinue}
          className="w-full py-4 rounded-2xl bg-[var(--color-secondary)] text-white font-black uppercase tracking-widest text-[12px] flex items-center justify-center gap-3 disabled:opacity-40 disabled:cursor-not-allowed active:scale-95 transition-all">
          Continue <ArrowRight size={18} />
        </button>
      </div>
    </div>
  );
}
