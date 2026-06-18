import { useNavigate } from "react-router";
import { motion } from "motion/react";
import { ShieldCheck, TrendingUp, Users, DollarSign } from "lucide-react";
import { CtaButton } from "../components/CtaButton";
import { PageHeader } from "../components/PageHeader";

const BENEFITS = [
  { icon: DollarSign, label: "Earn Commissions", desc: "Get paid for every successful onboarding or transaction" },
  { icon: Users, label: "Build Your Network", desc: "Connect with businesses, farmers, and traders across Zambia" },
  { icon: TrendingUp, label: "Grow Your Income", desc: "Scale your earnings as you grow your agent portfolio" },
];

export function AgentEntry() {
  const navigate = useNavigate();

  return (
    <div className="w-full max-w-md mx-auto bg-transparent font-sans pb-24">
      <PageHeader title="AGENT HUB" showBack />

      <div className="px-5 pt-5 space-y-5">
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
          className="bg-[var(--color-secondary)] rounded-2xl shadow-md overflow-hidden">
          <div className="px-5 py-6 text-center space-y-2">
            <div className="w-14 h-14 rounded-full bg-white/10 flex items-center justify-center mx-auto">
              <ShieldCheck size={26} color="white" strokeWidth={1.5} />
            </div>
            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-white/50 mt-1">KLeench Agent Platform</p>
            <p className="text-[20px] font-black text-white uppercase tracking-tight leading-tight">
              Become a KLeench<br />Certified Agent
            </p>
            <p className="text-[11px] font-semibold text-white/60">Join the network — onboard, deal, advertise, or contribute market data</p>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
          className="space-y-3">
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[var(--color-secondary)]/50">Why become an agent?</p>
          {BENEFITS.map((b, i) => {
            const Icon = b.icon;
            return (
              <div key={i} className="flex items-start gap-3 bg-[var(--app-bg)] border border-[var(--border)] rounded-2xl shadow-sm p-4">
                <div className="w-10 h-10 rounded-xl bg-[var(--color-primary)]/10 flex items-center justify-center shrink-0">
                  <Icon size={18} color="var(--color-primary)" strokeWidth={1.5} />
                </div>
                <div>
                  <p className="text-[12px] font-black text-[var(--app-text)] uppercase tracking-wide">{b.label}</p>
                  <p className="text-[10px] font-semibold text-[var(--color-secondary)]/60 mt-0.5">{b.desc}</p>
                </div>
              </div>
            );
          })}
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
          className="bg-[var(--app-bg)] border border-[var(--border)] rounded-2xl shadow-sm p-4">
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[var(--color-secondary)]/50 mb-2">Agent types available</p>
          <div className="flex flex-wrap gap-1.5">
            {["Onboarding Agent", "Dealer Agent", "Advertising Agent", "General Agent", "Specialized Agent"].map((t) => (
              <span key={t} className="text-[8px] font-black uppercase tracking-widest text-[var(--color-secondary)] bg-[var(--color-secondary)]/8 px-2.5 py-1 rounded-full">{t}</span>
            ))}
          </div>
        </motion.div>
      </div>

      <div className="px-5 pt-6 pb-8">
        <CtaButton onClick={() => navigate("/marketplace/agent/type")}>Get Started</CtaButton>
      </div>
    </div>
  );
}
