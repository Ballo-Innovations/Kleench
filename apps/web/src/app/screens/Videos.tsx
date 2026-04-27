import { Play, Heart, Share2, Radio } from "lucide-react";
import { motion } from "motion/react";

const videos = [
  { id: 1, creator: "Sarah M.", title: "Building a Side Hustle", likes: "2.3k", color: "from-[var(--trust-blue)] via-blue-700 to-indigo-800" },
  { id: 2, creator: "Tech Pro", title: "AI Tools for Business", likes: "5.1k", color: "from-cyan-600 via-blue-700 to-slate-800" },
  { id: 3, creator: "Growth Hub", title: "Passive Income Ideas", likes: "8.7k", color: "from-rose-600 via-pink-700 to-fuchsia-800" },
  { id: 4, creator: "Mike R.", title: "Crypto Trading Basics", likes: "3.4k", color: "from-emerald-600 via-teal-700 to-green-800" },
  { id: 5, creator: "Design Lab", title: "Brand Identity Guide", likes: "1.9k", color: "from-amber-600 via-orange-700 to-red-800" },
];

export function Videos() {
  return (
    <motion.div className="min-h-screen px-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <div className="flex items-center justify-between mb-5">
        <h1 className="text-2xl font-[var(--font-header)] font-bold text-[var(--ink-primary)]">Videos</h1>
        <div className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-[var(--live-red)]/10 border border-[var(--live-red)]/15">
          <Radio size={12} className="text-[var(--live-red)]" />
          <span className="text-[10px] font-[var(--font-body)] font-bold text-[var(--live-red)]">3 Live</span>
        </div>
      </div>

      <div className="space-y-3">
        {videos.map((video, i) => (
          <motion.div
            key={video.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.06 * i }}
            className={`relative rounded-2xl overflow-hidden bg-gradient-to-br ${video.color} aspect-video shadow-xl`}
          >
            <div className="absolute inset-0 noise" />
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.button whileTap={{ scale: 0.9 }} className="w-14 h-14 rounded-2xl bg-[var(--app-bg)]/20 backdrop-blur-md flex items-center justify-center border border-white/20 shadow-xl">
                <Play size={24} fill="white" className="text-white ml-0.5" />
              </motion.button>
            </div>
            <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/50 to-transparent">
              <div className="flex items-end justify-between">
                <div>
                  <p className="text-xs font-[var(--font-body)] font-bold text-white mb-0.5">{video.title}</p>
                  <p className="text-[10px] font-[var(--font-body)] text-white/60">{video.creator}</p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1 text-white/80">
                    <Heart size={14} />
                    <span className="text-[10px]">{video.likes}</span>
                  </div>
                  <Share2 size={14} className="text-white/80" />
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
