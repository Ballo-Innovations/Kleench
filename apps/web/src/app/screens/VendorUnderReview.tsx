import { useNavigate, useLocation } from "react-router";
import { motion } from "motion/react";
import { Clock, CheckCircle, Bell, FileText, Home, ChevronRight } from "lucide-react";
import { PageHeader } from "../components/PageHeader";

const NEXT_STEPS = [
  { icon: FileText, title: "Application Received", desc: "Your application has been submitted successfully", done: true },
  { icon: CheckCircle, title: "Document Verification", desc: "Our team reviews your uploaded documents (1-2 days)", done: false },
  { icon: CheckCircle, title: "Business Verification", desc: "Physical verification if required (optional step)", done: false },
  { icon: Bell, title: "Approval Notification", desc: "You'll receive an SMS and in-app notification", done: false },
];

export function VendorUnderReview() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const businessName = state?.vendorInfo?.businessName || "Your Business";
  const refNo = `KL-VND-${Date.now().toString().slice(-8)}`;

  return (
    <div className="w-full max-w-md mx-auto bg-transparent font-sans pb-36">
      <PageHeader title="APPLICATION SUBMITTED" showBack={false} />

      <div className="px-5 pt-8 pb-36 space-y-6">
        {/* Status Illustration */}
        <div className="flex flex-col items-center text-center space-y-4">
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", bounce: 0.4, delay: 0.1 }}
            className="relative"
          >
            <div className="w-28 h-28 rounded-full bg-amber-100 border-4 border-amber-300 flex items-center justify-center">
              <Clock size={52} className="text-amber-500" strokeWidth={1.5} />
            </div>
            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.5, type: "spring", bounce: 0.6 }}
              className="absolute -bottom-1 -right-1 w-10 h-10 bg-[var(--color-primary)] rounded-full border-4 border-[var(--app-bg)] flex items-center justify-center">
              <span className="text-white text-[12px] font-black">!</span>
            </motion.div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
            <h2 className="font-black text-[22px] text-[var(--color-secondary)] uppercase tracking-tight mb-2">Under Review</h2>
            <p className="text-[13px] font-semibold text-[var(--color-secondary)]/50 leading-relaxed max-w-[280px] mx-auto">
              <span className="font-black text-[var(--color-secondary)]">{businessName}</span> has been submitted. We'll notify you within 2–3 business days.
            </p>
          </motion.div>

          <div className="bg-[var(--muted)] border border-[var(--border)] rounded-xl px-4 py-2.5">
            <span className="text-[9px] font-black uppercase tracking-[0.2em] text-[var(--color-secondary)]/50">Application Reference</span>
            <p className="text-[13px] font-black text-[var(--color-secondary)] mt-0.5">{refNo}</p>
          </div>
        </div>

        {/* What Happens Next */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
          className="bg-[var(--app-bg)] rounded-2xl border-[3px] border-[var(--app-text)] shadow-[4px_4px_0_var(--app-text)] overflow-hidden">
          <div className="px-4 py-3 bg-[var(--color-secondary)] text-white">
            <span className="text-[10px] font-black uppercase tracking-[0.2em]">What Happens Next?</span>
          </div>
          <div className="px-4 py-3 space-y-4">
            {NEXT_STEPS.map(({ icon: Icon, title, desc, done }, i) => (
              <div key={i} className="flex gap-3">
                <div className="flex flex-col items-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${done ? "bg-emerald-100" : "bg-[var(--muted)]"}`}>
                    <Icon size={16} className={done ? "text-emerald-500" : "text-[var(--color-secondary)]/40"} strokeWidth={2} />
                  </div>
                  {i < NEXT_STEPS.length - 1 && <div className="w-[2px] flex-1 bg-[var(--border)] mt-1.5" style={{ minHeight: "20px" }} />}
                </div>
                <div className="pb-3">
                  <p className={`text-[11px] font-black uppercase tracking-wide mb-0.5 ${done ? "text-emerald-600" : "text-[var(--color-secondary)]"}`}>{title}</p>
                  <p className="text-[10px] font-semibold text-[var(--color-secondary)]/50 leading-snug">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Actions */}
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.55 }} className="space-y-3">
          <button
            onClick={() => navigate("/vendor/dashboard", { state })}
            className="w-full py-4 rounded-2xl bg-[var(--color-secondary)] text-white font-black uppercase tracking-widest text-[12px] flex items-center justify-center gap-3 shadow-md active:scale-95 transition-all"
          >
            <FileText size={18} strokeWidth={2} />
            View My Application
          </button>
          <button
            onClick={() => navigate("/")}
            className="w-full py-4 rounded-2xl border-2 border-[var(--border)] bg-[var(--app-bg)] text-[var(--color-secondary)] font-black uppercase tracking-widest text-[12px] flex items-center justify-center gap-3 active:scale-95 transition-all"
          >
            <Home size={18} strokeWidth={2} />
            Go Home
          </button>
        </motion.div>
      </div>
    </div>
  );
}
