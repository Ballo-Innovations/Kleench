import {
  Play, ArrowRight,
  BadgeCheck,
  X, MessageCircle
} from "lucide-react";
import { 
  DuotoneUpload, 
  DuotoneSend, 
  DuotoneUserPlus, 
  DuotoneLike, 
  DuotoneMessage, 
  DuotoneShare,
  DuotoneUsers
} from "../components/DuotoneIcon";
import { motion, AnimatePresence } from "motion/react";
import { useState } from "react";

import { Link } from "react-router";
import { usePageLoading } from "../components/PageSkeletons";
import { Skeleton } from "boneyard-js/react";
import { PageHeader } from "../components/PageHeader";

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
    views: "34.2K",
    time: "Sponsored",
    likes: 2400,
    comments: 42,
    shares: 18,
    tag: "ADVERT",
    tagColor: "bg-[var(--app-orange)]",
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
    views: "18.6K",
    time: "Sponsored",
    likes: 1100,
    comments: 24,
    shares: 12,
    tag: "ADVERT",
    tagColor: "bg-[var(--app-orange)]",
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
    views: "12.4K",
    time: "2h ago",
    likes: 892,
    comments: 18,
    shares: 9,
    tag: "HOT",
    tagColor: "bg-[var(--app-shape-accent)]",
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
    views: "8.1K",
    time: "4h ago",
    likes: 403,
    comments: 12,
    shares: 8,
    tag: "EARN",
    tagColor: "bg-[var(--color-tertiary)]",
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

  const [activeSheet, setActiveSheet] = useState<null | "Upload" | "Share" | "Register Agent">(null);
  const [likedPosts, setLikedPosts] = useState<Set<number>>(new Set());

  const toggleLike = (postId: number) => {
    setLikedPosts(prev => {
      const next = new Set(prev);
      if (next.has(postId)) next.delete(postId);
      else next.add(postId);
      return next;
    });
  };

  const handleActionClick = (actionName: string) => {
     setActiveSheet(actionName as "Upload" | "Share" | "Register Agent" | null);
  };

  return (
    <div className="w-full relative min-h-[100dvh] bg-transparent overflow-x-hidden font-sans pb-28">

      {/* ── ORANGE DASHBOARD HEADER ── */}
      <PageHeader useLogo />

      <Skeleton loading={loading} name="home">
      {/* ── PRIMARY ACTIONS: UPLOAD, SHARE, REGISTER ── */}
      <div className="px-5 mt-4 relative z-10 flex items-center justify-center gap-6">
        {[
          { id: "Upload", icon: DuotoneUpload, label: "UPLOAD", color: "text-[var(--app-text)]" },
          { id: "Share", icon: DuotoneSend, label: "SHARE", color: "text-[var(--app-text)]" },
          { id: "Register Agent", icon: DuotoneUserPlus, label: "REGISTER\nAGENT", color: "text-[var(--app-text)]" },
        ].map((item, i) => (
          <motion.div
            key={i}
            whileTap={{ scale: 0.92 }}
            onClick={() => handleActionClick(item.id)}
            className="flex flex-col items-center justify-center gap-1 group outline-none cursor-pointer"
          >
            <div className="w-10 h-10 bg-[var(--app-bg)] rounded-full flex flex-col items-center justify-center border border-slate-100 shadow-[0_4px_12px_rgba(0,51,102,0.05)] group-active:scale-95 transition-all">
              <item.icon size={22} />
            </div>
            <span className="font-bold text-[var(--app-text)] text-[7px] uppercase tracking-[0.15em] text-center leading-tight whitespace-pre-line w-14">
              {item.label}
            </span>
          </motion.div>
        ))}
      </div>

      {/* ── INFINITE CONTENT CYCLE ── */}
      <div className="mt-2 flex flex-col gap-4 pb-8">
        {(function renderCycle() {
          const cycleBlocks = [
            // Sequence 1: Reels -> Post 1
            { type: "reels", data: REELS, title: "REELS", id: "reels-1" },
            { type: "post", data: FEED_ITEMS[0], id: "post-1" },
            // Sequence 2: Market -> Post 2
            { type: "market", data: MARKETPLACE_PRODUCTS, title: "Market", id: "market-1" },
            { type: "post", data: FEED_ITEMS[1], id: "post-2" },
            // Sequence 3: Reels 2 -> Post 3
            { type: "reels", data: REELS, title: "REELS", id: "reels-2" },
            { type: "post", data: FEED_ITEMS[2], id: "post-3" },
            // Sequence 4: Market 2 -> Post 4
            { type: "market", data: MARKETPLACE_PRODUCTS, title: "Market", id: "market-2" },
            { type: "post", data: FEED_ITEMS[3], id: "post-4" },
          ];

          return cycleBlocks.map((block) => {
            if (block.type === "reels") {
              return (
                <div key={block.id} className="px-5 relative z-10">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-[var(--app-orange)] font-black text-[8px] uppercase tracking-[0.4em]">01.</span>
                    <h3 className="font-black text-[10px] uppercase tracking-[0.4em] text-[var(--app-text)]/40">{block.title}</h3>
                    <div className="flex-1 h-[2px] bg-[var(--app-shape-accent)]/5" />
                  </div>
                  <div className="flex gap-3 overflow-x-auto pb-2 -mx-5 px-5 scrollbar-hide no-scrollbar appearance-none" style={{ scrollbarWidth: "none" }}>
                    {(block.data as typeof REELS).map((reel) => (
                      <Link key={reel.id} to={reel.to}>
                        <motion.div
                          whileTap={{ scale: 0.96 }}
                          className="relative flex-shrink-0 w-28 h-40 bg-[var(--app-text-slate)] border border-slate-200 overflow-hidden shadow-sm group rounded-xl"
                        >
                          <img src={reel.image} alt={reel.label} className="w-full h-full object-cover grayscale-[0.2] transition-all duration-700" />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/100 via-black/40 to-transparent" />
                          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                            <div className="w-8 h-8 rounded-full bg-[var(--app-bg)]/20 backdrop-blur-md border border-white/30 flex items-center justify-center shadow-lg transition-transform duration-500">
                              <Play size={12} className="text-white fill-white ml-0.5" />
                            </div>
                          </div>
                          <div className="absolute top-1.5 right-1.5 bg-[var(--app-orange)] border border-[var(--app-text)] px-1.5 py-0.5 shadow-sm">
                            <span className="text-[7px] font-black text-white uppercase tracking-tight block leading-none">{reel.reward}</span>
                          </div>
                          <div className="absolute bottom-2 left-2 right-2">
                            <p className="text-white font-black text-[10px] uppercase tracking-tighter leading-snug drop-shadow-2xl">
                              {reel.label.split(" ").map((word: string, i: number) => (<span key={i} className="block">{word}</span>))}
                            </p>
                          </div>
                        </motion.div>
                      </Link>
                    ))}
                  </div>
                </div>
              );
            }

            if (block.type === "market") {
              const data = block.data as typeof MARKETPLACE_PRODUCTS;
              const row1 = data.slice(0, 3);
              const row2 = data.slice(3, 6);
              return (
                <div key={block.id} className="px-5 relative z-10">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <span className="text-[var(--app-orange)] font-black text-xs tracking-[0.3em]">02.</span>
                      <h3 className="font-black text-[10px] uppercase tracking-[0.4em] text-[var(--app-text)]/40">{block.title}</h3>
                    </div>
                    <Link to="/marketplace" className="flex items-center gap-1.5 text-[9px] font-black text-[var(--app-orange)] uppercase tracking-widest decoration-2 underline-offset-4">
                      Browse All <ArrowRight size={11} />
                    </Link>
                  </div>

                  <div className="flex flex-col gap-6">
                    {/* Row 1: Standard Items */}
                    <div className="flex gap-4 overflow-x-auto -mx-5 px-5 pb-2 scrollbar-hide no-scrollbar" style={{ scrollbarWidth: "none" }}>
                      {row1.map((product) => (
                        <motion.div key={product.id} className="flex-shrink-0 w-36 group">
                          <Link to={`/product/${product.id}`} className="block">
                            <div className="relative aspect-square bg-slate-100 border border-slate-200 overflow-hidden shadow-sm transition-all mb-2 rounded-xl">
                              <img src={product.image} alt={product.title} className="w-full h-full object-cover transition-transform duration-700" />
                            </div>
                            <h4 className="text-[9px] font-black uppercase text-[var(--app-text)] leading-tight line-clamp-1 transition-colors">{product.title}</h4>
                            <span className="text-[12px] font-black text-[var(--app-orange)]">K{product.price}</span>
                          </Link>
                        </motion.div>
                      ))}
                    </div>

                    {/* Row 2: Trendy/Price Shifts */}
                    <div className="flex gap-4 overflow-x-auto -mx-5 px-5 pb-2 scrollbar-hide no-scrollbar" style={{ scrollbarWidth: "none" }}>
                      {row2.map((product) => (
                        <motion.div key={product.id} className="flex-shrink-0 w-36 group">
                          <Link to={`/product/${product.id}`} className="block">
                            <div className="relative aspect-square bg-slate-100 border border-slate-200 overflow-hidden shadow-sm transition-all mb-2 rounded-xl">
                              <img src={product.image} alt={product.title} className="w-full h-full object-cover transition-transform duration-700" />
                              <div className="absolute top-0 right-0 bg-[var(--shape-primary)] text-white px-2 py-1 text-[7px] font-black uppercase tracking-[0.2em] rounded-bl-xl">TRENDY</div>
                            </div>
                            <h4 className="text-[9px] font-black uppercase text-[var(--app-text)] leading-tight line-clamp-1 transition-colors">{product.title}</h4>
                            <span className="text-[12px] font-black text-[var(--app-orange)]">K{product.price}</span>
                          </Link>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>
              );
            }

            if (block.type === "post") {
              const item = block.data as typeof FEED_ITEMS[0];
              return (
                <motion.article
                  key={block.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.1 }}
                  className="mx-5 border border-slate-200 bg-[var(--app-bg)] shadow-sm overflow-hidden group transition-all rounded-3xl"
                >
                  <div className="relative w-full aspect-[4/5] overflow-hidden bg-slate-100">
                    <img src={item.image} alt={item.title} className="w-full h-full object-cover transition-transform duration-700" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                    <div className="absolute bottom-3 left-3 flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full border-2 border-[var(--color-primary)] overflow-hidden flex-shrink-0 shadow-md">
                        <img src={item.avatar} alt={item.user} className="w-full h-full object-cover" />
                      </div>
                      <span className="text-white font-black text-[11px] drop-shadow-md">@{item.user}</span>
                      {item.verified && <BadgeCheck size={12} className="text-[var(--color-secondary)]" />}
                    </div>
                  </div>
                  <div className="p-4">
                    <h4 className="text-[var(--app-text)] font-black text-[13px] uppercase tracking-tight leading-snug mb-1.5 transition-colors">{item.title}</h4>
                    <p className="text-[var(--app-text)]/50 text-[11px] font-medium leading-relaxed line-clamp-2 mb-3">{item.body}</p>
                    
                    {/* Interaction Bar - Parity with Socials */}
                    <div className="flex flex-col border-t border-[var(--app-text)]/5 bg-[var(--app-bg)] -mx-4">
                      <div className="flex items-center justify-between px-4 py-3">
                        <div className="flex items-center gap-6">
                           <button 
                             onClick={() => toggleLike(item.id)} 
                             className={`transition-colors ${likedPosts.has(item.id) ? "text-[var(--app-orange)]" : "text-[var(--app-text)]/80"} active:scale-95`}
                           >
                              <DuotoneLike size={22} primary={likedPosts.has(item.id) ? "var(--app-orange)" : undefined} />
                           </button>
                           <button className="text-[var(--app-text)]/80 active:scale-95 transition-transform">
                              <DuotoneMessage size={22} />
                           </button>
                           <button className="text-[var(--app-text)]/80 active:scale-95 transition-transform">
                              <DuotoneShare size={22} />
                           </button>
                        </div>
                        <div className="flex items-center gap-3 text-[9px] font-black uppercase text-[var(--app-text)]/30">
                          <span>{item.views} Views</span>
                          <span className="w-1 h-1 rounded-full bg-[var(--app-shape-accent)]/20" />
                          <span>{item.time}</span>
                        </div>
                      </div>
                      <div className="px-4 py-2 bg-[var(--app-shape-accent)]/[0.02] border-t border-[var(--app-text)]/[0.05] flex items-center gap-4 text-[var(--app-text)]/60 text-[9px] font-black uppercase tracking-widest">
                         <span>Like | {likedPosts.has(item.id) ? (item.likes as number) + 1 : item.likes}</span>
                         <span>Comments | {item.comments || 0}</span>
                         <span>Share | {item.shares || 0}</span>
                      </div>
                    </div>
                  </div>
                </motion.article>
              );
            }
            return null;
          });
        })()}
      </div>


      </Skeleton>

      {/* High-Fidelity Bottom Sheets */}
      <AnimatePresence>
        {activeSheet && (
          <>
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setActiveSheet(null)}
              className="fixed inset-0 z-[1000] bg-black/60 backdrop-blur-sm max-w-md mx-auto"
            />
            <motion.div 
              initial={{ y: "100%" }} animate={{ y: 0 }} exit={{ y: "100%" }} transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed bottom-0 left-0 right-0 z-[1010] w-full max-w-md mx-auto bg-[var(--app-bg)] rounded-t-[40px] border-t-[3px] border-[var(--app-text-slate)] shadow-[0_-20px_60px_rgba(0,0,0,0.3)] overflow-hidden pb-[env(safe-area-inset-bottom)]"
            >
              <div className="p-6">
                <div className="flex justify-between items-center mb-8">
                  <h3 className="text-xl font-black text-[var(--app-text-slate)] uppercase tracking-tighter">{activeSheet}</h3>
                  <button onClick={() => setActiveSheet(null)} className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center active:scale-90 transition-all border border-slate-200">
                    <X size={20} className="text-slate-600" />
                  </button>
                </div>

                {activeSheet === "Upload" && (
                  <div className="space-y-6">
                    <div className="border-[3px] border-dashed border-[var(--app-text-slate)] bg-[var(--app-bg-muted)] rounded-[32px] p-10 flex flex-col items-center justify-center text-center shadow-[4px_4px_0px_#0f172a]">
                      <div className="w-20 h-20 bg-[var(--app-bg)] rounded-full flex items-center justify-center shadow-[4px_4px_0px_#0f172a] border-2 border-[var(--app-text-slate)] mb-4">
                        <DuotoneUpload size={32} />
                      </div>
                      <h4 className="font-black text-[var(--app-text-slate)] text-sm mb-1 uppercase tracking-tight">Drag & Drop media</h4>
                      <p className="text-slate-500 text-[10px] uppercase font-black tracking-[0.2em]">or tap to browse files</p>
                    </div>
                    <button className="w-full h-16 bg-[var(--app-text-slate)] text-white rounded-2xl flex items-center justify-center font-black uppercase tracking-[0.2em] text-xs active:scale-95 transition-all shadow-[6px_6px_0px_rgba(0,0,0,0.2)]">
                      Choose from Gallery
                    </button>
                  </div>
                )}

                {activeSheet === "Share" && (
                  <div className="space-y-8">
                    <div className="grid grid-cols-4 gap-6">
                      {[
                        { name: "WhatsApp", bg: "bg-[var(--color-tertiary)]", icon: MessageCircle },
                        { name: "Twitter", bg: "bg-black", icon: 'X' },
                        { name: "Facebook", bg: "bg-[#1877F2]", icon: DuotoneUsers },
                        { name: "Email", bg: "bg-slate-100", icon: DuotoneSend }
                      ].map(social => (
                        <div key={social.name} className="flex flex-col items-center gap-3 group cursor-pointer active:scale-90 transition-all">
                          <div className={`w-16 h-16 rounded-2xl flex items-center justify-center text-white border-2 border-[var(--app-text-slate)] shadow-[4px_4px_0px_#0f172a] ${social.bg} ${social.name==="Email" ? "text-[var(--app-text-slate)]":""}`}>
                            {typeof social.icon === "string" ? <span className="font-black text-2xl">{social.icon}</span> : <social.icon size={28} />}
                          </div>
                          <span className="text-[9px] font-black text-[var(--app-text-slate)] uppercase tracking-widest leading-none">{social.name}</span>
                        </div>
                      ))}
                    </div>
                    <div className="space-y-3">
                      <p className="text-[10px] font-black text-[var(--app-text-slate)] uppercase tracking-widest ml-1">Universal Link</p>
                      <div className="flex h-14 bg-[var(--app-bg-muted)] rounded-2xl border-2 border-[var(--app-text-slate)] shadow-[4px_4px_0px_#0f172a] p-1.5 focus-within:translate-x-0.5 focus-within:translate-y-0.5 focus-within:shadow-none transition-all">
                        <input type="text" readOnly value="https://kleench.com/a/48f9q" className="flex-1 bg-transparent px-4 text-xs font-black text-slate-700 outline-none" />
                        <button className="px-6 bg-[var(--app-text-slate)] text-white rounded-xl font-black text-[10px] uppercase tracking-widest active:scale-95 transition-all">Copy</button>
                      </div>
                    </div>
                  </div>
                )}

                {activeSheet === "Register Agent" && (
                  <div className="space-y-5">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-[var(--app-text-slate)] uppercase tracking-widest ml-1">Full Name</label>
                      <input type="text" placeholder="e.g. John Doe" className="w-full h-14 bg-[var(--app-bg)] border-2 border-[var(--app-text-slate)] rounded-2xl px-5 text-sm font-black outline-none shadow-[4px_4px_0px_#0f172a] focus:shadow-none transition-all" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-[var(--app-text-slate)] uppercase tracking-widest ml-1">Phone Number</label>
                      <input type="tel" placeholder="+260..." className="w-full h-14 bg-[var(--app-bg)] border-2 border-[var(--app-text-slate)] rounded-2xl px-5 text-sm font-black outline-none shadow-[4px_4px_0px_#0f172a] focus:shadow-none transition-all" />
                    </div>
                    <button onClick={() => { setActiveSheet(null); }} className="w-full h-16 bg-[var(--color-primary)] text-white border-2 border-[var(--app-text-slate)] rounded-2xl flex items-center justify-center font-black uppercase tracking-[0.2em] text-xs active:scale-95 transition-all shadow-[6px_6px_0px_#0f172a] mt-4">
                      Secure Application
                    </button>
                  </div>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
