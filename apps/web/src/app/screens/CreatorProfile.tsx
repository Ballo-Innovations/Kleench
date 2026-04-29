import { useParams, useNavigate } from "react-router";
import { PageHeader } from "../components/PageHeader";
import { motion } from "motion/react";
import { useState } from "react";
import { MessageSquare, Grid } from "lucide-react";

const MOCK_POSTS = [
  "https://images.unsplash.com/photo-1515378960530-7c0da622941f?auto=format&fit=crop&w=400&q=80",
  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&q=80",
  "https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?auto=format&fit=crop&w=400&q=80",
  "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&w=400&q=80",
  "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=400&q=80",
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80",
];

export function CreatorProfile() {
  const { username } = useParams();
  const navigate = useNavigate();
  const [isFollowing, setIsFollowing] = useState(false);

  const creatorName = username ? username.replace("-", " ").toUpperCase() : "PETER M S LENGALENGA";

  return (
    <div className="w-full relative min-h-[100dvh] bg-[#f8fafc] font-sans pb-32 overflow-x-hidden">
      <PageHeader 
        title={creatorName}
        showBack
        onBack={() => navigate(-1)}
      />

      <div className="px-5 mt-6">
         <div className="bg-[var(--app-bg)] border border-[var(--app-text)] p-6 shadow-[6px_6px_0px_var(--app-orange)] relative">
            <div className="flex items-center gap-5">
               <div className="w-20 h-20 border border-[var(--app-text)] overflow-hidden bg-[var(--muted)] shrink-0">
                  <img src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80" alt="Creator" className="w-full h-full object-cover" />
               </div>
               <div className="flex-1">
                  <h2 className="font-black text-xl uppercase tracking-tighter text-[var(--app-text)] leading-none mb-1">{creatorName}</h2>
                  <p className="text-[10px] font-black uppercase tracking-widest text-[var(--app-text)]/40">Digital Creator</p>
               </div>
            </div>

            <div className="flex items-center justify-between mt-8 border-y border-[var(--app-text)]/10 py-4">
               <div className="text-center flex-1">
                  <p className="text-xl font-black text-[var(--app-text)]">87</p>
                  <p className="text-[9px] font-black uppercase tracking-widest text-[var(--app-text)]/40 mt-1">Stories</p>
               </div>
               <div className="w-px h-8 bg-[var(--app-shape-accent)]/10" />
               <div className="text-center flex-1">
                  <p className="text-xl font-black text-[var(--app-text)]">5.7K</p>
                  <p className="text-[9px] font-black uppercase tracking-widest text-[var(--app-text)]/40 mt-1">Followers</p>
               </div>
               <div className="w-px h-8 bg-[var(--app-shape-accent)]/10" />
               <div className="text-center flex-1">
                  <p className="text-xl font-black text-[var(--app-text)]">2.7K</p>
                  <p className="text-[9px] font-black uppercase tracking-widest text-[var(--app-text)]/40 mt-1">Likes</p>
               </div>
            </div>

            <div className="flex gap-3 mt-6">
               <button 
                onClick={() => setIsFollowing(!isFollowing)}
                className={`flex-1 py-3.5 rounded-xl border border-[var(--app-text)] font-black text-[12px] uppercase tracking-widest transition-all ${isFollowing ? "bg-[var(--app-shape-accent)]/5 text-[var(--app-text)] shadow-none" : "bg-[var(--app-shape-accent)] text-white shadow-[4px_4px_0px_var(--app-orange)] active:translate-x-1 active:translate-y-1 active:shadow-none"}`}
               >
                  {isFollowing ? "Following" : "Follow"}
               </button>
               <button className="w-14 h-14 bg-[var(--app-bg)] border border-[var(--app-text)] rounded-xl flex items-center justify-center text-[var(--app-text)] shadow-[4px_4px_0px_var(--app-text)] active:translate-x-1 active:translate-y-1 active:shadow-none transition-all shrink-0">
                  <MessageSquare size={20} />
               </button>
            </div>
         </div>

         <div className="mt-10">
            <div className="flex items-center gap-3 mb-6 px-1 border-b border-[var(--app-text)]/10 pb-4">
               <Grid size={20} className="text-[var(--app-text)]" />
               <h3 className="font-black text-[14px] uppercase tracking-widest text-[var(--app-text)]">Lifestyle Content</h3>
            </div>

            <div className="grid grid-cols-3 gap-2">
               {MOCK_POSTS.map((url, i) => (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.05 }}
                    key={i} 
                    className="aspect-square bg-[var(--muted)] border border-[var(--app-text)]/10 overflow-hidden relative group cursor-pointer rounded-lg"
                  >
                     <img src={url} alt={`Post ${i}`} className="w-full h-full object-cover group-active:scale-105 transition-transform duration-300" />
                     <div className="absolute inset-0 bg-black/0 group-active:bg-black/20 transition-colors" />
                  </motion.div>
               ))}
            </div>
         </div>
      </div>
    </div>
  );
}
