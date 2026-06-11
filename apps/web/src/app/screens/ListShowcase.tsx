import { useState } from "react";
import { useNavigate, useLocation } from "react-router";
import { motion, AnimatePresence } from "motion/react";
import { ArrowRight, Plus, X, Package, Briefcase } from "lucide-react";
import { PageHeader } from "../components/PageHeader";

interface ShowcaseItem { type: "product" | "service"; name: string; price: string; desc: string }

export function ListShowcase() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const isPriority = state?.listingType === "priority";
  const totalSteps = isPriority ? 10 : 8;
  const stepIndex = isPriority ? 8 : 6;

  const [items, setItems] = useState<ShowcaseItem[]>([]);
  const [addingType, setAddingType] = useState<"product" | "service" | null>(null);
  const [newName, setNewName] = useState("");
  const [newPrice, setNewPrice] = useState("");
  const [newDesc, setNewDesc] = useState("");

  const saveItem = () => {
    if (!newName.trim() || !addingType) return;
    setItems((prev) => [...prev, { type: addingType, name: newName, price: newPrice, desc: newDesc }]);
    setAddingType(null);
    setNewName(""); setNewPrice(""); setNewDesc("");
  };

  const removeItem = (i: number) => setItems((prev) => prev.filter((_, idx) => idx !== i));

  return (
    <div className="w-full max-w-md mx-auto bg-transparent font-sans pb-24">
      <PageHeader title="LIST YOUR BUSINESS" subtitle={`Step ${stepIndex} — Products & Services`} showBack />

      <div className="px-5 pt-5 space-y-5">
        <div className="flex gap-1.5">
          {Array.from({ length: totalSteps }).map((_, i) => (
            <div key={i} className={`h-1.5 flex-1 rounded-full ${i < stepIndex ? "bg-[var(--color-primary)]" : "bg-[var(--border)]"}`} />
          ))}
        </div>

        <div className="flex items-start gap-3 bg-[var(--color-primary)]/8 border border-[var(--color-primary)]/20 rounded-2xl px-4 py-3">
          <Package size={15} className="text-[var(--color-primary)] shrink-0 mt-0.5" strokeWidth={2} />
          <p className="text-[11px] font-semibold text-[var(--color-secondary)]/70 leading-snug">
            Showcase what your business offers. This is your profile content, not a marketplace listing.
          </p>
        </div>

        {items.length > 0 && (
          <div className="space-y-2.5">
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[var(--color-secondary)]/50">Your Showcase ({items.length})</p>
            <AnimatePresence>
              {items.map((item, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -4 }}
                  className="flex items-center gap-3 bg-[var(--app-bg)] border border-[var(--border)] rounded-xl shadow-sm px-4 py-3">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${item.type === "product" ? "bg-[var(--color-primary)]/12" : "bg-[var(--color-secondary)]/10"}`}>
                    {item.type === "product" ? <Package size={14} color="var(--color-primary)" strokeWidth={2} /> : <Briefcase size={14} color="var(--color-secondary)" strokeWidth={2} />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[12px] font-black text-[var(--app-text)] uppercase truncate">{item.name}</p>
                    {item.price && <p className="text-[10px] font-bold text-[var(--color-primary)]">K{item.price}</p>}
                  </div>
                  <button onClick={() => removeItem(i)} className="w-6 h-6 rounded-full bg-[var(--border)]/40 flex items-center justify-center shrink-0 active:scale-90 transition-all">
                    <X size={11} className="text-[var(--color-secondary)]/60" strokeWidth={2.5} />
                  </button>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}

        {addingType ? (
          <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}
            className="bg-[var(--app-bg)] border border-[var(--color-primary)]/30 rounded-2xl shadow-sm p-4 space-y-3">
            <div className="flex items-center justify-between">
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[var(--color-primary)]">
                Add {addingType === "product" ? "Product" : "Service"}
              </p>
              <button onClick={() => setAddingType(null)} className="w-6 h-6 rounded-full bg-[var(--border)]/40 flex items-center justify-center active:scale-90 transition-all">
                <X size={11} className="text-[var(--color-secondary)]/60" strokeWidth={2.5} />
              </button>
            </div>
            <input value={newName} onChange={(e) => setNewName(e.target.value)} placeholder="Name *"
              className="w-full border border-[var(--border)] rounded-xl px-3 py-2.5 text-[12px] font-semibold text-[var(--app-text)] bg-[var(--app-bg)] outline-none focus:border-[var(--app-text)] transition-all placeholder:text-[var(--color-secondary)]/30" />
            <input value={newPrice} onChange={(e) => setNewPrice(e.target.value)} placeholder="Starting price (e.g. 500)"
              className="w-full border border-[var(--border)] rounded-xl px-3 py-2.5 text-[12px] font-semibold text-[var(--app-text)] bg-[var(--app-bg)] outline-none focus:border-[var(--app-text)] transition-all placeholder:text-[var(--color-secondary)]/30" />
            <input value={newDesc} onChange={(e) => setNewDesc(e.target.value)} placeholder="Short description (optional)"
              className="w-full border border-[var(--border)] rounded-xl px-3 py-2.5 text-[12px] font-semibold text-[var(--app-text)] bg-[var(--app-bg)] outline-none focus:border-[var(--app-text)] transition-all placeholder:text-[var(--color-secondary)]/30" />
            <button onClick={saveItem} disabled={!newName.trim()}
              className="w-full py-3 rounded-xl bg-[var(--color-primary)] text-white font-black uppercase tracking-widest text-[10px] disabled:opacity-40 active:scale-95 transition-all">
              Add to Showcase
            </button>
          </motion.div>
        ) : (
          <div className="grid grid-cols-2 gap-2.5">
            <button onClick={() => setAddingType("product")}
              className="py-3.5 rounded-2xl border-2 border-dashed border-[var(--border)] text-[10px] font-black uppercase tracking-widest text-[var(--color-secondary)]/50 flex items-center justify-center gap-1.5 active:scale-95 transition-all hover:border-[var(--color-primary)]/40 hover:text-[var(--color-primary)]">
              <Plus size={13} strokeWidth={2.5} /> Product
            </button>
            <button onClick={() => setAddingType("service")}
              className="py-3.5 rounded-2xl border-2 border-dashed border-[var(--border)] text-[10px] font-black uppercase tracking-widest text-[var(--color-secondary)]/50 flex items-center justify-center gap-1.5 active:scale-95 transition-all hover:border-[var(--color-secondary)]/40 hover:text-[var(--color-secondary)]">
              <Plus size={13} strokeWidth={2.5} /> Service
            </button>
          </div>
        )}
      </div>

      <div className="px-5 pt-4 pb-8 space-y-2.5">
        <button onClick={() => navigate("/marketplace/list/visibility", { state: { ...state, showcase: items } })}
          className="w-full py-4 rounded-2xl bg-[var(--color-secondary)] text-white font-black uppercase tracking-widest text-[12px] flex items-center justify-center gap-3 active:scale-95 transition-all">
          Continue <ArrowRight size={18} />
        </button>
        {items.length === 0 && (
          <p className="text-center text-[9px] font-semibold text-[var(--color-secondary)]/40 uppercase tracking-widest">You can skip this step</p>
        )}
      </div>
    </div>
  );
}
