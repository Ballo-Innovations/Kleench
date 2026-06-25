import { useState } from "react";
import { useNavigate } from "react-router";
import { motion, AnimatePresence } from "motion/react";
import { ChevronDown, ChevronRight, TrendingUp, TrendingDown } from "lucide-react";
import { PageHeader } from "../../components/PageHeader";
import { CROP_ROWS, CROP_FILTERS, COMMODITIES } from "../../data/marketIntel";
import { CommodityIcon } from "./CommodityIcon";

export function CropCategory() {
  const navigate = useNavigate();
  const [filter, setFilter] = useState<(typeof CROP_FILTERS)[number]>("Crops");
  const [open, setOpen] = useState<string | null>("maize");

  return (
    <div className="w-full max-w-md mx-auto bg-transparent font-sans pb-24">
      <PageHeader title="MARKET" subtitle="Crop Category" showBack />

      {/* Filter sub-tabs */}
      <div className="sticky top-[115px] z-30 bg-[var(--app-bg)] border-b border-[var(--border)]">
        <div className="flex gap-6 px-5 overflow-x-auto no-scrollbar">
          {CROP_FILTERS.map((f) => {
            const active = filter === f;
            return (
              <button key={f} onClick={() => setFilter(f)} className="relative shrink-0 py-3">
                <span className={`text-[11px] font-black uppercase tracking-wide ${active ? "text-[var(--color-primary)]" : "text-[var(--app-text)]/45"}`}>{f}</span>
                {active && <motion.div layoutId="cropTab" className="absolute left-0 right-0 -bottom-px h-[2.5px] bg-[var(--color-primary)] rounded-full" />}
              </button>
            );
          })}
        </div>
      </div>

      <div className="px-5 pt-4">
        <div className="bg-[var(--app-bg)] rounded-2xl border border-[var(--border)] shadow-sm divide-y divide-[var(--border)] overflow-hidden">
          {CROP_ROWS.map((crop) => {
            const isOpen = open === crop.id;
            const data = COMMODITIES.find((c) => c.id === crop.id);
            return (
              <div key={crop.id}>
                <button onClick={() => setOpen(isOpen ? null : crop.id)} className="w-full flex items-center gap-3 px-4 py-3.5 text-left active:bg-[var(--muted)]/30 transition-colors">
                  <span className="w-10 h-10 rounded-xl bg-[var(--color-secondary)]/8 border border-[var(--border)] flex items-center justify-center shrink-0">
                    <CommodityIcon id={crop.id} size={20} primary={data?.color ?? "var(--color-secondary)"} />
                  </span>
                  <div className="flex-1 min-w-0">
                    <p className="text-[12px] font-black uppercase tracking-wide text-[var(--app-text)] leading-none">{crop.name}</p>
                    <p className="text-[8px] font-bold uppercase tracking-widest text-[var(--app-text)]/40 mt-1">{crop.note}</p>
                  </div>
                  {data && (
                    <span className={`flex items-center gap-0.5 text-[10px] font-black mr-1 ${data.up ? "text-[#059669]" : "text-[#DC2626]"}`}>
                      {data.up ? <TrendingUp size={10} strokeWidth={2.5} /> : <TrendingDown size={10} strokeWidth={2.5} />}{data.change}
                    </span>
                  )}
                  <motion.span animate={{ rotate: isOpen ? 180 : 0 }}><ChevronDown size={16} className="text-[var(--app-text)]/40" strokeWidth={2.5} /></motion.span>
                </button>
                <AnimatePresence>
                  {isOpen && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                      <div className="px-4 pb-4 pt-1">
                        {data ? (
                          <div className="bg-[var(--muted)]/30 rounded-2xl border border-[var(--border)] p-4 space-y-3">
                            <div className="flex items-center justify-between">
                              <div>
                                <p className="text-[8px] font-black uppercase tracking-widest text-[var(--app-text)]/40">{data.unit}</p>
                                <p className="text-[18px] font-black text-[var(--app-text)] leading-none mt-1">{data.price}</p>
                              </div>
                              <div className="text-right">
                                <p className="text-[8px] font-black uppercase tracking-widest text-[var(--app-text)]/40">Last Week</p>
                                <p className="text-[12px] font-black text-[var(--app-text)]/60 mt-1">{data.prev}</p>
                              </div>
                            </div>
                            <button onClick={() => navigate(`/marketplace/intel/${data.id}`)} className="w-full flex items-center justify-center gap-1.5 bg-[var(--color-secondary)] text-white text-[10px] font-black uppercase tracking-widest py-2.5 rounded-full active:scale-95 transition-all">
                              View Details <ChevronRight size={12} strokeWidth={3} />
                            </button>
                          </div>
                        ) : (
                          <div className="bg-[var(--muted)]/30 rounded-2xl border border-[var(--border)] p-4 text-center">
                            <p className="text-[10px] font-bold text-[var(--app-text)]/45">Pricing data coming soon for {crop.name}.</p>
                          </div>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
