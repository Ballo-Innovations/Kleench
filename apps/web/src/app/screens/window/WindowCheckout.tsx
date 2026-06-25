import { useState } from "react";
import { useNavigate, useLocation } from "react-router";
import { motion } from "motion/react";
import { Home, MapPin } from "lucide-react";
import { PageHeader } from "../../components/PageHeader";
import { CtaButton } from "../../components/CtaButton";
import { toast } from "sonner";
import { clearCart } from "../../data/windowShop";

const ADDRESSES = [
  { id: "home", label: "Home", line: "Plot 1234, Leopards Hill Road, New Kasama, Lusaka — Zambia" },
  { id: "work", label: "Work", line: "Suite 5, Cairo Business Park, Cairo Road, Lusaka — Zambia" },
];

export function WindowCheckout() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const [addressId, setAddressId] = useState("home");
  const [picking, setPicking] = useState(false);

  const subtotal = state?.subtotal ?? 0;
  const delivery = state?.delivery;
  const total = state?.total ?? subtotal;
  const address = ADDRESSES.find((a) => a.id === addressId) || ADDRESSES[0];

  const payNow = () => {
    const orderId = `Ord-${new Date().getFullYear()}-${Date.now().toString().slice(-8)}`;
    clearCart();
    navigate("/marketplace/window/success", { state: { orderId, total, address } });
  };

  return (
    <div className="w-full max-w-md mx-auto bg-transparent font-sans pb-24">
      <PageHeader title="CHECKOUT" subtitle="Window Shopping" showBack />

      <div className="px-5 pt-5 space-y-4">
        {/* Address */}
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
          className="bg-[var(--app-bg)] border border-[var(--border)] rounded-2xl shadow-sm p-4">
          <div className="flex items-start gap-3">
            <div className="w-11 h-11 rounded-2xl bg-[var(--color-secondary)] flex items-center justify-center shrink-0">
              <Home size={18} className="text-white" strokeWidth={2} />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <p className="text-[12px] font-black text-[var(--app-text)] uppercase tracking-wide">{address.label}</p>
                <button onClick={() => setPicking(!picking)} className="text-[10px] font-black uppercase tracking-widest text-[var(--color-primary)]">Change</button>
              </div>
              <p className="text-[10px] font-semibold text-[var(--color-secondary)]/60 leading-snug mt-0.5">{address.line}</p>
            </div>
          </div>
          {picking && (
            <div className="mt-3 pt-3 border-t border-[var(--border)] space-y-2">
              {ADDRESSES.map((a) => (
                <button key={a.id} onClick={() => { setAddressId(a.id); setPicking(false); }}
                  className={`w-full flex items-start gap-2.5 p-3 rounded-xl border text-left transition-all ${addressId === a.id ? "border-[var(--color-primary)] bg-[var(--color-primary)]/6" : "border-[var(--border)]"}`}>
                  <MapPin size={13} className={addressId === a.id ? "text-[var(--color-primary)] mt-0.5" : "text-[var(--color-secondary)]/40 mt-0.5"} strokeWidth={2.5} />
                  <div>
                    <p className="text-[11px] font-black text-[var(--app-text)] uppercase tracking-wide">{a.label}</p>
                    <p className="text-[9px] font-semibold text-[var(--color-secondary)]/50 leading-snug">{a.line}</p>
                  </div>
                </button>
              ))}
            </div>
          )}
        </motion.div>

        {/* Order summary */}
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
          className="bg-[var(--app-bg)] border border-[var(--border)] rounded-2xl shadow-sm overflow-hidden">
          <div className="bg-[var(--color-secondary)]/8 px-4 py-3 border-b border-[var(--border)]">
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[var(--color-secondary)]/50">Order Summary</p>
          </div>
          <div className="p-4">
            {delivery && (
              <div className="flex items-center justify-between py-2 border-b border-[var(--border)]">
                <div>
                  <p className="text-[11px] font-black text-[var(--app-text)] uppercase tracking-wide">{delivery.provider}</p>
                  <p className="text-[9px] font-semibold text-[var(--color-secondary)]/50">{delivery.area}</p>
                </div>
                <span className="text-[12px] font-black text-[var(--color-primary)]">{delivery.fee ? `ZMW ${delivery.fee.toLocaleString()}` : "Free"}</span>
              </div>
            )}
            <div className="flex items-center justify-between py-2.5 border-b border-[var(--border)]">
              <span className="text-[11px] font-semibold text-[var(--color-secondary)]/70">Subtotal</span>
              <span className="text-[12px] font-bold text-[var(--color-secondary)]">ZMW {subtotal.toLocaleString()}</span>
            </div>
            <div className="flex items-center justify-between pt-3">
              <span className="text-[13px] font-black uppercase tracking-wide text-[var(--app-text)]">Total</span>
              <span className="text-[20px] font-black text-[var(--color-primary)]">ZMW {total.toLocaleString()}</span>
            </div>
          </div>
        </motion.div>
      </div>

      <div className="px-5 pt-4 pb-8">
        <CtaButton onClick={payNow}>Pay Now — ZMW {total.toLocaleString()}</CtaButton>
      </div>
    </div>
  );
}
