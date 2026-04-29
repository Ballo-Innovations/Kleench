import { useState } from "react";
import { useNavigate } from "react-router";
import { motion, AnimatePresence } from "motion/react";
import {
  DuotoneSearch as Search,
  DuotonePlay as Play,
  DuotoneHeadphones as Headphones,
  DuotoneUser as UserIcon,
  DuotoneEye as EyeIcon,
} from "../components/DuotoneIcon";
import { MoreVertical, Bookmark, Lock } from "lucide-react";
import { PageHeader } from "../components/PageHeader";

// Existing learning assets
import learnWoman from "@/assets/learning/learn_woman_1775596426630.png";
import learnBook from "@/assets/learning/learn_book_1775596454115.png";
import learnChart from "@/assets/learning/learn_chart_1775596868170.png";
import learnMountain from "@/assets/learning/learn_mountain_1775596850615.png";
import learnPresenter from "@/assets/learning/learn_presenter_1775596479989.png";

// Shared ad assets for additional thumbnails
import adPodcast from "@/assets/ads/ad_podcast.png";
import adCode from "@/assets/ads/ad_code.png";
import adHeadphones from "@/assets/ads/ad_headphones.png";
import adSmarthome from "@/assets/ads/ad_smarthome.png";
import adShopping from "@/assets/ads/ad_shopping.png";

type Category = "All" | "Agriculture" | "Business" | "Tourism" | "Market" | "Sport" | "Health" | "Technology";

interface VideoItem {
  id: number;
  title: string;
  image: string;
  author: string;
  views: string;
  duration: string;
}

interface PodcastItem {
  id: number;
  title: string;
  image: string;
  host: string;
  duration: string;
}

const CATEGORIES: Category[] = ["All", "Agriculture", "Business", "Tourism", "Market", "Sport", "Health", "Technology"];

const FREE_VIDEOS: VideoItem[] = [
  { id: 1, title: "FINANCIAL LITERACY", image: learnWoman, author: "Sarah Chen", views: "12.4K", duration: "45:00" },
  { id: 2, title: "STARTUP GUIDE", image: learnMountain, author: "Marcus Vane", views: "8.1K", duration: "1:20:00" },
  { id: 3, title: "DATA ANALYTICS", image: learnChart, author: "Elena Rostova", views: "15.2K", duration: "55:30" },
  { id: 4, title: "CODING BASICS", image: adCode, author: "James Wu", views: "22.0K", duration: "2:10:00" },
  { id: 5, title: "ECOMMERCE 101", image: adShopping, author: "Mwila Banda", views: "6.3K", duration: "38:15" },
  { id: 6, title: "SMART LIVING", image: adSmarthome, author: "Peter L.", views: "9.8K", duration: "1:05:00" },
  { id: 7, title: "BOOK REVIEW", image: learnBook, author: "Dr. Thorne", views: "4.2K", duration: "28:40" },
];

const FREE_PODCASTS: PodcastItem[] = [
  { id: 1, title: "BIZ PODCAST", image: adPodcast, host: "Sarah Chen", duration: "45:20" },
  { id: 2, title: "DEEP FOCUS", image: adHeadphones, host: "Dr. Elias", duration: "1:12:00" },
  { id: 3, title: "STARTUP HUB", image: learnPresenter, host: "Marcus Vane", duration: "38:00" },
  { id: 4, title: "TECH TALKS", image: adCode, host: "James Wu", duration: "52:15" },
  { id: 5, title: "GROWTH SECRETS", image: adShopping, host: "Mwila B.", duration: "29:40" },
];

const PAY_TO_STREAM: VideoItem[] = [
  { id: 1, title: "CRYPTO FUNDAMENTALS", image: learnPresenter, author: "Dr. Elias Thorne", views: "24.5K", duration: "1:45:00" },
  { id: 2, title: "MARKET PSYCHOLOGY", image: learnWoman, author: "Sarah Chen", views: "15.2K", duration: "2:10:00" },
  { id: 3, title: "INVESTMENT MASTERCLASS", image: learnChart, author: "Peter Lengalenga", views: "32.1K", duration: "3:00:00" },
  { id: 4, title: "ADVANCED MARKETING", image: learnBook, author: "Elena Rostova", views: "18.3K", duration: "1:30:00" },
  { id: 5, title: "TECH STARTUPS", image: learnMountain, author: "Marcus Vane", views: "11.7K", duration: "2:45:00" },
];

