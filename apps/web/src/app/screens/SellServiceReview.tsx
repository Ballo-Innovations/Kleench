import { useNavigate, useLocation } from "react-router";
import { motion } from "motion/react";
import { Edit2, ArrowRight, Package, CheckCircle, Zap } from "lucide-react";
import { PageHeader } from "../components/PageHeader";

const STEPS = 5;

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
  const packages = state?.packages || [];

  const categoryLabels: Record<string, string> = {
    marketing: "Marketing", events: "Events", technology: "Technology",
    education: "Education", construction: "Construction", hospitality: "Hospitality",
    finance: "Finance", health: "Health",
  };

  return (
    <div className="w-full max-w-md mx-auto bg-transparent font-sans pb-24">
      <PageHeader title="REVIEW" subtitle="Step 5 of 5 — Final Review" showBack />

      <div className="px-5 pt-5 space-y-5">
        {/* Progress — all 5 filled */}
        <div className="flex gap-1.5">
          {Array.from({ length: STEPS }).map((_, i) => (
            <div key={i} className="h-1.5 flex-1 rounded-full bg-[var(--color-primary)]" />
          ))}
        </div>

        <Section title="Service Info" icon={Package} color="var(--color-primary)"
          onEdit={() => navigate("/marketplace/sell/service/info", { state })}>
          <Row label="Name" value={info.name} />
          <Row label="Category" value={categoryLabels[state?.serviceCategory] || state?.serviceCategory || "—"} />
          <Row label="Provider" value={(state?.providerType || "—").toUpperCase()} />
          <Row label="Description" value={info.description} />
          <Row label="Deliverables" value={info.deliverables} />
          {info.revisions && <Row label="Revisions" value={info.revisions} />}
          {info.duration && <Row label="Duration" value={info.duration} />}
        </Section>

        <Section title="Packages" icon={CheckCircle} color="#059669"
          onEdit={() => navigate("/marketplace/sell/service/packages", { state })}>
          {packages.length > 0 ? packages.map((pkg: any, i: number) => (
            <Row key={i} label={pkg.name} value={`ZMW ${pkg.price || "—"}`} />
          )) : <p className="text-[11px] font-semibold text-[var(--color-secondary)]/50">No packages defined</p>}
        </Section>

        {state?.boost && (
          <Section title="Boost Plan" icon={Zap} color="#D97706"
            onEdit={() => navigate("/marketplace/sell/product/boost", { state })}>
            <Row label="Plan" value={state.boost.toUpperCase()} />
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
          className="w-full py-4 rounded-2xl border border-[var(--border)] bg-[var(--app-bg)] text-[var(--color-secondary)] font-black uppercase tracking-widest text-[12px] flex items-center justify-center active:scale-95 transition-all">
          Go Back
        </button>
      </div>
    </div>
  );
}
