import { useNavigate } from "react-router";
import { motion } from "motion/react";
import { ChevronRight, Download, Share2, GitCompare } from "lucide-react";
import { toast } from "sonner";
import { PageHeader } from "../components/PageHeader";
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

const grace = (delay = 0) => ({
  delay,
  duration: 0.5,
  ease: [0.22, 1, 0.36, 1] as const,
});

const DONUT_DATA = [
  { name: "UNZA", value: 72, color: "#FF6B00" },
  { name: "Other", value: 28, color: "#FFB800" },
];

const TIMELINE_DATA = [
  { time: "6am", votes: 4 },
  { time: "9am", votes: 18 },
  { time: "12pm", votes: 45 },
  { time: "3pm", votes: 62 },
  { time: "6pm", votes: 38 },
  { time: "9pm", votes: 21 },
];

const DEMOGRAPHICS = [
  { label: "18–24", val1: 68, val2: 32 },
  { label: "25–34", val1: 74, val2: 26 },
  { label: "35–44", val1: 65, val2: 35 },
  { label: "45+", val1: 80, val2: 20 },
];

const ACTIVE_POLLS = [
  { id: "1", title: "ECZ: Institutional Trust", totalVotes: 225, c1: "#FF6B00", c2: "#FFB800", p1: 72, p2: 28 },
  { id: "2", title: "LAZ: Leadership", totalVotes: 148, c1: "#000080", c2: "#000000", p1: 45, p2: 55 },
  { id: "3", title: "FAZ: Best Coach", totalVotes: 310, c1: "#808080", c2: "#FF0000", p1: 10, p2: 90 },
];

