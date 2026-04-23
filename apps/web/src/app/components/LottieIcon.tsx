/**
 * LottieIcon — Unified icon component for Kleench.
 * 
 * STRATEGY: Uses self-contained animated SVG icons (KleenchAnimIcons) as the
 * primary renderer — zero CDN dependency, always renders, perfectly on-brand.
 * 
 * Verified working Lottie CDN URLs are used ONLY for the single confirmed bell
 * animation. All other icons are the inline SVG animated versions.
 */

import { ICON_MAP } from "./KleenchAnimIcons";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

// Single verified working Lottie URL (bell notification)
const VERIFIED_LOTTIE: Record<string, string> = {
};

interface LottieIconProps {
  icon: string;
  size?: number;
  loop?: boolean;
  autoplay?: boolean;
  playOnce?: boolean;
  className?: string;
}

/**
 * Drop-in themed icon component.
 * - If `icon` matches a verified Lottie URL, renders that Lottie file
 * - Otherwise renders the local animated SVG from KleenchAnimIcons
 * - Always renders — zero blank states
 */
export function LottieIcon({
  icon,
  size = 48,
  className = "",
}: LottieIconProps) {
  // Try verified Lottie first
  if (VERIFIED_LOTTIE[icon]) {
    return (
      <div className={`flex-shrink-0 ${className}`} style={{ width: size, height: size }}>
        <DotLottieReact
          src={VERIFIED_LOTTIE[icon]}
          loop
          autoplay
          style={{ width: "100%", height: "100%" }}
        />
      </div>
    );
  }

  // Use inline animated SVG
  const IconComponent = ICON_MAP[icon];
  if (IconComponent) {
    return (
      <div className={`flex-shrink-0 ${className}`} style={{ width: size, height: size }}>
        <IconComponent size={size} />
      </div>
    );
  }

  // Ultimate fallback: themed placeholder
  return (
    <div
      className={`flex-shrink-0 rounded-xl flex items-center justify-center ${className}`}
      style={{ width: size, height: size, background: "rgba(255,140,0,0.1)" }}
    >
      <span style={{ fontSize: size * 0.4, color: "#FF8C00" }}>◈</span>
    </div>
  );
}
