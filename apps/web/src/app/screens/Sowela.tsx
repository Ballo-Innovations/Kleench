import { motion } from "motion/react";
import { Share2, ChevronRight } from "lucide-react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { LottieIcon } from "../components/LottieIcon";
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

/* Unified cross-hatch bg */
function CrossHatchBg() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 0 }}>
      <svg width="100%" height="100%" style={{ position: "absolute", inset: 0 }}>
        <defs>
          <pattern id="xhatch-sowela" x="0" y="0" width="24" height="24" patternUnits="userSpaceOnUse">
            <line x1="0" y1="0" x2="24" y2="24" stroke="#FF8C00" strokeWidth="0.5" strokeOpacity="0.07"/>
            <line x1="24" y1="0" x2="0" y2="24" stroke="#FF8C00" strokeWidth="0.5" strokeOpacity="0.07"/>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#xhatch-sowela)"/>
      </svg>
    </div>
  );
}

export function Sowela() {

  return (
    <div className="w-full max-w-md mx-auto pb-32 relative min-h-screen font-[var(--font-body)]">
      <CrossHatchBg />

      {/* ── Premium Orange Header ── */}
      <div className="relative pt-8 pb-20 px-6 overflow-hidden rounded-b-[40px]"
        style={{ background: "linear-gradient(135deg, #FF8C00, #e06900)", boxShadow: "0 12px 40px rgba(255,140,0,0.15)" }}>
        
        {/* subtle grid on top of orange */}
        <div className="absolute inset-0 opacity-[0.1]">
          <svg width="100%" height="100%">
            <defs>
              <pattern id="sowela-grid" width="20" height="20" patternUnits="userSpaceOnUse">
                <path d="M 20 0 L 0 0 0 20" fill="none" stroke="white" strokeWidth="0.5"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#sowela-grid)"/>
          </svg>
        </div>

        <div className="relative z-10">
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={grace()}
            className="flex items-center mb-6">
            <img src={kleenchLogo} alt="KLEENCH" className="h-8 w-auto object-contain brightness-0 invert" />
          </motion.div>
          
          <motion.h2 initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={grace(0.1)}
            className="text-white text-4xl font-black mb-3 leading-none tracking-tight" style={{ fontFamily: 'Agrandir, sans-serif' }}>
            Sowela
          </motion.h2>
          
          <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={grace(0.2)}
            className="text-white/90 text-[19px] font-bold leading-tight mb-8" style={{ fontFamily: 'Agrandir, sans-serif' }}>
            Find & Support<br />Trusted Creators
          </motion.p>
          
          <motion.button 
            whileTap={{ scale: 0.95 }} 
            whileHover={{ y: -2 }}
            initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} transition={grace(0.3)}
            className="bg-white/20 backdrop-blur-md text-white font-bold py-3 px-6 rounded-2xl flex items-center justify-center gap-2 border border-white/30 shadow-lg w-max text-[14px]">
            <Share2 size={16} /> Share, Earn, Repeat!
          </motion.button>
        </div>
      </div>

      {/* ── Content overlapping header ── */}
      <div className="px-5 space-y-10 relative z-10 -mt-10">
        
        {/* Creators Section */}
        <section>
          <div className="flex flex-col gap-5">
            {CAMPAIGNS.map((creator, i) => {
              const yOffset = i % 2 === 1 ? 12 : 0;
              return (
                <motion.div key={creator.id} 
                  initial={{ opacity: 0, y: yOffset + 24 }}
                  animate={{ opacity: 1, y: yOffset }}
                  transition={grace(0.1 + i * 0.1)}
                  whileHover={{ y: yOffset - 4 }}
                  className="bg-white border rounded-[32px] p-5 flex flex-col gap-6" 
                  style={{ 
                    borderColor: "rgba(13,27,62,0.06)", 
                    boxShadow: "0 12px 36px rgba(13,27,62,0.08)",
                    transition: "box-shadow 0.6s ease"
                  }}>
                  
                  <div className="flex items-center gap-5">
                    <div className="w-18 h-18 rounded-full overflow-hidden flex-shrink-0 border-2 border-[#FF8C00]/20 shadow-sm"
                      style={{ width: 72, height: 72 }}>
                      <ImageWithFallback src={creator.image} alt={creator.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-1.5 mb-1">
                        <h4 className="font-black text-[#0D1B3E] text-[18px]" style={{ fontFamily: 'Agrandir, sans-serif' }}>
                          {creator.name}
                        </h4>
                        <LottieIcon icon="shield" size={18} />
                      </div>
                      <p className="text-[13px] text-gray-500 font-bold uppercase tracking-wide">{creator.category}</p>
                    </div>
                  </div>
                  
                  <div className="flex gap-4">
                    <motion.button 
                      whileTap={{scale: 0.96}} 
                      whileHover={{ y: -1 }}
                      className="flex-1 bg-[#00695C] text-white py-4 rounded-[20px] font-black text-[14px] leading-none shadow-lg"
                      style={{ fontFamily: 'Agrandir, sans-serif' }}>
                      Buy Buy Mwezi
                    </motion.button>
                    <motion.button 
                      whileTap={{scale: 0.96}} 
                      whileHover={{ y: -1 }}
                      className="flex-1 bg-[#FF8C00] text-white py-4 rounded-[20px] font-black flex items-center justify-center gap-2 shadow-lg text-[14px] leading-none"
                      style={{ fontFamily: 'Agrandir, sans-serif' }}>
                      <LottieIcon icon="share" size={18} /> Share
                    </motion.button>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </section>

        {/* Boost Your Business Section */}
        <section>
          <div className="flex items-center gap-3 mb-6 px-1">
            <LottieIcon icon="rocket" size={32} />
            <h3 className="font-black text-[#0D1B3E] text-[20px]" style={{fontFamily: 'Agrandir, sans-serif'}}>Boost Your Business</h3>
          </div>
          
          <div className="flex flex-col gap-4">
            {BOOST_PRODUCTS.map((product, i) => {
              const yOffset = i % 2 === 1 ? 8 : 0;
              return (
                <motion.div key={product.id} 
                  initial={{ opacity: 0, y: yOffset + 16 }}
                  animate={{ opacity: 1, y: yOffset }}
                  transition={grace(0.3 + i * 0.1)}
                  whileHover={{ y: yOffset - 3 }}
                  className="bg-white border rounded-[28px] p-4 flex items-center gap-5 shadow-sm"
                  style={{ 
                    borderColor: "rgba(13,27,62,0.05)",
                    boxShadow: "0 4px 20px rgba(0,0,0,0.03)",
                    transition: "box-shadow 0.5s ease" 
                  }}>
                  <div className="w-[90px] h-[90px] rounded-2xl bg-gray-50 overflow-hidden flex-shrink-0 border border-gray-100/50">
                    <ImageWithFallback src={product.image} alt={product.title} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 py-1">
                    <h4 className="font-black text-[#0D1B3E] mb-1.5 text-[15px] leading-tight line-clamp-2" style={{ fontFamily: 'Agrandir, sans-serif', letterSpacing: '-0.01em' }}>
                      {product.title}
                    </h4>
                    <div className="flex items-center gap-2 mb-3">
                      {product.oldPrice && <p className="text-[12px] text-gray-400 font-medium line-through decoration-gray-300">{product.oldPrice}</p>}
                      <p className="text-[11px] text-gray-400 font-bold uppercase tracking-wider">Contact Your Rep</p>
                    </div>
                    <div className="flex items-center justify-between">
                      <p className="font-black text-[#FF8C00] text-[18px]" style={{ fontFamily: 'Agrandir, sans-serif' }}>
                        {product.price}
                      </p>
                      <span className="text-[9px] bg-[#FFF7ED] text-[#FF8C00] px-3 py-1.5 rounded-full font-black uppercase tracking-wider border border-[#FF8C00]/10">
                        Earn {product.earn}
                      </span>
                    </div>
                  </div>
                  <div className="flex-shrink-0 pr-1">
                    <ChevronRight size={18} className="text-gray-300" />
                  </div>
                </motion.div>
              );
            })}
          </div>
          
          <motion.button 
            whileTap={{ scale: 0.98 }}
            className="w-full mt-8 py-4 px-6 rounded-2xl font-black text-[13px] uppercase tracking-widest flex items-center justify-center gap-2"
            style={{ 
              background: "#F8F9FB", 
              color: "rgba(13,27,62,0.4)", 
              border: "1.5px dashed rgba(13,27,62,0.1)",
              fontFamily: "Agrandir, sans-serif"
            }}>
            View All Marketplace <ArrowRight size={14} />
          </motion.button>
        </section>

      </div>
    </div>
  );
}

function ArrowRight({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 12h14M12 5l7 7-7 7"/>
    </svg>
  );
}
