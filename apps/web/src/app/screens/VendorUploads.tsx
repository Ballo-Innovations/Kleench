import { useState, useRef } from "react";
import { useNavigate, useLocation } from "react-router";
import { motion } from "motion/react";
import { ChevronRight, Upload, X, Camera, Plus } from "lucide-react";
import { PageHeader } from "../components/PageHeader";

type UploadSlot = { label: string; key: string; required: boolean; type: "image" | "doc" };

const UPLOAD_SLOTS: UploadSlot[] = [
  { label: "Business Logo", key: "logo", required: true, type: "image" },
  { label: "Business License / PACRA Certificate", key: "license", required: true, type: "doc" },
  { label: "Business Profile / Brochure", key: "profile", required: false, type: "doc" },
];

export function VendorUploads() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const [uploads, setUploads] = useState<Record<string, string>>({});
  const [photos, setPhotos] = useState<string[]>([]);
  const [description, setDescription] = useState("");
  const [history, setHistory] = useState("");
  const [error, setError] = useState("");
  const fileRefs = useRef<Record<string, HTMLInputElement | null>>({});
  const photoRef = useRef<HTMLInputElement>(null);

  const handleUpload = (key: string, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => setUploads((prev) => ({ ...prev, [key]: reader.result as string }));
    reader.readAsDataURL(file);
  };

  const handlePhotos = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    files.forEach((file) => {
      const reader = new FileReader();
      reader.onloadend = () => setPhotos((prev) => [...prev, reader.result as string].slice(0, 6));
      reader.readAsDataURL(file);
    });
  };

  const handleSubmit = () => {
    const missingRequired = UPLOAD_SLOTS.filter((s) => s.required && !uploads[s.key]);
    if (missingRequired.length > 0) {
      setError(`Please upload: ${missingRequired.map((s) => s.label).join(", ")}`);
      return;
    }
    if (!description.trim()) {
      setError("Please add a business description");
      return;
    }
    setError("");
    navigate("/vendor/review", { state: { ...state, uploads, photos, description, history } });
  };

  return (
    <div className="w-full max-w-md mx-auto min-h-screen bg-transparent font-sans pb-36">
      <PageHeader title="DOCUMENTS & MEDIA" subtitle="Step 4 of 5" showBack />

      <div className="px-5 pt-6 space-y-5">
        <div>
          <h2 className="font-black text-[20px] text-[var(--color-secondary)] uppercase tracking-tight mb-1">Upload Documents</h2>
          <p className="text-[12px] font-semibold text-[var(--color-secondary)]/50">Required for vendor verification.</p>
        </div>

        {/* Document Uploads */}
        <div className="space-y-3">
          {UPLOAD_SLOTS.map(({ label, key, required, type }) => {
            const uploaded = uploads[key];
            return (
              <div key={key}>
                <label className="block text-[10px] font-black uppercase tracking-widest text-[var(--color-secondary)] mb-1.5">
                  {label} {required ? "*" : "(Optional)"}
                </label>
                {uploaded ? (
                  <div className="flex items-center gap-3 p-3.5 rounded-xl bg-emerald-50 border-2 border-emerald-200">
                    {type === "image" ? (
                      <img src={uploaded} alt={label} className="w-10 h-10 rounded-lg object-cover border border-emerald-200" />
                    ) : (
                      <div className="w-10 h-10 rounded-lg bg-emerald-100 flex items-center justify-center">
                        <ChevronRight size={18} className="text-emerald-600" />
                      </div>
                    )}
                    <div className="flex-1">
                      <p className="text-[11px] font-black uppercase tracking-wide text-emerald-800">{label}</p>
                      <p className="text-[10px] font-semibold text-emerald-600">Uploaded ✓</p>
                    </div>
                    <button onClick={() => setUploads((prev) => { const n = { ...prev }; delete n[key]; return n; })}
                      className="w-7 h-7 rounded-full bg-red-100 flex items-center justify-center active:scale-90">
                      <X size={12} className="text-red-500" />
                    </button>
                  </div>
                ) : (
                  <button onClick={() => fileRefs.current[key]?.click()}
                    className="w-full py-4 rounded-xl border-2 border-dashed border-[var(--color-primary)]/40 bg-[var(--color-primary)]/5 flex items-center justify-center gap-3 active:scale-[0.98] transition-all">
                    <Upload size={16} className="text-[var(--color-primary)]" />
                    <span className="text-[11px] font-black uppercase tracking-wide text-[var(--color-primary)]">
                      {type === "image" ? "Upload Image" : "Upload Document"}
                    </span>
                  </button>
                )}
                <input ref={(el) => { fileRefs.current[key] = el; }} type="file" accept={type === "image" ? "image/*" : "image/*,.pdf"} className="hidden"
                  onChange={(e) => handleUpload(key, e)} />
              </div>
            );
          })}
        </div>

        {/* Business Photos Gallery */}
        <div>
          <label className="block text-[10px] font-black uppercase tracking-widest text-[var(--color-secondary)] mb-1.5">
            Business Photos (up to 6)
          </label>
          <div className="flex gap-3 overflow-x-auto pb-1" style={{ scrollbarWidth: "none" }}>
            {photos.map((photo, i) => (
              <div key={i} className="relative w-20 h-20 rounded-xl overflow-hidden border-2 border-[var(--border)] shrink-0">
                <img src={photo} alt="" className="w-full h-full object-cover" />
                <button onClick={() => setPhotos((prev) => prev.filter((_, idx) => idx !== i))}
                  className="absolute top-1 right-1 w-5 h-5 bg-black/60 rounded-full flex items-center justify-center">
                  <X size={10} className="text-white" />
                </button>
              </div>
            ))}
            {photos.length < 6 && (
              <button onClick={() => photoRef.current?.click()}
                className="w-20 h-20 rounded-xl border-2 border-dashed border-[var(--color-primary)]/40 bg-[var(--color-primary)]/5 flex flex-col items-center justify-center gap-1 shrink-0 active:scale-95 transition-all">
                <Plus size={18} className="text-[var(--color-primary)]" />
                <span className="text-[8px] font-black uppercase text-[var(--color-primary)]">Add</span>
              </button>
            )}
          </div>
          <input ref={photoRef} type="file" accept="image/*" multiple className="hidden" onChange={handlePhotos} />
        </div>

        {/* Business History */}
        <div>
          <label className="block text-[10px] font-black uppercase tracking-widest text-[var(--color-secondary)] mb-1.5">
            Business History (Optional)
          </label>
          <textarea value={history} onChange={(e) => setHistory(e.target.value)} placeholder="When was the business founded? Key milestones..." rows={3}
            className="w-full px-4 py-3.5 rounded-xl bg-[var(--app-bg)] border-2 border-[var(--border)] font-semibold text-[13px] text-[var(--app-text)] outline-none focus:border-[var(--color-primary)] transition-colors placeholder:text-[var(--color-secondary)]/30 resize-none" />
        </div>

        {/* Business Description */}
        <div>
          <label className="block text-[10px] font-black uppercase tracking-widest text-[var(--color-secondary)] mb-1.5">
            Business Description *
          </label>
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Describe what your business does, your products, and your value proposition..." rows={4}
            className="w-full px-4 py-3.5 rounded-xl bg-[var(--app-bg)] border-2 border-[var(--border)] font-semibold text-[13px] text-[var(--app-text)] outline-none focus:border-[var(--color-primary)] transition-colors placeholder:text-[var(--color-secondary)]/30 resize-none" />
        </div>

        {error && <p className="text-red-500 text-[12px] font-bold text-center">{error}</p>}
      </div>

      <div className="px-5 pt-2 pb-8">
        <button onClick={handleSubmit}
          className="w-full py-4 rounded-2xl bg-[var(--color-primary)] text-white font-black uppercase tracking-widest text-[13px] flex items-center justify-center gap-3 shadow-[0_8px_20px_rgba(255,140,0,0.3)] active:scale-95 transition-all">
          Review Application <ChevronRight size={18} strokeWidth={2.5} />
        </button>
      </div>
    </div>
  );
}
