import { useState } from "react";
import { useNavigate } from "react-router";
import { Minus, Plus, Check } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { PageHeader } from "../components/PageHeader";

type AdvertType = "target" | "general";
type Step = 1 | 2 | 3;

const QUALITY_OPTIONS = [
  { id: "standard", label: "Standard", desc: "Up to 480p" },
  { id: "premium", label: "Premium (780p to 1080p)", desc: "HD quality" },
  { id: "high", label: "High (Best quality – HD & 4K)", desc: "Ultra-HD" },
];

const SIZE_OPTIONS_VIDEO = ["1–5MB", "5–10MB", "10–20MB"];
const SIZE_OPTIONS_AUDIO = ["1–5MB", "5–10MB", "10–20MB", "20–50MB", "50–100MB", "100–500MB"];
const LIFE_STAGES = ["Children", "Teens", "Youth", "Adults"];
const EARNING_RANGES = ["K1,000–K3,000", "K3,000–K9,000", "K9,000–K18,000", "K18,000–K30,000"];
const TARGET_TYPES = ["Individual", "Group", "Company"] as const;

function TogglePills<T extends string>({ options, value, onChange }: { options: readonly T[]; value: T; onChange: (v: T) => void }) {
  return (
    <div className="flex gap-2">
      {options.map((opt) => (
        <button key={opt} onClick={() => onChange(opt)} className={`flex-1 py-2.5 rounded-xl text-[11px] font-black uppercase tracking-wider transition-all active:scale-95 ${value === opt ? "bg-orange-500 text-white shadow-sm" : "bg-slate-100 text-slate-500 border border-slate-200"}`}>
          {opt}
        </button>
      ))}
    </div>
  );
}

function FieldLabel({ children }: { children: React.ReactNode }) {
  return <label className="text-[10px] font-black text-orange-500 uppercase tracking-widest mb-1.5 block">{children}</label>;
}

function SectionCard({ children }: { children: React.ReactNode }) {
  return <div className="bg-[var(--app-bg)]/80 backdrop-blur-sm rounded-2xl border border-slate-100 shadow-sm p-4 space-y-4">{children}</div>;
}

