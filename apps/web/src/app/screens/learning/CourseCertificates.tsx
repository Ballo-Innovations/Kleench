// ─────────────────────────────────────────────────────────────
// SCREEN 4.10 — MODULE CERTIFICATE      ·  /learning/course/:id/certificate
// SCREEN 4.11 — COURSE COMPLETION       ·  /learning/course/:id/complete
// SCREEN 4.12 — FINAL COURSE CERTIFICATE·  /learning/course/:id/final-certificate
// ─────────────────────────────────────────────────────────────

import { useEffect, useMemo } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router";
import { motion } from "motion/react";
import { toast } from "sonner";
import { Award, Download, Share2, Play, GraduationCap, BadgeCheck, UserCircle2 } from "lucide-react";
import { PageHeader } from "../../components/PageHeader";
import kleenchLogo from "@/assets/kleench_logo.png";
import { getCourse, getModule, loadProgress, saveProgress, courseStats, certificateNumber } from "./courseData";
import { Bezel, PrimaryCTA, StatCell, SuccessBurst, GRACE, rise } from "./ui";

function learnerName(): string {
  try {
    const raw = localStorage.getItem("userKyc");
    return raw ? JSON.parse(raw).fullName ?? "Kleench Learner" : "Kleench Learner";
  } catch {
    return "Kleench Learner";
  }
}

function useClaimCertificate(courseId: string, certId: string) {
  useEffect(() => {
    const p = loadProgress(courseId);
    if (!p.certificates.includes(certId)) {
      saveProgress(courseId, { certificates: [...p.certificates, certId] });
    }
  }, [courseId, certId]);
}

