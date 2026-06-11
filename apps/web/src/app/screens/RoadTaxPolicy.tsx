import { useNavigate, useLocation } from "react-router";
import { motion } from "motion/react";
import { ChevronRight, AlertTriangle, Car } from "lucide-react";
import { PageHeader } from "../components/PageHeader";

const PERIOD_LABELS: Record<string, { label: string; months: number; price: number }> = {
  "3months": { label: "3 Months", months: 3, price: 480 },
  "6months": { label: "6 Months", months: 6, price: 880 },
  "12months": { label: "12 Months (Annual)", months: 12, price: 1600 },
};

const today = new Date();

function addMonths(date: Date, months: number) {
  const d = new Date(date);
  d.setMonth(d.getMonth() + months);
  return d;
}

const fmt = (d: Date) => d.toLocaleDateString("en-ZM", { day: "2-digit", month: "short", year: "numeric" });

export function RoadTaxPolicy() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const period = state?.period || "12months";
  const details = state?.vehicleDetails || {};
  const vehicleClass = state?.vehicleClass || "private";
  const multiplier = vehicleClass === "commercial" ? 1.8 : 1;

  const periodData = PERIOD_LABELS[period];
  const baseAmount = Math.round(periodData.price * multiplier);
  const processingFee = Math.round(baseAmount * 0.02);
  const total = baseAmount + processingFee;
  const expiryDate = addMonths(today, periodData.months);

  const Row = ({ label, value, bold }: { label: string; value: string; bold?: boolean }) => (
    <div className="flex items-center justify-between py-2.5 border-b border-[var(--border)] last:border-0">
      <span className="text-[10px] font-black uppercase tracking-wide text-[var(--color-secondary)]/50">{label}</span>
      <span className={`text-[12px] font-${bold ? "black" : "semibold"} ${bold ? "text-[var(--color-primary)]" : "text-[var(--color-secondary)]"}`}>{value}</span>
    </div>
  );

  return (
    <div className="w-full max-w-md mx-auto bg-transparent font-sans pb-36">
      <PageHeader title="TAX POLICY" subtitle="Step 3 of 3" showBack />

      <div className="px-5 pt-6 space-y-4">
        <div>
          <h2 className="font-black text-[20px] text-[var(--color-secondary)] uppercase tracking-tight mb-1">Policy Summary</h2>
          <p className="text-[12px] font-semibold text-[var(--color-secondary)]/50">Review details before proceeding to payment.</p>
        </div>

        {/* Policy Card */}
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
          className="bg-[var(--app-bg)] rounded-2xl border-2 border-[var(--border)] overflow-hidden shadow-sm">
          <div className="flex items-center gap-2 px-4 py-3 bg-[var(--color-secondary)] text-white">
            <Car size={15} strokeWidth={2} />
            <span className="text-[10px] font-black uppercase tracking-widest">Vehicle & Owner</span>
          </div>
          <div className="px-4 py-1">
            <Row label="Owner" value={details.ownerName || "—"} />
            <Row label="Registration" value={details.regNumber || "—"} />
            <Row label="Vehicle" value={details.make && details.model ? `${details.make} ${details.model}` : "—"} />
            <Row label="Year" value={details.year || "—"} />
            <Row label="Engine" value={details.engine || "—"} />
            <Row label="Vehicle Class" value={vehicleClass.charAt(0).toUpperCase() + vehicleClass.slice(1)} />
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
          className="bg-[var(--app-bg)] rounded-2xl border-2 border-[var(--border)] overflow-hidden shadow-sm">
          <div className="px-4 py-3 bg-[var(--color-secondary)] text-white">
            <span className="text-[10px] font-black uppercase tracking-widest">Tax Breakdown</span>
          </div>
          <div className="px-4 py-1">
            <Row label="Period" value={periodData.label} />
            <Row label="Start Date" value={fmt(today)} />
            <Row label="Expiry Date" value={fmt(expiryDate)} />
            <Row label="Base Amount" value={`ZMW ${baseAmount.toLocaleString()}`} />
            <Row label="Processing Fee (2%)" value={`ZMW ${processingFee.toLocaleString()}`} />
          </div>
          <div className="px-4 py-3 bg-[var(--color-primary)]/5 border-t-2 border-[var(--color-primary)]/20 flex items-center justify-between">
            <span className="text-[11px] font-black uppercase tracking-wide text-[var(--color-secondary)]">Total Payable</span>
            <span className="text-[20px] font-black text-[var(--color-primary)]">ZMW {total.toLocaleString()}</span>
          </div>
        </motion.div>

        {/* Info Alert */}
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
          className="bg-amber-50 border-2 border-amber-200 rounded-2xl p-4 flex gap-3">
          <AlertTriangle size={18} className="text-amber-500 shrink-0 mt-0.5" strokeWidth={2} />
          <div>
            <p className="text-[11px] font-black uppercase tracking-wide text-amber-800 mb-1">Important Notice</p>
            <p className="text-[11px] font-semibold text-amber-700/70 leading-snug">
              Driving without valid road tax is an offence under the Roads and Road Traffic Act, Chapter 464. Ensure your tax is paid before the expiry date.
            </p>
          </div>
        </motion.div>
      </div>

      <div className="px-5 pt-2 pb-8">
        <div className="flex items-center justify-between mb-3">
          <span className="text-[11px] font-black uppercase tracking-wide text-[var(--color-secondary)]/50">Total Due</span>
          <span className="text-[16px] font-black text-[var(--color-primary)]">ZMW {total.toLocaleString()}</span>
        </div>
        <button onClick={() => navigate("/road-tax/payment", { state: { ...state, total } })}
          className="w-full py-4 rounded-2xl bg-[var(--color-primary)] text-white font-black uppercase tracking-widest text-[13px] flex items-center justify-center gap-3 shadow-[0_8px_20px_rgba(255,140,0,0.3)] active:scale-95 transition-all">
          Pay Now <ChevronRight size={18} strokeWidth={2.5} />
        </button>
      </div>
    </div>
  );
}
