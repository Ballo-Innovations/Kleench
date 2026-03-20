import kleenchLogo from "../../assets/kleench_logo.png";
import mtnLogo from "../../assets/MTN.jpeg";
import airtelLogo from "../../assets/airtel_logo.webp";
import zamtelLogo from "../../assets/zamtel_logo.png";
import zedLogo from "../../assets/zed_mobile_logo.png";
import { useState } from "react";
import { useNavigate } from "react-router";
import { ShoppingBag, Wallet, Users, GraduationCap, ArrowRight, Camera, Upload, Check, Smartphone } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

type OnboardingStep = "pin" | "confirm-pin" | "kyc" | "photo" | "mobile-money" | "features";

const MM_PROVIDERS = [
  { id: "airtel", name: "Airtel Money", shortName: "Airtel", color: "#E40513", bg: "#FFF1F2", logo: airtelLogo },
  { id: "mtn", name: "MTN Mobile Money", shortName: "MTN", color: "#F5A623", bg: "#FFFBEB", logo: mtnLogo },
  { id: "zamtel", name: "Zamtel Mobile Money", shortName: "Zamtel", color: "#00843D", bg: "#F0FDF4", logo: zamtelLogo },
  { id: "zed", name: "Zed Mobile", shortName: "Zed", color: "#0077B6", bg: "#EFF6FF", logo: zedLogo },
];

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
  const [kycPhoneCall, setKycPhoneCall] = useState("");
  const [kycPhoneWhatsapp, setKycPhoneWhatsapp] = useState("");
  const [kycEmail, setKycEmail] = useState("");
  // Mobile money state
  const [mmProvider, setMMProvider] = useState<(typeof MM_PROVIDERS)[0] | null>(null);
  const [mmName, setMMName] = useState("");
  const [mmPhone, setMMPhone] = useState("");
  const [mmStep, setMMStep] = useState<"provider" | "details">("provider");
  const [mmError, setMMError] = useState("");

  const featureSteps = [
    { icon: ShoppingBag, title: "Discover Products", description: "Explore curated items from trusted sellers in your community", color: "#0077B6" },
    { icon: Wallet, title: "Secure Wallet", description: "Manage your finances safely with our built-in wallet system", color: "#FFC300" },
    { icon: Users, title: "Connect with Friends", description: "Share, recommend, and shop together with your network", color: "#7C3AED" },
    { icon: GraduationCap, title: "Learn & Grow", description: "Access educational resources to build your business skills", color: "#10B981" },
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
    if (!kycName || !kycFullName || !kycPhoneCall || !kycEmail) {
      setError("Please fill in all required fields");
      return;
    }
    setError("");
    const kycData = {
      userName: kycName,
      fullName: kycFullName,
      phoneCall: kycPhoneCall,
      phoneWhatsapp: kycPhoneWhatsapp || kycPhoneCall,
      email: kycEmail
    };
    localStorage.setItem("userKyc", JSON.stringify(kycData));
    setStep("photo");
  };

  const handleContinueFromPhoto = () => {
    if (profilePhoto) {
      localStorage.setItem("userProfilePhoto", profilePhoto);
      setStep("mobile-money");
    } else {
      setError("Please upload a profile picture");
    }
  };

  const handleMMProviderNext = () => {
    if (!mmProvider) { setMMError("Please select a provider"); return; }
    setMMError("");
    setMMStep("details");
  };

  const handleMMSubmit = () => {
    if (!mmName.trim()) { setMMError("Please enter your name"); return; }
    if (!mmPhone.trim() || mmPhone.length < 9) { setMMError("Please enter a valid phone number"); return; }
    setMMError("");
    const account = {
      id: Date.now().toString(),
      provider: mmProvider!.id,
      providerName: mmProvider!.name,
      name: mmName.trim(),
      number: mmPhone.trim(),
      isPrimary: true,
      color: mmProvider!.color,
      bg: mmProvider!.bg,
    };
    localStorage.setItem("kleench_mobile_money", JSON.stringify([account]));
    setStep("features");
  };

  const skipMobileMoney = () => setStep("features");

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
  const FeatureIcon = currentFeature?.icon;

  // Step progress
  const stepIndex = { pin: 0, "confirm-pin": 0, kyc: 1, photo: 2, "mobile-money": 3, features: 4 }[step];

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
            animate={{ scaleX: (stepIndex + 1) / 4 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          />
        </div>
      )}

      {/* Skip / Back actions */}
      {step === "features" && (
        <div className="absolute top-6 right-6 z-20">
          <motion.button whileTap={{ scale: 0.9 }} onClick={handleSkipFeatures}
            className="px-4 py-2 rounded-full bg-black/[0.05] font-[var(--font-body)] font-semibold text-[var(--ink-secondary)]"
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

        {/* Title */}
        <AnimatePresence mode="wait">
          {step !== "mobile-money" && (
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
          )}
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
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, "", 0, "⌫"].map((key, idx) => {
                    if (key === "") return <div key={idx} />;
                    return (
                      <motion.button key={idx} whileTap={{ scale: 0.88 }}
                        className="h-16 rounded-2xl glass-strong shadow-md border border-black/[0.04] flex items-center justify-center font-[var(--font-header)] text-[var(--ink-primary)]"
                        style={{ fontSize: "22px", fontWeight: 800 }}
                        onClick={() => key === "⌫" ? handleDelete() : handleKeyPress(String(key))}>
                        {key}
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
                      className="w-full px-4 py-3 rounded-xl bg-white shadow-sm border border-gray-100 font-medium text-[#191c1e] outline-none focus:ring-2 focus:ring-[#ff8c00]/30 transition-all placeholder-gray-300" placeholder="e.g. johndoe99" />
                  </div>
                  <div>
                    <label className="block text-[12px] font-bold text-[#191c1e] mb-1.5 uppercase tracking-wide">Full Name *</label>
                    <input type="text" value={kycFullName} onChange={(e) => setKycFullName(e.target.value)} required
                      className="w-full px-4 py-3 rounded-xl bg-white shadow-sm border border-gray-100 font-medium text-[#191c1e] outline-none focus:ring-2 focus:ring-[#ff8c00]/30 transition-all placeholder-gray-300" placeholder="John Doe" />
                  </div>
                  <div>
                    <label className="block text-[12px] font-bold text-[#191c1e] mb-1.5 uppercase tracking-wide">Email *</label>
                    <input type="email" value={kycEmail} onChange={(e) => setKycEmail(e.target.value)} required
                      className="w-full px-4 py-3 rounded-xl bg-white shadow-sm border border-gray-100 font-medium text-[#191c1e] outline-none focus:ring-2 focus:ring-[#ff8c00]/30 transition-all placeholder-gray-300" placeholder="your@email.com" />
                  </div>
                  <div>
                    <label className="block text-[12px] font-bold text-[#191c1e] mb-1.5 uppercase tracking-wide">Phone (Calls) *</label>
                    <input type="tel" value={kycPhoneCall} onChange={(e) => setKycPhoneCall(e.target.value)} required
                      className="w-full px-4 py-3 rounded-xl bg-white shadow-sm border border-gray-100 font-medium text-[#191c1e] outline-none focus:ring-2 focus:ring-[#ff8c00]/30 transition-all placeholder-gray-300" placeholder="+260 9X XXX XXXX" />
                  </div>
                  <div>
                    <label className="block text-[12px] font-bold text-[#191c1e] mb-1.5 uppercase tracking-wide">Phone (WhatsApp)</label>
                    <input type="tel" value={kycPhoneWhatsapp} onChange={(e) => setKycPhoneWhatsapp(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-white shadow-sm border border-gray-100 font-medium text-[#191c1e] outline-none focus:ring-2 focus:ring-[#ff8c00]/30 transition-all placeholder-gray-300" placeholder="+260 9X XXX XXXX (Optional)" />
                  </div>
                  {error && <p className="text-red-500 font-bold mb-3 text-center" style={{ fontSize: "13px" }}>{error}</p>}
                  <motion.button whileTap={{ scale: 0.97 }} type="submit"
                    className="w-full py-4 rounded-2xl bg-gradient-to-br from-[#ff8c00] to-[#e67e00] text-white font-[var(--font-header)] shadow-[0_8px_20px_rgba(255,140,0,0.25)] flex items-center justify-center gap-2 mt-2"
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

            {/* Mobile Money Setup */}
            {step === "mobile-money" && (
              <motion.div key="mobile-money"
                initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -40 }}
                className="flex flex-col w-full">

                <AnimatePresence mode="wait">
                  {mmStep === "provider" && (
                    <motion.div key="mm-provider" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                      <div className="mb-5 text-center">
                        <div className="w-14 h-14 rounded-2xl bg-[#ff8c00]/10 flex items-center justify-center mx-auto mb-3">
                          <Smartphone size={26} className="text-[#ff8c00]" strokeWidth={2} />
                        </div>
                        <h2 className="font-[var(--font-header)] text-[#191c1e] mb-1"
                          style={{ fontSize: "22px", fontWeight: 800, letterSpacing: "-0.02em", fontFamily: 'Agrandir, sans-serif' }}>
                          Link Mobile Money
                        </h2>
                        <p className="text-gray-500 font-medium" style={{ fontSize: "13px" }}>
                          Enable deposits & withdrawals by linking your mobile money account
                        </p>
                      </div>

                      <div className="grid grid-cols-2 gap-3 mb-5">
                        {MM_PROVIDERS.map((prov) => (
                          <motion.button key={prov.id} whileTap={{ scale: 0.95 }}
                            onClick={() => setMMProvider(prov)}
                            className="relative p-4 rounded-2xl border-2 flex flex-col items-center gap-2 transition-all"
                            style={{
                              borderColor: mmProvider?.id === prov.id ? prov.color : "rgba(0,0,0,0.07)",
                              backgroundColor: mmProvider?.id === prov.id ? prov.bg : "white",
                            }}>
                            {mmProvider?.id === prov.id && (
                              <div className="absolute top-2 right-2 w-5 h-5 rounded-full flex items-center justify-center"
                                style={{ backgroundColor: prov.color }}>
                                <Check size={11} className="text-white" strokeWidth={3} />
                              </div>
                            )}
                            <div className="w-12 h-12 rounded-xl overflow-hidden mb-1 flex items-center justify-center">
                              <img src={prov.logo} alt={prov.name} className="w-full h-full object-contain" />
                            </div>
                            <p className="font-[var(--font-header)] text-[var(--ink-primary)] text-center"
                              style={{ fontSize: "12px", fontWeight: 800 }}>{prov.shortName}</p>
                          </motion.button>
                        ))}
                      </div>

                      {mmError && <p className="text-red-500 text-center mb-3" style={{ fontSize: "12px" }}>{mmError}</p>}

                      <motion.button whileTap={{ scale: 0.97 }} onClick={handleMMProviderNext}
                        className="w-full py-4 rounded-2xl text-white font-[var(--font-header)] shadow-[0_8px_16px_rgba(0,0,0,0.1)] mb-3"
                        style={{ fontSize: "15px", fontWeight: 800, fontFamily: 'Agrandir, sans-serif', backgroundColor: mmProvider?.color || "#ff8c00" }}>
                        Next →
                      </motion.button>
                      <button onClick={skipMobileMoney}
                        className="w-full py-3 font-medium text-gray-400 text-center"
                        style={{ fontSize: "13px", fontWeight: 500 }}>
                        I'll do this later
                      </button>
                    </motion.div>
                  )}

                  {mmStep === "details" && (
                    <motion.div key="mm-details" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                      <button onClick={() => setMMStep("provider")}
                        className="flex items-center gap-1.5 font-[var(--font-body)] text-[var(--trust-blue)] mb-4"
                        style={{ fontSize: "12px", fontWeight: 600 }}>
                        ← Back
                      </button>
                      <div className="flex items-center gap-3 mb-5">
                        <div className="w-12 h-12 rounded-2xl flex items-center justify-center overflow-hidden"
                          style={{ backgroundColor: mmProvider?.bg }}>
                          <img src={mmProvider?.logo} alt={mmProvider?.name} className="w-full h-full object-contain" />
                        </div>
                        <div>
                          <h3 className="font-[var(--font-header)] text-[var(--ink-primary)]"
                            style={{ fontSize: "17px", fontWeight: 900 }}>{mmProvider?.name}</h3>
                          <p className="font-[var(--font-body)] text-[var(--ink-muted)]" style={{ fontSize: "11px" }}>Enter account details</p>
                        </div>
                      </div>

                      <div className="space-y-4 mb-5">
                        <div>
                          <label className="font-[var(--font-body)] text-[var(--ink-secondary)] block mb-1.5"
                            style={{ fontSize: "12px", fontWeight: 600 }}>Account Holder Name</label>
                          <input type="text" placeholder="Your full name" value={mmName}
                            onChange={(e) => setMMName(e.target.value)}
                            className="w-full px-4 py-3.5 rounded-xl bg-[var(--surface-raised)] border border-black/[0.06] font-[var(--font-body)] text-[var(--ink-primary)] outline-none"
                            style={{ fontSize: "14px" }} />
                        </div>
                        <div>
                          <label className="font-[var(--font-body)] text-[var(--ink-secondary)] block mb-1.5"
                            style={{ fontSize: "12px", fontWeight: 600 }}>Phone Number</label>
                          <div className="flex gap-2">
                            <div className="flex items-center gap-1.5 px-3 py-3.5 rounded-xl bg-[var(--surface-raised)] border border-black/[0.06]">
                              <span style={{ fontSize: "13px" }}>🇿🇲</span>
                              <span className="font-[var(--font-body)] text-[var(--ink-secondary)]" style={{ fontSize: "13px", fontWeight: 600 }}>+260</span>
                            </div>
                            <input type="tel" placeholder="9X XXX XXXX" value={mmPhone}
                              onChange={(e) => setMMPhone(e.target.value.replace(/\D/g, "").slice(0, 10))}
                              className="flex-1 px-4 py-3.5 rounded-xl bg-[var(--surface-raised)] border border-black/[0.06] font-[var(--font-body)] text-[var(--ink-primary)] outline-none"
                              style={{ fontSize: "14px" }} />
                          </div>
                        </div>
                      </div>

                      {mmError && <p className="text-red-500 text-center mb-3" style={{ fontSize: "12px" }}>{mmError}</p>}

                      <motion.button whileTap={{ scale: 0.97 }} onClick={handleMMSubmit}
                        className="w-full py-4 rounded-2xl text-white font-[var(--font-header)] shadow-[0_8px_16px_rgba(0,0,0,0.1)] mb-3"
                        style={{ fontSize: "15px", fontWeight: 800, fontFamily: 'Agrandir, sans-serif', backgroundColor: mmProvider?.color || "#ff8c00" }}>
                        Link & Continue
                      </motion.button>
                      <button onClick={skipMobileMoney}
                        className="w-full py-3 font-medium text-gray-400 text-center"
                        style={{ fontSize: "13px", fontWeight: 500 }}>
                        Skip for now
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )}

            {/* Feature Steps */}
            {step === "features" && (
              <motion.div key={`feature-${currentFeatureStep}`}
                initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.3 }}
                className="text-center">
                <div
                  className="w-24 h-24 rounded-3xl mx-auto mb-8 flex items-center justify-center shadow-xl"
                  style={{ backgroundColor: `${currentFeature.color}15` }}>
                  <FeatureIcon size={46} style={{ color: currentFeature.color }} strokeWidth={2} />
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
