 import { useState } from "react";
import { Play, Clock, Star, BookOpen, Eye, ChevronRight, ArrowRight, Radio } from "lucide-react";
import { motion } from "motion/react";
import { Link } from "react-router";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";

/* ─── Images ─── */
const REEL_1 = "https://images.unsplash.com/photo-1696013910376-c56f76dd8178?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjeWJlcnNlY3VyaXR5JTIwZGlnaXRhbCUyMHNoaWVsZCUyMGxvY2slMjBjb25jZXB0fGVufDF8fHx8MTc3MzkwOTY1NHww&ixlib=rb-4.1.0&q=80&w=400";
const REEL_2 = "https://images.unsplash.com/photo-1745509267945-b25cbb4d50ef?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjcnlwdG8lMjBjaGFydCUyMG1vYmlsZSUyMHRyYWRpbmclMjBmaW5hbmNlfGVufDF8fHx8MTc3MzkwOTY1NXww&ixlib=rb-4.1.0&q=80&w=400";
const REEL_3 = "https://images.unsplash.com/photo-1768141721979-25c398ebefd5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkaWdpdGFsJTIwYXJ0JTIwTkZUJTIwbmVvbiUyMGFic3RyYWN0fGVufDF8fHx8MTc3MzkwOTY1NXww&ixlib=rb-4.1.0&q=80&w=400";
const COURSE_1 = "https://images.unsplash.com/photo-1769596722541-40dedee6789d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzb2NpYWwlMjBtZWRpYSUyMG1hcmtldGluZyUyMHN0cmF0ZWd5JTIwYnVzaW5lc3N8ZW58MXx8fHwxNzczOTA5NjU1fDA&ixlib=rb-4.1.0&q=80&w=400";
const COURSE_2 = "https://images.unsplash.com/photo-1762163516269-3c143e04175c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzZXJ2ZXIlMjBuZXR3b3JrJTIwaW5mcmFzdHJ1Y3R1cmUlMjB0ZWNobm9sb2d5fGVufDF8fHx8MTc3MzkwOTY1Nnww&ixlib=rb-4.1.0&q=80&w=400";
const COURSE_3 = "https://images.unsplash.com/photo-1768987439370-bd60d3d0b28b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlY29tbWVyY2UlMjBwaG9uZSUyMGFwcCUyMHNob3BwaW5nJTIwb25saW5lfGVufDF8fHx8MTc3MzkwOTY1Nnww&ixlib=rb-4.1.0&q=80&w=400";

/* ─── Data ─── */
const CATEGORIES = ["All Subjects", "Blockchain", "Digital Marketing", "NFTs", "Security", "E-commerce"];

const REELS = [
  { id: 1, title: "Wallet Security Tips",       views: "12.4K", img: REEL_1 },
  { id: 2, title: "Market Psychology 101",      views: "8.1K",  img: REEL_2 },
  { id: 3, title: "Why Mint on Kleench?",       views: "15.2K", img: REEL_3 },
];

interface Course {
  id: number;
  tag: string;
  tagColor: string;
  tagBg: string;
  title: string;
  instructor: string;
  duration: string;
  rating: number;
  cta: string;
  img: string;
}

const COURSES: Course[] = [
  {
    id: 1,
    tag: "MARKETING",
    tagColor: "text-[var(--trust-blue)]",
    tagBg: "bg-[var(--trust-blue)]/10",
    title: "Social Growth Strategies for Web3 Founders",
    instructor: "Dr. Elias Thorne",
    duration: "12h 45m",
    rating: 4.9,
    cta: "Join Now",
    img: COURSE_1,
  },
  {
    id: 2,
    tag: "SECURITY",
    tagColor: "text-sky-700",
    tagBg: "bg-sky-100",
    title: "The Vault: Advanced Smart Contract Auditing",
    instructor: "Sarah Chen",
    duration: "24h total",
    rating: 5.0,
    cta: "Enroll",
    img: COURSE_2,
  },
  {
    id: 3,
    tag: "ECOMMERCE",
    tagColor: "text-[var(--action-gold-dark)]",
    tagBg: "bg-[var(--action-gold)]/15",
    title: "Scaling Your Boutique Store with Kleench API",
    instructor: "Marcus Vane",
    duration: "8h 20m",
    rating: 4.7,
    cta: "Join Now",
    img: COURSE_3,
  },
];

const fadeUp = {
  initial: { opacity: 0, y: 18 },
  animate: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.09, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
  }),
};

import { PageHeader } from "../components/PageHeader";

