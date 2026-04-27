/**
 * KleenchIcon — Themed animated SVG icons for the Kleench app.
 * 
 * These are inline SVG components with CSS animations — zero CDN dependency,
 * always render, always match the brand palette.
 * 
 * Colors:
 *   Primary:   var(--app-orange) (orange)
 *   Secondary: var(--app-text-alt) (navy)
 *   Tertiary:  #00695C (teal)
 *   Neutral:   #F8F9FB
 */

import type { ReactNode } from "react";

interface IconProps {
  size?: number;
  className?: string;
}

/* ── Animated wrapper ── */
function Svg({ size = 40, children, viewBox = "0 0 40 40", className = "" }: {
  size?: number; children: ReactNode; viewBox?: string; className?: string;
}) {
  return (
    <svg
      width={size} height={size}
      viewBox={viewBox}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {children}
    </svg>
  );
}

/* ── Bell (notifications) ── */
export function BellIcon({ size = 40 }: IconProps) {
  return (
    <Svg size={size} viewBox="0 0 40 40">
      <style>{`.bell-shake{animation:bellShake 2.5s ease-in-out infinite}.dot-pulse{animation:dotPulse 2.5s ease-in-out infinite}@keyframes bellShake{0%,100%{transform:rotate(0) translate(0,0)}10%,50%{transform:rotate(-12deg) translate(-1px,0)}20%,60%{transform:rotate(12deg) translate(1px,0)}30%,70%{transform:rotate(-6deg)}40%,80%{transform:rotate(6deg)}45%,85%,95%{transform:rotate(0)}}@keyframes dotPulse{0%,100%{opacity:1;transform:scale(1)}50%{opacity:0.5;transform:scale(0.7)}}`}</style>
      <g className="bell-shake" style={{ transformOrigin: "20px 12px" }}>
        <path d="M20 4C14.48 4 10 8.48 10 14v8l-2 3h24l-2-3v-8c0-5.52-4.48-10-10-10z" fill="var(--app-orange)" opacity="0.15"/>
        <path d="M20 4C14.48 4 10 8.48 10 14v8l-2 3h24l-2-3v-8c0-5.52-4.48-10-10-10z" stroke="var(--app-orange)" strokeWidth="1.8" strokeLinejoin="round"/>
        <path d="M17 28c0 1.66 1.34 3 3 3s3-1.34 3-3" stroke="var(--app-orange)" strokeWidth="1.8" strokeLinecap="round"/>
        <line x1="20" y1="4" x2="20" y2="2" stroke="var(--app-orange)" strokeWidth="2" strokeLinecap="round"/>
      </g>
      <circle className="dot-pulse" cx="30" cy="8" r="4" fill="var(--app-orange)"/>
    </Svg>
  );
}

/* ── Shield (security) ── */
export function ShieldIcon({ size = 40 }: IconProps) {
  return (
    <Svg size={size} viewBox="0 0 40 40">
      <style>{`.shield-glow{animation:shieldGlow 2s ease-in-out infinite}.check-draw{stroke-dasharray:20;stroke-dashoffset:20;animation:checkDraw 1.2s ease forwards 0.3s}@keyframes shieldGlow{0%,100%{filter:drop-shadow(0 0 0px #00695C)}50%{filter:drop-shadow(0 0 6px #00695C)}}@keyframes checkDraw{to{stroke-dashoffset:0}}`}</style>
      <path className="shield-glow" d="M20 3L6 9v9c0 8.28 5.92 16.02 14 18 8.08-1.98 14-9.72 14-18V9L20 3z" fill="#00695C" opacity="0.12" stroke="#00695C" strokeWidth="1.8" strokeLinejoin="round"/>
      <path className="check-draw" d="M13 20l5 5 9-9" stroke="#00695C" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
    </Svg>
  );
}

