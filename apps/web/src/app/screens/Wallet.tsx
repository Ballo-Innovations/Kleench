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
import { motion } from "motion/react";
import { useState } from "react";
import { Link, useNavigate } from "react-router";

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

  return (
    <div className="w-full max-w-md mx-auto pb-4">
      {/* Page Header */}
      <motion.div
        custom={0}
        variants={fadeUp}
        initial="initial"
        animate="animate"
        className="flex items-center justify-between pt-2 pb-4"
      >
        <h1 className="font-[var(--font-header)] font-bold text-[var(--ink-primary)] tracking-tight"
            style={{ fontSize: "1.25rem" }}>
          Wallet &amp; Assurance
        </h1>
        <div className="w-9 h-9 rounded-full bg-[var(--trust-blue)]/10 flex items-center justify-center">
          <Shield size={18} className="text-[var(--trust-blue)]" strokeWidth={2} />
        </div>
      </motion.div>

      {/* Balance Card */}
      <motion.div
        custom={1}
        variants={fadeUp}
        initial="initial"
        animate="animate"
        className="mb-5"
      >
        <div className="relative rounded-2xl overflow-hidden p-6 bg-gradient-to-br from-[var(--trust-blue)] via-[var(--trust-blue-dark)] to-[#004d73] shadow-lg">
          {/* Noise texture */}
          <div className="absolute inset-0 noise" />
          {/* Ambient blobs */}
          <div className="absolute -right-8 -top-8 w-32 h-32 bg-white opacity-[0.06] rounded-full blur-[30px]" />
          <div className="absolute -left-8 -bottom-8 w-24 h-24 bg-[var(--action-gold)] opacity-[0.06] rounded-full blur-[30px]" />

          <div className="relative z-10 flex flex-col items-center text-center">
            <p className="text-[9px] font-[var(--font-body)] text-white/70 uppercase tracking-[0.2em] mb-1 font-medium">
              Available Balance
            </p>
            <div className="flex items-center gap-2 mb-3">
              <h2 className="font-[var(--font-header)] font-bold text-white tracking-tighter"
                  style={{ fontSize: "2.5rem", lineHeight: 1 }}>
                {showBalance ? "$1,250.75" : "••••••"}
              </h2>
              <button
                onClick={() => setShowBalance(!showBalance)}
                className="text-white/50 hover:text-white/80 transition-colors mt-1"
              >
                {showBalance ? <Eye size={14} /> : <EyeOff size={14} />}
              </button>
            </div>

            {/* Escrow pill */}
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 border border-white/15 backdrop-blur-md">
              <Shield size={10} className="text-[var(--action-gold)]" strokeWidth={2.5} />
              <span className="text-[10px] font-[var(--font-body)] font-medium text-white">
                Pending Escrow:{" "}
                <span className="font-bold text-[var(--action-gold)]">$450.00</span>
              </span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Action Grid 2×2 */}
      <motion.div
        custom={2}
        variants={fadeUp}
        initial="initial"
        animate="animate"
        className="mb-5"
      >
        <div className="grid grid-cols-2 gap-2.5">
          {[
            { icon: ArrowDownToLine, label: "Deposit", gold: false, path: "/settings" },
            { icon: ArrowUpFromLine, label: "Withdraw", gold: false, path: "/settings" },
            { icon: ArrowLeftRight, label: "Send (P2P)", gold: false, path: "/friends" },
            { icon: Coins, label: "Earn Gold", gold: true, path: "/marketplace" },
          ].map((action) => (
            <motion.button
              key={action.label}
              whileTap={{ scale: 0.94 }}
              onClick={() => navigate(action.path)}
              className={`flex flex-col items-center justify-center gap-2 p-3 rounded-xl shadow-sm border ${
                action.gold
                  ? "bg-[var(--action-gold)]/15 border-[var(--action-gold)]/25 hover:bg-[var(--action-gold)]/20"
                  : "bg-white border-black/[0.04] hover:bg-[var(--surface-raised)]"
              } transition-colors`}
            >
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  action.gold
                    ? "bg-white/50"
                    : "bg-[var(--surface-raised)]"
                }`}
              >
                <action.icon
                  size={18}
                  className={action.gold ? "text-[var(--action-gold-dark)]" : "text-[var(--trust-blue)]"}
                  strokeWidth={2}
                />
              </div>
              <span
                className={`text-[10px] font-[var(--font-body)] font-semibold ${
                  action.gold ? "text-[var(--action-gold-dark)]" : "text-[var(--ink-primary)]"
                }`}
              >
                {action.label}
              </span>
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* Recent Escrow */}
      <motion.div
        custom={3}
        variants={fadeUp}
        initial="initial"
        animate="animate"
        className="mb-5"
      >
        <div className="flex items-center justify-between mb-2.5">
          <h3 className="font-[var(--font-header)] font-bold text-[var(--ink-primary)]"
              style={{ fontSize: "0.95rem" }}>
            Recent Escrow
          </h3>
          <Link to="/marketplace" className="text-[10px] font-[var(--font-body)] font-medium text-[var(--trust-blue)] hover:opacity-75 transition-opacity">
            View All
          </Link>
        </div>

        <div className="rounded-xl overflow-hidden border border-black/[0.04] bg-[var(--surface-raised)] shadow-sm">
          {escrowItems.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.4 + idx * 0.08 }}
              className={`flex items-center justify-between px-3 py-3 bg-white ${
                idx < escrowItems.length - 1 ? "border-b border-black/[0.04]" : ""
              }`}
            >
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-full bg-[var(--surface-raised)] flex items-center justify-center">
                  <item.icon size={16} className="text-[var(--trust-blue)]" strokeWidth={1.8} />
                </div>
                <div>
                  <p className="text-xs font-[var(--font-body)] font-semibold text-[var(--ink-primary)]">
                    {item.title}
                  </p>
                  <p className="text-[9px] font-[var(--font-body)] text-[var(--ink-muted)] mt-0.5">
                    {item.subtitle}
                  </p>
                </div>
              </div>

              <div className="flex flex-col items-end gap-0.5">
                <p
                  className={`text-xs font-[var(--font-body)] font-bold ${
                    item.amount > 0 ? "text-[var(--trust-blue)]" : "text-[var(--ink-primary)]"
                  }`}
                >
                  {item.amount > 0 ? "+" : ""}${Math.abs(item.amount).toFixed(2)}
                </p>
                {item.status === "escrow" ? (
                  <div className="flex items-center gap-1 px-1.5 py-0.5 rounded-full bg-[var(--trust-blue)]/10">
                    <Shield size={8} className="text-[var(--trust-blue)]" />
                    <span className="text-[8px] font-[var(--font-body)] font-semibold text-[var(--trust-blue)] uppercase tracking-wider">
                      Escrow
                    </span>
                  </div>
                ) : (
                  <div className="flex items-center gap-1 px-1.5 py-0.5 rounded-full bg-emerald-50">
                    <CheckCircle2 size={8} className="text-emerald-600" />
                    <span className="text-[8px] font-[var(--font-body)] font-semibold text-emerald-600 uppercase tracking-wider capitalize">
                      {item.status}
                    </span>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Referral Impact */}
      <motion.div
        custom={4}
        variants={fadeUp}
        initial="initial"
        animate="animate"
      >
        <div className="rounded-xl overflow-hidden bg-[var(--surface-raised)] border border-black/[0.04] shadow-sm p-4">
          {/* Section header */}
          <div className="flex items-center gap-2.5 mb-3">
            <div className="w-8 h-8 rounded-full bg-[var(--action-gold)]/20 flex items-center justify-center">
              <Trophy size={14} className="text-[var(--action-gold-dark)]" strokeWidth={2} />
            </div>
            <h3 className="font-[var(--font-header)] font-bold text-[var(--ink-primary)]"
                style={{ fontSize: "0.9rem" }}>
              Referral Impact
            </h3>
          </div>

          {/* Stats grid */}
          <div className="grid grid-cols-2 gap-3 mb-3">
            <div className="flex flex-col gap-0.5">
              <p className="text-[9px] font-[var(--font-body)] text-[var(--ink-muted)] font-medium">
                Action Gold Earned
              </p>
              <p className="font-[var(--font-header)] font-bold text-[var(--action-gold-dark)]"
                 style={{ fontSize: "1.4rem", lineHeight: 1.1 }}>
                2,450
              </p>
            </div>
            <div className="flex flex-col gap-0.5">
              <p className="text-[9px] font-[var(--font-body)] text-[var(--ink-muted)] font-medium">
                Verified Signups
              </p>
              <p className="font-[var(--font-header)] font-bold text-[var(--ink-primary)]"
                 style={{ fontSize: "1.4rem", lineHeight: 1.1 }}>
                14
              </p>
            </div>
          </div>

          {/* Share button */}
          <motion.button
            whileTap={{ scale: 0.96 }}
            onClick={() => navigate("/friends")}
            className="w-full py-2.5 rounded-xl bg-[var(--trust-blue)] text-white flex items-center justify-center gap-2 shadow-sm hover:opacity-90 transition-opacity"
          >
            <Share2 size={14} strokeWidth={2.2} />
            <span className="text-[11px] font-[var(--font-body)] font-semibold tracking-wide">
              Share Referral Link
            </span>
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
}
