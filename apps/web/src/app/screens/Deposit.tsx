import React, { useState } from "react";
import { motion } from "motion/react";
import { Minus, Plus } from "lucide-react";
import { PageHeader } from "../components/PageHeader";
import mtnLogo from "@/assets/MTN.jpeg";
import airtelLogo from "@/assets/airtel_logo.webp";
import zamtelLogo from "@/assets/zamtel_logo.png";

export function Deposit() {
  const [amount, setAmount] = useState(150);
  const [selectedProvider, setSelectedProvider] = useState<string | null>(null);

  const providers = [
    { id: "mtn", name: "MTN", logo: mtnLogo },
    { id: "airtel", name: "Airtel", logo: airtelLogo },
    { id: "zamtel", name: "Zamtel", logo: zamtelLogo },
  ];

  return (
    <div className="w-full relative min-h-screen bg-transparent flex flex-col font-sans text-[#003366] overflow-x-hidden">
      {/* ── Standardized Header ── */}
      <PageHeader showBack useLogo />

      <div className="flex-1 px-5 pt-8 pb-32">
        {/* Title Rhythm */}
        <div className="text-center mb-8">
          <h1 className="text-2xl font-black uppercase tracking-tighter mb-1">Deposit</h1>
          <p className="text-gray-400 text-[10px] font-bold uppercase tracking-widest">Select Amount to transfer into your wallet</p>
        </div>

        {/* Balance Card */}
        <div className="bg-[#003366] rounded-xl p-5 mb-8 border-b-4 border-slate-900 shadow-xl relative overflow-hidden group">
          <div className="flex flex-col">
            <span className="text-white/40 text-[9px] font-black uppercase tracking-[0.2em] mb-1">balance</span>
            <div className="flex items-baseline gap-2">
              <span className="text-white text-2xl font-black tracking-tight">ZMW 2,450.00</span>
            </div>
          </div>
          {/* Subtle decoration */}
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
            <div className="w-20 h-20 bg-white rounded-full blur-2xl" />
          </div>
        </div>

        {/* Amount Stepper */}
        <div className="bg-white rounded-3xl p-8 mb-10 border-2 border-gray-100 shadow-[0_15px_35px_rgba(0,51,102,0.08)] flex items-center justify-between">
          <button 
            onClick={() => setAmount(Math.max(0, amount - 50))}
            className="w-12 h-12 rounded-2xl flex items-center justify-center text-[#003366] active:scale-90 transition-all"
          >
            <Minus size={28} strokeWidth={3} />
          </button>
          
          <div className="flex items-center gap-1">
            <span className="text-4xl font-black tracking-tighter">K{amount.toFixed(2)}</span>
          </div>

          <button 
            onClick={() => setAmount(amount + 50)}
            className="w-12 h-12 rounded-2xl flex items-center justify-center text-[#003366] active:scale-90 transition-all"
          >
            <Plus size={28} strokeWidth={3} />
          </button>
        </div>

        {/* Payment Method Section */}
        <div className="mb-6">
          <h3 className="text-sm font-black uppercase tracking-widest mb-4">Select Payment Method</h3>
          
          {/* Main Selector */}
          <div className="bg-white rounded-2xl border-2 border-gray-100 p-5 shadow-[0_10px_25px_rgba(0,51,102,0.05)] mb-8 flex items-center justify-center">
            <span className="text-2xl font-medium text-gray-500 font-sans tracking-tight">Mobile Money</span>
          </div>

          {/* Providers Grid */}
          <div className="grid grid-cols-3 gap-4">
            {providers.map((p) => (
              <div key={p.id} className="flex flex-col items-center gap-3">
                <button 
                  onClick={() => setSelectedProvider(p.id)}
                  className={`w-20 h-20 rounded-full overflow-hidden border-[3px] transition-all relative ${
                    selectedProvider === p.id ? "border-[#003366] scale-105 shadow-lg" : "border-transparent"
                  }`}
                >
                  <img src={p.logo} alt={p.name} className="w-full h-full object-cover" />
                  {selectedProvider === p.id && (
                    <div className="absolute inset-0 bg-[#003366]/10 flex items-center justify-center">
                      {/* Selection indicator could go here */}
                    </div>
                  )}
                </button>
                <span className={`text-[10px] font-bold uppercase tracking-widest ${selectedProvider === p.id ? "text-[#003366]" : "text-gray-400"}`}>
                  {p.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Floating Action Button */}
      <div className="fixed bottom-0 left-0 right-0 p-5 bg-white/80 backdrop-blur-md z-[100] max-w-md mx-auto">
        <motion.button 
          whileTap={{ scale: 0.96 }}
          className="w-full h-14 bg-[#003366] text-white rounded-xl flex items-center justify-center font-black uppercase tracking-[0.2em] text-sm shadow-[0_8px_0_#002244] active:shadow-none active:translate-y-[4px] transition-all"
        >
          Deposit
        </motion.button>
      </div>
    </div>
  );
}
