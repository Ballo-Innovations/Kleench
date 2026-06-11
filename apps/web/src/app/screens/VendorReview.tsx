import { useNavigate, useLocation } from "react-router";
import { motion } from "motion/react";
import { ChevronRight, ChevronLeft, Store, Landmark, Briefcase, FileText, Edit2, CheckCircle } from "lucide-react";
import { PageHeader } from "../components/PageHeader";

export function VendorReview() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const info = state?.vendorInfo || {};
  const bank = state?.bankDetails || {};
  const services: string[] = state?.services || [];

  const Section = ({ icon: Icon, title, items, editStep }: { icon: React.ElementType; title: string; items: { label: string; value: string }[]; editStep: number }) => (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
      className="bg-[var(--app-bg)] rounded-2xl border-2 border-[var(--border)] overflow-hidden shadow-sm">
      <div className="flex items-center justify-between px-4 py-3 bg-[var(--color-secondary)] text-white">
        <div className="flex items-center gap-2">
          <Icon size={15} strokeWidth={2} />
          <span className="text-[10px] font-black uppercase tracking-widest">{title}</span>
        </div>
        <button onClick={() => navigate(-editStep)} className="flex items-center gap-1 text-white/70 active:scale-90 transition-all">
          <Edit2 size={11} />
          <span className="text-[9px] font-black uppercase">Edit</span>
        </button>
      </div>
      <div className="px-4 py-1">
        {items.map(({ label, value }) => (
          <div key={label} className="flex items-center justify-between py-2.5 border-b border-[var(--border)] last:border-0">
            <span className="text-[10px] font-black uppercase tracking-wide text-[var(--color-secondary)]/50">{label}</span>
            <span className="text-[12px] font-semibold text-[var(--color-secondary)] text-right max-w-[55%] leading-snug">{value || "—"}</span>
          </div>
        ))}
      </div>
    </motion.div>
  );

  return (
    <div className="w-full max-w-md mx-auto bg-transparent font-sans pb-36">
      <PageHeader title="REVIEW APPLICATION" subtitle="Step 5 of 5" showBack />

      <div className="px-5 pt-6 space-y-4">
        <div>
          <h2 className="font-black text-[20px] text-[var(--color-secondary)] uppercase tracking-tight mb-1">Final Review</h2>
          <p className="text-[12px] font-semibold text-[var(--color-secondary)]/50">
            Confirm your details before submitting for approval.
          </p>
        </div>

        <Section icon={Store} title="Business Information" editStep={4}
          items={[
            { label: "Business Name", value: info.businessName },
            { label: "Sector", value: info.sector },
            { label: "Category", value: info.category },
            { label: "Province", value: info.province },
            { label: "Location", value: info.location },
            { label: "Phone", value: info.phone ? `+260 ${info.phone}` : "" },
            { label: "Email", value: info.email },
          ]}
        />

        <Section icon={Landmark} title="Bank Details" editStep={3}
          items={[
            { label: "Bank", value: bank.bank },
            { label: "Account No.", value: bank.accountNumber ? "••••" + bank.accountNumber.slice(-4) : "" },
            { label: "Branch", value: bank.branch },
          ]}
        />

        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
          className="bg-[var(--app-bg)] rounded-2xl border-2 border-[var(--border)] overflow-hidden shadow-sm">
          <div className="flex items-center justify-between px-4 py-3 bg-[var(--color-secondary)] text-white">
            <div className="flex items-center gap-2">
              <Briefcase size={15} strokeWidth={2} />
              <span className="text-[10px] font-black uppercase tracking-widest">Services ({services.length})</span>
            </div>
            <button onClick={() => navigate(-2)} className="flex items-center gap-1 text-white/70 active:scale-90 transition-all">
              <Edit2 size={11} />
              <span className="text-[9px] font-black uppercase">Edit</span>
            </button>
          </div>
          <div className="px-4 py-3 flex flex-wrap gap-2">
            {services.map((s, i) => (
              <span key={i} className="text-[10px] font-black uppercase tracking-wide px-3 py-1.5 rounded-full bg-[var(--muted)] border border-[var(--border)] text-[var(--color-secondary)]">{s}</span>
            ))}
          </div>
        </motion.div>

        {/* Uploads Summary */}
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}
          className="bg-[var(--app-bg)] rounded-2xl border-2 border-[var(--border)] overflow-hidden shadow-sm">
          <div className="flex items-center justify-between px-4 py-3 bg-[var(--color-secondary)] text-white">
            <div className="flex items-center gap-2">
              <FileText size={15} strokeWidth={2} />
              <span className="text-[10px] font-black uppercase tracking-widest">Documents</span>
            </div>
            <button onClick={() => navigate(-1)} className="flex items-center gap-1 text-white/70 active:scale-90 transition-all">
              <Edit2 size={11} />
              <span className="text-[9px] font-black uppercase">Edit</span>
            </button>
          </div>
          <div className="px-4 py-3 space-y-2">
            {[
              { label: "Business Logo", uploaded: !!state?.uploads?.logo },
              { label: "Business License", uploaded: !!state?.uploads?.license },
              { label: "Business Profile", uploaded: !!state?.uploads?.profile },
              { label: "Business Photos", uploaded: (state?.photos?.length || 0) > 0 },
            ].map(({ label, uploaded }) => (
              <div key={label} className="flex items-center justify-between">
                <span className="text-[11px] font-semibold text-[var(--color-secondary)]/70">{label}</span>
                <span className={`text-[10px] font-black uppercase ${uploaded ? "text-emerald-500" : "text-[var(--color-secondary)]/30"}`}>
                  {uploaded ? "✓ Uploaded" : "Not uploaded"}
                </span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Assurance */}
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
          className="bg-amber-50 border-2 border-amber-200 rounded-2xl p-4 flex gap-3">
          <CheckCircle size={18} className="text-amber-500 shrink-0 mt-0.5" strokeWidth={2} />
          <div>
            <p className="text-[11px] font-black uppercase tracking-wide text-amber-800 mb-1">Review Process</p>
            <p className="text-[11px] font-semibold text-amber-700/70 leading-snug">
              Applications are reviewed within 2-3 business days. You will receive an SMS notification once approved.
            </p>
          </div>
        </motion.div>
      </div>

      <div className="px-5 pt-2 pb-8">
        <button onClick={() => navigate("/vendor/under-review", { state })}
          className="w-full py-4 rounded-2xl bg-[var(--color-primary)] text-white font-black uppercase tracking-widest text-[13px] flex items-center justify-center gap-3 shadow-[0_8px_20px_rgba(255,140,0,0.3)] active:scale-95 transition-all">
          Submit for Approval <ChevronRight size={18} strokeWidth={2.5} />
        </button>
        <button onClick={() => navigate(-1)}
          className="w-full py-3.5 rounded-2xl border-2 border-[var(--border)] bg-[var(--app-bg)] text-[var(--color-secondary)] font-black uppercase tracking-widest text-[12px] flex items-center justify-center gap-3 active:scale-95 transition-all">
          <ChevronLeft size={16} strokeWidth={2.5} />
          Go Back
        </button>
      </div>
    </div>
  );
}
