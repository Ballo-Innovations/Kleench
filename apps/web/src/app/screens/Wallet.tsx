import {
  ArrowDownToLine,
  ArrowUpFromLine,
  ArrowLeftRight,
  Smartphone,
  Check,
  X,
  FileText,
  Receipt,
  QrCode,
  ExternalLink
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useState } from "react";
import { ZambiaFlag } from "../components/KleenchIcons";
import adBanner from "@/assets/ads/Transaction Assurance.png";
import mtnLogo from "@/assets/MTN.jpeg";
import airtelLogo from "@/assets/airtel_logo.webp";
import zamtelLogo from "@/assets/zamtel_logo.png";
import zedLogo from "@/assets/zed_mobile_logo.png";

import { PageHeader } from "../components/PageHeader";
import { DigitalWallet } from "../components/DigitalWallet";
import { PageSkeletons, usePageLoading } from "../components/PageSkeletons";

const MM_PROVIDERS = [
  { id: "airtel", name: "Airtel Money", shortName: "Airtel", color: "#E40513", bg: "#FFF1F2", logo: airtelLogo },
  { id: "mtn", name: "MTN Mobile Money", shortName: "MTN", color: "#F5A623", bg: "#FFFBEB", logo: mtnLogo },
  { id: "zamtel", name: "Zamtel Mobile Money", shortName: "Zamtel", color: "#00843D", bg: "#F0FDF4", logo: zamtelLogo },
  { id: "zed", name: "Zed Mobile", shortName: "Zed", color: "#0077B6", bg: "#EFF6FF", logo: zedLogo },
];

const TRANSACTION_DATA = {
  all: [
    { id: 1, type: "earning", title: "Project Milestone: Logo Design", amount: 1200.0, date: "Today, 2:45 PM", status: "completed" },
    { id: 2, type: "payment", title: "Electricity Bill (ZESCO)", amount: -450.0, date: "Today, 11:10 AM", status: "completed" },
    { id: 3, type: "transfer", title: "To: Sarah Chanda", amount: -200.0, date: "Yesterday, 9:20 PM", status: "completed" },
    { id: 4, type: "earning", title: "Cashback: Airtel Promo", amount: 15.0, date: "Mar 24, 4:00 PM", status: "completed" },
  ],
  earnings: [
    { id: 1, type: "earning", title: "Project Milestone: Logo Design", amount: 1200.0, date: "Today, 2:45 PM", status: "completed" },
    { id: 4, type: "earning", title: "Cashback: Airtel Promo", amount: 15.0, date: "Mar 24, 4:00 PM", status: "completed" },
  ],
  payments: [
    { id: 2, type: "payment", title: "Electricity Bill (ZESCO)", amount: -450.0, date: "Today, 11:10 AM", status: "completed" },
  ],
  transfers: [
    { id: 3, type: "transfer", title: "To: Sarah Chanda", amount: -200.0, date: "Yesterday, 9:20 PM", status: "completed" },
  ]
};

type TransTab = "all" | "earnings" | "payments" | "transfers";

