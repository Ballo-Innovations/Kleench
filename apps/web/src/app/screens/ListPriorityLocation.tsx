import { useState } from "react";
import { useNavigate, useLocation } from "react-router";
import { motion } from "motion/react";
import { MapPin, X, Plus } from "lucide-react";
import { PageHeader } from "../components/PageHeader";
import { CtaButton } from "../components/CtaButton";

const COUNTRIES = ["Zambia", "Zimbabwe", "Malawi", "South Africa", "Kenya", "Tanzania", "Botswana", "Mozambique", "Uganda", "United Kingdom", "USA", "China"];

export function ListPriorityLocation() {
  const navigate = useNavigate();
  const { state } = useLocation();

  const [headOfficeCountry, setHeadOfficeCountry] = useState("");
  const [operatingCountries, setOperatingCountries] = useState<string[]>(["Zambia"]);
  const [countryInput, setCountryInput] = useState("");
  const [showCountrySugg, setShowCountrySugg] = useState(false);
  const [website, setWebsite] = useState("");
  const [email, setEmail] = useState("");

  const addCountry = (c: string) => {
    if (!operatingCountries.includes(c)) setOperatingCountries((prev) => [...prev, c]);
    setCountryInput(""); setShowCountrySugg(false);
  };
  const removeCountry = (c: string) => setOperatingCountries((prev) => prev.filter((x) => x !== c));

  const suggestions = COUNTRIES.filter(
    (c) => c.toLowerCase().includes(countryInput.toLowerCase()) && !operatingCountries.includes(c)
  );

  const canContinue = headOfficeCountry.trim().length > 0;

  return (
    <div className="w-full bg-transparent font-sans pb-24">
      <PageHeader title="LIST YOUR BUSINESS" subtitle="Step 6 — Business Location" showBack />

      <div className="px-5 pt-5 space-y-5">
        <div className="flex gap-1.5">
          {Array.from({ length: 10 }).map((_, i) => (
            <div key={i} className={`h-1.5 flex-1 rounded-full ${i < 6 ? "bg-[var(--color-primary)]" : "bg-[var(--border)]"}`} />
          ))}
        </div>

        <div className="flex items-start gap-3 bg-[var(--color-secondary)]/8 border border-[var(--color-secondary)]/20 rounded-2xl px-4 py-3">
          <MapPin size={15} className="text-[var(--color-secondary)] shrink-0 mt-0.5" strokeWidth={2} />
          <p className="text-[11px] font-semibold text-[var(--color-secondary)]/70 leading-snug">
            Where is your business located? This helps buyers and partners find you faster.
          </p>
        </div>

        <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}
          className="bg-[var(--app-bg)] border border-[var(--border)] rounded-2xl shadow-sm p-5 space-y-4">

          {/* Business Type — pre-filled from previous step */}
          <div className="space-y-1">
            <label className="text-[10px] font-black uppercase tracking-wider text-[var(--color-secondary)]/60">Business Type</label>
            <div className="w-full border border-[var(--border)] rounded-xl px-4 py-3 text-[13px] font-semibold text-[var(--color-secondary)]/50 bg-[var(--app-bg-muted)]">
              {state?.bizType || "—"}
            </div>
          </div>

          {/* Head Office Country */}
          <div className="space-y-1">
            <label className="text-[10px] font-black uppercase tracking-wider text-[var(--color-secondary)]/60">
              Head Office Country <span className="text-[var(--color-primary)]">*</span>
            </label>
            <select
              value={headOfficeCountry}
              onChange={(e) => setHeadOfficeCountry(e.target.value)}
              className="w-full border border-[var(--border)] rounded-xl px-4 py-3 text-[13px] font-semibold text-[var(--app-text)] bg-[var(--app-bg)] outline-none focus:border-[var(--app-text)] transition-all appearance-none"
            >
              <option value="">Select country</option>
              {COUNTRIES.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>

          {/* Operating Countries — tag chips */}
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-wider text-[var(--color-secondary)]/60">
              Operating Countries <span className="text-[var(--color-secondary)]/40">(Optional)</span>
            </label>
            <div className="flex flex-wrap gap-1.5">
              {operatingCountries.map((c) => (
                <span key={c} className="flex items-center gap-1 px-3 py-1 rounded-full bg-[var(--color-primary)]/10 border border-[var(--color-primary)]/20 text-[11px] font-bold text-[var(--color-primary)]">
                  {c}
                  <button onClick={() => removeCountry(c)} className="ml-0.5 active:scale-90 transition-all">
                    <X size={11} strokeWidth={2.5} />
                  </button>
                </span>
              ))}
              <div className="relative">
                <button
                  onClick={() => setShowCountrySugg(!showCountrySugg)}
                  className="flex items-center gap-1 px-3 py-1 rounded-full border-2 border-dashed border-[var(--border)] text-[11px] font-bold text-[var(--color-secondary)]/50 active:scale-95 transition-all"
                >
                  <Plus size={11} strokeWidth={2.5} /> Add
                </button>
                {showCountrySugg && (
                  <div className="absolute top-8 left-0 z-10 w-48 bg-[var(--app-bg)] border border-[var(--border)] rounded-xl shadow-lg overflow-hidden">
                    <input
                      autoFocus
                      value={countryInput}
                      onChange={(e) => setCountryInput(e.target.value)}
                      placeholder="Search..."
                      className="w-full px-3 py-2 text-[12px] font-semibold text-[var(--app-text)] bg-transparent outline-none border-b border-[var(--border)] placeholder:text-[var(--color-secondary)]/30"
                    />
                    {suggestions.slice(0, 5).map((c) => (
                      <button key={c} onClick={() => addCountry(c)}
                        className="w-full text-left px-3 py-2 text-[12px] font-semibold text-[var(--app-text)] hover:bg-[var(--color-primary)]/6 transition-all border-b border-[var(--border)] last:border-0">
                        {c}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Website */}
          <div className="space-y-1">
            <label className="text-[10px] font-black uppercase tracking-wider text-[var(--color-secondary)]/60">
              Website <span className="text-[var(--color-secondary)]/40">(Optional)</span>
            </label>
            <input value={website} onChange={(e) => setWebsite(e.target.value)} placeholder="e.g. www.yourbusiness.co.zm"
              className="w-full border border-[var(--border)] rounded-xl px-4 py-3 text-[13px] font-semibold text-[var(--app-text)] bg-[var(--app-bg)] outline-none focus:border-[var(--app-text)] transition-all placeholder:text-[var(--color-secondary)]/30" />
          </div>

          {/* Email */}
          <div className="space-y-1">
            <label className="text-[10px] font-black uppercase tracking-wider text-[var(--color-secondary)]/60">
              Email.com <span className="text-[var(--color-secondary)]/40">(Optional)</span>
            </label>
            <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="info@yourbusiness.co.zm" type="email"
              className="w-full border border-[var(--border)] rounded-xl px-4 py-3 text-[13px] font-semibold text-[var(--app-text)] bg-[var(--app-bg)] outline-none focus:border-[var(--app-text)] transition-all placeholder:text-[var(--color-secondary)]/30" />
          </div>
        </motion.div>
      </div>

      <div className="px-5 pt-4 pb-8">
        <CtaButton onClick={() => navigate("/marketplace/list/showcase", { state: { ...state, headOfficeCountry, operatingCountries, website, email } })} disabled={!canContinue}>Continue</CtaButton>
      </div>
    </div>
  );
}
