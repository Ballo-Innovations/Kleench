import { Link } from "react-router";
import { useState, useRef, useEffect } from "react";
import { PageHeader } from "../components/PageHeader";
import { ChevronRight, X, Phone, MessageCircle, MapPin, TrendingUp, TrendingDown, CheckCircle } from "lucide-react";
import {
  DuotoneTag as Tag,
  DuotoneFileText as FileText,
  DuotoneUserPlus as UserPlus,
  DuotoneBadgeCheck as BadgeCheck,
  DuotoneSearch as Search
} from "../components/DuotoneIcon";
import { motion, AnimatePresence } from "motion/react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { usePageLoading, PageSkeletons } from "../components/PageSkeletons";
import { toast } from "sonner";
import { useNavigate } from "react-router";
import smartphoneImg from "@/assets/products/smartphone.png";
import shoesImg from "@/assets/products/shoes.png";
import handbagImg from "@/assets/products/hand_bag.png";
import laptopImg from "@/assets/products/laptop.png";
import toyotaImg from "@/assets/toyota zambia.png";
import jetLogo from "@/assets/jet image.webp";
import pnpLogo from "@/assets/pick and pay logo.png";
import scentStoreImg from "@/assets/shops/scent_store.png";
import techHubImg from "@/assets/shops/tech_hub.png";
import styleAvenueImg from "@/assets/shops/style_avenue.png";
import greenleafImg from "@/assets/shops/greenleaf.png";

const MARKET_PRODUCTS = [
  { id: 1, title: "SMARTPHONE", price: "2,500", image: smartphoneImg },
  { id: 2, title: "SHOES", price: "275", image: shoesImg },
  { id: 3, title: "HAND BAG", price: "200", image: handbagImg },
  { id: 4, title: "LAPTOPS", price: "7,500", image: laptopImg },
];

const MARKET_INTEL = [
  { id: "maize", title: "MAIZE", price: "K280", change: "+5.7%", up: true, graph: "M 0 40 L 10 30 L 20 45 L 30 15 L 40 25" },
  { id: "fuel", title: "FUEL", price: "K29.50", change: "-4.8%", up: false, graph: "M 0 20 L 10 40 L 25 5 L 40 25" },
  { id: "zinc", title: "ZINC", price: "$2,400/t", change: "+3.9%", up: true, graph: "M 0 15 L 10 35 L 20 10 L 30 15 L 40 25" },
  { id: "cement", title: "CEMENT", price: "K150", change: "-3.2%", up: false, graph: "M 0 35 L 10 25 L 20 20 L 30 10 L 40 5" },
];

const BUSINESSES = [
  { id: 1, name: "TOYOTA ZAMBIA", category: "Automotive", logo: "TZ", image: toyotaImg, phone: "+260 211 123456" },
  { id: 2, name: "JET MOBILE ADS", category: "Digital Media", logo: "JM", image: jetLogo, phone: "+260 977 234567" },
  { id: 3, name: "PICK N PAY ZAMBIA", category: "Retail Store", logo: "PP", image: pnpLogo, phone: "+260 211 345678" },
];

const SEARCH_SUGGESTIONS = [
  "Smartphones", "Laptops", "Vehicles", "Photography services",
  "Web design", "Real estate", "Construction equipment", "Catering",
];

const getGreeting = () => {
  const h = new Date().getHours();
  if (h < 12) return "Good morning";
  if (h < 17) return "Good afternoon";
  return "Good evening";
};

type Notification = { text: string; type: "success" | "market" | "info"; href: string; dismiss: boolean };