export function Wallet() {
  const [showBalance, setShowBalance] = useState(true);
  const [activeTransTab, setActiveTransTab] = useState<TransTab>("all");
  const [showFinancialKyc, setShowFinancialKyc] = useState(false);
  const [mmStep, setMMStep] = useState<"provider" | "details">("provider");
  const [mmProvider, setMMProvider] = useState<typeof MM_PROVIDERS[0] | null>(null);
  const [mmPhone, setMMPhone] = useState("");
  const [mmError, setMMError] = useState("");

  const hasFinancialKyc = localStorage.getItem("kleench_financial_kyc") === "true";

  const handleAction = (type: string) => {
    if (!hasFinancialKyc && (type === "withdraw" || type === "send" || type === "paybills" || type === "qr")) {
      setShowFinancialKyc(true);
      return;
    }
    console.log(`Action: ${type}`);
  };

  const saveFinancialKyc = () => {
    if (!mmProvider || !mmPhone || mmPhone.length < 9) {
      setMMError("Please enter valid mobile money details");
      return;
    }
    localStorage.setItem("kleench_financial_kyc", "true");
    localStorage.setItem("kleench_mm_details", JSON.stringify({ provider: mmProvider.id, phone: mmPhone }));
    setShowFinancialKyc(false);
  };

  const loading = usePageLoading(900);

  if (loading) return <PageSkeletons.Wallet />;

  function grace(delay = 0) {
    return {
      duration: 0.62,
      delay,
      ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
    };
  }

  return (
    <div className="w-full pb-32 relative min-h-screen bg-transparent overflow-x-hidden font-sans text-[#003366]">
      
      {/* ── Standardized Orange Header ── */}
      <PageHeader title="Wallet" subtitle="Manage your earnings & escrow" />

      <div className="px-5 -mt-10 relative z-10 space-y-12">
        
        <section className="space-y-6">

          <motion.div 
            initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={grace(0.1)}
            className="relative"
          >
            {/* The Wallet hero maintaining its volume but strictly integrated */}
            <div className="mb-4">
               <DigitalWallet 
                balance="ZMW 2,450.00" 
                isBalanceHidden={!showBalance}
                onToggleVisibility={() => setShowBalance(!showBalance)}
               />
            </div>
            
            {/* Action Grid: Mathematical & Rectangular */}
            <div className="grid grid-cols-4 gap-0 border-2 border-[#003366] bg-[#003366]">
              {[
                { id: "deposit", icon: ArrowDownToLine, label: "Deposit", bg: "bg-[#FF8C00]", text: "text-white" },
                { id: "send", icon: ArrowLeftRight, label: "Send", bg: "bg-white", text: "text-[#003366]" },
                { id: "withdraw", icon: ArrowUpFromLine, label: "Withdraw", bg: "bg-white", text: "text-[#003366]" },
                { id: "statement", icon: FileText, label: "Statemnt", bg: "bg-white", text: "text-[#003366]" },
              ].map((action) => (
                <motion.button 
                  key={action.id}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => (action.id === 'statement' ? setActiveTransTab('all') : handleAction(action.id))} 
                  className={`flex flex-col items-center justify-center h-20 border-r border-[#003366]/10 last:border-r-0 ${action.bg} transition-all active:bg-[#003366] active:text-white group`}
                >
                  <action.icon size={18} className={`${action.id === 'deposit' ? 'text-white' : 'text-[#003366] group-active:text-white'}`} strokeWidth={2.5} />
                  <span className={`text-[8px] font-black uppercase tracking-widest mt-2 ${action.text} group-active:text-white text-center px-1`}>{action.label}</span>
                </motion.button>
              ))}
            </div>
          </motion.div>
        </section>

        {/* Section 02. UTILITY BLOCKS */}
        <section className="space-y-6">
          <div className="flex items-center gap-3">
             <span className="text-[#FF8C00] font-black text-xs tracking-[0.3em]">02.</span>
             <h3 className="font-black text-[10px] uppercase tracking-[0.4em] text-[#003366]/40">Utility Blocks</h3>
             <div className="flex-1 h-[2px] bg-[#003366]/5" />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <motion.button
              whileTap={{ scale: 0.96 }}
              onClick={() => handleAction("paybills")}
              className="relative group bg-white p-6 border-4 border-[#003366] transition-all hover:bg-black hover:text-white"
            >
              {/* Subtle Grid Pattern Overlay */}
              <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 0)', backgroundSize: '12px 12px' }} />
              
              <div className="flex flex-col items-start gap-4 h-full">
                <div className="w-10 h-10 border-2 border-[#003366] group-hover:border-white flex items-center justify-center">
                  <Receipt size={20} />
                </div>
                <div className="text-left">
                  <p className="font-black text-lg leading-none uppercase tracking-tighter">Pay Bills</p>
                  <p className="text-[9px] font-bold uppercase tracking-[0.2em] mt-2 opacity-40">Settlements</p>
                </div>
              </div>
            </motion.button>

            <motion.button
              whileTap={{ scale: 0.96 }}
              onClick={() => handleAction("qr")}
              className="relative group bg-[#FF8C00] p-6 border-4 border-[#003366] transition-all"
            >
               <div className="absolute inset-0 opacity-[0.1] pointer-events-none" style={{ backgroundImage: 'linear-gradient(45deg, #000 12%, transparent 12%, transparent 50%, #000 50%, #000 62%, transparent 62%, transparent 100%)', backgroundSize: '8px 8px' }} />
              
              <div className="flex flex-col items-start gap-4">
                <div className="w-10 h-10 border-2 border-[#003366] bg-white flex items-center justify-center">
                  <QrCode size={20} className="text-[#003366]" />
                </div>
                <div className="text-left">
                  <p className="font-black text-white text-lg leading-none uppercase tracking-tighter shadow-black/20 text-shadow-sm">Scan Pay</p>
                  <p className="text-[9px] text-[#003366] font-bold uppercase tracking-[0.2em] mt-2 opacity-60">Instant Pad</p>
                </div>
              </div>
            </motion.button>
          </div>
        </section>

        {/* Section 03. LEDGER STATEMENT */}
        <section className="space-y-6 pb-12">
          <div className="flex items-center gap-3">
             <span className="text-[#FF8C00] font-black text-xs tracking-[0.3em]">03.</span>
             <h3 className="font-black text-[10px] uppercase tracking-[0.4em] text-[#003366]/40">Statement Ledger</h3>
             <div className="flex-1 h-[2px] bg-[#003366]/5" />
          </div>

          {/* Categorized Tabs: Rectangular & High Contrast */}
          <div className="flex border-4 border-[#003366] bg-[#003366]">
            {(["all", "earnings", "payments", "transfers"] as TransTab[]).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTransTab(tab)}
                className={`flex-1 py-3 text-[8px] font-black uppercase tracking-[0.2em] transition-all border-r border-[#003366]/20 last:border-r-0 ${
                  activeTransTab === tab ? "bg-[#FF8C00] text-white" : "bg-white text-[#003366] hover:bg-gray-50"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Transaction Grid */}
          <div className="border-x-4 border-[#003366] divide-y-2 divide-[#003366]/5 bg-white shadow-[8px_8px_0px_#003366]">
            <AnimatePresence mode="popLayout">
              {TRANSACTION_DATA[activeTransTab].length === 0 ? (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="py-20 flex flex-col items-center border-b-2 border-[#003366]">
                   <p className="font-black text-[9px] uppercase tracking-[0.3em] opacity-20">No Records Found</p>
                </motion.div>
              ) : (
                TRANSACTION_DATA[activeTransTab].map((tx, idx) => {
                  const isPositive = tx.amount > 0;
                  return (
                    <motion.div
                      key={`${tx.id}-${activeTransTab}`}
                      initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, scale: 0.98 }}
                      transition={{ delay: idx * 0.04 }}
                      className="p-5 flex items-center justify-between group hover:bg-[#003366]/[0.02] cursor-pointer"
                    >
                      <div className="flex items-center gap-6">
                        <div className="hidden sm:block text-[10px] font-black tracking-widest text-[#003366]/10">{(idx + 1).toString().padStart(2, '0')}.</div>
                        <div className="flex flex-col">
                           <h4 className="font-black text-[#003366] text-xs uppercase tracking-tight">{tx.title}</h4>
                           <div className="flex items-center gap-4 mt-1">
                              <span className="text-[7px] font-black uppercase tracking-[0.2em] px-1.5 py-0.5 border border-[#003366]/10 text-[#003366]/40">{tx.type}</span>
                              <span className="text-[9px] font-bold text-gray-300 tracking-tight">{tx.date}</span>
                           </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-6">
                        <div className="text-right">
                          <p className={`font-black text-sm tracking-tighter ${isPositive ? "text-[#00C853]" : "text-[#003366]"}`}>
                            {isPositive ? "+" : ""}{tx.amount.toFixed(2)}
                          </p>
                          <div className="flex justify-end gap-1 items-center mt-1 opacity-10 group-hover:opacity-100 transition-opacity">
                             <span className="text-[7px] font-black uppercase tracking-widest text-[#FF8C00]">Expand</span>
                             <ExternalLink size={8} className="text-[#FF8C00]" />
                          </div>
                        </div>
                        <div className={`w-1.5 h-12 ${tx.type === 'earning' ? 'bg-[#00C853]' : tx.type === 'payment' ? 'bg-[#FF8C00]' : 'bg-[#003366]'}`} />
                      </div>
                    </motion.div>
                  );
                })
              )}
            </AnimatePresence>
          </div>
        </section>

        {/* Security Banner with Swiss precision */}
        <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} transition={grace(0.3)}
          className="border-8 border-[#003366] bg-[#003366] overflow-hidden grayscale contrast-125 hover:grayscale-0 transition-all duration-700">
          <img src={adBanner} alt="Transaction Assurance" className="w-full h-auto object-cover opacity-80" />
        </motion.div>
      </div>

      {/* ── Financial KYC Modal ── */}
      <AnimatePresence>
        {showFinancialKyc && (
          <div className="fixed inset-0 z-[100] flex items-end justify-center px-4 pb-10 bg-black/40 backdrop-blur-sm">
            <motion.div 
              initial={{ y: "100%" }} animate={{ y: 0 }} exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="w-full max-w-sm bg-white rounded-[32px] overflow-hidden shadow-2xl p-8 relative"
            >
              <button onClick={() => setShowFinancialKyc(false)} className="absolute top-6 right-6 p-2 rounded-full hover:bg-gray-100 transition-colors">
                <X size={20} className="text-gray-400" />
              </button>

              <div className="mb-6 text-center flex flex-col items-center">
                <div className="w-14 h-14 rounded-2xl bg-[#FF8C00]/10 flex items-center justify-center mb-4">
                  <Smartphone size={28} className="text-[#FF8C00]" />
                </div>
                <h2 className="text-2xl font-black text-[#003366] leading-tight" style={{ fontFamily: "Agrandir, sans-serif" }}>Link Payouts</h2>
                <p className="text-[#003366]/50 text-[13px] font-medium mt-2">Connect your Zambian mobile money to withdraw funds.</p>
              </div>

              {mmStep === "provider" ? (
                <div className="space-y-6">
                  <div className="grid grid-cols-2 gap-3">
                    {MM_PROVIDERS.map((prov) => (
                      <button key={prov.id}
                        onClick={() => setMMProvider(prov)}
                        className={`relative p-4 rounded-2xl border-2 flex flex-col items-center gap-2 transition-all ${
                          mmProvider?.id === prov.id ? "border-[#FF8C00] bg-[#FFF7ED]" : "border-gray-50 bg-gray-50"
                        }`}>
                        {mmProvider?.id === prov.id && (
                          <div className="absolute top-2 right-2 w-5 h-5 bg-[#FF8C00] rounded-full flex items-center justify-center">
                            <Check size={12} className="text-white" strokeWidth={3} />
                          </div>
                        )}
                        <img src={prov.logo} alt={prov.name} className="h-10 w-auto object-contain" />
                        <span className="text-[10px] font-bold text-[#003366]">{prov.shortName}</span>
                      </button>
                    ))}
                  </div>
                  <motion.button whileTap={{ scale: 0.96 }}
                    disabled={!mmProvider}
                    onClick={() => setMMStep("details")}
                    className={`w-full py-4 rounded-2xl font-bold text-white shadow-lg transition-all ${
                      mmProvider ? "bg-[#003366]" : "bg-gray-200 cursor-not-allowed text-gray-400 shadow-none"
                    }`}>
                    Next Step
                  </motion.button>
                </div>
              ) : (
                <div className="space-y-6">
                  <button onClick={() => setMMStep("provider")} className="text-[11px] font-bold text-[#FF8C00] flex items-center gap-1">
                    ← Change Provider
                  </button>
                  <div className="space-y-4">
                    <div>
                      <label className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-2 block">Mobile Number</label>
                      <div className="flex gap-2">
                        <div className="flex items-center gap-1.5 px-3 py-3 rounded-xl bg-gray-50 border border-gray-100">
                          <ZambiaFlag size={20} />
                          <span className="font-bold text-gray-400 text-[14px]">+260</span>
                        </div>
                        <input type="tel" value={mmPhone} onChange={(e) => { setMMPhone(e.target.value.replace(/\D/g, "").slice(0, 9)); setMMError(""); }} 
                           autoFocus className="flex-1 px-4 py-3 rounded-xl bg-gray-50 border border-gray-100 font-bold text-[#003366] outline-none focus:ring-2 focus:ring-[#FF8C00]/30" placeholder="9X XXX XXXX" />
                      </div>
                    </div>
                    {mmError && <p className="text-red-500 text-[11px] font-bold text-center">{mmError}</p>}
                  </div>
                  <motion.button whileTap={{ scale: 0.96 }}
                    onClick={saveFinancialKyc}
                    className="w-full py-4 rounded-2xl bg-[#FF8C00] font-bold text-white shadow-lg shadow-[#FF8C00]/20">
                    Verify & Account Link
                  </motion.button>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
