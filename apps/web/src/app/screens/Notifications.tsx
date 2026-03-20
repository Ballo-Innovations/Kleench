import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Settings, Check } from "lucide-react";
import { Link } from "react-router";
import { LottieIcon } from "../components/LottieIcon";
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

      {/* Header */}
      <div className="relative z-10 pt-2 pb-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <LottieIcon icon="bell" size={40} />
          <div>
            <h1 className="font-bold text-[#0D1B3E] tracking-tight" style={{ fontFamily: "Agrandir, sans-serif", fontSize: "1.4rem" }}>
              Notifications
            </h1>
            {unreadCount > 0 && (
              <p className="text-[11px] font-semibold mt-0.5" style={{ color: "#FF8C00" }}>
                {unreadCount} new updates
              </p>
            )}
          </div>
        </div>
        <div className="flex items-center gap-2">
          {unreadCount > 0 && (
            <motion.button whileTap={{ scale: 0.94 }} onClick={markAllRead}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full font-bold border"
              style={{ fontSize: "10px", background: "#FFF7ED", color: "#FF8C00", borderColor: "#FDDCB5" }}>
              <Check size={10} strokeWidth={3} /> Mark all read
            </motion.button>
          )}
          <Link to="/settings">
            <div className="w-9 h-9 rounded-full bg-white shadow-sm border border-black/[0.04] flex items-center justify-center" style={{ borderColor: "rgba(13,27,62,0.06)" }}>
              <Settings size={15} style={{ color: "#0D1B3E" }} opacity={0.5}/>
            </div>
          </Link>
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
