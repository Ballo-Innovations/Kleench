import { useState } from "react";
import { useNavigate, useLocation } from "react-router";
import { motion, AnimatePresence } from "motion/react";
import { Plus, X, Package, Briefcase } from "lucide-react";
import { PageHeader } from "../components/PageHeader";
import { CtaButton } from "../components/CtaButton";

interface ShowcaseItem { type: "product" | "service"; name: string; price: string; desc: string }

export function ListShowcase() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const isPriority = state?.listingType === "priority";
  const totalSteps = isPriority ? 10 : 8;
  const stepIndex = isPriority ? 7 : 6;

  const [activeTab, setActiveTab] = useState<"product" | "service">("product");
  const [items, setItems] = useState<ShowcaseItem[]>([]);
  const [newName, setNewName] = useState("");
  const [newPrice, setNewPrice] = useState("");
  const [newDesc, setNewDesc] = useState("");
  const [adding, setAdding] = useState(false);

  const saveItem = () => {
    if (!newName.trim()) return;
    setItems((prev) => [...prev, { type: activeTab, name: newName, price: newPrice, desc: newDesc }]);
    setNewName(""); setNewPrice(""); setNewDesc("");
    setAdding(false);
  };

  const removeItem = (i: number) => setItems((prev) => prev.filter((_, idx) => idx !== i));
  const nextPath = isPriority ? "/marketplace/list/references" : "/marketplace/list/visibility";

  return (
    <div className="w-full bg-transparent font-sans pb-24">
      <PageHeader title="LIST YOUR BUSINESS" subtitle={`Step ${stepIndex} — Products & Services`} showBack />

      <div className="px-5 pt-5 space-y-5">
        <div className="flex gap-1.5">
          {Array.from({ length: totalSteps }).map((_, i) => (
            <div key={i} className={`h-1.5 flex-1 rounded-full ${i < stepIndex ? "bg-[var(--color-primary)]" : "bg-[var(--border)]"}`} />
          ))}
        </div>

        {/* Tab selector */}
        <div className="grid grid-cols-2 gap-2.5">
          {([
            { id: "product" as const, label: "Sell a Product", sub: "List physical or digital products for buyers", icon: Package },
            { id: "service" as const, label: "Offer a Service", sub: "List services and get bookings", icon: Briefcase },
          ]).map(({ id, label, sub, icon: Icon }) => (
            <button key={id} onClick={() => setActiveTab(id)}
              className={`p-4 rounded-2xl border-2 text-left transition-all active:scale-98 ${activeTab === id ? "border-[var(--color-primary)] bg-[var(--color-primary)]/6" : "border-[var(--border)] bg-[var(--app-bg)]"}`}>
              <div className={`w-9 h-9 rounded-xl flex items-center justify-center mb-2 ${activeTab === id ? "bg-[var(--color-primary)]/12" : "bg-[var(--border)]/30"}`}>
                <Icon size={17} color={activeTab === id ? "var(--color-primary)" : "var(--color-secondary)"} strokeWidth={1.8} />
              </div>
              <p className={`text-[11px] font-black uppercase tracking-wide leading-tight ${activeTab === id ? "text-[var(--color-primary)]" : "text-[var(--app-text)]"}`}>{label}</p>
              <p className="text-[9px] font-semibold text-[var(--color-secondary)]/50 mt-0.5 leading-snug">{sub}</p>
            </button>
          ))}
        </div>

        {/* Items list */}
        {items.filter(i => i.type === activeTab).length > 0 && (
          <div className="space-y-2">
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[var(--color-secondary)]/50">
              Added {activeTab === "product" ? "Products" : "Services"} ({items.filter(i => i.type === activeTab).length})
            </p>
            <AnimatePresence>
              {items.map((item, i) => item.type === activeTab && (
                <motion.div key={i} initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -4 }}
                  className="flex items-center gap-3 bg-[var(--app-bg)] border border-[var(--border)] rounded-xl shadow-sm px-4 py-3">
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

        {/* Add form */}
        {adding ? (
          <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}
            className="bg-[var(--app-bg)] border border-[var(--color-primary)]/30 rounded-2xl shadow-sm p-4 space-y-3">
            <div className="flex items-center justify-between">
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[var(--color-primary)]">
                Add {activeTab === "product" ? "Product" : "Service"}
              </p>
              <button onClick={() => setAdding(false)} className="w-6 h-6 rounded-full bg-[var(--border)]/40 flex items-center justify-center active:scale-90">
                <X size={11} className="text-[var(--color-secondary)]/60" strokeWidth={2.5} />
              </button>
            </div>
            <input value={newName} onChange={(e) => setNewName(e.target.value)} placeholder="Name *"
              className="w-full border border-[var(--border)] rounded-xl px-3 py-2.5 text-[12px] font-semibold text-[var(--app-text)] bg-[var(--app-bg)] outline-none focus:border-[var(--app-text)] placeholder:text-[var(--color-secondary)]/30" />
            <input value={newPrice} onChange={(e) => setNewPrice(e.target.value)} placeholder="Starting price (e.g. 500)"
              className="w-full border border-[var(--border)] rounded-xl px-3 py-2.5 text-[12px] font-semibold text-[var(--app-text)] bg-[var(--app-bg)] outline-none focus:border-[var(--app-text)] placeholder:text-[var(--color-secondary)]/30" />
            <input value={newDesc} onChange={(e) => setNewDesc(e.target.value)} placeholder="Short description (optional)"
              className="w-full border border-[var(--border)] rounded-xl px-3 py-2.5 text-[12px] font-semibold text-[var(--app-text)] bg-[var(--app-bg)] outline-none focus:border-[var(--app-text)] placeholder:text-[var(--color-secondary)]/30" />
            <button onClick={saveItem} disabled={!newName.trim()}
              className="w-full py-3 rounded-xl bg-[var(--color-primary)] text-white font-black uppercase tracking-widest text-[10px] disabled:opacity-40 active:scale-95 transition-all">
              Add to Listing
            </button>
          </motion.div>
        ) : (
          <button onClick={() => setAdding(true)}
            className="w-full py-3.5 rounded-2xl border-2 border-dashed border-[var(--border)] text-[10px] font-black uppercase tracking-widest text-[var(--color-secondary)]/50 flex items-center justify-center gap-1.5 active:scale-95 transition-all hover:border-[var(--color-primary)]/40 hover:text-[var(--color-primary)]">
            <Plus size={13} strokeWidth={2.5} /> Add Another {activeTab === "product" ? "Product" : "Service"}
          </button>
        )}
      </div>

      <div className="px-5 pt-4 pb-8 space-y-2.5">
        <CtaButton onClick={() => navigate(nextPath, { state: { ...state, showcase: items } })}>Continue</CtaButton>
        {items.length === 0 && (
          <p className="text-center text-[9px] font-semibold text-[var(--color-secondary)]/40 uppercase tracking-widest">You can skip this step</p>
        )}
      </div>
    </div>
  );
}
