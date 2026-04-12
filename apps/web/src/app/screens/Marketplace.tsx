import { Link } from "react-router";
import { PageHeader } from "../components/PageHeader";
import { Search, Tag, FileText, UserPlus, Briefcase, ChevronRight, Ticket, Palette, Building2, UserCircle, ArrowDown } from "lucide-react";
import { motion } from "motion/react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { PageSkeletons, usePageLoading } from "../components/PageSkeletons";
import { toast } from "sonner";
import { useNavigate } from "react-router";
import smartphoneImg from "@/assets/products/smartphone.png";
import shoesImg from "@/assets/products/shoes.png";
import handbagImg from "@/assets/products/hand_bag.png";
import laptopImg from "@/assets/products/laptop.png";

import pacraLogo from "@/assets/pacra logo.png";
import zppaLogo from "@/assets/zppa logo.jpeg";

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

const SERVICES = [
  { id: "tickets", label: "BUY TICKETS", title: "TICKET", icon: Ticket, image: "https://images.unsplash.com/photo-1540839045366-eb10c95a04cc?w=400&q=80" },
  { id: "design", label: "DO GRAPHIC DESIGNING", title: "GRAPHIC DESIGN", icon: Palette, image: "https://images.unsplash.com/photo-1626785774573-4b799315345d?w=400&q=80" },
  { id: "pacra", label: "REGISTER COMPANY", title: "PACRA", icon: Building2, image: pacraLogo, isLogo: true },
  { id: "zppa", label: "HIRE", title: "ZPPA", icon: UserCircle, image: zppaLogo, isLogo: true }
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
  const navigate = useNavigate();

  const handleAction = (label: string) => {
    if (label === "SELL") navigate("/sell");
    else if (label === "REFER") navigate("/referral");
    else toast.info(`${label} interface coming soon.`);
  };

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
            <div className="flex justify-between items-center px-1">
              {[
                { icon: Tag, label: "SELL", color: "text-[#E85D3F]" },
                { icon: FileText, label: "LIST", color: "text-[#003366]" },
                { icon: UserPlus, label: "REFER", color: "text-[#00C853]" },
                { icon: Briefcase, label: "AGENT", color: "text-[#FFC300]" }
              ].map((action, i) => (
                <motion.button 
                  key={i} 
                  whileTap={{ scale: 0.9 }}
                  onClick={() => handleAction(action.label)}
                  className="flex flex-col items-center gap-2 group cursor-pointer"
                  style={{ touchAction: "manipulation" }}
                >
                  <div className={`w-[60px] h-[60px] rounded-2xl border-[3px] border-[#003366] bg-white flex items-center justify-center shadow-[4px_4px_0_#003366] group-active:shadow-none transition-all group-active:translate-y-1 group-active:translate-x-1 ${action.color}`}>
                    <action.icon size={26} strokeWidth={2.5} />
                  </div>
                  <span className="text-[10px] font-black tracking-widest text-[#003366] uppercase">{action.label}</span>
                </motion.button>
              ))}
            </div>
          </div>

          {/* Search Bar */}
          <div className="px-5 flex items-center gap-2">
            <div className="flex-1 relative flex items-center">
               <Search className="absolute left-4 text-[#003366]/60" size={20} strokeWidth={2.5} />
               <input 
                 type="text" 
                 placeholder="Search Product..." 
                 className="w-full bg-white border-[3px] border-[#003366] pl-12 pr-4 py-3 rounded-2xl shadow-[4px_4px_0_#003366] focus:shadow-none focus:translate-x-1 focus:translate-y-1 text-[13px] font-black text-[#003366] outline-none placeholder:text-[#003366]/40 transition-all" 
               />
               <button onClick={() => toast("Fetching category indexes...")} className="absolute right-4 text-[#FF8C00] font-black text-[11px] flex items-center gap-1 active:opacity-70 uppercase tracking-widest">
                 Categories <ChevronRight size={14} strokeWidth={3} className="text-[#003366]" />
               </button>
            </div>
          </div>

          {/* Featured Products */}
          <section>
            <div className="px-5 flex items-center justify-between mb-3 border-b-2 border-[#003366]/10 pb-2">
               <h3 className="text-[#003366] font-black text-sm tracking-wide">Featured Products</h3>
               <button onClick={() => toast.success("Loading complete product catalog...")} className="text-[#FF8C00] font-black text-[11px] flex items-center gap-1 uppercase tracking-widest">
                 See All <ChevronRight size={12} strokeWidth={3} />
               </button>
            </div>
            
            <div className="flex overflow-x-auto snap-x snap-mandatory px-5 pb-4 -mx-5 gap-3 scrollbar-hide no-scrollbar" style={{ paddingLeft: '20px', paddingRight: '20px' }}>
              {MARKET_PRODUCTS.map((product) => (
                <Link to={`/product/${product.id}`} key={product.id} className="block shrink-0 snap-start w-[110px]">
                  <div className="bg-white border-2 border-[#003366]/10 rounded-xl overflow-hidden shadow-sm flex flex-col h-full active:scale-95 transition-transform">
                    <div className="aspect-square bg-white relative border-b-2 border-[#003366]">
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
            <div className="px-5 mb-4 border-b-[3px] border-[#003366] pb-2">
               <h3 className="text-[#003366] font-black text-sm tracking-widest uppercase">Services</h3>
            </div>
            
            <div className="flex overflow-x-auto snap-x snap-mandatory px-5 pb-5 -mx-5 gap-4 scrollbar-hide no-scrollbar" style={{ paddingLeft: '20px', paddingRight: '20px' }}>
              {SERVICES.map((service) => (
                <motion.button whileTap={{ y: 4, x: 4, boxShadow: "0 0 0 #000" }} onClick={() => toast("Redirecting to " + service.title + " portal...")} key={service.id} className="block shrink-0 snap-start w-[140px] focus:outline-none">
                  <div className="bg-white border-[3px] border-[#003366] rounded-2xl overflow-hidden flex flex-col h-full relative cursor-pointer shadow-[6px_6px_0_#00C853] transition-colors">
                    <div className="h-[100px] relative border-b-[3px] border-[#003366] bg-white">
                       <img src={service.image} alt={service.title} className={`w-full h-full ${service.isLogo ? "object-contain p-2" : "object-cover grayscale-[0.2]"}`} />
                       {!service.isLogo && <div className="absolute inset-0 bg-black/40" />}
                       {!service.isLogo && (
                          <div className="absolute inset-0 flex items-center justify-center pointer-events-none p-3 text-center">
                            <span className="text-[11px] font-black text-white px-2 py-1 bg-[#003366]/80 border-2 border-white transform -rotate-12 shadow-[4px_4px_0_#FFC300] uppercase tracking-widest">{service.title}</span>
                          </div>
                       )}
                    </div>
                    <div className="py-2.5 px-2 bg-white flex items-center justify-center min-h-[40px]">
                       <span className="text-[9px] font-black text-[#003366] uppercase text-center leading-none tracking-[0.2em]">{service.label}</span>
                    </div>
                  </div>
                </motion.button>
              ))}
            </div>
          </section>

          {/* Market Intelligence Ticker */}
          <section>
            <div className="px-5 mb-4 border-b-[3px] border-[#003366] pb-2">
               <h3 className="text-[#003366] font-black text-sm tracking-widest uppercase">Market Intelligence</h3>
            </div>
            
            <div className="flex overflow-x-auto snap-x snap-mandatory px-5 pb-5 -mx-5 gap-4 scrollbar-hide no-scrollbar" style={{ paddingLeft: '20px', paddingRight: '20px' }}>
               {MARKET_INTEL.map((intel) => (
                  <div key={intel.id} className="shrink-0 snap-start w-[110px] bg-slate-900 rounded-2xl p-3 border-[3px] border-[#003366] shadow-[6px_6px_0_#E85D3F] flex flex-col relative overflow-hidden h-[150px]">
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
                     <span className="text-[14px] font-black text-[#FFC300] z-10 leading-none mt-2 mb-1 tracking-tight">{intel.price}</span>

                     {/* Sparkline */}
                     <div className="flex-1 w-full h-[60px] relative z-10 flex items-end justify-center mb-1">
                        <svg className="w-full h-full" viewBox="0 0 40 50" preserveAspectRatio="none">
                           <path
                              d={intel.graph}
                              fill="none"
                              stroke="#FFC300"
                              strokeWidth="3"
                              vectorEffect="non-scaling-stroke"
                              strokeLinecap="square"
                              strokeLinejoin="miter"
                           />
                        </svg>
                     </div>

                     {/* Live dot + X-axis */}
                     <div className="flex items-center justify-between mt-auto z-10 border-t-2 border-white/20 pt-2">
                        <div className="flex items-center gap-1.5">
                           <span className="w-2 h-2 rounded-full bg-[#FFC300] animate-pulse block shadow-[0_0_8px_#FFC300]" />
                           <span className="text-[7px] text-white font-black uppercase tracking-[0.2em] leading-none">LIVE</span>
                        </div>
                        <span className="text-[7px] font-black tracking-widest text-[#FFC300]/50 leading-none">2026</span>
                     </div>
                  </div>
               ))}
            </div>
          </section>

          {/* Business Listing Vertical Feed */}
          <section className="px-5">
            <div className="mb-4 border-b-[3px] border-[#003366] pb-2">
               <h3 className="text-[#003366] font-black text-sm tracking-widest uppercase mb-4">Business Listing</h3>
               <div className="space-y-4">
                  {BUSINESSES.map((business, i) => (
                     <div key={i} className="flex items-center justify-between bg-white border-[3px] border-[#003366] py-3 px-4 rounded-2xl hover:bg-slate-50 transition-colors shadow-[4px_4px_0_#FFC300] active:translate-x-1 active:translate-y-1 active:shadow-none cursor-pointer">
                        <div className="flex items-center gap-4 min-w-0">
                           <div className="w-10 h-10 rounded-[10px] bg-[#003366] text-white font-black text-[12px] flex items-center justify-center shrink-0 border-2 border-[#003366] overflow-hidden">
                              {business.logo}
                           </div>
                           <div className="flex flex-col min-w-0">
                              <span className="text-[12px] font-black text-[#003366] truncate leading-tight tracking-wider uppercase">{business.name}</span>
                              <button className="text-[9px] font-black tracking-widest text-[#FF8C00] text-left mt-1 uppercase leading-none">Window Shopping</button>
                           </div>
                        </div>
                        <div className="flex items-center gap-3 shrink-0">
                           <span className="text-[9px] font-black text-[#003366]/40 uppercase tracking-widest hidden sm:inline-block">{business.category}</span>
                           <div onClick={() => toast("Loading Business Intelligence...")} className="w-8 h-8 bg-white border-2 border-[#003366] rounded-full flex items-center justify-center text-[#003366] shrink-0 shadow-[2px_2px_0_#003366] active:translate-x-1 active:translate-y-1 active:shadow-none transition-all cursor-pointer">
                              <ArrowDown size={14} strokeWidth={3} />
                           </div>
                        </div>
                     </div>
                  ))}
               </div>
            </div>

            <div className="mt-6 border-b-[3px] border-[#003366] pb-2">
               <h3 className="text-[#003366] font-black text-sm tracking-widest uppercase mb-4">Window Shopping</h3>
               <div className="space-y-4">
                  <div className="flex items-center justify-between border-[3px] border-[#003366] py-3 px-4 rounded-2xl hover:bg-slate-50 transition-colors shadow-[4px_4px_0_#757575] bg-white active:translate-x-1 active:translate-y-1 active:shadow-none cursor-pointer">
                     <div className="flex items-center gap-4 min-w-0">
                        <div className="w-10 h-10 rounded-[10px] overflow-hidden flex items-center justify-center shrink-0 border-2 border-[#003366]">
                           <img src="https://images.unsplash.com/photo-1542281286-9e0a16bb7366?w=100&q=80" alt="Logo" className="w-full h-full object-cover" />
                        </div>
                        <span className="text-[12px] font-black tracking-wider text-[#003366] truncate uppercase">THE SCENT STORE ZAMBIA</span>
                     </div>
                     <div className="flex items-center gap-3 shrink-0">
                        <span className="text-[9px] font-black text-[#003366]/40 uppercase tracking-widest hidden sm:inline-block">retail store</span>
                        <div className="w-8 h-8 bg-white border-2 border-[#003366] rounded-full flex items-center justify-center text-[#003366] shrink-0 shadow-[2px_2px_0_#003366] active:translate-x-1 active:translate-y-1 active:shadow-none transition-all cursor-pointer">
                           <UserCircle size={16} strokeWidth={2.5} />
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