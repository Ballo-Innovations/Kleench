import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, Check } from "lucide-react";
import { Link } from "react-router";
import { LottieIcon } from "../components/LottieIcon";
import kleenchLogo from "@/assets/kleench_logo.png";
import adBanner from "@/assets/ads/Collective Impact Verified Efforts.png";

type NotifType = "all" | "earnings" | "security" | "social";

interface Notification {
  id: number;
  type: "earning" | "security" | "social" | "offer";
  title: string;
  body: string;
  time: string;
  read: boolean;
  icon: string;
  accentColor: string;
  bgColor: string;
}

const NOTIFS: Notification[] = [
  { id: 1, type: "earning",  title: "K5.00 Earned!",           body: "Your referral Chanda M. completed their first purchase.",   time: "2m ago",    read: false, icon: "coin",    accentColor: "#FF8C00", bgColor: "#FFF7ED" },
  { id: 2, type: "security", title: "Login from new device",   body: "A new sign-in was detected from Lusaka, Zambia.",          time: "14m ago",   read: false, icon: "shield",  accentColor: "#00695C", bgColor: "#F0FDF9" },
  { id: 3, type: "social",   title: "Blessing liked your ad",  body: "Your Solar Lights promotion got 3 new reactions.",         time: "1h ago",    read: false, icon: "users",   accentColor: "#7C3AED", bgColor: "#FAF5FF" },
  { id: 4, type: "offer",    title: "Flash Offer: Cetane",     body: "Earn K1.00 per feedback. Offer expires in 2 hours.",       time: "2h ago",    read: true,  icon: "gift",    accentColor: "#FF8C00", bgColor: "#FFF7ED" },
  { id: 5, type: "earning",  title: "K0.20 Reward Added",      body: "You watched an advert from AgriBoost Zambia.",             time: "5h ago",    read: true,  icon: "coin",    accentColor: "#FF8C00", bgColor: "#FFF7ED" },
  { id: 6, type: "security", title: "PIN Changed",             body: "Your security PIN was updated at 10:41 AM.",               time: "Yesterday", read: true,  icon: "lock",    accentColor: "#0D1B3E", bgColor: "#F0F4FF" },
  { id: 7, type: "social",   title: "New follower: Moses K.",  body: "Moses K. started following your seller profile.",          time: "Yesterday", read: true,  icon: "share",   accentColor: "#00695C", bgColor: "#F0FDF9" },
];

const TABS = [
  { id: "all" as NotifType,      label: "All",      dot: "#FF8C00" },
  { id: "earnings" as NotifType, label: "Earnings", dot: "#FF8C00" },
  { id: "security" as NotifType, label: "Security", dot: "#00695C" },
  { id: "social" as NotifType,   label: "Social",   dot: "#7C3AED" },
];

const filterMap: Record<NotifType, string | null> = {
  all: null, earnings: "earning", security: "security", social: "social",
};

