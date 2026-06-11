import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowLeft, Target, FileText, ChevronRight, Settings2, Plus, Trash2, Link, Check, ThumbsDown, Frown, Minus, Smile, ThumbsUp } from "lucide-react";
import { useNavigate } from "react-router";
import { LottieIcon } from "../components/LottieIcon";
import { toast } from "sonner";

const grace = (delay = 0) => ({
  delay,
  duration: 0.62,
  ease: [0.22, 1, 0.36, 1] as const,
});

function CrossHatchBg() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 0 }}>
      <svg width="100%" height="100%" style={{ position: "absolute", inset: 0 }}>
        <defs>
          <pattern id="xhatch-survey" x="0" y="0" width="24" height="24" patternUnits="userSpaceOnUse">
            <line x1="0" y1="0" x2="24" y2="24" stroke="var(--color-primary)" strokeWidth="0.5" strokeOpacity="0.07"/>
            <line x1="24" y1="0" x2="0" y2="24" stroke="var(--color-primary)" strokeWidth="0.5" strokeOpacity="0.07"/>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#xhatch-survey)"/>
      </svg>
      <div className="absolute top-1/4 -right-16 w-64 h-64 rounded-full opacity-[0.03]"
        style={{ background: "radial-gradient(circle, var(--color-primary), transparent)" }}/>
    </div>
  );
}

const SURVEY_TYPES = [
  { id: "standard", label: "Standard", desc: "General audience feedback", icon: "file" },
  { id: "quantitative", label: "Quantitative", desc: "Measurable metrics & data", icon: "chart" },
  { id: "qualitative", label: "Qualitative", desc: "In-depth textual feedback", icon: "message" },
];

const RATING_ICONS = [
  { Icon: ThumbsDown, label: "Terrible", color: "text-red-500" },
  { Icon: Frown, label: "Bad", color: "text-orange-400" },
  { Icon: Minus, label: "Okay", color: "text-yellow-500" },
  { Icon: Smile, label: "Good", color: "text-lime-500" },
  { Icon: ThumbsUp, label: "Great", color: "text-green-500" },
];
const SHARE_OPTIONS = [
  { id: "whatsapp", label: "WhatsApp", bg: "bg-[#25D366]" },
  { id: "facebook", label: "Facebook", bg: "bg-[#1877F2]" },
  { id: "instagram", label: "Instagram", bg: "bg-[#E4405F]" },
  { id: "tiktok", label: "TikTok", bg: "bg-black" },
];
const QUALITATIVE_MODES = ["Text", "Audio", "Video"];

type Question = { q: string; type: string };

