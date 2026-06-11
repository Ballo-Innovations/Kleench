import { useState } from "react";
import { motion } from "motion/react";
import { ChevronRight, Upload, ShieldCheck, Copy, Check, X, FileText } from "lucide-react";
import { useNavigate } from "react-router";
import { PageHeader } from "../components/PageHeader";
import { toast } from "sonner";

const grace = (delay = 0) => ({
  delay, duration: 0.45, ease: [0.22, 1, 0.36, 1] as const,
});

const SPECIALIZATIONS = [
  "Agriculture", "Construction", "Education", "Finance", "Health",
  "Real Estate", "Retail", "Technology", "Transport", "Others",
];

export function InvestmentAgentDetails() {
  const navigate = useNavigate();
  const [specialization, setSpecialization] = useState("");
  const [catOpen, setCatOpen] = useState(false);
  const [agentCode, setAgentCode] = useState("");
  const [licenceFile, setLicenceFile] = useState<File | null>(null);
  const [codeCopied, setCodeCopied] = useState(false);

  const generateCode = () => {
    const code = "KIA-" + Math.random().toString(36).substring(2, 8).toUpperCase();
    setAgentCode(code);
  };

  const copyCode = () => {
    navigator.clipboard.writeText(agentCode).catch(() => {});
    setCodeCopied(true);
    toast.success("Agent code copied!");
    setTimeout(() => setCodeCopied(false), 2000);
  };

  const isValid = specialization.length > 0;

  return (
    <div className="w-full max-w-md mx-auto font-sans pb-24">
      <div className="sticky top-0 z-50">
        <PageHeader title="AGENT DETAILS" showBack onBack={() => navigate(-1)} />
      </div>

      <div className="px-5 pt-6 space-y-5">
        <div>
          <h2 className="font-black text-[20px] text-[var(--color-secondary)] uppercase tracking-tight mb-1">Complete Registration</h2>
          <p className="text-[13px] font-semibold text-[var(--color-secondary)]/50">Fill in your details to finalize agent registration.</p>
        </div>

        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={grace(0.1)} className="relative">
          <label className="text-[10px] font-black uppercase tracking-widest text-[var(--color-secondary)]/50 block mb-2">Specialization *</label>
          <button onClick={() => setCatOpen(v => !v)}
            className="w-full px-4 py-3.5 rounded-2xl border border-[var(--border)] bg-[var(--card)] font-bold text-[14px] text-left flex items-center justify-between focus:border-[#E85D3F] transition-colors">
            <span className={specialization ? 'text-[var(--color-secondary)]' : 'text-[var(--color-secondary)]/30'}>{specialization || "Select specialization..."}</span>
            <ChevronRight size={16} className={`transition-transform ${catOpen ? 'rotate-90' : ''}`} />
          </button>
          {catOpen && (
            <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
              className="absolute top-full left-0 right-0 z-20 mt-1 bg-[var(--card)] border border-[var(--border)] rounded-2xl shadow-lg overflow-hidden max-h-48 overflow-y-auto">
              {SPECIALIZATIONS.map(s => (
                <button key={s} onClick={() => { setSpecialization(s); setCatOpen(false); }}
                  className="w-full px-4 py-3 text-left font-bold text-[13px] text-[var(--color-secondary)] hover:bg-[var(--app-bg-muted)] transition-colors flex items-center justify-between">
                  {s}
                  {specialization === s && <Check size={14} className="text-[#E85D3F]" />}
                </button>
              ))}
            </motion.div>
          )}
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={grace(0.18)}>
          <label className="text-[10px] font-black uppercase tracking-widest text-[var(--color-secondary)]/50 block mb-2">KYC Verification</label>
          <button onClick={() => navigate("/kyc-verification")}
            className="w-full p-4 rounded-2xl border border-[var(--border)] bg-[var(--card)] flex items-center gap-3 active:scale-[0.98] transition-all">
            <div className="w-10 h-10 rounded-full bg-[#E85D3F]/10 flex items-center justify-center shrink-0">
              <ShieldCheck size={20} className="text-[#E85D3F]" strokeWidth={1.5} />
            </div>
            <div className="flex-1 text-left">
              <p className="font-black text-[13px] text-[var(--color-secondary)] uppercase tracking-wide">Verify Identity</p>
              <p className="text-[11px] font-semibold text-[var(--color-secondary)]/40">Complete KYC for full agent access</p>
            </div>
            <ChevronRight size={16} className="text-[var(--color-secondary)]/30" />
          </button>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={grace(0.26)}>
          <label className="text-[10px] font-black uppercase tracking-widest text-[var(--color-secondary)]/50 block mb-2">Agent Code</label>
          <div className="bg-[var(--card)] rounded-2xl border border-[var(--border)] p-4">
            {agentCode ? (
              <div className="flex items-center justify-between">
                <span className="font-black text-[18px] text-[#E85D3F] tracking-widest">{agentCode}</span>
                <button onClick={copyCode} className="flex items-center gap-1.5 text-[var(--color-secondary)]/50 active:scale-90 transition-transform">
                  {codeCopied ? <Check size={16} className="text-green-500" /> : <Copy size={16} />}
                  <span className="text-[10px] font-black uppercase tracking-wide">{codeCopied ? 'Copied' : 'Copy'}</span>
                </button>
              </div>
            ) : (
              <button onClick={generateCode}
                className="w-full py-3 rounded-xl bg-[#E85D3F]/10 text-[#E85D3F] font-black text-[12px] uppercase tracking-widest active:scale-95 transition-all">
                Generate Agent Code
              </button>
            )}
          </div>
        </motion.div>

        {/* Dealer License Upload */}
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={grace(0.34)}>
          <label className="text-[10px] font-black uppercase tracking-widest text-[var(--color-secondary)]/50 block mb-2">Dealer Licence (Optional)</label>
          <label
            htmlFor="invest-agent-licence"
            className={`w-full flex flex-col items-center justify-center gap-2 rounded-2xl border-2 border-dashed p-6 cursor-pointer transition-all active:scale-[0.98]
              ${licenceFile ? 'border-[#E85D3F] bg-[#E85D3F]/5' : 'border-[var(--border)] bg-[var(--card)]'}`}
          >
            {licenceFile ? (
              <div className="w-full flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#E85D3F]/10 flex items-center justify-center shrink-0">
                  <FileText size={20} className="text-[#E85D3F]" strokeWidth={1.5} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-black text-[13px] text-[var(--color-secondary)] truncate">{licenceFile.name}</p>
                  <p className="text-[10px] font-bold text-[var(--color-secondary)]/40">{(licenceFile.size / 1024).toFixed(0)} KB</p>
                </div>
                <button
                  type="button"
                  onClick={(e) => { e.preventDefault(); e.stopPropagation(); setLicenceFile(null); }}
                  className="w-7 h-7 rounded-full bg-[var(--app-bg-muted)] flex items-center justify-center shrink-0"
                >
                  <X size={14} className="text-[var(--color-secondary)]/60" />
                </button>
              </div>
            ) : (
              <>
                <div className="w-12 h-12 rounded-2xl bg-[var(--app-bg-muted)] flex items-center justify-center">
                  <Upload size={24} className="text-[var(--color-secondary)]/40" strokeWidth={1.5} />
                </div>
                <div className="text-center">
                  <p className="font-black text-[13px] text-[var(--color-secondary)] uppercase tracking-wide">Upload Dealer Licence</p>
                  <p className="text-[10px] font-bold text-[var(--color-secondary)]/40 mt-0.5">PDF or image — Max 5MB</p>
                </div>
              </>
            )}
            <input
              id="invest-agent-licence"
              type="file"
              accept=".pdf,image/*"
              className="hidden"
              onChange={(e) => {
                const f = e.target.files?.[0];
                if (f) { setLicenceFile(f); toast.success("Licence uploaded!"); }
              }}
            />
          </label>
        </motion.div>

        <button disabled={!isValid} onClick={() => navigate("/crowdfunding/register-agent/success")}
          className="w-full py-4 rounded-2xl bg-[#E85D3F] text-white font-black uppercase tracking-widest text-[13px] shadow-md active:scale-95 transition-all disabled:opacity-40">
          Confirm Registration
        </button>
      </div>
    </div>
  );
}
