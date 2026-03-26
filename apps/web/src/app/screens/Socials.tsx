import { motion } from "motion/react";
import { Share2, ChevronRight, ShieldCheck, ArrowRight } from "lucide-react";
import kleenchLogo from "@/assets/kleench_logo.png";

// --- MOCKS FOR PREVIEW ENVIRONMENT ---
const adBanner = "https://picsum.photos/seed/creators/800/300";

const CAMPAIGNS = [
  { id: 1, name: "Cherish Chansa", category: "Business & Finance", image: "https://picsum.photos/seed/cherish/400/400", verified: true },
  { id: 2, name: "David Mwale", category: "Technology Education", image: "https://picsum.photos/seed/david/400/400", verified: true },
];

const BOOST_PRODUCTS = [
  { id: 1, title: "Solar Light Promotion", price: "ZMW 10.00", oldPrice: "ZMW 3.30", earn: "ZMW 1.40", image: "https://picsum.photos/seed/solar/400/400" },
  { id: 2, title: "Course: Digital Marketing Basics", price: "ZMW 3.30", oldPrice: null, earn: "ZMW 0.50", image: "https://picsum.photos/seed/marketing/400/400" },
];
// -------------------------------------

/* Graceful transition builder */
const grace = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { delay, duration: 0.62, ease: [0.22, 1, 0.36, 1] as const },
});

