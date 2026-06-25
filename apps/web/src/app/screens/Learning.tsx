import {
  Circle,
  X,
  MessageCircle,
  MoreVertical,
  Bookmark,
  ChevronRight,
} from "lucide-react";
import { COURSES } from "./learning/courseData";
import {
  DuotoneSearch as Search,
  DuotonePlus as Plus,
  DuotonePlay as Play,
  DuotoneClock as Clock,
  DuotoneGradCap as GradCap,
  DuotoneBadgeCheck as BadgeCheck,
  DuotoneCheck as Check,
  DuotoneFileText as FileText,
  DuotoneHeadphones as Headphones,
  DuotoneVolume as Waveform,
  DuotoneRadio as Mic,
  DuotoneTrendingUp as TrendingUp,
  DuotoneStar as Star,
  DuotoneBarChart as BarChart,
  DuotoneBadgeCheck as Certificate,
} from "../components/DuotoneIcon";
import { motion, AnimatePresence } from "motion/react";
import { useState } from "react";
import { useNavigate } from "react-router";
import { PageHeader } from "../components/PageHeader";
import { usePageLoading, PageSkeletons } from "../components/PageSkeletons";

// Learning assets
import learnWoman from "@/assets/learning/learn_woman_1775596426630.png";
import learnBook from "@/assets/learning/learn_book_1775596454115.png";
import learnChart from "@/assets/learning/learn_chart_1775596868170.png";
import learnMountain from "@/assets/learning/learn_mountain_1775596850615.png";
import learnPresenter from "@/assets/learning/learn_presenter_1775596479989.png";

// ─── Data ────────────────────────────────────────────────────────────────────

const STATS = [
  { label: "My Courses", value: "12", sub: "In Progress", icon: GradCap, tint: "#6366F1" },
  { label: "Certificates", value: "7", sub: "Earned", icon: BadgeCheck, tint: "var(--color-primary)" },
  { label: "Exams Passed", value: "24", sub: "This Year", icon: Check, tint: "#16A34A" },
  { label: "Watch · Listen · Read", value: "48h", sub: "Total Time", icon: Clock, tint: "#E54D2E" },
];

const VIDEO_LESSONS = [
  { id: "v1", title: "Business Planning Fundamentals", author: "John Banda", level: "Intermediate", duration: "21:30", image: learnPresenter },
  { id: "v2", title: "Digital Marketing Strategy", author: "Sarah Phiri", level: "Intermediate", duration: "15:30", image: learnWoman },
  { id: "v3", title: "Financial Management Basics", author: "James Mwansa", level: "Beginner", duration: "21:10", image: learnChart },
  { id: "v4", title: "Personal Development Mastery", author: "Linda Chileshe", level: "All Levels", duration: "12:20", image: learnMountain },
];

const AUDIO_LESSONS = [
  { id: "a1", title: "Entrepreneurship Mindset", author: "John Banda", level: "Intermediate", duration: "16:45", icon: Waveform, from: "#FF7A1A", to: "#F25C05" },
  { id: "a2", title: "Leadership Essentials", author: "Sarah Phiri", level: "Intermediate", duration: "14:20", icon: Mic, from: "#7C5CFF", to: "#5B3FD6" },
  { id: "a3", title: "Money Management Tips", author: "James Mwansa", level: "Beginner", duration: "19:30", icon: Headphones, from: "#15A65B", to: "#00855A" },
  { id: "a4", title: "Productivity Hacks", author: "Linda Chileshe", level: "All Levels", duration: "13:15", icon: Waveform, from: "#2A7CF0", to: "#1E50C9" },
];

const TEXT_LESSONS = [
  { id: "t1", title: "Introduction to Business Law", author: "John Banda", level: "Beginner", read: "10 min read" },
  { id: "t2", title: "Understanding Market Analysis", author: "Sarah Phiri", level: "Intermediate", read: "12 min read" },
  { id: "t3", title: "Communication Skills Guide", author: "James Mwansa", level: "Beginner", read: "8 min read" },
  { id: "t4", title: "Innovation and Creativity", author: "Linda Chileshe", level: "All Levels", read: "15 min read" },
];

