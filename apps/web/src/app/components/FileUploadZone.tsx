import { useRef, useState, useEffect, useCallback, DragEvent } from "react";
import { motion, AnimatePresence } from "motion/react";
import { CloudUpload, FileText, Film, X, CheckCircle2, RefreshCw } from "lucide-react";

export interface UploadedFile {
  id: string;
  file: File;
  preview: string | null;   // object URL for images, null otherwise
  progress: number;          // 0–100
  done: boolean;
}

interface FileUploadZoneProps {
  accept: string;
  multiple?: boolean;
  maxFiles?: number;
  label: string;
  hint?: string;
  required?: boolean;
  onFilesChange: (files: UploadedFile[]) => void;
  className?: string;
}

function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function isImage(file: File) {
  return file.type.startsWith("image/");
}

export function FileUploadZone({
  accept,
  multiple = false,
  maxFiles = 10,
  label,
  hint,
  required = false,
  onFilesChange,
  className = "",
}: FileUploadZoneProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const [dragging, setDragging] = useState(false);

  // Notify parent whenever files change
  useEffect(() => {
    onFilesChange(files);
  }, [files]);

  // Revoke object URLs on unmount
  useEffect(() => {
    return () => {
      files.forEach((f) => { if (f.preview) URL.revokeObjectURL(f.preview); });
    };
  }, []);

  const simulateProgress = useCallback((id: string) => {
    const steps = [20, 45, 70, 88, 100];
    const delays = [80, 160, 260, 380, 560];
    steps.forEach((target, i) => {
      setTimeout(() => {
        setFiles((prev) =>
          prev.map((f) =>
            f.id === id ? { ...f, progress: target, done: target === 100 } : f
          )
        );
      }, delays[i]);
    });
  }, []);

  const addFiles = useCallback((incoming: FileList | null) => {
    if (!incoming || incoming.length === 0) return;
    const arr = Array.from(incoming).slice(0, maxFiles - (multiple ? 0 : files.length));
    const newEntries: UploadedFile[] = arr.map((file) => ({
      id: `${Date.now()}-${Math.random().toString(36).slice(2)}`,
      file,
      preview: isImage(file) ? URL.createObjectURL(file) : null,
      progress: 0,
      done: false,
    }));

    if (!multiple) {
      // Revoke previous object URL before replacing
      files.forEach((f) => { if (f.preview) URL.revokeObjectURL(f.preview); });
      setFiles(newEntries.slice(0, 1));
      if (newEntries[0]) simulateProgress(newEntries[0].id);
    } else {
      setFiles((prev) => {
        const combined = [...prev, ...newEntries].slice(0, maxFiles);
        return combined;
      });
      newEntries.forEach((e) => simulateProgress(e.id));
    }
  }, [files, multiple, maxFiles, simulateProgress]);

  const removeFile = (id: string) => {
    setFiles((prev) => {
      const entry = prev.find((f) => f.id === id);
      if (entry?.preview) URL.revokeObjectURL(entry.preview);
      return prev.filter((f) => f.id !== id);
    });
  };

  const onDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragging(true);
  };
  const onDragLeave = () => setDragging(false);
  const onDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragging(false);
    addFiles(e.dataTransfer.files);
  };

  const hasFiles = files.length > 0;

  return (
    <div className={`space-y-3 ${className}`}>
      {/* Label row */}
      <div className="flex items-center gap-1.5">
        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[var(--color-secondary)]/50">
          {label}
        </p>
        {required && <span className="text-[var(--color-primary)] text-[10px] font-black">*</span>}
        {hint && <span className="ml-auto text-[9px] font-semibold text-[var(--color-secondary)]/40">{hint}</span>}
      </div>

      {/* Drop zone */}
      <motion.div
        animate={{ borderColor: dragging ? "var(--color-primary)" : undefined, backgroundColor: dragging ? "var(--color-primary)" : undefined }}
        onClick={() => inputRef.current?.click()}
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
        onDrop={onDrop}
        className={`relative w-full rounded-2xl border-2 border-dashed cursor-pointer transition-all overflow-hidden select-none
          ${dragging
            ? "border-[var(--color-primary)] bg-[var(--color-primary)]/8"
            : hasFiles
            ? "border-[var(--color-primary)]/30 bg-[var(--color-primary)]/4"
            : "border-[var(--border)] bg-[var(--app-bg)] hover:border-[var(--color-secondary)]/40"
          }`}
      >
        <input
          ref={inputRef}
          type="file"
          accept={accept}
          multiple={multiple}
          className="hidden"
          onChange={(e) => addFiles(e.target.files)}
          onClick={(e) => { (e.target as HTMLInputElement).value = ""; }}
        />

        <AnimatePresence mode="wait">
          {!hasFiles ? (
            /* Empty state */
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center gap-3 py-8 px-5"
            >
              <motion.div
                animate={dragging ? { scale: 1.15, y: -4 } : { scale: 1, y: 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className={`w-14 h-14 rounded-2xl flex items-center justify-center ${dragging ? "bg-[var(--color-primary)]/20" : "bg-[var(--border)]/40"}`}
              >
                <CloudUpload
                  size={26}
                  color={dragging ? "var(--color-primary)" : "var(--color-secondary)"}
                  strokeWidth={1.5}
                />
              </motion.div>
              <div className="text-center space-y-1">
                <p className={`text-[11px] font-black uppercase tracking-wide ${dragging ? "text-[var(--color-primary)]" : "text-[var(--color-secondary)]/60"}`}>
                  {dragging ? "Drop to upload" : "Tap to browse or drag a file"}
                </p>
                <p className="text-[9px] font-semibold text-[var(--color-secondary)]/40">
                  {accept.replace(/\*/g, "any").replace(/,/g, ", ")}
                  {maxFiles > 1 && multiple ? ` · max ${maxFiles} files` : ""}
                </p>
              </div>
            </motion.div>
          ) : (
            /* File previews */
            <motion.div
              key="files"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="p-3 space-y-2"
            >
              {multiple && (
                /* Add more button for multi-file */
                <button
                  type="button"
                  onClick={(e) => { e.stopPropagation(); inputRef.current?.click(); }}
                  className={`w-full flex items-center justify-center gap-2 py-2 rounded-xl border border-dashed border-[var(--color-primary)]/30 text-[9px] font-black uppercase tracking-widest text-[var(--color-primary)] active:opacity-70 transition-all ${files.length >= maxFiles ? "opacity-30 pointer-events-none" : ""}`}
                >
                  <CloudUpload size={12} strokeWidth={2} />
                  Add {files.length >= maxFiles ? "(limit reached)" : "more"}
                </button>
              )}

              {files.map((f) => (
                <UploadItem key={f.id} file={f} onRemove={removeFile} />
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}

function UploadItem({ file, onRemove }: { file: UploadedFile; onRemove: (id: string) => void }) {
  const isImg = file.preview !== null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.92 }}
      className="flex items-center gap-3 bg-[var(--app-bg)] rounded-xl border border-[var(--border)] px-3 py-2.5 shadow-sm"
    >
      {/* Thumbnail or icon */}
      <div className="w-10 h-10 rounded-lg overflow-hidden shrink-0 bg-[var(--border)]/30 flex items-center justify-center">
        {isImg ? (
          <img src={file.preview!} alt={file.file.name} className="w-full h-full object-cover" />
        ) : file.file.type.startsWith("video/") ? (
          <Film size={18} color="var(--color-secondary)" strokeWidth={1.5} />
        ) : (
          <FileText size={18} color="var(--color-secondary)" strokeWidth={1.5} />
        )}
      </div>

      {/* Name + size + progress */}
      <div className="flex-1 min-w-0 space-y-1">
        <p className="text-[11px] font-bold text-[var(--app-text)] truncate leading-tight">{file.file.name}</p>
        <div className="flex items-center gap-2">
          <span className="text-[9px] font-semibold text-[var(--color-secondary)]/50">{formatBytes(file.file.size)}</span>
          {file.done && (
            <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-0.5 text-[9px] font-black text-[#059669]">
              <CheckCircle2 size={9} strokeWidth={2.5} /> Ready
            </motion.span>
          )}
        </div>
        {/* Progress bar */}
        <div className="h-1 bg-[var(--border)] rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${file.progress}%` }}
            transition={{ ease: "easeOut", duration: 0.3 }}
            className={`h-full rounded-full ${file.done ? "bg-[#059669]" : "bg-[var(--color-primary)]"}`}
          />
        </div>
      </div>

      {/* Status + remove */}
      <div className="flex items-center gap-1.5 shrink-0">
        {!file.done && (
          <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: "linear" }}>
            <RefreshCw size={12} color="var(--color-primary)" strokeWidth={2} />
          </motion.div>
        )}
        <button
          type="button"
          onClick={(e) => { e.stopPropagation(); onRemove(file.id); }}
          className="w-6 h-6 rounded-full bg-[var(--border)]/60 flex items-center justify-center active:scale-90 transition-all hover:bg-red-100"
        >
          <X size={10} color="var(--color-secondary)" strokeWidth={2.5} />
        </button>
      </div>
    </motion.div>
  );
}
