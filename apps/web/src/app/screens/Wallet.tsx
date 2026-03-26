import {
  ArrowDownToLine,
  ArrowUpFromLine,
  ArrowLeftRight,
  Coins,
  Shield,
  ShoppingBag,
  Tag,
  Eye,
  EyeOff,
  Smartphone,
  Check,
  X
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useState } from "react";
import { Link } from "react-router";
import { ZambiaFlag } from "../components/KleenchIcons";
import adBanner from "@/assets/ads/Transaction Assurance.png";
import mtnLogo from "@/assets/MTN.jpeg";
import airtelLogo from "@/assets/airtel_logo.webp";
import zamtelLogo from "@/assets/zamtel_logo.png";
import zedLogo from "@/assets/zed_mobile_logo.png";

const MM_PROVIDERS = [
  { id: "airtel", name: "Airtel Money", shortName: "Airtel", color: "#E40513", bg: "#FFF1F2", logo: airtelLogo },
  { id: "mtn", name: "MTN Mobile Money", shortName: "MTN", color: "#F5A623", bg: "#FFFBEB", logo: mtnLogo },
  { id: "zamtel", name: "Zamtel Mobile Money", shortName: "Zamtel", color: "#00843D", bg: "#F0FDF4", logo: zamtelLogo },
  { id: "zed", name: "Zed Mobile", shortName: "Zed", color: "#0077B6", bg: "#EFF6FF", logo: zedLogo },
];

const escrowItems = [
  {
    id: 1,
    icon: ShoppingBag,
    title: "Vintage Leather Jacket",
    subtitle: "Awaiting Shipment",
    amount: -150.0,
    status: "escrow",
  },
  {
    id: 2,
    icon: Tag,
    title: "Sony A7III Camera",
    subtitle: "Buyer Inspecting",
    amount: 850.0,
    status: "escrow",
  },
  {
    id: 3,
    icon: ShoppingBag,
    title: "Premium Course Bundle",
    subtitle: "Delivered — Pending Confirm",
    amount: -149.99,
    status: "delivered",
  },
];



import { PageHeader } from "../components/PageHeader";
import { DigitalWallet } from "../components/DigitalWallet";
import { PageSkeletons, usePageLoading } from "../components/PageSkeletons";

