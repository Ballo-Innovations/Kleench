import { useState } from "react";
import { useNavigate, useLocation } from "react-router";
import { PageHeader } from "../components/PageHeader";
import { CtaButton } from "../components/CtaButton";

const STEPS = 7;

const WARRANTY_OPTIONS = ["No Warranty", "30 Days", "90 Days", "6 Months", "1 Year", "As Per Manufacturer"];
const RETURN_OPTIONS = ["No Returns", "Returns within 3 days of inspection", "Returns within 7 days of inspection", "Final Sale — No Returns"];
const INSPECTION_OPTIONS = ["Buyer pays inspection", "Seller pays inspection", "Both parties share", "Not Required"];
const DELIVERY_OPTIONS = ["Buyer arranges transport", "Seller delivers within Lusaka", "KLeench Logistics", "Nationwide delivery included"];

export function SellComplexTerms() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const [warranty, setWarranty] = useState("");
  const [returns, setReturns] = useState("");
  const [inspection, setInspection] = useState("");
  const [delivery, setDelivery] = useState("");

  const canContinue = warranty && returns && inspection && delivery;

  return (
    <div className="w-full max-w-md mx-auto bg-transparent font-sans pb-24">
      <PageHeader title="TERMS" subtitle="Step 6 of 7" showBack />

      <div className="px-5 pt-5 space-y-5">
        <div className="flex gap-1.5">
          {Array.from({ length: STEPS }).map((_, i) => (
            <div key={i} className={`h-1.5 flex-1 rounded-full ${i < 6 ? "bg-[var(--color-primary)]" : "bg-[var(--border)]"}`} />
          ))}
        </div>

        {[
          { label: "Warranty", options: WARRANTY_OPTIONS, value: warranty, set: setWarranty },
          { label: "Return Policy", options: RETURN_OPTIONS, value: returns, set: setReturns },
          { label: "Inspection Rules", options: INSPECTION_OPTIONS, value: inspection, set: setInspection },
          { label: "Delivery Terms", options: DELIVERY_OPTIONS, value: delivery, set: setDelivery },
        ].map(({ label, options, value, set }) => (
          <div key={label} className="bg-[var(--app-bg)] rounded-3xl border-[3px] border-[var(--app-text)] shadow-[6px_6px_0_var(--app-text)] p-5 space-y-3">
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[var(--color-secondary)]/50">{label}</p>
            <div className="space-y-2">
              {options.map((opt) => (
                <button key={opt} onClick={() => set(opt)}
                  className={`w-full flex items-center justify-between px-4 py-3 rounded-xl border-2 transition-all text-left ${
                    value === opt ? "border-[var(--color-primary)] bg-[var(--color-primary)]/8 text-[var(--color-primary)]" : "border-[var(--border)] text-[var(--color-secondary)]/70"
                  }`}>
                  <span className="text-[12px] font-black uppercase tracking-wide">{opt}</span>
                  <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0 ${value === opt ? "border-[var(--color-primary)] bg-[var(--color-primary)]" : "border-[var(--border)]"}`}>
                    {value === opt && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                  </div>
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="px-5 pt-4 pb-8">
        <CtaButton onClick={() => navigate("/marketplace/sell/complex/success", { state: { ...state, terms: { warranty, returns, inspection, delivery } } })} disabled={!canContinue}>Publish Asset</CtaButton>
      </div>
    </div>
  );
}
