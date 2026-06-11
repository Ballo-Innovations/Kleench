import { useNavigate, useLocation } from "react-router";
import { motion } from "motion/react";
import { ShoppingBag, ArrowRight, ChevronRight } from "lucide-react";
import { PageHeader } from "../components/PageHeader";

export function MarketOrderSummary() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const product = state?.product || { title: "Product", price: "0", image: null };
  const qty = state?.quantity || 1;
  const delivery = state?.delivery || "pickup";

  const subtotal = parseFloat(String(product.price).replace(/,/g, "")) * qty;
  const shipping = delivery === "pickup" ? 0 : delivery === "courier" ? 85 : 120;
  const tax = subtotal * 0.16;
  const total = subtotal + shipping + tax;

  return (
    <div className="w-full max-w-md mx-auto bg-transparent font-sans pb-24">
      <PageHeader title="ORDER SUMMARY" showBack />

      <div className="px-5 pt-5 space-y-5">
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
          className="bg-[var(--app-bg)] rounded-3xl border-[3px] border-[var(--app-text)] shadow-[6px_6px_0_var(--app-text)] overflow-hidden">
          <div className="bg-[var(--color-secondary)] px-5 py-3">
            <p className="text-[9px] font-black uppercase tracking-[0.3em] text-white/60">Order Item</p>
          </div>
          <div className="p-5 flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-[var(--border)]/30 overflow-hidden border border-[var(--border)] flex items-center justify-center shrink-0">
              {product.image
                ? <img src={product.image} alt={product.title} className="w-full h-full object-cover" />
                : <ShoppingBag size={24} className="text-[var(--color-secondary)]/40" />
              }
            </div>
            <div className="flex-1">
              <p className="text-[13px] font-black text-[var(--app-text)] uppercase tracking-wide leading-tight">{product.title}</p>
              <p className="text-[11px] font-semibold text-[var(--color-secondary)]/60 mt-0.5">Qty: {qty}</p>
            </div>
            <p className="text-[16px] font-black text-[var(--color-primary)]">K{subtotal.toLocaleString()}</p>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
          className="bg-[var(--app-bg)] rounded-3xl border-[3px] border-[var(--app-text)] shadow-[6px_6px_0_var(--app-text)] p-5 space-y-0">
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[var(--color-secondary)]/50 mb-3">Price Breakdown</p>
          {[
            { label: "Subtotal", value: `K${subtotal.toLocaleString()}` },
            { label: "Shipping", value: shipping === 0 ? "Free" : `K${shipping.toLocaleString()}` },
            { label: "VAT (16%)", value: `K${tax.toFixed(2)}` },
          ].map(({ label, value }) => (
            <div key={label} className="flex items-center justify-between py-3 border-b border-[var(--border)] last:border-0">
              <span className="text-[11px] font-semibold text-[var(--color-secondary)]/70">{label}</span>
              <span className="text-[12px] font-bold text-[var(--color-secondary)]">{value}</span>
            </div>
          ))}
          <div className="flex items-center justify-between pt-4 mt-1">
            <span className="text-[13px] font-black uppercase tracking-wide text-[var(--app-text)]">Total</span>
            <span className="text-[22px] font-black text-[var(--color-primary)]">K{total.toFixed(2)}</span>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
          className="bg-[var(--app-bg)] rounded-3xl border-[3px] border-[var(--app-text)] shadow-[6px_6px_0_var(--app-text)] p-5 space-y-3">
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[var(--color-secondary)]/50">Delivery Method</p>
          {[
            { id: "pickup", label: "Pickup", desc: "Collect from seller", price: "Free" },
            { id: "courier", label: "Courier", desc: "3–5 business days", price: "K85" },
            { id: "kleench", label: "KLeench Delivery", desc: "1–2 business days", price: "K120" },
          ].filter((d) => state?.availableDelivery?.includes(d.id) || true).map((d) => (
            <button key={d.id} onClick={() => navigate("/marketplace/order/summary", { state: { ...state, delivery: d.id } })}
              className={`w-full flex items-center justify-between px-4 py-3 rounded-xl border-2 transition-all ${delivery === d.id ? "border-[var(--color-primary)] bg-[var(--color-primary)]/8" : "border-[var(--border)]"}`}>
              <div>
                <p className={`text-[12px] font-black uppercase tracking-wide ${delivery === d.id ? "text-[var(--color-primary)]" : "text-[var(--color-secondary)]"}`}>{d.label}</p>
                <p className="text-[10px] font-semibold text-[var(--color-secondary)]/50">{d.desc}</p>
              </div>
              <p className={`text-[13px] font-black ${delivery === d.id ? "text-[var(--color-primary)]" : "text-[var(--color-secondary)]/60"}`}>{d.price}</p>
            </button>
          ))}
        </motion.div>
      </div>

      <div className="px-5 pt-4 pb-8">
        <button
          onClick={() => navigate("/marketplace/order/success", { state: { ...state, total, delivery } })}
          className="w-full py-4 rounded-2xl bg-[var(--color-primary)] text-white font-black uppercase tracking-widest text-[12px] flex items-center justify-center gap-3 shadow-md active:scale-95 transition-all"
        >
          Buy Now — K{total.toFixed(2)} <ArrowRight size={18} />
        </button>
      </div>
    </div>
  );
}
