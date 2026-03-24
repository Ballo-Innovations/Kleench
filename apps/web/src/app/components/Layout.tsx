import { Outlet, useLocation, Link, useMatches } from "react-router";
import { Home, Settings, Wallet, Megaphone, GraduationCap, Users } from "lucide-react";
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
    { path: "/", id: "home", icon: Home, label: "Home" },
    { path: "/wallet", id: "wallet", icon: Wallet, label: "Wallet" },
    { path: "/advert", id: "advert", icon: Megaphone, label: "Advert" },
    { path: "/learn", id: "learn", icon: GraduationCap, label: "Learn" },
    { path: "/socials", id: "socials", icon: Users, label: "Socials" }
  ];

  const isActive = (path: string) => {
    if (path === "/") return location.pathname === "/";
    return location.pathname.startsWith(path);
  };

  const matches = useMatches();
  const isNotFound = matches.some(m => m.id === "notfound");
  const isFullBleed = location.pathname === "/" || location.pathname === "/socials" || isNotFound;

  return (
    <div className="min-h-[100dvh] bg-[#fcfcfc] relative w-full md:max-w-md mx-auto overflow-x-hidden shadow-2xl md:border-x border-gray-200">
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

      {/* Top Navigation */}
      {!isFullBleed && (
        <nav className="fixed top-0 left-0 right-0 z-40 w-full md:max-w-md mx-auto">
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

      {/* Main Content */}
      <main className={`relative z-10 w-full ${!isFullBleed ? "pt-20 px-4 pb-32" : ""}`}>
        <Outlet />
      </main>

      {/* Bottom Navigation */}
      <motion.nav
        className="fixed bottom-0 left-0 right-0 z-50 w-full md:max-w-md mx-auto bg-white/95 backdrop-blur-3xl border-t border-gray-100 shadow-[0_-15px_40px_rgba(0,0,0,0.04)] rounded-t-[32px] pb-[env(safe-area-inset-bottom)]"
        animate={keyboardOpen ? { y: 120, opacity: 0, pointerEvents: "none" } : { y: 0, opacity: 1, pointerEvents: "auto" }}
        transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="flex justify-around items-center px-2 pt-3 pb-4">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.path);
            return (
              <Link
                key={item.id}
                to={item.path}
                className={`flex flex-col items-center flex-1 transition-all duration-300 outline-none ${
                  active ? "text-[#005a8d]" : "text-gray-400 hover:text-[#005a8d]"
                }`}
              >
                <Icon
                  size={22}
                  strokeWidth={active ? 2.5 : 2}
                  className="mb-1"
                />
                <span className="text-[10px] font-bold capitalize">{item.label}</span>
              </Link>
            );
          })}
        </div>
      </motion.nav>
    </div>
  );
}