export function Notifications() {
  const [activeTab, setActiveTab] = useState<NotifType>("all");
  const [notifications, setNotifications] = useState(NOTIFS);

  const filtered = notifications.filter((n) => {
    const f = filterMap[activeTab];
    return f === null || n.type === f;
  });
  const unreadCount = notifications.filter((n) => !n.read).length;
  const markAllRead = () => setNotifications((p) => p.map((n) => ({ ...n, read: true })));
  const markRead = (id: number) => setNotifications((p) => p.map((n) => n.id === id ? { ...n, read: true } : n));

  return (
    <div className="w-full max-w-md mx-auto pb-6 relative">

      {/* ── Unified cross-hatch background ── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 0 }}>
        <svg width="100%" height="100%" style={{ position: "absolute", top: 0, left: 0 }}>
          <defs>
            <pattern id="xhatch-notif" x="0" y="0" width="24" height="24" patternUnits="userSpaceOnUse">
              <line x1="0" y1="0" x2="24" y2="24" stroke="#FF8C00" strokeWidth="0.5" strokeOpacity="0.07"/>
              <line x1="24" y1="0" x2="0" y2="24" stroke="#FF8C00" strokeWidth="0.5" strokeOpacity="0.07"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#xhatch-notif)"/>
        </svg>
        {/* Accent circle top-right */}
        <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full opacity-[0.06]"
          style={{ background: "radial-gradient(circle, #FF8C00, transparent)" }}/>
      </div>

      {/* ── Standardized Orange Header ── */}
      <div className="relative pt-4 pb-0 px-6 overflow-hidden rounded-b-[40px] flex flex-col justify-between h-[180px] mb-8"
        style={{ background: "linear-gradient(135deg, #FF8C00, #e06900)", boxShadow: "0 10px 30px rgba(255,140,0,0.12)" }}>
        
        {/* grid texture */}
        <div className="absolute inset-0 opacity-[0.1]">
          <svg width="100%" height="100%">
            <defs>
              <pattern id="notif-grid" width="20" height="20" patternUnits="userSpaceOnUse">
                <path d="M 20 0 L 0 0 0 20" fill="none" stroke="white" strokeWidth="0.5"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#notif-grid)"/>
          </svg>
        </div>

        <div className="relative z-10 flex items-center justify-between mt-2 h-10 gap-2">
          <Link to="/" className="flex items-center gap-2">
            <img src={kleenchLogo} alt="KLEENCH" className="h-8 w-auto object-contain brightness-0 invert" />
            <span className="text-white font-black text-xl tracking-tight opacity-90" style={{ fontFamily: "system-ui, -apple-system, sans-serif" }}>Updates</span>
          </Link>
          <Link to="/">
            <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md border border-white/10 text-white flex items-center justify-center shadow-sm transition-all hover:bg-white/30 active:scale-95">
              <X size={20} />
            </div>
          </Link>
        </div>

        <div className="relative z-10 flex items-end justify-between mb-8">
          <div className="space-y-1">
            <h1 className="text-white text-3xl font-black tracking-tight" style={{ fontFamily: "system-ui, -apple-system, sans-serif" }}>Notifications</h1>
            <p className="text-white/80 text-[13px] font-medium">{unreadCount > 0 ? `${unreadCount} new updates` : "All caught up"}</p>
          </div>
          {unreadCount > 0 && (
            <motion.button whileTap={{ scale: 0.94 }} onClick={markAllRead}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl font-bold bg-white text-[#FF8C00] shadow-lg shadow-black/10 text-[11px] mb-1">
              <Check size={14} strokeWidth={3} /> Mark all read
            </motion.button>
          )}
        </div>
      </div>

      {/* Banner Ad */}
      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.1, duration: 0.6 }}
        className="mb-8 rounded-[32px] overflow-hidden shadow-md border border-gray-100">
        <img src={adBanner} alt="Verified Efforts" className="w-full h-auto object-cover" />
      </motion.div>

      {/* Tabs */}
      <div className="relative z-10 flex gap-2 mb-5 overflow-x-auto pb-1" style={{ scrollbarWidth: "none" }}>
        {TABS.map((tab) => (
          <motion.button key={tab.id} whileTap={{ scale: 0.94 }}
            onClick={() => setActiveTab(tab.id)}
            className="flex items-center gap-1.5 px-4 py-1.5 rounded-full text-[11px] font-bold whitespace-nowrap border transition-all"
            style={activeTab === tab.id
              ? { background: "#0D1B3E", color: "#fff", borderColor: "#0D1B3E" }
              : { background: "white", color: "#0D1B3E", borderColor: "rgba(13,27,62,0.1)" }}>
            {activeTab === tab.id && <span className="w-1.5 h-1.5 rounded-full" style={{ background: tab.dot }}/>}
            {tab.label}
          </motion.button>
        ))}
      </div>

      {/* List */}
      <div className="relative z-10">
        <AnimatePresence mode="popLayout">
          {filtered.length === 0 ? (
            <motion.div key="empty" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
              className="text-center py-16">
              <div className="flex justify-center mb-4"><LottieIcon icon="empty" size={80} /></div>
              <p className="font-bold text-[#0D1B3E] mb-1">All caught up</p>
              <p className="text-[12px]" style={{ color: "rgba(13,27,62,0.4)" }}>Nothing here in this category</p>
            </motion.div>
          ) : (
            <div className="space-y-4">
              {filtered.map((notif, i) => (
                <motion.div key={notif.id} layout
                  initial={{ opacity: 0, y: 24 }}
                  animate={{
                    opacity: 1,
                    y: i % 2 === 1 ? 6 : 0,   /* staggered rhythm — odd cards sit 6px lower */
                  }}
                  exit={{ opacity: 0, scale: 0.97 }}
                  transition={{
                    delay: i * 0.07,
                    duration: 0.55,
                    ease: [0.22, 1, 0.36, 1],  /* graceful ease-out */
                  }}
                  whileTap={{ scale: 0.985 }}
                  onClick={() => markRead(notif.id)}
                  className="flex items-start gap-4 p-4 rounded-3xl border cursor-pointer"
                  style={{
                    background: notif.read ? "white" : notif.bgColor,
                    borderColor: notif.read ? "rgba(13,27,62,0.05)" : `${notif.accentColor}28`,
                    boxShadow: notif.read
                      ? "0 2px 12px rgba(13,27,62,0.04)"
                      : `0 4px 20px ${notif.accentColor}12`,
                    transition: "box-shadow 0.5s ease, border-color 0.5s ease",
                  }}>
                  {/* Icon — more generous container */}
                  <div className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0 overflow-hidden"
                    style={{ background: notif.bgColor }}>
                    <LottieIcon icon={notif.icon} size={40} />
                  </div>
                  <div className="flex-1 min-w-0 pt-0.5">
                    <div className="flex items-start justify-between gap-2 mb-1.5">
                      <p className="font-bold text-[13.5px] leading-snug" style={{ fontFamily: "Agrandir, sans-serif", color: "#0D1B3E" }}>
                        {notif.title}
                      </p>
                      <span className="text-[9px] font-semibold whitespace-nowrap flex-shrink-0 mt-0.5" style={{ color: "rgba(13,27,62,0.35)" }}>
                        {notif.time}
                      </span>
                    </div>
                    <p className="text-[11.5px] leading-relaxed" style={{ color: "rgba(13,27,62,0.55)", lineHeight: 1.6 }}>
                      {notif.body}
                    </p>
                  </div>
                  {!notif.read && (
                    <div className="w-2 h-2 rounded-full flex-shrink-0 mt-2" style={{ background: notif.accentColor }}/>
                  )}
                </motion.div>
              ))}
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
