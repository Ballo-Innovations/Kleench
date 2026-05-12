import { useNavigate } from "react-router";
import { motion } from "motion/react";
import { ChevronRight, TrendingUp, Users, Clock, Zap } from "lucide-react";
import { toast } from "sonner";
import { PageHeader } from "../components/PageHeader";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const grace = (delay = 0) => ({
  delay,
  duration: 0.5,
  ease: [0.22, 1, 0.36, 1] as const,
});

const TREND_DATA = [
  { day: "Mon", responses: 12 },
  { day: "Tue", responses: 28 },
  { day: "Wed", responses: 19 },
  { day: "Thu", responses: 45 },
  { day: "Fri", responses: 38 },
  { day: "Sat", responses: 52 },
  { day: "Sun", responses: 31 },
];

const AUDIENCE_DATA = [
  { name: "18–24", value: 34, color: "#FF6B00" },
  { name: "25–34", value: 29, color: "#FF9500" },
  { name: "35–44", value: 21, color: "#FFB800" },
  { name: "45+", value: 16, color: "#FFD700" },
];

const CATEGORY_DATA = [
  { label: "Product Quality", score: 78 },
  { label: "Customer Service", score: 64 },
  { label: "Pricing", score: 55 },
  { label: "Delivery Speed", score: 82 },
  { label: "App Experience", score: 70 },
];

const KPI_CARDS = [
  { icon: Users, label: "Responses", value: "225", delta: "+18%", color: "text-blue-500", bg: "bg-blue-50" },
  { icon: TrendingUp, label: "Completion", value: "73%", delta: "+5%", color: "text-green-500", bg: "bg-green-50" },
  { icon: Clock, label: "Avg Time", value: "2m 41s", delta: "-12s", color: "text-orange-500", bg: "bg-orange-50" },
  { icon: Zap, label: "Engagement", value: "91%", delta: "+3%", color: "text-purple-500", bg: "bg-purple-50" },
];

function KpiCard({ icon: Icon, label, value, delta, color, bg }: typeof KPI_CARDS[0]) {
  const isPositive = delta.startsWith("+") || delta.startsWith("-1") === false;
  return (
    <div className="bg-[var(--card)] rounded-2xl border border-[var(--border)] shadow-sm p-4 flex flex-col gap-2">
      <div className={`w-9 h-9 rounded-full ${bg} flex items-center justify-center`}>
        <Icon size={16} className={color} />
      </div>
      <p className="font-black text-[22px] text-[var(--color-secondary)] leading-none">{value}</p>
      <div className="flex items-center justify-between">
        <span className="text-[10px] font-bold text-[var(--color-secondary)]/40 uppercase tracking-wide">{label}</span>
        <span className={`text-[10px] font-black ${isPositive ? 'text-green-500' : 'text-red-400'}`}>{delta}</span>
      </div>
    </div>
  );
}

