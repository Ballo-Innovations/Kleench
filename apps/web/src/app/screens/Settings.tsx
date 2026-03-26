import { Link, useNavigate } from "react-router";
import { PageHeader } from "../components/PageHeader";
import { ChevronRight, User, Shield, Bell, Lock, Key, Moon, Globe, HelpCircle, LogOut, X } from "lucide-react";
import { motion } from "motion/react";
import kleenchLogo from "@/assets/kleench_logo.png";

export function Settings() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("hasCompletedOnboarding");
    navigate("/login");
  };

  const settingsSections = [
    {
      title: "Profile Settings",
      items: [
        { icon: User, label: "Edit Profile", path: "/profile-edit", color: "#0077B6" },
        { icon: Globe, label: "Language", path: null, color: "#0077B6", action: () => alert("Language settings coming soon!") },
      ],
    },
    {
      title: "Privacy Settings",
      items: [
        { icon: Key, label: "Change PIN", path: "/settings/change-pin", color: "#7C3AED" },
        { icon: Lock, label: "Change Password", path: "/settings/change-password", color: "#7C3AED" },
        { icon: Shield, label: "Privacy & Security", path: null, color: "#7C3AED", action: () => alert("Privacy & Security settings coming soon!") },
      ],
    },
    {
      title: "Notifications Settings",
      items: [
        { icon: Bell, label: "Push Notifications", path: null, color: "#FFC300", action: () => alert("Push Notification settings coming soon!") },
        { icon: Moon, label: "Do Not Disturb", path: null, color: "#FFC300", action: () => alert("Do Not Disturb settings coming soon!") },
      ],
    },
    {
      title: "Support",
      items: [
        { icon: HelpCircle, label: "Help Center", path: null, color: "#10B981", action: () => window.open("mailto:support@kleench.com", "_blank") },
        { icon: LogOut, label: "Log Out", path: null, color: "#E11D48", action: handleLogout },
      ],
    },
  ];

  function grace(delay = 0) {
    return {
      duration: 0.62,
      delay,
      ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
    };
  }

  return (
    <div className="w-full relative min-h-screen bg-gray-50 overflow-x-hidden font-sans pb-10">
      
      {/* ── Unified cross-hatch bg ── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 0 }}>
        <svg width="100%" height="100%" style={{ position: "absolute", inset: 0 }}>
          <defs>
            <pattern id="xhatch-settings" x="0" y="0" width="24" height="24" patternUnits="userSpaceOnUse">
              <line x1="0" y1="0" x2="24" y2="24" stroke="#FF8C00" strokeWidth="0.5" strokeOpacity="0.07"/>
              <line x1="24" y1="0" x2="0" y2="24" stroke="#FF8C00" strokeWidth="0.5" strokeOpacity="0.07"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#xhatch-settings)"/>
        </svg>
      </div>

      {/* ── Standardized Orange Header ── */}
      <PageHeader 
        title="Settings" 
        subtitle="Manage your account and preferences"
        top={
          <div className="flex items-center justify-between h-10 gap-2">
            <Link to="/" className="flex items-center gap-2">
              <img src={kleenchLogo} alt="KLEENCH" className="h-8 w-auto object-contain brightness-0 invert" />
              <span className="text-white font-black text-xl tracking-tight opacity-90" style={{ fontFamily: "system-ui, -apple-system, sans-serif" }}>Account</span>
            </Link>
            <Link to="/">
              <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md border border-white/10 text-white flex items-center justify-center shadow-sm transition-all hover:bg-white/30 active:scale-95">
                <X size={20} />
              </div>
            </Link>
          </div>
        }
      />

      {/* Settings Sections */}
      <div className="px-5 relative z-10 space-y-6">
        {settingsSections.map((section, sectionIdx) => (
          <motion.div
            key={section.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={grace(sectionIdx * 0.1)}
          >
            <h2 className="text-[#0D1B3E]/40 text-[10px] font-bold uppercase tracking-wider mb-2.5 px-1">
              {section.title}
            </h2>
            <div className="bg-white rounded-3xl overflow-hidden shadow-sm border border-black/[0.03]">
              {section.items.map((item, idx) => {
                const Icon = item.icon;
                const isLast = idx === section.items.length - 1;

                if (item.path) {
                  return (
                    <Link
                      key={item.label}
                      to={item.path}
                      className={`flex items-center gap-3 px-4 py-4 transition-all duration-200 hover:bg-black/[0.01] active:bg-black/[0.03] ${
                        !isLast ? "border-b border-black/[0.03]" : ""
                      }`}
                    >
                      <div
                        className="w-10 h-10 rounded-2xl flex items-center justify-center"
                        style={{ backgroundColor: `${item.color}10` }}
                      >
                        <Icon size={18} style={{ color: item.color }} strokeWidth={2.5} />
                      </div>
                      <span className="flex-1 text-[#0D1B3E] text-sm font-bold">
                        {item.label}
                      </span>
                      <ChevronRight size={16} className="text-[#0D1B3E]/20" strokeWidth={2.5} />
                    </Link>
                  );
                }

                return (
                  <button
                    key={item.label}
                    onClick={item.action}
                    className={`flex items-center gap-3 px-4 py-4 transition-all duration-200 hover:bg-black/[0.01] active:bg-black/[0.03] w-full text-left ${
                      !isLast ? "border-b border-black/[0.03]" : ""
                    }`}
                  >
                    <div
                      className="w-10 h-10 rounded-2xl flex items-center justify-center"
                      style={{ backgroundColor: `${item.color}10` }}
                    >
                      <Icon size={18} style={{ color: item.color }} strokeWidth={2.5} />
                    </div>
                    <span className="flex-1 text-[#0D1B3E] text-sm font-bold">
                      {item.label}
                    </span>
                    <ChevronRight size={16} className="text-[#0D1B3E]/20" strokeWidth={2.5} />
                  </button>
                );
              })}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Version Info */}
      <div className="mt-10 text-center opacity-30">
        <p className="text-[#0D1B3E] text-[10px] font-bold tracking-widest uppercase">
          Kleench v1.0.0
        </p>
      </div>
    </div>
  );
}
