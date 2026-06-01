import { useState, useRef } from "react";
import { useNavigate, useLocation } from "react-router";
import { ArrowRight, FileText, X, Upload } from "lucide-react";
import { PageHeader } from "../components/PageHeader";

const STEPS = 7;

type DocFile = { name: string; size: string };

export function SellComplexPricing() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const ownerRef = useRef<HTMLInputElement>(null);
  const inspectionRef = useRef<HTMLInputElement>(null);
  const additionalRef = useRef<HTMLInputElement>(null);

  const [price, setPrice] = useState("");
  const [deposit, setDeposit] = useState("");
  const [inspectionRequired, setInspectionRequired] = useState(false);
  const [ownerDoc, setOwnerDoc] = useState<DocFile | null>(null);
  const [inspectionDoc, setInspectionDoc] = useState<DocFile | null>(null);
  const [additionalDocs, setAdditionalDocs] = useState<DocFile[]>([]);

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>, setter: (f: DocFile) => void) => {
    const file = e.target.files?.[0];
    if (file) setter({ name: file.name, size: `${(file.size / 1024).toFixed(1)} KB` });
  };
  const handleAdditional = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setAdditionalDocs((p) => [...p, ...files.map((f) => ({ name: f.name, size: `${(f.size / 1024).toFixed(1)} KB` }))]);
  };

  const canContinue = price && ownerDoc;

  return (
    <div className="w-full max-w-md mx-auto min-h-screen bg-transparent font-sans pb-32">
      <PageHeader title="PRICING & DOCS" subtitle="Step 4 of 7" showBack />

      <div className="px-5 pt-5 space-y-5">
        <div className="flex gap-1.5">
          {Array.from({ length: STEPS }).map((_, i) => (
            <div key={i} className={`h-1.5 flex-1 rounded-full ${i < 4 ? "bg-[var(--color-primary)]" : "bg-[var(--border)]"}`} />
          ))}
        </div>

        <div className="bg-[var(--app-bg)] rounded-3xl border-[3px] border-[var(--app-text)] shadow-[6px_6px_0_var(--app-text)] p-5 space-y-4">
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[var(--color-secondary)]/50">Pricing</p>
          <div className="space-y-3">
            {[
              { key: "price", label: "Sale Price (ZMW)", value: price, set: setPrice, placeholder: "0.00" },
              { key: "deposit", label: "Deposit Amount (ZMW)", value: deposit, set: setDeposit, placeholder: "0.00" },
            ].map(({ key, label, value, set, placeholder }) => (
              <div key={key} className="space-y-1">
                <label className="text-[10px] font-black uppercase tracking-wider text-[var(--color-secondary)]/60">{label}</label>
                <input value={value} onChange={(e) => set(e.target.value)} type="number" placeholder={placeholder}
                  className="w-full border-2 border-[var(--border)] rounded-xl px-4 py-3 text-[13px] font-semibold text-[var(--app-text)] bg-[var(--app-bg)] outline-none focus:border-[var(--app-text)] transition-all placeholder:text-[var(--color-secondary)]/30" />
              </div>
            ))}
            <div className="flex items-center justify-between py-2">
              <div>
                <p className="text-[12px] font-black text-[var(--app-text)] uppercase tracking-wide">Inspection Required</p>
                <p className="text-[10px] font-semibold text-[var(--color-secondary)]/50">Buyer must inspect before purchase</p>
              </div>
              <button onClick={() => setInspectionRequired(!inspectionRequired)}
                className={`w-12 h-6 rounded-full transition-all relative ${inspectionRequired ? "bg-[var(--color-primary)]" : "bg-[var(--border)]"}`}>
                <div className={`absolute top-0.5 w-5 h-5 rounded-full bg-white shadow transition-all ${inspectionRequired ? "left-6" : "left-0.5"}`} />
              </button>
            </div>
          </div>
        </div>

        <div className="bg-[var(--app-bg)] rounded-3xl border-[3px] border-[var(--app-text)] shadow-[6px_6px_0_var(--app-text)] p-5 space-y-4">
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[var(--color-secondary)]/50">Documents</p>
          <input ref={ownerRef} type="file" accept=".pdf,.jpg,.png" className="hidden" onChange={(e) => handleFile(e, setOwnerDoc)} />
          <input ref={inspectionRef} type="file" accept=".pdf,.jpg,.png" className="hidden" onChange={(e) => handleFile(e, setInspectionDoc)} />
          <input ref={additionalRef} type="file" accept=".pdf,.jpg,.png" multiple className="hidden" onChange={handleAdditional} />

          {[
            { label: "Ownership Certificate", required: true, doc: ownerDoc, ref: ownerRef, clear: () => setOwnerDoc(null) },
            { label: "Inspection Report", required: false, doc: inspectionDoc, ref: inspectionRef, clear: () => setInspectionDoc(null) },
          ].map(({ label, required, doc, ref, clear }) => (
            <div key={label} className="space-y-2">
              <div className="flex items-center gap-1.5">
                <label className="text-[10px] font-black uppercase tracking-wider text-[var(--color-secondary)]/60">{label}</label>
                {required && <span className="text-[8px] font-black text-[#DC2626] uppercase">Required</span>}
              </div>
              {doc ? (
                <div className="flex items-center gap-3 p-3 bg-[var(--color-primary)]/8 rounded-xl border border-[var(--color-primary)]/20">
                  <FileText size={16} className="text-[var(--color-primary)] shrink-0" strokeWidth={2} />
                  <div className="flex-1 min-w-0">
                    <p className="text-[11px] font-black text-[var(--app-text)] truncate">{doc.name}</p>
                    <p className="text-[9px] font-semibold text-[var(--color-secondary)]/50">{doc.size}</p>
                  </div>
                  <button onClick={clear} className="w-6 h-6 rounded-full bg-[var(--border)] flex items-center justify-center active:scale-90">
                    <X size={10} className="text-[var(--color-secondary)]" />
                  </button>
                </div>
              ) : (
                <button onClick={() => ref.current?.click()}
                  className="w-full flex items-center justify-center gap-2 py-3 border-2 border-dashed border-[var(--color-primary)]/30 rounded-xl text-[10px] font-black uppercase tracking-widest text-[var(--color-primary)]/70 active:opacity-70 transition-all">
                  <Upload size={14} strokeWidth={2} /> Upload {label}
                </button>
              )}
            </div>
          ))}

          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-wider text-[var(--color-secondary)]/60">Additional Documents</label>
            {additionalDocs.map((doc, i) => (
              <div key={i} className="flex items-center gap-3 p-3 bg-[var(--border)]/30 rounded-xl">
                <FileText size={14} className="text-[var(--color-secondary)] shrink-0" strokeWidth={2} />
                <p className="flex-1 text-[11px] font-semibold text-[var(--app-text)] truncate">{doc.name}</p>
                <button onClick={() => setAdditionalDocs((p) => p.filter((_, j) => j !== i))} className="w-5 h-5 rounded-full bg-[var(--border)] flex items-center justify-center">
                  <X size={8} className="text-[var(--color-secondary)]" />
                </button>
              </div>
            ))}
            <button onClick={() => additionalRef.current?.click()}
              className="w-full flex items-center justify-center gap-2 py-3 border-2 border-dashed border-[var(--border)] rounded-xl text-[10px] font-black uppercase tracking-widest text-[var(--color-secondary)]/40 active:opacity-70 transition-all">
              <Upload size={14} strokeWidth={2} /> Add Document
            </button>
          </div>
        </div>
      </div>

      <div className="px-5 pt-4 pb-8">
        <button
          onClick={() => navigate("/marketplace/sell/product/boost", { state: { ...state, pricing: { price, deposit, inspectionRequired }, documents: { ownerDoc, inspectionDoc, additionalDocs } } })}
          disabled={!canContinue}
          className="w-full py-4 rounded-2xl bg-[var(--color-secondary)] text-white font-black uppercase tracking-widest text-[12px] flex items-center justify-center gap-3 disabled:opacity-40 disabled:cursor-not-allowed active:scale-95 transition-all"
        >
          Continue <ArrowRight size={18} />
        </button>
      </div>
    </div>
  );
}
