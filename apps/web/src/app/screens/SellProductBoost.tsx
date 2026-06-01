import { useState } from "react";
import { useNavigate, useLocation } from "react-router";
import { motion } from "motion/react";
import { Zap, TrendingUp, ArrowRight, SkipForward } from "lucide-react";
import { PageHeader } from "../components/PageHeader";

const BOOST_PLANS = [
  {
    id: "3days", label: "3 Days", price: "K25", color: "#059669",
    stats: { impressions: "6,000", clicks: "420", leads: "18" },
  },
  {
    id: "7days", label: "7 Days", price: "K55", color: "var(--color-primary)", popular: true,
    stats: { impressions: "18,000", clicks: "1,260", leads: "54" },
  },
  {
    id: "15days", label: "15 Days", price: "K99", color: "#7C3AED",
    stats: { impressions: "42,000", clicks: "3,100", leads: "130" },
  },
];
const STEPS = 5;

export function SellProductBoost() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const [selected, setSelected] = useState<string | null>(null);

  const getNextRoute = () => {
    const { sellType } = state || {};
    if (sellType === "service") return "/marketplace/sell/service/review";
    return "/marketplace/sell/product/targeting";
  };

  const proceed = (skip = false) => {
    navigate(getNextRoute(), { state: { ...state, boost: skip ? null : selected } });
  };

  return (
    <div className="w-full max-w-md mx-auto min-h-screen bg-transparent font-sans pb-32">
      <PageHeader title="BOOST LISTING" subtitle="Step 4 of 5" showBack />

      <div className="px-5 pt-5 space-y-5">
        <div className="flex gap-1.5">
          {Array.from({ length: STEPS }).map((_, i) => (
            <div key={i} className={`h-1.5 flex-1 rounded-full ${i < 4 ? "bg-[var(--color-primary)]" : "bg-[var(--border)]"}`} />
          ))}
        </div>

        <div className="bg-[var(--color-primary)]/8 border-2 border-[var(--color-primary)]/20 rounded-2xl p-4 flex gap-3">
          <TrendingUp size={18} className="text-[var(--color-primary)] shrink-0 mt-0.5" strokeWidth={2} />
          <p className="text-[11px] font-semibold text-[var(--color-secondary)]/70 leading-snug">
            Boosted listings get up to <span className="font-black text-[var(--color-primary)]">6× more views</span> and appear at the top of search results.
          </p>
        </div>

        <div className="space-y-3">
          {BOOST_PLANS.map((plan) => (
            <motion.button
              key={plan.id}
              whileTap={{ scale: 0.98 }}
              onClick={() => setSelected(plan.id)}
              className={`w-full flex items-center gap-4 p-4 rounded-2xl border-[3px] transition-all text-left relative ${
                selected === plan.id
                  ? "border-[var(--app-text)] shadow-[4px_4px_0_var(--app-text)]"
                  : "border-[var(--border)] bg-[var(--app-bg)]"
              }`}
              style={selected === plan.id ? { backgroundColor: plan.color + "12" } : {}}
            >
              {plan.popular && (
                <div className="absolute -top-2 right-4 px-3 py-0.5 bg-[var(--color-primary)] text-white text-[8px] font-black uppercase tracking-widest rounded-full">
                  Popular
                </div>
              )}
              <div className="w-12 h-12 rounded-2xl flex items-center justify-center" style={{ backgroundColor: plan.color + "18" }}>
                <Zap size={22} style={{ color: plan.color }} strokeWidth={2} />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <p className="text-[14px] font-black text-[var(--app-text)] uppercase tracking-wide">{plan.label}</p>
                  <div className="text-right">
                    <p className="text-[18px] font-black" style={{ color: plan.color }}>{plan.price}</p>
                    <p className="text-[9px] font-black uppercase text-[var(--color-secondary)]/40">once-off</p>
                  </div>
                </div>
                <div className="flex gap-3 mt-2">
                  {[
                    { key: "Impr.", val: plan.stats.impressions },
                    { key: "Clicks", val: plan.stats.clicks },
                    { key: "Leads", val: plan.stats.leads },
                  ].map(({ key, val }) => (
                    <div key={key}>
                      <p className="text-[11px] font-black" style={{ color: plan.color }}>{val}</p>
                      <p className="text-[8px] font-black uppercase tracking-wide text-[var(--color-secondary)]/40">{key}</p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.button>
          ))}
        </div>

        <button
          onClick={() => proceed(true)}
          className="w-full flex items-center justify-center gap-2 py-3 text-[11px] font-black uppercase tracking-widest text-[var(--color-secondary)]/50 active:opacity-70 transition-all"
        >
          <SkipForward size={14} strokeWidth={2} />
          Skip — List without boost
        </button>
      </div>

      <div className="px-5 pt-2 pb-8">
        <button
          onClick={() => proceed(false)}
          disabled={!selected}
          className="w-full py-4 rounded-2xl bg-[var(--color-secondary)] text-white font-black uppercase tracking-widest text-[12px] flex items-center justify-center gap-3 disabled:opacity-40 disabled:cursor-not-allowed active:scale-95 transition-all"
        >
          Continue <ArrowRight size={18} />
        </button>
      </div>
    </div>
  );
}
