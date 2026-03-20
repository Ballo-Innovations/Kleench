import { motion } from "motion/react";
import { ShieldCheck, Share2 } from "lucide-react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import kleenchLogo from "@/assets/kleench_logo.png";

const CAMPAIGNS = [
  { id: 1, name: "Cherish Chansa", category: "Business & Finance", image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&q=80" },
  { id: 2, name: "David Mwale", category: "Technology Education", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80" },
];

const BOOST_PRODUCTS = [
  { id: 1, title: "Solar Light Promotion", price: "K10.00", oldPrice: "K3.30", earn: "K1.40", image: "https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?w=200&q=80" },
  { id: 2, title: "Course: Digital Marketing Basics", price: "K3.30", oldPrice: null, earn: "K0.50", image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=200&q=80" },
];

export function Sowela() {
  return (
    <div className="flex flex-col gap-6 pb-24 min-h-screen font-[var(--font-body)] relative z-10 w-full">
      {/* Header Section */}
      <div className="relative pt-12 pb-16 px-4 bg-gradient-to-b from-[#ff8c00] to-[#e67e00] rounded-b-[40px] shadow-[0_12px_40px_rgba(255,140,0,0.15)] overflow-hidden">
        {/* Premium Orange Grid/Texture Overlay */}
        <div className="absolute inset-0 opacity-[0.15]" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.8) 1px, transparent 0)', backgroundSize: '8px 8px' }} />
        <div className="absolute inset-0 opacity-[0.1]" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.3) 1px, transparent 1px)', backgroundSize: '32px 32px' }} />

        <div className="relative z-10">
          <div className="flex items-center mb-4">
            <img src={kleenchLogo} alt="KLEENCH" className="h-8 w-auto object-contain brightness-0 invert" />
          </div>
          <h2 className="text-white text-4xl font-bold mb-2 tracking-tight" style={{ fontFamily: 'Agrandir, sans-serif' }}>
            Sowela
          </h2>
          <p className="text-white/90 text-[19px] font-bold leading-tight mb-6" style={{ fontFamily: 'Agrandir, sans-serif' }}>
            Find & Support<br />Trusted Creators
          </p>
          <motion.button whileTap={{ scale: 0.95 }} className="bg-white/20 backdrop-blur-md text-white font-bold py-3 px-6 rounded-2xl flex items-center justify-center gap-2 border border-white/30 shadow-sm w-max text-[14px]">
            <Share2 size={16} /> Share, Earn, Repeat!
          </motion.button>
        </div>
      </div>

      <div className="px-4 space-y-8 relative z-10 -mt-10">
        {/* Sowela Creators */}
        <div>

          <div className="flex flex-col gap-4">
            {CAMPAIGNS.map(creator => (
              <div key={creator.id} className="bg-white border border-gray-100 p-4 rounded-[28px] flex flex-col gap-5 shadow-[0_8px_30px_rgba(0,0,0,0.06)] hover:shadow-[0_12px_40px_rgba(0,0,0,0.08)] transition-all">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-full overflow-hidden bg-gray-100 flex-shrink-0 border border-gray-100/50 shadow-sm">
                    <ImageWithFallback src={creator.image} alt={creator.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bold text-[#191c1e] text-[17px] flex items-center gap-1.5" style={{ fontFamily: 'Agrandir, sans-serif' }}>
                      {creator.name} <ShieldCheck size={16} className="text-[var(--trust-blue)]" />
                    </h4>
                    <p className="text-[13px] text-gray-500 font-medium">{creator.category}</p>
                  </div>
                </div>
                
                <div className="flex gap-3">
                  <motion.button whileTap={{scale: 0.95}} className="flex-1 bg-[#2f855a] text-white py-3.5 rounded-[18px] font-bold flex items-center justify-center gap-2 shadow-[0_8px_20px_rgba(47,133,90,0.25)] text-[14px] leading-none">
                    Buy Buy Mwezi
                  </motion.button>
                  <motion.button whileTap={{scale: 0.95}} className="flex-1 bg-[#ff8c00] text-white py-3.5 rounded-[18px] font-bold flex items-center justify-center gap-2 shadow-[0_8px_20px_rgba(255,140,0,0.25)] text-[14px] leading-none">
                    <Share2 size={16} strokeWidth={2.5} /> Share
                  </motion.button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Boost Your Business */}
        <div>
          <h3 className="font-bold text-[#191c1e] text-[18px] mb-4 px-2" style={{fontFamily: 'Agrandir, sans-serif'}}>Boost Your Business</h3>
          <div className="flex flex-col gap-3">
            {BOOST_PRODUCTS.map(product => (
              <div key={product.id} className="bg-white border border-gray-100 p-3.5 rounded-3xl flex items-center gap-4 shadow-[0_4px_20px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_25px_rgba(0,0,0,0.06)] transition-all">
                <div className="w-[84px] h-[84px] rounded-2xl bg-gray-50 overflow-hidden flex-shrink-0 border border-gray-100/50">
                  <ImageWithFallback src={product.image} alt={product.title} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 py-1">
                  <h4 className="font-bold text-[#191c1e] mb-1.5 text-[15px] leading-tight line-clamp-2" style={{ fontFamily: 'Agrandir, sans-serif', letterSpacing: '-0.01em' }}>
                    {product.title}
                  </h4>
                  <div className="flex items-center gap-2 mb-2">
                    {product.oldPrice && <p className="text-[12px] text-gray-400 font-medium line-through decoration-gray-300">{product.oldPrice}</p>}
                    <p className="text-[11px] text-gray-500 font-medium">Contact Your Rep</p>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="font-bold text-[#ff8c00] text-[17px]" style={{ fontFamily: 'Agrandir, sans-serif' }}>
                      {product.price}
                    </p>
                    <span className="text-[10px] bg-orange-50 text-[#ff8c00] px-3 py-1.5 rounded-full font-bold uppercase tracking-wide">Earn {product.earn}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
