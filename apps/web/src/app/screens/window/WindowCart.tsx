import { useState } from "react";
import { useNavigate } from "react-router";
import { motion } from "motion/react";
import { Minus, Plus, Trash2, ShoppingBag, Truck } from "lucide-react";
import { PageHeader } from "../../components/PageHeader";
import { ImageWithFallback } from "../../components/figma/ImageWithFallback";
import { CtaButton } from "../../components/CtaButton";
import { cartDetailed, setQty, removeFromCart } from "../../data/windowShop";

const DELIVERY_OPTIONS = [
  { id: "yango-newkasama", provider: "Yango", area: "New Kasama", fee: 450 },
  { id: "yango-woodlands", provider: "Yango", area: "Woodlands", fee: 380 },
  { id: "ulendo-town", provider: "Ulendo", area: "Town Centre", fee: 250 },
  { id: "pickup", provider: "Self Pickup", area: "Collect from store", fee: 0 },
];

const PAY_METHODS = ["Visa", "Mastercard", "Airtel", "MTN", "DPO"];

export function WindowCart() {
  const navigate = useNavigate();
  const [items, setItems] = useState(cartDetailed());
  const [deliveryId, setDeliveryId] = useState("");

  const refresh = () => setItems(cartDetailed());
  const changeQty = (id: string, qty: number) => { setQty(id, qty); refresh(); };
  const remove = (id: string) => { removeFromCart(id); refresh(); };

  const delivery = DELIVERY_OPTIONS.find((d) => d.id === deliveryId);
  const subtotal = items.reduce((sum, it) => sum + it.price * it.qty, 0);
  const deliveryFee = delivery?.fee ?? 0;
  const total = subtotal + deliveryFee;
  const count = items.reduce((n, it) => n + it.qty, 0);

  const proceed = () => {
    navigate("/marketplace/window/checkout", {
      state: { items, subtotal, delivery, total },
    });
  };

  if (items.length === 0) {
    return (
      <div className="w-full max-w-md mx-auto bg-transparent font-sans pb-24">
        <PageHeader title="ADD TO CART" subtitle="Window Shopping" showBack />
        <div className="px-5 pt-24 flex flex-col items-center gap-4 text-center">
          <div className="w-20 h-20 rounded-full bg-[var(--color-secondary)]/8 flex items-center justify-center">
            <ShoppingBag size={32} className="text-[var(--color-secondary)]/40" strokeWidth={1.5} />
          </div>
          <p className="text-[14px] font-black text-[var(--app-text)] uppercase tracking-tight">Your cart is empty</p>
          <p className="text-[11px] font-semibold text-[var(--color-secondary)]/50 max-w-[70%]">Browse the window and add items you love to your cart.</p>
          <button onClick={() => navigate("/marketplace/window")}
            className="mt-2 px-5 py-3 rounded-full bg-[var(--color-secondary)] text-white text-[11px] font-black uppercase tracking-widest active:scale-95 transition-all">
            Start Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-md mx-auto bg-transparent font-sans pb-24">
      <PageHeader title="ADD TO CART" subtitle={`${count} item${count !== 1 ? "s" : ""}`} showBack />

      <div className="px-5 pt-5 space-y-4">
        {/* Items */}
        <div className="space-y-3">
          {items.map((it) => (
            <motion.div key={it.id} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-3 p-3 bg-[var(--app-bg)] border border-[var(--border)] rounded-2xl shadow-sm">
              <div className="w-14 h-14 rounded-xl overflow-hidden border border-[var(--border)] bg-[var(--muted)] shrink-0">
                <ImageWithFallback src={it.image} alt={it.name} className="w-full h-full object-cover" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[12px] font-black text-[var(--app-text)] uppercase tracking-wide leading-tight line-clamp-1">{it.name}</p>
                <p className="text-[13px] font-black text-[var(--color-primary)] mt-0.5">K{it.price.toLocaleString()}</p>
              </div>
              <div className="flex items-center gap-1.5 shrink-0">
                <button onClick={() => changeQty(it.id, it.qty - 1)} className="w-7 h-7 rounded-lg border border-[var(--border)] flex items-center justify-center active:scale-90 transition-all">
                  <Minus size={13} className="text-[var(--color-secondary)]" strokeWidth={2.5} />
                </button>
                <span className="text-[13px] font-black text-[var(--app-text)] w-5 text-center">{it.qty}</span>
                <button onClick={() => changeQty(it.id, it.qty + 1)} className="w-7 h-7 rounded-lg border border-[var(--border)] flex items-center justify-center active:scale-90 transition-all">
                  <Plus size={13} className="text-[var(--color-secondary)]" strokeWidth={2.5} />
                </button>
                <button onClick={() => remove(it.id)} className="w-7 h-7 rounded-lg bg-[#DC2626]/8 flex items-center justify-center active:scale-90 transition-all ml-0.5">
                  <Trash2 size={13} className="text-[#DC2626]" strokeWidth={2} />
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Delivery location */}
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
          className="bg-[var(--app-bg)] border border-[var(--border)] rounded-2xl shadow-sm p-4 space-y-3">
          <div className="flex items-center gap-2">
            <Truck size={14} className="text-[var(--color-secondary)]" strokeWidth={2} />
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[var(--color-secondary)]/50">Delivery Location</p>
          </div>
          <select value={deliveryId} onChange={(e) => setDeliveryId(e.target.value)}
            className="w-full border border-[var(--border)] rounded-xl px-4 py-3 text-[13px] font-semibold text-[var(--app-text)] bg-[var(--app-bg)] outline-none focus:border-[var(--color-primary)] transition-all">
            <option value="">Select location…</option>
            {DELIVERY_OPTIONS.map((d) => (
              <option key={d.id} value={d.id}>{d.provider} — {d.area} {d.fee ? `(K${d.fee})` : "(Free)"}</option>
            ))}
          </select>
          {delivery && (
            <div className="flex items-center justify-between pt-1">
              <div>
                <p className="text-[11px] font-black text-[var(--app-text)] uppercase tracking-wide">{delivery.provider}</p>
                <p className="text-[10px] font-semibold text-[var(--color-secondary)]/50">{delivery.area}</p>
              </div>
              <p className="text-[13px] font-black text-[var(--color-primary)]">{delivery.fee ? `ZMW ${delivery.fee}` : "Free"}</p>
            </div>
          )}
        </motion.div>

        {/* Payment methods */}
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
          className="bg-[var(--app-bg)] border border-[var(--border)] rounded-2xl shadow-sm p-4 space-y-3">
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[var(--color-secondary)]/50">Method of Delivery</p>
          <div className="flex flex-wrap gap-2">
            {PAY_METHODS.map((m) => (
              <div key={m} className="px-3 py-1.5 rounded-lg border border-[var(--border)] bg-[var(--muted)] text-[9px] font-black uppercase tracking-widest text-[var(--color-secondary)]/60">{m}</div>
            ))}
          </div>
        </motion.div>

        {/* Totals */}
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
          className="bg-[var(--app-bg)] border border-[var(--border)] rounded-2xl shadow-sm p-4">
          {[
            { label: `Subtotal (${count} item${count !== 1 ? "s" : ""})`, value: `ZMW ${subtotal.toLocaleString()}` },
            { label: "Delivery Fee", value: delivery ? (delivery.fee ? `ZMW ${delivery.fee.toLocaleString()}` : "Free") : "—" },
          ].map(({ label, value }) => (
            <div key={label} className="flex items-center justify-between py-2 border-b border-[var(--border)] last:border-0">
              <span className="text-[11px] font-semibold text-[var(--color-secondary)]/70">{label}</span>
              <span className="text-[12px] font-bold text-[var(--color-secondary)]">{value}</span>
            </div>
          ))}
          <div className="flex items-center justify-between pt-3">
            <span className="text-[13px] font-black uppercase tracking-wide text-[var(--app-text)]">Total</span>
            <span className="text-[20px] font-black text-[var(--color-primary)]">ZMW {total.toLocaleString()}</span>
          </div>
        </motion.div>
      </div>

      <div className="px-5 pt-4 pb-8">
        <CtaButton onClick={proceed} disabled={!delivery}>Proceed to Checkout</CtaButton>
      </div>
    </div>
  );
}
