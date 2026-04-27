import { 
  Check,
  X,
  Plus, 
  Minus 
} from "lucide-react";
import { 
  DuotoneArrowUp, 
  DuotoneArrowDown, 
  DuotoneTransfer, 
  DuotoneReceipt, 
  DuotoneQrCode, 
  DuotoneGlobe, 
  DuotoneInsurance as DuotoneShieldCheck, 
  DuotoneExternalLink,
  DuotoneSparkles,
  DuotoneCalculator,
  DuotonePiggyBank,
  DuotoneTaxAccount
} from "../components/DuotoneIcon";
import { motion, AnimatePresence } from "motion/react";
import { useState } from "react";
import { useNavigate } from "react-router";
import adBanner from "@/assets/ads/Transaction Assurance.png";
import airtelLogo from "@/assets/airtel_logo.webp";
import mtnLogo from "@/assets/MTN.jpeg";
import zamtelLogo from "@/assets/zamtel_logo.png";


import { PageHeader } from "../components/PageHeader";
import { usePageLoading, PageSkeletons } from "../components/PageSkeletons";

/* ── Graceful ease-out builder ── */
const grace = (delay = 0) => ({
  delay,
  duration: 0.6,
  ease: [0.22, 1, 0.36, 1] as const,
});



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
  const navigate = useNavigate();
  const [activeTransTab, setActiveTransTab] = useState<TransTab>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedTx, setExpandedTx] = useState<string | null>(null);
  const [showComingSoon, setShowComingSoon] = useState<string | null>(null);
  const [showDepositSheet, setShowDepositSheet] = useState(false);
  const [depositAmount, setDepositAmount] = useState(150);
  const [selectedProvider, setSelectedProvider] = useState<string | null>(null);

  const hasFinancialKyc = localStorage.getItem("kleench_financial_kyc") === "true";

  const handleAction = (type: string) => {
    // KYC check temporarily bypassed to allow direct routing
    // if (!hasFinancialKyc && (type === "withdraw" || type === "send" || type === "paybills" || type === "qr")) {
    //   navigate("/kyc-verification");
    //   return;
    // }
    if (type === "deposit") {
      navigate("/deposit");
      return;
    }
    if (type === "withdraw") {
      navigate("/withdraw");
      return;
    }
    if (type === "send") {
      navigate("/send");
      return;
    }
    if (type === "statement") {
      navigate("/statements");
      return;
    }
    if (type === "paybills") {
      navigate("/pay-bills");
      return;
    }
    if (type === "qr") {
      navigate("/scan-pay");
      return;
    }
    if (type === "global") {
      navigate("/global-transaction");
      return;
    }
    if (type === "escrow") {
      navigate("/escrow");
      return;
    }
    if (type === "savings") {
      navigate("/savings");
      return;
    }
    if (type === "calculator") {
      navigate("/content-calculator");
      return;
    }
    if (type === "tax") {
      navigate("/tax-account");
      return;
    }
    setShowComingSoon(type);
  };



  const loading = usePageLoading(900);

  return (
    <div className="w-full pb-32 relative min-h-screen bg-transparent overflow-x-hidden font-sans text-[var(--app-text)]">
      
      {/* ── Standardized Orange Header ── */}
      <PageHeader 
        useLogo
        title="Wallet" 
        searchValue={searchQuery}
        onSearchChange={setSearchQuery}
        customBalanceHUD={
          <div className="flex items-center justify-between w-full bg-[var(--app-bg)]/10 backdrop-blur-md border border-white/20 rounded-full py-[6px] px-3 shadow-[0_4px_24px_rgba(0,0,0,0.06)] shrink-0">
            <div className="flex flex-col justify-center min-w-0 pl-1">
              <p className="text-white/60 text-[8px] font-bold uppercase tracking-widest leading-none mb-1">Total Balance</p>
              <h2 className="text-white text-[16px] font-black tracking-tight leading-none" style={{ fontFamily: "Agrandir, system-ui, sans-serif" }}>ZMW 2,450.00</h2>
            </div>
            
            <div className="flex items-center">
              {hasFinancialKyc ? (
                <button 
                   onClick={() => navigate("/kyc-verification")}
                   className="flex items-center gap-1.5 bg-[#00C853] hover:bg-[#00C853]/90 text-white px-3 py-1.5 rounded-full active:scale-95 transition-all cursor-pointer shadow-sm border border-[#00C853]"
                >
                  <Check size={10} strokeWidth={4} />
                  <span className="font-black uppercase tracking-widest text-[8px]">Update</span>
                </button>
              ) : (
                <button 
                   onClick={() => navigate("/kyc-verification")}
                   className="bg-[var(--app-bg)]/20 hover:bg-[var(--app-bg)]/30 backdrop-blur-md active:scale-95 text-white px-4 py-1.5 rounded-full font-black uppercase tracking-[0.15em] text-[8px] transition-all shadow-lg flex items-center justify-center border border-white/20"
                >
                  KYC Verification
                </button>
              )}
            </div>
          </div>
        }
      />

      {loading ? (
        <PageSkeletons.Wallet />
      ) : (
        <div className="px-4 mt-3 relative z-10 space-y-6">
        
        <section className="space-y-4">

          <motion.div 
            initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={grace(0.1)}
            className="relative"
          >
            {/* Action Grid */}
            <div className="flex items-center justify-center gap-7 mt-4 mb-2">
              {[
                { id: "deposit", icon: DuotoneArrowUp, label: "DEPOSIT" },
                { id: "withdraw", icon: DuotoneArrowDown, label: "WITHDRAW" },
                { id: "send", icon: DuotoneTransfer, label: "SEND" },
                { id: "statement", icon: DuotoneReceipt, label: "STATEMENT" },
              ].map((action) => (
                <motion.div 
                  key={action.id}
                  whileTap={{ scale: 0.92 }}
                  onClick={() => handleAction(action.id)} 
                  className="flex flex-col items-center gap-2 cursor-pointer group"
                >
                  <div className={`w-12 h-12 rounded-full border border-[var(--app-text)]/10 bg-[var(--app-bg)] flex items-center justify-center transition-all group-active:scale-95 shadow-sm`}>
                    <action.icon size={20} className="text-[var(--app-text)]" strokeWidth={1.5} />
                  </div>
                  <span className="text-[var(--app-text)] font-bold tracking-widest text-[8px] uppercase mt-0.5">{action.label}</span>
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
                  { id: "paybills", icon: DuotoneReceipt, label: "PAY BILLS", sub: "SETTLEMENTS" },
                  { id: "qr", icon: DuotoneQrCode, label: "SCAN PAY", sub: "INSTANT PAD" },
                  { id: "global", icon: DuotoneGlobe, label: "GLOBAL", sub: "TRANSACTIONS" }
                ].map(util => (
                 <motion.button key={util.id} whileTap={{ scale: 0.96 }} onClick={() => handleAction(util.id)} className="flex items-center gap-2 p-3 bg-[var(--app-bg)] rounded-2xl border border-slate-200 shadow-sm active:scale-95 transition-all">
                    <div className="w-7 h-7 rounded-full shrink-0 flex items-center justify-center bg-[var(--app-bg-muted)] border border-slate-100">
                       <util.icon size={14} className="text-[var(--app-text)]" strokeWidth={1.5} />
                    </div>
                    <div className="flex flex-col items-start leading-none text-left">
                       <span className="font-black text-[var(--app-text)] text-[7px] uppercase tracking-wide">{util.label}</span>
                       <span className="font-bold text-[#F5A623] text-[6px] uppercase tracking-wide mt-0.5">{util.sub}</span>
                    </div>
                 </motion.button>
               ))}
             </div>
             <div className="grid grid-cols-2 gap-3">
                {[
                  { id: "escrow", icon: DuotoneShieldCheck, title: "ESCROW", metric: "K1,200", primary: "var(--app-text)" },
                  { id: "savings", icon: DuotonePiggyBank, title: "SAVINGS", metric: "K8,400", primary: "#4CAF50" }
                ].map(util => (
                   <motion.button key={util.id} whileTap={{ scale: 0.96 }} onClick={() => handleAction(util.id)} className="flex items-center gap-3 p-4 bg-[#FFC55A] rounded-2xl shadow-sm active:scale-95 transition-all">
                      <div className="w-10 h-10 rounded-full bg-[var(--app-bg)]/20 flex items-center justify-center shrink-0 border border-white/50">
                         <util.icon size={20} primary={util.primary} strokeWidth={1.5} />
                      </div>
                      <div className="flex flex-col items-start flex-1 leading-tight">
                         <span className="font-bold text-[var(--app-text)] text-[9px] uppercase tracking-wide block">{util.title}</span>
                         <span className="font-black text-white text-[12px] uppercase">{util.metric}</span>
                      </div>
                   </motion.button>
                ))}
             </div>
             <div className="grid grid-cols-2 gap-3">
                {[
                  { id: "calculator", icon: DuotoneCalculator, title: "CALCULATOR", metric: "-2%", primary: "#ffffff" },
                  { id: "tax", icon: DuotoneTaxAccount, title: "TAX ACCOUNT", metric: "K211", primary: "#ffffff" }
                ].map(util => (
                   <motion.button key={util.id} whileTap={{ scale: 0.96 }} onClick={() => handleAction(util.id)} className="flex items-center gap-3 p-4 bg-[var(--app-shape-accent)] rounded-2xl shadow-sm active:scale-95 transition-all">
                      <div className="w-10 h-10 rounded-full bg-[var(--app-bg)]/10 flex items-center justify-center shrink-0 border border-white/20">
                         <util.icon size={20} primary={util.primary} strokeWidth={1.5} />
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
          <div className="flex justify-between items-center bg-[var(--app-bg-muted)]/50 p-2 rounded-full mb-6 border border-gray-100 shadow-sm overflow-x-auto no-scrollbar gap-2">
            {(["all", "earnings", "payments", "transfers"] as TransTab[]).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTransTab(tab)}
                className={`flex-1 min-w-[70px] py-2.5 text-[9px] font-black uppercase tracking-widest transition-all rounded-full ${
                  activeTransTab === tab ? "bg-[var(--app-bg)] text-[var(--app-text)] shadow-sm border border-gray-100" : "text-[#A0A0A0]"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Transaction Grid */}
          <div className="bg-[var(--app-bg)] overflow-hidden rounded-[24px] shadow-sm border border-gray-100 mb-8 divide-y divide-gray-50" style={{ backgroundImage: "radial-gradient(#e5e7eb 1px, transparent 1px)", backgroundSize: "20px 20px" }}>
            <div className="bg-[var(--app-bg)]/80 w-full h-full"> 
            <AnimatePresence mode="popLayout">
              {(() => {
                const filtered = TRANSACTION_DATA[activeTransTab].filter(tx => 
                  tx.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                  tx.type.toLowerCase().includes(searchQuery.toLowerCase())
                );
                
                if (filtered.length === 0) {
                  return (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="py-20 flex flex-col items-center">
                       <p className="font-black text-[9px] uppercase tracking-[0.3em] opacity-20 text-[var(--app-text)]">NO RECORDS FOUND</p>
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
                             <h4 className="font-black text-[var(--app-text)] text-[11px] uppercase tracking-tight transition-colors">{tx.title}</h4>
                             <div className="flex items-center gap-3 mt-1.5">
                                <span className={`text-[8px] font-bold uppercase tracking-widest px-2.5 py-0.5 rounded-full bg-gray-100 text-[var(--app-text)]`}>{tx.type}</span>
                                <span className="text-[9px] font-bold text-gray-400 tracking-tight">{tx.date}</span>
                             </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-4 shrink-0 pointer-events-auto">
                          <div className="text-right">
                            <p className={`font-black text-sm tracking-tight ${isPositive ? "text-[#00C853]" : "text-[var(--app-text)]"}`}>
                              {isPositive ? "+" : ""}{tx.amount.toFixed(2)}
                            </p>
                            <div className="flex justify-end gap-1 items-center mt-1 opacity-20 transition-opacity">
                               <span className="text-[7px] font-black uppercase tracking-widest text-gray-400">Expand</span>
                               <DuotoneExternalLink size={8} primary="#94a3b8" />
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
                               className="overflow-hidden px-4 pb-4 border-t border-gray-100"
                            >
                               <div className="pt-4 space-y-3">
                                   <div className="flex justify-between items-center text-[10px]">
                                       <span className="text-gray-400 uppercase font-black tracking-widest">Transaction Ref</span>
                                       <span className="text-[var(--app-text)] font-bold">#TRX-{tx.id}9X2A</span>
                                   </div>
                                   <div className="flex justify-between items-center text-[10px]">
                                       <span className="text-gray-400 uppercase font-black tracking-widest">Status</span>
                                       <span className="text-[#00C853] font-bold">{tx.status}</span>
                                   </div>
                                   <button onClick={(e) => { e.stopPropagation(); handleAction("Download Receipt"); }} className="mt-2 w-full py-2 border-[1.5px] border-[var(--app-text)] text-[var(--app-text)] text-[9px] font-black uppercase tracking-widest active:bg-gray-100 transition-colors">
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
          className="rounded-2xl shadow-md bg-[var(--app-shape-accent)] overflow-hidden transition-all duration-700 aspect-[4/1] relative flex items-center justify-center">
          <img src={adBanner} alt="Transaction Assurance" className="absolute inset-0 w-full h-full object-cover opacity-60 mix-blend-overlay" />
          <p className="relative z-10 text-white font-black uppercase tracking-[0.4em] text-[10px]">Secure Gateway</p>
        </motion.div>
      </div>
    )}

      {/* DEPOSIT BOTTOM SHEET (Screenshot 5 Parity) */}
      <AnimatePresence>
        {showDepositSheet && (
          <>
            <motion.div 
               initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
               onClick={() => setShowDepositSheet(false)}
               className="fixed inset-0 z-[1000] bg-black/60 backdrop-blur-sm max-w-md mx-auto"
            />
            <motion.div 
               initial={{ y: "100%" }} animate={{ y: 0 }} exit={{ y: "100%" }} transition={{ type: "spring", damping: 25, stiffness: 200 }}
               className="fixed bottom-0 left-0 right-0 z-[1010] w-full max-w-md mx-auto bg-[var(--app-bg)] rounded-t-[40px] border-t-[3px] border-[var(--app-text-slate)] shadow-[0_-20px_60px_rgba(0,0,0,0.3)] overflow-hidden pb-[env(safe-area-inset-bottom)]"
            >
               <div className="p-8">
                  <div className="flex justify-between items-center mb-6">
                     <div className="flex-1 text-center">
                        <h3 className="text-3xl font-black text-[var(--app-text)] uppercase tracking-tighter">Deposit</h3>
                        <p className="text-[10px] font-bold text-gray-500 mt-1 uppercase tracking-widest leading-none">Select Amount to transfer into your wallet</p>
                     </div>
                     <button onClick={() => setShowDepositSheet(false)} className="absolute right-6 top-8 w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center active:scale-90 transition-all border border-slate-200">
                        <X size={20} className="text-gray-500" />
                     </button>
                  </div>

                  <div className="space-y-6">
                     {/* Balance Card */}
                     <div className="bg-[var(--app-shape-accent)] rounded-2xl p-6 shadow-xl relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-24 h-24 bg-[var(--app-bg)]/5 rounded-full -mr-10 -mt-10 blur-2xl group-hover:bg-[var(--app-bg)]/10 transition-all" />
                        <div className="relative z-10 flex flex-col">
                           <span className="text-orange-400 font-black text-[10px] uppercase tracking-[0.2em] mb-1">BALANCE</span>
                           <h4 className="text-white text-3xl font-black tracking-tight">ZMW 2,450.00</h4>
                        </div>
                     </div>

                     {/* Amount Selector */}
                     <div className="bg-[var(--app-bg)] border-2 border-slate-200 rounded-[24px] p-10 shadow-lg flex items-center justify-between">
                        <motion.button whileTap={{ scale: 0.8 }} onClick={() => setDepositAmount(Math.max(0, depositAmount - 50))} className="w-12 h-12 flex items-center justify-center text-[var(--app-text)]">
                           <Minus size={32} strokeWidth={4} />
                        </motion.button>
                        <div className="text-center">
                           <span className="text-[var(--app-text)] text-4xl font-black tracking-tighter">K{depositAmount.toFixed(2)}</span>
                        </div>
                        <motion.button whileTap={{ scale: 0.8 }} onClick={() => setDepositAmount(depositAmount + 50)} className="w-12 h-12 flex items-center justify-center text-[var(--app-text)]">
                           <Plus size={32} strokeWidth={4} />
                        </motion.button>
                     </div>

                     <div className="space-y-4">
                        <p className="text-[12px] font-black text-[var(--app-text)] uppercase tracking-widest ml-1">Select Payment Method</p>
                        <button className="w-full h-16 bg-[var(--app-bg)] border-2 border-slate-200 rounded-2xl px-6 flex items-center justify-center font-black text-2xl text-slate-500 transition-all shadow-sm">
                           Mobile Money
                        </button>

                        <div className="grid grid-cols-3 gap-6 pt-4 px-2">
                           {[
                             { id: 'mtn', name: 'MTN', logo: mtnLogo, color: 'border-yellow-400' },
                             { id: 'airtel', name: 'Airtel', logo: airtelLogo, color: 'border-red-500' },
                             { id: 'zamtel', name: 'Zamtel', logo: zamtelLogo, color: 'border-green-500' }
                           ].map(provider => (
                             <div 
                               key={provider.id} 
                               onClick={() => setSelectedProvider(provider.id)}
                               className="flex flex-col items-center gap-2 group cursor-pointer"
                             >
                               <div className={`w-20 h-20 rounded-full border-4 ${selectedProvider === provider.id ? provider.color : "border-slate-50"} bg-[var(--app-bg)] shadow-xl flex items-center justify-center overflow-hidden transition-all active:scale-90`}>
                                 <img src={provider.logo} alt={provider.name} className="w-full h-full object-cover scale-110" />
                               </div>
                               <span className="text-[11px] font-bold text-gray-500 uppercase tracking-widest">{provider.name}</span>
                             </div>
                           ))}
                        </div>
                     </div>

                     <motion.button 
                       whileTap={{ scale: 0.98 }}
                       onClick={() => {
                         setShowDepositSheet(false);
                       }}
                       className="w-full h-16 bg-[var(--app-shape-accent)] text-white rounded-2xl flex items-center justify-center font-black uppercase tracking-[0.2em] text-sm shadow-[0_6px_0px_#002144] active:shadow-none active:translate-y-[4px] mt-6 transition-all"
                     >
                       Deposit
                     </motion.button>
                  </div>
               </div>
            </motion.div>
          </>
            )}
      </AnimatePresence>

      {/* MODALS RENDERED PORTAL-STYLE */}
      <AnimatePresence>
        {showComingSoon && (
          <>
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setShowComingSoon(null)}
              className="fixed inset-0 z-[1000] bg-black/40 backdrop-blur-sm max-w-md mx-auto"
            />
            <motion.div 
              initial={{ y: "100%" }} animate={{ y: 0 }} exit={{ y: "100%" }} transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed bottom-0 left-0 right-0 z-[1010] w-full max-w-md mx-auto bg-[var(--app-bg)] rounded-t-[40px] border-t-[3px] border-[var(--app-text-slate)] shadow-[0_-20px_60px_rgba(0,0,0,0.3)] overflow-hidden pb-[env(safe-area-inset-bottom)]"
            >
              <div className="p-8">
                <div className="flex justify-between items-center mb-8">
                  <h3 className="text-xl font-black text-[var(--app-text-slate)] uppercase tracking-tighter">Feature Status</h3>
                  <button onClick={() => setShowComingSoon(null)} className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center border-2 border-[var(--app-text-slate)] shadow-[2px_2px_0px_#000] active:scale-90 transition-all"><X size={20} /></button>
                </div>
                
                <div className="flex flex-col items-center gap-6 py-4 text-center">
                  <div className="w-20 h-20 bg-orange-50 rounded-3xl border-2 border-orange-500 flex items-center justify-center shadow-[6px_6px_0px_var(--app-orange)]">
                    <DuotoneSparkles primary="#f59e0b" size={40} />
                  </div>
                  <div>
                    <h4 className="text-lg font-black text-[var(--app-text-slate)] uppercase tracking-tight mb-2">{showComingSoon} Module</h4>
                    <p className="text-sm font-bold text-slate-500 leading-relaxed max-w-[240px] mx-auto">This premium feature is currently being optimized for Zambian market compliance.</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
