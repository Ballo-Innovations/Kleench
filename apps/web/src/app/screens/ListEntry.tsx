import { useNavigate } from "react-router";
import { motion } from "motion/react";
import { Building2, CheckCircle } from "lucide-react";
import { PageHeader } from "../components/PageHeader";
import { CtaButton } from "../components/CtaButton";

const BENEFITS = [
  "Appear in the Business Listings directory",
  "Showcase your products and services",
  "Reach thousands of buyers across Zambia",
  "Priority listings get featured placement",
];

export function ListEntry() {
  const navigate = useNavigate();

  return (
    <div className="w-full bg-transparent font-sans pb-24">
      <PageHeader title="LIST YOUR BUSINESS" showBack />

      <div className="px-5 pt-5 space-y-5">
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
          className="bg-[var(--color-secondary)] rounded-2xl shadow-md overflow-hidden">
          <div className="px-5 py-6 text-center space-y-2">
            <div className="w-14 h-14 rounded-full bg-white/10 flex items-center justify-center mx-auto">
              <Building2 size={26} color="white" strokeWidth={1.5} />
            </div>
            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-white/50 mt-1">KLeench Business Directory</p>
            <p className="text-[20px] font-black text-white uppercase tracking-tight leading-tight">
              Get Your Business<br />Discovered
            </p>
            <p className="text-[11px] font-semibold text-white/60">Join thousands of businesses on the KLeench Marketplace</p>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
          className="bg-[var(--app-bg)] border border-[var(--border)] rounded-2xl shadow-sm p-5 space-y-3">
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[var(--color-secondary)]/50">What you get</p>
          {BENEFITS.map((b, i) => (
            <div key={i} className="flex items-start gap-3">
              <CheckCircle size={14} className="text-[var(--color-primary)] shrink-0 mt-0.5" strokeWidth={2.5} />
              <p className="text-[12px] font-semibold text-[var(--color-secondary)]/70">{b}</p>
            </div>
          ))}
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
          className="grid grid-cols-2 gap-3">
          <div className="bg-[var(--app-bg)] border border-[var(--border)] rounded-2xl shadow-sm p-4 text-center">
            <p className="text-[22px] font-black text-[var(--color-primary)]">Free</p>
            <p className="text-[9px] font-black uppercase tracking-widest text-[var(--color-secondary)]/50 mt-0.5">Ordinary Listing</p>
          </div>
          <div className="bg-[var(--color-secondary)] rounded-2xl shadow-sm p-4 text-center">
            <p className="text-[22px] font-black text-white">Priority</p>
            <p className="text-[9px] font-black uppercase tracking-widest text-white/50 mt-0.5">$10 / Year</p>
          </div>
        </motion.div>
      </div>

      <div className="px-5 pt-6 pb-8">
        <CtaButton onClick={() => navigate("/marketplace/list/type")}>Create Business Listing</CtaButton>
      </div>
    </div>
  );
}
