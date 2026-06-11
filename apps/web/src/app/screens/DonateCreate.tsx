import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronRight, Upload, Calendar, FileText, Check, ImagePlus, X } from "lucide-react";
import { useNavigate } from "react-router";
import { LottieIcon } from "../components/LottieIcon";
import { PageHeader } from "../components/PageHeader";
import { toast } from "sonner";

const grace = (delay = 0) => ({
  delay,
  duration: 0.5,
  ease: [0.22, 1, 0.36, 1] as const,
});

const CATEGORIES = ["Education", "Health", "Disaster", "Water & Sanitation", "Community", "Environment", "Women & Girls", "Youth", "Agriculture", "Others"];

const STEPS = ["Basic Info", "Media & Goals", "Verification"];

export function DonateCreate() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [story, setStory] = useState("");
  const [targetAmount, setTargetAmount] = useState("");
  const [deadline, setDeadline] = useState("");
  const [mediaFile, setMediaFile] = useState<File | null>(null);
  const [nrcFile, setNrcFile] = useState<File | null>(null);
  const [supportFile, setSupportFile] = useState<File | null>(null);
  const [catOpen, setCatOpen] = useState(false);

  const isStep1Valid = title.trim().length > 3 && category.length > 0 && story.trim().length > 10;
  const isStep2Valid = targetAmount.trim().length > 0 && deadline.length > 0;

  if (submitted) {
    return (
      <div className="w-full max-w-md mx-auto font-sans flex flex-col items-center justify-center px-8 text-center">
        <motion.div initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ type: "spring", stiffness: 200, damping: 18, delay: 0.05 }}>
          <LottieIcon icon="success" size={110} />
        </motion.div>
        <motion.h2 initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={grace(0.35)}
          className="font-black text-2xl uppercase tracking-wide text-[var(--color-secondary)] mb-3 mt-4">
          Campaign Created!
        </motion.h2>
        <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={grace(0.44)}
          className="text-[13px] font-semibold text-[var(--color-secondary)]/60 leading-relaxed mb-10 max-w-[260px]">
          Your fundraising campaign is live and ready to receive donations.
        </motion.p>
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={grace(0.52)} className="w-full space-y-3">
          <button onClick={() => navigate("/donate")}
            className="w-full py-4 rounded-2xl bg-[#E85D3F] text-white font-black uppercase tracking-widest text-[13px] shadow-md active:scale-95 transition-all">
            View Campaign
          </button>
          <button onClick={() => navigate("/donate")}
            className="w-full py-4 rounded-2xl border border-[var(--border)] bg-[var(--card)] text-[var(--color-secondary)] font-black uppercase tracking-widest text-[12px] active:scale-95 transition-all">
            Back to Donate
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-md mx-auto font-sans pb-24 relative">
      {/* Sticky Header */}
      <div className="sticky top-0 z-50">
        <PageHeader title="CREATE CAMPAIGN" showBack onBack={() => step === 1 ? navigate(-1) : setStep(s => s - 1)} />
      </div>

      {/* Step indicator */}
      <div className="px-5 pt-5 pb-4 flex items-center gap-2">
        {STEPS.map((label, i) => (
          <div key={i} className="flex-1 flex flex-col items-center gap-1">
            <div className={`w-full h-1.5 rounded-full transition-all ${i + 1 <= step ? 'bg-[#E85D3F]' : 'bg-[var(--border)]'}`} />
            <span className={`text-[9px] font-black uppercase tracking-wide ${i + 1 === step ? 'text-[#E85D3F]' : 'text-[var(--color-secondary)]/30'}`}>{label}</span>
          </div>
        ))}
      </div>

      <div className="px-5">
        <AnimatePresence mode="wait">

          {/* STEP 1 — Basic Info */}
          {step === 1 && (
            <motion.div key="s1" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} transition={grace()}>
              <h2 className="font-black text-[20px] text-[var(--color-secondary)] uppercase tracking-tight mb-6">Campaign Details</h2>

              <div className="space-y-4">
                <div>
                  <label className="text-[10px] font-black uppercase tracking-widest text-[var(--color-secondary)]/50 block mb-2">Campaign Title *</label>
                  <input value={title} onChange={e => setTitle(e.target.value)} maxLength={80}
                    placeholder="Enter a clear, compelling title..."
                    className="w-full px-4 py-3.5 rounded-2xl border border-[var(--border)] bg-[var(--card)] font-bold text-[14px] text-[var(--color-secondary)] outline-none focus:border-[#E85D3F] transition-colors" />
                  <p className="text-right text-[10px] text-[var(--color-secondary)]/30 mt-1 font-bold">{title.length}/80</p>
                </div>

                <div className="relative">
                  <label className="text-[10px] font-black uppercase tracking-widest text-[var(--color-secondary)]/50 block mb-2">Category *</label>
                  <button onClick={() => setCatOpen(v => !v)}
                    className="w-full px-4 py-3.5 rounded-2xl border border-[var(--border)] bg-[var(--card)] font-bold text-[14px] text-left flex items-center justify-between outline-none focus:border-[#E85D3F] transition-colors">
                    <span className={category ? 'text-[var(--color-secondary)]' : 'text-[var(--color-secondary)]/30'}>{category || "Select category..."}</span>
                    <ChevronRight size={16} className={`transition-transform ${catOpen ? 'rotate-90' : ''}`} />
                  </button>
                  <AnimatePresence>
                    {catOpen && (
                      <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.2 }}
                        className="absolute top-full left-0 right-0 z-20 mt-1 bg-[var(--card)] border border-[var(--border)] rounded-2xl shadow-lg overflow-hidden">
                        {CATEGORIES.map(cat => (
                          <button key={cat} onClick={() => { setCategory(cat); setCatOpen(false); }}
                            className="w-full px-4 py-3 text-left font-bold text-[13px] text-[var(--color-secondary)] hover:bg-[var(--app-bg-muted)] transition-colors flex items-center justify-between">
                            {cat}
                            {category === cat && <Check size={14} className="text-[#E85D3F]" />}
                          </button>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <div>
                  <label className="text-[10px] font-black uppercase tracking-widest text-[var(--color-secondary)]/50 block mb-2">Story / Description *</label>
                  <textarea value={story} onChange={e => setStory(e.target.value)} rows={5} maxLength={500}
                    placeholder="Tell donors why this campaign matters..."
                    className="w-full px-4 py-3.5 rounded-2xl border border-[var(--border)] bg-[var(--card)] font-bold text-[14px] text-[var(--color-secondary)] outline-none focus:border-[#E85D3F] transition-colors resize-none" />
                  <p className="text-right text-[10px] text-[var(--color-secondary)]/30 mt-1 font-bold">{story.length}/500</p>
                </div>
              </div>

              <button disabled={!isStep1Valid} onClick={() => setStep(2)}
                className="mt-8 w-full py-4 rounded-2xl bg-[#E85D3F] text-white font-black uppercase tracking-widest text-[13px] flex items-center justify-center gap-3 disabled:opacity-40 shadow-md active:scale-95 transition-all">
                Next Step <ChevronRight size={18} />
              </button>
              {!isStep1Valid && <p className="mt-3 text-center text-[11px] font-bold text-[var(--color-secondary)]/40 uppercase tracking-wide">Complete all fields to continue</p>}
            </motion.div>
          )}

          {/* STEP 2 — Media & Goals */}
          {step === 2 && (
            <motion.div key="s2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={grace()}>
              <h2 className="font-black text-[20px] text-[var(--color-secondary)] uppercase tracking-tight mb-6">Media & Goals</h2>

              {/* Media upload */}
              <div className="mb-6">
                <label className="text-[10px] font-black uppercase tracking-widest text-[var(--color-secondary)]/50 block mb-3">Photos & Videos</label>
                <label
                  htmlFor="donate-media"
                  className={`w-full flex flex-col items-center justify-center gap-2 rounded-2xl border-2 border-dashed p-6 cursor-pointer transition-all active:scale-[0.98]
                    ${mediaFile ? 'border-[#E85D3F] bg-[#E85D3F]/5' : 'border-[var(--border)] bg-[var(--card)]'}`}
                >
                  {mediaFile ? (
                    <div className="w-full flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-[#E85D3F]/10 flex items-center justify-center shrink-0">
                        <FileText size={20} className="text-[#E85D3F]" strokeWidth={1.5} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-black text-[13px] text-[var(--color-secondary)] truncate">{mediaFile.name}</p>
                        <p className="text-[10px] font-bold text-[var(--color-secondary)]/40">{(mediaFile.size / 1024).toFixed(0)} KB</p>
                      </div>
                      <button
                        type="button"
                        onClick={(e) => { e.preventDefault(); e.stopPropagation(); setMediaFile(null); }}
                        className="w-7 h-7 rounded-full bg-[var(--app-bg-muted)] flex items-center justify-center shrink-0"
                      >
                        <X size={14} className="text-[var(--color-secondary)]/60" />
                      </button>
                    </div>
                  ) : (
                    <>
                      <div className="w-12 h-12 rounded-2xl bg-[var(--app-bg-muted)] flex items-center justify-center">
                        <ImagePlus size={24} className="text-[var(--color-secondary)]/40" strokeWidth={1.5} />
                      </div>
                      <div className="text-center">
                        <p className="font-black text-[13px] text-[var(--color-secondary)] uppercase tracking-wide">Upload Media</p>
                        <p className="text-[10px] font-bold text-[var(--color-secondary)]/40 mt-0.5">Tap to browse — JPG, PNG, MP4</p>
                      </div>
                    </>
                  )}
                  <input
                    id="donate-media"
                    type="file"
                    accept="image/*,video/*"
                    className="hidden"
                    onChange={(e) => {
                      const f = e.target.files?.[0];
                      if (f) { setMediaFile(f); toast.success(`${f.name} attached!`); }
                    }}
                  />
                </label>
                <p className="text-[10px] text-[var(--color-secondary)]/40 font-bold mt-2">Add photos or videos for your campaign</p>
              </div>

              {/* Target Amount */}
              <div className="mb-4">
                <label className="text-[10px] font-black uppercase tracking-widest text-[var(--color-secondary)]/50 block mb-2">Target Amount (K) *</label>
                <div className="flex items-center px-4 py-3.5 rounded-2xl border border-[var(--border)] bg-[var(--card)] gap-2 focus-within:border-[#E85D3F] transition-colors">
                  <span className="font-black text-[16px] text-[var(--color-secondary)]">K</span>
                  <input type="number" value={targetAmount} onChange={e => setTargetAmount(e.target.value)} placeholder="0.00"
                    className="flex-1 bg-transparent outline-none font-bold text-[15px] text-[var(--color-secondary)]" />
                </div>
              </div>

              {/* Deadline */}
              <div className="mb-8">
                <label className="text-[10px] font-black uppercase tracking-widest text-[var(--color-secondary)]/50 block mb-2">Campaign Deadline *</label>
                <div className="flex items-center px-4 py-3.5 rounded-2xl border border-[var(--border)] bg-[var(--card)] gap-3 focus-within:border-[#E85D3F] transition-colors">
                  <Calendar size={18} className="text-[var(--color-secondary)]/40 shrink-0" strokeWidth={1.5} />
                  <input type="date" value={deadline} onChange={e => setDeadline(e.target.value)}
                    className="flex-1 bg-transparent outline-none font-bold text-[14px] text-[var(--color-secondary)]" />
                </div>
              </div>

              <button disabled={!isStep2Valid} onClick={() => setStep(3)}
                className="w-full py-4 rounded-2xl bg-[#E85D3F] text-white font-black uppercase tracking-widest text-[13px] flex items-center justify-center gap-3 disabled:opacity-40 shadow-md active:scale-95 transition-all">
                Next Step <ChevronRight size={18} />
              </button>
            </motion.div>
          )}

          {/* STEP 3 — Verification */}
          {step === 3 && (
            <motion.div key="s3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={grace()}>
              <h2 className="font-black text-[20px] text-[var(--color-secondary)] uppercase tracking-tight mb-2">Verification</h2>
              <p className="text-[12px] font-semibold text-[var(--color-secondary)]/50 mb-6 leading-relaxed">Upload documents to verify your identity and campaign legitimacy.</p>

              <div className="space-y-4 mb-10">
                {/* NRC / Passport */}
                <label
                  htmlFor="donate-nrc"
                  className={`w-full p-4 rounded-2xl border-2 flex items-center gap-4 transition-all cursor-pointer active:scale-[0.98] ${nrcFile ? 'border-green-400 bg-green-50' : 'border-dashed border-[var(--border)] bg-[var(--card)]'}`}
                >
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${nrcFile ? 'bg-green-100' : 'bg-[var(--app-bg-muted)]'}`}>
                    {nrcFile ? <Check size={22} className="text-green-500" strokeWidth={2.5} /> : <Upload size={22} className="text-[var(--color-secondary)]/40" strokeWidth={1.5} />}
                  </div>
                  <div className="flex-1 min-w-0 text-left">
                    <p className={`font-black text-[13px] uppercase tracking-wide ${nrcFile ? 'text-green-600' : 'text-[var(--color-secondary)]'}`}>
                      {nrcFile ? 'NRC / Passport Uploaded' : 'Upload NRC / Passport'}
                    </p>
                    <p className="text-[11px] font-semibold text-[var(--color-secondary)]/40 truncate">
                      {nrcFile ? `${nrcFile.name} · ${(nrcFile.size / 1024).toFixed(0)} KB` : 'JPG, PNG or PDF — Max 5MB'}
                    </p>
                  </div>
                  {nrcFile && (
                    <button
                      type="button"
                      onClick={(e) => { e.preventDefault(); e.stopPropagation(); setNrcFile(null); }}
                      className="w-7 h-7 rounded-full bg-[var(--app-bg-muted)] flex items-center justify-center shrink-0"
                    >
                      <X size={14} className="text-[var(--color-secondary)]/60" />
                    </button>
                  )}
                  <input
                    id="donate-nrc"
                    type="file"
                    accept="image/*,.pdf"
                    className="hidden"
                    onChange={(e) => { const f = e.target.files?.[0]; if (f) { setNrcFile(f); toast.success("Document uploaded successfully!"); } }}
                  />
                </label>

                {/* Supporting document */}
                <label
                  htmlFor="donate-support"
                  className={`w-full p-4 rounded-2xl border-2 flex items-center gap-4 transition-all cursor-pointer active:scale-[0.98] ${supportFile ? 'border-green-400 bg-green-50' : 'border-dashed border-[var(--border)] bg-[var(--card)]'}`}
                >
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${supportFile ? 'bg-green-100' : 'bg-[var(--app-bg-muted)]'}`}>
                    {supportFile ? <Check size={22} className="text-green-500" strokeWidth={2.5} /> : <FileText size={22} className="text-[var(--color-secondary)]/40" strokeWidth={1.5} />}
                  </div>
                  <div className="flex-1 min-w-0 text-left">
                    <p className={`font-black text-[13px] uppercase tracking-wide ${supportFile ? 'text-green-600' : 'text-[var(--color-secondary)]'}`}>
                      {supportFile ? 'Supporting Doc Uploaded' : 'Upload Supporting Document'}
                    </p>
                    <p className="text-[11px] font-semibold text-[var(--color-secondary)]/40 truncate">
                      {supportFile ? `${supportFile.name} · ${(supportFile.size / 1024).toFixed(0)} KB` : 'Letters, permits, evidence — Max 10MB'}
                    </p>
                  </div>
                  {supportFile && (
                    <button
                      type="button"
                      onClick={(e) => { e.preventDefault(); e.stopPropagation(); setSupportFile(null); }}
                      className="w-7 h-7 rounded-full bg-[var(--app-bg-muted)] flex items-center justify-center shrink-0"
                    >
                      <X size={14} className="text-[var(--color-secondary)]/60" />
                    </button>
                  )}
                  <input
                    id="donate-support"
                    type="file"
                    accept=".pdf,.doc,.docx,image/*"
                    className="hidden"
                    onChange={(e) => { const f = e.target.files?.[0]; if (f) { setSupportFile(f); toast.success("Document uploaded successfully!"); } }}
                  />
                </label>
              </div>

              <button onClick={() => setSubmitted(true)}
                className="w-full py-4 rounded-2xl bg-[#E85D3F] text-white font-black uppercase tracking-widest text-[13px] shadow-md active:scale-95 transition-all">
                Create Campaign
              </button>
              <p className="mt-3 text-center text-[10px] font-bold text-[var(--color-secondary)]/30 uppercase tracking-wide">Documents optional — campaigns can be verified later</p>
            </motion.div>
          )}

        </AnimatePresence>
      </div>
    </div>
  );
}
