import { useState } from "react";
import { useNavigate, useLocation } from "react-router";
import { motion, AnimatePresence } from "motion/react";
import { Music, Monitor, BookOpen, Briefcase, HardHat, Heart, Camera, Coffee, ArrowRight, Search, X } from "lucide-react";
import { PageHeader } from "../components/PageHeader";

const SERVICE_CATEGORIES = [
  { id: "events", label: "Events", icon: Music, color: "#DC2626" },
  { id: "technology", label: "Technology", icon: Monitor, color: "#0077B6" },
  { id: "education", label: "Education", icon: BookOpen, color: "#059669" },
  { id: "consulting", label: "Consulting", icon: Briefcase, color: "var(--color-secondary)" },
  { id: "construction", label: "Construction", icon: HardHat, color: "#D97706" },
  { id: "health", label: "Health & Wellness", icon: Heart, color: "#DC2626" },
  { id: "media", label: "Photography & Media", icon: Camera, color: "#7C3AED" },
  { id: "hospitality", label: "Hospitality", icon: Coffee, color: "var(--color-primary)" },
];
const SERVICE_TYPES: Record<string, string[]> = {
  events: ["Wedding Planning", "Corporate Events", "Birthday Parties", "Concerts", "Private Functions", "Product Launches"],
  technology: ["Web Development", "App Development", "IT Support", "Cybersecurity", "Cloud Services", "Data Analytics"],
  education: ["Tutoring", "Training", "Online Courses", "Workshops", "Mentorship", "Exam Preparation"],
  consulting: ["Business Consulting", "Legal Advisory", "Financial Advisory", "HR Consulting", "Strategy", "Audit"],
  construction: ["Building", "Renovation", "Interior Design", "Landscaping", "Plumbing", "Electrical"],
  health: ["Personal Training", "Nutrition", "Mental Health", "Physiotherapy", "Yoga", "Medical Consultation"],
  media: ["Photography", "Videography", "Editing", "Drone Footage", "Branding", "Animation"],
  hospitality: ["Catering", "Hotel Booking", "Tour Guide", "Restaurant", "Event Venue", "Car Hire"],
};
const STEPS = 7;

export function SellServiceCategory() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const [category, setCategory] = useState("");
  const [serviceType, setServiceType] = useState("");
  const [serviceSearch, setServiceSearch] = useState("");

  const filteredTypes = category
    ? SERVICE_TYPES[category].filter((t) => t.toLowerCase().includes(serviceSearch.toLowerCase()))
    : [];

  return (
    <div className="w-full max-w-md mx-auto min-h-screen bg-transparent font-sans pb-32">
      <PageHeader title="SERVICE TYPE" subtitle="Step 3 of 7" showBack />

      <div className="px-5 pt-5 space-y-5">
        <div className="flex gap-1.5">
          {Array.from({ length: STEPS }).map((_, i) => (
            <div key={i} className={`h-1.5 flex-1 rounded-full ${i < 3 ? "bg-[var(--color-primary)]" : "bg-[var(--border)]"}`} />
          ))}
        </div>

        <div className="space-y-3">
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[var(--color-secondary)]/50">Category</p>
          <div className="grid grid-cols-2 gap-3">
            {SERVICE_CATEGORIES.map((cat) => (
              <motion.button
                key={cat.id}
                whileTap={{ scale: 0.97 }}
                onClick={() => { setCategory(cat.id); setServiceType(""); setServiceSearch(""); }}
                className={`flex flex-col items-center gap-2.5 p-4 rounded-2xl border transition-all ${
                  category === cat.id ? "border-[var(--color-primary)] bg-[var(--app-bg)] shadow-sm" : "border-[var(--border)] bg-[var(--app-bg)]"
                }`}
                style={category === cat.id ? { backgroundColor: cat.color + "10" } : {}}
              >
                <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: cat.color + "15" }}>
                  <cat.icon size={20} style={{ color: cat.color }} strokeWidth={2} />
                </div>
                <span className="text-[10px] font-black uppercase tracking-wide text-[var(--app-text)] text-center leading-tight">{cat.label}</span>
              </motion.button>
            ))}
          </div>
        </div>

        <AnimatePresence>
          {category && (
            <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -4 }} className="space-y-3">
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[var(--color-secondary)]/50">Service Type</p>

              {/* Searchable dropdown input */}
              <div className="relative">
                <Search size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--color-secondary)]/40" strokeWidth={2} />
                <input
                  value={serviceSearch}
                  onChange={(e) => { setServiceSearch(e.target.value); setServiceType(""); }}
                  placeholder="Search service type..."
                  className="w-full border border-[var(--border)] rounded-xl pl-10 pr-10 py-2.5 text-[12px] font-semibold text-[var(--app-text)] bg-[var(--app-bg)] outline-none focus:border-[var(--color-primary)] transition-all placeholder:text-[var(--color-secondary)]/30"
                />
                {serviceSearch && (
                  <button onClick={() => { setServiceSearch(""); setServiceType(""); }} className="absolute right-3 top-1/2 -translate-y-1/2 active:opacity-50">
                    <X size={13} className="text-[var(--color-secondary)]/50" />
                  </button>
                )}
              </div>

              <div className="space-y-2">
                {filteredTypes.length > 0 ? filteredTypes.map((type) => (
                  <button key={type} onClick={() => setServiceType(type)}
                    className={`w-full flex items-center justify-between px-4 py-3 rounded-xl border transition-all ${
                      serviceType === type ? "border-[var(--color-primary)] bg-[var(--color-primary)]/8 text-[var(--color-primary)]" : "border-[var(--border)] text-[var(--color-secondary)]/70 bg-[var(--app-bg)]"
                    }`}>
                    <span className="text-[12px] font-black uppercase tracking-wide">{type}</span>
                    <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${serviceType === type ? "border-[var(--color-primary)] bg-[var(--color-primary)]" : "border-[var(--border)]"}`}>
                      {serviceType === type && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                    </div>
                  </button>
                )) : (
                  <div className="py-4 text-center">
                    <p className="text-[11px] font-semibold text-[var(--color-secondary)]/50">No matching service types</p>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="px-5 pt-4 pb-8">
        <button
          onClick={() => navigate("/marketplace/sell/service/info", { state: { ...state, serviceCategory: category, serviceType } })}
          disabled={!category || !serviceType}
          className="w-full py-4 rounded-2xl bg-[var(--color-secondary)] text-white font-black uppercase tracking-widest text-[12px] flex items-center justify-center gap-3 disabled:opacity-40 disabled:cursor-not-allowed active:scale-95 transition-all"
        >
          Continue <ArrowRight size={18} />
        </button>
      </div>
    </div>
  );
}
