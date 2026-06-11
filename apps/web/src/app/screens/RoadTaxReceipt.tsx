import { useNavigate, useLocation } from "react-router";
import { motion } from "motion/react";
import { Download, Share2, Home } from "lucide-react";
import { PageHeader } from "../components/PageHeader";
import { toast } from "sonner";
import rtsaLogo from "@/assets/Ratsa logo.png";

const PERIOD_LABELS: Record<string, { label: string; months: number }> = {
  "3months": { label: "3 Months", months: 3 },
  "6months": { label: "6 Months", months: 6 },
  "12months": { label: "12 Months (Annual)", months: 12 },
};

function addMonths(date: Date, months: number) {
  const d = new Date(date);
  d.setMonth(d.getMonth() + months);
  return d;
}

const today = new Date();
const fmt = (d: Date) => d.toLocaleDateString("en-ZM", { day: "2-digit", month: "short", year: "numeric" });

export function RoadTaxReceipt() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const period = state?.period || "12months";
  const details = state?.vehicleDetails || {};
  const total = state?.total || 1632;
  const periodData = PERIOD_LABELS[period];
  const receiptNo = `RTSA-${Date.now().toString().slice(-8)}`;
  const expiryDate = addMonths(today, periodData.months);

  return (
    <div className="w-full max-w-md mx-auto bg-transparent font-sans pb-36">
      <PageHeader title="TAX RECEIPT" showBack />

      <div className="px-5 pt-6 space-y-4">
        {/* Receipt Card */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
          className="bg-[var(--app-bg)] rounded-3xl border-[3px] border-[var(--app-text)] shadow-[6px_6px_0_var(--app-text)] overflow-hidden">
          {/* RTSA Header */}
          <div className="bg-[var(--color-secondary)] px-6 py-5 flex flex-col items-center text-white">
            <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mb-3 shadow-sm">
              <img src={rtsaLogo} alt="RTSA" className="w-full h-full object-contain p-1" />
            </div>
            <p className="text-[9px] font-black uppercase tracking-[0.3em] text-white/60 mb-0.5">Road Transport & Safety Authority</p>
            <h3 className="font-black text-[16px] uppercase tracking-tight">Official Tax Receipt</h3>
            <div className="mt-3 px-4 py-1.5 bg-emerald-500 rounded-full">
              <span className="text-[10px] font-black uppercase tracking-widest">Paid & Valid</span>
            </div>
          </div>

          {/* Receipt Body */}
          <div className="px-5 py-3 space-y-0">
            {[
              { label: "Receipt Number", value: receiptNo },
              { label: "Owner", value: details.ownerName || "—" },
              { label: "NRC Number", value: details.nrc || "—" },
              { label: "Registration No.", value: details.regNumber || "—" },
              { label: "Vehicle", value: details.make && details.model ? `${details.make} ${details.model} (${details.year})` : "—" },
              { label: "Engine Capacity", value: details.engine || "—" },
              { label: "Tax Period", value: periodData.label },
              { label: "Issue Date", value: fmt(today) },
              { label: "Expiry Date", value: fmt(expiryDate) },
            ].map(({ label, value }) => (
              <div key={label} className="flex items-center justify-between py-3 border-b border-[var(--border)] last:border-0">
                <span className="text-[10px] font-black uppercase tracking-wide text-[var(--color-secondary)]/50">{label}</span>
                <span className="text-[12px] font-bold text-[var(--color-secondary)] text-right max-w-[55%] leading-snug">{value}</span>
              </div>
            ))}
          </div>

          {/* Total */}
          <div className="mx-5 mb-5 bg-[var(--color-primary)]/8 border border-[var(--color-primary)]/20 rounded-2xl p-4 flex items-center justify-between">
            <span className="text-[11px] font-black uppercase tracking-wide text-[var(--color-secondary)]/60">Amount Paid</span>
            <span className="text-[20px] font-black text-[var(--color-primary)]">ZMW {(total).toLocaleString()}</span>
          </div>
        </motion.div>

        {/* Actions */}
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="space-y-3">
          <button onClick={() => toast.success("Receipt downloaded!")}
            className="w-full py-4 rounded-2xl bg-[var(--color-secondary)] text-white font-black uppercase tracking-widest text-[12px] flex items-center justify-center gap-3 shadow-md active:scale-95 transition-all">
            <Download size={18} strokeWidth={2} />
            Download Receipt
          </button>
          <button onClick={() => toast.success("Sharing receipt...")}
            className="w-full py-4 rounded-2xl border-2 border-[var(--color-primary)] bg-[var(--color-primary)]/5 text-[var(--color-primary)] font-black uppercase tracking-widest text-[12px] flex items-center justify-center gap-3 active:scale-95 transition-all">
            <Share2 size={18} strokeWidth={2} />
            Share Receipt
          </button>
          <button onClick={() => navigate("/")}
            className="w-full py-4 rounded-2xl border-2 border-[var(--border)] bg-[var(--app-bg)] text-[var(--color-secondary)] font-black uppercase tracking-widest text-[12px] flex items-center justify-center gap-3 active:scale-95 transition-all">
            <Home size={18} strokeWidth={2} />
            Back Home
          </button>
        </motion.div>
      </div>
    </div>
  );
}
