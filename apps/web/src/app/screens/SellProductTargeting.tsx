import { useState } from "react";
import { useNavigate, useLocation } from "react-router";
import { ArrowRight, Share2, Tag, Plus, X } from "lucide-react";
import { PageHeader } from "../components/PageHeader";

const PROVINCES = ["Lusaka", "Copperbelt", "Northern", "Eastern", "Western", "Southern", "Luapula", "Muchinga", "Central", "North-Western"];
const AGE_RANGES = ["18–24", "25–34", "35–44", "45–54", "55+"];
const GENDERS = ["All", "Male", "Female"];
const INTERESTS = ["Tech", "Fashion", "Automotive", "Agriculture", "Food", "Education", "Health", "Business"];
const STEPS = 5;

export function SellProductTargeting() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const [province, setProvince] = useState("");
  const [location, setLocation] = useState("");
  const [ages, setAges] = useState<string[]>([]);
  const [gender, setGender] = useState("All");
  const [interests, setInterests] = useState<string[]>([]);
  const [customInterests, setCustomInterests] = useState<string[]>([]);
  const [customInput, setCustomInput] = useState("");
  const [shareListing, setShareListing] = useState(false);
  const [allowOffers, setAllowOffers] = useState(false);

  const toggleAge = (a: string) => setAges((p) => p.includes(a) ? p.filter((x) => x !== a) : [...p, a]);
  const toggleInterest = (i: string) => setInterests((p) => p.includes(i) ? p.filter((x) => x !== i) : [...p, i]);

  const addCustomInterest = () => {
    const val = customInput.trim();
    if (val && !customInterests.includes(val) && !INTERESTS.includes(val)) {
      setCustomInterests((p) => [...p, val]);
    }
    setCustomInput("");
  };

  const removeCustomInterest = (val: string) => setCustomInterests((p) => p.filter((x) => x !== val));

  const getSuccessRoute = () => {
    const { sellType, saleType } = state || {};
    if (sellType === "service") return "/marketplace/sell/service/success";
    if (sellType === "complex" || saleType === "complex") return "/marketplace/sell/complex/terms";
    return "/marketplace/sell/product/success";
  };

  return (
    <div className="w-full max-w-md mx-auto min-h-screen bg-transparent font-sans pb-32">
      <PageHeader title="TARGET MARKET" subtitle="Step 5 of 5" showBack />

      <div className="px-5 pt-5 space-y-5">
        <div className="flex gap-1.5">
          {Array.from({ length: STEPS }).map((_, i) => (
            <div key={i} className="h-1.5 flex-1 rounded-full bg-[var(--color-primary)]" />
          ))}
        </div>

        <div className="bg-[var(--app-bg)] rounded-2xl border border-[var(--border)] shadow-sm p-5 space-y-4">
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[var(--color-secondary)]/50">Location</p>
          <div className="space-y-3">
            <div className="space-y-1">
              <label className="text-[10px] font-black uppercase tracking-wider text-[var(--color-secondary)]/60">Province</label>
              <select value={province} onChange={(e) => setProvince(e.target.value)}
                className="w-full border border-[var(--border)] rounded-xl px-4 py-3 text-[13px] font-semibold text-[var(--app-text)] bg-[var(--app-bg)] outline-none focus:border-[var(--app-text)] transition-all">
                <option value="">All Provinces</option>
                {PROVINCES.map((p) => <option key={p} value={p}>{p}</option>)}
              </select>
            </div>
            <div className="space-y-1">
              <label className="text-[10px] font-black uppercase tracking-wider text-[var(--color-secondary)]/60">Specific Location</label>
              <input value={location} onChange={(e) => setLocation(e.target.value)} placeholder="e.g. Kabulonga, Lusaka"
                className="w-full border border-[var(--border)] rounded-xl px-4 py-3 text-[13px] font-semibold text-[var(--app-text)] bg-[var(--app-bg)] outline-none focus:border-[var(--app-text)] transition-all placeholder:text-[var(--color-secondary)]/30" />
            </div>
          </div>
        </div>

        <div className="bg-[var(--app-bg)] rounded-2xl border border-[var(--border)] shadow-sm p-5 space-y-4">
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[var(--color-secondary)]/50">Audience</p>
          <div className="space-y-3">
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-wider text-[var(--color-secondary)]/60">Age Range</label>
              <div className="flex flex-wrap gap-2">
                {AGE_RANGES.map((a) => (
                  <button key={a} onClick={() => toggleAge(a)}
                    className={`px-3 py-1.5 rounded-xl border text-[10px] font-black uppercase tracking-wide transition-all ${ages.includes(a) ? "border-[var(--color-primary)] bg-[var(--color-primary)]/10 text-[var(--color-primary)]" : "border-[var(--border)] text-[var(--color-secondary)]/60"}`}>
                    {a}
                  </button>
                ))}
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-wider text-[var(--color-secondary)]/60">Gender</label>
              <div className="flex gap-2">
                {GENDERS.map((g) => (
                  <button key={g} onClick={() => setGender(g)}
                    className={`flex-1 py-2 rounded-xl border text-[10px] font-black uppercase tracking-wide transition-all ${gender === g ? "border-[var(--color-primary)] bg-[var(--color-primary)]/10 text-[var(--color-primary)]" : "border-[var(--border)] text-[var(--color-secondary)]/60"}`}>
                    {g}
                  </button>
                ))}
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-wider text-[var(--color-secondary)]/60">Interests</label>
              <div className="flex flex-wrap gap-2">
                {INTERESTS.map((i) => (
                  <button key={i} onClick={() => toggleInterest(i)}
                    className={`px-3 py-1.5 rounded-xl border text-[10px] font-black uppercase tracking-wide transition-all ${interests.includes(i) ? "border-[var(--color-primary)] bg-[var(--color-primary)]/10 text-[var(--color-primary)]" : "border-[var(--border)] text-[var(--color-secondary)]/60"}`}>
                    {i}
                  </button>
                ))}
                {customInterests.map((ci) => (
                  <span key={ci} className="flex items-center gap-1 px-3 py-1.5 rounded-xl border border-[var(--color-primary)] bg-[var(--color-primary)]/10">
                    <span className="text-[10px] font-black uppercase tracking-wide text-[var(--color-primary)]">{ci}</span>
                    <button onClick={() => removeCustomInterest(ci)} className="text-[var(--color-primary)]/60 active:opacity-50">
                      <X size={9} strokeWidth={2.5} />
                    </button>
                  </span>
                ))}
              </div>
              <div className="flex gap-2 mt-2">
                <input
                  value={customInput}
                  onChange={(e) => setCustomInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && addCustomInterest()}
                  placeholder="Add custom interest..."
                  className="flex-1 border border-[var(--border)] rounded-xl px-3 py-2 text-[12px] font-semibold text-[var(--app-text)] bg-[var(--app-bg)] outline-none focus:border-[var(--color-primary)] transition-all placeholder:text-[var(--color-secondary)]/30"
                />
                <button onClick={addCustomInterest}
                  className="px-3 py-2 rounded-xl bg-[var(--color-primary)]/10 border border-[var(--color-primary)]/30 text-[var(--color-primary)] active:scale-95 transition-all">
                  <Plus size={14} strokeWidth={2.5} />
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-[var(--app-bg)] rounded-2xl border border-[var(--border)] shadow-sm p-5 space-y-3">
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[var(--color-secondary)]/50">Options</p>
          {[
            { key: "share", label: "Share Listing", desc: "Allow users to share this listing", icon: Share2, value: shareListing, toggle: setShareListing },
            { key: "offers", label: "Allow Offers", desc: "Buyers can make price offers", icon: Tag, value: allowOffers, toggle: setAllowOffers },
          ].map(({ key, label, desc, icon: Icon, value, toggle }) => (
            <div key={key} className="flex items-center justify-between py-2">
              <div className="flex items-center gap-3">
                <Icon size={16} className="text-[var(--color-secondary)]" strokeWidth={2} />
                <div>
                  <p className="text-[12px] font-black text-[var(--app-text)] uppercase tracking-wide">{label}</p>
                  <p className="text-[10px] font-semibold text-[var(--color-secondary)]/50">{desc}</p>
                </div>
              </div>
              <button onClick={() => toggle(!value)}
                className={`w-12 h-6 rounded-full transition-all relative ${value ? "bg-[var(--color-primary)]" : "bg-[var(--border)]"}`}>
                <div className={`absolute top-0.5 w-5 h-5 rounded-full bg-white shadow transition-all ${value ? "left-6" : "left-0.5"}`} />
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="px-5 pt-4 pb-8">
        <button
          onClick={() => navigate(getSuccessRoute(), { state: { ...state, targeting: { province, location, ages, gender, interests: [...interests, ...customInterests] }, shareListing, allowOffers } })}
          className="w-full py-4 rounded-2xl bg-[var(--color-secondary)] text-white font-black uppercase tracking-widest text-[12px] flex items-center justify-center gap-3 active:scale-95 transition-all"
        >
          Publish Listing <ArrowRight size={18} />
        </button>
      </div>
    </div>
  );
}
