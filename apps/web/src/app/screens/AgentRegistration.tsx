import { useState } from "react";
import { useNavigate } from "react-router";
import { ChevronRight, Check } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { PageHeader } from "../components/PageHeader";
import { FileUploadZone, UploadedFile } from "../components/FileUploadZone";

type AgentType = "ONBOARDING AGENT" | "DEALER AGENT" | "ADVERTISING AGENT" | "GENERAL AGENT" | "SPECIALIZED AGENT";
type AccountType = "Individual" | "Company";
type Step = "select" | "form" | "success";

const AGENT_TYPES: AgentType[] = [
  "ONBOARDING AGENT",
  "DEALER AGENT",
  "ADVERTISING AGENT",
  "GENERAL AGENT",
  "SPECIALIZED AGENT",
];

const SPECIALIZATIONS = [
  "Agriculture", "Construction", "Logistics & Transport", "Finance & Banking",
  "Retail & Commerce", "Technology", "Health & Wellness", "Education",
  "Mining & Resources", "Tourism & Hospitality",
];

const AGENT_DESCS: Record<AgentType, string> = {
  "ONBOARDING AGENT": "Help new users join and navigate the platform",
  "DEALER AGENT": "Manage product listings and transactions",
  "ADVERTISING AGENT": "Create and manage advertising campaigns",
  "GENERAL AGENT": "Assist with general platform operations",
  "SPECIALIZED AGENT": "Focus on a specific industry or niche",
};

