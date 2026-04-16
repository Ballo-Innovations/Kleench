import React, { useState } from "react";
import { 
  Check,
} from "lucide-react";
import { 
  DuotoneUser, 
  DuotoneFlag, 
  DuotoneIdCard, 
  DuotoneMapPin, 
  DuotoneCamera, 
  DuotoneUpload, 
  DuotoneBuilding, 
  DuotoneSmartphone, 
  DuotoneBriefcase, 
  DuotoneUsers,
  DuotoneChevronRight
} from "./DuotoneIcon";
import { motion, AnimatePresence } from "motion/react";

interface KycData {
  fullName: string;
  gender: string;
  nationality: string;
  nrcPassport: string;
  docs: { nrc: boolean; tpin: boolean; residence: boolean; selfie: boolean };
  town: string;
  residentialAddress: string;
  bankName: string;
  accNum: string;
  accConfirmNum: string;
  accName: string;
  branchCode: string;
  sortCode: string;
  momoPhone: string;
  momoConfirmPhone: string;
  cardNumber: string;
  cardExpiry: string;
  cardCvv: string;
  cardPin: string;
  employmentStatus: string;
  workPlace: string;
  workAddress: string;
  kinName: string;
  kinRelation: string;
  kinPhone: string;
  consentIdentity: boolean;
  consentData: boolean;
  marketSectors: string;
  products: string;
  hobbies: string;
}

interface KycFlowProps {
  onClose: () => void;
  onComplete: (data: KycData) => void;
  externalStage: number;
  onStageChange: (stage: number) => void;
  isUpdate?: boolean;
}

type KycStage = "Bio" | "Financial" | "Employment" | "Interests";

const STAGES: KycStage[] = ["Bio", "Financial", "Employment", "Interests"];

