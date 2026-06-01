import { useNavigate, useLocation } from "react-router";
import { useEffect } from "react";
import { motion } from "motion/react";
import { CheckCircle, LayoutDashboard, Home } from "lucide-react";
import { PageHeader } from "../components/PageHeader";

const SEED_PRODUCTS = [
  { id: "seed-1", name: "Smartphone", category: "Electronics", condition: "Brand New", price: "2500", images: [], sellerId: "seed", sellerName: "KLeench Store", createdAt: Date.now() },
  { id: "seed-2", name: "Running Shoes", category: "Clothing & Fashion", condition: "Brand New", price: "275", images: [], sellerId: "seed", sellerName: "Style Hub ZM", createdAt: Date.now() },
  { id: "seed-3", name: "Hand Bag", category: "Clothing & Fashion", condition: "Like New", price: "200", images: [], sellerId: "seed", sellerName: "Fashion Forward", createdAt: Date.now() },
  { id: "seed-4", name: "Laptop", category: "Electronics", condition: "Good", price: "7500", images: [], sellerId: "seed", sellerName: "TechWorld ZM", createdAt: Date.now() },
  { id: "seed-5", name: "Mountain Bicycle", category: "Sports", condition: "Good", price: "1200", images: [], sellerId: "seed", sellerName: "Sports Direct ZM", createdAt: Date.now() },
];

export function SellProductSuccess() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const listingId = `MKT-${Date.now().toString().slice(-8)}`;
  const productName = state?.productInfo?.name || "Your Product";

  useEffect(() => {
    try {
      const stored = JSON.parse(localStorage.getItem("kleench_products") || "null");
      const existing = Array.isArray(stored) && stored.length > 0 ? stored : SEED_PRODUCTS;
      if (state?.productInfo?.name) {
        const newProduct = {
          id: listingId,
          name: state.productInfo.name,
          category: state.productInfo.category || "Other",
          condition: state.productInfo.condition || "Good",
          price: state.productInfo.price || "0",
          images: state.productInfo.images || [],
          sellerId: "user",
          sellerName: "You",
          createdAt: Date.now(),
        };
        localStorage.setItem("kleench_products", JSON.stringify([newProduct, ...existing]));
      } else if (!stored?.length) {
        localStorage.setItem("kleench_products", JSON.stringify(SEED_PRODUCTS));
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
          <div className="w-24 h-24 rounded-full bg-[#059669]/12 border-[3px] border-[#059669] flex items-center justify-center shadow-[6px_6px_0_#059669]">
            <CheckCircle size={48} color="#059669" strokeWidth={2} />
          </div>
          <div className="text-center">
            <h2 className="text-2xl font-black text-[var(--app-text)] uppercase tracking-tighter">Listing Live!</h2>
            <p className="text-[12px] font-semibold text-[var(--color-secondary)]/60 mt-1">{productName} is now visible to buyers</p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-[var(--app-bg)] rounded-3xl border-[3px] border-[var(--app-text)] shadow-[6px_6px_0_var(--app-text)] overflow-hidden"
        >
          <div className="bg-[var(--color-secondary)] px-5 py-3">
            <p className="text-[9px] font-black uppercase tracking-[0.3em] text-white/60">Listing Details</p>
          </div>
          <div className="px-5 py-4 space-y-3">
            {[
              { label: "Listing ID", value: listingId },
              { label: "Product", value: productName },
              { label: "Status", value: "Active" },
              { label: "Category", value: state?.productInfo?.category || "—" },
              { label: "Price", value: state?.productInfo?.price ? `ZMW ${state.productInfo.price}` : "—" },
            ].map(({ label, value }) => (
              <div key={label} className="flex items-center justify-between py-2 border-b border-[var(--border)] last:border-0">
                <span className="text-[10px] font-black uppercase tracking-wide text-[var(--color-secondary)]/50">{label}</span>
                <span className={`text-[12px] font-bold text-right ${label === "Status" ? "text-[#059669]" : "text-[var(--color-secondary)]"}`}>{value}</span>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="space-y-3">
          <button onClick={() => navigate("/marketplace")}
            className="w-full py-4 rounded-2xl bg-[var(--color-secondary)] text-white font-black uppercase tracking-widest text-[12px] flex items-center justify-center gap-3 shadow-md active:scale-95 transition-all">
            <LayoutDashboard size={18} strokeWidth={2} />
            Go To Dashboard
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
