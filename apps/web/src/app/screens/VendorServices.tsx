import { useState } from "react";
import { useNavigate, useLocation } from "react-router";
import { motion, AnimatePresence } from "motion/react";
import { ChevronRight, Plus, X, GripVertical } from "lucide-react";
import { PageHeader } from "../components/PageHeader";

export function VendorServices() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const [services, setServices] = useState<string[]>(["", ""]);
  const [error, setError] = useState("");

  const addService = () => setServices((s) => [...s, ""]);
  const updateService = (i: number, v: string) => setServices((s) => s.map((item, idx) => idx === i ? v : item));
  const removeService = (i: number) => setServices((s) => s.filter((_, idx) => idx !== i));

  const handleSubmit = () => {
    const filled = services.filter((s) => s.trim());
    if (filled.length === 0) {
      setError("Please add at least one service");
      return;
    }
    setError("");
    navigate("/vendor/uploads", { state: { ...state, services: filled } });
  };

  return (
    <div className="w-full max-w-md mx-auto min-h-screen bg-transparent font-sans pb-36">
      <PageHeader title="SERVICES OFFERED" subtitle="Step 3 of 5" showBack />

      <div className="px-5 pt-6 space-y-4">
        <div>
          <h2 className="font-black text-[20px] text-[var(--color-secondary)] uppercase tracking-tight mb-1">Your Services</h2>
          <p className="text-[12px] font-semibold text-[var(--color-secondary)]/50">
            List the products or services your business offers.
          </p>
        </div>

        {/* Service List */}
        <div className="bg-[var(--app-bg)] rounded-2xl border-[3px] border-[var(--app-text)] shadow-[4px_4px_0_var(--app-text)] overflow-hidden">
          <div className="px-4 py-3 border-b-2 border-[var(--app-text)] bg-[var(--muted)]">
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[var(--color-secondary)]">
              Service List — {services.filter((s) => s.trim()).length} added
            </span>
          </div>
          <div className="divide-y-2 divide-[var(--border)]">
            <AnimatePresence>
              {services.map((service, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="flex items-center gap-3 px-4 py-3"
                >
                  <GripVertical size={16} className="text-[var(--color-secondary)]/30 shrink-0" />
                  <input
                    type="text"
                    value={service}
                    onChange={(e) => updateService(i, e.target.value)}
                    placeholder={`Service ${i + 1}...`}
                    className="flex-1 bg-transparent font-semibold text-[13px] text-[var(--app-text)] outline-none placeholder:text-[var(--color-secondary)]/30"
                  />
                  {services.length > 1 && (
                    <button onClick={() => removeService(i)} className="w-6 h-6 rounded-full bg-red-100 flex items-center justify-center active:scale-90 transition-all shrink-0">
                      <X size={12} className="text-red-500" />
                    </button>
                  )}
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Add Service Button */}
          <button
            onClick={addService}
            className="w-full py-3.5 border-t-2 border-dashed border-[var(--color-primary)]/40 flex items-center justify-center gap-2 active:bg-[var(--color-primary)]/5 transition-all"
          >
            <Plus size={16} className="text-[var(--color-primary)]" />
            <span className="text-[11px] font-black uppercase tracking-wide text-[var(--color-primary)]">Add Another Service</span>
          </button>
        </div>

        {/* Tips */}
        <div className="bg-[var(--muted)] rounded-xl border border-[var(--border)] p-4">
          <p className="text-[10px] font-black uppercase tracking-wide text-[var(--color-secondary)] mb-2">Tips for Better Visibility</p>
          <ul className="space-y-1.5">
            {["Be specific — 'Honda Genuine Spare Parts' not just 'Car Parts'", "Add all categories your business covers", "Use common search terms customers might use"].map((tip) => (
              <li key={tip} className="flex items-start gap-2">
                <span className="text-[var(--color-primary)] text-[10px] font-black mt-0.5">•</span>
                <span className="text-[11px] font-semibold text-[var(--color-secondary)]/60 leading-snug">{tip}</span>
              </li>
            ))}
          </ul>
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