export function LearnCategories() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<Category>("All");

  return (
    <div className="w-full pb-32 relative min-h-screen bg-transparent overflow-x-hidden font-sans text-[var(--color-secondary)]">
      <PageHeader title="Explore" showBack onBack={() => navigate(-1)} />

      <div className="px-4 mt-1 relative z-20 space-y-3">
        {/* ── Search Bar ── */}
        <div className="flex items-center gap-2">
          <div className="flex-1 bg-[var(--app-bg)] rounded-xl h-9 flex items-center px-3 shadow-sm border border-[var(--border)]">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search topics, courses..."
              className="flex-1 h-full bg-transparent outline-none text-[var(--color-secondary)] font-bold placeholder:text-[var(--color-secondary)]/40 text-[11px]"
            />
          </div>
        </div>

        {/* ── Category Chips ── */}
        <div className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1 no-scrollbar" style={{ scrollbarWidth: "none" }}>
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`flex-shrink-0 px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-wider transition-all active:scale-95 ${
                activeCategory === cat
                  ? "bg-[var(--color-primary)] text-white shadow-sm shadow-[var(--color-primary)]/20"
                  : "bg-[var(--app-bg)] text-[var(--color-secondary)]/50 border border-[var(--border)]"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* ── Free Videos Section ── */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="space-y-3"
          >
            {/* Section: Free Videos */}
            <section>
              <div className="flex items-center justify-between mb-1 px-1">
                <div className="flex items-center gap-2">
                  <span className="w-[3px] h-3.5 rounded-full bg-[var(--color-primary)] shrink-0" />
                  <h3 className="text-[9px] font-black text-[var(--color-secondary)]/80 uppercase tracking-[0.2em] leading-none">
                    Free Videos
                  </h3>
                </div>
                <span
                  onClick={() => navigate("/learning/viewer?mode=free")}
                  className="text-[var(--color-secondary)]/40 font-bold text-[8px] uppercase tracking-widest whitespace-nowrap cursor-pointer"
                >
                  See All
                </span>
              </div>
              <div className="-mx-5 flex gap-3 overflow-x-auto pb-2 pl-5 pr-5 no-scrollbar" style={{ scrollbarWidth: "none" }}>
                {FREE_VIDEOS.map((vid) => (
                  <motion.div
                    whileTap={{ scale: 0.96 }}
                    onClick={() => navigate(`/learning/${vid.id}`)}
                    key={vid.id}
                    className="relative flex-shrink-0 w-28 h-40 bg-[var(--muted)] border border-[var(--border)] overflow-hidden shadow-sm group rounded-xl cursor-pointer"
                  >
                    <img src={vid.image} alt={vid.title} className="absolute inset-0 w-full h-full object-cover grayscale-[0.1] transition-all duration-700" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/100 via-black/40 to-transparent" />

                    <div className="absolute top-1.5 right-1.5 w-6 h-6 rounded-full bg-[var(--app-bg)]/20 backdrop-blur-md border border-white/30 ring-1 ring-white/10 flex items-center justify-center shadow-lg">
                      <Play primary="#fff" size={12} />
                    </div>

                    <div className="absolute bottom-2 left-2 right-2 flex justify-between items-end">
                      <div className="flex-1 pr-1">
                        <p className="text-white font-black text-[10px] uppercase tracking-tighter leading-snug drop-shadow-2xl">{vid.title}</p>
                        <div className="flex items-center gap-1 mt-0.5">
                          <UserIcon size={8} primary="var(--color-secondary-dim)" />
                          <span className="text-white/60 text-[7px] font-bold truncate">{vid.author}</span>
                        </div>
                      </div>
                      <button className="w-6 h-6 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center text-white shrink-0 active:scale-90 transition-transform">
                        <MoreVertical size={14} color="#fff" />
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </section>

            {/* Section: Free Podcast */}
            <section>
              <div className="flex items-center justify-between mb-1 px-1">
                <div className="flex items-center gap-2">
                  <span className="w-[3px] h-3.5 rounded-full bg-[var(--color-primary)] shrink-0" />
                  <h3 className="text-[9px] font-black text-[var(--color-secondary)]/80 uppercase tracking-[0.2em] leading-none">
                    Free Podcast
                  </h3>
                </div>
                <span className="text-[var(--color-secondary)]/40 font-bold text-[8px] uppercase tracking-widest whitespace-nowrap cursor-pointer">
                  See All
                </span>
              </div>
              <div className="-mx-5 flex gap-3 overflow-x-auto pb-2 pl-5 pr-5 no-scrollbar" style={{ scrollbarWidth: "none" }}>
                {FREE_PODCASTS.map((pod) => (
                  <motion.div
                    whileTap={{ scale: 0.96 }}
                    key={pod.id}
                    className="relative flex-shrink-0 w-28 h-40 bg-slate-950 border border-slate-800 overflow-hidden shadow-sm group rounded-xl cursor-pointer"
                  >
                    <img src={pod.image} alt={pod.title} className="absolute inset-0 w-full h-full object-cover opacity-50 mix-blend-luminosity transition-all duration-700" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-slate-900/60 to-slate-900/30" />

                    {/* Glassmorphism headphone badge */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-8 h-8 rounded-full bg-[var(--app-bg)]/15 backdrop-blur-md border border-white/30 ring-1 ring-white/10 flex items-center justify-center shadow-lg">
                        <Headphones primary="#fff" size={14} />
                      </div>
                    </div>

                    {/* Title + waveform */}
                    <div className="absolute bottom-2 left-2 right-2 flex flex-col gap-1">
                      <div className="flex justify-between items-start">
                        <div className="flex-1 pr-1">
                          <p className="block text-white/95 font-black text-[10px] uppercase tracking-tighter leading-snug drop-shadow-2xl">{pod.title}</p>
                          <span className="text-white/50 text-[7px] font-bold">{pod.host}</span>
                        </div>
                        <button className="w-5 h-5 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center text-white shrink-0 active:scale-90 transition-transform -mt-1 -mr-1">
                          <MoreVertical size={12} color="#fff" />
                        </button>
                      </div>
                      <div className="flex items-center gap-1 mt-0.5">
                        <Headphones size={10} primary="var(--color-primary)" />
                        <div className="flex-1 h-[2px] bg-white/10 rounded-full relative overflow-hidden">
                          <div className="absolute left-0 top-0 bottom-0 w-[38%] bg-[var(--color-primary)] rounded-full" />
                        </div>
                        <div className="text-[5px] font-black text-white/60 ml-0.5">{pod.duration}</div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </section>

            {/* Section: Pay to Stream Videos */}
            <section>
              <div className="flex items-center justify-between mb-1 px-1">
                <div className="flex items-center gap-2">
                  <span className="w-[3px] h-3.5 rounded-full bg-[var(--color-primary)] shrink-0" />
                  <h3 className="text-[9px] font-black text-[var(--color-secondary)]/80 uppercase tracking-[0.2em] leading-none">
                    Pay to Stream Videos
                  </h3>
                </div>
                <span
                  onClick={() => navigate("/learning/viewer?mode=pay-to-stream")}
                  className="text-[var(--color-secondary)]/40 font-bold text-[8px] uppercase tracking-widest whitespace-nowrap cursor-pointer"
                >
                  See All
                </span>
              </div>
              <div className="-mx-5 flex gap-3 overflow-x-auto pb-2 pl-5 pr-5 no-scrollbar" style={{ scrollbarWidth: "none" }}>
                {PAY_TO_STREAM.map((vid) => (
                  <motion.div
                    whileTap={{ scale: 0.96 }}
                    onClick={() => navigate("/learning/pay-to-stream", { state: { title: vid.title } })}
                    key={vid.id}
                    className="relative flex-shrink-0 w-28 h-40 bg-[var(--muted)] border border-[var(--border)] overflow-hidden shadow-sm group rounded-xl cursor-pointer"
                  >
                    <img src={vid.image} alt={vid.title} className="absolute inset-0 w-full h-full object-cover grayscale-[0.1] transition-all duration-700" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/100 via-black/40 to-transparent" />

                    {/* Lock badge for premium */}
                    <div className="absolute top-1.5 left-1.5 flex items-center gap-1 bg-black/50 backdrop-blur-md rounded-full px-2 py-0.5 border border-white/20">
                      <Lock size={8} className="text-[var(--color-primary)]" />
                      <span className="text-[7px] font-black text-white/90 uppercase tracking-wider">Premium</span>
                    </div>

                    <div className="absolute top-1.5 right-1.5 w-6 h-6 rounded-full bg-[var(--app-bg)]/20 backdrop-blur-md border border-white/30 ring-1 ring-white/10 flex items-center justify-center shadow-lg">
                      <Play primary="#fff" size={12} />
                    </div>

                    <div className="absolute bottom-2 left-2 right-2 flex justify-between items-end">
                      <div className="flex-1 pr-1">
                        <p className="text-white font-black text-[10px] uppercase tracking-tighter leading-snug drop-shadow-2xl">{vid.title}</p>
                        <div className="flex items-center gap-1 mt-0.5">
                          <EyeIcon size={8} primary="var(--color-secondary-dim)" />
                          <span className="text-white/60 text-[7px] font-bold">{vid.views}</span>
                        </div>
                      </div>
                      <button className="w-6 h-6 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center text-white shrink-0 active:scale-90 transition-transform">
                        <Bookmark size={12} color="#fff" />
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </section>

            {/* ── Explore More — Full-width cards ── */}
            <section className="space-y-3">
              <div className="flex items-center gap-2 px-1">
                <span className="w-[3px] h-3.5 rounded-full bg-[var(--color-primary)] shrink-0" />
                <h3 className="text-[9px] font-black text-[var(--color-secondary)]/80 uppercase tracking-[0.2em] leading-none">
                  Explore Courses
                </h3>
              </div>
              {FREE_VIDEOS.slice(0, 3).map((vid) => (
                <div
                  key={vid.id}
                  onClick={() => navigate(`/learning/${vid.id}`)}
                  className="bg-[var(--app-bg)] border border-[var(--border)] rounded-2xl overflow-hidden shadow-sm flex cursor-pointer active:scale-[0.99] transition-transform"
                >
                  <div className="relative w-28 h-20 bg-slate-100 flex-shrink-0">
                    <img src={vid.image} alt={vid.title} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                      <Play size={16} primary="#fff" />
                    </div>
                  </div>
                  <div className="p-3 flex flex-col justify-center flex-1 min-w-0">
                    <h4 className="font-black text-[var(--color-secondary)] text-[10px] uppercase tracking-widest leading-none mb-1 truncate">{vid.title}</h4>
                    <div className="flex items-center gap-1.5 text-[var(--color-secondary)]/40">
                      <UserIcon size={10} primary="var(--color-secondary-dim)" />
                      <span className="text-[9px] font-bold tracking-wider uppercase truncate">{vid.author}</span>
                    </div>
                    <div className="flex items-center gap-3 mt-1.5">
                      <div className="flex items-center gap-1 text-[var(--color-secondary)]/40">
                        <EyeIcon size={10} primary="var(--color-secondary-dim)" />
                        <span className="text-[9px] font-bold">{vid.views}</span>
                      </div>
                      <span className="text-[9px] font-bold text-[var(--color-secondary)]/40">{vid.duration}</span>
                    </div>
                  </div>
                </div>
              ))}
            </section>

            {/* Infinite Scroll Loader */}
            <div className="pt-6 pb-2 flex items-center justify-center">
              <div className="w-5 h-5 border-[2px] border-[var(--color-secondary-dim)] border-t-transparent rounded-full animate-spin" />
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
