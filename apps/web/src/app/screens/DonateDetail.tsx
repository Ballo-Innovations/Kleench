import { motion } from "motion/react";
import { MapPin, Users, Tag, ChevronRight, Calendar } from "lucide-react";
import { useNavigate, useParams } from "react-router";
import { PageHeader } from "../components/PageHeader";

import schoolChildrenImg from "@/assets/donate_school_children.png";
import accidentImg from "@/assets/donate_accident.png";
import waterImg from "@/assets/donate_clean_water.png";

const grace = (delay = 0) => ({
  delay, duration: 0.45, ease: [0.22, 1, 0.36, 1] as const,
});

const PROJECTS: Record<string, {
  title: string; desc: string; image: string; raised: string;
  target: string; percent: number; date: string; days: string;
  location: string; beneficiaries: string; category: string;
}> = {
  "1": {
    title: "Support School Children",
    desc: "Providing books, uniforms, and school supplies to children from underprivileged families in rural schools across Magoye, Southern Province. Your donation goes directly to purchasing educational materials that transform futures.",
    image: schoolChildrenImg,
    raised: "56,002.00", target: "100,002.00", percent: 56,
    date: "30th March 2026", days: "13",
    location: "Magoye, Southern Province",
    beneficiaries: "240 children",
    category: "Education",
  },
  "2": {
    title: "Event: Accident Victims",
    desc: "Raising funds for a road show event to spread road safety awareness across Zambia. All proceeds fund hospital bills for accident victims who cannot afford treatment.",
    image: accidentImg,
    raised: "5,002.00", target: "90,000.00", percent: 5,
    date: "24th March 2026", days: "31",
    location: "Lusaka, Zambia",
    beneficiaries: "80 families",
    category: "Disaster",
  },
  "3": {
    title: "Clean Water for Villages",
    desc: "Building wells and safe water sources for communities in Mtendere. Access to clean water reduces disease and improves quality of life for thousands of families.",
    image: waterImg,
    raised: "20,002.00", target: "100,000.00", percent: 20,
    date: "12th January 2026", days: "5",
    location: "Mtendere, Lusaka",
    beneficiaries: "1,200 residents",
    category: "Water & Sanitation",
  },
};

export function DonateDetail() {
  const navigate = useNavigate();
  const { campaignId } = useParams();
  const proj = PROJECTS[campaignId ?? "1"] ?? PROJECTS["1"];

  return (
    <div className="w-full max-w-md mx-auto font-sans pb-36">
      <div className="sticky top-0 z-50">
        <PageHeader title="CAMPAIGN DETAIL" showBack onBack={() => navigate(-1)} />
      </div>

      {/* Campaign image */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={grace(0.05)}
        className="w-full h-[200px] bg-[var(--app-bg-muted)] overflow-hidden">
        <img src={proj.image} alt={proj.title} className="w-full h-full object-cover" />
      </motion.div>

      <div className="px-5 pt-5 space-y-5">
        {/* Title + category */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={grace(0.1)}>
          <div className="flex items-start justify-between gap-3 mb-2">
            <h1 className="font-black text-[20px] text-[var(--color-secondary)] uppercase tracking-tight leading-tight flex-1">{proj.title}</h1>
            <span className="bg-[#E85D3F]/10 text-[#E85D3F] text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full shrink-0 mt-1">{proj.category}</span>
          </div>
        </motion.div>

        {/* Meta info */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={grace(0.17)}
          className="grid grid-cols-2 gap-3">
          {[
            { icon: MapPin, label: "Location", value: proj.location },
            { icon: Users, label: "Beneficiaries", value: proj.beneficiaries },
            { icon: Tag, label: "Category", value: proj.category },
            { icon: Calendar, label: "Deadline", value: proj.date },
          ].map(({ icon: Icon, label, value }) => (
            <div key={label} className="bg-[var(--card)] rounded-2xl border border-[var(--border)] p-3 shadow-sm">
              <div className="flex items-center gap-1.5 mb-1">
                <Icon size={12} className="text-[#E85D3F]" strokeWidth={2} />
                <span className="text-[9px] font-black uppercase tracking-widest text-[var(--color-secondary)]/40">{label}</span>
              </div>
              <p className="font-black text-[12px] text-[var(--color-secondary)] leading-tight">{value}</p>
            </div>
          ))}
        </motion.div>

        {/* Progress */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={grace(0.24)}
          className="bg-[var(--card)] rounded-2xl border border-[var(--border)] shadow-sm p-4">
          <div className="flex justify-between items-end mb-2">
            <div>
              <p className="text-[10px] font-black uppercase tracking-widest text-[var(--color-secondary)]/40">Raised</p>
              <p className="font-black text-[18px] text-[#E85D3F]">K {proj.raised}</p>
            </div>
            <div className="text-right">
              <p className="text-[10px] font-black uppercase tracking-widest text-[var(--color-secondary)]/40">Target</p>
              <p className="font-black text-[18px] text-[var(--color-secondary)]">K {proj.target}</p>
            </div>
          </div>
          <div className="w-full h-[22px] rounded-full overflow-hidden border border-[var(--border)] flex shadow-sm">
            <motion.div initial={{ width: 0 }} animate={{ width: `${proj.percent}%` }} transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
              className="h-full bg-[#00C853] flex items-center justify-center">
              <span className="text-[10px] font-black text-white whitespace-nowrap px-1">{proj.percent}%</span>
            </motion.div>
            <div className="h-full bg-[var(--app-bg-muted)] flex-1" />
          </div>
          <p className="text-[10px] font-bold text-[var(--color-secondary)]/40 mt-2">{proj.days} days remaining</p>
        </motion.div>

        {/* Description */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={grace(0.32)}>
          <h3 className="font-black text-[12px] uppercase tracking-widest text-[var(--color-secondary)]/50 mb-2">About This Campaign</h3>
          <p className="text-[13px] font-semibold text-[var(--color-secondary)]/70 leading-relaxed">{proj.desc}</p>
        </motion.div>
      </div>

      {/* Sticky Donate CTA */}
      <div className="fixed bottom-20 left-0 right-0 max-w-md mx-auto px-5 z-40">
        <button onClick={() => navigate(`/donate/campaign/${campaignId}/amount`, { state: { title: proj.title } })}
          className="w-full py-4 rounded-2xl bg-[#E85D3F] text-white font-black uppercase tracking-widest text-[13px] shadow-xl flex items-center justify-center gap-2 active:scale-95 transition-all">
          Donate Now <ChevronRight size={16} strokeWidth={3} />
        </button>
      </div>
    </div>
  );
}
