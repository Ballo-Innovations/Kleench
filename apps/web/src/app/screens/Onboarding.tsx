import kleenchLogo from "@/assets/kleench_logo.png";
import { useState } from "react";
import { useNavigate } from "react-router";
import { ArrowRight, Camera, Upload, Check } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { ZambiaFlag, BackspaceKey } from "../components/KleenchIcons";
import { LottieAnimation } from "../components/LottieAnimation";

type OnboardingStep = "pin" | "confirm-pin" | "kyc" | "photo" | "features";

export function Onboarding() {
  const navigate = useNavigate();
  const [step, setStep] = useState<OnboardingStep>("pin");
  const [pin, setPin] = useState("");
  const [confirmPin, setConfirmPin] = useState("");
  const [error, setError] = useState("");
  const [profilePhoto, setProfilePhoto] = useState<string>("");
  const [currentFeatureStep, setCurrentFeatureStep] = useState(0);
  const [kycName, setKycName] = useState("");
  const [kycFullName, setKycFullName] = useState("");
  const [kycPhone, setKycPhone] = useState("");
  const [isWhatsappSame, setIsWhatsappSame] = useState(true);
  const [kycWhatsappPhone, setKycWhatsappPhone] = useState("");

  const featureSteps = [
    { 
      lottie: "https://lottie.host/67634898-3850-488f-9d33-9114757c2a7a/2vYhE1jE2f.json", 
      title: "Discover Products", 
      description: "Explore curated items from trusted sellers in your community", 
      color: "#0077B6" 
    },
    { 
      lottie: "https://lottie.host/9e0d16c9-0a6e-4cc8-a0f5-5a507a21350a/m2hE1kF3gR.json", 
      title: "Secure Wallet", 
      description: "Manage your finances safely with our built-in wallet system", 
      color: "#FFC300" 
    },
    { 
      lottie: "https://lottie.host/6a51d455-2591-447a-8531-1e35f585d85d/f7hE1jD2fR.json", 
      title: "Connect with Friends", 
      description: "Share, recommend, and shop together with your network", 
      color: "#7C3AED" 
    },
    { 
      lottie: "https://lottie.host/79a8368d-56a8-444f-bc45-8bc25585f9ca/1Y1vF1mX4Y.json", 
      title: "Learn & Grow", 
      description: "Access educational resources to build your business skills", 
      color: "#10B981" 
    },
  ];

  const handleKeyPress = (digit: string) => {
    setError("");
    if (step === "pin") {
      if (pin.length < 4) {
        const updated = pin + digit;
        setPin(updated);
        if (updated.length === 4) setTimeout(() => setStep("confirm-pin"), 200);
      }
    } else if (step === "confirm-pin") {
      if (confirmPin.length < 4) {
        const updated = confirmPin + digit;
        setConfirmPin(updated);
        if (updated.length === 4) {
          if (updated === pin) {
            localStorage.setItem("userPin", pin);
            setTimeout(() => setStep("kyc"), 300);
          } else {
            setError("PINs do not match");
            setTimeout(() => { setConfirmPin(""); setPin(""); setStep("pin"); setError(""); }, 1000);
          }
        }
      }
    }
  };

  const handleDelete = () => {
    setError("");
    if (step === "pin") setPin((p) => p.slice(0, -1));
    else if (step === "confirm-pin") setConfirmPin((p) => p.slice(0, -1));
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setProfilePhoto(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleKycSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!kycName || !kycFullName || !kycPhone) {
      setError("Please fill in all required fields");
      return;
    }
    setError("");
    const kycData = {
      userName: kycName,
      fullName: kycFullName,
      phone: kycPhone,
      whatsappPhone: isWhatsappSame ? kycPhone : kycWhatsappPhone,
      email: localStorage.getItem("userEmail") || ""
    };
    localStorage.setItem("userKyc", JSON.stringify(kycData));
    setStep("photo");
  };

  const handleContinueFromPhoto = () => {
    if (profilePhoto) {
      localStorage.setItem("userProfilePhoto", profilePhoto);
      setStep("features");
    } else {
      setError("Please upload a profile picture");
    }
  };

  const handleFeatureNext = () => {
    if (currentFeatureStep < featureSteps.length - 1) {
      setCurrentFeatureStep(currentFeatureStep + 1);
    } else {
      localStorage.setItem("hasCompletedOnboarding", "true");
      navigate("/");
    }
  };

  const handleSkipFeatures = () => {
    localStorage.setItem("hasCompletedOnboarding", "true");
    navigate("/");
  };

  const getCurrentPin = () => (step === "pin" ? pin : confirmPin);

  const currentFeature = featureSteps[currentFeatureStep];


  // Step progress
  const stepIndex = { pin: 0, "confirm-pin": 0, kyc: 1, photo: 2, features: 3 }[step];

  return (
    <div className="min-h-screen bg-[#fcfcfc] relative flex flex-col overflow-hidden font-[var(--font-body)]">
      {/* Ambient background */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div
          className="absolute -top-32 left-1/2 -translate-x-1/2 w-[700px] h-[350px] opacity-[0.05] rounded-full blur-[120px] transition-colors duration-700"
          style={{ backgroundColor: step === "features" ? currentFeature.color : "#ff8c00" }}
        />
        <div className="absolute bottom-0 right-0 w-[400px] h-[300px] bg-[var(--trust-blue)] opacity-[0.03] rounded-full blur-[100px]" />
        {/* subtle grid */}
        <div className="absolute inset-0 opacity-20" style={{
          backgroundImage: "radial-gradient(circle at 1px 1px, rgba(0,0,0,0.05) 1px, transparent 0)",
          backgroundSize: "16px 16px"
        }} />
      </div>

      {/* Progress bar */}
      {(step !== "features") && (
        <div className="fixed top-0 left-0 right-0 z-20 h-1 bg-black/[0.05]">
          <motion.div
            className="h-full bg-[#ff8c00] origin-left"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: (stepIndex + 1) / 5 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          />
        </div>
      )}

      {/* Skip / Back actions */}
      {step === "features" && (
        <div className="absolute top-6 right-6 z-20">
          <motion.button whileTap={{ scale: 0.9 }} onClick={handleSkipFeatures}
            className="px-4 py-2 rounded-full bg-black/[0.05] font-semibold text-[var(--ink-secondary)]"
            style={{ fontSize: "13px" }}>
            Skip
          </motion.button>
        </div>
      )}

      <div className="flex-1 flex flex-col items-center justify-center px-6 relative z-10 pt-10">
        {/* Logo */}
        <motion.div
           className="mx-auto flex justify-center mb-8"
           initial={{ opacity: 0, y: -20 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.5 }}
        >
          <img src={kleenchLogo} alt="KLEENCH Logo" className="h-16 w-auto object-contain" />
        </motion.div>

        <AnimatePresence mode="wait">
          <motion.div
            key={step + currentFeatureStep}
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 16 }}
            className="text-center mb-8"
          >
              <h1
                className="font-[var(--font-header)] text-[#191c1e] mb-2"
                style={{ fontSize: "28px", fontWeight: 800, letterSpacing: "-0.03em", fontFamily: 'Agrandir, sans-serif' }}
              >
                {step === "pin" && "Set Your PIN"}
                {step === "confirm-pin" && "Confirm Your PIN"}
                {step === "kyc" && "Complete Your Profile"}
                {step === "photo" && "Add Profile Picture"}
                {step === "features" && currentFeature.title}
              </h1>
              <p className="text-gray-500 font-medium" style={{ fontSize: "14px" }}>
                {step === "pin" && "Create a 4-digit PIN to secure your account"}
                {step === "confirm-pin" && "Re-enter your PIN to confirm"}
                {step === "kyc" && "Provide some details to verify your identity"}
                {step === "photo" && "Upload a photo to personalize your profile"}
                {step === "features" && currentFeature.description}
              </p>
          </motion.div>
        </AnimatePresence>

        {/* Content */}
        <div className="w-full max-w-sm">
          <AnimatePresence mode="wait">

            {/* PIN Setup */}
            {(step === "pin" || step === "confirm-pin") && (
              <motion.div key="pin-setup"
                initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }}
                className="flex flex-col items-center">
                <div className="flex gap-4 mb-6">
                  {[0, 1, 2, 3].map((i) => (
                    <motion.div key={i}
                      className="w-5 h-5 rounded-full border-2 transition-all duration-200"
                      style={{
                        backgroundColor: getCurrentPin().length > i ? "#ff8c00" : "transparent",
                        borderColor: getCurrentPin().length > i ? "#ff8c00" : "#e5e7eb",
                      }}
                      animate={getCurrentPin().length === i ? { scale: [1, 1.3, 1] } : {}}
                      transition={{ duration: 0.2 }}
                    />
                  ))}
                </div>
                {error && (
                  <motion.p initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
                    className="text-red-500 font-[var(--font-body)] mb-4" style={{ fontSize: "13px" }}>
                    {error}
                  </motion.p>
                )}
                <div className="grid grid-cols-3 gap-3 mt-6 w-full">
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, "", 0, "backspace"].map((key, idx) => {
                    if (key === "") return <div key={idx} />;
                    return (
                      <motion.button key={idx} whileTap={{ scale: 0.88 }}
                        className="h-16 rounded-2xl glass-strong shadow-md border border-black/[0.04] flex items-center justify-center font-[var(--font-header)] text-[var(--ink-primary)]"
                        style={{ fontSize: "22px", fontWeight: 800 }}
                        onClick={() => key === "backspace" ? handleDelete() : handleKeyPress(String(key))}>
                        {key === "backspace" ? <BackspaceKey size={22} color="var(--ink-primary)" /> : key}
                      </motion.button>
                    );
                  })}
                </div>
              </motion.div>
            )}

            {/* KYC Setup */}
            {step === "kyc" && (
              <motion.div key="kyc-setup"
                initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
                className="w-full">
                <form onSubmit={handleKycSubmit} className="space-y-4">
                  <div>
                    <label className="block text-[12px] font-bold text-[#191c1e] mb-1.5 uppercase tracking-wide">User Name *</label>
                    <input type="text" value={kycName} onChange={(e) => setKycName(e.target.value)} required
                      className="w-full px-4 py-3.5 rounded-xl bg-white shadow-sm border border-gray-100 font-medium text-[#191c1e] outline-none focus:ring-2 focus:ring-[#ff8c00]/30 transition-all placeholder-gray-300" placeholder="e.g. johndoe99" />
                  </div>
                  <div>
                    <label className="block text-[12px] font-bold text-[#191c1e] mb-1.5 uppercase tracking-wide">Full Legal Name *</label>
                    <input type="text" value={kycFullName} onChange={(e) => setKycFullName(e.target.value)} required
                      className="w-full px-4 py-3.5 rounded-xl bg-white shadow-sm border border-gray-100 font-medium text-[#191c1e] outline-none focus:ring-2 focus:ring-[#ff8c00]/30 transition-all placeholder-gray-300" placeholder="As it appears on your ID" />
                  </div>
                  <div>
                    <label className="block text-[12px] font-bold text-[#191c1e] mb-1.5 uppercase tracking-wide">Phone Number *</label>
                    <div className="flex gap-2">
                      <div className="flex items-center gap-1.5 px-3 py-3 rounded-xl bg-white border border-gray-100 shadow-sm">
                        <ZambiaFlag size={20} />
                        <span className="font-bold text-gray-500 text-[14px]">+260</span>
                      </div>
                      <input type="tel" value={kycPhone} onChange={(e) => setKycPhone(e.target.value.replace(/\D/g, "").slice(0, 10))} required
                        className="flex-1 px-4 py-3 rounded-xl bg-white shadow-sm border border-gray-100 font-medium text-[#191c1e] outline-none focus:ring-2 focus:ring-[#ff8c00]/30 transition-all placeholder-gray-300" placeholder="9X XXX XXXX" />
                    </div>
                  </div>

                  {/* WhatsApp Sync Toggle */}
                  <div className="bg-[#f8f9fa] p-4 rounded-xl border border-gray-100 flex items-center justify-between">
                     <div className="flex flex-col text-left">
                        <span className="text-[11px] font-black uppercase tracking-widest text-[#191c1e]">WhatsApp Number</span>
                        <span className="text-[9px] font-bold text-gray-400 uppercase tracking-tighter mt-0.5">Is it the same as your phone?</span>
                     </div>
                     <button 
                       type="button"
                       onClick={() => setIsWhatsappSame(!isWhatsappSame)}
                       className={`w-12 h-6 rounded-full p-1 transition-colors duration-300 ${isWhatsappSame ? 'bg-[#00C853]' : 'bg-gray-200'}`}
                     >
                        <motion.div 
                          animate={{ x: isWhatsappSame ? 24 : 0 }}
                          className="w-4 h-4 bg-white rounded-full shadow-sm"
                        />
                     </button>
                  </div>

                  <AnimatePresence>
                    {!isWhatsappSame && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                      >
                        <div className="pt-2">
                           <div className="flex gap-2">
                              <div className="flex items-center gap-1.5 px-3 py-3 rounded-xl bg-white border border-gray-100 shadow-sm">
                                <ZambiaFlag size={20} />
                                <span className="font-bold text-gray-500 text-[14px]">+260</span>
                              </div>
                              <input 
                                type="tel" 
                                value={kycWhatsappPhone} 
                                onChange={(e) => setKycWhatsappPhone(e.target.value.replace(/\D/g, "").slice(0, 10))} 
                                required={!isWhatsappSame}
                                className="flex-1 px-4 py-3 rounded-xl bg-white shadow-sm border border-gray-100 font-medium text-[#191c1e] outline-none focus:ring-2 focus:ring-[#ff8c00]/30 transition-all placeholder-gray-300" 
                                placeholder="WhatsApp Number" 
                              />
                           </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                  {error && <p className="text-red-500 font-bold mb-3 text-center" style={{ fontSize: "13px" }}>{error}</p>}
                  <motion.button whileTap={{ scale: 0.97 }} type="submit"
                    className="w-full py-4 rounded-2xl bg-gradient-to-br from-[#ff8c00] to-[#e67e00] text-white font-[var(--font-header)] shadow-[0_8px_20px_rgba(255,140,0,0.25)] flex items-center justify-center gap-2 mt-4"
                    style={{ fontSize: "16px", fontWeight: 800, fontFamily: 'Agrandir, sans-serif' }}>
                    Continue <ArrowRight size={18} strokeWidth={2.5} />
                  </motion.button>
                </form>
              </motion.div>
            )}

            {/* Profile Photo */}
            {step === "photo" && (
              <motion.div key="photo-upload"
                initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }}
                className="flex flex-col items-center">
                <div className="relative mb-7">
                  <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-[#ff8c00] bg-white shadow-xl">
                    {profilePhoto ? (
                      <img src={profilePhoto} alt="Profile" className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <Camera size={44} className="text-gray-300" />
                      </div>
                    )}
                  </div>
                  {profilePhoto && (
                    <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}
                      transition={{ type: "spring", bounce: 0.5 }}
                      className="absolute bottom-0 right-0 w-10 h-10 rounded-full bg-green-500 flex items-center justify-center border-4 border-white shadow-md">
                      <Check size={18} className="text-white" strokeWidth={3} />
                    </motion.div>
                  )}
                </div>
                <div className="w-full space-y-3 mb-6">
                  <label className="block">
                    <input type="file" accept="image/*" onChange={handlePhotoUpload} className="hidden" />
                    <motion.div whileTap={{ scale: 0.98 }}
                      className="w-full py-4 rounded-2xl glass-strong border border-black/[0.06] flex items-center justify-center gap-3 font-[var(--font-body)] font-semibold text-[var(--ink-primary)] cursor-pointer shadow-sm">
                      <Upload size={18} />
                      Upload Photo
                    </motion.div>
                  </label>
                  <label className="block">
                    <input type="file" accept="image/*" capture="environment" onChange={handlePhotoUpload} className="hidden" />
                    <motion.div whileTap={{ scale: 0.98 }}
                      className="w-full py-4 rounded-2xl glass-strong border border-black/[0.06] flex items-center justify-center gap-3 font-[var(--font-body)] font-semibold text-[var(--ink-primary)] cursor-pointer shadow-sm">
                      <Camera size={18} />
                      Take Photo
                    </motion.div>
                  </label>
                </div>
                {error && <p className="text-red-500 font-bold mb-3 text-center" style={{ fontSize: "13px" }}>{error}</p>}
                <motion.button whileTap={{ scale: 0.97 }} onClick={handleContinueFromPhoto}
                  className="w-full py-4 rounded-2xl bg-gradient-to-br from-[#ff8c00] to-[#e67e00] text-white font-[var(--font-header)] shadow-[0_8px_20px_rgba(255,140,0,0.25)] flex items-center justify-center gap-2"
                  style={{ fontSize: "16px", fontWeight: 800, fontFamily: 'Agrandir, sans-serif' }}>
                  Continue <ArrowRight size={18} strokeWidth={2.5} />
                </motion.button>
              </motion.div>
            )}





            {/* Feature Steps */}
            {step === "features" && (
              <motion.div key={`feature-${currentFeatureStep}`}
                initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.3 }}
                className="text-center">
                <div
                  className="w-48 h-48 mx-auto mb-8 flex items-center justify-center"
                >
                  <LottieAnimation 
                    src={currentFeature.lottie} 
                    className="w-full h-full"
                  />
                </div>
                <div className="flex gap-2 justify-center mb-8">
                  {featureSteps.map((_, idx) => (
                    <motion.div key={idx}
                      className="h-2 rounded-full transition-all duration-300"
                      style={{
                        width: currentFeatureStep === idx ? "32px" : "8px",
                        backgroundColor: currentFeatureStep === idx ? currentFeature.color : "#D1D5DB",
                      }} />
                  ))}
                </div>
                <motion.button whileTap={{ scale: 0.95 }} onClick={handleFeatureNext}
                  className="w-full py-4 rounded-2xl text-white font-[var(--font-header)] shadow-lg flex items-center justify-center gap-2"
                  style={{ fontSize: "15px", fontWeight: 800, backgroundColor: currentFeature.color }}>
                  {currentFeatureStep < featureSteps.length - 1 ? "Next" : "Get Started"}
                  <ArrowRight size={18} strokeWidth={2.5} />
                </motion.button>
              </motion.div>
            )}

          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
