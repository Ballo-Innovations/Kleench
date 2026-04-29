import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowLeft, ArrowRight, Upload, DollarSign, Camera, CheckCircle } from "lucide-react";
import { useNavigate } from "react-router";
import { LottieIcon } from "../components/LottieIcon";

type Step = 1 | 2 | 3;

const AD_TYPES = [
  { id: "product",   label: "Product Ad",      icon: "cart",      desc: "Sell a physical or digital product",   accent: "var(--app-orange)", bg: "var(--tint-orange)" },
  { id: "service",   label: "Service Ad",      icon: "target",    desc: "Promote a service you offer",          accent: "#0077B6", bg: "#EFF8FF" },
  { id: "awareness", label: "Brand Awareness", icon: "megaphone", desc: "Boost your brand visibility",          accent: "#7C3AED", bg: "var(--tint-purple)" },
  { id: "community", label: "Community Post",  icon: "users",     desc: "Reach your social circle",             accent: "#00695C", bg: "var(--tint-teal)" },
];

/* ── Unified cross-hatch bg (same as Referral, SellProduct) ── */
function CrossHatchBg() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 0 }}>
      <svg width="100%" height="100%" style={{ position: "absolute", inset: 0 }}>
        <defs>
          <pattern id="xhatch-post" x="0" y="0" width="24" height="24" patternUnits="userSpaceOnUse">
            <line x1="0" y1="0" x2="24" y2="24" stroke="var(--app-orange)" strokeWidth="0.5" strokeOpacity="0.07"/>
            <line x1="24" y1="0" x2="0" y2="24" stroke="var(--app-orange)" strokeWidth="0.5" strokeOpacity="0.07"/>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#xhatch-post)"/>
      </svg>
    </div>
  );
}

/* ── Graceful ease-out builder ── */
const grace = (delay = 0) => ({
  delay,
  duration: 0.6,
  ease: [0.22, 1, 0.36, 1] as const,
});

