/**
 * KleenchIcons — Hand-crafted SVG icons tailored for the Kleench brand.
 * These replace emoji and generic Lucide icons for a contextual, human touch.
 */

import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement> & {
  size?: number;
  color?: string;
};

/* ─── Zambia Flag (proper SVG, not emoji) ─── */
export function ZambiaFlag({ size = 20, ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={Math.round(size * 0.65)}
      viewBox="0 0 40 26"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      {/* Green base */}
      <rect width="40" height="26" fill="#198A00" />
      {/* Right stripe block: red, black, orange  */}
      <rect x="28" y="0" width="4" height="26" fill="#DE2010" />
      <rect x="32" y="0" width="4" height="26" fill="#000000" />
      <rect x="36" y="0" width="4" height="26" fill="#EF7D00" />
      {/* Eagle (simplified) */}
      <g transform="translate(28, 2) scale(0.55)">
        <path
          d="M8 0 C8 0 4 3 4 6 C4 9 6 10 8 10 C10 10 12 9 12 6 C12 3 8 0 8 0Z"
          fill="#EF7D00"
        />
        <path d="M2 6 C0 5 0 8 2 8 L6 7Z" fill="#EF7D00" />
        <path d="M14 6 C16 5 16 8 14 8 L10 7Z" fill="#EF7D00" />
        <path d="M6 10 L8 14 L10 10Z" fill="#EF7D00" />
        <path d="M5 13 L8 16 L11 13 L10 10 L8 12 L6 10Z" fill="#EF7D00" />
      </g>
    </svg>
  );
}

/* ─── Backspace / Delete key ─── */
export function BackspaceKey({ size = 20, color = "currentColor", ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path d="M21 6H8l-6 6 6 6h13a1 1 0 0 0 1-1V7a1 1 0 0 0-1-1z" />
      <line x1="12" y1="10" x2="18" y2="16" />
      <line x1="18" y1="10" x2="12" y2="16" />
    </svg>
  );
}

/* ─── Close / Dismiss (X with rounded strokes) ─── */
export function CloseIcon({ size = 20, color = "currentColor", ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth={2.2}
      strokeLinecap="round"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <line x1="6" y1="6" x2="18" y2="18" />
      <line x1="18" y1="6" x2="6" y2="18" />
    </svg>
  );
}

/* ─── Clock / Deadline ─── */
export function DeadlineClock({ size = 14, color = "currentColor", ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <circle cx="12" cy="12" r="9" />
      <polyline points="12 7 12 12 15.5 14" />
      {/* Urgency dot */}
      <circle cx="12" cy="3" r="1.5" fill={color} stroke="none" />
    </svg>
  );
}

/* ─── Earn / Money coin ─── */
export function EarnCoin({ size = 20, color = "#ff8c00", ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <circle cx="12" cy="12" r="10" stroke={color} strokeWidth={1.8} />
      <path
        d="M12 6v1.5M12 16.5V18M9 9.5c0-1.4 1.3-2.5 3-2.5s3 1.1 3 2.5c0 1.3-.9 2-2 2.3l-1 .3c-1.1.3-2 1.1-2 2.4 0 1.4 1.3 2.5 3 2.5s3-1.1 3-2.5"
        stroke={color}
        strokeWidth={1.8}
        strokeLinecap="round"
      />
    </svg>
  );
}

/* ─── Verified / Trust shield ─── */
export function TrustShield({ size = 16, color = "#0077B6", ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M12 2L4 5.5v7c0 4.4 3.4 8.5 8 9.5 4.6-1 8-5.1 8-9.5v-7L12 2z"
        stroke={color}
        strokeWidth={1.8}
        strokeLinejoin="round"
      />
      <path
        d="M8.5 12l2.5 2.5 4.5-4.5"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/* ─── Referral / Invite link ─── */
export function ReferralLink({ size = 20, color = "currentColor", ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <circle cx="18" cy="5" r="3" />
      <circle cx="6" cy="12" r="3" />
      <circle cx="18" cy="19" r="3" />
      <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
      <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
    </svg>
  );
}

/* ─── Spark / Live indicator ─── */
export function LiveSpark({ size = 10, color = "#ff8c00", ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 10 10"
      fill={color}
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <circle cx="5" cy="5" r="5" opacity="0.25" />
      <circle cx="5" cy="5" r="3" />
    </svg>
  );
}

/* ─── Poll / Bar chart (stylised) ─── */
export function PollChart({ size = 20, color = "currentColor", ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <rect x="3" y="13" width="4" height="8" rx="1" />
      <rect x="10" y="8" width="4" height="13" rx="1" />
      <rect x="17" y="4" width="4" height="17" rx="1" />
      <line x1="3" y1="3" x2="3" y2="5" strokeDasharray="2 1" />
    </svg>
  );
}

/* ─── Notification bell (rounded, warm) ─── */
export function NotifBell({ size = 22, color = "currentColor", ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
      <path d="M13.73 21a2 2 0 0 1-3.46 0" />
      <circle cx="18" cy="5" r="2.5" fill="#ff8c00" stroke="none" />
    </svg>
  );
}

/* ─── Solar / Sun panel icon ─── */
export function SolarIcon({ size = 16, color = "currentColor", ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <rect x="3" y="4" width="18" height="12" rx="2" />
      <line x1="3" y1="9" x2="21" y2="9" />
      <line x1="3" y1="13" x2="21" y2="13" />
      <line x1="9" y1="4" x2="9" y2="16" />
      <line x1="15" y1="4" x2="15" y2="16" />
      <line x1="12" y1="16" x2="12" y2="20" />
      <line x1="8" y1="20" x2="16" y2="20" />
    </svg>
  );
}
