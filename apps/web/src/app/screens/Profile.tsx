import { useState } from "react";
import { Link, useParams, useNavigate } from "react-router";
import { ShieldCheck, Share2, Play, MapPin, Phone, Mail, AtSign } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { PageHeader } from "../components/PageHeader";

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

import { usePageLoading, PageSkeletons } from "../components/PageSkeletons";

export function Profile() {
  const loading = usePageLoading(1100);
  const { username: profileUsername } = useParams();
  const [activeTab, setActiveTab] = useState<"reels" | "marketplace" | "verification">("reels");
  const [isFollowing, setIsFollowing] = useState(false);
  const navigate = useNavigate();



  // Load local user data
  const localKycRaw = localStorage.getItem("userKyc");
  const localKyc = localKycRaw ? JSON.parse(localKycRaw) : null;
  const localPhoto = localStorage.getItem("userProfilePhoto");
  
  const isOwnProfile = !profileUsername || (localKyc && profileUsername === localKyc.userName);

  const displayName = isOwnProfile && localKyc ? localKyc.fullName : profileData.name;
  const displayUsername = isOwnProfile && localKyc ? `@${localKyc.userName}` : (profileUsername ? `@${profileUsername}` : profileData.username);
  const initials = displayName.split(" ").map((n: string) => n[0]).join("").toUpperCase();

  function grace(delay = 0) {
    return {
      duration: 0.62,
      delay,
      ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
    };
  }

  return (
    <div className="w-full max-w-md mx-auto pb-32 relative min-h-screen bg-transparent">

      {/* ── Standardized Header ── */}
      <PageHeader 
        useLogo 
      >
        <div className="relative z-10 flex items-center gap-4 mt-0 pt-0">
          <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={grace(0.1)}
            className="relative">
            <div className="w-16 h-16 border-2 border-white overflow-hidden shadow-xl shadow-black/20">
              {isOwnProfile && localPhoto ? (
                <img src={localPhoto} alt={displayName} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full bg-orange-50 flex items-center justify-center text-[var(--app-orange)] text-xl font-black" style={{ fontFamily: "Agrandir, sans-serif" }}>
                  {initials}
                </div>
              )}
            </div>
            {profileData.verified && (
              <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-[#00C853] border-2 border-white flex items-center justify-center shadow-lg text-white">
                <ShieldCheck size={12} strokeWidth={3} />
              </div>
            )}
          </motion.div>
          
          <div className="flex-1">
            <div className="flex items-center justify-between">
               <motion.h1 initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={grace(0.2)}
                 className="text-white text-xl font-black uppercase tracking-tighter" style={{ fontFamily: "Outfit, sans-serif" }}>
                 {displayName}
               </motion.h1>
               <button onClick={() => { navigator.clipboard.writeText(window.location.href); alert("Wall link copied!"); }}
                 className="p-2 rounded-full/10 active:scale-90 transition-all text-white">
                 <Share2 size={18} />
               </button>
            </div>
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={grace(0.3)}
              className="flex items-center gap-4 text-white/80 text-[11px] font-black uppercase tracking-widest mt-1">
              <span className="flex items-center gap-1.5"><MapPin size={12} className="text-[var(--app-orange)]" /> {profileData.location}</span>
            </motion.div>
          </div>
        </div>
      </PageHeader>

      {loading ? (
        <PageSkeletons.Profile />
      ) : (
        <div className="px-5 mt-6 relative z-10 space-y-8">
        
        {/* Stats Section (Industrial Ledger) */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={grace(0.4)}
          className="bg-[var(--app-bg)] border-2 border-[var(--app-text)] p-7 shadow-[8px_8px_0px_var(--app-text)] relative">
          
          <div className="absolute top-0 right-0 w-12 h-12 bg-[var(--app-shape-accent)]/5 flex items-center justify-center border-l-2 border-b-2 border-[var(--app-text)]">
             <span className="text-[10px] font-black text-[var(--app-text)]/40 uppercase tracking-[0.2em]">{displayUsername.slice(1, 3)}</span>
          </div>

          <p className="text-[13px] font-medium text-[var(--app-text)] leading-relaxed mb-8 pr-12">{profileData.bio}</p>

          <div className="grid grid-cols-1 gap-2 mb-8">
            {[
              { label: "Completed Transactions", value: profileData.stats.completedTransactions, color: "#00C853", num: "01" },
              { label: "Average Community Rating", value: profileData.stats.averageRating, color: "var(--app-orange)", num: "02" },
              { label: "Successful Referrals", value: profileData.stats.successfulReferrals, color: "var(--app-text)", num: "03" },
            ].map((stat) => (
              <div key={stat.label} className="flex items-center justify-between p-4 bg-[var(--app-shape-accent)]/[0.02] border-2 border-[var(--app-text)] group/5 transition-colors">
                 <div className="flex items-center gap-4">
                    <span className="text-[10px] font-black text-[var(--app-text)]/20 tracking-tighter uppercase">{stat.num}.</span>
                    <p className="text-[9px] font-black uppercase tracking-widest text-[var(--app-text)]">{stat.label}</p>
                 </div>
                 <p className="text-[16px] font-black uppercase pr-2" style={{ fontFamily: "Outfit, sans-serif", color: stat.color }}>{stat.value}</p>
              </div>
            ))}
          </div>

          <div className="flex gap-4">
            <motion.button whileTap={{ scale: 0.98 }} onClick={() => setIsFollowing(!isFollowing)}
              className={`flex-1 py-4 border-2 border-[var(--app-text)] font-black text-[10px] uppercase tracking-[0.2em] transition-all shadow-[4px_4px_0px_var(--app-text)] active:translate-x-1 active:translate-y-1 active:shadow-none ${
                isFollowing 
                  ? "bg-[var(--app-bg)] text-[var(--app-text)]" 
                  : "bg-[var(--app-shape-accent)] text-white"
              }`}>
              {isFollowing ? "Connected ✓" : "Connect Circle"}
            </motion.button>
            <motion.button whileTap={{ scale: 0.98 }} onClick={() => navigate("/friends")}
              className="flex-1 py-4 bg-[var(--app-orange)] text-white border-2 border-[var(--app-text)] font-black text-[10px] uppercase tracking-[0.2em] shadow-[4px_4px_0px_var(--app-text)] active:translate-x-1 active:translate-y-1 active:shadow-none transition-all">
              Message
            </motion.button>
          </div>
        </motion.div>

        {/* Custom Tabs (Swiss Style) */}
        <div className="flex border-4 border-[var(--app-text)] bg-[var(--app-shape-accent)] shadow-[4px_4px_0px_var(--app-orange)]">
          {(["reels", "marketplace", "verification"] as const).map((tab) => (
            <button key={tab} onClick={() => setActiveTab(tab)}
              className={`flex-1 py-3.5 text-[9px] font-black uppercase tracking-[0.2em] transition-all ${
                activeTab === tab 
                  ? "bg-[var(--app-orange)] text-white shadow-inner" 
                  : "bg-[var(--app-bg)] text-[var(--app-text)]"
              }`} style={{ fontFamily: "Outfit, sans-serif" }}>
              {tab === "reels" ? "Stories" : tab === "marketplace" ? "Shop" : "Trust"}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <AnimatePresence mode="wait">
          {activeTab === "reels" && (
            <motion.div key="reels" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={grace()}
              className="grid grid-cols-2 gap-4">
              {profileData.learningReels.map((reel, idx) => (
                <motion.div key={reel.id} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={grace(idx * 0.05)}>
                  <Link to={`/product/${reel.id}`} className="block relative aspect-[9/14] border-2 border-[var(--app-text)] overflow-hidden group shadow-[4px_4px_0px_var(--app-text)] transition-all">
                    <div className={`absolute inset-0 bg-gradient-to-br ${reel.color} transition-transform duration-700`} />
                    <div className="absolute inset-0 bg-black/10" />
                    <div className="absolute inset-0 p-5 flex flex-col justify-between">
                      <div className="w-10 h-10 border-2 border-white bg-[var(--app-bg)]/20 backdrop-blur-md flex items-center justify-center">
                        <Play size={16} fill="white" className="text-white translate-x-0.5" />
                      </div>
                      <div className="space-y-1">
                        <p className="text-white font-black text-xs leading-tight uppercase tracking-tight" style={{ fontFamily: "Outfit, sans-serif" }}>{reel.title}</p>
                        <p className="text-white/60 text-[9px] font-black uppercase tracking-widest">{reel.views} views</p>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          )}

          {activeTab === "marketplace" && (
            <motion.div key="marketplace" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={grace()}
              className="grid grid-cols-2 gap-4">
              {profileData.marketplace.map((product, i) => (
                <motion.div key={product.id} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={grace(i * 0.05)}>
                  <Link to={`/product/${product.id}`} className="block bg-[var(--app-bg)] p-4 border-2 border-[var(--app-text)] shadow-[6px_6px_0px_var(--app-text)] active:translate-x-1 active:translate-y-1 active:shadow-none transition-all group overflow-hidden">
                    <div className="aspect-square bg-[var(--app-shape-accent)]/5 flex items-center justify-center mb-4 transition-transform duration-500 border border-[var(--app-text)]/10">
                      <span className="text-3xl font-black text-[var(--app-text)]/10" style={{ fontFamily: "Outfit, sans-serif" }}>
                        {product.title.charAt(0)}
                      </span>
                    </div>
                    <h3 className="text-[12px] font-black uppercase tracking-tight text-[var(--app-text)] mb-2 line-clamp-1">{product.title}</h3>
                    <p className="text-lg font-black text-[var(--app-orange)]" style={{ fontFamily: "Outfit, sans-serif" }}>K{product.price.toFixed(2)}</p>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          )}

          {activeTab === "verification" && (
            <motion.div key="verification" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={grace()}
              className="space-y-6">
              <div className="bg-[var(--app-bg)] p-8 border-2 border-[var(--app-text)] shadow-[8px_8px_0px_var(--app-text)] space-y-8">
                <div className="flex items-center justify-between pb-4 border-b-2 border-[var(--app-text)]/10">
                  <h3 className="text-[10px] font-black text-[var(--app-text)]/40 uppercase tracking-[0.4em]">Verified Wall Ledger</h3>
                  <ShieldCheck size={20} className="text-[#00C853]" />
                </div>
                
                <div className="space-y-6">
                  {[
                    { label: "Community Handle", value: displayUsername, icon: AtSign },
                    { label: "Legal Identity", value: displayName, icon: ShieldCheck },
                    { label: "Direct Line", value: isOwnProfile && localKyc ? localKyc.phone : "+1 555-0123", icon: Phone },
                    { label: "Secure Email", value: isOwnProfile && localKyc ? localKyc.email : "sarah.m@example.com", icon: Mail },
                  ].map((item) => (
                    <div key={item.label} className="flex items-center gap-5">
                      <div className="w-12 h-12 border-2 border-[var(--app-text)] bg-[var(--app-shape-accent)]/5 flex items-center justify-center text-[var(--app-orange)]">
                        <item.icon size={18} />
                      </div>
                      <div>
                        <p className="text-[10px] font-black text-[var(--app-text)]/30 uppercase tracking-[0.2em] mb-1">{item.label}</p>
                        <p className="text-[14px] font-black text-[var(--app-text)] uppercase tracking-tight" style={{ fontFamily: "Outfit, sans-serif" }}>{item.value}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {localKyc && (
                  <div className="p-5 bg-[#00C853]/5 border-2 border-[#00C853] flex items-center gap-4">
                    <div className="w-9 h-9 border-2 border-[#00C853] bg-[#00C853] flex items-center justify-center text-white">
                      <ShieldCheck size={16} strokeWidth={3} />
                    </div>
                    <p className="text-[11px] font-black uppercase tracking-[0.2em] text-[#00C853]">Official Verified Citizen</p>
                  </div>
                )}
              </div>

              <div className="bg-[var(--app-orange)] p-5 border-2 border-[var(--app-text)] shadow-[4px_4px_0px_var(--app-text)]">
                <p className="text-[10px] text-white font-black uppercase tracking-[0.1em] leading-relaxed text-center">
                  Privacy First. These details are only visible to verified community members to ensure safe transactions.
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      )}
    </div>
  );
}
