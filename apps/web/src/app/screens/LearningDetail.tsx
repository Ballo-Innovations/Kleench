import { Link, useParams, useNavigate } from "react-router";
import { motion, AnimatePresence } from "motion/react";
import { ArrowLeft, Play, Verified, Star, CheckCircle2, Send, Shield, Wallet, X } from "lucide-react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { useState } from "react";

const HERO_BG = "https://images.unsplash.com/photo-1575388902449-6bca946ad549?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaW5lbWF0aWMlMjBVWCUyMGRlc2lnbiUyMGludGVyZmFjZSUyMGRpZ2l0YWwlMjB0ZWNobm9sb2d5fGVufDF8fHx8MTc3MzkyMDAwNXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral";
const INSTRUCTOR_AVATAR = "https://images.unsplash.com/photo-1758685734511-4f49ce9a382b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBpbnN0cnVjdG9yJTIwdGVhY2hlciUyMGVkdWNhdG9yJTIwcG9ydHJhaXR8ZW58MXx8fHwxNzczOTIwMDA1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral";

export function LearningDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [showVideoModal, setShowVideoModal] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);

  const handleEnroll = () => {
    // Navigate to wallet with enrollment state
    navigate("/wallet", { state: { enrollCourse: true, courseId: id, coursePrice: 49.99 } });
  };

  return (
    <div className="min-h-screen bg-[var(--surface-base)] pb-32">
      {/* ── Top Navigation ── */}
      <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-xl shadow-sm flex items-center justify-between px-6 py-3">
        <div className="flex items-center gap-4">
          <Link to="/">
            <motion.button
              whileTap={{ scale: 0.9 }}
              className="flex items-center justify-center h-10 w-10 rounded-full hover:bg-black/5 active:scale-95 duration-150 transition-colors"
            >
              <ArrowLeft size={20} className="text-[var(--ink-primary)]" strokeWidth={2.5} />
            </motion.button>
          </Link>
          <span className="font-[var(--font-header)] text-[var(--trust-blue)]" style={{ fontSize: "24px", fontWeight: 900 }}>
            Kleench
          </span>
        </div>
      </nav>

      <main className="pt-16">
        {/* ── Cinematic Hero Section ── */}
        <section className="relative w-full bg-[var(--surface-raised)] overflow-hidden group" style={{ height: "530px" }}>
          {/* Background Image */}
          <ImageWithFallback
            src={HERO_BG}
            alt="Course preview"
            className="absolute inset-0 w-full h-full object-cover transform scale-105 group-hover:scale-100 transition-transform duration-1000"
          />

          {/* Dark gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent z-10" />

          {/* Content */}
          <div className="absolute inset-0 z-20 flex flex-col justify-end p-8">
            {/* Badges */}
            <div className="flex items-center gap-3 mb-4">
              <motion.span
                animate={{ opacity: [1, 0.7, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="bg-[var(--action-gold)] text-[var(--ink-primary)] px-3 py-1 rounded-full font-[var(--font-header)] uppercase tracking-widest flex items-center gap-1.5"
                style={{ fontSize: "10px", fontWeight: 800 }}
              >
                <span className="w-2 h-2 rounded-full bg-white" />
                LIVE PROOF
              </motion.span>
              <span className="bg-white/10 backdrop-blur-md text-white px-3 py-1 rounded-full font-[var(--font-body)]" style={{ fontSize: "11px", fontWeight: 500 }}>
                4K Demo
              </span>
            </div>

            {/* Title */}
            <h1
              className="font-[var(--font-header)] text-white leading-tight max-w-2xl tracking-tight"
              style={{ fontSize: "clamp(28px, 5vw, 40px)", fontWeight: 900 }}
            >
              Digital Masterclass: UX Architecture & Design Systems
            </h1>
          </div>

          {/* Play Button */}
          <motion.button
            whileTap={{ scale: 0.9 }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30 w-20 h-20 bg-[var(--trust-blue)]/90 backdrop-blur-lg rounded-full flex items-center justify-center shadow-2xl hover:bg-[var(--trust-blue)] transition-colors"
            onClick={() => setShowVideoModal(true)}
          >
            <Play size={32} className="text-white ml-1" fill="white" />
          </motion.button>
        </section>

        <div className="max-w-4xl mx-auto px-6 mt-8">
          {/* ── Trust Validation Panel ── */}
          <section className="flex flex-wrap items-center justify-between gap-6 p-6 bg-[var(--surface-raised)] rounded-3xl shadow-sm border border-black/[0.04]">
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-white shadow-sm">
                  <ImageWithFallback
                    src={INSTRUCTOR_AVATAR}
                    alt="Instructor avatar"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute -bottom-1 -right-1 bg-[var(--trust-blue)] text-white rounded-full p-1 border-2 border-white shadow-sm">
                  <Verified size={12} fill="white" />
                </div>
              </div>
              <div>
                <p className="font-[var(--font-header)] text-[var(--ink-primary)]" style={{ fontSize: "18px", fontWeight: 800 }}>
                  EliteNodes Alpha
                </p>
                <div className="flex items-center gap-2 mt-1">
                  <span
                    className="bg-[var(--trust-blue)]/10 text-[var(--trust-blue)] px-2 py-0.5 rounded uppercase tracking-tighter border border-[var(--trust-blue)]/20 font-[var(--font-body)]"
                    style={{ fontSize: "10px", fontWeight: 700 }}
                  >
                    Verified KYC
                  </span>
                  <div className="flex items-center gap-1 text-[var(--action-gold)]">
                    <Star size={14} fill="var(--action-gold)" className="text-[var(--action-gold)]" />
                    <span className="font-[var(--font-body)]" style={{ fontSize: "14px", fontWeight: 700 }}>
                      4.9
                    </span>
                    <span className="text-[var(--ink-muted)] font-[var(--font-body)] ml-1" style={{ fontSize: "12px" }}>
                      (1.2k students)
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="text-right">
              <p
                className="text-[var(--ink-muted)] font-[var(--font-body)] uppercase tracking-widest mb-1"
                style={{ fontSize: "11px", fontWeight: 500 }}
              >
                Course Price
              </p>
              <div className="flex items-baseline gap-1">
                <span className="font-[var(--font-header)] text-[var(--ink-primary)]" style={{ fontSize: "32px", fontWeight: 900 }}>
                  49.99
                </span>
                <span className="font-[var(--font-header)] text-[var(--trust-blue)]" style={{ fontSize: "16px", fontWeight: 800 }}>
                  USD
                </span>
              </div>
            </div>
          </section>

          {/* ── Information Layer: Course Details ── */}
          <section className="mt-12 space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Main Content (2/3) */}
              <div className="md:col-span-2 space-y-6">
                <h2 className="font-[var(--font-header)] text-[var(--ink-primary)]" style={{ fontSize: "24px", fontWeight: 800 }}>
                  Master the Digital Economy
                </h2>
                <div className="space-y-4 text-[var(--ink-secondary)] leading-relaxed">
                  <p className="font-[var(--font-body)]" style={{ fontSize: "16px" }}>
                    This comprehensive masterclass leverages high-impact learning patterns specifically designed for modern UX practitioners. By integrating hands-on exercises directly into each module, you ensure that every concept is backed by practical application and real-world case studies.
                  </p>
                  <p className="font-[var(--font-body)]" style={{ fontSize: "15px" }}>
                    Our curriculum bypasses traditional theory-heavy approaches, offering a seamless learning experience for both aspiring designers and seasoned professionals. Optimized for practical outcomes and portfolio-ready deliverables.
                  </p>
                </div>

                {/* Bento Grid Stats */}
                <div className="grid grid-cols-2 gap-4 pt-4">
                  <div className="bg-[var(--surface-raised)] p-5 rounded-2xl border border-black/[0.04] shadow-sm">
                    <div className="w-10 h-10 rounded-full bg-[var(--trust-blue)]/10 flex items-center justify-center mb-3">
                      <span className="text-[var(--trust-blue)]">⚡</span>
                    </div>
                    <p className="text-[var(--ink-muted)] font-[var(--font-body)] uppercase tracking-wide" style={{ fontSize: "11px", fontWeight: 500 }}>
                      Course Duration
                    </p>
                    <p className="font-[var(--font-header)] text-[var(--ink-primary)] mt-1" style={{ fontSize: "20px", fontWeight: 800 }}>
                      8 Weeks
                    </p>
                  </div>
                  <div className="bg-[var(--surface-raised)] p-5 rounded-2xl border border-black/[0.04] shadow-sm">
                    <div className="w-10 h-10 rounded-full bg-[var(--action-gold)]/10 flex items-center justify-center mb-3">
                      <Shield size={18} className="text-[var(--action-gold)]" />
                    </div>
                    <p className="text-[var(--ink-muted)] font-[var(--font-body)] uppercase tracking-wide" style={{ fontSize: "11px", fontWeight: 500 }}>
                      Certification
                    </p>
                    <p className="font-[var(--font-header)] text-[var(--ink-primary)] mt-1" style={{ fontSize: "20px", fontWeight: 800 }}>
                      Verified Badge
                    </p>
                  </div>
                </div>
              </div>

              {/* Sidebar (1/3) */}
              <div className="space-y-6">
                <div className="bg-[var(--surface-raised)] p-6 rounded-2xl space-y-4 border border-black/[0.04] shadow-sm">
                  <h3 className="font-[var(--font-header)] text-[var(--ink-primary)]" style={{ fontSize: "16px", fontWeight: 800 }}>
                    What You'll Learn
                  </h3>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <CheckCircle2 size={16} className="text-[var(--trust-blue)] mt-0.5 flex-shrink-0" />
                      <span className="font-[var(--font-body)] text-[var(--ink-secondary)]" style={{ fontSize: "14px", fontWeight: 500 }}>
                        Advanced Component Architecture
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 size={16} className="text-[var(--trust-blue)] mt-0.5 flex-shrink-0" />
                      <span className="font-[var(--font-body)] text-[var(--ink-secondary)]" style={{ fontSize: "14px", fontWeight: 500 }}>
                        Scalable Design Systems
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 size={16} className="text-[var(--trust-blue)] mt-0.5 flex-shrink-0" />
                      <span className="font-[var(--font-body)] text-[var(--ink-secondary)]" style={{ fontSize: "14px", fontWeight: 500 }}>
                        Portfolio-Ready Projects
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 size={16} className="text-[var(--trust-blue)] mt-0.5 flex-shrink-0" />
                      <span className="font-[var(--font-body)] text-[var(--ink-secondary)]" style={{ fontSize: "14px", fontWeight: 500 }}>
                        Live Q&A Sessions
                      </span>
                    </li>
                  </ul>
                </div>

                {/* Share & Earn Button */}
                <motion.button
                  whileTap={{ scale: 0.96 }}
                  className="w-full bg-[var(--action-gold)] hover:bg-[var(--action-gold-dark)] transition-all duration-300 py-4 px-6 rounded-2xl flex items-center justify-between group shadow-sm"
                  onClick={() => setShowShareModal(true)}
                >
                  <div className="text-left">
                    <p
                      className="text-[var(--ink-primary)] font-[var(--font-body)] uppercase tracking-widest"
                      style={{ fontSize: "10px", fontWeight: 700 }}
                    >
                      Growth Loop
                    </p>
                    <p className="text-[var(--ink-primary)] font-[var(--font-header)]" style={{ fontSize: "16px", fontWeight: 800 }}>
                      Share & Earn 5%
                    </p>
                  </div>
                  <Send size={18} className="text-[var(--ink-primary)] group-hover:translate-x-1 transition-transform" />
                </motion.button>
              </div>
            </div>
          </section>

          {/* ── Performance History ── */}
          <section className="mt-16 pt-16 border-t border-black/[0.06]">
            <h3 className="font-[var(--font-header)] text-[var(--ink-primary)] mb-8" style={{ fontSize: "20px", fontWeight: 800 }}>
              Student Success Stories
            </h3>
            <div className="overflow-x-auto" style={{ scrollbarWidth: "none" }}>
              <div className="flex gap-6 min-w-max pb-4">
                {/* Card 1 */}
                <div className="w-72 bg-white p-6 rounded-2xl border border-black/[0.04] shadow-sm">
                  <p className="text-[var(--ink-muted)] font-[var(--font-body)] uppercase mb-2" style={{ fontSize: "11px", fontWeight: 700 }}>
                    Career Growth
                  </p>
                  <p className="font-[var(--font-header)] text-[var(--trust-blue)] mb-4" style={{ fontSize: "32px", fontWeight: 900 }}>
                    +87%
                  </p>
                  <div className="h-12 w-full bg-[var(--trust-blue)]/5 rounded-lg flex items-end gap-1 px-2 pb-1">
                    <div className="w-full bg-[var(--trust-blue)] rounded-t-sm opacity-40" style={{ height: "30%" }} />
                    <div className="w-full bg-[var(--trust-blue)] rounded-t-sm opacity-50" style={{ height: "45%" }} />
                    <div className="w-full bg-[var(--trust-blue)] rounded-t-sm opacity-60" style={{ height: "60%" }} />
                    <div className="w-full bg-[var(--trust-blue)] rounded-t-sm opacity-70" style={{ height: "55%" }} />
                    <div className="w-full bg-[var(--trust-blue)] rounded-t-sm opacity-100" style={{ height: "85%" }} />
                  </div>
                </div>

                {/* Card 2 */}
                <div className="w-72 bg-white p-6 rounded-2xl border border-black/[0.04] shadow-sm">
                  <p className="text-[var(--ink-muted)] font-[var(--font-body)] uppercase mb-2" style={{ fontSize: "11px", fontWeight: 700 }}>
                    Active Students
                  </p>
                  <p className="font-[var(--font-header)] text-[var(--ink-primary)] mb-4" style={{ fontSize: "32px", fontWeight: 900 }}>
                    2,847
                  </p>
                  <p className="font-[var(--font-body)] text-[var(--ink-secondary)] leading-tight" style={{ fontSize: "14px" }}>
                    Total enrolled students actively completing modules and earning certifications this month.
                  </p>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>

      {/* ── Sticky Checkout Bar ── */}
      <div className="fixed bottom-0 left-0 w-full z-50 px-6 pb-24 pointer-events-none">
        <div className="max-w-4xl mx-auto w-full bg-white/90 backdrop-blur-2xl p-4 sm:p-6 rounded-3xl shadow-[0_-8px_32px_rgba(0,0,0,0.12)] border border-black/[0.06] pointer-events-auto">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="hidden sm:block">
              <div className="flex items-center gap-2">
                <Shield size={16} className="text-[var(--trust-blue)]" fill="var(--trust-blue)" />
                <p className="font-[var(--font-body)] text-[var(--ink-muted)] uppercase tracking-wider" style={{ fontSize: "10px", fontWeight: 700 }}>
                  Protected by Kleench Escrow
                </p>
              </div>
              <p className="font-[var(--font-body)] text-[var(--ink-muted)] mt-0.5" style={{ fontSize: "10px" }}>
                Funds are held securely until course access is confirmed.
              </p>
            </div>
            <motion.button
              whileTap={{ scale: 0.96 }}
              className="w-full sm:w-auto px-8 py-4 bg-[var(--action-gold)] hover:bg-[var(--action-gold-dark)] text-[var(--ink-primary)] font-[var(--font-header)] rounded-2xl transition-all flex items-center justify-center gap-3 shadow-sm"
              style={{ fontSize: "16px", fontWeight: 800 }}
              onClick={handleEnroll}
            >
              Enroll with Wallet
              <Wallet size={18} />
            </motion.button>
          </div>
        </div>
      </div>

      {/* ── Video Modal ── */}
      <AnimatePresence>
        {showVideoModal && (
          <div className="fixed top-0 left-0 w-full h-full bg-black/70 z-50 flex items-center justify-center pointer-events-auto">
            <div className="relative w-11/12 max-w-4xl h-3/4 bg-white rounded-3xl shadow-2xl pointer-events-auto">
              <button
                className="absolute top-4 right-4 w-8 h-8 bg-black/50 rounded-full flex items-center justify-center hover:bg-black/70 transition-colors"
                onClick={() => setShowVideoModal(false)}
              >
                <X size={16} className="text-white" />
              </button>
              <iframe
                className="w-full h-full rounded-3xl"
                src="https://www.youtube.com/embed/dQw4w9WgXcQ"
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        )}
      </AnimatePresence>

      {/* ── Share Modal ── */}
      <AnimatePresence>
        {showShareModal && (
          <div className="fixed top-0 left-0 w-full h-full bg-black/70 z-50 flex items-center justify-center pointer-events-auto">
            <div className="relative w-11/12 max-w-4xl h-3/4 bg-white rounded-3xl shadow-2xl pointer-events-auto">
              <button
                className="absolute top-4 right-4 w-8 h-8 bg-black/50 rounded-full flex items-center justify-center hover:bg-black/70 transition-colors"
                onClick={() => setShowShareModal(false)}
              >
                <X size={16} className="text-white" />
              </button>
              <div className="p-8">
                <h2 className="font-[var(--font-header)] text-[var(--ink-primary)]" style={{ fontSize: "24px", fontWeight: 800 }}>
                  Share & Earn
                </h2>
                <p className="font-[var(--font-body)] text-[var(--ink-secondary)] leading-relaxed mt-4">
                  Share this course with your network and earn 5% of the enrollment fees. Simply copy the link below and share it on your social media platforms.
                </p>
                <div className="mt-6">
                  <input
                    type="text"
                    value="https://example.com/course/123"
                    className="w-full px-4 py-3 bg-[var(--surface-raised)] border border-black/[0.04] rounded-2xl focus:outline-none focus:border-[var(--action-gold)]"
                    readOnly
                  />
                  <button
                    className="w-full mt-4 px-4 py-3 bg-[var(--action-gold)] hover:bg-[var(--action-gold-dark)] text-[var(--ink-primary)] font-[var(--font-header)] rounded-2xl transition-all flex items-center justify-center gap-3 shadow-sm"
                    onClick={() => setShowShareModal(false)}
                  >
                    Copy Link
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}