export function Wallet() {
  const [showBalance, setShowBalance] = useState(true);
  const [showFinancialKyc, setShowFinancialKyc] = useState(false);
  const [mmStep, setMMStep] = useState<"provider" | "details">("provider");
  const [mmProvider, setMMProvider] = useState<typeof MM_PROVIDERS[0] | null>(null);
  const [mmPhone, setMMPhone] = useState("");
  const [mmError, setMMError] = useState("");

  const hasFinancialKyc = localStorage.getItem("kleench_financial_kyc") === "true";

  const handleAction = (type: string) => {
    if (!hasFinancialKyc) {
      setShowFinancialKyc(true);
      return;
    }
    // Logic for withdrawal/send goes here
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
    // Success feedback could go here
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
    <div className="w-full pb-32 relative min-h-screen bg-gray-50 overflow-x-hidden font-sans">
      
      {/* ── Unified cross-hatch bg ── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 0 }}>
        <svg width="100%" height="100%" style={{ position: "absolute", inset: 0 }}>
          <defs>
            <pattern id="xhatch-wallet" x="0" y="0" width="24" height="24" patternUnits="userSpaceOnUse">
              <line x1="0" y1="0" x2="24" y2="24" stroke="#FF8C00" strokeWidth="0.5" strokeOpacity="0.07"/>
              <line x1="24" y1="0" x2="0" y2="24" stroke="#FF8C00" strokeWidth="0.5" strokeOpacity="0.07"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#xhatch-wallet)"/>
        </svg>
      </div>

      {/* ── Standardized Orange Header ── */}
      <PageHeader title="Wallet" subtitle="Manage your earnings & escrow" />

      <div className="px-5 -mt-10 relative z-10 space-y-6">
        
        {/* Interactive Digital Wallet Hero */}
        <motion.section 
          initial={{ opacity: 0, y: 40 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={grace(0.1)}
          className="relative"
        >
          <DigitalWallet balance={showBalance ? "ZMW 2,450.00" : "••••••"} />
          
          {/* Quick Actions Integrated below wallet with premium style */}
          <div className="flex gap-4 mt-6 px-4">
            <motion.button 
              whileTap={{ scale: 0.94 }}
              onClick={() => handleAction("withdraw")} 
              className="flex-1 bg-white border border-black/[0.04] p-4 rounded-[24px] shadow-sm flex flex-col items-center justify-center transition-all hover:shadow-md active:scale-95 gap-2"
            >
              <div className="w-10 h-10 rounded-xl bg-[#0D1B3E]/5 flex items-center justify-center">
                <ArrowUpFromLine size={20} className="text-[#0D1B3E]" />
              </div>
              <span className="text-[11px] font-black text-[#0D1B3E] uppercase tracking-widest">Withdraw</span>
            </motion.button>

            <motion.button 
              whileTap={{ scale: 0.94 }}
              onClick={() => handleAction("deposit")} 
              className="flex-1 bg-[#FF8C00] p-4 rounded-[24px] shadow-xl shadow-[#FF8C00]/20 flex flex-col items-center justify-center transition-all hover:bg-[#FF8C00]/90 active:scale-95 gap-2"
            >
              <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
                <ArrowDownToLine size={20} className="text-white" />
              </div>
              <span className="text-[11px] font-black text-white uppercase tracking-widest">Deposit</span>
            </motion.button>

            <motion.button 
              whileTap={{ scale: 0.94 }}
              onClick={() => handleAction("send")} 
              className="flex-1 bg-white border border-black/[0.04] p-4 rounded-[24px] shadow-sm flex flex-col items-center justify-center transition-all hover:shadow-md active:scale-95 gap-2"
            >
              <div className="w-10 h-10 rounded-xl bg-[#00695C]/5 flex items-center justify-center">
                <ArrowLeftRight size={20} className="text-[#00695C]" />
              </div>
              <span className="text-[11px] font-black text-[#0D1B3E] uppercase tracking-widest">P2P Send</span>
            </motion.button>
          </div>
        </motion.section>

        {/* Visibility Toggle Floating */}
        <div className="flex justify-center -mt-2">
          <button 
            onClick={() => setShowBalance(!showBalance)}
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 backdrop-blur-md border border-black/[0.04] shadow-sm text-[10px] font-black uppercase tracking-[0.2em] text-[#0D1B3E]/40 hover:text-[#FF8C00] transition-all"
          >
            {showBalance ? <Eye size={14} /> : <EyeOff size={14} />}
            {showBalance ? "Hide Balance" : "Show Balance"}
          </button>
        </div>

        {/* Banner Ad */}
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={grace(0.2)}
          className="rounded-[32px] overflow-hidden shadow-xl border border-white/10">
          <img src={adBanner} alt="Transaction Assurance" className="w-full h-auto object-cover" />
        </motion.div>

        {/* Action Grid */}
        <section className="space-y-4">
          <h3 className="font-black text-xl px-2" style={{ fontFamily: "Agrandir, sans-serif", color: "#0D1B3E" }}>Services</h3>
          <div className="grid grid-cols-2 gap-4">
            {[
              { icon: ArrowLeftRight, label: "Send (P2P)", color: "#00695C" },
              { icon: Coins, label: "Earn Gold", color: "#FF8C00" },
            ].map(({ icon: Icon, label, color }, i) => (
              <motion.button
                key={label}
                whileTap={{ scale: 0.96 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={grace(0.3 + i * 0.1)}
                onClick={() => handleAction("send")}
                className="bg-white p-6 rounded-[28px] shadow-sm border border-black/[0.03] flex flex-col items-center gap-3 transition-shadow hover:shadow-md"
              >
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center" style={{ backgroundColor: `${color}10` }}>
                  <Icon size={22} style={{ color: color }} strokeWidth={2.5} />
                </div>
                <span className="font-bold text-[#0D1B3E] text-[13px]">{label}</span>
              </motion.button>
            ))}
          </div>
        </section>

        {/* Recent Escrow */}
        <section className="space-y-5 pb-10">
          <div className="flex items-center justify-between px-2">
            <h3 className="font-black text-xl" style={{ fontFamily: "Agrandir, sans-serif", color: "#0D1B3E" }}>Recent Escrow</h3>
            <Link to="/marketplace" className="text-[12px] font-bold text-[#FF8C00]">View All</Link>
          </div>

          <div className="space-y-3">
            {escrowItems.map((item, idx) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={grace(0.5 + idx * 0.08)}
                  className="bg-white p-5 rounded-[28px] shadow-sm border border-black/[0.03] flex items-center justify-between"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-[#0D1B3E]/5 flex items-center justify-center">
                      <Icon size={20} className="text-[#0D1B3E]" />
                    </div>
                    <div>
                      <h4 className="font-bold text-[#0D1B3E] text-[14px]">{item.title}</h4>
                      <p className="text-[11px] font-medium text-[#0D1B3E]/50 mt-0.5">{item.subtitle}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className={`font-black text-[15px] ${item.amount > 0 ? "text-[#00695C]" : "text-[#0D1B3E]"}`}>
                      {item.amount > 0 ? "+" : ""}${Math.abs(item.amount).toFixed(2)}
                    </p>
                    <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full mt-1.5 ${
                      item.status === "escrow" ? "bg-[#FF8C00]/10" : "bg-[#00695C]/10"
                    }`}>
                      <Shield size={10} style={{ color: item.status === "escrow" ? "#FF8C00" : "#00695C" }} />
                      <span className="text-[9px] font-black uppercase tracking-wider" style={{ color: item.status === "escrow" ? "#FF8C00" : "#00695C" }}>
                        {item.status}
                      </span>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </section>
      </div>

      {/* ── Financial KYC Modal (Phase 2) ── */}
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

              <div className="mb-6">
                <div className="w-14 h-14 rounded-2xl bg-[#FF8C00]/10 flex items-center justify-center mb-4">
                  <Smartphone size={28} className="text-[#FF8C00]" />
                </div>
                <h2 className="text-2xl font-black text-[#0D1B3E] leading-tight" style={{ fontFamily: "Agrandir, sans-serif" }}>Financial Verification</h2>
                <p className="text-gray-500 text-[13px] font-medium mt-1">To process transactions, please link your mobile money account.</p>
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
                        <span className="text-[10px] font-bold text-[#0D1B3E]">{prov.shortName}</span>
                      </button>
                    ))}
                  </div>
                  <motion.button whileTap={{ scale: 0.96 }}
                    disabled={!mmProvider}
                    onClick={() => setMMStep("details")}
                    className={`w-full py-4 rounded-2xl font-bold text-white shadow-lg transition-all ${
                      mmProvider ? "bg-[#0D1B3E]" : "bg-gray-200 cursor-not-allowed text-gray-400 shadow-none"
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
                      <label className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-2 block">Payout Phone Number</label>
                      <div className="flex gap-2">
                        <div className="flex items-center gap-1.5 px-3 py-3 rounded-xl bg-gray-50 border border-gray-100">
                          <ZambiaFlag size={20} />
                          <span className="font-bold text-gray-400 text-[14px]">+260</span>
                        </div>
                        <input type="tel" value={mmPhone} onChange={(e) => { setMMPhone(e.target.value.replace(/\D/g, "").slice(0, 9)); setMMError(""); }} 
                          className="flex-1 px-4 py-3 rounded-xl bg-gray-50 border border-gray-100 font-bold text-[#0D1B3E] outline-none focus:ring-2 focus:ring-[#FF8C00]/30" placeholder="9X XXX XXXX" />
                      </div>
                    </div>
                    {mmError && <p className="text-red-500 text-[11px] font-bold text-center">{mmError}</p>}
                  </div>
                  <motion.button whileTap={{ scale: 0.96 }}
                    onClick={saveFinancialKyc}
                    className="w-full py-4 rounded-2xl bg-[#FF8C00] font-bold text-white shadow-lg shadow-[#FF8C00]/20">
                    Verify & Link
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
