import { useNavigate } from "react-router";
import { motion } from "motion/react";
import { ShieldCheck, Briefcase, ArrowRight, BadgeCheck, Building2 } from "lucide-react";
import { PageHeader } from "../components/PageHeader";

export function AgentLanding() {
  const navigate = useNavigate();

  return (
    <div className="w-full max-w-md mx-auto bg-transparent font-sans pb-24">
      <PageHeader title="AGENT HUB" showBack />

      <div className="px-5 pt-5 space-y-5">
        {/* Header banner */}
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
          className="bg-[var(--app-shape-accent)] border border-[var(--border)] rounded-2xl shadow-md overflow-hidden">
          <div className="px-5 py-6 text-center space-y-2">
            <div className="w-14 h-14 rounded-full bg-[var(--color-primary)]/20 flex items-center justify-center mx-auto">
              <ShieldCheck size={26} color="var(--color-primary)" strokeWidth={1.5} />
            </div>
            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-white/50 mt-1">KLeench Agent Platform</p>
            <p className="text-[18px] font-black text-white uppercase tracking-tight leading-tight">Complex Assets &<br/>Professional Sales</p>
            <p className="text-[11px] font-semibold text-white/50">Vehicles · Property · Machinery · Equipment</p>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
          className="space-y-3">
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[var(--color-secondary)]/50">Choose your path</p>

          <button onClick={() => navigate("/advert/agent-registration")}
            className="w-full flex items-center gap-4 p-4 bg-[var(--app-bg)] border border-[var(--border)] rounded-2xl shadow-sm active:scale-95 transition-all text-left">
            <div className="w-12 h-12 rounded-2xl bg-[var(--color-primary)]/10 flex items-center justify-center shrink-0">
              <BadgeCheck size={24} color="var(--color-primary)" strokeWidth={1.5} />
            </div>
            <div className="flex-1">
              <p className="text-[13px] font-black text-[var(--app-text)] uppercase tracking-wide">Become an Agent</p>
              <p className="text-[10px] font-semibold text-[var(--color-secondary)]/60 mt-0.5">Register as a KLeench certified agent and earn commission on sales</p>
              <div className="flex flex-wrap gap-1.5 mt-2">
                {["Onboarding", "Dealer", "Advertising", "Specialized"].map((t) => (
                  <span key={t} className="text-[8px] font-black uppercase tracking-widest text-[var(--color-primary)] bg-[var(--color-primary)]/8 px-2 py-0.5 rounded-full">{t}</span>
                ))}
              </div>
            </div>
            <ArrowRight size={16} className="text-[var(--color-secondary)]/30 shrink-0" strokeWidth={2} />
          </button>

          <button onClick={() => navigate("/marketplace/agent/list")}
            className="w-full flex items-center gap-4 p-4 bg-[var(--app-bg)] border border-[var(--border)] rounded-2xl shadow-sm active:scale-95 transition-all text-left">
            <div className="w-12 h-12 rounded-2xl bg-[var(--color-secondary)]/8 flex items-center justify-center shrink-0">
              <Building2 size={24} color="var(--color-secondary)" strokeWidth={1.5} />
            </div>
            <div className="flex-1">
              <p className="text-[13px] font-black text-[var(--app-text)] uppercase tracking-wide">List Through Agent</p>
              <p className="text-[10px] font-semibold text-[var(--color-secondary)]/60 mt-0.5">List a complex asset — vehicles, property, machinery, or equipment</p>
              <div className="flex flex-wrap gap-1.5 mt-2">
                {["Escrow Protected", "Verified Listing", "Professional Sale"].map((t) => (
                  <span key={t} className="text-[8px] font-black uppercase tracking-widest text-[var(--color-secondary)] bg-[var(--color-secondary)]/8 px-2 py-0.5 rounded-full">{t}</span>
                ))}
              </div>
            </div>
            <ArrowRight size={16} className="text-[var(--color-secondary)]/30 shrink-0" strokeWidth={2} />
          </button>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
          className="flex items-start gap-3 bg-[var(--color-primary)]/8 border border-[var(--color-primary)]/20 rounded-2xl px-4 py-3">
          <Briefcase size={15} className="text-[var(--color-primary)] shrink-0 mt-0.5" strokeWidth={2} />
          <p className="text-[11px] font-semibold text-[var(--color-secondary)]/70 leading-snug">
            All agent transactions are <span className="font-black text-[var(--app-text)]">Escrow Protected</span>. Funds are held securely until both parties confirm completion.
          </p>
        </motion.div>
      </div>
    </div>
  );
}
