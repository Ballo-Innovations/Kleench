import { Link, useNavigate } from "react-router";
import {
  Play, Heart, ArrowRight,
  Network, Share2, BadgeCheck, Sparkles,
} from "lucide-react";
import { motion } from "motion/react";


import { PageSkeletons, usePageLoading } from "../components/PageSkeletons";
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

  return (
    <div className="w-full relative min-h-[100dvh] bg-transparent overflow-x-hidden font-sans pb-28">

      {/* ── ORANGE DASHBOARD HEADER ── */}
      <PageHeader useLogo />

      {loading ? (
        <div className="mt-6">
          <PageSkeletons.Home />
        </div>
      ) : (
        <>
      {/* ── PRIMARY ACTIONS: LOAD ADVERT, REFER & MARKET ── */}
      <div className="px-5 mt-1 relative z-10 flex items-center justify-center gap-8">
        {[
          { icon: Network, label: "Advert", to: "/advert", color: "text-[#FF8C00]", bg: "bg-white" },
          { icon: Share2, label: "Refer", to: "/referral", color: "text-white", bg: "bg-[#FF8C00]" },
          { icon: Sparkles, label: "Market", to: "/marketplace", color: "text-[#003366]", bg: "bg-white" },
        ].map((item, i) => (
          <motion.div
            key={i}
            whileTap={{ scale: 0.9 }}
            onClick={() => navigate(item.to)}
            className="flex flex-col items-center gap-1.5 cursor-pointer group"
          >
            <div className={`w-10 h-10 rounded-full border border-[#003366]/20 shadow-sm flex items-center justify-center transition-transform ${item.color} ${item.bg}`}>
              <item.icon size={18} strokeWidth={2.5} />
            </div>
            <span className="text-[#003366] font-black tracking-tight text-[8px] uppercase">{item.label}</span>
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
                    <span className="text-[#FF8C00] font-black text-[8px] uppercase tracking-[0.4em]">01.</span>
                    <h3 className="font-black text-[10px] uppercase tracking-[0.4em] text-[#003366]/40">{block.title}</h3>
                    <div className="flex-1 h-[2px] bg-[#003366]/5" />
                  </div>
                  <div className="flex gap-3 overflow-x-auto pb-1 -mx-5 px-5 scrollbar-hide no-scrollbar appearance-none">
                    {(block.data as typeof REELS).map((reel) => (
                      <Link key={reel.id} to={reel.to}>
                        <motion.div
                          whileTap={{ scale: 0.96 }}
                          className="relative flex-shrink-0 w-28 h-40 bg-white border border-[#003366] overflow-hidden shadow-[3px_3px_0px_#003366] group rounded-sm"
                        >
                          <img src={reel.image} alt={reel.label} className="w-full h-full object-cover grayscale-[0.2] transition-all duration-700" />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/100 via-black/40 to-transparent" />
                          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                            <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center shadow-lg transition-transform duration-500">
                              <Play size={12} className="text-white fill-white ml-0.5" />
                            </div>
                          </div>
                          <div className="absolute top-1.5 right-1.5 bg-[#FF8C00] border border-[#003366] px-1.5 py-0.5 shadow-sm">
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
                      <span className="text-[#FF8C00] font-black text-xs tracking-[0.3em]">02.</span>
                      <h3 className="font-black text-[10px] uppercase tracking-[0.4em] text-[#003366]/40">{block.title}</h3>
                    </div>
                    <Link to="/marketplace" className="flex items-center gap-1.5 text-[9px] font-black text-[#FF8C00] uppercase tracking-widest decoration-2 underline-offset-4">
                      Browse All <ArrowRight size={11} />
                    </Link>
                  </div>

                  <div className="flex flex-col gap-6">
                    {/* Row 1: Standard Items */}
                    <div className="flex gap-4 overflow-x-auto -mx-5 px-5 pb-1 scrollbar-hide no-scrollbar">
                      {row1.map((product) => (
                        <motion.div key={product.id} className="flex-shrink-0 w-36 group">
                          <Link to={`/product/${product.id}`} className="block">
                            <div className="relative aspect-square bg-white border-2 border-[#003366] overflow-hidden shadow-[3px_3px_0px_#003366] transition-all mb-2">
                              <img src={product.image} alt={product.title} className="w-full h-full object-cover transition-transform duration-700" />
                            </div>
                            <h4 className="text-[9px] font-black uppercase text-[#003366] leading-tight line-clamp-1 transition-colors">{product.title}</h4>
                            <span className="text-[12px] font-black text-[#FF8C00]">K{product.price}</span>
                          </Link>
                        </motion.div>
                      ))}
                    </div>

                    {/* Row 2: Trendy/Price Shifts */}
                    <div className="flex gap-4 overflow-x-auto -mx-5 px-5 pb-1 scrollbar-hide no-scrollbar">
                      {row2.map((product) => (
                        <motion.div key={product.id} className="flex-shrink-0 w-36 group">
                          <Link to={`/product/${product.id}`} className="block">
                            <div className="relative aspect-square bg-white border-2 border-[#003366] overflow-hidden shadow-[3px_3px_0px_#003366] transition-all mb-2">
                              <img src={product.image} alt={product.title} className="w-full h-full object-cover transition-transform duration-700" />
                              <div className="absolute top-0 right-0 bg-[#FF3000] text-white px-1.5 py-0.5 text-[7px] font-black uppercase tracking-[0.2em]">TRENDY</div>
                            </div>
                            <h4 className="text-[9px] font-black uppercase text-[#003366] leading-tight line-clamp-1 transition-colors">{product.title}</h4>
                            <span className="text-[12px] font-black text-[#FF8C00]">K{product.price}</span>
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
                  className="mx-5 border-2 border-[#003366] bg-white shadow-[5px_5px_0px_#003366] overflow-hidden group transition-all"
                >
                  <div className="relative w-full h-72 overflow-hidden">
                    <img src={item.image} alt={item.title} className="w-full h-full object-cover transition-transform duration-700" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                    <div className="absolute bottom-3 left-3 flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full border-2 border-[#FFC300] overflow-hidden flex-shrink-0 shadow-md">
                        <img src={item.avatar} alt={item.user} className="w-full h-full object-cover" />
                      </div>
                      <span className="text-white font-black text-[11px] drop-shadow-md">@{item.user}</span>
                      {item.verified && <BadgeCheck size={12} className="text-[#FFC300]" />}
                    </div>
                  </div>
                  <div className="p-4">
                    <h4 className="text-[#003366] font-black text-[13px] uppercase tracking-tight leading-snug mb-1.5 transition-colors">{item.title}</h4>
                    <p className="text-[#003366]/50 text-[11px] font-medium leading-relaxed line-clamp-2 mb-3">{item.body}</p>
                    <div className="flex items-center justify-between border-t border-[#003366]/5 pt-3">
                      <div className="flex items-center gap-3 text-[9px] font-black uppercase text-[#003366]/30">
                        <span>{item.views} Views</span>
                        <span className="w-1 h-1 rounded-full bg-[#003366]/20" />
                        <span>{item.time}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Heart size={12} className="text-[#003366]/20" />
                        <span className="text-[9px] font-black text-[#003366]/30">{item.likes}</span>
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


      </>
      )}


    </div>
  );
}
