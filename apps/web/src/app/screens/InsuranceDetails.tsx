import { useState, useRef } from "react";
import { useNavigate, useLocation } from "react-router";
import { motion, AnimatePresence } from "motion/react";
import { ChevronRight, Plus, X, Camera, Upload } from "lucide-react";
import { PageHeader } from "../components/PageHeader";
import { ZambiaFlag } from "../components/KleenchIcons";

const CURRENT_YEAR = new Date().getFullYear();
const YEARS = Array.from({ length: 30 }, (_, i) => String(CURRENT_YEAR - i));
const VEHICLE_MAKES = ["Toyota", "Honda", "Nissan", "Mazda", "Ford", "BMW", "Mercedes", "Volkswagen", "Hyundai", "Kia", "Isuzu", "Mitsubishi"];

export function InsuranceDetails() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const fileRef = useRef<HTMLInputElement>(null);

  const [form, setForm] = useState({
    ownerName: "",
    nrc: "",
    phone: "",
    regNumber: "",
    make: "",
    model: "",
    year: "",
    engine: "",
    usage: "private",
  });
  const [images, setImages] = useState<string[]>([]);
  const [error, setError] = useState("");

  const update = (k: string, v: string) => setForm((f) => ({ ...f, [k]: v }));

  const handleImages = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    files.forEach((file) => {
      const reader = new FileReader();
      reader.onloadend = () => setImages((prev) => [...prev, reader.result as string].slice(0, 4));
      reader.readAsDataURL(file);
    });
  };

  const handleSubmit = () => {
    if (!form.ownerName || !form.nrc || !form.phone || !form.regNumber || !form.make || !form.model || !form.year) {
      setError("Please fill in all required fields");
      return;
    }
    setError("");
    navigate("/insurance/summary", { state: { ...state, vehicleDetails: form, vehicleImages: images } });
  };

  const Label = ({ text }: { text: string }) => (
    <label className="block text-[10px] font-black uppercase tracking-widest text-[var(--color-secondary)] mb-1.5">{text}</label>
  );

  const Input = ({ placeholder, value, onChange, type = "text" }: { placeholder: string; value: string; onChange: (v: string) => void; type?: string }) => (
    <input
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className="w-full px-4 py-3.5 rounded-xl bg-[var(--app-bg)] border-2 border-[var(--border)] font-semibold text-[13px] text-[var(--app-text)] outline-none focus:border-[var(--color-primary)] transition-colors placeholder:text-[var(--color-secondary)]/30"
    />
  );

  return (
    <div className="w-full max-w-md mx-auto bg-transparent font-sans pb-36">
      <PageHeader title="POLICY DETAILS" subtitle="Step 4 of 5" showBack />

      <div className="px-5 pt-6 space-y-5">
        {/* KYC Section */}
        <div className="bg-[var(--color-secondary)] rounded-2xl px-4 py-2.5 inline-flex items-center gap-2">
          <span className="text-[9px] font-black uppercase tracking-[0.2em] text-white">Identity Verification</span>
        </div>

        <div className="space-y-3">
          <div>
            <Label text="Full Legal Name *" />
            <Input placeholder="As on your NRC" value={form.ownerName} onChange={(v) => update("ownerName", v)} />
          </div>
          <div>
            <Label text="NRC Number *" />
            <Input placeholder="e.g. 123456/78/1" value={form.nrc} onChange={(v) => update("nrc", v)} />
          </div>
          <div>
            <Label text="Phone Number *" />
            <div className="flex gap-2">
              <div className="flex items-center gap-1.5 px-3 rounded-xl bg-[var(--app-bg)] border-2 border-[var(--border)]">
                <ZambiaFlag size={18} />
                <span className="font-black text-[13px] text-[var(--color-secondary)]/60">+260</span>
              </div>
              <input
                type="tel"
                value={form.phone}
                onChange={(e) => update("phone", e.target.value.replace(/\D/g, "").slice(0, 10))}
                placeholder="9X XXX XXXX"
                className="flex-1 px-4 py-3.5 rounded-xl bg-[var(--app-bg)] border-2 border-[var(--border)] font-semibold text-[13px] text-[var(--app-text)] outline-none focus:border-[var(--color-primary)] transition-colors placeholder:text-[var(--color-secondary)]/30"
              />
            </div>
          </div>
        </div>

        {/* Vehicle Section */}
        <div className="bg-[var(--color-secondary)] rounded-2xl px-4 py-2.5 inline-flex items-center gap-2">
          <span className="text-[9px] font-black uppercase tracking-[0.2em] text-white">Vehicle Information</span>
        </div>

        <div className="space-y-3">
          <div>
            <Label text="Registration Number *" />
            <Input placeholder="e.g. AAA 1234" value={form.regNumber} onChange={(v) => update("regNumber", v.toUpperCase())} />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label text="Make *" />
              <select
                value={form.make}
                onChange={(e) => update("make", e.target.value)}
                className="w-full px-4 py-3.5 rounded-xl bg-[var(--app-bg)] border-2 border-[var(--border)] font-semibold text-[13px] text-[var(--app-text)] outline-none focus:border-[var(--color-primary)] transition-colors appearance-none"
              >
                <option value="">Select make</option>
                {VEHICLE_MAKES.map((m) => <option key={m} value={m}>{m}</option>)}
              </select>
            </div>
            <div>
              <Label text="Model *" />
              <Input placeholder="e.g. Corolla" value={form.model} onChange={(v) => update("model", v)} />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label text="Year *" />
              <select
                value={form.year}
                onChange={(e) => update("year", e.target.value)}
                className="w-full px-4 py-3.5 rounded-xl bg-[var(--app-bg)] border-2 border-[var(--border)] font-semibold text-[13px] text-[var(--app-text)] outline-none focus:border-[var(--color-primary)] transition-colors appearance-none"
              >
                <option value="">Year</option>
                {YEARS.map((y) => <option key={y} value={y}>{y}</option>)}
              </select>
            </div>
            <div>
              <Label text="Engine (cc)" />
              <Input placeholder="e.g. 1500" value={form.engine} onChange={(v) => update("engine", v.replace(/\D/g, ""))} />
            </div>
          </div>
          <div>
            <Label text="Vehicle Usage" />
            <div className="flex gap-2">
              {["private", "commercial", "government"].map((u) => (
                <button
                  key={u}
                  onClick={() => update("usage", u)}
                  className={`flex-1 py-3 rounded-xl border-2 text-[10px] font-black uppercase tracking-wide transition-all ${form.usage === u ? "border-[var(--color-primary)] bg-[var(--color-primary)]/10 text-[var(--color-primary)]" : "border-[var(--border)] bg-[var(--app-bg)] text-[var(--color-secondary)]/60"}`}
                >
                  {u}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Photo Upload */}
        <div className="bg-[var(--color-secondary)] rounded-2xl px-4 py-2.5 inline-flex items-center gap-2">
          <span className="text-[9px] font-black uppercase tracking-[0.2em] text-white">Vehicle Photos</span>
        </div>

        <div>
          <p className="text-[11px] font-semibold text-[var(--color-secondary)]/50 mb-3">
            Upload up to 4 photos of your vehicle (front, rear, sides).
          </p>
          <div className="flex gap-3 overflow-x-auto pb-1" style={{ scrollbarWidth: "none" }}>
            {images.map((img, i) => (
              <div key={i} className="relative w-20 h-20 rounded-xl overflow-hidden border-2 border-[var(--border)] shrink-0">
                <img src={img} alt={`Vehicle ${i + 1}`} className="w-full h-full object-cover" />
                <button
                  onClick={() => setImages((prev) => prev.filter((_, idx) => idx !== i))}
                  className="absolute top-1 right-1 w-5 h-5 bg-black/60 rounded-full flex items-center justify-center"
                >
                  <X size={10} className="text-white" />
                </button>
              </div>
            ))}
            {images.length < 4 && (
              <button
                onClick={() => fileRef.current?.click()}
                className="w-20 h-20 rounded-xl border-2 border-dashed border-[var(--color-primary)]/40 bg-[var(--color-primary)]/5 flex flex-col items-center justify-center gap-1 shrink-0 active:scale-95 transition-all"
              >
                <Plus size={20} className="text-[var(--color-primary)]" />
                <span className="text-[8px] font-black uppercase text-[var(--color-primary)]">Add</span>
              </button>
            )}
          </div>
          <input ref={fileRef} type="file" accept="image/*" multiple className="hidden" onChange={handleImages} />
        </div>

        <AnimatePresence>
          {error && (
            <motion.p initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
              className="text-red-500 text-[12px] font-bold text-center">{error}
            </motion.p>
          )}
        </AnimatePresence>
      </div>

      <div className="px-5 pt-2 pb-8">
        <button
          onClick={handleSubmit}
          className="w-full py-4 rounded-2xl bg-[var(--color-primary)] text-white font-black uppercase tracking-widest text-[13px] flex items-center justify-center gap-3 shadow-[0_8px_20px_rgba(255,140,0,0.3)] active:scale-95 transition-all"
        >
          Review Summary <ChevronRight size={18} strokeWidth={2.5} />
        </button>
      </div>
    </div>
  );
}
