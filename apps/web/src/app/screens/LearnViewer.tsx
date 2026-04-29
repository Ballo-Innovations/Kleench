import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router";
import { toast } from "sonner";
import {
  DuotonePlay as Play,
  DuotoneUser as UserIcon,
  DuotoneEye as EyeIcon,
} from "../components/DuotoneIcon";
import { PageHeader } from "../components/PageHeader";
import {
  ChevronDown,
  Download,
  Bookmark,
  MessageSquare,
  ClipboardList,
  ThumbsUp,
  Share2,
  Info,
  ShoppingCart,
  Tag,
  Star,
  Grid,
  Video as VideoIcon,
  CheckCircle2,
  XCircle
} from "lucide-react";
import learnMountain from "@/assets/learning/learn_mountain_1775596850615.png";
import learnPresenter from "@/assets/learning/learn_presenter_1775596479989.png";
import learnWoman from "@/assets/learning/learn_woman_1775596426630.png";
import learnChart from "@/assets/learning/learn_chart_1775596868170.png";
import learnBook from "@/assets/learning/learn_book_1775596454115.png";

type ViewMode = "learn-earn" | "free" | "pay-to-stream";
type AppState = "player" | "questionnaire" | "pay-confirm" | "profile" | "subscriptions";

// Mock Data
const MORE_VIDEOS = [
  { id: 1, image: learnBook, label: "LESSON #1" },
  { id: 2, image: learnWoman, label: "LESSON #2" },
  { id: 3, image: learnPresenter, label: "LESSON #3" },
];

const TRENDING_VIDEOS = [
  { id: 1, image: learnMountain },
  { id: 2, image: learnChart },
  { id: 3, image: learnWoman },
  { id: 4, image: learnPresenter },
];

const SUBSCRIPTION_PROFILE = {
  name: "PETER M S LENGALENGA",
  handle: "@peterll",
  role: "Digital Analytics Strategist\nLusaka, Zambia",
  stories: "87",
  followers: "5.7K",
  following: "290",
  likes: "2.7K",
  initials: "PL",
  monthlyPrice: "K50",
};

const PAYMENT_HISTORY = [
  { title: "Travel Vlog: Hidden Paradise", amount: "K10", date: "20th April 2026" },
  { title: "Fitness Secrets", amount: "K15", date: "6th April 2026" },
];

