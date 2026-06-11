// ─────────────────────────────────────────────────────────────
// SCREEN 4.1 — LESSON COMPLETED  ·  /learning/course/:id/lesson-complete
// SCREEN 4.2 — LESSON QUESTIONS  ·  /learning/course/:id/questions
// Transition from learning into assessment.
// ─────────────────────────────────────────────────────────────

import { useMemo, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router";
import { motion, AnimatePresence } from "motion/react";
import { Check, ClipboardList, Play, ArrowRight } from "lucide-react";
import { PageHeader } from "../../components/PageHeader";
import { getCourse, loadProgress, saveProgress, courseStats, courseLessons, lessonAfter, moduleOfLesson } from "./courseData";
import { Bezel, PrimaryCTA, ProgressBar, SuccessBurst, StatCell, rise } from "./ui";

// ══════════════════════════════════════════════════════════════
// SCREEN 4.1 — LESSON COMPLETED
// ══════════════════════════════════════════════════════════════

export function LessonCompleted() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [params] = useSearchParams();
  const course = getCourse(id);
  const lessons = courseLessons(course);
  const lesson = lessons.find((l) => l.id === params.get("lesson")) ?? lessons[0];
  const module = moduleOfLesson(course, lesson.id);
  const progress = useMemo(() => loadProgress(course.id), [course.id]);
  const stats = courseStats(course, progress);
  const next = lessonAfter(course, lesson.id);
  const moduleReady = module.lessons.every((l) => progress.completedLessons.includes(l.id));

  return (
    <div className="w-full pb-24 relative bg-transparent font-sans text-slate-800">
      <PageHeader title="Lesson Completed" subtitle={course.title} showBack onBack={() => navigate(`/learning/course/${course.id}`)} />

      <div className="px-4 mt-8 relative z-20 space-y-6">
        {/* Success illustration */}
        <motion.div {...rise(0)} className="text-center pt-4">
          <SuccessBurst icon={<Check size={42} className="text-white" strokeWidth={3.5} />} />
          <motion.h2 {...rise(0.25)} className="font-black text-[var(--app-text-slate)] text-xl uppercase tracking-tight mt-6">
            Lesson Completed
          </motion.h2>
          <motion.p {...rise(0.32)} className="text-[9px] font-black uppercase tracking-[0.25em] text-slate-400 mt-1.5">
            Completed Successfully
          </motion.p>
        </motion.div>

        {/* Summary card */}
        <Bezel delay={0.38} innerClassName="p-5">
          <h4 className="font-black text-[var(--app-text-slate)] text-[12px] uppercase tracking-widest leading-tight mb-1">{lesson.title}</h4>
          <p className="text-[8px] font-black uppercase tracking-[0.2em] text-slate-400 mb-4">
            Module · {module.title} &nbsp;·&nbsp; Completion Time · {lesson.duration}
          </p>
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-[8px] font-black uppercase tracking-[0.2em] text-slate-400">Course Progress</span>
            <span className="text-[10px] font-black text-[var(--color-primary)]">{stats.pct}%</span>
          </div>
          <ProgressBar pct={stats.pct} />
        </Bezel>

        {/* Up next */}
        {next && (
          <Bezel delay={0.46} innerClassName="p-3">
            <button
              onClick={() => navigate(`/learning/viewer?mode=learn-earn&course=${course.id}&lesson=${next.id}`)}
              className="w-full flex items-center gap-3 text-left active:scale-[0.98] transition-transform"
            >
              <div className="w-14 h-14 rounded-2xl overflow-hidden relative shrink-0 bg-[var(--app-text-slate)]">
                <img src={next.image} alt="" className="absolute inset-0 w-full h-full object-cover opacity-80" />
                <div className="absolute inset-0 flex items-center justify-center bg-black/25">
                  <Play size={14} className="text-white fill-white" />
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[7px] font-black uppercase tracking-[0.25em] text-[var(--color-primary)] mb-1">Up Next</p>
                <p className="font-black text-[10px] uppercase tracking-wider text-[var(--app-text-slate)] leading-tight truncate">{next.title}</p>
                <p className="text-[8px] font-bold text-slate-400 tracking-widest mt-0.5">{next.duration}</p>
              </div>
              <div className="w-8 h-8 rounded-full bg-[var(--app-bg-muted)] border border-[var(--border)] flex items-center justify-center text-slate-500 shrink-0">
                <ArrowRight size={14} />
              </div>
            </button>
          </Bezel>
        )}

        {/* Actions */}
        <motion.div {...rise(0.54)} className="space-y-3 pt-1">
          <PrimaryCTA onClick={() => navigate(`/learning/course/${course.id}/questions?lesson=${lesson.id}`)} icon={<ClipboardList size={15} />}>
            Answer Questions
          </PrimaryCTA>
          <PrimaryCTA
            variant="dark"
            disabled={!moduleReady}
            onClick={() => moduleReady && navigate(`/learning/course/${course.id}/assessment?module=${module.id}`)}
          >
            Take Test
          </PrimaryCTA>
          {!moduleReady && (
            <p className="text-center text-[8px] font-black uppercase tracking-[0.2em] text-slate-400">
              Complete all module lessons to unlock the test
            </p>
          )}
        </motion.div>
      </div>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════
// SCREEN 4.2 — LESSON QUESTIONS
// Reuses the existing dark questionnaire treatment (lettered
// options, green selection radios) — no redesign.
// ══════════════════════════════════════════════════════════════

interface LessonQuestion {
  text: string;
  options: string[];
  type: "yesno" | "single" | "multi";
}

const LESSON_QUESTIONS: LessonQuestion[] = [
  { text: "Was this lesson clear and easy to follow?", options: ["Yes", "No"], type: "yesno" },
  { text: "Which concept from this lesson will you apply first?", options: ["Budget framework", "Savings hierarchy", "Market signals"], type: "single" },
  { text: "Which formats helped you learn? Select all that apply.", options: ["Video walkthrough", "Worked examples", "Instructor notes"], type: "multi" },
];

export function LessonQuestions() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [params] = useSearchParams();
  const course = getCourse(id);
  const lessons = courseLessons(course);
  const lesson = lessons.find((l) => l.id === params.get("lesson")) ?? lessons[0];
  const module = moduleOfLesson(course, lesson.id);

  const [answers, setAnswers] = useState<Record<number, string[]>>({});
  const [submitted, setSubmitted] = useState(false);

  const toggle = (qi: number, opt: string, multi: boolean) => {
    setAnswers((prev) => {
      const cur = prev[qi] ?? [];
      if (!multi) return { ...prev, [qi]: [opt] };
      return { ...prev, [qi]: cur.includes(opt) ? cur.filter((o) => o !== opt) : [...cur, opt] };
    });
  };

  const allAnswered = LESSON_QUESTIONS.every((_, i) => (answers[i] ?? []).length > 0);

  const handleSubmit = () => {
    const p = loadProgress(course.id);
    if (!p.completedQuestionSets.includes(lesson.id)) {
      saveProgress(course.id, { completedQuestionSets: [...p.completedQuestionSets, lesson.id] });
    }
    setSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 max-w-md mx-auto flex flex-col justify-end bg-gradient-to-b from-slate-800 to-slate-950">
      {/* Blurred lesson backdrop */}
      <div className="absolute inset-0 overflow-hidden">
        <img src={lesson.image} alt="" className="w-full h-full object-cover opacity-30 blur-md scale-110" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-black/80" />
      </div>

      <motion.div
        initial={{ y: "100%" }}
        animate={{ y: 0 }}
        transition={{ type: "spring", damping: 25, stiffness: 200 }}
        className="relative backdrop-blur-md rounded-t-3xl px-6 pt-5 pb-8 max-h-[88vh] overflow-y-auto no-scrollbar"
        style={{ scrollbarWidth: "none" }}
      >
        <div className="w-10 h-1 bg-slate-600 rounded-full mx-auto mb-5" />

        <AnimatePresence mode="wait">
          {!submitted ? (
            <motion.div key="questions" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, y: -16 }} transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Lesson Questions</p>
              <p className="text-white text-[11px] font-bold mb-5 opacity-70">{lesson.title}</p>

              <div className="space-y-6">
                {LESSON_QUESTIONS.map((q, i) => (
                  <div key={i}>
                    <p className="text-white text-sm font-semibold mb-3 leading-snug">{q.text}</p>
                    <div className="space-y-2.5">
                      {q.options.map((opt, j) => {
                        const selected = (answers[i] ?? []).includes(opt);
                        return (
                          <button key={opt} onClick={() => toggle(i, opt, q.type === "multi")} className="w-full flex items-center gap-3 text-left">
                            <span className="text-slate-400 text-sm w-5 flex-shrink-0">{String.fromCharCode(97 + j)})</span>
                            <span className="flex-1 text-sm text-white font-medium">{opt}</span>
                            <div className={`w-5 h-5 ${q.type === "multi" ? "rounded-md" : "rounded-full"} border-2 flex items-center justify-center flex-shrink-0 transition-all ${selected ? "border-green-500 bg-green-500" : "border-slate-500"}`}>
                              {selected && <Check size={11} className="text-white" strokeWidth={3} />}
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>

              <button
                onClick={handleSubmit}
                disabled={!allAnswered}
                className={`w-full py-4 rounded-2xl font-black text-base uppercase tracking-widest mt-7 active:scale-95 transition-all shadow-lg ${allAnswered ? "bg-[var(--color-primary)] text-white shadow-[var(--color-primary)]/30" : "bg-slate-700 text-slate-400"}`}
              >
                Complete
              </button>
            </motion.div>
          ) : (
            <motion.div key="done" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }} className="text-center py-4">
              <SuccessBurst tone="#22c55e" icon={<Check size={40} className="text-white" strokeWidth={3.5} />} />
              <h3 className="text-white font-black text-lg uppercase tracking-tight mt-6">Questions Completed</h3>
              <p className="text-slate-400 text-[9px] font-black uppercase tracking-[0.25em] mt-1.5 mb-8">Completed Successfully</p>

              <div className="space-y-3">
                <PrimaryCTA onClick={() => navigate(`/learning/course/${course.id}`)} icon={<Play size={14} className="fill-current" />}>
                  Continue Learning
                </PrimaryCTA>
                <PrimaryCTA variant="dark" onClick={() => navigate(`/learning/course/${course.id}/assessment?module=${module.id}`)} icon={<ClipboardList size={15} />} className="!bg-white/10 border border-white/15">
                  Proceed To Test
                </PrimaryCTA>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
