import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowLeft, CheckCircle2, Wallet, ThumbsDown, Frown, Minus, Smile, ThumbsUp, Sparkles } from "lucide-react";
import { useNavigate, useParams } from "react-router";

const grace = (delay = 0) => ({
  delay,
  duration: 0.5,
  ease: [0.22, 1, 0.36, 1] as const,
});

const RATING_ICONS = [
  { Icon: ThumbsDown, label: "Terrible", val: 1, color: "text-red-500" },
  { Icon: Frown, label: "Bad", val: 2, color: "text-orange-400" },
  { Icon: Minus, label: "Okay", val: 3, color: "text-yellow-500" },
  { Icon: Smile, label: "Good", val: 4, color: "text-lime-500" },
  { Icon: ThumbsUp, label: "Great", val: 5, color: "text-green-500" },
];

const MOCK_QUESTIONS = [
  { id: 1, type: "multiple", q: "How often do you use our solar products?", options: ["Daily", "Weekly", "Monthly", "Rarely"] },
  { id: 2, type: "yes_no", q: "Would you recommend us to a friend?" },
  { id: 3, type: "emoji_rating", q: "How satisfied are you with our customer support?" },
  { id: 4, type: "text", q: "What feature should we build next?" },
];

const REWARD_AMOUNT = "K5.00";