export function LearnViewer() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const initialMode = (searchParams.get("mode") as ViewMode) ?? "learn-earn";

  const [viewMode] = useState<ViewMode>(initialMode);
  const [appState, setAppState] = useState<AppState>("player");
  const [liked, setLiked] = useState(false);

  // Navigation handlers
  const handleBack = () => {
    if (appState !== "player") {
      setAppState("player");
    } else {
      navigate(-1);
    }
  };

  // CATEGORY BAR
  const CategoryBar = () => (
    <div className="flex items-center gap-2 px-4 py-3 pb-4 bg-gradient-to-b from-[#e43f24] to-black overflow-x-auto no-scrollbar text-white">
      {["Tutorial", "Educational", "Motivation", "Categories"].map((cat, i) => (
        <div key={i} className={`flex items-center gap-1 border border-white/30 rounded-full px-3 py-1 text-[10px] whitespace-nowrap ${i === 0 ? 'bg-black/40' : ''}`}>
          {cat}
          {i === 3 && <ChevronDown size={12} />}
        </div>
      ))}
    </div>
  );

  // --- VIEWS ---

  if (appState === "profile") {
    return (
      <div className="w-full min-h-screen bg-transparent font-sans text-slate-800 relative pb-20 overflow-x-hidden">
        <PageHeader title="Creator Profile" showBack onBack={handleBack} />
        <div className="relative pt-4 px-4 flex flex-col items-center flex-1">
            {/* Avatar */}
            <div className="w-28 h-28 rounded-full border-4 border-black bg-slate-800 shadow-[0_0_20px_rgba(0,0,0,0.5)] overflow-hidden relative z-10">
                <img src={learnMountain} alt="Profile" className="w-full h-full object-cover" />
                <div className="absolute bottom-1 right-1 w-6 h-6 bg-[var(--app-bg)] rounded-full flex items-center justify-center shadow-md">
                    <CheckCircle2 size={16} className="text-blue-500" />
                </div>
            </div>

            {/* Info */}
            <div className="text-center mt-3 z-10 w-full relative">
                <h2 className="font-black text-lg text-[var(--app-text-slate)]">{SUBSCRIPTION_PROFILE.name}</h2>
                <p className="text-sm text-slate-500 font-medium my-0.5">{SUBSCRIPTION_PROFILE.handle}</p>
                <p className="text-xs text-slate-600 font-medium whitespace-pre-line leading-relaxed mt-1">
                    {SUBSCRIPTION_PROFILE.role}
                </p>
                
                {/* Stats */}
                <div className="flex items-center justify-center gap-2 mt-6">
                    <div className="bg-[var(--app-bg)]/80 px-4 py-2 rounded-xl flex flex-col items-center min-w-[70px] border border-slate-200 shadow-sm">
                        <span className="font-black text-sm text-slate-800">{SUBSCRIPTION_PROFILE.stories}</span>
                        <span className="text-[9px] text-slate-500 mt-0.5">Stories</span>
                    </div>
                    <div className="bg-[var(--app-bg)]/80 px-4 py-2 rounded-xl flex flex-col items-center min-w-[70px] border border-slate-200 shadow-sm">
                        <span className="font-black text-sm text-slate-800">{SUBSCRIPTION_PROFILE.followers}</span>
                        <span className="text-[9px] text-slate-500 mt-0.5">Followers</span>
                    </div>
                    <div className="bg-[var(--app-bg)]/80 px-4 py-2 rounded-xl flex flex-col items-center min-w-[70px] border border-slate-200 shadow-sm">
                        <span className="font-black text-sm text-slate-800">{SUBSCRIPTION_PROFILE.following}</span>
                        <span className="text-[9px] text-slate-500 mt-0.5">Following</span>
                    </div>
                    <div className="bg-[var(--app-bg)]/80 px-4 py-2 rounded-xl flex flex-col items-center min-w-[70px] border border-slate-200 shadow-sm">
                        <span className="font-black text-sm text-slate-800">{SUBSCRIPTION_PROFILE.likes}</span>
                        <span className="text-[9px] text-slate-500 mt-0.5">Likes</span>
                    </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 mt-5">
                    <button className="flex-1 bg-[#e43f24] text-white py-3 rounded-xl font-bold text-sm shadow-lg active:scale-95 transition-all">
                        Edit Profile
                    </button>
                    <button 
                        onClick={() => setAppState("subscriptions")}
                        className="bg-transparent border border-slate-300 text-slate-700 p-3 rounded-xl flex flex-col items-center active:scale-95 transition-all min-w-[80px]"
                    >
                        <UserIcon size={16} primary="#333" />
                        <span className="text-[8px] mt-1 font-bold">Subscription</span>
                    </button>
                </div>

                {/* Tabs */}
                <div className="flex items-center justify-between mt-6 px-4 border-b border-slate-200 pb-3">
                    <Grid size={24} className="text-[#e43f24]" />
                    <VideoIcon size={24} className="text-slate-400" />
                    <Bookmark size={24} className="text-slate-400" />
                    <ShoppingCart size={24} className="text-slate-400" />
                </div>

                {/* Grid */}
                <div className="grid grid-cols-3 gap-1 mt-1 pb-10 w-full">
                    {[learnWoman, learnMountain, learnPresenter, learnChart, learnBook, learnMountain, learnWoman, learnChart, learnPresenter].map((img, i) => (
                        <div key={i} className="aspect-square bg-slate-200 relative">
                            <img src={img} alt="" className="w-full h-full object-cover" />
                            <div className="absolute inset-0 flex items-center justify-center">
                                <Play size={20} primary="#fff" />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            
            {/* Background Blur */}
            <div className="absolute top-0 left-0 right-0 h-64 overflow-hidden pointer-events-none">
                <img src={learnMountain} alt="" className="w-full h-full object-cover opacity-20 blur-xl scale-110" />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black" />
            </div>
        </div>
      </div>
    );
  }

  if (appState === "subscriptions") {
    return (
        <div className="w-full min-h-screen bg-transparent font-sans text-slate-800 flex flex-col pb-20 overflow-x-hidden">
            <PageHeader title="My Subscriptions" showBack onBack={handleBack} />

            <div className="flex-1 px-5 pt-6 bg-[var(--app-bg)] shadow-[inset_0_10px_20px_rgba(0,0,0,0.03)]">
                <h3 className="font-black text-blue-900 text-[15px] mb-4">My Subscriptions</h3>
                
                {/* Subscription Card */}
                <div className="bg-[var(--app-bg)] rounded-xl border border-slate-200 shadow-[0_4px_15px_rgba(0,0,0,0.05)] p-4 flex gap-4 mb-8">
                    <div className="w-14 h-14 rounded-full bg-blue-500 overflow-hidden flex-shrink-0 border-2 border-slate-100">
                        <img src={learnMountain} alt="" className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1">
                        <div className="flex justify-between items-start">
                            <h4 className="font-black text-slate-800 text-sm leading-tight pr-2">Peter M S Lengalenga</h4>
                            <span className="text-slate-400 tracking-widest">···</span>
                        </div>
                        <p className="text-[10px] text-slate-500 mt-2 font-medium">Active Expires: May 15th 2026</p>
                    </div>
                </div>

                <h3 className="font-black text-blue-900 text-[15px] mb-4">Payment History</h3>
                
                <div className="space-y-4">
                    {PAYMENT_HISTORY.map((item, i) => (
                        <div key={i} className="bg-[var(--app-bg)] rounded-xl border border-slate-200 shadow-[0_4px_15px_rgba(0,0,0,0.05)] p-4 flex items-center gap-4">
                             <div className="w-4 h-4 rounded-full border border-slate-300 flex-shrink-0" />
                             <div>
                                 <h4 className="font-black text-slate-800 text-sm">{item.title}</h4>
                                 <p className="text-[10px] text-slate-400 mt-1 font-medium">{item.amount} {item.date}</p>
                             </div>
                        </div>
                    ))}
                </div>

                {/* Video Ads at bottom */}
                <div className="mt-8 mb-4">
                     <span className="bg-[#e43f24] text-white px-3 py-1 rounded-r-lg font-black text-[12px]">Video Ads</span>
                </div>
                <div className="flex gap-2 overflow-x-auto pb-6 no-scrollbar">
                     <div className="w-32 h-20 bg-[var(--app-text-slate)] rounded-lg overflow-hidden flex-shrink-0">
                         <img src={learnWoman} alt="" className="w-full h-full object-cover opacity-80" />
                     </div>
                     <div className="w-32 h-20 bg-[var(--app-text-slate)] rounded-lg overflow-hidden flex-shrink-0">
                         <img src={learnMountain} alt="" className="w-full h-full object-cover opacity-80" />
                     </div>
                     <div className="w-32 h-20 bg-[#2d1b13] rounded-lg overflow-hidden flex-shrink-0 flex flex-col justify-center px-3 border border-orange-900/50">
                         <div className="text-orange-500 font-black text-sm uppercase tracking-tighter leading-none mb-1">Delicious</div>
                         <div className="text-white font-black text-sm uppercase tracking-tighter leading-none bg-orange-600 w-fit px-1">Burger</div>
                     </div>
                </div>
            </div>
        </div>
    )
  }

  // DEFAULT PLAYER SCROLL VIEW
  return (
    <div className="w-full relative min-h-screen bg-transparent overflow-x-hidden font-sans text-slate-800">
      <PageHeader title="Learn Video" showBack onBack={handleBack} />

      {/* Main Content Area */}
      <div className={`relative pb-32 ${appState === "questionnaire" || appState === "pay-confirm" ? "bg-transparent min-h-screen" : "bg-transparent min-h-screen"}`}>
        
        {/* Categories if not full screen overlays */}
        {appState !== "questionnaire" && appState !== "pay-confirm" && <CategoryBar />}

        {/* --- VIDEO PLAYER CONTAINER --- */}
        <div className="relative">
          <div className="w-full aspect-[4/3] bg-[var(--app-text-slate)] relative">
            <img 
                src={viewMode === "learn-earn" ? learnPresenter : viewMode === "free" ? learnWoman : learnBook} 
                alt="Video" 
                className={`absolute inset-0 w-full h-full object-cover ${appState === "questionnaire" || appState === "pay-confirm" ? "opacity-30 blur-md" : "opacity-90"}`} 
            />
            {appState !== "questionnaire" && appState !== "pay-confirm" && (
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
            )}

            {/* Overlays inside player */}
            {appState === "questionnaire" && (
                <div className="absolute inset-0 flex flex-col justify-center px-6 z-20">
                    <div className="space-y-5 mt-4">
                        <div>
                            <p className="text-white text-[13px] font-medium mb-3">Do you Think the was very educational?</p>
                            <div className="flex gap-6">
                                <label className="flex items-center gap-2 cursor-pointer">
                                    <span className="text-slate-300 text-[12px]">(a)</span>
                                    <div className="bg-green-600 px-2 py-0.5 rounded text-[10px] font-bold flex items-center gap-1">
                                        <CheckCircle2 size={10} /> Yes 
                                    </div>
                                    <div className="w-4 h-4 rounded-full border border-green-500 bg-green-500 flex items-center justify-center">
                                       <div className="w-1.5 h-1.5 bg-[var(--app-bg)] rounded-full"></div>
                                    </div>
                                </label>
                                <label className="flex items-center gap-2 cursor-pointer">
                                    <span className="text-slate-300 text-[12px]">(b)</span>
                                    <div className="bg-red-600 px-2 py-0.5 rounded text-[10px] font-bold flex items-center gap-1">
                                        <XCircle size={10} /> No 
                                    </div>
                                    <div className="w-4 h-4 rounded-full border border-slate-400 flex items-center justify-center"></div>
                                </label>
                            </div>
                        </div>

                        <div>
                            <p className="text-white text-[13px] font-medium mb-3">Which alternative university in Zambia do you think is better?</p>
                            <div className="space-y-2">
                                {["CBU", "UNZA", "UNILAS"].map((uni, i) => (
                                    <label key={uni} className="flex items-center justify-between cursor-pointer max-w-[120px]">
                                        <div className="flex gap-2">
                                            <span className="text-slate-300 text-[12px]">({String.fromCharCode(97+i)})</span>
                                            <span className="text-white text-[13px]">{uni}</span>
                                        </div>
                                        <div className={`w-4 h-4 rounded-full border ${i === 1 ? 'border-green-500 bg-green-500' : 'border-slate-400'} flex items-center justify-center`}>
                                            {i === 1 && <div className="w-1.5 h-1.5 bg-[var(--app-bg)] rounded-full"></div>}
                                        </div>
                                    </label>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {appState === "pay-confirm" && (
                <div className="absolute inset-0 flex flex-col justify-center items-center px-8 z-20">
                    <div className="w-full flex flex-col items-center">
                        <p className="text-white font-medium text-base mb-4 drop-shadow-md">Subscribe to watch this video</p>
                        <div className="w-full h-[1px] bg-[var(--app-bg)]/30 mb-4" />
                        <p className="text-white text-sm mb-6 drop-shadow-md">Get access for K50/monthly</p>
                        
                        <div className="space-y-3 w-full max-w-[200px]">
                            <button className="w-full bg-[var(--app-shape-accent)] text-white py-2.5 rounded text-sm font-semibold shadow-lg active:scale-95 transition-all">
                                Subscribe
                            </button>
                            <button className="w-full bg-[#ff0000] text-white py-2.5 rounded text-sm font-semibold shadow-lg active:scale-95 transition-all">
                                Unlock for K15
                            </button>
                            <button 
                                onClick={() => setAppState("player")}
                                className="w-full bg-slate-800/80 text-white border border-white/40 py-2.5 rounded text-sm font-semibold active:scale-95 transition-all"
                            >
                                Preview
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Default Player Content */}
            {appState === "player" && (
                <>
                {viewMode === "pay-to-stream" && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-10 drop-shadow-2xl text-center px-4 pt-10">
                         <h2 className="text-white/80 font-black tracking-[0.3em] text-3xl opacity-80 mix-blend-overlay">L E A R N</h2>
                         <h3 className="text-white font-black text-xl mt-1 drop-shadow-md">Becoming a good learner</h3>
                         <div className="flex gap-4 mt-2 text-[8px] font-bold text-white/80 uppercase tracking-widest">
                             <span>Documentary</span>
                             <span>Duration 30min</span>
                             <span>Age 13+</span>
                         </div>
                    </div>
                )}
                
                {viewMode !== "pay-to-stream" && (
                    <div className="absolute bottom-16 left-4 z-10">
                        <h3 className="text-white font-medium text-sm drop-shadow-md">Kids in Tech</h3>
                    </div>
                )}
                
                <div className="absolute bottom-4 left-4 right-4 z-10 border-b border-white/20 pb-3 mb-1">
                    {/* Action Bar inside player */}
                    {viewMode === "learn-earn" ? (
                        <div className="flex justify-between items-center px-2">
                             <div className="flex flex-col items-center gap-1 cursor-pointer" onClick={() => setAppState("questionnaire")}>
                                  <ClipboardList size={20} className="text-white/90" />
                                  <span className="text-[7px] text-white/70 uppercase">Questionnaire</span>
                             </div>
                             <div className="flex flex-col items-center gap-1 cursor-pointer" onClick={() => setLiked(!liked)}>
                                  <ThumbsUp size={20} className={liked ? "text-orange-500 fill-orange-500" : "text-white/90"} />
                                  <span className={`text-[7px] uppercase ${liked ? "text-orange-500 font-bold" : "text-white/70"}`}>Reaction</span>
                             </div>
                             <div className="flex flex-col items-center gap-1 cursor-pointer" onClick={() => toast.success("Link copied to clipboard!")}>
                                  <Share2 size={20} className="text-white/90" />
                                  <span className="text-[7px] text-white/70 uppercase">Share</span>
                             </div>
                             <div className="flex flex-col items-center gap-1 cursor-pointer" onClick={() => toast.info("Opening inquiry support...")}>
                                  <Info size={20} className="text-white/90" />
                                  <span className="text-[7px] text-white/70 uppercase">Inquiry</span>
                             </div>
                             <div className="flex flex-col items-center gap-1 cursor-pointer" onClick={() => setAppState("pay-confirm")}>
                                  <ShoppingCart size={20} className="text-white/90" />
                                  <span className="text-[7px] text-white/70 uppercase">Buy</span>
                             </div>
                             <div className="flex flex-col items-center gap-1 cursor-pointer" onClick={() => setAppState("profile")}>
                                  <Tag size={20} className="text-white/90" />
                                  <span className="text-[7px] text-white/70 uppercase">Information</span>
                             </div>
                        </div>
                    ) : (
                        <div className="flex justify-between items-center max-w-[200px]">
                             <div className="flex flex-col items-center gap-1 cursor-pointer">
                                  <EyeIcon size={20} primary="#fff" className="opacity-90" />
                                  <span className="text-[7px] text-white/70 uppercase">View</span>
                             </div>
                             <div className="flex flex-col items-center gap-1 cursor-pointer">
                                  <Download size={20} className="text-white/90" />
                                  <span className="text-[7px] text-white/70 uppercase">Download</span>
                             </div>
                             <div className="flex flex-col items-center gap-1 cursor-pointer" onClick={() => setAppState("pay-confirm")}>
                                  <Bookmark size={20} className="text-white/90" />
                                  <span className="text-[7px] text-white/70 uppercase">Bookmark</span>
                             </div>
                             {viewMode === "free" ? (
                                <div className="flex flex-col items-center gap-1 cursor-pointer">
                                     <MessageSquare size={20} className="text-white/90" />
                                     <span className="text-[7px] text-white/70 uppercase">comment</span>
                                </div>
                             ) : (
                                <div className="absolute right-0 bottom-1">
                                    <div className="w-8 h-8 rounded-full border border-white/40 flex items-center justify-center p-1 cursor-pointer shadow-lg" onClick={() => setAppState("profile")}>
                                        <Star size={16} className="text-white" />
                                    </div>
                                </div>
                             )}
                        </div>
                    )}
                </div>
                </>
            )}

          </div>

          {/* Special completion bar for questionnaire overlay */}
          {appState === "questionnaire" && (
             <div className="absolute bottom-4 left-4 right-4 z-20">
                 <button 
                    onClick={() => setAppState("player")} 
                    className="w-full bg-[var(--app-shape-accent)] text-white py-4 rounded-xl font-medium text-lg tracking-wide hover:opacity-90 active:scale-95 transition-all shadow-lg"
                 >
                     Complete
                 </button>
             </div>
          )}

        </div>

        {/* Scrollable Lists Below Player (Only when in viewer state) */}
        {appState === "player" && (
            <div className="px-4 pt-6 space-y-6 pb-20">
                {/* More Videos Section */}
                <div>
                     <h3 className={`text-sm font-bold mb-3 ${viewMode === "pay-to-stream" ? "text-green-500" : "text-white/90"}`}>
                         {viewMode === "pay-to-stream" ? "More Premium Videos" : "More Videos"}
                     </h3>
                     <div className="flex gap-2.5 overflow-x-auto no-scrollbar">
                         {MORE_VIDEOS.map((vid, i) => (
                             <div 
                               key={i} 
                               onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                               className="w-24 h-24 rounded-2xl bg-slate-800 overflow-hidden flex-shrink-0 relative group cursor-pointer active:scale-95 transition-transform"
                             >
                                 <img src={vid.image} alt="" className="w-full h-full object-cover opacity-70 group-hover:opacity-50 transition-all" />
                                 <div className="absolute inset-0 flex items-center justify-center">
                                     <Play size={24} primary="#fff" className="opacity-90" />
                                 </div>
                                 {vid.label && (
                                     <div className="absolute inset-0 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none bg-black/40">
                                         <span className="font-black text-[9px] tracking-[0.2em]">{vid.label}</span>
                                     </div>
                                 )}
                             </div>
                         ))}
                     </div>
                </div>

                {/* Trending / Subscription Section */}
                <div>
                     <h3 className="text-sm font-bold mb-3 text-white/90">
                         {viewMode === "pay-to-stream" ? "Subscription Videos" : "Trending Videos"}
                     </h3>
                     <div className="flex gap-2.5 overflow-x-auto no-scrollbar">
                         {TRENDING_VIDEOS.map((vid, i) => (
                             <div 
                               key={i} 
                               onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                               className="w-20 h-28 rounded-xl bg-slate-800 overflow-hidden flex-shrink-0 relative cursor-pointer active:scale-95 transition-transform"
                             >
                                 <img src={vid.image} alt="" className="w-full h-full object-cover opacity-80" />
                                 <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                                     <Play size={20} primary="#fff" className="opacity-90 drop-shadow-md" />
                                 </div>
                             </div>
                         ))}
                     </div>
                </div>
            </div>
        )}
      </div>
    </div>
  );
}
