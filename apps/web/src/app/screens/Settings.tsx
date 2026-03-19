import { Link, useNavigate } from "react-router";
import { ChevronRight, User, Shield, Bell, Lock, Key, Moon, Globe, HelpCircle, LogOut } from "lucide-react";
import { motion } from "motion/react";

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

  return (
    <div className="w-full max-w-md mx-auto pb-4">
      {/* Header */}
      <div className="mb-4">
        <h1
          className="font-[var(--font-header)] text-[var(--ink-primary)] mb-1"
          style={{ fontSize: "24px", fontWeight: 800, letterSpacing: "-0.02em" }}
        >
          Settings
        </h1>
        <p className="text-[var(--ink-secondary)] text-xs font-[var(--font-body)]">
          Manage your account and preferences
        </p>
      </div>

      {/* Settings Sections */}
      <div className="space-y-4">
        {settingsSections.map((section, sectionIdx) => (
          <motion.div
            key={section.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: sectionIdx * 0.1 }}
          >
            <h2 className="text-[var(--ink-secondary)] text-[10px] font-[var(--font-body)] font-semibold uppercase tracking-wider mb-2 px-1">
              {section.title}
            </h2>
            <div className="glass-strong rounded-xl overflow-hidden shadow-md border border-black/[0.04]">
              {section.items.map((item, idx) => {
                const Icon = item.icon;
                const isLast = idx === section.items.length - 1;

                if (item.path) {
                  return (
                    <Link
                      key={item.label}
                      to={item.path}
                      className={`flex items-center gap-3 px-3 py-3 transition-all duration-200 hover:bg-black/[0.02] active:bg-black/[0.04] ${
                        !isLast ? "border-b border-black/[0.06]" : ""
                      }`}
                    >
                      <div
                        className="w-9 h-9 rounded-lg flex items-center justify-center"
                        style={{ backgroundColor: `${item.color}15` }}
                      >
                        <Icon size={16} style={{ color: item.color }} strokeWidth={2} />
                      </div>
                      <span className="flex-1 font-[var(--font-body)] text-[var(--ink-primary)] text-xs font-medium">
                        {item.label}
                      </span>
                      <ChevronRight size={16} className="text-[var(--ink-muted)]" strokeWidth={2} />
                    </Link>
                  );
                }

                return (
                  <button
                    key={item.label}
                    onClick={item.action}
                    className={`flex items-center gap-3 px-3 py-3 transition-all duration-200 hover:bg-black/[0.02] active:bg-black/[0.04] w-full text-left ${
                      !isLast ? "border-b border-black/[0.06]" : ""
                    }`}
                  >
                    <div
                      className="w-9 h-9 rounded-lg flex items-center justify-center"
                      style={{ backgroundColor: `${item.color}15` }}
                    >
                      <Icon size={16} style={{ color: item.color }} strokeWidth={2} />
                    </div>
                    <span className="flex-1 font-[var(--font-body)] text-[var(--ink-primary)] text-xs font-medium">
                      {item.label}
                    </span>
                    <ChevronRight size={16} className="text-[var(--ink-muted)]" strokeWidth={2} />
                  </button>
                );
              })}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Version Info */}
      <div className="mt-6 text-center">
        <p className="text-[var(--ink-muted)] text-[10px] font-[var(--font-body)]">
          Kleench v1.0.0
        </p>
      </div>
    </div>
  );
}
