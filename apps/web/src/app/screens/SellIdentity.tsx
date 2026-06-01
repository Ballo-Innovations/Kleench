import { useState } from "react";
import { useNavigate, useLocation } from "react-router";
import { motion } from "motion/react";
import { User, Building2, ShieldCheck, FileText, ArrowRight, CheckSquare, Square } from "lucide-react";
import { PageHeader } from "../components/PageHeader";

const STEPS = 5;

export function SellIdentity() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const [sellerType, setSellerType] = useState<"individual" | "business" | null>(null);
  const [kycDone, setKycDone] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);

  const getNextRoute = () => {
    const { sellType, saleType } = state || {};
    if (sellType === "service") return "/marketplace/sell/service/category";
    if (sellType === "complex" || saleType === "complex") return "/marketplace/sell/complex/info";
    return "/marketplace/sell/product/info";
  };

  const handleContinue = () => {
    if (!sellerType || !termsAccepted) return;
    navigate(getNextRoute(), { state: { ...state, sellerType, kycDone } });
  };

  return (
    <div className="w-full max-w-md mx-auto min-h-screen bg-transparent font-sans pb-32">
      <PageHeader title="IDENTITY" subtitle="Step 2 of 5" showBack />

      <div className="px-5 pt-5 space-y-6">
        <div className="flex gap-1.5">
          {Array.from({ length: STEPS }).map((_, i) => (
            <div key={i} className={`h-1.5 flex-1 rounded-full ${i < 2 ? "bg-[var(--color-primary)]" : "bg-[var(--border)]"}`} />
          ))}
        </div>

        <div className="space-y-3">
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[var(--color-secondary)]/50">Seller Type</p>
          {([
            { id: "individual", label: "Individual", icon: User, desc: "Personal seller — no business registration needed" },
            { id: "business", label: "Business", icon: Building2, desc: "Registered company or enterprise" },
          ] as const).map((opt) => (
            <motion.button
              key={opt.id}
              whileTap={{ scale: 0.98 }}
              onClick={() => setSellerType(opt.id)}
              className={`w-full flex items-center gap-4 p-4 rounded-2xl border-[3px] transition-all text-left ${
                sellerType === opt.id
                  ? "border-[var(--app-text)] shadow-[4px_4px_0_var(--app-text)] bg-[var(--color-primary)]/8"
                  : "border-[var(--border)] bg-[var(--app-bg)]"
              }`}
            >
              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${sellerType === opt.id ? "bg-[var(--color-primary)]/15" : "bg-[var(--border)]/30"}`}>
                <opt.icon size={24} style={{ color: sellerType === opt.id ? "var(--color-primary)" : "var(--color-secondary)" }} strokeWidth={2} />
              </div>
              <div className="flex-1">
                <p className="text-[13px] font-black text-[var(--app-text)] uppercase tracking-wide">{opt.label}</p>
                <p className="text-[11px] font-semibold text-[var(--color-secondary)]/60">{opt.desc}</p>
              </div>
              <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 ${sellerType === opt.id ? "border-[var(--color-primary)] bg-[var(--color-primary)]" : "border-[var(--border)]"}`}>
                {sellerType === opt.id && <div className="w-2 h-2 rounded-full bg-white" />}
              </div>
            </motion.button>
          ))}
        </div>

        <div className="space-y-3">
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[var(--color-secondary)]/50">KYC Verification</p>
          <motion.button
            whileTap={{ scale: 0.98 }}
            onClick={() => setKycDone(!kycDone)}
            className={`w-full flex items-center gap-4 p-4 rounded-2xl border-[3px] transition-all text-left ${
              kycDone
                ? "border-[#059669] shadow-[4px_4px_0_#059669] bg-[#059669]/8"
                : "border-[var(--border)] bg-[var(--app-bg)]"
            }`}
          >
            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${kycDone ? "bg-[#059669]/15" : "bg-[var(--border)]/30"}`}>
              <ShieldCheck size={24} style={{ color: kycDone ? "#059669" : "var(--color-secondary)" }} strokeWidth={2} />
            </div>
            <div className="flex-1">
              <p className="text-[13px] font-black text-[var(--app-text)] uppercase tracking-wide">KYC Verification</p>
              <p className="text-[11px] font-semibold text-[var(--color-secondary)]/60">{kycDone ? "Identity verified" : "Verify your identity to sell"}</p>
            </div>
            <div className={`px-3 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest ${kycDone ? "bg-[#059669]/15 text-[#059669]" : "bg-[var(--color-primary)]/10 text-[var(--color-primary)]"}`}>
              {kycDone ? "Verified" : "Verify"}
            </div>
          </motion.button>
        </div>

        <div className="bg-[var(--app-bg)] rounded-2xl border-[3px] border-[var(--app-text)] shadow-[4px_4px_0_var(--app-text)] p-4 space-y-3">
          <div className="flex items-center gap-2">
            <FileText size={16} className="text-[var(--color-secondary)]" strokeWidth={2} />
            <p className="text-[11px] font-black uppercase tracking-wider text-[var(--app-text)]">Terms & Conditions</p>
          </div>
          <p className="text-[11px] font-semibold text-[var(--color-secondary)]/70 leading-relaxed">
            By listing on KLeench Marketplace, you agree to our seller terms. All listings must comply with local Zambian laws and PACRA regulations.
          </p>
          <button
            onClick={() => setTermsAccepted(!termsAccepted)}
            className="flex items-center gap-2.5"
          >
            {termsAccepted
              ? <CheckSquare size={18} className="text-[var(--color-primary)]" strokeWidth={2.5} />
              : <Square size={18} className="text-[var(--color-secondary)]/40" strokeWidth={2} />
            }
            <span className="text-[11px] font-black text-[var(--app-text)] uppercase tracking-wide">I accept the Terms & Conditions</span>
          </button>
        </div>
      </div>

      <div className="px-5 pt-4 pb-8">
        <button
          onClick={handleContinue}
          disabled={!sellerType || !termsAccepted}
          className="w-full py-4 rounded-2xl bg-[var(--color-secondary)] text-white font-black uppercase tracking-widest text-[12px] flex items-center justify-center gap-3 disabled:opacity-40 disabled:cursor-not-allowed active:scale-95 transition-all"
        >
          Continue <ArrowRight size={18} />
        </button>
      </div>
    </div>
  );
}
