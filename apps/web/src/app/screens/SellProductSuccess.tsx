import { useNavigate, useLocation } from "react-router";
import { useEffect } from "react";
import { motion } from "motion/react";
import { CheckCircle, List } from "lucide-react";
import { CtaButton } from "../components/CtaButton";
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
  const year = new Date().getFullYear();
  const listingId = `LST-${year}-${Date.now().toString().slice(-8)}`;
  const productName = state?.productInfo?.name || "Your Product";

  useEffect(() => {
    try {
      const stored = JSON.parse(localStorage.getItem("kleench_products") || "null");
      const existing = Array.isArray(stored) && stored.length > 0 ? stored : SEED_PRODUCTS;
      if (state?.productInfo?.name) {
        const newProduct = {
          id: listingId,
          name: state.productInfo.name,
          category: state.productInfo.category || state.category || "Other",
          condition: state.productInfo.condition || "Good",
          price: state.productInfo.price || "0",
          images: state.productInfo.images || [],
          listingType: state.listingType || "standard",
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
    <div className="w-full max-w-md mx-auto bg-transparent font-sans pb-24">
      <PageHeader title="PUBLISHED!" showBack={false} />

      <div className="px-5 pt-8 space-y-5">
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", damping: 15, stiffness: 200 }}
          className="flex flex-col items-center gap-4 py-6"
        >
          <div className="w-24 h-24 rounded-full bg-[var(--color-secondary)] flex items-center justify-center shadow-lg">
            <CheckCircle size={48} color="white" strokeWidth={1.5} />
          </div>
          <div className="text-center space-y-1.5">
            <h2 className="text-2xl font-black text-[var(--app-text)] uppercase tracking-tighter">Submit For Selling</h2>
            <p className="text-[12px] font-semibold text-[var(--color-secondary)]/60 max-w-[260px] mx-auto leading-relaxed">
              {productName} is now visible to thousands of buyers on KLeench Marketplace
            </p>
          </div>
        </motion.div>

        {/* Listing details */}
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
          className="bg-[var(--app-bg)] rounded-2xl border border-[var(--border)] shadow-sm overflow-hidden">
          <div className="bg-[var(--color-secondary)]/8 px-5 py-3 border-b border-[var(--border)]">
            <p className="text-[9px] font-black uppercase tracking-[0.3em] text-[var(--color-secondary)]/50">Listing Details</p>
          </div>
          <div className="px-5 py-4 space-y-2">
            {[
              { label: "Listing ID", value: listingId },
              { label: "Product", value: productName },
              { label: "Status", value: "Active", highlight: true },
              { label: "Category", value: state?.productInfo?.category || state?.category || "—" },
              { label: "Price", value: state?.productInfo?.price ? `ZMW ${state.productInfo.price}` : "—" },
              { label: "Listing Type", value: (state?.listingType || "standard").toUpperCase() },
            ].map(({ label, value, highlight }) => (
              <div key={label} className="flex items-center justify-between py-2 border-b border-[var(--border)] last:border-0">
                <span className="text-[10px] font-black uppercase tracking-wide text-[var(--color-secondary)]/50">{label}</span>
                <span className={`text-[12px] font-bold ${highlight ? "text-[#059669]" : "text-[var(--color-secondary)]"}`}>{value}</span>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
          <CtaButton onClick={() => navigate("/marketplace")}><List size={18} strokeWidth={2} /> Go to Dashboard</CtaButton>
        </motion.div>
      </div>
    </div>
  );
}
