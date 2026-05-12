import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronRight, Check, FileText, X } from "lucide-react";
import { useNavigate } from "react-router";
import { PageHeader } from "../components/PageHeader";
import { toast } from "sonner";

const grace = (delay = 0) => ({
  delay, duration: 0.45, ease: [0.22, 1, 0.36, 1] as const,
});

const CATEGORIES = ["Energy", "Agriculture", "Real Estate", "Tech", "Retail"];
const DURATIONS = ["6 months", "1 year", "2 years", "5 years"];

export function CreateInvestment() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [catOpen, setCatOpen] = useState(false);
  const [description, setDescription] = useState("");

  const [targetAmount, setTargetAmount] = useState("");
  const [minInvestment, setMinInvestment] = useState("");
  const [roi, setRoi] = useState("");
  const [duration, setDuration] = useState("");
  const [durOpen, setDurOpen] = useState(false);

  const [bizRegFile, setBizRegFile] = useState<File | null>(null);
  const [prospectusFile, setProspectusFile] = useState<File | null>(null);
  const [finStmtFile, setFinStmtFile] = useState<File | null>(null);

  const step1Valid = title.trim().length > 0 && category.length > 0 && description.trim().length > 0;
  const step2Valid = targetAmount.length > 0 && minInvestment.length > 0 && roi.length > 0 && duration.length > 0;

  const STEPS = ["Basics", "Financials", "Documents", "Review"];

  return (
    <div className="w-full max-w-md mx-auto min-h-screen font-sans pb-32">
      <div className="sticky top-0 z-50">
        <PageHeader title="CREATE INVESTMENT" showBack onBack={() => navigate(-1)} />
      </div>

      <div className="px-5 pt-6">
        <div className="flex gap-1 mb-6">
          {STEPS.map((s, i) => (
            <div key={s} className="flex-1 flex flex-col items-center gap-1">
              <div className={`h-1.5 w-full rounded-full transition-colors ${step > i ? 'bg-[#E85D3F]' : step === i + 1 ? 'bg-[#E85D3F]/50' : 'bg-[var(--border)]'}`} />
              <span className={`text-[9px] font-black uppercase tracking-widest ${step === i + 1 ? 'text-[#E85D3F]' : 'text-[var(--color-secondary)]/30'}`}>{s}</span>
            </div>
          ))}
        </div>

        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div key="step1" initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -24 }} transition={grace(0)} className="space-y-5">
              <div>
                <h2 className="font-black text-[20px] text-[var(--color-secondary)] uppercase tracking-tight mb-1">Campaign Basics</h2>
                <p className="text-[13px] font-semibold text-[var(--color-secondary)]/50">Tell investors about your investment opportunity.</p>
              </div>

              <div>
                <label className="text-[10px] font-black uppercase tracking-widest text-[var(--color-secondary)]/50 block mb-2">Campaign Title *</label>
                <input value={title} onChange={e => setTitle(e.target.value)} placeholder="e.g. Solar Farm Expansion..."
                  className="w-full px-4 py-3.5 rounded-2xl border border-[var(--border)] bg-[var(--card)] font-bold text-[14px] text-[var(--color-secondary)] placeholder:text-[var(--color-secondary)]/30 outline-none focus:border-[#E85D3F] transition-colors" />
              </div>

              <div className="relative">
                <label className="text-[10px] font-black uppercase tracking-widest text-[var(--color-secondary)]/50 block mb-2">Category *</label>
                <button onClick={() => setCatOpen(v => !v)}
                  className="w-full px-4 py-3.5 rounded-2xl border border-[var(--border)] bg-[var(--card)] font-bold text-[14px] text-left flex items-center justify-between focus:border-[#E85D3F] transition-colors">
                  <span className={category ? 'text-[var(--color-secondary)]' : 'text-[var(--color-secondary)]/30'}>{category || "Select category..."}</span>
                  <ChevronRight size={16} className={`transition-transform ${catOpen ? 'rotate-90' : ''}`} />
                </button>
                {catOpen && (
                  <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }}
                    className="absolute top-full left-0 right-0 z-20 mt-1 bg-[var(--card)] border border-[var(--border)] rounded-2xl shadow-lg overflow-hidden">
                    {CATEGORIES.map(c => (
                      <button key={c} onClick={() => { setCategory(c); setCatOpen(false); }}
                        className="w-full px-4 py-3 text-left font-bold text-[13px] text-[var(--color-secondary)] hover:bg-[var(--app-bg-muted)] transition-colors flex items-center justify-between">
                        {c}
                        {category === c && <Check size={14} className="text-[#E85D3F]" />}
                      </button>
                    ))}
                  </motion.div>
                )}
              </div>

              <div>
                <label className="text-[10px] font-black uppercase tracking-widest text-[var(--color-secondary)]/50 block mb-2">Description *</label>
                <textarea value={description} onChange={e => setDescription(e.target.value)} placeholder="Describe the investment opportunity..." rows={4}
                  className="w-full px-4 py-3.5 rounded-2xl border border-[var(--border)] bg-[var(--card)] font-bold text-[14px] text-[var(--color-secondary)] placeholder:text-[var(--color-secondary)]/30 outline-none focus:border-[#E85D3F] transition-colors resize-none" />
              </div>

              <button disabled={!step1Valid} onClick={() => setStep(2)}
                className="w-full py-4 rounded-2xl bg-[#E85D3F] text-white font-black uppercase tracking-widest text-[13px] flex items-center justify-center gap-3 disabled:opacity-40 shadow-md active:scale-95 transition-all">
                Next <ChevronRight size={18} />
              </button>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div key="step2" initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -24 }} transition={grace(0)} className="space-y-5">
              <div>
                <h2 className="font-black text-[20px] text-[var(--color-secondary)] uppercase tracking-tight mb-1">Financials</h2>
                <p className="text-[13px] font-semibold text-[var(--color-secondary)]/50">Set the financial parameters for your campaign.</p>
              </div>

              {[
                { label: "Target Amount (K) *", value: targetAmount, set: setTargetAmount, placeholder: "e.g. 500000" },
                { label: "Minimum Investment (K) *", value: minInvestment, set: setMinInvestment, placeholder: "e.g. 2500" },
                { label: "Estimated ROI (%) *", value: roi, set: setRoi, placeholder: "e.g. 15" },
              ].map(({ label, value, set, placeholder }) => (
                <div key={label}>
                  <label className="text-[10px] font-black uppercase tracking-widest text-[var(--color-secondary)]/50 block mb-2">{label}</label>
                  <input type="number" value={value} onChange={e => set(e.target.value)} placeholder={placeholder}
                    className="w-full px-4 py-3.5 rounded-2xl border border-[var(--border)] bg-[var(--card)] font-bold text-[14px] text-[var(--color-secondary)] placeholder:text-[var(--color-secondary)]/30 outline-none focus:border-[#E85D3F] transition-colors" />
                </div>
              ))}

              <div className="relative">
                <label className="text-[10px] font-black uppercase tracking-widest text-[var(--color-secondary)]/50 block mb-2">Investment Duration *</label>
                <button onClick={() => setDurOpen(v => !v)}
                  className="w-full px-4 py-3.5 rounded-2xl border border-[var(--border)] bg-[var(--card)] font-bold text-[14px] text-left flex items-center justify-between transition-colors">
                  <span className={duration ? 'text-[var(--color-secondary)]' : 'text-[var(--color-secondary)]/30'}>{duration || "Select duration..."}</span>
                  <ChevronRight size={16} className={`transition-transform ${durOpen ? 'rotate-90' : ''}`} />
                </button>
                {durOpen && (
                  <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }}
                    className="absolute top-full left-0 right-0 z-20 mt-1 bg-[var(--card)] border border-[var(--border)] rounded-2xl shadow-lg overflow-hidden">
                    {DURATIONS.map(d => (
                      <button key={d} onClick={() => { setDuration(d); setDurOpen(false); }}
                        className="w-full px-4 py-3 text-left font-bold text-[13px] text-[var(--color-secondary)] hover:bg-[var(--app-bg-muted)] transition-colors flex items-center justify-between">
                        {d}
                        {duration === d && <Check size={14} className="text-[#E85D3F]" />}
                      </button>
                    ))}
                  </motion.div>
                )}
              </div>

              <div className="flex gap-3">
                <button onClick={() => setStep(1)}
                  className="flex-1 py-4 rounded-2xl border border-[var(--border)] bg-[var(--card)] text-[var(--color-secondary)] font-black uppercase tracking-widest text-[12px] active:scale-95 transition-all">
                  Back
                </button>
                <button disabled={!step2Valid} onClick={() => setStep(3)}
                  className="flex-1 py-4 rounded-2xl bg-[#E85D3F] text-white font-black uppercase tracking-widest text-[13px] flex items-center justify-center gap-2 disabled:opacity-40 shadow-md active:scale-95 transition-all">
                  Next <ChevronRight size={16} />
                </button>
              </div>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div key="step3" initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -24 }} transition={grace(0)} className="space-y-5">
              <div>
                <h2 className="font-black text-[20px] text-[var(--color-secondary)] uppercase tracking-tight mb-1">Documents</h2>
                <p className="text-[13px] font-semibold text-[var(--color-secondary)]/50">Upload required documentation for your campaign.</p>
              </div>

              {/* Business Registration */}
              <div>
                <label className="text-[10px] font-black uppercase tracking-widest text-[var(--color-secondary)]/50 block mb-2">Business Registration *</label>
                <label
                  htmlFor="biz-reg-upload"
                  className={`w-full flex flex-col items-center justify-center gap-2 rounded-2xl border-2 border-dashed p-5 cursor-pointer transition-all active:scale-[0.98]
                    ${bizRegFile ? 'border-[#E85D3F] bg-[#E85D3F]/5' : 'border-[var(--border)] bg-[var(--card)]'}`}
                >
                  {bizRegFile ? (
                    <div className="w-full flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-[#E85D3F]/10 flex items-center justify-center shrink-0">
                        <FileText size={20} className="text-[#E85D3F]" strokeWidth={1.5} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-black text-[13px] text-[var(--color-secondary)] truncate">{bizRegFile.name}</p>
                        <p className="text-[10px] font-bold text-[var(--color-secondary)]/40">{(bizRegFile.size / 1024).toFixed(0)} KB</p>
                      </div>
                      <button
                        type="button"
                        onClick={(e) => { e.preventDefault(); e.stopPropagation(); setBizRegFile(null); }}
                        className="w-7 h-7 rounded-full bg-[var(--app-bg-muted)] flex items-center justify-center shrink-0"
                      >
                        <X size={14} className="text-[var(--color-secondary)]/60" />
                      </button>
                    </div>
                  ) : (
                    <>
                      <div className="w-10 h-10 rounded-xl bg-[var(--app-bg-muted)] flex items-center justify-center">
                        <FileText size={20} className="text-[var(--color-secondary)]/40" strokeWidth={1.5} />
                      </div>
                      <div className="text-center">
                        <p className="font-black text-[13px] text-[var(--color-secondary)] uppercase tracking-wide">Upload Business Registration</p>
                        <p className="text-[10px] font-bold text-[var(--color-secondary)]/40 mt-0.5">PDF or image — Max 10MB</p>
                      </div>
                    </>
                  )}
                  <input
                    id="biz-reg-upload"
                    type="file"
                    accept=".pdf,.doc,.docx,image/*"
                    className="hidden"
                    onChange={(e) => { const f = e.target.files?.[0]; if (f) { setBizRegFile(f); toast.success(`${f.name} uploaded!`); } }}
                  />
                </label>
              </div>

              {/* Prospectus */}
              <div>
                <label className="text-[10px] font-black uppercase tracking-widest text-[var(--color-secondary)]/50 block mb-2">Prospectus *</label>
                <label
                  htmlFor="prospectus-upload"
                  className={`w-full flex flex-col items-center justify-center gap-2 rounded-2xl border-2 border-dashed p-5 cursor-pointer transition-all active:scale-[0.98]
                    ${prospectusFile ? 'border-[#E85D3F] bg-[#E85D3F]/5' : 'border-[var(--border)] bg-[var(--card)]'}`}
                >
                  {prospectusFile ? (
                    <div className="w-full flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-[#E85D3F]/10 flex items-center justify-center shrink-0">
                        <FileText size={20} className="text-[#E85D3F]" strokeWidth={1.5} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-black text-[13px] text-[var(--color-secondary)] truncate">{prospectusFile.name}</p>
                        <p className="text-[10px] font-bold text-[var(--color-secondary)]/40">{(prospectusFile.size / 1024).toFixed(0)} KB</p>
                      </div>
                      <button
                        type="button"
                        onClick={(e) => { e.preventDefault(); e.stopPropagation(); setProspectusFile(null); }}
                        className="w-7 h-7 rounded-full bg-[var(--app-bg-muted)] flex items-center justify-center shrink-0"
                      >
                        <X size={14} className="text-[var(--color-secondary)]/60" />
                      </button>
                    </div>
                  ) : (
                    <>
                      <div className="w-10 h-10 rounded-xl bg-[var(--app-bg-muted)] flex items-center justify-center">
                        <FileText size={20} className="text-[var(--color-secondary)]/40" strokeWidth={1.5} />
                      </div>
                      <div className="text-center">
                        <p className="font-black text-[13px] text-[var(--color-secondary)] uppercase tracking-wide">Upload Prospectus</p>
                        <p className="text-[10px] font-bold text-[var(--color-secondary)]/40 mt-0.5">PDF or image — Max 10MB</p>
                      </div>
                    </>
                  )}
                  <input
                    id="prospectus-upload"
                    type="file"
                    accept=".pdf,.doc,.docx,image/*"
                    className="hidden"
                    onChange={(e) => { const f = e.target.files?.[0]; if (f) { setProspectusFile(f); toast.success(`${f.name} uploaded!`); } }}
                  />
                </label>
              </div>

              {/* Financial Statement */}
              <div>
                <label className="text-[10px] font-black uppercase tracking-widest text-[var(--color-secondary)]/50 block mb-2">Financial Statement *</label>
                <label
                  htmlFor="fin-stmt-upload"
                  className={`w-full flex flex-col items-center justify-center gap-2 rounded-2xl border-2 border-dashed p-5 cursor-pointer transition-all active:scale-[0.98]
                    ${finStmtFile ? 'border-[#E85D3F] bg-[#E85D3F]/5' : 'border-[var(--border)] bg-[var(--card)]'}`}
                >
                  {finStmtFile ? (
                    <div className="w-full flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-[#E85D3F]/10 flex items-center justify-center shrink-0">
                        <FileText size={20} className="text-[#E85D3F]" strokeWidth={1.5} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-black text-[13px] text-[var(--color-secondary)] truncate">{finStmtFile.name}</p>
                        <p className="text-[10px] font-bold text-[var(--color-secondary)]/40">{(finStmtFile.size / 1024).toFixed(0)} KB</p>
                      </div>
                      <button
                        type="button"
                        onClick={(e) => { e.preventDefault(); e.stopPropagation(); setFinStmtFile(null); }}
                        className="w-7 h-7 rounded-full bg-[var(--app-bg-muted)] flex items-center justify-center shrink-0"
                      >
                        <X size={14} className="text-[var(--color-secondary)]/60" />
                      </button>
                    </div>
                  ) : (
                    <>
                      <div className="w-10 h-10 rounded-xl bg-[var(--app-bg-muted)] flex items-center justify-center">
                        <FileText size={20} className="text-[var(--color-secondary)]/40" strokeWidth={1.5} />
                      </div>
                      <div className="text-center">
                        <p className="font-black text-[13px] text-[var(--color-secondary)] uppercase tracking-wide">Upload Financial Statement</p>
                        <p className="text-[10px] font-bold text-[var(--color-secondary)]/40 mt-0.5">PDF or image — Max 10MB</p>
                      </div>
                    </>
                  )}
                  <input
                    id="fin-stmt-upload"
                    type="file"
                    accept=".pdf,.doc,.docx,image/*"
                    className="hidden"
                    onChange={(e) => { const f = e.target.files?.[0]; if (f) { setFinStmtFile(f); toast.success(`${f.name} uploaded!`); } }}
                  />
                </label>
              </div>

              <div className="flex gap-3">
                <button onClick={() => setStep(2)}
                  className="flex-1 py-4 rounded-2xl border border-[var(--border)] bg-[var(--card)] text-[var(--color-secondary)] font-black uppercase tracking-widest text-[12px] active:scale-95 transition-all">
                  Back
                </button>
                <button onClick={() => setStep(4)}
                  className="flex-1 py-4 rounded-2xl bg-[#E85D3F] text-white font-black uppercase tracking-widest text-[13px] flex items-center justify-center gap-2 shadow-md active:scale-95 transition-all">
                  Next <ChevronRight size={16} />
                </button>
              </div>
            </motion.div>
          )}

          {step === 4 && (
            <motion.div key="step4" initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -24 }} transition={grace(0)} className="space-y-5">
              <div>
                <h2 className="font-black text-[20px] text-[var(--color-secondary)] uppercase tracking-tight mb-1">Review & Submit</h2>
                <p className="text-[13px] font-semibold text-[var(--color-secondary)]/50">Confirm your campaign details before submitting.</p>
              </div>

              <div className="bg-[var(--card)] rounded-2xl border border-[var(--border)] shadow-sm p-4 space-y-0">
                <p className="text-[10px] font-black uppercase tracking-widest text-[#E85D3F] mb-3">Campaign Summary</p>
                {[
                  { label: "Title", value: title },
                  { label: "Category", value: category },
                  { label: "Target", value: `K ${targetAmount}` },
                  { label: "Min Investment", value: `K ${minInvestment}` },
                  { label: "Est. ROI", value: `${roi}%` },
                  { label: "Duration", value: duration },
                ].map(({ label, value }) => (
                  <div key={label} className="flex justify-between items-start py-3 border-b border-[var(--border)] last:border-0">
                    <span className="text-[11px] font-black uppercase tracking-widest text-[var(--color-secondary)]/40 shrink-0 w-28">{label}</span>
                    <span className="text-[13px] font-black text-[var(--color-secondary)] text-right">{value}</span>
                  </div>
                ))}
              </div>

              <div className="bg-[#E85D3F]/5 border border-[#E85D3F]/20 rounded-2xl p-4">
                <p className="text-[11px] font-bold text-[var(--color-secondary)]/60 leading-relaxed">
                  By submitting, you confirm that all information provided is accurate and complies with Kleench investment guidelines.
                </p>
              </div>

              <div className="flex gap-3">
                <button onClick={() => setStep(3)}
                  className="flex-1 py-4 rounded-2xl border border-[var(--border)] bg-[var(--card)] text-[var(--color-secondary)] font-black uppercase tracking-widest text-[12px] active:scale-95 transition-all">
                  Back
                </button>
                <button onClick={() => navigate("/crowdfunding")}
                  className="flex-1 py-4 rounded-2xl bg-[#E85D3F] text-white font-black uppercase tracking-widest text-[13px] shadow-md active:scale-95 transition-all">
                  Submit
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
