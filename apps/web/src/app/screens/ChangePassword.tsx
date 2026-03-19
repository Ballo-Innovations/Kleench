import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { ArrowLeft, Eye, EyeOff, Check } from "lucide-react";
import { motion } from "motion/react";

export function ChangePassword() {
  const navigate = useNavigate();
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!currentPassword || !newPassword || !confirmPassword) {
      setError("All fields are required");
      return;
    }

    if (newPassword.length < 8) {
      setError("Password must be at least 8 characters");
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("New passwords do not match");
      return;
    }

    // Simulate password change
    setSuccess(true);
    setTimeout(() => navigate("/settings"), 1500);
  };

  return (
    <div className="px-4 pb-8">
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
            Change Password
          </h1>
        </div>
      </div>

      {success ? (
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="text-center py-12"
        >
          <div className="w-20 h-20 rounded-full bg-green-500 flex items-center justify-center mb-4 mx-auto">
            <Check size={40} className="text-white" strokeWidth={3} />
          </div>
          <h2 className="font-[var(--font-header)] text-[var(--ink-primary)] text-xl font-bold mb-2">
            Password Changed
          </h2>
          <p className="text-[var(--ink-secondary)] font-[var(--font-body)] text-sm">
            Your password has been updated successfully
          </p>
        </motion.div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Current Password */}
          <div>
            <label className="block text-sm font-[var(--font-body)] font-semibold text-[var(--ink-primary)] mb-2">
              Current Password
            </label>
            <div className="relative">
              <input
                type={showCurrent ? "text" : "password"}
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-xl glass-strong border border-black/[0.06] font-[var(--font-body)] text-[var(--ink-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--trust-blue)] focus:border-transparent"
                placeholder="Enter current password"
              />
              <button
                type="button"
                onClick={() => setShowCurrent(!showCurrent)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--ink-muted)]"
              >
                {showCurrent ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {/* New Password */}
          <div>
            <label className="block text-sm font-[var(--font-body)] font-semibold text-[var(--ink-primary)] mb-2">
              New Password
            </label>
            <div className="relative">
              <input
                type={showNew ? "text" : "password"}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-xl glass-strong border border-black/[0.06] font-[var(--font-body)] text-[var(--ink-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--trust-blue)] focus:border-transparent"
                placeholder="Enter new password"
              />
              <button
                type="button"
                onClick={() => setShowNew(!showNew)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--ink-muted)]"
              >
                {showNew ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            <p className="text-xs text-[var(--ink-muted)] font-[var(--font-body)] mt-1">
              Must be at least 8 characters
            </p>
          </div>

          {/* Confirm New Password */}
          <div>
            <label className="block text-sm font-[var(--font-body)] font-semibold text-[var(--ink-primary)] mb-2">
              Confirm New Password
            </label>
            <div className="relative">
              <input
                type={showConfirm ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-xl glass-strong border border-black/[0.06] font-[var(--font-body)] text-[var(--ink-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--trust-blue)] focus:border-transparent"
                placeholder="Confirm new password"
              />
              <button
                type="button"
                onClick={() => setShowConfirm(!showConfirm)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--ink-muted)]"
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

          {/* Submit Button */}
          <motion.button
            whileTap={{ scale: 0.98 }}
            type="submit"
            className="w-full py-4 rounded-xl bg-[var(--trust-blue)] text-white font-[var(--font-body)] font-semibold shadow-lg"
          >
            Update Password
          </motion.button>
        </form>
      )}
    </div>
  );
}
