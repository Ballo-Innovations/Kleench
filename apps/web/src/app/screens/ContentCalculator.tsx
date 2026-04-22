import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  DuotoneChevronRight,
  DuotoneCheck,
  DuotoneUser,
  DuotonePlus,
} from "../components/DuotoneIcon";
import { PageHeader } from "../components/PageHeader";
import { useNavigate } from "react-router";
import kleenchLogo from "@/assets/kleench_logo.png";

// --- Types ---
type CalcStep = "Calculator" | "TargetAudience" | "Demographics" | "Quote" | "Receipt";
type ContentType = "Advert" | "Educational";
type FormatType = "Video" | "Picture" | "Audio";
type QualityType = "Standard quality" | "Premium" | "High";
type AudienceTypeOption = "Targeted" | "General";
type EntityType = "Individual" | "Business";

interface LocationState {
  country: string;
  province: string;
  district: string;
  town: string;
  place: string;
}

interface DemographicsState {
  employment: string;
  education: string;
  occupation: string;
  gender: "All" | "Male" | "Female";
  minAge: number;
  maxAge: number;
  lifeStage: "Children" | "Teens" | "Youth" | "Adults";
  marital: "Single" | "Married";
  interests: string;
  earningTier: string;
}

interface CalculatorHomeProps {
  state: {
    contentType: ContentType;
    format: FormatType;
    quality: QualityType;
    audience: AudienceTypeOption;
    duration: number;
  };
  handlers: {
    setContentType: (v: ContentType) => void;
    setFormat: (v: FormatType) => void;
    setQuality: (v: QualityType) => void;
    setAudience: (v: AudienceTypeOption) => void;
    setDuration: (v: number) => void;
    next: () => void;
  };
}

interface TargetAudienceProps {
  state: {
    audienceType: EntityType;
    location: LocationState;
  };
  handlers: {
    setAudienceType: (v: EntityType) => void;
    setLocation: React.Dispatch<React.SetStateAction<LocationState>>;
    next: () => void;
  };
}

interface DemographicsScreenProps {
  state: DemographicsState;
  handlers: {
    setDemographics: React.Dispatch<React.SetStateAction<DemographicsState>>;
    next: () => void;
  };
}

// --- Shared Components ---

const KineticPillToggle = <T extends string>({ 
  options, 
  value, 
  onChange 
}: { 
  options: T[], 
  value: T, 
  onChange: (v: T) => void 
}) => (
  <div className="flex bg-white border border-[#093463]/20 rounded-[18px] p-1 gap-1 shadow-[0_4px_10px_rgba(9,52,99,0.1)]">
    {options.map((opt) => (
      <button
        key={opt}
        onClick={() => onChange(opt)}
        className={`flex-1 py-2.5 rounded-[14px] text-[13px] font-black uppercase tracking-wider transition-all duration-300 ${
          value === opt 
            ? "bg-[#EE4D2D] text-white shadow-[0_4px_10px_rgba(238,77,45,0.3)]" 
            : "bg-transparent text-[#093463] opacity-60 hover:opacity-100"
        }`}
      >
        {opt}
      </button>
    ))}
  </div>
);

const KineticRadioItem = ({ 
  label, 
  subLabel, 
  isActive, 
  onClick 
}: { 
  label: string, 
  subLabel?: string, 
  isActive: boolean, 
  onClick: () => void 
}) => (
  <button 
    onClick={onClick}
    className="w-full flex items-center justify-between group py-1"
  >
    <div className="flex flex-col items-start">
      <span className={`text-[12px] font-black uppercase tracking-tight ${isActive ? "text-[#093463]" : "text-[#6E7C91]"}`}>
        {label} {subLabel && <span className="font-normal opacity-60 normal-case italic">({subLabel})</span>}
      </span>
    </div>
    <div className={`w-6 h-6 rounded-full border-[2.5px] flex items-center justify-center transition-all ${isActive ? "border-[#EE4D2D]" : "border-[#6E7C91]/30"}`}>
      {isActive && (
        <motion.div 
          layoutId="radio-indicator"
          className="w-3.5 h-3.5 bg-[#EE4D2D] rounded-full" 
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
        />
      )}
    </div>
  </button>
);

