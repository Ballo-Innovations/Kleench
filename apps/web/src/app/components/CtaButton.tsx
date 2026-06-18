import type { ButtonHTMLAttributes, ReactNode } from "react";

interface CtaButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: "primary" | "ghost";
  fullWidth?: boolean;
}

function ArrowCircle({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 74 74"
      width="34"
      height="34"
      className={className}
      aria-hidden
    >
      <circle strokeWidth="3" stroke="currentColor" r="35.5" cy="37" cx="37" />
      <path
        fill="currentColor"
        d="M25 35.5C24.1716 35.5 23.5 36.1716 23.5 37C23.5 37.8284 24.1716 38.5 25 38.5V35.5ZM49.0607 38.0607C49.6464 37.4749 49.6464 36.5251 49.0607 35.9393L39.5147 26.3934C38.9289 25.8076 37.9792 25.8076 37.3934 26.3934C36.8076 26.9792 36.8076 27.9289 37.3934 28.5147L45.8787 37L37.3934 45.4853C36.8076 46.0711 36.8076 47.0208 37.3934 47.6066C37.9792 48.1924 38.9289 48.1924 39.5147 47.6066L49.0607 38.0607ZM25 38.5L48 38.5V35.5L25 35.5V38.5Z"
      />
    </svg>
  );
}

export function CtaButton({
  children,
  variant = "primary",
  fullWidth = true,
  className = "",
  disabled,
  ...props
}: CtaButtonProps) {
  const base =
    "group flex items-center justify-between gap-3 px-5 py-3 rounded-full font-bold text-[15px] border border-transparent transition-all duration-200 active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed";

  const variants = {
    primary:
      "bg-[var(--color-secondary)] text-white hover:bg-[#F8F9FA] hover:text-[var(--color-secondary)] hover:border-[var(--color-secondary)]",
    ghost:
      "bg-transparent text-[var(--color-secondary)] border-[var(--border)] hover:bg-[#F8F9FA] hover:text-[var(--color-secondary)] hover:border-[var(--color-secondary)]",
  };

  return (
    <button
      disabled={disabled}
      className={`${base} ${variants[variant]} ${fullWidth ? "w-full" : ""} ${className}`}
      {...props}
    >
      <span className="flex-1 text-center uppercase tracking-widest text-[12px] font-black">
        {children}
      </span>
      <ArrowCircle className="shrink-0 transition-transform duration-300 ease-in-out group-hover:translate-x-1 group-disabled:translate-x-0" />
    </button>
  );
}
