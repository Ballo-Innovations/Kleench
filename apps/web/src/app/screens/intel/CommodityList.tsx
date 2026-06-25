import { useNavigate, useParams } from "react-router";
import { RefreshCw, TrendingUp, TrendingDown } from "lucide-react";
import { PageHeader } from "../../components/PageHeader";
import { getCommodity } from "../../data/marketIntel";

export function CommodityList() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const data = getCommodity(id);
  const curr = data.unit.includes("USD") ? "$" : "ZMW";

  const rows = [...data.markets].sort((a, b) => a.price - b.price);

  return (
    <div className="w-full max-w-md mx-auto bg-transparent font-sans pb-24">
      <PageHeader title="MARKET" subtitle={`${data.name} List`} showBack />

      <div className="px-5 pt-4 space-y-4">
        {/* Map / List toggle */}
        <div className="flex bg-[var(--app-bg)] border border-[var(--border)] rounded-full shadow-sm overflow-hidden p-1">
          <button onClick={() => navigate(`/marketplace/intel/${data.id}/map`)} className="flex-1 py-2 rounded-full text-[var(--app-text)]/50 text-[10px] font-black uppercase tracking-widest">Map View</button>
          <button className="flex-1 py-2 rounded-full bg-[var(--color-primary)] text-white text-[10px] font-black uppercase tracking-widest">List View</button>
        </div>

        {/* Table */}
        <div className="bg-[var(--app-bg)] rounded-2xl border border-[var(--border)] shadow-sm overflow-hidden">
          <div className="grid grid-cols-[1.2fr_1fr_0.8fr] px-4 py-3 border-b border-[var(--border)] bg-[var(--muted)]/30">
            <span className="text-[8px] font-black uppercase tracking-widest text-[var(--app-text)]/40">Location</span>
            <span className="text-[8px] font-black uppercase tracking-widest text-[var(--app-text)]/40 text-right">Avg Price ({data.unit.replace("per ", "")})</span>
            <span className="text-[8px] font-black uppercase tracking-widest text-[var(--app-text)]/40 text-right">Change</span>
          </div>
          <div className="divide-y divide-[var(--border)]">
            {rows.map((m) => (
              <div key={m.city} className="grid grid-cols-[1.2fr_1fr_0.8fr] items-center px-4 py-3">
                <span className="text-[11px] font-black text-[var(--app-text)] uppercase tracking-wide">{m.city}</span>
                <span className="text-[11px] font-black text-[var(--color-secondary)] text-right">{curr} {m.price.toLocaleString()}</span>
                <span className={`flex items-center justify-end gap-0.5 text-[10px] font-black ${m.up ? "text-[#059669]" : "text-[#DC2626]"}`}>
                  {m.change}
                  {m.up ? <TrendingUp size={10} strokeWidth={2.5} /> : <TrendingDown size={10} strokeWidth={2.5} />}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Updated footer */}
        <div className="bg-[var(--app-bg)] rounded-2xl border border-[var(--border)] shadow-sm px-4 py-3 flex items-center justify-between">
          <span className="text-[10px] font-bold text-[var(--app-text)]/50">Price updated Today, 08:30 AM</span>
          <button className="w-8 h-8 rounded-full bg-[var(--muted)]/50 border border-[var(--border)] flex items-center justify-center text-[var(--color-primary)] active:scale-90 transition-all">
            <RefreshCw size={14} strokeWidth={2.5} />
          </button>
        </div>
      </div>
    </div>
  );
}