export function CreateSurvey() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const totalSteps = 4;
  const [surveyType, setSurveyType] = useState("standard");
  const [title, setTitle] = useState("");
  const [questions, setQuestions] = useState<Question[]>([{ q: "", type: "multiple" }]);
  const [qualMode, setQualMode] = useState("Text");
  const [audience, setAudience] = useState<"targeted" | "general">("general");
  const [targetCriteria, setTargetCriteria] = useState({ ageMin: "18", ageMax: "35", gender: "All", region: "" });
  const [durationDays, setDurationDays] = useState(7);
  const [submitted, setSubmitted] = useState(false);

  const addQuestion = () => setQuestions([...questions, { q: "", type: "multiple" }]);
  const updateQuestion = (idx: number, field: string, val: string) => {
    const n = [...questions];
    n[idx] = { ...n[idx], [field]: val };
    setQuestions(n);
  };
  const removeQuestion = (idx: number) => {
    if (questions.length > 1) setQuestions(questions.filter((_, i) => i !== idx));
  };

  const isStep1Valid = title.trim().length > 3;
  const isStep2Valid = surveyType !== "standard" || questions.every(q => q.q.trim().length > 3);
  const step2Hint = surveyType === "standard" && !isStep2Valid ? "Fill in all question texts to continue" : "";

  const handleBack = () => {
    if (step === 1) navigate(-1);
    else setStep(s => s - 1);
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText("https://kleench.app/survey/new").catch(() => {});
    toast.success("Survey link copied!");
  };

  if (submitted) {
    return (
      <div className="w-full max-w-md mx-auto flex flex-col items-center justify-center text-center relative font-sans pb-16">
        <CrossHatchBg />
        <div className="relative z-10 px-8 w-full">
          <motion.div
            initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 220, damping: 18, delay: 0.05 }}
            className="flex justify-center mb-8">
            <LottieIcon icon="success" size={110} />
          </motion.div>
          <motion.h2 initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={grace(0.35)}
            className="font-black mb-2 text-[var(--color-secondary)] uppercase tracking-wide text-2xl">
            Survey Published!
          </motion.h2>
          <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={grace(0.44)}
            className="text-sm leading-relaxed max-w-xs mx-auto mb-8 text-[var(--color-secondary)]/60">
            Your survey is live. Share it to start collecting responses.
          </motion.p>

          {/* Share buttons */}
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={grace(0.52)}
            className="grid grid-cols-2 gap-3 mb-4 w-full">
            {SHARE_OPTIONS.map((s, i) => (
              <motion.button key={s.id} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={grace(0.55 + i * 0.05)}
                whileTap={{ scale: 0.96 }}
                onClick={() => toast.success(`Sharing on ${s.label}...`)}
                className={`${s.bg} text-white py-3 rounded-2xl font-black text-[11px] uppercase tracking-widest shadow-sm active:scale-95 transition-all`}>
                {s.label}
              </motion.button>
            ))}
          </motion.div>

          {/* Copy link */}
          <motion.button initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={grace(0.72)}
            whileTap={{ scale: 0.97 }}
            onClick={handleCopyLink}
            className="w-full py-3 rounded-2xl border border-[var(--border)] bg-[var(--card)] text-[var(--color-secondary)] font-black text-[11px] uppercase tracking-widest flex items-center justify-center gap-2 mb-6 shadow-sm">
            <Link size={14} /> Copy Survey Link
          </motion.button>

          <motion.button
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={grace(0.78)}
            whileTap={{ scale: 0.97 }}
            onClick={() => navigate("/surveys-polls")}
            className="px-10 py-4 rounded-2xl text-white font-bold flex items-center justify-center gap-2 mx-auto bg-[var(--color-primary)] shadow-md uppercase tracking-wider text-xs w-full">
            View Analytics <ChevronRight size={18}/>
          </motion.button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-md mx-auto pb-24 relative font-sans">
      <CrossHatchBg />

      {/* Header */}
      <div className="sticky top-0 z-50 pt-4 pb-4 px-5 flex items-center justify-between bg-[var(--card)]/80 backdrop-blur-xl border-b border-[var(--border)]">
        <div className="flex items-center gap-3">
          <button onClick={handleBack}
            className="w-10 h-10 rounded-full bg-[var(--app-bg)] shadow-sm border border-[var(--border)] flex items-center justify-center active:scale-90 transition-transform">
            <ArrowLeft size={16} className="text-[var(--color-secondary)]"/>
          </button>
          <div>
            <h1 className="font-black tracking-[0.1em] uppercase text-[var(--color-secondary)] text-[16px]">
              Create Survey
            </h1>
            <p className="text-[10px] font-bold text-[var(--color-primary)] tracking-widest uppercase">
              Step {step} of {totalSteps}
            </p>
          </div>
        </div>
        {/* Step dots */}
        <div className="flex gap-1.5">
          {Array.from({ length: totalSteps }).map((_, i) => (
            <div key={i} className={`h-1.5 rounded-full transition-all ${i + 1 === step ? 'w-5 bg-[var(--color-primary)]' : i + 1 < step ? 'w-3 bg-[var(--color-primary)]/40' : 'w-3 bg-[var(--border)]'}`} />
          ))}
        </div>
      </div>

      <div className="relative z-10 px-5 mt-6">
        <AnimatePresence mode="wait">

          {/* STEP 1 — Type & Objective */}
          {step === 1 && (
            <motion.div key="step1" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} transition={grace()}>
              <div className="mb-8">
                <label className="block text-[11px] font-black uppercase tracking-widest mb-3 text-[var(--color-secondary)]/50">Survey Objective *</label>
                <textarea value={title} onChange={(e) => setTitle(e.target.value)}
                  placeholder="What is the goal of this survey?" rows={3}
                  className="w-full px-5 py-4 rounded-2xl text-[14px] font-bold outline-none resize-none bg-[var(--card)] border border-[var(--border)] text-[var(--color-secondary)] transition-all focus:border-[var(--color-primary)] focus:shadow-sm"
                />
              </div>

              <div className="mb-8">
                <label className="block text-[11px] font-black uppercase tracking-widest mb-3 text-[var(--color-secondary)]/50">Survey Type</label>
                <div className="flex flex-col gap-3">
                  {SURVEY_TYPES.map((t, idx) => (
                    <motion.div key={t.id}
                      initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={grace(0.1 + idx * 0.1)}
                      onClick={() => setSurveyType(t.id)}
                      className={`p-4 rounded-2xl border-2 cursor-pointer transition-all flex items-center gap-4 ${surveyType === t.id ? 'border-[var(--color-primary)] bg-[var(--color-primary)]/5' : 'border-[var(--border)] bg-[var(--card)]'}`}>
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 ${surveyType === t.id ? 'bg-[var(--color-primary)] text-white' : 'bg-[var(--app-bg-muted)] text-[var(--color-secondary)]'}`}>
                        {t.id === "standard" && <FileText size={20} />}
                        {t.id === "quantitative" && <Target size={20} />}
                        {t.id === "qualitative" && <Settings2 size={20} />}
                      </div>
                      <div>
                        <h4 className="font-black text-[14px] text-[var(--color-secondary)] tracking-wide">{t.label}</h4>
                        <p className="text-[11px] font-semibold text-[var(--color-secondary)]/50">{t.desc}</p>
                      </div>
                      {surveyType === t.id && (
                        <div className="ml-auto w-5 h-5 rounded-full bg-[var(--color-primary)] flex items-center justify-center shrink-0">
                          <Check size={11} className="text-white" strokeWidth={3} />
                        </div>
                      )}
                    </motion.div>
                  ))}
                </div>
              </div>

              <motion.button whileTap={{ scale: 0.98 }}
                disabled={!isStep1Valid} onClick={() => setStep(2)}
                className="w-full py-4 rounded-2xl text-white font-black uppercase tracking-widest text-[13px] flex items-center justify-center gap-3 disabled:opacity-40 bg-[var(--color-primary)] shadow-md">
                Next Step <ChevronRight size={18} />
              </motion.button>
            </motion.div>
          )}

          {/* STEP 2 — Questions (varies by type) */}
          {step === 2 && (
            <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={grace()}>

              {/* QUALITATIVE: mode selection only */}
              {surveyType === "qualitative" && (
                <div>
                  <label className="block text-[11px] font-black uppercase tracking-widest mb-4 text-[var(--color-secondary)]/50">Response Mode</label>
                  <div className="grid grid-cols-3 gap-3 mb-8">
                    {QUALITATIVE_MODES.map((mode) => (
                      <button key={mode} onClick={() => setQualMode(mode)}
                        className={`py-5 rounded-2xl border-2 flex flex-col items-center justify-center gap-2 transition-all font-black text-[12px] uppercase tracking-widest ${qualMode === mode ? 'border-[var(--color-primary)] bg-[var(--color-primary)]/5 text-[var(--color-primary)]' : 'border-[var(--border)] bg-[var(--card)] text-[var(--color-secondary)]/60'}`}>
                        {mode === "Text" && <FileText size={22} />}
                        {mode === "Audio" && (
                          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" x2="12" y1="19" y2="22"/>
                          </svg>
                        )}
                        {mode === "Video" && (
                          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="m22 8-6 4 6 4V8z"/><rect width="14" height="12" x="2" y="6" rx="2" ry="2"/>
                          </svg>
                        )}
                        {mode}
                      </button>
                    ))}
                  </div>
                  <div className="p-4 rounded-2xl border border-[var(--border)] bg-[var(--card)] mb-8">
                    <p className="text-[11px] font-bold text-[var(--color-secondary)]/50 mb-1 uppercase tracking-widest">Prompt</p>
                    <textarea rows={3} placeholder={`Ask participants to record a ${qualMode.toLowerCase()} response...`}
                      className="w-full bg-transparent outline-none font-bold text-[14px] text-[var(--color-secondary)] resize-none placeholder:text-[var(--color-secondary)]/30" />
                  </div>
                </div>
              )}

              {/* QUANTITATIVE: range / scale questions */}
              {surveyType === "quantitative" && (
                <div className="space-y-6 mb-8">
                  <label className="block text-[11px] font-black uppercase tracking-widest mb-1 text-[var(--color-secondary)]/50">Quantitative Questions</label>
                  {["Age range of target participants", "Monthly income bracket", "Satisfaction scale (1–10)"].map((q, idx) => (
                    <div key={idx} className="p-4 bg-[var(--card)] border border-[var(--border)] rounded-2xl shadow-sm">
                      <span className="text-[10px] font-black text-[var(--color-primary)] uppercase tracking-widest block mb-3">Question {idx + 1}</span>
                      <input type="text" defaultValue={q}
                        className="w-full bg-transparent outline-none font-bold text-[14px] text-[var(--color-secondary)] placeholder:text-[var(--color-secondary)]/30 mb-3" />
                      <div className="flex gap-2">
                        {['range', 'scale', 'number'].map(type => (
                          <button key={type}
                            className={`px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-wider transition-colors ${idx === 0 && type === 'range' ? 'bg-[var(--color-primary)] text-white' : idx === 2 && type === 'scale' ? 'bg-[var(--color-primary)] text-white' : idx === 1 && type === 'number' ? 'bg-[var(--color-primary)] text-white' : 'bg-[var(--app-bg-muted)] text-[var(--color-secondary)]/60'}`}>
                            {type}
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* STANDARD: custom question builder */}
              {surveyType === "standard" && (
                <>
                  <div className="mb-6">
                    <label className="text-[11px] font-black uppercase tracking-widest text-[var(--color-secondary)]/50">Configure Questions</label>
                  </div>
                  <div className="space-y-6">
                    {questions.map((q, idx) => (
                      <motion.div key={idx} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="p-4 bg-[var(--card)] border border-[var(--border)] rounded-2xl shadow-sm relative">
                        <div className="flex items-center justify-between mb-3 border-b border-[var(--border)] pb-3">
                          <span className="text-[10px] font-black text-[var(--color-primary)] uppercase tracking-widest">Question {idx + 1}</span>
                          {questions.length > 1 && (
                            <button onClick={() => removeQuestion(idx)} className="text-red-500/60 active:scale-90 p-1">
                              <Trash2 size={14} />
                            </button>
                          )}
                        </div>
                        <input type="text" value={q.q} onChange={(e) => updateQuestion(idx, 'q', e.target.value)}
                          placeholder="Enter question..."
                          className="w-full bg-transparent outline-none font-bold text-[14px] text-[var(--color-secondary)] mb-4 placeholder:text-[var(--color-secondary)]/30"
                        />
                        <div className="flex flex-wrap gap-2">
                          {['multiple', 'yes_no', 'text', 'emoji_rating'].map(type => (
                            <button key={type} onClick={() => updateQuestion(idx, 'type', type)}
                              className={`px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-wider transition-colors ${q.type === type ? 'bg-[var(--color-primary)] text-white' : 'bg-[var(--app-bg-muted)] text-[var(--color-secondary)]/60'}`}>
                              {type === 'emoji_rating' ? 'Rating' : type.replace('_', ' ')}
                            </button>
                          ))}
                        </div>
                        {/* Preview for emoji_rating */}
                        {q.type === "emoji_rating" && (
                          <div className="mt-3 flex justify-between pt-3 border-t border-[var(--border)]">
                            {RATING_ICONS.map(({ Icon, label, color }, ei) => (
                              <div key={ei} className="flex flex-col items-center gap-1">
                                <Icon size={20} className={color} strokeWidth={1.5} />
                                <span className="text-[9px] font-black text-[var(--color-secondary)]/40">{label}</span>
                              </div>
                            ))}
                          </div>
                        )}
                      </motion.div>
                    ))}
                  </div>

                  <motion.button whileTap={{ scale: 0.95 }} onClick={addQuestion}
                    className="mt-6 w-full py-4 rounded-2xl border-2 border-dashed border-[var(--color-primary)]/40 text-[var(--color-primary)] font-black uppercase tracking-widest text-[12px] flex items-center justify-center gap-2 bg-[var(--color-primary)]/5">
                    <Plus size={14} strokeWidth={3} /> Add Question
                  </motion.button>
                </>
              )}

              <div className="mt-10">
                <motion.button whileTap={{ scale: 0.98 }}
                  disabled={!isStep2Valid} onClick={() => setStep(3)}
                  className="w-full py-4 rounded-2xl text-white font-black uppercase tracking-widest text-[13px] flex items-center justify-center gap-3 disabled:opacity-40 bg-[var(--color-primary)] shadow-md">
                  Next Step <ChevronRight size={18} />
                </motion.button>
                {step2Hint && (
                  <p className="mt-3 text-center text-[11px] font-bold text-[var(--color-secondary)]/40 uppercase tracking-wide">
                    {step2Hint}
                  </p>
                )}
              </div>
            </motion.div>
          )}

          {/* STEP 3 — Audience */}
          {step === 3 && (
            <motion.div key="step3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={grace()}>
              <label className="block text-[11px] font-black uppercase tracking-widest mb-4 text-[var(--color-secondary)]/50">Target Audience</label>

              {/* Segmented control */}
              <div className="flex p-1 bg-[var(--app-bg-muted)] rounded-2xl mb-8">
                {(["general", "targeted"] as const).map((opt) => (
                  <button key={opt} onClick={() => setAudience(opt)}
                    className={`flex-1 py-3 rounded-xl font-black text-[11px] uppercase tracking-widest transition-all ${audience === opt ? 'bg-[var(--card)] text-[var(--color-primary)] shadow-sm' : 'text-[var(--color-secondary)]/50'}`}>
                    {opt}
                  </button>
                ))}
              </div>

              {audience === "general" ? (
                <div className="p-5 rounded-2xl border border-[var(--border)] bg-[var(--card)] shadow-sm text-center">
                  <div className="w-14 h-14 rounded-full bg-[var(--color-primary)]/10 flex items-center justify-center mx-auto mb-4">
                    <Target size={24} className="text-[var(--color-primary)]" />
                  </div>
                  <h4 className="font-black text-[var(--color-secondary)] text-[15px] mb-2">Open to Everyone</h4>
                  <p className="text-[12px] font-semibold text-[var(--color-secondary)]/50 leading-relaxed max-w-[220px] mx-auto">Your survey will be visible to all Kleench users across all regions.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="p-4 bg-[var(--card)] rounded-2xl border border-[var(--border)] shadow-sm">
                    <label className="text-[10px] font-black uppercase tracking-widest text-[var(--color-secondary)]/40 block mb-2">Gender</label>
                    <div className="flex gap-2">
                      {["All", "Male", "Female"].map(g => (
                        <button key={g} onClick={() => setTargetCriteria(c => ({ ...c, gender: g }))}
                          className={`px-4 py-2 rounded-full font-black text-[11px] uppercase tracking-wider transition-colors ${targetCriteria.gender === g ? 'bg-[var(--color-primary)] text-white' : 'bg-[var(--app-bg-muted)] text-[var(--color-secondary)]/60'}`}>
                          {g}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="p-4 bg-[var(--card)] rounded-2xl border border-[var(--border)] shadow-sm">
                    <label className="text-[10px] font-black uppercase tracking-widest text-[var(--color-secondary)]/40 block mb-2">Age Range</label>
                    <div className="flex items-center gap-3">
                      <input type="number" value={targetCriteria.ageMin} min={13} max={99}
                        onChange={e => setTargetCriteria(c => ({ ...c, ageMin: e.target.value }))}
                        className="w-20 px-3 py-2 rounded-xl border border-[var(--border)] font-black text-[14px] text-[var(--color-secondary)] outline-none focus:border-[var(--color-primary)] text-center" />
                      <span className="text-[var(--color-secondary)]/40 font-black">—</span>
                      <input type="number" value={targetCriteria.ageMax} min={13} max={99}
                        onChange={e => setTargetCriteria(c => ({ ...c, ageMax: e.target.value }))}
                        className="w-20 px-3 py-2 rounded-xl border border-[var(--border)] font-black text-[14px] text-[var(--color-secondary)] outline-none focus:border-[var(--color-primary)] text-center" />
                      <span className="text-[11px] font-black text-[var(--color-secondary)]/40 uppercase tracking-wide">years</span>
                    </div>
                  </div>

                  <div className="p-4 bg-[var(--card)] rounded-2xl border border-[var(--border)] shadow-sm">
                    <label className="text-[10px] font-black uppercase tracking-widest text-[var(--color-secondary)]/40 block mb-2">Region / Province</label>
                    <input type="text" value={targetCriteria.region} placeholder="e.g. Lusaka, Copperbelt..."
                      onChange={e => setTargetCriteria(c => ({ ...c, region: e.target.value }))}
                      className="w-full bg-transparent outline-none font-bold text-[14px] text-[var(--color-secondary)] placeholder:text-[var(--color-secondary)]/30" />
                  </div>
                </div>
              )}

              <div className="mt-10">
                <motion.button whileTap={{ scale: 0.98 }} onClick={() => setStep(4)}
                  className="w-full py-4 rounded-2xl text-white font-black uppercase tracking-widest text-[13px] flex items-center justify-center gap-3 bg-[var(--color-primary)] shadow-md">
                  Next Step <ChevronRight size={18} />
                </motion.button>
              </div>
            </motion.div>
          )}

          {/* STEP 4 — Duration & Review */}
          {step === 4 && (
            <motion.div key="step4" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={grace()}>
              <label className="block text-[11px] font-black uppercase tracking-widest mb-4 text-[var(--color-secondary)]/50">Survey Duration</label>

              {/* Duration stepper */}
              <div className="p-5 bg-[var(--card)] rounded-2xl border border-[var(--border)] shadow-sm mb-8 flex items-center justify-between">
                <button onClick={() => setDurationDays(d => Math.max(1, d - 1))}
                  className="w-12 h-12 rounded-full bg-[var(--app-bg-muted)] flex items-center justify-center font-black text-[20px] text-[var(--color-secondary)] active:scale-90 transition-transform">
                  −
                </button>
                <div className="text-center">
                  <span className="font-black text-[48px] text-[var(--color-primary)] leading-none">{durationDays}</span>
                  <p className="text-[11px] font-black text-[var(--color-secondary)]/40 uppercase tracking-widest mt-1">Days</p>
                </div>
                <button onClick={() => setDurationDays(d => Math.min(90, d + 1))}
                  className="w-12 h-12 rounded-full bg-[var(--app-bg-muted)] flex items-center justify-center font-black text-[20px] text-[var(--color-secondary)] active:scale-90 transition-transform">
                  +
                </button>
              </div>

              {/* Preset chips */}
              <div className="flex gap-2 mb-8 flex-wrap">
                {[3, 7, 14, 30].map(d => (
                  <button key={d} onClick={() => setDurationDays(d)}
                    className={`px-4 py-2 rounded-full font-black text-[11px] uppercase tracking-wider transition-colors ${durationDays === d ? 'bg-[var(--color-primary)] text-white' : 'bg-[var(--app-bg-muted)] text-[var(--color-secondary)]/60'}`}>
                    {d}d
                  </button>
                ))}
              </div>

              {/* Summary review card */}
              <div className="p-4 bg-[var(--card)] rounded-2xl border border-[var(--border)] shadow-sm mb-10">
                <p className="text-[10px] font-black uppercase tracking-widest text-[var(--color-primary)] mb-3">Summary</p>
                <div className="space-y-2">
                  <div className="flex justify-between items-start">
                    <span className="text-[11px] font-bold text-[var(--color-secondary)]/40 uppercase tracking-wide">Objective</span>
                    <span className="text-[12px] font-black text-[var(--color-secondary)] max-w-[180px] text-right leading-tight">{title}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[11px] font-bold text-[var(--color-secondary)]/40 uppercase tracking-wide">Type</span>
                    <span className="text-[12px] font-black text-[var(--color-secondary)] capitalize">{surveyType}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[11px] font-bold text-[var(--color-secondary)]/40 uppercase tracking-wide">Audience</span>
                    <span className="text-[12px] font-black text-[var(--color-secondary)] capitalize">{audience}</span>
                  </div>
                  {surveyType !== "qualitative" && (
                    <div className="flex justify-between">
                      <span className="text-[11px] font-bold text-[var(--color-secondary)]/40 uppercase tracking-wide">Questions</span>
                      <span className="text-[12px] font-black text-[var(--color-secondary)]">{questions.length}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span className="text-[11px] font-bold text-[var(--color-secondary)]/40 uppercase tracking-wide">Duration</span>
                    <span className="text-[12px] font-black text-[var(--color-secondary)]">{durationDays} days</span>
                  </div>
                </div>
              </div>

              <motion.button whileTap={{ scale: 0.98 }} onClick={() => setSubmitted(true)}
                className="w-full py-4 rounded-2xl text-white font-black uppercase tracking-widest text-[13px] flex items-center justify-center gap-3 bg-[var(--color-primary)] shadow-md">
                Deploy Survey
              </motion.button>
            </motion.div>
          )}

        </AnimatePresence>
      </div>
    </div>
  );
}
