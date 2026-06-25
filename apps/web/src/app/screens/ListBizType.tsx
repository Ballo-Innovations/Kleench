import { useState } from "react";
import { useNavigate, useLocation } from "react-router";
import { motion } from "motion/react";
import { CtaButton } from "../components/CtaButton";
import { PageHeader } from "../components/PageHeader";
import {
  DuotoneBuilding,
  DuotoneStorefront,
  DuotoneUser,
  DuotoneHeart,
  DuotoneGlobe,
} from "../components/DuotoneIcon";

const BIZ_TYPES = [
  { id: "Local Company", desc: "Registered business or organization (PACRA)", Icon: DuotoneBuilding },
  { id: "SME / Small Business", desc: "Small & medium-sized enterprise", Icon: DuotoneStorefront },
  { id: "Sole Proprietor", desc: "Individual running a business", Icon: DuotoneUser },
  { id: "Non-Profit / NGO", desc: "Organization with a social mission", Icon: DuotoneHeart },
  { id: "International / Multinational", desc: "Foreign or multi-country company", Icon: DuotoneGlobe },
];

export function ListBizType() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const totalSteps = state?.listingType === "priority" ? 10 : 8;
  const [selected, setSelected] = useState("");

  return (
    <div className="w-full bg-transparent font-sans pb-24">
      <PageHeader title="LIST YOUR BUSINESS" subtitle="Step 2 — Type of Business" showBack />

      <div className="px-5 pt-5 space-y-5">
        <div className="flex gap-1.5">
          {Array.from({ length: totalSteps }).map((_, i) => (
            <div key={i} className={`h-1.5 flex-1 rounded-full ${i < 2 ? "bg-[var(--color-primary)]" : "bg-[var(--border)]"}`} />
          ))}
        </div>

        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[var(--color-secondary)]/50">What type of business is this?</p>

        <div className="space-y-2.5">
          {BIZ_TYPES.map((opt, i) => {
            const { Icon } = opt;
            const isSelected = selected === opt.id;
            return (
              <motion.button key={opt.id} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
                whileTap={{ scale: 0.98 }} onClick={() => setSelected(opt.id)}
                className={`w-full flex items-center gap-4 p-4 rounded-2xl border transition-all text-left ${isSelected ? "border-[var(--color-primary)] bg-[var(--color-primary)]/6 shadow-sm" : "border-[var(--border)] bg-[var(--app-bg)] shadow-sm"}`}>
                <div className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 transition-colors ${isSelected ? "bg-[var(--color-secondary)]/12" : "bg-[var(--border)]/40"}`}>
                  <Icon
                    size={22}
                    primary="var(--color-secondary)"
                    secondaryOpacity={isSelected ? 0.35 : 0.2}
                  />
                </div>
                <div className="flex-1">
                  <p className="text-[13px] font-black text-[var(--app-text)] uppercase tracking-wide">{opt.id}</p>
                  <p className="text-[10px] font-semibold text-[var(--color-secondary)]/60 mt-0.5">{opt.desc}</p>
                </div>
                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 ${isSelected ? "border-[var(--color-primary)] bg-[var(--color-primary)]" : "border-[var(--border)]"}`}>
                  {isSelected && <div className="w-2 h-2 rounded-full bg-white" />}
                </div>
              </motion.button>
            );
          })}
        </div>
      </div>

      <div className="px-5 pt-6 pb-8">
        <CtaButton onClick={() => navigate("/marketplace/list/category", { state: { ...state, bizType: selected } })} disabled={!selected}>Continue</CtaButton>
      </div>
    </div>
  );
}