export function Learning() {
  const [activeCategory, setActiveCategory] = useState(0);

  return (
    <div className="w-full max-w-md mx-auto pb-4">
      {/* ── Standardized Orange Header ── */}
      <PageHeader title="Academy" subtitle="Continue your journey and earn more." />

      {/* ── Continue Learning Hero Card (Moved below standardized header) ── */}
      <motion.section
        custom={0}
        variants={fadeUp}
        initial="initial"
        animate="animate"
        className="mb-8 px-4"
      >
        <div className="relative overflow-hidden rounded-[32px] bg-[#003366] p-6 shadow-xl border border-black/[0.03]">
          {/* Background blobs */}
          <div className="absolute -right-10 -top-10 w-40 h-40 bg-white/5 rounded-full blur-2xl" />
          <div className="absolute inset-0 noise opacity-20" />

          <div className="relative z-10 flex flex-col gap-4">
            <div className="flex items-start justify-between">
              <span className="px-3 py-1 bg-[#FF8C00] text-white text-[10px] rounded-full uppercase tracking-wider font-black">
                In Progress
              </span>
              <div className="w-10 h-10 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/10">
                <BookOpen size={18} className="text-white" strokeWidth={2.5} />
              </div>
            </div>

            <div className="space-y-1">
              <p className="text-white/50 text-[11px] font-bold uppercase tracking-wider">Continue Learning</p>
              <h2 className="text-white text-2xl font-black leading-tight" style={{ fontFamily: "system-ui, -apple-system, sans-serif" }}>
                Mastering Crypto Basics
              </h2>
            </div>

            <div className="space-y-2">
              <div className="flex items-end justify-between">
                <span className="text-white text-[11px] font-bold">65% Complete</span>
                <span className="text-white/40 text-[10px] font-medium">Module 4 of 7</span>
              </div>
              <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-[#FF8C00] rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: "65%" }}
                  transition={{ duration: 1.2, delay: 0.4 }}
                />
              </div>
            </div>

            <Link to="/learning/1">
              <motion.button
                whileTap={{ scale: 0.97 }}
                className="mt-2 flex items-center justify-center gap-2 w-full py-4 bg-white text-[#003366] rounded-2xl shadow-lg font-black text-[13px] transition-all hover:shadow-xl active:scale-95"
              >
                Resume Course
                <ArrowRight size={16} strokeWidth={3} />
              </motion.button>
            </Link>
          </div>
        </div>
      </motion.section>
      {/* ── Category Picker ── */}
      <motion.section
        custom={1}
        variants={fadeUp}
        initial="initial"
        animate="animate"
        className="mb-5"
      >
        <div
          className="flex gap-2 overflow-x-auto -mx-1 px-1"
          style={{ scrollbarWidth: "none" }}
        >
          {CATEGORIES.map((cat, i) => (
            <motion.button
              key={cat}
              whileTap={{ scale: 0.94 }}
              onClick={() => setActiveCategory(i)}
              className={`px-3 py-2 rounded-xl font-[var(--font-body)] whitespace-nowrap transition-colors shadow-sm ${
                activeCategory === i
                  ? "bg-[var(--trust-blue)] text-white shadow-sm"
                  : "bg-[#f3f3f3] text-[var(--ink-secondary)]"
              }`}
              style={{ fontSize: "11px", fontWeight: 600, flexShrink: 0 }}
            >
              {cat}
            </motion.button>
          ))}
        </div>
      </motion.section>

      {/* ── Trending Reels ── */}
      <motion.section
        custom={2}
        variants={fadeUp}
        initial="initial"
        animate="animate"
        className="mb-5"
      >
        <div className="flex items-end justify-between mb-3">
          <h3
            className="font-[var(--font-header)] text-[var(--ink-primary)] tracking-tight"
            style={{ fontSize: "16px", fontWeight: 800 }}
          >
            Trending Reels
          </h3>
          <Link
            to="/videos"
            className="font-[var(--font-body)] text-[var(--trust-blue)]"
            style={{ fontSize: "11px", fontWeight: 700 }}
          >
            View all
          </Link>
        </div>

        <div
          className="flex gap-3 overflow-x-auto -mx-1 px-1"
          style={{ scrollbarWidth: "none" }}
        >
          {REELS.map((reel, i) => (
            <motion.div
              key={reel.id}
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.2 + 0.08 * i }}
              className="relative flex-none rounded-2xl overflow-hidden shadow-sm group cursor-pointer"
              style={{ width: 140, aspectRatio: "9/16" }}
            >
              <ImageWithFallback
                src={reel.img}
                alt={reel.title}
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />

              {/* Play overlay */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="w-10 h-10 rounded-full bg-white/30 backdrop-blur-sm flex items-center justify-center">
                  <Play size={16} fill="white" className="text-white ml-0.5" />
                </div>
              </div>

              {/* Bottom meta */}
              <div className="absolute bottom-3 left-3 right-3">
                <div className="flex items-center gap-1 mb-0.5">
                  <Eye size={9} className="text-white/80" strokeWidth={2} />
                  <span
                    className="font-[var(--font-body)] text-white/90"
                    style={{ fontSize: "9px", fontWeight: 700 }}
                  >
                    {reel.views}
                  </span>
                </div>
                <p
                  className="font-[var(--font-body)] text-white leading-snug line-clamp-2"
                  style={{ fontSize: "10px", fontWeight: 600 }}
                >
                  {reel.title}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* ── Skill Hub ── */}
      <motion.section
        custom={3}
        variants={fadeUp}
        initial="initial"
        animate="animate"
      >
        <div className="flex items-end justify-between mb-3">
          <h3
            className="font-[var(--font-header)] text-[var(--ink-primary)] tracking-tight"
            style={{ fontSize: "16px", fontWeight: 800 }}
          >
            Skill Hub
          </h3>
          <ChevronRight size={18} className="text-[var(--ink-muted)]" strokeWidth={2} />
        </div>

        <div className="flex flex-col gap-3">
          {COURSES.map((course, i) => (
            <motion.div
              key={course.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.3 + 0.1 * i }}
            >
              <Link to={`/learning/${course.id}`} className="block">
                <div className="bg-white rounded-xl overflow-hidden flex shadow-sm border border-black/[0.04]">
                  {/* Thumbnail */}
                  <div className="w-28 flex-none relative overflow-hidden">
                    <ImageWithFallback
                      src={course.img}
                      alt={course.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-[var(--trust-blue)]/10" />
                  </div>

                  {/* Info */}
                  <div className="p-3 flex flex-col justify-between flex-grow min-w-0">
                    <div>
                      <div className="flex items-start justify-between gap-2 mb-1.5">
                        <span
                          className={`px-1.5 py-0.5 rounded-full font-[var(--font-body)] ${course.tagBg} ${course.tagColor}`}
                          style={{ fontSize: "8px", fontWeight: 700 }}
                        >
                          {course.tag}
                        </span>
                        <div className="flex items-center gap-0.5 shrink-0">
                          <Star
                            size={10}
                            fill="var(--action-gold)"
                            className="text-[var(--action-gold)]"
                            strokeWidth={0}
                          />
                          <span
                            className="font-[var(--font-body)] text-[var(--ink-primary)]"
                            style={{ fontSize: "10px", fontWeight: 700 }}
                          >
                            {course.rating}
                          </span>
                        </div>
                      </div>

                      <h4
                        className="font-[var(--font-body)] text-[var(--ink-primary)] leading-snug line-clamp-2"
                        style={{ fontSize: "12px", fontWeight: 700 }}
                      >
                        {course.title}
                      </h4>
                      <p
                        className="font-[var(--font-body)] text-[var(--ink-muted)] mt-0.5"
                        style={{ fontSize: "9px" }}
                      >
                        Instructor: {course.instructor}
                      </p>
                    </div>

                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center gap-1 text-[var(--ink-muted)]">
                        <Clock size={10} strokeWidth={2} />
                        <span
                          className="font-[var(--font-body)]"
                          style={{ fontSize: "9px", fontWeight: 500 }}
                        >
                          {course.duration}
                        </span>
                      </div>
                      <span
                        className="font-[var(--font-body)] text-[var(--trust-blue)]"
                        style={{ fontSize: "11px", fontWeight: 700 }}
                      >
                        {course.cta} →
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* ── Live Classes CTA ── */}
      <motion.div
        className="relative mt-5 mb-4 overflow-hidden rounded-2xl p-5 shadow-md"
        style={{ background: "linear-gradient(135deg, #0077B6 0%, #005F8C 100%)" }}
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.2 }}
      >
        <div className="absolute top-3 right-3 w-10 h-10 rounded-full bg-[var(--action-gold)] flex items-center justify-center">
          <Radio size={18} className="text-white" strokeWidth={2.5} />
        </div>
        <div className="relative z-10">
          <h3 className="text-lg font-[var(--font-header)] font-bold text-white mb-1.5">
            Live Classes
          </h3>
          <p className="text-xs font-[var(--font-body)] text-white/80">
            Join our live classes to learn from experts in real-time.
          </p>
          <Link to="/learning" className="mt-2 block">
            <motion.button
              whileTap={{ scale: 0.97 }}
              className="w-full py-2.5 bg-[var(--action-gold)] text-[var(--ink-primary)] rounded-xl shadow-md font-[var(--font-header)]"
              style={{ fontSize: "12px", fontWeight: 700 }}
            >
              Join Live Classes
              <ArrowRight size={14} strokeWidth={2.5} />
            </motion.button>
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
