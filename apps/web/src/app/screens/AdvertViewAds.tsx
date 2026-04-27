import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router";
import { X, Heart, Share2, Download, Flag, Eye, Clock, MapPin, ChevronDown } from "lucide-react";
import {
  DuotonePlay as Play,
  DuotoneHeadphones as Headphones,
  DuotoneVolume as Volume2,
  DuotoneHeart,
  DuotoneImageIcon,
  DuotoneSend as Send,
  DuotoneEye as EyeIcon,
} from "../components/DuotoneIcon";
import { motion, AnimatePresence } from "motion/react";
import { PageHeader } from "../components/PageHeader";

import adCar from "@/assets/ads/ad_car.png";
import adBurger from "@/assets/ads/ad_burger.png";
import adBeach from "@/assets/ads/ad_beach.png";
import adShopping from "@/assets/ads/ad_shopping.png";
import adPodcast from "@/assets/ads/ad_podcast.png";
import adHealth from "@/assets/ads/ad_health.png";
import adCode from "@/assets/ads/ad_code.png";
import adEvCar from "@/assets/ads/ad_ev_car.png";
import adResort from "@/assets/ads/ad_resort.png";
import adHeadphones from "@/assets/ads/ad_headphones.png";
import adSmarthome from "@/assets/ads/ad_smarthome.png";
import adSneakers from "@/assets/ads/ad_sneakers.png";

type AdTab = "video" | "picture" | "audio";
type DetailState = "viewer" | "questionnaire";

interface AdItem {
  id: number;
  title: string;
  image: string;
  brand: string;
  views: string;
  duration?: string;
  location: string;
}

const VIDEO_ADS: AdItem[] = [
  { id: 1, title: "FUTURE EV TECH", image: adEvCar, brand: "Tesla Motors", views: "12.4K", duration: "0:30", location: "Lusaka" },
  { id: 2, title: "LUXURY ESCAPE", image: adResort, brand: "Travel Hub ZM", views: "8.1K", duration: "0:15", location: "Livingstone" },
  { id: 3, title: "DRIVE LUXURY", image: adCar, brand: "AutoHaus Pro", views: "15.2K", duration: "1:00", location: "Ndola" },
  { id: 4, title: "SMART LIVING", image: adSmarthome, brand: "SmartHome ZM", views: "6.3K", duration: "0:45", location: "Kitwe" },
  { id: 5, title: "DELICIOUS BURGER", image: adBurger, brand: "BurgerKing ZM", views: "24.5K", duration: "0:15", location: "Lusaka" },
  { id: 6, title: "SALE 50% OFF", image: adShopping, brand: "MegaMall", views: "32.1K", duration: "0:30", location: "Lusaka" },
  { id: 7, title: "PREMIUM SOUND", image: adHeadphones, brand: "AudioPro", views: "9.8K", duration: "0:15", location: "Kabwe" },
  { id: 8, title: "HOLIDAY DEAL", image: adBeach, brand: "SunTravel", views: "7.4K", duration: "1:00", location: "National" },
];

const PICTURE_ADS: AdItem[] = [
  { id: 1, title: "URBAN STYLE", image: adSneakers, brand: "StreetWear ZM", views: "18.3K", location: "Lusaka" },
  { id: 2, title: "SUMMER VACATION", image: adBeach, brand: "TropicTours", views: "11.7K", location: "Livingstone" },
  { id: 3, title: "NEW ARRIVALS", image: adShopping, brand: "FashionHub", views: "22.0K", location: "Ndola" },
  { id: 4, title: "GET FIT NOW!", image: adHealth, brand: "FitLife ZM", views: "5.9K", location: "Lusaka" },
  { id: 5, title: "AUTO SALES", image: adCar, brand: "DealerPro", views: "14.2K", location: "Kitwe" },
  { id: 6, title: "DELICIOUS BURGER", image: adBurger, brand: "JuicyBurger", views: "19.8K", location: "Lusaka" },
  { id: 7, title: "RESORT VIEW", image: adResort, brand: "LuxStay", views: "8.6K", location: "Siavonga" },
  { id: 8, title: "TECH GADGETS", image: adSmarthome, brand: "GadgetPlace", views: "10.1K", location: "National" },
];

