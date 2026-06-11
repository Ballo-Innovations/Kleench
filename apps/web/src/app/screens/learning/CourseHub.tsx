// ─────────────────────────────────────────────────────────────
// SCREEN 4.3 — COURSE HUB  ·  /learning/course/:id
// Course command center: progress, module structure, actions.
// ─────────────────────────────────────────────────────────────

import { useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { motion, AnimatePresence } from "motion/react";
import { ChevronDown, Award, FileText, ClipboardList, Play, Check, Lock, BarChart3, GraduationCap } from "lucide-react";
import { PageHeader } from "../../components/PageHeader";
import { getCourse, loadProgress, courseStats, nextLesson, moduleHasQualitative, gradeModule } from "./courseData";
import { Bezel, SectionLabel, PrimaryCTA, ProgressRing, StatCell, rise } from "./ui";

export function CourseHub() {
  const navigate = useNavigate();
  const { id } = useParams();
  const course = getCourse(id);
  const progress = useMemo(() => loadProgress(course.id), [course.id]);
  const stats = courseStats(course, progress);
  const upNext = nextLesson(course, progress);
  const [openModule, setOpenModule] = useState<string | null>(
    course.modules.find((m) => !progress.passedModules.includes(m.id) && !progress.underReviewModules.includes(m.id))?.id ?? course.modules[0].id
  );

  const nextTestModule = course.modules.find(
    (m) =>
      !progress.passedModules.includes(m.id) &&
      !progress.underReviewModules.includes(m.id) &&
      m.lessons.every((l) => progress.completedLessons.includes(l.id))
  );
  const resultsModule = [...course.modules].reverse().find((m) => progress.passedModules.includes(m.id));

  const goLesson = () => navigate(`/learning/viewer?mode=learn-earn&course=${course.id}&lesson=${upNext?.id ?? ""}`);

  return (
    <div className="w-full pb-32 relative min-h-screen bg-transparent overflow-x-hidden font-sans text-slate-800">
      <PageHeader title="Course Hub" subtitle="Certified Learning Track" showBack />

      <div className="px-4 mt-4 relative z-20 space-y-5">

        {/* ── Course Identity ── */}
        <Bezel>
          <div className="relative w-full aspect-[16/9] bg-[var(--app-text-slate)]">
            <img src={course.image} alt={course.title} className="absolute inset-0 w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
            <div className="absolute top-3 left-3 bg-[var(--app-bg)]/15 backdrop-blur-md border border-white/25 rounded-full px-3 py-1.5 flex items-center gap-1.5">
              <Award size={11} className="text-white" />
              <span className="text-white text-[8px] font-black uppercase tracking-[0.2em]">Certified Course</span>
            </div>
            <div className="absolute bottom-3 left-4 right-4">
              <p className="text-white/60 text-[8px] font-black uppercase tracking-[0.25em] mb-1">{course.category}</p>
              <h2 className="text-white font-black text-lg uppercase tracking-tight leading-tight drop-shadow-lg">{course.title}</h2>
              <p className="text-white/70 text-[9px] font-bold uppercase tracking-widest mt-1.5">By {course.instructor}</p>
            </div>
          </div>
        </Bezel>

        {/* ── Progress Card ── */}
        <Bezel delay={0.08} innerClassName="p-4">
          <div className="flex items-center gap-4">
            <ProgressRing pct={stats.pct} sublabel="Complete" />
            <div className="flex-1">
              <p className="text-[8px] font-black uppercase tracking-[0.25em] text-slate-400 mb-1 pl-1">Current Progress</p>
              <div className="flex divide-x divide-[var(--border)] bg-[var(--app-bg-muted)] border border-[var(--border)] rounded-2xl">
                <StatCell value={`${stats.lessonsDone}/${stats.lessonsTotal}`} label="Lessons Completed" />
                <StatCell value={`${stats.assessmentsDone}/${stats.assessmentsTotal}`} label="Assessments Completed" />
                <StatCell value={stats.certificates} label="Certificates Earned" />
              </div>
            </div>
          </div>
        </Bezel>

        {/* ── Course Completion Banner ── */}
        <AnimatePresence>
          {stats.complete && (
            <motion.button
              {...rise(0.12)}
              whileTap={{ scale: 0.97 }}
              onClick={() => navigate(`/learning/course/${course.id}/complete`)}
              className="w-full bg-[var(--app-text-slate)] rounded-[2rem] p-5 flex items-center gap-4 text-left shadow-xl shadow-black/20"
            >
              <div className="w-12 h-12 rounded-full bg-[var(--color-primary)] flex items-center justify-center shrink-0 shadow-lg shadow-[var(--color-primary)]/40">
                <GraduationCap size={22} className="text-white" />
              </div>
              <div className="flex-1">
                <h4 className="text-white font-black text-[11px] uppercase tracking-widest leading-none mb-1">Course Completed</h4>
                <p className="text-white/60 text-[9px] font-bold uppercase tracking-widest">Claim your final certificate</p>
              </div>
              <Award size={20} className="text-[var(--color-primary)]" />
            </motion.button>
          )}
        </AnimatePresence>

        {/* ── Course Structure ── */}
        <motion.section {...rise(0.16)}>
          <SectionLabel>Course Structure</SectionLabel>
          <div className="space-y-3">
            {course.modules.map((module, mi) => {
              const open = openModule === module.id;
              const lessonsDone = module.lessons.filter((l) => progress.completedLessons.includes(l.id)).length;
              const passed = progress.passedModules.includes(module.id);
              const reviewing = progress.underReviewModules.includes(module.id);
              const lessonsComplete = lessonsDone === module.lessons.length;
              const certified = progress.certificates.includes(module.id);
              const grade = gradeModule(course, module, progress.answers[module.id]);

              return (
                <Bezel key={module.id} delay={0.05 * mi} innerClassName="overflow-hidden">
                  {/* Module header */}
                  <button onClick={() => setOpenModule(open ? null : module.id)} className="w-full flex items-center gap-3.5 p-4 text-left">
                    <div className={`w-10 h-10 rounded-2xl flex items-center justify-center shrink-0 border transition-colors duration-700 ${passed ? "bg-emerald-50 border-emerald-200 text-emerald-500" : "bg-[var(--app-bg-muted)] border-[var(--border)] text-slate-500"}`}>
                      {passed ? <Check size={16} strokeWidth={3} /> : <span className="font-black text-[11px]">{String(mi + 1).padStart(2, "0")}</span>}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-black text-[var(--app-text-slate)] text-[11px] uppercase tracking-widest leading-none mb-1 truncate">
                        Module {mi + 1} · {module.title}
                      </h4>
                      <p className="text-[8px] font-black uppercase tracking-[0.18em] text-slate-400">
                        {lessonsDone}/{module.lessons.length} Lessons
                        {passed && ` · Passed ${progress.scores[module.id] ?? grade.scorePct}%`}
                        {reviewing && " · Under Review"}
                      </p>
                    </div>
                    <motion.div animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.5, ease: [0.32, 0.72, 0, 1] }} className="w-7 h-7 rounded-full bg-[var(--app-bg-muted)] border border-[var(--border)] flex items-center justify-center text-slate-500 shrink-0">
                      <ChevronDown size={14} />
                    </motion.div>
                  </button>

                  {/* Module body */}
                  <AnimatePresence initial={false}>
                    {open && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.55, ease: [0.32, 0.72, 0, 1] }}
                        className="overflow-hidden"
                      >
                        <div className="px-4 pb-4 space-y-1.5 border-t border-[var(--border)] pt-3">
                          {/* Lessons */}
                          {module.lessons.map((lesson) => {
                            const done = progress.completedLessons.includes(lesson.id);
                            return (
                              <button
                                key={lesson.id}
                                onClick={() => navigate(`/learning/viewer?mode=learn-earn&course=${course.id}&lesson=${lesson.id}`)}
                                className="w-full flex items-center gap-3 p-2.5 rounded-2xl bg-[var(--app-bg-muted)] border border-[var(--border)] active:scale-[0.98] transition-transform text-left"
                              >
                                <div className="w-10 h-10 rounded-xl overflow-hidden relative shrink-0 bg-[var(--app-text-slate)]">
                                  <img src={lesson.image} alt="" className="absolute inset-0 w-full h-full object-cover opacity-80" />
                                  <div className="absolute inset-0 flex items-center justify-center bg-black/25">
                                    {done ? <Check size={14} className="text-emerald-400" strokeWidth={3} /> : <Play size={12} className="text-white fill-white" />}
                                  </div>
                                </div>
                                <div className="flex-1 min-w-0">
                                  <p className={`font-black text-[10px] uppercase tracking-wider leading-tight truncate ${done ? "text-slate-400 line-through" : "text-[var(--app-text-slate)]"}`}>{lesson.title}</p>
                                  <p className="text-[8px] font-bold text-slate-400 tracking-widest mt-0.5">{lesson.duration}</p>
                                </div>
                                {done && <span className="text-[7px] font-black uppercase tracking-widest text-emerald-500 bg-emerald-50 border border-emerald-200 rounded-full px-2 py-1 shrink-0">Done</span>}
                              </button>
                            );
                          })}

                          {/* Test */}
                          <button
                            onClick={() => lessonsComplete && !reviewing && navigate(`/learning/course/${course.id}/assessment?module=${module.id}`)}
                            className={`w-full flex items-center gap-3 p-2.5 rounded-2xl border text-left transition-transform ${lessonsComplete && !reviewing ? "bg-[var(--color-primary)]/5 border-[var(--color-primary)]/25 active:scale-[0.98]" : "bg-[var(--app-bg-muted)] border-[var(--border)] opacity-60"}`}
                          >
                            <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${lessonsComplete ? "bg-[var(--color-primary)]/10 text-[var(--color-primary)]" : "bg-[var(--app-bg)] border border-[var(--border)] text-slate-400"}`}>
                              {lessonsComplete ? <ClipboardList size={16} /> : <Lock size={14} />}
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="font-black text-[10px] uppercase tracking-wider text-[var(--app-text-slate)] leading-tight">
                                Module Test · {moduleHasQualitative(module) ? "Written" : module.questions[0]?.type === "quantitative" ? "Quantitative" : "Standard"}
                              </p>
                              <p className="text-[8px] font-bold text-slate-400 tracking-widest mt-0.5">
                                {module.questions.length} Questions{reviewing ? " · Under Review" : passed ? ` · Passed` : lessonsComplete ? " · Ready" : " · Complete lessons to unlock"}
                              </p>
                            </div>
                            {passed && certified && <Award size={16} className="text-[var(--color-primary)] shrink-0" />}
                          </button>

                          {/* Assignment */}
                          {module.assignment && (
                            <div className="w-full flex items-center gap-3 p-2.5 rounded-2xl bg-[var(--app-bg-muted)] border border-dashed border-[var(--border)]">
                              <div className="w-10 h-10 rounded-xl bg-[var(--app-bg)] border border-[var(--border)] flex items-center justify-center text-slate-500 shrink-0">
                                <FileText size={15} />
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className="font-black text-[10px] uppercase tracking-wider text-[var(--app-text-slate)] leading-tight">Assignment</p>
                                <p className="text-[8px] font-bold text-slate-400 tracking-widest mt-0.5 normal-case">{module.assignment}</p>
                              </div>
                            </div>
                          )}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </Bezel>
              );
            })}
          </div>
        </motion.section>

        {/* ── Actions ── */}
        <motion.section {...rise(0.24)} className="space-y-3 pt-1">
          {upNext && <PrimaryCTA onClick={goLesson} icon={<Play size={14} className="fill-current" />}>Continue Learning</PrimaryCTA>}
          {nextTestModule && (
            <PrimaryCTA variant="dark" onClick={() => navigate(`/learning/course/${course.id}/assessment?module=${nextTestModule.id}`)} icon={<ClipboardList size={15} />}>
              Start Test
            </PrimaryCTA>
          )}
          {resultsModule && (
            <PrimaryCTA variant="ghost" onClick={() => navigate(`/learning/course/${course.id}/results?module=${resultsModule.id}`)} icon={<BarChart3 size={15} />}>
              View Results
            </PrimaryCTA>
          )}
          <PrimaryCTA variant="ghost" onClick={() => navigate("/learning/profile")} icon={<Award size={15} />}>
            Learning Profile
          </PrimaryCTA>
        </motion.section>
      </div>
    </div>
  );
}
