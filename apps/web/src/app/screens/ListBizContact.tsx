import { useState } from "react";
import { useNavigate, useLocation } from "react-router";
import { ArrowRight, Phone, Mail, Globe, MapPin } from "lucide-react";
import { PageHeader } from "../components/PageHeader";

const STEPS = 6;
const PROVINCES = ["Lusaka", "Copperbelt", "Northern", "Eastern", "Western", "Southern", "Luapula", "Muchinga", "Central", "North-Western"];

export function ListBizContact() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [website, setWebsite] = useState("");
  const [address, setAddress] = useState("");
  const [province, setProvince] = useState("");

  const canContinue = phone.trim() && address.trim() && province;

  return (
    <div className="w-full max-w-md mx-auto min-h-screen bg-transparent font-sans pb-32">
      <PageHeader title="LIST YOUR BUSINESS" subtitle="Step 5 of 6 — Contact Details" showBack />

      <div className="px-5 pt-5 space-y-5">
        <div className="flex gap-1.5">
          {Array.from({ length: STEPS }).map((_, i) => (
            <div key={i} className={`h-1.5 flex-1 rounded-full ${i < 5 ? "bg-[var(--color-primary)]" : "bg-[var(--border)]"}`} />
          ))}
        </div>

        <div className="bg-[var(--app-bg)] border border-[var(--border)] rounded-2xl shadow-sm p-5 space-y-4">
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[var(--color-secondary)]/50">Contact Information</p>

          {[
            { key: "phone", label: "Phone Number", placeholder: "+260 977 000 000", icon: Phone, value: phone, set: setPhone, required: true },
            { key: "email", label: "Email Address", placeholder: "business@example.com", icon: Mail, value: email, set: setEmail, required: false },
            { key: "website", label: "Website", placeholder: "https://yoursite.com", icon: Globe, value: website, set: setWebsite, required: false },
            { key: "address", label: "Physical Address", placeholder: "e.g. Plot 100, Cairo Road, Lusaka", icon: MapPin, value: address, set: setAddress, required: true },
          ].map(({ key, label, placeholder, icon: Icon, value, set, required }) => (
            <div key={key} className="space-y-1">
              <label className="text-[10px] font-black uppercase tracking-wider text-[var(--color-secondary)]/60">
                {label} {required && <span className="text-[var(--color-primary)]">*</span>}
              </label>
              <div className="relative">
                <Icon size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--color-secondary)]/40" strokeWidth={2} />
                <input value={value} onChange={(e) => set(e.target.value)} placeholder={placeholder}
                  className="w-full border border-[var(--border)] rounded-xl pl-10 pr-4 py-3 text-[13px] font-semibold text-[var(--app-text)] bg-[var(--app-bg)] outline-none focus:border-[var(--app-text)] transition-all placeholder:text-[var(--color-secondary)]/30" />
              </div>
            </div>
          ))}

          <div className="space-y-1">
            <label className="text-[10px] font-black uppercase tracking-wider text-[var(--color-secondary)]/60">Province <span className="text-[var(--color-primary)]">*</span></label>
            <select value={province} onChange={(e) => setProvince(e.target.value)}
              className="w-full border border-[var(--border)] rounded-xl px-4 py-3 text-[13px] font-semibold text-[var(--app-text)] bg-[var(--app-bg)] outline-none focus:border-[var(--app-text)] transition-all">
              <option value="">Select province</option>
              {PROVINCES.map((p) => <option key={p} value={p}>{p}</option>)}
            </select>
          </div>
        </div>
      </div>

      <div className="px-5 pt-4 pb-8">
        <button
          onClick={() => navigate("/marketplace/list/hours", { state: { ...state, phone, email, website, address, province } })}
          disabled={!canContinue}
          className="w-full py-4 rounded-2xl bg-[var(--color-secondary)] text-white font-black uppercase tracking-widest text-[12px] flex items-center justify-center gap-3 disabled:opacity-40 disabled:cursor-not-allowed active:scale-95 transition-all"
        >
          Continue <ArrowRight size={18} />
        </button>
      </div>
    </div>
  );
}
