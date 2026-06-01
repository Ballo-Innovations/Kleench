import { useNavigate, useLocation } from "react-router";
import { useEffect } from "react";
import { motion } from "motion/react";
import { CheckCircle, LayoutDashboard, Home, Eye } from "lucide-react";
import { PageHeader } from "../components/PageHeader";

const SEED_SERVICES = [
  { id: "svc-1", name: "Professional Wedding Photography", category: "Photography & Media", serviceType: "Photography", provider: "Chisenga Studios", rating: 4.8, price: "3500", responseTime: "~2 hrs", location: "Lusaka", createdAt: Date.now() },
  { id: "svc-2", name: "Full-Stack Web Development", category: "Technology", serviceType: "Web Development", provider: "LusakaTech", rating: 4.7, price: "8000", responseTime: "~4 hrs", location: "Lusaka", createdAt: Date.now() },
  { id: "svc-3", name: "Brand Identity & Graphic Design", category: "Photography & Media", serviceType: "Branding", provider: "Creative ZM", rating: 4.9, price: "2500", responseTime: "~1 hr", location: "Copperbelt", createdAt: Date.now() },
  { id: "svc-4", name: "Premium Event Catering", category: "Hospitality", serviceType: "Catering", provider: "Chef Masters ZM", rating: 4.6, price: "5000", responseTime: "~3 hrs", location: "Lusaka", createdAt: Date.now() },
];

export function SellServiceSuccess() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const inquiryId = `SVC-${Date.now().toString().slice(-8)}`;
  const serviceName = state?.serviceInfo?.name || "Your Service";

  useEffect(() => {
    try {
      const stored = JSON.parse(localStorage.getItem("kleench_services") || "null");
      const existing = Array.isArray(stored) && stored.length > 0 ? stored : SEED_SERVICES;
      if (state?.serviceInfo?.name) {
        const newService = {
          id: inquiryId,
          name: state.serviceInfo.name,
          category: state.serviceCategory || "Other",
          serviceType: state.serviceType || "",
          provider: "You",
          rating: 5.0,
          price: state.packages?.[0]?.price || "0",
          responseTime: "~2 hrs",
          location: state.targeting?.province || "Lusaka",
          createdAt: Date.now(),
        };
        localStorage.setItem("kleench_services", JSON.stringify([newService, ...existing]));
      } else if (!stored?.length) {
        localStorage.setItem("kleench_services", JSON.stringify(SEED_SERVICES));
      }
    } catch {}
  }, []);

  return (
    <div className="w-full max-w-md mx-auto min-h-screen bg-transparent font-sans pb-32">
      <PageHeader title="PUBLISHED!" showBack={false} />

      <div className="px-5 pt-8 space-y-6">
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", damping: 15, stiffness: 200 }}
          className="flex flex-col items-center gap-4 py-6"
        >
          <div className="w-24 h-24 rounded-full bg-[var(--color-primary)]/12 border-[3px] border-[var(--color-primary)] flex items-center justify-center shadow-[6px_6px_0_var(--color-primary)]">
            <CheckCircle size={48} color="var(--color-primary)" strokeWidth={2} />
          </div>
          <div className="text-center">
            <h2 className="text-2xl font-black text-[var(--app-text)] uppercase tracking-tighter">Service Live!</h2>
            <p className="text-[12px] font-semibold text-[var(--color-secondary)]/60 mt-1">{serviceName} is now visible to clients</p>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
          className="bg-[var(--app-bg)] rounded-3xl border-[3px] border-[var(--app-text)] shadow-[6px_6px_0_var(--app-text)] overflow-hidden">
          <div className="bg-[var(--color-secondary)] px-5 py-3">
            <p className="text-[9px] font-black uppercase tracking-[0.3em] text-white/60">Service Details</p>
          </div>
          <div className="px-5 py-4 space-y-3">
            {[
              { label: "Inquiry ID", value: inquiryId },
              { label: "Service", value: serviceName },
              { label: "Status", value: "Active" },
              { label: "Category", value: state?.serviceCategory || "—" },
              { label: "Packages", value: `${state?.packages?.length || 0} tiers` },
            ].map(({ label, value }) => (
              <div key={label} className="flex items-center justify-between py-2 border-b border-[var(--border)] last:border-0">
                <span className="text-[10px] font-black uppercase tracking-wide text-[var(--color-secondary)]/50">{label}</span>
                <span className={`text-[12px] font-bold ${label === "Status" ? "text-[#059669]" : "text-[var(--color-secondary)]"}`}>{value}</span>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="space-y-3">
          <button onClick={() => navigate("/marketplace")}
            className="w-full py-4 rounded-2xl bg-[var(--color-secondary)] text-white font-black uppercase tracking-widest text-[12px] flex items-center justify-center gap-3 shadow-md active:scale-95 transition-all">
            <LayoutDashboard size={18} strokeWidth={2} />
            View My Inquiry
          </button>
          <button onClick={() => navigate("/")}
            className="w-full py-4 rounded-2xl border-2 border-[var(--border)] bg-[var(--app-bg)] text-[var(--color-secondary)] font-black uppercase tracking-widest text-[12px] flex items-center justify-center gap-3 active:scale-95 transition-all">
            <Home size={18} strokeWidth={2} />
            Back Home
          </button>
        </motion.div>
      </div>
    </div>
  );
}
