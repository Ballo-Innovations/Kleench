// ─────────────────────────────────────────────────────────────
// KLEENCH LEARNING — Certified Courses catalog & progress store
// Single source of truth for the structured learning flows:
// Course Hub → Lessons → Questions → Assessments → Certificates
// ─────────────────────────────────────────────────────────────

import learnWoman from "@/assets/learning/learn_woman_1775596426630.png";
import learnBook from "@/assets/learning/learn_book_1775596454115.png";
import learnChart from "@/assets/learning/learn_chart_1775596868170.png";
import learnMountain from "@/assets/learning/learn_mountain_1775596850615.png";
import learnPresenter from "@/assets/learning/learn_presenter_1775596479989.png";

// ── Types ────────────────────────────────────────────────────

export type QuestionType = "standard" | "quantitative" | "qualitative";

export interface AssessmentQuestion {
  id: string;
  type: QuestionType;
  question: string;
  scenario?: string;          // quantitative only
  options?: string[];         // standard + quantitative
  correct?: number;           // index of correct option (objective only)
  feedback?: string;
  maxChars?: number;          // qualitative only
}

export interface Lesson {
  id: string;
  title: string;
  duration: string;
  image: string;
  description: string;
}

export interface CourseModule {
  id: string;
  title: string;
  lessons: Lesson[];
  questions: AssessmentQuestion[];
  assignment?: string;
  timed?: boolean;
  timeLimitMins?: number;
}

export interface Course {
  id: string;
  title: string;
  instructor: string;
  category: string;
  image: string;
  description: string;
  passingScore: number;       // percentage
  modules: CourseModule[];
}

// ── Catalog ──────────────────────────────────────────────────