export function Marketplace() {
  const loading = usePageLoading(850);
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("PRODUCTS");
  const [notification, setNotification] = useState<Notification | null>(null);
  const [showNotification, setShowNotification] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const searchRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    try {
      const products = JSON.parse(localStorage.getItem("kleench_products") || "null");
      const services = JSON.parse(localStorage.getItem("kleench_services") || "null");
      const userProducts = Array.isArray(products) ? products.filter((p: any) => p.sellerId === "user") : [];
      const userServices = Array.isArray(services) ? services.filter((s: any) => s.provider === "You") : [];

      if (userProducts.length > 0) {
        setNotification({ text: `"${userProducts[0].name}" is live on Featured Products`, type: "success", href: "/marketplace/featured", dismiss: true });
        return;
      }
      if (userServices.length > 0) {
        setNotification({ text: `"${userServices[0].name}" is active and visible to clients`, type: "success", href: "/marketplace/services", dismiss: true });
        return;
      }
      const bigMover = MARKET_INTEL.find((m) => Math.abs(parseFloat(m.change)) > 4);
      if (bigMover) {
        setNotification({ text: `${bigMover.title} ${bigMover.change} this week — tap to view forecast`, type: "market", href: `/marketplace/intel/${bigMover.id}`, dismiss: true });
      }
    } catch {}
  }, []);

  const notifColors = {
    success: { bg: "bg-[#059669]/8", border: "border-[#059669]/20", dot: "bg-[#059669]", text: "text-[#059669]", icon: CheckCircle },
    market: { bg: "bg-[var(--color-primary)]/8", border: "border-[var(--color-primary)]/20", dot: "bg-[var(--color-primary)]", text: "text-[var(--color-primary)]", icon: TrendingUp },
    info: { bg: "bg-[var(--color-secondary)]/8", border: "border-[var(--color-secondary)]/20", dot: "bg-[var(--color-secondary)]", text: "text-[var(--color-secondary)]", icon: CheckCircle },
  };

  const filteredSuggestions = searchQuery.length > 0
    ? SEARCH_SUGGESTIONS.filter((s) => s.toLowerCase().includes(searchQuery.toLowerCase()))
    : SEARCH_SUGGESTIONS.slice(0, 5);

  const handleAction = (label: string) => {
    if (label === "SELL") navigate("/marketplace/sell");
    else if (label === "LIST") navigate("/marketplace/list");
    else if (label === "REFER") navigate("/marketplace/refer");
    else if (label === "AGENT") navigate("/marketplace/agent");
    else toast.info(`${label} interface coming soon.`);
  };

  const handleSearchSelect = (suggestion: string) => {
    setSearchQuery(suggestion);
    setShowSuggestions(false);
    toast.info(`Searching for "${suggestion}"...`);
  };

  return (
    <div className="w-full relative min-h-[100dvh] bg-transparent overflow-x-hidden font-sans pb-32">
      {/* ── ORANGE DASHBOARD HEADER ── */}
      <PageHeader useLogo />

      {loading ? (
        <PageSkeletons.Marketplace />
      ) : (
        <div className="relative z-10 w-full mt-4 space-y-4 pb-10 px-5">

          {/* Greeting Header */}
          <div>
            <p className="text-[9px] font-black uppercase tracking-[0.3em] text-[var(--color-secondary)]/50">{getGreeting()}</p>
            <p className="text-[14px] font-black text-[var(--app-text)] uppercase tracking-wide leading-tight">What would you like to do today?</p>
          </div>

          {/* Dynamic Notification Strip */}
          <AnimatePresence>
            {notification && showNotification && (() => {
              const c = notifColors[notification.type];
              return (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className={`w-full flex items-center gap-2.5 ${c.bg} border ${c.border} rounded-xl px-3 py-2.5 cursor-pointer`}
                >
                  <span onClick={() => navigate(notification.href)} className="flex items-center gap-2.5 flex-1 min-w-0">
                    <span className={`w-1.5 h-1.5 rounded-full ${c.dot} animate-pulse shrink-0`} />
                    <p className={`text-[10px] font-black flex-1 uppercase tracking-wide ${c.text} truncate`}>{notification.text}</p>
                  </span>
                  <button
                    onClick={(e) => { e.stopPropagation(); setShowNotification(false); }}
                    className="shrink-0 active:opacity-50 p-0.5"
                  >
                    <X size={13} className={c.text + " opacity-60"} />
                  </button>
                </motion.div>
              );
            })()}
          </AnimatePresence>

          {/* Primary Action Bar */}
          <div>
            <div className="flex justify-between items-center">
              {[
                { icon: Tag, label: "SELL", color: "text-[var(--color-primary)]" },
                { icon: FileText, label: "LIST", color: "text-[var(--color-secondary)]" },
                { icon: UserPlus, label: "REFER", color: "text-[var(--color-secondary)]" },
                { icon: BadgeCheck, label: "AGENT", color: "text-[var(--color-secondary)]" }
              ].map((action, i) => (
                <motion.button
                  key={i}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => handleAction(action.label)}
                  className="flex flex-col items-center gap-2 group cursor-pointer"
                  style={{ touchAction: "manipulation" }}
                >
                  <div className={`w-[60px] h-[60px] rounded-2xl border border-[var(--border)] bg-[var(--app-bg)] flex items-center justify-center shadow-sm active:scale-95 transition-all ${action.color}`}>
                    <action.icon size={26} strokeWidth={('stroke' in action ? action.stroke : 2.5) as number} />
                  </div>
                  <span className="text-[10px] font-black tracking-widest text-[var(--app-text)] uppercase">{action.label}</span>
                </motion.button>
              ))}
            </div>
          </div>

          {/* Search Bar with Predictive Suggestions */}
          <div className="w-full relative">
            <div className="relative flex items-center w-full">
               <Search className="absolute left-4 text-[var(--app-text)]/40" size={20} />
               <input
                 ref={searchRef}
                 type="text"
                 value={searchQuery}
                 onChange={(e) => setSearchQuery(e.target.value)}
                 onFocus={() => setShowSuggestions(true)}
                 onBlur={() => setTimeout(() => setShowSuggestions(false), 150)}
                 placeholder="Search products & services..."
                 className="w-full bg-[var(--app-bg)] border border-[var(--border)] pl-12 pr-28 py-3 rounded-2xl shadow-sm focus:border-[var(--color-secondary)]/40 text-[13px] font-black text-[var(--app-text)] outline-none placeholder:text-[var(--app-text)]/40 transition-all"
               />
               <button
                 onClick={() => navigate("/marketplace/featured")}
                 className="absolute right-4 text-[var(--color-primary)] font-black text-[11px] flex items-center gap-1 active:opacity-70 uppercase tracking-widest"
               >
                 Categories <ChevronRight size={14} strokeWidth={3} className="text-[var(--color-secondary)]/40" />
               </button>
            </div>

            <AnimatePresence>
              {showSuggestions && filteredSuggestions.length > 0 && (
                <motion.div initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -4 }}
                  className="absolute top-full mt-1 left-0 right-0 bg-[var(--app-bg)] border border-[var(--border)] rounded-2xl shadow-lg overflow-hidden z-50">
                  <p className="px-4 pt-3 pb-1 text-[8px] font-black uppercase tracking-widest text-[var(--color-secondary)]/40">
                    {searchQuery ? "Matches" : "Popular Searches"}
                  </p>
                  {filteredSuggestions.map((s) => (
                    <button key={s} onMouseDown={() => handleSearchSelect(s)}
                      className="w-full flex items-center gap-3 px-4 py-2.5 text-left hover:bg-[var(--border)]/30 active:bg-[var(--border)]/50 transition-colors">
                      <Search size={12} className="text-[var(--color-secondary)]/40 shrink-0" />
                      <span className="text-[12px] font-semibold text-[var(--app-text)]">{s}</span>
                    </button>
                  ))}
                  <div className="h-1" />
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Segmented Tabs */}
          <div className="w-full">
             <div className="flex border border-[var(--border)] rounded-full shadow-sm overflow-hidden">
                {(["PRODUCTS", "SERVICES"] as const).map((tab, i) => {
                   const isActive = activeTab === tab;
                   return (
                     <button
                       key={tab}
                       onClick={() => setActiveTab(tab)}
                       className={`flex-1 flex items-center justify-center h-[38px] transition-all duration-200 ${
                         isActive
                           ? "bg-[var(--color-secondary)] text-white"
                           : "bg-[var(--app-bg)] text-[var(--app-text)]/55"
                       } ${i === 0 ? "border-r border-[var(--border)]" : ""}`}
                     >
                       <span className="text-[10px] font-black tracking-[0.2em] uppercase">{tab}</span>
                     </button>
                   );
                })}
             </div>
          </div>

          {activeTab === "PRODUCTS" ? (
             <section>
               <div className="flex items-center justify-between mb-3 border-b border-[var(--border)] pb-2">
                  <h3 className="text-[var(--app-text)] font-black text-sm tracking-widest uppercase">PRODUCTS</h3>
                  <button onClick={() => navigate("/marketplace/featured")} className="text-[var(--color-primary)] font-black text-[11px] flex items-center gap-1 uppercase tracking-widest">
                    See All <ChevronRight size={12} strokeWidth={2} />
                  </button>
               </div>
               <div className="flex overflow-x-auto snap-x snap-mandatory pb-4 gap-3 scrollbar-hide no-scrollbar w-full">
                 {MARKET_PRODUCTS.map((product) => (
                   <Link to={`/product/${product.id}`} key={product.id} className="block shrink-0 snap-start w-[110px]">
                     <div className="bg-[var(--app-bg)] border border-[var(--border)] rounded-2xl overflow-hidden shadow-sm flex flex-col h-full active:scale-95 transition-transform">
                       <div className="aspect-square bg-[var(--app-bg)] relative border-b border-[var(--border)]">
                          <ImageWithFallback src={product.image} alt={product.title} className="w-full h-full object-cover" />
                       </div>
                       <div className="p-2 bg-[var(--app-bg)] flex flex-col gap-0.5 justify-between flex-1">
                          <h4 className="text-[9px] font-black text-[var(--app-text)] leading-tight line-clamp-1 uppercase">{product.title}</h4>
                          <div className="flex items-center gap-1 mt-1">
                             <span className="text-[12px] font-black text-[var(--color-primary)]">K{product.price}</span>
                             <span className="text-[6px] font-black text-[var(--color-secondary)]/50 uppercase pt-0.5 whitespace-nowrap">VIEW</span>
                          </div>
                       </div>
                     </div>
                   </Link>
                 ))}
               </div>
             </section>
          ) : (
             <section>
               <div className="flex items-center justify-between mb-3 border-b border-[var(--border)] pb-2">
                  <h3 className="text-[var(--app-text)] font-black text-sm tracking-widest uppercase">SERVICES</h3>
                  <button onClick={() => navigate("/marketplace/services")} className="text-[var(--color-primary)] font-black text-[11px] flex items-center gap-1 uppercase tracking-widest">
                    Explore <ChevronRight size={12} strokeWidth={2} />
                  </button>
               </div>
               <div className="flex overflow-x-auto snap-x snap-mandatory pb-5 gap-4 scrollbar-hide no-scrollbar w-full pr-5">
                 {[
                   { id: "1", label: "PHOTOGRAPHY", title: "PHOTO", image: "https://images.unsplash.com/photo-1540839045366-eb10c95a04cc?w=400&q=80" },
                   { id: "2", label: "GRAPHIC DESIGN", title: "DESIGN", image: "https://images.unsplash.com/photo-1626785774573-4b799315345d?w=400&q=80" },
                   { id: "3", label: "WEB DEVELOPMENT", title: "TECH", image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400&q=80" },
                   { id: "4", label: "HIRE TALENT", title: "TALENT", image: "https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=400&q=80" },
                 ].map((service) => (
                   <motion.button whileTap={{ scale: 0.97 }} onClick={() => navigate(`/marketplace/service/${service.id}`)} key={service.id} className="block shrink-0 snap-start w-[140px] focus:outline-none">
                     <div className="bg-[var(--app-bg)] border border-[var(--border)] rounded-2xl overflow-hidden flex flex-col h-full relative cursor-pointer shadow-sm transition-colors">
                       <div className="h-[100px] relative border-b border-[var(--border)] bg-[var(--muted)]">
                          <img src={service.image} alt={service.title} className="w-full h-full object-cover grayscale-[0.2]" />
                          <div className="absolute inset-0 bg-black/40" />
                          <div className="absolute inset-0 flex items-center justify-center pointer-events-none p-3 text-center">
                             <span className="text-[11px] font-black text-white px-2 py-1 bg-[var(--color-secondary)]/80 border border-white/30 transform -rotate-12 shadow-md uppercase tracking-widest">{service.title}</span>
                          </div>
                       </div>
                       <div className="py-2.5 px-2 bg-[var(--app-bg)] flex items-center justify-center min-h-[40px]">
                          <span className="text-[9px] font-black text-[var(--app-text)] uppercase text-center leading-none tracking-[0.2em]">{service.label}</span>
                       </div>
                     </div>
                   </motion.button>
                 ))}
               </div>
             </section>
          )}

          {/* Market Intelligence Ticker */}
          <section>
            <div className="mb-4 border-b border-[var(--border)] pb-2 flex items-center justify-between">
               <h3 className="text-[var(--app-text)] font-black text-sm tracking-widest uppercase">MARKET INTELLIGENCE</h3>
               <button onClick={() => navigate("/marketplace/intelligence")} className="text-[var(--color-primary)] font-black text-[11px] flex items-center gap-1 uppercase tracking-widest">
                 See All <ChevronRight size={12} strokeWidth={2} />
               </button>
            </div>
            <div className="flex overflow-x-auto snap-x snap-mandatory pb-5 gap-4 scrollbar-hide no-scrollbar w-full pr-5">
               {MARKET_INTEL.map((intel) => (
                  <motion.button whileTap={{ scale: 0.97 }} key={intel.id}
                    onClick={() => navigate(`/marketplace/intel/${intel.id}`)}
                    className="shrink-0 snap-start w-[115px] bg-[var(--color-secondary)] rounded-2xl p-3 shadow-sm flex flex-col relative overflow-hidden h-[160px] text-left">
                     <div className="absolute inset-0 opacity-10 pointer-events-none flex flex-col justify-between p-3">
                        <span className="text-[6px] font-black text-white">100</span>
                        <span className="text-[6px] font-black text-white">50</span>
                        <span className="text-[6px] font-black text-white">25</span>
                        <span className="text-[6px] font-black text-white">0</span>
                     </div>
                     <span className="text-[10px] font-black text-white/60 tracking-[0.3em] z-10 uppercase leading-none mt-1">{intel.title}</span>
                     <span className="text-[14px] font-black text-white z-10 leading-none mt-2 mb-1 tracking-tight">{intel.price}</span>
                     <div className={`flex items-center gap-1 z-10 mb-1 ${intel.up ? "text-white" : "text-white/70"}`}>
                       {intel.up ? <TrendingUp size={9} strokeWidth={2.5} /> : <TrendingDown size={9} strokeWidth={2.5} />}
                       <span className="text-[8px] font-black">{intel.change}</span>
                     </div>
                     <div className="flex-1 w-full h-[50px] relative z-10 flex items-end justify-center mb-1">
                        <svg className="w-full h-full" viewBox="0 0 40 50" preserveAspectRatio="none">
                           <path d={intel.graph} fill="none" stroke="white" strokeWidth="3"
                              vectorEffect="non-scaling-stroke" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                     </div>
                     <div className="flex items-center justify-between mt-auto z-10 border-t border-white/10 pt-1.5">
                        <div className="flex items-center gap-1.5">
                           <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse block" />
                           <span className="text-[7px] text-white/50 font-black uppercase tracking-[0.2em] leading-none">LIVE</span>
                        </div>
                        <ChevronRight size={10} className="text-white/40" strokeWidth={3} />
                     </div>
                  </motion.button>
               ))}
            </div>
          </section>

          {/* Business Listings */}
          <section>
            <div className="bg-[var(--color-secondary)] px-4 py-2 border-t border-x border-[var(--color-secondary)]/20 rounded-t-2xl">
               <h3 className="text-white font-black text-[11px] tracking-[0.2em] uppercase">BUSINESS LISTINGS</h3>
            </div>
            <div className="flex gap-0 overflow-x-auto snap-x snap-mandatory scrollbar-hide no-scrollbar w-full border border-[var(--color-secondary)]/20 rounded-b-2xl shadow-sm bg-[var(--color-secondary)]">
               {BUSINESSES.map((business, i) => (
                 <div key={i} className="shrink-0 snap-start w-[158px] bg-[var(--app-bg)] group flex flex-col border-r border-[var(--border)] last:border-r-0">
                   <div onClick={() => navigate(`/marketplace/asset/${business.id}`)}
                     className="flex-1 bg-[var(--muted)] flex items-center justify-center border-b border-[var(--border)] p-4 relative cursor-pointer transition-colors">
                      <div className="w-16 h-16 rounded-full bg-[var(--app-bg)] border border-[var(--border)] flex items-center justify-center overflow-hidden shadow-sm group-hover:scale-110 transition-transform duration-300">
                         {business.image ? (
                            <img src={business.image} alt={business.name} className="w-[85%] h-[85%] object-contain" />
                         ) : (
                            <span className="text-[var(--app-text)] font-black text-xl">{business.logo}</span>
                         )}
                      </div>
                      <div className="absolute top-2 right-2">
                         <div className="w-1.5 h-1.5 rounded-full bg-[#4ade80] animate-pulse" />
                      </div>
                   </div>
                   <div className="p-3 flex flex-col gap-2">
                      <div className="flex flex-col gap-0.5">
                        <span className="text-[9px] font-black text-[var(--app-text)] uppercase leading-tight line-clamp-2 tracking-wide">{business.name}</span>
                        <span className="text-[7px] font-black text-[var(--color-secondary)]/60 uppercase tracking-widest">{business.category}</span>
                      </div>
                      <div className="flex gap-1.5">
                        <button onClick={() => toast.info(`Calling ${business.name}...`)}
                          className="flex-1 py-1.5 flex items-center justify-center gap-1 bg-[var(--color-primary)]/10 border border-[var(--color-primary)]/20 rounded-lg active:scale-95 transition-all">
                          <Phone size={10} className="text-[var(--color-primary)]" strokeWidth={2.5} />
                          <span className="text-[7px] font-black text-[var(--color-primary)] uppercase tracking-wide">Call</span>
                        </button>
                        <button onClick={() => toast.info(`Messaging ${business.name}...`)}
                          className="flex-1 py-1.5 flex items-center justify-center gap-1 bg-[var(--color-secondary)]/8 border border-[var(--color-secondary)]/20 rounded-lg active:scale-95 transition-all">
                          <MessageCircle size={10} className="text-[var(--color-secondary)]" strokeWidth={2.5} />
                          <span className="text-[7px] font-black text-[var(--color-secondary)] uppercase tracking-wide">Chat</span>
                        </button>
                        <button onClick={() => navigate(`/marketplace/asset/${business.id}`)}
                          className="flex-1 py-1.5 flex items-center justify-center gap-1 bg-[var(--color-secondary)]/8 border border-[var(--color-secondary)]/20 rounded-lg active:scale-95 transition-all">
                          <MapPin size={10} className="text-[var(--color-secondary)]" strokeWidth={2.5} />
                          <span className="text-[7px] font-black text-[var(--color-secondary)] uppercase tracking-wide">View</span>
                        </button>
                      </div>
                   </div>
                 </div>
               ))}
               <div onClick={() => toast("Viewing all registered businesses...")} className="shrink-0 snap-start w-[120px] bg-[var(--color-secondary)] cursor-pointer flex flex-col items-center justify-center p-4 gap-3 h-full min-h-[185px]">
                  <div className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center">
                    <ChevronRight size={24} className="text-white/60 ml-0.5" strokeWidth={2.5} />
                  </div>
                  <span className="text-[9px] font-black text-white/60 uppercase tracking-[0.2em] text-center leading-tight">VIEW ALL<br/>BUSINESSES →</span>
               </div>
            </div>
          </section>

          {/* Window Shopping */}
          <section>
            <div className="bg-[var(--color-secondary)] px-4 py-2 border-t border-x border-[var(--color-secondary)]/20 rounded-t-2xl">
               <h3 className="text-white font-black text-[11px] tracking-[0.2em] uppercase">WINDOW SHOPPING</h3>
            </div>
            <div className="flex gap-[1px] overflow-x-auto snap-x snap-mandatory scrollbar-hide no-scrollbar w-full border border-[var(--color-secondary)]/20 rounded-b-2xl shadow-sm bg-[var(--color-secondary)]">
               {[
                 { id: "10", name: "THE SCENT STORE ZAMBIA", category: "Beauty & Fragrance", image: scentStoreImg },
                 { id: "11", name: "LUSAKA TECH HUB", category: "Electronics & Tech", image: techHubImg },
                 { id: "12", name: "STYLE AVENUE ZM", category: "Clothing & Fashion", image: styleAvenueImg },
                 { id: "13", name: "GREENLEAF ORGANICS", category: "Food & Health", image: greenleafImg },
               ].map((shop, i) => (
                 <div key={i} onClick={() => navigate(`/marketplace/service/${shop.id}`)} className="shrink-0 snap-start w-[140px] bg-[var(--app-bg)] cursor-pointer group flex flex-col h-[185px]">
                   <div className="flex-1 flex items-center justify-center border-b border-[var(--border)] overflow-hidden bg-[var(--muted)]">
                      <img src={shop.image} alt={shop.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                   </div>
                   <div className="p-3 flex flex-col gap-1 h-[65px] justify-center">
                      <span className="text-[10px] font-black text-[var(--app-text)] uppercase leading-tight line-clamp-2 tracking-wide">{shop.name}</span>
                      <span className="text-[8px] font-black text-[var(--color-secondary)]/60 uppercase tracking-widest">{shop.category}</span>
                   </div>
                 </div>
               ))}
               <div onClick={() => toast("Viewing all shops...")} className="shrink-0 snap-start w-[110px] bg-[var(--color-secondary)] cursor-pointer flex flex-col items-center justify-center p-4 gap-3 h-[185px]">
                  <div className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center">
                    <ChevronRight size={24} className="text-white/60 ml-0.5" strokeWidth={2.5} />
                  </div>
                  <span className="text-[9px] font-black text-white/60 uppercase tracking-[0.2em] text-center leading-tight">VIEW ALL<br/>SHOPS →</span>
               </div>
            </div>
          </section>

          {/* Big Deals */}
          <section>
             <div className="mb-3 border-b border-[var(--border)] pb-2 flex items-center justify-between">
                <h3 className="text-[var(--app-text)] font-black text-sm tracking-widest uppercase">BIG DEALS</h3>
                <span className="text-[9px] font-black text-[var(--color-primary)] uppercase tracking-widest">🔥 Limited Time</span>
             </div>
             <div className="flex overflow-x-auto snap-x snap-mandatory pb-4 gap-3 scrollbar-hide no-scrollbar w-full pr-5">
               {MARKET_PRODUCTS.map((product) => (
                 <Link to={`/product/${product.id}`} key={`deal-${product.id}`} className="block shrink-0 snap-start w-[110px]">
                   <div className="bg-[var(--app-bg)] border border-[var(--border)] rounded-2xl overflow-hidden shadow-sm flex flex-col h-full active:scale-95 transition-transform">
                     <div className="aspect-square bg-[var(--app-bg)] relative border-b border-[var(--border)]">
                        <div className="absolute top-1.5 left-1.5 bg-[var(--color-primary)] text-white text-[8px] font-black px-1.5 py-0.5 rounded-sm uppercase transform -rotate-3 z-10 shadow-sm">HOT</div>
                        <ImageWithFallback src={product.image} alt={product.title} className="w-full h-full object-cover" />
                     </div>
                     <div className="p-2 bg-[var(--app-bg)] flex flex-col gap-0.5 justify-between flex-1">
                        <h4 className="text-[9px] font-black text-[var(--app-text)] leading-tight line-clamp-1 uppercase">{product.title}</h4>
                        <div className="flex items-center gap-1 mt-1">
                           <span className="text-[8px] font-black text-[var(--color-secondary)]/40 line-through">K{Number(product.price.replace(/,/g, "")) + 1000}</span>
                           <span className="text-[12px] font-black text-[var(--color-primary)]">K{product.price}</span>
                        </div>
                     </div>
                   </div>
                 </Link>
               ))}
             </div>
          </section>

        </div>
      )}
    </div>
  );
}
