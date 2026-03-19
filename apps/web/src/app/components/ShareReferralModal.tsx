import { motion, AnimatePresence } from "motion/react";
import { X, Copy, Check, MessageCircle, Mail, Facebook, Twitter, DollarSign, TrendingUp } from "lucide-react";
import { useState } from "react";

interface ShareReferralModalProps {
  isOpen: boolean;
  onClose: () => void;
  productTitle: string;
  productPrice: number;
  productId: number | string;
}

export function ShareReferralModal({ isOpen, onClose, productTitle, productPrice, productId }: ShareReferralModalProps) {
  const [copied, setCopied] = useState(false);
  
  // Calculate commission (10% default)
  const commission = (productPrice * 0.1).toFixed(2);
  
  // Generate referral link
  const referralLink = `https://kleench.com/p/${productId}?ref=${localStorage.getItem("username") || "user"}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(referralLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const shareOptions = [
    { 
      icon: MessageCircle, 
      label: "WhatsApp", 
      color: "#25D366",
      action: () => window.open(`https://wa.me/?text=${encodeURIComponent(`Check out ${productTitle} on KLEENCH! ${referralLink}`)}`, "_blank")
    },
    { 
      icon: Facebook, 
      label: "Facebook", 
      color: "#1877F2",
      action: () => window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(referralLink)}`, "_blank")
    },
    { 
      icon: Twitter, 
      label: "Twitter", 
      color: "#1DA1F2",
      action: () => window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(`Check out ${productTitle}!`)}&url=${encodeURIComponent(referralLink)}`, "_blank")
    },
    { 
      icon: Mail, 
      label: "Email", 
      color: "#EA4335",
      action: () => window.open(`mailto:?subject=${encodeURIComponent(productTitle)}&body=${encodeURIComponent(`I found this on KLEENCH: ${referralLink}`)}`, "_blank")
    },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          className="fixed inset-0 z-[300] flex items-end justify-center"
          style={{ backgroundColor: "rgba(0,0,0,0.6)", backdropFilter: "blur(6px)" }}
          onClick={onClose}
        >
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="w-full max-w-md bg-white rounded-t-3xl px-5 pt-4 pb-8 flex flex-col gap-5"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Handle bar */}
            <div className="w-10 h-1 rounded-full bg-black/10 mx-auto" />

            {/* Header */}
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h3
                  className="font-[var(--font-header)] text-[var(--ink-primary)] mb-1"
                  style={{ fontSize: "20px", fontWeight: 800, letterSpacing: "-0.01em" }}
                >
                  Share & Earn
                </h3>
                <p
                  className="font-[var(--font-body)] text-[var(--ink-muted)]"
                  style={{ fontSize: "13px" }}
                >
                  Earn commission when friends buy through your link
                </p>
              </div>
              <button
                onClick={onClose}
                className="w-8 h-8 rounded-full bg-[var(--surface-raised)] flex items-center justify-center flex-shrink-0"
              >
                <X size={16} className="text-[var(--ink-muted)]" />
              </button>
            </div>

            {/* Earnings Card */}
            <div className="rounded-2xl bg-gradient-to-br from-[var(--action-gold)]/20 via-[var(--action-gold)]/10 to-transparent p-4 border border-[var(--action-gold)]/30">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-[var(--action-gold)] flex items-center justify-center flex-shrink-0">
                  <DollarSign size={20} className="text-white" strokeWidth={2.5} />
                </div>
                <div className="flex-1">
                  <p
                    className="font-[var(--font-body)] text-[var(--ink-muted)] mb-0.5"
                    style={{ fontSize: "11px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em" }}
                  >
                    You'll Earn
                  </p>
                  <p
                    className="font-[var(--font-header)] text-[var(--ink-primary)] mb-1"
                    style={{ fontSize: "24px", fontWeight: 800, letterSpacing: "-0.02em" }}
                  >
                    ${commission}
                  </p>
                  <div className="flex items-center gap-1 text-emerald-700">
                    <TrendingUp size={11} strokeWidth={2.5} />
                    <p
                      className="font-[var(--font-body)]"
                      style={{ fontSize: "11px", fontWeight: 600 }}
                    >
                      10% commission on every sale
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Product Info */}
            <div className="flex flex-col gap-1">
              <p
                className="font-[var(--font-body)] text-[var(--ink-muted)]"
                style={{ fontSize: "11px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em" }}
              >
                Sharing
              </p>
              <p
                className="font-[var(--font-body)] text-[var(--ink-primary)] line-clamp-1"
                style={{ fontSize: "14px", fontWeight: 600 }}
              >
                {productTitle}
              </p>
            </div>

            {/* Referral Link */}
            <div className="flex flex-col gap-2">
              <p
                className="font-[var(--font-body)] text-[var(--ink-muted)]"
                style={{ fontSize: "11px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em" }}
              >
                Your Referral Link
              </p>
              <div className="flex items-center gap-2">
                <div className="flex-1 px-3 py-2.5 rounded-xl bg-[var(--surface-raised)] border border-black/[0.06]">
                  <p
                    className="font-[var(--font-body)] text-[var(--ink-secondary)] truncate"
                    style={{ fontSize: "12px" }}
                  >
                    {referralLink}
                  </p>
                </div>
                <motion.button
                  whileTap={{ scale: 0.92 }}
                  onClick={handleCopy}
                  className="px-4 py-2.5 rounded-xl bg-[var(--trust-blue)] flex items-center gap-1.5 shadow-sm"
                >
                  {copied ? (
                    <Check size={16} className="text-white" strokeWidth={2.5} />
                  ) : (
                    <Copy size={16} className="text-white" strokeWidth={2} />
                  )}
                  <span
                    className="font-[var(--font-header)] text-white"
                    style={{ fontSize: "13px", fontWeight: 700 }}
                  >
                    {copied ? "Copied!" : "Copy"}
                  </span>
                </motion.button>
              </div>
            </div>

            {/* Share Options */}
            <div className="flex flex-col gap-2">
              <p
                className="font-[var(--font-body)] text-[var(--ink-muted)]"
                style={{ fontSize: "11px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em" }}
              >
                Quick Share
              </p>
              <div className="grid grid-cols-4 gap-3">
                {shareOptions.map((option) => {
                  const Icon = option.icon;
                  return (
                    <motion.button
                      key={option.label}
                      whileTap={{ scale: 0.9 }}
                      onClick={option.action}
                      className="flex flex-col items-center gap-2"
                    >
                      <div
                        className="w-14 h-14 rounded-2xl flex items-center justify-center shadow-md"
                        style={{ backgroundColor: option.color }}
                      >
                        <Icon size={24} className="text-white" strokeWidth={2} />
                      </div>
                      <span
                        className="font-[var(--font-body)] text-[var(--ink-secondary)] text-center"
                        style={{ fontSize: "10px", fontWeight: 600 }}
                      >
                        {option.label}
                      </span>
                    </motion.button>
                  );
                })}
              </div>
            </div>

            {/* Info Footer */}
            <div className="rounded-xl bg-[var(--trust-blue)]/5 p-3 border border-[var(--trust-blue)]/10">
              <p
                className="font-[var(--font-body)] text-[var(--ink-muted)] text-center"
                style={{ fontSize: "11px", lineHeight: "1.5" }}
              >
                💰 <strong>Earn 10% commission</strong> on every successful referral sale. Funds are instantly credited to your KLEENCH Wallet.
              </p>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}