const AUDIO_ADS: AdItem[] = [
  { id: 1, title: "DEEP FOCUS", image: adPodcast, brand: "PodcastPro", views: "4.2K", duration: "2:15", location: "National" },
  { id: 2, title: "TECH TALKS", image: adCode, brand: "TechBeat", views: "6.8K", duration: "5:00", location: "Lusaka" },
  { id: 3, title: "STUDIO SESSIONS", image: adHeadphones, brand: "StudioFM", views: "3.1K", duration: "4:20", location: "Kitwe" },
  { id: 4, title: "HEALTH TIPS", image: adHealth, brand: "WellnessZM", views: "2.4K", duration: "1:30", location: "National" },
  { id: 5, title: "FUTURE GADGETS", image: adEvCar, brand: "TechCast", views: "5.5K", duration: "3:45", location: "Lusaka" },
  { id: 6, title: "SMART HOME", image: adSmarthome, brand: "HomePod", views: "1.9K", duration: "0:50", location: "Ndola" },
  { id: 7, title: "CITY VIBES", image: adSneakers, brand: "UrbanRadio", views: "3.7K", duration: "2:10", location: "Lusaka" },
  { id: 8, title: "MARKET NEWS", image: adShopping, brand: "BizFM", views: "7.2K", duration: "6:00", location: "National" },
];

// More Ads & Trending — reused images for scroll rows in the detail viewer
const MORE_ADS = [
  { id: 1, image: adCar, label: "AD #1" },
  { id: 2, image: adBurger, label: "AD #2" },
  { id: 3, image: adResort, label: "AD #3" },
];

const TRENDING_ADS = [
  { id: 1, image: adEvCar },
  { id: 2, image: adSneakers },
  { id: 3, image: adHeadphones },
  { id: 4, image: adSmarthome },
];

// Category filter chips
const CATEGORIES = ["Tutorial", "Product", "Service", "Motivation", "Categories"];

function AdCard({ ad, type, onSelect }: { ad: AdItem; type: AdTab; onSelect: (ad: AdItem) => void }) {
  return (
    <motion.div
      whileTap={{ scale: 0.97 }}
      onClick={() => onSelect(ad)}
      className="bg-[var(--app-bg)] rounded-2xl border border-slate-100 shadow-sm overflow-hidden cursor-pointer active:shadow-none transition-all"
    >
      <div className="relative aspect-[4/3] bg-[var(--app-text-slate)] overflow-hidden">
        <img src={ad.image} alt={ad.title} className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

        {type === "video" && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-10 h-10 rounded-full bg-[var(--app-bg)]/20 backdrop-blur-md border border-white/30 flex items-center justify-center shadow-lg">
              <Play primary="#fff" size={16} />
            </div>
          </div>
        )}

        {type === "audio" && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-10 h-10 rounded-full bg-[var(--app-bg)]/15 backdrop-blur-md border border-white/30 flex items-center justify-center shadow-lg">
              <Headphones primary="#fff" size={16} />
            </div>
          </div>
        )}

        {ad.duration && (
          <div className="absolute bottom-2 right-2 bg-black/70 backdrop-blur-sm text-white text-[9px] font-black px-2 py-0.5 rounded-md">
            {ad.duration}
          </div>
        )}

        <div className="absolute bottom-2 left-2">
          <p className="text-white font-black text-[11px] uppercase tracking-tight drop-shadow-2xl">{ad.title}</p>
        </div>
      </div>

      <div className="p-3 flex items-center justify-between">
        <div className="flex items-center gap-2 min-w-0">
          <div className="w-6 h-6 rounded-full bg-orange-500 flex items-center justify-center flex-shrink-0">
            <span className="text-white text-[8px] font-black">{ad.brand[0]}</span>
          </div>
          <div className="min-w-0">
            <p className="text-[10px] font-black text-slate-700 truncate">{ad.brand}</p>
            <div className="flex items-center gap-1.5 text-slate-400">
              <Eye size={9} />
              <span className="text-[8px] font-bold">{ad.views}</span>
              <MapPin size={8} />
              <span className="text-[8px] font-bold truncate">{ad.location}</span>
            </div>
          </div>
        </div>
        <DuotoneHeart size={14} primary="#94a3b8" />
      </div>
    </motion.div>
  );
}