export function SurveyViewer() {
  const navigate = useNavigate();
  useParams();
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [completed, setCompleted] = useState(false);
  const [rewardVisible, setRewardVisible] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (completed) {
      const t = setTimeout(() => setRewardVisible(true), 800);
      return () => clearTimeout(t);
    }
  }, [completed]);

  const handleAnswer = (ans: string) => {
    setAnswers({ ...answers, [currentQ]: ans });
    setTimeout(() => {
      if (currentQ < MOCK_QUESTIONS.length - 1) {
        setCurrentQ(prev => prev + 1);
      } else {
        setCompleted(true);
      }
    }, 400);
  };

  if (completed) {
    return (
      <div className="w-full max-w-md mx-auto bg-[var(--color-primary)] flex flex-col items-center justify-center text-white px-6 font-sans relative overflow-hidden">
        {/* Decorative rings */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full border border-white/5 pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] rounded-full border border-white/5 pointer-events-none" />

        <motion.div initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ type: "spring", delay: 0.1 }}
          className="mb-6 bg-[var(--card)]/10 p-6 rounded-full backdrop-blur-sm">
          <CheckCircle2 size={64} strokeWidth={1.5} />
        </motion.div>

        <motion.h1 initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={grace(0.2)}
          className="font-black text-2xl uppercase tracking-[0.1em] mb-3 text-center">
          Survey Completed
        </motion.h1>

        <motion.p initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={grace(0.3)}
          className="text-center text-white/70 font-bold text-[13px] leading-relaxed mb-8 max-w-[250px]">
          Thank you for your valuable feedback. Your data is secure and encrypted.
        </motion.p>

        {/* Reward reveal */}
        <AnimatePresence>
          {rewardVisible && (
            <motion.div
              initial={{ scale: 0.5, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              transition={{ type: "spring", stiffness: 260, damping: 20 }}
              className="mb-8 w-full">
              <div className="bg-[var(--card)]/15 backdrop-blur-sm rounded-2xl p-5 border border-white/20 flex items-center gap-4">
                <div className="w-14 h-14 rounded-full bg-[var(--card)]/20 flex items-center justify-center shrink-0">
                  <Sparkles size={28} className="text-white" strokeWidth={1.5} />
                </div>
                <div className="flex-1">
                  <p className="text-white/70 text-[10px] font-black uppercase tracking-widest mb-1">Reward Earned</p>
                  <p className="text-white font-black text-[28px] leading-none">{REWARD_AMOUNT}</p>
                  <p className="text-white/60 text-[10px] font-bold mt-1">Added to your Kleench wallet</p>
                </div>
                <motion.div
                  initial={{ rotate: -20, scale: 0 }}
                  animate={{ rotate: 0, scale: 1 }}
                  transition={{ type: "spring", delay: 0.2 }}
                  className="w-8 h-8 rounded-full bg-green-400 flex items-center justify-center">
                  <CheckCircle2 size={16} className="text-white" strokeWidth={3} />
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* CTA buttons */}
        <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={grace(0.4)} className="w-full space-y-3">
          <button onClick={() => navigate("/wallet")}
            className="w-full bg-[var(--card)] text-[var(--color-primary)] py-4 rounded-2xl font-black uppercase tracking-widest text-[12px] shadow-xl active:scale-95 transition-all flex items-center justify-center gap-2">
            <Wallet size={16} /> View Wallet
          </button>
          <button onClick={() => { setCompleted(false); setCurrentQ(0); setAnswers({}); setRewardVisible(false); }}
            className="w-full bg-[var(--card)]/15 border border-white/20 text-white py-4 rounded-2xl font-black uppercase tracking-widest text-[12px] active:scale-95 transition-all backdrop-blur-sm">
            Take Another Survey
          </button>
          <button onClick={() => navigate("/surveys-polls")}
            className="w-full text-white/60 py-2 font-bold text-[12px] active:scale-95 transition-all">
            Back to Hub
          </button>
        </motion.div>
      </div>
    );
  }

  const q = MOCK_QUESTIONS[currentQ];
  const progress = (currentQ / MOCK_QUESTIONS.length) * 100;

  return (
    <div className="w-full max-w-md mx-auto font-sans bg-transparent relative">

      {/* Sticky Header + Progress */}
      <div className="sticky top-0 z-20 bg-[var(--card)]/80 backdrop-blur-xl border-b border-[var(--border)]">
        <div className="pt-4 pb-3 px-5 flex items-center justify-between">
          <button onClick={() => navigate(-1)} className="w-10 h-10 rounded-full bg-[var(--card)] shadow-sm border border-[var(--border)] flex items-center justify-center active:scale-90 transition-transform">
            <ArrowLeft size={16} className="text-[var(--color-secondary)]"/>
          </button>
          <span className="font-black text-[10px] text-[var(--color-secondary)] uppercase tracking-widest">
            {currentQ + 1} / {MOCK_QUESTIONS.length}
          </span>
        </div>
        <div className="px-5 pb-3">
          <div className="w-full h-1.5 bg-[var(--border)] rounded-full overflow-hidden">
            <motion.div className="h-full bg-[var(--color-primary)]" initial={{ width: 0 }} animate={{ width: `${progress}%` }} transition={{ ease: "easeOut" }} />
          </div>
        </div>
      </div>

      <div className="px-5">
        <motion.h2 key={`q-${currentQ}`} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={grace()}
          className="font-black text-[22px] leading-tight text-[var(--color-secondary)] mb-8 tracking-tight">
          {q.q}
        </motion.h2>

        <motion.div key={`opts-${currentQ}`} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={grace(0.1)} className="space-y-3">

          {q.type === "multiple" && q.options?.map((opt) => (
            <button key={opt} onClick={() => handleAnswer(opt)}
              className="w-full p-4 rounded-2xl border border-[var(--border)] bg-[var(--card)] text-left active:scale-95 transition-all flex items-center justify-between group hover:border-[var(--color-primary)]">
              <span className="font-bold text-[14px] text-[var(--color-secondary)] group-hover:text-[var(--color-primary)] transition-colors">{opt}</span>
              <div className="w-5 h-5 rounded-full border-2 border-[var(--border)] group-hover:border-[var(--color-primary)] transition-colors" />
            </button>
          ))}

          {q.type === "yes_no" && (
            <div className="grid grid-cols-2 gap-4">
              {["Yes", "No"].map((opt) => (
                <button key={opt} onClick={() => handleAnswer(opt)}
                  className="py-5 rounded-2xl border border-[var(--border)] bg-[var(--card)] active:scale-95 transition-all flex flex-col items-center justify-center gap-2 hover:border-[var(--color-primary)] group">
                  <span className="font-black uppercase tracking-widest text-[16px] text-[var(--color-secondary)] group-hover:text-[var(--color-primary)]">{opt}</span>
                </button>
              ))}
            </div>
          )}

          {q.type === "emoji_rating" && (
            <div className="flex justify-between gap-2 py-4">
              {RATING_ICONS.map(({ Icon, label, val, color }) => (
                <button key={val} onClick={() => handleAnswer(String(val))}
                  className="flex-1 flex flex-col items-center gap-2 p-3 rounded-2xl border border-[var(--border)] bg-[var(--card)] active:scale-90 transition-all hover:border-[var(--color-primary)] group">
                  <Icon size={22} className={`${color} group-hover:scale-110 transition-transform`} strokeWidth={1.5} />
                  <span className="text-[9px] font-black text-[var(--color-secondary)]/40 uppercase tracking-wide">{label}</span>
                </button>
              ))}
            </div>
          )}

          {q.type === "text" && (
            <div>
              <textarea
                className="w-full p-4 rounded-2xl border border-[var(--border)] bg-[var(--card)] font-bold text-[14px] text-[var(--color-secondary)] outline-none focus:border-[var(--color-primary)] transition-colors resize-none min-h-[120px]"
                placeholder="Type your answer here..."
                onChange={(e) => setAnswers({...answers, [currentQ]: e.target.value})}
                value={answers[currentQ] || ""}
              />
              <button onClick={() => handleAnswer(answers[currentQ] || "Skipped")}
                className="w-full mt-4 py-4 rounded-2xl bg-[var(--color-primary)] text-white font-black uppercase tracking-widest text-[13px] shadow-md active:scale-95 transition-transform">
                Submit Answer
              </button>
            </div>
          )}

        </motion.div>
      </div>

    </div>
  );
}