/* ── Lock (PIN / security) ── */
export function LockIcon({ size = 40 }: IconProps) {
  return (
    <Svg size={size} viewBox="0 0 40 40">
      <style>{`.lock-bob{animation:lockBob 2s ease-in-out infinite}@keyframes lockBob{0%,100%{transform:translateY(0)}50%{transform:translateY(-2px)}}`}</style>
      <g className="lock-bob" style={{ transformOrigin: "20px 20px" }}>
        <rect x="8" y="18" width="24" height="18" rx="4" fill="var(--app-text-alt)" opacity="0.08" stroke="var(--app-text-alt)" strokeWidth="1.8"/>
        <path d="M13 18v-5a7 7 0 0114 0v5" stroke="var(--app-text-alt)" strokeWidth="1.8" strokeLinecap="round"/>
        <circle cx="20" cy="27" r="2.5" fill="var(--app-orange)"/>
        <line x1="20" y1="29.5" x2="20" y2="32" stroke="var(--app-orange)" strokeWidth="2" strokeLinecap="round"/>
      </g>
    </Svg>
  );
}

/* ── Coin (earnings) ── */
export function CoinIcon({ size = 40 }: IconProps) {
  return (
    <Svg size={size} viewBox="0 0 40 40">
      <style>{`.coin-spin{animation:coinSpin 3s ease-in-out infinite}@keyframes coinSpin{0%,100%{transform:rotateY(0deg) scaleX(1)}25%{transform:rotateY(180deg) scaleX(0.1)}50%{transform:rotateY(360deg) scaleX(1)}70%,95%{transform:scaleX(1)}}`}</style>
      <g className="coin-spin" style={{ transformOrigin: "20px 20px" }}>
        <circle cx="20" cy="20" r="14" fill="var(--app-orange)" opacity="0.15"/>
        <circle cx="20" cy="20" r="14" stroke="var(--app-orange)" strokeWidth="2"/>
        <text x="20" y="25" textAnchor="middle" fontSize="13" fontWeight="800" fill="var(--app-orange)" fontFamily="serif">K</text>
      </g>
    </Svg>
  );
}

/* ── Trophy (achievement / tier) ── */
export function TrophyIcon({ size = 40 }: IconProps) {
  return (
    <Svg size={size} viewBox="0 0 40 40">
      <style>{`.trophy-glow{animation:trophyGlow 2s ease-in-out infinite}@keyframes trophyGlow{0%,100%{opacity:1}50%{opacity:0.6}}`}</style>
      <path d="M12 6h16v12a8 8 0 01-16 0V6z" fill="var(--app-orange)" opacity="0.15" stroke="var(--app-orange)" strokeWidth="1.8"/>
      <path d="M7 8H12v7a4 4 0 01-4-4V9a1 1 0 011-1z" fill="none" stroke="var(--app-orange)" strokeWidth="1.8" strokeLinejoin="round"/>
      <path d="M33 8H28v7a4 4 0 004-4V9a1 1 0 00-1-1z" fill="none" stroke="var(--app-orange)" strokeWidth="1.8" strokeLinejoin="round"/>
      <line x1="20" y1="26" x2="20" y2="30" stroke="var(--app-orange)" strokeWidth="2" strokeLinecap="round"/>
      <rect x="13" y="30" width="14" height="3" rx="1.5" fill="var(--app-orange)" opacity="0.4" stroke="var(--app-orange)" strokeWidth="1.5"/>
      <circle className="trophy-glow" cx="20" cy="15" r="3" fill="var(--app-orange)" opacity="0.5"/>
    </Svg>
  );
}

/* ── Cart / Shopping (product) ── */
export function CartIcon({ size = 40 }: IconProps) {
  return (
    <Svg size={size} viewBox="0 0 40 40">
      <style>{`.cart-bounce{animation:cartBounce 2s ease-in-out infinite}@keyframes cartBounce{0%,100%{transform:translateY(0)}40%{transform:translateY(-2px)}60%{transform:translateY(1px)}}`}</style>
      <g className="cart-bounce" style={{ transformOrigin: "20px 20px" }}>
        <path d="M6 7h4l3.6 14.4A2 2 0 0015.5 23h13a2 2 0 001.96-1.6L33 12H11" stroke="var(--app-orange)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
        <circle cx="16" cy="29" r="2.5" fill="var(--app-orange)"/>
        <circle cx="27" cy="29" r="2.5" fill="var(--app-orange)"/>
      </g>
    </Svg>
  );
}

