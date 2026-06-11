import { useState } from "react";
import { useNavigate, useLocation, useParams } from "react-router";
import { motion } from "motion/react";
import { Calendar, Package, Users, MessageSquare, ArrowRight } from "lucide-react";
import { PageHeader } from "../components/PageHeader";

export function MarketServiceInquiry() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { state } = useLocation();
  const [message, setMessage] = useState("");

  const booking = state?.booking || {};
  const pkg = state?.selectedPackage || { name: "Standard", price: 6000 };

  return (
    <div className="w-full max-w-md mx-auto bg-transparent font-sans pb-24">
      <PageHeader title="SEND INQUIRY" showBack />

      <div className="px-5 pt-5 space-y-5">
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
          className="bg-[var(--app-bg)] rounded-3xl border-[3px] border-[var(--app-text)] shadow-[6px_6px_0_var(--app-text)] overflow-hidden">
          <div className="bg-[var(--color-secondary)] px-5 py-3">
            <p className="text-[9px] font-black uppercase tracking-[0.3em] text-white/60">Booking Summary</p>
          </div>
          <div className="px-5 py-4 space-y-0">
            {[
              { icon: Package, label: "Package", value: `${pkg.name} — K${(pkg.price || 0).toLocaleString()}` },
              { icon: Calendar, label: "Date", value: booking.date || "—" },
              { icon: Calendar, label: "Time", value: booking.time || "—" },
              { icon: Users, label: "Guests", value: booking.guests || "1" },
            ].map(({ icon: Icon, label, value }) => (
              <div key={label} className="flex items-center gap-3 py-3 border-b border-[var(--border)] last:border-0">
                <div className="w-8 h-8 rounded-xl bg-[var(--color-primary)]/10 flex items-center justify-center shrink-0">
                  <Icon size={14} className="text-[var(--color-primary)]" strokeWidth={2} />
                </div>
                <div>
                  <p className="text-[9px] font-black uppercase tracking-wider text-[var(--color-secondary)]/50">{label}</p>
                  <p className="text-[12px] font-bold text-[var(--app-text)]">{value}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
          className="bg-[var(--app-bg)] rounded-3xl border-[3px] border-[var(--app-text)] shadow-[6px_6px_0_var(--app-text)] p-5 space-y-3">
          <div className="flex items-center gap-2">
            <MessageSquare size={14} className="text-[var(--color-secondary)]" strokeWidth={2} />
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[var(--color-secondary)]/50">Your Message</p>
          </div>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows={5}
            placeholder="Hello, I'm interested in your service. I'd like to book you for my event on the selected date. Please confirm availability and any special requirements..."
            className="w-full border-2 border-[var(--border)] rounded-xl px-4 py-3 text-[12px] font-semibold text-[var(--app-text)] bg-[var(--app-bg)] outline-none focus:border-[var(--app-text)] transition-all resize-none placeholder:text-[var(--color-secondary)]/30"
          />
        </motion.div>
      </div>

      <div className="px-5 pt-4 pb-8">
        <button
          onClick={() => navigate(`/marketplace/service/${id}/payment`, { state: { ...state, message } })}
          className="w-full py-4 rounded-2xl bg-[var(--color-secondary)] text-white font-black uppercase tracking-widest text-[12px] flex items-center justify-center gap-3 shadow-md active:scale-95 transition-all"
        >
          Send Inquiry <ArrowRight size={18} />
        </button>
      </div>
    </div>
  );
}