export function KycFlow({ onComplete, externalStage: currentStage, onStageChange: setCurrentStage, isUpdate = false }: KycFlowProps) {
  const [formData, setFormData] = useState<KycData>(() => {
    const saved = localStorage.getItem("userKyc");
    if (saved) {
      try {
        return { ...JSON.parse(saved) };
      } catch (e) {
        console.error("Failed to parse saved KYC data", e);
      }
    }
    return {
      fullName: "",
      gender: "",
      nationality: "Zambian",
      nrcPassport: "",
      docs: { nrc: false, tpin: false, residence: false, selfie: false },
      town: "",
      residentialAddress: "",
      bankName: "",
      accNum: "",
      accConfirmNum: "",
      accName: "",
      branchCode: "",
      sortCode: "",
      momoPhone: "",
      momoConfirmPhone: "",
      cardNumber: "",
      cardExpiry: "",
      cardCvv: "",
      cardPin: "",
      employmentStatus: "",
      workPlace: "",
      workAddress: "",
      kinName: "",
      kinRelation: "",
      kinPhone: "+260",
      consentIdentity: false,
      consentData: false,
      marketSectors: "",
      products: "",
      hobbies: ""
    };
  });

  const nextStage = () => {
    if (currentStage < STAGES.length - 1) {
      setCurrentStage(currentStage + 1);
    } else {
      onComplete(formData);
    }
  };

  const prevStage = () => {
    if (currentStage > 0) {
      setCurrentStage(currentStage - 1);
    }
  };

  const updateForm = (key: keyof KycData, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [key]: value }));
  };

  const updateDoc = (key: string) => {
    setFormData(prev => ({ 
      ...prev, 
      docs: { ...prev.docs, [key as keyof typeof prev.docs]: true } 
    }));
  };

  return (
    <div className="flex flex-col h-full bg-transparent font-sans text-[#003366]">
      {/* ── Progress Rhythm ── */}
      <div className="px-5 pt-8 mb-6">
        <h1 className="text-[#003366] text-3xl font-black text-center tracking-tighter mb-1 select-none">KYC</h1>
        <p className="text-gray-400 text-[10px] font-bold text-center uppercase tracking-widest leading-none mb-8">
          {currentStage === 3 ? "Tell us your interests to receive relevant adverts." : 
           currentStage === 2 ? "Provide additional information to complete your profile" :
           currentStage === 1 ? "Complete verification to unlock full wallet access." :
           "Complete verification to unlock full wallet access."}
        </p>

        <div className="flex gap-2 w-full h-8 items-end px-2">
          {["Bio", "Bank & Mobile Detail", "Occupation", "Interests"].map((stage, idx) => (
            <div key={stage} className="flex-1 flex flex-col items-center">
              <span className={`text-[7px] font-black uppercase tracking-tighter mb-2 transition-colors duration-500 whitespace-nowrap ${idx === currentStage ? "text-[#00C853]" : "text-gray-400"}`}>
                {stage}
              </span>
              <div className={`h-[5px] w-full rounded-full transition-all duration-700 ${idx <= currentStage ? "bg-[#00C853]" : "bg-gray-200"}`} />
            </div>
          ))}
        </div>
      </div>

      {/* Stage Container */}
      <div className="flex-1 px-4 relative z-10 overflow-y-auto">
        <AnimatePresence mode="wait">
          {currentStage === 0 && (
            <motion.div 
              key="bio" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }}
              className="space-y-6 pb-12"
            >
              <div className="bg-gray-200 rounded-full py-2.5 px-6 mb-6">
                <span className="font-black text-[#003366] text-[11px] uppercase tracking-widest">Personal Details</span>
              </div>

              <div className="space-y-4">
                <InputGroup icon={DuotoneUser} label="" placeholder="Full Name" value={formData.fullName} onChange={v => updateForm("fullName", v)} />
                
                <div className="border border-slate-300 rounded-xl h-14 flex items-center overflow-hidden bg-white">
                  <div className="w-14 h-full flex items-center justify-center border-r border-slate-300">
                    <DuotoneUsers size={24} />
                  </div>
                  <div className="flex-1 flex items-center px-4 gap-6">
                    <span className="text-gray-400 font-bold text-sm">Gender</span>
                    <div className="flex gap-4">
                      {["Male", "Female"].map(g => (
                        <button key={g} onClick={() => updateForm("gender", g)} className="flex items-center gap-2">
                          <div className={`w-4 h-4 rounded-full border-2 border-gray-300 flex items-center justify-center ${formData.gender === g ? "bg-[#00C853] border-[#00C853]" : ""}`} />
                          <span className="text-gray-400 font-bold text-sm">{g}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <InputGroup icon={DuotoneFlag} label="" placeholder="Nationality" value={formData.nationality} onChange={v => updateForm("nationality", v)} />
                <InputGroup icon={DuotoneIdCard} label="" placeholder="NRC or Passport No." value={formData.nrcPassport} onChange={v => updateForm("nrcPassport", v)} />
                
                <div className="grid grid-cols-2 gap-x-8 gap-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold text-gray-500 w-16 leading-tight">NRC or Passport</span>
                    <button onClick={() => updateDoc("nrc")} className="flex-1 bg-white border-2 border-[#003366] rounded-xl h-12 flex items-center justify-center gap-2 shadow-[2px_2px_0px_#003366] active:translate-y-0.5 active:shadow-none transition-all">
                      <DuotoneUpload size={20} />
                      <span className="text-[#003366] font-black text-sm">Upload</span>
                    </button>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold text-gray-500 w-16 leading-tight">TPIN Certificate</span>
                    <button onClick={() => updateDoc("tpin")} className="flex-1 bg-white border-2 border-[#003366] rounded-xl h-12 flex items-center justify-center gap-2 shadow-[2px_2px_0px_#003366] active:translate-y-0.5 active:shadow-none transition-all">
                      <DuotoneUpload size={20} />
                      <span className="text-[#003366] font-black text-sm">Upload</span>
                    </button>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold text-gray-500 w-16 leading-tight">Proof Of Residence</span>
                    <button onClick={() => updateDoc("residence")} className="flex-1 bg-white border-2 border-[#003366] rounded-xl h-12 flex items-center justify-center gap-2 shadow-[2px_2px_0px_#003366] active:translate-y-0.5 active:shadow-none transition-all">
                      <DuotoneMapPin size={20} />
                      <span className="text-[#003366] font-black text-sm">Upload</span>
                    </button>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold text-gray-500 w-16 leading-tight">Take Face ID</span>
                    <button onClick={() => updateDoc("selfie")} className="flex-1 bg-white border-2 border-[#003366] rounded-xl h-12 flex items-center justify-center gap-2 shadow-[2px_2px_0px_#003366] active:translate-y-0.5 active:shadow-none transition-all">
                      <DuotoneCamera size={24} />
                    </button>
                  </div>
                </div>

                <InputGroup icon={DuotoneBuilding} label="" placeholder="Town" value={formData.town} onChange={v => updateForm("town", v)} />
                <InputGroup icon={DuotoneMapPin} label="" placeholder="Address" value={formData.residentialAddress} onChange={v => updateForm("residentialAddress", v)} />
              </div>
            </motion.div>
          )}

          {currentStage === 1 && (
            <motion.div 
              key="financial" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }}
              className="space-y-4 pb-12"
            >
              <div className="bg-gray-200 rounded-full py-2.5 px-6 mb-6">
                <span className="font-black text-[#003366] text-[11px] uppercase tracking-widest">Add Bank Details</span>
              </div>
              
              <div className="space-y-4">
                <InputGroup icon={DuotoneBuilding} label="" placeholder="Name Of Bank" value={formData.bankName} onChange={v => updateForm("bankName", v)} />
                <InputGroup label="" placeholder="Account Number" value={formData.accNum} onChange={v => updateForm("accNum", v)} />
                <InputGroup label="" placeholder="Confirm Account Number" value={formData.accConfirmNum} onChange={v => updateForm("accConfirmNum", v)} />
                <InputGroup label="" placeholder="Account Name" value={formData.accName} onChange={v => updateForm("accName", v)} />
                
                <div className="flex gap-4 items-center">
                  <span className="text-[10px] font-black text-gray-400 uppercase w-12 leading-none">sort code</span>
                  <div className="flex-1">
                    <input type="text" placeholder="***" className="w-full h-12 border border-slate-300 rounded-xl px-4 text-center font-bold text-[#003366] outline-none" value={formData.sortCode} onChange={e => updateForm("sortCode", e.target.value)} />
                  </div>
                  <span className="text-[10px] font-black text-gray-400 uppercase w-12 leading-none">branch code</span>
                  <div className="flex-1">
                    <input type="text" placeholder="****" className="w-full h-12 border border-slate-300 rounded-xl px-4 text-center font-bold text-[#003366] outline-none" value={formData.branchCode} onChange={e => updateForm("branchCode", e.target.value)} />
                  </div>
                </div>

                <InputGroup label="" placeholder="Card Number" value={formData.cardNumber} onChange={v => updateForm("cardNumber", v)} />
                
                <div className="flex gap-4 items-center">
                  <span className="text-[10px] font-black text-gray-400 uppercase leading-none">Expire Date</span>
                  <input type="text" placeholder="MM/YY" className="w-24 h-12 border border-slate-300 rounded-xl px-4 text-center font-bold text-[#003366] outline-none" value={formData.cardExpiry} onChange={e => updateForm("cardExpiry", e.target.value)} />
                  <span className="text-[10px] font-black text-gray-400 uppercase leading-none">CVV</span>
                  <input type="text" placeholder="***" className="w-16 h-12 border border-slate-300 rounded-xl px-4 text-center font-bold text-[#003366] outline-none" value={formData.cardCvv} onChange={e => updateForm("cardCvv", e.target.value)} />
                  <span className="text-[10px] font-black text-gray-400 uppercase leading-none">PIN</span>
                  <input type="password" placeholder="****" className="w-20 h-12 border border-slate-300 rounded-xl px-4 text-center font-bold text-[#003366] outline-none" value={formData.cardPin} onChange={e => updateForm("cardPin", e.target.value)} />
                </div>

                <InputGroup icon={DuotoneSmartphone} label="" placeholder="your MOMO Phone number" value={formData.momoPhone} onChange={v => updateForm("momoPhone", v)} />
                <InputGroup label="" placeholder="Confirm Phone Number" value={formData.momoConfirmPhone} onChange={v => updateForm("momoConfirmPhone", v)} />
                <InputGroup label="" placeholder="Name Bearer" value={formData.kinName} onChange={v => updateForm("kinName", v)} />
              </div>
            </motion.div>
          )}

          {currentStage === 2 && (
            <motion.div 
              key="employment" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }}
              className="space-y-4 pb-12"
            >
              <div className="bg-gray-200 rounded-full py-2.5 px-6 mb-6">
                <span className="font-black text-[#003366] text-[11px] uppercase tracking-widest">Employment</span>
              </div>
              
              <div className="space-y-3">
                <InputGroup label="" placeholder="Employed or Not Employed" value={formData.employmentStatus} onChange={v => updateForm("employmentStatus", v)} icon={DuotoneBriefcase} />
                
                <div className="px-4">
                  <p className="text-[12px] font-bold text-gray-400 mb-1 leading-none">Earning If Employed</p>
                  <p className="text-[10px] font-bold text-[#00C853] leading-none mb-1">
                    🤏 K1,000 - K3,000 | 🤏 K3,000 - K9,000 | 🤏 K9,000 - K18,000
                  </p>
                  <p className="text-[10px] font-bold text-[#00C853] leading-none">
                    🤏 K18,000 - K30,000
                  </p>
                </div>

                <InputGroup label="" placeholder="Work Place / Department" value={formData.workPlace} onChange={v => updateForm("workPlace", v)} icon={DuotoneChevronRight} />
                <InputGroup label="" placeholder="Work Address" value={formData.workAddress} onChange={v => updateForm("workAddress", v)} icon={DuotoneChevronRight} />

                <div className="pt-2">
                  <InputGroup label="Next Of Kin Full Name" placeholder="" value={formData.kinName} onChange={v => updateForm("kinName", v)} icon={DuotoneChevronRight} />
                </div>
                <InputGroup label="" placeholder="Relationship" value={formData.kinRelation} onChange={v => updateForm("kinRelation", v)} icon={DuotoneChevronRight} />

                {/* Prefix Pill Input */}
                <div className="border border-slate-300 rounded-xl h-14 flex items-center overflow-hidden bg-white group focus-within:border-[#003366] transition-all">
                  <div className="w-16 h-full flex items-center justify-center bg-gray-50 border-r border-slate-300">
                    <span className="text-gray-500 font-bold text-sm">+260</span>
                  </div>
                  <input 
                    type="text" 
                    placeholder="Phone Number" 
                    value={formData.kinPhone.replace("+260", "")}
                    onChange={e => updateForm("kinPhone", "+260" + e.target.value)}
                    className="flex-1 h-full px-5 text-lg font-medium text-[#003366] outline-none placeholder-gray-300" 
                  />
                  <div className="w-10 h-full flex items-center justify-center border-l border-slate-300">
                    <DuotoneChevronRight size={24} />
                  </div>
                </div>

                <InputGroup label="" placeholder="NRC or Passport No." value={formData.nrcPassport} onChange={v => updateForm("nrcPassport", v)} icon={DuotoneIdCard} />
              </div>

              <div className="mb-4 mt-6">
                <p className="font-bold text-gray-400 text-xs uppercase tracking-widest ml-1">Agreement</p>
              </div>

              <div className="space-y-3 px-2">
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 border-2 border-[#003366] bg-black rounded flex items-center justify-center shadow-md">
                    <Check size={18} className="text-white" strokeWidth={4} />
                  </div>
                  <span className="text-[11px] font-bold text-gray-400">i consent to identity verification</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 border-2 border-[#003366] bg-black rounded flex items-center justify-center shadow-md">
                    <Check size={18} className="text-white" strokeWidth={4} />
                  </div>
                  <span className="text-[11px] font-bold text-gray-400">I agree to the processing of my personal data according to the applicable laws.</span>
                </div>
              </div>
            </motion.div>
          )}

          {currentStage === 3 && (
            <motion.div 
              key="interests" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }}
              className="space-y-4 pb-12"
            >
              <div className="bg-gray-200 rounded-full py-2.5 px-6 mb-6">
                <span className="font-black text-[#003366] text-[11px] uppercase tracking-widest">Advertising Preferences</span>
              </div>
              
              <div className="px-2 mb-4">
                <p className="text-[11px] font-bold text-gray-500 leading-tight">Please answer a few quations to receive relevant adverts</p>
              </div>

              <div className="space-y-5">
                <div className="space-y-2">
                  <p className="text-[12px] font-black text-gray-500 ml-1">1. What market sectors are you most interested in?</p>
                  <InputGroup label="" placeholder="Agriculture, Construction, Logistics & Transport" value={formData.marketSectors} onChange={v => updateForm("marketSectors", v)} icon={DuotoneChevronRight} />
                </div>
                
                <div className="space-y-2">
                  <p className="text-[12px] font-black text-gray-500 ml-1">2. What Products interested in buying and selling?</p>
                  <InputGroup label="" placeholder="Equipment & Machinery, Truck Spares, Fuel" value={formData.products} onChange={v => updateForm("products", v)} icon={DuotoneChevronRight} />
                </div>

                <div className="space-y-2">
                  <p className="text-[12px] font-black text-gray-500 ml-1">3. What Educational content are you interested in?</p>
                  <InputGroup label="" placeholder="Academic Material, Business intelegence, general knowledge" value={formData.hobbies} onChange={v => updateForm("hobbies", v)} icon={DuotoneChevronRight} />
                </div>
              </div>

              <div className="mb-4 mt-8">
                <p className="font-bold text-gray-400 text-xs uppercase tracking-widest ml-1">Hobbies</p>
              </div>

              <div className="space-y-2">
                <p className="text-[12px] font-black text-gray-500 ml-1">1. Share your hobbies or interests <span className="text-[#00C853]">(optional)</span></p>
                <InputGroup label="" placeholder="Reading, Sport, Traveling, jogging, football," value={formData.kinName} onChange={v => updateForm("kinName", v)} icon={DuotoneChevronRight} />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Screenshot Footer */}
      <div className="p-4 bg-white/80 backdrop-blur-md border-t border-gray-100 flex gap-4 pb-24">
        {currentStage > 0 && (
          <motion.button 
            whileTap={{ scale: 0.95 }}
            onClick={prevStage}
            className="flex-1 h-11 bg-white text-[#F24E1E] rounded-full flex items-center justify-center font-bold text-sm transition-all border-2 border-[#F24E1E] shadow-[0_3px_0px_#BF3B17] active:shadow-none active:translate-y-[2px]"
          >
            Previous
          </motion.button>
        )}
        <motion.button 
          whileTap={{ scale: 0.95 }}
          onClick={nextStage}
          className={`${currentStage > 0 ? 'flex-[2]' : 'w-full'} h-11 bg-[#F24E1E] text-white rounded-full flex items-center justify-center font-black uppercase tracking-widest text-[11px] transition-all shadow-[0_3px_0px_#BF3B17] active:shadow-none active:translate-y-[2px]`}
        >
          {currentStage === 3 ? (isUpdate ? "Update Verification" : "Continue") : currentStage === 2 ? (isUpdate ? "Update Info" : "Submit") : "Next"}
        </motion.button>
      </div>
    </div>
  );
}

// --- Helpers ---

interface InputGroupProps {
  icon?: React.ElementType;
  label: string;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  isLarge?: boolean;
}

function InputGroup({ icon: Icon, label, placeholder, value, onChange }: InputGroupProps) {
  return (
    <div className="w-full">
      {label && <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.1em] mb-2 block ml-1">{label}</label>}
      <div className="border border-slate-300 rounded-xl h-14 flex items-center overflow-hidden bg-white group focus-within:border-[#003366] transition-all">
        {Icon && (
          <div className="w-14 h-full flex items-center justify-center border-r border-slate-300">
            <Icon size={24} />
          </div>
        )}
        <input 
          type="text" 
          value={value} 
          onChange={e => onChange(e.target.value)} 
          placeholder={placeholder} 
          className="flex-1 h-full px-5 text-lg font-medium text-[#003366] outline-none placeholder-gray-300" 
        />
      </div>
    </div>
  );
}
