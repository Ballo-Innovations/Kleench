import kleenchLogo from "@/assets/bab9fb3e64d4405d56f0e16a36664614cf4a09f8.png";
import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { Eye, EyeOff } from "lucide-react";
import { motion } from "motion/react";

export function Signup() {
  const navigate = useNavigate();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [error, setError] = useState("");

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!fullName || !email || !password || !confirmPassword) {
      setError("Please fill in all fields");
      return;
    }

    if (password.length < 8) {
      setError("Password must be at least 8 characters");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    // Simulate signup - set authentication status and navigate to onboarding
    localStorage.setItem("isAuthenticated", "true");
    localStorage.setItem("userName", fullName);
    
    setTimeout(() => {
      navigate("/onboarding");
    }, 500);
  };

  return (
    <div className="min-h-screen bg-[var(--clean-slate)] relative flex flex-col">
      {/* Ambient background */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[var(--trust-blue)] opacity-[0.06] rounded-full blur-[100px]" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[300px] bg-[var(--action-gold)] opacity-[0.04] rounded-full blur-[100px]" />
      </div>

      <div className="flex-1 flex flex-col items-center justify-center px-4 py-8 relative z-10 w-full max-w-md mx-auto">
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 text-center"
        >
          <img
            src={kleenchLogo}
            alt="Kleench Technologies Ltd"
            className="h-12 w-auto object-contain mx-auto mb-2"
          />
          <h1
            className="font-[var(--font-header)] text-[var(--ink-primary)]"
            style={{ fontSize: "22px", fontWeight: 800, letterSpacing: "-0.02em" }}
          >
            Create Account
          </h1>
          <p className="text-[var(--ink-secondary)] font-[var(--font-body)] text-xs mt-1">
            Join KLEENCH today
          </p>
        </motion.div>

        {/* Signup Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="w-full"
        >
          <form onSubmit={handleSignup} className="space-y-3">
            {/* Full Name */}
            <div>
              <label className="block text-xs font-[var(--font-body)] font-semibold text-[var(--ink-primary)] mb-1.5">
                Full Name
              </label>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full px-3 py-2.5 rounded-lg glass-strong border border-black/[0.06] font-[var(--font-body)] text-[var(--ink-primary)] text-sm focus:outline-none focus:ring-2 focus:ring-[var(--trust-blue)] focus:border-transparent"
                placeholder="John Doe"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-xs font-[var(--font-body)] font-semibold text-[var(--ink-primary)] mb-1.5">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2.5 rounded-lg glass-strong border border-black/[0.06] font-[var(--font-body)] text-[var(--ink-primary)] text-sm focus:outline-none focus:ring-2 focus:ring-[var(--trust-blue)] focus:border-transparent"
                placeholder="your@email.com"
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-xs font-[var(--font-body)] font-semibold text-[var(--ink-primary)] mb-1.5">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-lg glass-strong border border-black/[0.06] font-[var(--font-body)] text-[var(--ink-primary)] text-sm focus:outline-none focus:ring-2 focus:ring-[var(--trust-blue)] focus:border-transparent"
                  placeholder="At least 8 characters"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--ink-muted)]"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-xs font-[var(--font-body)] font-semibold text-[var(--ink-primary)] mb-1.5">
                Confirm Password
              </label>
              <div className="relative">
                <input
                  type={showConfirm ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-lg glass-strong border border-black/[0.06] font-[var(--font-body)] text-[var(--ink-primary)] text-sm focus:outline-none focus:ring-2 focus:ring-[var(--trust-blue)] focus:border-transparent"
                  placeholder="Confirm your password"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirm(!showConfirm)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--ink-muted)]"
                >
                  {showConfirm ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="px-3 py-2.5 rounded-lg bg-red-50 border border-red-200"
              >
                <p className="text-red-600 text-xs font-[var(--font-body)]">{error}</p>
              </motion.div>
            )}

            {/* Sign Up Button */}
            <motion.button
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="w-full py-3 rounded-lg bg-[var(--trust-blue)] text-white font-[var(--font-body)] font-semibold shadow-md mt-1 text-sm"
            >
              Create Account
            </motion.button>
          </form>

          {/* Login Link */}
          <div className="mt-5 text-center">
            <p className="text-xs font-[var(--font-body)] text-[var(--ink-secondary)]">
              Already have an account?{" "}
              <Link to="/login" className="font-semibold text-[var(--trust-blue)]">
                Sign In
              </Link>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
