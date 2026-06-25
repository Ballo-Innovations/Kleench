import { useState } from "react";
import { useNavigate, useParams, Navigate } from "react-router";
import { motion } from "motion/react";
import { Star, MapPin, Phone, MessageCircle, Navigation, Share2, Eye, ThumbsUp, ShoppingBasket, Clock } from "lucide-react";
import { PageHeader } from "../../components/PageHeader";
import { ImageWithFallback } from "../../components/figma/ImageWithFallback";
import { toast } from "sonner";
import { getStore, productsByStore, addToCart } from "../../data/windowShop";

const TABS = ["Overview", "Products", "Reviews", "Photos"] as const;

export function WindowStore() {
  const navigate = useNavigate();
  const { id } = useParams();
  const store = getStore(id);
  const [tab, setTab] = useState<typeof TABS[number]>("Overview");
  const [subTab, setSubTab] = useState("All");

  if (!store) return <Navigate to="/marketplace/window/stores" replace />;
  const products = productsByStore(store.id);
  const shown = subTab === "All" ? products : products.filter((p) => p.storeTab === subTab);

  const buy = (pid: string) => { addToCart(pid); navigate("/marketplace/window/cart"); };
  const basket = (pid: string) => { addToCart(pid); toast.success("Added to basket"); };

  return (
    <div className="w-full max-w-md mx-auto bg-transparent font-sans pb-24">
      <PageHeader title={store.category.toUpperCase()} subtitle="Window Shopping" showBack />

      {/* Cover + identity */}
      <div className="relative h-40 bg-[var(--muted)] overflow-hidden">
        <ImageWithFallback src={store.image} alt={store.name} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
      </div>

      <div className="px-5 -mt-10 relative space-y-4">
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
          className="bg-[var(--app-bg)] border border-[var(--border)] rounded-3xl shadow-md p-4">
          <div className="flex items-start gap-3">
            <div className="w-16 h-16 rounded-2xl overflow-hidden border-2 border-[var(--app-bg)] shadow-md bg-[var(--muted)] shrink-0 -mt-10">
              <ImageWithFallback src={store.image} alt={store.name} className="w-full h-full object-cover" />
            </div>
            <div className="flex-1 min-w-0 pt-0.5">
              <p className="text-[14px] font-black text-[var(--app-text)] uppercase tracking-tight leading-tight">{store.name}</p>
              <p className="text-[10px] font-black text-[var(--color-primary)] uppercase tracking-widest">{store.category}</p>
              <div className="flex items-center gap-1 mt-1 text-[var(--color-secondary)]/50">
                <MapPin size={10} strokeWidth={2.5} />
                <span className="text-[10px] font-semibold">{store.location}</span>
              </div>
            </div>
          </div>

          {/* Stat row */}
          <div className="grid grid-cols-3 gap-2 mt-4">
            {[
              { Icon: Star, value: store.rating, label: `${store.reviews} Reviews`, fill: "#F59E0B" },
              { Icon: Eye, value: store.views, label: "Views" },
              { Icon: ThumbsUp, value: store.likes, label: "Likes" },
            ].map(({ Icon, value, label, fill }) => (
              <div key={label} className="bg-[var(--color-secondary)]/5 rounded-2xl py-2.5 flex flex-col items-center gap-0.5">
                <div className="flex items-center gap-1">
                  <Icon size={12} color={fill || "var(--color-secondary)"} fill={fill || "none"} strokeWidth={2.5} />
                  <span className="text-[12px] font-black text-[var(--app-text)]">{value}</span>
                </div>
                <span className="text-[8px] font-black uppercase tracking-widest text-[var(--color-secondary)]/40">{label}</span>
              </div>
            ))}
          </div>

          {/* Open status */}
          <div className="flex items-center gap-2 mt-3">
            <span className={`flex items-center gap-1 text-[9px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full ${store.open ? "bg-[#059669]/10 text-[#059669]" : "bg-[#DC2626]/10 text-[#DC2626]"}`}>
              <span className={`w-1.5 h-1.5 rounded-full ${store.open ? "bg-[#059669]" : "bg-[#DC2626]"}`} />
              {store.open ? "Open Now" : "Closed"}
            </span>
            <span className="flex items-center gap-1 text-[9px] font-black uppercase tracking-widest text-[var(--color-secondary)]/50">
              <Clock size={10} strokeWidth={2.5} /> Closes {store.closeTime}
            </span>
          </div>

          {/* Actions */}
          <div className="grid grid-cols-4 gap-2 mt-4">
            {[
              { Icon: Phone, label: "Call", action: () => toast.info("Calling store...") },
              { Icon: MessageCircle, label: "Message", action: () => toast.info("Opening chat...") },
              { Icon: Navigation, label: "Directions", action: () => toast.info("Opening maps...") },
              { Icon: Share2, label: "Share", action: () => toast.success("Link copied!") },
            ].map(({ Icon, label, action }) => (
              <button key={label} onClick={action}
                className="flex flex-col items-center gap-1 py-2 rounded-xl border border-[var(--border)] active:scale-95 transition-all">
                <Icon size={15} className="text-[var(--color-secondary)]" strokeWidth={2} />
                <span className="text-[8px] font-black uppercase tracking-wide text-[var(--color-secondary)]/60">{label}</span>
              </button>
            ))}
          </div>
        </motion.div>

        {/* Tabs */}
        <div className="flex border border-[var(--border)] rounded-full overflow-hidden shadow-sm">
          {TABS.map((t, i) => (
            <button key={t} onClick={() => setTab(t)}
              className={`flex-1 py-2.5 text-[9px] font-black uppercase tracking-widest transition-all ${tab === t ? "bg-[var(--color-secondary)] text-white" : "bg-[var(--app-bg)] text-[var(--color-secondary)]/50"} ${i > 0 ? "border-l border-[var(--border)]" : ""}`}>
              {t}
            </button>
          ))}
        </div>

        {tab === "Overview" && (
          <div className="space-y-4">
            <div className="bg-[var(--app-bg)] border border-[var(--border)] rounded-2xl shadow-sm p-4 space-y-2">
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[var(--color-secondary)]/50">About Us</p>
              <p className="text-[12px] font-semibold text-[var(--color-secondary)]/70 leading-relaxed">{store.about}</p>
            </div>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[var(--color-secondary)]/50">Products</p>
                <button onClick={() => setTab("Products")} className="text-[10px] font-black uppercase tracking-widest text-[var(--color-primary)]">View All</button>
              </div>
              <div className="grid grid-cols-3 gap-2">
                {products.slice(0, 6).map((p) => (
                  <button key={p.id} onClick={() => navigate(`/marketplace/window/product/${p.id}`)}
                    className="rounded-xl overflow-hidden border border-[var(--border)] bg-[var(--muted)] aspect-square active:scale-95 transition-all">
                    <ImageWithFallback src={p.image} alt={p.name} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {tab === "Products" && (
          <div className="space-y-3">
            <div className="flex gap-2 overflow-x-auto no-scrollbar -mx-1 px-1">
              {store.productTabs.map((st) => (
                <button key={st} onClick={() => setSubTab(st)}
                  className={`shrink-0 px-3.5 py-1.5 rounded-full text-[10px] font-black uppercase tracking-wide border transition-all ${subTab === st ? "bg-[var(--color-primary)] text-white border-[var(--color-primary)]" : "border-[var(--border)] text-[var(--color-secondary)]/60"}`}>
                  {st}
                </button>
              ))}
            </div>
            {shown.length === 0 ? (
              <p className="py-12 text-center text-[12px] font-bold text-[var(--color-secondary)]/40">No items in this category</p>
            ) : (
              <div className="grid grid-cols-2 gap-3">
                {shown.map((p) => (
                  <div key={p.id} className="bg-[var(--app-bg)] border border-[var(--border)] rounded-2xl shadow-sm overflow-hidden flex flex-col">
                    <button onClick={() => navigate(`/marketplace/window/product/${p.id}`)} className="aspect-square bg-[var(--muted)] border-b border-[var(--border)]">
                      <ImageWithFallback src={p.image} alt={p.name} className="w-full h-full object-cover" />
                    </button>
                    <div className="p-2.5 flex flex-col gap-1 flex-1">
                      <p className="text-[10px] font-black text-[var(--app-text)] uppercase leading-tight line-clamp-1">{p.name}</p>
                      <div className="flex items-center gap-0.5">
                        <Star size={9} fill="#F59E0B" color="#F59E0B" />
                        <span className="text-[9px] font-black text-[var(--app-text)]">{p.rating}</span>
                        <span className="text-[8px] font-semibold text-[var(--color-secondary)]/40">({p.reviews})</span>
                      </div>
                      <span className="text-[13px] font-black text-[var(--color-primary)]">K{p.price.toLocaleString()}</span>
                      <div className="flex gap-1.5 mt-1">
                        <button onClick={() => buy(p.id)} className="flex-1 py-1.5 rounded-lg bg-[var(--color-primary)] text-white text-[9px] font-black uppercase tracking-wide active:scale-95 transition-all">Buy</button>
                        <button onClick={() => basket(p.id)} className="w-8 rounded-lg border border-[var(--border)] flex items-center justify-center active:scale-95 transition-all">
                          <ShoppingBasket size={13} className="text-[var(--color-secondary)]" strokeWidth={2} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {tab === "Reviews" && (
          <div className="space-y-3">
            {[
              { name: "M. Banda", rating: 5, comment: "Great prices and genuine products. Highly recommend!" },
              { name: "T. Phiri", rating: 4, comment: "Good service, delivery was a little slow but worth it." },
              { name: "C. Mwale", rating: 5, comment: "Friendly staff and quality items. Will shop again." },
            ].map((r, i) => (
              <div key={i} className="bg-[var(--app-bg)] border border-[var(--border)] rounded-2xl shadow-sm p-4">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-7 h-7 rounded-full bg-[var(--color-secondary)] flex items-center justify-center text-white text-[10px] font-black">{r.name[0]}</div>
                  <p className="text-[11px] font-black text-[var(--app-text)]">{r.name}</p>
                  <div className="flex gap-0.5 ml-auto">
                    {Array.from({ length: 5 }).map((_, j) => (
                      <Star key={j} size={9} fill={j < r.rating ? "#F59E0B" : "none"} color={j < r.rating ? "#F59E0B" : "var(--border)"} />
                    ))}
                  </div>
                </div>
                <p className="text-[11px] font-semibold text-[var(--color-secondary)]/70">{r.comment}</p>
              </div>
            ))}
          </div>
        )}

        {tab === "Photos" && (
          <div className="grid grid-cols-3 gap-2">
            {products.concat(products).slice(0, 9).map((p, i) => (
              <div key={i} className="rounded-xl overflow-hidden border border-[var(--border)] bg-[var(--muted)] aspect-square">
                <ImageWithFallback src={p.image} alt="" className="w-full h-full object-cover" />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
