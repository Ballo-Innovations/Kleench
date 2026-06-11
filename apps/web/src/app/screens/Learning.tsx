import {
  Circle,
  X,
  MessageCircle,
  MoreVertical,
  Bookmark,
  Award,
  GraduationCap,
  TrendingUp,
  Clock3,
  Users,
  ChevronRight
} from "lucide-react";
import { COURSES, loadProgress, courseStats } from "./learning/courseData";
import {
  DuotoneSearch as Search,
  DuotoneUpload as Upload,
  DuotoneSend as Send,
  DuotoneUserPlus as UserPlus,
  DuotoneClock as Clock,
  DuotoneUser as User,
  DuotoneEye as Eye,
  DuotonePlay as Play
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
import adPodcast from "@/assets/ads/ad_podcast.png";
import adShopping from "@/assets/ads/ad_shopping.png";
import adCode from "@/assets/ads/ad_code.png";
import adHeadphones from "@/assets/ads/ad_headphones.png";
import adSmarthome from "@/assets/ads/ad_smarthome.png";

// ─── Data ────────────────────────────────────────────────────────────────────

const LEARN_EARN = [
  { id: 1, title: "Market Psychology", image: learnWoman },
  { id: 2, title: "Security Fund", image: learnBook },
  { id: 3, title: "Data Viz", image: learnChart },
  { id: 4, title: "Coding 101", image: adCode },
  { id: 5, title: "Studio Sessions", image: adHeadphones },
  { id: 6, title: "Ecommerce", image: adShopping },
  { id: 7, title: "Present Strategy", image: learnPresenter },
];

const FREE_VIDEOS = [
  { id: 1, title: "Tech Startups", image: learnMountain },
  { id: 2, title: "Biz Podcast", image: adPodcast },
  { id: 3, title: "Market Strategy", image: learnWoman },
  { id: 4, title: "Smart Living", image: adSmarthome },
  { id: 5, title: "Design Thinking", image: learnBook },
  { id: 6, title: "Data Viz", image: learnChart },
  { id: 7, title: "Coding 101", image: adCode },
];

const CREATOR_SHOWCASES = [
  { id: 1, title: "Pitch Perfect", image: learnPresenter },
  { id: 2, title: "Startup Hub", image: adPodcast },
  { id: 3, title: "Growth Secrets", image: adShopping },
  { id: 4, title: "Mindset & Focus", image: learnWoman },
  { id: 5, title: "Data Viz", image: learnChart },
  { id: 6, title: "Studio Sessions", image: adHeadphones },
  { id: 7, title: "Tech Startups", image: learnMountain },
];

const MASTERCLASSES = [
  { id: 1, title: "Crypto Security Fundamentals", author: "Dr. Elias Thorne", views: "12.4K", duration: "1:45:00", image: learnPresenter },
  { id: 2, title: "Mastering Market Psychology", author: "Sarah Chen", views: "8.1K", duration: "45:00", image: learnWoman },
  { id: 3, title: "Building a Tech Startup", author: "Marcus Vane", views: "15.2K", duration: "2:10:00", image: learnMountain },
  { id: 4, title: "Data Visualization Masterclass", author: "Elena Rostova", views: "24.5K", duration: "1:15:00", image: learnChart },
];

// ─── Sub-components ───────────────────────────────────────────────────────────

function SectionHeader({
  title,
  onSeeAll,
  seeAllLabel = "See All",
}: {
  title: string;
  onSeeAll?: () => void;
  seeAllLabel?: string;
}) {
  return (
    <div className="flex justify-between items-center mb-3 px-1">
      <div className="flex items-center gap-2">
        <span className="w-[3px] h-4 rounded-full bg-[var(--color-primary)] shrink-0" />
        <h3 className="text-[11px] font-black text-slate-700 uppercase tracking-[0.18em] leading-none">
          {title}
        </h3>
      </div>
      {onSeeAll && (
        <button
          onClick={onSeeAll}
          className="flex items-center gap-0.5 text-slate-400 font-black text-[10px] uppercase tracking-widest active:opacity-60 transition-opacity"
        >
          {seeAllLabel}
          <ChevronRight size={12} className="text-slate-400" />
        </button>
      )}
    </div>
  );
}

function VideoThumbnailCard({
  title,
  image,
  mode,
  onPlay,
  onOptions,
}: {
  title: string;
  image: string;
  mode: "learn-earn" | "free" | "pay-to-stream";
  onPlay: () => void;
  onOptions: () => void;
}) {
  return (
    <motion.div
      whileTap={{ scale: 0.95 }}
      onClick={onPlay}
      className="relative flex-shrink-0 w-[108px] h-[152px] bg-slate-200 border border-[var(--border)] overflow-hidden rounded-[16px] cursor-pointer shadow-sm"
    >
      <img
        src={image}
        alt={title}
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />

      {/* Mode badge */}
      {mode === "learn-earn" && (
        <div className="absolute top-2 left-2 bg-[var(--color-primary)] rounded-md px-1.5 py-0.5 flex items-center gap-1 shadow-md">
          <TrendingUp size={8} className="text-white" />
          <span className="text-white text-[7px] font-black uppercase tracking-[0.12em]">Earn</span>
        </div>
      )}

      {/* Play button */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/20 backdrop-blur-sm border border-white/40 flex items-center justify-center shadow-lg">
        <Play primary="#fff" size={14} />
      </div>

      {/* Footer */}
      <div className="absolute bottom-0 left-0 right-0 p-2 flex justify-between items-end">
        <p className="flex-1 text-white font-black text-[9px] uppercase tracking-tight leading-snug pr-1 line-clamp-2">
          {title}
        </p>
        <button
          onClick={(e) => { e.stopPropagation(); onOptions(); }}
          className="w-6 h-6 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center text-white shrink-0 active:scale-90 transition-transform"
        >
          <MoreVertical size={12} color="#fff" />
        </button>
      </div>
    </motion.div>
  );
}

function VideoCarousel({
  title,
  items,
  mode,
  onSeeAll,
  onPlay,
  onOptions,
}: {
  title: string;
  items: { id: number; title: string; image: string }[];
  mode: "learn-earn" | "free" | "pay-to-stream";
  onSeeAll: () => void;
  onPlay: (image: string) => void;
  onOptions: () => void;
}) {
  return (
    <div>
      <SectionHeader title={title} onSeeAll={onSeeAll} />
      <div
        className="-mx-4 flex gap-3 overflow-x-auto pb-1 pl-4 pr-4"
        style={{ scrollbarWidth: "none" }}
      >
        {items.map((item) => (
          <VideoThumbnailCard
            key={item.id}
            title={item.title}
            image={item.image}
            mode={mode}
            onPlay={() => onPlay(item.image)}
            onOptions={onOptions}
          />
        ))}
      </div>
    </div>
  );
}

function MasterclassCard({
  video,
  onClick,
  onOptions,
}: {
  video: typeof MASTERCLASSES[0];
  onClick: () => void;
  onOptions: () => void;
}) {
  return (
    <motion.div
      whileTap={{ scale: 0.99 }}
      onClick={onClick}
      className="bg-[var(--app-bg)] border border-[var(--border)] rounded-[20px] overflow-hidden shadow-sm cursor-pointer"
    >
      {/* Thumbnail */}
      <div className="relative w-full aspect-[16/9] bg-slate-100">
        <img
          src={video.image}
          alt={video.title}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

        {/* Play button */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-md border border-white/40 flex items-center justify-center shadow-xl">
            <Play primary="#fff" size={20} />
          </div>
        </div>

        {/* Duration badge */}
        <div className="absolute bottom-3 right-3 bg-black/70 backdrop-blur-sm text-white text-[9px] font-black px-2 py-1 rounded-md flex items-center gap-1">
          <Clock size={9} primary="#fff" />
          {video.duration}
        </div>
      </div>

      {/* Body */}
      <div className="p-4">
        <h4 className="font-black text-slate-800 text-[13px] leading-snug mb-2">
          {video.title}
        </h4>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <div className="w-5 h-5 rounded-full bg-[var(--color-primary)]/10 flex items-center justify-center">
              <User size={10} primary="var(--color-primary)" />
            </div>
            <span className="text-[10px] font-bold text-slate-500 tracking-wide">
              {video.author}
            </span>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1 text-slate-400">
              <Eye size={11} primary="#94a3b8" />
              <span className="text-[10px] font-bold">{video.views}</span>
            </div>
            <button
              onClick={(e) => { e.stopPropagation(); onOptions(); }}
              className="w-7 h-7 rounded-full bg-[var(--app-bg-muted)] flex items-center justify-center text-slate-500 active:scale-90 transition-transform border border-[var(--border)]"
            >
              <MoreVertical size={14} />
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function CertifiedCourseCard({ course }: { course: typeof COURSES[0] }) {
  const navigate = useNavigate();
  const stats = courseStats(course, loadProgress(course.id));
  const started = stats.pct > 0;

  const progressColor = stats.pct === 100
    ? "#00695C"
    : stats.pct > 0
    ? "var(--color-primary)"
    : "#94a3b8";

  return (
    <motion.div
      whileTap={{ scale: 0.97 }}
      onClick={() => navigate(`/learning/course/${course.id}`)}
      className="relative flex-shrink-0 w-[220px] bg-[var(--app-bg)] border border-[var(--border)] overflow-hidden shadow-sm rounded-[20px] cursor-pointer"
    >
      {/* Thumbnail — 16:9 */}
      <div className="relative w-full" style={{ aspectRatio: "16/9" }}>
        <img
          src={course.image}
          alt={course.title}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

        {/* Certificate badge */}
        <div className="absolute top-2 left-2 bg-black/40 backdrop-blur-md border border-white/20 rounded-full px-2.5 py-1 flex items-center gap-1">
          <Award size={9} className="text-white" />
          <span className="text-white text-[7px] font-black uppercase tracking-[0.15em]">
            Certificate
          </span>
        </div>

        {/* Category + Title */}
        <div className="absolute bottom-2 left-3 right-3">
          <p className="text-white/60 text-[7px] font-black uppercase tracking-[0.18em] mb-0.5">
            {course.category}
          </p>
          <p className="text-white font-black text-[11px] leading-snug line-clamp-2">
            {course.title}
          </p>
        </div>
      </div>

      {/* Body */}
      <div className="p-4">
        {/* Instructor + lessons */}
        <div className="flex items-center justify-between mb-3">
          <span className="text-[9px] font-bold text-slate-500 uppercase tracking-wide truncate pr-2">
            {course.instructor}
          </span>
          <span className="text-[9px] font-black text-slate-400 whitespace-nowrap">
            {stats.lessonsTotal} Lessons
          </span>
        </div>

        {/* Progress row */}
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-[8px] font-black uppercase tracking-[0.18em] text-slate-400">
            Progress
          </span>
          <span
            className="text-[10px] font-black"
            style={{ color: progressColor }}
          >
            {stats.pct === 100 ? "Complete" : `${stats.pct}%`}
          </span>
        </div>

        {/* Progress bar */}
        <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden mb-4">
          <div
            className="h-full rounded-full transition-all duration-500"
            style={{ width: `${stats.pct}%`, backgroundColor: progressColor }}
          />
        </div>

        {/* CTA */}
        <button className="w-full h-11 bg-[var(--color-primary)] text-white rounded-2xl flex items-center justify-center gap-2 font-black text-[9px] uppercase tracking-[0.18em] shadow-md shadow-[var(--color-primary)]/20 active:scale-95 transition-transform">
          <GraduationCap size={12} />
          {stats.pct === 100 ? "View Certificate" : started ? "Continue" : "Start Course"}
        </button>
      </div>
    </motion.div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export function Learning() {
  const loading = usePageLoading(800);
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeSheet, setActiveSheet] = useState<
    null | "Upload" | "Share" | "Register Agent" | "Options"
  >(null);

  const handleMediaClick = (mode: "learn-earn" | "free" | "pay-to-stream") => {
    navigate(`/learning/viewer?mode=${mode}`);
  };

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
        <div className="px-4 pt-4 relative z-20 space-y-6">

          {/* ── Search + Quick Actions ── */}
          <div className="flex items-center gap-2">
            <div className="flex-1 bg-[var(--app-bg)] rounded-2xl h-12 flex items-center px-4 border border-[var(--border)] shadow-sm">
              <Search size={15} primary="#94a3b8" className="mr-2.5 shrink-0" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search courses..."
                className="flex-1 h-full bg-transparent outline-none text-slate-800 font-bold placeholder:text-slate-400 text-[12px]"
              />
            </div>
            <button
              onClick={() => navigate("/learning/go-live")}
              className="h-12 bg-[var(--app-bg)] rounded-2xl px-3.5 flex items-center gap-1.5 border border-[var(--border)] shadow-sm active:scale-95 transition-transform shrink-0"
            >
              <Circle className="fill-[#E54D2E] text-[#E54D2E]" size={7} />
              <span className="text-[#E54D2E] font-black text-[11px] tracking-tight">LIVE</span>
            </button>
            <button
              onClick={() => navigate("/learning/categories")}
              className="h-12 bg-[var(--app-bg)] rounded-2xl px-3.5 flex items-center gap-1.5 border border-[var(--border)] shadow-sm active:scale-95 transition-transform shrink-0"
            >
              <Search size={14} primary="#64748b" />
              <span className="text-slate-600 font-black text-[11px] tracking-tight">Explore</span>
            </button>
          </div>

          {/* ── Primary Actions ── */}
          <div className="flex items-center gap-4">
            <motion.button
              onClick={() => navigate("/learning/upload")}
              whileTap={{ scale: 0.96 }}
              className="flex-1 h-12 bg-[var(--color-primary)] rounded-2xl flex items-center justify-center gap-2 shadow-md shadow-[var(--color-primary)]/25 active:scale-95 transition-all text-white"
            >
              <Upload size={16} primary="#fff" />
              <span className="font-black text-[11px] uppercase tracking-widest">Upload Content</span>
            </motion.button>

            <motion.button
              onClick={() => navigate("/advert/agent-registration")}
              whileTap={{ scale: 0.92 }}
              className="flex flex-col items-center justify-center gap-1 group outline-none shrink-0"
            >
              <div className="w-12 h-12 bg-[var(--app-bg)] rounded-2xl flex items-center justify-center border border-[var(--border)] shadow-sm group-active:scale-95 transition-all">
                <UserPlus size={18} />
              </div>
              <span className="font-black text-slate-600 text-[7px] uppercase tracking-[0.12em] text-center leading-tight w-14">
                Register Agent
              </span>
            </motion.button>
          </div>

          {/* ── Learn & Earn Videos ── */}
          <VideoCarousel
            title="Learn & Earn Videos"
            items={LEARN_EARN}
            mode="learn-earn"
            onSeeAll={() => handleMediaClick("learn-earn")}
            onPlay={() => handleMediaClick("learn-earn")}
            onOptions={() => setActiveSheet("Options")}
          />

          {/* ── Certified Courses ── */}
          <div>
            <SectionHeader
              title="Certified Courses"
              onSeeAll={() => navigate("/learning/profile")}
              seeAllLabel="My Certificates"
            />
            <div
              className="-mx-4 flex gap-3 overflow-x-auto pb-1 pl-4 pr-4"
              style={{ scrollbarWidth: "none" }}
            >
              {COURSES.map((course) => (
                <CertifiedCourseCard key={course.id} course={course} />
              ))}
            </div>
          </div>

          {/* ── Masterclass Post #1 ── */}
          <MasterclassCard
            video={MASTERCLASSES[0]}
            onClick={() => navigate(`/learning/${MASTERCLASSES[0].id}`)}
            onOptions={() => setActiveSheet("Options")}
          />

          {/* ── Free Videos ── */}
          <VideoCarousel
            title="Free Videos"
            items={FREE_VIDEOS}
            mode="free"
            onSeeAll={() => handleMediaClick("free")}
            onPlay={() => handleMediaClick("free")}
            onOptions={() => setActiveSheet("Options")}
          />

          {/* ── Masterclass Post #2 ── */}
          <MasterclassCard
            video={MASTERCLASSES[1]}
            onClick={() => navigate(`/learning/${MASTERCLASSES[1].id}`)}
            onOptions={() => setActiveSheet("Options")}
          />

          {/* ── Creator Showcases ── */}
          <VideoCarousel
            title="Creator Showcases"
            items={CREATOR_SHOWCASES}
            mode="pay-to-stream"
            onSeeAll={() => handleMediaClick("pay-to-stream")}
            onPlay={() => handleMediaClick("pay-to-stream")}
            onOptions={() => setActiveSheet("Options")}
          />

          {/* ── Remaining Masterclass Posts ── */}
          {MASTERCLASSES.slice(2).map((video) => (
            <MasterclassCard
              key={video.id}
              video={video}
              onClick={() => navigate(`/learning/${video.id}`)}
              onOptions={() => setActiveSheet("Options")}
            />
          ))}

          {/* Infinite scroll indicator */}
          <div className="pt-4 pb-2 flex items-center justify-center">
            <div className="w-5 h-5 border-2 border-slate-300 border-t-[var(--color-primary)] rounded-full animate-spin" />
          </div>
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
                  <h3 className="text-lg font-black text-slate-800 uppercase tracking-tight">
                    {activeSheet}
                  </h3>
                  <button
                    onClick={() => setActiveSheet(null)}
                    className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center active:scale-90 transition-all border border-slate-200"
                  >
                    <X size={18} className="text-slate-600" />
                  </button>
                </div>

                {/* Upload sheet */}
                {activeSheet === "Upload" && (
                  <div className="space-y-4">
                    <div className="border-2 border-dashed border-[var(--border)] bg-slate-50 rounded-[24px] p-10 flex flex-col items-center justify-center text-center">
                      <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center shadow-sm border border-[var(--border)] mb-4">
                        <Upload size={28} />
                      </div>
                      <h4 className="font-black text-slate-800 text-sm mb-1 uppercase tracking-tight">
                        Post Educational Content
                      </h4>
                      <p className="text-slate-500 text-[11px] font-bold uppercase tracking-[0.18em]">
                        Share your knowledge
                      </p>
                    </div>
                    <button className="w-full h-14 bg-[var(--color-primary)] text-white rounded-2xl flex items-center justify-center font-black uppercase tracking-[0.18em] text-[11px] active:scale-95 transition-all shadow-md">
                      Upload Material
                    </button>
                  </div>
                )}

                {/* Share sheet */}
                {activeSheet === "Share" && (
                  <div className="space-y-6">
                    <div className="grid grid-cols-4 gap-4">
                      {[
                        { name: "WhatsApp", bg: "bg-[#25D366]", icon: MessageCircle },
                        { name: "Twitter", bg: "bg-black", icon: "X" },
                        { name: "Facebook", bg: "bg-[#1877F2]", icon: Users },
                        { name: "Email", bg: "bg-slate-100", icon: Send },
                      ].map((social, idx) => (
                        <div
                          key={idx}
                          className="flex flex-col items-center gap-2 cursor-pointer active:scale-90 transition-all"
                        >
                          <div
                            className={`w-14 h-14 rounded-2xl flex items-center justify-center text-white shadow-sm ${social.bg} ${social.name === "Email" ? "text-slate-700" : ""}`}
                          >
                            {typeof social.icon === "string" ? (
                              <span className="font-black text-xl">{social.icon}</span>
                            ) : (
                              <social.icon size={24} />
                            )}
                          </div>
                          <span className="text-[9px] font-black text-slate-700 uppercase tracking-widest">
                            {social.name}
                          </span>
                        </div>
                      ))}
                    </div>
                    <div className="space-y-2">
                      <p className="text-[10px] font-black text-slate-600 uppercase tracking-widest">
                        Universal Link
                      </p>
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
                  </div>
                )}

                {/* Options sheet */}
                {activeSheet === "Options" && (
                  <div className="space-y-2">
                    <button
                      onClick={() => setActiveSheet("Share")}
                      className="w-full h-14 bg-slate-50 flex items-center gap-4 px-5 rounded-2xl active:scale-95 transition-all border border-[var(--border)]"
                    >
                      <div className="w-9 h-9 rounded-xl bg-[var(--color-primary)]/10 flex items-center justify-center">
                        <MessageCircle color="var(--color-primary)" size={16} />
                      </div>
                      <span className="font-black text-[11px] uppercase tracking-widest text-slate-800">
                        Share to peers
                      </span>
                    </button>
                    <button
                      onClick={() => setActiveSheet(null)}
                      className="w-full h-14 bg-slate-50 flex items-center gap-4 px-5 rounded-2xl active:scale-95 transition-all border border-[var(--border)]"
                    >
                      <div className="w-9 h-9 rounded-xl bg-[var(--color-primary)]/10 flex items-center justify-center">
                        <Bookmark size={16} className="text-[var(--color-primary)]" />
                      </div>
                      <span className="font-black text-[11px] uppercase tracking-widest text-slate-800">
                        Bookmark Video
                      </span>
                    </button>
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