const KineticDropdownPill = ({ label, value, onChange, placeholder, onClick }: { 
  label: string, 
  value?: string, 
  onChange?: (v: string) => void,
  placeholder?: string,
  onClick?: () => void 
}) => (
  <div 
    onClick={onClick}
    className="group w-full relative h-14 bg-white border border-[#093463]/20 rounded-[20px] px-5 flex items-center shadow-md shadow-[#093463]/12 active:scale-[0.99] transition-all overflow-hidden"
  >
    <div className="flex-1 flex flex-col justify-center">
      <span className="text-[8px] font-black text-[#6E7C91] uppercase tracking-widest leading-none mb-0.5">{label}</span>
      <input 
        type="text"
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        placeholder={placeholder}
        className="text-[12px] font-black text-[#093463] uppercase tracking-wider bg-transparent outline-none w-full placeholder:opacity-40"
        readOnly={!onChange}
      />
    </div>
    <div className="relative z-10 w-8 h-8 rounded-full bg-[#093463] flex items-center justify-center -mr-1 shadow-[0_2px_4px_rgba(0,0,0,0.2)] flex-shrink-0">
      <DuotoneChevronRight size={16} primary="#FFFFFF" className="rotate-90 translate-x-[1px]" />
    </div>
  </div>
);

const MainActionButton = ({ children, onClick, color = "#093463" }: { children: React.ReactNode, onClick: () => void, color?: string }) => (
  <motion.button
    whileTap={{ scale: 0.96 }}
    onClick={onClick}
    style={{ backgroundColor: color }}
    className="w-full h-[68px] rounded-[24px] text-white font-black uppercase tracking-[0.3em] text-[15px] shadow-[0_12px_24px_rgba(9,52,99,0.2)] active:scale-95 transition-all"
  >
    {children}
  </motion.button>
);

// --- Screen Components ---

