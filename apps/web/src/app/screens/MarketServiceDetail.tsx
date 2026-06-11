import { useState } from "react";
import { useNavigate, useParams } from "react-router";
import { motion } from "motion/react";
import { Star, Phone, MessageCircle, Bookmark, Share2, MapPin, CheckCircle, ArrowRight, Clock, Shield, Award } from "lucide-react";
import { PageHeader } from "../components/PageHeader";
import { toast } from "sonner";

const MOCK_SERVICE = {
  id: "1",
  name: "Professional Wedding Photography",
  provider: "Chisenga Studios",
  rating: 4.8,
  reviews: 124,
  completions: 89,
  responseTime: "~2 hrs",
  trustScore: 96,
  location: "Lusaka, Zambia",
  category: "Photography & Media",
  shortDesc: "Award-winning wedding photography capturing your special moments forever.",
  packages: [
    { name: "Basic", price: 3500, features: ["4 hours coverage", "200 edited photos", "Online gallery"] },
    { name: "Standard", price: 6000, features: ["8 hours coverage", "400 edited photos", "Online gallery", "Drone shots"], popular: true },
    { name: "Premium", price: 9500, features: ["Full day coverage", "600+ edited photos", "Online gallery", "Drone shots", "Highlight video"] },
  ],
  gallery: [1, 2, 3, 4, 5],
};

const TABS = ["Packages", "Availability", "Reviews"] as const;