export function AgentRegistration() {
  const navigate = useNavigate();
  const [step, setStep] = useState<Step>("select");
  const [selectedAgent, setSelectedAgent] = useState<AgentType | null>(null);
  const [accountType, setAccountType] = useState<AccountType>("Individual");
  const [specialization, setSpecialization] = useState(SPECIALIZATIONS[0]);
  const [agentCode, setAgentCode] = useState("");
  const [showSpecDropdown, setShowSpecDropdown] = useState(false);
  const [licenseFiles, setLicenseFiles] = useState<UploadedFile[]>([]);

  const handleSelectAgent = (agent: AgentType) => {
    setSelectedAgent(agent);
    setStep("form");
  };

  const handleConfirm = () => {
    try {
      const existing = JSON.parse(localStorage.getItem("kleench_agent_registrations") || "[]");
      const registration = {
        id: `KL-AGT-${Date.now().toString().slice(-5)}`,
        agentType: selectedAgent,
        accountType,
        specialization,
        agentCode: agentCode || `KL-${Math.random().toString(36).substring(2, 8).toUpperCase()}`,
        license: licenseFiles[0]
          ? { name: licenseFiles[0].file.name, size: licenseFiles[0].file.size }
          : null,
        registeredAt: new Date().toISOString(),
      };
      localStorage.setItem("kleench_agent_registrations", JSON.stringify([registration, ...existing]));
    } catch {}
    setStep("success");
  };

  const handleBack = () => {
    if (step === "form") setStep("select");
    else if (step === "select") navigate(-1);
  };

  const generateCode = () => {
    setAgentCode("KL-" + Math.random().toString(36).substring(2, 8).toUpperCase());
  };

  return (
    <div className="w-full bg-transparent pb-24 font-sans">
      {step !== "success" && (
        <PageHeader title="REGISTER AGENT" showBack onBack={handleBack} />
      )}

      <AnimatePresence mode="wait">
        {/* Step 1 — Agent type selection */}
        {step === "select" && (
          <motion.div key="select" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="px-5 pt-5 space-y-3">
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[var(--color-secondary)]/50">Select Agent Type</p>
            {AGENT_TYPES.map((agent) => (
              <motion.button
                key={agent}
                whileTap={{ scale: 0.97 }}
                onClick={() => handleSelectAgent(agent)}
                className="w-full bg-[var(--color-secondary)] text-white rounded-2xl p-4 flex items-center justify-between shadow-md active:scale-95 transition-all"
              >
                <div className="text-left">
                  <p className="font-black text-[12px] uppercase tracking-wide">{agent}</p>
                  <p className="text-[10px] text-white/60 mt-0.5 font-semibold">{AGENT_DESCS[agent]}</p>
                </div>
                <ChevronRight size={18} className="text-white/60 shrink-0" />
              </motion.button>
            ))}
          </motion.div>
        )}

        {/* Step 2 — Registration form */}
        {step === "form" && (
          <motion.div key="form" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="px-5 pt-5 space-y-4">
            {/* Selected agent banner */}
            <div className="bg-[var(--color-secondary)]/8 border border-[var(--color-secondary)]/20 rounded-2xl px-4 py-3">
              <p className="text-[9px] font-black uppercase tracking-[0.3em] text-[var(--color-secondary)]/50">Selected</p>
              <p className="font-black text-[var(--app-text)] text-[13px] mt-0.5 uppercase tracking-wide">{selectedAgent}</p>
            </div>

            <div className="bg-[var(--app-bg)] rounded-2xl border border-[var(--border)] shadow-sm p-5 space-y-5">
              {/* Account type */}
              <div className="space-y-2">
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[var(--color-secondary)]/50">Account Type</p>
                <div className="flex gap-3">
                  {(["Individual", "Company"] as AccountType[]).map((t) => (
                    <button
                      key={t}
                      onClick={() => setAccountType(t)}
                      className={`flex-1 py-3 rounded-xl text-[11px] font-black uppercase tracking-wide transition-all active:scale-95 border ${
                        accountType === t
                          ? "bg-[var(--color-secondary)] text-white border-[var(--color-secondary)]"
                          : "bg-[var(--app-bg)] text-[var(--app-text)]/60 border-[var(--border)]"
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>

              {/* Specialization */}
              <div className="relative space-y-2">
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[var(--color-secondary)]/50">Specialization</p>
                <button
                  onClick={() => setShowSpecDropdown(!showSpecDropdown)}
                  className="w-full h-12 bg-[var(--app-bg)] border border-[var(--border)] rounded-xl px-4 flex items-center justify-between text-[13px] font-semibold text-[var(--app-text)]"
                >
                  {specialization}
                  <ChevronRight size={14} className={`text-[var(--app-text)]/40 transition-transform ${showSpecDropdown ? "rotate-90" : ""}`} />
                </button>
                {showSpecDropdown && (
                  <div className="absolute z-50 w-full mt-1 bg-[var(--app-bg)] border border-[var(--border)] rounded-xl shadow-lg overflow-hidden">
                    {SPECIALIZATIONS.map((s) => (
                      <button
                        key={s}
                        onClick={() => { setSpecialization(s); setShowSpecDropdown(false); }}
                        className={`w-full px-4 py-2.5 text-left text-[13px] font-semibold transition-all ${
                          specialization === s
                            ? "bg-[var(--color-secondary)]/8 text-[var(--app-text)]"
                            : "text-[var(--app-text)]/70 hover:bg-[var(--border)]/30"
                        }`}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Agent Code */}
              <div className="space-y-2">
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[var(--color-secondary)]/50">Agent Code</p>
                <div className="flex gap-2">
                  <div className="flex-1 h-12 border border-dashed border-[var(--border)] rounded-xl flex items-center px-4 bg-[var(--app-bg)]">
                    <span className={`text-[13px] font-black tracking-widest ${agentCode ? "text-[var(--app-text)]" : "text-[var(--app-text)]/30"}`}>
                      {agentCode || "— — — — — —"}
                    </span>
                  </div>
                  <button
                    onClick={generateCode}
                    className="px-4 h-12 bg-[var(--color-secondary)] text-white rounded-xl font-black text-[11px] uppercase tracking-wide active:scale-95 transition-all whitespace-nowrap"
                  >
                    Generate
                  </button>
                </div>
              </div>

              {/* Dealer Licence — real upload */}
              <FileUploadZone
                label="Dealer Licence"
                accept=".pdf,image/*"
                multiple={false}
                hint="Optional"
                onFilesChange={setLicenseFiles}
              />
            </div>

            <button
              onClick={handleConfirm}
              className="w-full py-4 bg-[var(--color-secondary)] text-white rounded-2xl font-black uppercase tracking-widest text-[12px] shadow-md active:scale-95 transition-all"
            >
              Confirm Registration
            </button>
          </motion.div>
        )}

        {/* Step 3 — Success */}
        {step === "success" && (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center justify-center min-h-[80dvh] px-6 pb-20 text-center"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", delay: 0.2 }}
              className="w-24 h-24 rounded-full bg-[#059669] flex items-center justify-center shadow-xl mb-6"
            >
              <Check size={48} className="text-white" strokeWidth={2.5} />
            </motion.div>

            <div className="bg-[var(--color-secondary)] px-6 py-2 rounded-full mb-4">
              <p className="font-black text-white text-[12px] uppercase tracking-[0.3em]">REGISTERED</p>
            </div>

            <h2 className="text-[20px] font-black text-[var(--app-text)] uppercase tracking-tight mb-1">{selectedAgent}</h2>
            <p className="text-[11px] font-bold text-[var(--color-secondary)]/50 uppercase tracking-widest mb-2">{accountType} · {specialization}</p>
            <p className="text-[12px] text-[var(--color-secondary)]/60 mb-8 leading-relaxed max-w-xs">
              Your agent profile is now active. You can start creating listings, managing campaigns, and earning commissions.
            </p>

            <div className="bg-[var(--app-bg)] border border-[var(--border)] rounded-2xl p-4 w-full mb-8 shadow-sm">
              <p className="text-[9px] font-black uppercase tracking-[0.3em] text-[var(--color-secondary)]/50 mb-1">Earnings</p>
              <p className="text-[28px] font-black text-[var(--app-text)]">K0.00</p>
            </div>

            <div className="flex gap-3 w-full">
              <button
                onClick={() => navigate("/marketplace/agent")}
                className="flex-1 py-4 bg-[var(--color-secondary)] text-white rounded-2xl font-black text-[11px] uppercase tracking-widest shadow-md active:scale-95 transition-all"
              >
                Go To Agent Hub
              </button>
              <button
                onClick={() => navigate("/")}
                className="flex-1 py-4 bg-[var(--app-bg)] text-[var(--app-text)] rounded-2xl font-black text-[11px] uppercase tracking-widest border border-[var(--border)] active:scale-95 transition-all"
              >
                Home
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
