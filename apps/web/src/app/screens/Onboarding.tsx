import kleenchLogo from "@/assets/bab9fb3e64d4405d56f0e16a36664614cf4a09f8.png";
import { useState } from "react";
import { useNavigate } from "react-router";
import { ShoppingBag, Wallet, Users, GraduationCap, ArrowRight, Camera, Upload, Check } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

type OnboardingStep = "pin" | "confirm-pin" | "photo" | "features";

export function Onboarding() {
  const navigate = useNavigate();
  const [step, setStep] = useState<OnboardingStep>("pin");
  const [pin, setPin] = useState("");
  const [confirmPin, setConfirmPin] = useState("");
  const [error, setError] = useState("");
  const [profilePhoto, setProfilePhoto] = useState<string>("");
  const [currentFeatureStep, setCurrentFeatureStep] = useState(0);

  const featureSteps = [
    {
      icon: ShoppingBag,
      title: "Discover Products",
      description: "Explore curated items from trusted sellers in your community",
      color: "#0077B6",
    },
    {
      icon: Wallet,
      title: "Secure Wallet",
      description: "Manage your finances safely with our built-in wallet system",
      color: "#FFC300",
    },
    {
      icon: Users,
      title: "Connect with Friends",
      description: "Share, recommend, and shop together with your network",
      color: "#7C3AED",
    },
    {
      icon: GraduationCap,
      title: "Learn & Grow",
      description: "Access educational resources to build your business skills",
      color: "#10B981",
    },
  ];

  // PIN Setup handlers
  const handleKeyPress = (digit: string) => {
    setError("");
    if (step === "pin") {
      if (pin.length < 4) {
        const updated = pin + digit;
        setPin(updated);
        if (updated.length === 4) {
          setTimeout(() => setStep("confirm-pin"), 200);
        }
      }
    } else if (step === "confirm-pin") {
      if (confirmPin.length < 4) {
        const updated = confirmPin + digit;
        setConfirmPin(updated);
        if (updated.length === 4) {
          if (updated === pin) {
            // Save PIN to localStorage
            localStorage.setItem("userPin", pin);
            setTimeout(() => setStep("photo"), 300);
          } else {
            setError("PINs do not match");
            setTimeout(() => {
              setConfirmPin("");
              setPin("");
              setStep("pin");
              setError("");
            }, 1000);
          }
        }
      }
    }
  };

  const handleDelete = () => {
    setError("");
    if (step === "pin") {
      setPin((prev) => prev.slice(0, -1));
    } else if (step === "confirm-pin") {
      setConfirmPin((prev) => prev.slice(0, -1));
    }
  };

  // Photo upload handler
  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePhoto(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleContinueFromPhoto = () => {
    if (profilePhoto) {
      // Save profile photo to localStorage
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
      // Complete onboarding
      localStorage.setItem("hasCompletedOnboarding", "true");
      navigate("/");
    }
  };

  const handleSkipFeatures = () => {
    localStorage.setItem("hasCompletedOnboarding", "true");
    navigate("/");
  };

  const getCurrentPin = () => {
    if (step === "pin") return pin;
    return confirmPin;
  };

  const getTitle = () => {
    if (step === "pin") return "Set Your PIN";
    if (step === "confirm-pin") return "Confirm Your PIN";
    if (step === "photo") return "Add Profile Picture";
    return featureSteps[currentFeatureStep].title;
  };

  const getSubtitle = () => {
    if (step === "pin") return "Create a 4-digit PIN to secure your account";
    if (step === "confirm-pin") return "Re-enter your PIN to confirm";
    if (step === "photo") return "Upload a photo to personalize your profile";
    return featureSteps[currentFeatureStep].description;
  };

  const currentFeature = featureSteps[currentFeatureStep];
  const FeatureIcon = currentFeature?.icon;

  return (
    <div className="min-h-screen bg-[var(--clean-slate)] relative flex flex-col">
      {/* Ambient background */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div
          className="absolute -top-32 left-1/2 -translate-x-1/2 w-[600px] h-[300px] opacity-[0.08] rounded-full blur-[100px] transition-colors duration-700"
          style={{ backgroundColor: step === "features" ? currentFeature.color : "var(--trust-blue)" }}
        />
        <div className="absolute bottom-0 right-0 w-[400px] h-[300px] bg-[var(--action-gold)] opacity-[0.04] rounded-full blur-[100px]" />
      </div>

      {/* Skip Button - only show on features step */}
      {step === "features" && (
        <div className="absolute top-4 right-4 z-20">
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={handleSkipFeatures}
            className="px-3 py-1.5 text-xs font-[var(--font-body)] font-semibold text-[var(--ink-secondary)]"
          >
            Skip
          </motion.button>
        </div>
      )}

      <div className="flex-1 flex flex-col items-center justify-center px-4 relative z-10 w-full max-w-md mx-auto">
        {/* Logo */}
        <img
          src={kleenchLogo}
          alt="Kleench Technologies Ltd"
          className="h-10 w-auto object-contain mb-6"
        />

        {/* Title */}
        <AnimatePresence mode="wait">
          <motion.div
            key={step + currentFeatureStep}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="text-center mb-6"
          >
            <h1
              className="font-[var(--font-header)] text-[var(--ink-primary)] mb-1.5"
              style={{ fontSize: "22px", fontWeight: 800, letterSpacing: "-0.02em" }}
            >
              {getTitle()}
            </h1>
            <p className="text-[var(--ink-secondary)] font-[var(--font-body)] text-xs">
              {getSubtitle()}
            </p>
          </motion.div>
        </AnimatePresence>

        {/* Content */}
        <div className="w-full">
          <AnimatePresence mode="wait">
            {/* PIN Setup */}
            {(step === "pin" || step === "confirm-pin") && (
              <motion.div
                key="pin-setup"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="flex flex-col items-center"
              >
                {/* PIN Dots */}
                <div className="flex gap-3 mb-4">
                  {[0, 1, 2, 3].map((i) => (
                    <motion.div
                      key={i}
                      className="w-3 h-3 rounded-full border-2 transition-all duration-200"
                      style={{
                        backgroundColor: getCurrentPin().length > i ? "var(--trust-blue)" : "transparent",
                        borderColor: getCurrentPin().length > i ? "var(--trust-blue)" : "var(--ink-muted)",
                      }}
                      animate={getCurrentPin().length === i ? { scale: [1, 1.2, 1] } : {}}
                      transition={{ duration: 0.2 }}
                    />
                  ))}
                </div>

                {/* Error Message */}
                {error && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-red-500 text-xs font-[var(--font-body)] mb-3"
                  >
                    {error}
                  </motion.p>
                )}

                {/* Keypad */}
                <div className="grid grid-cols-3 gap-3 mt-6">
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, "", 0, "⌫"].map((key, idx) => {
                    if (key === "") return <div key={idx} />;
                    return (
                      <motion.button
                        key={idx}
                        whileTap={{ scale: 0.9 }}
                        className="w-16 h-16 rounded-xl glass-strong shadow-md border border-black/[0.04] flex items-center justify-center font-[var(--font-header)] text-xl font-bold text-[var(--ink-primary)]"
                        onClick={() => (key === "⌫" ? handleDelete() : handleKeyPress(String(key)))}
                      >
                        {key}
                      </motion.button>
                    );
                  })}
                </div>
              </motion.div>
            )}

            {/* Profile Photo Upload */}
            {step === "photo" && (
              <motion.div
                key="photo-upload"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="flex flex-col items-center"
              >
                {/* Photo Preview */}
                <div className="relative mb-6">
                  <div className="w-24 h-24 rounded-full overflow-hidden border-3 border-[var(--trust-blue)] bg-[var(--surface-raised)]">
                    {profilePhoto ? (
                      <img src={profilePhoto} alt="Profile" className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <Camera size={32} className="text-[var(--ink-muted)]" />
                      </div>
                    )}
                  </div>
                  {profilePhoto && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute bottom-0 right-0 w-8 h-8 rounded-full bg-green-500 flex items-center justify-center border-3 border-white"
                    >
                      <Check size={16} className="text-white" strokeWidth={3} />
                    </motion.div>
                  )}
                </div>

                {/* Upload Buttons */}
                <div className="w-full space-y-2.5">
                  <label className="block">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handlePhotoUpload}
                      className="hidden"
                    />
                    <motion.div
                      whileTap={{ scale: 0.98 }}
                      className="w-full py-3 rounded-lg glass-strong border border-black/[0.06] flex items-center justify-center gap-2 font-[var(--font-body)] font-semibold text-[var(--ink-primary)] cursor-pointer text-sm"
                    >
                      <Upload size={16} />
                      Upload Photo
                    </motion.div>
                  </label>

                  <label className="block">
                    <input
                      type="file"
                      accept="image/*"
                      capture="environment"
                      onChange={handlePhotoUpload}
                      className="hidden"
                    />
                    <motion.div
                      whileTap={{ scale: 0.98 }}
                      className="w-full py-3 rounded-lg glass-strong border border-black/[0.06] flex items-center justify-center gap-2 font-[var(--font-body)] font-semibold text-[var(--ink-primary)] cursor-pointer text-sm"
                    >
                      <Camera size={16} />
                      Take Photo
                    </motion.div>
                  </label>
                </div>

                {/* Error */}
                {error && (
                  <p className="text-red-500 text-xs font-[var(--font-body)] mt-3">{error}</p>
                )}

                {/* Continue Button */}
                <motion.button
                  whileTap={{ scale: 0.98 }}
                  onClick={handleContinueFromPhoto}
                  className="w-full mt-5 py-3 rounded-lg bg-[var(--trust-blue)] text-white font-[var(--font-body)] font-semibold shadow-md flex items-center justify-center gap-2 text-sm"
                >
                  Continue
                  <ArrowRight size={16} strokeWidth={2.5} />
                </motion.button>
              </motion.div>
            )}

            {/* Feature Steps */}
            {step === "features" && (
              <motion.div
                key={`feature-${currentFeatureStep}`}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.3 }}
                className="text-center"
              >
                {/* Icon */}
                <div
                  className="w-20 h-20 rounded-2xl mx-auto mb-6 flex items-center justify-center shadow-lg"
                  style={{ backgroundColor: `${currentFeature.color}15` }}
                >
                  <FeatureIcon size={36} style={{ color: currentFeature.color }} strokeWidth={2} />
                </div>

                {/* Progress Dots */}
                <div className="flex gap-2 justify-center mb-6">
                  {featureSteps.map((_, idx) => (
                    <motion.div
                      key={idx}
                      className="h-1.5 rounded-full transition-all duration-300"
                      style={{
                        width: currentFeatureStep === idx ? "24px" : "6px",
                        backgroundColor: currentFeatureStep === idx ? currentFeature.color : "#D1D5DB",
                      }}
                    />
                  ))}
                </div>

                {/* Next Button */}
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={handleFeatureNext}
                  className="w-full py-3 rounded-lg text-white font-[var(--font-body)] font-semibold shadow-md flex items-center justify-center gap-2 text-sm"
                  style={{ backgroundColor: currentFeature.color }}
                >
                  {currentFeatureStep < featureSteps.length - 1 ? "Next" : "Get Started"}
                  <ArrowRight size={16} strokeWidth={2.5} />
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