export const COURSES: Course[] = [
  {
    id: "cf-101",
    title: "Financial Literacy Mastery",
    instructor: "Peter M S Lengalenga",
    category: "Finance",
    image: learnChart,
    description:
      "A structured journey from money foundations to long-term wealth strategy. Built for the Zambian market with practical budgeting frameworks, market awareness drills and certified assessments at every stage.",
    passingScore: 70,
    modules: [
      {
        id: "m1",
        title: "Money Foundations",
        assignment: "Draft a 30-day personal cash flow map",
        lessons: [
          { id: "m1-l1", title: "How Money Actually Works", duration: "12:40", image: learnBook, description: "Understand the mechanics of money — income, expenditure, inflation and why your Kwacha loses value when it sleeps. This lesson sets the vocabulary used across the whole course." },
          { id: "m1-l2", title: "The Savings Hierarchy", duration: "09:15", image: learnWoman, description: "Emergency funds, sinking funds and goal-based saving. Learn the exact order to build your safety layers before you ever think about investing." },
          { id: "m1-l3", title: "Debt: Tool or Trap", duration: "14:05", image: learnMountain, description: "Good leverage versus consumption debt. How to read interest terms, spot predatory lending and use credit to build rather than bleed." },
        ],
        questions: [
          { id: "m1-q1", type: "standard", question: "An emergency fund should be built before any long-term investment.", options: ["True", "False"], correct: 0, feedback: "Liquidity always comes first — emergencies don't wait for markets to recover." },
          { id: "m1-q2", type: "standard", question: "Inflation increases the purchasing power of idle cash.", options: ["True", "False"], correct: 1, feedback: "Inflation erodes idle cash. Money must work to keep its value." },
          { id: "m1-q3", type: "standard", question: "All debt is harmful and should be avoided entirely.", options: ["True", "False"], correct: 1, feedback: "Productive debt that generates income can accelerate wealth building." },
          { id: "m1-q4", type: "standard", question: "A sinking fund is money set aside for a known future expense.", options: ["True", "False"], correct: 0, feedback: "Exactly — sinking funds remove the shock from predictable costs." },
        ],
      },
      {
        id: "m2",
        title: "Budgeting & Markets",
        assignment: "Build a 50/30/20 budget for one full month",
        timed: true,
        timeLimitMins: 10,
        lessons: [
          { id: "m2-l1", title: "The 50/30/20 Framework", duration: "11:30", image: learnChart, description: "Needs, wants and wealth — the simplest allocation system that survives real life. Includes adaptations for irregular income earners." },
          { id: "m2-l2", title: "Reading Market Signals", duration: "16:20", image: learnPresenter, description: "Exchange rates, fuel prices and food indices — how macro signals should change your monthly money decisions." },
          { id: "m2-l3", title: "Pricing Your Own Work", duration: "08:45", image: learnWoman, description: "Cost-plus versus value pricing for hustles and side businesses. Stop undercharging for your time." },
        ],
        questions: [
          { id: "m2-q1", type: "quantitative", scenario: "Chanda earns K6,000 per month. She follows the 50/30/20 rule strictly.", question: "How much should she allocate to savings and debt repayment each month?", options: ["K600", "K1,200", "K1,800", "K3,000"], correct: 1, feedback: "20% of K6,000 is K1,200 — the wealth-building slice of the framework." },
          { id: "m2-q2", type: "quantitative", scenario: "A trader buys stock at K450 per unit and sells at K585 per unit.", question: "What is the gross margin on each unit sold?", options: ["20%", "25%", "30%", "35%"], correct: 2, feedback: "K135 profit on K450 cost is a 30% gross margin." },
          { id: "m2-q3", type: "quantitative", scenario: "Inflation runs at 10% annually. Mwape keeps K10,000 in cash for a full year.", question: "What is the real purchasing power of his cash after one year?", options: ["K11,000", "K10,000", "K9,000", "K8,100"], correct: 2, feedback: "10% inflation strips roughly K1,000 of purchasing power from idle cash." },
        ],
      },
      {
        id: "m3",
        title: "Wealth Strategy",
        assignment: "Write your 5-year capital allocation plan",
        lessons: [
          { id: "m3-l1", title: "Assets That Pay You", duration: "13:55", image: learnMountain, description: "Income-producing assets explained — from treasury bills and unit trusts to rental units and digital products. Risk laddering for first-time investors." },
          { id: "m3-l2", title: "Compounding & Patience", duration: "10:10", image: learnBook, description: "Why time in the market beats timing the market. Real compounding tables and the cost of starting five years late." },
        ],
        questions: [
          { id: "m3-q1", type: "qualitative", question: "Describe your current financial position and outline a realistic 12-month plan to improve it using at least two frameworks from this course.", maxChars: 1000 },
          { id: "m3-q2", type: "qualitative", question: "Explain how you would advise a friend who wants to invest their entire emergency fund into a high-return opportunity.", maxChars: 1000 },
        ],
      },
    ],
  },
  {
    id: "cs-201",
    title: "Crypto Security Fundamentals",
    instructor: "Dr. Elias Thorne",
    category: "Security",
    image: learnBook,
    description:
      "Custody, keys and cold storage — a certified deep-dive into protecting digital assets. Learn threat modelling, wallet hygiene and recovery planning from a practising security researcher.",
    passingScore: 75,
    modules: [
      {
        id: "m1",
        title: "Keys & Custody",
        assignment: "Document a personal key-recovery plan",
        lessons: [
          { id: "m1-l1", title: "Your Keys, Your Coins", duration: "15:00", image: learnBook, description: "Private keys, seed phrases and why exchange custody is a trust decision, not a storage decision." },
          { id: "m1-l2", title: "Hot vs Cold Storage", duration: "12:25", image: learnPresenter, description: "Threat-model your holdings: what belongs in a hot wallet, what must go cold, and how to split across both." },
        ],
        questions: [
          { id: "m1-q1", type: "standard", question: "A seed phrase should be stored as a photo in your phone gallery.", options: ["True", "False"], correct: 1, feedback: "Never digital, never photographed — cloud sync makes it an instant target." },
          { id: "m1-q2", type: "standard", question: "Cold storage means keys are kept on a device never connected to the internet.", options: ["True", "False"], correct: 0, feedback: "Air-gapped devices remove the remote attack surface entirely." },
          { id: "m1-q3", type: "standard", question: "Holding assets on an exchange means you control the private keys.", options: ["True", "False"], correct: 1, feedback: "Exchange custody means the exchange holds the keys — not you." },
        ],
      },
      {
        id: "m2",
        title: "Threats & Recovery",
        assignment: "Run a phishing self-audit on your inboxes",
        lessons: [
          { id: "m2-l1", title: "Anatomy of a Phish", duration: "10:50", image: learnWoman, description: "Real-world phishing dissected: spoofed domains, urgency traps and signature-request scams." },
          { id: "m2-l2", title: "Recovery Planning", duration: "11:35", image: learnMountain, description: "Inheritance, device loss and compromise response — building a recovery plan your family could execute." },
        ],
        questions: [
          { id: "m2-q1", type: "quantitative", scenario: "You hold K40,000 in digital assets. Best practice suggests keeping no more than 10% in hot wallets.", question: "What is the maximum value you should keep in hot storage?", options: ["K400", "K2,000", "K4,000", "K10,000"], correct: 2, feedback: "10% of K40,000 is K4,000 — everything else goes cold." },
          { id: "m2-q2", type: "qualitative", question: "Outline a complete recovery plan for your digital assets covering device loss, death and key compromise.", maxChars: 1000 },
        ],
      },
    ],
  },
  {
    id: "dm-301",
    title: "Digital Marketing Pro",
    instructor: "Sarah Chen",
    category: "Marketing",
    image: learnWoman,
    description:
      "From audience psychology to paid funnels — a certification track for creators and small businesses who want campaigns that convert, not just content that exists.",
    passingScore: 70,
    modules: [
      {
        id: "m1",
        title: "Audience & Message",
        assignment: "Write three positioning statements for one product",
        lessons: [
          { id: "m1-l1", title: "Finding Your Buyer", duration: "09:40", image: learnWoman, description: "Segmentation that actually works for small budgets — pain-first audience mapping in under an hour." },
          { id: "m1-l2", title: "Messages That Move", duration: "13:10", image: learnPresenter, description: "Hooks, proof and calls-to-action. The anatomy of copy that earns the click without buying it." },
        ],
        questions: [
          { id: "m1-q1", type: "standard", question: "A value proposition should describe the product's features in detail.", options: ["Yes", "No"], correct: 1, feedback: "Lead with the outcome for the buyer — features support, outcomes sell." },
          { id: "m1-q2", type: "standard", question: "Niching down typically increases conversion rates for small budgets.", options: ["Yes", "No"], correct: 0, feedback: "Specific messages to specific people outperform broad messages to everyone." },
        ],
      },
      {
        id: "m2",
        title: "Funnels & Measurement",
        assignment: "Map a full funnel for your own offer",
        lessons: [
          { id: "m2-l1", title: "The Three-Stage Funnel", duration: "14:30", image: learnChart, description: "Awareness, consideration, conversion — what content belongs at each stage and what metrics matter there." },
          { id: "m2-l2", title: "Reading the Numbers", duration: "10:05", image: learnMountain, description: "CTR, CPC, ROAS without the jargon. Build a one-page dashboard that tells you when to scale and when to kill." },
        ],
        questions: [
          { id: "m2-q1", type: "quantitative", scenario: "A campaign spends K500 and generates K2,250 in attributed sales.", question: "What is the return on ad spend (ROAS)?", options: ["2.5x", "3.5x", "4.5x", "5.5x"], correct: 2, feedback: "K2,250 ÷ K500 = 4.5x ROAS." },
          { id: "m2-q2", type: "quantitative", scenario: "An ad gets 12,000 impressions and 360 clicks.", question: "What is the click-through rate?", options: ["1%", "3%", "6%", "12%"], correct: 1, feedback: "360 ÷ 12,000 = 3% CTR." },
        ],
      },
    ],
  },
];

