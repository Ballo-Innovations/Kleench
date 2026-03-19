import { useState } from "react";
import { Link, useParams, useNavigate } from "react-router";
import { ArrowLeft, ShieldCheck, Star, MessageCircle, UserPlus, Share2, Play, MapPin } from "lucide-react";
import { motion } from "motion/react";

const profileData = {
  name: "Sarah Martinez",
  username: "@sarahm",
  verified: true,
  location: "San Francisco, CA",
  bio: "Edutech creator & digital entrepreneur. Helping people learn tech skills and build their online businesses.",
  stats: {
    completedTransactions: 487,
    averageRating: 4.9,
    successfulReferrals: 234,
    followers: 12500,
  },
  learningReels: [
    { id: 1, title: "React Hooks Masterclass", views: "12.5k", color: "from-[var(--trust-blue)] to-blue-800" },
    { id: 2, title: "UI Design Fundamentals", views: "8.2k", color: "from-rose-500 to-pink-700" },
    { id: 3, title: "Data Analytics Basics", views: "15.3k", color: "from-cyan-500 to-teal-700" },
    { id: 4, title: "Mobile Development", views: "9.7k", color: "from-amber-500 to-orange-700" },
    { id: 5, title: "Digital Marketing 101", views: "11.2k", color: "from-emerald-500 to-green-700" },
    { id: 6, title: "Growth Strategy", views: "7.8k", color: "from-fuchsia-500 to-purple-700" },
  ],
  marketplace: [
    { id: 101, title: "Complete React Course", price: 149 },
    { id: 102, title: "UI Design Templates", price: 79 },
    { id: 103, title: "Marketing Toolkit", price: 99 },
    { id: 104, title: "Startup Guide", price: 29 },
  ],
};

