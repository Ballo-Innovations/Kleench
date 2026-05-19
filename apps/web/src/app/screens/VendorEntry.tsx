import { useNavigate } from "react-router";
import { motion } from "motion/react";
import { Store, ChevronRight, ShieldCheck, TrendingUp, Users } from "lucide-react";
import { PageHeader } from "../components/PageHeader";

const BENEFITS = [
  { icon: TrendingUp, text: "Reach thousands of customers in Zambia" },
  { icon: ShieldCheck, text: "Verified vendor badge on your profile" },
  { icon: Users, text: "Manage orders, payments and analytics" },
];

export function VendorEntry() {
  const navigate = useNavigate();

  return (
    <div className="w-full max-w-md mx-auto min-h-screen bg-transparent font-sans pb-36">
      <PageHeader title="VENDOR REGISTRATION" subtitle="Business Setup" showBack />

      <div className="px-5 pt-8 flex flex-col items-center space-y-6">
        {/* Main Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full bg-[var(--app-bg)] rounded-3xl border-[3px] border-[var(--app-text)] shadow-[8px_8px_0_var(--app-text)] p-6"
        >
          <div className="flex flex-col items-center text-center mb-6">
            <div className="w-20 h-20 rounded-3xl bg-[var(--color-primary)]/10 border-2 border-[var(--color-primary)]/20 flex items-center justify-center mb-4">
              <Store size={36} className="text-[var(--color-primary)]" strokeWidth={1.5} />
            </div>
            <h2 className="font-black text-[20px] text-[var(--color-secondary)] uppercase tracking-tight mb-2">
              Become a Vendor
            </h2>
            <p className="text-[13px] font-semibold text-[var(--color-secondary)]/50 leading-relaxed">
              Register your business on KLeench and start selling to thousands of verified customers across Zambia.
            </p>
          </div>

          <div className="space-y-3 mb-6">
            {BENEFITS.map(({ icon: Icon, text }, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.15 + i * 0.08 }}
                className="flex items-center gap-3 p-3 rounded-xl bg-[var(--muted)] border border-[var(--border)]"
              >
                <div className="w-9 h-9 rounded-xl bg-[var(--color-primary)]/10 flex items-center justify-center shrink-0">
                  <Icon size={18} className="text-[var(--color-primary)]" strokeWidth={1.5} />
                </div>
                <span className="text-[12px] font-semibold text-[var(--color-secondary)]">{text}</span>
              </motion.div>
            ))}
          </div>

          <div className="bg-[var(--color-secondary)]/5 border border-[var(--border)] rounded-xl p-3 flex items-center gap-2 mb-2">
            <ShieldCheck size={14} className="text-[var(--color-secondary)]/50 shrink-0" />
            <p className="text-[10px] font-semibold text-[var(--color-secondary)]/50 leading-snug">
              Registration is free. You will need your business documents and bank details ready.
            </p>
          </div>
        </motion.div>

        {/* Steps Preview */}
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="w-full">
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[var(--color-secondary)]/40 mb-3 px-1">Registration Steps</p>
          <div className="flex items-center gap-0">
            {["Business Info", "Bank Details", "Services", "Uploads", "Review"].map((step, i, arr) => (
              <div key={step} className="flex items-center flex-1 min-w-0">
                <div className="flex flex-col items-center flex-1 min-w-0">
                  <div className="w-7 h-7 rounded-full bg-[var(--color-secondary)] text-white text-[10px] font-black flex items-center justify-center mb-1">
                    {i + 1}
                  </div>
                  <span className="text-[8px] font-black uppercase tracking-wide text-[var(--color-secondary)]/50 text-center leading-tight">{step}</span>
                </div>
                {i < arr.length - 1 && <div className="h-[2px] flex-1 bg-[var(--border)] mb-4 mx-1" />}
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      <div className="px-5 pt-2 pb-8">
        <button
          onClick={() => navigate("/vendor/info")}
          className="w-full py-4 rounded-2xl bg-[var(--color-primary)] text-white font-black uppercase tracking-widest text-[13px] flex items-center justify-center gap-3 shadow-[0_8px_20px_rgba(255,140,0,0.3)] active:scale-95 transition-all"
        >
          Start Registration <ChevronRight size={18} strokeWidth={2.5} />
        </button>
      </div>
    </div>
  );
}
