import {
  ArrowDownToLine,
  ArrowUpFromLine,
  ArrowLeftRight,
  Smartphone,
  Check,
  X,
  QrCode,
  ExternalLink,
  ShieldCheck,
  PiggyBank,
  Calculator,
  Globe,
  ReceiptText,
  Search
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";
import { ZambiaFlag } from "../components/KleenchIcons";
import adBanner from "@/assets/ads/Transaction Assurance.png";
import mtnLogo from "@/assets/MTN.jpeg";
import airtelLogo from "@/assets/airtel_logo.webp";
import zamtelLogo from "@/assets/zamtel_logo.png";
import zedLogo from "@/assets/zed_mobile_logo.png";

import { PageHeader } from "../components/PageHeader";
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
  const [activeTransTab, setActiveTransTab] = useState<TransTab>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [showFinancialKyc, setShowFinancialKyc] = useState(false);
  const [mmStep, setMMStep] = useState<"provider" | "details">("provider");
  const [mmProvider, setMMProvider] = useState<typeof MM_PROVIDERS[0] | null>(null);
  const [mmPhone, setMMPhone] = useState("");
  const [mmError, setMMError] = useState("");
  const [expandedTx, setExpandedTx] = useState<string | null>(null);

  const hasFinancialKyc = localStorage.getItem("kleench_financial_kyc") === "true";

  const handleAction = (type: string) => {
    if (!hasFinancialKyc && (type === "withdraw" || type === "send" || type === "paybills" || type === "qr")) {
      setShowFinancialKyc(true);
      return;
    }
    toast.success(`${type.toUpperCase()} feature coming soon`, {
       description: `This module is currently in development.`,
       duration: 2000,
    });
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
      <PageHeader 
        useLogo
        title="Wallet" 
        searchValue={searchQuery}
        onSearchChange={setSearchQuery}
        customBalanceHUD={
          <div className="flex justify-between items-center w-full h-full bg-[#003366] text-white px-4 border border-white/5 rounded-2xl shadow-sm shrink-0">
            <div className="flex flex-col justify-center">
              <p className="text-[#FF8C00] font-bold text-[8px] tracking-[0.2em] uppercase mb-0.5">Balance</p>
              <h2 className="text-[17px] font-black tracking-tight leading-none" style={{ fontFamily: "Agrandir, system-ui, sans-serif" }}>ZMW 2,450.00</h2>
            </div>
            <button 
               onClick={() => setShowFinancialKyc(!hasFinancialKyc)}
               className="bg-white/10 active:bg-white/20 text-[#FF8C00] px-3 py-1.5 rounded-full flex items-center justify-center font-bold tracking-[0.1em] text-[9px] border border-[#FF8C00]/20 active:scale-95 transition-all"
            >
              Verify KYC
            </button>
          </div>
        }
      />

      {loading ? (
        <PageSkeletons.Wallet />
      ) : (
        <div className="px-5 mt-3 relative z-10 space-y-6">
        
        <section className="space-y-4">

          <motion.div 
            initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={grace(0.1)}
            className="relative"
          >
            {/* Action Grid */}
            <div className="flex items-center justify-center gap-7 mt-4 mb-2">
              {[
                { id: "deposit", icon: ArrowUpFromLine, label: "DEPOSIT" },
                { id: "withdraw", icon: ArrowDownToLine, label: "WITHDRAW" },
                { id: "send", icon: ArrowLeftRight, label: "SEND" },
                { id: "statement", icon: ReceiptText, label: "STATEMENT" },
              ].map((action) => (
                <motion.div 
                  key={action.id}
                  whileTap={{ scale: 0.92 }}
                  onClick={() => (action.id === 'statement' ? setActiveTransTab('all') : handleAction(action.id))} 
                  className="flex flex-col items-center gap-2 cursor-pointer group"
                >
                  <div className={`w-12 h-12 rounded-full border border-[#003366]/10 bg-white flex items-center justify-center transition-all group-active:scale-95 shadow-sm`}>
                    <action.icon size={20} className="text-[#003366]" strokeWidth={1.5} />
                  </div>
                  <span className="text-[#003366] font-bold tracking-widest text-[8px] uppercase mt-0.5">{action.label}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* Section 02. UTILITY BLOCKS */}
        <section className="space-y-4 pt-2">
          <div className="flex items-center gap-3 mb-6">
             <span className="text-[#F5A623] font-black text-sm tracking-widest">02.</span>
             <h3 className="font-black text-[13px] uppercase tracking-[0.2em] text-[#999999]">Utility Blocks</h3>
             <div className="flex-1 h-[2px] bg-[#E0E0E0]" />
          </div>

          <div className="flex flex-col gap-4">
             <div className="grid grid-cols-3 gap-3">
               {[
                 { id: "paybills", icon: ReceiptText, label: "PAY BILLS", sub: "SETTLEMENTS" },
                 { id: "qr", icon: QrCode, label: "SCAN PAY", sub: "INSTANT PAD" },
                 { id: "global", icon: Globe, label: "GLOBAL", sub: "TRANSACTIONS" }
               ].map(util => (
                 <motion.button key={util.id} whileTap={{ scale: 0.96 }} onClick={() => handleAction(util.id)} className="flex items-center gap-2 p-3 bg-white rounded-2xl border border-slate-200 shadow-sm active:scale-95 transition-all">
                    <div className="w-7 h-7 rounded-full shrink-0 flex items-center justify-center bg-slate-50 border border-slate-100">
                       <util.icon size={14} className="text-[#003366]" strokeWidth={1.5} />
                    </div>
                    <div className="flex flex-col items-start leading-none text-left">
                       <span className="font-black text-[#003366] text-[7px] uppercase tracking-wide">{util.label}</span>
                       <span className="font-bold text-[#F5A623] text-[6px] uppercase tracking-wide mt-0.5">{util.sub}</span>
                    </div>
                 </motion.button>
               ))}
             </div>
             <div className="grid grid-cols-2 gap-3">
                {[
                  { id: "escrow", icon: ShieldCheck, title: "ESCROW", metric: "K1,200", iconColor: "text-[#003366]" },
                  { id: "savings", icon: PiggyBank, title: "SAVINGS", metric: "K8,400", iconColor: "text-[#4CAF50]" }
                ].map(util => (
                   <motion.button key={util.id} whileTap={{ scale: 0.96 }} onClick={() => handleAction(util.id)} className="flex items-center gap-3 p-4 bg-[#FFC55A] rounded-2xl shadow-sm active:scale-95 transition-all">
                      <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center shrink-0 border border-white/50">
                         <util.icon size={20} className={util.iconColor} strokeWidth={1.5} />
                      </div>
                      <div className="flex flex-col items-start flex-1 leading-tight">
                         <span className="font-bold text-[#003366] text-[9px] uppercase tracking-wide block">{util.title}</span>
                         <span className="font-black text-white text-[12px] uppercase">{util.metric}</span>
                      </div>
                   </motion.button>
                ))}
             </div>
             <div className="grid grid-cols-2 gap-3">
                {[
                  { id: "calculator", icon: Calculator, title: "CALCULATOR", metric: "-2%", iconColor: "text-white" },
                  { id: "tax", icon: Search, title: "TAX ACCOUNT", metric: "K211", iconColor: "text-[#E40513]" }
                ].map(util => (
                   <motion.button key={util.id} whileTap={{ scale: 0.96 }} onClick={() => handleAction(util.id)} className="flex items-center gap-3 p-4 bg-[#003366] rounded-2xl shadow-sm active:scale-95 transition-all">
                      <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center shrink-0 border border-white/20">
                         <util.icon size={20} className={util.iconColor} strokeWidth={1.5} />
                      </div>
                      <div className="flex flex-col items-start flex-1 leading-tight overflow-visible">
                         <span className="font-bold text-white/70 text-[9px] uppercase tracking-wide block text-left whitespace-normal w-full">{util.title}</span>
                         <span className="font-black text-white text-[12px] uppercase mt-0.5">{util.metric}</span>
                      </div>
                   </motion.button>
                ))}
             </div>
          </div>
        </section>

        {/* Section 03. STATEMENT LEDGER */}
        <section className="space-y-4 pb-12 mt-10">
          <div className="flex items-center gap-3 mb-6">
             <span className="text-[#F5A623] font-black text-sm tracking-widest">03.</span>
             <h3 className="font-black text-[13px] uppercase tracking-[0.2em] text-[#999999]">Statement Ledger</h3>
             <div className="flex-1 h-[2px] bg-[#E0E0E0]" />
          </div>

          {/* Categorized Tabs */}
          <div className="flex justify-between items-center bg-gray-50/50 p-2 rounded-full mb-6 border border-gray-100 shadow-sm overflow-x-auto no-scrollbar gap-2">
            {(["all", "earnings", "payments", "transfers"] as TransTab[]).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTransTab(tab)}
                className={`flex-1 min-w-[70px] py-2.5 text-[9px] font-black uppercase tracking-widest transition-all rounded-full ${
                  activeTransTab === tab ? "bg-white text-[#003366] shadow-sm border border-gray-100" : "text-[#A0A0A0]"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Transaction Grid */}
          <div className="bg-white overflow-hidden rounded-[24px] shadow-sm border border-gray-100 mb-8 divide-y divide-gray-50" style={{ backgroundImage: "radial-gradient(#e5e7eb 1px, transparent 1px)", backgroundSize: "20px 20px" }}>
            <div className="bg-white/80 w-full h-full"> 
            <AnimatePresence mode="popLayout">
              {(() => {
                const filtered = TRANSACTION_DATA[activeTransTab].filter(tx => 
                  tx.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                  tx.type.toLowerCase().includes(searchQuery.toLowerCase())
                );
                
                if (filtered.length === 0) {
                  return (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="py-20 flex flex-col items-center">
                       <p className="font-black text-[9px] uppercase tracking-[0.3em] opacity-20 text-[#003366]">NO RECORDS FOUND</p>
                    </motion.div>
                  );
                }
                
                return filtered.map((tx, idx) => {
                  const isPositive = tx.amount > 0;
                  return (
                    <motion.div
                      key={`${tx.id}-${activeTransTab}`}
                      initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, scale: 0.98 }}
                      transition={{ delay: idx * 0.04 }}
                      onClick={() => setExpandedTx(expandedTx === `${tx.id}-${activeTransTab}` ? null : `${tx.id}-${activeTransTab}`)}
                      className="flex flex-col group/5 cursor-pointer transition-colors backdrop-blur-sm"
                    >
                      <div className="p-5 flex items-center justify-between pointer-events-none">
                        <div className="flex items-center gap-4">
                          <div className="flex flex-col">
                             <h4 className="font-black text-[#003366] text-[11px] uppercase tracking-tight transition-colors">{tx.title}</h4>
                             <div className="flex items-center gap-3 mt-1.5">
                                <span className={`text-[8px] font-bold uppercase tracking-widest px-2.5 py-0.5 rounded-full bg-gray-100 text-[#003366]`}>{tx.type}</span>
                                <span className="text-[9px] font-bold text-gray-400 tracking-tight">{tx.date}</span>
                             </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-4 shrink-0 pointer-events-auto">
                          <div className="text-right">
                            <p className={`font-black text-sm tracking-tight ${isPositive ? "text-[#00C853]" : "text-[#003366]"}`}>
                              {isPositive ? "+" : ""}{tx.amount.toFixed(2)}
                            </p>
                            <div className="flex justify-end gap-1 items-center mt-1 opacity-20 transition-opacity">
                               <span className="text-[7px] font-black uppercase tracking-widest text-gray-400">Expand</span>
                               <ExternalLink size={8} className="text-gray-400" />
                            </div>
                          </div>
                          <div className={`w-1.5 h-10 rounded-full ${tx.type === 'earning' ? 'bg-[#00C853]' : tx.type === 'payment' ? 'bg-[#F5A623]' : 'bg-[#999999]'}`} />
                        </div>
                      </div>
                      
                      <AnimatePresence>
                         {expandedTx === `${tx.id}-${activeTransTab}` && (
                            <motion.div 
                               initial={{ height: 0, opacity: 0 }} 
                               animate={{ height: "auto", opacity: 1 }} 
                               exit={{ height: 0, opacity: 0 }}
                               className="overflow-hidden px-5 pb-5 border-t border-gray-100"
                            >
                               <div className="pt-4 space-y-3">
                                   <div className="flex justify-between items-center text-[10px]">
                                       <span className="text-gray-400 uppercase font-black tracking-widest">Transaction Ref</span>
                                       <span className="text-[#003366] font-bold">#TRX-{tx.id}9X2A</span>
                                   </div>
                                   <div className="flex justify-between items-center text-[10px]">
                                       <span className="text-gray-400 uppercase font-black tracking-widest">Status</span>
                                       <span className="text-[#00C853] font-bold">{tx.status}</span>
                                   </div>
                                   <button onClick={(e) => { e.stopPropagation(); handleAction("Download Receipt"); }} className="mt-2 w-full py-2 border-[1.5px] border-[#003366] text-[#003366] text-[9px] font-black uppercase tracking-widest active:bg-gray-100 transition-colors">
                                       Download Receipt
                                   </button>
                               </div>
                            </motion.div>
                         )}
                      </AnimatePresence>
                    </motion.div>
                  );
                });
              })()}
            </AnimatePresence>
            </div>
          </div>
        </section>

        {/* Security Banner with soft premium wrap */}
        <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} transition={grace(0.3)}
          className="rounded-2xl shadow-md bg-[#003366] overflow-hidden transition-all duration-700 aspect-[4/1] relative flex items-center justify-center">
          <img src={adBanner} alt="Transaction Assurance" className="absolute inset-0 w-full h-full object-cover opacity-60 mix-blend-overlay" />
          <p className="relative z-10 text-white font-black uppercase tracking-[0.4em] text-[10px]">Secure Gateway</p>
        </motion.div>
      </div>
      )}

      <AnimatePresence>
        {showFinancialKyc && (
          <div className="fixed inset-0 z-[100] flex items-end justify-center px-4 pb-10 bg-black/40 backdrop-blur-sm">
            <motion.div 
              initial={{ y: "100%" }} animate={{ y: 0 }} exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="w-full max-w-sm bg-white rounded-[32px] overflow-hidden shadow-2xl p-8 relative"
            >
              <button onClick={() => setShowFinancialKyc(false)} className="absolute top-6 right-6 p-2 rounded-full transition-colors">
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
