import { motion } from "motion/react";
import { ArrowUpRight, Minus, Plus } from "lucide-react";
import { useState } from "react";
import { PageHeader } from "../components/PageHeader";
import { toast } from "sonner";
import { useNavigate } from "react-router";

export function Send() {
  const navigate = useNavigate();
  const [recipientInput, setRecipientInput] = useState("");
  const [verifiedName, setVerifiedName] = useState("---");
  const [amount, setAmount] = useState(150);
  const charge = 2.0;
  const total = amount + charge;

  return (
    <div className="min-h-screen bg-transparent text-[var(--app-text)] font-sans pb-32">
      <PageHeader showBack title="Send To" />

      <div className="px-5 pt-4 space-y-8">
        <div className="text-center">
          <p className="text-[10px] font-bold text-[var(--app-text)]/40 uppercase tracking-widest leading-none">Select Amount to transfer into your wallet</p>
        </div>

        {/* Neo-Brutalist Balance Card */}
        <div className="relative group">
          <div className="absolute inset-0 bg-[var(--app-shape-accent)]/30 rounded-2xl translate-x-1 translate-y-1 blur-sm" />
          <div className="relative bg-[var(--app-shape-accent)] rounded-2xl p-6 shadow-lg shadow-[var(--app-text)]/25">
            <p className="text-[10px] font-black text-[var(--app-orange)] uppercase tracking-[0.2em] mb-1">BALANCE</p>
            <h2 className="text-3xl font-black text-white tracking-tighter">ZMW 2,450.00</h2>
          </div>
        </div>

        {/* Transfer Details Card */}
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="bg-[var(--app-bg)] rounded-3xl p-6 border-2 border-slate-100 shadow-[0_20px_50px_rgba(0,51,102,0.06)] space-y-6"
        >
          {/* Destination Input */}
          <div className="space-y-3">
            <div className="flex items-center gap-3 bg-[var(--app-bg-muted)] border-2 border-slate-100 rounded-full py-3.5 px-5 shadow-inner group transition-all focus-within:border-[var(--app-text)]/20">
              <div className="w-8 h-8 rounded-full bg-[var(--app-shape-accent)] flex items-center justify-center text-white shrink-0">
                <ArrowUpRight size={18} />
              </div>
              <input 
                type="text" 
                value={recipientInput}
                onChange={(e) => setRecipientInput(e.target.value)}
                placeholder="Send to |" 
                className="bg-transparent border-none outline-none text-[13px] font-black placeholder-[var(--app-text)]/40 w-full"
              />
            </div>
            
            {/* Verification Section */}
            <div className="flex items-center justify-between px-2">
              <div className="space-y-0.5">
                <p className="text-[9px] font-bold text-[var(--app-text)]/60 uppercase tracking-wider">Name: <span className="text-[var(--app-text)]">{verifiedName}</span></p>
                <p className="text-[9px] font-bold text-[var(--app-text)]/60 uppercase tracking-wider">Number: <span className="text-[var(--app-text)]">{recipientInput || "---"}</span></p>
              </div>
              <button 
                onClick={() => {
                  if (!recipientInput) {
                     toast.error("Enter a recipient number first.");
                     return;
                  }
                  toast.loading("Verifying...", { id: "verify-toast" });
                  setTimeout(() => {
                    setVerifiedName("Mwamba Phiri");
                    toast.success("Recipient Verified!", { id: "verify-toast" });
                  }, 1000);
                }}
                className="bg-[var(--app-shape-accent)] text-white text-[8px] font-black uppercase tracking-widest px-4 py-1.5 rounded-full active:scale-95 transition-all"
              >
                Verify
              </button>
            </div>
          </div>

          <div className="h-[1px] bg-slate-100 mx-1" />

          {/* Cost Breakdown */}
          <div className="grid grid-cols-[1fr_2px_2fr] gap-x-6 items-center">
            {/* Labels */}
            <div className="space-y-6 text-right pt-1">
              <span className="block text-[10px] font-black text-[var(--app-sub-accent)] uppercase tracking-widest">Amount</span>
              <span className="block text-[10px] font-black text-[var(--app-sub-accent)] uppercase tracking-widest">Charge</span>
              <span className="block text-[10px] font-black text-[var(--app-sub-accent)] uppercase tracking-widest">Total</span>
            </div>

            {/* Vertical Divider */}
            <div className="h-full w-[2px] bg-slate-100 rounded-full" />

            {/* Controls/Values */}
            <div className="space-y-5">
              {/* Amount Row */}
              <div className="flex items-center justify-between">
                <button 
                  onClick={() => setAmount(Math.max(0, amount - 50))}
                  className="w-8 h-8 rounded-full flex items-center justify-center text-[var(--app-text)] border-2 border-slate-100 active:scale-90"
                >
                  <Minus size={14} strokeWidth={3} />
                </button>
                <span className="text-sm font-black text-[var(--app-text)] tracking-tight">K{amount.toFixed(2)}</span>
                <button 
                  onClick={() => setAmount(amount + 50)}
                  className="w-8 h-8 rounded-full flex items-center justify-center text-[var(--app-text)] border-2 border-slate-100 active:scale-90"
                >
                  <Plus size={14} strokeWidth={3} />
                </button>
              </div>

              {/* Charge Row */}
              <div className="text-right pr-1">
                <span className="text-sm font-black text-[var(--app-text)] tracking-tight">K{charge.toFixed(2)}</span>
              </div>

              {/* Total Row */}
              <div className="text-right pr-1">
                <span className="text-sm font-black text-[var(--app-text)] tracking-tight">K{total.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Bottom Action Button */}
        <div className="pt-4 flex justify-center">
            <motion.button 
                whileTap={{ scale: 0.96 }}
                onClick={() => {
                  if (verifiedName === "---") {
                    toast.error("Please verify recipient before sending");
                    return;
                  }
                  toast.success(`Sent ZMW ${amount} to ${verifiedName} successfully!`);
                  setTimeout(() => navigate(-1), 1500);
                }}
                className="w-full h-14 bg-[var(--app-shape-accent)] text-white rounded-2xl flex items-center justify-center font-regular uppercase tracking-[0.3em] text-[11px] shadow-[0_10px_30px_rgba(0,51,102,0.2)] transition-all"
            >
                Send
            </motion.button>
        </div>
      </div>
    </div>
  );
}
