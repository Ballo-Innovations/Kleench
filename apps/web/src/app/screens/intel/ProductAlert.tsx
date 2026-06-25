import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { toast } from "sonner";
import { PageHeader } from "../../components/PageHeader";
import { COMMODITIES, DEFAULT_ALERTS, type PriceAlert } from "../../data/marketIntel";

const LOCATIONS = ["Lusaka", "Kitwe", "Ndola", "Livingstone", "Kasama", "Choma", "Solwezi", "Mansa"];

const selectClass =
  "w-full appearance-none border border-[var(--border)] rounded-xl bg-[var(--app-bg)] px-3 py-3 pr-9 text-[13px] font-black text-[var(--app-text)] outline-none focus:border-[var(--color-primary)] transition-colors";

export function ProductAlert() {
  const [product, setProduct] = useState(COMMODITIES[0].name);
  const [location, setLocation] = useState("Lusaka");
  const [condition, setCondition] = useState<"Below" | "Above">("Below");
  const [price, setPrice] = useState("6000");
  const [alerts, setAlerts] = useState<PriceAlert[]>(DEFAULT_ALERTS);

  const createAlert = () => {
    if (!price) return toast.error("Enter a target price.");
    const fresh: PriceAlert = {
      id: `a${Date.now()}`,
      product: `${product} – ${location}`,
      location,
      condition,
      price: `ZMW ${Number(price).toLocaleString()}`,
      on: true,
    };
    setAlerts((prev) => [fresh, ...prev]);
    toast.success("Price alert created.");
  };

  const toggleAlert = (id: string) =>
    setAlerts((prev) => prev.map((a) => (a.id === id ? { ...a, on: !a.on } : a)));

  return (
    <div className="w-full max-w-md mx-auto bg-transparent font-sans pb-24">
      <PageHeader title="MARKET" subtitle="Product Alerts" showBack />

      <div className="px-5 pt-4 space-y-5">
        <div>
          <p className="text-[12px] font-black uppercase tracking-wide text-[var(--app-text)]">Enable Price Alerts</p>
          <p className="text-[10px] font-bold text-[var(--app-text)]/45 mt-0.5">Get notified the moment a market hits your target.</p>
        </div>

        {/* Create new alert */}
        <section className="bg-[var(--app-bg)] rounded-2xl border border-[var(--border)] shadow-sm p-4 space-y-4">
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[var(--app-text)]/40">Create New Alert</p>

          <Field label="Product">
            <select value={product} onChange={(e) => setProduct(e.target.value)} className={selectClass}>
              {COMMODITIES.map((c) => <option key={c.id} value={c.name}>{c.name}</option>)}
            </select>
          </Field>

          <Field label="Location">
            <select value={location} onChange={(e) => setLocation(e.target.value)} className={selectClass}>
              {LOCATIONS.map((l) => <option key={l} value={l}>{l}</option>)}
            </select>
          </Field>

          <div>
            <p className="text-[9px] font-black uppercase tracking-widest text-[var(--app-text)]/40 mb-1.5">Alert When Price</p>
            <div className="grid grid-cols-2 gap-3">
              <div className="relative">
                <select value={condition} onChange={(e) => setCondition(e.target.value as "Below" | "Above")} className={selectClass}>
                  <option value="Below">Below</option>
                  <option value="Above">Above</option>
                </select>
                <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--app-text)]/40 pointer-events-none" strokeWidth={2.5} />
              </div>
              <div className="flex items-center border border-[var(--border)] rounded-xl bg-[var(--app-bg)] overflow-hidden focus-within:border-[var(--color-primary)] transition-colors">
                <span className="pl-3 text-[11px] font-black text-[var(--app-text)]/40">ZMW</span>
                <input
                  type="number"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  className="w-full bg-transparent px-2 py-3 text-[13px] font-black text-[var(--app-text)] outline-none"
                />
              </div>
            </div>
          </div>

          <button onClick={createAlert}
            className="w-full bg-[var(--color-primary)] text-white font-black uppercase tracking-widest text-[12px] py-4 rounded-2xl active:scale-95 transition-all shadow-sm">
            Create Alert
          </button>
        </section>

        {/* My alerts */}
        <section className="space-y-3">
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[var(--app-text)]/40">My Alerts</p>
          {alerts.map((a) => (
            <div key={a.id} className="bg-[var(--app-bg)] rounded-2xl border border-[var(--border)] shadow-sm px-4 py-3.5 flex items-center justify-between gap-3">
              <div className="min-w-0">
                <p className="text-[11px] font-black uppercase tracking-wide text-[var(--app-text)] truncate">{a.product}</p>
                <p className="text-[9px] font-bold text-[var(--app-text)]/45 mt-0.5 truncate">{a.condition} {a.price}</p>
              </div>
              <button onClick={() => toggleAlert(a.id)} className={`shrink-0 w-11 h-6 rounded-full p-0.5 transition-colors ${a.on ? "bg-[var(--color-primary)]" : "bg-[var(--border)]"}`}>
                <div className="w-5 h-5 rounded-full bg-white shadow-sm transition-all" style={{ marginLeft: a.on ? "auto" : 0 }} />
              </button>
            </div>
          ))}
        </section>
      </div>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="text-[9px] font-black uppercase tracking-widest text-[var(--app-text)]/40 mb-1.5">{label}</p>
      <div className="relative">
        {children}
        <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--app-text)]/40 pointer-events-none" strokeWidth={2.5} />
      </div>
    </div>
  );
}
