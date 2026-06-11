import { useState } from "react";
import { useNavigate, useLocation } from "react-router";
import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { PageHeader } from "../components/PageHeader";
import { FileUploadZone, UploadedFile } from "../components/FileUploadZone";

function toMeta(files: UploadedFile[]) {
  return files.map((f) => ({ name: f.file.name, size: f.file.size, type: f.file.type, preview: f.preview }));
}

export function ListUpload() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const totalSteps = state?.listingType === "priority" ? 10 : 8;

  const [logoFiles, setLogoFiles] = useState<UploadedFile[]>([]);
  const [coverFiles, setCoverFiles] = useState<UploadedFile[]>([]);
  const [docsFiles, setDocsFiles] = useState<UploadedFile[]>([]);

  const canContinue = logoFiles.length > 0 && logoFiles[0]?.done;

  return (
    <div className="w-full max-w-md mx-auto bg-transparent font-sans pb-24">
      <PageHeader title="LIST YOUR BUSINESS" subtitle="Step 4 — Upload Profile" showBack />

      <div className="px-5 pt-5 space-y-5">
        <div className="flex gap-1.5">
          {Array.from({ length: totalSteps }).map((_, i) => (
            <div key={i} className={`h-1.5 flex-1 rounded-full ${i < 4 ? "bg-[var(--color-primary)]" : "bg-[var(--border)]"}`} />
          ))}
        </div>

        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[var(--color-secondary)]/50">Upload your business assets</p>

        <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}
          className="bg-[var(--app-bg)] border border-[var(--border)] rounded-2xl shadow-sm p-4 space-y-5">
          <FileUploadZone
            label="Business Logo"
            accept="image/*"
            multiple={false}
            required
            hint="PNG or JPG, square format"
            onFilesChange={setLogoFiles}
          />
          <FileUploadZone
            label="Cover Image"
            accept="image/*"
            multiple={false}
            hint="Banner for your profile"
            onFilesChange={setCoverFiles}
          />
          <FileUploadZone
            label="Registration Documents"
            accept=".pdf,image/*"
            multiple={false}
            hint="PACRA cert or equivalent"
            onFilesChange={setDocsFiles}
          />
        </motion.div>
      </div>

      <div className="px-5 pt-4 pb-8">
        <button
          onClick={() => navigate("/marketplace/list/detail", {
            state: { ...state, logo: toMeta(logoFiles)[0] || null, cover: toMeta(coverFiles)[0] || null, docs: toMeta(docsFiles)[0] || null }
          })}
          disabled={!canContinue}
          className="w-full py-4 rounded-2xl bg-[var(--color-secondary)] text-white font-black uppercase tracking-widest text-[12px] flex items-center justify-center gap-3 disabled:opacity-40 disabled:cursor-not-allowed active:scale-95 transition-all">
          Continue <ArrowRight size={18} />
        </button>
      </div>
    </div>
  );
}