export function SurveyAnalytics() {
  const navigate = useNavigate();

  return (
    <div className="w-full pb-32 relative min-h-screen bg-transparent font-sans text-[var(--color-secondary)]">
      <div className="sticky top-0 z-50">
        <PageHeader title="SURVEY ANALYTICS" showBack onBack={() => navigate(-1)} />
      </div>

      <div className="px-5 py-5 space-y-6">

        {/* KPI Grid */}
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={grace(0.05)}>
          <h3 className="text-[var(--color-secondary)] font-black tracking-[0.15em] text-[13px] mb-3 uppercase">Overview</h3>
          <div className="grid grid-cols-2 gap-3">
            {KPI_CARDS.map((card, i) => (
              <motion.div key={card.label} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={grace(0.1 + i * 0.07)}>
                <KpiCard {...card} />
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Response Trend — Line Chart */}
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={grace(0.35)}
          className="bg-[var(--card)] rounded-2xl border border-[var(--border)] shadow-sm p-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-black text-[13px] text-[var(--color-secondary)] uppercase tracking-widest">Response Trend</h3>
            <span className="text-[10px] font-bold text-[var(--color-secondary)]/40 uppercase">Last 7 Days</span>
          </div>
          <ResponsiveContainer width="100%" height={160}>
            <LineChart data={TREND_DATA} margin={{ top: 4, right: 4, left: -28, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
              <XAxis dataKey="day" tick={{ fontSize: 9, fontWeight: 700, fill: "var(--color-secondary)", opacity: 0.4 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 9, fontWeight: 700, fill: "var(--color-secondary)", opacity: 0.4 }} axisLine={false} tickLine={false} />
              <Tooltip
                contentStyle={{ borderRadius: 12, border: "1px solid var(--border)", fontSize: 11, fontWeight: 700 }}
                labelStyle={{ color: "var(--color-secondary)", fontWeight: 900 }}
              />
              <Line type="monotone" dataKey="responses" stroke="var(--color-primary)" strokeWidth={2.5} dot={{ r: 4, fill: "var(--color-primary)", strokeWidth: 0 }} activeDot={{ r: 6 }} />
            </LineChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Audience Distribution — Pie Chart */}
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={grace(0.45)}
          className="bg-[var(--card)] rounded-2xl border border-[var(--border)] shadow-sm p-4">
          <h3 className="font-black text-[13px] text-[var(--color-secondary)] uppercase tracking-widest mb-4">Audience Breakdown</h3>
          <div className="flex items-center gap-4">
            <ResponsiveContainer width={130} height={130}>
              <PieChart>
                <Pie data={AUDIENCE_DATA} cx="50%" cy="50%" innerRadius={38} outerRadius={58} dataKey="value" paddingAngle={3}>
                  {AUDIENCE_DATA.map((entry, idx) => (
                    <Cell key={idx} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div className="flex flex-col gap-2 flex-1">
              {AUDIENCE_DATA.map((d) => (
                <div key={d.name} className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full shrink-0" style={{ background: d.color }} />
                  <span className="text-[11px] font-bold text-[var(--color-secondary)]/60 flex-1">{d.name}</span>
                  <span className="text-[12px] font-black text-[var(--color-secondary)]">{d.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Category Scores — Bar Chart */}
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={grace(0.55)}
          className="bg-[var(--card)] rounded-2xl border border-[var(--border)] shadow-sm p-4">
          <h3 className="font-black text-[13px] text-[var(--color-secondary)] uppercase tracking-widest mb-4">Category Scores</h3>
          <ResponsiveContainer width="100%" height={160}>
            <BarChart data={CATEGORY_DATA} layout="vertical" margin={{ top: 0, right: 0, left: 0, bottom: 0 }} barSize={10}>
              <XAxis type="number" domain={[0, 100]} tick={{ fontSize: 9, fontWeight: 700, fill: "var(--color-secondary)", opacity: 0.4 }} axisLine={false} tickLine={false} />
              <YAxis type="category" dataKey="label" width={90} tick={{ fontSize: 9, fontWeight: 700, fill: "var(--color-secondary)", opacity: 0.6 }} axisLine={false} tickLine={false} />
              <Tooltip
                contentStyle={{ borderRadius: 12, border: "1px solid var(--border)", fontSize: 11, fontWeight: 700 }}
              />
              <Bar dataKey="score" fill="var(--color-primary)" radius={[0, 6, 6, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Action row */}
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={grace(0.65)}
          className="grid grid-cols-2 gap-3">
          <button
            onClick={() => { if (navigator.share) { navigator.share({ title: "Survey Analytics Report", text: "Check out this survey report", url: window.location.href }).catch(() => {}); } else { navigator.clipboard.writeText(window.location.href).catch(() => {}); toast.success("Link copied to clipboard!"); } }}
            className="h-[56px] flex items-center justify-center gap-2 bg-[var(--color-primary)] rounded-2xl text-white font-black text-[11px] uppercase tracking-widest shadow-sm active:scale-95 transition-all">
            Share Report <ChevronRight size={14} strokeWidth={3} />
          </button>
          <button
            onClick={() => navigate("/surveys-polls")}
            className="h-[56px] flex items-center justify-center gap-2 bg-[var(--card)] border border-[var(--border)] rounded-2xl text-[var(--color-secondary)] font-black text-[11px] uppercase tracking-widest shadow-sm active:scale-95 transition-all">
            All Surveys
          </button>
        </motion.div>

      </div>
    </div>
  );
}
