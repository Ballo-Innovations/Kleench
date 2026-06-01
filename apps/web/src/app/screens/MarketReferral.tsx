import { useNavigate } from "react-router";
import { motion } from "motion/react";
import { Gift, Users, History, Copy, TrendingUp } from "lucide-react";
import { PageHeader } from "../components/PageHeader";
import { toast } from "sonner";

const REFERRAL_CODE = "KL-AJ2026";
const STATS = [
  { label: "Total Earnings", value: "K340", icon: TrendingUp, color: "#059669" },
  { label: "Referrals", value: "12", icon: Users, color: "var(--color-primary)" },
  { label: "Pending", value: "3", icon: History, color: "var(--color-secondary)" },
];

export function MarketReferral() {
  const navigate = useNavigate();

  return (
    <div className="w-full max-w-md mx-auto min-h-screen bg-transparent font-sans pb-32">
      <PageHeader title="REFERRAL PROGRAM" showBack />

      <div className="px-5 pt-5 space-y-5">
        {/* Hero */}
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
          className="bg-[var(--app-shape-accent)] border border-[var(--border)] rounded-2xl overflow-hidden shadow-md">
          <div className="px-5 py-6 text-center space-y-2">
            <div className="w-14 h-14 rounded-full bg-[var(--color-primary)]/20 flex items-center justify-center mx-auto">
              <Gift size={26} color="var(--color-primary)" strokeWidth={1.5} />
            </div>
            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-white/50 mt-2">Your Referral Code</p>
            <div className="flex items-center justify-center gap-3">
              <p className="text-[28px] font-black text-[var(--color-primary)] tracking-widest">{REFERRAL_CODE}</p>
              <button onClick={() => { navigator.clipboard?.writeText(REFERRAL_CODE); toast.success("Code copied!"); }}
                className="w-8 h-8 rounded-xl bg-[var(--color-primary)]/20 flex items-center justify-center active:scale-90 transition-all">
                <Copy size={13} color="var(--color-primary)" strokeWidth={2.5} />
              </button>
            </div>
            <p className="text-[11px] font-semibold text-white/50">Earn <span className="font-black text-[var(--color-primary)]">K25</span> for every friend who joins and completes their first transaction.</p>
          </div>
        </motion.div>

        {/* Stats */}
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
          className="grid grid-cols-3 gap-3">
          {STATS.map(({ label, value, icon: Icon, color }) => (
            <div key={label} className="bg-[var(--app-bg)] border border-[var(--border)] rounded-2xl shadow-sm p-4 text-center">
              <Icon size={14} style={{ color }} strokeWidth={2} className="mx-auto mb-1" />
              <p className="text-[20px] font-black" style={{ color }}>{value}</p>
              <p className="text-[8px] font-black uppercase tracking-wide text-[var(--color-secondary)]/50 mt-0.5 leading-tight">{label}</p>
            </div>
          ))}
        </motion.div>

        {/* Actions */}
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
          className="space-y-3">
          {[
            { label: "Invite Friends", desc: "Share via WhatsApp, SMS, or link", icon: Gift, color: "var(--color-primary)", route: "/marketplace/refer/invite" },
            { label: "Referral History", desc: "View all successful and pending referrals", icon: History, color: "var(--color-secondary)", route: "/marketplace/refer/history" },
          ].map(({ label, desc, icon: Icon, color, route }) => (
            <button key={label} onClick={() => navigate(route)}
              className="w-full flex items-center gap-4 p-4 bg-[var(--app-bg)] border border-[var(--border)] rounded-2xl shadow-sm active:scale-95 transition-all text-left">
              <div className="w-10 h-10 rounded-2xl flex items-center justify-center shrink-0" style={{ backgroundColor: color + "15" }}>
                <Icon size={18} style={{ color }} strokeWidth={2} />
              </div>
              <div className="flex-1">
                <p className="text-[13px] font-black text-[var(--app-text)] uppercase tracking-wide">{label}</p>
                <p className="text-[10px] font-semibold text-[var(--color-secondary)]/50">{desc}</p>
              </div>
            </button>
          ))}
        </motion.div>

        <p className="text-[9px] font-semibold text-[var(--color-secondary)]/40 text-center leading-snug px-2">
          Earnings are credited once your referred friend's first transaction is completed.
        </p>
      </div>
    </div>
  );
}
