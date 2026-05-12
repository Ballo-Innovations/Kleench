import { useState } from "react";
import { motion } from "motion/react";
import { ChevronRight, UserCheck, Building2, LineChart, Megaphone } from "lucide-react";
import { useNavigate } from "react-router";
import { PageHeader } from "../components/PageHeader";

const grace = (delay = 0) => ({
  delay, duration: 0.45, ease: [0.22, 1, 0.36, 1] as const,
});

const AGENT_TYPES = [
  { id: "referral", label: "Referral Agent", desc: "Refer investors and projects to earn commissions", icon: UserCheck },
  { id: "corporate", label: "Corporate Agent", desc: "Represent companies seeking investment capital", icon: Building2 },
  { id: "analyst", label: "Investment Analyst Agent", desc: "Provide project analysis and due diligence reports", icon: LineChart },
  { id: "digital", label: "Digital Promotion Agent", desc: "Promote investment campaigns across digital channels", icon: Megaphone },
];

export function RegisterInvestmentAgent() {
  const navigate = useNavigate();
  const [selected, setSelected] = useState("");

  return (
    <div className="w-full max-w-md mx-auto min-h-screen font-sans pb-32">
      <div className="sticky top-0 z-50">
        <PageHeader title="REGISTER AS AGENT" showBack onBack={() => navigate(-1)} />
      </div>

      <div className="px-5 pt-6">
        <h2 className="font-black text-[20px] text-[var(--color-secondary)] uppercase tracking-tight mb-2">Agent Category</h2>
        <p className="text-[13px] font-semibold text-[var(--color-secondary)]/50 mb-6">Select the agent role you want to fill within the Kleench invest ecosystem.</p>

        <div className="space-y-3 mb-10">
          {AGENT_TYPES.map(({ id, label, desc, icon: Icon }, i) => (
            <motion.button key={id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={grace(0.06 * i)}
              onClick={() => setSelected(id)}
              className={`w-full p-4 rounded-2xl border-2 flex items-center gap-4 text-left transition-all active:scale-[0.98] ${selected === id ? 'border-[#E85D3F] bg-[#E85D3F]/5' : 'border-[var(--border)] bg-[var(--card)]'}`}>
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 transition-colors ${selected === id ? 'bg-[#E85D3F] text-white' : 'bg-[var(--app-bg-muted)] text-[var(--color-secondary)]/50'}`}>
                <Icon size={22} strokeWidth={1.5} />
              </div>
              <div className="flex-1">
                <p className={`font-black text-[13px] uppercase tracking-wide ${selected === id ? 'text-[#E85D3F]' : 'text-[var(--color-secondary)]'}`}>{label}</p>
                <p className="text-[11px] font-semibold text-[var(--color-secondary)]/50 mt-0.5 leading-snug">{desc}</p>
              </div>
              <div className={`w-5 h-5 rounded-full border-2 shrink-0 flex items-center justify-center transition-colors ${selected === id ? 'border-[#E85D3F] bg-[#E85D3F]' : 'border-[var(--border)]'}`}>
                {selected === id && <div className="w-2 h-2 rounded-full bg-white" />}
              </div>
            </motion.button>
          ))}
        </div>

        <button disabled={!selected} onClick={() => navigate("/crowdfunding/register-agent/details", { state: { agentType: selected } })}
          className="w-full py-4 rounded-2xl bg-[#E85D3F] text-white font-black uppercase tracking-widest text-[13px] flex items-center justify-center gap-3 disabled:opacity-40 shadow-md active:scale-95 transition-all">
          Continue <ChevronRight size={18} />
        </button>
      </div>
    </div>
  );
}
