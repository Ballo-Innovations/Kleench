import React from "react";
import type { SVGProps } from "react";

/**
 * Global Icon Partitioning: Tier 3 (Body Content)
 * Style: Duotone / Two-Tone Vectors
 * Colors: 
 *   - Primary: #093463 (Solid Navy)
 *   - Secondary: #093463 at 30% Opacity
 * Bounding Box: 24px (Standard) or 32px
 */

export interface DuotoneIconProps extends SVGProps<SVGSVGElement> {
  size?: number;
  primary?: string;
  secondaryOpacity?: number;
}

const DEFAULT_PRIMARY = "var(--app-icon-primary, #093463)";
const DEFAULT_SECONDARY_OPACITY = 0.3;

/* ─── Helpers ─── */
function Svg({ size = 24, children, viewBox = "0 0 24 24", ...props }: DuotoneIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox={viewBox}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      {children}
    </svg>
  );
}

/* ─── Icons ─── */

export const DuotoneUser = ({ size, primary = DEFAULT_PRIMARY, secondaryOpacity = DEFAULT_SECONDARY_OPACITY, ...props }: DuotoneIconProps) => (
  <Svg size={size} {...props}>
    <circle cx="12" cy="8" r="4" fill={primary} />
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" fill={primary} fillOpacity={secondaryOpacity} />
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" stroke={primary} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

export const DuotoneFlag = ({ size, primary = DEFAULT_PRIMARY, secondaryOpacity = DEFAULT_SECONDARY_OPACITY, ...props }: DuotoneIconProps) => (
  <Svg size={size} {...props}>
    <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V5s-1 1-4 1-5-2-8-2-4 1-4 1v12z" fill={primary} fillOpacity={secondaryOpacity} />
    <line x1="4" y1="22" x2="4" y2="15" stroke={primary} strokeWidth="2" strokeLinecap="round" />
    <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V5s-1 1-4 1-5-2-8-2-4 1-4 1" stroke={primary} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

export const DuotoneIdCard = ({ size, primary = DEFAULT_PRIMARY, secondaryOpacity = DEFAULT_SECONDARY_OPACITY, ...props }: DuotoneIconProps) => (
  <Svg size={size} {...props}>
    <rect x="3" y="4" width="18" height="16" rx="2" fill={primary} fillOpacity={secondaryOpacity} />
    <rect x="3" y="4" width="18" height="16" rx="2" stroke={primary} strokeWidth="2" />
    <circle cx="9" cy="11" r="2" fill={primary} />
    <line x1="14" y1="10" x2="18" y2="10" stroke={primary} strokeWidth="2" strokeLinecap="round" />
    <line x1="14" y1="14" x2="18" y2="14" stroke={primary} strokeWidth="2" strokeLinecap="round" />
  </Svg>
);

export const DuotoneMapPin = ({ size, primary = DEFAULT_PRIMARY, secondaryOpacity = DEFAULT_SECONDARY_OPACITY, ...props }: DuotoneIconProps) => (
  <Svg size={size} {...props}>
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 1 1 18 0z" fill={primary} fillOpacity={secondaryOpacity} />
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 1 1 18 0z" stroke={primary} strokeWidth="2" />
    <circle cx="12" cy="10" r="3" fill={primary} />
  </Svg>
);

export const DuotoneBuilding = ({ size, primary = DEFAULT_PRIMARY, secondaryOpacity = DEFAULT_SECONDARY_OPACITY, ...props }: DuotoneIconProps) => (
  <Svg size={size} {...props}>
    <rect x="4" y="2" width="16" height="20" rx="2" fill={primary} fillOpacity={secondaryOpacity} />
    <rect x="4" y="2" width="16" height="20" rx="2" stroke={primary} strokeWidth="2" />
    <path d="M9 22v-4h6v4" stroke={primary} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <line x1="8" y1="6" x2="10" y2="6" stroke={primary} strokeWidth="2" strokeLinecap="round" />
    <line x1="14" y1="6" x2="16" y2="6" stroke={primary} strokeWidth="2" strokeLinecap="round" />
    <line x1="8" y1="10" x2="10" y2="10" stroke={primary} strokeWidth="2" strokeLinecap="round" />
    <line x1="14" y1="10" x2="16" y2="10" stroke={primary} strokeWidth="2" strokeLinecap="round" />
    <line x1="8" y1="14" x2="10" y2="14" stroke={primary} strokeWidth="2" strokeLinecap="round" />
    <line x1="14" y1="14" x2="16" y2="14" stroke={primary} strokeWidth="2" strokeLinecap="round" />
  </Svg>
);

export const DuotoneCamera = ({ size, primary = DEFAULT_PRIMARY, secondaryOpacity = DEFAULT_SECONDARY_OPACITY, ...props }: DuotoneIconProps) => (
  <Svg size={size} {...props}>
    <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" fill={primary} fillOpacity={secondaryOpacity} />
    <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" stroke={primary} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <circle cx="12" cy="13" r="4" fill={primary} />
    <circle cx="12" cy="13" r="4" stroke={primary} strokeWidth="1.5" />
  </Svg>
);

export const DuotoneUpload = ({ size, primary = DEFAULT_PRIMARY, secondaryOpacity = DEFAULT_SECONDARY_OPACITY, ...props }: DuotoneIconProps) => (
  <Svg size={size} {...props}>
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" stroke={primary} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <polyline points="17 8 12 3 7 8" stroke={primary} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <line x1="12" y1="3" x2="12" y2="15" stroke={primary} strokeWidth="2" strokeLinecap="round" fill={primary} fillOpacity={secondaryOpacity} />
  </Svg>
);

export const DuotoneLike = ({ size, primary = DEFAULT_PRIMARY, secondaryOpacity = DEFAULT_SECONDARY_OPACITY, ...props }: DuotoneIconProps) => (
  <Svg size={size} {...props}>
    <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3" fill={primary} fillOpacity={secondaryOpacity} />
    <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3" stroke={primary} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

export const DuotoneMessage = ({ size, primary = DEFAULT_PRIMARY, secondaryOpacity = DEFAULT_SECONDARY_OPACITY, ...props }: DuotoneIconProps) => (
  <Svg size={size} {...props}>
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" fill={primary} fillOpacity={secondaryOpacity} />
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" stroke={primary} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

export const DuotoneShare = ({ size, primary = DEFAULT_PRIMARY, ...props }: DuotoneIconProps) => (
  <Svg size={size} {...props}>
    <path d="M4 12V20a2 2 0 0 0 2 2H18a2 2 0 0 0 2-2V12" stroke={primary} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <polyline points="16 6 12 2 8 6" stroke={primary} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <line x1="12" y1="2" x2="12" y2="15" stroke={primary} strokeWidth="2" strokeLinecap="round" />
  </Svg>
);

export const DuotoneChevronRight = ({ size, primary = DEFAULT_PRIMARY, ...props }: DuotoneIconProps) => (
  <Svg size={size} {...props}>
    <polyline points="9 18 15 12 9 6" stroke={primary} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

export const DuotoneInsurance = ({ size, primary = DEFAULT_PRIMARY, secondaryOpacity = DEFAULT_SECONDARY_OPACITY, ...props }: DuotoneIconProps) => (
  <Svg size={size} {...props}>
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" fill={primary} fillOpacity={secondaryOpacity} stroke={primary} strokeWidth="2" />
    <polyline points="9 12 11 14 15 10" stroke={primary} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

export const DuotoneWallet = ({ size, primary = DEFAULT_PRIMARY, secondaryOpacity = DEFAULT_SECONDARY_OPACITY, ...props }: DuotoneIconProps) => (
  <Svg size={size} {...props}>
    <path d="M21 12V7H5a2 2 0 0 1 0-4h14a2 2 0 0 1 2 2v2M3 7v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V12a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2z" fill={primary} fillOpacity={secondaryOpacity} />
    <path d="M21 12V7H5a2 2 0 0 1 0-4h14a2 2 0 0 1 2 2v2M3 7v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V12a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2z" stroke={primary} strokeWidth="2" />
    <circle cx="16" cy="15.5" r="1.5" fill={primary} />
  </Svg>
);

export const DuotoneSmartphone = ({ size, primary = DEFAULT_PRIMARY, secondaryOpacity = DEFAULT_SECONDARY_OPACITY, ...props }: DuotoneIconProps) => (
  <Svg size={size} {...props}>
    <rect x="5" y="2" width="14" height="20" rx="2" fill={primary} fillOpacity={secondaryOpacity} />
    <rect x="5" y="2" width="14" height="20" rx="2" stroke={primary} strokeWidth="2" />
    <line x1="12" y1="18" x2="12" y2="18.01" stroke={primary} strokeWidth="3" strokeLinecap="round" />
  </Svg>
);

export const DuotoneBriefcase = ({ size, primary = DEFAULT_PRIMARY, secondaryOpacity = DEFAULT_SECONDARY_OPACITY, ...props }: DuotoneIconProps) => (
  <Svg size={size} {...props}>
    <rect x="2" y="7" width="20" height="14" rx="2" fill={primary} fillOpacity={secondaryOpacity} />
    <rect x="2" y="7" width="20" height="14" rx="2" stroke={primary} strokeWidth="2" />
    <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" stroke={primary} strokeWidth="2" />
  </Svg>
);

export const DuotoneUsers = ({ size, primary = DEFAULT_PRIMARY, secondaryOpacity = DEFAULT_SECONDARY_OPACITY, ...props }: DuotoneIconProps) => (
  <Svg size={size} {...props}>
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" fill={primary} fillOpacity={secondaryOpacity} />
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" stroke={primary} strokeWidth="2" />
    <circle cx="9" cy="7" r="4" fill={primary} />
    <path d="M23 21v-2a4 4 0 0 0-3-3.87" stroke={primary} strokeWidth="2" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" stroke={primary} strokeWidth="2" />
  </Svg>
);

export const DuotoneCheck = ({ size, primary = DEFAULT_PRIMARY, ...props }: DuotoneIconProps) => (
  <Svg size={size} {...props}>
    <polyline points="20 6 9 17 4 12" stroke={primary} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

export const DuotoneSend = ({ size, primary = DEFAULT_PRIMARY, secondaryOpacity = DEFAULT_SECONDARY_OPACITY, ...props }: DuotoneIconProps) => (
  <Svg size={size} {...props}>
    <path d="M22 2L11 13" stroke={primary} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M22 2L15 22L11 13L2 9L22 2Z" fill={primary} fillOpacity={secondaryOpacity} />
    <path d="M22 2L15 22L11 13L2 9L22 2Z" stroke={primary} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

export const DuotoneUserPlus = ({ size, primary = DEFAULT_PRIMARY, secondaryOpacity = DEFAULT_SECONDARY_OPACITY, ...props }: DuotoneIconProps) => (
  <Svg size={size} {...props}>
    <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" fill={primary} fillOpacity={secondaryOpacity} />
    <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" stroke={primary} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <circle cx="8.5" cy="7" r="4" fill={primary} />
    <line x1="20" y1="8" x2="20" y2="14" stroke={primary} strokeWidth="2" strokeLinecap="round" />
    <line x1="23" y1="11" x2="17" y2="11" stroke={primary} strokeWidth="2" strokeLinecap="round" />
  </Svg>
);

export const DuotoneSprout = ({ size, primary = DEFAULT_PRIMARY, secondaryOpacity = DEFAULT_SECONDARY_OPACITY, ...props }: DuotoneIconProps) => (
  <Svg size={size} {...props}>
    <path d="M7 20h10" stroke={primary} strokeWidth="2" strokeLinecap="round" />
    <path d="M10 20c0-7 1-13 7-13" fill={primary} fillOpacity={secondaryOpacity} />
    <path d="M10 20c0-7 1-13 7-13" stroke={primary} strokeWidth="2" strokeLinecap="round" />
    <path d="M14 20c0-4-2-7-7-7" fill={primary} fillOpacity={secondaryOpacity} />
    <path d="M14 20c0-4-2-7-7-7" stroke={primary} strokeWidth="2" strokeLinecap="round" />
  </Svg>
);

export const DuotoneArrowRight = ({ size, primary = DEFAULT_PRIMARY, ...props }: DuotoneIconProps) => (
  <Svg size={size} {...props}>
    <line x1="5" y1="12" x2="19" y2="12" stroke={primary} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    <polyline points="12 5 19 12 12 19" stroke={primary} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

export const DuotoneArrowUp = ({ size, primary = DEFAULT_PRIMARY, ...props }: DuotoneIconProps) => (
  <Svg size={size} {...props}>
    <line x1="12" y1="19" x2="12" y2="5" stroke={primary} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    <polyline points="5 12 12 5 19 12" stroke={primary} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

export const DuotoneArrowDown = ({ size, primary = DEFAULT_PRIMARY, ...props }: DuotoneIconProps) => (
  <Svg size={size} {...props}>
    <line x1="12" y1="5" x2="12" y2="19" stroke={primary} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    <polyline points="19 12 12 19 5 12" stroke={primary} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

export const DuotoneTransfer = ({ size, primary = DEFAULT_PRIMARY, secondaryOpacity = DEFAULT_SECONDARY_OPACITY, ...props }: DuotoneIconProps) => (
  <Svg size={size} {...props}>
    <path d="M17 10h-10l4-4" stroke={primary} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M7 14h10l-4 4" stroke={primary} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill={primary} fillOpacity={secondaryOpacity} />
  </Svg>
);

export const DuotoneReceipt = ({ size, primary = DEFAULT_PRIMARY, secondaryOpacity = DEFAULT_SECONDARY_OPACITY, ...props }: DuotoneIconProps) => (
  <Svg size={size} {...props}>
    <path d="M4 2v20l2-1 2 1 2-1 2 1 2-1 2 1 2-1 2 1V2l-2 1-2-1-2 1-2-1-2 1-2-1-2 1-2-1z" fill={primary} fillOpacity={secondaryOpacity} stroke={primary} strokeWidth="2" />
    <line x1="8" y1="10" x2="16" y2="10" stroke={primary} strokeWidth="2" />
    <line x1="8" y1="14" x2="16" y2="14" stroke={primary} strokeWidth="2" />
  </Svg>
);

export const DuotoneQrCode = ({ size, primary = DEFAULT_PRIMARY, secondaryOpacity = DEFAULT_SECONDARY_OPACITY, ...props }: DuotoneIconProps) => (
  <Svg size={size} {...props}>
    <rect x="3" y="3" width="7" height="7" rx="1" stroke={primary} strokeWidth="2" fill={primary} fillOpacity={secondaryOpacity} />
    <rect x="14" y="3" width="7" height="7" rx="1" stroke={primary} strokeWidth="2" />
    <rect x="3" y="14" width="7" height="7" rx="1" stroke={primary} strokeWidth="2" />
    <rect x="14" y="14" width="7" height="7" rx="1" stroke={primary} strokeWidth="2" fill={primary} fillOpacity={secondaryOpacity} />
  </Svg>
);

export const DuotoneGlobe = ({ size, primary = DEFAULT_PRIMARY, secondaryOpacity = DEFAULT_SECONDARY_OPACITY, ...props }: DuotoneIconProps) => (
  <Svg size={size} {...props}>
    <circle cx="12" cy="12" r="10" stroke={primary} strokeWidth="2" fill={primary} fillOpacity={secondaryOpacity} />
    <line x1="2" y1="12" x2="22" y2="12" stroke={primary} strokeWidth="2" />
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" stroke={primary} strokeWidth="2" />
  </Svg>
);

export const DuotoneCalculator = ({ size, primary = DEFAULT_PRIMARY, secondaryOpacity = DEFAULT_SECONDARY_OPACITY, ...props }: DuotoneIconProps) => (
  <Svg size={size} {...props}>
    <rect x="4" y="2" width="16" height="20" rx="2" stroke={primary} strokeWidth="2" fill={primary} fillOpacity={secondaryOpacity} />
    <line x1="8" y1="6" x2="16" y2="6" stroke={primary} strokeWidth="2" />
    <rect x="8" y="10" width="2" height="2" fill={primary} />
    <rect x="14" y="10" width="2" height="2" fill={primary} />
    <rect x="8" y="14" width="2" height="2" fill={primary} />
    <rect x="14" y="14" width="2" height="2" fill={primary} />
  </Svg>
);

export const DuotoneSearch = ({ size, primary = DEFAULT_PRIMARY, secondaryOpacity = DEFAULT_SECONDARY_OPACITY, ...props }: DuotoneIconProps) => (
  <Svg size={size} {...props}>
    <circle cx="11" cy="11" r="8" stroke={primary} strokeWidth="2.5" fill={primary} fillOpacity={secondaryOpacity} />
    <line x1="21" y1="21" x2="16.65" y2="16.65" stroke={primary} strokeWidth="2.5" strokeLinecap="round" />
  </Svg>
);

export const DuotonePlus = ({ size, primary = DEFAULT_PRIMARY, ...props }: DuotoneIconProps) => (
  <Svg size={size} {...props}>
    <line x1="12" y1="5" x2="12" y2="19" stroke={primary} strokeWidth="3" strokeLinecap="round" />
    <line x1="5" y1="12" x2="19" y2="12" stroke={primary} strokeWidth="3" strokeLinecap="round" />
  </Svg>
);

export const DuotoneClock = ({ size, primary = DEFAULT_PRIMARY, secondaryOpacity = DEFAULT_SECONDARY_OPACITY, ...props }: DuotoneIconProps) => (
  <Svg size={size} {...props}>
    <circle cx="12" cy="12" r="10" stroke={primary} strokeWidth="2" fill={primary} fillOpacity={secondaryOpacity} />
    <polyline points="12 6 12 12 16 14" stroke={primary} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

export const DuotoneEye = ({ size, primary = DEFAULT_PRIMARY, secondaryOpacity = DEFAULT_SECONDARY_OPACITY, ...props }: DuotoneIconProps) => (
  <Svg size={size} {...props}>
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" stroke={primary} strokeWidth="2" fill={primary} fillOpacity={secondaryOpacity} />
    <circle cx="12" cy="12" r="3" stroke={primary} strokeWidth="2" />
  </Svg>
);

export const DuotoneHeart = ({ size, primary = DEFAULT_PRIMARY, secondaryOpacity = DEFAULT_SECONDARY_OPACITY, ...props }: DuotoneIconProps) => (
  <Svg size={size} {...props}>
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" stroke={primary} strokeWidth="2" fill={primary} fillOpacity={secondaryOpacity} />
  </Svg>
);

export const DuotoneThumbsUp = ({ size, primary = DEFAULT_PRIMARY, secondaryOpacity = DEFAULT_SECONDARY_OPACITY, ...props }: DuotoneIconProps) => (
  <Svg size={size} {...props}>
    <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3" stroke={primary} strokeWidth="2" fill={primary} fillOpacity={secondaryOpacity} />
  </Svg>
);

export const DuotoneMore = ({ size, primary = DEFAULT_PRIMARY, ...props }: DuotoneIconProps) => (
  <Svg size={size} {...props}>
    <circle cx="12" cy="12" r="1.5" fill={primary} />
    <circle cx="19" cy="12" r="1.5" fill={primary} />
    <circle cx="5" cy="12" r="1.5" fill={primary} />
  </Svg>
);

export const DuotoneRadio = ({ size, primary = DEFAULT_PRIMARY, secondaryOpacity = DEFAULT_SECONDARY_OPACITY, ...props }: DuotoneIconProps) => (
  <Svg size={size} {...props}>
    <circle cx="12" cy="12" r="2" fill={primary} />
    <path d="M16.24 7.76a6 6 0 0 1 0 8.48" stroke={primary} strokeWidth="2" />
    <path d="M19.07 4.93a10 10 0 0 1 0 14.14" stroke={primary} strokeWidth="2" fill={primary} fillOpacity={secondaryOpacity} />
    <path d="M7.76 16.24a6 6 0 0 1 0-8.48" stroke={primary} strokeWidth="2" />
    <path d="M4.93 19.07a10 10 0 0 1 0-14.14" stroke={primary} strokeWidth="2" />
  </Svg>
);

export const DuotoneTag = ({ size, primary = DEFAULT_PRIMARY, secondaryOpacity = DEFAULT_SECONDARY_OPACITY, ...props }: DuotoneIconProps) => (
  <Svg size={size} {...props}>
    <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" stroke={primary} strokeWidth="2.5" fill={primary} fillOpacity={secondaryOpacity} />
    <line x1="7" y1="7" x2="7.01" y2="7" stroke={primary} strokeWidth="3" strokeLinecap="round" />
  </Svg>
);

export const DuotoneFileText = ({ size, primary = DEFAULT_PRIMARY, secondaryOpacity = DEFAULT_SECONDARY_OPACITY, ...props }: DuotoneIconProps) => (
  <Svg size={size} {...props}>
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" stroke={primary} strokeWidth="2" fill={primary} fillOpacity={secondaryOpacity} />
    <polyline points="14 2 14 8 20 8" stroke={primary} strokeWidth="2" />
    <line x1="16" y1="13" x2="8" y2="13" stroke={primary} strokeWidth="2" />
    <line x1="16" y1="17" x2="8" y2="17" stroke={primary} strokeWidth="2" />
    <polyline points="10 9 9 9 8 9" stroke={primary} strokeWidth="2" />
  </Svg>
);

export const DuotoneTrendingUp = ({ size, primary = DEFAULT_PRIMARY, ...props }: DuotoneIconProps) => (
  <Svg size={size} {...props}>
    <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" stroke={primary} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    <polyline points="17 6 23 6 23 12" stroke={primary} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

export const DuotoneLineChart = ({ size, primary = DEFAULT_PRIMARY, secondaryOpacity = DEFAULT_SECONDARY_OPACITY, ...props }: DuotoneIconProps) => (
  <Svg size={size} {...props}>
    <path d="M3 3v18h18" stroke={primary} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M18 9l-5 5-2-2-5 5" stroke={primary} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill={primary} fillOpacity={secondaryOpacity} />
  </Svg>
);

export const DuotoneBarChart = ({ size, primary = DEFAULT_PRIMARY, secondaryOpacity = DEFAULT_SECONDARY_OPACITY, ...props }: DuotoneIconProps) => (
  <Svg size={size} {...props}>
    <line x1="12" y1="20" x2="12" y2="10" stroke={primary} strokeWidth="2.5" strokeLinecap="round" />
    <line x1="18" y1="20" x2="18" y2="4" stroke={primary} strokeWidth="2.5" strokeLinecap="round" fill={primary} fillOpacity={secondaryOpacity} />
    <line x1="6" y1="20" x2="6" y2="16" stroke={primary} strokeWidth="2.5" strokeLinecap="round" />
  </Svg>
);

export const DuotoneBadgeCheck = ({ size, primary = DEFAULT_PRIMARY, secondaryOpacity = DEFAULT_SECONDARY_OPACITY, ...props }: DuotoneIconProps) => (
  <Svg size={size} {...props}>
    <path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76z" stroke={primary} strokeWidth="2" fill={primary} fillOpacity={secondaryOpacity} />
    <polyline points="9 11 12 14 15 11" stroke={primary} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

export const DuotoneStar = ({ size, primary = DEFAULT_PRIMARY, secondaryOpacity = DEFAULT_SECONDARY_OPACITY, ...props }: DuotoneIconProps) => (
  <Svg size={size} {...props}>
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" stroke={primary} strokeWidth="2" fill={primary} fillOpacity={secondaryOpacity} />
  </Svg>
);

export const DuotoneSparkles = ({ size, primary = DEFAULT_PRIMARY, secondaryOpacity = DEFAULT_SECONDARY_OPACITY, ...props }: DuotoneIconProps) => (
  <Svg size={size} {...props}>
    <path d="M9.937 15.5L8 20L6.063 15.5L1.5 13.563L6.063 11.625L8 7.125L9.937 11.625L14.5 13.563L9.937 15.5Z" fill={primary} fillOpacity={secondaryOpacity} stroke={primary} strokeWidth="2" />
    <path d="M17 11.5L16.2 9.8L14.5 9L16.2 8.2L17 6.5L17.8 8.2L19.5 9L17.8 9.8L17 11.5Z" fill={primary} />
    <path d="M18.5 20.5L17.9 19.3L16.5 18.7L17.9 18.1L18.5 16.9L19.1 18.1L20.5 18.7L19.1 19.3L18.5 20.5Z" fill={primary} />
  </Svg>
);

export const DuotoneInfo = ({ size, primary = DEFAULT_PRIMARY, secondaryOpacity = DEFAULT_SECONDARY_OPACITY, ...props }: DuotoneIconProps) => (
  <Svg size={size} {...props}>
    <circle cx="12" cy="12" r="10" stroke={primary} strokeWidth="2" fill={primary} fillOpacity={secondaryOpacity} />
    <line x1="12" y1="16" x2="12" y2="12" stroke={primary} strokeWidth="2" strokeLinecap="round" />
    <line x1="12" y1="8" x2="12.01" y2="8" stroke={primary} strokeWidth="3" strokeLinecap="round" />
  </Svg>
);

export const DuotoneHistory = ({ size, primary = DEFAULT_PRIMARY, secondaryOpacity = DEFAULT_SECONDARY_OPACITY, ...props }: DuotoneIconProps) => (
  <Svg size={size} {...props}>
    <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" stroke={primary} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill={primary} fillOpacity={secondaryOpacity} />
    <polyline points="3 3 3 8 8 8" stroke={primary} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <polyline points="12 7 12 12 15 15" stroke={primary} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

export const DuotoneSavings = ({ size, primary = DEFAULT_PRIMARY, secondaryOpacity = DEFAULT_SECONDARY_OPACITY, ...props }: DuotoneIconProps) => (
  <Svg size={size} {...props}>
    <path d="M19 12a1 1 0 1 1-2 0 1 1 0 0 1 2 0Zm-7 3a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z" fill={primary} />
    <path d="M19 5a3 3 0 0 0-3-3H8a3 3 0 0 0-3 3v14a3 3 0 0 0 3 3h8a3 3 0 0 0 3-3V5Z" fill={primary} fillOpacity={secondaryOpacity} stroke={primary} strokeWidth="2" />
    <path d="M14 2v3a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1V2" stroke={primary} strokeWidth="2" />
  </Svg>
);

export const DuotonePiggyBank = ({ size, primary = DEFAULT_PRIMARY, secondaryOpacity = DEFAULT_SECONDARY_OPACITY, ...props }: DuotoneIconProps) => (
  <Svg size={size} {...props}>
    {/* Body */}
    <path d="M19 12c0-3.87-3.13-7-7-7s-7 3.13-7 7 3.13 7 7 7 7-3.13 7-7Z" fill={primary} fillOpacity={secondaryOpacity} stroke={primary} strokeWidth="2" />
    {/* Snout */}
    <path d="M19 12h2v2a1 1 0 0 1-2 0v-2Z" stroke={primary} strokeWidth="2" fill={primary} />
    {/* Ears */}
    <path d="M16 5l1-2 2 1-1 2" stroke={primary} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    {/* Legs */}
    <path d="M8 19v2M16 19v2" stroke={primary} strokeWidth="2.5" strokeLinecap="round" />
    {/* Eye */}
    <circle cx="17" cy="10" r="1" fill={primary} />
    {/* Coin Slot */}
    <path d="M11 5v3" stroke={primary} strokeWidth="2" strokeLinecap="round" />
  </Svg>
);

export const DuotoneTaxAccount = ({ size, primary = DEFAULT_PRIMARY, secondaryOpacity = DEFAULT_SECONDARY_OPACITY, ...props }: DuotoneIconProps) => (
  <Svg size={size} {...props}>
    <circle cx="8" cy="8" r="3" stroke={primary} strokeWidth="2" fill={primary} fillOpacity={secondaryOpacity} />
    <circle cx="16" cy="16" r="3" stroke={primary} strokeWidth="2" fill={primary} fillOpacity={secondaryOpacity} />
    <line x1="19" y1="5" x2="5" y2="19" stroke={primary} strokeWidth="3" strokeLinecap="round" />
  </Svg>
);

export const DuotonePlusCircle = ({ size, primary = DEFAULT_PRIMARY, secondaryOpacity = DEFAULT_SECONDARY_OPACITY, ...props }: DuotoneIconProps) => (
  <Svg size={size} {...props}>
    <circle cx="12" cy="12" r="10" stroke={primary} strokeWidth="2" fill={primary} fillOpacity={secondaryOpacity} />
    <line x1="12" y1="8" x2="12" y2="16" stroke={primary} strokeWidth="2" strokeLinecap="round" />
    <line x1="8" y1="12" x2="16" y2="12" stroke={primary} strokeWidth="2" strokeLinecap="round" />
  </Svg>
);

export const DuotoneImageIcon = ({ size, primary = DEFAULT_PRIMARY, secondaryOpacity = DEFAULT_SECONDARY_OPACITY, ...props }: DuotoneIconProps) => (
  <Svg size={size} {...props}>
    <rect x="3" y="3" width="18" height="18" rx="2" stroke={primary} strokeWidth="2" fill={primary} fillOpacity={secondaryOpacity} />
    <circle cx="8.5" cy="8.5" r="1.5" fill={primary} />
    <polyline points="21 15 16 10 5 21" stroke={primary} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

export const DuotoneExternalLink = ({ size, primary = DEFAULT_PRIMARY, ...props }: DuotoneIconProps) => (
  <Svg size={size} {...props}>
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" stroke={primary} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <polyline points="15 3 21 3 21 9" stroke={primary} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <line x1="10" y1="14" x2="21" y2="3" stroke={primary} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);
export const DuotonePlay = ({ size, primary = DEFAULT_PRIMARY, secondaryOpacity = DEFAULT_SECONDARY_OPACITY, ...props }: DuotoneIconProps) => (
  <Svg size={size} {...props}>
    <polygon points="5 3 19 12 5 21 5 3" fill={primary} fillOpacity={secondaryOpacity} stroke={primary} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

export const DuotoneHeadphones = ({ size, primary = DEFAULT_PRIMARY, secondaryOpacity = DEFAULT_SECONDARY_OPACITY, ...props }: DuotoneIconProps) => (
  <Svg size={size} {...props}>
    <path d="M3 18v-6a9 9 0 0 1 18 0v6" stroke={primary} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z" fill={primary} fillOpacity={secondaryOpacity} stroke={primary} strokeWidth="2" />
  </Svg>
);

export const DuotoneVolume = ({ size, primary = DEFAULT_PRIMARY, secondaryOpacity = DEFAULT_SECONDARY_OPACITY, ...props }: DuotoneIconProps) => (
  <Svg size={size} {...props}>
    <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" fill={primary} fillOpacity={secondaryOpacity} stroke={primary} strokeWidth="2" />
    <path d="M15.54 8.46a5 5 0 0 1 0 7.07" stroke={primary} strokeWidth="2" />
    <path d="M19.07 4.93a10 10 0 0 1 0 14.14" stroke={primary} strokeWidth="2" />
  </Svg>
);
export { DuotoneInsurance as DuotoneShieldCheck };
export { DuotoneMessage as DuotoneMessageSquare };
export { DuotoneUpload as DuotoneArrowUpToLine };
export { DuotoneSend as DuotoneLink };