export function Profile() {
  useParams(); // username param available for future use
  const [activeTab, setActiveTab] = useState<"reels" | "marketplace">("reels");
  const [isFollowing, setIsFollowing] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="w-full max-w-md mx-auto pb-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <Link to="/" className="w-9 h-9 rounded-lg bg-white shadow-sm border border-black/[0.04] flex items-center justify-center">
          <ArrowLeft size={16} className="text-[var(--ink-primary)]" />
        </Link>
        <span className="text-[10px] font-[var(--font-body)] font-bold text-[var(--ink-muted)] uppercase tracking-widest">
          {profileData.username}
        </span>
        <button
          onClick={() => {
            navigator.clipboard.writeText(window.location.href);
            alert("Profile link copied!");
          }}
          className="w-9 h-9 rounded-lg bg-white shadow-sm border border-black/[0.04] flex items-center justify-center"
        >
          <Share2 size={16} className="text-[var(--ink-primary)]" />
        </button>
      </div>

      {/* Profile Header */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="pb-3">
        <div className="flex items-start gap-3 mb-3">
          <div className="relative">
            <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-rose-500 via-purple-500 to-indigo-500 p-[2px] shadow-md">
              <div className="w-full h-full rounded-[10px] bg-white flex items-center justify-center text-[var(--ink-primary)] text-lg font-[var(--font-header)] font-bold">
                SM
              </div>
            </div>
            {profileData.verified && (
              <div className="absolute -bottom-0.5 -right-0.5 w-5 h-5 rounded-md bg-[var(--trust-blue)] flex items-center justify-center border-2 border-white shadow-sm">
                <ShieldCheck size={10} className="text-white" />
              </div>
            )}
          </div>
          <div className="flex-1 pt-0.5">
            <h1 className="text-lg font-[var(--font-header)] font-bold text-[var(--ink-primary)] mb-0.5">{profileData.name}</h1>
            <div className="flex items-center gap-1 mb-0.5">
              <MapPin size={10} className="text-[var(--ink-muted)]" />
              <p className="text-[9px] font-[var(--font-body)] text-[var(--ink-muted)]">{profileData.location}</p>
            </div>
            <p className="text-[10px] font-[var(--font-body)] font-bold text-[var(--trust-blue)]">
              {(profileData.stats.followers / 1000).toFixed(1)}k followers
            </p>
          </div>
        </div>

        <p className="text-xs font-[var(--font-body)] text-[var(--ink-secondary)] leading-relaxed mb-4">{profileData.bio}</p>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-2 mb-4">
          {[
            { label: "Completed", value: profileData.stats.completedTransactions, accent: "text-[var(--trust-blue)]", bg: "bg-[var(--trust-blue)]/5", border: "border-[var(--trust-blue)]/10" },
            { label: "Rating", value: profileData.stats.averageRating, accent: "text-[var(--action-gold-dark)]", bg: "bg-[var(--action-gold)]/10", border: "border-[var(--action-gold)]/15", icon: true },
            { label: "Referrals", value: profileData.stats.successfulReferrals, accent: "text-emerald-600", bg: "bg-emerald-50", border: "border-emerald-100" },
          ].map((stat) => (
            <div key={stat.label} className={`text-center p-2.5 rounded-lg ${stat.bg} border ${stat.border}`}>
              <div className="flex items-center justify-center gap-1 mb-0.5">
                {stat.icon && <Star size={10} fill="var(--action-gold)" className="text-[var(--action-gold)]" />}
                <p className={`text-lg font-[var(--font-header)] font-bold ${stat.accent}`}>{stat.value}</p>
              </div>
              <p className="text-[9px] font-[var(--font-body)] text-[var(--ink-muted)]">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <motion.button
            whileTap={{ scale: 0.97 }}
            onClick={() => setIsFollowing(!isFollowing)}
            className={`flex-1 py-2.5 rounded-lg font-[var(--font-body)] font-bold flex items-center justify-center gap-1.5 shadow-md text-xs ${
              isFollowing
                ? "bg-white border-2 border-emerald-500/30 text-emerald-600"
                : "bg-gradient-to-r from-[var(--trust-blue)] to-[var(--trust-blue-dark)] text-white glow-blue"
            }`}
          >
            <UserPlus size={14} /> {isFollowing ? "Following" : "Follow"}
          </motion.button>
          <motion.button
            whileTap={{ scale: 0.97 }}
            onClick={() => navigate("/friends")}
            className="flex-1 py-2.5 rounded-lg bg-white border-2 border-[var(--trust-blue)]/20 text-[var(--trust-blue)] font-[var(--font-body)] font-bold flex items-center justify-center gap-1.5 text-xs shadow-sm"
          >
            <MessageCircle size={14} /> Message
          </motion.button>
          <motion.button
            whileTap={{ scale: 0.97 }}
            onClick={() => {
              navigator.clipboard.writeText(window.location.href);
              alert("Profile link copied!");
            }}
            className="py-2.5 px-3 rounded-lg bg-gradient-to-r from-[var(--action-gold)] to-[var(--action-gold-dark)] text-[var(--ink-primary)] shadow-md glow-gold"
          >
            <Share2 size={14} />
          </motion.button>
        </div>
      </motion.div>

      {/* Tabs */}
      <div className="mb-3">
        <div className="flex rounded-lg bg-[var(--surface-raised)] p-1">
          {(["reels", "marketplace"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 py-2 rounded-md text-[10px] font-[var(--font-body)] font-bold uppercase tracking-wider transition-all duration-300 ${
                activeTab === tab
                  ? "bg-gradient-to-r from-[var(--trust-blue)] to-[var(--trust-blue-dark)] text-white shadow-md"
                  : "text-[var(--ink-muted)]"
              }`}
            >
              {tab === "reels" ? "Learning Reels" : "Marketplace"}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div>
        {activeTab === "reels" && (
          <motion.div key="reels" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="grid grid-cols-2 gap-2">
            {profileData.learningReels.map((reel, i) => (
              <motion.div key={reel.id} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.04 * i }}>
                <Link to={`/product/${reel.id}`} className="block">
                  <div className={`relative rounded-xl overflow-hidden bg-gradient-to-br ${reel.color} aspect-[9/14] shadow-md`}>
                    <div className="absolute inset-0 noise" />
                    <div className="absolute inset-0 flex flex-col justify-between p-2.5">
                      <div className="w-7 h-7 rounded-md bg-white/20 backdrop-blur-sm flex items-center justify-center">
                        <Play size={12} fill="white" className="text-white ml-0.5" />
                      </div>
                      <div>
                        <p className="text-[10px] font-[var(--font-body)] font-bold text-white leading-tight mb-0.5">{reel.title}</p>
                        <p className="text-[9px] font-[var(--font-body)] text-white/60">{reel.views} views</p>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        )}

        {activeTab === "marketplace" && (
          <motion.div key="marketplace" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="grid grid-cols-2 gap-2">
            {profileData.marketplace.map((product, i) => (
              <motion.div key={product.id} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.04 * i }}>
                <Link to={`/product/${product.id}`} className="block rounded-xl bg-white p-3 shadow-sm border border-black/[0.04]">
                  <div className="aspect-square rounded-lg bg-[var(--surface-raised)] flex items-center justify-center mb-2">
                    <span className="text-2xl font-[var(--font-header)] font-bold text-[var(--ink-muted)]/20">
                      {product.title.charAt(0)}
                    </span>
                  </div>
                  <h3 className="text-[10px] font-[var(--font-body)] font-bold text-[var(--ink-primary)] mb-0.5 line-clamp-2">{product.title}</h3>
                  <span className="text-sm font-[var(--font-header)] font-bold text-[var(--trust-blue)]">${product.price}</span>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
}
