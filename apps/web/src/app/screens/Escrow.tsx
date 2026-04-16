import { motion, AnimatePresence } from "motion/react";
import { ChevronDown, Truck, Ship, Plane } from "lucide-react";
import { useState, useEffect } from "react";
import { PageHeader } from "../components/PageHeader";
import { 
  DuotoneShieldCheck, 
  DuotoneBadgeCheck, 
  DuotoneSend, 
  DuotoneGlobe, 
  DuotoneInfo 
} from "../components/DuotoneIcon";
import { BackspaceKey } from "../components/KleenchIcons";
import { toast } from "sonner";
import { useNavigate } from "react-router";

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
  const navigate = useNavigate();
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [pin, setPin] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorShake, setErrorShake] = useState(false);

  // Retrieve PIN from onboarding
  const savedPin = localStorage.getItem("userPin") || "0000"; // Fallback if not set

  // Retrieve user profile info
  const localKycRaw = localStorage.getItem("userKyc");
  const localKyc = localKycRaw ? JSON.parse(localKycRaw) : null;
  const profileName = localKyc?.fullName || "Kleench User";

  const handleKeyPress = (digit: string) => {
    if (pin.length < 4) {
      setPin(prev => prev + digit);
    }
  };

  const handleBackspace = () => {
    setPin(prev => prev.slice(0, -1));
  };

  useEffect(() => {
    if (pin.length === 4) {
      handleVerify();
    }
  }, [pin]);

  const handleVerify = () => {
    setIsVerifying(true);
    
    // Simulate verification delay
    setTimeout(() => {
      if (pin === savedPin) {
        setIsSuccess(true);
        toast.success("STAX ESCROW RELEASED", {
          description: "Funds have been successfully settled to the merchant.",
          duration: 5000,
        });
        setTimeout(() => navigate("/wallet"), 3000);
      } else {
        setErrorShake(true);
        toast.error("INVALID SECURE PIN", {
          description: "Verification key does not match your security protocol.",
        });
        setPin("");
        setTimeout(() => setErrorShake(false), 500);
      }
      setIsVerifying(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-white text-[#003366] font-sans pb-32">
       {/* Background Accent Grid */}
       <div className="fixed inset-0 opacity-[0.03] pointer-events-none" 
            style={{ backgroundImage: "radial-gradient(#003366 2px, transparent 2px)", backgroundSize: "24px 24px" }} 
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
                <span className="text-[11px] font-black text-[#003366] uppercase tracking-[0.4em] whitespace-nowrap">Deal Parameters</span>
                <div className="flex-1 h-[2px] bg-[#003366]/10" />
              </div>

              {/* Form Inputs with Neo-Brutalist Styling */}
              <div className="space-y-6">
                {/* Title */}
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-[#003366]/60 ml-1">TRANSACTION TITLE</label>
                  <div className="bg-white rounded-2xl border-[3px] border-[#003366] shadow-[6px_6px_0px_#003366] overflow-hidden">
                    <input 
                      type="text" 
                      defaultValue="Laptop Purchesa"
                      className="w-full p-4 bg-transparent outline-none text-sm font-black uppercase tracking-tight text-[#003366]"
                    />
                  </div>
                </div>

                {/* Seller */}
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-[#003366]/60 ml-1">VERIFIED SELLER</label>
                  <motion.div 
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    className="bg-white rounded-2xl border-[3px] border-[#003366] shadow-[6px_6px_0px_#003366] p-4 flex justify-between items-center cursor-pointer"
                  >
                    <span className="text-sm font-black text-[#6E7C91] uppercase tracking-tight">Select Recipient...</span>
                    <ChevronDown size={20} className="text-[#003366]" strokeWidth={3} />
                  </motion.div>
                </div>

                {/* Amount */}
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-[#003366]/60 ml-1">STAKED AMOUNT</label>
                  <div className="bg-white rounded-2xl border-[3px] border-[#003366] shadow-[6px_6px_0px_#003366] p-4 flex items-center justify-between">
                    <span className="text-[10px] font-black text-[#6E7C91]">ZMW</span>
                    <input 
                      type="text" 
                      defaultValue="2,000.00"
                      className="bg-transparent border-none outline-none text-xl font-black text-[#003366] text-right w-full"
                    />
                  </div>
                </div>

                {/* Delivery Time */}
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-[#003366]/60 ml-1">DISPATCH WINDOW</label>
                  <div className="bg-white rounded-2xl border-[3px] border-[#003366] shadow-[6px_6px_0px_#003366] p-4 flex justify-between items-center cursor-pointer">
                    <span className="text-sm font-black text-[#003366] uppercase tracking-tight">03 BUSINESS DAYS</span>
                    <ChevronDown size={20} className="text-[#003366]" strokeWidth={3} />
                  </div>
                </div>
              </div>

              {/* Major Action Portal */}
              <div className="space-y-4 pt-6">
                <motion.button 
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full h-15 bg-white border-[3px] border-[#003366] shadow-[6px_6px_0px_#003366] rounded-2xl p-4 flex items-center justify-between group"
                >
                  <span className="text-[11px] font-black uppercase tracking-[0.2em]">Terms of Engagement</span>
                  <DuotoneInfo size={18} primary="#5D56D8" />
                </motion.button>

                <motion.button 
                  whileTap={{ scale: 0.96 }}
                  onClick={() => setStep(2)}
                  className="w-full h-16 bg-[#003366] text-white rounded-2xl flex items-center justify-center font-black uppercase tracking-[0.3em] text-[12px] shadow-[8px_8px_0px_rgba(0,51,102,0.2)]"
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
              <div className="bg-white rounded-[32px] p-8 border-[3px] border-[#003366] shadow-[8px_8px_0px_#003366] text-center space-y-6">
                <div className="space-y-2">
                  <p className="text-[10px] font-black text-[#5D56D8] uppercase tracking-[0.4em]">Counterparty</p>
                  <div className="flex flex-col items-center">
                    <h3 className="text-3xl font-black text-[#003366] uppercase tracking-tighter">{profileName}</h3>
                    <div className="flex items-center gap-1.5 mt-1 text-[#6E7C91]">
                        <DuotoneBadgeCheck size={14} primary="#00D97E" />
                        <span className="text-[9px] font-black uppercase">Verified Merchant</span>
                    </div>
                  </div>
                </div>

                <div className="h-[2px] bg-[#003366]/10 w-1/2 mx-auto" />

                <div className="space-y-1">
                  <p className="text-[10px] font-black text-[#6E7C91] uppercase tracking-[0.4em]">Ledger Amount</p>
                  <h4 className="text-4xl font-black text-[#003366] tracking-tighter">ZMW 2,000.00</h4>
                </div>
              </div>

              {/* Bento Grid Delivery Section */}
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <span className="text-[11px] font-black text-[#003366] uppercase tracking-[0.4em] whitespace-nowrap">Delivery Protocol</span>
                  <div className="flex-1 h-[2px] bg-[#003366]" />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { id: 'road', name: 'Standard Road', Icon: Truck, color: '#003366' },
                    { id: 'sea', name: 'Freight Sea', Icon: Ship, color: '#00C8FF' },
                    { id: 'air', name: 'Express Air', Icon: Plane, color: '#003366' },
                    { id: 'global', name: 'Global Hub', Icon: DuotoneGlobe, color: '#5D56D8' }
                  ].map((method) => (
                    <motion.div 
                      key={method.id}
                      whileHover={{ y: -4, x: -4, boxShadow: "8px 8px 0px #003366" }}
                      whileTap={{ scale: 0.98 }}
                      className="bg-white border-[2.5px] border-[#003366] shadow-[4px_4px_0px_#003366] rounded-2xl p-6 flex flex-col items-center justify-center gap-3 cursor-pointer group transition-all"
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
                  className="w-full h-18 bg-[#003366] text-white rounded-2xl flex items-center justify-center group relative overflow-hidden shadow-[10px_10px_0px_rgba(0,51,102,0.15)]"
                >
                  <div className="relative z-10 flex items-center gap-4">
                     <span className="font-black uppercase tracking-[0.4em] text-xs">Authorize Dispatch</span>
                     <DuotoneSend size={18} primary="#FFFFFF" className="group-hover:translate-x-1 transition-transform" />
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
                    <DuotoneBadgeCheck size={32} primary="#FFFFFF" />
                 </div>
                 <div className="space-y-1">
                    <h5 className="text-sm font-black text-[#003366] uppercase tracking-tight">PENDING RECEIPT</h5>
                    <p className="text-[10px] font-bold text-[#6E7C91] leading-relaxed uppercase">FUNDS ARE STAKED & SECURED IN THE KLEENCH VAULT.</p>
                 </div>
              </div>

              {/* Pin Entry Section */}
              <div className="space-y-10">
                 <div className="text-center space-y-2">
                    <h3 className="text-2xl font-black text-[#003366] uppercase tracking-tighter">SECURE SETTLEMENT</h3>
                    <p className="text-[10px] font-black text-[#6E7C91] uppercase tracking-[0.3em]">INPUT 4-DIGIT VERIFICATION KEY</p>
                  </div>

                  <div className="space-y-10">
                    <motion.div 
                      animate={errorShake ? { x: [-10, 10, -10, 10, 0] } : {}}
                      className="flex justify-center gap-4"
                    >
                      {[0, 1, 2, 3].map((i) => (
                        <motion.div 
                          key={i}
                          className={`w-14 h-14 bg-white border-[3px] rounded-2xl shadow-[6px_6px_0px_#003366] flex items-center justify-center transition-colors ${
                            pin.length > i ? "border-[#5D56D8]" : "border-[#003366]"
                          }`}
                        >
                          {pin.length > i && (
                            <motion.div 
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              className="w-4 h-4 rounded-full bg-[#5D56D8]" 
                            />
                          )}
                        </motion.div>
                      ))}
                    </motion.div>

                    <div className="flex flex-col items-center gap-6">
                      <div className="flex items-center gap-3">
                         <div className="p-2 bg-slate-50 border-2 border-[#003366] rounded-xl">
                             <DuotoneShieldCheck size={14} primary="#003366" />
                         </div>
                         <span className="text-[9px] font-black uppercase tracking-widest text-[#003366]">SECURED BY KLEENCH VAULT</span>
                      </div>

                      {/* Numerical Keypad */}
                      <div className="grid grid-cols-3 gap-4 w-full max-w-[280px]">
                        {[1, 2, 3, 4, 5, 6, 7, 8, 9, "", 0, "backspace"].map((k, idx) => {
                          if (k === "") return <div key={idx} />;
                          return (
                            <motion.button
                              key={idx}
                              whileHover={{ y: -2 }}
                              whileTap={{ scale: 0.9 }}
                              onClick={() => k === "backspace" ? handleBackspace() : handleKeyPress(String(k))}
                              className="h-14 bg-white border-[3px] border-[#003366] rounded-2xl shadow-[4px_4px_0px_#003366] flex items-center justify-center text-lg font-black"
                            >
                              {k === "backspace" ? <BackspaceKey size={20} color="#003366" /> : k}
                            </motion.button>
                          );
                        })}
                      </div>
                    </div>
                  </div>
               </div>

               {/* Final Confirm Button */}
               <div className="pt-2">
                <motion.button 
                  disabled={pin.length < 4 || isVerifying || isSuccess}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleVerify}
                  className={`w-full h-18 text-white rounded-[24px] border-[3px] border-[#003366] shadow-[8px_8px_0px_#003366] flex items-center justify-center font-black uppercase tracking-[0.5em] text-xs transition-all duration-300 ${
                    isSuccess ? "bg-[#00D97E] shadow-[8px_8px_0px_#008F53]" : (pin.length < 4 ? "bg-[#6E7C91]" : "bg-[#5D56D8]")
                  }`}
                >
                  {isVerifying ? (
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      VERIFYING...
                    </div>
                  ) : (
                    isSuccess ? "TRANSACTION SETTLED" : "Confirm Settlement"
                  )}
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
