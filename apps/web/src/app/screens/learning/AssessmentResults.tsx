// ─────────────────────────────────────────────────────────────
// SCREEN 4.7 — UNDER REVIEW      ·  /learning/course/:id/under-review
// SCREEN 4.8 — RESULTS           ·  /learning/course/:id/results
// SCREEN 4.9 — DETAILED RESULTS  ·  /learning/course/:id/results/detail
// ─────────────────────────────────────────────────────────────

import { useMemo } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router";
import { motion } from "motion/react";
import { Check, X, Hourglass, Award, RotateCcw, Play, ListChecks, MessageSquareQuote } from "lucide-react";
import { PageHeader } from "../../components/PageHeader";
import { getCourse, getModule, loadProgress, clearModuleAnswers, gradeModule } from "./courseData";
import { Bezel, PrimaryCTA, ProgressRing, StatCell, SuccessBurst, rise } from "./ui";

// ══════════════════════════════════════════════════════════════
// SCREEN 4.7 — UNDER REVIEW
// ══════════════════════════════════════════════════════════════

export function AssessmentUnderReview() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [params] = useSearchParams();
  const course = getCourse(id);
  const module = getModule(course, params.get("module"));
  const today = new Date().toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });

  return (
    <div className="w-full pb-32 relative min-h-screen bg-transparent overflow-x-hidden font-sans text-slate-800">
      <PageHeader title="Under Review" subtitle={course.title} showBack onBack={() => navigate(`/learning/course/${course.id}`)} />

      <div className="px-4 mt-10 relative z-20 space-y-6">
        <motion.div {...rise(0)} className="text-center">
          <div className="relative w-32 h-32 mx-auto">
            <motion.div
              className="absolute inset-0 rounded-full border-2 border-dashed border-[var(--color-primary)]/40"
              animate={{ rotate: 360 }}
              transition={{ duration: 14, repeat: Infinity, ease: "linear" }}
            />
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", damping: 14, stiffness: 160, delay: 0.15 }}
              className="absolute inset-4 rounded-full bg-[var(--app-text-slate)] flex items-center justify-center shadow-xl shadow-black/25"
            >
              <motion.div animate={{ rotate: [0, 0, 180, 180] }} transition={{ duration: 3, repeat: Infinity, times: [0, 0.7, 0.85, 1] }}>
                <Hourglass size={36} className="text-[var(--color-primary)]" />
              </motion.div>
            </motion.div>
          </div>
          <h2 className="font-black text-[var(--app-text-slate)] text-lg uppercase tracking-tight mt-6 leading-snug px-6">
            Your Assessment Is Being Reviewed
          </h2>
          <p className="text-[9px] font-black uppercase tracking-[0.25em] text-slate-400 mt-2">
            An evaluator is grading your written answers
          </p>
        </motion.div>

        <Bezel delay={0.25} innerClassName="divide-y divide-[var(--border)]">
          {[
            { label: "Assessment Name", value: `Module Test · ${module.title}` },
            { label: "Submission Date", value: today },
            { label: "Expected Review Time", value: "24 – 48 Hours" },
          ].map((row) => (
            <div key={row.label} className="flex items-center justify-between p-4">
              <span className="text-[8px] font-black uppercase tracking-[0.2em] text-slate-400">{row.label}</span>
              <span className="text-[10px] font-black uppercase tracking-wider text-[var(--app-text-slate)] text-right">{row.value}</span>
            </div>
          ))}
        </Bezel>

        <motion.div {...rise(0.35)}>
          <PrimaryCTA onClick={() => navigate("/learning")} icon={<Play size={14} className="fill-current" />}>
            Return To Learning
          </PrimaryCTA>
        </motion.div>
      </div>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════
// SCREEN 4.8 — RESULTS
// ══════════════════════════════════════════════════════════════

export function AssessmentResults() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [params] = useSearchParams();
  const course = getCourse(id);
  const module = getModule(course, params.get("module"));
  const progress = useMemo(() => loadProgress(course.id), [course.id]);
  const grade = gradeModule(course, module, progress.answers[module.id]);
  const score = progress.scores[module.id] ?? grade.scorePct;
  const passed = score >= course.passingScore;

  const handleRetake = () => {
    clearModuleAnswers(course.id, module.id);
    navigate(`/learning/course/${course.id}/assessment?module=${module.id}`);
  };

  return (
    <div className="w-full pb-32 relative min-h-screen bg-transparent overflow-x-hidden font-sans text-slate-800">
      <PageHeader title="Results" subtitle={`Module Test · ${module.title}`} showBack onBack={() => navigate(`/learning/course/${course.id}`)} />

      <div className="px-4 mt-5 relative z-20 space-y-5">
        {/* Score card with progress ring */}
        <Bezel innerClassName="p-6">
          <div className="flex flex-col items-center text-center">
            <ProgressRing
              pct={score}
              size={132}
              stroke={9}
              color={passed ? "#10b981" : "#E54D2E"}
              label={`${score}%`}
              sublabel={passed ? "Passed" : "Failed"}
            />
            <motion.div {...rise(0.4)} className={`mt-4 rounded-full px-4 py-1.5 border flex items-center gap-1.5 ${passed ? "bg-emerald-50 border-emerald-200 text-emerald-600" : "bg-[#E54D2E]/10 border-[#E54D2E]/25 text-[#E54D2E]"}`}>
              {passed ? <Check size={12} strokeWidth={3.5} /> : <X size={12} strokeWidth={3.5} />}
              <span className="text-[9px] font-black uppercase tracking-[0.2em]">{passed ? "Assessment Passed" : "Below Passing Score"}</span>
            </motion.div>
            <p className="text-[8px] font-black uppercase tracking-[0.2em] text-slate-400 mt-3">
              Passing Score · {course.passingScore}%
            </p>
          </div>
        </Bezel>

        {/* Breakdown */}
        <Bezel delay={0.12} innerClassName="p-2">
          <div className="flex divide-x divide-[var(--border)]">
            <StatCell value={<span className="text-emerald-500">{grade.correct}</span>} label="Questions Correct" />
            <StatCell value={<span className="text-[#E54D2E]">{grade.incorrect}</span>} label="Questions Incorrect" />
            <StatCell value={grade.objectiveTotal} label="Total Questions" />
          </div>
        </Bezel>

        {/* Actions */}
        <motion.div {...rise(0.22)} className="space-y-3 pt-1">
          <PrimaryCTA onClick={() => navigate(`/learning/course/${course.id}/results/detail?module=${module.id}`)} icon={<ListChecks size={15} />}>
            View Detailed Results
          </PrimaryCTA>
          {passed && (
            <PrimaryCTA variant="dark" onClick={() => navigate(`/learning/course/${course.id}/certificate?module=${module.id}`)} icon={<Award size={15} />}>
              Claim Module Certificate
            </PrimaryCTA>
          )}
          <PrimaryCTA variant="ghost" onClick={() => navigate(`/learning/course/${course.id}`)} icon={<Play size={14} />}>
            Continue Learning
          </PrimaryCTA>
          <PrimaryCTA variant="ghost" onClick={handleRetake} icon={<RotateCcw size={14} />}>
            Retake Assessment
          </PrimaryCTA>
        </motion.div>
      </div>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════
// SCREEN 4.9 — DETAILED RESULTS
// ══════════════════════════════════════════════════════════════

export function DetailedResults() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [params] = useSearchParams();
  const course = getCourse(id);
  const module = getModule(course, params.get("module"));
  const progress = useMemo(() => loadProgress(course.id), [course.id]);
  const answers = progress.answers[module.id] ?? {};

  const handleRetake = () => {
    clearModuleAnswers(course.id, module.id);
    navigate(`/learning/course/${course.id}/assessment?module=${module.id}`);
  };

  return (
    <div className="w-full pb-32 relative min-h-screen bg-transparent overflow-x-hidden font-sans text-slate-800">
      <PageHeader title="Detailed Results" subtitle={`Module Test · ${module.title}`} showBack onBack={() => navigate(`/learning/course/${course.id}/results?module=${module.id}`)} />

      <div className="px-4 mt-4 relative z-20 space-y-4">
        {module.questions.map((q, i) => {
          const userAnswer = answers[q.id];
          const isQualitative = q.type === "qualitative";
          const correct = !isQualitative && userAnswer === q.correct;
          const skipped = userAnswer === undefined || userAnswer === "";

          return (
            <Bezel key={q.id} delay={0.05 * i} innerClassName="p-5">
              {/* Question header */}
              <div className="flex items-start gap-3 mb-4">
                <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 border ${
                  isQualitative ? "bg-[var(--app-bg-muted)] border-[var(--border)] text-slate-500"
                  : correct ? "bg-emerald-50 border-emerald-200 text-emerald-500"
                  : "bg-[#E54D2E]/10 border-[#E54D2E]/25 text-[#E54D2E]"
                }`}>
                  {isQualitative ? <MessageSquareQuote size={14} /> : correct ? <Check size={14} strokeWidth={3} /> : <X size={14} strokeWidth={3} />}
                </div>
                <div className="flex-1">
                  <p className="text-[7px] font-black uppercase tracking-[0.25em] text-slate-400 mb-1">Question {i + 1} · {q.type}</p>
                  <p className="text-[12px] font-bold text-[var(--app-text-slate)] leading-relaxed">{q.question}</p>
                </div>
              </div>

              {/* Answer comparison */}
              <div className="space-y-2">
                <div className={`rounded-2xl border p-3 ${
                  isQualitative ? "bg-[var(--app-bg-muted)] border-[var(--border)]"
                  : correct ? "bg-emerald-50/60 border-emerald-200"
                  : "bg-[#E54D2E]/5 border-[#E54D2E]/20"
                }`}>
                  <p className="text-[7px] font-black uppercase tracking-[0.25em] text-slate-400 mb-1">Your Answer</p>
                  <p className="text-[11px] font-bold text-slate-700 leading-relaxed">
                    {skipped ? "— Skipped —" : isQualitative ? (userAnswer as string) : q.options?.[userAnswer as number]}
                  </p>
                </div>
                {!isQualitative && !correct && (
                  <div className="rounded-2xl border border-emerald-200 bg-emerald-50/60 p-3">
                    <p className="text-[7px] font-black uppercase tracking-[0.25em] text-emerald-600 mb-1">Correct Answer</p>
                    <p className="text-[11px] font-bold text-slate-700">{q.options?.[q.correct ?? 0]}</p>
                  </div>
                )}
                {(q.feedback || isQualitative) && (
                  <div className="rounded-2xl border border-dashed border-[var(--border)] bg-[var(--app-bg-muted)] p-3">
                    <p className="text-[7px] font-black uppercase tracking-[0.25em] text-slate-400 mb-1">Feedback</p>
                    <p className="text-[11px] font-bold text-slate-600 leading-relaxed">
                      {q.feedback ?? "Your written answer has been recorded and will receive evaluator feedback once reviewed."}
                    </p>
                  </div>
                )}
              </div>
            </Bezel>
          );
        })}

        <motion.div {...rise(0.2)} className="space-y-3 pt-1">
          <PrimaryCTA onClick={() => navigate(`/learning/course/${course.id}`)} icon={<Play size={14} className="fill-current" />}>
            Continue Course
          </PrimaryCTA>
          <PrimaryCTA variant="ghost" onClick={handleRetake} icon={<RotateCcw size={14} />}>
            Retake Assessment
          </PrimaryCTA>
        </motion.div>
      </div>
    </div>
  );
}