/* ── Rocket (launch / reach) ── */
export function RocketIcon({ size = 40 }: IconProps) {
  return (
    <Svg size={size} viewBox="0 0 40 40">
      <style>{`.rocket-fly{animation:rocketFly 1.8s ease-in-out infinite}.flame{animation:flamePulse 0.4s ease-in-out infinite alternate}@keyframes rocketFly{0%,100%{transform:translateY(0) rotate(-45deg)}50%{transform:translateY(-3px) rotate(-45deg)}}@keyframes flamePulse{from{transform:scaleY(0.8)}to{transform:scaleY(1.2)}}`}</style>
      <g className="rocket-fly" style={{ transformOrigin: "20px 20px" }}>
        <path d="M20 6C24 10 26 18 24 24l-4 4-4-4C14 18 16 10 20 6z" fill="var(--app-orange)" opacity="0.2" stroke="var(--app-orange)" strokeWidth="1.8" strokeLinejoin="round"/>
        <circle cx="20" cy="17" r="3" fill="var(--app-orange)"/>
        <path d="M16 24l-4 4 2 2 4-2M24 24l4 4-2 2-4-2" fill="var(--app-text-alt)" opacity="0.3"/>
        <g className="flame" style={{ transformOrigin: "20px 28px" }}>
          <path d="M17 28l3 6 3-6" fill="var(--app-orange)" opacity="0.7"/>
        </g>
      </g>
    </Svg>
  );
}

/* ── Megaphone (ads / marketing) ── */
export function MegaphoneIcon({ size = 40 }: IconProps) {
  return (
    <Svg size={size} viewBox="0 0 40 40">
      <style>{`.mega-pulse{animation:megaPulse 1.5s ease-in-out infinite}@keyframes megaPulse{0%,100%{transform:scale(1)}50%{transform:scale(1.06)}}`}</style>
      <g className="mega-pulse" style={{ transformOrigin: "20px 20px" }}>
        <path d="M8 15h6l14-8v22L14 21H8a2 2 0 01-2-2v-2a2 2 0 012-2z" fill="#7C3AED" opacity="0.15" stroke="#7C3AED" strokeWidth="1.8" strokeLinejoin="round"/>
        <path d="M14 21v6a2 2 0 002 2h2a2 2 0 002-2v-6" stroke="#7C3AED" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M30 15c2 1.5 2 6.5 0 8" stroke="#7C3AED" strokeWidth="1.8" strokeLinecap="round" opacity="0.5"/>
      </g>
    </Svg>
  );
}

/* ── Target (service ad) ── */
export function TargetIcon({ size = 40 }: IconProps) {
  return (
    <Svg size={size} viewBox="0 0 40 40">
      <style>{`.target-spin{animation:targetSpin 4s linear infinite}@keyframes targetSpin{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}`}</style>
      <circle cx="20" cy="20" r="14" stroke="#0077B6" strokeWidth="1.5" opacity="0.2"/>
      <circle cx="20" cy="20" r="9" stroke="#0077B6" strokeWidth="1.5" opacity="0.4"/>
      <circle cx="20" cy="20" r="4" fill="#0077B6" opacity="0.8"/>
      <path className="target-spin" style={{ transformOrigin: "20px 20px" }} d="M20 6v4M20 30v4M6 20h4M30 20h4" stroke="#0077B6" strokeWidth="2" strokeLinecap="round"/>
    </Svg>
  );
}

/* ── Users / Community ── */
export function UsersIcon({ size = 40 }: IconProps) {
  return (
    <Svg size={size} viewBox="0 0 40 40">
      <style>{`.user-wave{animation:userWave 2s ease-in-out infinite}@keyframes userWave{0%,100%{transform:translateX(0)}50%{transform:translateX(1.5px)}}`}</style>
      <circle cx="15" cy="14" r="5" fill="#00695C" opacity="0.15" stroke="#00695C" strokeWidth="1.8"/>
      <path d="M5 32c0-6 4.5-10 10-10s10 4 10 10" stroke="#00695C" strokeWidth="1.8" strokeLinecap="round" fill="none"/>
      <g className="user-wave">
        <circle cx="29" cy="14" r="5" fill="var(--app-orange)" opacity="0.15" stroke="var(--app-orange)" strokeWidth="1.8"/>
        <path d="M23 32c1-4 3.5-7 6-8" stroke="var(--app-orange)" strokeWidth="1.8" strokeLinecap="round" fill="none"/>
      </g>
    </Svg>
  );
}

