import { useState } from "react";
import { useNavigate } from "react-router";
import { ChevronRight, Upload, Check } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { PageHeader } from "../components/PageHeader";

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
  "Agriculture",
  "Construction",
  "Logistics & Transport",
  "Finance & Banking",
  "Retail & Commerce",
  "Technology",
  "Health & Wellness",
  "Education",
  "Mining & Resources",
  "Tourism & Hospitality",
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

  const handleSelectAgent = (agent: AgentType) => {
    setSelectedAgent(agent);
    setStep("form");
  };

  const handleConfirm = () => {
    setStep("success");
  };

  const handleBack = () => {
    if (step === "form") setStep("select");
    else if (step === "select") navigate(-1);
  };

  const generateCode = () => {
    const code = "KL-" + Math.random().toString(36).substring(2, 8).toUpperCase();
    setAgentCode(code);
  };

  return (
    <div className="w-full min-h-screen bg-transparent pb-32 font-sans text-slate-800">
      {step !== "success" && (
        <PageHeader title="Register Agent" showBack onBack={handleBack} />
      )}

      <AnimatePresence mode="wait">
        {/* Step 1 — Agent type selection */}
        {step === "select" && (
          <motion.div key="select" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="px-4 pt-4 space-y-3">
            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest px-1">Select Agent Type</p>
            {AGENT_TYPES.map((agent) => (
              <motion.button
                key={agent}
                whileTap={{ scale: 0.97 }}
                onClick={() => handleSelectAgent(agent)}
                className="w-full bg-orange-500 text-white rounded-2xl p-4 flex items-center justify-between shadow-md shadow-orange-500/20 active:scale-95 transition-all"
              >
                <div className="text-left">
                  <p className="font-black text-sm uppercase tracking-tight">{agent}</p>
                  <p className="text-[10px] text-orange-100 mt-0.5 font-semibold">{AGENT_DESCS[agent]}</p>
                </div>
                <ChevronRight size={20} className="text-orange-100 flex-shrink-0" />
              </motion.button>
            ))}
          </motion.div>
        )}

        {/* Step 2 — Agent registration form */}
        {step === "form" && (
          <motion.div key="form" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="px-4 pt-4 space-y-4">
            <div className="bg-orange-50 border border-orange-200 rounded-2xl px-4 py-3">
              <p className="text-[10px] font-bold text-orange-400 uppercase tracking-widest">Selected</p>
              <p className="font-black text-orange-600 text-sm mt-0.5">{selectedAgent}</p>
            </div>

            <div className="bg-[var(--app-bg)] rounded-2xl border border-slate-100 shadow-sm p-4 space-y-4">
              {/* Account type */}
              <div>
                <label className="text-[10px] font-black text-orange-500 uppercase tracking-widest mb-1.5 block">Type</label>
                <div className="flex gap-3">
                  {(["Individual", "Company"] as AccountType[]).map((t) => (
                    <button
                      key={t}
                      onClick={() => setAccountType(t)}
                      className={`flex-1 py-2.5 rounded-xl text-[11px] font-black uppercase tracking-wider transition-all active:scale-95 ${
                        accountType === t
                          ? "bg-orange-500 text-white shadow-sm"
                          : "bg-slate-100 text-slate-500 border border-slate-200"
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>

              {/* Specialization */}
              <div className="relative">
                <label className="text-[10px] font-black text-orange-500 uppercase tracking-widest mb-1.5 block">Specialized In?</label>
                <button
                  onClick={() => setShowSpecDropdown(!showSpecDropdown)}
                  className="w-full h-11 bg-[var(--app-bg-muted)] border border-slate-200 rounded-xl px-4 flex items-center justify-between text-sm font-semibold text-slate-700"
                >
                  {specialization}
                  <ChevronRight size={14} className={`text-slate-400 transition-transform ${showSpecDropdown ? "rotate-90" : ""}`} />
                </button>
                {showSpecDropdown && (
                  <div className="absolute z-50 w-full mt-1 bg-[var(--app-bg)] border border-slate-200 rounded-xl shadow-lg overflow-hidden">
                    {SPECIALIZATIONS.map((s) => (
                      <button
                        key={s}
                        onClick={() => { setSpecialization(s); setShowSpecDropdown(false); }}
                        className={`w-full px-4 py-2.5 text-left text-sm font-semibold transition-all ${
                          specialization === s ? "bg-orange-50 text-orange-600" : "text-slate-700 hover:bg-[var(--app-bg-muted)]"
                        }`}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* KYC */}
              <div className="bg-[var(--app-bg-muted)] border border-slate-200 rounded-xl p-3">
                <p className="text-[11px] font-bold text-slate-500 mb-2">Complete verification to unlock full wallet access.</p>
                <button onClick={() => navigate("/kyc-verification")} className="px-5 py-2 bg-[var(--app-text)] text-white rounded-lg font-black text-[11px] uppercase tracking-wider active:scale-95 transition-all">
                  KYC
                </button>
              </div>

              {/* Agent Code */}
              <div>
                <label className="text-[10px] font-black text-orange-500 uppercase tracking-widest mb-1.5 block">Agent Code</label>
                <div className="flex gap-2">
                  <div className="flex-1 h-11 border-2 border-dashed border-slate-300 rounded-xl flex items-center px-4">
                    <span className={`text-sm font-black tracking-widest ${agentCode ? "text-slate-800" : "text-slate-300"}`}>
                      {agentCode || "- - - - - - - -"}
                    </span>
                  </div>
                  <button onClick={generateCode} className="px-4 h-11 bg-[var(--app-text)] text-white rounded-xl font-black text-[11px] uppercase tracking-wider active:scale-95 transition-all whitespace-nowrap">
                    Generate
                  </button>
                </div>
              </div>

              {/* Dealer Licence */}
              <div>
                <label className="text-[10px] font-black text-orange-500 uppercase tracking-widest mb-1.5 block">Dealer Licence</label>
                <button className="w-full h-11 bg-[var(--app-bg-muted)] border border-dashed border-slate-300 rounded-xl flex items-center justify-center gap-2 text-[11px] font-black text-slate-500 uppercase tracking-wider active:scale-95 transition-all">
                  <Upload size={14} />
                  Upload
                </button>
              </div>
            </div>

            <button onClick={handleConfirm} className="w-full h-14 bg-[var(--app-text)] text-white rounded-2xl font-black uppercase tracking-widest text-xs shadow-lg shadow-[var(--app-text)]/25 active:scale-95 transition-all">
              Confirm
            </button>
          </motion.div>
        )}

        {/* Step 3 — Congratulations */}
        {step === "success" && (
          <motion.div key="success" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="flex flex-col items-center justify-center min-h-screen px-6 pb-20 text-center">
            {/* Green check */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", delay: 0.2 }}
              className="w-24 h-24 rounded-full bg-green-500 flex items-center justify-center shadow-xl shadow-green-500/30 mb-6"
            >
              <Check size={48} className="text-white" strokeWidth={3} />
            </motion.div>

            <div className="bg-orange-500 px-6 py-2 rounded-full mb-4">
              <p className="font-black text-white text-sm uppercase tracking-[0.3em]">CONGRATULATIONS</p>
            </div>

            <h2 className="text-xl font-black text-[var(--app-text-slate)] mb-1">John Doe</h2>
            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-2">ID: KL-AGT-00291</p>
            <p className="text-[12px] text-slate-500 mb-6 leading-relaxed max-w-xs">
              You can now create, upload, share and sale.
            </p>

            <div className="flex items-center gap-2 mb-2">
              <span className="bg-green-500 text-white px-4 py-1.5 rounded-full font-black text-[11px] uppercase tracking-widest">REGISTERED</span>
            </div>

            <div className="bg-[var(--app-bg-muted)] border border-slate-200 rounded-2xl p-4 w-full mb-8">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Earnings</p>
              <p className="text-3xl font-black text-slate-800">K000.00</p>
            </div>

            <div className="flex gap-3 w-full">
              <button onClick={() => navigate("/advert")} className="flex-1 h-13 py-3.5 bg-orange-500 text-white rounded-2xl font-black text-[11px] uppercase tracking-widest shadow-md shadow-orange-500/30 active:scale-95 transition-all">
                Get Started
              </button>
              <button onClick={() => navigate("/")} className="flex-1 py-3.5 bg-[var(--app-bg)] text-slate-700 rounded-2xl font-black text-[11px] uppercase tracking-widest border border-slate-200 active:scale-95 transition-all">
                Home
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
