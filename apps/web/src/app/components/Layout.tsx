import { Outlet, useLocation, Link, useMatches, useNavigate } from "react-router";
import { Home, Wallet, Megaphone, GraduationCap, Users, Menu, X, Store, HeartHandshake, ClipboardList, HandCoins, Briefcase } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useState, useEffect } from "react";
import { toast } from "sonner";

// Layout component with navigation
export function Layout() {
  const location = useLocation();
  const navigate = useNavigate();
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
    location.pathname.startsWith("/surveys") ||
    location.pathname === "/donate" ||
    location.pathname === "/crowdfunding" ||
    location.pathname === "/profile" || 
    location.pathname.startsWith("/learning") || 
    location.pathname === "/referral" || 
    location.pathname === "/notifications" || 
    location.pathname === "/discover" || 
    location.pathname === "/offers" || 
    location.pathname === "/messages" || 
    location.pathname.startsWith("/settings") ||
    location.pathname === "/onboarding-page" ||
    location.pathname === "/balance" ||
    location.pathname === "/withdraw" || 
    location.pathname === "/send" || 
    location.pathname === "/statements" || 
    location.pathname === "/pay-bills" || 
    location.pathname === "/scan-pay" || 
    location.pathname === "/global-transaction" || 
    location.pathname === "/escrow" || 
    location.pathname === "/deposit" || 
    location.pathname === "/savings" || 
    location.pathname === "/content-calculator" ||
    isNotFound;

  return (
    <div className="max-w-md mx-auto h-[100dvh] w-full relative bg-white overflow-y-auto overflow-x-hidden shadow-2xl scrollbar-hide">
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
      <main className={`relative w-full ${!isFullBleed ? "pt-20 px-4 pb-32" : ""}`}>
        <Outlet />
      </main>

      {/* Bottom Navigation */}
      <motion.nav
        className="fixed bottom-0 left-0 right-0 z-50 w-full max-w-md mx-auto bg-white/95 backdrop-blur-3xl border-t border-gray-100 shadow-[0_-15px_40px_rgba(0,0,0,0.04)] rounded-t-[32px] pb-[env(safe-area-inset-bottom)]"
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
                  active ? "text-[#FF8C00]" : "text-gray-400"
                }`}
              >
                <Icon
                  size={20}
                  strokeWidth={active ? 3 : 2}
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
              showMore || ["/marketplace", "/surveys-polls", "/poll/create", "/crowdfunding", "/donate"].includes(location.pathname) ? "text-[#FF8C00]" : "text-gray-400"
            }`}
          >
            <Menu size={20} strokeWidth={showMore || ["/marketplace", "/surveys-polls", "/poll/create", "/crowdfunding", "/donate"].includes(location.pathname) ? 3 : 2} className="mb-1" />
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
              className="fixed inset-0 z-[60] bg-[#003366]/60 backdrop-blur-sm max-w-md mx-auto"
              onClick={() => setShowMore(false)}
            />
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed bottom-0 left-0 right-0 z-[1000] w-full max-w-md mx-auto bg-white rounded-t-[40px] border-t-[3px] border-slate-900 shadow-[0_-20px_60px_rgba(0,0,0,0.3)] overflow-hidden pb-[env(safe-area-inset-bottom)]"
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-8">
                  <h3 className="text-xl font-black text-slate-900 uppercase tracking-tighter">Explore More</h3>
                  <button onClick={() => setShowMore(false)} className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 transition-all active:scale-90">
                    <X size={20} />
                  </button>
                </div>

                <div className="grid grid-cols-4 gap-x-2 gap-y-8 mb-10 px-2">
                  {[
                    { id: 'marketplace', icon: Store, label: 'Market', path: '/marketplace' },
                    { id: 'surveys', icon: ClipboardList, label: 'Surveys', path: '/surveys-polls' },
                    { id: 'donate', icon: HeartHandshake, label: 'Donate', path: '/donate' },
                    { id: 'crowdfund', icon: HandCoins, label: 'Invest', path: '/crowdfunding' },
                    { id: 'onboarding', icon: Briefcase, label: 'Onboard', path: '/onboarding-page' }
                  ].map((item) => (
                    <div 
                      key={item.id} 
                      onClick={() => { navigate(item.path); setShowMore(false); }}
                      className="flex flex-col items-center gap-2.5 group cursor-pointer active:scale-95 transition-all"
                    >
                      <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center border-2 border-slate-900 shadow-[3px_3px_0px_#0f172a] transition-all">
                        <item.icon size={22} className="text-slate-900" strokeWidth={2.5} />
                      </div>
                      <span className="text-[9px] font-black text-slate-900 uppercase tracking-widest text-center leading-tight px-1">
                        {item.label}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="bg-slate-50 p-4 rounded-3xl border-2 border-slate-900 shadow-[6px_6px_0px_#0f172a] mb-4">
                   <div className="flex items-center justify-between">
                      <div>
                         <p className="text-[10px] font-black text-slate-900 uppercase tracking-widest mb-1">Verify Account</p>
                         <p className="text-xs font-bold text-slate-500">Enable premium features</p>
                      </div>
                      <button onClick={() => toast.success("Verification framework initializing...")} className="px-4 py-2 bg-slate-900 text-white rounded-xl text-[10px] font-black uppercase tracking-widest active:scale-95 transition-all">
                        Verify
                      </button>
                   </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}