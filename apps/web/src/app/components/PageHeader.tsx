import { MessageCircle, Settings, Bell, Search } from "lucide-react";
import { Link } from "react-router";

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  children?: React.ReactNode;
  top?: React.ReactNode;
  height?: string | number;
  hideMessageIcon?: boolean;
}

export function PageHeader({ title, subtitle, children, top, height = 180, hideMessageIcon = false }: PageHeaderProps) {
  return (
    <div 
      className="relative pt-4 pb-0 px-6 overflow-hidden rounded-b-[40px] flex flex-col justify-between"
      style={{ 
        background: "linear-gradient(135deg, #FF8C00, #e06900)", 
        boxShadow: "0 10px 30px rgba(255,140,0,0.12)",
        height: typeof height === "number" ? `${height}px` : height
      }}
    >
      {/* ── Premium grid texture ── */}
      <div className="absolute inset-0 opacity-[0.25]" style={{ WebkitMaskImage: 'radial-gradient(circle at top left, white, transparent 80%)', maskImage: 'radial-gradient(circle at top left, white, transparent 80%)' }}>
        <svg width="100%" height="100%">
          <defs>
            <pattern id="premium-header-grid" width="32" height="32" patternUnits="userSpaceOnUse">
              <path d="M 32 0 L 0 0 0 32" fill="none" stroke="white" strokeWidth="1.5" strokeOpacity="0.6"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#premium-header-grid)"/>
        </svg>
      </div>
      
      {/* ── Soft glow orbs ── */}
      <div className="absolute top-[-20%] left-[-10%] w-64 h-64 bg-white/20 rounded-full blur-[60px] pointer-events-none"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-48 h-48 bg-[#FFC300]/20 rounded-full blur-[50px] pointer-events-none"></div>

      {/* ── Header Top Layer ── */}
      <div className="relative z-[30] mt-2 flex items-center justify-between min-h-[40px]">
        {top ? (
          <div className="flex-1">{top}</div>
        ) : (
          <div className="flex-1" />
        )}
        
        {/* Consistent Top Actions matching Home.tsx */}
        <div className="flex items-center gap-3.5 flex-shrink-0 ml-3">
          <Link to="/discover" className="text-white hover:text-white/80 transition-all active:scale-95">
             <Search size={20} />
          </Link>
          {!hideMessageIcon && (
            <Link to="/messages" className="text-white hover:text-white/80 transition-all active:scale-95">
              <MessageCircle size={20} />
            </Link>
          )}
          <Link to="/settings" className="text-white hover:text-white/80 transition-all active:scale-95">
            <Settings size={20} />
          </Link>
          <Link to="/notifications" className="relative text-white hover:text-white/80 transition-all active:scale-95">
            <Bell size={20} />
            <span className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-[#FF8C00] rounded-full border border-[#e06900]" />
          </Link>
        </div>
      </div>

      <div className="relative z-10 space-y-1 mb-10 mt-4">
        <h1 className="text-white text-3xl font-black tracking-tight" style={{ fontFamily: "system-ui, -apple-system, sans-serif" }}>{title}</h1>
        {subtitle && <p className="text-white/80 text-[13px] font-medium">{subtitle}</p>}
      </div>

      {children}
    </div>
  );
}
