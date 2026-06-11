import { motion } from "motion/react";
import { MapPin, Tag, ChevronRight, Clock } from "lucide-react";
import { useNavigate, useParams } from "react-router";
import { PageHeader } from "../components/PageHeader";

import solarFarmImg from "@/assets/crowdfund_solar_farm.png";
import poultryImg from "@/assets/crowdfund_poultry.png";
import realEstateImg from "@/assets/crowdfund_real_estate.png";

const grace = (delay = 0) => ({
  delay, duration: 0.45, ease: [0.22, 1, 0.36, 1] as const,
});

const PROJECTS: Record<string, {
  title: string; desc: string; image: string; category: string;
  location: string; minInvestment: string; roi: string;
  target: string; funded: string; percent: number; daysLeft: string;
}> = {
  "1": {
    title: "Solar Farm Expansion – Lusaka",
    desc: "Scaling up renewable energy infrastructure to power 50,000 homes in peri-urban Lusaka. This project directly reduces dependence on the national grid and lowers electricity costs for local communities.",
    image: solarFarmImg,
    category: "Energy",
    location: "Lusaka, Zambia",
    minInvestment: "5,000.00",
    roi: "15% Annually",
    target: "500,000.00",
    funded: "120,000.00",
    percent: 24,
    daysLeft: "42",
  },
  "2": {
    title: "Agri-Tech Poultry Automation",
    desc: "Modernizing poultry farming with smart sensors and automated feeding systems. The project significantly reduces feed waste and increases output per farmer by up to 30%.",
    image: poultryImg,
    category: "Agriculture",
    location: "Kabwe, Zambia",
    minInvestment: "2,500.00",
    roi: "18% Annually",
    target: "250,000.00",
    funded: "105,000.00",
    percent: 42,
    daysLeft: "28",
  },
  "3": {
    title: "Residential Real Estate Fund",
    desc: "Constructing modern, affordable housing complexes for middle-income families. The fund targets high-density areas near Lusaka's economic corridors.",
    image: realEstateImg,
    category: "Real Estate",
    location: "Chilanga, Zambia",
    minInvestment: "10,000.00",
    roi: "12% Annually",
    target: "1,500,000.00",
    funded: "1,275,000.00",
    percent: 85,
    daysLeft: "14",
  },
};

export function InvestmentDetails() {
  const navigate = useNavigate();
  const { projectId } = useParams();
  const proj = PROJECTS[projectId ?? "1"] ?? PROJECTS["1"];

  return (
    <div className="w-full max-w-md mx-auto font-sans pb-36">
      <div className="sticky top-0 z-50">
        <PageHeader title="INVESTMENT DETAIL" showBack onBack={() => navigate(-1)} />
      </div>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={grace(0.05)}
        className="w-full h-[200px] bg-[var(--app-bg-muted)] overflow-hidden">
        <img src={proj.image} alt={proj.title} className="w-full h-full object-cover" />
      </motion.div>

      <div className="px-5 pt-5 space-y-5">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={grace(0.1)}>
          <div className="flex items-start justify-between gap-3 mb-2">
            <h1 className="font-black text-[20px] text-[var(--color-secondary)] uppercase tracking-tight leading-tight flex-1">{proj.title}</h1>
            <span className="bg-[#E85D3F]/10 text-[#E85D3F] text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full shrink-0 mt-1">{proj.category}</span>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={grace(0.17)}
          className="grid grid-cols-2 gap-3">
          {[
            { icon: MapPin, label: "Location", value: proj.location },
            { icon: Tag, label: "Category", value: proj.category },
            { icon: Clock, label: "Days Left", value: `${proj.daysLeft} days` },
            { icon: ChevronRight, label: "Min Investment", value: `K ${proj.minInvestment}` },
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

        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={grace(0.24)}
          className="bg-[var(--card)] rounded-2xl border border-[var(--border)] shadow-sm p-4">
          <div className="flex justify-between items-end mb-2">
            <div>
              <p className="text-[10px] font-black uppercase tracking-widest text-[var(--color-secondary)]/40">Funded</p>
              <p className="font-black text-[18px] text-[#E85D3F]">K {proj.funded}</p>
            </div>
            <div className="text-right">
              <p className="text-[10px] font-black uppercase tracking-widest text-[var(--color-secondary)]/40">Target</p>
              <p className="font-black text-[18px] text-[var(--color-secondary)]">K {proj.target}</p>
            </div>
          </div>
          <div className="w-full h-[22px] rounded-full overflow-hidden border border-[var(--border)] flex shadow-sm">
            <motion.div initial={{ width: 0 }} animate={{ width: `${proj.percent}%` }} transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
              className="h-full bg-[#E85D3F] flex items-center justify-center">
              <span className="text-[10px] font-black text-white whitespace-nowrap px-1">{proj.percent}%</span>
            </motion.div>
            <div className="h-full bg-[var(--app-bg-muted)] flex-1" />
          </div>
          <div className="flex justify-between mt-2">
            <p className="text-[10px] font-bold text-[var(--color-secondary)]/40">Est. ROI: <span className="text-[#00C853]">{proj.roi}</span></p>
            <p className="text-[10px] font-bold text-[var(--color-secondary)]/40">{proj.daysLeft} days remaining</p>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={grace(0.32)}>
          <h3 className="font-black text-[12px] uppercase tracking-widest text-[var(--color-secondary)]/50 mb-2">About This Investment</h3>
          <p className="text-[13px] font-semibold text-[var(--color-secondary)]/70 leading-relaxed">{proj.desc}</p>
        </motion.div>
      </div>

      <div className="fixed bottom-20 left-0 right-0 max-w-md mx-auto px-5 z-40">
        <button onClick={() => navigate(`/crowdfunding/project/${projectId}/amount`, { state: { title: proj.title } })}
          className="w-full py-4 rounded-2xl bg-[#E85D3F] text-white font-black uppercase tracking-widest text-[13px] shadow-xl flex items-center justify-center gap-2 active:scale-95 transition-all">
          Invest Now <ChevronRight size={16} strokeWidth={3} />
        </button>
      </div>
    </div>
  );
}
