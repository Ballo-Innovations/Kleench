import { Link } from "react-router";
import { motion } from "motion/react";
import notFoundVideo from "@/assets/404.webm";
import { ArrowLeft } from "lucide-react";

export function NotFound() {
  return (
    <div className="w-full relative min-h-[100dvh] bg-gray-50 overflow-hidden font-sans flex flex-col items-center justify-center pb-32">
      
      {/* ── Unified cross-hatch bg ── */}
      <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 0 }}>
        <svg width="100%" height="100%" style={{ position: "absolute", inset: 0 }}>
          <defs>
            <pattern id="xhatch-404" x="0" y="0" width="24" height="24" patternUnits="userSpaceOnUse">
              <line x1="0" y1="0" x2="24" y2="24" stroke="#FF8C00" strokeWidth="0.5" strokeOpacity="0.07"/>
              <line x1="24" y1="0" x2="0" y2="24" stroke="#FF8C00" strokeWidth="0.5" strokeOpacity="0.07"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#xhatch-404)"/>
        </svg>
      </div>

      <div className="relative z-10 flex flex-col items-center max-w-[320px] w-full px-5 pb-8">
        
        <motion.video 
          initial={{ opacity: 0, scale: 0.9, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          src={notFoundVideo} 
          autoPlay 
          loop 
          muted 
          playsInline 
          className="w-[240px] h-[240px] sm:w-[280px] sm:h-[280px] mb-8 object-cover mix-blend-multiply"
        />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="text-center flex flex-col items-center w-full"
        >
          <h1 className="text-[#0D1B3E] text-[56px] font-black tracking-tighter mb-1 leading-none drop-shadow-sm" style={{ fontFamily: "system-ui, -apple-system, sans-serif" }}>
            404
          </h1>
          <p className="text-gray-500 font-bold mb-8 leading-snug text-[15px] px-2" style={{ fontFamily: "system-ui, -apple-system, sans-serif" }}>
            Looks like you wandered off the map. This page is missing!
          </p>
          
          <Link to="/" className="w-full group">
            <motion.button 
              whileTap={{ scale: 0.97 }}
              className="bg-[#003366] group-hover:bg-[#002244] transition-colors text-white w-full py-4 rounded-[20px] font-black text-[15px] flex items-center justify-center gap-2 shadow-xl shadow-[#003366]/20 border border-t-white/10"
              style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>
              <ArrowLeft size={18} strokeWidth={2.5} className="group-hover:-translate-x-1 transition-transform" /> 
              Back to Safety
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