export function ContentCalculator() {
  const navigate = useNavigate();
  const [step, setStep] = useState<CalcStep>("Calculator");
  
  // State 
  const [contentType, setContentType] = useState<ContentType>("Advert");
  const [format, setFormat] = useState<FormatType>("Video");
  const [quality, setQuality] = useState<QualityType>("Premium");
  const [audience, setAudience] = useState<AudienceTypeOption>("Targeted");
  const [duration, setDuration] = useState(3);
  const [audienceType, setAudienceType] = useState<EntityType>("Individual");
  const [location, setLocation] = useState<LocationState>({ country: "Zambia", province: "Lusaka", district: "Lusaka", town: "Central", place: "Addis Ababa" });
  const [demographics, setDemographics] = useState<DemographicsState>({
    employment: "Employed", education: "Tertiary", occupation: "Professional", gender: "All", minAge: 18, maxAge: 75,
    lifeStage: "Youth", marital: "Single", interests: "Technology", earningTier: "K3,000 - K9,000"
  });

  const next = () => {
    if (step === "Calculator") setStep("TargetAudience");
    else if (step === "TargetAudience") setStep("Demographics");
    else if (step === "Demographics") setStep("Quote");
    else if (step === "Quote") setStep("Receipt");
  };

  const back = () => {
    if (step === "Calculator") navigate("/wallet");
    else if (step === "TargetAudience") setStep("Calculator");
    else if (step === "Demographics") setStep("TargetAudience");
    else if (step === "Quote") setStep("Demographics");
    else if (step === "Receipt") setStep("Quote");
  };

  return (
    <div className="w-full min-h-screen bg-transparent font-sans text-[#093463] pb-12 selection:bg-[#EE4D2D] selection:text-white overflow-x-hidden">
      <div className="sticky top-0 z-50 bg-transparent">
        <PageHeader 
          showBack 
          onBack={back}
          title="Calculator" 
        />
      </div>

      <div className="px-6 py-4 max-w-md mx-auto">
        <AnimatePresence mode="wait">
          {step === "Calculator" && (
            <CalculatorHome 
              key="calculator"
              state={{ contentType, format, quality, audience, duration }}
              handlers={{ setContentType, setFormat, setQuality, setAudience, setDuration, next }}
            />
          )}
          {step === "TargetAudience" && (
            <TargetAudienceScreen 
              key="audience"
              state={{ audienceType, location }}
              handlers={{ setAudienceType, setLocation, next }}
            />
          )}
          {step === "Demographics" && (
            <DemographicsScreen 
              key="demographics"
              state={demographics}
              handlers={{ setDemographics, next }}
            />
          )}
          {step === "Quote" && (
            <QuoteScreen key="quote" next={next} />
          )}
          {step === "Receipt" && (
            <ReceiptScreen key="receipt" onDone={() => navigate("/wallet")} />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

// 1. Calculator Home
function CalculatorHome({ state, handlers }: CalculatorHomeProps) {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }} 
      animate={{ opacity: 1, scale: 1 }} 
      exit={{ opacity: 0, scale: 1.05 }}
      className="space-y-8"
    >
      <div className="text-center space-y-2">
        <h1 className="text-[32px] font-header font-black leading-tight tracking-tight text-[#093463]">Content Cost Calculator</h1>
        <p className="text-[13px] font-bold text-[#6E7C91] opacity-80 max-w-[280px] mx-auto leading-tight">
          Estimate the cost of creating and posting an advert and educational content.
        </p>
      </div>

      {/* Balance Card - The Navy Box */}
      <div className="bg-[#093463] rounded-[32px] p-8 text-center shadow-2xl shadow-[#093463]/25 relative overflow-hidden group">
        <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none" />
        <h2 className="text-3xl font-header font-black text-white tracking-tight relative z-10">ZMW 2,450.00</h2>
      </div>

      <div className="space-y-6">
        {/* Content Type */}
        <div className="space-y-3">
          <label className="text-[12px] font-black text-[#093463] uppercase tracking-widest pl-2">Content Type</label>
          <KineticPillToggle options={["Advert", "Educational"]} value={state.contentType} onChange={handlers.setContentType} />
        </div>

        {/* Format */}
        <div className="space-y-3">
          <label className="text-[12px] font-black text-[#093463] uppercase tracking-widest pl-2">Format</label>
          <div className="flex gap-3 bg-white border border-[#093463]/20 rounded-[22px] p-1.5 shadow-[0_4px_12px_rgba(9,52,99,0.05)]">
            {(["Video", "Picture", "Audio"] as FormatType[]).map((f) => {
              const isActive = state.format === f;
              return (
                <button
                  key={f}
                  onClick={() => handlers.setFormat(f)}
                  className={`flex-1 py-3.5 rounded-[18px] text-[12px] font-black uppercase tracking-wider transition-all duration-300 ${
                    isActive ? "bg-[#EE4D2D] text-white shadow-lg" : "text-[#093463] opacity-50"
                  }`}
                >
                  {f === "Audio" ? "Audiao" : f}
                </button>
              );
            })}
          </div>
        </div>

        {/* Quality Level */}
        <div className="space-y-4 px-2">
          <label className="text-[12px] font-black text-[#093463] uppercase tracking-widest block">Quality Level</label>
          <div className="space-y-3">
            <KineticRadioItem label="Standard quality" isActive={state.quality === "Standard quality"} onClick={() => handlers.setQuality("Standard quality")} />
            <KineticRadioItem label="Premium" subLabel="780p to 1080p" isActive={state.quality === "Premium"} onClick={() => handlers.setQuality("Premium")} />
            <KineticRadioItem label="High" subLabel="Best quality - HD & 4K" isActive={state.quality === "High"} onClick={() => handlers.setQuality("High")} />
          </div>
        </div>

        {/* Audience */}
        <div className="space-y-3">
          <label className="text-[12px] font-black text-[#093463] uppercase tracking-widest pl-2">Choose Audience</label>
          <KineticPillToggle options={["Targeted", "General"]} value={state.audience} onChange={handlers.setAudience} />
        </div>

        {/* Duration */}
        <div className="space-y-3">
          <label className="text-[12px] font-black text-[#093463] uppercase tracking-widest pl-2">Duration (Days)</label>
          <div className="flex items-center bg-white border border-[#093463]/20 rounded-[22px] overflow-hidden shadow-[0_4px_12px_rgba(9,52,99,0.08)]">
            <button 
              onClick={() => handlers.setDuration(Math.max(1, state.duration - 1))}
              className="w-16 h-14 bg-[#DEE5EF]/30 text-[#093463] flex items-center justify-center active:bg-[#DEE5EF] transition-colors"
            >
              <div className="h-1 w-4 bg-[#093463]" />
            </button>
            <div className="flex-1 text-center font-black text-[22px] text-[#093463]">
              <input 
                type="number" 
                value={state.duration}
                onChange={(e) => handlers.setDuration(parseInt(e.target.value) || 1)}
                className="w-full bg-transparent text-center outline-none border-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
              />
            </div>
            <button 
              onClick={() => handlers.setDuration(state.duration + 1)}
              className="w-16 h-14 bg-[#DEE5EF]/30 text-[#093463] flex items-center justify-center active:bg-[#DEE5EF] transition-colors"
            >
              <DuotonePlus size={20} primary="#093463" />
            </button>
          </div>
        </div>

        <div className="pt-4">
          <MainActionButton onClick={handlers.next}>Calculate Cost</MainActionButton>
        </div>
      </div>
    </motion.div>
  );
}

// 2. Target Audience
function TargetAudienceScreen({ state, handlers }: TargetAudienceProps) {
  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }} 
      animate={{ opacity: 1, x: 0 }} 
      exit={{ opacity: 0, x: -20 }}
      className="space-y-8"
    >
      <div className="text-center space-y-2">
        <h1 className="text-[32px] font-header font-black leading-tight tracking-tight text-[#093463]">Target Audience</h1>
        <p className="text-[13px] font-bold text-[#6E7C91] opacity-80 max-w-[280px] mx-auto leading-tight">
          create a target list to reach more people.
        </p>
      </div>

      <div className="space-y-10">
        <KineticPillToggle options={["Individual", "Business"]} value={state.audienceType} onChange={handlers.setAudienceType} />

        <div className="space-y-4">
          <label className="text-[14px] font-black text-[#093463] tracking-wider pl-2 block">Location</label>
          <div className="space-y-4">
            <KineticDropdownPill label="Country" value={state.location.country} onChange={(v) => handlers.setLocation((p: LocationState) => ({...p, country: v}))} />
            <KineticDropdownPill label="Province" value={state.location.province} onChange={(v) => handlers.setLocation((p: LocationState) => ({...p, province: v}))} />
            <KineticDropdownPill label="District" value={state.location.district} onChange={(v) => handlers.setLocation((p: LocationState) => ({...p, district: v}))} />
            <KineticDropdownPill label="Town" value={state.location.town} onChange={(v) => handlers.setLocation((p: LocationState) => ({...p, town: v}))} />
            <KineticDropdownPill label="Specific Place" value={state.location.place} onChange={(v) => handlers.setLocation((p: LocationState) => ({...p, place: v}))} />
          </div>
        </div>

        <div className="pt-8">
          <MainActionButton onClick={handlers.next}>Save</MainActionButton>
        </div>
      </div>
    </motion.div>
  );
}

