import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { PageHeader } from "../components/PageHeader";
import { Search, Plus, Grid3x3, Sparkles, TrendingUp, Filter, Tag, ArrowRight } from "lucide-react";
import { motion } from "motion/react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import adBanner from "@/assets/ads/Your MarketPlace Anytime.png";

const CATEGORIES = [
  { id: "all", label: "All Items", icon: Grid3x3 },
  { id: "electronics", label: "Electronics", icon: Sparkles },
  { id: "fashion", label: "Fashion", icon: TrendingUp },
  { id: "courses", label: "Masterclass", icon: Tag },
  { id: "services", label: "Pro Services", icon: null },
];

const PRODUCTS = [
  {
    id: 1,
    title: "Pro Noise-Cancelling Headphones",
    seller: "AudioTech Store",
    sellerVerified: true,
    price: 1250,
    originalPrice: 1500,
    rating: 4.8,
    reviews: 124,
    image: "https://images.unsplash.com/photo-1612858249937-1cc0852093dd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3aXJlbGVzcyUyMGhlYWRwaG9uZXMlMjBwcm9kdWN0JTIwd2hpdGUlMjBiYWNrZ3JvdW5kfGVufDF8fHx8MTc3Mzg1NzU0NHww&ixlib=rb-4.1.0&q=80&w=400",
    badge: "Hot",
    category: "electronics",
    escrowProtected: true,
  },
  {
    id: 2,
    title: "Premium Leather Sneakers",
    seller: "Street Kicks Co.",
    sellerVerified: true,
    price: 1800,
    originalPrice: null,
    rating: 4.6,
    reviews: 87,
    image: "https://images.unsplash.com/photo-1771726588700-e3baad15ae16?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsZWF0aGVyJTIwc25lYWtlcnMlMjBzaG9lcyUyMHByb2R1Y3R8ZW58MXx8fHwxNzczOTA5NTI0fDA&ixlib=rb-4.1.0&q=80&w=400",
    badge: null,
    category: "fashion",
    escrowProtected: true,
  },
  {
    id: 3,
    title: "Minimalist Wrist Watch",
    seller: "TimePiece Lab",
    sellerVerified: true,
    price: 850,
    originalPrice: 1100,
    rating: 4.9,
    reviews: 203,
    image: "https://images.unsplash.com/photo-1758887952896-8491d393afe2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtaW5pbWFsJTIwd2F0Y2glMjB3cmlzdCUyMHByb2R1Y3R8ZW58MXx8fHwxNzczOTA5NTI1fDA&ixlib=rb-4.1.0&q=80&w=400",
    badge: "Sale",
    category: "fashion",
    escrowProtected: true,
  },
  {
    id: 4,
    title: "Glow Skincare Set",
    seller: "Pure Botanics",
    sellerVerified: false,
    price: 450,
    originalPrice: null,
    rating: 4.7,
    reviews: 56,
    image: "https://images.unsplash.com/photo-1656103743126-656ce0ed6291?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxza2luY2FyZSUyMGJlYXV0eSUyMHByb2R1Y3QlMjBmbGF0bGF5fGVufDF8fHx8MTc3MzgwMzQyM3ww&ixlib=rb-4.1.0&q=80&w=400",
    badge: "New",
    category: "fashion",
    escrowProtected: true,
  },
  {
    id: 5,
    title: "Urban Laptop Backpack",
    seller: "CarryOn Goods",
    sellerVerified: true,
    price: 650,
    originalPrice: 900,
    rating: 4.5,
    reviews: 142,
    image: "https://images.unsplash.com/photo-1585501954260-372cec60d355?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsYXB0b3AlMjBiYWNrcGFjayUyMHByb2R1Y3R8ZW58MXx8fHwxNzczOTA5NTI2fDA&ixlib=rb-4.1.0&q=80&w=400",
    badge: "Sale",
    category: "electronics",
    escrowProtected: true,
  },
  {
    id: 6,
    title: "Retro UV Sunglasses",
    seller: "LensWorld",
    sellerVerified: false,
    price: 350,
    originalPrice: null,
    rating: 4.4,
    reviews: 91,
    image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdW5nbGFzc2VzJTIwcHJvZHVjdCUyMHJldHJvfGVufDF8fHx8MTc3NDA1NTExMHww&ixlib=rb-4.1.0&q=80&w=400",
    badge: null,
    category: "fashion",
    escrowProtected: true,
  }
];

import { PageSkeletons, usePageLoading } from "../components/PageSkeletons";