export function LearnUpload() {
  const navigate = useNavigate();
  const [advertType, setAdvertType] = useState<AdvertType>("target");
  const [step, setStep] = useState<Step>(1);

  const [format, setFormat] = useState<"Video" | "Picture" | "Audio">("Video");
  const [quality, setQuality] = useState("premium");
  const [length, setLength] = useState<"15sec" | "60sec" | "10min">("15sec");
  const [duration, setDuration] = useState(3);
  const [province, setProvince] = useState("");
  const [town, setTown] = useState("");
  const [suburb, setSuburb] = useState("");
  const [specificPlace, setSpecificPlace] = useState("");
  const [target, setTarget] = useState<typeof TARGET_TYPES[number]>("Individual");

  const [gender, setGender] = useState<"All" | "Male" | "Female">("All");
  const [minAge, setMinAge] = useState(18);
  const [maxAge, setMaxAge] = useState(75);
  const [lifeStage, setLifeStage] = useState("Youth");
  const [prompt, setPrompt] = useState<"Single" | "Married">("Single");
  const [earning, setEarning] = useState("");

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [questions, setQuestions] = useState(["", "", ""]);
  const [pricing, setPricing] = useState<"Free" | "Pay Per View K15" | "Subscribers Only">("Free");

  const [genFormat, setGenFormat] = useState<"Video" | "Picture" | "Audio">("Video");
  const [genSize, setGenSize] = useState("");
  const [genNoAds] = useState(1000);
  const [genBudget] = useState(3000);

  const handleNext = () => { if (step < 3) setStep((s) => (s + 1) as Step); };
  const handleBack = () => { if (step > 1) setStep((s) => (s - 1) as Step); else navigate(-1); };
  const handlePost = () => navigate("/learning");

  return (
    <div className="w-full min-h-screen bg-transparent pb-32 font-sans text-slate-800">
      <PageHeader title="Upload" showBack onBack={handleBack} />

      <div className="px-4 pt-3 space-y-4">
        <div className="flex gap-3">
          {(["target", "general"] as AdvertType[]).map((t) => (
            <button key={t} onClick={() => { setAdvertType(t); setStep(1); }} className={`relative flex-1 py-3 rounded-full font-black text-[11px] uppercase tracking-widest transition-all active:scale-95 ${advertType === t ? "bg-orange-500 text-white shadow-md shadow-orange-500/30" : "bg-[var(--app-bg)] text-slate-500 border border-slate-200"}`}>
              <span className={`absolute -top-1.5 -left-1.5 w-5 h-5 rounded-full text-[10px] flex items-center justify-center font-black shadow-sm ${advertType === t ? "bg-[var(--app-bg)] text-orange-500 border border-orange-200" : "bg-orange-500 text-white"}`}>
                {t === "target" ? "1" : "2"}
              </span>
              {t === "target" ? "Target Content" : "General Content"}
            </button>
          ))}
        </div>

        {advertType === "target" && (
          <div className="flex items-center gap-2">
            {[1, 2, 3].map((s) => (
              <div key={s} className="flex items-center gap-2">
                <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-black transition-all ${step === s ? "bg-[var(--app-shape-accent)] text-white" : step > s ? "bg-orange-500 text-white" : "bg-slate-200 text-slate-400"}`}>
                  {step > s ? <Check size={10} /> : s}
                </div>
                {s < 3 && <div className={`h-0.5 w-8 rounded-full ${step > s ? "bg-orange-500" : "bg-slate-200"}`} />}
              </div>
            ))}
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">
              {step === 1 ? "Content" : step === 2 ? "Demography" : "Details"}
            </span>
          </div>
        )}

        <AnimatePresence mode="wait">
          {advertType === "target" && step === 1 && (
            <motion.div key="t1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-4">
              <SectionCard>
                <div>
                  <FieldLabel>Content Type</FieldLabel>
                  <span className="inline-block bg-orange-500 text-white px-4 py-1.5 rounded-full text-[11px] font-black uppercase tracking-wider">Learn</span>
                </div>
                <div>
                  <FieldLabel>Format</FieldLabel>
                  <TogglePills options={["Video", "Picture", "Audio"] as const} value={format} onChange={setFormat} />
                </div>
                {format === "Video" && (
                  <div>
                    <FieldLabel>Quality Level</FieldLabel>
                    <div className="space-y-2">
                      {QUALITY_OPTIONS.map((q) => (
                        <button key={q.id} onClick={() => setQuality(q.id)} className={`w-full flex items-center gap-3 p-3 rounded-xl border transition-all ${quality === q.id ? "border-orange-500 bg-orange-50" : "border-slate-200 bg-[var(--app-bg-muted)]"}`}>
                          <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${quality === q.id ? "border-orange-500 bg-orange-500" : "border-slate-300"}`}>
                            {quality === q.id && <div className="w-1.5 h-1.5 rounded-full bg-[var(--app-bg)]" />}
                          </div>
                          <div className="text-left">
                            <p className="text-[11px] font-black text-slate-800">{q.label}</p>
                            <p className="text-[10px] text-slate-400">{q.desc}</p>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
                {format === "Video" && (
                  <div>
                    <FieldLabel>Length of the Video</FieldLabel>
                    <TogglePills options={["15sec", "60sec", "10min"] as const} value={length} onChange={setLength} />
                  </div>
                )}
                <div>
                  <FieldLabel>Duration (Days)</FieldLabel>
                  <div className="flex items-center gap-4">
                    <button onClick={() => setDuration(Math.max(1, duration - 1))} className="w-9 h-9 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center active:scale-90 transition-all">
                      <Minus size={14} className="text-slate-600" />
                    </button>
                    <span className="text-xl font-black text-slate-800 w-8 text-center">{duration}</span>
                    <button onClick={() => setDuration(duration + 1)} className="w-9 h-9 rounded-full bg-orange-500 flex items-center justify-center shadow-sm shadow-orange-500/30 active:scale-90 transition-all">
                      <Plus size={14} className="text-white" />
                    </button>
                  </div>
                </div>
              </SectionCard>

              <SectionCard>
                <FieldLabel>Location</FieldLabel>
                {[
                  { label: "Province", value: province, set: setProvince, placeholder: "e.g. Lusaka" },
                  { label: "Town", value: town, set: setTown, placeholder: "e.g. Lusaka Central" },
                  { label: "Suburb / Street", value: suburb, set: setSuburb, placeholder: "e.g. Kabulonga" },
                  { label: "Specific Place (e.g. University)", value: specificPlace, set: setSpecificPlace, placeholder: "e.g. UNZA" },
                ].map((field) => (
                  <div key={field.label}>
                    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-1">{field.label}</label>
                    <input value={field.value} onChange={(e) => field.set(e.target.value)} placeholder={field.placeholder} className="w-full h-11 bg-[var(--app-bg-muted)] border border-slate-200 rounded-xl px-4 text-sm font-semibold text-slate-800 outline-none focus:border-orange-400 transition-all" />
                  </div>
                ))}

                <div>
                  <FieldLabel>Target</FieldLabel>
                  <TogglePills options={TARGET_TYPES} value={target} onChange={setTarget} />
                </div>
              </SectionCard>

              <button onClick={handleNext} className="w-full h-14 bg-[var(--app-shape-accent)] text-white rounded-2xl font-black uppercase tracking-widest text-xs shadow-lg shadow-[var(--app-text)]/25 active:scale-95 transition-all">
                Next →
              </button>
            </motion.div>
          )}

          {advertType === "target" && step === 2 && (
            <motion.div key="t2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-4">
              <SectionCard>
                <div>
                  <FieldLabel>Gender</FieldLabel>
                  <TogglePills options={["All", "Male", "Female"] as const} value={gender} onChange={setGender} />
                </div>
                <div>
                  <FieldLabel>Age Group</FieldLabel>
                  <div className="flex items-center gap-3">
                    <div className="flex-1">
                      <label className="text-[10px] text-slate-400 font-bold block mb-1">Min Age</label>
                      <input type="number" value={minAge} onChange={(e) => setMinAge(+e.target.value)} className="w-full h-11 bg-[var(--app-bg-muted)] border border-slate-200 rounded-xl px-3 text-sm font-black text-center outline-none focus:border-orange-400" />
                    </div>
                    <span className="text-slate-300 font-black mt-4">—</span>
                    <div className="flex-1">
                      <label className="text-[10px] text-slate-400 font-bold block mb-1">Max Age</label>
                      <input type="number" value={maxAge} onChange={(e) => setMaxAge(+e.target.value)} className="w-full h-11 bg-[var(--app-bg-muted)] border border-slate-200 rounded-xl px-3 text-sm font-black text-center outline-none focus:border-orange-400" />
                    </div>
                  </div>
                </div>
                <div>
                  <FieldLabel>Life Stage</FieldLabel>
                  <div className="flex gap-2 flex-wrap">
                    {LIFE_STAGES.map((s) => (
                      <button key={s} onClick={() => setLifeStage(s)} className={`px-4 py-2 rounded-xl text-[11px] font-black uppercase tracking-wider transition-all active:scale-95 ${lifeStage === s ? "bg-orange-500 text-white" : "bg-slate-100 text-slate-500"}`}>{s}</button>
                    ))}
                  </div>
                </div>
                <div>
                  <FieldLabel>Prompt</FieldLabel>
                  <TogglePills options={["Single", "Married"] as const} value={prompt} onChange={setPrompt} />
                </div>
                <div>
                  <FieldLabel>Earning If Employed</FieldLabel>
                  <div className="space-y-2">
                    {EARNING_RANGES.map((r) => (
                      <button key={r} onClick={() => setEarning(r)} className={`w-full flex items-center gap-3 p-3 rounded-xl border transition-all ${earning === r ? "border-orange-500 bg-orange-50" : "border-slate-200 bg-[var(--app-bg-muted)]"}`}>
                        <div className={`w-4 h-4 rounded-full border-2 flex-shrink-0 ${earning === r ? "border-orange-500 bg-orange-500" : "border-slate-300"}`}>
                          {earning === r && <div className="w-1.5 h-1.5 rounded-full bg-[var(--app-bg)] m-auto mt-[2px]" />}
                        </div>
                        <span className="text-[11px] font-black text-slate-700">{r}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </SectionCard>
              <button onClick={handleNext} className="w-full h-14 bg-[var(--app-shape-accent)] text-white rounded-2xl font-black uppercase tracking-widest text-xs shadow-lg shadow-[var(--app-text)]/25 active:scale-95 transition-all">
                Next →
              </button>
            </motion.div>
          )}

          {advertType === "target" && step === 3 && (
            <motion.div key="t3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-4">
              <SectionCard>
                <div>
                  <FieldLabel>Title</FieldLabel>
                  <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Enter content title" className="w-full h-11 bg-[var(--app-bg-muted)] border border-slate-200 rounded-xl px-4 text-sm font-semibold outline-none focus:border-orange-400 transition-all" />
                </div>
                <div>
                  <FieldLabel>Description</FieldLabel>
                  <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Describe your content..." rows={3} className="w-full bg-[var(--app-bg-muted)] border border-slate-200 rounded-xl px-4 py-3 text-sm font-semibold outline-none focus:border-orange-400 transition-all resize-none" />
                </div>
                <div>
                  <FieldLabel>Questionnaire — Optional</FieldLabel>
                  {questions.map((q, i) => (
                    <input key={i} value={q} onChange={(e) => { const u = [...questions]; u[i] = e.target.value; setQuestions(u); }} placeholder={`Question ${i + 1}`} className="w-full h-11 bg-[var(--app-bg-muted)] border border-slate-200 rounded-xl px-4 text-sm font-semibold outline-none focus:border-orange-400 transition-all mb-2" />
                  ))}
                </div>
                <div>
                  <FieldLabel>Pricing Option</FieldLabel>
                  <div className="space-y-2">
                    {(["Free", "Pay Per View K15", "Subscribers Only"] as const).map((opt) => (
                      <button key={opt} onClick={() => setPricing(opt)} className={`w-full flex items-center gap-3 p-3 rounded-xl border transition-all ${pricing === opt ? "border-[var(--app-text)] bg-[var(--app-bg-muted)]" : "border-slate-200"}`}>
                        <div className={`w-4 h-4 rounded-full border-2 flex-shrink-0 ${pricing === opt ? "border-[var(--app-text)] bg-[var(--app-shape-accent)]" : "border-slate-300"}`}>
                          {pricing === opt && <div className="w-1.5 h-1.5 rounded-full bg-[var(--app-bg)] m-auto mt-[2px]" />}
                        </div>
                        <span className="text-[11px] font-black text-slate-700">{opt}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </SectionCard>
              <button onClick={handlePost} className="w-full h-14 bg-[var(--app-shape-accent)] text-white rounded-2xl font-black uppercase tracking-widest text-xs shadow-lg shadow-[var(--app-text)]/25 active:scale-95 transition-all">
                Post Video
              </button>
            </motion.div>
          )}

          {advertType === "general" && (
            <motion.div key="gen" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-4">
              <SectionCard>
                <div>
                  <FieldLabel>Content Type</FieldLabel>
                  <span className="inline-block bg-orange-500 text-white px-4 py-1.5 rounded-full text-[11px] font-black uppercase tracking-wider">Learn</span>
                </div>
                <div>
                  <FieldLabel>Format</FieldLabel>
                  <TogglePills options={["Video", "Picture", "Audio"] as const} value={genFormat} onChange={setGenFormat} />
                </div>
                <div>
                  <FieldLabel>Size of Content</FieldLabel>
                  <div className="flex gap-2 flex-wrap">
                    {(genFormat === "Video" ? SIZE_OPTIONS_VIDEO : SIZE_OPTIONS_AUDIO).map((s) => (
                      <button key={s} onClick={() => setGenSize(s)} className={`px-3 py-2 rounded-xl text-[11px] font-black transition-all active:scale-95 ${genSize === s ? "bg-orange-500 text-white" : "bg-slate-100 text-slate-500"}`}>{s}</button>
                    ))}
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="flex-1 bg-[var(--app-bg-muted)] border border-slate-200 rounded-xl p-3">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">No. Ads</p>
                    <p className="text-lg font-black text-slate-800">{genNoAds.toLocaleString()}</p>
                  </div>
                  <div className="flex-1 bg-[var(--app-bg-muted)] border border-slate-200 rounded-xl p-3">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Budget</p>
                    <p className="text-lg font-black text-slate-800">K{genBudget.toLocaleString()}</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <button className="flex-1 h-11 bg-[var(--app-shape-accent)] text-white rounded-xl font-black text-[11px] uppercase tracking-wider active:scale-95 transition-all">Calculate</button>
                  <button className="flex-1 h-11 bg-slate-100 text-slate-600 rounded-xl font-black text-[11px] uppercase tracking-wider border border-slate-200 active:scale-95 transition-all">Auto Calculate</button>
                </div>
              </SectionCard>
              <button onClick={handlePost} className="w-full h-14 bg-[var(--app-shape-accent)] text-white rounded-2xl font-black uppercase tracking-widest text-xs shadow-lg shadow-[var(--app-text)]/25 active:scale-95 transition-all">
                Next →
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
