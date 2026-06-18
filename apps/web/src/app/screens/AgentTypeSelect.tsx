import { useState } from "react";
import { useNavigate } from "react-router";
import { motion } from "motion/react";
import { UserCheck, Handshake, Megaphone, Users, Database } from "lucide-react";
import { CtaButton } from "../components/CtaButton";
import { PageHeader } from "../components/PageHeader";

const AGENT_TYPES = [
  { id: "onboarding", label: "Onboarding Agent", desc: "Help new users register and get started on KLeench", icon: UserCheck },
  { id: "dealer", label: "Dealer Agent", desc: "Facilitate product and asset transactions between parties", icon: Handshake },
  { id: "advertising", label: "Advertising Agent", desc: "Promote businesses and campaigns on the KLeench platform", icon: Megaphone },
  { id: "general", label: "General Agent", desc: "Flexible role covering multiple agent activities", icon: Users },
  { id: "specialized", label: "Specialized Agent", desc: "Collect and submit market intelligence and commodity data", icon: Database, special: true },
];

export function AgentTypeSelect() {
  const navigate = useNavigate();
  const [selected, setSelected] = useState("");

  const handleContinue = () => {
    if (!selected) return;
    if (selected === "specialized") {
      navigate("/marketplace/agent/specialized", { state: { agentType: selected } });
    } else {
      navigate("/marketplace/agent/info", { state: { agentType: selected } });
    }
  };

  return (
    <div className="w-full max-w-md mx-auto bg-transparent font-sans pb-24">
      <PageHeader title="REGISTER AGENT" subtitle="Step 1 — Select Agent Type" showBack />

      <div className="px-5 pt-5 space-y-5">
        <div className="flex gap-1.5">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className={`h-1.5 flex-1 rounded-full ${i < 1 ? "bg-[var(--color-primary)]" : "bg-[var(--border)]"}`} />
          ))}
        </div>

        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[var(--color-secondary)]/50">Which agent type describes you?</p>

        <div className="space-y-2.5">
          {AGENT_TYPES.map((opt, i) => {
            const Icon = opt.icon;
            const isSelected = selected === opt.id;
            return (
              <motion.button key={opt.id} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
                whileTap={{ scale: 0.98 }} onClick={() => setSelected(opt.id)}
                className={`w-full flex items-center gap-4 p-4 rounded-2xl border transition-all text-left ${isSelected ? "border-[var(--color-primary)] bg-[var(--color-primary)]/6 shadow-sm" : "border-[var(--border)] bg-[var(--app-bg)] shadow-sm"}`}>
                <div className={`w-11 h-11 rounded-2xl flex items-center justify-center shrink-0 ${isSelected ? (opt.special ? "bg-[var(--color-secondary)]" : "bg-[var(--color-primary)]/15") : "bg-[var(--border)]/30"}`}>
                  <Icon size={20} strokeWidth={1.5} color={isSelected ? (opt.special ? "white" : "var(--color-primary)") : "var(--color-secondary)"} />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <p className="text-[12px] font-black text-[var(--app-text)] uppercase tracking-wide">{opt.label}</p>
                    {opt.special && <span className="text-[7px] font-black px-1.5 py-0.5 rounded bg-[var(--color-secondary)] text-white uppercase tracking-widest">Data</span>}
                  </div>
                  <p className="text-[10px] font-semibold text-[var(--color-secondary)]/60 mt-0.5">{opt.desc}</p>
                </div>
                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 ${isSelected ? "border-[var(--color-primary)] bg-[var(--color-primary)]" : "border-[var(--border)]"}`}>
                  {isSelected && <div className="w-2 h-2 rounded-full bg-white" />}
                </div>
              </motion.button>
            );
          })}
        </div>
      </div>

      <div className="px-5 pt-6 pb-8">
        <CtaButton onClick={handleContinue} disabled={!selected}>Continue</CtaButton>
      </div>
    </div>
  );
}