const FEATURES = [
  { title: "Learn & Earn", desc: "Learn more, earn rewards", icon: TrendingUp, tint: "var(--color-primary)", to: "/learning/viewer?mode=learn-earn" },
  { title: "Daily Goals", desc: "Stay consistent, earn badges", icon: Star, tint: "#6366F1", to: "/learning/profile" },
  { title: "Your Progress", desc: "Track your learning journey", icon: BarChart, tint: "#16A34A", to: "/learning/profile" },
  { title: "Certificates", desc: "Showcase your achievements", icon: Certificate, tint: "#E54D2E", to: "/learning/profile" },
];

// ─── Sub-components ───────────────────────────────────────────────────────────

function SectionHeader({
  title,
  subtitle,
  onSeeAll,
}: {
  title: string;
  subtitle?: string;
  onSeeAll?: () => void;
}) {
  return (
    <div className="flex justify-between items-end mb-3 px-1">
      <div className="min-w-0">
        <div className="flex items-center gap-2">
          <span className="w-[3px] h-3.5 rounded-full bg-[var(--color-primary)] shrink-0" />
          <h3 className="text-[11px] font-black text-slate-700 uppercase tracking-[0.18em] leading-none truncate">
            {title}
          </h3>
        </div>
        {subtitle && (
          <p className="text-[9px] font-bold text-slate-400 tracking-wide mt-1.5 pl-[11px] leading-none">
            {subtitle}
          </p>
        )}
      </div>
      {onSeeAll && (
        <button
          onClick={onSeeAll}
          className="flex items-center gap-0.5 text-[var(--color-primary)] font-black text-[9px] uppercase tracking-widest active:opacity-60 transition-opacity shrink-0"
        >
          See All
          <ChevronRight size={11} />
        </button>
      )}
    </div>
  );
}

function StatCard({ stat, onClick }: { stat: typeof STATS[0]; onClick: () => void }) {
  const Icon = stat.icon;
  return (
    <motion.button
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className="bg-[var(--app-bg)] rounded-2xl border border-[var(--border)] shadow-sm p-2.5 flex flex-col items-start text-left min-w-0"
    >
      <div
        className="w-7 h-7 rounded-lg flex items-center justify-center mb-2"
        style={{ backgroundColor: `color-mix(in srgb, ${stat.tint} 14%, transparent)` }}
      >
        <Icon size={14} primary={stat.tint} />
      </div>
      <span className="text-[16px] font-black text-slate-800 leading-none">{stat.value}</span>
      <span className="text-[7px] font-black uppercase tracking-[0.1em] text-slate-500 mt-1.5 leading-tight">
        {stat.label}
      </span>
      <span className="text-[6.5px] font-bold uppercase tracking-widest text-slate-400 mt-0.5 leading-tight">
        {stat.sub}
      </span>
    </motion.button>
  );
}

function VideoCard({
  item,
  onPlay,
  onOptions,
}: {
  item: typeof VIDEO_LESSONS[0];
  onPlay: () => void;
  onOptions: () => void;
}) {
  return (
    <motion.div
      whileTap={{ scale: 0.97 }}
      onClick={onPlay}
      className="flex-shrink-0 w-[156px] cursor-pointer"
    >
      <div className="relative w-full aspect-[16/10] rounded-2xl overflow-hidden bg-slate-200 border border-[var(--border)] shadow-sm">
        <img src={item.image} alt={item.title} className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/20 backdrop-blur-sm border border-white/40 flex items-center justify-center shadow-lg">
          <Play primary="#fff" size={13} />
        </div>
        <div className="absolute bottom-1.5 right-1.5 bg-black/70 backdrop-blur-sm text-white text-[8px] font-black px-1.5 py-0.5 rounded-md flex items-center gap-1">
          <Clock size={8} primary="#fff" />
          {item.duration}
        </div>
      </div>
      <div className="flex items-start justify-between gap-1 mt-2 px-0.5">
        <div className="min-w-0">
          <p className="text-[11px] font-black text-slate-800 leading-tight line-clamp-2">{item.title}</p>
          <p className="text-[9px] font-bold text-slate-400 mt-1 truncate">{item.author}</p>
          <p className="text-[8px] font-black uppercase tracking-widest text-[var(--color-primary)]/70 mt-0.5">{item.level}</p>
        </div>
        <button
          onClick={(e) => { e.stopPropagation(); onOptions(); }}
          className="text-slate-400 active:scale-90 transition-transform shrink-0 -mr-0.5"
        >
          <MoreVertical size={13} />
        </button>
      </div>
    </motion.div>
  );
}

