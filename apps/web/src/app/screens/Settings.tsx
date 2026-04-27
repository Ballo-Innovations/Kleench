import { Link, useNavigate } from "react-router";
import { PageHeader } from "../components/PageHeader";
import { ChevronRight, User, Shield, Bell, Lock, Key, Moon, Globe, HelpCircle, LogOut, Sun } from "lucide-react";
import { motion } from "motion/react";
import { useState, useEffect } from "react";

export function Settings() {
  const navigate = useNavigate();

  const [isDark, setIsDark] = useState(() => document.documentElement.classList.contains("dark"));

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    if (storedTheme === "dark") {
      document.documentElement.classList.add("dark");
      setIsDark(true);
    } else {
      document.documentElement.classList.remove("dark");
      setIsDark(false);
    }
  }, []);

  const toggleTheme = (mode: "light" | "dark") => {
    if (mode === "dark") {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
      setIsDark(true);
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
      setIsDark(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("hasCompletedOnboarding");
    navigate("/login");
  };

  type SettingsItem = 
    | { isToggle: true; icon: React.ElementType; label: string; mode: "light" | "dark"; color: string; path?: never; action?: never }
    | { isToggle?: false; icon: React.ElementType; label: string; path: string; color: string; mode?: never; action?: never }
    | { isToggle?: false; icon: React.ElementType; label: string; path: null | string; color: string; action: () => void; mode?: never };

  const settingsSections: { title: string; items: SettingsItem[] }[] = [
    {
      title: "App Preferences",
      items: [
        { isToggle: true, icon: Sun, label: "Light Mode", mode: "light", color: "#F59E0B" },
        { isToggle: true, icon: Moon, label: "Dark Mode", mode: "dark", color: "#374151" },
      ],
    },
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
    <div className="w-full relative min-h-screen bg-[var(--app-bg-muted)] overflow-x-hidden font-sans pb-10">
      
      {/* ── Unified cross-hatch bg ── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 0 }}>
        <svg width="100%" height="100%" style={{ position: "absolute", inset: 0 }}>
          <defs>
            <pattern id="xhatch-settings" x="0" y="0" width="24" height="24" patternUnits="userSpaceOnUse">
              <line x1="0" y1="0" x2="24" y2="24" stroke="var(--app-orange)" strokeWidth="0.5" strokeOpacity="0.07"/>
              <line x1="24" y1="0" x2="0" y2="24" stroke="var(--app-orange)" strokeWidth="0.5" strokeOpacity="0.07"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#xhatch-settings)"/>
        </svg>
      </div>

      <PageHeader 
        title="Settings" 
        subtitle="Manage your account and preferences"
        showBack
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
            <h2 className="text-[var(--app-text-alt)]/40 text-[10px] font-bold uppercase tracking-wider mb-2.5 px-1">
              {section.title}
            </h2>
            <div className="bg-[var(--app-bg)] rounded-3xl overflow-hidden shadow-sm border border-black/[0.03]">
              {section.items.map((item, idx) => {
                const Icon = item.icon;
                const isLast = idx === section.items.length - 1;

                if ('isToggle' in item && item.isToggle) {
                  const isActive = item.mode === "dark" ? isDark : !isDark;
                  return (
                    <div
                      key={item.label}
                      className={`flex items-center gap-3 px-4 py-4 transition-all duration-200/[0.01] ${
                        !isLast ? "border-b border-black/[0.03]" : ""
                      }`}
                    >
                      <div
                        className="w-10 h-10 rounded-2xl flex items-center justify-center"
                        style={{ backgroundColor: `${item.color}10` }}
                      >
                        <Icon size={18} style={{ color: item.color }} strokeWidth={2.5} />
                      </div>
                      <span className="flex-1 text-[var(--app-text-alt)] text-sm font-bold">
                        {item.label}
                      </span>
                      <button 
                        onClick={() => toggleTheme(item.mode)}
                        className={`w-12 h-6 rounded-full p-1 transition-colors flex items-center shadow-inner ${isActive ? "bg-[var(--app-orange)]" : "bg-gray-200"}`}
                      >
                        <motion.div 
                          initial={false}
                          animate={{ x: isActive ? 24 : 0 }}
                          className="w-4 h-4 rounded-full bg-[var(--app-bg)] shadow-sm"
                        />
                      </button>
                    </div>
                  );
                }

                if ('path' in item && item.path) {
                  return (
                    <Link
                      key={item.label}
                      to={item.path}
                      className={`flex items-center gap-3 px-4 py-4 transition-all duration-200/[0.01] active:bg-black/[0.03] ${
                        !isLast ? "border-b border-black/[0.03]" : ""
                      }`}
                    >
                      <div
                        className="w-10 h-10 rounded-2xl flex items-center justify-center"
                        style={{ backgroundColor: `${item.color}10` }}
                      >
                        <Icon size={18} style={{ color: item.color }} strokeWidth={2.5} />
                      </div>
                      <span className="flex-1 text-[var(--app-text-alt)] text-sm font-bold">
                        {item.label}
                      </span>
                      <ChevronRight size={16} className="text-[var(--app-text-alt)]/20" strokeWidth={2.5} />
                    </Link>
                  );
                }

                if ('action' in item && item.action) {
                  return (
                    <button
                      key={item.label}
                      onClick={item.action}
                      className={`flex items-center gap-3 px-4 py-4 transition-all duration-200/[0.01] active:bg-black/[0.03] w-full text-left ${
                        !isLast ? "border-b border-black/[0.03]" : ""
                      }`}
                    >
                      <div
                        className="w-10 h-10 rounded-2xl flex items-center justify-center"
                        style={{ backgroundColor: `${item.color}10` }}
                      >
                        <Icon size={18} style={{ color: item.color }} strokeWidth={2.5} />
                      </div>
                      <span className="flex-1 text-[var(--app-text-alt)] text-sm font-bold">
                        {item.label}
                      </span>
                      <ChevronRight size={16} className="text-[var(--app-text-alt)]/20" strokeWidth={2.5} />
                    </button>
                  );
                }
                
                return null;
              })}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Version Info */}
      <div className="mt-10 text-center opacity-30">
        <p className="text-[var(--app-text-alt)] text-[10px] font-bold tracking-widest uppercase">
          Kleench v1.0.0
        </p>
      </div>
    </div>
  );
}
