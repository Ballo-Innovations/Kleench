import { useState } from "react";
import { motion } from "motion/react";
import { ArrowLeft, Clock, Users, Plus, Trash2, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router";
import { LottieIcon } from "../components/LottieIcon";

/* Graceful ease-out builder */
const grace = (delay = 0) => ({
  delay,
  duration: 0.62,
  ease: [0.22, 1, 0.36, 1] as const,
});

function CrossHatchBg() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 0 }}>
      <svg width="100%" height="100%" style={{ position: "absolute", inset: 0 }}>
        <defs>
          <pattern id="xhatch-poll" x="0" y="0" width="24" height="24" patternUnits="userSpaceOnUse">
            <line x1="0" y1="0" x2="24" y2="24" stroke="#FF8C00" strokeWidth="0.5" strokeOpacity="0.07"/>
            <line x1="24" y1="0" x2="0" y2="24" stroke="#FF8C00" strokeWidth="0.5" strokeOpacity="0.07"/>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#xhatch-poll)"/>
      </svg>
      <div className="absolute -top-24 right-0 w-64 h-64 rounded-full opacity-[0.05]"
        style={{ background: "radial-gradient(circle, #00695C, transparent)" }}/>
    </div>
  );
}

export function CreatePoll() {
  const navigate = useNavigate();
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState(["", ""]);
  const [duration, setDuration] = useState("24");
  const [audience, setAudience] = useState("public");
  const [submitted, setSubmitted] = useState(false);

  const addOption    = () => { if (options.length < 5) setOptions([...options, ""]); };
  const removeOption = (idx: number) => { if (options.length > 2) setOptions(options.filter((_, i) => i !== idx)); };
  const updateOption = (idx: number, val: string) => setOptions(options.map((o, i) => i === idx ? val : o));
  const isValid = question.trim().length > 0 && options.filter((o) => o.trim()).length >= 2;

  /* ── Success state ── */
  if (submitted) {
    return (
      <div className="w-full max-w-md mx-auto flex flex-col items-center justify-center min-h-[70vh] text-center relative">
        <CrossHatchBg />
        <div className="relative z-10 px-8">
          <motion.div
            initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 220, damping: 18, delay: 0.05 }}
            className="flex justify-center mb-8">
            <LottieIcon icon="success" size={110} />
          </motion.div>
          <motion.h2 initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={grace(0.35)}
            className="font-black mb-3" style={{ fontFamily: "Agrandir, sans-serif", fontSize: "1.5rem", color: "#0D1B3E" }}>
            Poll Published!
          </motion.h2>
          <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={grace(0.44)}
            className="text-sm leading-relaxed max-w-xs mx-auto mb-10" style={{ color: "rgba(13,27,62,0.5)", lineHeight: 1.7 }}>
            Your poll is now live and collecting community responses.
          </motion.p>
          <motion.button
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={grace(0.52)}
            whileTap={{ scale: 0.97 }} whileHover={{ y: -2 }}
            onClick={() => navigate("/")}
            className="px-10 py-4 rounded-2xl text-white font-bold flex items-center justify-center gap-2 mx-auto"
            style={{ background: "linear-gradient(135deg, #00695C, #FF8C00)", fontFamily: "Agrandir, sans-serif", boxShadow: "0 12px 36px rgba(0,105,92,0.28)" }}>
            Back to Home <ChevronRight size={18}/>
          </motion.button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-md mx-auto pb-32 relative">
      <CrossHatchBg />

      {/* Header */}
      <div className="relative z-10 pt-4 pb-7 flex items-center gap-3">
        <button onClick={() => navigate(-1)}
          className="w-10 h-10 rounded-full bg-white shadow-sm border flex items-center justify-center"
          style={{ borderColor: "rgba(13,27,62,0.06)" }}>
          <ArrowLeft size={16} style={{ color: "#0D1B3E" }}/>
        </button>
        <div className="flex items-center gap-3">
          <LottieIcon icon="chart" size={40} />
          <div>
            <h1 className="font-black tracking-tight" style={{ fontFamily: "Agrandir, sans-serif", fontSize: "1.3rem", color: "#0D1B3E" }}>
              Create Poll
            </h1>
            <p className="text-[10px] font-semibold mt-0.5" style={{ color: "#00695C" }}>Community voice</p>
          </div>
        </div>
      </div>

      <div className="relative z-10 space-y-7">

        {/* Question textarea */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={grace(0.06)}>
          <label className="block text-[10px] font-bold uppercase tracking-widest mb-2.5"
            style={{ color: "rgba(13,27,62,0.45)" }}>Your Question *</label>
          <textarea value={question} onChange={(e) => setQuestion(e.target.value)}
            placeholder="e.g. Which solar product would you buy first?" rows={3}
            className="w-full px-4 py-4 rounded-2xl text-sm font-medium outline-none resize-none"
            style={{
              background: "white",
              border: `1.5px solid ${question ? "#00695C" : "rgba(13,27,62,0.08)"}`,
              color: "#0D1B3E",
              lineHeight: 1.7,
              transition: "border-color 0.5s ease",
            }}/>
        </motion.div>

        {/* Options */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={grace(0.13)}>
          <div className="flex items-center justify-between mb-3">
            <label className="text-[10px] font-bold uppercase tracking-widest" style={{ color: "rgba(13,27,62,0.45)" }}>
              Options *
            </label>
            <span className="text-[10px] font-bold" style={{ color: "rgba(13,27,62,0.28)" }}>{options.length}/5</span>
          </div>

          <div className="space-y-3.5">
            {options.map((opt, idx) => {
              /* Staggered rhythm: every other option sits 8px lower */
              const yOff = idx % 2 === 1 ? 8 : 0;
              return (
                <motion.div key={idx} layout
                  initial={{ opacity: 0, y: yOff + 12 }}
                  animate={{ opacity: 1, y: yOff }}
                  transition={grace(0.16 + idx * 0.06)}
                  className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full flex items-center justify-center font-black text-[11px] flex-shrink-0"
                    style={{
                      background: opt.trim() ? "#00695C" : "#F8F9FB",
                      color: opt.trim() ? "white" : "rgba(13,27,62,0.28)",
                      transition: "background 0.5s ease, color 0.5s ease",
                    }}>
                    {String.fromCharCode(65 + idx)}
                  </div>
                  <input type="text" value={opt} onChange={(e) => updateOption(idx, e.target.value)}
                    placeholder={`Option ${idx + 1}`}
                    className="flex-1 px-4 py-3 rounded-2xl text-sm outline-none"
                    style={{ background: "white", border: "1.5px solid rgba(13,27,62,0.08)", color: "#0D1B3E" }}/>
                  {options.length > 2 && (
                    <motion.button whileTap={{ scale: 0.9 }} onClick={() => removeOption(idx)}
                      className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0"
                      style={{ color: "rgba(13,27,62,0.22)" }}>
                      <Trash2 size={14}/>
                    </motion.button>
                  )}
                </motion.div>
              );
            })}
          </div>

          {options.length < 5 && (
            <motion.button whileTap={{ scale: 0.95 }} onClick={addOption}
              className="mt-4 flex items-center gap-2.5 font-semibold text-[12px]"
              style={{ color: "#00695C" }}>
              <div className="w-8 h-8 rounded-full border-2 border-dashed flex items-center justify-center"
                style={{ borderColor: "#00695C" }}>
                <Plus size={13}/>
              </div>
              Add another option
            </motion.button>
          )}
        </motion.div>

        {/* Duration */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={grace(0.26)}>
          <div className="flex items-center gap-2 mb-3.5">
            <Clock size={13} style={{ color: "#00695C" }}/>
            <label className="text-[10px] font-bold uppercase tracking-widest" style={{ color: "rgba(13,27,62,0.45)" }}>
              Duration
            </label>
          </div>
          <div className="grid grid-cols-4 gap-3">
            {["1","6","24","72"].map((h, hi) => (
              <motion.button key={h}
                initial={{ opacity: 0, y: hi % 2 === 1 ? 14 : 0 }}
                animate={{ opacity: 1, y: hi % 2 === 1 ? 6 : 0 }}  /* staggered rhythm in row */
                transition={grace(0.3 + hi * 0.05)}
                whileTap={{ scale: 0.93 }}
                onClick={() => setDuration(h)}
                className="py-3 rounded-2xl text-[11.5px] font-bold border"
                style={duration === h
                  ? { background: "#0D1B3E", color: "white", borderColor: "#0D1B3E", boxShadow: "0 4px 16px rgba(13,27,62,0.22)", transition: "all 0.5s ease" }
                  : { background: "white", color: "#0D1B3E", borderColor: "rgba(13,27,62,0.09)", transition: "all 0.5s ease" }}>
                {Number(h) < 24 ? `${h}h` : `${Number(h)/24}d`}
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Audience */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={grace(0.34)}>
          <div className="flex items-center gap-2 mb-3.5">
            <Users size={13} style={{ color: "#00695C" }}/>
            <label className="text-[10px] font-bold uppercase tracking-widest" style={{ color: "rgba(13,27,62,0.45)" }}>
              Who can vote?
            </label>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {[
              { id: "public",  label: "Everyone",   sub: "All Kleench users",  icon: "users" },
              { id: "friends", label: "My Network", sub: "People you follow",  icon: "share" },
            ].map((a, ai) => (
              <motion.button key={a.id}
                initial={{ opacity: 0, y: ai % 2 === 1 ? 14 : 20 }}
                animate={{ opacity: 1, y: ai % 2 === 1 ? 8 : 0 }} /* right card slightly lower */
                transition={grace(0.38 + ai * 0.08)}
                whileTap={{ scale: 0.97 }}
                onClick={() => setAudience(a.id)}
                className="p-4 rounded-3xl border-2 text-left"
                style={{
                  borderColor: audience === a.id ? "#00695C" : "rgba(13,27,62,0.07)",
                  background: audience === a.id ? "#F0FDF9" : "white",
                  boxShadow: audience === a.id ? "0 6px 24px rgba(0,105,92,0.12)" : "0 2px 10px rgba(13,27,62,0.04)",
                  transition: "all 0.55s ease",
                }}>
                <div className="flex items-center gap-2 mb-2">
                  <LottieIcon icon={a.icon} size={32} />
                </div>
                <p className="font-bold text-[13px]" style={{ color: "#0D1B3E" }}>{a.label}</p>
                <p className="text-[10px] mt-1 leading-snug" style={{ color: "rgba(13,27,62,0.4)", lineHeight: 1.5 }}>{a.sub}</p>
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Publish button */}
        <motion.button
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={grace(0.46)}
          whileTap={{ scale: 0.975 }} whileHover={{ y: -2 }}
          disabled={!isValid} onClick={() => setSubmitted(true)}
          className="w-full py-4 rounded-2xl text-white font-bold flex items-center justify-center gap-3 disabled:opacity-40"
          style={{
            background: isValid ? "linear-gradient(135deg, #00695C, #FF8C00)" : "#ccc",
            fontFamily: "Agrandir, sans-serif",
            fontSize: "15px",
            boxShadow: isValid ? "0 10px 32px rgba(0,105,92,0.26)" : "none",
            transition: "box-shadow 0.5s ease, background 0.5s ease",
          }}>
          <LottieIcon icon="chart" size={28} /> Publish Poll
        </motion.button>
      </div>
    </div>
  );
}
