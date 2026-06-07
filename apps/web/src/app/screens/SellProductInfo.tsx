import { useState, useRef, useEffect } from "react";
import { useNavigate, useLocation } from "react-router";
import { motion } from "motion/react";
import { ArrowRight, Save, Users, Info } from "lucide-react";
import { PageHeader } from "../components/PageHeader";
import { FileUploadZone, UploadedFile } from "../components/FileUploadZone";

const CATEGORIES = ["Electronics", "Clothing & Fashion", "Food & Groceries", "Furniture", "Vehicles", "Tools & Equipment", "Books", "Other"];
const CONDITIONS = ["Brand New", "Like New", "Good", "Fair", "For Parts"];
const DELIVERY = [
  { id: "pickup", label: "Pickup" },
  { id: "courier", label: "Courier" },
  { id: "kleench", label: "KLeench Delivery" },
];
const STEPS = 4;

export function SellProductInfo() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const [form, setForm] = useState({ name: "", category: state?.category || "", subCategory: "", condition: "", price: "", quantity: "1", description: "" });
  const [delivery, setDelivery] = useState<string[]>([]);
  const [imageFiles, setImageFiles] = useState<UploadedFile[]>([]);
  const [videoFiles, setVideoFiles] = useState<UploadedFile[]>([]);
  const [draftSaved, setDraftSaved] = useState(false);
  const draftTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const set = (k: string, v: string) => {
    setForm((p) => ({ ...p, [k]: v }));
    setDraftSaved(false);
    if (draftTimer.current) clearTimeout(draftTimer.current);
    draftTimer.current = setTimeout(() => setDraftSaved(true), 1800);
  };

  useEffect(() => () => { if (draftTimer.current) clearTimeout(draftTimer.current); }, []);

  const estimatedReach = form.price
    ? Number(form.price) > 5000 ? "800 – 1,400" : Number(form.price) > 1000 ? "1,200 – 2,800" : "2,500 – 5,000"
    : null;

  const toggleDelivery = (id: string) => setDelivery((p) => p.includes(id) ? p.filter((x) => x !== id) : [...p, id]);

  const canContinue = form.name && form.category && form.condition && form.price && delivery.length > 0;

  return (
    <div className="w-full max-w-md mx-auto min-h-screen bg-transparent font-sans pb-32">
      <PageHeader title="PRODUCT INFO" subtitle="Step 2 of 4 — Product Information" showBack />

      <div className="px-5 pt-5 space-y-5">
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5 flex-1">
            {Array.from({ length: STEPS }).map((_, i) => (
              <div key={i} className={`h-1.5 flex-1 rounded-full transition-colors ${i < 2 ? "bg-[var(--color-primary)]" : "bg-[var(--border)]"}`} />
            ))}
          </div>
          {draftSaved && (
            <motion.div initial={{ opacity: 0, x: 4 }} animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#059669]/10 border border-[#059669]/20 shrink-0">
              <Save size={9} color="#059669" strokeWidth={2.5} />
              <span className="text-[8px] font-black uppercase tracking-widest text-[#059669]">Saved</span>
            </motion.div>
          )}
        </div>

        <div className="bg-[var(--app-bg)] rounded-3xl border-[3px] border-[var(--app-text)] shadow-[6px_6px_0_var(--app-text)] p-5 space-y-4">
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[var(--color-secondary)]/50">Product Details</p>

          <div className="space-y-3">
            {[
              { key: "name", label: "Product Name", placeholder: "e.g. Samsung Galaxy A55" },
              { key: "subCategory", label: "Sub Category", placeholder: "e.g. Smartphones" },
              { key: "price", label: "Price (ZMW)", placeholder: "0.00", type: "number" },
              { key: "quantity", label: "Quantity", placeholder: "1", type: "number" },
            ].map(({ key, label, placeholder, type }) => (
              <div key={key} className="space-y-1">
                <label className="text-[10px] font-black uppercase tracking-wider text-[var(--color-secondary)]/60">{label}</label>
                <input
                  type={type || "text"}
                  value={form[key as keyof typeof form]}
                  onChange={(e) => set(key, e.target.value)}
                  placeholder={placeholder}
                  className="w-full border-2 border-[var(--border)] rounded-xl px-4 py-3 text-[13px] font-semibold text-[var(--app-text)] bg-[var(--app-bg)] outline-none focus:border-[var(--app-text)] transition-all placeholder:text-[var(--color-secondary)]/30"
                />
              </div>
            ))}

            <div className="space-y-1">
              <label className="text-[10px] font-black uppercase tracking-wider text-[var(--color-secondary)]/60">Category</label>
              <select value={form.category} onChange={(e) => set("category", e.target.value)}
                className="w-full border-2 border-[var(--border)] rounded-xl px-4 py-3 text-[13px] font-semibold text-[var(--app-text)] bg-[var(--app-bg)] outline-none focus:border-[var(--app-text)] transition-all">
                <option value="">Select category</option>
                {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-black uppercase tracking-wider text-[var(--color-secondary)]/60">Condition</label>
              <div className="flex flex-wrap gap-2">
                {CONDITIONS.map((c) => (
                  <button key={c} onClick={() => set("condition", c)}
                    className={`px-3 py-1.5 rounded-xl border-2 text-[10px] font-black uppercase tracking-wide transition-all ${form.condition === c ? "border-[var(--app-text)] bg-[var(--color-primary)]/10 text-[var(--color-primary)]" : "border-[var(--border)] text-[var(--color-secondary)]/60"}`}>
                    {c}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-black uppercase tracking-wider text-[var(--color-secondary)]/60">Description</label>
              <textarea value={form.description} onChange={(e) => set("description", e.target.value)}
                placeholder="Describe your product..."
                rows={3}
                className="w-full border-2 border-[var(--border)] rounded-xl px-4 py-3 text-[13px] font-semibold text-[var(--app-text)] bg-[var(--app-bg)] outline-none focus:border-[var(--app-text)] transition-all resize-none placeholder:text-[var(--color-secondary)]/30" />
            </div>
          </div>
        </div>

        <div className="bg-[var(--app-bg)] rounded-2xl border border-[var(--border)] shadow-sm p-5 space-y-4">
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[var(--color-secondary)]/50">Media</p>
          <FileUploadZone
            label="Product Photos"
            accept="image/*"
            multiple
            maxFiles={8}
            hint="Up to 8 photos"
            onFilesChange={setImageFiles}
          />
          <FileUploadZone
            label="Product Video"
            accept="video/*"
            multiple={false}
            hint="Optional · max 1 video"
            onFilesChange={setVideoFiles}
          />
          <div className="flex items-start gap-1.5">
            <Info size={10} className="text-[var(--color-primary)]/60 shrink-0 mt-0.5" strokeWidth={2} />
            <p className="text-[9px] font-semibold text-[var(--color-secondary)]/50 leading-snug">Use bright, clear photos on a plain background. Listings with 3+ photos get 2× more clicks.</p>
          </div>
        </div>

        {estimatedReach && (
          <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-3 bg-[var(--color-primary)]/8 border border-[var(--color-primary)]/20 rounded-2xl px-4 py-3">
            <Users size={16} className="text-[var(--color-primary)] shrink-0" strokeWidth={2} />
            <div>
              <p className="text-[9px] font-black uppercase tracking-widest text-[var(--color-secondary)]/50">Estimated Organic Reach</p>
              <p className="text-[14px] font-black text-[var(--color-primary)]">{estimatedReach} <span className="text-[10px] text-[var(--color-secondary)]/50 font-semibold">buyers/week</span></p>
            </div>
          </motion.div>
        )}

        <div className="bg-[var(--app-bg)] rounded-3xl border-[3px] border-[var(--app-text)] shadow-[6px_6px_0_var(--app-text)] p-5 space-y-3">
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[var(--color-secondary)]/50">Delivery Options</p>
          <div className="space-y-2">
            {DELIVERY.map((d) => (
              <button key={d.id} onClick={() => toggleDelivery(d.id)}
                className={`w-full flex items-center justify-between px-4 py-3 rounded-xl border-2 transition-all ${delivery.includes(d.id) ? "border-[var(--color-primary)] bg-[var(--color-primary)]/8 text-[var(--color-primary)]" : "border-[var(--border)] text-[var(--color-secondary)]/70"}`}>
                <span className="text-[12px] font-black uppercase tracking-wide">{d.label}</span>
                <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${delivery.includes(d.id) ? "border-[var(--color-primary)] bg-[var(--color-primary)]" : "border-[var(--border)]"}`}>
                  {delivery.includes(d.id) && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="px-5 pt-4 pb-8">
        <button
          onClick={() => navigate("/marketplace/sell/product/boost", { state: { ...state, productInfo: { ...form, images: imageFiles.map((f) => ({ name: f.file.name, size: f.file.size, preview: f.preview })), video: videoFiles[0] ? { name: videoFiles[0].file.name, size: videoFiles[0].file.size } : null }, delivery } })}
          disabled={!canContinue}
          className="w-full py-4 rounded-2xl bg-[var(--color-secondary)] text-white font-black uppercase tracking-widest text-[12px] flex items-center justify-center gap-3 disabled:opacity-40 disabled:cursor-not-allowed active:scale-95 transition-all"
        >
          Continue <ArrowRight size={18} />
        </button>
      </div>
    </div>
  );
}
