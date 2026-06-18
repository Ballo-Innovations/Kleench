import { useState, useRef } from "react";
import { useNavigate, useLocation } from "react-router";
import { Image, X, Info } from "lucide-react";
import { PageHeader } from "../components/PageHeader";
import { CtaButton } from "../components/CtaButton";

const STEPS = 6;

export function ListBizMedia() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const logoRef = useRef<HTMLInputElement>(null);
  const coverRef = useRef<HTMLInputElement>(null);
  const galleryRef = useRef<HTMLInputElement>(null);

  const [logo, setLogo] = useState<string | null>(null);
  const [cover, setCover] = useState<string | null>(null);
  const [gallery, setGallery] = useState<string[]>([]);

  const readFile = (file: File, cb: (src: string) => void) => {
    const reader = new FileReader();
    reader.onload = (e) => cb(e.target?.result as string);
    reader.readAsDataURL(file);
  };

  const handleLogo = (e: React.ChangeEvent<HTMLInputElement>) => { const f = e.target.files?.[0]; if (f) readFile(f, setLogo); };
  const handleCover = (e: React.ChangeEvent<HTMLInputElement>) => { const f = e.target.files?.[0]; if (f) readFile(f, setCover); };
  const handleGallery = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []).slice(0, 5 - gallery.length);
    files.forEach((f) => readFile(f, (src) => setGallery((p) => [...p, src])));
  };

  return (
    <div className="w-full max-w-md mx-auto bg-transparent font-sans pb-24">
      <PageHeader title="LIST YOUR BUSINESS" subtitle="Step 4 of 6 — Media" showBack />

      <input ref={logoRef} type="file" accept="image/*" className="hidden" onChange={handleLogo} />
      <input ref={coverRef} type="file" accept="image/*" className="hidden" onChange={handleCover} />
      <input ref={galleryRef} type="file" accept="image/*" multiple className="hidden" onChange={handleGallery} />

      <div className="px-5 pt-5 space-y-5">
        <div className="flex gap-1.5">
          {Array.from({ length: STEPS }).map((_, i) => (
            <div key={i} className={`h-1.5 flex-1 rounded-full ${i < 4 ? "bg-[var(--color-primary)]" : "bg-[var(--border)]"}`} />
          ))}
        </div>

        <div className="bg-[var(--app-bg)] border border-[var(--border)] rounded-2xl shadow-sm p-5 space-y-3">
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[var(--color-secondary)]/50">Business Logo</p>
          <div className="flex items-center gap-4">
            <div onClick={() => logoRef.current?.click()}
              className="w-20 h-20 rounded-2xl border border-dashed border-[var(--color-primary)]/40 flex items-center justify-center overflow-hidden cursor-pointer shrink-0">
              {logo ? <img src={logo} alt="Logo" className="w-full h-full object-cover" /> : (
                <div className="flex flex-col items-center gap-1 text-[var(--color-primary)]">
                  <Image size={20} strokeWidth={2} />
                  <span className="text-[8px] font-black uppercase">Upload</span>
                </div>
              )}
            </div>
            <div>
              <p className="text-[11px] font-black text-[var(--app-text)] uppercase tracking-wide">Company Logo</p>
              <p className="text-[10px] font-semibold text-[var(--color-secondary)]/50 mt-0.5">Square image · PNG or JPG</p>
              {logo && <button onClick={() => setLogo(null)} className="text-[9px] font-black text-red-400 uppercase tracking-wide mt-1 active:opacity-70">Remove</button>}
            </div>
          </div>
        </div>

        <div className="bg-[var(--app-bg)] border border-[var(--border)] rounded-2xl shadow-sm p-5 space-y-3">
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[var(--color-secondary)]/50">Cover Image</p>
          <div onClick={() => coverRef.current?.click()}
            className="w-full h-32 rounded-2xl border border-dashed border-[var(--color-secondary)]/30 flex items-center justify-center overflow-hidden cursor-pointer relative">
            {cover ? <img src={cover} alt="Cover" className="w-full h-full object-cover" /> : (
              <div className="flex flex-col items-center gap-1 text-[var(--color-secondary)]/40">
                <Image size={24} strokeWidth={1.5} />
                <span className="text-[10px] font-black uppercase">Upload Cover</span>
                <span className="text-[9px] font-semibold">1200 × 400px recommended</span>
              </div>
            )}
            {cover && (
              <button onClick={(e) => { e.stopPropagation(); setCover(null); }}
                className="absolute top-2 right-2 w-6 h-6 rounded-full bg-black/50 flex items-center justify-center">
                <X size={10} className="text-white" />
              </button>
            )}
          </div>
        </div>

        <div className="bg-[var(--app-bg)] border border-[var(--border)] rounded-2xl shadow-sm p-5 space-y-3">
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[var(--color-secondary)]/50">Gallery <span className="normal-case text-[var(--color-secondary)]/40">(up to 5)</span></p>
          <div className="flex flex-wrap gap-2">
            {gallery.map((src, i) => (
              <div key={i} className="relative w-16 h-16 rounded-xl overflow-hidden border border-[var(--border)]">
                <img src={src} alt="" className="w-full h-full object-cover" />
                <button onClick={() => setGallery((p) => p.filter((_, j) => j !== i))}
                  className="absolute top-0.5 right-0.5 w-4 h-4 rounded-full bg-black/60 flex items-center justify-center">
                  <X size={8} className="text-white" />
                </button>
              </div>
            ))}
            {gallery.length < 5 && (
              <button onClick={() => galleryRef.current?.click()}
                className="w-16 h-16 rounded-xl border border-dashed border-[var(--color-primary)]/40 flex flex-col items-center justify-center gap-1 text-[var(--color-primary)]">
                <Image size={16} strokeWidth={2} />
                <span className="text-[8px] font-black uppercase">Add</span>
              </button>
            )}
          </div>
          <div className="flex items-start gap-1.5">
            <Info size={10} className="text-[var(--color-primary)]/60 shrink-0 mt-0.5" strokeWidth={2} />
            <p className="text-[9px] font-semibold text-[var(--color-secondary)]/50">Listings with photos get 3× more profile views.</p>
          </div>
        </div>
      </div>

      <div className="px-5 pt-4 pb-8">
        <CtaButton onClick={() => navigate("/marketplace/list/contact", { state: { ...state, logo, cover, gallery } })}>Continue</CtaButton>
      </div>
    </div>
  );
}
