import { useState } from "react";
import { motion } from "motion/react";
import { ChevronRight, User, Building2, Landmark, Users } from "lucide-react";
import { useNavigate } from "react-router";
import { PageHeader } from "../components/PageHeader";

const grace = (delay = 0) => ({
  delay, duration: 0.45, ease: [0.22, 1, 0.36, 1] as const,
});

const DONOR_TYPES = [
  { id: "individual", label: "Individual", desc: "Personal donor — donate as yourself", icon: User },
  { id: "ngo", label: "NGO / Organization", desc: "Non-profit or charity organization", icon: Users },
  { id: "corporate", label: "Corporate / Business", desc: "Company or business entity", icon: Building2 },
  { id: "government", label: "Government Entity", desc: "Public sector or government body", icon: Landmark },
];

export function DonorTypeSelect() {
  const navigate = useNavigate();
  const [selected, setSelected] = useState("");

  return (
    <div className="w-full max-w-md mx-auto font-sans pb-24">
      <div className="sticky top-0 z-50">
        <PageHeader title="REGISTER AS DONOR" showBack onBack={() => navigate(-1)} />
      </div>

      <div className="px-5 pt-6">
        <h2 className="font-black text-[20px] text-[var(--color-secondary)] uppercase tracking-tight mb-2">Donor Type</h2>
        <p className="text-[13px] font-semibold text-[var(--color-secondary)]/50 mb-6">Select the category that best describes you.</p>

        <div className="space-y-3 mb-10">
          {DONOR_TYPES.map(({ id, label, desc, icon: Icon }, i) => (
            <motion.button key={id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={grace(0.07 * i)}
              onClick={() => setSelected(id)}
              className={`w-full p-4 rounded-2xl border-2 flex items-center gap-4 text-left transition-all active:scale-[0.98] ${selected === id ? 'border-[#E85D3F] bg-[#E85D3F]/5' : 'border-[var(--border)] bg-[var(--card)]'}`}>
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 transition-colors ${selected === id ? 'bg-[#E85D3F] text-white' : 'bg-[var(--app-bg-muted)] text-[var(--color-secondary)]/50'}`}>
                <Icon size={22} strokeWidth={1.5} />
              </div>
              <div className="flex-1">
                <p className={`font-black text-[14px] tracking-wide ${selected === id ? 'text-[#E85D3F]' : 'text-[var(--color-secondary)]'}`}>{label}</p>
                <p className="text-[11px] font-semibold text-[var(--color-secondary)]/50 mt-0.5">{desc}</p>
              </div>
              <div className={`w-5 h-5 rounded-full border-2 shrink-0 transition-colors flex items-center justify-center ${selected === id ? 'border-[#E85D3F] bg-[#E85D3F]' : 'border-[var(--border)]'}`}>
                {selected === id && <div className="w-2 h-2 rounded-full bg-white" />}
              </div>
            </motion.button>
          ))}
        </div>

        <button disabled={!selected} onClick={() => navigate("/donate/register-donor/details", { state: { donorType: selected } })}
          className="w-full py-4 rounded-2xl bg-[#E85D3F] text-white font-black uppercase tracking-widest text-[13px] flex items-center justify-center gap-3 disabled:opacity-40 shadow-md active:scale-95 transition-all">
          Continue <ChevronRight size={18} />
        </button>
      </div>
    </div>
  );
}
