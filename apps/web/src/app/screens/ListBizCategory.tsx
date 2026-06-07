import { useState } from "react";
import { useNavigate, useLocation } from "react-router";
import { ArrowRight } from "lucide-react";
import { PageHeader } from "../components/PageHeader";

const STEPS = 6;
const INDUSTRIES = ["Agriculture", "Automotive", "Construction", "Education", "Energy & Mining", "Finance & Banking", "Food & Beverage", "Health & Wellness", "Logistics", "Retail & Commerce", "Technology", "Tourism & Hospitality"];
const CATEGORIES: Record<string, string[]> = {
  "Technology": ["Software", "Hardware", "Telecoms", "IT Services"],
  "Retail & Commerce": ["Supermarket", "Boutique", "Electronics", "Homeware"],
  "Agriculture": ["Crop Farming", "Livestock", "Agro-Processing", "Equipment"],
  "Automotive": ["Vehicle Sales", "Spare Parts", "Workshop", "Fleet Services"],
  "Health & Wellness": ["Clinic", "Pharmacy", "Gym & Fitness", "Beauty & Spa"],
};
const DEFAULT_CATS = ["General Services", "Trading", "Consulting", "Other"];

export function ListBizCategory() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const [industry, setIndustry] = useState("");
  const [category, setCategory] = useState("");

  const cats = industry && CATEGORIES[industry] ? CATEGORIES[industry] : DEFAULT_CATS;

  return (
    <div className="w-full max-w-md mx-auto min-h-screen bg-transparent font-sans pb-32">
      <PageHeader title="LIST YOUR BUSINESS" subtitle="Step 3 — Industry & Category" showBack />

      <div className="px-5 pt-5 space-y-5">
        <div className="flex gap-1.5">
          {Array.from({ length: STEPS }).map((_, i) => (
            <div key={i} className={`h-1.5 flex-1 rounded-full ${i < 2 ? "bg-[var(--color-primary)]" : "bg-[var(--border)]"}`} />
          ))}
        </div>

        <div className="bg-[var(--app-bg)] border border-[var(--border)] rounded-2xl shadow-sm p-5 space-y-4">
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[var(--color-secondary)]/50">Industry</p>
          <div className="flex flex-wrap gap-2">
            {INDUSTRIES.map((ind) => (
              <button key={ind} onClick={() => { setIndustry(ind); setCategory(""); }}
                className={`px-3 py-1.5 rounded-xl border text-[10px] font-black uppercase tracking-wide transition-all ${industry === ind ? "border-[var(--color-primary)] bg-[var(--color-primary)]/10 text-[var(--color-primary)]" : "border-[var(--border)] text-[var(--color-secondary)]/60"}`}>
                {ind}
              </button>
            ))}
          </div>
        </div>

        {industry && (
          <div className="bg-[var(--app-bg)] border border-[var(--border)] rounded-2xl shadow-sm p-5 space-y-4">
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[var(--color-secondary)]/50">Category</p>
            <div className="flex flex-wrap gap-2">
              {cats.map((cat) => (
                <button key={cat} onClick={() => setCategory(cat)}
                  className={`px-3 py-1.5 rounded-xl border text-[10px] font-black uppercase tracking-wide transition-all ${category === cat ? "border-[var(--color-primary)] bg-[var(--color-primary)]/10 text-[var(--color-primary)]" : "border-[var(--border)] text-[var(--color-secondary)]/60"}`}>
                  {cat}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="px-5 pt-4 pb-8">
        <button
          onClick={() => navigate("/marketplace/list/upload", { state: { ...state, industry, category } })}
          disabled={!industry || !category}
          className="w-full py-4 rounded-2xl bg-[var(--color-secondary)] text-white font-black uppercase tracking-widest text-[12px] flex items-center justify-center gap-3 disabled:opacity-40 disabled:cursor-not-allowed active:scale-95 transition-all"
        >
          Continue <ArrowRight size={18} />
        </button>
      </div>
    </div>
  );
}