/* ── Share / Referral link ── */
export function ShareIcon({ size = 40 }: IconProps) {
  return (
    <Svg size={size} viewBox="0 0 40 40">
      <style>{`.share-line{stroke-dasharray:30;stroke-dashoffset:30;animation:shareLink 2s ease-in-out infinite}@keyframes shareLink{0%{stroke-dashoffset:30}50%{stroke-dashoffset:0}100%{stroke-dashoffset:30}}`}</style>
      <circle cx="10" cy="20" r="4" stroke="var(--app-orange)" strokeWidth="1.8" fill="var(--app-orange)" fillOpacity="0.15"/>
      <circle cx="30" cy="10" r="4" stroke="var(--app-orange)" strokeWidth="1.8" fill="var(--app-orange)" fillOpacity="0.15"/>
      <circle cx="30" cy="30" r="4" stroke="var(--app-orange)" strokeWidth="1.8" fill="var(--app-orange)" fillOpacity="0.15"/>
      <path className="share-line" d="M14 18l12-7M14 22l12 7" stroke="var(--app-orange)" strokeWidth="1.8" strokeLinecap="round"/>
    </Svg>
  );
}

/* ── Gift (offers / referral) ── */
export function GiftIcon({ size = 40 }: IconProps) {
  return (
    <Svg size={size} viewBox="0 0 40 40">
      <style>{`.gift-float{animation:giftFloat 2s ease-in-out infinite}@keyframes giftFloat{0%,100%{transform:translateY(0)}50%{transform:translateY(-2px)}}`}</style>
      <g className="gift-float">
        <rect x="7" y="17" width="26" height="18" rx="2" fill="var(--app-orange)" opacity="0.12" stroke="var(--app-orange)" strokeWidth="1.8"/>
        <rect x="5" y="12" width="30" height="6" rx="2" fill="var(--app-orange)" opacity="0.2" stroke="var(--app-orange)" strokeWidth="1.8"/>
        <path d="M20 12V35M14 12c-2-2-2-6 0-6 3 0 6 6 6 6M26 12c2-2 2-6 0-6-3 0-6 6-6 6" stroke="var(--app-orange)" strokeWidth="1.8" strokeLinecap="round"/>
      </g>
    </Svg>
  );
}

/* ── Chart / Poll ── */
export function ChartIcon({ size = 40 }: IconProps) {
  return (
    <Svg size={size} viewBox="0 0 40 40">
      <style>{`.bar1{animation:growBar 1.8s ease-in-out infinite}.bar2{animation:growBar 1.8s ease-in-out 0.2s infinite}.bar3{animation:growBar 1.8s ease-in-out 0.4s infinite}@keyframes growBar{0%,100%{transform:scaleY(1)}50%{transform:scaleY(1.15)}}`}</style>
      <rect className="bar1" x="7"  y="22" width="7" height="12" rx="2" fill="var(--app-orange)" opacity="0.7" style={{ transformOrigin: "10.5px 34px" }}/>
      <rect className="bar2" x="17" y="14" width="7" height="20" rx="2" fill="var(--app-orange)"           style={{ transformOrigin: "20.5px 34px" }}/>
      <rect className="bar3" x="27" y="18" width="7" height="16" rx="2" fill="#00695C" opacity="0.8" style={{ transformOrigin: "30.5px 34px" }}/>
      <line x1="5" y1="35" x2="35" y2="35" stroke="var(--app-text-alt)" strokeWidth="1.5" opacity="0.2" strokeLinecap="round"/>
    </Svg>
  );
}

