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
  ExternalLink,
  ShieldCheck,
  PiggyBank,
  Calculator,
  ChevronRight
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
  const [searchQuery, setSearchQuery] = useState("");
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
        title="Wallet" 
        subtitle="Manage your earnings & escrow" 
        searchValue={searchQuery}
        onSearchChange={setSearchQuery}
      />

      {loading ? (
        <PageSkeletons.Wallet />
      ) : (
        <div className="px-5 mt-2 relative z-10 space-y-8">
        
        <section className="space-y-6">

          <motion.div 
            initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={grace(0.1)}
            className="relative"
          >
            {/* The Wallet hero maintaining its volume but strictly integrated */}
            <div className="mb-6">
               <DigitalWallet 
                balance="ZMW 2,450.00" 
                isBalanceHidden={!showBalance}
                onToggleVisibility={() => setShowBalance(!showBalance)}
               />
            </div>
            
            {/* Action Grid: Neo-Brutalist Action Buttons */}
            <div className="flex items-center justify-center gap-6 sm:gap-8">
              {[
                { id: "deposit", icon: ArrowDownToLine, label: "Deposit", color: "text-white", bg: "bg-[#FF8C00]" },
                { id: "withdraw", icon: ArrowUpFromLine, label: "Withdraw", color: "text-[#003366]", bg: "bg-white" },
                { id: "send", icon: ArrowLeftRight, label: "Send", color: "text-[#003366]", bg: "bg-white" },
                { id: "statement", icon: FileText, label: "Statemnt", color: "text-[#003366]", bg: "bg-white" },
              ].map((action) => (
                <motion.div 
                  key={action.id}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => (action.id === 'statement' ? setActiveTransTab('all') : handleAction(action.id))} 
                  className="flex flex-col items-center gap-1.5 cursor-pointer group"
                >
                  <div className={`w-11 h-11 rounded-full border-2 border-[#003366] shadow-[2px_2px_0px_#003366] flex items-center justify-center transition-all group-hover:-translate-y-1 group-active:translate-y-0 group-active:shadow-none ${action.color} ${action.bg}`}>
                    <action.icon size={18} strokeWidth={2.5} />
                  </div>
                  <span className="text-[#003366] font-black tracking-tight text-[9px] uppercase">{action.label}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* Section 02. FINANCIAL DESTINATIONS */}
        <section className="space-y-4">
          <div className="flex items-center gap-3 mb-2">
             <span className="text-[#FF8C00] font-black text-xs tracking-[0.3em]">02.</span>
             <h3 className="font-black text-[10px] uppercase tracking-[0.4em] text-[#003366]/40">Destinations</h3>
             <div className="flex-1 h-[2px] bg-[#003366]/5" />
          </div>

          <div className="flex flex-col gap-3">
            {[
              { id: "escrow", icon: ShieldCheck, title: "Secured Escrow", desc: "Safe marketplace transactions", metric: "K1,200", color: "text-[#003366]", bg: "bg-white", activeBg: "active:bg-blue-50" },
              { id: "savings", icon: PiggyBank, title: "Vault Savings", desc: "Earn up to 12% APY", metric: "K8,400", color: "text-[#00C853]", bg: "bg-white", activeBg: "active:bg-green-50" },
              { id: "tax", icon: Calculator, title: "Content Calculator", desc: "Tax & provisions tool", metric: "-2%", color: "text-[#FF8C00]", bg: "bg-white", activeBg: "active:bg-orange-50" }
            ].map((dest) => (
              <motion.button
                key={dest.id}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleAction(dest.id)}
                className={`flex items-center justify-between p-4 bg-white border-2 border-[#003366] shadow-[3px_3px_0px_#003366] group hover:shadow-[4px_4px_0px_#FF8C00] transition-all text-left active:translate-x-[2px] active:translate-y-[2px] active:shadow-none ${dest.activeBg}`}
              >
                <div className="flex items-center gap-3 sm:gap-4">
                  <div className={`w-11 h-11 sm:w-12 sm:h-12 rounded-none flex items-center justify-center border-2 border-[#003366] bg-white group-hover:scale-105 transition-transform`}>
                    <dest.icon size={18} className={dest.color} strokeWidth={2.5} />
                  </div>
                  <div>
                    <h4 className="font-black text-[12px] sm:text-[13px] text-[#003366] uppercase tracking-tight leading-none mb-1 group-hover:text-[#FF8C00] transition-colors">{dest.title}</h4>
                    <p className="text-[9px] sm:text-[10px] font-bold text-[#003366]/60 tracking-wider uppercase">{dest.desc}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 sm:gap-3">
                  <span className={`font-black text-xs sm:text-sm tracking-tight ${dest.color}`}>{dest.metric}</span>
                  <div className="w-5 h-5 sm:w-6 sm:h-6 flex items-center justify-center">
                    <ChevronRight size={16} className="text-[#003366]" strokeWidth={3} />
                  </div>
                </div>
              </motion.button>
            ))}
          </div>
        </section>

        {/* Shortened Utilities Section */}
        <section className="space-y-0">
           <div className="grid grid-cols-2 gap-3">
            {[
              { id: "paybills", icon: Receipt, label: "Pay Bills", desc: "Settlements" },
              { id: "qr", icon: QrCode, label: "Scan Pay", desc: "Instant Pad" }
            ].map((util) => (
              <motion.button
                key={util.id}
                whileTap={{ scale: 0.96 }}
                onClick={() => handleAction(util.id)}
                className={`flex items-center p-3 bg-white border-2 border-[#003366] shadow-[2px_2px_0px_#003366] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all`}
              >
                <div className="w-8 h-8 border-2 border-[#003366] bg-white flex items-center justify-center mr-3">
                  <util.icon size={14} className="text-[#003366]" strokeWidth={3} />
                </div>
                <div className="text-left">
                  <h4 className="font-black text-[10px] sm:text-[11px] text-[#003366] uppercase tracking-tight leading-none">{util.label}</h4>
                  <span className="text-[8px] font-bold text-[#FF8C00] uppercase tracking-widest leading-none mt-1">{util.desc}</span>
                </div>
              </motion.button>
            ))}
           </div>
        </section>

        {/* Section 03. LEDGER STATEMENT */}
        <section className="space-y-6 pb-12 mt-4">
          <div className="flex items-center gap-3">
             <span className="text-[#FF8C00] font-black text-xs tracking-[0.3em]">03.</span>
             <h3 className="font-black text-[10px] uppercase tracking-[0.4em] text-[#003366]/40">Statement Ledger</h3>
             <div className="flex-1 h-[2px] bg-[#003366]/5" />
          </div>

          {/* Categorized Tabs */}
          <div className="flex border-2 border-[#003366] bg-[#003366] p-0.5 shadow-[3px_3px_0px_#003366]">
            {(["all", "earnings", "payments", "transfers"] as TransTab[]).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTransTab(tab)}
                className={`flex-1 py-2 text-[8px] sm:text-[9px] font-black uppercase tracking-[0.2em] transition-all border-r-2 border-[#003366] last:border-r-0 ${
                  activeTransTab === tab ? "bg-[#FF8C00] text-white" : "bg-white text-[#003366] hover:bg-gray-50"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Transaction Grid */}
          <div className="border-2 border-[#003366] divide-y-2 divide-[#003366] bg-white overflow-hidden shadow-[5px_5px_0px_#003366] mb-8">
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
                      className="p-4 sm:p-5 flex items-center justify-between group hover:bg-[#003366]/5 cursor-pointer transition-colors"
                    >
                      <div className="flex items-center gap-4 sm:gap-6">
                        <div className="hidden sm:block text-[10px] font-black tracking-widest text-[#003366]/30">{(idx + 1).toString().padStart(2, '0')}.</div>
                        <div className="flex flex-col">
                           <h4 className="font-black text-[#003366] text-[11px] sm:text-xs uppercase tracking-tight group-hover:text-[#FF8C00] transition-colors">{tx.title}</h4>
                           <div className="flex items-center gap-3 mt-1.5">
                              <span className={`text-[7px] font-black uppercase tracking-[0.2em] px-1.5 py-0.5 border-2 border-[#003366] text-[#003366]`}>{tx.type}</span>
                              <span className="text-[9px] font-bold text-[#003366]/50 tracking-tight">{tx.date}</span>
                           </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-4 sm:gap-6 shrink-0">
                        <div className="text-right">
                          <p className={`font-black text-sm tracking-tighter ${isPositive ? "text-[#00C853]" : "text-[#003366]"}`}>
                            {isPositive ? "+" : ""}{tx.amount.toFixed(2)}
                          </p>
                          <div className="flex justify-end gap-1 items-center mt-1 opacity-10 group-hover:opacity-100 transition-opacity">
                             <span className="text-[7px] font-black uppercase tracking-widest text-[#FF8C00]">Expand</span>
                             <ExternalLink size={8} className="text-[#FF8C00]" />
                          </div>
                        </div>
                        <div className={`w-1.5 h-10 border-2 border-[#003366] ${tx.type === 'earning' ? 'bg-[#00C853]' : tx.type === 'payment' ? 'bg-[#FF8C00]' : 'bg-[#003366]'}`} />
                      </div>
                    </motion.div>
                  );
                });
              })()}
            </AnimatePresence>
          </div>
        </section>

        {/* Security Banner with brutalist precision */}
        <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} transition={grace(0.3)}
          className="border-2 border-[#003366] shadow-[5px_5px_0px_#003366] bg-[#003366] overflow-hidden grayscale contrast-125 hover:grayscale-0 transition-all duration-700 aspect-[4/1] relative flex items-center justify-center">
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
