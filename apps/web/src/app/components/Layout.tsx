import { Outlet, useLocation, Link } from "react-router";
import { Home, Compass, HeartHandshake, Tag, User, Settings } from "lucide-react";
import { motion } from "motion/react";
import { useState, useEffect } from "react";
import kleenchLogo from "@/assets/kleench_logo.png";

// Layout component with navigation
export function Layout() {
  const location = useLocation();
  const [keyboardOpen, setKeyboardOpen] = useState(false);

  useEffect(() => {
    const viewport = window.visualViewport;
    if (!viewport) return;

    const handleResize = () => {
      const shrinkage = window.innerHeight - viewport.height;
      setKeyboardOpen(shrinkage > 150);
    };

    viewport.addEventListener("resize", handleResize);
    return () => viewport.removeEventListener("resize", handleResize);
  }, []);

  const navItems = [
    { path: "/", icon: Home, label: "Home" },
    { path: "/discover", icon: Compass, label: "Discover" },
    { path: "/sowela", icon: HeartHandshake, label: "Sowela" },
    { path: "/marketplace", icon: Tag, label: "Sell" },
    { path: "/profile", icon: User, label: "Profile" },
  ];

  const isActive = (path: string) => {
    if (path === "/") return location.pathname === "/";
    return location.pathname.startsWith(path);
  };

  return (
    <div className="min-h-screen bg-[#fcfcfc] relative w-full max-w-md mx-auto overflow-hidden">
      {/* Premium white background with subtle depth grid */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] bg-[#ff8c00]/5 rounded-[100%] blur-[80px]" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] bg-[#515d84]/5 rounded-[100%] blur-[80px]" />
        <div 
          className="absolute inset-0 opacity-[0.5]"
          style={{
            backgroundImage: `linear-gradient(rgba(0,0,0,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.02) 1px, transparent 1px)`,
            backgroundSize: `32px 32px`
          }}
        />
        <div 
          className="absolute inset-0 opacity-[0.2]"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(0,0,0,0.05) 1px, transparent 0)`,
            backgroundSize: `8px 8px`
          }}
        />
      </div>

      {/* Top Navigation - Optional top spacing for Home headers which handle their own top bars now, 
          but if needed globally we can keep it. The Home screen has its own header so we might not need this everywhere.
          Assuming we keep it minimal or hidden conditionally if on Home, but for now we render it. */}
      {location.pathname !== "/" && (
        <nav className="fixed top-0 left-0 right-0 z-40 max-w-md mx-auto">
          <div className="mx-3 mt-3 px-4 h-14 flex items-center justify-between rounded-2xl bg-white shadow-sm border border-gray-100">
            {/* Logo */}
            <Link to="/" className="flex items-center">
              <img
                src={kleenchLogo}
                alt="Kleench"
                className="h-10 w-auto object-contain"
              />
            </Link>

            {/* Settings Button */}
            <Link to="/settings">
              <motion.button
                whileTap={{ scale: 0.9 }}
                className="w-9 h-9 rounded-xl bg-gray-50 flex items-center justify-center relative shadow-sm border border-gray-100"
              >
                <Settings size={18} className="text-gray-500" />
              </motion.button>
            </Link>
          </div>
        </nav>
      )}

      {/* Main Content - Mobile constrained */}
      <main className={`pb-32 relative z-10 w-full ${location.pathname !== "/" ? "pt-20 px-4" : ""}`}>
        <Outlet />
      </main>

      {/* Bottom Navigation - Mobile constrained */}
      <motion.nav
        className="fixed bottom-0 left-0 right-0 z-50 pb-4 max-w-md mx-auto"
        animate={keyboardOpen ? { y: 120, opacity: 0, pointerEvents: "none" } : { y: 0, opacity: 1, pointerEvents: "auto" }}
        transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="px-3">
          {/* Tab Bar */}
          <div className="rounded-[24px] bg-white shadow-[0_8px_30px_rgba(0,0,0,0.08)] px-2 py-3 relative border border-gray-100">
            <div className="flex items-center justify-between px-2">
              {navItems.map((item) => {
                const Icon = item.icon;
                const active = isActive(item.path);
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className="relative flex flex-col items-center gap-1.5 px-3 py-1 flex-1"
                  >
                    {active && (
                      <motion.div 
                        layoutId="nav-bg"
                        className="absolute inset-0 bg-orange-50 rounded-xl"
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                      />
                    )}
                    <Icon
                      size={24}
                      className={`relative z-10 transition-all duration-300 ${
                        active ? "text-[#ff8c00] fill-[#ff8c00]/10" : "text-gray-400"
                      }`}
                      strokeWidth={active ? 2.5 : 2}
                    />
                    <span
                      className={`relative z-10 text-[10px] tracking-wide transition-colors duration-300 ${
                        active ? "text-[#ff8c00] font-bold" : "text-gray-400 font-medium"
                      }`}
                      style={{ fontFamily: active ? 'Agrandir, sans-serif' : 'var(--font-body)' }}
                    >
                      {item.label}
                    </span>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </motion.nav>
    </div>
  );
}