import { useState } from "react";
import { useNavigate, useLocation } from "react-router";
import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { PageHeader } from "../components/PageHeader";

const COMMODITIES = ["Maize", "Beans", "Rice", "Cassava", "Groundnuts", "Sunflower", "Sorghum", "Wheat", "Fuel", "Fertilizer", "Cement", "Zinc", "Copper"];
const METHODS = ["Physical Visit", "Phone Survey", "Market Network", "Farm Gate", "Online Research"];

export function AgentSpecializedData() {
  const navigate = useNavigate();
  const { state } = useLocation();

  const [selectedCommodities, setSelectedCommodities] = useState<string[]>([]);
  const [collectionArea, setCollectionArea] = useState("");
  const [selectedMethods, setSelectedMethods] = useState<string[]>([]);

  const toggleItem = (item: string, list: string[], setList: (v: string[]) => void) => {
    setList(list.includes(item) ? list.filter((x) => x !== item) : [...list, item]);
  };

  const canContinue = selectedCommodities.length > 0 && collectionArea.trim() && selectedMethods.length > 0;

  return (
    <div className="w-full max-w-md mx-auto min-h-screen bg-transparent font-sans pb-32">
      <PageHeader title="SPECIALIZED AGENT" subtitle="Step 3 — Data Information" showBack />

      <div className="px-5 pt-5 space-y-5">
        <div className="flex gap-1.5">
          {Array.from({ length: 7 }).map((_, i) => (
            <div key={i} className={`h-1.5 flex-1 rounded-full ${i < 3 ? "bg-[var(--color-primary)]" : "bg-[var(--border)]"}`} />
          ))}
        </div>

        <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}
          className="bg-[var(--app-bg)] border border-[var(--border)] rounded-2xl shadow-sm p-5 space-y-3">
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[var(--color-secondary)]/50">Commodity Types <span className="text-[var(--color-primary)]">*</span></p>
          <p className="text-[9px] font-semibold text-[var(--color-secondary)]/50">Select all commodities you will report on</p>
          <div className="flex flex-wrap gap-2">
            {COMMODITIES.map((c) => (
              <button key={c} onClick={() => toggleItem(c, selectedCommodities, setSelectedCommodities)}
                className={`px-3 py-1.5 rounded-xl border text-[10px] font-black uppercase tracking-wide transition-all ${selectedCommodities.includes(c) ? "border-[var(--color-primary)] bg-[var(--color-primary)] text-white" : "border-[var(--border)] text-[var(--color-secondary)]/60"}`}>
                {c}
              </button>
            ))}
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
          className="bg-[var(--app-bg)] border border-[var(--border)] rounded-2xl shadow-sm p-5 space-y-3">
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[var(--color-secondary)]/50">Collection Area <span className="text-[var(--color-primary)]">*</span></p>
          <input value={collectionArea} onChange={(e) => setCollectionArea(e.target.value)} placeholder="e.g. Chipata, Lundazi, Katete districts"
            className="w-full border border-[var(--border)] rounded-xl px-4 py-3 text-[13px] font-semibold text-[var(--app-text)] bg-[var(--app-bg)] outline-none focus:border-[var(--app-text)] transition-all placeholder:text-[var(--color-secondary)]/30" />
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}
          className="bg-[var(--app-bg)] border border-[var(--border)] rounded-2xl shadow-sm p-5 space-y-3">
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[var(--color-secondary)]/50">Collection Method <span className="text-[var(--color-primary)]">*</span></p>
          <div className="flex flex-wrap gap-2">
            {METHODS.map((m) => (
              <button key={m} onClick={() => toggleItem(m, selectedMethods, setSelectedMethods)}
                className={`px-3 py-1.5 rounded-xl border text-[10px] font-black uppercase tracking-wide transition-all ${selectedMethods.includes(m) ? "border-[var(--color-primary)] bg-[var(--color-primary)] text-white" : "border-[var(--border)] text-[var(--color-secondary)]/60"}`}>
                {m}
              </button>
            ))}
          </div>
        </motion.div>
      </div>

      <div className="px-5 pt-4 pb-8">
        <button onClick={() => navigate("/marketplace/agent/specialized/market", { state: { ...state, commodities: selectedCommodities, collectionArea, collectionMethods: selectedMethods } })}
          disabled={!canContinue}
          className="w-full py-4 rounded-2xl bg-[var(--color-secondary)] text-white font-black uppercase tracking-widest text-[12px] flex items-center justify-center gap-3 disabled:opacity-40 disabled:cursor-not-allowed active:scale-95 transition-all">
          Continue <ArrowRight size={18} />
        </button>
      </div>
    </div>
  );
}
