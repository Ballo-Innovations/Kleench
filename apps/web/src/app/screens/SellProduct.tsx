import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowLeft, ArrowRight, Camera, Upload, Tag } from "lucide-react";
import { useNavigate } from "react-router";
import { LottieIcon } from "../components/LottieIcon";
import adBanner from "@/assets/ads/Transaction Assurance.png";

const CATEGORIES = ["Electronics","Fashion","Food & Groceries","Digital Products","Courses","Services","Agriculture","Other"];
type Step = 1 | 2 | 3;

/* Graceful transition builder */
const grace = (delay = 0) => ({
  delay,
  duration: 0.6,
  ease: [0.22, 1, 0.36, 1] as const,
});

function CrossHatchBg() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 0 }}>
      <svg width="100%" height="100%" style={{ position: "absolute", inset: 0 }}>
        <defs>
          <pattern id="xhatch-sell" x="0" y="0" width="24" height="24" patternUnits="userSpaceOnUse">
            <line x1="0" y1="0" x2="24" y2="24" stroke="#FF8C00" strokeWidth="0.5" strokeOpacity="0.07"/>
            <line x1="24" y1="0" x2="0" y2="24" stroke="#FF8C00" strokeWidth="0.5" strokeOpacity="0.07"/>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#xhatch-sell)"/>
      </svg>
      <div className="absolute -bottom-16 -left-16 w-64 h-64 rounded-full opacity-[0.04]"
        style={{ background: "radial-gradient(circle, #00695C, transparent)" }}/>
    </div>
  );
}

import { usePageLoading } from "../components/PageSkeletons";
import { Skeleton } from "boneyard-js/react";