/** Premium certificate plate — double-bezel, engraved seal, serial strip. */
function CertificatePlate({
  heading,
  courseTitle,
  moduleTitle,
  certNo,
  instructor,
}: {
  heading: string;
  courseTitle: string;
  moduleTitle?: string;
  certNo: string;
  instructor?: string;
}) {
  const today = new Date().toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });
  return (
    <Bezel delay={0.15} innerClassName="relative bg-[var(--app-text-slate)] p-6 text-center">
      {/* Engraved backdrop texture */}
      <div className="absolute inset-0 opacity-[0.07] pointer-events-none">
        <svg width="100%" height="100%">
          <defs>
            <pattern id="cert-grid" width="24" height="24" patternUnits="userSpaceOnUse">
              <path d="M 24 0 L 0 0 0 24" fill="none" stroke="white" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#cert-grid)" />
        </svg>
      </div>
      <div className="absolute -top-10 -right-10 w-40 h-40 bg-[var(--color-primary)]/25 rounded-full blur-[50px] pointer-events-none" />
      <div className="absolute -bottom-12 -left-12 w-44 h-44 bg-[var(--color-primary)]/15 rounded-full blur-[60px] pointer-events-none" />

      <div className="relative">
        <img src={kleenchLogo} alt="KLEENCH" className="h-5 w-auto object-contain brightness-0 invert mx-auto mb-5 opacity-90" />

        {/* Seal */}
        <motion.div
          initial={{ scale: 0, rotate: -20 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", damping: 12, stiffness: 140, delay: 0.4 }}
          className="w-16 h-16 mx-auto rounded-full bg-[var(--color-primary)] flex items-center justify-center shadow-[0_18px_40px_-12px_var(--color-primary)] ring-4 ring-white/10 mb-5"
        >
          <Award size={28} className="text-white" />
        </motion.div>

        <p className="text-white/50 text-[7px] font-black uppercase tracking-[0.35em] mb-2">{heading}</p>
        <p className="text-white/60 text-[8px] font-bold uppercase tracking-[0.2em] mb-1">This certifies that</p>
        <h2 className="text-white font-black text-lg uppercase tracking-tight leading-tight mb-1" style={{ fontFamily: "var(--font-header)" }}>
          {learnerName()}
        </h2>
        <p className="text-white/60 text-[8px] font-bold uppercase tracking-[0.2em] mb-1">has successfully completed</p>
        <h3 className="text-[var(--color-primary)] font-black text-[13px] uppercase tracking-widest leading-snug mb-1">{courseTitle}</h3>
        {moduleTitle && <p className="text-white/80 text-[10px] font-black uppercase tracking-widest mb-1">Module · {moduleTitle}</p>}
        {instructor && <p className="text-white/50 text-[8px] font-bold uppercase tracking-[0.2em] mt-2">Instructor · {instructor}</p>}

        {/* Serial strip */}
        <div className="mt-5 pt-4 border-t border-white/15 flex items-center justify-between">
          <div className="text-left">
            <p className="text-white/40 text-[6px] font-black uppercase tracking-[0.25em] mb-0.5">{moduleTitle ? "Certificate No" : "Certificate ID"}</p>
            <p className="text-white text-[9px] font-black tracking-widest">{certNo}</p>
          </div>
          <div className="text-right">
            <p className="text-white/40 text-[6px] font-black uppercase tracking-[0.25em] mb-0.5">Issue Date</p>
            <p className="text-white text-[9px] font-black tracking-widest">{today}</p>
          </div>
        </div>
      </div>
    </Bezel>
  );
}

// ══════════════════════════════════════════════════════════════
// SCREEN 4.10 — MODULE CERTIFICATE
// ══════════════════════════════════════════════════════════════

export function ModuleCertificate() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [params] = useSearchParams();
  const course = getCourse(id);
  const module = getModule(course, params.get("module"));
  useClaimCertificate(course.id, module.id);

  return (
    <div className="w-full pb-24 relative bg-transparent font-sans text-slate-800">
      <PageHeader title="Certificate" subtitle="Module Completion Award" showBack onBack={() => navigate(`/learning/course/${course.id}`)} />

      <div className="px-4 mt-5 relative z-20 space-y-5">
        <CertificatePlate
          heading="Certificate Of Completion"
          courseTitle={course.title}
          moduleTitle={module.title}
          certNo={certificateNumber(course.id, module.id)}
        />

        <motion.div {...rise(0.3)} className="space-y-3">
          <PrimaryCTA onClick={() => toast.success("Certificate downloading as PDF...")} icon={<Download size={15} />}>
            Download Certificate
          </PrimaryCTA>
          <PrimaryCTA variant="ghost" onClick={() => toast.success("Certificate link copied to clipboard!")} icon={<Share2 size={15} />}>
            Share Certificate
          </PrimaryCTA>
          <PrimaryCTA variant="dark" onClick={() => navigate(`/learning/course/${course.id}`)} icon={<Play size={14} className="fill-current" />}>
            Continue Course
          </PrimaryCTA>
        </motion.div>
      </div>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════
// SCREEN 4.11 — COURSE COMPLETION
// ══════════════════════════════════════════════════════════════

export function CourseCompletion() {
  const navigate = useNavigate();
  const { id } = useParams();
  const course = getCourse(id);
  const progress = useMemo(() => loadProgress(course.id), [course.id]);
  const stats = courseStats(course, progress);
  const minutes = Math.round(
    course.modules.flatMap((m) => m.lessons)
      .filter((l) => progress.completedLessons.includes(l.id))
      .reduce((acc, l) => acc + Number(l.duration.split(":")[0]), 0)
  );

  return (
    <div className="w-full pb-24 relative bg-transparent font-sans text-slate-800">
      <PageHeader title="Course Complete" subtitle={course.title} showBack onBack={() => navigate(`/learning/course/${course.id}`)} />

      <div className="px-4 mt-8 relative z-20 space-y-6">
        {/* Celebration */}
        <motion.div {...rise(0)} className="text-center relative">
          {/* Confetti sparks */}
          {[...Array(10)].map((_, i) => (
            <motion.span
              key={i}
              className="absolute w-1.5 h-1.5 rounded-full"
              style={{
                left: `${12 + i * 8}%`,
                top: "30%",
                background: i % 3 === 0 ? "var(--color-primary)" : i % 3 === 1 ? "#10b981" : "#f59e0b",
              }}
              initial={{ y: 0, opacity: 0, scale: 0 }}
              animate={{ y: [-10, -60 - (i % 4) * 18], x: [(i % 2 ? 1 : -1) * (8 + i * 3)], opacity: [0, 1, 0], scale: [0, 1.2, 0.4] }}
              transition={{ duration: 1.6, delay: 0.3 + i * 0.07, ease: GRACE }}
            />
          ))}
          <SuccessBurst icon={<GraduationCap size={44} className="text-white" />} />
          <motion.h2 {...rise(0.25)} className="font-black text-[var(--app-text-slate)] text-2xl uppercase tracking-tight mt-6">
            Congratulations
          </motion.h2>
          <motion.p {...rise(0.32)} className="text-[9px] font-black uppercase tracking-[0.25em] text-slate-400 mt-1.5 px-8 leading-relaxed">
            You have completed {course.title}
          </motion.p>
        </motion.div>

        {/* Summary */}
        <Bezel delay={0.4} innerClassName="p-2">
          <div className="grid grid-cols-2 divide-x divide-y divide-[var(--border)]">
            <StatCell value={`${stats.lessonsDone}`} label="Lessons Completed" />
            <StatCell value={`${stats.assessmentsDone}`} label="Assessments Passed" />
            <StatCell value={`${minutes}m`} label="Time Invested" />
            <StatCell value={stats.certificates} label="Certificates Earned" />
          </div>
        </Bezel>

        <motion.div {...rise(0.5)}>
          <PrimaryCTA onClick={() => navigate(`/learning/course/${course.id}/final-certificate`)} icon={<Award size={15} />}>
            Claim Final Certificate
          </PrimaryCTA>
        </motion.div>
      </div>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════
// SCREEN 4.12 — FINAL COURSE CERTIFICATE
// ══════════════════════════════════════════════════════════════

export function FinalCertificate() {
  const navigate = useNavigate();
  const { id } = useParams();
  const course = getCourse(id);
  useClaimCertificate(course.id, "final");

  return (
    <div className="w-full pb-24 relative bg-transparent font-sans text-slate-800">
      <PageHeader title="Full Certificate" subtitle="Certified Course Award" showBack onBack={() => navigate(`/learning/course/${course.id}`)} />

      <div className="px-4 mt-5 relative z-20 space-y-5">
        <motion.div {...rise(0)} className="flex items-center justify-center gap-2">
          <BadgeCheck size={14} className="text-[var(--color-primary)]" />
          <span className="text-[8px] font-black uppercase tracking-[0.3em] text-slate-500">Full Course Certificate</span>
        </motion.div>

        <CertificatePlate
          heading="Full Course Certificate"
          courseTitle={course.title}
          certNo={certificateNumber(course.id, "FULL")}
          instructor={course.instructor}
        />

        <motion.div {...rise(0.3)} className="space-y-3">
          <PrimaryCTA onClick={() => toast.success("Certificate downloading as PDF...")} icon={<Download size={15} />}>
            Download
          </PrimaryCTA>
          <PrimaryCTA variant="ghost" onClick={() => toast.success("Certificate link copied to clipboard!")} icon={<Share2 size={15} />}>
            Share
          </PrimaryCTA>
          <PrimaryCTA variant="dark" onClick={() => navigate("/learning/profile")} icon={<UserCircle2 size={15} />}>
            Add To Profile
          </PrimaryCTA>
        </motion.div>
      </div>
    </div>
  );
}
