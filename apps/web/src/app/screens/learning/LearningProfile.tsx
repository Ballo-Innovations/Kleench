// ─────────────────────────────────────────────────────────────
// SCREEN 4.13 — LEARNING PROFILE ACHIEVEMENT  ·  /learning/profile
// Certificates, completed courses, hours learned, tests passed,
// achievement badges. Certificates remain accessible here always.
// ─────────────────────────────────────────────────────────────

import { useMemo } from "react";
import { useNavigate } from "react-router";
import { motion } from "motion/react";
import { Award, GraduationCap, Clock3, ClipboardCheck, Medal, Star, Target, Zap, ChevronRight, Lock } from "lucide-react";
import { PageHeader } from "../../components/PageHeader";
import { COURSES, loadProgress, courseStats, achievementStats, certificateNumber } from "./courseData";
import { Bezel, SectionLabel, PrimaryCTA, StatCell, rise } from "./ui";

export function LearningProfile() {
  const navigate = useNavigate();
  const stats = useMemo(() => achievementStats(), []);

  // Earned certificates across every course — always accessible
  const certificates = useMemo(
    () =>
      COURSES.flatMap((course) => {
        const p = loadProgress(course.id);
        return p.certificates.map((certId) => ({
          course,
          certId,
          final: certId === "final",
          label: certId === "final" ? "Full Course Certificate" : `Module · ${course.modules.find((m) => m.id === certId)?.title ?? certId}`,
          number: certificateNumber(course.id, certId === "final" ? "FULL" : certId),
        }));
      }),
    []
  );

  const badges = [
    { icon: Medal, label: "First Lesson", type: "Completion Badge", earned: stats.hoursLearned > 0 },
    { icon: ClipboardCheck, label: "Test Taker", type: "Completion Badge", earned: stats.testsPassed > 0 },
    { icon: Award, label: "Certified", type: "Course Badge", earned: stats.certificatesEarned > 0 },
    { icon: GraduationCap, label: "Graduate", type: "Course Badge", earned: stats.coursesCompleted > 0 },
    { icon: Target, label: "Finance Pro", type: "Specialization", earned: courseStats(COURSES[0], loadProgress(COURSES[0].id)).complete },
    { icon: Zap, label: "Fast Learner", type: "Specialization", earned: stats.hoursLearned >= 1 },
  ];

  const STAT_TILES = [
    { icon: Award, value: stats.certificatesEarned, label: "Certificates Earned" },
    { icon: GraduationCap, value: stats.coursesCompleted, label: "Courses Completed" },
    { icon: Clock3, value: `${stats.hoursLearned}h`, label: "Hours Learned" },
    { icon: ClipboardCheck, value: stats.testsPassed, label: "Tests Passed" },
  ];

  return (
    <div className="w-full pb-24 relative bg-transparent font-sans text-slate-800">
      <PageHeader title="Learning Profile" subtitle="Achievements & Certification" showBack />

      <div className="px-4 mt-4 relative z-20 space-y-6">

        {/* ── Achievement Stats ── */}
        <div className="grid grid-cols-2 gap-3">
          {STAT_TILES.map((tile, i) => (
            <Bezel key={tile.label} delay={0.05 * i} innerClassName="p-4">
              <div className="flex flex-col items-start">
                <div className="w-9 h-9 rounded-xl bg-[var(--color-primary)]/10 border border-[var(--color-primary)]/20 text-[var(--color-primary)] flex items-center justify-center mb-3">
                  <tile.icon size={16} />
                </div>
                <span className="font-black text-[var(--app-text-slate)] text-2xl leading-none tracking-tight">{tile.value}</span>
                <span className="text-[7px] font-black uppercase tracking-[0.2em] text-slate-400 mt-1.5">{tile.label}</span>
              </div>
            </Bezel>
          ))}
        </div>

        {/* ── Achievement Badges ── */}
        <motion.section {...rise(0.18)}>
          <SectionLabel>Achievement Badges</SectionLabel>
          <Bezel innerClassName="p-4">
            <div className="grid grid-cols-3 gap-3">
              {badges.map((badge, i) => (
                <motion.div
                  key={badge.label}
                  initial={{ opacity: 0, scale: 0.85 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.55, delay: 0.2 + i * 0.06, ease: [0.22, 1, 0.36, 1] }}
                  className={`flex flex-col items-center text-center p-3 rounded-2xl border ${badge.earned ? "bg-[var(--app-bg-muted)] border-[var(--border)]" : "bg-[var(--app-bg-muted)]/50 border-dashed border-[var(--border)] opacity-50"}`}
                >
                  <div className={`w-11 h-11 rounded-full flex items-center justify-center mb-2 ${badge.earned ? "bg-[var(--app-text-slate)] text-[var(--color-primary)] shadow-lg shadow-black/15" : "bg-[var(--app-bg)] border border-[var(--border)] text-slate-300"}`}>
                    {badge.earned ? <badge.icon size={18} /> : <Lock size={14} />}
                  </div>
                  <span className="text-[8px] font-black uppercase tracking-wider text-[var(--app-text-slate)] leading-tight">{badge.label}</span>
                  <span className="text-[6px] font-black uppercase tracking-[0.15em] text-slate-400 mt-0.5">{badge.type}</span>
                </motion.div>
              ))}
            </div>
          </Bezel>
        </motion.section>

        {/* ── Certificate Vault ── */}
        <motion.section {...rise(0.26)}>
          <SectionLabel>My Certificates</SectionLabel>
          {certificates.length === 0 ? (
            <Bezel innerClassName="p-8 text-center">
              <div className="w-14 h-14 rounded-full bg-[var(--app-bg-muted)] border border-[var(--border)] flex items-center justify-center mx-auto mb-3 text-slate-300">
                <Award size={22} />
              </div>
              <h4 className="font-black text-[var(--app-text-slate)] text-[11px] uppercase tracking-widest mb-1">No Certificates Yet</h4>
              <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest leading-relaxed">Complete a certified course module to earn your first one</p>
            </Bezel>
          ) : (
            <div className="space-y-2.5">
              {certificates.map((cert, i) => (
                <Bezel key={cert.number} delay={0.04 * i} innerClassName="p-3.5">
                  <button
                    onClick={() =>
                      navigate(
                        cert.final
                          ? `/learning/course/${cert.course.id}/final-certificate`
                          : `/learning/course/${cert.course.id}/certificate?module=${cert.certId}`
                      )
                    }
                    className="w-full flex items-center gap-3.5 text-left active:scale-[0.98] transition-transform"
                  >
                    <div className={`w-11 h-11 rounded-2xl flex items-center justify-center shrink-0 ${cert.final ? "bg-[var(--color-primary)] text-white shadow-lg shadow-[var(--color-primary)]/30" : "bg-[var(--app-text-slate)] text-[var(--color-primary)]"}`}>
                      {cert.final ? <GraduationCap size={18} /> : <Award size={18} />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-black text-[10px] uppercase tracking-wider text-[var(--app-text-slate)] leading-tight truncate">{cert.course.title}</p>
                      <p className="text-[8px] font-bold text-slate-400 tracking-widest mt-0.5 truncate">{cert.label}</p>
                      <p className="text-[7px] font-black text-slate-300 tracking-[0.15em] mt-0.5">{cert.number}</p>
                    </div>
                    <ChevronRight size={15} className="text-slate-400 shrink-0" />
                  </button>
                </Bezel>
              ))}
            </div>
          )}
        </motion.section>

        {/* ── Continue learning shortcut ── */}
        <motion.div {...rise(0.34)}>
          <PrimaryCTA onClick={() => navigate("/learning")} icon={<Star size={15} />}>
            Explore Certified Courses
          </PrimaryCTA>
        </motion.div>
      </div>
    </div>
  );
}
