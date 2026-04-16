import { motion } from "motion/react";
import { QrCode, Scan, Minus, Plus } from "lucide-react";
import { useState } from "react";
import { PageHeader } from "../components/PageHeader";

export function ScanPay() {
  const [amount, setAmount] = useState(250);
  const [mode, setMode] = useState<"scanner" | "viewer">("scanner");

  return (
    <div className="min-h-screen bg-transparent text-[#0D1B2A] font-sans pb-32">
      <PageHeader showBack title="Scan & Pay" />

      <div className="px-5 pt-4 space-y-8 flex flex-col items-center">
        {/* Scanner Viewport */}
        <div className="w-full aspect-square max-w-[300px] relative rounded-[40px] bg-[#5D56D8]/5 border-2 border-[#5D56D8]/10 shadow-lg flex items-center justify-center overflow-hidden">
          {/* Corner Brackets */}
          <div className="absolute top-8 left-8 w-12 h-12 border-t-8 border-l-8 border-[#0D1B2A] rounded-tl-2xl" />
          <div className="absolute top-8 right-8 w-12 h-12 border-t-8 border-r-8 border-[#0D1B2A] rounded-tr-2xl" />
          <div className="absolute bottom-8 left-8 w-12 h-12 border-b-8 border-l-8 border-[#0D1B2A] rounded-bl-2xl" />
          <div className="absolute bottom-8 right-8 w-12 h-12 border-b-8 border-r-8 border-[#0D1B2A] rounded-br-2xl" />
          
          {/* Scan Line Animation */}
          <motion.div 
            animate={{ 
              top: ["20%", "80%", "20%"] 
            }}
            transition={{ 
              duration: 3, 
              repeat: Infinity, 
              ease: "easeInOut" 
            }}
            className="absolute left-12 right-12 h-1.5 bg-[#6E7C91]/40 rounded-full blur-[1px]"
          />

          <p className="text-[#0D1B2A]/20 font-black text-xs uppercase tracking-[0.3em]">Scanner Active</p>
        </div>

        {/* Instructional Text */}
        <div className="text-center px-4">
          <p className="text-sm font-bold text-[#0D1B2A] leading-relaxed">
            Point the Camera at the QR Code<br />
            to make payment
          </p>
        </div>

        {/* Mode Toggle */}
        <div className="w-full bg-white rounded-full border-2 border-[#0D1B2A] shadow-[4px_4px_0px_#0D1B2A] p-1.5 flex gap-1.5">
          <button 
            onClick={() => setMode("scanner")}
            className={`flex-1 h-12 rounded-full flex items-center justify-center gap-2 transition-all ${
              mode === "scanner" ? "bg-[#0D1B2A] text-white shadow-md" : "bg-transparent text-[#0D1B2A]"
            }`}
          >
            <Scan size={18} />
            <span className="text-[10px] font-black uppercase tracking-widest">Scanner</span>
          </button>
          <button 
            onClick={() => setMode("viewer")}
            className={`flex-1 h-12 rounded-full flex items-center justify-center gap-2 transition-all ${
              mode === "viewer" ? "bg-[#0D1B2A] text-white shadow-md" : "bg-transparent text-[#0D1B2A]"
            }`}
          >
            <QrCode size={18} />
            <span className="text-[10px] font-black uppercase tracking-widest">QR Viewer</span>
          </button>
        </div>

        {/* Amount Input */}
        <div className="w-full flex items-center gap-4">
          <span className="text-sm font-black text-[#0D1B2A] uppercase tracking-tighter">Amount</span>
          <div className="flex-1 h-16 bg-white rounded-2xl border-2 border-[#0D1B2A] shadow-[4px_4px_0px_#0D1B2A] px-6 flex items-center justify-between">
            <motion.button 
              whileTap={{ scale: 0.8 }}
              onClick={() => setAmount(Math.max(0, amount - 50))} 
              className="text-[#0D1B2A]"
            >
              <Minus size={20} strokeWidth={4} />
            </motion.button>
            <span className="text-lg font-black text-[#0D1B2A] tracking-tighter">ZMW {amount.toFixed(2)}</span>
            <motion.button 
              whileTap={{ scale: 0.8 }}
              onClick={() => setAmount(amount + 50)} 
              className="text-[#0D1B2A]"
            >
              <Plus size={20} strokeWidth={4} />
            </motion.button>
          </div>
        </div>

        {/* Bottom Action Button */}
        <div className="w-full pt-4">
          <motion.button 
            whileTap={{ scale: 0.96 }}
            className="w-full h-14 bg-[#0D1B2A] text-white rounded-2xl flex items-center justify-center font-regular uppercase tracking-[0.3em] text-[11px] shadow-[0_10px_30px_rgba(13,27,42,0.2)]"
          >
            Pay
          </motion.button>
        </div>
      </div>
    </div>
  );
}