export function SellProduct() {
  const loading = usePageLoading(700);
  const navigate = useNavigate();
  const [step, setStep] = useState<Step>(1);
  const [productName, setProductName] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [originalPrice, setOriginalPrice] = useState("");
  const [description, setDescription] = useState("");
  const [escrow, setEscrow] = useState(true);
  const [commission, setCommission] = useState("5");

  

  return (
    <Skeleton loading={loading} name="sellproduct">
    <div className="w-full max-w-md mx-auto pb-28 relative">
      <CrossHatchBg />

      {/* Header */}
      <div className="relative z-10 pt-4 pb-8 flex items-center gap-3">
        <button onClick={() => step > 1 ? setStep((s) => (s - 1) as Step) : navigate(-1)}
          className="w-10 h-10 rounded-full bg-white shadow-sm border flex items-center justify-center"
          style={{ borderColor: "rgba(13,27,62,0.06)" }}>
          <ArrowLeft size={16} style={{ color: "#0D1B3E" }}/>
        </button>
        <div className="flex-1">
          <h1 className="font-bold tracking-tight" style={{ fontFamily: "Agrandir, sans-serif", fontSize: "1.3rem", color: "#0D1B3E" }}>
            List a Product
          </h1>
          {/* Dot stepper */}
          <div className="flex items-center gap-2 mt-1.5">
            {["Product Info","Pricing","Review"].map((s, i) => (
              <div key={i} className="flex items-center gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full"
                  style={{
                    background: step > i + 1 ? "#00695C" : step === i + 1 ? "#FF8C00" : "rgba(13,27,62,0.12)",
                    transition: "background 0.5s ease, transform 0.5s ease",
                    transform: step === i + 1 ? "scale(1.3)" : "scale(1)",
                  }}/>
                {i < 2 && <div className="w-5 h-px" style={{ background: step > i + 1 ? "#00695C" : "rgba(13,27,62,0.1)", transition: "background 0.5s ease" }}/>}
              </div>
            ))}
            <span className="text-[10px] font-semibold ml-2" style={{ color: "rgba(13,27,62,0.38)" }}>
              {["Product Info","Pricing","Review"][step - 1]}
            </span>
          </div>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {/* ── Step 1 ── */}
        {step === 1 && (
          <motion.div key="s1"
            initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="relative z-10 space-y-6">

            {/* Banner Ad */}
            <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} transition={grace(0.05)}
              className="rounded-[32px] overflow-hidden shadow-md border border-gray-100">
              <img src={adBanner} alt="Transaction Assurance" className="w-full h-auto object-cover" />
            </motion.div>

            {/* Upload */}
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={grace(0.06)}
              className="border-2 border-dashed rounded-3xl h-40 flex flex-col items-center justify-center gap-3 cursor-pointer"
              style={{ borderColor: "rgba(13,27,62,0.1)", background: "rgba(248,249,251,0.85)" }}>
              <div className="w-12 h-12 rounded-2xl flex items-center justify-center" style={{ background: "#FFF7ED" }}>
                <Camera size={22} style={{ color: "#FF8C00" }}/>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center gap-1.5 mb-1" style={{ color: "rgba(13,27,62,0.42)" }}>
                  <Upload size={12}/><span className="text-[11px] font-medium">Upload product photos</span>
                </div>
                <span className="text-[10px]" style={{ color: "rgba(13,27,62,0.25)" }}>Up to 5 photos</span>
              </div>
            </motion.div>

            {/* Name */}
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={grace(0.12)}>
              <label className="block text-[10px] font-bold uppercase tracking-widest mb-2.5" style={{ color: "rgba(13,27,62,0.45)" }}>
                Product Name *
              </label>
              <input type="text" value={productName} onChange={(e) => setProductName(e.target.value)}
                placeholder="e.g. Solar Light Panel 50W"
                className="w-full px-4 py-4 rounded-2xl text-sm font-medium outline-none"
                style={{ background: "white", border: "1.5px solid rgba(13,27,62,0.08)", color: "#0D1B3E" }}/>
            </motion.div>

            {/* Category chips */}
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={grace(0.18)}>
              <label className="block text-[10px] font-bold uppercase tracking-widest mb-3" style={{ color: "rgba(13,27,62,0.45)" }}>
                Category *
              </label>
              <div className="flex flex-wrap gap-2.5">
                {CATEGORIES.map((cat, ci) => (
                  <motion.button key={cat}
                    initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
                    transition={grace(0.2 + ci * 0.04)}
                    whileTap={{ scale: 0.93 }}
                    onClick={() => setCategory(cat)}
                    className="px-3.5 py-2 rounded-xl text-[11px] font-semibold border"
                    style={category === cat
                      ? { background: "#FF8C00", color: "white", borderColor: "#FF8C00", boxShadow: "0 4px 14px rgba(255,140,0,0.28)", transition: "all 0.5s ease" }
                      : { background: "white", color: "#0D1B3E", borderColor: "rgba(13,27,62,0.08)", transition: "all 0.5s ease" }}>
                    {cat}
                  </motion.button>
                ))}
              </div>
            </motion.div>

            {/* Description */}
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={grace(0.3)}>
              <label className="block text-[10px] font-bold uppercase tracking-widest mb-2.5" style={{ color: "rgba(13,27,62,0.45)" }}>
                Description
              </label>
              <textarea value={description} onChange={(e) => setDescription(e.target.value)}
                placeholder="Describe your product in detail..." rows={3}
                className="w-full px-4 py-3.5 rounded-2xl text-sm outline-none resize-none"
                style={{ background: "white", border: "1.5px solid rgba(13,27,62,0.08)", color: "#0D1B3E", lineHeight: 1.7 }}/>
            </motion.div>

            <motion.button initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={grace(0.36)}
              whileTap={{ scale: 0.975 }} whileHover={{ y: -2 }}
              disabled={!productName || !category} onClick={() => setStep(2)}
              className="w-full py-4 rounded-2xl text-white font-bold flex items-center justify-center gap-2 disabled:opacity-40"
              style={{ background: "linear-gradient(135deg, #FF8C00, #e06900)", fontFamily: "Agrandir, sans-serif", fontSize: "15px", boxShadow: "0 8px 32px rgba(255,140,0,0.26)" }}>
              Next Step <ArrowRight size={18} strokeWidth={2.5}/>
            </motion.button>
          </motion.div>
        )}

        {/* ── Step 2 ── */}
        {step === 2 && (
          <motion.div key="s2"
            initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="relative z-10 space-y-6">
            {[
              { label: "Selling Price (K) *",              value: price,         set: setPrice,         placeholder: "0.00" },
              { label: "Original / Compare Price (K)",     value: originalPrice, set: setOriginalPrice, placeholder: "0.00" },
            ].map(({ label, value, set, placeholder }, fi) => (
              <motion.div key={label} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: fi % 2 === 1 ? 8 : 0 }} transition={grace(fi * 0.1)}>
                <label className="block text-[10px] font-bold uppercase tracking-widest mb-2.5" style={{ color: "rgba(13,27,62,0.45)" }}>
                  {label}
                </label>
                <div className="relative">
                  <Tag size={15} className="absolute left-4 top-1/2 -translate-y-1/2" style={{ color: "rgba(13,27,62,0.3)" }}/>
                  <input type="number" value={value} onChange={(e) => set(e.target.value)} placeholder={placeholder}
                    className="w-full pl-10 pr-4 py-4 rounded-2xl text-sm font-bold outline-none"
                    style={{ background: "white", border: "1.5px solid rgba(13,27,62,0.08)", color: "#0D1B3E" }}/>
                </div>
              </motion.div>
            ))}

            {/* Commission chips */}
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={grace(0.18)}>
              <label className="block text-[10px] font-bold uppercase tracking-widest mb-3" style={{ color: "rgba(13,27,62,0.45)" }}>
                Affiliate Commission
              </label>
              <div className="grid grid-cols-4 gap-3">
                {["3","5","8","10"].map((c, ci) => (
                  <motion.button key={c}
                    initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: ci % 2 === 1 ? 8 : 0 }}
                    transition={grace(0.22 + ci * 0.05)}
                    whileTap={{ scale: 0.94 }}
                    onClick={() => setCommission(c)}
                    className="py-3 rounded-2xl text-[12px] font-bold border"
                    style={commission === c
                      ? { background: "#FF8C00", color: "white", borderColor: "#FF8C00", boxShadow: "0 4px 14px rgba(255,140,0,0.28)", transition: "all 0.5s ease" }
                      : { background: "white", color: "#0D1B3E", borderColor: "rgba(13,27,62,0.09)", transition: "all 0.5s ease" }}>
                    {c}%
                  </motion.button>
                ))}
              </div>
            </motion.div>

            {/* Escrow toggle */}
            <motion.button initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={grace(0.28)}
              whileTap={{ scale: 0.985 }}
              onClick={() => setEscrow(!escrow)}
              className="w-full flex items-center gap-4 p-5 rounded-3xl border-2 text-left"
              style={{
                borderColor: escrow ? "#00695C" : "rgba(13,27,62,0.08)",
                background: escrow ? "#F0FDF9" : "white",
                boxShadow: escrow ? "0 6px 24px rgba(0,105,92,0.12)" : "0 2px 12px rgba(13,27,62,0.04)",
                transition: "all 0.55s ease",
              }}>
              <div className="w-13 h-13 rounded-2xl flex items-center justify-center overflow-hidden flex-shrink-0"
                style={{ background: escrow ? "#D1FAE5" : "#F8F9FB", width: 52, height: 52 }}>
                <LottieIcon icon="shield" size={44} />
              </div>
              <div className="flex-1">
                <p className="font-bold text-[13px]" style={{ color: "#0D1B3E" }}>Escrow Protection</p>
                <p className="text-[10px] mt-0.5" style={{ color: "rgba(13,27,62,0.42)" }}>Funds held until delivery confirmed</p>
              </div>
              <div className="w-12 h-6 rounded-full flex items-center px-0.5 flex-shrink-0"
                style={{ background: escrow ? "#00695C" : "rgba(13,27,62,0.12)", transition: "background 0.5s ease" }}>
                <motion.div animate={{ x: escrow ? 22 : 0 }} transition={{ type: "spring", stiffness: 400, damping: 28 }}
                  className="w-5 h-5 rounded-full bg-white shadow-sm"/>
              </div>
            </motion.button>

            <motion.button initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={grace(0.34)}
              whileTap={{ scale: 0.975 }} whileHover={{ y: -2 }}
              disabled={!price} onClick={() => setStep(3)}
              className="w-full py-4 rounded-2xl text-white font-bold flex items-center justify-center gap-2 disabled:opacity-40"
              style={{ background: "linear-gradient(135deg, #FF8C00, #e06900)", fontFamily: "Agrandir, sans-serif", fontSize: "15px", boxShadow: "0 8px 32px rgba(255,140,0,0.26)" }}>
              Review Listing <ArrowRight size={18} strokeWidth={2.5}/>
            </motion.button>
          </motion.div>
        )}

        {/* ── Step 3: Review ── */}
        {step === 3 && (
          <motion.div key="s3"
            initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="relative z-10 space-y-5">

            {/* Teal header card */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={grace()}
              className="rounded-3xl p-5 flex items-center gap-4"
              style={{ background: "#00695C", boxShadow: "0 16px 40px rgba(0,105,92,0.22)" }}>
              <div className="rounded-2xl flex items-center justify-center overflow-hidden flex-shrink-0"
                style={{ background: "rgba(255,255,255,0.15)", width: 56, height: 56 }}>
                <LottieIcon icon="cart" size={48} />
              </div>
              <div>
                <p className="text-[9px] font-bold uppercase tracking-widest" style={{ color: "rgba(255,255,255,0.45)" }}>Listing Preview</p>
                <p className="font-black text-white text-[16px] leading-tight mt-0.5" style={{ fontFamily: "Agrandir, sans-serif" }}>{productName}</p>
                <p className="text-[11px] mt-0.5" style={{ color: "rgba(255,255,255,0.55)" }}>{category}</p>
              </div>
            </motion.div>

            {/* Summary rows */}
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={grace(0.1)}
              className="bg-white rounded-3xl p-5 border space-y-4" style={{ borderColor: "rgba(13,27,62,0.06)" }}>
              {[
                { label: "Selling Price",  value: `K${Number(price).toFixed(2)}`,            highlight: true  },
                { label: "Original Price", value: originalPrice ? `K${Number(originalPrice).toFixed(2)}` : "—", highlight: false },
                { label: "Commission",     value: `${commission}%`,                           highlight: false },
                { label: "Escrow",         value: escrow ? "Enabled" : "Disabled",            highlight: escrow },
              ].map(({ label, value, highlight }) => (
                <div key={label} className="flex justify-between items-center pb-4 border-b last:pb-0 last:border-0"
                  style={{ borderColor: "rgba(13,27,62,0.05)" }}>
                  <span className="text-[11px] font-medium" style={{ color: "rgba(13,27,62,0.48)" }}>{label}</span>
                  <span className="text-[13px] font-bold" style={{ color: highlight ? "#FF8C00" : "#0D1B3E" }}>{value}</span>
                </div>
              ))}
            </motion.div>

            <motion.button initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={grace(0.2)}
              whileTap={{ scale: 0.975 }} whileHover={{ y: -2 }}
              onClick={() => navigate("/marketplace")}
              className="w-full py-4 rounded-2xl text-white font-bold flex items-center justify-center gap-3"
              style={{ background: "linear-gradient(135deg, #FF8C00, #00695C)", fontFamily: "Agrandir, sans-serif", fontSize: "15px", boxShadow: "0 10px 32px rgba(255,140,0,0.24)" }}>
              <LottieIcon icon="rocket" size={28} /> Publish Listing
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
      </Skeleton>
  );
}
