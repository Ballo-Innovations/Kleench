import { useState } from "react";
import { useNavigate, useLocation } from "react-router";
import { Check } from "lucide-react";
import { motion } from "motion/react";

interface Question {
  text: string;
  options: string[];
  type: "yesno" | "radio";
}

const DEFAULT_AD_QUESTIONS: Question[] = [
  {
    text: "Do you think the price of our product is fair?",
    options: ["Yes", "No"],
    type: "yesno",
  },
  {
    text: "Which alternative brand do you think is better?",
    options: ["Boom", "Sunlight", "Unilever"],
    type: "radio",
  },
];

const DEFAULT_LEARN_QUESTIONS: Question[] = [
  {
    text: "Do you think this was very educational?",
    options: ["Yes", "No"],
    type: "yesno",
  },
  {
    text: "Which alternative university in Zambia do you think is better?",
    options: ["CBU", "UNZA", "UNILAS"],
    type: "radio",
  },
];

export function AdvertQuestionnaire() {
  const navigate = useNavigate();
  const location = useLocation();
  const isLearn = location.state?.isLearn ?? false;
  const questions: Question[] = location.state?.questions ?? (isLearn ? DEFAULT_LEARN_QUESTIONS : DEFAULT_AD_QUESTIONS);

  const [answers, setAnswers] = useState<Record<number, string>>({});

  const setAnswer = (qIndex: number, option: string) => {
    setAnswers((prev) => ({ ...prev, [qIndex]: option }));
  };

  const handleComplete = () => {
    navigate(-1);
  };

  return (
    <div className="fixed inset-0 bg-black/90 flex flex-col justify-end z-50 max-w-md mx-auto">
      {/* Blurred ad thumbnail */}
      <div className="flex-1 flex items-center justify-center">
        <div className="w-full h-full bg-gradient-to-b from-slate-800 to-slate-900 blur-sm" />
      </div>

      <motion.div
        initial={{ y: "100%" }}
        animate={{ y: 0 }}
        transition={{ type: "spring", damping: 25, stiffness: 200 }}
        className="bg-black rounded-t-3xl px-6 pt-5 pb-[env(safe-area-inset-bottom)] pb-8"
      >
        <div className="w-10 h-1 bg-slate-700 rounded-full mx-auto mb-5" />
        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">
          {isLearn ? "Learning Questionnaire" : "Ad Questionnaire"}
        </p>

        <div className="space-y-6">
          {questions.map((q, i) => (
            <div key={i}>
              <p className="text-white text-sm font-semibold mb-3 leading-snug">{q.text}</p>
              <div className="space-y-2.5">
                {q.options.map((opt, j) => {
                  const selected = answers[i] === opt;
                  return (
                    <button
                      key={opt}
                      onClick={() => setAnswer(i, opt)}
                      className="w-full flex items-center gap-3 text-left"
                    >
                      <span className="text-slate-400 text-sm w-5 flex-shrink-0">
                        {String.fromCharCode(97 + j)})
                      </span>
                      <span className="flex-1 text-sm text-white font-medium">{opt}</span>
                      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all ${
                        selected ? "border-green-500 bg-green-500" : "border-slate-500"
                      }`}>
                        {selected && <Check size={11} className="text-white" strokeWidth={3} />}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        <button
          onClick={handleComplete}
          className="w-full bg-blue-600 text-white py-4 rounded-2xl font-black text-base uppercase tracking-widest mt-6 active:scale-95 transition-all shadow-lg shadow-blue-600/30"
        >
          Complete
        </button>
      </motion.div>
    </div>
  );
}
