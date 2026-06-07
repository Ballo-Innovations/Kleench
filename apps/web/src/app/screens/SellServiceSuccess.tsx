import { useNavigate, useLocation } from "react-router";
import { useEffect } from "react";
import { motion } from "motion/react";
import { CheckCircle, Eye, Share2, Home, Briefcase } from "lucide-react";
import { PageHeader } from "../components/PageHeader";
import { toast } from "sonner";

const SEED_SERVICES = [
  { id: "svc-1", name: "Professional Wedding Photography", category: "Photography & Media", serviceType: "Photography", provider: "Chisenga Studios", rating: 4.8, price: "3500", responseTime: "~2 hrs", location: "Lusaka", createdAt: Date.now() },
  { id: "svc-2", name: "Full-Stack Web Development", category: "Technology", serviceType: "Web Development", provider: "LusakaTech", rating: 4.7, price: "8000", responseTime: "~4 hrs", location: "Lusaka", createdAt: Date.now() },
  { id: "svc-3", name: "Brand Identity & Graphic Design", category: "Photography & Media", serviceType: "Branding", provider: "Creative ZM", rating: 4.9, price: "2500", responseTime: "~1 hr", location: "Copperbelt", createdAt: Date.now() },
  { id: "svc-4", name: "Premium Event Catering", category: "Hospitality", serviceType: "Catering", provider: "Chef Masters ZM", rating: 4.6, price: "5000", responseTime: "~3 hrs", location: "Lusaka", createdAt: Date.now() },
];

export function SellServiceSuccess() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const serviceId = `SVC-${Date.now().toString().slice(-8)}`;
  const serviceName = state?.serviceInfo?.name || "Your Service";

  const categoryLabels: Record<string, string> = {
    marketing: "Marketing", events: "Events", technology: "Technology",
    education: "Education", construction: "Construction", hospitality: "Hospitality",
    finance: "Finance", health: "Health",
  };

  useEffect(() => {
    try {
      const stored = JSON.parse(localStorage.getItem("kleench_services") || "null");
      const existing = Array.isArray(stored) && stored.length > 0 ? stored : SEED_SERVICES;
      if (state?.serviceInfo?.name) {
        const newService = {
          id: serviceId,
          name: state.serviceInfo.name,
          category: categoryLabels[state.serviceCategory] || state.serviceCategory || "Other",
          serviceType: state.serviceInfo.deliverables || "",
          provider: "You",
          rating: 5.0,
          price: state.packages?.[0]?.price || "0",
          responseTime: "~2 hrs",
          location: "Lusaka",
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

      <div className="px-5 pt-8 space-y-5">
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", damping: 15, stiffness: 200 }}
          className="flex flex-col items-center gap-4 py-6"
        >
          <div className="w-24 h-24 rounded-full bg-[var(--color-primary)]/12 flex items-center justify-center shadow-lg">
            <CheckCircle size={48} color="var(--color-primary)" strokeWidth={1.5} />
          </div>
          <div className="text-center space-y-1">
            <h2 className="text-2xl font-black text-[var(--app-text)] uppercase tracking-tighter">Service Published!</h2>
            <p className="text-[12px] font-semibold text-[var(--color-secondary)]/60">{serviceName} is now visible to clients</p>
          </div>
        </motion.div>

        {/* Where it appears */}
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
          className="bg-[var(--color-secondary)] rounded-2xl shadow-md p-5 space-y-3">
          <p className="text-[9px] font-black uppercase tracking-[0.3em] text-white/50">Your service now appears in</p>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/15 flex items-center justify-center">
              <Briefcase size={20} color="white" strokeWidth={2} />
            </div>
            <p className="text-[18px] font-black text-white uppercase tracking-widest">SERVICES</p>
          </div>
        </motion.div>

        {/* Service details */}
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
          className="bg-[var(--app-bg)] rounded-2xl border border-[var(--border)] shadow-sm overflow-hidden">
          <div className="bg-[var(--color-secondary)]/8 px-5 py-3 border-b border-[var(--border)]">
            <p className="text-[9px] font-black uppercase tracking-[0.3em] text-[var(--color-secondary)]/50">Service Details</p>
          </div>
          <div className="px-5 py-4 space-y-2">
            {[
              { label: "Service ID", value: serviceId },
              { label: "Service", value: serviceName },
              { label: "Status", value: "Active", highlight: true },
              { label: "Category", value: categoryLabels[state?.serviceCategory] || state?.serviceCategory || "—" },
              { label: "Packages", value: `${state?.packages?.length || 0} tier${state?.packages?.length !== 1 ? "s" : ""}` },
            ].map(({ label, value, highlight }) => (
              <div key={label} className="flex items-center justify-between py-2 border-b border-[var(--border)] last:border-0">
                <span className="text-[10px] font-black uppercase tracking-wide text-[var(--color-secondary)]/50">{label}</span>
                <span className={`text-[12px] font-bold ${highlight ? "text-[#059669]" : "text-[var(--color-secondary)]"}`}>{value}</span>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="space-y-3">
          <button onClick={() => navigate("/marketplace/services")}
            className="w-full py-4 rounded-2xl bg-[var(--color-secondary)] text-white font-black uppercase tracking-widest text-[12px] flex items-center justify-center gap-3 shadow-md active:scale-95 transition-all">
            <Eye size={18} strokeWidth={2} /> View Service
          </button>
          <button onClick={() => toast.success("Share link copied!")}
            className="w-full py-4 rounded-2xl border border-[var(--border)] bg-[var(--app-bg)] text-[var(--color-secondary)] font-black uppercase tracking-widest text-[12px] flex items-center justify-center gap-3 active:scale-95 transition-all">
            <Share2 size={18} strokeWidth={2} /> Share Service
          </button>
          <button onClick={() => navigate("/marketplace")}
            className="w-full py-4 rounded-2xl border border-[var(--border)] bg-[var(--app-bg)] text-[var(--color-secondary)] font-black uppercase tracking-widest text-[12px] flex items-center justify-center gap-3 active:scale-95 transition-all">
            <Home size={18} strokeWidth={2} /> Return To Marketplace
          </button>
        </motion.div>
      </div>
    </div>
  );
}
