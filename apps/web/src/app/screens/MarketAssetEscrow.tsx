import { useNavigate, useLocation, useParams } from "react-router";
import { motion } from "motion/react";
import { Shield, CheckCircle, Clock, Package, Truck, Home, ShieldCheck } from "lucide-react";
import { PageHeader } from "../components/PageHeader";
import { CtaButton } from "../components/CtaButton";

const STEPS = [
  { id: "secured", label: "Payment Secured", desc: "Funds held in KLeench Escrow", icon: Shield, done: true },
  { id: "delivery", label: "Awaiting Delivery", desc: "Seller preparing asset for handover", icon: Truck, done: false, active: true },
  { id: "delivered", label: "Delivered", desc: "Asset received and inspected", icon: Package, done: false },
  { id: "released", label: "Payment Released", desc: "Funds released to seller", icon: CheckCircle, done: false },
];

export function MarketAssetEscrow() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { state } = useLocation();
  const asset = state?.asset || { name: "Asset" };
  const deposit = state?.deposit || 0;
  const escrowRef = `ESC-${Date.now().toString().slice(-8)}`;

  return (
    <div className="w-full max-w-md mx-auto bg-transparent font-sans pb-24">
      <PageHeader title="ESCROW TRACKING" showBack />

      <div className="px-5 pt-5 space-y-5">
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
          className="bg-[var(--app-bg)] rounded-3xl border-[3px] border-[var(--app-text)] shadow-[6px_6px_0_var(--app-text)] overflow-hidden">
          <div className="bg-[var(--color-secondary)] px-5 py-4 flex items-center justify-between">
            <div>
              <p className="text-[9px] font-black uppercase tracking-[0.3em] text-white/50">Escrow Reference</p>
              <p className="text-[16px] font-black text-white tracking-wider">{escrowRef}</p>
            </div>
            <div className="bg-[var(--color-primary)]/20 border border-[var(--color-primary)]/40 px-3 py-1.5 rounded-full flex items-center gap-1.5">
              <div className="w-1.5 h-1.5 rounded-full bg-[var(--color-primary)] animate-pulse" />
              <span className="text-[9px] font-black uppercase tracking-widest text-[var(--color-primary)]">Active</span>
            </div>
          </div>
          <div className="px-5 py-4 space-y-0">
            {[
              { label: "Asset", value: asset.name || "—" },
              { label: "Deposit Secured", value: `K${deposit.toLocaleString()}` },
              { label: "Protected By", value: "KLeench Escrow" },
            ].map(({ label, value }) => (
              <div key={label} className="flex items-center justify-between py-2.5 border-b border-[var(--border)] last:border-0">
                <span className="text-[10px] font-black uppercase tracking-wide text-[var(--color-secondary)]/50">{label}</span>
                <span className="text-[12px] font-bold text-[var(--color-secondary)]">{value}</span>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
          className="bg-[var(--app-bg)] rounded-3xl border-[3px] border-[var(--app-text)] shadow-[6px_6px_0_var(--app-text)] p-5 space-y-5">
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[var(--color-secondary)]/50">Transaction Timeline</p>
          <div className="space-y-4">
            {STEPS.map((step, i) => {
              const Icon = step.icon;
              const color = step.done ? "#059669" : step.active ? "var(--color-primary)" : "var(--color-secondary)";
              const isLast = i === STEPS.length - 1;
              return (
                <div key={step.id} className="relative flex gap-4">
                  {!isLast && (
                    <div className={`absolute left-5 top-10 bottom-0 w-0.5 ${step.done ? "bg-[#059669]/30" : "bg-[var(--border)]"}`} style={{ height: "calc(100% + 16px)" }} />
                  )}
                  <div className="w-10 h-10 rounded-full flex items-center justify-center shrink-0 z-10 border-2"
                    style={{ backgroundColor: color + "18", borderColor: color + "40" }}>
                    <Icon size={18} style={{ color }} strokeWidth={2} />
                  </div>
                  <div className="flex-1 pt-1">
                    <div className="flex items-center gap-2">
                      <p className="text-[12px] font-black uppercase tracking-wide" style={{ color }}>{step.label}</p>
                      {step.done && <CheckCircle size={12} color="#059669" strokeWidth={2.5} />}
                      {step.active && <Clock size={12} color="var(--color-primary)" strokeWidth={2.5} />}
                    </div>
                    <p className="text-[10px] font-semibold text-[var(--color-secondary)]/50 mt-0.5">{step.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
          className="bg-[#059669]/8 border-2 border-[#059669]/20 rounded-2xl p-4 flex gap-3">
          <Shield size={18} className="text-[#059669] shrink-0 mt-0.5" strokeWidth={2} />
          <p className="text-[11px] font-semibold text-[var(--color-secondary)]/70 leading-snug">
            Your funds are secure. Payment will only be released to the seller once you confirm receipt of the asset.
          </p>
        </motion.div>
      </div>

        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
          className="bg-[#059669]/8 border-2 border-[#059669]/20 rounded-2xl p-4 flex gap-3">
          <ShieldCheck size={18} className="text-[#059669] shrink-0 mt-0.5" strokeWidth={2} />
          <p className="text-[11px] font-semibold text-[var(--color-secondary)]/70 leading-snug">
            Your deposit is held securely in escrow. Payment is only released to the seller once you <span className="font-black text-[var(--app-text)]">confirm receipt</span> of the asset.
          </p>
        </motion.div>

      <div className="px-5 pt-4 pb-8 space-y-3">
        <CtaButton onClick={() => navigate("/marketplace")}><Package size={18} strokeWidth={2} /> View Order</CtaButton>
        <button onClick={() => navigate("/")}
          className="w-full py-4 rounded-2xl border-2 border-[var(--border)] bg-[var(--app-bg)] text-[var(--color-secondary)] font-black uppercase tracking-widest text-[12px] flex items-center justify-center gap-3 active:scale-95 transition-all">
          <Home size={18} strokeWidth={2} />
          Back Home
        </button>
      </div>
    </div>
  );
}
