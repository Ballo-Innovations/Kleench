import { useNavigate, useLocation } from "react-router";
import { motion } from "motion/react";
import { ArrowRight, Database, BarChart2, Wheat } from "lucide-react";
import { PageHeader } from "../components/PageHeader";

export function AgentSpecializedIntro() {
  const navigate = useNavigate();
  const { state } = useLocation();

  return (
    <div className="w-full max-w-md mx-auto bg-transparent font-sans pb-24">
      <PageHeader title="SPECIALIZED AGENT" showBack />

      <div className="px-5 pt-5 space-y-5">
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
          className="bg-[var(--color-secondary)] rounded-2xl shadow-md overflow-hidden">
          <div className="px-5 py-6 space-y-2">
            <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center">
              <Database size={22} color="white" strokeWidth={1.5} />
            </div>
            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-white/50 mt-1">Market Intelligence Network</p>
            <p className="text-[18px] font-black text-white uppercase tracking-tight leading-tight">
              Become a Data<br />Contributor
            </p>
            <p className="text-[11px] font-semibold text-white/60">Collect and submit commodity prices, availability, and market conditions to power KLeench Market Intelligence</p>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
          className="space-y-3">
          {[
            { icon: Wheat, title: "Commodity Coverage", desc: "Report on maize, beans, rice, cassava, fuel, and more" },
            { icon: BarChart2, title: "Live Market Data", desc: "Your reports power the price charts seen by thousands of buyers" },
            { icon: Database, title: "Data Integrity", desc: "Verified submissions earn higher credibility scores and commissions" },
          ].map((item, i) => {
            const Icon = item.icon;
            return (
              <div key={i} className="flex items-start gap-3 bg-[var(--app-bg)] border border-[var(--border)] rounded-2xl shadow-sm p-4">
                <div className="w-10 h-10 rounded-xl bg-[var(--color-primary)]/10 flex items-center justify-center shrink-0">
                  <Icon size={18} color="var(--color-primary)" strokeWidth={1.5} />
                </div>
                <div>
                  <p className="text-[12px] font-black text-[var(--app-text)] uppercase tracking-wide">{item.title}</p>
                  <p className="text-[10px] font-semibold text-[var(--color-secondary)]/60 mt-0.5">{item.desc}</p>
                </div>
              </div>
            );
          })}
        </motion.div>
      </div>

      <div className="px-5 pt-6 pb-8">
        <button onClick={() => navigate("/marketplace/agent/specialized/info", { state })}
          className="w-full py-4 rounded-2xl bg-[var(--color-secondary)] text-white font-black uppercase tracking-widest text-[12px] flex items-center justify-center gap-3 shadow-md active:scale-95 transition-all">
          Continue Registration <ArrowRight size={18} />
        </button>
      </div>
    </div>
  );
}
