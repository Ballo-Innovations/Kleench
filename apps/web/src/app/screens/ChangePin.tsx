import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { ArrowLeft, Check } from "lucide-react";
import { motion } from "motion/react";

export function ChangePin() {
  const navigate = useNavigate();
  const [step, setStep] = useState<"current" | "new" | "confirm">("current");
  const [currentPin, setCurrentPin] = useState("");
  const [newPin, setNewPin] = useState("");
  const [confirmPin, setConfirmPin] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleKeyPress = (digit: string) => {
    setError("");
    if (step === "current") {
      if (currentPin.length < 4) {
        const updated = currentPin + digit;
        setCurrentPin(updated);
        if (updated.length === 4) {
          // Validate current PIN (default is 0000)
          if (updated === "0000") {
            setTimeout(() => {
              setStep("new");
              setCurrentPin("");
            }, 200);
          } else {
            setError("Incorrect PIN");
            setTimeout(() => {
              setCurrentPin("");
              setError("");
            }, 1000);
          }
        }
      }
    } else if (step === "new") {
      if (newPin.length < 4) {
        const updated = newPin + digit;
        setNewPin(updated);
        if (updated.length === 4) {
          setTimeout(() => setStep("confirm"), 200);
        }
      }
    } else if (step === "confirm") {
      if (confirmPin.length < 4) {
        const updated = confirmPin + digit;
        setConfirmPin(updated);
        if (updated.length === 4) {
          if (updated === newPin) {
            setSuccess(true);
            setTimeout(() => navigate("/settings"), 1500);
          } else {
            setError("PINs do not match");
            setTimeout(() => {
              setConfirmPin("");
              setNewPin("");
              setStep("new");
              setError("");
            }, 1000);
          }
        }
      }
    }
  };

  const handleDelete = () => {
    setError("");
    if (step === "current") {
      setCurrentPin((prev) => prev.slice(0, -1));
    } else if (step === "new") {
      setNewPin((prev) => prev.slice(0, -1));
    } else if (step === "confirm") {
      setConfirmPin((prev) => prev.slice(0, -1));
    }
  };

  const getCurrentPin = () => {
    if (step === "current") return currentPin;
    if (step === "new") return newPin;
    return confirmPin;
  };

  const getTitle = () => {
    if (step === "current") return "Enter Current PIN";
    if (step === "new") return "Enter New PIN";
    return "Confirm New PIN";
  };

  return (
    <div className="px-4 pb-8 min-h-[80vh] flex flex-col">
      {/* Header */}
      <div className="mb-8 flex items-center gap-4">
        <Link to="/settings">
          <motion.button
            whileTap={{ scale: 0.9 }}
            className="w-10 h-10 rounded-xl bg-[var(--surface-raised)] flex items-center justify-center shadow-sm border border-black/[0.04]"
          >
            <ArrowLeft size={20} className="text-[var(--ink-primary)]" />
          </motion.button>
        </Link>
        <div>
          <h1
            className="font-[var(--font-header)] text-[var(--ink-primary)]"
            style={{ fontSize: "24px", fontWeight: 800, letterSpacing: "-0.02em" }}
          >
            Change PIN
          </h1>
        </div>
      </div>

      {/* PIN Display */}
      <div className="flex-1 flex flex-col items-center justify-center">
        {success ? (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="text-center"
          >
            <div className="w-20 h-20 rounded-full bg-green-500 flex items-center justify-center mb-4 mx-auto">
              <Check size={40} className="text-white" strokeWidth={3} />
            </div>
            <h2 className="font-[var(--font-header)] text-[var(--ink-primary)] text-xl font-bold">
              PIN Changed Successfully
            </h2>
          </motion.div>
        ) : (
          <>
            <h2 className="font-[var(--font-body)] text-[var(--ink-primary)] text-lg font-semibold mb-8">
              {getTitle()}
            </h2>

            {/* PIN Dots */}
            <div className="flex gap-4 mb-4">
              {[0, 1, 2, 3].map((i) => (
                <motion.div
                  key={i}
                  className="w-4 h-4 rounded-full border-2 transition-all duration-200"
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
                className="text-red-500 text-sm font-[var(--font-body)] mb-4"
              >
                {error}
              </motion.p>
            )}

            {/* Keypad */}
            <div className="grid grid-cols-3 gap-4 max-w-xs mx-auto mt-12">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, "", 0, "⌫"].map((key, idx) => {
                if (key === "") return <div key={idx} />;
                return (
                  <motion.button
                    key={idx}
                    whileTap={{ scale: 0.9 }}
                    className="w-20 h-20 rounded-2xl glass-strong shadow-lg border border-black/[0.04] flex items-center justify-center font-[var(--font-header)] text-2xl font-bold text-[var(--ink-primary)]"
                    onClick={() => (key === "⌫" ? handleDelete() : handleKeyPress(String(key)))}
                  >
                    {key}
                  </motion.button>
                );
              })}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