/* ── Success / Check ── */
export function SuccessIcon({ size = 80 }: IconProps) {
  return (
    <Svg size={size} viewBox="0 0 80 80">
      <style>{`.success-ring{stroke-dasharray:200;stroke-dashoffset:200;animation:ringDraw 1s ease forwards}.success-check{stroke-dasharray:60;stroke-dashoffset:60;animation:checkDraw2 0.7s ease forwards 0.9s}.success-circle{animation:circlePop 0.5s cubic-bezier(0.34,1.56,0.64,1) forwards}@keyframes ringDraw{to{stroke-dashoffset:0}}@keyframes checkDraw2{to{stroke-dashoffset:0}}@keyframes circlePop{from{transform:scale(0)}to{transform:scale(1)}}`}</style>
      <circle className="success-circle" cx="40" cy="40" r="36" fill="#00695C" opacity="0.1" style={{ transformOrigin: "40px 40px" }}/>
      <circle className="success-ring" cx="40" cy="40" r="32" stroke="#00695C" strokeWidth="3" fill="none"/>
      <path className="success-check" d="M24 40l11 11 21-21" stroke="#00695C" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round"/>
    </Svg>
  );
}

/* ── Empty state ── */
export function EmptyIcon({ size = 80 }: IconProps) {
  return (
    <Svg size={size} viewBox="0 0 80 80">
      <style>{`.empty-float{animation:emptyFloat 3s ease-in-out infinite}.empty-fade{animation:emptyFade 3s ease-in-out infinite}@keyframes emptyFloat{0%,100%{transform:translateY(0)}50%{transform:translateY(-4px)}}@keyframes emptyFade{0%,100%{opacity:0.3}50%{opacity:0.8}}`}</style>
      <ellipse className="empty-fade" cx="40" cy="62" rx="22" ry="6" fill="var(--app-text-alt)" opacity="0.07"/>
      <g className="empty-float">
        <rect x="16" y="22" width="48" height="36" rx="6" fill="#F8F9FB" stroke="var(--app-text-alt)" strokeWidth="1.5" strokeOpacity="0.15"/>
        <line x1="26" y1="34" x2="54" y2="34" stroke="var(--app-text-alt)" strokeWidth="1.5" opacity="0.12" strokeLinecap="round"/>
        <line x1="26" y1="42" x2="48" y2="42" stroke="var(--app-text-alt)" strokeWidth="1.5" opacity="0.08" strokeLinecap="round"/>
        <circle cx="40" cy="20" r="8" fill="var(--app-orange)" opacity="0.2" stroke="var(--app-orange)" strokeWidth="1.5"/>
        <path d="M37 19h6M40 16v6" stroke="var(--app-orange)" strokeWidth="2" strokeLinecap="round"/>
      </g>
    </Svg>
  );
}

/* ── Solar panel ── */
export function SolarIconAnim({ size = 40 }: IconProps) {
  return (
    <Svg size={size} viewBox="0 0 40 40">
      <style>{`.sun-ray{animation:sunRotate 8s linear infinite}@keyframes sunRotate{from{transform:rotate(0)}to{transform:rotate(360deg)}}`}</style>
      <g className="sun-ray" style={{ transformOrigin: "20px 14px" }}>
        <circle cx="20" cy="14" r="5" fill="var(--app-orange)" opacity="0.3"/>
        {[0,45,90,135,180,225,270,315].map((a, i) => (
          <line key={i}
            x1={20 + 7*Math.cos(a*Math.PI/180)} y1={14 + 7*Math.sin(a*Math.PI/180)}
            x2={20 + 10*Math.cos(a*Math.PI/180)} y2={14 + 10*Math.sin(a*Math.PI/180)}
            stroke="var(--app-orange)" strokeWidth="1.5" strokeLinecap="round"
          />
        ))}
      </g>
      <rect x="7" y="23" width="26" height="14" rx="2" fill="none" stroke="var(--app-orange)" strokeWidth="1.5" opacity="0.7"/>
      <line x1="7" y1="28" x2="33" y2="28" stroke="var(--app-orange)" strokeWidth="1" opacity="0.5"/>
      <line x1="7" y1="32" x2="33" y2="32" stroke="var(--app-orange)" strokeWidth="1" opacity="0.5"/>
      <line x1="16" y1="23" x2="16" y2="37" stroke="var(--app-orange)" strokeWidth="1" opacity="0.5"/>
      <line x1="24" y1="23" x2="24" y2="37" stroke="var(--app-orange)" strokeWidth="1" opacity="0.5"/>
    </Svg>
  );
}

