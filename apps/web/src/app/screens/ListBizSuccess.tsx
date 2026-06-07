import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router";
import { motion } from "motion/react";
import { CheckCircle, Building2, Share2, Home } from "lucide-react";
import { PageHeader } from "../components/PageHeader";

const SEED_BUSINESSES = [
  { id: "biz1", name: "Zambia Tech Solutions", category: "Technology", type: "SME", listing: "ordinary", province: "Lusaka", tagline: "Digital transformation for Zambian enterprises", visibility: "public" },
  { id: "biz2", name: "African Grain Traders Ltd", category: "Agriculture", type: "Local Company", listing: "priority", province: "Eastern", tagline: "Connecting farmers to markets across Southern Africa", visibility: "public" },
  { id: "biz3", name: "Copperbelt Automotive Hub", category: "Automotive", type: "SME", listing: "ordinary", province: "Copperbelt", tagline: "Your one-stop vehicle service centre", visibility: "public" },
];

export function ListBizSuccess() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const bizName = state?.bizName || state?.name || "Your Business";
  const listingId = `BIZ-${Date.now().toString().slice(-6)}`;

  useEffect(() => {
    try {
      const stored = JSON.parse(localStorage.getItem("kleench_businesses") || "null");
      const existing: unknown[] = Array.isArray(stored) ? stored : SEED_BUSINESSES;
      const newBiz = {
        id: `biz-${Date.now()}`,
        name: bizName,
        category: state?.category || "General",
        type: state?.bizType || "SME",
        listing: "ordinary",
        province: state?.province || "Lusaka",
        tagline: state?.tagline || "",
        desc: state?.desc || "",
        showcase: state?.showcase || [],
        visibility: state?.visibility || "public",
        listingId,
      };
      localStorage.setItem("kleench_businesses", JSON.stringify([...existing, newBiz]));
    } catch { /* noop */ }
  }, []);

  return (
    <div className="w-full max-w-md mx-auto min-h-screen bg-transparent font-sans pb-32">
      <PageHeader title="LISTING SUBMITTED" />

      <div className="px-5 pt-8 space-y-5">
        <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ type: "spring", stiffness: 200 }}
          className="flex flex-col items-center gap-3 py-6">
          <div className="w-20 h-20 rounded-full bg-[#059669]/15 flex items-center justify-center">
            <CheckCircle size={40} color="#059669" strokeWidth={1.5} />
          </div>
          <p className="text-[10px] font-black uppercase tracking-[0.3em] text-[#059669]">Business Listed!</p>
          <p className="text-[22px] font-black text-[var(--app-text)] uppercase tracking-tight text-center leading-tight">{bizName}</p>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
          className="bg-[var(--app-bg)] border border-[var(--border)] rounded-2xl shadow-sm overflow-hidden">
          <div className="bg-[var(--color-secondary)] px-5 py-4">
            <p className="text-[9px] font-black uppercase tracking-[0.3em] text-white/50">Listing Reference</p>
            <p className="text-[18px] font-black text-white tracking-wider">{listingId}</p>
          </div>
          <div className="px-5 py-4 space-y-0">
            {[
              { label: "Business Name", value: bizName },
              { label: "Category", value: state?.category || "—" },
              { label: "Province", value: state?.province || state?.area || "—" },
              { label: "Status", value: "Under Review" },
            ].map(({ label, value }) => (
              <div key={label} className="flex items-center justify-between py-2.5 border-b border-[var(--border)] last:border-0">
                <span className="text-[10px] font-black uppercase tracking-wide text-[var(--color-secondary)]/50">{label}</span>
                <span className={`text-[12px] font-bold ${label === "Status" ? "text-[var(--color-primary)]" : "text-[var(--color-secondary)]"}`}>{value}</span>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
          className="flex items-start gap-3 bg-[#059669]/8 border border-[#059669]/20 rounded-2xl px-4 py-3">
          <Building2 size={16} className="text-[#059669] shrink-0 mt-0.5" strokeWidth={2} />
          <p className="text-[11px] font-semibold text-[var(--color-secondary)]/70 leading-snug">
            Your listing is under review and will appear under <span className="font-black text-[var(--app-text)]">Business Listings</span> once approved. You'll be notified within 24 hours.
          </p>
        </motion.div>
      </div>

      <div className="px-5 pt-4 pb-8 space-y-3">
        <button onClick={() => navigate("/marketplace")}
          className="w-full py-4 rounded-2xl bg-[var(--color-secondary)] text-white font-black uppercase tracking-widest text-[12px] flex items-center justify-center gap-3 shadow-md active:scale-95 transition-all">
          <Share2 size={18} strokeWidth={2} /> Share Listing
        </button>
        <button onClick={() => navigate("/")}
          className="w-full py-4 rounded-2xl border border-[var(--border)] bg-[var(--app-bg)] text-[var(--color-secondary)] font-black uppercase tracking-widest text-[12px] flex items-center justify-center gap-3 active:scale-95 transition-all">
          <Home size={18} strokeWidth={2} /> Back Home
        </button>
      </div>
    </div>
  );
}