export function MarketServiceDetail() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState<typeof TABS[number]>("Packages");
  const [saved, setSaved] = useState(false);

  const service = MOCK_SERVICE;

  return (
    <div className="w-full max-w-md mx-auto bg-transparent font-sans pb-24">
      <PageHeader title={service.category.toUpperCase()} showBack />

      <div className="space-y-4">
        <div className="h-52 bg-gradient-to-br from-[var(--color-secondary)] to-[#2d3561] flex items-center justify-center relative overflow-hidden">
          <div className="absolute inset-0 opacity-20" style={{ backgroundImage: "radial-gradient(circle, var(--color-primary) 1px, transparent 1px)", backgroundSize: "20px 20px" }} />
          <div className="relative text-center text-white px-6">
            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-white/60 mb-2">{service.category}</p>
            <h1 className="text-xl font-black uppercase tracking-tight leading-tight">{service.name}</h1>
          </div>
        </div>

        <div className="px-5 space-y-4">
          <div className="bg-[var(--app-bg)] rounded-3xl border-[3px] border-[var(--app-text)] shadow-[6px_6px_0_var(--app-text)] p-5">
            <div className="flex items-start justify-between gap-3">
              <div className="flex-1">
                <p className="text-[14px] font-black text-[var(--app-text)] uppercase tracking-wide leading-tight">{service.name}</p>
                <p className="text-[11px] font-bold text-[var(--color-primary)] mt-0.5">{service.provider}</p>
                <div className="flex items-center gap-3 mt-2">
                  <div className="flex items-center gap-1">
                    <Star size={12} className="text-[#F59E0B]" fill="#F59E0B" />
                    <span className="text-[11px] font-black text-[var(--app-text)]">{service.rating}</span>
                    <span className="text-[10px] font-semibold text-[var(--color-secondary)]/50">({service.reviews})</span>
                  </div>
                  <div className="flex items-center gap-1 text-[var(--color-secondary)]/50">
                    <MapPin size={10} strokeWidth={2} />
                    <span className="text-[10px] font-semibold">{service.location}</span>
                  </div>
                </div>
              </div>
              <button onClick={() => setSaved(!saved)}
                className={`w-10 h-10 rounded-2xl border-2 flex items-center justify-center transition-all active:scale-90 ${saved ? "border-[var(--color-primary)] bg-[var(--color-primary)]/10" : "border-[var(--border)]"}`}>
                <Bookmark size={16} style={{ color: saved ? "var(--color-primary)" : "var(--color-secondary)" }} fill={saved ? "var(--color-primary)" : "none"} strokeWidth={2} />
              </button>
            </div>
            <p className="text-[12px] font-semibold text-[var(--color-secondary)]/70 mt-3 leading-relaxed">{service.shortDesc}</p>

            {/* Trust & activity chips */}
            <div className="flex flex-wrap gap-1.5 mt-3">
              <div className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#059669]/10 border border-[#059669]/20">
                <Shield size={9} color="#059669" strokeWidth={2.5} />
                <span className="text-[8px] font-black text-[#059669] uppercase tracking-widest">{service.trustScore}% Trust</span>
              </div>
              <div className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-[var(--color-primary)]/10 border border-[var(--color-primary)]/20">
                <Clock size={9} color="var(--color-primary)" strokeWidth={2.5} />
                <span className="text-[8px] font-black text-[var(--color-primary)] uppercase tracking-widest">Responds {service.responseTime}</span>
              </div>
              <div className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-[var(--color-secondary)]/10 border border-[var(--color-secondary)]/20">
                <Award size={9} color="var(--color-secondary)" strokeWidth={2.5} />
                <span className="text-[8px] font-black text-[var(--color-secondary)] uppercase tracking-widest">{service.completions} Jobs Done</span>
              </div>
            </div>

            <div className="flex gap-2 mt-4">
              {[
                { icon: Phone, label: "Call", action: () => toast.info("Calling provider...") },
                { icon: MessageCircle, label: "Message", action: () => toast.info("Opening chat...") },
                { icon: Share2, label: "Share", action: () => toast.info("Sharing service...") },
              ].map(({ icon: Icon, label, action }) => (
                <button key={label} onClick={action}
                  className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl border-2 border-[var(--border)] bg-[var(--app-bg)] text-[var(--color-secondary)] active:scale-95 transition-all">
                  <Icon size={14} strokeWidth={2} />
                  <span className="text-[10px] font-black uppercase tracking-wide">{label}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="flex border border-[var(--border)] rounded-full overflow-hidden shadow-sm">
            {TABS.map((tab, i) => (
              <button key={tab} onClick={() => setActiveTab(tab)}
                className={`flex-1 py-2.5 text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === tab ? "bg-[var(--color-secondary)] text-white" : "bg-[var(--app-bg)] text-[var(--color-secondary)]/50"} ${i > 0 ? "border-l border-[var(--border)]" : ""}`}>
                {tab}
              </button>
            ))}
          </div>

          {activeTab === "Packages" && (
            <div className="space-y-3">
              {service.packages.map((pkg, i) => {
                const colors = ["#059669", "var(--color-primary)", "#7C3AED"];
                const color = colors[i];
                return (
                  <motion.div key={pkg.name} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
                    className="bg-[var(--app-bg)] rounded-2xl border-[3px] border-[var(--app-text)] shadow-[4px_4px_0_var(--app-text)] overflow-hidden relative">
                    {pkg.popular && (
                      <div className="absolute top-3 right-3 px-2.5 py-0.5 rounded-full text-[8px] font-black uppercase tracking-widest text-white" style={{ backgroundColor: color }}>Popular</div>
                    )}
                    <div className="px-4 py-3 border-b border-[var(--border)]" style={{ backgroundColor: color + "12" }}>
                      <p className="text-[12px] font-black uppercase tracking-widest" style={{ color }}>{pkg.name}</p>
                    </div>
                    <div className="p-4">
                      <p className="text-[22px] font-black text-[var(--app-text)]">K{pkg.price.toLocaleString()}</p>
                      <div className="mt-3 space-y-1.5">
                        {pkg.features.map((f) => (
                          <div key={f} className="flex items-center gap-2">
                            <CheckCircle size={12} style={{ color }} strokeWidth={2.5} className="shrink-0" />
                            <span className="text-[11px] font-semibold text-[var(--color-secondary)]/70">{f}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          )}

          {activeTab === "Availability" && (
            <div className="space-y-3">
              <div className="bg-[var(--app-bg)] rounded-2xl border-[3px] border-[var(--app-text)] shadow-[4px_4px_0_var(--app-text)] p-4 space-y-3">
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[var(--color-secondary)]/50">Available Days</p>
                <div className="flex flex-wrap gap-2">
                  {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                    <div key={day} className="px-3 py-1.5 rounded-xl bg-[#059669]/10 border border-[#059669]/30 text-[10px] font-black text-[#059669] uppercase tracking-wide">{day}</div>
                  ))}
                  <div className="px-3 py-1.5 rounded-xl bg-[var(--border)]/40 border border-[var(--border)] text-[10px] font-black text-[var(--color-secondary)]/40 uppercase tracking-wide">Sun</div>
                </div>
              </div>
              <div className="bg-[var(--app-bg)] rounded-2xl border-[3px] border-[var(--app-text)] shadow-[4px_4px_0_var(--app-text)] p-4 space-y-2">
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[var(--color-secondary)]/50">Time Slots</p>
                <div className="flex flex-wrap gap-2">
                  {["8:00 AM", "10:00 AM", "12:00 PM", "2:00 PM", "4:00 PM"].map((slot) => (
                    <div key={slot} className="px-3 py-1.5 rounded-xl bg-[var(--color-primary)]/10 border border-[var(--color-primary)]/30 text-[10px] font-black text-[var(--color-primary)] uppercase tracking-wide">{slot}</div>
                  ))}
                </div>
              </div>
              <div className="bg-[var(--app-bg)] rounded-2xl border border-[var(--border)] p-4 flex items-center gap-3">
                <Clock size={16} className="text-[var(--color-secondary)]/50 shrink-0" strokeWidth={2} />
                <p className="text-[11px] font-semibold text-[var(--color-secondary)]/60">Booking must be made at least 48 hours in advance. Select a package to proceed to full calendar booking.</p>
              </div>
            </div>
          )}

          {activeTab === "Reviews" && (
            <div className="space-y-3">
              {[{ name: "M. Banda", rating: 5, comment: "Absolutely amazing work. The photos were stunning!" },
                { name: "T. Phiri", rating: 5, comment: "Professional, punctual, and talented. Highly recommend." },
                { name: "C. Mwale", rating: 4, comment: "Great service, minor editing delay but overall excellent." },
              ].map((r, i) => (
                <div key={i} className="bg-[var(--app-bg)] rounded-2xl border border-[var(--border)] p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-7 h-7 rounded-full bg-[var(--color-secondary)] flex items-center justify-center text-white text-[10px] font-black">
                      {r.name[0]}
                    </div>
                    <p className="text-[11px] font-black text-[var(--app-text)]">{r.name}</p>
                    <div className="flex gap-0.5 ml-auto">
                      {Array.from({ length: 5 }).map((_, j) => (
                        <Star key={j} size={9} fill={j < r.rating ? "#F59E0B" : "none"} color={j < r.rating ? "#F59E0B" : "var(--border)"} />
                      ))}
                    </div>
                  </div>
                  <p className="text-[11px] font-semibold text-[var(--color-secondary)]/70">{r.comment}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="px-5 pt-4 pb-8">
        <button
          onClick={() => navigate(`/marketplace/service/${id}/packages`, { state: { service } })}
          className="w-full py-4 rounded-2xl bg-[var(--color-secondary)] text-white font-black uppercase tracking-widest text-[12px] flex items-center justify-center gap-3 shadow-md active:scale-95 transition-all"
        >
          Select Package <ArrowRight size={18} />
        </button>
      </div>
    </div>
  );
}