/* ── Network / Wifi ── */
export function NetworkIcon({ size = 40 }: IconProps) {
  return (
    <Svg size={size} viewBox="0 0 40 40">
      <style>{`.net1{animation:netPulse 2s ease infinite 0s}.net2{animation:netPulse 2s ease infinite 0.3s}.net3{animation:netPulse 2s ease infinite 0.6s}@keyframes netPulse{0%,100%{opacity:0.3}50%{opacity:1}}`}</style>
      <path className="net1" d="M8 22a17 17 0 0124 0" stroke="#0077B6" strokeWidth="2" strokeLinecap="round" fill="none"/>
      <path className="net2" d="M12 26a11 11 0 0116 0" stroke="#0077B6" strokeWidth="2" strokeLinecap="round" fill="none"/>
      <path className="net3" d="M16 30a5 5 0 018 0" stroke="#0077B6" strokeWidth="2" strokeLinecap="round" fill="none"/>
      <circle cx="20" cy="33" r="2" fill="#0077B6"/>
    </Svg>
  );
}

/* ── Deposit (Hand + Down arrow) ── */
export function DepositIcon({ size = 40 }: IconProps) {
  return (
    <Svg size={size} viewBox="0 0 40 40">
      <style>{`.depo-arrow{animation:depoBounce 1.5s ease-in-out infinite}.coin-flow{animation:coinFlow 1.5s ease-in-out infinite}@keyframes depoBounce{0%,100%{transform:translateY(0)}50%{transform:translateY(3px)}}@keyframes coinFlow{0%{opacity:0;transform:translateY(-5px)}30%{opacity:1}100%{opacity:0;transform:translateY(5px)}}`}</style>
      <rect x="8" y="22" width="24" height="12" rx="3" fill="var(--app-orange)" opacity="0.12" stroke="var(--app-orange)" strokeWidth="1.8"/>
      <path className="depo-arrow" d="M20 6v10m-3-3l3 3 3-3" stroke="var(--app-orange)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <circle className="coin-flow" cx="20" cy="28" r="3" fill="var(--app-orange)" opacity="0.6"/>
    </Svg>
  );
}

/* ── Send (Paper Plane / Flight) ── */
export function SendAnimIcon({ size = 40 }: IconProps) {
  return (
    <Svg size={size} viewBox="0 0 40 40">
      <style>{`.send-glide{animation:sendGlide 2.5s ease-in-out infinite}@keyframes sendGlide{0%,100%{transform:translate(0,0) rotate(0deg)}25%{transform:translate(2px,-2px) rotate(-5deg)}75%{transform:translate(-1px,1px) rotate(2deg)}}`}</style>
      <g className="send-glide" style={{ transformOrigin: "20px 20px" }}>
        <path d="M34 6L6 20l12 4 4 10 12-28z" fill="var(--app-orange)" opacity="0.15" stroke="var(--app-orange)" strokeWidth="1.8" strokeLinejoin="round"/>
        <path d="M34 6L18 24M34 6l-12 10" stroke="var(--app-orange)" strokeWidth="1.8" strokeLinecap="round"/>
      </g>
    </Svg>
  );
}

/* ── Withdraw (ATM / Card Arrow Up) ── */
export function WithdrawIcon({ size = 40 }: IconProps) {
  return (
    <Svg size={size} viewBox="0 0 40 40">
      <style>{`.width-arrow{animation:widthBounce 1.5s ease-in-out infinite}.money-trail{stroke-dasharray:10;animation:trailDash 1.5s linear infinite}@keyframes widthBounce{0%,100%{transform:translateY(0)}50%{transform:translateY(-3px)}}@keyframes trailDash{to{stroke-dashoffset:20}}`}</style>
      <path d="M8 20h24M8 26h24" stroke="var(--app-orange)" strokeWidth="1.8" strokeLinecap="round" opacity="0.3"/>
      <rect x="8" y="14" width="24" height="18" rx="3" fill="var(--app-orange)" opacity="0.12" stroke="var(--app-orange)" strokeWidth="1.8"/>
      <path className="width-arrow" d="M20 22V8m-3 3l3-3 3 3" stroke="var(--app-orange)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <line className="money-trail" x1="14" y1="20" x2="26" y2="20" stroke="var(--app-orange)" strokeWidth="1" strokeDasharray="3 3"/>
    </Svg>
  );
}

