import { Link } from "react-router";
import { PageHeader } from "../components/PageHeader";
import { Search, Tag, FileText, UserPlus, Briefcase, ChevronRight, Ticket, Palette, Building2, UserCircle, ArrowDown } from "lucide-react";
import { motion } from "motion/react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { PageSkeletons, usePageLoading } from "../components/PageSkeletons";

const MARKET_PRODUCTS = [
  { id: 1, title: "SMARTPHONE", price: "2,500", image: "https://images.unsplash.com/photo-1598327105666-5b89351cb315?w=200&q=80" },
  { id: 2, title: "SHOES", price: "275", image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=200&q=80" },
  { id: 3, title: "HAND BAG", price: "200", image: "https://images.unsplash.com/photo-1584916201218-f4242ceb4809?w=200&q=80" },
  { id: 4, title: "LAPTOPS", price: "7,500", image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=200&q=80" }
];

const SERVICES = [
  { id: "tickets", label: "BUY TICKETS", title: "TICKET", icon: Ticket, image: "https://images.unsplash.com/photo-1540839045366-eb10c95a04cc?w=400&q=80" },
  { id: "design", label: "DO GRAPHIC DESIGNING", title: "GRAPHIC DESIGN", icon: Palette, image: "https://images.unsplash.com/photo-1626785774573-4b799315345d?w=400&q=80" },
  { id: "pacra", label: "REGISTER COMPANY", title: "PACRA", icon: Building2, image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400&q=80" },
  { id: "zppa", label: "HIRE", title: "ZPPA", icon: UserCircle, image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=400&q=80" }
];

const MARKET_INTEL = [
  { id: "maize", title: "MAIZE", price: "K280", graph: "M 0 40 L 10 30 L 20 45 L 30 15 L 40 25" },
  { id: "fuel", title: "FUEL", price: "K29.50", graph: "M 0 20 L 10 40 L 25 5 L 40 25" },
  { id: "zinc", title: "ZINC", price: "$2,400/t", graph: "M 0 15 L 10 35 L 20 10 L 30 15 L 40 25" },
  { id: "cement", title: "CEMENT", price: "K150", graph: "M 0 35 L 10 25 L 20 20 L 30 10 L 40 5" }
];

const BUSINESSES = [
  { id: 1, name: "ROCKBED CONSTRUCTION LIMITED", category: "construction", logo: "RC" },
  { id: 2, name: "TOYOTA ZAMBIA", category: "automotive", logo: "TZ" },
  { id: 3, name: "JET MOBILE ADS", category: "digital media", logo: "JM" },
  { id: 4, name: "PICK N PAY ZAMBIA", category: "retail store", logo: "PP" }
];

export function Marketplace() {
  const loading = usePageLoading(850);

  return (
    <div className="w-full relative min-h-[100dvh] bg-white overflow-x-hidden font-sans pb-32">
      {/* ── ORANGE DASHBOARD HEADER ── */}
      <PageHeader useLogo />

      {loading ? (
        <PageSkeletons.Marketplace />
      ) : (
        <div className="relative z-10 w-full mt-6 space-y-7 pb-10">
          
          {/* Primary Action Bar */}
          <div className="px-5">
            <div className="flex justify-between items-center px-2">
              {[
                { icon: Tag, label: "SELL" },
                { icon: FileText, label: "LIST" },
                { icon: UserPlus, label: "REFER" },
                { icon: Briefcase, label: "AGENT" }
              ].map((action, i) => (
                <motion.button 
                  key={i} 
                  whileTap={{ scale: 0.9 }}
                  className="flex flex-col items-center gap-2"
                >
                  <div className="w-14 h-14 rounded-full border-2 border-[#FF8C00] bg-white flex items-center justify-center shadow-sm text-[#003366]">
                    <action.icon size={22} strokeWidth={2} />
                  </div>
                  <span className="text-[10px] font-black tracking-widest text-[#003366] uppercase">{action.label}</span>
                </motion.button>
              ))}
            </div>
          </div>

          {/* Search Bar */}
          <div className="px-5 flex items-center gap-2">
            <div className="flex-1 relative flex items-center">
               <Search className="absolute left-4 text-[#003366]/40" size={18} />
               <input 
                 type="text" 
                 placeholder="Search Product..." 
                 className="w-full bg-white border-2 border-[#003366]/20 pl-11 pr-4 py-3 rounded-full text-[13px] font-bold text-[#003366] outline-none placeholder:text-[#003366]/40 focus:border-[#003366]" 
               />
               <button className="absolute right-4 text-[#003366] font-black text-[12px] flex items-center gap-1 active:opacity-70">
                 Categories <ChevronRight size={14} />
               </button>
            </div>
          </div>

          {/* Featured Products */}
          <section>
            <div className="px-5 flex items-center justify-between mb-3 border-b-2 border-[#003366]/10 pb-2">
               <h3 className="text-[#003366] font-black text-sm tracking-wide">Featured Products</h3>
               <button className="text-[#FF8C00] font-black text-[11px] flex items-center gap-1 uppercase tracking-widest">
                 See All <ChevronRight size={12} strokeWidth={3} />
               </button>
            </div>
            
            <div className="flex overflow-x-auto snap-x snap-mandatory px-5 pb-4 -mx-5 gap-3 scrollbar-hide no-scrollbar" style={{ paddingLeft: '20px', paddingRight: '20px' }}>
              {MARKET_PRODUCTS.map((product) => (
                <Link to={`/product/${product.id}`} key={product.id} className="block shrink-0 snap-start w-[110px]">
                  <div className="bg-white border-2 border-[#003366]/10 rounded-xl overflow-hidden shadow-sm flex flex-col h-full active:scale-95 transition-transform">
                    <div className="aspect-square bg-slate-100 relative">
                       <ImageWithFallback src={product.image} alt={product.title} className="w-full h-full object-cover" />
                    </div>
                    <div className="p-2 bg-white flex flex-col gap-0.5 justify-between flex-1">
                       <h4 className="text-[9px] font-black text-[#003366] leading-tight line-clamp-1">{product.title}</h4>
                       <div className="flex items-center gap-1 mt-1">
                          <span className="text-[12px] font-black text-black">K{product.price}</span>
                          <span className="text-[6px] font-black text-[#FF8C00] uppercase pt-0.5 whitespace-nowrap">VIEW / BUY</span>
                       </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>

          {/* Services Layout */}
          <section>
            <div className="px-5 mb-3 border-b-2 border-[#003366]/10 pb-2">
               <h3 className="text-[#003366] font-black text-sm tracking-wide">Services</h3>
            </div>
            
            <div className="flex overflow-x-auto snap-x snap-mandatory px-5 pb-4 -mx-5 gap-3 scrollbar-hide no-scrollbar" style={{ paddingLeft: '20px', paddingRight: '20px' }}>
              {SERVICES.map((service) => (
                <motion.button whileTap={{ scale: 0.95 }} key={service.id} className="block shrink-0 snap-start w-[110px]">
                  <div className="bg-white border-2 border-[#003366]/10 rounded-xl overflow-hidden shadow-sm flex flex-col h-full relative">
                    <div className="h-[90px] relative">
                       <img src={service.image} alt={service.title} className="w-full h-full object-cover opacity-90" />
                       <div className="absolute inset-0 bg-black/30" />
                       <div className="absolute inset-0 flex items-center justify-center pointer-events-none p-2 text-center">
                         <span className="text-[12px] font-black text-white transform rotate-[-10deg] shadow-[0_2px_4px_rgba(0,0,0,0.5)] drop-shadow-md">{service.title}</span>
                       </div>
                    </div>
                    <div className="py-2 px-1 bg-white flex items-center justify-center">
                       <span className="text-[8px] font-black text-[#003366] uppercase text-center leading-tight tracking-widest">{service.label}</span>
                    </div>
                  </div>
                </motion.button>
              ))}
            </div>
          </section>

          {/* Market Intelligence Ticker */}
          <section>
            <div className="px-5 mb-3 border-b-2 border-[#003366]/10 pb-2">
               <h3 className="text-[#003366] font-black text-sm tracking-wide">Market Intelligence</h3>
            </div>
            
            <div className="flex overflow-x-auto snap-x snap-mandatory px-5 pb-4 -mx-5 gap-3 scrollbar-hide no-scrollbar" style={{ paddingLeft: '20px', paddingRight: '20px' }}>
               {MARKET_INTEL.map((intel) => (
                  <div key={intel.id} className="shrink-0 snap-start w-[90px] bg-black rounded-lg p-2.5 shadow-md border border-[#333] flex flex-col relative overflow-hidden h-[120px]">
                     {/* Y-axis labels */}
                     <div className="absolute inset-0 opacity-20 pointer-events-none flex flex-col justify-between p-2">
                        <span className="text-[5px] text-white">60</span>
                        <span className="text-[5px] text-white">40</span>
                        <span className="text-[5px] text-white">20</span>
                        <span className="text-[5px] text-white">0</span>
                     </div>

                     {/* Commodity title */}
                     <span className="text-[8px] font-black text-white/50 text-center tracking-widest mb-0.5 z-10 uppercase leading-none">{intel.title}</span>

                     {/* Live price ticker */}
                     <span className="text-[10px] font-black text-[#FFC300] text-center z-10 leading-none mb-1 tracking-tight">{intel.price}</span>

                     {/* Sparkline */}
                     <div className="flex-1 w-full h-full relative z-10 flex items-end justify-center mb-1">
                        <svg className="w-full h-[48px]" viewBox="0 0 40 50" preserveAspectRatio="none">
                           <path
                              d={intel.graph}
                              fill="none"
                              stroke="#FFC300"
                              strokeWidth="2"
                              vectorEffect="non-scaling-stroke"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                           />
                        </svg>
                     </div>

                     {/* Live dot + X-axis */}
                     <div className="flex items-center justify-between mt-auto z-10 border-t border-white/20 pt-1">
                        <div className="flex items-center gap-1">
                           <span className="w-1.5 h-1.5 rounded-full bg-[#FFC300] animate-pulse block" />
                           <span className="text-[5px] text-[#FFC300]/70 font-black uppercase tracking-widest">LIVE</span>
                        </div>
                        <span className="text-[5px] text-white/40">2025</span>
                     </div>
                  </div>
               ))}
            </div>
          </section>

          {/* Business Listing Vertical Feed */}
          <section className="px-5">
            <div className="mb-3 border-b-2 border-[#003366]/10 pb-2">
               <h3 className="text-[#003366] font-black text-sm tracking-wide mb-3">Business Listing</h3>
               <div className="space-y-3">
                  {BUSINESSES.map((business, i) => (
                     <div key={i} className="flex items-center justify-between border border-[#003366]/20 py-2.5 px-3 rounded-2xl hover:bg-slate-50 transition-colors shadow-sm bg-white">
                        <div className="flex items-center gap-3 min-w-0">
                           <div className="w-9 h-9 rounded-xl bg-[#003366]/5 text-[#003366] font-black text-[11px] flex items-center justify-center shrink-0 border border-[#003366]/10">
                              {business.logo}
                           </div>
                           <div className="flex flex-col min-w-0">
                              <span className="text-[10px] font-black text-[#003366] truncate leading-tight">{business.name}</span>
                              <button className="text-[9px] font-bold text-[#FF8C00] text-left mt-0.5 active:opacity-60 leading-none">Window Shopping</button>
                           </div>
                        </div>
                        <div className="flex items-center gap-2 shrink-0">
                           <span className="text-[8px] font-bold text-[#003366]/30 uppercase tracking-widest hidden sm:inline-block">{business.category}</span>
                           <div className="w-6 h-6 bg-[#003366] rounded-full flex items-center justify-center text-white shrink-0 shadow-sm active:scale-95 transition-transform cursor-pointer">
                              <ArrowDown size={12} strokeWidth={3} />
                           </div>
                        </div>
                     </div>
                  ))}
               </div>
            </div>

            <div className="mt-4 border-b-2 border-[#003366]/10 pb-2">
               <h3 className="text-[#003366] font-black text-sm tracking-wide mb-3">Window Shopping</h3>
               <div className="space-y-3">
                  <div className="flex items-center justify-between border border-[#003366]/20 py-2 px-3 rounded-full hover:bg-slate-50 transition-colors shadow-sm bg-white">
                     <div className="flex items-center gap-3 min-w-0">
                        <div className="w-7 h-7 rounded-sm overflow-hidden flex items-center justify-center shrink-0">
                           <img src="https://images.unsplash.com/photo-1542281286-9e0a16bb7366?w=100&q=80" alt="Logo" className="w-full h-full object-cover" />
                        </div>
                        <span className="text-[10px] font-black text-[#003366] truncate uppercase">THE SCENT STORE ZAMBIA</span>
                     </div>
                     <div className="flex items-center gap-3 shrink-0">
                        <span className="text-[8px] font-bold text-[#FF8C00] uppercase tracking-widest hidden sm:inline-block">retail store</span>
                        <div className="w-6 h-6 bg-[#003366] rounded-full flex items-center justify-center text-white shrink-0 shadow-sm active:scale-95 transition-transform cursor-pointer">
                           <UserCircle size={14} />
                        </div>
                     </div>
                  </div>
               </div>
            </div>
          </section>

        </div>
      )}
    </div>
  );
}