function AudioCard({ item, onPlay }: { item: typeof AUDIO_LESSONS[0]; onPlay: () => void }) {
  const Icon = item.icon;
  return (
    <motion.div
      whileTap={{ scale: 0.97 }}
      onClick={onPlay}
      className="flex-shrink-0 w-[150px] cursor-pointer"
    >
      <div
        className="relative w-full h-[96px] rounded-2xl overflow-hidden flex items-center justify-center shadow-sm"
        style={{ backgroundImage: `linear-gradient(135deg, ${item.from} 0%, ${item.to} 100%)` }}
      >
        <div className="absolute inset-0 opacity-25" style={{ backgroundImage: "radial-gradient(circle at 80% 20%, white, transparent 60%)" }} />
        <div className="w-11 h-11 rounded-full bg-white/20 backdrop-blur-sm border border-white/40 flex items-center justify-center">
          <Icon size={20} primary="#fff" />
        </div>
        <div className="absolute bottom-1.5 right-1.5 bg-black/30 backdrop-blur-sm text-white text-[8px] font-black px-1.5 py-0.5 rounded-md flex items-center gap-1">
          <Clock size={8} primary="#fff" />
          {item.duration}
        </div>
      </div>
      <div className="mt-2 px-0.5">
        <p className="text-[11px] font-black text-slate-800 leading-tight line-clamp-2">{item.title}</p>
        <p className="text-[9px] font-bold text-slate-400 mt-1 truncate">{item.author}</p>
        <p className="text-[8px] font-black uppercase tracking-widest text-[var(--color-primary)]/70 mt-0.5">{item.level}</p>
      </div>
    </motion.div>
  );
}

function TextCard({ item, onRead }: { item: typeof TEXT_LESSONS[0]; onRead: () => void }) {
  return (
    <motion.div
      whileTap={{ scale: 0.97 }}
      onClick={onRead}
      className="flex-shrink-0 w-[150px] bg-[var(--app-bg)] rounded-2xl border border-[var(--border)] shadow-sm p-3.5 cursor-pointer flex flex-col"
    >
      <div className="flex items-center justify-between mb-3">
        <div className="w-9 h-9 rounded-xl bg-[var(--color-primary)]/10 flex items-center justify-center">
          <FileText size={16} primary="var(--color-primary)" />
        </div>
        <span className="text-[7px] font-black uppercase tracking-widest text-slate-400 bg-[var(--app-bg-muted)] border border-[var(--border)] rounded-full px-2 py-1">
          {item.read}
        </span>
      </div>
      <p className="text-[11px] font-black text-slate-800 leading-tight line-clamp-2 min-h-[28px]">{item.title}</p>
      <p className="text-[9px] font-bold text-slate-400 mt-1.5 truncate">{item.author}</p>
      <p className="text-[8px] font-black uppercase tracking-widest text-[var(--color-primary)]/70 mt-0.5">{item.level}</p>
    </motion.div>
  );
}

