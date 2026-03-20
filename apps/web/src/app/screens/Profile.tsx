import { useState } from "react";
import { Link, useParams, useNavigate } from "react-router";
import { ArrowLeft, ShieldCheck, Star, Share2, Play, MapPin, Phone, Mail, AtSign } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

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
    <div className="w-full max-w-md mx-auto pb-32 relative min-h-screen">
      
      {/* ── Unified cross-hatch bg ── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 0 }}>
        <svg width="100%" height="100%" style={{ position: "absolute", inset: 0 }}>
          <defs>
            <pattern id="xhatch-profile" x="0" y="0" width="24" height="24" patternUnits="userSpaceOnUse">
              <line x1="0" y1="0" x2="24" y2="24" stroke="#FF8C00" strokeWidth="0.5" strokeOpacity="0.07"/>
              <line x1="24" y1="0" x2="0" y2="24" stroke="#FF8C00" strokeWidth="0.5" strokeOpacity="0.07"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#xhatch-profile)"/>
        </svg>
      </div>

      {/* ── Orange hero header ── */}
      <div className="relative pt-8 pb-32 px-6 overflow-hidden rounded-b-[40px]"
        style={{ background: "linear-gradient(135deg, #FF8C00, #e06900)", boxShadow: "0 12px 40px rgba(255,140,0,0.15)" }}>
        
        {/* grid texture */}
        <div className="absolute inset-0 opacity-[0.1]">
          <svg width="100%" height="100%">
            <defs>
              <pattern id="profile-grid" width="20" height="20" patternUnits="userSpaceOnUse">
                <path d="M 20 0 L 0 0 0 20" fill="none" stroke="white" strokeWidth="0.5"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#profile-grid)"/>
          </svg>
        </div>

        <div className="relative z-10 flex justify-between items-center mb-8">
          <button onClick={() => navigate(-1)} 
            className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/10 text-white shadow-sm transition-all hover:bg-white/30 active:scale-95">
            <ArrowLeft size={18} />
          </button>
          <span className="text-white text-[12px] font-black uppercase tracking-[0.2em] opacity-80" style={{ fontFamily: "Agrandir, sans-serif" }}>
            {displayUsername}
          </span>
          <button onClick={() => { navigator.clipboard.writeText(window.location.href); alert("Profile link copied!"); }}
            className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/10 text-white shadow-sm transition-all hover:bg-white/30 active:scale-95">
            <Share2 size={18} />
          </button>
        </div>

        <div className="relative z-10 flex items-center gap-6">
          <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={grace(0.1)}
            className="relative">
            <div className="w-24 h-24 rounded-[32px] bg-white p-1 shadow-2xl overflow-hidden">
              {isOwnProfile && localPhoto ? (
                <img src={localPhoto} alt={displayName} className="w-full h-full object-cover rounded-[28px]" />
              ) : (
                <div className="w-full h-full rounded-[28px] bg-orange-50 flex items-center justify-center text-[#FF8C00] text-3xl font-black" style={{ fontFamily: "Agrandir, sans-serif" }}>
                  {initials}
                </div>
              )}
            </div>
            {profileData.verified && (
              <div className="absolute -bottom-1 -right-1 w-8 h-8 rounded-2xl bg-[#00695C] border-4 border-white flex items-center justify-center shadow-lg text-white">
                <ShieldCheck size={16} strokeWidth={3} />
              </div>
            )}
          </motion.div>
          
          <div className="flex-1 space-y-1">
            <motion.h1 initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={grace(0.2)}
              className="text-white text-2xl font-black leading-tight" style={{ fontFamily: "Agrandir, sans-serif" }}>
              {displayName}
            </motion.h1>
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={grace(0.3)}
              className="flex items-center gap-4 text-white/70 text-[13px] font-medium">
              <span className="flex items-center gap-1"><MapPin size={12} /> {profileData.location}</span>
              <span className="font-bold text-white"><span className="text-[#0D1B3E] font-black">{(profileData.stats.followers / 1000).toFixed(1)}k</span> followers</span>
            </motion.div>
          </div>
        </div>
      </div>

      <div className="px-5 -mt-12 relative z-10 space-y-8">
        
        {/* Stats Section */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={grace(0.4)}
          className="bg-white rounded-[32px] p-6 shadow-2xl border border-black/[0.03]">
          
          <p className="text-sm font-medium text-[#0D1B3E]/60 leading-relaxed mb-8 px-2">{profileData.bio}</p>

          <div className="grid grid-cols-3 gap-3 mb-8">
            {[
              { label: "Completed", value: profileData.stats.completedTransactions, color: "#00695C" },
              { label: "Rating", value: profileData.stats.averageRating, color: "#FF8C00", icon: <Star size={10} fill="#FF8C00" /> },
              { label: "Referrals", value: profileData.stats.successfulReferrals, color: "#0D1B3E" },
            ].map((stat) => (
              <div key={stat.label} className="text-center p-4 rounded-[24px] bg-gray-50 border border-black/[0.02]">
                <div className="flex items-center justify-center gap-1 mb-1">
                  {stat.icon}
                  <p className="text-xl font-black" style={{ fontFamily: "Agrandir, sans-serif", color: stat.color }}>{stat.value}</p>
                </div>
                <p className="text-[9px] font-black uppercase tracking-widest text-[#0D1B3E]/30">{stat.label}</p>
              </div>
            ))}
          </div>

          <div className="flex gap-3">
            <motion.button whileTap={{ scale: 0.96 }} onClick={() => setIsFollowing(!isFollowing)}
              className={`flex-1 py-4 rounded-2xl font-black text-[13px] shadow-lg transition-all border ${
                isFollowing 
                  ? "bg-white border-[#00695C]/20 text-[#00695C]" 
                  : "bg-[#0D1B3E] text-white border-[#0D1B3E]/10"
              }`} style={{ fontFamily: "Agrandir, sans-serif" }}>
              {isFollowing ? "Following" : "Connect +"}
            </motion.button>
            <motion.button whileTap={{ scale: 0.96 }} onClick={() => navigate("/friends")}
              className="flex-1 py-4 rounded-2xl bg-[#FF8C00] text-white border-[#FF8C00]/10 font-black text-[13px] shadow-lg shadow-[#FF8C00]/20"
              style={{ fontFamily: "Agrandir, sans-serif" }}>
              Message
            </motion.button>
          </div>
        </motion.div>

        {/* Custom Tabs */}
        <div className="flex bg-[#0D1B3E]/5 p-1.5 rounded-[24px]">
          {(["reels", "marketplace", "verification"] as const).map((tab) => (
            <button key={tab} onClick={() => setActiveTab(tab)}
              className={`flex-1 py-3.5 rounded-[20px] text-[10px] font-black uppercase tracking-widest transition-all ${
                activeTab === tab 
                  ? "bg-white text-[#FF8C00] shadow-sm" 
                  : "text-[#0D1B3E]/40 hover:text-[#0D1B3E]/60"
              }`} style={{ fontFamily: "Agrandir, sans-serif" }}>
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
                  <Link to={`/product/${reel.id}`} className="block relative aspect-[9/14] rounded-[32px] overflow-hidden group shadow-xl">
                    <div className={`absolute inset-0 bg-gradient-to-br ${reel.color} transition-transform duration-700 group-hover:scale-110`} />
                    <div className="absolute inset-0 bg-black/10" />
                    <div className="absolute inset-0 p-5 flex flex-col justify-between">
                      <div className="w-10 h-10 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/20">
                        <Play size={16} fill="white" className="text-white translate-x-0.5" />
                      </div>
                      <div className="space-y-1">
                        <p className="text-white font-black text-sm leading-tight" style={{ fontFamily: "Agrandir, sans-serif" }}>{reel.title}</p>
                        <p className="text-white/60 text-[10px] font-bold uppercase tracking-wider">{reel.views} views</p>
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
                  <Link to={`/product/${product.id}`} className="block bg-white p-4 rounded-[32px] border border-black/[0.03] shadow-lg group">
                    <div className="aspect-square rounded-[24px] bg-gray-50 flex items-center justify-center mb-4 transition-transform duration-500 group-hover:scale-95">
                      <span className="text-3xl font-black text-[#0D1B3E]/10" style={{ fontFamily: "Agrandir, sans-serif" }}>
                        {product.title.charAt(0)}
                      </span>
                    </div>
                    <h3 className="text-[13px] font-bold text-[#0D1B3E] mb-2 line-clamp-1">{product.title}</h3>
                    <p className="text-lg font-black text-[#FF8C00]" style={{ fontFamily: "Agrandir, sans-serif" }}>K{product.price}</p>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          )}

          {activeTab === "verification" && (
            <motion.div key="verification" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={grace()}
              className="space-y-4">
              <div className="bg-white p-8 rounded-[32px] border border-black/[0.03] shadow-lg space-y-8">
                <div className="flex items-center justify-between pb-4 border-b border-gray-50">
                  <h3 className="text-[10px] font-black text-[#0D1B3E]/20 uppercase tracking-[0.2em]">Verified Credentials</h3>
                  <ShieldCheck size={18} className="text-[#00695C]" />
                </div>
                
                <div className="space-y-6">
                  {[
                    { label: "Community Handle", value: displayUsername, icon: AtSign },
                    { label: "Legal Identity", value: displayName, icon: ShieldCheck },
                    { label: "Direct Line", value: isOwnProfile && localKyc ? localKyc.phoneCall : "+1 555-0123", icon: Phone },
                    { label: "Secure Email", value: isOwnProfile && localKyc ? localKyc.email : "sarah.m@example.com", icon: Mail },
                  ].map((item) => (
                    <div key={item.label} className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-2xl bg-gray-50 flex items-center justify-center text-[#FF8C00]">
                        <item.icon size={16} />
                      </div>
                      <div>
                        <p className="text-[9px] font-black text-[#0D1B3E]/30 uppercase tracking-widest mb-0.5">{item.label}</p>
                        <p className="text-[14px] font-bold text-[#0D1B3E]">{item.value}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {localKyc && (
                  <div className="p-4 rounded-2xl bg-[#00695C]/5 border border-[#00695C]/10 flex items-center gap-3">
                    <div className="w-8 h-8 rounded-xl bg-[#00695C] flex items-center justify-center text-white">
                      <ShieldCheck size={14} strokeWidth={3} />
                    </div>
                    <p className="text-[11px] font-black uppercase tracking-widest text-[#00695C]">Official Verified Member</p>
                  </div>
                )}
              </div>

              <div className="bg-[#FF8C00]/5 p-5 rounded-[28px] border border-[#FF8C00]/10">
                <p className="text-[11px] text-[#FF8C00] font-bold leading-relaxed text-center px-4">
                  Privacy First. These details are only visible to verified community members to ensure safe transactions.
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
