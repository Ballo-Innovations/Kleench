import { useState } from "react";
import { motion } from "motion/react";
import { ChevronRight, ShieldCheck } from "lucide-react";
import { useNavigate } from "react-router";
import { PageHeader } from "../components/PageHeader";

const grace = (delay = 0) => ({
  delay, duration: 0.45, ease: [0.22, 1, 0.36, 1] as const,
});

const INTERESTS = ["Energy", "Agriculture", "Real Estate", "Tech", "Retail"];

export function InvestorRegistrationDetails() {
  const navigate = useNavigate();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [location, setLocation] = useState("");
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);

  const toggleInterest = (interest: string) => {
    setSelectedInterests(prev =>
      prev.includes(interest) ? prev.filter(i => i !== interest) : [...prev, interest]
    );
  };

  const isValid = fullName.trim().length > 0 && email.trim().length > 0 && phone.trim().length > 0 && location.trim().length > 0 && selectedInterests.length > 0;

  return (
    <div className="w-full max-w-md mx-auto min-h-screen font-sans pb-32">
      <div className="sticky top-0 z-50">
        <PageHeader title="INVESTOR DETAILS" showBack onBack={() => navigate(-1)} />
      </div>

      <div className="px-5 pt-6 space-y-5">
        <div>
          <h2 className="font-black text-[20px] text-[var(--color-secondary)] uppercase tracking-tight mb-1">Personal Details</h2>
          <p className="text-[13px] font-semibold text-[var(--color-secondary)]/50">Fill in your details to create your investor profile.</p>
        </div>

        {[
          { label: "Full Name *", value: fullName, set: setFullName, placeholder: "e.g. Chanda Mwansa", type: "text" },
          { label: "Email Address *", value: email, set: setEmail, placeholder: "e.g. chanda@email.com", type: "email" },
          { label: "Phone Number *", value: phone, set: setPhone, placeholder: "e.g. +260 97 123 4567", type: "tel" },
          { label: "Location / City *", value: location, set: setLocation, placeholder: "e.g. Lusaka, Zambia", type: "text" },
        ].map(({ label, value, set, placeholder, type }) => (
          <motion.div key={label} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={grace(0.08)}>
            <label className="text-[10px] font-black uppercase tracking-widest text-[var(--color-secondary)]/50 block mb-2">{label}</label>
            <input type={type} value={value} onChange={e => set(e.target.value)} placeholder={placeholder}
              className="w-full px-4 py-3.5 rounded-2xl border border-[var(--border)] bg-[var(--card)] font-bold text-[14px] text-[var(--color-secondary)] placeholder:text-[var(--color-secondary)]/30 outline-none focus:border-[#E85D3F] transition-colors" />
          </motion.div>
        ))}

        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={grace(0.2)}>
          <label className="text-[10px] font-black uppercase tracking-widest text-[var(--color-secondary)]/50 block mb-3">Investment Interests *</label>
          <div className="flex flex-wrap gap-2">
            {INTERESTS.map(interest => (
              <button key={interest} onClick={() => toggleInterest(interest)}
                className={`px-4 py-2 rounded-full font-black text-[11px] uppercase tracking-widest transition-all active:scale-95 ${selectedInterests.includes(interest) ? 'bg-[#E85D3F] text-white shadow-sm' : 'bg-[var(--card)] border border-[var(--border)] text-[var(--color-secondary)]'}`}>
                {interest}
              </button>
            ))}
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={grace(0.28)}>
          <label className="text-[10px] font-black uppercase tracking-widest text-[var(--color-secondary)]/50 block mb-2">KYC Verification</label>
          <button onClick={() => navigate("/kyc-verification")}
            className="w-full p-4 rounded-2xl border border-[var(--border)] bg-[var(--card)] flex items-center gap-3 active:scale-[0.98] transition-all">
            <div className="w-10 h-10 rounded-full bg-[#E85D3F]/10 flex items-center justify-center shrink-0">
              <ShieldCheck size={20} className="text-[#E85D3F]" strokeWidth={1.5} />
            </div>
            <div className="flex-1 text-left">
              <p className="font-black text-[13px] text-[var(--color-secondary)] uppercase tracking-wide">Verify Identity</p>
              <p className="text-[11px] font-semibold text-[var(--color-secondary)]/40">Complete KYC for full investor access</p>
            </div>
            <ChevronRight size={16} className="text-[var(--color-secondary)]/30" />
          </button>
        </motion.div>

        <button disabled={!isValid} onClick={() => navigate("/crowdfunding/register-investor/preferences")}
          className="w-full py-4 rounded-2xl bg-[#E85D3F] text-white font-black uppercase tracking-widest text-[13px] flex items-center justify-center gap-3 disabled:opacity-40 shadow-md active:scale-95 transition-all">
          Continue <ChevronRight size={18} />
        </button>
      </div>
    </div>
  );
}
