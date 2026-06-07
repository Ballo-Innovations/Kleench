import { useState } from "react";
import { useNavigate } from "react-router";
import { motion } from "motion/react";
import { ArrowRight, Send } from "lucide-react";
import { PageHeader } from "../components/PageHeader";

const COMMODITIES = ["Maize", "Beans", "Rice", "Cassava", "Groundnuts", "Sunflower", "Fuel", "Fertilizer", "Cement", "Zinc", "Copper"];
const MARKETS = ["Soweto Market, Lusaka", "City Market, Lusaka", "Luburma Market", "Chipata Town", "Ndola Bwafwano", "Kitwe Town Centre", "Livingstone Market", "Mongu Central"];
const UNITS = ["per 50kg bag", "per 25kg bag", "per kg", "per litre", "per tonne", "per crate"];
const AVAILABILITY = ["High", "Moderate", "Low", "Out of Stock"];

export function AgentDataSubmit() {
  const navigate = useNavigate();

  const [commodity, setCommodity] = useState("");
  const [market, setMarket] = useState("");
  const [price, setPrice] = useState("");
  const [unit, setUnit] = useState("");
  const [availability, setAvailability] = useState("");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [notes, setNotes] = useState("");

  const canSubmit = commodity && market && price && unit && availability && date;

  return (
    <div className="w-full max-w-md mx-auto min-h-screen bg-transparent font-sans pb-32">
      <PageHeader title="SUBMIT MARKET DATA" showBack />

      <div className="px-5 pt-5 space-y-5">
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
          className="flex items-start gap-3 bg-[var(--color-secondary)]/8 border border-[var(--color-secondary)]/20 rounded-2xl px-4 py-3">
          <Send size={14} className="text-[var(--color-secondary)] shrink-0 mt-0.5" strokeWidth={2} />
          <p className="text-[11px] font-semibold text-[var(--color-secondary)]/70 leading-snug">
            Submit accurate market observations. Your data contributes to live price intelligence for buyers and sellers across Zambia.
          </p>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }}
          className="bg-[var(--app-bg)] border border-[var(--border)] rounded-2xl shadow-sm p-5 space-y-4">
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[var(--color-secondary)]/50">Commodity & Market</p>

          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-wider text-[var(--color-secondary)]/60">Commodity <span className="text-[var(--color-primary)]">*</span></label>
            <div className="flex flex-wrap gap-2">
              {COMMODITIES.map((c) => (
                <button key={c} onClick={() => setCommodity(c)}
                  className={`px-3 py-1.5 rounded-xl border text-[10px] font-black uppercase tracking-wide transition-all ${commodity === c ? "border-[var(--color-primary)] bg-[var(--color-primary)]/10 text-[var(--color-primary)]" : "border-[var(--border)] text-[var(--color-secondary)]/60"}`}>
                  {c}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-[10px] font-black uppercase tracking-wider text-[var(--color-secondary)]/60">Market Location <span className="text-[var(--color-primary)]">*</span></label>
            <select value={market} onChange={(e) => setMarket(e.target.value)}
              className="w-full border border-[var(--border)] rounded-xl px-4 py-3 text-[13px] font-semibold text-[var(--app-text)] bg-[var(--app-bg)] outline-none focus:border-[var(--app-text)] transition-all">
              <option value="">Select market...</option>
              {MARKETS.map((m) => <option key={m} value={m}>{m}</option>)}
            </select>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
          className="bg-[var(--app-bg)] border border-[var(--border)] rounded-2xl shadow-sm p-5 space-y-4">
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[var(--color-secondary)]/50">Price & Availability</p>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="text-[10px] font-black uppercase tracking-wider text-[var(--color-secondary)]/60">Price (K or $) <span className="text-[var(--color-primary)]">*</span></label>
              <input value={price} onChange={(e) => setPrice(e.target.value)} placeholder="e.g. 280" type="number"
                className="w-full border border-[var(--border)] rounded-xl px-3 py-3 text-[13px] font-semibold text-[var(--app-text)] bg-[var(--app-bg)] outline-none focus:border-[var(--app-text)] transition-all" />
            </div>
            <div className="space-y-1">
              <label className="text-[10px] font-black uppercase tracking-wider text-[var(--color-secondary)]/60">Unit <span className="text-[var(--color-primary)]">*</span></label>
              <select value={unit} onChange={(e) => setUnit(e.target.value)}
                className="w-full border border-[var(--border)] rounded-xl px-3 py-3 text-[11px] font-semibold text-[var(--app-text)] bg-[var(--app-bg)] outline-none focus:border-[var(--app-text)] transition-all">
                <option value="">Unit...</option>
                {UNITS.map((u) => <option key={u} value={u}>{u}</option>)}
              </select>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-wider text-[var(--color-secondary)]/60">Availability <span className="text-[var(--color-primary)]">*</span></label>
            <div className="flex flex-wrap gap-2">
              {AVAILABILITY.map((a) => (
                <button key={a} onClick={() => setAvailability(a)}
                  className={`px-3 py-1.5 rounded-xl border text-[10px] font-black uppercase tracking-wide transition-all ${availability === a ? "border-[var(--color-primary)] bg-[var(--color-primary)]/10 text-[var(--color-primary)]" : "border-[var(--border)] text-[var(--color-secondary)]/60"}`}>
                  {a}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-[10px] font-black uppercase tracking-wider text-[var(--color-secondary)]/60">Observation Date <span className="text-[var(--color-primary)]">*</span></label>
            <input type="date" value={date} onChange={(e) => setDate(e.target.value)}
              className="w-full border border-[var(--border)] rounded-xl px-4 py-3 text-[13px] font-semibold text-[var(--app-text)] bg-[var(--app-bg)] outline-none focus:border-[var(--app-text)] transition-all" />
          </div>

          <div className="space-y-1">
            <label className="text-[10px] font-black uppercase tracking-wider text-[var(--color-secondary)]/60">Notes <span className="text-[var(--color-secondary)]/40">(Optional)</span></label>
            <textarea value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="Any additional observations..." rows={2}
              className="w-full border border-[var(--border)] rounded-xl px-4 py-3 text-[13px] font-semibold text-[var(--app-text)] bg-[var(--app-bg)] outline-none focus:border-[var(--app-text)] transition-all resize-none placeholder:text-[var(--color-secondary)]/30" />
          </div>
        </motion.div>
      </div>

      <div className="px-5 pt-4 pb-8">
        <button onClick={() => navigate("/marketplace/agent/submit/success", { state: { commodity, market, price, unit, availability, date } })}
          disabled={!canSubmit}
          className="w-full py-4 rounded-2xl bg-[var(--color-secondary)] text-white font-black uppercase tracking-widest text-[12px] flex items-center justify-center gap-3 disabled:opacity-40 disabled:cursor-not-allowed active:scale-95 transition-all">
          Submit Data <ArrowRight size={18} />
        </button>
      </div>
    </div>
  );
}
