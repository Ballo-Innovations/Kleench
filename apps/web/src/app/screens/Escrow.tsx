import { motion, AnimatePresence } from "motion/react";
import { ChevronDown, CheckCircle2, Send, Truck, Ship, Plane, Globe, Lock, PackageCheck, AlertCircle } from "lucide-react";
import { useState } from "react";
import { PageHeader } from "../components/PageHeader";

/* ── Kinetic Transition Setup ── */
const springTransition = {
  type: "spring" as const,
  stiffness: 400,
  damping: 30,
};

const kineticEntry = {
  initial: { opacity: 0, scale: 0.95, y: 10 },
  animate: { opacity: 1, scale: 1, y: 0 },
  exit: { opacity: 0, scale: 1.05, y: -10 },
  transition: springTransition
};

export function Escrow() {
  const [step, setStep] = useState<1 | 2 | 3>(1);

  return (
    <div className="min-h-screen bg-white text-[#0D1B2A] font-sans pb-32">
       {/* Background Accent Grid */}
       <div className="fixed inset-0 opacity-[0.03] pointer-events-none" 
            style={{ backgroundImage: "radial-gradient(#0D1B2A 2px, transparent 2px)", backgroundSize: "24px 24px" }} 
       />

      <AnimatePresence mode="wait">
        {step === 1 && (
          <motion.div 
            key="step1"
            {...kineticEntry}
          >
            <PageHeader showBack title="CREATE ESCROW" />
            
            <div className="px-5 pt-6 space-y-8 relative z-10">
              {/* Ledger Section Header */}
              <div className="flex items-center gap-4">
                <span className="text-[11px] font-black text-[#0D1B2A] uppercase tracking-[0.4em] whitespace-nowrap">Deal Parameters</span>
                <div className="flex-1 h-[2px] bg-[#0D1B2A]/10" />
              </div>

              {/* Form Inputs with Neo-Brutalist Styling */}
              <div className="space-y-6">
                {/* Title */}
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-[#0D1B2A]/60 ml-1">TRANSACTION TITLE</label>
                  <div className="bg-white rounded-2xl border-[3px] border-[#0D1B2A] shadow-[6px_6px_0px_#0D1B2A] overflow-hidden">
                    <input 
                      type="text" 
                      defaultValue="Laptop Purchesa"
                      className="w-full p-4 bg-transparent outline-none text-sm font-black uppercase tracking-tight text-[#0D1B2A]"
                    />
                  </div>
                </div>

                {/* Seller */}
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-[#0D1B2A]/60 ml-1">VERIFIED SELLER</label>
                  <motion.div 
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    className="bg-white rounded-2xl border-[3px] border-[#0D1B2A] shadow-[6px_6px_0px_#0D1B2A] p-4 flex justify-between items-center cursor-pointer"
                  >
                    <span className="text-sm font-black text-[#6E7C91] uppercase tracking-tight">Select Recipient...</span>
                    <ChevronDown size={20} className="text-[#0D1B2A]" strokeWidth={3} />
                  </motion.div>
                </div>

                {/* Amount */}
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-[#0D1B2A]/60 ml-1">STAKED AMOUNT</label>
                  <div className="bg-white rounded-2xl border-[3px] border-[#0D1B2A] shadow-[6px_6px_0px_#0D1B2A] p-4 flex items-center justify-between">
                    <span className="text-[10px] font-black text-[#6E7C91]">ZMW</span>
                    <input 
                      type="text" 
                      defaultValue="2,000.00"
                      className="bg-transparent border-none outline-none text-xl font-black text-[#0D1B2A] text-right w-full"
                    />
                  </div>
                </div>

                {/* Delivery Time */}
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-[#0D1B2A]/60 ml-1">DISPATCH WINDOW</label>
                  <div className="bg-white rounded-2xl border-[3px] border-[#0D1B2A] shadow-[6px_6px_0px_#0D1B2A] p-4 flex justify-between items-center cursor-pointer">
                    <span className="text-sm font-black text-[#0D1B2A] uppercase tracking-tight">03 BUSINESS DAYS</span>
                    <ChevronDown size={20} className="text-[#0D1B2A]" strokeWidth={3} />
                  </div>
                </div>
              </div>

              {/* Major Action Portal */}
              <div className="space-y-4 pt-6">
                <motion.button 
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full h-15 bg-white border-[3px] border-[#0D1B2A] shadow-[6px_6px_0px_#0D1B2A] rounded-2xl p-4 flex items-center justify-between group"
                >
                  <span className="text-[11px] font-black uppercase tracking-[0.2em]">Terms of Engagement</span>
                  <AlertCircle size={18} className="text-[#5D56D8]" />
                </motion.button>

                <motion.button 
                  whileTap={{ scale: 0.96 }}
                  onClick={() => setStep(2)}
                  className="w-full h-16 bg-[#0D1B2A] text-white rounded-2xl flex items-center justify-center font-black uppercase tracking-[0.3em] text-[12px] shadow-[8px_8px_0px_rgba(13,27,42,0.2)]"
                >
                  Confirm Escrow Setup
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div 
            key="step2"
             {...kineticEntry}
          >
            <PageHeader showBack title="DISPATCH LEDGER" onBack={() => setStep(1)} />
            
            <div className="px-5 pt-6 space-y-10 relative z-10 pb-10">
              {/* Receiver Ledger Card */}
              <div className="bg-white rounded-[32px] p-8 border-[3px] border-[#0D1B2A] shadow-[8px_8px_0px_#0D1B2A] text-center space-y-6">
                <div className="space-y-2">
                  <p className="text-[10px] font-black text-[#5D56D8] uppercase tracking-[0.4em]">Counterparty</p>
                  <div className="flex flex-col items-center">
                    <h3 className="text-3xl font-black text-[#0D1B2A] uppercase tracking-tighter">Kabista Mbuli</h3>
                    <div className="flex items-center gap-1.5 mt-1 text-[#6E7C91]">
                        <CheckCircle2 size={12} className="text-[#00D97E]" />
                        <span className="text-[9px] font-black uppercase">Verified Merchant</span>
                    </div>
                  </div>
                </div>

                <div className="h-[2px] bg-[#0D1B2A]/10 w-1/2 mx-auto" />

                <div className="space-y-1">
                  <p className="text-[10px] font-black text-[#6E7C91] uppercase tracking-[0.4em]">Ledger Amount</p>
                  <h4 className="text-4xl font-black text-[#0D1B2A] tracking-tighter">ZMW 2,000.00</h4>
                </div>
              </div>

              {/* Bento Grid Delivery Section */}
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <span className="text-[11px] font-black text-[#0D1B2A] uppercase tracking-[0.4em] whitespace-nowrap">Delivery Protocol</span>
                  <div className="flex-1 h-[2px] bg-[#0D1B2A]" />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { id: 'road', name: 'Standard Road', Icon: Truck, color: '#0D1B2A' },
                    { id: 'sea', name: 'Freight Sea', Icon: Ship, color: '#00C8FF' },
                    { id: 'air', name: 'Express Air', Icon: Plane, color: '#0D1B2A' },
                    { id: 'global', name: 'Global Hub', Icon: Globe, color: '#5D56D8' }
                  ].map((method) => (
                    <motion.div 
                      key={method.id}
                      whileHover={{ y: -4, x: -4, boxShadow: "8px 8px 0px #0D1B2A" }}
                      whileTap={{ scale: 0.98 }}
                      className="bg-white border-[2.5px] border-[#0D1B2A] shadow-[4px_4px_0px_#0D1B2A] rounded-2xl p-6 flex flex-col items-center justify-center gap-3 cursor-pointer group transition-all"
                    >
                      <method.Icon size={28} color={method.color} strokeWidth={2.5} />
                      <span className="text-[10px] font-black uppercase tracking-tight text-center leading-tight">{method.name}</span>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Kinetic Action Button */}
              <div className="pt-4">
                <motion.button 
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setStep(3)}
                  className="w-full h-18 bg-[#0D1B2A] text-white rounded-2xl flex items-center justify-center group relative overflow-hidden shadow-[10px_10px_0px_rgba(13,27,42,0.15)]"
                >
                  <div className="relative z-10 flex items-center gap-4">
                     <span className="font-black uppercase tracking-[0.4em] text-xs">Authorize Dispatch</span>
                     <Send size={18} className="group-hover:translate-x-1 transition-transform" />
                  </div>
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}

        {step === 3 && (
          <motion.div 
            key="step3"
            {...kineticEntry}
          >
            <PageHeader showBack title="VERIFICATION" onBack={() => setStep(2)} />
            
            <div className="px-5 pt-8 space-y-12 pb-10">
              {/* Status Banner */}
              <div className="bg-[#00D97E]/10 border-[3px] border-[#00D97E] rounded-[32px] p-6 flex items-center gap-5">
                 <div className="w-16 h-16 rounded-full bg-[#00D97E] flex items-center justify-center text-white shrink-0 shadow-[4px_4px_0px_rgba(0,0,0,0.1)]">
                    <PackageCheck size={32} />
                 </div>
                 <div className="space-y-1">
                    <h5 className="text-sm font-black text-[#0D1B2A] uppercase tracking-tight">PENDING RECEIPT</h5>
                    <p className="text-[10px] font-bold text-[#6E7C91] leading-relaxed uppercase">FUNDS ARE STAKED & SECURED IN THE KLEENCH VAULT.</p>
                 </div>
              </div>

              {/* Pin Entry Section */}
              <div className="space-y-8">
                 <div className="text-center space-y-2">
                    <h3 className="text-2xl font-black text-[#0D1B2A] uppercase tracking-tighter">SECURE SETTLEMENT</h3>
                    <p className="text-[10px] font-black text-[#6E7C91] uppercase tracking-[0.3em]">INPUT 4-DIGIT VERIFICATION KEY</p>
                 </div>

                 <div className="flex justify-center gap-4">
                   {[0, 1, 2, 3].map((i) => (
                     <motion.div 
                       key={i}
                       whileFocus={{ y: -4 }}
                       className="w-16 h-16 bg-white border-[3px] border-[#0D1B2A] rounded-2xl shadow-[6px_6px_0px_#0D1B2A] flex items-center justify-center"
                     >
                       <div className="w-4 h-4 rounded-full bg-[#0D1B2A]" />
                     </motion.div>
                   ))}
                 </div>

                 <div className="flex items-center justify-center gap-4 pt-4">
                    <motion.button whileTap={{ scale: 0.9 }} className="p-3 bg-slate-50 border-2 border-[#0D1B2A] rounded-xl">
                        <Lock size={16} />
                    </motion.button>
                    <span className="text-[10px] font-black uppercase tracking-widest text-[#0D1B2A]">REQUEST NEW PROTOCOL KEY</span>
                 </div>
              </div>

              {/* Final Confirm Button */}
              <div className="pt-6">
                <motion.button 
                  whileTap={{ scale: 0.95 }}
                  className="w-full h-18 bg-[#5D56D8] text-white rounded-[24px] border-[3px] border-[#0D1B2A] shadow-[8px_8px_0px_#0D1B2A] flex items-center justify-center font-black uppercase tracking-[0.5em] text-xs"
                >
                  Confirm Settlement
                </motion.button>
                <p className="text-center mt-6 text-[9px] font-black text-[#6E7C91] uppercase tracking-[0.3em] leading-relaxed px-10">
                    By confirming, you authorize the immediate release of funds to the merchant.
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
