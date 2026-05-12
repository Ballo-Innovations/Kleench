import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowLeft, CheckCircle2, ChevronRight, MessageSquare, BarChart2, CircleDot, CheckCheck } from "lucide-react";
import { useNavigate } from "react-router";

import eczLogo from "@/assets/ecz logo.png";
import lazLogo from "@/assets/Laz Logo.jpeg";
import fazLogo from "@/assets/faz logo.png";

const grace = (delay = 0) => ({
  delay,
  duration: 0.5,
  ease: [0.22, 1, 0.36, 1] as const,
});

const TABS = [
  { id: "all", label: "All", icon: BarChart2 },
  { id: "open", label: "Open", icon: CircleDot },
  { id: "discussions", label: "Discuss", icon: MessageSquare },
  { id: "completed", label: "Done", icon: CheckCheck },
];

type PollOption = { id: string; text: string; votes: number; color: string };
type Poll = {
  id: string;
  title: string;
  question: string;
  logo: string | null;
  options: PollOption[];
  status: "open" | "completed";
  discussionCount: number;
};

const ALL_POLLS: Poll[] = [
  {
    id: "1",
    title: "ECZ",
    question: "Which institution do you trust the most?",
    logo: eczLogo,
    options: [
      { id: "opt1", text: "UNZA", votes: 72, color: "bg-[#FFA500]" },
      { id: "opt2", text: "Other", votes: 28, color: "bg-[#228B22]" },
    ],
    status: "open",
    discussionCount: 14,
  },
  {
    id: "2",
    title: "LAZ",
    question: "Who should lead the legal association?",
    logo: lazLogo,
    options: [
      { id: "opt1", text: "Charles", votes: 45, color: "bg-[#000080]" },
      { id: "opt2", text: "Mwansa", votes: 55, color: "bg-black" },
    ],
    status: "open",
    discussionCount: 7,
  },
  {
    id: "3",
    title: "FAZ",
    question: "Best coach candidate for the national team?",
    logo: fazLogo,
    options: [
      { id: "opt1", text: "Thomas", votes: 10, color: "bg-[#808080]" },
      { id: "opt2", text: "Peter", votes: 90, color: "bg-[#FF0000]" },
    ],
    status: "completed",
    discussionCount: 22,
  },
];

const DISCUSSION_MESSAGES = [
  { id: 1, user: "Chanda M.", time: "2h ago", text: "I think UNZA has a stronger track record overall." },
  { id: 2, user: "Bwalya K.", time: "4h ago", text: "The data here is very interesting — surprised by the gap!" },
  { id: 3, user: "Mutale F.", time: "6h ago", text: "Would love to see the breakdown by province." },
];

function PollCard({ poll, voted, onVote }: { poll: Poll; voted: Record<string, string>; onVote: (pollId: string, optId: string) => void }) {
  const userVote = voted[poll.id];
  const hasVoted = !!userVote;

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={grace(0.05)}
      className="bg-[var(--card)] rounded-2xl border border-[var(--border)] shadow-sm p-4 mb-4">
      {/* Poll header */}
      <div className="flex items-center gap-2 mb-3">
        {poll.logo && (
          <div className="w-7 h-7 rounded-full overflow-hidden border border-[var(--border)] flex items-center justify-center bg-[var(--card)] shrink-0">
            <img src={poll.logo} alt={poll.title} className="w-full h-full object-contain mix-blend-multiply" />
          </div>
        )}
        <div className="flex-1">
          <span className="text-[10px] font-black text-[var(--color-primary)] uppercase tracking-widest">{poll.title}</span>
          {poll.status === "completed" && (
            <span className="ml-2 text-[9px] font-black bg-green-100 text-green-600 px-2 py-0.5 rounded-full uppercase tracking-wider">Closed</span>
          )}
        </div>
        <div className="flex items-center gap-1 text-[var(--color-secondary)]/40">
          <MessageSquare size={11} strokeWidth={2} />
          <span className="text-[10px] font-bold">{poll.discussionCount}</span>
        </div>
      </div>

      <p className="font-black text-[14px] text-[var(--color-secondary)] leading-tight mb-4">{poll.question}</p>

      {/* Options */}
      <div className="space-y-2">
        {poll.options.map((opt) => (
          <button
            key={opt.id}
            onClick={() => !hasVoted && poll.status === "open" && onVote(poll.id, opt.id)}
            disabled={hasVoted || poll.status === "completed"}
            className={`w-full relative overflow-hidden rounded-xl border text-left transition-all min-h-[48px] ${userVote === opt.id ? 'border-[var(--color-primary)] shadow-sm' : 'border-[var(--border)]'} bg-[var(--card)]`}>

            {/* Progress fill after voting */}
            {(hasVoted || poll.status === "completed") && (
              <motion.div
                initial={{ width: 0 }} animate={{ width: `${opt.votes}%` }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
                className={`absolute top-0 left-0 bottom-0 ${opt.color} opacity-15`}
              />
            )}

            <div className="relative z-10 px-4 py-3 flex items-center justify-between">
              <span className={`font-black text-[13px] ${userVote === opt.id ? 'text-[var(--color-primary)]' : 'text-[var(--color-secondary)]'}`}>
                {opt.text}
              </span>
              {(hasVoted || poll.status === "completed") ? (
                <div className="flex items-center gap-2">
                  {userVote === opt.id && <CheckCircle2 size={13} className="text-[var(--color-primary)]" strokeWidth={2.5} />}
                  <span className="font-black text-[13px] text-[var(--color-secondary)]">{opt.votes}%</span>
                </div>
              ) : (
                <div className={`w-4 h-4 rounded-full border-2 transition-colors ${userVote === opt.id ? 'border-[var(--color-primary)]' : 'border-[var(--border)]'}`} />
              )}
            </div>
          </button>
        ))}
      </div>

      {hasVoted && (
        <motion.p initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={grace(0.4)}
          className="mt-3 text-[10px] font-black text-green-500 uppercase tracking-widest flex items-center gap-1">
          <CheckCircle2 size={11} strokeWidth={3} /> Vote locked in
        </motion.p>
      )}
    </motion.div>
  );
}

