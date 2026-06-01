import { useNavigate, useLocation } from "react-router";
import { motion } from "motion/react";
import { Edit2, ArrowRight, MapPin, Package, CheckCircle, Calendar } from "lucide-react";
import { PageHeader } from "../components/PageHeader";

const STEPS = 7;

function Section({ title, icon: Icon, color, onEdit, children }: {
  title: string; icon: React.ElementType; color: string; onEdit: () => void; children: React.ReactNode;
}) {
  return (
    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
      className="bg-[var(--app-bg)] rounded-3xl border-[3px] border-[var(--app-text)] shadow-[6px_6px_0_var(--app-text)] overflow-hidden">
      <div className="flex items-center justify-between px-5 py-3" style={{ backgroundColor: color + "18", borderBottom: `2px solid ${color}30` }}>
        <div className="flex items-center gap-2">
          <Icon size={14} style={{ color }} strokeWidth={2.5} />
          <p className="text-[11px] font-black uppercase tracking-widest" style={{ color }}>{title}</p>
        </div>
        <button onClick={onEdit} className="flex items-center gap-1 text-[9px] font-black uppercase tracking-widest text-[var(--color-secondary)]/50 active:opacity-70">
          <Edit2 size={11} strokeWidth={2} /> Edit
        </button>
      </div>
      <div className="px-5 py-4 space-y-2">{children}</div>
    </motion.div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-start justify-between gap-4 py-1.5 border-b border-[var(--border)] last:border-0">
      <span className="text-[10px] font-black uppercase tracking-wide text-[var(--color-secondary)]/50 shrink-0">{label}</span>
      <span className="text-[12px] font-bold text-[var(--color-secondary)] text-right leading-snug">{value || "—"}</span>
    </div>
  );
}

export function SellServiceReview() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const info = state?.serviceInfo || {};
  const avail = state?.availability || {};
  const packages = state?.packages || [];

  return (
    <div className="w-full max-w-md mx-auto min-h-screen bg-transparent font-sans pb-32">
      <PageHeader title="REVIEW" subtitle="Step 7 of 7" showBack />

      <div className="px-5 pt-5 space-y-5">
        <div className="flex gap-1.5">
          {Array.from({ length: STEPS }).map((_, i) => (
            <div key={i} className="h-1.5 flex-1 rounded-full bg-[var(--color-primary)]" />
          ))}
        </div>

        <Section title="Service Info" icon={Package} color="var(--color-primary)"
          onEdit={() => navigate("/marketplace/sell/service/info", { state })}>
          <Row label="Name" value={info.name} />
          <Row label="Category" value={state?.serviceCategory} />
          <Row label="Type" value={state?.serviceType} />
          <Row label="Short Description" value={info.shortDesc} />
        </Section>

        <Section title="Packages" icon={CheckCircle} color="#059669"
          onEdit={() => navigate("/marketplace/sell/service/packages", { state })}>
          {packages.map((pkg: any, i: number) => (
            <Row key={i} label={pkg.name} value={`ZMW ${pkg.price || "—"}`} />
          ))}
        </Section>

        <Section title="Availability" icon={Calendar} color="var(--color-secondary)"
          onEdit={() => navigate("/marketplace/sell/service/availability", { state })}>
          <Row label="Province" value={avail.province} />
          <Row label="Location" value={avail.location} />
          <Row label="Days" value={avail.days?.join(", ")} />
          <Row label="Capacity" value={avail.capacity ? `${avail.capacity} clients` : "—"} />
        </Section>

        {state?.boost && (
          <Section title="Boost" icon={MapPin} color="#D97706"
            onEdit={() => navigate("/marketplace/sell/product/boost", { state })}>
            <Row label="Boost Plan" value={state.boost} />
          </Section>
        )}
      </div>

      <div className="px-5 pt-4 pb-8 space-y-3">
        <button
          onClick={() => navigate("/marketplace/sell/service/success", { state })}
          className="w-full py-4 rounded-2xl bg-[var(--color-secondary)] text-white font-black uppercase tracking-widest text-[12px] flex items-center justify-center gap-3 active:scale-95 transition-all"
        >
          Publish Service <ArrowRight size={18} />
        </button>
        <button onClick={() => navigate(-1)}
          className="w-full py-4 rounded-2xl border-2 border-[var(--border)] bg-[var(--app-bg)] text-[var(--color-secondary)] font-black uppercase tracking-widest text-[12px] flex items-center justify-center active:scale-95 transition-all">
          Go Back
        </button>
      </div>
    </div>
  );
}
