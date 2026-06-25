import { useState, useRef } from "react";
import { useNavigate, useLocation } from "react-router";
import { Plus, X, Image } from "lucide-react";
import { PageHeader } from "../components/PageHeader";
import { CtaButton } from "../components/CtaButton";

const PROVINCES = ["Lusaka", "Copperbelt", "Northern", "Eastern", "Western", "Southern", "Luapula", "Muchinga", "Central", "North-Western"];
const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const STEPS = 7;

export function SellServiceAvailability() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const imgRef = useRef<HTMLInputElement>(null);

  const [province, setProvince] = useState("");
  const [location, setLocation] = useState("");
  const [days, setDays] = useState<string[]>([]);
  const [capacity, setCapacity] = useState("");
  const [images, setImages] = useState<string[]>([]);
  const [boost, setBoost] = useState(false);

  const toggleDay = (d: string) => setDays((p) => p.includes(d) ? p.filter((x) => x !== d) : [...p, d]);

  const handleImages = (e: React.ChangeEvent<HTMLInputElement>) => {
    Array.from(e.target.files || []).forEach((f) => {
      const reader = new FileReader();
      reader.onload = (ev) => setImages((p) => [...p, ev.target?.result as string]);
      reader.readAsDataURL(f);
    });
  };

  const isFromBoostFlow = state?.sellType === "service";

  const handleContinue = () => {
    const nextState = { ...state, availability: { province, location, days, capacity }, gallery: images, boost };
    if (boost) {
      navigate("/marketplace/sell/product/boost", { state: nextState });
    } else {
      navigate("/marketplace/sell/service/review", { state: nextState });
    }
  };

  return (
    <div className="w-full max-w-md mx-auto bg-transparent font-sans pb-24">
      <PageHeader title="AVAILABILITY" subtitle="Step 6 of 7" showBack />

      <div className="px-5 pt-5 space-y-5">
        <div className="flex gap-1.5">
          {Array.from({ length: STEPS }).map((_, i) => (
            <div key={i} className={`h-1.5 flex-1 rounded-full ${i < 6 ? "bg-[var(--color-primary)]" : "bg-[var(--border)]"}`} />
          ))}
        </div>

        <div className="bg-[var(--app-bg)] rounded-3xl border-[3px] border-[var(--app-text)] shadow-[6px_6px_0_var(--app-text)] p-5 space-y-4">
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[var(--color-secondary)]/50">Location</p>
          <div className="space-y-3">
            <div className="space-y-1">
              <label className="text-[10px] font-black uppercase tracking-wider text-[var(--color-secondary)]/60">Province</label>
              <select value={province} onChange={(e) => setProvince(e.target.value)}
                className="w-full border-2 border-[var(--border)] rounded-xl px-4 py-3 text-[13px] font-semibold text-[var(--app-text)] bg-[var(--app-bg)] outline-none focus:border-[var(--app-text)] transition-all">
                <option value="">Select province</option>
                {PROVINCES.map((p) => <option key={p} value={p}>{p}</option>)}
              </select>
            </div>
            <div className="space-y-1">
              <label className="text-[10px] font-black uppercase tracking-wider text-[var(--color-secondary)]/60">Specific Location</label>
              <input value={location} onChange={(e) => setLocation(e.target.value)} placeholder="Area or address"
                className="w-full border-2 border-[var(--border)] rounded-xl px-4 py-3 text-[13px] font-semibold text-[var(--app-text)] bg-[var(--app-bg)] outline-none focus:border-[var(--app-text)] transition-all placeholder:text-[var(--color-secondary)]/30" />
            </div>
          </div>
        </div>

        <div className="bg-[var(--app-bg)] rounded-3xl border-[3px] border-[var(--app-text)] shadow-[6px_6px_0_var(--app-text)] p-5 space-y-4">
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[var(--color-secondary)]/50">Schedule & Capacity</p>
          <div className="space-y-3">
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-wider text-[var(--color-secondary)]/60">Available Days</label>
              <div className="flex flex-wrap gap-2">
                {DAYS.map((d) => (
                  <button key={d} onClick={() => toggleDay(d)}
                    className={`px-3 py-1.5 rounded-xl border-2 text-[10px] font-black uppercase tracking-wide transition-all ${days.includes(d) ? "border-[var(--color-primary)] bg-[var(--color-primary)]/10 text-[var(--color-primary)]" : "border-[var(--border)] text-[var(--color-secondary)]/60"}`}>
                    {d}
                  </button>
                ))}
              </div>
            </div>
            <div className="space-y-1">
              <label className="text-[10px] font-black uppercase tracking-wider text-[var(--color-secondary)]/60">Guest / Client Capacity</label>
              <input value={capacity} onChange={(e) => setCapacity(e.target.value)} placeholder="e.g. 50" type="number"
                className="w-full border-2 border-[var(--border)] rounded-xl px-4 py-3 text-[13px] font-semibold text-[var(--app-text)] bg-[var(--app-bg)] outline-none focus:border-[var(--app-text)] transition-all placeholder:text-[var(--color-secondary)]/30" />
            </div>
          </div>
        </div>

        <div className="bg-[var(--app-bg)] rounded-3xl border-[3px] border-[var(--app-text)] shadow-[6px_6px_0_var(--app-text)] p-5 space-y-4">
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[var(--color-secondary)]/50">Gallery</p>
          <input ref={imgRef} type="file" accept="image/*" multiple className="hidden" onChange={handleImages} />
          <div className="flex flex-wrap gap-2">
            {images.map((src, i) => (
              <div key={i} className="relative w-16 h-16 rounded-xl overflow-hidden border-2 border-[var(--border)]">
                <img src={src} alt="" className="w-full h-full object-cover" />
                <button onClick={() => setImages((p) => p.filter((_, j) => j !== i))}
                  className="absolute top-0.5 right-0.5 w-4 h-4 rounded-full bg-black/60 flex items-center justify-center">
                  <X size={8} className="text-white" />
                </button>
              </div>
            ))}
            <button onClick={() => imgRef.current?.click()}
              className="w-16 h-16 rounded-xl border-2 border-dashed border-[var(--color-primary)]/40 flex flex-col items-center justify-center gap-1 text-[var(--color-primary)]">
              <Image size={16} strokeWidth={2} />
              <span className="text-[8px] font-black uppercase">Add</span>
            </button>
          </div>
        </div>

        <div className="bg-[var(--app-bg)] rounded-2xl border-2 border-[var(--border)] p-4 flex items-center justify-between">
          <div>
            <p className="text-[12px] font-black text-[var(--app-text)] uppercase tracking-wide">Boost Service</p>
            <p className="text-[10px] font-semibold text-[var(--color-secondary)]/50">Get more inquiries with a boost</p>
          </div>
          <button onClick={() => setBoost(!boost)}
            className={`w-12 h-6 rounded-full transition-all relative ${boost ? "bg-[var(--color-primary)]" : "bg-[var(--border)]"}`}>
            <div className={`absolute top-0.5 w-5 h-5 rounded-full bg-white shadow transition-all ${boost ? "left-6" : "left-0.5"}`} />
          </button>
        </div>
      </div>

      <div className="px-5 pt-4 pb-8">
        <CtaButton onClick={handleContinue}>Continue</CtaButton>
      </div>
    </div>
  );
}
