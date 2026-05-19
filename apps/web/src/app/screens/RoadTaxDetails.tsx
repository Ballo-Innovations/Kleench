import { useState } from "react";
import { useNavigate, useLocation } from "react-router";
import { motion, AnimatePresence } from "motion/react";
import { ChevronRight } from "lucide-react";
import { PageHeader } from "../components/PageHeader";
import { ZambiaFlag } from "../components/KleenchIcons";

const CURRENT_YEAR = new Date().getFullYear();
const YEARS = Array.from({ length: 30 }, (_, i) => String(CURRENT_YEAR - i));
const VEHICLE_MAKES = ["Toyota", "Honda", "Nissan", "Mazda", "Ford", "Isuzu", "Mitsubishi", "BMW", "Mercedes", "Volkswagen", "Hyundai", "Kia"];
const ENGINE_SIZES = ["Under 1000cc", "1000-1500cc", "1501-2000cc", "2001-2500cc", "2501-3000cc", "Over 3000cc"];

export function RoadTaxDetails() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const [form, setForm] = useState({ ownerName: "", nrc: "", phone: "", regNumber: "", make: "", model: "", year: "", engine: "" });
  const [error, setError] = useState("");
  const update = (k: string, v: string) => setForm((f) => ({ ...f, [k]: v }));

  const handleSubmit = () => {
    const required = ["ownerName", "nrc", "phone", "regNumber", "make", "model", "year", "engine"];
    if (required.some((k) => !form[k as keyof typeof form])) {
      setError("Please fill in all required fields");
      return;
    }
    setError("");
    navigate("/road-tax/period", { state: { ...state, vehicleDetails: form } });
  };

  const inputCls = "w-full px-4 py-3.5 rounded-xl bg-[var(--app-bg)] border-2 border-[var(--border)] font-semibold text-[13px] text-[var(--app-text)] outline-none focus:border-[var(--color-primary)] transition-colors placeholder:text-[var(--color-secondary)]/30";
  const Label = ({ text }: { text: string }) => (
    <label className="block text-[10px] font-black uppercase tracking-widest text-[var(--color-secondary)] mb-1.5">{text}</label>
  );

  return (
    <div className="w-full max-w-md mx-auto min-h-screen bg-transparent font-sans pb-36">
      <PageHeader title="VEHICLE DETAILS" subtitle="Step 1 of 3" showBack />

      <div className="px-5 pt-6 space-y-5">
        <div>
          <h2 className="font-black text-[20px] text-[var(--color-secondary)] uppercase tracking-tight mb-1">Owner & Vehicle</h2>
          <p className="text-[12px] font-semibold text-[var(--color-secondary)]/50">Enter the registered owner and vehicle information.</p>
        </div>

        {/* Owner Info */}
        <div className="bg-[var(--color-secondary)] rounded-2xl px-4 py-2.5 inline-flex">
          <span className="text-[9px] font-black uppercase tracking-[0.2em] text-white">Owner Information</span>
        </div>

        <div className="space-y-3">
          <div>
            <Label text="Full Legal Name *" />
            <input type="text" value={form.ownerName} onChange={(e) => update("ownerName", e.target.value)} placeholder="As on NRC" className={inputCls} />
          </div>
          <div>
            <Label text="NRC Number *" />
            <input type="text" value={form.nrc} onChange={(e) => update("nrc", e.target.value)} placeholder="e.g. 123456/78/1" className={inputCls} />
          </div>
          <div>
            <Label text="Phone Number *" />
            <div className="flex gap-2">
              <div className="flex items-center gap-1.5 px-3 rounded-xl bg-[var(--app-bg)] border-2 border-[var(--border)]">
                <ZambiaFlag size={18} />
                <span className="font-black text-[13px] text-[var(--color-secondary)]/60">+260</span>
              </div>
              <input type="tel" value={form.phone} onChange={(e) => update("phone", e.target.value.replace(/\D/g, "").slice(0, 10))} placeholder="9X XXX XXXX"
                className="flex-1 px-4 py-3.5 rounded-xl bg-[var(--app-bg)] border-2 border-[var(--border)] font-semibold text-[13px] text-[var(--app-text)] outline-none focus:border-[var(--color-primary)] transition-colors placeholder:text-[var(--color-secondary)]/30" />
            </div>
          </div>
        </div>

        {/* Vehicle Info */}
        <div className="bg-[var(--color-secondary)] rounded-2xl px-4 py-2.5 inline-flex">
          <span className="text-[9px] font-black uppercase tracking-[0.2em] text-white">Vehicle Information</span>
        </div>

        <div className="space-y-3">
          <div>
            <Label text="Registration Number *" />
            <input type="text" value={form.regNumber} onChange={(e) => update("regNumber", e.target.value.toUpperCase())} placeholder="e.g. AAA 1234" className={inputCls} />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label text="Make *" />
              <select value={form.make} onChange={(e) => update("make", e.target.value)} className={inputCls + " appearance-none"}>
                <option value="">Select</option>
                {VEHICLE_MAKES.map((m) => <option key={m} value={m}>{m}</option>)}
              </select>
            </div>
            <div>
              <Label text="Model *" />
              <input type="text" value={form.model} onChange={(e) => update("model", e.target.value)} placeholder="e.g. Hilux" className={inputCls} />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label text="Year *" />
              <select value={form.year} onChange={(e) => update("year", e.target.value)} className={inputCls + " appearance-none"}>
                <option value="">Year</option>
                {YEARS.map((y) => <option key={y} value={y}>{y}</option>)}
              </select>
            </div>
            <div>
              <Label text="Engine Size *" />
              <select value={form.engine} onChange={(e) => update("engine", e.target.value)} className={inputCls + " appearance-none"}>
                <option value="">Select</option>
                {ENGINE_SIZES.map((s) => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
          </div>
        </div>

        <AnimatePresence>
          {error && <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-red-500 text-[12px] font-bold text-center">{error}</motion.p>}
        </AnimatePresence>
      </div>

      <div className="px-5 pt-2 pb-8">
        <button onClick={handleSubmit}
          className="w-full py-4 rounded-2xl bg-[var(--color-primary)] text-white font-black uppercase tracking-widest text-[13px] flex items-center justify-center gap-3 shadow-[0_8px_20px_rgba(255,140,0,0.3)] active:scale-95 transition-all">
          Continue <ChevronRight size={18} strokeWidth={2.5} />
        </button>
      </div>
    </div>
  );
}
