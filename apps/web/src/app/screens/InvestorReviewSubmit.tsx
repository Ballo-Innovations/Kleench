import { useState } from "react";
import { motion } from "motion/react";
import { useNavigate } from "react-router";
import { PageHeader } from "../components/PageHeader";

const grace = (delay = 0) => ({
  delay, duration: 0.45, ease: [0.22, 1, 0.36, 1] as const,
});

const MOCK_PROFILE = {
  type: "Individual",
  name: "Chanda Mwansa",
  email: "chanda@email.com",
  phone: "+260 97 123 4567",
  location: "Lusaka, Zambia",
  interests: ["Energy", "Agriculture", "Real Estate"],
  frequency: "One-Off Investor",
  range: "K5K–25K",
};

function ReviewRow({ label, value }: { label: string; value: string | string[] }) {
  return (
    <div className="flex justify-between items-start py-3 border-b border-[var(--border)] last:border-0">
      <span className="text-[11px] font-black uppercase tracking-widest text-[var(--color-secondary)]/40 mt-0.5 shrink-0 w-28">{label}</span>
      {Array.isArray(value) ? (
        <div className="flex flex-wrap gap-1.5 justify-end">
          {value.map(v => (
            <span key={v} className="text-[10px] font-black bg-[#E85D3F]/10 text-[#E85D3F] px-2 py-0.5 rounded-full uppercase tracking-wide">{v}</span>
          ))}
        </div>
      ) : (
        <span className="text-[13px] font-black text-[var(--color-secondary)] text-right">{value}</span>
      )}
    </div>
  );
}

export function InvestorReviewSubmit() {
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = () => {
    setSubmitting(true);
    setTimeout(() => navigate("/crowdfunding/register-investor/success"), 1200);
  };

  return (
    <div className="w-full max-w-md mx-auto min-h-screen font-sans pb-32">
      <div className="sticky top-0 z-50">
        <PageHeader title="REVIEW APPLICATION" showBack onBack={() => navigate(-1)} />
      </div>

      <div className="px-5 pt-6">
        <h2 className="font-black text-[20px] text-[var(--color-secondary)] uppercase tracking-tight mb-2">Review & Submit</h2>
        <p className="text-[13px] font-semibold text-[var(--color-secondary)]/50 mb-6">Confirm your investor profile before submitting.</p>

        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={grace(0.1)}
          className="bg-[var(--card)] rounded-2xl border border-[var(--border)] shadow-sm p-4 mb-6">
          <p className="text-[10px] font-black uppercase tracking-widest text-[#E85D3F] mb-3">Investor Profile</p>
          <ReviewRow label="Type" value={MOCK_PROFILE.type} />
          <ReviewRow label="Full Name" value={MOCK_PROFILE.name} />
          <ReviewRow label="Email" value={MOCK_PROFILE.email} />
          <ReviewRow label="Phone" value={MOCK_PROFILE.phone} />
          <ReviewRow label="Location" value={MOCK_PROFILE.location} />
          <ReviewRow label="Interests" value={MOCK_PROFILE.interests} />
          <ReviewRow label="Frequency" value={MOCK_PROFILE.frequency} />
          <ReviewRow label="Range" value={MOCK_PROFILE.range} />
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={grace(0.2)}
          className="bg-[#E85D3F]/5 border border-[#E85D3F]/20 rounded-2xl p-4 mb-8">
          <p className="text-[11px] font-bold text-[var(--color-secondary)]/60 leading-relaxed">
            By submitting, you agree to Kleench's investor terms and privacy policy. Your information is encrypted and securely stored.
          </p>
        </motion.div>

        <button onClick={handleSubmit} disabled={submitting}
          className="w-full py-4 rounded-2xl bg-[#E85D3F] text-white font-black uppercase tracking-widest text-[13px] shadow-md active:scale-95 transition-all disabled:opacity-70">
          {submitting ? "Submitting..." : "Submit Application"}
        </button>
      </div>
    </div>
  );
}