export function Marketplace() {
  const loading = usePageLoading(850);
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();



  const filteredProducts = PRODUCTS.filter((product) => {
    const matchesCategory = activeCategory === "all" || product.category === activeCategory;
    const matchesSearch = product.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         product.seller.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="w-full relative min-h-[100dvh] bg-transparent overflow-x-hidden font-sans pb-32">
      
      {/* ── Standardized Theme Header ── */}
      <PageHeader 
        title="Marketplace" 
        subtitle="Verified Global Trades" 
        searchValue={searchQuery}
        onSearchChange={setSearchQuery}
      >
         <div className="relative z-10 mb-2 mt-2 flex flex-col gap-3">
            <div className="relative group">
               <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-white/50 group-focus-within:text-white transition-colors" size={18} />
               <input 
                 type="text" 
                 value={searchQuery}
                 onChange={(e) => setSearchQuery(e.target.value)}
                 placeholder="Search products, services, sellers..." 
                 className="w-full pl-14 pr-6 py-3 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 text-white placeholder:text-white/40 outline-none text-[12px] font-bold transition-all focus:bg-white/20"
               />
            </div>
            <div className="flex gap-3">
               <button onClick={() => navigate("/sell")} className="flex-1 bg-white text-[#003366] font-black h-12 rounded-xl flex items-center justify-center gap-2 shadow-lg active:scale-95 transition-all">
                  <Plus size={16} />
                  <span className="text-[10px] uppercase tracking-widest">List Product</span>
               </button>
               <button className="w-12 h-12 bg-[#003366] text-white rounded-xl flex items-center justify-center shadow-lg active:scale-95 transition-all border border-white/10">
                  <Filter size={18} />
               </button>
            </div>
         </div>
      </PageHeader>

      {loading ? (
        <PageSkeletons.Marketplace />
      ) : (
        <div className="px-5 mt-8 relative z-10 space-y-12">
        
        {/* SECTION 01. COLLECTIONS */}
        <section className="space-y-6">
          <div className="flex items-center gap-3">
             <span className="text-[#FF8C00] font-black text-xs tracking-[0.3em]">01.</span>
             <h3 className="font-black text-[10px] uppercase tracking-[0.4em] text-[#003366]/40 text-nowrap">Collections</h3>
             <div className="flex-1 h-[2px] bg-[#003366]/5" />
          </div>

          <div className="flex gap-3 overflow-x-auto pb-4 -mx-5 px-5 scrollbar-hide no-scrollbar">
            {CATEGORIES.map((cat) => (
              <motion.button
                key={cat.id}
                whileTap={{ scale: 0.95 }}
                onClick={() => setActiveCategory(cat.id)}
                className={`flex items-center gap-3 px-6 py-3.5 rounded-2xl border-2 transition-all whitespace-nowrap ${
                  activeCategory === cat.id
                    ? "bg-[#003366] text-white border-[#003366] shadow-xl"
                    : "bg-white text-[#003366] border-[#003366]/10"
                }`}
              >
                {cat.icon && <cat.icon size={14} className={activeCategory === cat.id ? "text-[#FF8C00]" : "text-[#003366]/30"} />}
                <span className="text-[10px] font-bold uppercase tracking-[0.2em]">{cat.label}</span>
              </motion.button>
            ))}
          </div>
        </section>

        {/* Commercial Banner */}
        <motion.div initial={{ opacity: 0, scale: 0.98 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}
          className="relative border-4 border-[#003366] shadow-[8px_8px_0px_#FF8C00] overflow-hidden group">
           <img src={adBanner} alt="Commercial Banner" className="w-full h-auto grayscale-[30%] transition-all duration-700" />
           <div className="absolute top-2 left-2 bg-[#FF8C00] text-white px-2 py-0.5 text-[8px] font-black uppercase tracking-widest">Sponsored</div>
        </motion.div>

        {/* SECTION 02. INVENTORY */}
        <section className="space-y-8">
           <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                 <span className="text-[#FF8C00] font-black text-xs tracking-[0.3em]">02.</span>
                 <h3 className="font-black text-[10px] uppercase tracking-[0.4em] text-[#003366]/40">Active Inventory</h3>
              </div>
              <p className="text-[10px] font-black text-[#003366]/20 uppercase tracking-widest">{filteredProducts.length} Listings</p>
           </div>

           <div className="grid grid-cols-2 gap-y-10 gap-x-5">
              {filteredProducts.map((product, idx) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: (idx % 2) * 0.1 }}
                  className="group relative"
                >
                  <Link to={`/product/${product.id}`} className="block">
                     <div className="relative aspect-square bg-white border-2 border-[#003366] overflow-hidden shadow-[4px_4px_0px_#003366] transition-all">
                        <ImageWithFallback
                          src={product.image}
                          alt={product.title}
                          className="w-full h-full object-cover transition-transform duration-700"
                        />
                        {product.badge && (
                          <div className={`absolute top-0 right-0 px-2 py-1 text-white font-black text-[8px] uppercase tracking-widest ${
                             product.badge === "Hot" ? "bg-[#FF3000]" : "bg-[#FF8C00]"
                          }`}>
                             {product.badge}
                          </div>
                        )}
                        <div className="absolute bottom-2 left-2 bg-[#003366] text-white px-1.5 py-0.5 text-[8px] font-bold rounded-sm">
                           ESCROW PROTECTED
                        </div>
                     </div>

                     <div className="pt-4 space-y-1.5">
                        <h4 className="text-[11px] font-black uppercase text-[#003366] leading-tight line-clamp-1">{product.title}</h4>
                        <div className="flex items-center justify-between">
                           <span className="text-[14px] font-black text-[#FF8C00]">K{product.price}</span>
                           <div className="w-6 h-6 rounded-full bg-[#003366]/5 flex items-center justify-center/10 transition-colors">
                              <ArrowRight size={12} className="text-[#003366]/20" />
                           </div>
                        </div>
                     </div>
                  </Link>
                </motion.div>
              ))}
           </div>
        </section>

      </div>
      )}
    </div>
  );
}