export function AdvertViewAds() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const initialTab = (searchParams.get("tab") as AdTab) ?? "video";
  const [activeTab, setActiveTab] = useState<AdTab>(initialTab);
  const [selectedAd, setSelectedAd] = useState<AdItem | null>(null);
  const [liked, setLiked] = useState(false);
  const [detailState, setDetailState] = useState<DetailState>("viewer");
  const [activeCategory, setActiveCategory] = useState("Tutorial");

  const tabs: { key: AdTab; label: string; icon: React.ComponentType<{ size: number; primary?: string }> }[] = [
    { key: "video", label: "Video Ads", icon: Play },
    { key: "picture", label: "Picture Ads", icon: DuotoneImageIcon },
    { key: "audio", label: "Audio Ads", icon: Headphones },
  ];

  const activeAds = activeTab === "video" ? VIDEO_ADS : activeTab === "picture" ? PICTURE_ADS : AUDIO_ADS;

  const handleCloseDetail = () => {
    setSelectedAd(null);
    setLiked(false);
    setDetailState("viewer");
  };

  return (
    <div className="w-full min-h-screen bg-transparent pb-32 font-sans text-slate-800">
      <PageHeader title="Ad Gallery" showBack onBack={() => navigate(-1)} />

      <div className="px-4 pt-3 space-y-4">
        {/* Tab Selector */}
        <div className="flex gap-2">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-wider transition-all active:scale-95 ${
                activeTab === tab.key
                  ? "bg-orange-500 text-white shadow-md shadow-orange-500/25"
                  : "bg-[var(--app-bg)] text-slate-500 border border-slate-200"
              }`}
            >
              <tab.icon size={13} primary={activeTab === tab.key ? "#fff" : "#64748b"} />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Stats bar */}
        <div className="flex items-center justify-between px-1">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
            {activeAds.length} {activeTab} ads
          </p>
          <div className="flex items-center gap-1 text-slate-400">
            <Clock size={10} />
            <span className="text-[9px] font-bold">Updated 2m ago</span>
          </div>
        </div>

        {/* Ad Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="grid grid-cols-2 gap-3"
          >
            {activeAds.map((ad) => (
              <AdCard key={ad.id} ad={ad} type={activeTab} onSelect={setSelectedAd} />
            ))}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Full-Screen Ad Viewer */}
      <AnimatePresence>
        {selectedAd && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] bg-black max-w-md mx-auto flex flex-col overflow-y-auto"
          >
            {/* ── Balance Bar ── */}
            <div className="bg-[#e43f24] px-4 py-3 flex items-center justify-between text-white flex-shrink-0 pt-8">
              <div>
                <p className="text-[9px] font-bold uppercase tracking-widest opacity-80 mb-0.5">BALANCE</p>
                <div className="flex items-center gap-2">
                  <span className="font-black text-lg">ZMW 2,450.00</span>
                  <EyeIcon size={14} primary="#ffffff" />
                </div>
              </div>
              <button
                onClick={handleCloseDetail}
                className="w-10 h-10 bg-[var(--app-bg)]/10 backdrop-blur-md rounded-full flex items-center justify-center text-white border border-white/20 active:scale-90 transition-transform"
              >
                <X size={20} />
              </button>
            </div>

            {/* ── Category Bar ── */}
            <div className="flex items-center gap-2 px-4 py-3 pb-4 bg-gradient-to-b from-[#e43f24] to-black overflow-x-auto no-scrollbar text-white flex-shrink-0">
              {CATEGORIES.map((cat, i) => (
                <button
                  key={i}
                  onClick={() => setActiveCategory(cat)}
                  className={`flex items-center gap-1 border border-white/30 rounded-full px-3 py-1 text-[10px] whitespace-nowrap transition-all ${
                    activeCategory === cat ? "bg-black/40" : ""
                  }`}
                >
                  {cat}
                  {cat === "Categories" && <ChevronDown size={12} />}
                </button>
              ))}
            </div>

            {/* ── Main Video / Photo / Audio Player ── */}
            <div className="relative flex-shrink-0">
              <div className={`w-full ${activeTab === "audio" ? "aspect-square" : "aspect-[4/3]"} bg-[var(--app-text-slate)] relative overflow-hidden`}>
                <img
                  src={selectedAd.image}
                  alt={selectedAd.title}
                  className={`absolute inset-0 w-full h-full object-cover ${
                    detailState === "questionnaire" ? "opacity-30 blur-md" : activeTab === "audio" ? "opacity-50 mix-blend-luminosity" : "opacity-90"
                  } transition-all`}
                />
                {detailState !== "questionnaire" && (
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                )}

                {/* ── Questionnaire Overlay ── */}
                {detailState === "questionnaire" && (
                  <div className="absolute inset-0 flex flex-col justify-center px-6 z-20">
                    <div className="space-y-5 mt-4">
                      <div>
                        <p className="text-white text-[13px] font-medium mb-3">
                          Do you think the price of our product is fair?
                        </p>
                        <div className="flex gap-6">
                          <label className="flex items-center gap-2 cursor-pointer">
                            <span className="text-slate-300 text-[12px]">(a)</span>
                            <div className="bg-green-600 px-2 py-0.5 rounded text-[10px] font-bold flex items-center gap-1 text-white">
                              Yes
                            </div>
                            <div className="w-4 h-4 rounded-full border border-green-500 bg-green-500 flex items-center justify-center">
                              <div className="w-1.5 h-1.5 bg-[var(--app-bg)] rounded-full" />
                            </div>
                          </label>
                          <label className="flex items-center gap-2 cursor-pointer">
                            <span className="text-slate-300 text-[12px]">(b)</span>
                            <div className="bg-red-600 px-2 py-0.5 rounded text-[10px] font-bold flex items-center gap-1 text-white">
                              No
                            </div>
                            <div className="w-4 h-4 rounded-full border border-slate-400 flex items-center justify-center" />
                          </label>
                        </div>
                      </div>

                      <div>
                        <p className="text-white text-[13px] font-medium mb-3">
                          Which alternative brand do you think is better?
                        </p>
                        <div className="space-y-2">
                          {["Boom", "Sunlight", "Unilever"].map((brand, i) => (
                            <label key={brand} className="flex items-center justify-between cursor-pointer max-w-[140px]">
                              <div className="flex gap-2">
                                <span className="text-slate-300 text-[12px]">({String.fromCharCode(97 + i)})</span>
                                <span className="text-white text-[13px]">{brand}</span>
                              </div>
                              <div
                                className={`w-4 h-4 rounded-full border ${
                                  i === 1 ? "border-green-500 bg-green-500" : "border-slate-400"
                                } flex items-center justify-center`}
                              >
                                {i === 1 && <div className="w-1.5 h-1.5 bg-[var(--app-bg)] rounded-full" />}
                              </div>
                            </label>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Complete button */}
                    <button
                      onClick={() => setDetailState("viewer")}
                      className="w-full bg-[var(--app-text)] text-white py-4 rounded-xl font-medium text-lg tracking-wide active:scale-95 transition-all shadow-lg mt-6"
                    >
                      Complete
                    </button>
                  </div>
                )}

                {/* ── Default Player Content ── */}
                {detailState === "viewer" && (
                  <>
                    {/* Title overlay on the player */}
                    <div className="absolute bottom-16 left-4 z-10">
                      <h3 className="text-white font-medium text-sm drop-shadow-md">{selectedAd.title}</h3>
                    </div>

                    {activeTab === "video" && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="relative z-10 w-16 h-16 rounded-full bg-[var(--app-bg)]/20 backdrop-blur-md border-2 border-white flex items-center justify-center shadow-2xl cursor-pointer active:scale-90 transition-transform">
                          <Play primary="#fff" size={28} />
                        </div>
                      </div>
                    )}

                    {activeTab === "audio" && (
                      <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
                        <div className="w-24 h-24 rounded-full bg-[var(--app-bg)]/15 backdrop-blur-md border-2 border-white/40 flex items-center justify-center shadow-2xl">
                          <Headphones primary="#fff" size={40} />
                        </div>
                        <div className="flex items-center gap-2 bg-[var(--app-bg)]/10 backdrop-blur-md rounded-full px-4 py-2 border border-white/20">
                          <Volume2 primary="#fb923c" size={14} />
                          <div className="w-32 h-1 bg-[var(--app-bg)]/20 rounded-full overflow-hidden">
                            <div className="w-[35%] h-full bg-orange-500 rounded-full" />
                          </div>
                          <span className="text-white/60 text-[10px] font-black">{selectedAd.duration}</span>
                        </div>
                      </div>
                    )}

                    {/* Action Bar inside player */}
                    <div className="absolute bottom-4 left-4 right-4 z-10 border-b border-white/20 pb-3">
                      <div className="flex justify-between items-center px-2">
                        <button
                          onClick={() => setDetailState("questionnaire")}
                          className="flex flex-col items-center gap-1 cursor-pointer"
                        >
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.9)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <rect x="3" y="3" width="18" height="18" rx="2" />
                            <path d="M8 12h8M8 8h8M8 16h4" />
                          </svg>
                          <span className="text-[7px] text-white/70 uppercase font-bold">Questionnaire</span>
                        </button>
                        <button className="flex flex-col items-center gap-1 cursor-pointer">
                          <Heart size={20} className="text-white/90" />
                          <span className="text-[7px] text-white/70 uppercase font-bold">Reaction</span>
                        </button>
                        <button className="flex flex-col items-center gap-1 cursor-pointer">
                          <Share2 size={20} className="text-white/90" />
                          <span className="text-[7px] text-white/70 uppercase font-bold">Share</span>
                        </button>
                        <button className="flex flex-col items-center gap-1 cursor-pointer">
                          <Send size={20} className="text-white/90" />
                          <span className="text-[7px] text-white/70 uppercase font-bold">Inquiry</span>
                        </button>
                        <button className="flex flex-col items-center gap-1 cursor-pointer">
                          <Download size={20} className="text-white/90" />
                          <span className="text-[7px] text-white/70 uppercase font-bold">Save</span>
                        </button>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* ── Bottom Details — Brand Info ── */}
            {detailState === "viewer" && (
              <div className="bg-gradient-to-b from-black to-[#1a1111] px-4 pt-4 space-y-5 pb-20 flex-1">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-orange-500 flex items-center justify-center">
                    <span className="text-white font-black text-sm">{selectedAd.brand[0]}</span>
                  </div>
                  <div>
                    <p className="text-white font-black text-sm">{selectedAd.brand}</p>
                    <div className="flex items-center gap-2 text-white/50 text-[10px] font-bold">
                      <Eye size={10} className="text-white/50" />
                      {selectedAd.views} views
                      <MapPin size={10} className="text-white/50" />
                      {selectedAd.location}
                    </div>
                  </div>
                </div>

                {activeTab === "video" && (
                  <>
                    <div className="w-full h-1 bg-[var(--app-bg)]/20 rounded-full overflow-hidden">
                      <div className="w-1/3 h-full bg-orange-500 rounded-full" />
                    </div>
                    <div className="flex justify-between text-white/40 text-[10px] font-bold tracking-widest -mt-3">
                      <span>00:00</span>
                      <span>-{selectedAd.duration}</span>
                    </div>
                  </>
                )}

                {/* Action buttons row */}
                <div className="flex items-center justify-around pt-2 border-t border-white/10">
                  <button onClick={() => setLiked(!liked)} className="flex flex-col items-center gap-1 active:scale-90 transition-all">
                    <Heart size={20} className={liked ? "text-red-500 fill-red-500" : "text-white"} />
                    <span className="text-[8px] font-black text-white/60 uppercase tracking-widest">Like</span>
                  </button>
                  <button className="flex flex-col items-center gap-1 active:scale-90 transition-all">
                    <Share2 size={20} className="text-white" />
                    <span className="text-[8px] font-black text-white/60 uppercase tracking-widest">Share</span>
                  </button>
                  <button className="flex flex-col items-center gap-1 active:scale-90 transition-all">
                    <Download size={20} className="text-white" />
                    <span className="text-[8px] font-black text-white/60 uppercase tracking-widest">Save</span>
                  </button>
                  <button className="flex flex-col items-center gap-1 active:scale-90 transition-all">
                    <Flag size={20} className="text-white" />
                    <span className="text-[8px] font-black text-white/60 uppercase tracking-widest">Report</span>
                  </button>
                </div>

                {/* ── More Ads ── */}
                <div>
                  <h3 className="text-sm font-bold mb-3 text-slate-300">More Ads</h3>
                  <div className="flex gap-2.5 overflow-x-auto no-scrollbar">
                    {MORE_ADS.map((vid) => (
                      <div key={vid.id} className="w-24 h-24 rounded-2xl bg-slate-800 overflow-hidden flex-shrink-0 relative group cursor-pointer active:scale-95 transition-transform">
                        <img src={vid.image} alt="" className="w-full h-full object-cover opacity-70 group-hover:opacity-50 transition-all" />
                        <div className="absolute inset-0 flex items-center justify-center">
                          <Play size={24} primary="#fff" />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* ── Trending Ads ── */}
                <div>
                  <h3 className="text-sm font-bold mb-3 text-slate-300">Trending Ads</h3>
                  <div className="flex gap-2.5 overflow-x-auto no-scrollbar">
                    {TRENDING_ADS.map((vid) => (
                      <div key={vid.id} className="w-20 h-28 rounded-xl bg-slate-800 overflow-hidden flex-shrink-0 relative cursor-pointer active:scale-95 transition-transform">
                        <img src={vid.image} alt="" className="w-full h-full object-cover opacity-80" />
                        <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                          <Play size={20} primary="#fff" />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
