// ─────────────────────────────────────────────────────────────
// KLEENCH LEARNING — shared visual primitives for the certified
// course flows. Mirrors the existing app design system (micro
// uppercase labels, soft shadows, --color-primary accents) with
// double-bezel card architecture and spring-curve motion.
// ─────────────────────────────────────────────────────────────

import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";

export const GRACE = [0.22, 1, 0.36, 1] as [number, number, number, number];

export const rise = (delay = 0) => ({
  initial: { opacity: 0, y: 18 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, delay, ease: GRACE },
});

/** Double-bezel enclosure: outer machined shell + inner content core. */
export function Bezel({
  children,
  className = "",
  innerClassName = "",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  innerClassName?: string;
  delay?: number;
}) {
  return (
    <motion.div
      {...rise(delay)}
      className={`p-1.5 rounded-[2rem] bg-[var(--app-bg-muted)] border border-[var(--border)] shadow-[0_18px_40px_-24px_rgba(15,23,42,0.25)] ${className}`}
    >
      <div
        className={`rounded-[calc(2rem-0.375rem)] bg-[var(--app-bg)] border border-[var(--border)] shadow-[inset_0_1px_1px_rgba(255,255,255,0.6)] overflow-hidden ${innerClassName}`}
      >
        {children}
      </div>
    </motion.div>
  );
}

/** Section eyebrow — matches the Learning home rail headers. */
export function SectionLabel({ children, action, onAction }: { children: React.ReactNode; action?: string; onAction?: () => void }) {
  return (
    <div className="flex justify-between items-center mb-1.5 px-1">
      <div className="flex items-center gap-2">
        <span className="w-[3px] h-3.5 rounded-full bg-[var(--color-primary)] shrink-0" />
        <h3 className="text-[9px] font-black text-slate-700 uppercase tracking-[0.2em] leading-none">{children}</h3>
      </div>
      {action && (
        <span onClick={onAction} className="text-slate-400 font-bold text-[8px] uppercase tracking-widest whitespace-nowrap cursor-pointer transition-colors">
          {action}
        </span>
      )}
    </div>
  );
}

/** Primary pill CTA with nested trailing icon (button-in-button). */
export function PrimaryCTA({
  children,
  onClick,
  icon,
  variant = "primary",
  className = "",
  disabled = false,
}: {
  children: React.ReactNode;
  onClick?: () => void;
  icon?: React.ReactNode;
  variant?: "primary" | "dark" | "ghost";
  className?: string;
  disabled?: boolean;
}) {
  const palette =
    variant === "primary"
      ? "bg-[var(--color-primary)] text-white shadow-lg shadow-[var(--color-primary)]/25"
      : variant === "dark"
      ? "bg-[var(--app-text-slate)] text-white shadow-lg shadow-black/15"
      : "bg-[var(--app-bg)] text-[var(--app-text-slate)] border border-[var(--border)] shadow-sm";
  return (
    <motion.button
      whileTap={{ scale: disabled ? 1 : 0.97 }}
      onClick={onClick}
      disabled={disabled}
      className={`group w-full h-14 rounded-full flex items-center justify-between pl-7 pr-2 transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] ${palette} ${disabled ? "opacity-40" : ""} ${className}`}
    >
      <span className="font-black text-[11px] uppercase tracking-[0.2em]">{children}</span>
      <span
        className={`w-10 h-10 rounded-full flex items-center justify-center transition-transform duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:translate-x-0.5 group-hover:scale-105 ${
          variant === "ghost" ? "bg-[var(--app-bg-muted)] border border-[var(--border)]" : "bg-white/15 border border-white/20"
        }`}
      >
        {icon ?? <ArrowRight size={16} />}
      </span>
    </motion.button>
  );
}

/** Animated circular progress ring. */
export function ProgressRing({
  pct,
  size = 92,
  stroke = 7,
  color = "var(--color-primary)",
  label,
  sublabel,
}: {
  pct: number;
  size?: number;
  stroke?: number;
  color?: string;
  label?: string;
  sublabel?: string;
}) {
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  return (
    <div className="relative shrink-0" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="var(--border)" strokeWidth={stroke} />
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke={color}
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={c}
          initial={{ strokeDashoffset: c }}
          animate={{ strokeDashoffset: c - (c * Math.min(pct, 100)) / 100 }}
          transition={{ duration: 1.4, ease: GRACE, delay: 0.3 }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="font-black text-[var(--app-text-slate)] leading-none" style={{ fontSize: size / 4.6 }}>
          {label ?? `${pct}%`}
        </span>
        {sublabel && <span className="text-[7px] font-black uppercase tracking-[0.2em] text-slate-400 mt-1">{sublabel}</span>}
      </div>
    </div>
  );
}

/** Thin linear progress bar. */
export function ProgressBar({ pct, className = "" }: { pct: number; className?: string }) {
  return (
    <div className={`w-full h-1.5 bg-[var(--app-bg-muted)] border border-[var(--border)] rounded-full overflow-hidden ${className}`}>
      <motion.div
        className="h-full bg-[var(--color-primary)] rounded-full"
        initial={{ width: 0 }}
        animate={{ width: `${Math.min(pct, 100)}%` }}
        transition={{ duration: 0.9, ease: GRACE }}
      />
    </div>
  );
}

/** Micro stat cell used inside progress cards. */
export function StatCell({ value, label }: { value: React.ReactNode; label: string }) {
  return (
    <div className="flex-1 flex flex-col items-center justify-center text-center py-3 px-1 min-w-0">
      <span className="font-black text-[var(--app-text-slate)] text-lg leading-none tracking-tight">{value}</span>
      <span className="text-[6.5px] font-black uppercase tracking-[0.12em] text-slate-400 mt-1.5 leading-tight">{label}</span>
    </div>
  );
}

/** Animated success burst — check inside concentric rings. */
export function SuccessBurst({ icon, tone = "var(--color-primary)" }: { icon: React.ReactNode; tone?: string }) {
  return (
    <div className="relative w-32 h-32 mx-auto">
      {[0, 1].map((i) => (
        <motion.div
          key={i}
          className="absolute inset-0 rounded-full border"
          style={{ borderColor: tone, opacity: 0.25 }}
          initial={{ scale: 0.6, opacity: 0 }}
          animate={{ scale: 1 + i * 0.22, opacity: [0, 0.3, 0.12] }}
          transition={{ duration: 1.4, delay: 0.25 + i * 0.18, ease: GRACE }}
        />
      ))}
      <motion.div
        initial={{ scale: 0, rotate: -12 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: "spring", damping: 14, stiffness: 160, delay: 0.15 }}
        className="absolute inset-3 rounded-full flex items-center justify-center shadow-xl"
        style={{ background: tone, boxShadow: `0 22px 45px -18px ${tone}` }}
      >
        {icon}
      </motion.div>
    </div>
  );
}
