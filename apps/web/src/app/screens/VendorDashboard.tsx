import { useNavigate, useLocation } from "react-router";
import { motion } from "motion/react";
import { TrendingUp, Package, ShoppingCart, Star, Plus, BarChart2, Settings, Bell, MessageCircle } from "lucide-react";
import { PageHeader } from "../components/PageHeader";

const STATS = [
  { label: "Total Sales", value: "ZMW 0.00", icon: TrendingUp, color: "#0077B6" },
  { label: "Products", value: "0", icon: Package, color: "#7C3AED" },
  { label: "Orders", value: "0", icon: ShoppingCart, color: "#059669" },
  { label: "Rating", value: "—", icon: Star, color: "#D97706" },
];

const QUICK_ACTIONS = [
  { label: "Add Product", icon: Plus, color: "#FF8C00", to: "/sell" },
  { label: "Analytics", icon: BarChart2, color: "#0077B6", to: "#" },
  { label: "Messages", icon: MessageCircle, color: "#7C3AED", to: "/messages" },
  { label: "Settings", icon: Settings, color: "#64748B", to: "/settings" },
];

export function VendorDashboard() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const info = state?.vendorInfo || {};
  const businessName = info.businessName || "My Business";
  const isPending = true;

  return (
    <div className="w-full max-w-md mx-auto min-h-screen bg-transparent font-sans pb-32">
      <PageHeader title="VENDOR DASHBOARD" showBack />

      <div className="px-5 pt-6 space-y-5">
        {/* Status Banner */}
        {isPending && (
          <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }}
            className="bg-amber-50 border-2 border-amber-300 rounded-2xl p-4 flex items-center gap-3">
            <div className="w-3 h-3 rounded-full bg-amber-400 animate-pulse shrink-0" />
            <div>
              <p className="text-[11px] font-black uppercase tracking-wide text-amber-800">Application Under Review</p>
              <p className="text-[10px] font-semibold text-amber-700/70 leading-snug">
                Your vendor account will be activated within 2–3 business days.
              </p>
            </div>
          </motion.div>
        )}

        {/* Wallet Card */}
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-br from-[var(--color-secondary)] to-[#1a3a6e] rounded-3xl p-5 text-white shadow-lg border border-white/10 relative overflow-hidden">
          <div className="absolute inset-0 opacity-[0.08]">
            <svg width="100%" height="100%">
              <defs><pattern id="vdot" width="20" height="20" patternUnits="userSpaceOnUse"><circle cx="10" cy="10" r="1" fill="white" /></pattern></defs>
              <rect width="100%" height="100%" fill="url(#vdot)" />
            </svg>
          </div>
          <div className="relative z-10">
            <p className="text-[9px] font-black uppercase tracking-[0.3em] text-white/50 mb-1">Vendor Wallet</p>
            <h3 className="font-black text-[28px] leading-none mb-1">ZMW 0.00</h3>
            <p className="text-[11px] font-semibold text-white/60">{businessName}</p>
            <div className="flex items-center gap-2 mt-4">
              <div className="bg-white/10 rounded-full px-3 py-1.5 border border-white/20">
                <span className="text-[9px] font-black uppercase tracking-widest text-white/70">
                  {isPending ? "Pending Approval" : "Active Vendor"}
                </span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-3">
          {STATS.map(({ label, value, icon: Icon, color }, i) => (
            <motion.div key={label} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }}
              className="bg-[var(--app-bg)] rounded-2xl p-4 border-2 border-[var(--border)] shadow-sm">
              <div className="w-9 h-9 rounded-xl flex items-center justify-center mb-3" style={{ backgroundColor: color + "15" }}>
                <Icon size={18} strokeWidth={1.5} style={{ color }} />
              </div>
              <p className="font-black text-[16px] text-[var(--color-secondary)] leading-none mb-1">{value}</p>
              <p className="text-[10px] font-black uppercase tracking-wide text-[var(--color-secondary)]/50">{label}</p>
            </motion.div>
          ))}
        </div>

        {/* Quick Actions */}
        <div>
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[var(--color-secondary)]/40 mb-3">Quick Actions</p>
          <div className="grid grid-cols-4 gap-3">
            {QUICK_ACTIONS.map(({ label, icon: Icon, color, to }, i) => (
              <motion.button key={label} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.1 + i * 0.05 }}
                onClick={() => to !== "#" && navigate(to)}
                className="flex flex-col items-center gap-2 active:scale-90 transition-all">
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center border-2 border-[var(--border)] bg-[var(--app-bg)] shadow-sm"
                  style={{ backgroundColor: color + "12", borderColor: color + "30" }}>
                  <Icon size={22} style={{ color }} strokeWidth={1.5} />
                </div>
                <span className="text-[8px] font-black uppercase tracking-wide text-[var(--color-secondary)]/60 text-center leading-tight">{label}</span>
              </motion.button>
            ))}
          </div>
        </div>

        {/* Application Info */}
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
          className="bg-[var(--app-bg)] rounded-2xl border-2 border-[var(--border)] overflow-hidden">
          <div className="px-4 py-3 border-b border-[var(--border)]">
            <span className="text-[10px] font-black uppercase tracking-widest text-[var(--color-secondary)]">Application Details</span>
          </div>
          <div className="px-4 py-2">
            {[
              { label: "Business", value: businessName },
              { label: "Sector", value: info.sector || "—" },
              { label: "Province", value: info.province || "—" },
              { label: "Email", value: info.email || "—" },
            ].map(({ label, value }) => (
              <div key={label} className="flex items-center justify-between py-2.5 border-b border-[var(--border)] last:border-0">
                <span className="text-[10px] font-black uppercase tracking-wide text-[var(--color-secondary)]/50">{label}</span>
                <span className="text-[12px] font-semibold text-[var(--color-secondary)]">{value}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
