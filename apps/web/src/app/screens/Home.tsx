import { Link, useNavigate } from "react-router";
import { useState } from "react";
import {
  Settings, Bell, Search, Eye, EyeOff,
  Send, X, ArrowDownToLine, ArrowUpFromLine,
  Play, GraduationCap, ClipboardList, Users,
  Heart, MessageCircle, Share2, PlayCircle,
  Megaphone, ArrowRight, Gift, TrendingUp,
  Star, BadgeCheck, Sparkles,
} from "lucide-react";
import { motion, AnimatePresence, type PanInfo } from "motion/react";

import kleenchLogo from "@/assets/kleench_logo.png";
import { BackspaceKey } from "../components/KleenchIcons";
import { PageSkeletons, usePageLoading } from "../components/PageSkeletons";

// ─── Data ───────────────────────────────────────────────────────────────────

const REELS = [
  { id: 1, label: "Watch Ads", reward: "K5", to: "/advert", image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=400&auto=format&fit=crop" },
  { id: 2, label: "Masterclass", reward: "K2", to: "/learning", image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=400&auto=format&fit=crop" },
  { id: 3, label: "Surveys", reward: "EARN", to: "/poll/create", image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=400&auto=format&fit=crop" },
  { id: 4, label: "Invite Friends", reward: "GROW", to: "/referral", image: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?q=80&w=400&auto=format&fit=crop" },
];

const FEED_ITEMS = [
  {
    id: 1,
    type: "advert" as const,
    user: "Airtel Zambia",
    verified: true,
    avatar: "https://i.pravatar.cc/150?u=airtel",
    title: "Load Airtel Data & Earn Bonus Kleench Points",
    body: "Every Airtel top-up this week earns you 2x Kleench rewards. Tap to activate your bonus now.",
    reward: "K8.00",
    image: "https://picsum.photos/seed/airtel_ad/600/380",
    views: "34.2k",
    time: "Sponsored",
    likes: "2.4k",
    tag: "ADVERT",
    tagColor: "bg-[#FF8C00]",
  },
  {
    id: 2,
    type: "advert" as const,
    user: "Zambia Breweries",
    verified: true,
    avatar: "https://i.pravatar.cc/150?u=zb",
    title: "Great Taste, Great Rewards — Shop & Earn Today",
    body: "Purchase any featured product and earn Kleench wallet credits automatically.",
    reward: "K5.00",
    image: "https://picsum.photos/seed/zambrews/600/380",
    views: "18.6k",
    time: "Sponsored",
    likes: "1.1k",
    tag: "ADVERT",
    tagColor: "bg-[#FF8C00]",
  },
  {
    id: 3,
    type: "post" as const,
    user: "Lusaka_Times",
    verified: false,
    avatar: "https://i.pravatar.cc/150?u=1",
    title: "How to save 30% on building materials this season",
    body: "With prices rising, savvy buyers are flocking to Kleench Marketplace for verified deals.",
    reward: "K5.00",
    image: "https://picsum.photos/seed/build1/600/380",
    views: "12.4k",
    time: "2h ago",
    likes: "892",
    tag: "HOT",
    tagColor: "bg-[#003366]",
  },
  {
    id: 4,
    type: "post" as const,
    user: "Chef_Mwape",
    verified: false,
    avatar: "https://i.pravatar.cc/150?u=2",
    title: "Traditional recipes that earn you Kleench points",
    body: "Watch the full 60-second video and collect your reward — no strings attached.",
    reward: "K2.50",
    image: "https://picsum.photos/seed/food2/600/380",
    views: "8.1k",
    time: "4h ago",
    likes: "403",
    tag: "EARN",
    tagColor: "bg-[#00C853]",
  },
];

const MARKETPLACE_PRODUCTS = [
  {
    id: 1,
    title: "Pro Noise-Cancelling Headphones",
    seller: "AudioTech Store",
    price: 1250,
    originalPrice: 1500,
    badge: "Hot",
    image: "https://images.unsplash.com/photo-1612858249937-1cc0852093dd?w=400&q=80",
    rating: 4.8,
  },
  {
    id: 2,
    title: "Premium Leather Sneakers",
    seller: "Street Kicks Co.",
    price: 1800,
    originalPrice: null,
    badge: null,
    image: "https://images.unsplash.com/photo-1771726588700-e3baad15ae16?w=400&q=80",
    rating: 4.6,
  },
  {
    id: 3,
    title: "Minimalist Wrist Watch",
    seller: "TimePiece Lab",
    price: 850,
    originalPrice: 1100,
    badge: "Sale",
    image: "https://images.unsplash.com/photo-1758887952896-8491d393afe2?w=400&q=80",
    rating: 4.9,
  },
  {
    id: 4,
    title: "Glow Skincare Set",
    seller: "Pure Botanics",
    price: 450,
    originalPrice: null,
    badge: "New",
    image: "https://images.unsplash.com/photo-1656103743126-656ce0ed6291?w=400&q=80",
    rating: 4.7,
  },
  {
    id: 5,
    title: "Urban Laptop Backpack",
    seller: "CarryOn Goods",
    price: 650,
    originalPrice: 900,
    badge: "Sale",
    image: "https://images.unsplash.com/photo-1585501954260-372cec60d355?w=400&q=80",
    rating: 4.5,
  },
  {
    id: 6,
    title: "Retro UV Sunglasses",
    seller: "LensWorld",
    price: 350,
    originalPrice: null,
    badge: null,
    image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400&q=80",
    rating: 4.4,
  },
];

// ─── Component ───────────────────────────────────────────────────────────────

export function Home() {
  const loading = usePageLoading(800);
  const navigate = useNavigate();

  const [balanceHidden, setBalanceHidden] = useState(true);
  const [pinInput, setPinInput] = useState("");
  const [showPinModal, setShowPinModal] = useState(false);
  const [pinError, setPinError] = useState("");
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [likedPosts, setLikedPosts] = useState<number[]>([]);



  function grace(delay = 0) {
    return {
      duration: 0.62,
      delay,
      ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
    };
  }

  const handleToggleBalance = () => {
    if (balanceHidden) {
      setShowPinModal(true);
      setPinInput("");
      setPinError("");
    } else {
      setBalanceHidden(true);
    }
  };

  const verifyPin = (pinStr: string) => {
    const savedPin = localStorage.getItem("userPin") || "1234";
    if (pinStr === savedPin) {
      setBalanceHidden(false);
      setShowPinModal(false);
    } else {
      setPinError("Incorrect PIN");
      setTimeout(() => { setPinInput(""); setPinError(""); }, 1000);
    }
  };

  const handlePinPress = (digit: string) => {
    if (pinInput.length < 4) {
      const updated = pinInput + digit;
      setPinInput(updated);
      if (updated.length === 4) verifyPin(updated);
    }
  };

  const toggleLike = (id: number) =>
    setLikedPosts((prev) => prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]);

  const getUserInitials = () => {
    const raw = localStorage.getItem("userKyc");
    if (raw) {
      const kyc = JSON.parse(raw);
      return kyc.fullName?.split(" ").map((n: string) => n[0]).join("") || "K";
    }
    return "K";
  };

  const profilePhoto = localStorage.getItem("userProfilePhoto");

  return (
    <div className="w-full relative min-h-[100dvh] bg-transparent overflow-x-hidden font-sans pb-28">

      {/* ── ORANGE DASHBOARD HEADER ── */}
      <div
        className="relative pt-0 pb-0 px-5 overflow-hidden rounded-b-[40px] shadow-lg flex flex-col items-center justify-center gap-2.5 h-[100px]"
        style={{ background: "linear-gradient(135deg, #FF8C00, #e06900)", boxShadow: "0 10px 30px rgba(255,140,0,0.12)" }}
      >
        <div className="w-full flex flex-col items-center gap-2.5 -translate-y-2">
        {/* Grid texture */}
        <div className="absolute inset-0 opacity-[0.25]" style={{ WebkitMaskImage: "radial-gradient(circle at top left, white, transparent 80%)", maskImage: "radial-gradient(circle at top left, white, transparent 80%)" }}>
          <svg width="100%" height="100%">
            <defs>
              <pattern id="home-grid" width="32" height="32" patternUnits="userSpaceOnUse">
                <path d="M 32 0 L 0 0 0 32" fill="none" stroke="white" strokeWidth="1.5" strokeOpacity="0.6" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#home-grid)" />
          </svg>
        </div>
        <div className="absolute top-[-20%] left-[-10%] w-64 h-64 bg-white/20 rounded-full blur-[60px] pointer-events-none" />
        <div className="absolute bottom-[-10%] right-[-10%] w-48 h-48 bg-[#FFC300]/20 rounded-full blur-[50px] pointer-events-none" />

        {/* Top Nav Row */}
        <div className="relative z-10 flex items-center justify-between w-full h-10 gap-3">
          <Link to="/" className="flex-shrink-0">
            <img src={kleenchLogo} alt="KLEENCH" className="h-6 w-auto object-contain brightness-0 invert" />
          </Link>

          {/* Expandable Search */}
          <div className="flex-1 flex justify-end overflow-hidden">
            <motion.div
              layout initial={false}
              animate={{ width: isSearchOpen ? "100%" : "auto" }}
              className={`flex items-center text-white transition-all ${isSearchOpen ? "bg-white/20 backdrop-blur-md border border-white/10 rounded-2xl px-3 h-10" : "cursor-pointer hover:text-white/80 active:scale-95 px-2"}`}
              onClick={() => !isSearchOpen && setIsSearchOpen(true)}
            >
              <Search size={20} className="flex-shrink-0" />
              <AnimatePresence>
                {isSearchOpen && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, transition: { duration: 0.1 } }} className="flex items-center flex-1 ml-2 min-w-0">
                    <input autoFocus type="text" placeholder="Search..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="bg-transparent text-white placeholder-white/70 text-[13px] outline-none flex-1 min-w-0" />
                    <button onClick={(e) => { e.stopPropagation(); searchQuery ? setSearchQuery("") : setIsSearchOpen(false); }} className="ml-1 p-1 hover:text-white/80 transition-colors flex-shrink-0">
                      <X size={14} />
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>

          {/* Nav Icons */}
          <div className="flex items-center gap-3.5 flex-shrink-0 pr-1">
            <Link to="/messages" className="text-white hover:text-white/80 transition-all active:scale-95">
              <MessageCircle size={20} />
            </Link>
            <Link to="/settings" className="text-white hover:text-white/80 transition-all active:scale-95">
              <Settings size={20} />
            </Link>
            <Link to="/notifications" className="relative text-white hover:text-white/80 transition-all active:scale-95">
              <Bell size={20} />
              <span className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-[#FFC300] rounded-full border border-[#e06900]" />
            </Link>
            <Link to="/profile" className="w-8 h-8 rounded-full border-2 border-white/40 overflow-hidden bg-white/20 shrink-0 shadow-sm hover:scale-105 transition-transform active:scale-95">
              {profilePhoto ? (
                <img src={profilePhoto} alt="Profile" className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-white text-[10px] font-black uppercase">
                  {getUserInitials()}
                </div>
              )}
            </Link>
          </div>
        </div>

        {/* Wallet + Quick Actions Bar */}
        <motion.div
          initial={{ opacity: 0, y: 10 }} 
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="relative z-10 flex items-center justify-between bg-white/10 backdrop-blur-md border border-white/20 rounded-full p-1.5 px-4 shadow-[0_4px_24px_rgba(0,0,0,0.06)] w-full max-w-[280px] mx-auto"
        >
          <div className="flex items-center gap-2">
            <div className="min-w-0">
              <p className="text-white/60 text-[8px] font-bold uppercase tracking-widest leading-none mb-1">Total Balance</p>
              <div className="flex items-center gap-2">
                <h2 className="text-white text-[15px] font-black tracking-tight leading-none">
                  {balanceHidden ? "••••••" : "K2,450.00"}
                </h2>
                <button onClick={handleToggleBalance} className="text-white/40 hover:text-white transition-colors">
                  {balanceHidden ? <EyeOff size={12} /> : <Eye size={12} />}
                </button>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-1.5 pl-2.5 border-l border-white/15">
            {[
              { icon: ArrowDownToLine, label: "Deposit", to: "/wallet" },
              { icon: Send, label: "Send", to: "/wallet", rotate: true },
              { icon: ArrowUpFromLine, label: "Withdraw", to: "/wallet" },
            ].map(({ icon: Icon, label, to, rotate }) => (
              <Link key={label} to={to} title={label}
                className="w-7 h-7 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center text-white transition-all active:scale-95 border border-white/10 shadow-sm">
                <Icon size={14} className={rotate ? "-rotate-12 translate-x-0.5" : ""} />
              </Link>
            ))}
          </div>
        </motion.div>
        </div>
      </div>

      {loading ? (
        <div className="mt-6">
          <PageSkeletons.Home />
        </div>
      ) : (
        <>

      {/* ── REELS CAROUSEL: "EARN TODAY" VERTICAL VIDEO CARDS ── */}
      <div className="px-5 mt-6 relative z-10">
        <div className="flex items-center gap-3 mb-4">
          <span className="text-[#FF8C00] font-black text-[8px] uppercase tracking-[0.4em]">01.</span>
          <h3 className="font-black text-[10px] uppercase tracking-[0.4em] text-[#003366]/40">Earn Today</h3>
          <div className="flex-1 h-[2px] bg-[#003366]/5" />
        </div>

        {/* Horizontal Swipeable Container */}
        <div className="flex gap-4 overflow-x-auto pb-4 -mx-5 px-5 scrollbar-hide no-scrollbar appearance-none">
          {REELS.map((reel) => (
            <Link key={reel.id} to={reel.to}>
              <motion.div
                whileTap={{ scale: 0.96 }}
                className="relative flex-shrink-0 w-[160px] h-[260px] bg-white border-2 border-[#003366] overflow-hidden shadow-[6px_6px_0px_#003366] group"
              >
                {/* Thumbnail Image */}
                <img 
                  src={reel.image} 
                  alt={reel.label} 
                  className="w-full h-full object-cover grayscale-[0.2] group-hover:grayscale-0 transition-all duration-700"
                />

                {/* Dark Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/20 to-transparent" />

                {/* Centered Play Icon */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="w-14 h-14 rounded-full bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform duration-500">
                    <Play size={24} className="text-white fill-white ml-1" />
                  </div>
                </div>

                {/* Earning Badge (Top Right) */}
                <div className="absolute top-3 right-3 bg-[#FF8C00] border-2 border-[#003366] px-2 py-1 shadow-md">
                  <span className="text-[10px] font-black text-white uppercase tracking-tight">
                    {reel.reward}
                  </span>
                </div>

                {/* Title (Bottom Left) */}
                <div className="absolute bottom-4 left-4 right-4">
                  <p className="text-white font-black text-[15px] uppercase tracking-tighter leading-[0.9] drop-shadow-xl">
                    {reel.label.split(" ").map((word, i) => (
                      <span key={i} className="block">{word}</span>
                    ))}
                  </p>
                </div>

                {/* Highlight Effect */}
                <div className="absolute inset-x-0 top-0 h-[40%] bg-gradient-to-b from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              </motion.div>
            </Link>
          ))}
        </div>
      </div>

      {/* ── PRIMARY ACTIONS: LOAD ADVERT & REFER ── */}
      <div className="px-5 mt-2 relative z-10 grid grid-cols-2 gap-3">
        <motion.button
          whileTap={{ scale: 0.97 }}
          onClick={() => navigate("/advert")}
          className="relative overflow-hidden bg-[#003366] border-2 border-[#003366] shadow-[4px_4px_0px_#FF8C00] flex items-center gap-3 px-4 py-4 group active:shadow-none active:translate-x-1 active:translate-y-1 transition-all"
        >
          <div className="absolute inset-0 opacity-[0.07]" style={{ backgroundImage: "linear-gradient(45deg, #fff 12%, transparent 12%, transparent 50%, #fff 50%, #fff 62%, transparent 62%, transparent 100%)", backgroundSize: "8px 8px" }} />
          <div className="w-9 h-9 bg-[#FF8C00] flex items-center justify-center border border-[#FF8C00]/30 flex-shrink-0">
            <Megaphone size={17} className="text-white" />
          </div>
          <div className="text-left">
            <p className="text-white font-black text-[11px] uppercase tracking-tight leading-none">Load Advert</p>
            <p className="text-white/40 text-[8px] font-bold uppercase tracking-widest mt-1">Instant Rewards</p>
          </div>
        </motion.button>

        <motion.button
          whileTap={{ scale: 0.97 }}
          onClick={() => navigate("/referral")}
          className="relative overflow-hidden bg-[#FF8C00] border-2 border-[#003366] shadow-[4px_4px_0px_#003366] flex items-center gap-3 px-4 py-4 group active:shadow-none active:translate-x-1 active:translate-y-1 transition-all"
        >
          <div className="absolute inset-0 opacity-[0.1]" style={{ backgroundImage: "radial-gradient(#fff 1px, transparent 0)", backgroundSize: "12px 12px" }} />
          <div className="w-9 h-9 bg-[#003366] flex items-center justify-center border border-[#003366]/30 flex-shrink-0">
            <Gift size={17} className="text-white" />
          </div>
          <div className="text-left">
            <p className="text-[#003366] font-black text-[11px] uppercase tracking-tight leading-none">Refer & Share</p>
            <p className="text-[#003366]/50 text-[8px] font-bold uppercase tracking-widest mt-1">Earn ZMW 10.00</p>
          </div>
        </motion.button>
      </div>

      {/* ── SECTION 01. THE RAT TRAP FEED (Social Media Style Ad Feed) ── */}
      <motion.section
        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={grace(0.3)}
        className="mt-8 px-5 relative z-10"
      >
        <div className="flex items-center gap-3 mb-5">
          <span className="text-[#FF8C00] font-black text-xs tracking-[0.3em]">01.</span>
          <h3 className="font-black text-[10px] uppercase tracking-[0.4em] text-[#003366]/40">For You Feed</h3>
          <div className="flex-1 h-[2px] bg-[#003366]/5" />
          <div className="flex items-center gap-1 bg-[#FF8C00]/10 px-2 py-0.5 border border-[#FF8C00]/20">
             <TrendingUp size={10} className="text-[#FF8C00]" />
             <span className="text-[8px] font-black text-[#FF8C00] uppercase tracking-widest">Trending</span>
          </div>
        </div>

        <div className="flex flex-col gap-5">
          {FEED_ITEMS.map((item) => (
            <motion.article
              key={item.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              className="border-2 border-[#003366] bg-white shadow-[5px_5px_0px_#003366] overflow-hidden group hover:shadow-[7px_7px_0px_#FF8C00] transition-all"
            >
              {/* Feed Image */}
              <div className="relative w-full aspect-[16/9] overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

                {/* Tag badge */}
                <div className={`absolute top-3 left-3 ${item.tagColor} px-2 py-1 text-white text-[8px] font-black uppercase tracking-widest border border-white/10 shadow-sm`}>
                  {item.tag}
                </div>

                {/* Earn badge */}
                <div className="absolute top-3 right-3 bg-[#FFC300] text-black px-3 py-1 text-[10px] font-black flex items-center gap-1.5 shadow-lg border border-black/10">
                  <span className="w-1.5 h-1.5 rounded-full bg-black animate-pulse" />
                  EARN {item.reward}
                </div>

                {/* Play overlay */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="w-14 h-14 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/30">
                    <PlayCircle size={32} className="text-white" />
                  </div>
                </div>

                {/* Author Info */}
                <div className="absolute bottom-3 left-3 flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full border-2 border-[#FFC300] overflow-hidden flex-shrink-0 shadow-md">
                    <img src={item.avatar} alt={item.user} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="text-white font-black text-[11px] drop-shadow-lg">@{item.user}</span>
                    {item.verified && <BadgeCheck size={12} className="text-[#FFC300]" />}
                  </div>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-4">
                <h4 className="text-[#003366] font-black text-[13px] uppercase tracking-tight leading-snug mb-1.5 group-hover:text-[#FF8C00] transition-colors">
                  {item.title}
                </h4>
                <p className="text-[#003366]/50 text-[11px] font-medium leading-relaxed line-clamp-2 mb-3">
                  {item.body}
                </p>

                {/* Meta + Actions */}
                <div className="flex items-center justify-between border-t border-[#003366]/5 pt-3">
                  <div className="flex items-center gap-3 text-[9px] font-black uppercase tracking-widest text-[#003366]/30">
                    <span>{item.views} Views</span>
                    <span className="w-1 h-1 rounded-full bg-[#003366]/20" />
                    <span>{item.time}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <motion.button
                      whileTap={{ scale: 1.3 }}
                      onClick={() => toggleLike(item.id)}
                      className={`flex items-center gap-1.5 px-2.5 py-1.5 border transition-all ${likedPosts.includes(item.id) ? "border-[#FF3000] bg-[#FF3000]/5 text-[#FF3000]" : "border-[#003366]/10 text-[#003366]/30 hover:border-[#FF3000]/50 hover:text-[#FF3000]"}`}
                    >
                      <Heart size={12} fill={likedPosts.includes(item.id) ? "currentColor" : "none"} />
                      <span className="text-[9px] font-black">{item.likes}</span>
                    </motion.button>

                    <motion.button
                      whileTap={{ scale: 0.9 }}
                      className="flex items-center gap-1.5 px-2.5 py-1.5 border border-[#003366]/10 text-[#003366]/30 hover:border-[#003366]/30 hover:text-[#003366] transition-all"
                    >
                      <Share2 size={12} />
                      <span className="text-[9px] font-black">Share</span>
                    </motion.button>
                  </div>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </motion.section>

      {/* ── SECTION 02. MARKETPLACE DISCOVERY ── */}
      <motion.section
        initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true, amount: 0.1 }}
        transition={grace(0.1)}
        className="px-5 mt-10 relative z-10"
      >
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-3">
            <span className="text-[#FF8C00] font-black text-xs tracking-[0.3em]">02.</span>
            <h3 className="font-black text-[10px] uppercase tracking-[0.4em] text-[#003366]/40">Marketplace</h3>
          </div>
          <Link to="/marketplace" className="flex items-center gap-1.5 text-[9px] font-black text-[#FF8C00] uppercase tracking-widest hover:underline decoration-2 underline-offset-4">
            Browse All <ArrowRight size={11} />
          </Link>
        </div>

        {/* Horizontal scroll strip for products */}
        <div className="flex gap-4 overflow-x-auto -mx-5 px-5 pb-4 scrollbar-hide no-scrollbar">
          {MARKETPLACE_PRODUCTS.map((product, idx) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.07 }}
              className="flex-shrink-0 w-44 group"
            >
              <Link to={`/product/${product.id}`} className="block">
                <div className="relative aspect-square bg-white border-2 border-[#003366] overflow-hidden shadow-[4px_4px_0px_#003366] group-hover:shadow-[5px_5px_0px_#FF8C00] transition-all mb-3">
                  <img src={product.image} alt={product.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                  {product.badge && (
                    <div className={`absolute top-0 right-0 px-2 py-1 text-white text-[8px] font-black uppercase tracking-widest ${product.badge === "Hot" ? "bg-[#FF3000]" : "bg-[#FF8C00]"}`}>
                      {product.badge}
                    </div>
                  )}
                  <div className="absolute bottom-2 left-2 bg-[#003366] text-white px-1.5 py-0.5 text-[7px] font-bold uppercase tracking-wider shadow-sm">
                    Escrow Safe
                  </div>
                </div>

                <div className="space-y-0.5">
                  <h4 className="text-[10px] font-black uppercase text-[#003366] leading-tight line-clamp-2 group-hover:text-[#FF8C00] transition-colors">{product.title}</h4>
                  <div className="flex items-center justify-between pt-1">
                    <span className="text-[14px] font-black text-[#FF8C00]">K{product.price}</span>
                    <div className="flex items-center gap-0.5">
                      <Star size={9} className="text-[#FFC300] fill-[#FFC300]" />
                      <span className="text-[9px] font-bold text-[#003366]/40">{product.rating}</span>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* ── SECTION 03. EARN CHANNELS ── */}
      <motion.section
        initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
        transition={grace(0.1)}
        className="px-5 mt-10 relative z-10"
      >
        <div className="flex items-center gap-3 mb-5">
          <span className="text-[#FF8C00] font-black text-xs tracking-[0.3em]">03.</span>
          <h3 className="font-black text-[10px] uppercase tracking-[0.4em] text-[#003366]/40">Earn Channels</h3>
          <div className="flex-1 h-[2px] bg-[#003366]/5" />
        </div>

        <div className="grid grid-cols-1 gap-0 border-2 border-[#003366] bg-[#003366] divide-y-2 divide-[#003366]/10 shadow-[6px_6px_0px_#FF8C00]">
          {[
            { id: 1, title: "Watch & Earn", label: "Watch Ads", icon: Play, to: "/advert", tag: "Hot" },
            { id: 2, title: "Masterclass", label: "Education", icon: GraduationCap, to: "/learning", tag: "Learn" },
            { id: 3, title: "Data Survey", label: "Feedback", icon: ClipboardList, to: "/poll/create", tag: "Earn" },
            { id: 4, title: "Invite Friends", label: "Community", icon: Users, to: "/referral", tag: "Grow" },
          ].filter((item) =>
            item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.label.toLowerCase().includes(searchQuery.toLowerCase())
          ).map((item, idx) => (
            <Link key={item.id} to={item.to}>
              <motion.div
                whileTap={{ backgroundColor: "#003366" }}
                className="bg-white p-5 flex items-center justify-between group transition-all hover:bg-[#003366]/[0.02]"
              >
                <div className="flex items-center gap-6">
                  <span className="text-[10px] font-black text-[#003366]/15 tracking-widest">{(idx + 1).toString().padStart(2, "0")}.</span>
                  <div className="flex flex-col">
                    <span className="text-[#FF8C00] font-black text-[7px] uppercase tracking-[0.3em] mb-1.5">{item.label}</span>
                    <h3 className="text-[#003366] font-black text-[14px] uppercase tracking-tighter leading-none group-hover:text-[#FF8C00] transition-colors">
                      {item.title}
                    </h3>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-[8px] font-black uppercase tracking-widest px-2 py-1 bg-[#003366]/5 text-[#003366]/40 border border-[#003366]/10">{item.tag}</span>
                  <div className="w-8 h-8 border border-[#003366]/10 flex items-center justify-center text-[#003366]/30 group-hover:text-[#FF8C00] group-hover:border-[#FF8C00] transition-all">
                    <item.icon size={16} />
                  </div>
                </div>
              </motion.div>
            </Link>
          ))}
        </div>
      </motion.section>

      {/* ── FINAL CTA: REFER BANNER ── */}
      <motion.section
        initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true, amount: 0.2 }}
        className="px-5 mt-12 pb-12 relative z-10"
      >
        <motion.div
          whileTap={{ scale: 0.98 }}
          onClick={() => navigate("/referral")}
          className="relative overflow-hidden border-2 border-[#003366] bg-[#FF8C00] shadow-[6px_6px_0px_#003366] p-6 cursor-pointer group hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[8px_8px_0px_#003366] transition-all"
        >
          <div className="absolute inset-0 opacity-[0.12]" style={{ backgroundImage: "radial-gradient(#003366 1px, transparent 0)", backgroundSize: "14px 14px" }} />

          <div className="relative z-10 flex items-center justify-between gap-4">
            <div>
              <p className="text-[#003366] font-black text-[7px] uppercase tracking-[0.4em] mb-1.5">Network Growth</p>
              <h3 className="text-[#003366] font-black text-[22px] uppercase tracking-tighter leading-none mb-2">
                Refer &<br />Share
              </h3>
              <p className="text-[#003366]/60 text-[11px] font-bold leading-snug max-w-[180px]">
                Earn K10 for every verified friend who joins Kleench.
              </p>
              <div className="flex items-center gap-2 mt-4">
                <div className="flex items-center gap-2 bg-[#003366] text-white px-4 py-2 text-[9px] font-black uppercase tracking-widest group-hover:bg-[#002244] transition-colors">
                  <Sparkles size={11} className="text-[#FF8C00]" />
                  Invite Now
                </div>
              </div>
            </div>
            <div className="flex-shrink-0 flex flex-col items-center gap-1">
              <div className="w-16 h-16 rounded-full bg-[#003366] border-4 border-white/20 flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform">
                <Gift size={30} className="text-[#FF8C00]" />
              </div>
              <span className="text-[#003366] font-black text-[11px] uppercase tracking-tight">K10 / Reward</span>
            </div>
          </div>
        </motion.div>
      </motion.section>

      {/* ── Page Footer Feedback ── */}
      <motion.div
        initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
        className="mt-4 pb-8 px-5 flex flex-col items-center justify-center text-center opacity-30 hover:opacity-100 transition-opacity"
      >
        <div className="w-10 h-[2px] bg-[#003366]/10 mb-3" />
        <p className="text-[9px] font-black uppercase tracking-[0.3em] text-[#003366]">End of Dashboard</p>
        <p className="text-[8px] text-[#003366]/50 font-bold uppercase tracking-widest mt-1">Refreshed just now</p>
      </motion.div>
      </>
      )}

      {/* ── PIN Verification Modal ── */}
      <AnimatePresence>
        {showPinModal && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex flex-col items-center justify-end bg-[#003366]/60 backdrop-blur-md"
            onClick={() => setShowPinModal(false)}
          >
            <motion.div
              initial={{ y: "100%" }} animate={{ y: 0 }} exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 26, stiffness: 220 }}
              drag="y" dragConstraints={{ top: 0 }} dragElastic={0.2}
              onDragEnd={(_e: MouseEvent | TouchEvent | PointerEvent, { offset, velocity }: PanInfo) => {
                if (offset.y > 150 || velocity.y > 500) setShowPinModal(false);
              }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-md bg-white rounded-t-[48px] p-8 pb-12 shadow-2xl relative"
            >
              <div className="absolute top-0 left-0 w-full h-8 flex justify-center pt-3 cursor-grab active:cursor-grabbing">
                <div className="w-12 h-1.5 bg-gray-200 rounded-full" />
              </div>
              <div className="text-center mb-10 mt-4">
                <h3 className="text-2xl font-black text-[#003366] mb-2">Security PIN</h3>
                <p className="text-[14px] text-gray-500 font-medium px-10">Verification required to view balance</p>
              </div>
              <div className="flex justify-center gap-5 mb-10">
                {[0, 1, 2, 3].map((i) => (
                  <motion.div key={i} animate={{ scale: pinInput.length > i ? 1.2 : 1 }}
                    className={`w-4 h-4 rounded-full border-2 transition-all ${pinInput.length > i ? "bg-[#FF8C00] border-[#FF8C00]" : "border-gray-200"}`} />
                ))}
              </div>
              {pinError && (
                <motion.p initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="text-red-500 text-center text-sm font-bold mb-6">
                  {pinError}
                </motion.p>
              )}
              <div className="grid grid-cols-3 gap-4">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, "", 0, "backspace"].map((val, idx) => {
                  if (val === "") return <div key={idx} />;
                  return (
                    <motion.button
                      key={idx} whileTap={{ scale: 0.92 }}
                      onClick={() => { if (val === "backspace") setPinInput((p) => p.slice(0, -1)); else handlePinPress(String(val)); }}
                      className="h-20 rounded-3xl bg-gray-50 text-[#003366] text-2xl font-black flex items-center justify-center transition-colors active:bg-[#FF8C00] active:text-white"
                    >
                      {val === "backspace" ? <BackspaceKey size={24} color="currentColor" /> : val}
                    </motion.button>
                  );
                })}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
