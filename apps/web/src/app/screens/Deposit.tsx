import React, { useState } from "react";
import { motion } from "motion/react";
import { Minus, Plus } from "lucide-react";
import { PageHeader } from "../components/PageHeader";
import { toast } from "sonner";
import { useNavigate } from "react-router";
import mtnLogo from "@/assets/MTN.jpeg";
import airtelLogo from "@/assets/airtel_logo.webp";
import zamtelLogo from "@/assets/zamtel_logo.png";

export function Deposit() {
  const navigate = useNavigate();
  const [amount, setAmount] = useState(150);
  const [selectedProvider, setSelectedProvider] = useState<string | null>(null);

  const providers = [
    { id: "mtn", name: "MTN", logo: mtnLogo },
    { id: "airtel", name: "Airtel", logo: airtelLogo },
    { id: "zamtel", name: "Zamtel", logo: zamtelLogo },
  ];

  return (
    <div className="w-full relative min-h-screen bg-transparent flex flex-col font-sans text-[var(--app-text)] overflow-x-hidden">
      {/* ── Standardized Header ── */}
      <PageHeader showBack useLogo />

      <div className="flex-1 px-5 pt-8 pb-32">
        {/* Title Rhythm */}
        <div className="text-center mb-8">
          <h1 className="text-2xl font-black uppercase tracking-tighter mb-1">Deposit</h1>
          <p className="text-[var(--app-text)]/40 text-[10px] font-bold uppercase tracking-widest">Select Amount to transfer into your wallet</p>
        </div>

        {/* Balance Card */}
        <div className="bg-[var(--app-shape-accent)] rounded-xl p-5 mb-8 shadow-xl shadow-[var(--app-text)]/30 relative overflow-hidden group">
          <div className="flex flex-col">
            <span className="text-white/40 text-[9px] font-black uppercase tracking-[0.2em] mb-1">balance</span>
            <div className="flex items-baseline gap-2">
              <span className="text-white text-2xl font-black tracking-tight">ZMW 2,450.00</span>
            </div>
          </div>
          {/* Subtle decoration */}
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
            <div className="w-20 h-20 bg-[var(--app-bg)] rounded-full blur-2xl" />
          </div>
        </div>

        {/* Amount Stepper */}
        <div className="bg-[var(--app-bg)] rounded-3xl p-8 mb-10 border-2 border-gray-100 shadow-[0_15px_35px_rgba(0,51,102,0.08)] flex items-center justify-between">
          <button 
            onClick={() => setAmount(Math.max(0, amount - 50))}
            className="w-12 h-12 rounded-full border border-gray-100 bg-[var(--app-bg-muted)] flex items-center justify-center text-[var(--app-text)] active:scale-90 transition-all shadow-sm"
          >
            <Minus size={22} strokeWidth={3} />
          </button>
          
          <div className="flex items-center gap-1">
            <span className="text-4xl font-black tracking-tighter">K{amount.toFixed(2)}</span>
          </div>

          <button 
            onClick={() => setAmount(amount + 50)}
            className="w-12 h-12 rounded-full border border-gray-100 bg-[var(--app-bg-muted)] flex items-center justify-center text-[var(--app-text)] active:scale-90 transition-all shadow-sm"
          >
            <Plus size={22} strokeWidth={3} />
          </button>
        </div>

        {/* Payment Method Section */}
        <div className="mb-6">
          <h3 className="text-sm font-black uppercase tracking-widest mb-4">Select Payment Method</h3>
          
          {/* Main Selector */}
          <div className="bg-[var(--app-bg)] rounded-2xl border-2 border-gray-100 p-5 shadow-[0_10px_25px_rgba(0,51,102,0.05)] mb-8 flex items-center justify-center">
            <span className="text-2xl font-medium text-[var(--app-text)]/40 font-sans tracking-tight">Mobile Money</span>
          </div>

          {/* Providers Grid */}
          <div className="grid grid-cols-3 gap-4">
            {providers.map((p) => (
              <div key={p.id} className="flex flex-col items-center gap-3">
                <button 
                  onClick={() => setSelectedProvider(p.id)}
                  className={`w-20 h-20 rounded-full overflow-hidden border-2 transition-all relative ${
                    selectedProvider === p.id ? "border-[var(--app-text)] scale-105 shadow-lg shadow-[var(--app-text)]/20" : "border-transparent"
                  }`}
                >
                  <img src={p.logo} alt={p.name} className="w-full h-full object-cover" />
                  {selectedProvider === p.id && (
                    <div className="absolute inset-0 bg-[var(--app-shape-accent)]/10 flex items-center justify-center">
                      {/* Selection indicator could go here */}
                    </div>
                  )}
                </button>
                <span className={`text-[10px] font-bold uppercase tracking-widest ${selectedProvider === p.id ? "text-[var(--app-text)]" : "text-[var(--app-text)]/40"}`}>
                  {p.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

        {/* Action Button - Kinetic Pill */}
        <div className="flex justify-center pt-8">
          <motion.button 
            whileTap={{ scale: 0.96, x: 2, y: 2, boxShadow: "0px 0px 0px var(--app-text)" }}
            onClick={() => {
              if (!selectedProvider) {
                toast.error("Please select a mobile money provider first");
                return;
              }
              const providerName = providers.find(p => p.id === selectedProvider)?.name;
              toast.success(`Processing deposit of ZMW ${amount} via ${providerName}`);
              setTimeout(() => navigate(-1), 1500);
            }}
            className="w-1/2 h-11 bg-[var(--app-shape-accent)] text-white rounded-full flex items-center justify-center font-black uppercase tracking-[0.2em] text-[10px] shadow-lg shadow-[var(--app-text)]/25 transition-all"
          >
            Deposit Now
          </motion.button>
        </div>
      </div>
    );
}
