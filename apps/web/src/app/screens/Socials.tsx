import { motion } from "motion/react";
import { Share2, ChevronRight } from "lucide-react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { LottieIcon } from "../components/LottieIcon";
import adBanner from "@/assets/ads/Support Trusted Creators.png";
import kleenchLogo from "@/assets/kleench_logo.png";

const CAMPAIGNS = [
  { id: 1, name: "Cherish Chansa", category: "Business & Finance", image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&q=80", verified: true },
  { id: 2, name: "David Mwale", category: "Technology Education", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80", verified: true },
];

const BOOST_PRODUCTS = [
  { id: 1, title: "Solar Light Promotion", price: "K10.00", oldPrice: "K3.30", earn: "K1.40", image: "https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?w=400&q=80" },
  { id: 2, title: "Course: Digital Marketing Basics", price: "K3.30", oldPrice: null, earn: "K0.50", image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&q=80" },
];

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
      <div className="relative pt-6 pb-20 px-6 overflow-hidden rounded-b-[32px]"
        style={{ background: "linear-gradient(135deg, #FF8C00, #e06900)", boxShadow: "0 12px 40px rgba(255,140,0,0.15)" }}>
        
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

        <div className="relative z-10 flex items-center justify-between mb-6 mt-2 h-10 gap-2">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <img src={kleenchLogo} alt="KLEENCH" className="h-8 w-auto object-contain brightness-0 invert" />
            <span className="text-white font-black text-xl tracking-tight opacity-90" style={{ fontFamily: "system-ui, -apple-system, sans-serif" }}>Socials</span>
          </div>
        </div>

        <div className="relative z-10 space-y-1">
          <h1 className="text-white text-3xl font-black tracking-tight" style={{ fontFamily: "system-ui, -apple-system, sans-serif" }}>Connect & Share!</h1>
          <p className="text-white/80 text-[13px] font-medium">Support trusted creators and earn rewards.</p>
        </div>
      </div>

      {/* ── Content overlapping header ── */}
      <div className="px-5 space-y-6 relative z-10 -mt-12">
        
        {/* Banner Ad similarly styled as Home's sponsored banner */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }}
          transition={grace(0.1)}
          className="rounded-[24px] overflow-hidden shadow-md border border-black/[0.04]">
          <img src={adBanner} alt="Support Trusted Creators" className="w-full h-auto object-cover" />
        </motion.div>

        {/* Creators Section */}
        <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={grace(0.2)}>
          <h3 className="text-sm font-black text-[#003366] mb-3 px-1 tracking-wide" style={{ fontFamily: "system-ui, -apple-system, sans-serif" }}>Featured Creators</h3>
          <div className="flex flex-col gap-3">
            {CAMPAIGNS.map((creator) => (
                <div key={creator.id} 
                  className="bg-white border rounded-[24px] p-4 flex flex-col gap-4 shadow-sm" 
                  style={{ borderColor: "rgba(0,0,0,0.04)" }}>
                  
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-full overflow-hidden flex-shrink-0 shadow-sm">
                      <ImageWithFallback src={creator.image} alt={creator.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-1.5 mb-0.5">
                        <h4 className="font-bold text-[#003366] text-[16px]" style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>
                          {creator.name}
                        </h4>
                        <LottieIcon icon="shield" size={16} />
                      </div>
                      <p className="text-[12px] text-gray-400 font-semibold">{creator.category}</p>
                    </div>
                  </div>
                  
                  <div className="flex gap-2">
                    <motion.button 
                      whileTap={{scale: 0.96}} 
                      className="flex-1 bg-[#005a8d] hover:bg-[#003366] transition-colors text-white py-2.5 rounded-xl font-bold text-[13px] leading-none shadow-sm"
                      style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>
                      Support Creator
                    </motion.button>
                    <motion.button 
                      whileTap={{scale: 0.96}} 
                      className="flex-1 bg-[#FF8C00] hover:bg-[#e06900] transition-colors text-white py-2.5 rounded-xl font-bold flex items-center justify-center gap-2 shadow-sm text-[13px] leading-none"
                      style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>
                      <Share2 size={16} /> Share
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
                  className="bg-white border rounded-[24px] p-3 flex items-center gap-4 shadow-sm"
                  style={{ borderColor: "rgba(0,0,0,0.04)" }}>
                  <div className="w-[80px] h-[80px] rounded-[16px] bg-gray-50 overflow-hidden flex-shrink-0 border border-gray-100">
                    <ImageWithFallback src={product.image} alt={product.title} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 py-1">
                    <h4 className="font-bold text-[#003366] mb-1 text-[14px] leading-tight line-clamp-2" style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>
                      {product.title}
                    </h4>
                    <div className="flex items-center gap-2 mb-2">
                      {product.oldPrice && <p className="text-[11px] text-gray-400 font-medium line-through">{product.oldPrice}</p>}
                    </div>
                    <div className="flex items-center justify-between">
                      <p className="font-black text-[#FF8C00] text-[16px]" style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>
                        {product.price}
                      </p>
                      <span className="text-[10px] bg-[#FFF7ED] text-[#FF8C00] px-2.5 py-1 rounded-full font-bold">
                        Earn {product.earn}
                      </span>
                    </div>
                  </div>
                  <div className="flex-shrink-0 pr-1">
                    <ChevronRight size={18} className="text-gray-300" />
                  </div>
                </div>
            ))}
          </div>
          
          <motion.button 
            whileTap={{ scale: 0.98 }}
            className="w-full mt-6 py-3.5 px-6 rounded-xl font-bold text-[13px] bg-white border border-gray-200 text-gray-500 flex items-center justify-center gap-2 shadow-sm"
            style={{ fontFamily: "system-ui, -apple-system, sans-serif" }}>
            View Marketplace <ArrowRight size={16} />
          </motion.button>
        </motion.section>

      </div>
    </div>
  );
}

function ArrowRight({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 12h14M12 5l7 7-7 7"/>
    </svg>
  );
}
