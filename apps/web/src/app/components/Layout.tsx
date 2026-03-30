import { Outlet, useLocation, Link, useMatches } from "react-router";
import { Home, Wallet, Megaphone, GraduationCap, Users, Menu, X, Store, HeartHandshake, ShieldCheck } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useState, useEffect } from "react";

// Layout component with navigation
export function Layout() {
  const location = useLocation();
  const [keyboardOpen, setKeyboardOpen] = useState(false);
  const [showMore, setShowMore] = useState(false);

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
    { path: "/learning", id: "learn", icon: GraduationCap, label: "Learn" },
    { path: "/socials", id: "socials", icon: Users, label: "Socials" }
  ];

  const isActive = (path: string) => {
    if (path === "/") return location.pathname === "/";
    return location.pathname.startsWith(path);
  };

  const matches = useMatches();
  const isNotFound = matches.some(m => m.id === "notfound");
  const isFullBleed = 
    location.pathname === "/" || 
    location.pathname === "/advert" || 
    location.pathname === "/socials" || 
    location.pathname === "/friends" || 
    location.pathname === "/wallet" || 
    location.pathname === "/marketplace" || 
    location.pathname === "/profile" || 
    location.pathname.startsWith("/learning") || 
    location.pathname === "/referral" || 
    location.pathname === "/notifications" || 
    location.pathname === "/discover" || 
    location.pathname === "/offers" || 
    location.pathname === "/messages" || 
    location.pathname.startsWith("/settings") ||
    isNotFound;

  return (
    <div className="min-h-[100dvh] bg-[#fcfcfc] relative w-full md:max-w-md mx-auto overflow-x-hidden shadow-2xl md:border-x border-gray-200">
      {/* ── GLOBAL DASHED GRID BACKGROUND ── */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-white">
        <div
          className="absolute inset-0 z-0 opacity-[0.3]"
          style={{
            backgroundImage: `
              linear-gradient(to right, #d6d3d1 1px, transparent 1px),
              linear-gradient(to bottom, #d6d3d1 1px, transparent 1px)
            `,
            backgroundSize: "20px 20px",
            backgroundPosition: "0 0, 0 0",
            maskImage: `
              repeating-linear-gradient(
                to right,
                black 0px,
                black 3px,
                transparent 3px,
                transparent 8px
              ),
              repeating-linear-gradient(
                to bottom,
                black 0px,
                black 3px,
                transparent 3px,
                transparent 8px
              )
            `,
            WebkitMaskImage: `
              repeating-linear-gradient(
                to right,
                black 0px,
                black 3px,
                transparent 3px,
                transparent 8px
              ),
              repeating-linear-gradient(
                to bottom,
                black 0px,
                black 3px,
                transparent 3px,
                transparent 8px
              )
            `,
            maskComposite: "intersect",
            WebkitMaskComposite: "source-in",
          }}
        />
        {/* Subtle Brand Ambiance */}
        <div className="absolute top-[-10%] right-[-5%] w-[400px] h-[400px] bg-[#ff8c00]/5 rounded-full blur-[100px]" />
      </div>


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
        <div className="flex justify-around items-center px-1 pt-3 pb-4">
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
                  size={20}
                  strokeWidth={active ? 2.5 : 2}
                  className="mb-1"
                />
                <span className="text-[9px] font-bold capitalize">{item.label}</span>
              </Link>
            );
          })}
          
          {/* More Tab */}
          <button
            onClick={() => setShowMore(true)}
            className={`flex flex-col items-center flex-1 transition-all duration-300 outline-none ${
              showMore ? "text-[#005a8d]" : "text-gray-400 hover:text-[#005a8d]"
            }`}
          >
            <Menu size={20} strokeWidth={showMore ? 2.5 : 2} className="mb-1" />
            <span className="text-[9px] font-bold capitalize">More</span>
          </button>
        </div>
      </motion.nav>

      {/* MORE MENU MODAL */}
      <AnimatePresence>
        {showMore && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[60] bg-[#003366]/60 backdrop-blur-sm md:max-w-md mx-auto"
              onClick={() => setShowMore(false)}
            />
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed bottom-0 left-0 right-0 z-[70] w-full md:max-w-md mx-auto bg-white rounded-t-[32px] overflow-hidden shadow-2xl pb-[env(safe-area-inset-bottom)]"
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-black text-[#003366] uppercase tracking-tighter">Explore More</h3>
                  <button onClick={() => setShowMore(false)} className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 hover:bg-gray-200 hover:text-[#003366] transition-colors">
                    <X size={18} />
                  </button>
                </div>
                
                <div className="grid grid-cols-1 gap-3">
                  <Link to="/marketplace" onClick={() => setShowMore(false)} className="flex items-center gap-4 p-4 border-2 border-[#003366] bg-[#003366]/[0.02] shadow-[4px_4px_0px_#003366] active:translate-x-1 active:translate-y-1 active:shadow-none transition-all group">
                    <div className="w-10 h-10 border-2 border-[#003366] bg-white flex items-center justify-center flex-shrink-0 group-hover:bg-[#FF8C00] group-hover:border-[#FF8C00] group-hover:text-white transition-colors">
                      <Store size={20} strokeWidth={2.5} />
                    </div>
                    <div>
                      <h4 className="text-[14px] font-black text-[#003366] uppercase tracking-tight">Marketplace</h4>
                      <p className="text-[10px] font-bold text-[#003366]/50 uppercase tracking-widest leading-snug">Shop securely with Escrow</p>
                    </div>
                  </Link>

                  <Link to="/crs" onClick={() => setShowMore(false)} className="flex items-center gap-4 p-4 border-2 border-[#003366] bg-[#003366]/[0.02] shadow-[4px_4px_0px_#003366] active:translate-x-1 active:translate-y-1 active:shadow-none transition-all group">
                    <div className="w-10 h-10 border-2 border-[#003366] bg-white flex items-center justify-center flex-shrink-0 group-hover:bg-[#FF8C00] group-hover:border-[#FF8C00] group-hover:text-white transition-colors">
                      <ShieldCheck size={20} strokeWidth={2.5} />
                    </div>
                    <div>
                      <h4 className="text-[14px] font-black text-[#003366] uppercase tracking-tight">CRS Score</h4>
                      <p className="text-[10px] font-bold text-[#003366]/50 uppercase tracking-widest leading-snug">Check your reliable score</p>
                    </div>
                  </Link>

                  <Link to="/crowdfunding" onClick={() => setShowMore(false)} className="flex items-center gap-4 p-4 border-2 border-[#003366] bg-[#003366]/[0.02] shadow-[4px_4px_0px_#003366] active:translate-x-1 active:translate-y-1 active:shadow-none transition-all group">
                    <div className="w-10 h-10 border-2 border-[#003366] bg-white flex items-center justify-center flex-shrink-0 group-hover:bg-[#FF8C00] group-hover:border-[#FF8C00] group-hover:text-white transition-colors">
                      <HeartHandshake size={20} strokeWidth={2.5} />
                    </div>
                    <div>
                      <h4 className="text-[14px] font-black text-[#003366] uppercase tracking-tight">Crowdfunding</h4>
                      <p className="text-[10px] font-bold text-[#003366]/50 uppercase tracking-widest leading-snug">Support verified projects</p>
                    </div>
                  </Link>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}