export function PollViewer() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("all");
  const [voted, setVoted] = useState<Record<string, string>>({});

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleVote = (pollId: string, optId: string) => {
    setVoted(prev => ({ ...prev, [pollId]: optId }));
  };

  const filteredPolls = ALL_POLLS.filter(p => {
    if (activeTab === "all") return true;
    if (activeTab === "open") return p.status === "open";
    if (activeTab === "completed") return p.status === "completed";
    if (activeTab === "discussions") return p.discussionCount > 0;
    return true;
  });

  return (
    <div className="w-full max-w-md mx-auto min-h-screen font-sans bg-[var(--app-bg)] relative">

      {/* Header */}
      <div className="sticky top-0 pt-4 pb-4 px-5 flex items-center justify-between z-20 bg-[var(--card)]/80 backdrop-blur-xl border-b border-[var(--border)]">
        <button onClick={() => navigate(-1)} className="w-10 h-10 rounded-full bg-[var(--card)] shadow-sm border border-[var(--border)] flex items-center justify-center active:scale-90 transition-transform">
          <ArrowLeft size={16} className="text-[var(--color-secondary)]"/>
        </button>
        <span className="font-black text-[10px] text-[var(--color-secondary)] uppercase tracking-widest">Live Polls</span>
        <button onClick={() => navigate("/poll/analytics")} className="w-10 h-10 rounded-full bg-[var(--color-primary)]/10 flex items-center justify-center active:scale-90 transition-transform">
          <BarChart2 size={16} className="text-[var(--color-primary)]" strokeWidth={2} />
        </button>
      </div>

      {/* Tabs */}
      <div className="px-5 pt-4 pb-2">
        <div className="flex gap-1 p-1 bg-[var(--app-bg-muted)] rounded-2xl">
          {TABS.map(({ id, label, icon: Icon }) => (
            <button key={id} onClick={() => setActiveTab(id)}
              className={`flex-1 py-2 rounded-xl flex items-center justify-center gap-1.5 font-black text-[10px] uppercase tracking-wider transition-all ${activeTab === id ? 'bg-[var(--card)] text-[var(--color-primary)] shadow-sm' : 'text-[var(--color-secondary)]/50'}`}>
              <Icon size={12} strokeWidth={2.5} />
              {label}
            </button>
          ))}
        </div>
      </div>

      <div className="px-5 py-4">
        <AnimatePresence mode="wait">
          {activeTab === "discussions" ? (
            <motion.div key="discussions" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={grace()}>
              <p className="text-[11px] font-black uppercase tracking-widest text-[var(--color-secondary)]/40 mb-4">Community Discussion</p>
              <div className="space-y-3">
                {DISCUSSION_MESSAGES.map((msg) => (
                  <div key={msg.id} className="bg-[var(--card)] rounded-2xl border border-[var(--border)] shadow-sm p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-black text-[12px] text-[var(--color-secondary)]">{msg.user}</span>
                      <span className="text-[10px] font-bold text-[var(--color-secondary)]/40">{msg.time}</span>
                    </div>
                    <p className="text-[13px] font-semibold text-[var(--color-secondary)]/70 leading-relaxed">{msg.text}</p>
                  </div>
                ))}
              </div>
              <button className="mt-4 w-full py-4 rounded-2xl border border-dashed border-[var(--color-primary)]/40 text-[var(--color-primary)] font-black uppercase tracking-widest text-[12px] bg-[var(--color-primary)]/5 active:scale-95 transition-all">
                Join Discussion
              </button>
            </motion.div>
          ) : (
            <motion.div key={activeTab} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={grace()}>
              {filteredPolls.length === 0 ? (
                <div className="text-center py-16">
                  <CheckCheck size={32} className="text-[var(--color-secondary)]/20 mx-auto mb-3" />
                  <p className="font-black text-[13px] text-[var(--color-secondary)]/30 uppercase tracking-widest">No polls here yet</p>
                </div>
              ) : (
                filteredPolls.map(poll => (
                  <PollCard key={poll.id} poll={poll} voted={voted} onVote={handleVote} />
                ))
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* View analytics CTA */}
        <button onClick={() => navigate("/poll/analytics")}
          className="w-full mt-2 h-[52px] flex items-center justify-center gap-2 bg-[var(--color-primary)] rounded-2xl text-white font-black text-[12px] uppercase tracking-widest shadow-sm active:scale-95 transition-all">
          View Results & Analytics <ChevronRight size={14} strokeWidth={3} />
        </button>
      </div>
    </div>
  );
}
