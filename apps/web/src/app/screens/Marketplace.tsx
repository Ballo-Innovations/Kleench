import { Link } from "react-router";
import React, { useState } from "react";
import { PageHeader } from "../components/PageHeader";
import { ChevronRight } from "lucide-react";
import { 
  DuotoneTag as Tag, 
  DuotoneFileText as FileText, 
  DuotoneUserPlus as UserPlus, 
  DuotoneBadgeCheck as BadgeCheck, 
  DuotoneSearch as Search 
} from "../components/DuotoneIcon";
import { motion } from "motion/react";
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
  {
    id: 1,
    title: "SMARTPHONE",
    price: "2,500",
    image: smartphoneImg,
  },
  {
    id: 2,
    title: "SHOES",
    price: "275",
    image: shoesImg,
  },
  {
    id: 3,
    title: "HAND BAG",
    price: "200",
    image: handbagImg,
  },
  {
    id: 4,
    title: "LAPTOPS",
    price: "7,500",
    image: laptopImg,
  }
];



const MARKET_INTEL = [
  { id: "maize", title: "MAIZE", price: "K280", graph: "M 0 40 L 10 30 L 20 45 L 30 15 L 40 25" },
  { id: "fuel", title: "FUEL", price: "K29.50", graph: "M 0 20 L 10 40 L 25 5 L 40 25" },
  { id: "zinc", title: "ZINC", price: "$2,400/t", graph: "M 0 15 L 10 35 L 20 10 L 30 15 L 40 25" },
  { id: "cement", title: "CEMENT", price: "K150", graph: "M 0 35 L 10 25 L 20 20 L 30 10 L 40 5" }
];

const BUSINESSES = [
  { id: 1, name: "TOYOTA ZAMBIA", category: "Automotive", logo: "TZ", image: toyotaImg },
  { id: 2, name: "JET MOBILE ADS", category: "Digital Media", logo: "JM", image: jetLogo },
  { id: 3, name: "PICK N PAY ZAMBIA", category: "Retail Store", logo: "PP", image: pnpLogo }
];

