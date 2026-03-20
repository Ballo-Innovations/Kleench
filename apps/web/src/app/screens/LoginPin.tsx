import { useState } from "react";
import { useNavigate } from "react-router";
import { motion, AnimatePresence } from "motion/react";
import { BackspaceKey } from "../components/KleenchIcons";
import kleenchLogo from "../../assets/kleench_logo.png";

export function LoginPin() {
  const navigate = useNavigate();
  const [pin, setPin] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // For simulation, let's assume the user's PIN is "0000" if not set
  const savedPin = localStorage.getItem("userPin") || "0000";

  const handleKeyPress = (digit: string) => {
    if (pin.length < 4) {
      const updated = pin + digit;
      setPin(updated);
      setError("");

      if (updated.length === 4) {
        verifyPin(updated);
      }
    }
  };

  const verifyPin = (enteredPin: string) => {
    setIsLoading(true);
    setTimeout(() => {
      if (enteredPin === savedPin) {
        localStorage.setItem("isAuthenticated", "true");
        localStorage.setItem("hasCompletedOnboarding", "true");
        navigate("/");
      } else {
        setError("Incorrect PIN. Please try again.");
        setPin("");
        setIsLoading(false);
      }
    }, 800);
  };

  const handleDelete = () => {
    setPin((prev) => prev.slice(0, -1));
    setError("");
  };

  return (
    <div className="min-h-screen bg-[#fcfcfc] relative flex flex-col font-[var(--font-body)]">
      {/* Ambient background */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 right-0 w-[400px] h-[300px] bg-[#ff8c00] opacity-[0.05] rounded-full blur-[100px]" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[300px] bg-[var(--trust-blue)] opacity-[0.03] rounded-full blur-[100px]" />
        <div className="absolute inset-0 opacity-[0.2]" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(0,0,0,0.05) 1px, transparent 0)', backgroundSize: '16px 16px' }} />
      </div>

      <div className="flex-1 flex flex-col items-center justify-center px-6 relative z-10">
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="mb-12"
        >
          <img src={kleenchLogo} alt="KLEENCH Logo" className="h-16 w-auto object-contain" />
        </motion.div>

        <div className="text-center mb-10">
          <h1
            className="font-[var(--font-header)] text-[#191c1e] mb-2"
            style={{ fontSize: "28px", fontWeight: 800, letterSpacing: "-0.03em", fontFamily: 'Agrandir, sans-serif' }}
          >
            Enter Your PIN
          </h1>
          <p className="text-gray-500 font-medium text-sm">
            Enter your 4-digit security PIN to continue
          </p>
        </div>

        {/* PIN Dots */}
        <div className="flex gap-6 mb-12">
          {[0, 1, 2, 3].map((i) => (
            <motion.div
              key={i}
              className="w-5 h-5 rounded-full border-2 transition-all duration-200"
              style={{
                backgroundColor: pin.length > i ? "#ff8c00" : "transparent",
                borderColor: pin.length > i ? "#ff8c00" : "#e5e7eb",
                boxShadow: pin.length > i ? "0 0 15px rgba(255, 140, 0, 0.4)" : "none"
              }}
              animate={pin.length === i ? { scale: [1, 1.25, 1] } : {}}
              transition={{ duration: 0.2 }}
            />
          ))}
        </div>

        {/* Error Message */}
        <div className="h-6 mb-8">
          <AnimatePresence>
            {error && (
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="text-red-500 text-[13px] font-bold"
              >
                {error}
              </motion.p>
            )}
          </AnimatePresence>
        </div>

        {/* Keypad */}
        <div className="grid grid-cols-3 gap-4 w-full max-w-sm px-4">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, "", 0, "backspace"].map((key, idx) => {
            if (key === "") return <div key={idx} />;
            return (
              <motion.button
                key={idx}
                whileTap={{ scale: 0.9 }}
                disabled={isLoading}
                className="h-20 rounded-2xl bg-white shadow-[0_4px_16_rgba(0,0,0,0.04)] border border-gray-100 flex items-center justify-center font-[var(--font-header)] text-2xl text-[#191c1e] disabled:opacity-50"
                onClick={() => (key === "backspace" ? handleDelete() : handleKeyPress(String(key)))}
              >
                {key === "backspace" ? <BackspaceKey size={26} color="#191c1e" /> : key}
              </motion.button>
            );
          })}
        </div>

        <div className="mt-12">
          <button 
            className="text-[14px] font-bold text-[#ff8c00] hover:text-[#e67e00] transition-colors"
            onClick={() => navigate("/login")}
          >
            Forgot PIN?
          </button>
        </div>
      </div>
    </div>
  );
}