export function Socials() {
  return (
    <div className="w-full relative min-h-[100dvh] bg-gray-50 overflow-x-hidden font-sans pb-32">
      
      {/* ── Unified cross-hatch bg ── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 0 }}>
        <svg width="100%" height="100%" style={{ position: "absolute", inset: 0 }}>
          <defs>
            <pattern id="xhatch-socials" x="0" y="0" width="24" height="24" patternUnits="userSpaceOnUse">
              <line x1="0" y1="0" x2="24" y2="24" stroke="#FF8C00" strokeWidth="0.5" strokeOpacity="0.07"/>
              <line x1="24" y1="0" x2="0" y2="24" stroke="#FF8C00" strokeWidth="0.5" strokeOpacity="0.07"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#xhatch-socials)"/>
        </svg>
      </div>

      {/* ── Premium Orange Header matching Home ── */}
      <div className="relative pt-4 pb-0 px-6 overflow-hidden rounded-b-[40px] flex flex-col justify-between h-[180px]"
        style={{ background: "linear-gradient(135deg, #FF8C00, #e06900)", boxShadow: "0 10px 30px rgba(255,140,0,0.12)" }}>
        
        {/* Premium grid texture with depth */}
        <div className="absolute inset-0 opacity-[0.25]" style={{ WebkitMaskImage: 'radial-gradient(circle at top left, white, transparent 80%)', maskImage: 'radial-gradient(circle at top left, white, transparent 80%)' }}>
          <svg width="100%" height="100%">
            <defs>
              <pattern id="premium-grid-socials" width="32" height="32" patternUnits="userSpaceOnUse">
                <path d="M 32 0 L 0 0 0 32" fill="none" stroke="white" strokeWidth="1.5" strokeOpacity="0.6"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#premium-grid-socials)"/>
          </svg>
        </div>
        {/* Soft glow orbs for architectural lighting effect */}
        <div className="absolute top-[-20%] left-[-10%] w-64 h-64 bg-white/20 rounded-full blur-[60px] pointer-events-none"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-48 h-48 bg-[#FFC300]/20 rounded-full blur-[50px] pointer-events-none"></div>

        <div className="relative z-10 flex items-center justify-between mt-2 h-10 gap-2">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <img src={kleenchLogo} alt="KLEENCH" className="h-8 w-auto object-contain brightness-0 invert" />
            <span className="text-white font-black text-xl tracking-tight opacity-90" style={{ fontFamily: "system-ui, -apple-system, sans-serif" }}>Socials</span>
          </div>
        </div>

        <div className="relative z-10 space-y-1 mb-8">
          <h1 className="text-white text-3xl font-black tracking-tight" style={{ fontFamily: "system-ui, -apple-system, sans-serif" }}>Connect & Share!</h1>
          <p className="text-white/80 text-[13px] font-medium">Support trusted creators and earn rewards.</p>
        </div>
      </div>

      {/* ── Content ── */}
      <div className="px-4 mt-2 space-y-6 relative z-10">
        
        {/* Page Title */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="px-1">
          <h1 className="text-[#003366] text-3xl font-black tracking-tight" style={{ fontFamily: "system-ui, -apple-system, sans-serif" }}>Socials</h1>
          <p className="text-gray-500 text-[13px] font-medium mt-0.5">Support creators and boost your network.</p>
        </motion.div>
        
        {/* Banner Ad similarly styled as Home's sponsored banner */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }}
          transition={grace(0.1)}
          className="rounded-[24px] h-[130px] overflow-hidden shadow-md border border-black/[0.04] relative group cursor-pointer active:scale-[0.98] transition-transform">
          <img src={adBanner} alt="Support Trusted Creators" className="absolute inset-0 w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#EF6C00] via-[#EF6C00]/95 to-transparent w-[80%]"></div>
          
          <div className="relative z-10 p-5 flex flex-col items-start w-full h-full justify-center">
            <span className="text-white/90 text-[10px] italic font-semibold mb-1 drop-shadow-sm">Community</span>
            <h2 className="text-white text-[18px] font-black mb-3 tracking-tight leading-tight drop-shadow-sm max-w-[70%]">Support Trusted Creators</h2>
            <button className="bg-[#003366] hover:bg-[#002244] text-white font-bold py-1.5 px-4 rounded-lg text-[11px] transition-colors shadow-sm">
              Discover
            </button>
          </div>
        </motion.div>

        {/* Creators Section */}
        <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={grace(0.2)}>
          <h3 className="text-sm font-black text-[#003366] mb-3 px-1 tracking-wide" style={{ fontFamily: "system-ui, -apple-system, sans-serif" }}>Featured Creators</h3>
          <div className="flex flex-col gap-3">
            {CAMPAIGNS.map((creator) => (
                <div key={creator.id} 
                  className="bg-white rounded-[24px] p-4 flex flex-col gap-4 shadow-sm border border-black/[0.04]">
                  
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-full overflow-hidden flex-shrink-0 shadow-sm border border-gray-100">
                      <img src={creator.image} alt={creator.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-1.5 mb-0.5">
                        <h4 className="font-bold text-[#003366] text-[16px]" style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>
                          {creator.name}
                        </h4>
                        <ShieldCheck size={16} className="text-[#EF6C00]" />
                      </div>
                      <p className="text-[12px] text-gray-500 font-medium">{creator.category}</p>
                    </div>
                  </div>
                  
                  <div className="flex gap-2">
                    <motion.button 
                      whileTap={{scale: 0.96}} 
                      className="flex-1 bg-[#003366] hover:bg-[#002244] transition-colors text-white py-3 rounded-xl font-bold text-[12px] leading-none shadow-sm"
                      style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>
                      Support Creator
                    </motion.button>
                    <motion.button 
                      whileTap={{scale: 0.96}} 
                      className="flex-1 bg-[#EF6C00] hover:bg-[#d86200] transition-colors text-white py-3 rounded-xl font-bold flex items-center justify-center gap-2 shadow-sm text-[12px] leading-none"
                      style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>
                      <Share2 size={15} /> Share
                    </motion.button>
                  </div>
                </div>
            ))}
          </div>
        </motion.section>

        {/* Boost Your Business Section */}
        <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={grace(0.3)}>
          <h3 className="text-sm font-black text-[#003366] mb-3 px-1 tracking-wide" style={{ fontFamily: "system-ui, -apple-system, sans-serif" }}>Boost Your Business</h3>
          
          <div className="flex flex-col gap-3">
            {BOOST_PRODUCTS.map((product) => (
                <div key={product.id} 
                  className="bg-white border rounded-[24px] p-3 flex items-center gap-4 shadow-sm cursor-pointer active:scale-[0.98] transition-transform group"
                  style={{ borderColor: "rgba(0,0,0,0.04)" }}>
                  <div className="w-[80px] h-[80px] rounded-[16px] bg-gray-50 overflow-hidden flex-shrink-0 border border-gray-100">
                    <img src={product.image} alt={product.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  </div>
                  <div className="flex-1 py-1">
                    <h4 className="font-bold text-[#003366] mb-1 text-[13px] leading-snug line-clamp-2" style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>
                      {product.title}
                    </h4>
                    <div className="flex items-center gap-2 mb-1.5 min-h-[16px]">
                      {product.oldPrice && <p className="text-[11px] text-gray-400 font-medium line-through">{product.oldPrice}</p>}
                    </div>
                    <div className="flex items-center justify-between">
                      <p className="font-black text-[#EF6C00] text-[15px]" style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>
                        {product.price}
                      </p>
                      <span className="text-[9px] bg-[#EF6C00]/10 text-[#EF6C00] px-2.5 py-1 rounded-md font-bold uppercase tracking-wider">
                        Earn {product.earn}
                      </span>
                    </div>
                  </div>
                  <div className="flex-shrink-0 pr-2">
                    <ChevronRight size={18} className="text-gray-300 group-hover:text-[#EF6C00] transition-colors" />
                  </div>
                </div>
            ))}
          </div>
          
          <motion.button 
            whileTap={{ scale: 0.98 }}
            className="w-full mt-4 py-3.5 px-6 rounded-2xl font-bold text-[13px] bg-white border border-gray-200 text-[#003366] flex items-center justify-center gap-2 shadow-sm hover:shadow-md transition-shadow"
            style={{ fontFamily: "system-ui, -apple-system, sans-serif" }}>
            View Marketplace <ArrowRight size={16} />
          </motion.button>
        </motion.section>

      </div>
    </div>
  );
}


