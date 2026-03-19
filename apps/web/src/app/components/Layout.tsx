import { Outlet, useLocation, Link, useNavigate } from "react-router";
import { Home, Users, Video, GraduationCap, Wallet, Plus, ImageIcon, Radio, Settings } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useState, useEffect } from "react";
import kleenchLogo from "@/assets/bab9fb3e64d4405d56f0e16a36664614cf4a09f8.png";

// Layout component with navigation
export function Layout() {
  const location = useLocation();
  const navigate = useNavigate();
  const [keyboardOpen, setKeyboardOpen] = useState(false);
  const [createOpen, setCreateOpen] = useState(false);

  useEffect(() => {
    const viewport = window.visualViewport;
    if (!viewport) return;

    const handleResize = () => {
      // If visible height shrinks by more than 150px, keyboard is likely open
      const shrinkage = window.innerHeight - viewport.height;
      setKeyboardOpen(shrinkage > 150);
    };

    viewport.addEventListener("resize", handleResize);
    return () => viewport.removeEventListener("resize", handleResize);
  }, []);

  const navItemsLeft = [
    { path: "/", icon: Home, label: "Home" },
    { path: "/friends", icon: Users, label: "Friends" },
  ];
  const navItemsRight = [
    { path: "/learning", icon: GraduationCap, label: "Learn" },
    { path: "/wallet", icon: Wallet, label: "Wallet" },
  ];

  const createOptions = [
    { icon: Video, label: "Videos", color: "#0077B6", path: "/videos" },
    { icon: ImageIcon, label: "Photos", color: "#7C3AED", path: "/videos" },
    { icon: Radio, label: "Go Live", color: "#E11D48", path: "/videos" },
  ];

  const isActive = (path: string) => {
    if (path === "/") return location.pathname === "/";
    return location.pathname.startsWith(path);
  };

  return (
    <div className="min-h-screen bg-[var(--clean-slate)] relative w-full max-w-md mx-auto overflow-hidden">
      {/* Ambient background - subtle white depth */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[500px] h-[250px] bg-[var(--trust-blue)] opacity-[0.03] rounded-full blur-[100px]" />
        <div className="absolute bottom-0 right-0 w-[300px] h-[200px] bg-[var(--action-gold)] opacity-[0.02] rounded-full blur-[80px]" />
        {/* Subtle grid pattern for depth */}
        <div className="absolute inset-0 opacity-[0.015]" 
          style={{
            backgroundImage: `linear-gradient(rgba(0, 119, 182, 0.1) 1px, transparent 1px),
                               linear-gradient(90deg, rgba(0, 119, 182, 0.1) 1px, transparent 1px)`,
            backgroundSize: '60px 60px'
          }}
        />
      </div>

      {/* Top Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-40 max-w-md mx-auto">
        <div className="mx-3 mt-3 px-4 h-14 flex items-center justify-between rounded-2xl glass-strong shadow-md">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <img
              src={kleenchLogo}
              alt="Kleench Technologies Ltd"
              className="h-8 w-auto object-contain"
            />
            <span
              className="font-[var(--font-header)] text-[var(--ink-primary)] tracking-tight ml-2"
              style={{ fontSize: "18px", fontWeight: 800, letterSpacing: "-0.02em" }}
            >
              KLEENCH
            </span>
          </Link>

          {/* Settings Button */}
          <Link to="/settings">
            <motion.button
              whileTap={{ scale: 0.9 }}
              className="w-9 h-9 rounded-xl bg-[var(--surface-raised)] flex items-center justify-center relative shadow-sm border border-black/[0.04]"
            >
              <Settings size={18} className="text-[var(--ink-secondary)]" />
            </motion.button>
          </Link>
        </div>
      </nav>

      {/* Main Content - Mobile constrained */}
      <main className="pt-20 pb-32 px-4 relative z-10 w-full">
        <Outlet />
      </main>

      {/* Create menu backdrop */}
      <AnimatePresence>
        {createOpen && (
          <motion.div
            className="fixed inset-0 z-40 max-w-md mx-auto"
            style={{ backgroundColor: "rgba(0,0,0,0.35)", backdropFilter: "blur(3px)" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setCreateOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Bottom Navigation - Mobile constrained */}
      <motion.nav
        className="fixed bottom-0 left-0 right-0 z-50 pb-4 max-w-md mx-auto"
        animate={keyboardOpen ? { y: 120, opacity: 0, pointerEvents: "none" } : { y: 0, opacity: 1, pointerEvents: "auto" }}
        transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="px-3">
          {/* Tab Bar */}
          <div className="rounded-2xl glass-strong shadow-lg px-2 py-2 relative border border-black/[0.04]">
            <div className="flex items-center justify-around">
              {/* Left nav items */}
              {navItemsLeft.map((item) => {
                const Icon = item.icon;
                const active = isActive(item.path);
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className="relative flex flex-col items-center gap-1 px-3 py-2 min-w-[52px]"
                  >
                    <Icon
                      size={20}
                      className={`relative z-10 transition-all duration-300 ${
                        active ? "text-[var(--trust-blue)]" : "text-[var(--ink-muted)]"
                      }`}
                      strokeWidth={active ? 2.5 : 1.8}
                    />
                    <span
                      className={`relative z-10 text-[9px] font-[var(--font-body)] tracking-wide transition-colors duration-300 ${
                        active ? "text-[var(--trust-blue)] font-bold" : "text-[var(--ink-muted)]"
                      }`}
                    >
                      {item.label}
                    </span>
                  </Link>
                );
              })}

              {/* Centre red create button */}
              <div className="relative flex flex-col items-center min-w-[52px]">
                {/* Floating oval options */}
                <AnimatePresence>
                  {createOpen && createOptions.map((opt, i) => {
                    const OptIcon = opt.icon;
                    // Create an arc pattern: left, top-center, right
                    const angle = (i - 1) * 60; // -60deg, 0deg, 60deg for wider spread
                    const radius = 95;
                    const offsetX = Math.sin(angle * Math.PI / 180) * radius;
                    const offsetY = -Math.cos(angle * Math.PI / 180) * radius - 10;
                    return (
                      <motion.button
                        key={opt.label}
                        className="absolute flex items-center justify-center gap-2.5 px-5 py-3 rounded-full shadow-xl text-white text-[11px] font-[var(--font-body)] font-semibold whitespace-nowrap z-10"
                        style={{ backgroundColor: opt.color, bottom: "56px", left: "50%", transformOrigin: "bottom center" }}
                        initial={{ opacity: 0, x: "-50%", y: 0, scale: 0.5 }}
                        animate={{ opacity: 1, x: `calc(-50% + ${offsetX}px)`, y: offsetY, scale: 1 }}
                        exit={{ opacity: 0, x: "-50%", y: 0, scale: 0.5 }}
                        transition={{ type: "spring", bounce: 0.35, duration: 0.4, delay: i * 0.06 }}
                        onClick={() => {
                          setCreateOpen(false);
                          navigate(opt.path);
                        }}
                      >
                        <OptIcon size={15} strokeWidth={2.5} />
                        {opt.label}
                      </motion.button>
                    );
                  })}
                </AnimatePresence>

                {/* The red + button */}
                <motion.button
                  whileTap={{ scale: 0.88 }}
                  animate={createOpen ? { rotate: 45 } : { rotate: 0 }}
                  transition={{ type: "spring", bounce: 0.4, duration: 0.35 }}
                  className="w-12 h-12 rounded-full bg-[#E11D48] flex items-center justify-center shadow-lg border-2 border-white/20 relative z-20"
                  onClick={() => setCreateOpen((v) => !v)}
                >
                  <Plus size={22} className="text-white" strokeWidth={3} />
                </motion.button>
              </div>

              {/* Right nav items */}
              {navItemsRight.map((item) => {
                const Icon = item.icon;
                const active = isActive(item.path);
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className="relative flex flex-col items-center gap-1 px-3 py-2 min-w-[52px]"
                  >
                    <Icon
                      size={20}
                      className={`relative z-10 transition-all duration-300 ${
                        active ? "text-[var(--trust-blue)]" : "text-[var(--ink-muted)]"
                      }`}
                      strokeWidth={active ? 2.5 : 1.8}
                    />
                    <span
                      className={`relative z-10 text-[9px] font-[var(--font-body)] tracking-wide transition-colors duration-300 ${
                        active ? "text-[var(--trust-blue)] font-bold" : "text-[var(--ink-muted)]"
                      }`}
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