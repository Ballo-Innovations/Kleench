import { useState } from "react";
import { useNavigate } from "react-router";
import { motion } from "motion/react";
import { ArrowRight, Star } from "lucide-react";
import { PageHeader } from "../components/PageHeader";

const CATEGORIES = [
  "Electronics", "Clothing & Fashion", "Food & Groceries",
  "Furniture", "Vehicles", "Tools & Equipment",
  "Agriculture", "Automotive", "Books", "Other",
];

const LISTING_TYPES = [
  {
    id: "standard",
    label: "Standard Listing",
    desc: "Free listing visible to local buyers.",
    badge: null,
  },
  {
    id: "featured",
    label: "Featured Listing",
    desc: "Highlighted placement for maximum visibility.",
    badge: "RECOMMENDED",
  },
];

const STEPS = 4;

export function SellProductEntry() {
  const navigate = useNavigate();
  const [category, setCategory] = useState("");
  const [listingType, setListingType] = useState("standard");

  const canContinue = !!category;

  return (
    <div className="w-full max-w-md mx-auto min-h-screen bg-transparent font-sans pb-32">
      <PageHeader title="CREATE LISTING" subtitle="Step 1 of 4 — Choose Category" showBack />

      <div className="px-5 pt-5 space-y-5">
        {/* Progress */}
        <div className="flex gap-1.5">
          {Array.from({ length: STEPS }).map((_, i) => (
            <div key={i} className={`h-1.5 flex-1 rounded-full transition-colors ${i < 1 ? "bg-[var(--color-primary)]" : "bg-[var(--border)]"}`} />
          ))}
        </div>

        {/* Category */}
        <div className="bg-[var(--app-bg)] rounded-2xl border border-[var(--border)] shadow-sm p-5 space-y-3">
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[var(--color-secondary)]/50">Choose Category</p>
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map((cat) => (
              <button key={cat} onClick={() => setCategory(cat)}
                className={`px-3.5 py-2 rounded-xl border text-[11px] font-black uppercase tracking-wide transition-all ${
                  category === cat
                    ? "border-[var(--color-primary)] bg-[var(--color-primary)] text-white"
                    : "border-[var(--border)] text-[var(--color-secondary)]/60 bg-[var(--app-bg)]"
                }`}>
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Listing Type */}
        <div className="bg-[var(--app-bg)] rounded-2xl border border-[var(--border)] shadow-sm p-5 space-y-3">
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[var(--color-secondary)]/50">Listing Type</p>
          <div className="space-y-3">
            {LISTING_TYPES.map((lt) => (
              <motion.button key={lt.id} whileTap={{ scale: 0.98 }} onClick={() => setListingType(lt.id)}
                className={`w-full flex items-center gap-4 p-4 rounded-2xl border transition-all text-left relative ${
                  listingType === lt.id
                    ? "border-[var(--color-primary)] bg-[var(--color-primary)]/8"
                    : "border-[var(--border)] bg-[var(--app-bg)]"
                }`}>
                {lt.badge && (
                  <span className="absolute -top-2 right-3 text-[7px] font-black px-2 py-0.5 rounded-full bg-[var(--color-primary)] text-white uppercase tracking-widest">
                    {lt.badge}
                  </span>
                )}
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                  listingType === lt.id ? "bg-[var(--color-primary)]/15" : "bg-[var(--border)]/30"
                }`}>
                  <Star size={18} color={listingType === lt.id ? "var(--color-primary)" : "var(--color-secondary)"} strokeWidth={2} fill={listingType === lt.id ? "var(--color-primary)" : "none"} />
                </div>
                <div className="flex-1">
                  <p className="text-[12px] font-black uppercase tracking-wide text-[var(--app-text)]">{lt.label}</p>
                  <p className="text-[10px] font-semibold text-[var(--color-secondary)]/60 mt-0.5">{lt.desc}</p>
                </div>
                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 ${
                  listingType === lt.id ? "border-[var(--color-primary)] bg-[var(--color-primary)]" : "border-[var(--border)]"
                }`}>
                  {listingType === lt.id && <div className="w-2 h-2 rounded-full bg-white" />}
                </div>
              </motion.button>
            ))}
          </div>
        </div>
      </div>

      <div className="px-5 pt-4 pb-8">
        <button
          onClick={() => navigate("/marketplace/sell/product/info", { state: { sellType: "product", category, listingType } })}
          disabled={!canContinue}
          className="w-full py-4 rounded-2xl bg-[var(--color-secondary)] text-white font-black uppercase tracking-widest text-[12px] flex items-center justify-center gap-3 disabled:opacity-40 disabled:cursor-not-allowed active:scale-95 transition-all"
        >
          Continue <ArrowRight size={18} />
        </button>
      </div>
    </div>
  );
}
