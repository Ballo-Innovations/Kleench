import { motion } from "motion/react";
import { ArrowUpRight, ArrowDownToLine, Minus, Plus } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router";
import { PageHeader } from "../components/PageHeader";
import { toast } from "sonner";

export function GlobalTransaction() {
  const navigate = useNavigate();
  const [amount, setAmount] = useState(150);
  const charge = 2.0;
  const total = amount + charge;
  const [activeTab, setActiveTab] = useState<"send" | "received">("send");
  const [recipientInput, setRecipientInput] = useState("");
  const [verifiedName, setVerifiedName] = useState("---");

  return (
    <div className="min-h-screen bg-transparent text-[#003366] font-sans pb-32">
      <PageHeader showBack title="Global Transaction" />

      <div className="px-5 pt-4 space-y-8">
        {/* Neo-Brutalist Balance Card */}
        <div className="relative group">
          <div className="absolute inset-0 bg-[#06111C] rounded-2xl translate-x-1 translate-y-1" />
          <div className="relative bg-[#003366] rounded-2xl p-6 border-2 border-[#06111C]">
            <p className="text-[10px] font-black text-[#FF8C00] uppercase tracking-[0.2em] mb-1">BALANCE</p>
            <h2 className="text-3xl font-black text-white tracking-tighter">ZMW 2,450.00</h2>
          </div>
        </div>

        {/* Transfer Details Card */}
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="bg-white rounded-3xl p-6 border-2 border-[#003366] shadow-[4px_4px_0px_#003366] space-y-6"
        >
          {/* Destination Input */}
          <div className="space-y-3">
            <div className="flex items-center gap-3 bg-slate-50 border-2 border-slate-100 rounded-full py-3.5 px-5 shadow-inner">
              <div className="w-8 h-8 rounded-full bg-[#003366] flex items-center justify-center text-white shrink-0">
                <ArrowUpRight size={18} />
              </div>
              <input 
                type="text" 
                value={recipientInput}
                onChange={(e) => setRecipientInput(e.target.value)}
                placeholder="Send to |" 
                className="bg-transparent border-none outline-none text-[13px] font-black placeholder-[#6E7C91] w-full"
              />
            </div>
            <p className="text-[9px] font-bold text-[#6E7C91] uppercase tracking-wider ml-4">one or many (optional)</p>
          </div>

          {/* Verification Section */}
          <div className="flex items-center justify-between px-2">
            <div className="space-y-0.5">
              <p className="text-[9px] font-bold text-[#6E7C91] uppercase tracking-wider">Name: <span className="text-[#003366]">{verifiedName}</span></p>
              <p className="text-[9px] font-bold text-[#6E7C91] uppercase tracking-wider">Number: <span className="text-[#003366]">{recipientInput || "---"}</span></p>
            </div>
            <button 
              onClick={() => {
                if (!recipientInput) {
                   toast.error("Enter a global recipient ID first.");
                   return;
                }
                toast.loading("Locating Global User...", { id: "verify-toast" });
                setTimeout(() => {
                  setVerifiedName("Global Recipient");
                  toast.success("Recipient Verified!", { id: "verify-toast" });
                }, 1000);
              }}
              className="bg-[#003366] text-white text-[8px] font-black uppercase tracking-widest px-4 py-1.5 rounded-full active:scale-95 transition-all"
            >
              Verify
            </button>
          </div>

          <div className="h-[1px] bg-slate-100 mx-1" />

          {/* Cost Breakdown */}
          <div className="grid grid-cols-[1fr_2px_2fr] gap-x-6 items-center">
            {/* Labels */}
            <div className="space-y-6 text-right pt-1">
              <span className="block text-[10px] font-black text-[#00C8FF] uppercase tracking-widest">Amount</span>
              <span className="block text-[10px] font-black text-[#00C8FF] uppercase tracking-widest">Charge</span>
              <span className="block text-[10px] font-black text-[#00C8FF] uppercase tracking-widest">Total</span>
            </div>

            {/* Vertical Divider */}
            <div className="h-full w-[2px] bg-slate-100 rounded-full" />

            {/* Controls/Values */}
            <div className="space-y-5">
              {/* Amount Row */}
              <div className="flex items-center justify-between">
                <button 
                  onClick={() => setAmount(Math.max(0, amount - 50))}
                  className="w-8 h-8 rounded-full flex items-center justify-center text-[#003366] border-2 border-slate-100 active:scale-90"
                >
                  <Minus size={14} strokeWidth={3} />
                </button>
                <span className="text-sm font-black text-[#003366] tracking-tight">K{amount.toFixed(2)}</span>
                <button 
                  onClick={() => setAmount(amount + 50)}
                  className="w-8 h-8 rounded-full flex items-center justify-center text-[#003366] border-2 border-slate-100 active:scale-90"
                >
                  <Plus size={14} strokeWidth={3} />
                </button>
              </div>

              {/* Charge Row */}
              <div className="flex items-center justify-between pr-1">
                <span className="text-[9px] font-bold text-[#6E7C91] uppercase tracking-widest">per person</span>
                <span className="text-sm font-black text-[#003366] tracking-tight">K{charge.toFixed(2)}</span>
              </div>

              {/* Total Row */}
              <div className="text-right pr-1">
                <span className="text-sm font-black text-[#003366] tracking-tight">K{total.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Transaction Action Toggle */}
        <div className="bg-white rounded-3xl p-4 border-2 border-[#003366] shadow-[4px_4px_0px_#003366] flex gap-4">
          <button 
            onClick={() => setActiveTab("send")}
            className={`flex-1 flex items-center justify-center gap-3 py-4 rounded-2xl transition-all ${
              activeTab === "send" ? "bg-[#003366] text-white shadow-lg" : "bg-slate-50 text-[#003366]/40"
            }`}
          >
            <ArrowUpRight size={20} />
            <span className="text-[11px] font-black uppercase tracking-[0.2em]">Send</span>
          </button>
          
          <button 
            onClick={() => setActiveTab("received")}
            className={`flex-1 flex items-center justify-center gap-3 py-4 rounded-2xl transition-all ${
              activeTab === "received" ? "bg-[#003366] text-white shadow-lg" : "bg-slate-50 text-[#003366]/40"
            }`}
          >
            <ArrowDownToLine size={20} />
            <span className="text-[11px] font-black uppercase tracking-[0.2em]">Received</span>
          </button>
        </div>

        {/* Bottom Action Button */}
        <div className="pt-4">
            <motion.button 
                whileTap={{ scale: 0.96 }}
                onClick={() => {
                  if (activeTab === "send" && verifiedName === "---") {
                    toast.error("Please verify recipient before initiating global transaction");
                    return;
                  }
                  if (activeTab === "send") {
                    toast.success(`Global transfer of ZMW ${amount} to ${verifiedName} initiated!`);
                  }
                  setTimeout(() => navigate(-1), 1500);
                }}
                className="w-full h-14 bg-[#003366] text-white rounded-2xl flex items-center justify-center font-regular uppercase tracking-[0.3em] text-[11px] shadow-[0_10px_30px_rgba(0,51,102,0.2)]"
            >
                {activeTab === "send" ? "Execute Global Transfer" : "Back"}
            </motion.button>
        </div>
      </div>
    </div>
  );
}
