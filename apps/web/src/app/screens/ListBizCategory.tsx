import { useState } from "react";
import { useNavigate, useLocation } from "react-router";
import { motion } from "motion/react";
import { Search, ChevronRight } from "lucide-react";
import { PageHeader } from "../components/PageHeader";
import { CtaButton } from "../components/CtaButton";
import {
  DuotoneConstruction,
  DuotoneStorefront,
  DuotoneTruck,
  DuotoneHotel,
  DuotoneGradCap,
  DuotoneMedical,
  DuotoneMonitor,
  DuotoneWheat,
  DuotoneBank,
  DuotoneFork,
  DuotoneLightning,
  DuotoneGrid,
} from "../components/DuotoneIcon";

const CATEGORIES = [
  { id: "Construction", Icon: DuotoneConstruction },
  { id: "Retail & Shopping", Icon: DuotoneStorefront },
  { id: "Transport & Logistics", Icon: DuotoneTruck },
  { id: "Hospitality & Tourism", Icon: DuotoneHotel },
  { id: "Education", Icon: DuotoneGradCap },
  { id: "Health & Wellness", Icon: DuotoneMedical },
  { id: "Technology", Icon: DuotoneMonitor },
  { id: "Agriculture", Icon: DuotoneWheat },
  { id: "Finance & Banking", Icon: DuotoneBank },
  { id: "Food & Beverage", Icon: DuotoneFork },
  { id: "Energy & Mining", Icon: DuotoneLightning },
  { id: "Others", Icon: DuotoneGrid },
];

export function ListBizCategory() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const totalSteps = state?.listingType === "priority" ? 10 : 8;

  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState("");

  const filtered = CATEGORIES.filter((c) =>
    c.id.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="w-full bg-transparent font-sans pb-24">
      <PageHeader title="LIST YOUR BUSINESS" subtitle="Step 3 — Category" showBack />

      <div className="px-5 pt-5 space-y-5">
        <div className="flex gap-1.5">
          {Array.from({ length: totalSteps }).map((_, i) => (
            <div key={i} className={`h-1.5 flex-1 rounded-full ${i < 3 ? "bg-[var(--color-primary)]" : "bg-[var(--border)]"}`} />
          ))}
        </div>

        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[var(--color-secondary)]/50">
          Select a category that best describes your business
        </p>

        {/* Search */}
        <div className="flex items-center gap-2 border border-[var(--border)] rounded-2xl px-4 py-3 bg-[var(--app-bg)] shadow-sm">
          <Search size={15} className="text-[var(--color-secondary)]/40 shrink-0" strokeWidth={2} />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search category"
            className="flex-1 bg-transparent text-[13px] font-semibold text-[var(--app-text)] outline-none placeholder:text-[var(--color-secondary)]/30"
          />
        </div>

        {/* Category list */}
        <div className="bg-[var(--app-bg)] border border-[var(--border)] rounded-2xl shadow-sm overflow-hidden">
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[var(--color-secondary)]/50 px-4 pt-4 pb-2">Popular Categories</p>
          {filtered.map((cat) => {
            const { Icon } = cat;
            const isSelected = selected === cat.id;
            return (
              <motion.button
                key={cat.id}
                whileTap={{ scale: 0.98 }}
                onClick={() => setSelected(cat.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 border-t border-[var(--border)] first:border-0 text-left transition-all ${
                  isSelected ? "bg-[var(--color-primary)]/6" : ""
                }`}
              >
                <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 transition-colors ${
                  isSelected ? "bg-[var(--color-secondary)]/12" : "bg-[var(--border)]/40"
                }`}>
                  <Icon
                    size={20}
                    primary={isSelected ? "var(--color-secondary)" : "var(--color-secondary)"}
                    secondaryOpacity={isSelected ? 0.35 : 0.2}
                  />
                </div>
                <p className={`flex-1 text-[13px] font-bold transition-colors ${isSelected ? "text-[var(--color-primary)]" : "text-[var(--app-text)]"}`}>
                  {cat.id}
                </p>
                {isSelected ? (
                  <div className="w-5 h-5 rounded-full bg-[var(--color-primary)] flex items-center justify-center shrink-0">
                    <div className="w-2 h-2 rounded-full bg-white" />
                  </div>
                ) : (
                  <ChevronRight size={15} className="text-[var(--color-secondary)]/30 shrink-0" strokeWidth={2} />
                )}
              </motion.button>
            );
          })}
        </div>
      </div>

      <div className="px-5 pt-4 pb-8">
        <CtaButton onClick={() => navigate("/marketplace/list/upload", { state: { ...state, category: selected } })} disabled={!selected}>Continue</CtaButton>
      </div>
    </div>
  );
}
