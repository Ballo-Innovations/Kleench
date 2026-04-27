import kleenchLogo from "../../assets/kleench_logo.png";
import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { Eye, EyeOff } from "lucide-react";
import { motion } from "motion/react";
import { toast } from "sonner";

export function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError("Please fill in all fields.");
      return;
    }
    setError("");
    
    // Auth success actions — returning user, skip onboarding
    localStorage.setItem("isAuthenticated", "true");
    localStorage.setItem("hasCompletedOnboarding", "true");
    
    setTimeout(() => {
      navigate("/");
    }, 200);
  };

  return (
    <div className="min-h-screen bg-[#fcfcfc] relative flex flex-col font-[var(--font-body)]">
      {/* Ambient background */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 right-0 w-[400px] h-[300px] bg-[#ff8c00] opacity-[0.05] rounded-full blur-[100px]" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[300px] bg-[var(--trust-blue)] opacity-[0.03] rounded-full blur-[100px]" />
        <div className="absolute inset-0 opacity-[0.2]" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(0,0,0,0.05) 1px, transparent 0)', backgroundSize: '16px 16px' }} />
      </div>

      <div className="flex-1 flex flex-col items-center justify-center px-6 relative z-10 pt-8">
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12 text-center"
        >
          <div className="mx-auto flex justify-center mb-6">
            <img src={kleenchLogo} alt="KLEENCH Logo" className="h-24 w-auto object-contain" />
          </div>
          <p className="text-gray-500 font-medium text-sm mt-3">
            Welcome back! Sign in to continue
          </p>
        </motion.div>

        {/* Login Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="w-full max-w-sm"
        >
          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-[13px] font-bold text-[#191c1e] mb-2 uppercase tracking-wide">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-5 py-4 rounded-2xl bg-[var(--app-bg)] shadow-[0_2px_12px_rgba(0,0,0,0.03)] border border-gray-100 font-medium text-[#191c1e] focus:outline-none focus:ring-2 focus:ring-[#ff8c00]/30 focus:border-[#ff8c00] transition-all"
                placeholder="your@email.com"
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-[13px] font-bold text-[#191c1e] mb-2 uppercase tracking-wide">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-5 py-4 rounded-2xl bg-[var(--app-bg)] shadow-[0_2px_12px_rgba(0,0,0,0.03)] border border-gray-100 font-medium text-[#191c1e] focus:outline-none focus:ring-2 focus:ring-[#ff8c00]/30 focus:border-[#ff8c00] transition-all"
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 transition-colors"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
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

            {/* Forgot Password */}
            <div className="text-right">
              <button
                type="button"
                onClick={() => toast.info("Password recovery coming soon")}
                className="text-[13px] font-bold text-[#ff8c00]"
              >
                Forgot Password?
              </button>
            </div>

            {/* Login Button */}
            <motion.button
              whileTap={{ scale: 0.96 }}
              type="submit"
              className="w-full py-4 rounded-2xl bg-gradient-to-br from-[#ff8c00] to-[#e67e00] text-white font-[var(--font-header)] font-bold shadow-[0_8px_20px_rgba(255,140,0,0.25)] flex items-center justify-center text-[16px]"
              style={{ fontFamily: 'Agrandir, sans-serif' }}
            >
              Sign In
            </motion.button>
          </form>

          {/* Sign Up Link */}
          <div className="mt-8 text-center bg-[var(--app-bg)]/50 backdrop-blur-sm py-4 rounded-2xl border border-gray-100">
            <p className="text-[13px] font-medium text-gray-500">
              Don't have an account?{" "}
              <Link to="/signup" className="font-bold text-[#ff8c00] ml-1">
                Sign Up
              </Link>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}