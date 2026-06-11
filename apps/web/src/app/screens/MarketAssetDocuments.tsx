import { useNavigate, useLocation, useParams } from "react-router";
import { motion } from "motion/react";
import { FileText, Download, Eye, ShieldCheck, ArrowRight } from "lucide-react";
import { PageHeader } from "../components/PageHeader";
import { toast } from "sonner";

const DOCS = [
  { id: "ownership", label: "Ownership Certificate", type: "PDF", size: "2.4 MB", verified: true, desc: "Official title document from ZEMA" },
  { id: "inspection", label: "Inspection Report", type: "PDF", size: "1.1 MB", verified: true, desc: "Third-party mechanical inspection" },
  { id: "service", label: "Service History", type: "PDF", size: "0.8 MB", verified: true, desc: "Full CAT dealer service records" },
  { id: "compliance", label: "Compliance Certificate", type: "PDF", size: "0.5 MB", verified: false, desc: "Environmental compliance docs" },
];

export function MarketAssetDocuments() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { state } = useLocation();

  return (
    <div className="w-full max-w-md mx-auto bg-transparent font-sans pb-24">
      <PageHeader title="DOCUMENTS" showBack />

      <div className="px-5 pt-5 space-y-4">
        <div className="bg-[var(--color-primary)]/8 border-2 border-[var(--color-primary)]/20 rounded-2xl p-4 flex gap-3">
          <ShieldCheck size={18} className="text-[var(--color-primary)] shrink-0 mt-0.5" strokeWidth={2} />
          <p className="text-[11px] font-semibold text-[var(--color-secondary)]/70 leading-snug">
            All documents have been <span className="font-black text-[var(--app-text)]">verified by KLeench</span>. Documents marked with a green badge are authenticated.
          </p>
        </div>

        {DOCS.map((doc, i) => (
          <motion.div key={doc.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}
            className="bg-[var(--app-bg)] rounded-2xl border-[3px] border-[var(--app-text)] shadow-[4px_4px_0_var(--app-text)] p-5">
            <div className="flex items-start gap-4">
              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 ${doc.verified ? "bg-[#059669]/15" : "bg-[var(--border)]/40"}`}>
                <FileText size={22} style={{ color: doc.verified ? "#059669" : "var(--color-secondary)" }} strokeWidth={2} />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <p className="text-[12px] font-black text-[var(--app-text)] uppercase tracking-wide">{doc.label}</p>
                  {doc.verified && (
                    <div className="flex items-center gap-0.5 bg-[#059669]/10 px-1.5 py-0.5 rounded-full">
                      <ShieldCheck size={8} className="text-[#059669]" strokeWidth={2.5} />
                      <span className="text-[7px] font-black uppercase text-[#059669]">Verified</span>
                    </div>
                  )}
                </div>
                <p className="text-[10px] font-semibold text-[var(--color-secondary)]/50 mt-0.5">{doc.desc}</p>
                <p className="text-[9px] font-black text-[var(--color-secondary)]/30 uppercase tracking-wide mt-1">{doc.type} · {doc.size}</p>
              </div>
            </div>
            <div className="flex gap-2 mt-4">
              <button onClick={() => toast.info(`Previewing ${doc.label}...`)}
                className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl border-2 border-[var(--border)] text-[var(--color-secondary)] text-[10px] font-black uppercase tracking-wide active:scale-95 transition-all">
                <Eye size={12} strokeWidth={2} /> Preview
              </button>
              <button onClick={() => toast.success(`Downloading ${doc.label}...`)}
                className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl border-2 border-[var(--color-primary)]/30 bg-[var(--color-primary)]/8 text-[var(--color-primary)] text-[10px] font-black uppercase tracking-wide active:scale-95 transition-all">
                <Download size={12} strokeWidth={2} /> Download
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="px-5 pt-4 pb-8">
        <button
          onClick={() => navigate(`/marketplace/asset/${id}/chat`, { state })}
          className="w-full py-4 rounded-2xl bg-[var(--color-secondary)] text-white font-black uppercase tracking-widest text-[12px] flex items-center justify-center gap-3 shadow-md active:scale-95 transition-all"
        >
          Chat Seller <ArrowRight size={18} />
        </button>
      </div>
    </div>
  );
}
