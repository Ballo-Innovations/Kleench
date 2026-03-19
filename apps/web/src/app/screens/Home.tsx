import { Link, useNavigate } from "react-router";
import { useState, useEffect } from "react";
import { Coins, Gift, Send, Heart, MessageSquare, Share2, BookmarkPlus, ShoppingCart, Star, Eye, EyeOff, Lock, Delete } from "lucide-react";
import { motion } from "motion/react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { ShareReferralModal } from "../components/ShareReferralModal";

/* ─── Images ─── */
const HERO_BG =
  "https://images.unsplash.com/photo-1758843410814-45dd3afb0ce3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhYnN0cmFjdCUyMGNvbG9yZnVsJTIwZmx1aWQlMjBncmFkaWVudCUyMGRpZ2l0YWwlMjBhcnR8ZW58MXx8fHwxNzczOTA3MDY2fDA&ixlib=rb-4.1.0&q=80&w=1080";
const CREATOR_AVATAR =
  "https://images.unsplash.com/photo-1760543998147-117ae5649c5c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b21hbiUyMGVudHJlcHJlbmV1ciUyMHNtaWxpbmclMjBwcm9mZXNzaW9uYWwlMjBwb3J0cmFpdHxlbnwxfHx8fDE3NzM5MDcwNjZ8MA&ixlib=rb-4.1.0&q=80&w=400";

const REELS = [
  {
    id: 1,
    label: "Code Faster",
    image:
      "https://images.unsplash.com/photo-1648757838556-2ca6ec323d55?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2RpbmclMjBwcm9ncmFtbWluZyUyMGtleWJvYXJkJTIwaGFuZHN8ZW58MXx8fHwxNzczOTA2Njc0fDA&ixlib=rb-4.1.0&q=80&w=400",
  },
  {
    id: 2,
    label: "Agile Basics",
    image:
      "https://images.unsplash.com/photo-1769740333462-9a63bfa914bc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMHRlYW0lMjBtZWV0aW5nJTIwcHJlc2VudGF0aW9ufGVufDF8fHx8MTc3MzkwNTUwNnww&ixlib=rb-4.1.0&q=80&w=400",
  },
  {
    id: 3,
    label: "UI Principles",
    image:
      "https://images.unsplash.com/photo-1748801583967-3038967d7279?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2JpbGUlMjBVSSUyMGRlc2lnbiUyMHNjcmVlbiUyMHByb3RvdHlwZXxlbnwxfHx8fDE3NzM5MDY2Nzh8MA&ixlib=rb-4.1.0&q=80&w=400",
  },
  {
    id: 4,
    label: "Social Strategy",
    image:
      "https://images.unsplash.com/photo-1696041756040-c910a971f222?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkaWdpdGFsJTIwbWFya2V0aW5nJTIwc29jaWFsJTIwbWVkaWElMjBzdHJhdGVneSUyMHdvcmtzaG9wfGVufDF8fHx8MTc3MzkwNzA2OXww&ixlib=rb-4.1.0&q=80&w=400",
  },
];

