import { useState } from "react";
import { useNavigate } from "react-router";
import { motion } from "motion/react";
import { User, Building2 } from "lucide-react";
import { PageHeader } from "../components/PageHeader";
import { CtaButton } from "../components/CtaButton";

const PROVIDER_TYPES = [
  { id: "individual", label: "Individual", desc: "Freelancer or solo professional", icon: User },
  { id: "business", label: "Business", desc: "Registered company or agency", icon: Building2 },
];

const SERVICE_CATEGORIES = [
  { id: "marketing", label: "Marketing", examples: "Social media, SEO, ads" },
  { id: "events", label: "Events", examples: "Wedding planning, catering, MC" },
  { id: "technology", label: "Technology", examples: "Web dev, software, IT support" },
  { id: "education", label: "Education", examples: "Tutoring, training, coaching" },
  { id: "construction", label: "Construction", examples: "Building, plumbing, electrical" },
  { id: "hospitality", label: "Hospitality", examples: "Catering, cleaning, security" },
  { id: "finance", label: "Finance", examples: "Accounting, tax, legal" },
  { id: "health", label: "Health", examples: "Nursing, counselling, therapy" },
];

const STEPS = 5;

export function SellServiceEntry() {
  const navigate = useNavigate();
  const [providerType, setProviderType] = useState<"individual" | "business" | "">("");
  const [serviceCategory, setServiceCategory] = useState("");

  const canContinue = !!providerType && !!serviceCategory;

  return (
    <div className="w-full max-w-md mx-auto bg-transparent font-sans pb-24">
      <PageHeader title="CREATE SERVICE" subtitle="Step 1 of 5 — Provider & Category" showBack />

      <div className="px-5 pt-5 space-y-5">
        {/* Progress */}
        <div className="flex gap-1.5">
          {Array.from({ length: STEPS }).map((_, i) => (
            <div key={i} className={`h-1.5 flex-1 rounded-full transition-colors ${i < 1 ? "bg-[var(--color-primary)]" : "bg-[var(--border)]"}`} />
          ))}
        </div>

        {/* Provider Type */}
        <div className="bg-[var(--app-bg)] rounded-2xl border border-[var(--border)] shadow-sm p-5 space-y-3">
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[var(--color-secondary)]/50">Provider Type</p>
          <div className="flex gap-3">
            {PROVIDER_TYPES.map((pt) => {
              const Icon = pt.icon;
              const active = providerType === pt.id;
              return (
                <motion.button key={pt.id} whileTap={{ scale: 0.97 }} onClick={() => setProviderType(pt.id as "individual" | "business")}
                  className={`flex-1 flex flex-col items-center gap-2 py-4 rounded-2xl border transition-all ${
                    active ? "border-[var(--color-primary)] bg-[var(--color-primary)]/8" : "border-[var(--border)] bg-[var(--app-bg)]"
                  }`}>
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${active ? "bg-[var(--color-primary)]/15" : "bg-[var(--border)]/30"}`}>
                    <Icon size={20} color={active ? "var(--color-primary)" : "var(--color-secondary)"} strokeWidth={2} />
                  </div>
                  <p className={`text-[11px] font-black uppercase tracking-wide ${active ? "text-[var(--app-text)]" : "text-[var(--color-secondary)]/70"}`}>{pt.label}</p>
                  <p className="text-[9px] font-semibold text-[var(--color-secondary)]/50 text-center px-1 leading-snug">{pt.desc}</p>
                </motion.button>
              );
            })}
          </div>
        </div>

        {/* Service Category */}
        <div className="bg-[var(--app-bg)] rounded-2xl border border-[var(--border)] shadow-sm p-5 space-y-3">
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[var(--color-secondary)]/50">Service Category</p>
          <div className="space-y-2">
            {SERVICE_CATEGORIES.map((cat) => {
              const active = serviceCategory === cat.id;
              return (
                <button key={cat.id} onClick={() => setServiceCategory(cat.id)}
                  className={`w-full flex items-center justify-between px-4 py-3 rounded-xl border transition-all text-left ${
                    active ? "border-[var(--color-primary)] bg-[var(--color-primary)]/8" : "border-[var(--border)] bg-[var(--app-bg)]"
                  }`}>
                  <div>
                    <p className="text-[12px] font-black uppercase tracking-wide text-[var(--app-text)]">{cat.label}</p>
                    <p className="text-[9px] font-semibold text-[var(--color-secondary)]/50 mt-0.5">{cat.examples}</p>
                  </div>
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 ${active ? "border-[var(--color-primary)] bg-[var(--color-primary)]" : "border-[var(--border)]"}`}>
                    {active && <div className="w-2 h-2 rounded-full bg-white" />}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <div className="px-5 pt-4 pb-8">
        <CtaButton onClick={() => navigate("/marketplace/sell/service/info", { state: { sellType: "service", providerType, serviceCategory } })} disabled={!canContinue}>Continue</CtaButton>
      </div>
    </div>
  );
}