export function Marketplace() {
  const loading = usePageLoading(850);
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("PRODUCTS");

  const handleAction = (label: string) => {
    if (label === "SELL") navigate("/sell");
    else if (label === "REFER") navigate("/referral");
    else toast.info(`${label} interface coming soon.`);
  };

  return (
    <div className="w-full relative min-h-[100dvh] bg-transparent overflow-x-hidden font-sans pb-32">
      {/* ── ORANGE DASHBOARD HEADER ── */}
      <PageHeader useLogo />

      {loading ? (
        <PageSkeletons.Marketplace />
      ) : (
        <div className="relative z-10 w-full mt-4 space-y-4 pb-10 px-5">
          
          {/* Primary Action Bar */}
          <div>
            <div className="flex justify-between items-center">
              {[
                { icon: Tag, label: "SELL", color: "text-[var(--color-primary)]" },
                { icon: FileText, label: "LIST", color: "text-[var(--color-secondary)]" },
                { icon: UserPlus, label: "REFER", color: "text-[var(--color-growth)]" },
                { icon: BadgeCheck, label: "AGENT", color: "text-[var(--shape-primary)]" }
              ].map((action, i) => (
                <motion.button 
                  key={i} 
                  whileTap={{ scale: 0.9 }}
                  onClick={() => handleAction(action.label)}
                  className="flex flex-col items-center gap-2 group cursor-pointer"
                  style={{ touchAction: "manipulation" }}
                >
                  <div className={`w-[60px] h-[60px] rounded-2xl border border-[var(--border)] bg-[var(--app-bg)] flex items-center justify-center shadow-lg active:scale-95 transition-all ${action.color}`}>
                    <action.icon size={26} strokeWidth={('stroke' in action ? action.stroke : 2.5) as number} />
                  </div>
                  <span className="text-[10px] font-black tracking-widest text-[var(--app-text)] uppercase">{action.label}</span>
                </motion.button>
              ))}
            </div>
          </div>

          {/* Search Bar */}
          <div className="w-full">
            <div className="relative flex items-center w-full">
               <Search className="absolute left-4 text-[var(--app-text)]/40" size={20} />
               <input 
                 type="text" 
                 placeholder="Search Product..." 
                 className="w-full bg-[var(--app-bg)] border border-[var(--app-text)]/20 pl-12 pr-4 py-3 rounded-2xl shadow-md shadow-[var(--app-text)]/10 focus:border-[var(--app-text)]/40 text-[13px] font-black text-[var(--app-text)] outline-none placeholder:text-[var(--app-text)]/40 transition-all" 
               />
               <button onClick={() => toast("Fetching category indexes...")} className="absolute right-4 text-[var(--app-orange)] font-black text-[11px] flex items-center gap-1 active:opacity-70 uppercase tracking-widest">
                 Categories <ChevronRight size={14} strokeWidth={3} className="text-[var(--app-text)]" />
               </button>
            </div>
          </div>

          {/* Fused Segmented Pill Tabs — zero gap toggle */}
          <div className="w-full">
             <div className="flex border border-[var(--border)] rounded-full shadow-md shadow-[var(--app-text)]/10 overflow-hidden">
                {(["PRODUCTS", "SERVICES"] as const).map((tab, i) => {
                   const isActive = activeTab === tab;
                   return (
                     <button
                       key={tab}
                       onClick={() => setActiveTab(tab)}
                       className={`flex-1 flex items-center justify-center h-[38px] transition-all duration-200 ${
                         isActive
                           ? 'bg-[var(--app-shape-accent)] text-white'
                           : 'bg-[var(--app-bg)] text-[var(--app-text)]/55 hover:text-[var(--app-text)] hover:bg-[var(--app-shape-accent)]/5'
                       } ${i === 0 ? 'border-r-[1.5px] border-[var(--border)]' : ''}`}
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
                  <button onClick={() => toast.success("Loading complete catalog...")} className="text-[var(--app-orange)] font-black text-[11px] flex items-center gap-1 uppercase tracking-widest">
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
                             <span className="text-[12px] font-black text-black">K{product.price}</span>
                             <span className="text-[6px] font-black text-[var(--app-orange)] uppercase pt-0.5 whitespace-nowrap">VIEW / BUY</span>
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
               </div>
               <div className="flex overflow-x-auto snap-x snap-mandatory pb-5 gap-4 scrollbar-hide no-scrollbar w-full pr-5">
                 {[
                   { id: "tickets", label: "BUY TICKETS", title: "TICKET", image: "https://images.unsplash.com/photo-1540839045366-eb10c95a04cc?w=400&q=80", isLogo: false },
                   { id: "design", label: "GRAPHIC DESIGN", title: "GRAPHIC DESIGN", image: "https://images.unsplash.com/photo-1626785774573-4b799315345d?w=400&q=80", isLogo: false },
                   { id: "pacra", label: "REGISTER COMPANY", title: "PACRA", image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400&q=80", isLogo: false },
                   { id: "zppa", label: "HIRE TALENT", title: "ZPPA", image: "https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=400&q=80", isLogo: false },
                 ].map((service) => (
                   <motion.button whileTap={{ scale: 0.97 }} onClick={() => toast("Redirecting to " + service.title + " portal...")} key={service.id} className="block shrink-0 snap-start w-[140px] focus:outline-none">
                     <div className="bg-[var(--app-bg)] border border-[var(--border)] rounded-2xl overflow-hidden flex flex-col h-full relative cursor-pointer shadow-md transition-colors">
                       <div className="h-[100px] relative border-b border-[var(--border)] bg-[var(--muted)]">
                          <img src={service.image} alt={service.title} className="w-full h-full object-cover grayscale-[0.2]" />
                          <div className="absolute inset-0 bg-black/40" />
                          <div className="absolute inset-0 flex items-center justify-center pointer-events-none p-3 text-center">
                             <span className="text-[11px] font-black text-white px-2 py-1 bg-[var(--shape-primary)]/80 border border-white transform -rotate-12 shadow-md uppercase tracking-widest">{service.title}</span>
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
            <div className="mb-4 border-b border-[var(--border)] pb-2">
               <h3 className="text-[var(--app-text)] font-black text-sm tracking-widest uppercase">MARKET INTELLIGENCE</h3>
            </div>
            
            <div className="flex overflow-x-auto snap-x snap-mandatory pb-5 gap-4 scrollbar-hide no-scrollbar w-full pr-5">
               {MARKET_INTEL.map((intel) => (
                  <div key={intel.id} className="shrink-0 snap-start w-[110px] bg-[var(--app-shape-accent)] rounded-2xl p-3 border border-[var(--border)] shadow-sm flex flex-col relative overflow-hidden h-[150px]">
                     {/* Y-axis labels */}
                     <div className="absolute inset-0 opacity-20 pointer-events-none flex flex-col justify-between p-3">
                        <span className="text-[6px] font-black text-white">100</span>
                        <span className="text-[6px] font-black text-white">50</span>
                        <span className="text-[6px] font-black text-white">25</span>
                        <span className="text-[6px] font-black text-white">0</span>
                     </div>

                     {/* Commodity title */}
                     <span className="text-[10px] font-black text-white/50 tracking-[0.3em] z-10 uppercase leading-none mt-1">{intel.title}</span>

                     {/* Live price ticker */}
                     <span className="text-[14px] font-black text-[var(--color-primary)] z-10 leading-none mt-2 mb-1 tracking-tight">{intel.price}</span>

                     {/* Sparkline */}
                     <div className="flex-1 w-full h-[60px] relative z-10 flex items-end justify-center mb-1">
                        <svg className="w-full h-full" viewBox="0 0 40 50" preserveAspectRatio="none">
                           <path
                              d={intel.graph}
                              fill="none"
                              stroke="var(--color-primary)"
                              strokeWidth="3"
                              vectorEffect="non-scaling-stroke"
                              strokeLinecap="square"
                              strokeLinejoin="miter"
                           />
                        </svg>
                     </div>

                     {/* Live dot + X-axis */}
                     <div className="flex items-center justify-between mt-auto z-10 border-t border-white/20 pt-2">
                        <div className="flex items-center gap-1.5">
                           <span className="w-2 h-2 rounded-full bg-[var(--color-primary)] animate-pulse block shadow-[0_0_8px_var(--color-primary)]" />
                           <span className="text-[7px] text-white font-black uppercase tracking-[0.2em] leading-none">LIVE</span>
                        </div>
                        <span className="text-[7px] font-black tracking-widest text-[var(--color-primary)]/50 leading-none">2026</span>
                     </div>
                  </div>
               ))}
            </div>
          </section>

          {/* Business Listings — Unified Horizontal Directory Block */}
          <section>
            <div className="bg-[var(--app-shape-accent)] px-4 py-2 border-t border-x border-[var(--border)] rounded-t-2xl">
               <h3 className="text-white font-black text-[11px] tracking-[0.2em] uppercase">BUSINESS LISTINGS</h3>
            </div>
            <div className="flex gap-0 overflow-x-auto snap-x snap-mandatory scrollbar-hide no-scrollbar w-full border border-[var(--border)] rounded-b-2xl shadow-sm bg-[var(--app-shape-accent)]">
               {BUSINESSES.map((business, i) => (
                 <div key={i} onClick={() => toast(`Visiting ${business.name} profile...`)} className="shrink-0 snap-start w-[150px] bg-[var(--app-bg)] cursor-pointer group flex flex-col h-[185px] border-r-[1px] border-[var(--border)] last:border-r-0">
                   <div className="flex-1 bg-[var(--muted)] flex items-center justify-center border-b border-[var(--border)] p-4 relative group-hover:bg-[var(--app-shape-accent)]/5 transition-colors">
                      <div className="w-16 h-16 rounded-full bg-[var(--app-bg)] border border-[var(--border)] flex items-center justify-center overflow-hidden shadow-sm group-hover:scale-110 transition-transform duration-300">
                         {('image' in business && business.image) ? (
                            <img src={business.image as string} alt={business.name} className="w-[85%] h-[85%] object-contain" />
                         ) : (
                            <span className="text-[var(--app-text)] font-black text-xl">{business.logo}</span>
                         )}
                      </div>
                      <div className="absolute top-2 right-2 flex gap-1">
                         <div className="w-1.5 h-1.5 rounded-full bg-[var(--color-growth)] animate-pulse" />
                      </div>
                   </div>
                   <div className="p-3 flex flex-col gap-1 h-[75px] justify-between">
                      <div className="flex flex-col gap-0.5">
                        <span className="text-[9px] font-black text-[var(--app-text)] uppercase leading-tight line-clamp-2 tracking-wide">{business.name}</span>
                        <span className="text-[7px] font-black text-[var(--app-orange)] uppercase tracking-widest">{business.category}</span>
                      </div>
                      <button className="w-full py-1.5 bg-[var(--app-shape-accent)] text-white text-[8px] font-black uppercase tracking-widest rounded-sm active:scale-95 transition-all">VIEW PROFILE</button>
                   </div>
                 </div>
               ))}
               {/* Terminal VIEW ALL block */}
               <div onClick={() => toast("Viewing all registered businesses...")} className="shrink-0 snap-start w-[120px] bg-[var(--app-shape-accent)] cursor-pointer flex flex-col items-center justify-center p-4 gap-3 h-[185px]">
                  <div className="w-10 h-10 rounded-full border border-white/50 flex items-center justify-center">
                    <ChevronRight size={24} className="text-white ml-0.5" strokeWidth={3} />
                  </div>
                  <span className="text-[9px] font-black text-white uppercase tracking-[0.2em] text-center leading-tight">VIEW ALL<br/>BUSINESSES →</span>
               </div>
            </div>
          </section>

          {/* Window Shopping — Unified Shop Directory Block */}
          <section>
            <div className="bg-[var(--app-shape-accent)] px-4 py-2 border-t border-x border-[var(--border)] rounded-t-2xl">
               <h3 className="text-white font-black text-[11px] tracking-[0.2em] uppercase">WINDOW SHOPPING</h3>
            </div>
            <div className="flex gap-[3px] overflow-x-auto snap-x snap-mandatory scrollbar-hide no-scrollbar w-full border border-[var(--border)] rounded-b-2xl shadow-sm bg-[var(--app-shape-accent)]">
               {[
                 { name: "THE SCENT STORE ZAMBIA",  category: "Beauty & Fragrance",   image: scentStoreImg },
                 { name: "LUSAKA TECH HUB",          category: "Electronics & Tech",    image: techHubImg },
                 { name: "STYLE AVENUE ZM",          category: "Clothing & Fashion",    image: styleAvenueImg },
                 { name: "GREENLEAF ORGANICS",       category: "Food & Health",         image: greenleafImg },
               ].map((shop, i) => (
                 <div key={i} onClick={() => toast(`Opening ${shop.name}...`)} className="shrink-0 snap-start w-[140px] bg-[var(--app-bg)] cursor-pointer group flex flex-col h-[185px]">
                   <div className="flex-1 flex items-center justify-center border-b border-[var(--border)] overflow-hidden bg-[var(--muted)]">
                      <img src={shop.image} alt={shop.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                   </div>
                   <div className="p-3 flex flex-col gap-1 h-[65px] justify-center">
                      <span className="text-[10px] font-black text-[var(--app-text)] uppercase leading-tight line-clamp-2 tracking-wide">{shop.name}</span>
                      <span className="text-[8px] font-black text-[var(--app-orange)] uppercase tracking-widest">{shop.category}</span>
                   </div>
                 </div>
               ))}
               {/* Terminal VIEW ALL block */}
               <div onClick={() => toast("Viewing all shops...")} className="shrink-0 snap-start w-[110px] bg-[var(--app-shape-accent)] cursor-pointer flex flex-col items-center justify-center p-4 gap-3 h-[185px]">
                  <div className="w-10 h-10 rounded-full border border-white/50 flex items-center justify-center">
                    <ChevronRight size={24} className="text-white ml-0.5" strokeWidth={3} />
                  </div>
                  <span className="text-[9px] font-black text-white uppercase tracking-[0.2em] text-center leading-tight">VIEW ALL<br/>SHOPS →</span>
               </div>
            </div>
          </section>

          {/* New Section: BIG DEALS */}
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
                           <span className="text-[8px] font-black text-[var(--color-primary)] line-through">K{Number(product.price.replace(/,/g,'')) + 1000}</span>
                           <span className="text-[12px] font-black text-black">K{product.price}</span>
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
