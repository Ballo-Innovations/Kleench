import { useState, useRef } from "react";
import { useNavigate, useLocation } from "react-router";
import { motion, AnimatePresence } from "motion/react";
import { ChevronRight, Upload, X, FileText } from "lucide-react";
import { PageHeader } from "../components/PageHeader";

const BANKS = ["Zanaco", "FNB Zambia", "Stanbic Bank", "Standard Chartered", "Access Bank", "United Bank for Africa", "Atlas Mara", "Indo Zambia Bank", "Citibank Zambia", "Investrust Bank"];
const BRANCHES = ["Lusaka Main", "Cairo Road", "Kitwe", "Ndola", "Livingstone", "Chipata", "Kabwe", "Solwezi", "Kasama", "Mongu"];

export function VendorBankDetails() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const fileRef = useRef<HTMLInputElement>(null);

  const [form, setForm] = useState({ bank: "", accountNumber: "", branch: "", purpose: "" });
  const [letter, setLetter] = useState<string | null>(null);
  const [error, setError] = useState("");
  const update = (k: string, v: string) => setForm((f) => ({ ...f, [k]: v }));

  const handleLetterUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setLetter(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = () => {
    if (!form.bank || !form.accountNumber || !form.branch) {
      setError("Please fill in all required fields");
      return;
    }
    setError("");
    navigate("/vendor/services", { state: { ...state, bankDetails: form, confirmationLetter: letter } });
  };

  const inputCls = "w-full px-4 py-3.5 rounded-xl bg-[var(--app-bg)] border-2 border-[var(--border)] font-semibold text-[13px] text-[var(--app-text)] outline-none focus:border-[var(--color-primary)] transition-colors placeholder:text-[var(--color-secondary)]/30";
  const Label = ({ text }: { text: string }) => (
    <label className="block text-[10px] font-black uppercase tracking-widest text-[var(--color-secondary)] mb-1.5">{text}</label>
  );

  return (
    <div className="w-full max-w-md mx-auto min-h-screen bg-transparent font-sans pb-36">
      <PageHeader title="BANK DETAILS" subtitle="Step 2 of 5" showBack />

      <div className="px-5 pt-6 space-y-4">
        <div>
          <h2 className="font-black text-[20px] text-[var(--color-secondary)] uppercase tracking-tight mb-1">Bank Information</h2>
          <p className="text-[12px] font-semibold text-[var(--color-secondary)]/50">Your payout account for sales proceeds.</p>
        </div>

        <div>
          <Label text="Bank Name *" />
          <select value={form.bank} onChange={(e) => update("bank", e.target.value)} className={inputCls + " appearance-none"}>
            <option value="">Select your bank</option>
            {BANKS.map((b) => <option key={b} value={b}>{b}</option>)}
          </select>
        </div>

        <div>
          <Label text="Account Number *" />
          <input type="tel" value={form.accountNumber} onChange={(e) => update("accountNumber", e.target.value.replace(/\D/g, ""))} placeholder="Enter account number" className={inputCls} />
        </div>

        <div>
          <Label text="Branch Location *" />
          <select value={form.branch} onChange={(e) => update("branch", e.target.value)} className={inputCls + " appearance-none"}>
            <option value="">Select branch</option>
            {BRANCHES.map((b) => <option key={b} value={b}>{b}</option>)}
          </select>
        </div>

        {/* Confirmation Letter Upload */}
        <div>
          <Label text="Bank Confirmation Letter" />
          {letter ? (
            <motion.div initial={{ scale: 0.95 }} animate={{ scale: 1 }}
              className="flex items-center gap-3 p-4 rounded-xl bg-[var(--muted)] border-2 border-emerald-300">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center">
                <FileText size={18} className="text-emerald-600" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[11px] font-black uppercase tracking-wide text-[var(--color-secondary)]">Letter Uploaded</p>
                <p className="text-[10px] font-semibold text-emerald-600">Document ready ✓</p>
              </div>
              <button onClick={() => setLetter(null)} className="w-7 h-7 rounded-full bg-red-100 flex items-center justify-center active:scale-90 transition-all">
                <X size={12} className="text-red-500" />
              </button>
            </motion.div>
          ) : (
            <button onClick={() => fileRef.current?.click()}
              className="w-full py-4 rounded-xl border-2 border-dashed border-[var(--color-primary)]/40 bg-[var(--color-primary)]/5 flex items-center justify-center gap-3 active:scale-[0.98] transition-all">
              <Upload size={18} className="text-[var(--color-primary)]" />
              <span className="text-[12px] font-black uppercase tracking-wide text-[var(--color-primary)]">Upload Letter (PDF/Image)</span>
            </button>
          )}
          <input ref={fileRef} type="file" accept="image/*,.pdf" className="hidden" onChange={handleLetterUpload} />
        </div>

        {/* Payment Purpose */}
        <div>
          <Label text="Payment Purpose / Notes" />
          <textarea
            value={form.purpose}
            onChange={(e) => update("purpose", e.target.value)}
            placeholder="Briefly describe what this account will be used for..."
            rows={4}
            className="w-full px-4 py-3.5 rounded-xl bg-[var(--app-bg)] border-2 border-[var(--border)] font-semibold text-[13px] text-[var(--app-text)] outline-none focus:border-[var(--color-primary)] transition-colors placeholder:text-[var(--color-secondary)]/30 resize-none"
          />
        </div>

        <AnimatePresence>
          {error && <motion.p initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="text-red-500 text-[12px] font-bold text-center">{error}</motion.p>}
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