// 3. Demographics Detail
function DemographicsScreen({ state, handlers }: DemographicsScreenProps) {
  const update = <K extends keyof DemographicsState>(k: K, v: DemographicsState[K]) => {
    handlers.setDemographics((prev: DemographicsState) => ({ ...prev, [k]: v }));
  };

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }} 
      animate={{ opacity: 1, scale: 1 }} 
      exit={{ opacity: 0, scale: 1.05 }}
      className="space-y-8"
    >
      <h1 className="text-[32px] font-header font-black text-center tracking-tight text-[#093463]">Individual</h1>

      <div className="space-y-6">
        <KineticDropdownPill 
          label="Employed or Not Employed" 
          value={state.employment} 
          onChange={(v) => handlers.setDemographics((p: DemographicsState) => ({...p, employment: v}))} 
        />

        <div className="flex gap-4">
          <button className="flex-1 h-14 bg-white border border-[#093463]/20/20 rounded-[18px] text-[13px] font-bold text-[#6E7C91] uppercase tracking-widest text-center shadow-sm">Education</button>
          <button className="flex-1 h-14 bg-white border border-[#093463]/20/20 rounded-[18px] text-[13px] font-bold text-[#6E7C91] uppercase tracking-widest text-center shadow-sm">Occupation</button>
        </div>

        <div className="space-y-6">
          <label className="text-[14px] font-black text-[#093463] tracking-wider pl-1 block">Demographic Details</label>
          
          <div className="space-y-4">
             <div className="flex items-center justify-between">
                <span className="text-[13px] font-black text-[#6E7C91] opacity-70">Gender</span>
                <div className="flex gap-2">
                  {(["All", "Male", "Female"] as const).map(g => (
                    <button 
                      key={g} 
                      onClick={() => update("gender", g)}
                      className={`px-6 py-3 rounded-[12px] border-[2px] text-[11px] font-black uppercase tracking-widest transition-all ${
                        state.gender === g ? "bg-[#C7D2FE] border-[#093463] text-[#093463] shadow-md" : "bg-white border-[#6E7C91]/20 text-[#6E7C91]"
                      }`}
                    >
                      {g}
                    </button>
                  ))}
                </div>
             </div>

             <div className="flex items-center justify-between gap-4">
                <span className="text-[13px] font-black text-[#6E7C91] opacity-70 whitespace-nowrap">Age Group</span>
                <div className="flex-1 flex gap-2">
                   <div className="flex-1 bg-white border-[2px] border-[#093463] rounded-[14px] p-1 flex items-center justify-center gap-2 shadow-sm">
                      <span className="text-[9px] font-bold text-[#6E7C91] opacity-60">Min age</span>
                      <span className="text-[14px] font-black">{state.minAge}</span>
                   </div>
                   <div className="flex-1 bg-white border-[2px] border-[#093463] rounded-[14px] p-1 flex items-center justify-center gap-2 shadow-sm">
                      <span className="text-[9px] font-bold text-[#6E7C91] opacity-60">Max age</span>
                      <span className="text-[14px] font-black">{state.maxAge}</span>
                   </div>
                </div>
             </div>

             <div className="grid grid-cols-2 gap-y-4 gap-x-2 pt-2">
                {[
                  { id: "Children" as const },
                  { id: "Teens" as const },
                  { id: "Youth" as const },
                  { id: "Adults" as const }
                ].map((stage) => {
                  const isActive = state.lifeStage === stage.id;
                  return (
                    <button 
                      key={stage.id}
                      onClick={() => update("lifeStage", stage.id)}
                      className="flex items-center gap-2 group"
                    >
                      <div className={`w-4 h-4 rounded-full border-[2px] transition-all flex items-center justify-center ${isActive ? "border-[#00D97E]" : "border-[#6E7C91]/30"}`}>
                        {isActive && <div className="w-1.5 h-1.5 bg-[#00D97E] rounded-full" />}
                      </div>
                      <span className={`text-[12px] font-black uppercase tracking-tight ${isActive ? "text-[#00D97E]" : "text-[#6E7C91] opacity-40 group-hover:opacity-100"}`}>
                        {stage.id}
                      </span>
                    </button>
                  );
                })}
             </div>

             <div className="flex items-center justify-between">
                <span className="text-[13px] font-black text-[#6E7C91] opacity-70">Prompt</span>
                <div className="flex gap-2">
                  {(["Single", "Married"] as const).map(m => (
                    <button 
                      key={m} 
                      onClick={() => update("marital", m)}
                      className={`px-10 py-3 rounded-[12px] border-[2px] text-[11px] font-black uppercase tracking-widest transition-all ${
                        state.marital === m ? "bg-[#C7D2FE] border-[#093463] text-[#093463] shadow-md" : "bg-white border-[#6E7C91]/20 text-[#6E7C91]"
                      }`}
                    >
                      {m}
                    </button>
                  ))}
                </div>
             </div>

             <KineticDropdownPill 
               label="Interest" 
               value={state.interests} 
               onChange={(v) => handlers.setDemographics((p: DemographicsState) => ({...p, interests: v}))}
             />
             
             <div className="space-y-2 pt-2">
               <span className="text-[11px] font-black text-[#6E7C91] opacity-60 uppercase tracking-widest">Earning If Employed</span>
               <div className="flex flex-wrap gap-x-3 gap-y-1">
                 {["K1,000 - K3,000", "K3,000 - K9,000", "K9,000 - K18,000", "K18,000 - K30,000"].map(tier => (
                   <button 
                    key={tier} 
                    onClick={() => update("earningTier", tier)}
                    className="flex items-center gap-1 group"
                   >
                     <DuotoneUser size={12} primary={state.earningTier === tier ? "#EE4D2D" : "#6E7C91"} secondaryOpacity={0.2} />
                     <span className={`text-[9px] font-black uppercase tracking-tight transition-colors ${state.earningTier === tier ? "text-[#EE4D2D]" : "text-[#6E7C91] opacity-40"}`}>
                       {tier}
                     </span>
                   </button>
                 ))}
               </div>
             </div>
          </div>
        </div>

        <div className="pt-4">
          <MainActionButton onClick={handlers.next}>Save</MainActionButton>
        </div>
      </div>
    </motion.div>
  );
}

