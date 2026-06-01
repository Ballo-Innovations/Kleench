import { useNavigate } from "react-router";
import { motion } from "motion/react";
import { CheckCircle, Clock } from "lucide-react";
import { PageHeader } from "../components/PageHeader";

const REFERRALS = [
  { name: "Chanda M.", date: "May 28, 2026", status: "successful", earned: "K25" },
  { name: "Mwansa T.", date: "May 22, 2026", status: "successful", earned: "K25" },
  { name: "Bwalya K.", date: "May 18, 2026", status: "successful", earned: "K25" },
  { name: "Temwa N.", date: "May 30, 2026", status: "pending", earned: "—" },
  { name: "Lombe P.", date: "May 29, 2026", status: "pending", earned: "—" },
  { name: "Samu D.", date: "May 27, 2026", status: "pending", earned: "—" },
  { name: "Kasonde R.", date: "May 15, 2026", status: "successful", earned: "K25" },
  { name: "Mwale C.", date: "May 10, 2026", status: "successful", earned: "K25" },
];

export function MarketReferralHistory() {
  const navigate = useNavigate();
  const successful = REFERRALS.filter((r) => r.status === "successful");
  const pending = REFERRALS.filter((r) => r.status === "pending");
  const totalEarned = successful.length * 25;

  return (
    <div className="w-full max-w-md mx-auto min-h-screen bg-transparent font-sans pb-32">
      <PageHeader title="REFERRAL HISTORY" showBack />

      <div className="px-5 pt-5 space-y-5">
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-2 gap-3">
          <div className="bg-[var(--app-bg)] border border-[var(--border)] rounded-2xl shadow-sm p-4 text-center">
            <p className="text-[28px] font-black text-[#059669]">{successful.length}</p>
            <p className="text-[9px] font-black uppercase tracking-widest text-[var(--color-secondary)]/50 mt-0.5">Successful</p>
          </div>
          <div className="bg-[var(--app-bg)] border border-[var(--border)] rounded-2xl shadow-sm p-4 text-center">
            <p className="text-[28px] font-black text-[var(--color-primary)]">K{totalEarned}</p>
            <p className="text-[9px] font-black uppercase tracking-widest text-[var(--color-secondary)]/50 mt-0.5">Total Earned</p>
          </div>
        </motion.div>

        {successful.length > 0 && (
          <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            className="bg-[var(--app-bg)] border border-[var(--border)] rounded-2xl shadow-sm overflow-hidden">
            <div className="bg-[#059669]/8 border-b border-[var(--border)] px-5 py-3 flex items-center gap-2">
              <CheckCircle size={12} color="#059669" strokeWidth={2.5} />
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[#059669]">Successful Referrals</p>
            </div>
            {successful.map((r, i) => (
              <div key={i} className="flex items-center justify-between px-5 py-3.5 border-b border-[var(--border)] last:border-0">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#059669]/10 flex items-center justify-center text-[11px] font-black text-[#059669]">{r.name[0]}</div>
                  <div>
                    <p className="text-[12px] font-black text-[var(--app-text)]">{r.name}</p>
                    <p className="text-[9px] font-semibold text-[var(--color-secondary)]/50">{r.date}</p>
                  </div>
                </div>
                <p className="text-[13px] font-black text-[#059669]">{r.earned}</p>
              </div>
            ))}
          </motion.div>
        )}

        {pending.length > 0 && (
          <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
            className="bg-[var(--app-bg)] border border-[var(--border)] rounded-2xl shadow-sm overflow-hidden">
            <div className="bg-[var(--color-primary)]/8 border-b border-[var(--border)] px-5 py-3 flex items-center gap-2">
              <Clock size={12} color="var(--color-primary)" strokeWidth={2.5} />
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[var(--color-primary)]">Pending Referrals</p>
            </div>
            {pending.map((r, i) => (
              <div key={i} className="flex items-center justify-between px-5 py-3.5 border-b border-[var(--border)] last:border-0">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-[var(--color-primary)]/10 flex items-center justify-center text-[11px] font-black text-[var(--color-primary)]">{r.name[0]}</div>
                  <div>
                    <p className="text-[12px] font-black text-[var(--app-text)]">{r.name}</p>
                    <p className="text-[9px] font-semibold text-[var(--color-secondary)]/50">{r.date} · Awaiting first transaction</p>
                  </div>
                </div>
                <Clock size={13} color="var(--color-primary)" strokeWidth={2} />
              </div>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
}