export function getCourse(id?: string): Course {
  return COURSES.find((c) => c.id === id) ?? COURSES[0];
}

export function getModule(course: Course, moduleId?: string | null): CourseModule {
  return course.modules.find((m) => m.id === moduleId) ?? course.modules[0];
}

// ── Progress store (auto-save / resume) ──────────────────────

export interface CourseProgress {
  completedLessons: string[];
  completedQuestionSets: string[];      // lesson questionnaire sets
  passedModules: string[];
  underReviewModules: string[];
  certificates: string[];               // module ids + "final"
  answers: Record<string, Record<string, string | number>>; // moduleId → questionId → answer
  scores: Record<string, number>;       // moduleId → score %
  lastLessonId?: string;
  lastModuleId?: string;
}

const STORAGE_KEY = "kleench-learning-progress";

const EMPTY_PROGRESS: CourseProgress = {
  completedLessons: [],
  completedQuestionSets: [],
  passedModules: [],
  underReviewModules: [],
  certificates: [],
  answers: {},
  scores: {},
};

function readStore(): Record<string, CourseProgress> {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "{}");
  } catch {
    return {};
  }
}

export function loadProgress(courseId: string): CourseProgress {
  return { ...EMPTY_PROGRESS, ...readStore()[courseId] };
}

export function saveProgress(courseId: string, patch: Partial<CourseProgress>): CourseProgress {
  const store = readStore();
  const next = { ...EMPTY_PROGRESS, ...store[courseId], ...patch };
  store[courseId] = next;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(store));
  return next;
}