// 4. Quote (Proforma Invoice)
function QuoteScreen({ next }: { next: () => void }) {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }} 
      animate={{ opacity: 1, scale: 1 }} 
      exit={{ opacity: 0, scale: 1.05 }}
      className="space-y-10"
    >
      <h1 className="text-[36px] font-header font-black text-center tracking-tight text-[#093463]">Quote</h1>

      <div className="bg-[#EBF2FA] border-[2px] border-[#093463]/20 rounded-[28px] p-6 shadow-xl relative overflow-hidden group">
        <div className="absolute top-0 inset-x-0 h-[6px] bg-[#EE4D2D]/80" />
        
        <div className="space-y-6">
          <div className="flex flex-col items-center gap-4">
            <div className="w-20 h-20 bg-white rounded-3xl p-4 shadow-xl border-2 border-slate-900 overflow-hidden flex items-center justify-center">
              <img src={kleenchLogo} alt="KLEENCH" className="w-full h-full object-contain" />
            </div>
            <div className="text-center">
              <h2 className="text-[12px] font-black text-[#093463] uppercase tracking-[0.4em]">Proforma Invoice</h2>
              <p className="text-[8px] font-bold text-[#6E7C91] opacity-80 uppercase leading-relaxed mt-1">
                Address: Office 10, Floor 3, Addis Ababa<br/>
                Corporate Block, Lusaka - Zambia<br/>
                Phone No.: +260 975 781 222
              </p>
            </div>
          </div>

          <div className="flex justify-between items-end border-b-[2px] border-[#093463]/10 pb-4">
             <div className="space-y-1">
                <p className="text-[8px] font-black text-[#6E7C91] uppercase opacity-50">Recipient</p>
                <p className="text-[10px] font-black text-[#093463]">Valued Client</p>
             </div>
             <div className="text-right space-y-1">
                <p className="text-[10px] font-black text-[#093463]"><span className="opacity-40 font-bold">INV:</span> KZM00428</p>
                <p className="text-[10px] font-black text-[#093463]"><span className="opacity-40 font-bold">DATE:</span> 15/04/2026</p>
             </div>
          </div>

          <div className="space-y-1">
             <div className="flex text-[9px] font-black text-[#6E7C91] uppercase tracking-widest px-2 py-1 bg-white/40 rounded-t-lg">
                <span className="flex-1">Description</span>
                <span className="w-20 text-right">Total</span>
             </div>
             <div className="space-y-0.5">
               <div className="flex text-[11px] font-bold text-[#093463] p-2 hover:bg-white/40 transition-colors">
                  <span className="flex-1">Advert</span>
                  <span className="w-20 text-right">K20,000.00</span>
               </div>
               <div className="flex text-[11px] font-bold text-[#093463] p-2 hover:bg-white/40 transition-colors">
                  <span className="flex-1">Tip to Viewers</span>
                  <span className="w-20 text-right">K1,000.00</span>
               </div>
               <div className="flex text-[11px] font-bold text-[#093463] p-2 hover:bg-white/40 transition-colors">
                  <span className="flex-1">Commission (15%)</span>
                  <span className="w-20 text-right">K150.00</span>
               </div>
               <div className="flex text-[11px] font-bold text-[#093463]/60 p-2 pt-4 border-t border-[#093463]/5">
                  <span className="flex-1">Subtotal</span>
                  <span className="w-20 text-right">K21,150.00</span>
               </div>
               <div className="flex text-[11px] font-bold text-[#093463]/60 p-2">
                  <span className="flex-1">VAT 16%</span>
                  <span className="w-20 text-right">K104.00</span>
               </div>
               <div className="flex text-[18px] font-header font-black text-[#093463] p-2 pt-4 border-t-[2.5px] border-[#093463]">
                  <span className="flex-1">Total Due</span>
                  <span className="w-28 text-right italic tracking-tighter">K21,254.00</span>
               </div>
             </div>
          </div>
        </div>
      </div>

      <div className="flex gap-3">
        <button onClick={next} className="flex-1 h-16 bg-[#093463] text-white font-black uppercase tracking-wider text-[11px] rounded-[22px] shadow-[0_8px_16px_rgba(9,52,99,0.2)] active:scale-95 transition-all">Save</button>
        <button onClick={next} className="flex-1 h-16 bg-[#093463] text-white font-black uppercase tracking-wider text-[11px] rounded-[22px] shadow-[0_8px_16px_rgba(9,52,99,0.2)] active:scale-95 transition-all">Pay</button>
        <button onClick={next} className="flex-[1.2] h-16 bg-[#093463] text-white font-black uppercase tracking-wider text-[11px] rounded-[22px] shadow-[0_8px_16px_rgba(9,52,99,0.2)] active:scale-95 transition-all">Pay+ Viewers</button>
      </div>
    </motion.div>
  );
}