function FeatureCard({ item, onClick }: { item: typeof FEATURES[0]; onClick: () => void }) {
  const Icon = item.icon;
  return (
    <motion.button
      whileTap={{ scale: 0.96 }}
      onClick={onClick}
      className="bg-[var(--app-bg)] rounded-2xl border border-[var(--border)] shadow-sm p-3 flex items-center gap-3 text-left"
    >
      <div
        className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
        style={{ backgroundColor: `color-mix(in srgb, ${item.tint} 14%, transparent)` }}
      >
        <Icon size={16} primary={item.tint} />
      </div>
      <div className="min-w-0">
        <p className="text-[10px] font-black text-slate-800 uppercase tracking-wide leading-none">{item.title}</p>
        <p className="text-[8.5px] font-bold text-slate-400 mt-1 leading-tight line-clamp-2">{item.desc}</p>
      </div>
    </motion.button>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export function Learning() {
  const loading = usePageLoading(800);
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeSheet, setActiveSheet] = useState<null | "Share" | "Options">(null);

  const goViewer = (mode: "learn-earn" | "free" | "pay-to-stream") =>
    navigate(`/learning/viewer?mode=${mode}`);

  return (
    <div className="w-full pb-24 relative bg-transparent font-sans text-slate-800">
      <PageHeader
        useLogo
        title="LEARN"
        searchValue={searchQuery}
        onSearchChange={setSearchQuery}
      />

      {loading ? (
        <PageSkeletons.Academy />
      ) : (
        <div className="px-4 pt-4 relative z-20 space-y-5">

          {/* ── Search + Live ── */}
          <div className="flex items-center gap-2">
            <div className="flex-1 bg-[var(--app-bg)] rounded-2xl h-11 flex items-center px-4 border border-[var(--border)] shadow-sm">
              <Search size={15} primary="#94a3b8" className="mr-2.5 shrink-0" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search"
                className="flex-1 h-full bg-transparent outline-none text-slate-800 font-bold placeholder:text-slate-400 text-[12px]"
              />
            </div>
            <button
              onClick={() => navigate("/learning/go-live")}
              className="h-11 bg-[var(--app-bg)] rounded-2xl px-4 flex items-center gap-1.5 border border-[var(--border)] shadow-sm active:scale-95 transition-transform shrink-0"
            >
              <Circle className="fill-[#E54D2E] text-[#E54D2E]" size={7} />
              <span className="text-[#E54D2E] font-black text-[11px] tracking-tight">LIVE</span>
            </button>
          </div>

          {/* ── Create ── */}
          <motion.button
            onClick={() => navigate("/learning/upload")}
            whileTap={{ scale: 0.97 }}
            className="w-full h-12 bg-[var(--color-primary)] rounded-2xl flex items-center justify-center gap-2 shadow-md shadow-[var(--color-primary)]/25 active:scale-95 transition-all text-white"
          >
            <span className="w-6 h-6 rounded-full bg-white/20 border border-white/30 flex items-center justify-center">
              <Plus size={14} primary="#fff" />
            </span>
            <span className="font-black text-[12px] uppercase tracking-[0.18em]">Create</span>
          </motion.button>

          {/* ── Stats ── */}
          <div className="grid grid-cols-4 gap-2">
            {STATS.map((stat) => (
              <StatCard key={stat.label} stat={stat} onClick={() => navigate("/learning/profile")} />
            ))}
          </div>

          {/* ── Video Lessons ── */}
          <div>
            <SectionHeader
              title="Video Lessons"
              subtitle="Watch and learn from expert videos"
              onSeeAll={() => goViewer("free")}
            />
            <div className="-mx-4 flex gap-3 overflow-x-auto pb-1 pl-4 pr-4" style={{ scrollbarWidth: "none" }}>
              {VIDEO_LESSONS.map((item) => (
                <VideoCard key={item.id} item={item} onPlay={() => goViewer("free")} onOptions={() => setActiveSheet("Options")} />
              ))}
            </div>
          </div>

          {/* ── Audio Lessons ── */}
          <div>
            <SectionHeader
              title="Audio Lessons"
              subtitle="Listen and learn on the go"
              onSeeAll={() => goViewer("free")}
            />
            <div className="-mx-4 flex gap-3 overflow-x-auto pb-1 pl-4 pr-4" style={{ scrollbarWidth: "none" }}>
              {AUDIO_LESSONS.map((item) => (
                <AudioCard key={item.id} item={item} onPlay={() => goViewer("free")} />
              ))}
            </div>
          </div>

          {/* ── Text Lessons ── */}
          <div>
            <SectionHeader
              title="Text Lessons"
              subtitle="Read and learn at your own pace"
              onSeeAll={() => goViewer("free")}
            />
            <div className="-mx-4 flex gap-3 overflow-x-auto pb-1 pl-4 pr-4" style={{ scrollbarWidth: "none" }}>
              {TEXT_LESSONS.map((item) => (
                <TextCard key={item.id} item={item} onRead={() => goViewer("free")} />
              ))}
            </div>
          </div>

          {/* ── Learning Features ── */}
          <div className="grid grid-cols-2 gap-2.5">
            {FEATURES.map((item) => (
              <FeatureCard key={item.title} item={item} onClick={() => navigate(item.to)} />
            ))}
          </div>

          {/* ── Certified Courses entry ── */}
          <button
            onClick={() => navigate(`/learning/course/${COURSES[0].id}`)}
            className="w-full bg-[var(--app-text-slate)] rounded-2xl p-4 flex items-center gap-3.5 text-left shadow-lg shadow-black/15 active:scale-[0.98] transition-transform"
          >
            <div className="w-11 h-11 rounded-2xl bg-[var(--color-primary)] flex items-center justify-center shrink-0">
              <GradCap size={20} primary="#fff" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-white font-black text-[11px] uppercase tracking-widest leading-none">Certified Courses</p>
              <p className="text-white/60 text-[9px] font-bold uppercase tracking-widest mt-1.5">Earn verifiable certificates</p>
            </div>
            <ChevronRight size={18} className="text-white/70 shrink-0" />
          </button>
        </div>
      )}

      {/* ── Bottom Sheets ── */}
      <AnimatePresence>
        {activeSheet && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveSheet(null)}
              className="fixed inset-0 z-[1000] bg-black/60 backdrop-blur-sm max-w-md mx-auto"
            />
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 26, stiffness: 220 }}
              className="fixed bottom-0 left-0 right-0 z-[1010] w-full max-w-md mx-auto bg-[var(--app-bg)] rounded-t-[32px] border-t border-[var(--border)] shadow-2xl overflow-hidden pb-[env(safe-area-inset-bottom)]"
            >
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-lg font-black text-slate-800 uppercase tracking-tight">{activeSheet}</h3>
                  <button
                    onClick={() => setActiveSheet(null)}
                    className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center active:scale-90 transition-all border border-slate-200"
                  >
                    <X size={18} className="text-slate-600" />
                  </button>
                </div>

                {activeSheet === "Options" && (
                  <div className="space-y-2">
                    <button
                      onClick={() => setActiveSheet("Share")}
                      className="w-full h-14 bg-slate-50 flex items-center gap-4 px-5 rounded-2xl active:scale-95 transition-all border border-[var(--border)]"
                    >
                      <div className="w-9 h-9 rounded-xl bg-[var(--color-primary)]/10 flex items-center justify-center">
                        <MessageCircle color="var(--color-primary)" size={16} />
                      </div>
                      <span className="font-black text-[11px] uppercase tracking-widest text-slate-800">Share to peers</span>
                    </button>
                    <button
                      onClick={() => setActiveSheet(null)}
                      className="w-full h-14 bg-slate-50 flex items-center gap-4 px-5 rounded-2xl active:scale-95 transition-all border border-[var(--border)]"
                    >
                      <div className="w-9 h-9 rounded-xl bg-[var(--color-primary)]/10 flex items-center justify-center">
                        <Bookmark size={16} className="text-[var(--color-primary)]" />
                      </div>
                      <span className="font-black text-[11px] uppercase tracking-widest text-slate-800">Bookmark Lesson</span>
                    </button>
                  </div>
                )}

                {activeSheet === "Share" && (
                  <div className="space-y-2">
                    <div className="flex h-13 bg-slate-50 rounded-2xl border border-[var(--border)] p-1.5">
                      <input
                        type="text"
                        readOnly
                        value="https://kleench.com/l/82d2x"
                        className="flex-1 bg-transparent px-3 text-[11px] font-bold text-slate-700 outline-none"
                      />
                      <button className="px-5 bg-[var(--color-primary)] text-white rounded-xl font-black text-[10px] uppercase tracking-widest active:scale-95 transition-all">
                        Copy
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
