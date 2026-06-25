import { useState } from "react";
import { useNavigate } from "react-router";
import { motion } from "motion/react";
import { CtaButton } from "../components/CtaButton";
import { PageHeader } from "../components/PageHeader";
import {
  DuotoneBriefcase,
  DuotoneTag,
  DuotoneShieldCheck,
  DuotoneUsers,
  DuotoneGlobe,
} from "../components/DuotoneIcon";

const SELL_TYPES = [
  {
    id: "product" as const,
    label: "Sell a Product",
    sub: "Sell physical or digital products",
    Icon: DuotoneTag,
  },
  {
    id: "service" as const,
    label: "Offer a Service",
    sub: "List services and get bookings",
    Icon: DuotoneBriefcase,
  },
];

const SALE_TYPES = [
  {
    id: "simple" as const,
    label: "Simple Sale",
    desc: "Straight forward sales with a fixed price",
    Icon: DuotoneTag,
  },
  {
    id: "ordinary" as const,
    label: "Ordinary Sale",
    desc: "Covers third party, fire and theft of vehicle",
    Icon: DuotoneShieldCheck,
  },
  {
    id: "complex" as const,
    label: "Complex Sale",
    desc: "Involves multiple options, customization or contracts",
    Icon: DuotoneUsers,
  },
];

export function SellHub() {
  const navigate = useNavigate();
  const [sellType, setSellType] = useState<"product" | "service" | null>(null);
  const [saleType, setSaleType] = useState<"simple" | "ordinary" | "complex">("simple");

  const canContinue = !!sellType;

  const handleContinue = () => {
    navigate("/marketplace/sell/identity", { state: { sellType, saleType } });
  };

  return (
    <div className="w-full bg-transparent font-sans pb-24">
      <PageHeader title="SELL" showBack />

      <div className="px-5 pt-5 space-y-6">

        {/* What would you like to do */}
        <div className="space-y-3">
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[var(--color-secondary)]/50">
            What would you like to do?
          </p>
          <div className="grid grid-cols-2 gap-3">
            {SELL_TYPES.map(({ id, label, sub, Icon }) => {
              const isSelected = sellType === id;
              return (
                <motion.button
                  key={id}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => setSellType(id)}
                  className={`p-4 rounded-2xl border-2 text-left transition-all ${
                    isSelected
                      ? "border-[var(--color-primary)] bg-[var(--color-primary)]/8"
                      : "border-[var(--border)] bg-[var(--app-bg)]"
                  }`}
                >
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 ${
                    isSelected ? "bg-[var(--color-secondary)]/12" : "bg-[var(--border)]/40"
                  }`}>
                    <Icon size={20} primary="var(--color-secondary)" secondaryOpacity={isSelected ? 0.35 : 0.2} />
                  </div>
                  <p className={`text-[11px] font-black uppercase tracking-wide leading-tight ${
                    isSelected ? "text-[var(--color-primary)]" : "text-[var(--app-text)]"
                  }`}>{label}</p>
                  <p className="text-[9px] font-semibold text-[var(--color-secondary)]/50 mt-0.5 leading-snug">{sub}</p>
                </motion.button>
              );
            })}
          </div>
        </div>

        {/* Select Sale Type */}
        <div className="space-y-3">
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[var(--color-secondary)]/50">
            Select Sale Type
          </p>
          <p className="text-[10px] font-semibold text-[var(--color-secondary)]/50 -mt-1">
            Choose the type of sale that best describes your offering.
          </p>
          <div className="space-y-2.5">
            {SALE_TYPES.map(({ id, label, desc, Icon }) => {
              const isSelected = saleType === id;
              return (
                <motion.button
                  key={id}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setSaleType(id)}
                  className={`w-full flex items-center gap-3 p-4 rounded-2xl border transition-all text-left ${
                    isSelected
                      ? "border-[var(--color-primary)] bg-[var(--color-primary)]/6 shadow-sm"
                      : "border-[var(--border)] bg-[var(--app-bg)] shadow-sm"
                  }`}
                >
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-colors ${
                    isSelected ? "bg-[var(--color-secondary)]/12" : "bg-[var(--border)]/40"
                  }`}>
                    <Icon size={20} primary="var(--color-secondary)" secondaryOpacity={isSelected ? 0.35 : 0.2} />
                  </div>
                  <div className="flex-1">
                    <p className={`text-[12px] font-black uppercase tracking-wide ${
                      isSelected ? "text-[var(--color-primary)]" : "text-[var(--app-text)]"
                    }`}>{label}</p>
                    <p className="text-[10px] font-semibold text-[var(--color-secondary)]/55 mt-0.5 leading-snug">{desc}</p>
                  </div>
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 ${
                    isSelected ? "border-[var(--color-primary)] bg-[var(--color-primary)]" : "border-[var(--border)]"
                  }`}>
                    {isSelected && <div className="w-2 h-2 rounded-full bg-white" />}
                  </div>
                </motion.button>
              );
            })}
          </div>
        </div>
      </div>

      <div className="px-5 pt-6 pb-8">
        <CtaButton onClick={handleContinue} disabled={!canContinue}>Continue</CtaButton>
      </div>
    </div>
  );
}
