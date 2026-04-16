import { motion } from "motion/react";
import { Minus, Plus, CreditCard } from "lucide-react";
import { useState } from "react";
import { PageHeader } from "../components/PageHeader";
import { toast } from "sonner";
import { useNavigate } from "react-router";

export function Withdraw() {
  const navigate = useNavigate();
  const [amount, setAmount] = useState(150);
  const [selectedProvider, setSelectedProvider] = useState<string | null>(null);

  const providers = ["AIRTEL", "MTN", "ZAMTEL", "BANK"];

  return (
    <div className="min-h-screen bg-transparent text-[#003366] font-sans pb-32">
      <PageHeader showBack title="Withdraw" />

      <div className="px-5 pt-4 space-y-8">
        <div className="text-center">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none">Select Amount to withdraw from your wallet</p>
        </div>

        {/* Neo-Brutalist Balance Card */}
        <div className="relative group">
          <div className="absolute inset-0 bg-[#001224] rounded-2xl translate-x-1 translate-y-1" />
          <div className="relative bg-[#003366] rounded-2xl p-6 border-2 border-[#001224]">
            <p className="text-[10px] font-black text-[#FF8C00] uppercase tracking-[0.2em] mb-1">BALANCE</p>
            <h2 className="text-3xl font-black text-white tracking-tighter">ZMW 2,450.00</h2>
          </div>
        </div>

        {/* Destination Selection */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center text-[#003366]">
                <CreditCard size={18} />
            </div>
            <h3 className="text-sm font-black text-[#003366] uppercase tracking-tight">Withdraw Money To</h3>
          </div>

          <motion.button 
            whileTap={{ scale: 0.98 }}
            onClick={() => toast.info("Beneficiary management coming soon")}
            className="w-full py-4 bg-[#E8F0FE] rounded-full border-2 border-[#D2E3FC] shadow-sm flex items-center justify-center gap-2"
          >
            <Plus size={16} className="text-[#3C4043]" />
            <span className="text-[11px] font-black text-[#5F6368] uppercase tracking-wider">+ Add Beneficiary or Service</span>
          </motion.button>
        </div>

        {/* Amount Stepper */}
        <div className="bg-white rounded-2xl border-2 border-[#E8F0FE] shadow-[0_8px_30px_rgba(232,240,254,0.3)] overflow-hidden flex divide-x-2 divide-[#E8F0FE]">
          <div className="flex-1 flex items-center justify-center py-6">
             <span className="text-[10px] font-black text-[#4285F4] uppercase tracking-widest">Amount</span>
          </div>
          <div className="flex-[2] flex items-center justify-between px-6 py-6">
            <button 
                onClick={() => setAmount(Math.max(0, amount - 50))}
                className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-[#003366] active:scale-90 transition-all font-black border-2 border-slate-100"
            >
                <Minus size={18} strokeWidth={3} />
            </button>
            <span className="text-xl font-black text-[#003366] tracking-tighter">K{amount.toFixed(2)}</span>
            <button 
                onClick={() => setAmount(amount + 50)}
                className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-[#003366] active:scale-90 transition-all font-black border-2 border-slate-100"
            >
                <Plus size={18} strokeWidth={3} />
            </button>
          </div>
        </div>

        {/* Provider Grid */}
        <div className="grid grid-cols-2 gap-4">
            {providers.map(p => (
                <motion.button
                    key={p}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setSelectedProvider(p)}
                    className={`h-16 rounded-2xl border-[3px] flex items-center justify-center transition-all bg-white ${
                        selectedProvider === p 
                        ? "border-[#003366] shadow-[4px_4px_0px_#003366] -translate-x-1 -translate-y-1" 
                        : "border-[#E8F0FE] shadow-sm text-[#5F6368]"
                    }`}
                >
                    <span className="text-[11px] font-black tracking-[0.2em]">{p}</span>
                </motion.button>
            ))}
        </div>

        <div className="pt-4">
            <motion.button 
                whileTap={{ scale: 0.96 }}
                onClick={() => {
                  if (!selectedProvider) {
                    toast.error("Please select a provider first");
                    return;
                  }
                  toast.success(`Processing withdrawal of ZMW ${amount} to ${selectedProvider}`);
                  setTimeout(() => navigate(-1), 1500);
                }}
                style={{ backgroundColor: "#003366" }}
                className="w-full h-14 rounded-2xl flex items-center justify-center text-white font-regular uppercase tracking-[0.3em] text-xs shadow-[0_10px_30px_rgba(0,51,102,0.3)] transition-all"
            >
                Withdraw
            </motion.button>
        </div>
      </div>
    </div>
  );
}