export function saveAnswer(courseId: string, moduleId: string, questionId: string, value: string | number) {
  const p = loadProgress(courseId);
  const answers = { ...p.answers, [moduleId]: { ...p.answers[moduleId], [questionId]: value } };
  return saveProgress(courseId, { answers, lastModuleId: moduleId });
}

export function clearModuleAnswers(courseId: string, moduleId: string) {
  const p = loadProgress(courseId);
  const answers = { ...p.answers };
  delete answers[moduleId];
  const scores = { ...p.scores };
  delete scores[moduleId];
  return saveProgress(courseId, {
    answers,
    scores,
    passedModules: p.passedModules.filter((m) => m !== moduleId),
    underReviewModules: p.underReviewModules.filter((m) => m !== moduleId),
  });
}

// ── Derived stats ────────────────────────────────────────────

export function courseLessons(course: Course): Lesson[] {
  return course.modules.flatMap((m) => m.lessons);
}

export interface CourseStats {
  lessonsDone: number;
  lessonsTotal: number;
  assessmentsDone: number;
  assessmentsTotal: number;
  certificates: number;
  pct: number;
  complete: boolean;
}

export function courseStats(course: Course, p: CourseProgress): CourseStats {
  const lessons = courseLessons(course);
  const lessonsDone = lessons.filter((l) => p.completedLessons.includes(l.id)).length;
  const assessmentsDone = course.modules.filter(
    (m) => p.passedModules.includes(m.id) || p.underReviewModules.includes(m.id)
  ).length;
  const totalUnits = lessons.length + course.modules.length;
  const pct = Math.round(((lessonsDone + assessmentsDone) / totalUnits) * 100);
  return {
    lessonsDone,
    lessonsTotal: lessons.length,
    assessmentsDone,
    assessmentsTotal: course.modules.length,
    certificates: p.certificates.length,
    pct,
    complete: lessonsDone === lessons.length && assessmentsDone === course.modules.length,
  };
}

export function nextLesson(course: Course, p: CourseProgress): Lesson | null {
  return courseLessons(course).find((l) => !p.completedLessons.includes(l.id)) ?? null;
}

export function lessonAfter(course: Course, lessonId: string): Lesson | null {
  const lessons = courseLessons(course);
  const idx = lessons.findIndex((l) => l.id === lessonId);
  return idx >= 0 && idx < lessons.length - 1 ? lessons[idx + 1] : null;
}

export function moduleOfLesson(course: Course, lessonId: string): CourseModule {
  return course.modules.find((m) => m.lessons.some((l) => l.id === lessonId)) ?? course.modules[0];
}

export function moduleHasQualitative(module: CourseModule): boolean {
  return module.questions.some((q) => q.type === "qualitative");
}

export interface ModuleGrade {
  correct: number;
  incorrect: number;
  objectiveTotal: number;
  qualitativeTotal: number;
  scorePct: number;
  pass: boolean;
}

export function gradeModule(course: Course, module: CourseModule, answers: Record<string, string | number> = {}): ModuleGrade {
  const objective = module.questions.filter((q) => q.type !== "qualitative");
  const correct = objective.filter((q) => answers[q.id] === q.correct).length;
  const scorePct = objective.length ? Math.round((correct / objective.length) * 100) : 100;
  return {
    correct,
    incorrect: objective.length - correct,
    objectiveTotal: objective.length,
    qualitativeTotal: module.questions.length - objective.length,
    scorePct,
    pass: scorePct >= course.passingScore,
  };
}

// ── Cross-course achievement stats (Learning Profile) ────────

export interface AchievementStats {
  certificatesEarned: number;
  coursesCompleted: number;
  hoursLearned: number;
  testsPassed: number;
}

export function achievementStats(): AchievementStats {
  let certificatesEarned = 0;
  let coursesCompleted = 0;
  let testsPassed = 0;
  let minutes = 0;
  for (const course of COURSES) {
    const p = loadProgress(course.id);
    certificatesEarned += p.certificates.length;
    testsPassed += p.passedModules.length;
    if (courseStats(course, p).complete) coursesCompleted += 1;
    for (const lesson of courseLessons(course)) {
      if (p.completedLessons.includes(lesson.id)) {
        const [m, s] = lesson.duration.split(":").map(Number);
        minutes += m + (s || 0) / 60;
      }
    }
  }
  return {
    certificatesEarned,
    coursesCompleted,
    testsPassed,
    hoursLearned: Math.round((minutes / 60) * 10) / 10,
  };
}

export function certificateNumber(courseId: string, suffix: string): string {
  return `KLN-${courseId.toUpperCase()}-${suffix.toUpperCase()}-2026`;
}
