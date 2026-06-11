// ─────────────────────────────────────────────────────────────
// SCREEN 4.4 — COURSE ASSESSMENT  ·  /learning/course/:id/assessment
// SCREEN 4.5 — TEST REVIEW        (internal phase)
// SCREEN 4.6 — TEST SUBMITTED     (internal phase)
// Three test types: Standard (Yes/No · True/False), Quantitative
// (scenario + A–D), Qualitative (long answer, 1000 char max).
// Answers auto-save on every interaction.
// ─────────────────────────────────────────────────────────────

import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router";
import { motion, AnimatePresence } from "motion/react";
import { Check, ChevronLeft, ChevronRight, Send, Timer, ClipboardCheck, CircleDashed, PenLine } from "lucide-react";
import { PageHeader } from "../../components/PageHeader";
import {
  getCourse, getModule, loadProgress, saveProgress, saveAnswer,
  moduleHasQualitative, gradeModule, AssessmentQuestion,
} from "./courseData";
import { Bezel, PrimaryCTA, ProgressBar, SuccessBurst, GRACE, rise } from "./ui";

type Phase = "test" | "review" | "submitted";

export function CourseAssessment() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [params] = useSearchParams();
  const course = getCourse(id);
  const module = getModule(course, params.get("module"));
  const questions = module.questions;
  const manualReview = moduleHasQualitative(module);

  const [phase, setPhase] = useState<Phase>("test");
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string | number>>(
    () => loadProgress(course.id).answers[module.id] ?? {}
  );
  const [secondsLeft, setSecondsLeft] = useState((module.timeLimitMins ?? 0) * 60);

  // Timer — only runs when the assessment requires timing
  useEffect(() => {
    if (!module.timed || phase !== "test") return;
    const t = setInterval(() => setSecondsLeft((s) => Math.max(0, s - 1)), 1000);
    return () => clearInterval(t);
  }, [module.timed, phase]);

  const question = questions[index];
  const answeredCount = questions.filter((q) => answers[q.id] !== undefined && answers[q.id] !== "").length;
  const completionPct = Math.round((answeredCount / questions.length) * 100);

  const setAnswerFor = (q: AssessmentQuestion, value: string | number) => {
    setAnswers((prev) => ({ ...prev, [q.id]: value }));
    saveAnswer(course.id, module.id, q.id, value); // auto-save
  };

  const handleSubmit = () => {
    const p = loadProgress(course.id);
    if (manualReview) {
      saveProgress(course.id, {
        underReviewModules: p.underReviewModules.includes(module.id) ? p.underReviewModules : [...p.underReviewModules, module.id],
      });
    } else {
      const grade = gradeModule(course, module, answers);
      saveProgress(course.id, {
        scores: { ...p.scores, [module.id]: grade.scorePct },
        passedModules: grade.pass && !p.passedModules.includes(module.id) ? [...p.passedModules, module.id] : p.passedModules,
      });
    }
    setPhase("submitted");
  };

  const mmss = `${String(Math.floor(secondsLeft / 60)).padStart(2, "0")}:${String(secondsLeft % 60).padStart(2, "0")}`;

  // ══════════════ SCREEN 4.6 — TEST SUBMITTED ══════════════
  if (phase === "submitted") {
    return (
      <div className="w-full pb-32 relative min-h-screen bg-transparent overflow-x-hidden font-sans text-slate-800">
        <PageHeader title="Test Submitted" subtitle={course.title} showBack onBack={() => navigate(`/learning/course/${course.id}`)} />
        <div className="px-4 mt-10 relative z-20 space-y-6 text-center">
          <motion.div {...rise(0)}>
            <SuccessBurst tone={manualReview ? "#0f172a" : "var(--color-primary)"} icon={<Send size={36} className="text-white" />} />
            <h2 className="font-black text-[var(--app-text-slate)] text-xl uppercase tracking-tight mt-6">Assessment Submitted</h2>
            <p className="text-[9px] font-black uppercase tracking-[0.25em] text-slate-400 mt-1.5">
              {manualReview ? "Sent for evaluator review" : "Auto-graded · results ready"}
            </p>
          </motion.div>

          <Bezel delay={0.2} innerClassName="p-5">
            <div className="flex items-center justify-between text-left">
              <div>
                <p className="text-[8px] font-black uppercase tracking-[0.2em] text-slate-400 mb-1">Assessment</p>
                <p className="font-black text-[11px] uppercase tracking-widest text-[var(--app-text-slate)]">Module Test · {module.title}</p>
              </div>
              <div className="text-right">
                <p className="text-[8px] font-black uppercase tracking-[0.2em] text-slate-400 mb-1">Answered</p>
                <p className="font-black text-[11px] text-[var(--color-primary)]">{answeredCount}/{questions.length}</p>
              </div>
            </div>
          </Bezel>

          <motion.div {...rise(0.32)} className="space-y-3">
            {manualReview ? (
              <PrimaryCTA onClick={() => navigate(`/learning/course/${course.id}/under-review?module=${module.id}`)}>Track Review Status</PrimaryCTA>
            ) : (
              <PrimaryCTA onClick={() => navigate(`/learning/course/${course.id}/results?module=${module.id}`)}>View Results</PrimaryCTA>
            )}
            <PrimaryCTA variant="ghost" onClick={() => navigate(`/learning/course/${course.id}`)}>Return To Course</PrimaryCTA>
          </motion.div>
        </div>
      </div>
    );
  }

  // ══════════════ SCREEN 4.5 — TEST REVIEW ══════════════
  if (phase === "review") {
    return (
      <div className="w-full pb-32 relative min-h-screen bg-transparent overflow-x-hidden font-sans text-slate-800">
        <PageHeader title="Test Review" subtitle={`Module Test · ${module.title}`} showBack onBack={() => setPhase("test")} />
        <div className="px-4 mt-4 relative z-20 space-y-5">
          <Bezel innerClassName="p-5">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[8px] font-black uppercase tracking-[0.25em] text-slate-400">Completion</span>
              <span className="text-[11px] font-black text-[var(--color-primary)]">{completionPct}%</span>
            </div>
            <ProgressBar pct={completionPct} />
            <div className="flex items-center gap-4 mt-4">
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                <span className="text-[8px] font-black uppercase tracking-widest text-slate-500">{answeredCount} Answered</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[var(--border)]" />
                <span className="text-[8px] font-black uppercase tracking-widest text-slate-500">{questions.length - answeredCount} Skipped</span>
              </div>
            </div>
          </Bezel>

          <div className="space-y-2.5">
            {questions.map((q, i) => {
              const answered = answers[q.id] !== undefined && answers[q.id] !== "";
              return (
                <Bezel key={q.id} delay={0.04 * i} innerClassName="p-3.5">
                  <button onClick={() => { setIndex(i); setPhase("test"); }} className="w-full flex items-center gap-3 text-left active:scale-[0.98] transition-transform">
                    <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 border ${answered ? "bg-emerald-50 border-emerald-200 text-emerald-500" : "bg-[var(--app-bg-muted)] border-[var(--border)] text-slate-400"}`}>
                      {answered ? <Check size={15} strokeWidth={3} /> : <CircleDashed size={15} />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[8px] font-black uppercase tracking-[0.2em] text-slate-400 mb-0.5">Question {i + 1} · {q.type}</p>
                      <p className="font-bold text-[10px] text-[var(--app-text-slate)] leading-snug line-clamp-2">{q.question}</p>
                    </div>
                    <span className={`text-[7px] font-black uppercase tracking-widest rounded-full px-2 py-1 shrink-0 border ${answered ? "text-emerald-600 bg-emerald-50 border-emerald-200" : "text-slate-400 bg-[var(--app-bg-muted)] border-[var(--border)]"}`}>
                      {answered ? "Answered" : "Skipped"}
                    </span>
                  </button>
                </Bezel>
              );
            })}
          </div>

          <motion.div {...rise(0.2)} className="space-y-3 pt-1">
            <PrimaryCTA onClick={handleSubmit} icon={<Send size={15} />}>Submit Assessment</PrimaryCTA>
            <PrimaryCTA variant="ghost" onClick={() => setPhase("test")}>Return To Questions</PrimaryCTA>
          </motion.div>
        </div>
      </div>
    );
  }

  // ══════════════ SCREEN 4.4 — COURSE ASSESSMENT ══════════════
  const value = answers[question.id];

  return (
    <div className="w-full pb-32 relative min-h-screen bg-transparent overflow-x-hidden font-sans text-slate-800">
      <PageHeader title="Assessment" subtitle={`Module Test · ${module.title}`} showBack onBack={() => navigate(`/learning/course/${course.id}`)} />

      <div className="px-4 mt-4 relative z-20 space-y-5">
        {/* Assessment header */}
        <Bezel innerClassName="p-4">
          <div className="flex items-center justify-between mb-2.5">
            <span className="text-[9px] font-black uppercase tracking-[0.2em] text-[var(--app-text-slate)]">
              Question {index + 1} of {questions.length}
            </span>
            {module.timed && (
              <span className={`flex items-center gap-1.5 text-[10px] font-black tracking-widest rounded-full px-3 py-1 border ${secondsLeft < 60 ? "text-[#E54D2E] bg-[#E54D2E]/10 border-[#E54D2E]/25" : "text-slate-600 bg-[var(--app-bg-muted)] border-[var(--border)]"}`}>
                <Timer size={11} /> {mmss}
              </span>
            )}
          </div>
          <ProgressBar pct={completionPct} />
        </Bezel>

        {/* Question card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={question.id}
            initial={{ opacity: 0, x: 32 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -32 }}
            transition={{ duration: 0.5, ease: GRACE }}
          >
            <Bezel innerClassName="p-5">
              <div className="flex items-center gap-2 mb-4">
                <span className="rounded-full px-3 py-1 text-[7px] uppercase tracking-[0.25em] font-black bg-[var(--color-primary)]/10 text-[var(--color-primary)] border border-[var(--color-primary)]/20">
                  {question.type === "standard" ? "Standard Test" : question.type === "quantitative" ? "Quantitative Test" : "Qualitative Test"}
                </span>
              </div>

              {/* TEST TYPE 2 — scenario block */}
              {question.scenario && (
                <div className="bg-[var(--app-bg-muted)] border border-[var(--border)] rounded-2xl p-4 mb-4">
                  <p className="text-[7px] font-black uppercase tracking-[0.25em] text-slate-400 mb-1.5">Scenario</p>
                  <p className="text-[11px] font-bold text-slate-600 leading-relaxed">{question.scenario}</p>
                </div>
              )}

              <p className="text-[13px] font-bold text-[var(--app-text-slate)] leading-relaxed mb-5">{question.question}</p>

              {/* TEST TYPES 1 & 2 — lettered single-select options */}
              {question.options && (
                <div className="space-y-2.5">
                  {question.options.map((opt, j) => {
                    const selected = value === j;
                    return (
                      <button
                        key={opt}
                        onClick={() => setAnswerFor(question, j)}
                        className={`w-full flex items-center gap-3.5 p-3.5 rounded-2xl border text-left transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] active:scale-[0.98] ${
                          selected ? "bg-[var(--color-primary)]/5 border-[var(--color-primary)]/40 shadow-sm" : "bg-[var(--app-bg-muted)] border-[var(--border)]"
                        }`}
                      >
                        <span className={`w-8 h-8 rounded-xl flex items-center justify-center font-black text-[11px] shrink-0 border transition-colors duration-500 ${
                          selected ? "bg-[var(--color-primary)] text-white border-[var(--color-primary)]" : "bg-[var(--app-bg)] text-slate-500 border-[var(--border)]"
                        }`}>
                          {String.fromCharCode(65 + j)}
                        </span>
                        <span className={`flex-1 text-[12px] font-bold ${selected ? "text-[var(--app-text-slate)]" : "text-slate-600"}`}>{opt}</span>
                        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 transition-all duration-500 ${selected ? "border-[var(--color-primary)] bg-[var(--color-primary)]" : "border-slate-300"}`}>
                          {selected && <Check size={11} className="text-white" strokeWidth={3.5} />}
                        </div>
                      </button>
                    );
                  })}
                </div>
              )}

              {/* TEST TYPE 3 — long answer with character counter */}
              {question.type === "qualitative" && (
                <div>
                  <div className="bg-[var(--app-bg-muted)] border border-[var(--border)] rounded-2xl p-1.5 focus-within:border-[var(--color-primary)]/50 transition-colors duration-500">
                    <textarea
                      value={(value as string) ?? ""}
                      onChange={(e) => setAnswerFor(question, e.target.value.slice(0, question.maxChars ?? 1000))}
                      maxLength={question.maxChars ?? 1000}
                      rows={7}
                      placeholder="Write your answer..."
                      className="w-full bg-[var(--app-bg)] rounded-[calc(1rem-0.125rem)] border border-[var(--border)] p-4 text-[12px] font-bold text-slate-700 outline-none resize-none placeholder:text-slate-400"
                    />
                  </div>
                  <div className="flex items-center justify-between mt-2 px-1">
                    <span className="flex items-center gap-1.5 text-[8px] font-black uppercase tracking-widest text-slate-400">
                      <PenLine size={10} /> Long Answer
                    </span>
                    <span className={`text-[9px] font-black tracking-widest ${((value as string) ?? "").length >= (question.maxChars ?? 1000) ? "text-[#E54D2E]" : "text-slate-400"}`}>
                      {((value as string) ?? "").length} / {question.maxChars ?? 1000}
                    </span>
                  </div>
                </div>
              )}
            </Bezel>
          </motion.div>
        </AnimatePresence>

        {/* Navigation */}
        <motion.div {...rise(0.1)} className="flex items-center gap-3">
          <motion.button
            whileTap={{ scale: 0.94 }}
            onClick={() => setIndex((i) => Math.max(0, i - 1))}
            disabled={index === 0}
            className={`w-14 h-14 rounded-full bg-[var(--app-bg)] border border-[var(--border)] shadow-sm flex items-center justify-center text-slate-600 ${index === 0 ? "opacity-40" : ""}`}
          >
            <ChevronLeft size={18} />
          </motion.button>
          {index < questions.length - 1 ? (
            <PrimaryCTA onClick={() => setIndex((i) => i + 1)} icon={<ChevronRight size={16} />} className="flex-1">
              Next Question
            </PrimaryCTA>
          ) : (
            <PrimaryCTA variant="dark" onClick={() => setPhase("review")} icon={<ClipboardCheck size={15} />} className="flex-1">
              Review Answers
            </PrimaryCTA>
          )}
        </motion.div>

        <button onClick={() => setPhase("review")} className="w-full text-center text-[8px] font-black uppercase tracking-[0.25em] text-slate-400 py-1 active:opacity-60 transition-opacity">
          Skip to review · {answeredCount}/{questions.length} answered
        </button>
      </div>
    </div>
  );
}