// 5. Receipt
function ReceiptScreen({ onDone }: { onDone: () => void }) {
  return (
    <motion.div 
      initial={{ opacity: 0, x: -20 }} 
      animate={{ opacity: 1, x: 0 }} 
      exit={{ opacity: 0, x: 20 }}
      className="space-y-10"
    >
      <h1 className="text-[36px] font-header font-black text-center tracking-tight text-[#093463]">Reciept</h1>

      <div className="bg-[#EBF2FA] border-[2px] border-[#093463]/20 rounded-[28px] p-8 shadow-xl relative overflow-hidden group">
        <div className="absolute top-0 inset-x-0 h-[6px] bg-[#00D97E]/80" />
        
        <div className="space-y-8">
          <div className="flex flex-col items-center gap-4">
             <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center shadow-inner">
                <DuotoneCheck size={28} primary="#00D97E" />
             </div>
             <div className="text-center">
              <h2 className="text-[14px] font-black text-[#093463] uppercase tracking-[0.4em]">Tax Invoice / Receipt</h2>
              <p className="text-[8px] font-bold text-[#6E7C91] opacity-70 uppercase leading-relaxed mt-2">
                Order Completed Successfullly<br/>
                Kleench Secure Ledger Payment
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 text-[10px] font-black text-[#093463]/50 border-b-[2px] border-[#093463]/10 pb-6 uppercase tracking-wider">
             <div>
               <p className="text-[#6E7C91] mb-1">Receipt No</p>
               <p className="text-[#093463]">#KRZ00741</p>
             </div>
             <div className="text-right">
               <p className="text-[#6E7C91] mb-1">Status</p>
               <p className="text-[#00D97E]">Verified</p>
             </div>
          </div>

          <div className="space-y-4">
             {[
               { l: "Advert Production", v: "K20,000.00" },
               { l: "Tip to Viewers", v: "K1,000.00" },
               { l: "Commission (15%)", v: "K150.00" },
               { l: "VAT 16%", v: "K104.00" }
             ].map(i => (
               <div key={i.l} className="flex justify-between text-[11px] font-bold">
                  <span className="text-[#6E7C91]">{i.l}</span>
                  <span className="text-[#093463]">{i.v}</span>
               </div>
             ))}
             
             <div className="bg-[#093463] rounded-[20px] p-5 flex justify-between items-center text-white shadow-lg mt-4">
                <span className="text-[12px] font-black uppercase tracking-[0.2em] opacity-60">Gross Total</span>
                <span className="text-2xl font-header font-black italic tracking-tighter text-white">K21,254.00</span>
             </div>
          </div>
          
          <p className="text-center text-[9px] font-bold text-[#6E7C91] opacity-50 uppercase tracking-[0.2em] pt-4">Thank you for your business!</p>
        </div>
      </div>

      <MainActionButton onClick={onDone}>Back</MainActionButton>
    </motion.div>
  );
}