/* ── Course / Book ── */
export function CourseIcon({ size = 40 }: IconProps) {
  return (
    <Svg size={size} viewBox="0 0 40 40">
      <style>{`.page-turn{animation:pageTurn 2.5s ease-in-out infinite}@keyframes pageTurn{0%,100%{transform:rotateY(0deg)}50%{transform:rotateY(-20deg)}}`}</style>
      <g className="page-turn" style={{ transformOrigin: "20px 20px" }}>
        <rect x="9" y="8" width="22" height="26" rx="3" fill="#00695C" opacity="0.1" stroke="#00695C" strokeWidth="1.8"/>
        <line x1="14" y1="16" x2="26" y2="16" stroke="#00695C" strokeWidth="1.5" strokeLinecap="round"/>
        <line x1="14" y1="21" x2="26" y2="21" stroke="#00695C" strokeWidth="1.5" strokeLinecap="round"/>
        <line x1="14" y1="26" x2="22" y2="26" stroke="#00695C" strokeWidth="1.5" strokeLinecap="round"/>
        <line x1="9" y1="8" x2="9" y2="34" stroke="#00695C" strokeWidth="2.5" strokeLinecap="round"/>
      </g>
    </Svg>
  );
}

/* ── Message / Chat ── */
export function MessageIcon({ size = 40 }: IconProps) {
  return (
    <Svg size={size} viewBox="0 0 40 40">
      <style>{`.chat-bounce{animation:chatBounce 2s ease-in-out infinite}.dot1{animation:dotFade 1.5s infinite}.dot2{animation:dotFade 1.5s infinite 0.3s}.dot3{animation:dotFade 1.5s infinite 0.6s}@keyframes chatBounce{0%,100%{transform:translateY(0)}50%{transform:translateY(-2px)}}@keyframes dotFade{0%,100%{opacity:0.2}50%{opacity:1}}`}</style>
      <g className="chat-bounce" style={{ transformOrigin: "20px 20px" }}>
        <path d="M8 10h24a4 4 0 014 4v12a4 4 0 01-4 4H18l-6 6v-6H8a4 4 0 01-4-4V14a4 4 0 014-4z" fill="var(--app-orange)" opacity="0.15" stroke="var(--app-orange)" strokeWidth="1.8" strokeLinejoin="round"/>
        <circle className="dot1" cx="12" cy="20" r="1.5" fill="var(--app-orange)"/>
        <circle className="dot2" cx="20" cy="20" r="1.5" fill="var(--app-orange)"/>
        <circle className="dot3" cx="28" cy="20" r="1.5" fill="var(--app-orange)"/>
      </g>
    </Svg>
  );
}

/* ── Mapping: use key string to component ── */
export const ICON_MAP: Record<string, (props: IconProps) => JSX.Element> = {
  bell:      BellIcon,
  shield:    ShieldIcon,
  lock:      LockIcon,
  coin:      CoinIcon,
  trophy:    TrophyIcon,
  cart:      CartIcon,
  rocket:    RocketIcon,
  megaphone: MegaphoneIcon,
  target:    TargetIcon,
  users:     UsersIcon,
  share:     ShareIcon,
  gift:      GiftIcon,
  chart:     ChartIcon,
  poll:      ChartIcon,
  success:   SuccessIcon,
  empty:     EmptyIcon,
  solar:     SolarIconAnim,
  network:   NetworkIcon,
  course:    CourseIcon,
  deposit:   DepositIcon,
  send:      SendAnimIcon,
  withdraw:  WithdrawIcon,
  message:   MessageIcon,
};