const SHOP_ITEMS = [
  {
    id: 1,
    name: "Pro Noise-Cancelling Headphones",
    seller: "AudioTech Store",
    price: 89.99,
    originalPrice: 129.99,
    rating: 4.8,
    reviews: 124,
    image: "https://images.unsplash.com/photo-1612858249937-1cc0852093dd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3aXJlbGVzcyUyMGhlYWRwaG9uZXMlMjBwcm9kdWN0JTIwd2hpdGUlMjBiYWNrZ3JvdW5kfGVufDF8fHx8MTc3Mzg1NzU0NHww&ixlib=rb-4.1.0&q=80&w=400",
    badge: "Hot",
  },
  {
    id: 2,
    name: "Premium Leather Sneakers",
    seller: "Street Kicks Co.",
    price: 119.00,
    originalPrice: null,
    rating: 4.6,
    reviews: 87,
    image: "https://images.unsplash.com/photo-1771726588700-e3baad15ae16?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsZWF0aGVyJTIwc25lYWtlcnMlMjBzaG9lcyUyMHByb2R1Y3R8ZW58MXx8fHwxNzczOTA5NTI0fDA&ixlib=rb-4.1.0&q=80&w=400",
    badge: null,
  },
  {
    id: 3,
    name: "Minimalist Wrist Watch",
    seller: "TimePiece Lab",
    price: 74.99,
    originalPrice: 99.00,
    rating: 4.9,
    reviews: 203,
    image: "https://images.unsplash.com/photo-1758887952896-8491d393afe2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtaW5pbWFsJTIwd2F0Y2glMjB3cmlzdCUyMHByb2R1Y3R8ZW58MXx8fHwxNzczOTA5NTI1fDA&ixlib=rb-4.1.0&q=80&w=400",
    badge: "Sale",
  },
  {
    id: 4,
    name: "Glow Skincare Set",
    seller: "Pure Botanics",
    price: 44.50,
    originalPrice: null,
    rating: 4.7,
    reviews: 56,
    image: "https://images.unsplash.com/photo-1656103743126-656ce0ed6291?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxza2luY2FyZSUyMGJlYXV0eSUyMHByb2R1Y3QlMjBmbGF0bGF5fGVufDF8fHx8MTc3MzgwMzQyM3ww&ixlib=rb-4.1.0&q=80&w=400",
    badge: "New",
  },
  {
    id: 5,
    name: "Urban Laptop Backpack",
    seller: "CarryOn Goods",
    price: 59.00,
    originalPrice: 79.00,
    rating: 4.5,
    reviews: 142,
    image: "https://images.unsplash.com/photo-1585501954260-372cec60d355?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsYXB0b3AlMjBiYWclMjBiYWNrcGFjayUyMHByb2R1Y3R8ZW58MXx8fHwxNzczOTA5NTI2fDA&ixlib=rb-4.1.0&q=80&w=400",
    badge: "Sale",
  },
  {
    id: 6,
    name: "Retro UV Sunglasses",
    seller: "LensWorld",
    price: 32.00,
    originalPrice: null,
    rating: 4.4,
    reviews: 39,
    image: "https://images.unsplash.com/photo-1662928245746-6b4a1e90f8e4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdW5nbGFzc2VzJTIwZmFzaGlvbiUyMHByb2R1Y3R8ZW58MXx8fHwxNzczODA4NjY0fDA&ixlib=rb-4.1.0&q=80&w=400",
    badge: null,
  },
];

const BADGE_STYLES: Record<string, string> = {
  Hot:  "bg-[var(--live-red)] text-white",
  Sale: "bg-[var(--action-gold)] text-[var(--ink-primary)]",
  New:  "bg-[var(--trust-blue)] text-white",
};

const stagger = { animate: { transition: { staggerChildren: 0.07 } } };
const fadeUp = {
  initial: { opacity: 0, y: 16 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
  },
};

