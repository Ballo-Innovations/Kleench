import { useState } from "react";
import { useNavigate, useLocation } from "react-router";
import { Check, Play, ChevronLeft } from "lucide-react";
import { PageHeader } from "../components/PageHeader";

type PayView = "gate" | "subscribe" | "subscriptions";

const PAYMENT_HISTORY = [
  { title: "Travel Vlog: Hidden Paradise", amount: "K10", date: "20th April 2026" },
  { title: "Fitness Secrets", amount: "K15", date: "6th April 2026" },
];

export function PayToStream() {
  const navigate = useNavigate();
  const location = useLocation();
  const videoTitle = location.state?.title ?? "Premium Video";
  const thumbnailColor = location.state?.color ?? "bg-slate-800";

  const [view, setView] = useState<PayView>("gate");

  const handleSubscribe = () => {
    setView("subscribe");
  };

  const handleConfirmSubscribe = () => {
    setView("subscriptions");
  };

  const handleUnlock = () => {
    navigate(-1);
  };

  if (view === "subscriptions") {
    return (
      <div className="w-full min-h-screen bg-transparent pb-32 font-sans text-slate-800">
        <PageHeader title="My Subscriptions" showBack onBack={() => navigate(-1)} />

        <div className="px-4 pt-4 space-y-4">
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Active</p>

          <div className="bg-[var(--app-bg)] rounded-2xl border border-slate-100 shadow-sm p-4 flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-blue-500 flex items-center justify-center flex-shrink-0">
              <span className="text-white font-black text-sm">PL</span>
            </div>
            <div className="flex-1">
              <p className="font-black text-slate-800 text-sm">Peter M S Lengalenga</p>
              <div className="flex items-center gap-2 mt-0.5">
                <span className="bg-green-100 text-green-600 text-[10px] font-black px-2 py-0.5 rounded-full uppercase tracking-wider">Active</span>
                <span className="text-[10px] text-slate-400 font-semibold">Expires: May 15th 2026</span>
              </div>
            </div>
          </div>

          <div className="bg-[var(--app-bg)] rounded-2xl border border-slate-100 shadow-sm p-4">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">Payment History</p>
            <div className="space-y-3">
              {PAYMENT_HISTORY.map((item, i) => (
                <div key={i} className="flex items-center justify-between py-2 border-b border-slate-50 last:border-0">
                  <div>
                    <p className="text-[12px] font-bold text-slate-700 leading-tight">{item.title}</p>
                    <p className="text-[10px] text-slate-400 mt-0.5">{item.date}</p>
                  </div>
                  <span className="font-black text-slate-800 text-sm">{item.amount}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Video Ads at bottom */}
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-2">Video Ads</p>
          <div className="flex gap-3 overflow-x-auto pb-2 no-scrollbar -mx-4 px-4" style={{ scrollbarWidth: "none" }}>
            {["bg-orange-400", "bg-blue-400", "bg-green-400"].map((color, i) => (
              <div key={i} className={`flex-shrink-0 w-28 h-36 ${color} rounded-2xl flex items-center justify-center`}>
                <Play size={24} className="text-white opacity-80" />
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (view === "subscribe") {
    return (
      <div className="w-full min-h-screen bg-transparent pb-32 font-sans text-slate-800">
        <PageHeader title="Subscribe" showBack onBack={() => setView("gate")} />

        <div className="px-4 pt-6 flex flex-col items-center text-center space-y-4">
          <div className="w-24 h-24 rounded-full bg-blue-500 flex items-center justify-center shadow-lg shadow-blue-500/25">
            <span className="text-white font-black text-2xl">PL</span>
          </div>
          <div>
            <h2 className="font-black text-xl text-[var(--app-text-slate)]">Peter M S Lengalenga</h2>
            <p className="text-[12px] text-slate-500 mt-1">Premium Content Creator</p>
          </div>

          <div className="bg-[var(--app-bg)] border border-slate-100 rounded-2xl p-5 w-full space-y-4 shadow-sm">
            <div className="flex items-center justify-between">
              <span className="font-bold text-slate-600 text-sm">Monthly subscription</span>
              <span className="font-black text-[var(--app-text-slate)] text-lg">K50<span className="text-[12px] text-slate-400 font-bold">/mo</span></span>
            </div>
            <div className="space-y-2">
              {["Access all premium videos", "Early access to new content", "Cancel anytime"].map((benefit) => (
                <div key={benefit} className="flex items-center gap-2">
                  <Check size={14} className="text-green-500 flex-shrink-0" />
                  <span className="text-[12px] text-slate-600">{benefit}</span>
                </div>
              ))}
            </div>
          </div>

          <button onClick={handleConfirmSubscribe} className="w-full h-14 bg-blue-600 text-white rounded-2xl font-black uppercase tracking-widest text-xs shadow-lg shadow-blue-600/25 active:scale-95 transition-all">
            Subscribe — K50/month
          </button>
          <button onClick={() => setView("gate")} className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
            Cancel
          </button>
        </div>
      </div>
    );
  }

  // Gate view
  return (
    <div className="w-full min-h-screen bg-transparent font-sans">
      <div className="relative">
        {/* Blurred thumbnail */}
        <div className={`w-full aspect-[4/5] ${thumbnailColor} relative overflow-hidden`}>
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-16 h-16 rounded-full bg-[var(--app-bg)]/20 border border-white/30 flex items-center justify-center">
              <Play size={24} className="text-white ml-1" />
            </div>
          </div>
          <button onClick={() => navigate(-1)} className="absolute top-4 left-4 w-9 h-9 bg-black/40 rounded-full flex items-center justify-center border border-white/20">
            <ChevronLeft size={18} className="text-white" />
          </button>
        </div>

        {/* Lock overlay cards */}
        <div className="px-5 -mt-8 relative z-10 space-y-3 pb-10">
          <div className="bg-[var(--app-bg)]/10 backdrop-blur-md rounded-2xl p-4 border border-white/20">
            <p className="text-white font-black text-base text-center mb-1">{videoTitle}</p>
            <p className="text-slate-300 text-[12px] text-center">Subscribe to watch this video</p>
            <p className="text-slate-400 text-[11px] text-center mt-0.5">Get access for K50/monthly</p>
          </div>

          <button onClick={handleSubscribe} className="w-full bg-blue-600 text-white py-4 rounded-2xl font-black uppercase tracking-widest text-sm shadow-lg shadow-blue-600/30 active:scale-95 transition-all">
            Subscribe
          </button>
          <button onClick={handleUnlock} className="w-full bg-orange-500 text-white py-4 rounded-2xl font-black uppercase tracking-widest text-sm shadow-lg shadow-orange-500/30 active:scale-95 transition-all">
            Unlock for K15
          </button>
          <button onClick={() => navigate(-1)} className="w-full bg-transparent border border-white/30 text-white py-4 rounded-2xl font-black uppercase tracking-widest text-sm active:scale-95 transition-all">
            Preview
          </button>
        </div>
      </div>
    </div>
  );
}
