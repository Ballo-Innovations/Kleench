import { useState } from "react";
import { useNavigate, useLocation } from "react-router";
import { motion } from "motion/react";
import { CheckSquare, Square } from "lucide-react";
import { CtaButton } from "../components/CtaButton";
import { PageHeader } from "../components/PageHeader";
import {
  DuotoneUser,
  DuotoneBuilding,
  DuotoneShieldCheck,
  DuotoneFileText,
} from "../components/DuotoneIcon";

export function SellIdentity() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const [sellerType, setSellerType] = useState<"individual" | "business" | null>(null);
  const [kycDone, setKycDone] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);

  const getNextRoute = () => {
    const { sellType, saleType } = state || {};
    if (sellType === "service") return "/marketplace/sell/service/category";
    if (saleType === "complex") return "/marketplace/sell/complex/info";
    return "/marketplace/sell/product/info";
  };

  const handleContinue = () => {
    if (!sellerType || !termsAccepted) return;
    navigate(getNextRoute(), { state: { ...state, sellerType, kycDone } });
  };

  const SELLER_OPTS = [
    { id: "individual" as const, label: "Individual", desc: "Personal seller — no business registration needed", Icon: DuotoneUser },
    { id: "business" as const, label: "Business", desc: "Registered company or enterprise", Icon: DuotoneBuilding },
  ];

  return (
    <div className="w-full bg-transparent font-sans pb-24">
      <PageHeader title="WHO ARE YOU?" subtitle="Choose how you want to register on Market Sell." showBack />

      <div className="px-5 pt-5 space-y-5">

        {/* Seller type */}
        <div className="space-y-2.5">
          {SELLER_OPTS.map(({ id, label, desc, Icon }) => {
            const isSelected = sellerType === id;
            return (
              <motion.button
                key={id}
                whileTap={{ scale: 0.98 }}
                onClick={() => setSellerType(id)}
                className={`w-full flex items-center gap-4 p-4 rounded-2xl border-2 transition-all text-left ${
                  isSelected
                    ? "border-[var(--color-primary)] bg-[var(--color-primary)]/6 shadow-sm"
                    : "border-[var(--border)] bg-[var(--app-bg)] shadow-sm"
                }`}
              >
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 transition-colors ${
                  isSelected ? "bg-[var(--color-secondary)]/12" : "bg-[var(--border)]/40"
                }`}>
                  <Icon size={24} primary="var(--color-secondary)" secondaryOpacity={isSelected ? 0.35 : 0.2} />
                </div>
                <div className="flex-1">
                  <p className={`text-[13px] font-black uppercase tracking-wide ${
                    isSelected ? "text-[var(--color-primary)]" : "text-[var(--app-text)]"
                  }`}>{label}</p>
                  <p className="text-[10px] font-semibold text-[var(--color-secondary)]/60 mt-0.5">{desc}</p>
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

        {/* KYC */}
        <motion.button
          whileTap={{ scale: 0.98 }}
          onClick={() => setKycDone(!kycDone)}
          className={`w-full flex items-center gap-4 p-4 rounded-2xl border-2 transition-all text-left ${
            kycDone
              ? "border-[#059669] bg-[#059669]/6 shadow-sm"
              : "border-[var(--border)] bg-[var(--app-bg)] shadow-sm"
          }`}
        >
          <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${
            kycDone ? "bg-[#059669]/12" : "bg-[var(--border)]/40"
          }`}>
            <DuotoneShieldCheck
              size={24}
              primary={kycDone ? "#059669" : "var(--color-secondary)"}
              secondaryOpacity={kycDone ? 0.35 : 0.2}
            />
          </div>
          <div className="flex-1">
            <p className={`text-[13px] font-black uppercase tracking-wide ${kycDone ? "text-[#059669]" : "text-[var(--app-text)]"}`}>
              KYC
            </p>
            <p className="text-[10px] font-semibold text-[var(--color-secondary)]/60 mt-0.5">
              {kycDone ? "Identity verified" : "Fill in or Complete your KYC if not completed"}
            </p>
          </div>
          <span className={`px-3 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest shrink-0 ${
            kycDone ? "bg-[#059669]/12 text-[#059669]" : "bg-[var(--color-primary)]/10 text-[var(--color-primary)]"
          }`}>
            {kycDone ? "Done" : "Verify"}
          </span>
        </motion.button>

        {/* T&C */}
        <div className="bg-[var(--app-bg)] border border-[var(--border)] rounded-2xl shadow-sm p-4 space-y-3">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[var(--border)]/40 flex items-center justify-center shrink-0">
              <DuotoneFileText size={18} primary="var(--color-secondary)" secondaryOpacity={0.25} />
            </div>
            <p className="text-[11px] font-black uppercase tracking-wider text-[var(--app-text)]">Terms & Conditions</p>
          </div>
          <p className="text-[11px] font-semibold text-[var(--color-secondary)]/70 leading-relaxed">
            By listing on KLeench Marketplace, you agree to our seller terms. All listings must comply with local Zambian laws and PACRA regulations.
          </p>
          <button onClick={() => setTermsAccepted(!termsAccepted)} className="flex items-center gap-2.5 active:scale-[0.98] transition-all">
            {termsAccepted
              ? <CheckSquare size={18} className="text-[var(--color-primary)] shrink-0" strokeWidth={2.5} />
              : <Square size={18} className="text-[var(--color-secondary)]/40 shrink-0" strokeWidth={2} />
            }
            <span className="text-[11px] font-semibold text-[var(--color-secondary)]/70 text-left leading-snug">
              I agree to the <span className="text-[var(--color-primary)] font-black underline">Terms & Conditions</span> and <span className="text-[var(--color-primary)] font-black underline">Privacy Policy</span>
            </span>
          </button>
        </div>
      </div>

      <div className="px-5 pt-4 pb-8">
        <CtaButton onClick={handleContinue} disabled={!sellerType || !termsAccepted}>Continue</CtaButton>
      </div>
    </div>
  );
}