export function Home() {
  const [balanceHidden, setBalanceHidden] = useState(true);
  const [pinModalOpen, setPinModalOpen] = useState(false);
  const [enteredPin, setEnteredPin] = useState("");
  const [shake, setShake] = useState(false);
  const [userProfilePhoto, setUserProfilePhoto] = useState<string | null>(null);
  const [shareModalOpen, setShareModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<{ title: string; price: number; id: number } | null>(null);
  const [heroLiked, setHeroLiked] = useState(false);
  const [wishlistedItems, setWishlistedItems] = useState<Set<number>>(new Set());
  const navigate = useNavigate();

  useEffect(() => {
    // Load user profile photo from localStorage
    const savedPhoto = localStorage.getItem("userProfilePhoto");
    if (savedPhoto) {
      setUserProfilePhoto(savedPhoto);
    }
  }, []);

  function handleEyeClick() {
    if (balanceHidden) {
      setBalanceHidden(false);
    } else {
      setEnteredPin("");
      setPinModalOpen(true);
    }
  }

  function handlePinDigit(digit: string) {
    if (enteredPin.length >= 4) return;
    const next = enteredPin + digit;
    setEnteredPin(next);
    if (next.length === 4) {
      if (next === "0000") {
        setTimeout(() => {
          setPinModalOpen(false);
          setBalanceHidden(true);
          setEnteredPin("");
        }, 180);
      } else {
        setShake(true);
        setTimeout(() => {
          setEnteredPin("");
          setShake(false);
        }, 600);
      }
    }
  }

  function handlePinDelete() {
    setEnteredPin((p) => p.slice(0, -1));
  }

  function handleShareProduct(e: React.MouseEvent, item: typeof SHOP_ITEMS[0]) {
    e.preventDefault();
    e.stopPropagation();
    setSelectedProduct({ title: item.name, price: item.price, id: item.id });
    setShareModalOpen(true);
  }

  return (
    <>
      {/* ── PIN Modal ── */}
      {pinModalOpen && (
        <div
          className="fixed inset-0 z-[200] flex items-end justify-center"
          style={{ backgroundColor: "rgba(0,0,0,0.55)", backdropFilter: "blur(4px)" }}
          onClick={() => { setPinModalOpen(false); setEnteredPin(""); }}
        >
          <motion.div
            initial={{ y: 80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 80, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
            className="w-full max-w-sm bg-white rounded-t-3xl px-6 pt-6 pb-10 flex flex-col items-center gap-6"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Handle bar */}
            <div className="w-10 h-1 rounded-full bg-black/10" />

            {/* Lock icon + title */}
            <div className="flex flex-col items-center gap-2">
              <div className="w-12 h-12 rounded-full bg-[var(--trust-blue)]/10 flex items-center justify-center">
                <Lock size={22} className="text-[var(--trust-blue)]" strokeWidth={2.5} />
              </div>
              <h3
                className="font-[var(--font-header)] text-[var(--ink-primary)]"
                style={{ fontSize: "18px", fontWeight: 800 }}
              >
                Enter PIN
              </h3>
              <p
                className="font-[var(--font-body)] text-[var(--ink-muted)] text-center"
                style={{ fontSize: "13px" }}
              >
                Enter your 4-digit PIN to view your balance
              </p>
            </div>

            {/* PIN dots */}
            <motion.div
              animate={shake ? { x: [-8, 8, -6, 6, -3, 3, 0] } : { x: 0 }}
              transition={{ duration: 0.5 }}
              className="flex items-center gap-4"
            >
              {[0, 1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="w-4 h-4 rounded-full border-2 transition-all duration-150"
                  style={{
                    backgroundColor: enteredPin.length > i
                      ? "var(--trust-blue)"
                      : "transparent",
                    borderColor: enteredPin.length > i
                      ? "var(--trust-blue)"
                      : "#d1d5db",
                  }}
                />
              ))}
            </motion.div>

            {/* Error message */}
            {enteredPin.length === 4 && (
              <p
                className="font-[var(--font-body)] text-center -mt-2"
                style={{ fontSize: "12px", color: "var(--live-red)", fontWeight: 600 }}
              >
                Incorrect PIN. Try again.
              </p>
            )}

            {/* Keypad */}
            <div className="grid grid-cols-3 gap-3 w-full">
              {["1","2","3","4","5","6","7","8","9","","0","del"].map((key) => {
                if (key === "") return <div key="empty" />;
                if (key === "del") return (
                  <motion.button
                    key="del"
                    whileTap={{ scale: 0.88 }}
                    onClick={handlePinDelete}
                    className="h-14 rounded-2xl bg-[#f3f3f3] flex items-center justify-center"
                  >
                    <Delete size={18} className="text-[var(--ink-primary)]" strokeWidth={2} />
                  </motion.button>
                );
                return (
                  <motion.button
                    key={key}
                    whileTap={{ scale: 0.88 }}
                    onClick={() => handlePinDigit(key)}
                    className="h-14 rounded-2xl bg-[#f3f3f3] font-[var(--font-header)] text-[var(--ink-primary)]"
                    style={{ fontSize: "20px", fontWeight: 700 }}
                  >
                    {key}
                  </motion.button>
                );
              })}
            </div>

            {/* Cancel */}
            <button
              onClick={() => { setPinModalOpen(false); setEnteredPin(""); }}
              className="font-[var(--font-body)] text-[var(--ink-muted)]"
              style={{ fontSize: "13px", fontWeight: 500 }}
            >
              Cancel
            </button>
          </motion.div>
        </div>
      )}

      <motion.div
        className="flex flex-col gap-6 pb-4"
        variants={stagger}
        initial="initial"
        animate="animate"
      >
        {/* ── 1. Financial Header & Quick Actions ── */}
        <motion.section variants={fadeUp} className="px-4 flex flex-col gap-4">
          {/* Balance card */}
          <div className="flex items-center justify-between bg-white rounded-2xl p-4 shadow-sm border border-black/[0.04]">
            <div className="flex items-center gap-3">
              {/* Avatar */}
              <div className="w-12 h-12 rounded-full overflow-hidden bg-[var(--surface-raised)] flex-shrink-0 ring-2 ring-[var(--action-gold)]/30">
                <ImageWithFallback
                  src={userProfilePhoto || CREATOR_AVATAR}
                  alt="User avatar"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex flex-col">
                <span
                  className="text-[var(--ink-muted)] font-[var(--font-body)]"
                  style={{ fontSize: "12px", fontWeight: 500 }}
                >
                  Available Balance
                </span>
                <span
                  className="font-[var(--font-header)] text-[var(--ink-primary)] leading-none mt-0.5"
                  style={{ fontSize: "26px", fontWeight: 800, letterSpacing: "-0.02em" }}
                >
                  <span className="flex items-center gap-2">
                    <span>{balanceHidden ? "$1,250.75" : "*****"}</span>
                    <button
                      onClick={handleEyeClick}
                      className="text-[var(--ink-muted)] flex items-center"
                      style={{ fontSize: "0px" }}
                    >
                      {balanceHidden
                        ? <EyeOff size={16} strokeWidth={2} />
                        : <Eye size={16} strokeWidth={2} />}
                    </button>
                  </span>
                </span>
              </div>
            </div>
          </div>

          {/* Quick action pills */}
          <div className="flex gap-2.5 overflow-x-auto pb-1" style={{ scrollbarWidth: "none" }}>
            {/* Earnings — Gold */}
            <Link to="/wallet">
              <motion.button
                whileTap={{ scale: 0.93 }}
                className="flex items-center gap-1.5 px-4 py-2.5 rounded-full bg-[var(--action-gold)] text-[var(--ink-primary)] font-[var(--font-header)] whitespace-nowrap shadow-sm"
                style={{ fontSize: "13px", fontWeight: 700 }}
              >
                <Coins size={16} />
                Earnings
              </motion.button>
            </Link>
            {/* Rewards — neutral */}
            <Link to={`/profile/${localStorage.getItem("username") || "user"}`}>
              <motion.button
                whileTap={{ scale: 0.93 }}
                className="flex items-center gap-1.5 px-4 py-2.5 rounded-full bg-[#e8e8e8] text-[var(--ink-primary)] font-[var(--font-header)] whitespace-nowrap"
                style={{ fontSize: "13px", fontWeight: 700 }}
              >
                <Gift size={16} />
                Rewards
              </motion.button>
            </Link>
            {/* Send — Trust Blue */}
            <Link to="/wallet">
              <motion.button
                whileTap={{ scale: 0.93 }}
                className="flex items-center gap-1.5 px-4 py-2.5 rounded-full bg-[var(--trust-blue)] text-white font-[var(--font-header)] whitespace-nowrap shadow-sm"
                style={{ fontSize: "13px", fontWeight: 700 }}
              >
                <Send size={15} />
                Send
              </motion.button>
            </Link>
            {/* Save — neutral */}
            <Link to="/learning">
              <motion.button
                whileTap={{ scale: 0.93 }}
                className="flex items-center gap-1.5 px-4 py-2.5 rounded-full bg-[#e8e8e8] text-[var(--ink-primary)] font-[var(--font-header)] whitespace-nowrap"
                style={{ fontSize: "13px", fontWeight: 700 }}
              >
                <BookmarkPlus size={16} />
                Save
              </motion.button>
            </Link>
          </div>
        </motion.section>

        {/* ── 2. Main Hybrid Feed / Hero Feature Card ── */}
        <motion.section variants={fadeUp} className="px-4">
          <Link to="/learning/1">
            <div
              className="relative bg-[var(--surface-raised)] rounded-2xl overflow-hidden flex flex-col justify-end"
              style={{ aspectRatio: "4/5" }}
            >
              {/* Background image */}
              <ImageWithFallback
                src={HERO_BG}
                alt="Featured content background"
                className="absolute inset-0 w-full h-full object-cover"
              />

              {/* Dark gradient overlay — bottom-heavy */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

              {/* ── Right sidebar: LIVE creator + actions ── */}
              <div className="absolute right-4 top-4 bottom-24 flex flex-col items-center justify-end gap-4 z-10">
                {/* Creator avatar + LIVE badge */}
                <div className="relative mb-1">
                  <div className="w-11 h-11 rounded-full overflow-hidden border-2 border-white shadow-md">
                    <ImageWithFallback
                      src={CREATOR_AVATAR}
                      alt="Creator avatar"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <motion.span
                    animate={{ opacity: [1, 0.6, 1] }}
                    transition={{ duration: 1.6, repeat: Infinity }}
                    className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 bg-[var(--live-red)] text-white px-1.5 py-[2px] rounded-full font-[var(--font-body)] uppercase tracking-wider shadow-md"
                    style={{ fontSize: "8px", fontWeight: 700 }}
                  >
                    Live
                  </motion.span>
                </div>

                {/* Heart */}
                <motion.button
                  whileTap={{ scale: 0.85 }}
                  onClick={(e) => {
                    e.preventDefault();
                    setHeroLiked(!heroLiked);
                  }}
                  className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/10"
                >
                  <Heart size={18} className={heroLiked ? "text-red-500 fill-red-500" : "text-white"} />
                </motion.button>

                {/* Chat */}
                <motion.button
                  whileTap={{ scale: 0.85 }}
                  onClick={(e) => {
                    e.preventDefault();
                    navigate("/friends");
                  }}
                  className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/10"
                >
                  <MessageSquare size={18} className="text-white" />
                </motion.button>

                {/* Share */}
                <motion.button
                  whileTap={{ scale: 0.85 }}
                  onClick={(e) => {
                    e.preventDefault();
                    setSelectedProduct({ title: "Digital Masterclass: UX Architecture", price: 49.99, id: 1 });
                    setShareModalOpen(true);
                  }}
                  className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/10"
                >
                  <Share2 size={18} className="text-white" />
                </motion.button>
              </div>

              {/* ── Bottom content info ── */}
              <div className="relative z-10 p-5" style={{ width: "83%" }}>
                {/* LEARNING tag */}
                <span
                  className="inline-block px-2.5 py-1 bg-[var(--trust-blue)]/80 backdrop-blur-sm text-white rounded font-[var(--font-header)] uppercase tracking-wider mb-3"
                  style={{ fontSize: "10px", fontWeight: 700 }}
                >
                  Learning
                </span>

                {/* Title */}
                <h2
                  className="font-[var(--font-header)] text-white mb-2 leading-tight"
                  style={{ fontSize: "22px", fontWeight: 800 }}
                >
                  Digital Masterclass:<br />UX Architecture
                </h2>

                {/* Description */}
                <p
                  className="text-white/80 font-[var(--font-body)] mb-4 line-clamp-2"
                  style={{ fontSize: "13px" }}
                >
                  Learn how to build scalable design systems from industry leaders. Live Q&amp;A included.
                </p>

                {/* Price + CTA */}
                <div className="flex items-center gap-3">
                  <span
                    className="font-[var(--font-header)] text-[var(--action-gold)]"
                    style={{ fontSize: "20px", fontWeight: 800 }}
                  >
                    $49.99
                  </span>
                  <span
                    className="bg-white text-[var(--trust-blue)] px-4 py-2 rounded-lg font-[var(--font-header)] shadow-md inline-block"
                    style={{ fontSize: "13px", fontWeight: 700 }}
                  >
                    Join Now
                  </span>
                </div>
              </div>
            </div>
          </Link>
        </motion.section>

        {/* ── 3. Trending in Edutech ── */}
        <motion.section
          variants={fadeUp}
          className="py-5"
          style={{ backgroundColor: "#f3f3f3" }}
        >
          <div className="flex items-center justify-between pl-4 pr-4 mb-4">
            <h3
              className="font-[var(--font-header)] text-[var(--ink-primary)]"
              style={{ fontSize: "17px", fontWeight: 800 }}
            >
              Trending in Edutech
            </h3>
            <Link
              to="/learning"
              className="font-[var(--font-body)] text-[var(--trust-blue)] uppercase tracking-wider"
              style={{ fontSize: "11px", fontWeight: 700 }}
            >
              See all
            </Link>
          </div>

          {/* 9:16 reel cards – horizontal scroll */}
          <div
            className="flex gap-4 overflow-x-auto pl-4 pr-4"
            style={{ scrollbarWidth: "none" }}
          >
            {REELS.map((reel, i) => (
              <motion.div
                key={reel.id}
                initial={{ opacity: 0, x: 24 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.15 + 0.08 * i }}
                className="flex-shrink-0"
                style={{ width: 140 }}
              >
                <Link to={`/product/${reel.id}`} className="block">
                  <div
                    className="relative rounded-2xl overflow-hidden bg-[var(--surface-raised)]"
                    style={{ aspectRatio: "9/16" }}
                  >
                    <ImageWithFallback
                      src={reel.image}
                      alt={reel.label}
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                    <div className="absolute bottom-3 left-3 right-3">
                      <p
                        className="text-white font-[var(--font-header)] leading-tight"
                        style={{ fontSize: "12px", fontWeight: 700 }}
                      >
                        {reel.label}
                      </p>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* ── 4. Shop ── */}
        <motion.section variants={fadeUp} className="px-4 flex flex-col gap-4">
          {/* Section header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <h3
                className="font-[var(--font-header)] text-[var(--ink-primary)]"
                style={{ fontSize: "17px", fontWeight: 800 }}
              >
                Shop
              </h3>
              <span className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-[var(--action-gold)]/15 text-[var(--action-gold-dark)]"
                    style={{ fontSize: "10px", fontWeight: 700 }}>
                <ShoppingCart size={10} strokeWidth={2.5} />
                Escrow Protected
              </span>
            </div>
            <Link
              to="/marketplace"
              className="font-[var(--font-body)] text-[var(--trust-blue)] uppercase tracking-wider"
              style={{ fontSize: "11px", fontWeight: 700 }}
            >
              See all
            </Link>
          </div>

          {/* 2-column product grid */}
          <div className="grid grid-cols-2 gap-3">
            {SHOP_ITEMS.map((item, i) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.1 + 0.07 * i }}
              >
                <Link to={`/product/${item.id}`} className="block">
                  <div className="bg-white rounded-2xl overflow-hidden border border-black/[0.04] shadow-sm">
                    {/* Product image */}
                    <div className="relative" style={{ aspectRatio: "1/1" }}>
                      <ImageWithFallback
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                      {/* Badge */}
                      {item.badge && (
                        <span
                          className={`absolute top-2 left-2 px-2 py-0.5 rounded-full font-[var(--font-body)] ${BADGE_STYLES[item.badge]}`}
                          style={{ fontSize: "9px", fontWeight: 700 }}
                        >
                          {item.badge}
                        </span>
                      )}
                      {/* Wishlist */}
                      <motion.button
                        whileTap={{ scale: 0.85 }}
                        onClick={(e) => {
                          e.preventDefault();
                          setWishlistedItems(prev => {
                            const next = new Set(prev);
                            if (next.has(item.id)) {
                              next.delete(item.id);
                            } else {
                              next.add(item.id);
                            }
                            return next;
                          });
                        }}
                        className="absolute top-2 right-2 w-7 h-7 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center shadow-sm"
                      >
                        <Heart size={13} className={wishlistedItems.has(item.id) ? "text-red-500 fill-red-500" : "text-[var(--ink-muted)]"} strokeWidth={2} />
                      </motion.button>
                      {/* Share */}
                      <motion.button
                        whileTap={{ scale: 0.85 }}
                        onClick={(e) => handleShareProduct(e, item)}
                        className="absolute top-2 right-10 w-7 h-7 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center shadow-sm"
                      >
                        <Share2 size={13} className="text-[var(--ink-muted)]" strokeWidth={2} />
                      </motion.button>
                    </div>

                    {/* Product info */}
                    <div className="p-3 flex flex-col gap-1.5">
                      <p
                        className="font-[var(--font-body)] text-[var(--ink-primary)] leading-snug line-clamp-2"
                        style={{ fontSize: "12px", fontWeight: 600 }}
                      >
                        {item.name}
                      </p>
                      <p
                        className="font-[var(--font-body)] text-[var(--ink-muted)]"
                        style={{ fontSize: "10px" }}
                      >
                        {item.seller}
                      </p>

                      {/* Rating */}
                      <div className="flex items-center gap-1">
                        <Star size={10} className="text-[var(--action-gold-dark)] fill-[var(--action-gold)]" strokeWidth={0} />
                        <span
                          className="font-[var(--font-body)] text-[var(--ink-secondary)]"
                          style={{ fontSize: "10px", fontWeight: 600 }}
                        >
                          {item.rating}
                        </span>
                        <span
                          className="font-[var(--font-body)] text-[var(--ink-muted)]"
                          style={{ fontSize: "10px" }}
                        >
                          ({item.reviews})
                        </span>
                      </div>

                      {/* Price row */}
                      <div className="flex items-center justify-between mt-0.5">
                        <div className="flex items-baseline gap-1.5">
                          <span
                            className="font-[var(--font-header)] text-[var(--ink-primary)]"
                            style={{ fontSize: "15px", fontWeight: 800 }}
                          >
                            ${item.price.toFixed(2)}
                          </span>
                          {item.originalPrice && (
                            <span
                              className="font-[var(--font-body)] text-[var(--ink-muted)] line-through"
                              style={{ fontSize: "10px" }}
                            >
                              ${item.originalPrice.toFixed(2)}
                            </span>
                          )}
                        </div>
                        <motion.button
                          whileTap={{ scale: 0.88 }}
                          onClick={(e) => {
                            e.preventDefault();
                            navigate(`/product/${item.id}`);
                          }}
                          className="w-7 h-7 rounded-lg bg-[var(--trust-blue)] flex items-center justify-center shadow-sm"
                        >
                          <ShoppingCart size={13} className="text-white" strokeWidth={2.5} />
                        </motion.button>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.section>
      </motion.div>

      {/* ── Share Referral Modal ── */}
      {shareModalOpen && selectedProduct && (
        <ShareReferralModal
          isOpen={shareModalOpen}
          productTitle={selectedProduct.title}
          productPrice={selectedProduct.price}
          productId={selectedProduct.id}
          onClose={() => setShareModalOpen(false)}
        />
      )}
    </>
  );
}
