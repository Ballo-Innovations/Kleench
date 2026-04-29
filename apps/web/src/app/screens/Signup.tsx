import kleenchLogo from "../../assets/kleench_logo.png";
import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { Eye, EyeOff } from "lucide-react";
import { motion } from "motion/react";
import { GlobalBackground } from "../components/GlobalBackground";

export function Signup() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [error, setError] = useState("");

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password || !confirmPassword) {
      setError("Please fill in all fields.");
      return;
    }
    if (password.length < 8) {
      setError("Password must be at least 8 characters");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    setError("");
    
    localStorage.setItem("isAuthenticated", "true");
    localStorage.setItem("userEmail", email);
    setTimeout(() => {
      navigate("/onboarding");
    }, 500);
  };

  return (
    <div className="min-h-screen bg-transparent relative flex flex-col font-[var(--font-body)]">
      <GlobalBackground />

      <div className="flex-1 flex flex-col items-center py-12 px-6 relative z-10">
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 text-center"
        >
          <div className="mx-auto flex justify-center mb-6">
            <img src={kleenchLogo} alt="KLEENCH Logo" className="h-20 w-auto object-contain" />
          </div>
          <h1
            className="font-[var(--font-header)] text-[var(--app-text)]"
            style={{ fontSize: "32px", fontWeight: 800, letterSpacing: "-0.03em", fontFamily: 'Agrandir, sans-serif' }}
          >
            Create Account
          </h1>
          <p className="text-[var(--muted-foreground)] font-medium text-sm mt-3">
            Join Kleench today
          </p>
        </motion.div>

        {/* Signup Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="w-full max-w-sm"
        >
          <form onSubmit={handleSignup} className="space-y-4">


            {/* Email */}
            <div>
              <label className="block text-[13px] font-bold text-[var(--app-text)] mb-2 uppercase tracking-wide">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-5 py-3.5 rounded-2xl bg-[var(--app-bg)] shadow-[0_2px_12px_rgba(0,0,0,0.03)] border border-[var(--border)] font-medium text-[var(--app-text)] focus:outline-none focus:ring-2 focus:ring-[#ff8c00]/30 focus:border-[#ff8c00] transition-all"
                placeholder="your@email.com"
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-[13px] font-bold text-[var(--app-text)] mb-2 uppercase tracking-wide">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-5 py-3.5 rounded-2xl bg-[var(--app-bg)] shadow-[0_2px_12px_rgba(0,0,0,0.03)] border border-[var(--border)] font-medium text-[var(--app-text)] focus:outline-none focus:ring-2 focus:ring-[#ff8c00]/30 focus:border-[#ff8c00] transition-all"
                  placeholder="At least 8 characters"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-[var(--muted-foreground)] transition-colors"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-[13px] font-bold text-[var(--app-text)] mb-2 uppercase tracking-wide">
                Confirm Password
              </label>
              <div className="relative">
                <input
                  type={showConfirm ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full px-5 py-3.5 rounded-2xl bg-[var(--app-bg)] shadow-[0_2px_12px_rgba(0,0,0,0.03)] border border-[var(--border)] font-medium text-[var(--app-text)] focus:outline-none focus:ring-2 focus:ring-[#ff8c00]/30 focus:border-[#ff8c00] transition-all"
                  placeholder="Confirm your password"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirm(!showConfirm)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-[var(--muted-foreground)] transition-colors"
                >
                  {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="px-4 py-3 rounded-xl bg-red-50 border border-red-200"
              >
                <p className="text-red-600 text-sm font-[var(--font-body)]">{error}</p>
              </motion.div>
            )}

            {/* Sign Up Button */}
            <motion.button
              whileTap={{ scale: 0.96 }}
              type="submit"
              className="w-full py-4 rounded-2xl bg-gradient-to-br from-[#ff8c00] to-[#e67e00] text-white font-[var(--font-header)] font-bold shadow-[0_8px_20px_rgba(255,140,0,0.25)] flex items-center justify-center text-[16px] mt-6"
              style={{ fontFamily: 'Agrandir, sans-serif' }}
            >
              Create Account
            </motion.button>
          </form>

          {/* Login Link */}
          <div className="mt-8 text-center bg-[var(--app-bg)]/50 backdrop-blur-sm py-4 rounded-2xl border border-[var(--border)]">
            <p className="text-[13px] font-medium text-[var(--muted-foreground)]">
              Already have an account?{" "}
              <Link to="/login" className="font-bold text-[#ff8c00] ml-1">
                Sign In
              </Link>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