export function PollAnalytics() {
  const navigate = useNavigate();

  return (
    <div className="w-full pb-32 relative min-h-screen bg-transparent font-sans text-[var(--color-secondary)]">
      <div className="sticky top-0 z-50">
        <PageHeader title="POLL ANALYTICS" showBack onBack={() => navigate(-1)} />
      </div>

      <div className="px-5 py-5 space-y-5">

        {/* Featured poll stats */}
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={grace(0.05)}
          className="bg-[var(--card)] rounded-2xl border border-[var(--border)] shadow-sm p-4">
          <div className="flex items-start justify-between mb-1">
            <div>
              <p className="text-[10px] font-black uppercase tracking-widest text-[var(--color-primary)] mb-0.5">Featured Poll</p>
              <h3 className="font-black text-[15px] text-[var(--color-secondary)] leading-tight">ECZ: Institutional Trust</h3>
            </div>
            <div className="text-right">
              <p className="font-black text-[22px] text-[var(--color-secondary)] leading-none">225</p>
              <p className="text-[10px] font-bold text-[var(--color-secondary)]/40 uppercase tracking-wide">total votes</p>
            </div>
          </div>
        </motion.div>

        {/* Donut + legend */}
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={grace(0.15)}
          className="bg-[var(--card)] rounded-2xl border border-[var(--border)] shadow-sm p-4">
          <h3 className="font-black text-[13px] text-[var(--color-secondary)] uppercase tracking-widest mb-4">Vote Distribution</h3>
          <div className="flex items-center gap-6">
            <ResponsiveContainer width={130} height={130}>
              <PieChart>
                <Pie data={DONUT_DATA} cx="50%" cy="50%" innerRadius={40} outerRadius={58} dataKey="value" paddingAngle={3} startAngle={90} endAngle={-270}>
                  {DONUT_DATA.map((entry, idx) => (
                    <Cell key={idx} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div className="flex flex-col gap-3 flex-1">
              {DONUT_DATA.map((d) => (
                <div key={d.name} className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full shrink-0" style={{ background: d.color }} />
                  <div className="flex-1">
                    <div className="flex justify-between mb-1">
                      <span className="text-[11px] font-black text-[var(--color-secondary)]">{d.name}</span>
                      <span className="text-[11px] font-black text-[var(--color-secondary)]">{d.value}%</span>
                    </div>
                    <div className="w-full h-1.5 bg-[var(--border)] rounded-full overflow-hidden">
                      <div className="h-full rounded-full" style={{ width: `${d.value}%`, background: d.color }} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Voting timeline — Line chart */}
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={grace(0.25)}
          className="bg-[var(--card)] rounded-2xl border border-[var(--border)] shadow-sm p-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-black text-[13px] text-[var(--color-secondary)] uppercase tracking-widest">Voting Timeline</h3>
            <span className="text-[10px] font-bold text-[var(--color-secondary)]/40 uppercase">Today</span>
          </div>
          <ResponsiveContainer width="100%" height={140}>
            <LineChart data={TIMELINE_DATA} margin={{ top: 4, right: 4, left: -28, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
              <XAxis dataKey="time" tick={{ fontSize: 9, fontWeight: 700, fill: "var(--color-secondary)", opacity: 0.4 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 9, fontWeight: 700, fill: "var(--color-secondary)", opacity: 0.4 }} axisLine={false} tickLine={false} />
              <Tooltip
                contentStyle={{ borderRadius: 12, border: "1px solid var(--border)", fontSize: 11, fontWeight: 700 }}
                labelStyle={{ color: "var(--color-secondary)", fontWeight: 900 }}
              />
              <Line type="monotone" dataKey="votes" stroke="var(--color-primary)" strokeWidth={2.5} dot={{ r: 4, fill: "var(--color-primary)", strokeWidth: 0 }} activeDot={{ r: 6 }} />
            </LineChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Demographics */}
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={grace(0.35)}
          className="bg-[var(--card)] rounded-2xl border border-[var(--border)] shadow-sm p-4">
          <h3 className="font-black text-[13px] text-[var(--color-secondary)] uppercase tracking-widest mb-4">Demographics</h3>
          <div className="space-y-3">
            {DEMOGRAPHICS.map((d) => (
              <div key={d.label}>
                <div className="flex justify-between mb-1">
                  <span className="text-[10px] font-black text-[var(--color-secondary)]/50 uppercase tracking-wide">{d.label}</span>
                  <span className="text-[10px] font-bold text-[var(--color-secondary)]/40">{d.val1}% / {d.val2}%</span>
                </div>
                <div className="w-full h-[20px] rounded-full flex overflow-hidden border border-[var(--border)]">
                  <div className="h-full bg-[#FF6B00] flex items-center justify-center" style={{ width: `${d.val1}%` }}>
                    <span className="text-[9px] font-black text-white">{d.val1}%</span>
                  </div>
                  <div className="h-full bg-[#FFB800] flex items-center justify-center" style={{ width: `${d.val2}%` }}>
                    <span className="text-[9px] font-black text-white">{d.val2}%</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* All polls summary */}
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={grace(0.45)}
          className="bg-[var(--card)] rounded-2xl border border-[var(--border)] shadow-sm p-4">
          <h3 className="font-black text-[13px] text-[var(--color-secondary)] uppercase tracking-widest mb-3">All Polls</h3>
          {ACTIVE_POLLS.map((p, i) => (
            <div key={p.id}>
              <div className="flex items-center gap-3 py-3">
                <div className="flex-1 min-w-0">
                  <p className="text-[12px] font-black text-[var(--color-secondary)] truncate">{p.title}</p>
                  <p className="text-[10px] font-bold text-[var(--color-secondary)]/40">{p.totalVotes} votes</p>
                </div>
                <div className="w-[100px] h-[18px] rounded-full flex overflow-hidden border border-[var(--border)] shrink-0">
                  <div className="h-full" style={{ width: `${p.p1}%`, background: p.c1 }} />
                  <div className="h-full" style={{ width: `${p.p2}%`, background: p.c2 }} />
                </div>
              </div>
              {i < ACTIVE_POLLS.length - 1 && <div className="border-b border-[var(--border)]" />}
            </div>
          ))}
        </motion.div>

        {/* Actions */}
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={grace(0.55)}
          className="grid grid-cols-3 gap-3">
          <button onClick={() => { if (navigator.share) { navigator.share({ title: "Poll Analytics", text: "Check out these poll results", url: window.location.href }).catch(() => {}); } else { navigator.clipboard.writeText(window.location.href).catch(() => {}); toast.success("Link copied to clipboard!"); } }}
            className="h-[52px] flex flex-col items-center justify-center gap-1 bg-[var(--card)] border border-[var(--border)] rounded-2xl text-[var(--color-secondary)] font-black text-[9px] uppercase tracking-wider shadow-sm active:scale-95 transition-all">
            <Share2 size={16} strokeWidth={2} className="text-[var(--color-primary)]" />
            Share
          </button>
          <button onClick={() => toast.success("Report exported successfully!")}
            className="h-[52px] flex flex-col items-center justify-center gap-1 bg-[var(--card)] border border-[var(--border)] rounded-2xl text-[var(--color-secondary)] font-black text-[9px] uppercase tracking-wider shadow-sm active:scale-95 transition-all">
            <Download size={16} strokeWidth={2} className="text-[var(--color-primary)]" />
            Export
          </button>
          <button onClick={() => toast.info("Comparison feature coming soon!")}
            className="h-[52px] flex flex-col items-center justify-center gap-1 bg-[var(--card)] border border-[var(--border)] rounded-2xl text-[var(--color-secondary)] font-black text-[9px] uppercase tracking-wider shadow-sm active:scale-95 transition-all">
            <GitCompare size={16} strokeWidth={2} className="text-[var(--color-primary)]" />
            Compare
          </button>
        </motion.div>

        <motion.button initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={grace(0.62)}
          onClick={() => navigate("/surveys-polls")}
          className="w-full h-[52px] flex items-center justify-center gap-2 bg-[var(--color-primary)] rounded-2xl text-white font-black text-[12px] uppercase tracking-widest shadow-sm active:scale-95 transition-all">
          Back to Hub <ChevronRight size={14} strokeWidth={3} />
        </motion.button>

      </div>
    </div>
  );
}
