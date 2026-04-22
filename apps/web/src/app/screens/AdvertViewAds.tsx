import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router";
import { X, Heart, Share2, Download, Flag, Eye, Clock, MapPin } from "lucide-react";
import {
  DuotonePlay as Play,
  DuotoneHeadphones as Headphones,
  DuotoneVolume as Volume2,
  DuotoneHeart,
  DuotoneImageIcon,
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

function AdCard({ ad, type, onSelect }: { ad: AdItem; type: AdTab; onSelect: (ad: AdItem) => void }) {
  return (
    <motion.div
      whileTap={{ scale: 0.97 }}
      onClick={() => onSelect(ad)}
      className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden cursor-pointer active:shadow-none transition-all"
    >
      <div className="relative aspect-[4/3] bg-slate-900 overflow-hidden">
        <img src={ad.image} alt={ad.title} className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

        {type === "video" && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center shadow-lg">
              <Play primary="#fff" size={16} />
            </div>
          </div>
        )}

        {type === "audio" && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-10 h-10 rounded-full bg-white/15 backdrop-blur-md border border-white/30 flex items-center justify-center shadow-lg">
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

  const tabs: { key: AdTab; label: string; icon: React.ComponentType<{ size: number; primary?: string }> }[] = [
    { key: "video", label: "Video Ads", icon: Play },
    { key: "picture", label: "Picture Ads", icon: DuotoneImageIcon },
    { key: "audio", label: "Audio Ads", icon: Headphones },
  ];

  const activeAds = activeTab === "video" ? VIDEO_ADS : activeTab === "picture" ? PICTURE_ADS : AUDIO_ADS;

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
                  : "bg-white text-slate-500 border border-slate-200"
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
            className="fixed inset-0 z-[200] bg-black max-w-md mx-auto flex flex-col"
          >
            {/* Top bar */}
            <div className="absolute top-0 left-0 right-0 p-4 pt-8 flex justify-between items-center bg-gradient-to-b from-black/80 to-transparent z-10">
              <div>
                <h3 className="text-white font-black text-xs uppercase tracking-widest">{selectedAd.title}</h3>
                <p className="text-white/60 text-[10px] font-bold">{selectedAd.brand}</p>
              </div>
              <button
                onClick={() => { setSelectedAd(null); setLiked(false); }}
                className="w-10 h-10 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center text-white border border-white/20 active:scale-90 transition-transform"
              >
                <X size={20} />
              </button>
            </div>

            {/* Media Area */}
            <div className="flex-1 relative flex items-center justify-center overflow-hidden">
              <img src={selectedAd.image} alt={selectedAd.title} className="absolute inset-0 w-full h-full object-cover opacity-70" />

              {activeTab === "video" && (
                <div className="relative z-10 w-20 h-20 rounded-full bg-white/20 backdrop-blur-md border-2 border-white flex items-center justify-center shadow-2xl cursor-pointer active:scale-90 transition-transform">
                  <Play primary="#fff" size={32} />
                </div>
              )}

              {activeTab === "audio" && (
                <div className="relative z-10 flex flex-col items-center gap-4">
                  <div className="w-24 h-24 rounded-full bg-white/15 backdrop-blur-md border-2 border-white/40 flex items-center justify-center shadow-2xl">
                    <Headphones primary="#fff" size={40} />
                  </div>
                  <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-full px-4 py-2 border border-white/20">
                    <Volume2 primary="#fb923c" size={14} />
                    <div className="w-32 h-1 bg-white/20 rounded-full overflow-hidden">
                      <div className="w-[35%] h-full bg-orange-500 rounded-full" />
                    </div>
                    <span className="text-white/60 text-[10px] font-black">{selectedAd.duration}</span>
                  </div>
                </div>
              )}
            </div>

            {/* Bottom Details & Actions */}
            <div className="relative z-10 bg-gradient-to-t from-black via-black/95 to-transparent p-6 pb-[calc(env(safe-area-inset-bottom)+16px)] space-y-4">
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
                  <div className="w-full h-1 bg-white/20 rounded-full overflow-hidden">
                    <div className="w-1/3 h-full bg-orange-500 rounded-full" />
                  </div>
                  <div className="flex justify-between text-white/40 text-[10px] font-bold tracking-widest">
                    <span>00:00</span>
                    <span>-{selectedAd.duration}</span>
                  </div>
                </>
              )}

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
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
