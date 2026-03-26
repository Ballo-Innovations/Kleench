import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Search, Filter, Star, ShieldCheck, ArrowRight } from "lucide-react";
import { Link } from "react-router";
import { LottieIcon } from "../components/LottieIcon";
import kleenchLogo from "@/assets/kleench_logo.png";
import adBanner from "@/assets/ads/Collective Impact Verified Efforts.png";

type OfferType = "all" | "solar" | "network" | "survey" | "course";

const OFFER_CATEGORIES = [
  { id: "all"     as OfferType, label: "All",     icon: "poll",     isFilter: true  },
  { id: "solar"   as OfferType, label: "Solar",   icon: "solar",    isFilter: false },
  { id: "network" as OfferType, label: "Network", icon: "network",  isFilter: false },
  { id: "survey"  as OfferType, label: "Surveys", icon: "megaphone",isFilter: false },
  { id: "course"  as OfferType, label: "Courses", icon: "course",   isFilter: false },
];

const OFFERS = [
  { id: 1, category: "solar"   as OfferType, company: "SunTech Zambia",  title: "Solar Lights Promotion",     desc: "Share our solar light products and earn K10 per confirmed purchase.",       earn: "K10.00", earnType: "per sale",    price: "K80.00",  rating: 4.8, reviews: 124, deadline: "3 days left",  badge: "Hot",     badgeColor: "#EF4444", image: "https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?w=500&q=80", verified: true },
  { id: 2, category: "network" as OfferType, company: "Cetane Networks",  title: "Network Feedback Survey",    desc: "Rate your internet experience in your area. Takes under 2 minutes.",        earn: "K1.00",  earnType: "per response",price: "K8.00",   rating: 4.5, reviews:  88, deadline: "5 days left",  badge: "Easy",    badgeColor: "#0077B6", image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=500&q=80", verified: true },
  { id: 3, category: "survey"  as OfferType, company: "AgriBoost Zambia", title: "Farmers' Opinion Survey",    desc: "Share your views on agricultural tools used in your community.",            earn: "K2.50",  earnType: "flat rate",   price: "K15.00",  rating: 4.6, reviews:  53, deadline: "7 days left",  badge: "New",     badgeColor: "#00695C", image: "https://images.unsplash.com/photo-1593113598332-cd288d649433?w=500&q=80", verified: true },
  { id: 4, category: "course"  as OfferType, company: "SkillBridge",      title: "Refer & Earn on Courses",    desc: "Earn 8% commission on every student you refer to our digital courses.",     earn: "8%",     earnType: "commission",  price: "K149.00", rating: 4.9, reviews: 203, deadline: "Ongoing",      badge: "Best",    badgeColor: "#7C3AED", image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=500&q=80", verified: true },
  { id: 5, category: "solar"   as OfferType, company: "AfriSolar",        title: "Solar Panel Bulk Deal",      desc: "Help businesses discover our 200W panels. Earn K25 per verified lead.",   earn: "K25.00", earnType: "per lead",    price: "K350.00", rating: 4.7, reviews:  67, deadline: "10 days left", badge: "Premium", badgeColor: "#FF8C00", image: "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=500&q=80", verified: true },
];

/* Graceful ease-out transition */
const grace = (delay = 0, extraY = 0) => ({
  initial:    { opacity: 0, y: 28 + extraY },
  animate:    { opacity: 1, y: extraY },
  transition: { delay, duration: 0.62, ease: [0.22, 1, 0.36, 1] as const },
});

export function Offers() {
  const [activeTab, setActiveTab] = useState<OfferType>("all");
  const [search, setSearch] = useState("");

  const filtered = OFFERS.filter((o) => {
    const matchTab    = activeTab === "all" || o.category === activeTab;
    const matchSearch = o.title.toLowerCase().includes(search.toLowerCase()) ||
                        o.company.toLowerCase().includes(search.toLowerCase());
    return matchTab && matchSearch;
  });

  return (
    <div className="w-full max-w-md mx-auto pb-8 relative">

      {/* ── Unified cross-hatch bg ── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 0 }}>
        <svg width="100%" height="100%" style={{ position: "absolute", inset: 0 }}>
          <defs>
            <pattern id="xhatch-offers" x="0" y="0" width="24" height="24" patternUnits="userSpaceOnUse">
              <line x1="0" y1="0" x2="24" y2="24" stroke="#FF8C00" strokeWidth="0.5" strokeOpacity="0.07"/>
              <line x1="24" y1="0" x2="0" y2="24" stroke="#FF8C00" strokeWidth="0.5" strokeOpacity="0.07"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#xhatch-offers)"/>
        </svg>
      </div>

      {/* ── Standardized Orange Header ── */}
      <div className="relative pt-4 pb-0 px-6 overflow-hidden rounded-b-[40px] flex flex-col justify-between h-[180px] mb-8"
        style={{ background: "linear-gradient(135deg, #FF8C00, #e06900)", boxShadow: "0 10px 30px rgba(255,140,0,0.12)" }}>
        
        {/* grid texture */}
        <div className="absolute inset-0 opacity-[0.1]">
          <svg width="100%" height="100%">
            <defs>
              <pattern id="offers-grid" width="20" height="20" patternUnits="userSpaceOnUse">
                <path d="M 20 0 L 0 0 0 20" fill="none" stroke="white" strokeWidth="0.5"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#offers-grid)"/>
          </svg>
        </div>

        <div className="relative z-10 flex items-center justify-between mt-2 h-10 gap-2">
          <Link to="/" className="flex items-center gap-2">
            <img src={kleenchLogo} alt="KLEENCH" className="h-8 w-auto object-contain brightness-0 invert" />
            <span className="text-white font-black text-xl tracking-tight opacity-90" style={{ fontFamily: "system-ui, -apple-system, sans-serif" }}>Offers</span>
          </Link>
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/20 border border-white/30 backdrop-blur-md">
            <div className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
            <span className="text-[10px] font-bold uppercase tracking-wider text-white">Live</span>
          </div>
        </div>

        <div className="relative z-10 space-y-1 mb-8">
          <h1 className="text-white text-3xl font-black tracking-tight" style={{ fontFamily: "system-ui, -apple-system, sans-serif" }}>Opportunities</h1>
          <p className="text-white/80 text-[13px] font-medium">{OFFERS.length} active earning opportunities today.</p>
        </div>
      </div>

      {/* Banner Ad */}
      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={grace(0.1)}
        className="relative z-10 mb-8 rounded-[32px] overflow-hidden shadow-lg border border-gray-100">
        <img src={adBanner} alt="Collective Impact" className="w-full h-auto object-cover" />
      </motion.div>

      {/* Search */}
      <div className="relative z-10 mb-5">
        <Search size={15} className="absolute left-4 top-1/2 -translate-y-1/2" style={{ color: "rgba(13,27,62,0.3)" }}/>
        <input type="text" value={search} onChange={(e) => setSearch(e.target.value)}
          placeholder="Search opportunities..."
          className="w-full h-11 pl-11 pr-4 rounded-2xl text-sm font-medium outline-none"
          style={{ background: "white", border: "1px solid rgba(13,27,62,0.07)", color: "#0D1B3E", boxShadow: "0 2px 10px rgba(13,27,62,0.04)" }}/>
      </div>

      {/* Category tabs */}
      <div className="relative z-10 flex gap-2.5 mb-7 overflow-x-auto pb-1" style={{ scrollbarWidth: "none" }}>
        {OFFER_CATEGORIES.map((cat, i) => (
          <motion.button key={cat.id}
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.06, duration: 0.5, ease: "easeOut" }}
            whileTap={{ scale: 0.93 }}
            onClick={() => setActiveTab(cat.id)}
            className="flex items-center gap-1.5 px-4 py-2 rounded-full text-[11px] font-bold whitespace-nowrap border flex-shrink-0"
            style={activeTab === cat.id
              ? { background: "#FF8C00", color: "white", borderColor: "#FF8C00", boxShadow: "0 4px 16px rgba(255,140,0,0.28)", transition: "all 0.5s ease" }
              : { background: "white", color: "#0D1B3E", borderColor: "rgba(13,27,62,0.08)", transition: "all 0.5s ease" }}>
            {cat.isFilter
              ? <Filter size={11} strokeWidth={2.5}/>
              : <div className="overflow-hidden" style={{ width: 18, height: 18 }}><LottieIcon icon={cat.icon} size={18} /></div>
            }
            {cat.label}
          </motion.button>
        ))}
      </div>

      {/* Offer cards */}
      <div className="relative z-10">
        <AnimatePresence mode="popLayout">
          <div className="space-y-5">
            {filtered.map((offer, i) => {
              /* Staggered rhythm: even index cards sit 10px lower */
              const staggerY = i % 2 === 0 ? 10 : 0;
              return (
                <motion.div key={offer.id} layout
                  {...grace(i * 0.08, staggerY)}
                  exit={{ opacity: 0, scale: 0.97 }}
                  whileHover={{ y: staggerY - 4, boxShadow: "0 12px 36px rgba(13,27,62,0.1)" }}
                  style={{ transition: "box-shadow 0.5s ease" }}>
                  <Link to={`/offer/${offer.id}`}>
                    <div className="bg-white border rounded-3xl overflow-hidden"
                      style={{ borderColor: "rgba(13,27,62,0.06)", boxShadow: "0 3px 16px rgba(13,27,62,0.06)" }}>

                      {/* Image */}
                      <div className="relative h-40 bg-gray-100">
                        <img src={offer.image} alt={offer.title}
                          className="w-full h-full object-cover"
                          style={{ transition: "transform 0.7s ease" }}
                          onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.03) rotate(0.5deg)")}
                          onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1) rotate(0deg)")}
                        />
                        <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(13,27,62,0.68) 0%, transparent 58%)" }}/>
                        <div className="absolute top-3 left-3">
                          <span className="text-white text-[9px] font-black px-2.5 py-1 rounded-lg uppercase tracking-wide"
                            style={{ background: offer.badgeColor }}>
                            {offer.badge}
                          </span>
                        </div>
                        <div className="absolute bottom-3 left-4 right-4 flex items-end justify-between">
                          <div>
                            <p className="text-white font-black text-xl leading-tight"
                              style={{ fontFamily: "Agrandir, sans-serif", textShadow: "0 2px 6px rgba(0,0,0,0.3)" }}>
                              {offer.earn}
                            </p>
                            <p className="text-[10px] mt-0.5" style={{ color: "rgba(255,255,255,0.62)" }}>{offer.earnType}</p>
                          </div>
                          <div className="flex items-center gap-1 px-2.5 py-1 rounded-full"
                            style={{ background: "rgba(0,0,0,0.38)", backdropFilter: "blur(6px)" }}>
                            <Star size={10} fill="white" stroke="none"/>
                            <span className="text-[10px] font-bold text-white">{offer.rating} ({offer.reviews})</span>
                          </div>
                        </div>
                      </div>

                      {/* Content — generous padding */}
                      <div className="p-5">
                        <div className="flex items-start justify-between gap-3 mb-2">
                          <div>
                            <p className="font-black text-[14.5px] leading-snug" style={{ fontFamily: "Agrandir, sans-serif", color: "#0D1B3E" }}>
                              {offer.title}
                            </p>
                            <div className="flex items-center gap-1.5 mt-1">
                              <p className="text-[10px]" style={{ color: "rgba(13,27,62,0.42)" }}>{offer.company}</p>
                              {offer.verified && <ShieldCheck size={9} style={{ color: "#0077B6" }}/>}
                            </div>
                          </div>
                          <div className="text-right flex-shrink-0">
                            <p className="text-[9px] uppercase font-bold tracking-wide" style={{ color: "rgba(13,27,62,0.35)" }}>Price</p>
                            <p className="font-bold text-[14px] mt-0.5" style={{ color: "#0D1B3E" }}>{offer.price}</p>
                          </div>
                        </div>

                        <p className="text-[11.5px] leading-relaxed mb-5 line-clamp-2" style={{ color: "rgba(13,27,62,0.52)", lineHeight: 1.65 }}>
                          {offer.desc}
                        </p>

                        <div className="flex items-center justify-between">
                          {/* Deadline chip — teal */}
                          <span className="text-[10px] font-bold px-3 py-1.5 rounded-full flex items-center gap-1.5"
                            style={{ background: "#F0FDF9", color: "#00695C" }}>
                            <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                              <circle cx="5" cy="5" r="4" stroke="#00695C" strokeWidth="1.2"/>
                              <path d="M5 2.5v2.5l1.5 1.5" stroke="#00695C" strokeWidth="1.2" strokeLinecap="round"/>
                            </svg>
                            {offer.deadline}
                          </span>

                          <motion.button
                            whileTap={{ scale: 0.94 }} whileHover={{ y: -2 }}
                            className="text-white text-[11.5px] font-bold px-5 py-2 rounded-full flex items-center gap-1.5"
                            style={{ background: "linear-gradient(135deg, #FF8C00, #e06900)", boxShadow: "0 4px 16px rgba(255,140,0,0.28)", transition: "transform 0.4s ease, box-shadow 0.4s ease" }}>
                            Participate <ArrowRight size={11} strokeWidth={2.5}/>
                          </motion.button>
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              );
            })}

            {filtered.length === 0 && (
              <motion.div key="empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}
                className="text-center py-16">
                <div className="flex justify-center mb-5">
                  <LottieIcon icon="empty" size={88} />
                </div>
                <p className="font-bold text-sm mb-1.5" style={{ color: "#0D1B3E" }}>No opportunities found</p>
                <p className="text-[12px]" style={{ color: "rgba(13,27,62,0.4)" }}>Try a different category or search term</p>
              </motion.div>
            )}
          </div>
        </AnimatePresence>
      </div>
    </div>
  );
}
