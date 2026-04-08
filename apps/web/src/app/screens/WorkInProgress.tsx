import { motion } from "motion/react";
import { ArrowLeft, Hammer, Rocket, Sparkles } from "lucide-react";
import { Link, useNavigate } from "react-router";

interface WorkInProgressProps {
  featureName?: string;
}

export function WorkInProgress({ featureName = "This Feature" }: WorkInProgressProps) {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#0f172a] text-white flex flex-col items-center justify-center px-6 overflow-hidden relative">
      {/* Background Atmosphere */}
      <div className="absolute inset-0 grid-pattern opacity-10" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[120px]" />
      <div className="absolute bottom-0 right-0 w-[300px] h-[300px] bg-orange-500/10 rounded-full blur-[100px]" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 text-center max-w-lg"
      >
        <div className="mb-8 relative inline-block">
          <motion.div
            animate={{ 
              rotate: [0, 10, -10, 0],
              scale: [1, 1.1, 1]
            }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="w-24 h-24 bg-gradient-to-br from-[#ff8c00] to-[#e67e00] rounded-3xl flex items-center justify-center shadow-[0_20px_50px_rgba(255,140,0,0.3)] mx-auto border border-white/10"
          >
            <Hammer size={40} className="text-white" />
          </motion.div>
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute -top-4 -right-4 w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center border-4 border-[#0f172a] shadow-lg"
          >
            <Sparkles size={20} className="text-white" />
          </motion.div>
        </div>

        <h1 className="text-5xl font-black mb-6 tracking-tight leading-[0.9]" style={{ fontFamily: 'Agrandir, sans-serif' }}>
          WE ARE <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ff8c00] to-orange-300">BUILDING</span> SOMETHING BIG.
        </h1>
        
        <p className="text-gray-400 text-lg font-medium mb-12 max-w-md mx-auto leading-relaxed">
          The <span className="text-white font-bold">{featureName}</span> experience is currently being handcrafted with precision for the Kleench community.
        </p>

        <div className="flex flex-col gap-4 justify-center">
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate(-1)}
            className="px-8 py-4 rounded-2xl bg-white/5 border border-white/10 text-white font-bold flex items-center justify-center gap-2/10 transition-all"
          >
            <ArrowLeft size={20} /> Go Back
          </motion.button>
          
          <Link to="/">
            <motion.button
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 rounded-2xl bg-gradient-to-r from-[#ff8c00] to-[#e67e00] text-white font-bold flex items-center justify-center gap-2 shadow-lg shadow-orange-500/20"
            >
              Home base <Rocket size={20} />
            </motion.button>
          </Link>
        </div>
      </motion.div>

      {/* Decorative vertical text */}
      <div className="absolute left-6 top-1/2 -translate-y-1/2 hidden">
        <p className="text-[10px] font-black uppercase tracking-[1em] text-white/20 origin-left -rotate-90">
          SYSTEM_UNDER_CONSTRUCTION // BUILD_0.9.1
        </p>
      </div>
    </div>
  );
}
