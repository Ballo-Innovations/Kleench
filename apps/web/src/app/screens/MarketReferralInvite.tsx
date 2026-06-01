import { useNavigate } from "react-router";
import { motion } from "motion/react";
import { MessageCircle, Copy, Share2, Link } from "lucide-react";
import { PageHeader } from "../components/PageHeader";
import { toast } from "sonner";

const REFERRAL_CODE = "KL-AJ2026";
const REFERRAL_LINK = `https://kleench.com/join?ref=${REFERRAL_CODE}`;

export function MarketReferralInvite() {
  const navigate = useNavigate();

  const copyLink = () => { navigator.clipboard?.writeText(REFERRAL_LINK); toast.success("Referral link copied!"); };
  const shareWhatsApp = () => { const msg = encodeURIComponent(`Join me on KLeench Marketplace! Use my code *${REFERRAL_CODE}* or: ${REFERRAL_LINK}`); window.open(`https://wa.me/?text=${msg}`, "_blank"); };
  const shareSMS = () => { const msg = encodeURIComponent(`Join KLeench! Code ${REFERRAL_CODE}: ${REFERRAL_LINK}`); window.open(`sms:?body=${msg}`, "_blank"); };

  return (
    <div className="w-full max-w-md mx-auto min-h-screen bg-transparent font-sans pb-32">
      <PageHeader title="INVITE FRIENDS" showBack />

      <div className="px-5 pt-5 space-y-5">
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
          className="bg-[var(--app-bg)] border border-[var(--border)] rounded-2xl shadow-sm p-5 text-center space-y-3">
          <p className="text-[10px] font-black uppercase tracking-[0.3em] text-[var(--color-secondary)]/50">Your Referral Code</p>
          <div className="bg-[var(--color-primary)]/8 border border-[var(--color-primary)]/20 rounded-xl py-4 px-6">
            <p className="text-[32px] font-black text-[var(--color-primary)] tracking-[0.3em]">{REFERRAL_CODE}</p>
          </div>
          <p className="text-[11px] font-semibold text-[var(--color-secondary)]/60 leading-snug">
            Your friend joins → completes first transaction → <span className="font-black text-[#059669]">you earn K25</span>
          </p>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
          className="space-y-3">
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[var(--color-secondary)]/50 px-1">Share Via</p>
          {[
            { label: "WhatsApp", desc: "Share in WhatsApp chats & groups", icon: MessageCircle, color: "#25D366", action: shareWhatsApp },
            { label: "SMS", desc: "Send a text message invite", icon: MessageCircle, color: "var(--color-secondary)", action: shareSMS },
            { label: "Copy Link", desc: REFERRAL_LINK, icon: Link, color: "var(--color-primary)", action: copyLink },
          ].map(({ label, desc, icon: Icon, color, action }) => (
            <button key={label} onClick={action}
              className="w-full flex items-center gap-4 p-4 bg-[var(--app-bg)] border border-[var(--border)] rounded-2xl shadow-sm active:scale-95 transition-all text-left">
              <div className="w-10 h-10 rounded-2xl flex items-center justify-center shrink-0" style={{ backgroundColor: color + "15" }}>
                <Icon size={18} style={{ color }} strokeWidth={2} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[13px] font-black text-[var(--app-text)] uppercase tracking-wide">{label}</p>
                <p className="text-[10px] font-semibold text-[var(--color-secondary)]/50 truncate">{desc}</p>
              </div>
              <Share2 size={13} className="text-[var(--color-secondary)]/30 shrink-0" strokeWidth={2} />
            </button>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