export function PostAdvert() {
  const navigate = useNavigate();
  const [step, setStep] = useState<Step>(1);
  const [adType, setAdType] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [budget, setBudget] = useState("");
  const [duration, setDuration] = useState("7");

  const selectedType = AD_TYPES.find((t) => t.id === adType);
  const steps = ["Choose Type", "Ad Details", "Budget & Launch"];

  return (
    <div className="w-full max-w-md mx-auto pb-28 relative">
      <CrossHatchBg />
      <div className="absolute top-0 left-0 right-0 h-64 opacity-[0.03]"
        style={{ background: "linear-gradient(135deg, var(--app-orange), var(--app-text-alt))" }}/>

      {/* Header */}
      <div className="relative z-10 pt-4 pb-8 flex items-center gap-3">
        <button onClick={() => step > 1 ? setStep((s) => (s - 1) as Step) : navigate(-1)}
          className="w-10 h-10 rounded-full bg-[var(--app-bg)] shadow-sm border flex items-center justify-center"
          style={{ borderColor: "rgba(13,27,62,0.06)" }}>
          <ArrowLeft size={16} style={{ color: "var(--app-text-alt)" }}/>
        </button>
        <div className="flex-1">
          <h1 className="font-bold tracking-tight" style={{ fontFamily: "Agrandir, sans-serif", fontSize: "1.3rem", color: "var(--app-text-alt)" }}>
            Post an Advert
          </h1>
          <div className="flex items-center gap-2 mt-1">
            {[1, 2, 3].map((s) => (
              <div key={s} className="h-1.5 rounded-full"
                style={{
                  width: step >= s ? 32 : 16,
                  background: step >= s ? "var(--app-orange)" : "rgba(13,27,62,0.1)",
                  transition: "width 0.5s ease, background 0.5s ease",
                }}/>
            ))}
            <span className="text-[10px] font-semibold" style={{ color: "rgba(13,27,62,0.4)" }}>{steps[step - 1]}</span>
          </div>
        </div>
      </div>

      <AnimatePresence mode="wait">

        {/* ── Step 1: Choose Type ── */}
        {step === 1 && (
          <motion.div key="s1"
            initial={{ opacity: 0, x: 32 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -32 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="relative z-10">
            <p className="text-sm font-medium mb-7" style={{ color: "rgba(13,27,62,0.5)" }}>
              What are you promoting today?
            </p>

            <div className="grid grid-cols-2 gap-5 mb-8">
              {AD_TYPES.map((type, i) => {
                const sel = adType === type.id;
                const yOffset = i % 2 === 1 ? 12 : 0;
                return (
                  <motion.button
                    key={type.id}
                    whileTap={{ scale: 0.965 }}
                    whileHover={{ y: yOffset - 3 }}
                    initial={{ opacity: 0, y: yOffset + 20 }}
                    animate={{ opacity: 1, y: yOffset }}
                    transition={grace(i * 0.09)}
                    onClick={() => setAdType(type.id)}
                    className="p-5 rounded-3xl border-2 text-left relative overflow-hidden"
                    style={{
                      borderColor: sel ? type.accent : "rgba(13,27,62,0.06)",
                      background: sel ? type.bg : "white",
                      boxShadow: sel ? `0 8px 28px ${type.accent}20` : "0 2px 12px rgba(13,27,62,0.04)",
                      transition: "box-shadow 0.5s ease, border-color 0.5s ease, background 0.5s ease",
                    }}>
                    {sel && (
                      <div className="absolute top-3 right-3">
                        <CheckCircle size={14} style={{ color: type.accent }} strokeWidth={2.5}/>
                      </div>
                    )}
                    <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-4 overflow-hidden"
                      style={{ background: type.bg }}>
                      <LottieIcon icon={type.icon} size={46} />
                    </div>
                    <p className="font-bold text-[13px] mb-1 leading-tight" style={{ fontFamily: "Agrandir, sans-serif", color: "var(--app-text-alt)" }}>
                      {type.label}
                    </p>
                    <p className="text-[10px] leading-snug" style={{ color: "rgba(13,27,62,0.42)", lineHeight: 1.5 }}>{type.desc}</p>
                  </motion.button>
                );
              })}
            </div>

            <motion.button
              whileTap={{ scale: 0.975 }} whileHover={{ y: -2 }}
              disabled={!adType} onClick={() => setStep(2)}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="w-full py-4 rounded-2xl text-white font-bold flex items-center justify-center gap-2 disabled:opacity-40"
              style={{ background: "linear-gradient(135deg, var(--app-orange), var(--app-orange))", fontFamily: "Agrandir, sans-serif", fontSize: "15px", boxShadow: "0 8px 32px rgba(255,140,0,0.28)" }}>
              Continue <ArrowRight size={18} strokeWidth={2.5}/>
            </motion.button>
          </motion.div>
        )}

        {/* ── Step 2: Ad Details ── */}
        {step === 2 && (
          <motion.div key="s2"
            initial={{ opacity: 0, x: 32 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -32 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="relative z-10 space-y-5">
            {selectedType && (
              <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={grace()}
                className="flex items-center gap-4 p-4 rounded-2xl border"
                style={{ background: selectedType.bg, borderColor: `${selectedType.accent}22` }}>
                <LottieIcon icon={selectedType.icon} size={40} />
                <div>
                  <p className="font-bold text-[13px]" style={{ color: "var(--app-text-alt)" }}>{selectedType.label}</p>
                  <p className="text-[10px] mt-0.5" style={{ color: "rgba(13,27,62,0.45)" }}>Selected ad type</p>
                </div>
              </motion.div>
            )}

            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={grace(0.07)}
              className="border-2 border-dashed rounded-3xl h-36 flex flex-col items-center justify-center gap-3 cursor-pointer"
              style={{ borderColor: "rgba(13,27,62,0.1)", background: "rgba(248,249,251,0.7)" }}>
              <div className="w-11 h-11 rounded-xl flex items-center justify-center" style={{ background: "var(--tint-orange)" }}>
                <Camera size={20} style={{ color: "var(--app-orange)" }}/>
              </div>
              <div className="flex items-center gap-1.5" style={{ color: "rgba(13,27,62,0.38)" }}>
                <Upload size={12}/><span className="text-[11px] font-medium">Upload advert image</span>
              </div>
            </motion.div>

            {[
              { label: "Ad Title *",    value: title,       set: setTitle,       placeholder: "e.g. Premium Solar Lights — Lusaka", multi: false },
              { label: "Description *", value: description, set: setDescription, placeholder: "Describe your product or service...",    multi: true  },
            ].map(({ label, value, set, placeholder, multi }, fi) => (
              <motion.div key={label} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={grace(0.12 + fi * 0.07)}>
                <label className="block text-[10px] font-bold uppercase tracking-widest mb-2.5"
                  style={{ color: "rgba(13,27,62,0.45)" }}>{label}</label>
                {multi ? (
                  <textarea value={value} onChange={(e) => set(e.target.value)} placeholder={placeholder} rows={4}
                    className="w-full px-4 py-3.5 rounded-2xl text-sm font-medium outline-none resize-none"
                    style={{ background: "white", border: "1.5px solid rgba(13,27,62,0.08)", color: "var(--app-text-alt)", lineHeight: 1.7 }}/>
                ) : (
                  <input type="text" value={value} onChange={(e) => set(e.target.value)} placeholder={placeholder}
                    className="w-full px-4 py-3.5 rounded-2xl text-sm font-medium outline-none"
                    style={{ background: "white", border: "1.5px solid rgba(13,27,62,0.08)", color: "var(--app-text-alt)" }}/>
                )}
              </motion.div>
            ))}

            <motion.button
              whileTap={{ scale: 0.975 }} whileHover={{ y: -2 }}
              disabled={!title || !description} onClick={() => setStep(3)}
              initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={grace(0.28)}
              className="w-full py-4 rounded-2xl text-white font-bold flex items-center justify-center gap-2 disabled:opacity-40"
              style={{ background: "linear-gradient(135deg, var(--app-orange), var(--app-orange))", fontFamily: "Agrandir, sans-serif", fontSize: "15px", boxShadow: "0 8px 32px rgba(255,140,0,0.28)" }}>
              Next Step <ArrowRight size={18} strokeWidth={2.5}/>
            </motion.button>
          </motion.div>
        )}

        {/* ── Step 3: Budget & Launch ── */}
        {step === 3 && (
          <motion.div key="s3"
            initial={{ opacity: 0, x: 32 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -32 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="relative z-10 space-y-6">

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={grace()}
              className="rounded-2xl p-5 flex items-center gap-4"
              style={{ background: "var(--app-text-alt)" }}>
              {selectedType && <LottieIcon icon={selectedType.icon} size={48} />}
              <div>
                <p className="text-[9px] font-bold uppercase tracking-widest mb-0.5" style={{ color: "rgba(255,255,255,0.35)" }}>Ad Summary</p>
                <p className="font-bold text-white text-[15px] leading-tight" style={{ fontFamily: "Agrandir, sans-serif" }}>{title}</p>
                <p className="text-[11px] mt-0.5" style={{ color: "rgba(255,255,255,0.45)" }}>{selectedType?.label}</p>
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={grace(0.1)}>
              <label className="block text-[10px] font-bold uppercase tracking-widest mb-2.5" style={{ color: "rgba(13,27,62,0.45)" }}>
                Daily Budget (K)
              </label>
              <div className="relative">
                <DollarSign size={15} className="absolute left-4 top-1/2 -translate-y-1/2" style={{ color: "rgba(13,27,62,0.3)" }}/>
                <input type="number" value={budget} onChange={(e) => setBudget(e.target.value)} placeholder="5.00"
                  className="w-full pl-10 pr-4 py-4 rounded-2xl text-sm font-bold outline-none"
                  style={{ background: "white", border: "1.5px solid rgba(13,27,62,0.08)", color: "var(--app-text-alt)" }}/>
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={grace(0.18)}>
              <label className="block text-[10px] font-bold uppercase tracking-widest mb-3" style={{ color: "rgba(13,27,62,0.45)" }}>
                Campaign Duration
              </label>
              <div className="grid grid-cols-4 gap-3">
                {["3", "7", "14", "30"].map((d, di) => (
                  <motion.button key={d}
                    whileTap={{ scale: 0.94 }}
                    initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: di % 2 === 1 ? 6 : 0 }} transition={grace(0.22 + di * 0.05)}
                    onClick={() => setDuration(d)}
                    className="py-3 rounded-2xl text-[12px] font-bold border"
                    style={duration === d
                      ? { background: "var(--app-orange)", color: "white", borderColor: "var(--app-orange)", boxShadow: "0 4px 16px rgba(255,140,0,0.3)", transition: "all 0.5s ease" }
                      : { background: "white", color: "var(--app-text-alt)", borderColor: "rgba(13,27,62,0.09)", transition: "all 0.5s ease" }}>
                    {d}d
                  </motion.button>
                ))}
              </div>
            </motion.div>

            {budget && (
              <motion.div
                initial={{ opacity: 0, y: 16, scale: 0.97 }} animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="rounded-3xl p-5 flex items-center gap-5"
                style={{ background: "linear-gradient(135deg, var(--tint-orange), #FFECD0)", border: "1.5px solid rgba(255,140,0,0.18)" }}>
                <LottieIcon icon="rocket" size={60} />
                <div>
                  <p className="text-[9px] font-bold uppercase tracking-widest mb-1" style={{ color: "var(--app-orange)" }}>Estimated Reach</p>
                  <p className="font-black text-2xl leading-none" style={{ fontFamily: "Agrandir, sans-serif", color: "var(--app-text-alt)" }}>
                    {(Number(budget) * Number(duration) * 120).toLocaleString()} users
                  </p>
                  <p className="text-[11px] mt-1" style={{ color: "rgba(13,27,62,0.5)" }}>
                    Total: K{(Number(budget) * Number(duration)).toFixed(2)}
                  </p>
                </div>
              </motion.div>
            )}

            <motion.button
              whileTap={{ scale: 0.975 }} whileHover={{ y: -2 }}
              disabled={!budget} onClick={() => navigate("/")}
              initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={grace(0.32)}
              className="w-full py-4 rounded-2xl text-white font-bold flex items-center justify-center gap-3 disabled:opacity-40"
              style={{ background: "linear-gradient(135deg, var(--app-orange), var(--app-text-alt))", fontFamily: "Agrandir, sans-serif", fontSize: "15px", boxShadow: "0 10px 32px rgba(255,140,0,0.28)" }}>
              <LottieIcon icon="megaphone" size={28} /> Launch Advert
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
