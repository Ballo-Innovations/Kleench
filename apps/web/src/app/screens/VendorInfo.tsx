import { useState } from "react";
import { useNavigate } from "react-router";
import { motion, AnimatePresence } from "motion/react";
import { ChevronRight } from "lucide-react";
import { PageHeader } from "../components/PageHeader";
import { ZambiaFlag } from "../components/KleenchIcons";

const SECTORS = ["Retail & FMCG", "Food & Beverage", "Electronics", "Fashion & Apparel", "Agriculture", "Construction", "Health & Pharmacy", "Education", "Transport & Logistics", "Other"];
const CATEGORIES = ["Sole Trader", "Partnership", "Private Limited (Ltd)", "Public Limited (PLC)", "NGO / Non-Profit", "Cooperative"];
const PROVINCES = ["Lusaka", "Copperbelt", "Central", "Eastern", "Northern", "Luapula", "North-Western", "Western", "Southern", "Muchinga"];

export function VendorInfo() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    sector: "", category: "", businessName: "", province: "",
    location: "", phone: "", email: "", branches: "1",
  });
  const [error, setError] = useState("");
  const update = (k: string, v: string) => setForm((f) => ({ ...f, [k]: v }));

  const handleSubmit = () => {
    const required = ["sector", "category", "businessName", "province", "location", "phone", "email"];
    if (required.some((k) => !form[k as keyof typeof form])) {
      setError("Please fill in all required fields");
      return;
    }
    setError("");
    navigate("/vendor/bank", { state: { vendorInfo: form } });
  };

  const Label = ({ text }: { text: string }) => (
    <label className="block text-[10px] font-black uppercase tracking-widest text-[var(--color-secondary)] mb-1.5">{text}</label>
  );

  const inputCls = "w-full px-4 py-3.5 rounded-xl bg-[var(--app-bg)] border-2 border-[var(--border)] font-semibold text-[13px] text-[var(--app-text)] outline-none focus:border-[var(--color-primary)] transition-colors placeholder:text-[var(--color-secondary)]/30";

  const SelectField = ({ label, value, onChange, options, placeholder }: { label: string; value: string; onChange: (v: string) => void; options: string[]; placeholder: string }) => (
    <div>
      <Label text={label + " *"} />
      <select value={value} onChange={(e) => onChange(e.target.value)} className={inputCls + " appearance-none"}>
        <option value="">{placeholder}</option>
        {options.map((o) => <option key={o} value={o}>{o}</option>)}
      </select>
    </div>
  );

  return (
    <div className="w-full max-w-md mx-auto bg-transparent font-sans pb-36">
      <PageHeader title="BUSINESS INFORMATION" subtitle="Step 1 of 5" showBack />

      <div className="px-5 pt-6 space-y-4">
        <div>
          <h2 className="font-black text-[20px] text-[var(--color-secondary)] uppercase tracking-tight mb-1">Business Details</h2>
          <p className="text-[12px] font-semibold text-[var(--color-secondary)]/50">Tell us about your business.</p>
        </div>

        <SelectField label="Business Sector" value={form.sector} onChange={(v) => update("sector", v)} options={SECTORS} placeholder="Select sector" />
        <SelectField label="Business Category" value={form.category} onChange={(v) => update("category", v)} options={CATEGORIES} placeholder="Select category" />

        <div>
          <Label text="Business Name *" />
          <input type="text" value={form.businessName} onChange={(e) => update("businessName", e.target.value)} placeholder="Registered business name" className={inputCls} />
        </div>

        <SelectField label="Province" value={form.province} onChange={(v) => update("province", v)} options={PROVINCES} placeholder="Select province" />

        <div>
          <Label text="Physical Location *" />
          <input type="text" value={form.location} onChange={(e) => update("location", e.target.value)} placeholder="Street address, area" className={inputCls} />
        </div>

        <div>
          <Label text="Business Phone *" />
          <div className="flex gap-2">
            <div className="flex items-center gap-1.5 px-3 rounded-xl bg-[var(--app-bg)] border-2 border-[var(--border)]">
              <ZambiaFlag size={18} />
              <span className="font-black text-[13px] text-[var(--color-secondary)]/60">+260</span>
            </div>
            <input type="tel" value={form.phone} onChange={(e) => update("phone", e.target.value.replace(/\D/g, "").slice(0, 10))} placeholder="9X XXX XXXX"
              className="flex-1 px-4 py-3.5 rounded-xl bg-[var(--app-bg)] border-2 border-[var(--border)] font-semibold text-[13px] text-[var(--app-text)] outline-none focus:border-[var(--color-primary)] transition-colors placeholder:text-[var(--color-secondary)]/30" />
          </div>
        </div>

        <div>
          <Label text="Business Email *" />
          <input type="email" value={form.email} onChange={(e) => update("email", e.target.value)} placeholder="business@example.com" className={inputCls} />
        </div>

        <div>
          <Label text="Number of Branches" />
          <div className="flex gap-2">
            {["1", "2-5", "6-10", "10+"].map((b) => (
              <button key={b} onClick={() => update("branches", b)}
                className={`flex-1 py-3 rounded-xl border-2 text-[11px] font-black uppercase tracking-wide transition-all active:scale-95 ${form.branches === b ? "border-[var(--color-primary)] bg-[var(--color-primary)]/10 text-[var(--color-primary)]" : "border-[var(--border)] bg-[var(--app-bg)] text-[var(--color-secondary)]/60"}`}>
                {b}
              </button>
            ))}
          </div>
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
