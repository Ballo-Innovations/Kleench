import {
  ArrowDownToLine,
  ArrowUpFromLine,
  ArrowLeftRight,
  Coins,
  Shield,
  ShoppingBag,
  Tag,
  CheckCircle2,
  Eye,
  EyeOff,
  Share2,
  Trophy,
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { LottieIcon } from "../components/LottieIcon";
import adBanner from "@/assets/ads/Transaction Assurance.png";

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

const fadeUp = {
  initial: { opacity: 0, y: 22 },
  animate: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
  }),
};

export function Wallet() {
  const [showBalance, setShowBalance] = useState(true);
  const navigate = useNavigate();

  function grace(delay = 0) {
    return {
      duration: 0.62,
      delay,
      ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
    };
  }

  return (
    <div className="w-full max-w-md mx-auto pb-32 relative min-h-screen">
      
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

      {/* ── Orange hero header ── */}
      <div className="relative pt-8 pb-32 px-6 overflow-hidden rounded-b-[40px]"
        style={{ background: "linear-gradient(135deg, #FF8C00, #e06900)", boxShadow: "0 12px 40px rgba(255,140,0,0.15)" }}>
        
        {/* grid texture */}
        <div className="absolute inset-0 opacity-[0.1]">
          <svg width="100%" height="100%">
            <defs>
              <pattern id="wallet-grid" width="20" height="20" patternUnits="userSpaceOnUse">
                <path d="M 20 0 L 0 0 0 20" fill="none" stroke="white" strokeWidth="0.5"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#wallet-grid)"/>
          </svg>
        </div>

        <div className="relative z-10 space-y-2">
          <h1 className="text-white text-3xl font-black" style={{ fontFamily: "Agrandir, sans-serif" }}>Wallet</h1>
          <p className="text-white/70 text-[13px] font-medium">Manage your earnings &amp; escrow</p>
        </div>
      </div>

      <div className="px-5 -mt-16 relative z-10 space-y-10">
        
        {/* Balance Card */}
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={grace(0.1)}
          className="relative rounded-[32px] overflow-hidden p-8 bg-[#0D1B3E] shadow-2xl border border-white/10">
          
          <div className="relative z-10 flex flex-col items-center text-center">
            <span className="text-[10px] font-bold text-white/40 uppercase tracking-[0.2em] mb-4">Total Balance</span>
            <div className="flex items-center gap-4 mb-6">
              <h2 className="text-white text-5xl font-black tracking-tighter" style={{ fontFamily: "Agrandir, sans-serif" }}>
                {showBalance ? "$1,250.75" : "••••••"}
              </h2>
              <button 
                onClick={() => setShowBalance(!showBalance)}
                className="text-white/30 hover:text-white/60 transition-colors">
                {showBalance ? <Eye size={20} /> : <EyeOff size={20} />}
              </button>
            </div>

            <div className="flex gap-3 w-full">
              <motion.button whileTap={{ scale: 0.95 }}
                className="flex-1 bg-white/[0.08] hover:bg-white/[0.12] transition-colors py-4 rounded-2xl flex flex-col items-center gap-2 border border-white/10 font-bold text-white text-[12px]">
                <ArrowUpFromLine size={20} /> Withdraw
              </motion.button>
              <motion.button whileTap={{ scale: 0.95 }}
                className="flex-1 bg-[#FF8C00] hover:bg-[#FF8C00]/90 transition-colors py-4 rounded-2xl flex flex-col items-center gap-2 shadow-lg shadow-[#FF8C00]/20 font-bold text-white text-[12px]">
                <ArrowDownToLine size={20} /> Deposit
              </motion.button>
            </div>
          </div>
        </motion.div>

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
              { icon: ArrowLeftRight, label: "Send (P2P)", path: "/friends", color: "#00695C" },
              { icon: Coins, label: "Earn Gold", path: "/marketplace", color: "#FF8C00" },
            ].map((action, i) => (
              <motion.button
                key={action.label}
                whileTap={{ scale: 0.96 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={grace(0.3 + i * 0.1)}
                onClick={() => navigate(action.path)}
                className="bg-white p-6 rounded-[28px] shadow-sm border border-black/[0.03] flex flex-col items-center gap-3 transition-shadow hover:shadow-md"
              >
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center" style={{ backgroundColor: `${action.color}10` }}>
                  <action.icon size={22} style={{ color: action.color }} strokeWidth={2.5} />
                </div>
                <span className="font-bold text-[#0D1B3E] text-[13px]">{action.label}</span>
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
            {escrowItems.map((item, idx) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={grace(0.5 + idx * 0.08)}
                className="bg-white p-5 rounded-[28px] shadow-sm border border-black/[0.03] flex items-center justify-between"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-[#0D1B3E]/5 flex items-center justify-center">
                    <item.icon size={20} className="text-[#0D1B3E]" />
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
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
