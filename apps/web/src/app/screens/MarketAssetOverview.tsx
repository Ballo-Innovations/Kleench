import { useState } from "react";
import { useNavigate, useParams } from "react-router";
import { motion } from "motion/react";
import { Star, MessageCircle, Eye, Shield, ChevronRight, ArrowRight, CalendarCheck, BadgeCheck } from "lucide-react";
import { PageHeader } from "../components/PageHeader";
import { toast } from "sonner";

const MOCK_ASSET = {
  id: "1",
  name: "2020 Caterpillar Excavator 320",
  category: "Industrial Machinery",
  condition: "Excellent",
  year: 2020,
  price: 850000,
  deposit: 85000,
  seller: "Copperbelt Heavy Equipment Ltd",
  rating: 4.9,
  location: "Kitwe, Copperbelt",
  specs: "3.2L diesel engine, 20-ton operating weight, 1.2m³ bucket capacity, 2,450 hours",
  description: "Well-maintained excavator in excellent working condition. Full service history available. Based in Kitwe, viewing by appointment.",
  features: ["CE Certified", "Full Service History", "Genuine CAT Parts", "Warranty Available"],
  verificationScore: 92,
};
const TABS = ["Overview", "Price Details", "Documents"] as const;

export function MarketAssetOverview() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState<typeof TABS[number]>("Overview");

  const asset = MOCK_ASSET;

  return (
    <div className="w-full max-w-md mx-auto bg-transparent font-sans pb-24">
      <PageHeader title={asset.category.toUpperCase()} showBack />

      <div className="space-y-4">
        <div className="h-52 bg-gradient-to-br from-[#1e293b] to-[#334155] flex items-center justify-center relative overflow-hidden">
          <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "radial-gradient(circle, #fff 1px, transparent 1px)", backgroundSize: "20px 20px" }} />
          <div className="relative text-center text-white px-6">
            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-white/50 mb-2">{asset.category}</p>
            <h1 className="text-xl font-black uppercase tracking-tight leading-tight">{asset.name}</h1>
            <div className="mt-3 flex items-center justify-center gap-2 flex-wrap">
              <div className="inline-flex items-center gap-1.5 bg-[#059669]/20 border border-[#059669]/40 rounded-full px-3 py-1">
                <div className="w-1.5 h-1.5 rounded-full bg-[#059669] animate-pulse" />
                <span className="text-[9px] font-black uppercase tracking-widest text-[#059669]">Available</span>
              </div>
              <div className="inline-flex items-center gap-1.5 bg-[var(--color-primary)]/20 border border-[var(--color-primary)]/40 rounded-full px-3 py-1">
                <BadgeCheck size={10} color="var(--color-primary)" strokeWidth={2.5} />
                <span className="text-[9px] font-black uppercase tracking-widest text-[var(--color-primary)]">{asset.verificationScore}% Verified</span>
              </div>
            </div>
          </div>
        </div>

        <div className="px-5 space-y-4">
          <div className="bg-[var(--app-bg)] rounded-3xl border-[3px] border-[var(--app-text)] shadow-[6px_6px_0_var(--app-text)] p-5">
            <div className="flex items-start justify-between gap-3 mb-4">
              <div className="flex-1">
                <p className="text-[14px] font-black text-[var(--app-text)] uppercase tracking-wide leading-tight">{asset.name}</p>
                <p className="text-[11px] font-bold text-[var(--color-primary)] mt-0.5">{asset.seller}</p>
                <div className="flex items-center gap-2 mt-2">
                  <Star size={12} className="text-[#F59E0B]" fill="#F59E0B" />
                  <span className="text-[11px] font-black text-[var(--app-text)]">{asset.rating}</span>
                  <span className="text-[10px] font-semibold text-[var(--color-secondary)]/50">· {asset.location}</span>
                </div>
              </div>
              <div className="text-right">
                <p className="text-[22px] font-black text-[var(--color-primary)]">K{asset.price.toLocaleString()}</p>
                <p className="text-[9px] font-black text-[var(--color-secondary)]/40 uppercase tracking-wide">Sale Price</p>
              </div>
            </div>

            <div className="flex gap-2">
              {[
                { icon: MessageCircle, label: "Chat", action: () => navigate(`/marketplace/asset/${id}/chat`) },
                { icon: CalendarCheck, label: "Inspect", action: () => toast.info("Booking inspection...") },
                { icon: Eye, label: "Details", action: () => setActiveTab("Price Details") },
              ].map(({ icon: Icon, label, action }) => (
                <button key={label} onClick={action}
                  className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl border-2 border-[var(--border)] bg-[var(--app-bg)] text-[var(--color-secondary)] active:scale-95 transition-all">
                  <Icon size={14} strokeWidth={2} />
                  <span className="text-[10px] font-black uppercase tracking-wide">{label}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="flex border border-[var(--border)] rounded-full overflow-hidden shadow-sm">
            {TABS.map((tab, i) => (
              <button key={tab} onClick={() => setActiveTab(tab)}
                className={`flex-1 py-2.5 text-[9px] font-black uppercase tracking-widest transition-all ${activeTab === tab ? "bg-[var(--color-secondary)] text-white" : "bg-[var(--app-bg)] text-[var(--color-secondary)]/50"} ${i > 0 ? "border-l border-[var(--border)]" : ""}`}>
                {tab}
              </button>
            ))}
          </div>

          {activeTab === "Overview" && (
            <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
              {/* Financial summary card */}
              <div className="bg-[var(--app-bg)] rounded-2xl border-[3px] border-[var(--app-text)] shadow-[4px_4px_0_var(--app-text)] overflow-hidden">
                <div className="bg-[var(--color-secondary)] px-4 py-2.5 flex items-center gap-2">
                  <Shield size={12} color="white" strokeWidth={2.5} />
                  <p className="text-[9px] font-black uppercase tracking-[0.25em] text-white/80">Financial Summary</p>
                </div>
                <div className="p-4 grid grid-cols-3 gap-3">
                  {[
                    { label: "Total Price", value: `K${asset.price.toLocaleString()}` },
                    { label: "Deposit (10%)", value: `K${asset.deposit.toLocaleString()}` },
                    { label: "Balance", value: `K${(asset.price - asset.deposit).toLocaleString()}` },
                  ].map(({ label, value }) => (
                    <div key={label} className="text-center">
                      <p className="text-[14px] font-black text-[var(--color-primary)]">{value}</p>
                      <p className="text-[8px] font-black uppercase tracking-wide text-[var(--color-secondary)]/50 mt-0.5">{label}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-[var(--app-bg)] rounded-2xl border-[3px] border-[var(--app-text)] shadow-[4px_4px_0_var(--app-text)] p-5 space-y-3">
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[var(--color-secondary)]/50">Specifications</p>
                <p className="text-[12px] font-semibold text-[var(--color-secondary)]/70 leading-relaxed">{asset.specs}</p>
              </div>
              <div className="bg-[var(--app-bg)] rounded-2xl border-[3px] border-[var(--app-text)] shadow-[4px_4px_0_var(--app-text)] p-5 space-y-3">
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[var(--color-secondary)]/50">Description</p>
                <p className="text-[12px] font-semibold text-[var(--color-secondary)]/70 leading-relaxed">{asset.description}</p>
              </div>
              <div className="bg-[var(--app-bg)] rounded-2xl border-[3px] border-[var(--app-text)] shadow-[4px_4px_0_var(--app-text)] p-5 space-y-3">
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[var(--color-secondary)]/50">Key Features</p>
                <div className="grid grid-cols-2 gap-2">
                  {asset.features.map((f) => (
                    <div key={f} className="flex items-center gap-2 p-2.5 bg-[var(--color-primary)]/8 rounded-xl">
                      <Shield size={12} className="text-[var(--color-primary)] shrink-0" strokeWidth={2.5} />
                      <span className="text-[10px] font-black text-[var(--app-text)] uppercase tracking-wide leading-tight">{f}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === "Price Details" && (
            <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
              <div className="bg-[var(--app-bg)] rounded-2xl border-[3px] border-[var(--app-text)] shadow-[4px_4px_0_var(--app-text)] p-5 space-y-0">
                {[
                  { label: "Sale Price", value: `K${asset.price.toLocaleString()}` },
                  { label: "Required Deposit", value: `K${asset.deposit.toLocaleString()}` },
                  { label: "Balance on Delivery", value: `K${(asset.price - asset.deposit).toLocaleString()}` },
                  { label: "Condition", value: asset.condition },
                  { label: "Year", value: String(asset.year) },
                ].map(({ label, value }) => (
                  <div key={label} className="flex items-center justify-between py-3 border-b border-[var(--border)] last:border-0">
                    <span className="text-[10px] font-black uppercase tracking-wide text-[var(--color-secondary)]/50">{label}</span>
                    <span className="text-[12px] font-bold text-[var(--color-secondary)]">{value}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {activeTab === "Documents" && (
            <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
              className="bg-[var(--app-bg)] rounded-2xl border-[3px] border-[var(--app-text)] shadow-[4px_4px_0_var(--app-text)] overflow-hidden">
              {["Ownership Certificate", "Inspection Report", "Maintenance Records"].map((doc, i) => (
                <button key={doc} onClick={() => toast.info(`Opening ${doc}...`)}
                  className="w-full flex items-center justify-between px-5 py-4 border-b border-[var(--border)] last:border-0 active:bg-[var(--border)]/20 transition-all">
                  <span className="text-[12px] font-black text-[var(--app-text)] uppercase tracking-wide">{doc}</span>
                  <ChevronRight size={14} className="text-[var(--color-secondary)]/40" strokeWidth={2} />
                </button>
              ))}
            </motion.div>
          )}
        </div>
      </div>

      <div className="px-5 pt-4 pb-8">
        <button
          onClick={() => navigate(`/marketplace/asset/${id}/price`, { state: { asset } })}
          className="w-full py-4 rounded-2xl bg-[var(--color-secondary)] text-white font-black uppercase tracking-widest text-[12px] flex items-center justify-center gap-3 shadow-md active:scale-95 transition-all"
        >
          View Details <ArrowRight size={18} />
        </button>
      </div>
    </div>
  );
}
