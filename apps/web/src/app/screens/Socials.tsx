import { motion, AnimatePresence } from "motion/react";
import { 
  MoreVertical, 
  X,
  Video,
  Mic,
  Link as LinkIcon
} from "lucide-react";
import { 
  DuotoneRadio as Radio, 
  DuotonePlusCircle as PlusCircle, 
  DuotoneUserPlus as UserPlus, 
  DuotonePlay as Play, 
  DuotoneShieldCheck as ShieldCheck, 
  DuotoneThumbsUp as ThumbsUp, 
  DuotoneMessageSquare as MessageSquare, 
  DuotoneShare as Share, 
  DuotoneSend as Send, 
  DuotoneImageIcon as ImageIcon,
  DuotonePlus as Plus
} from "../components/DuotoneIcon";
import { Link } from "react-router";
import { useState } from "react";
import { PageHeader } from "../components/PageHeader";

// --- MOCKS FOR FEED ---
const MOCK_REELS = [
  { id: 'create', isCreate: true },
  { id: 1, image: "https://picsum.photos/seed/reelA/300/500", user: "https://i.pravatar.cc/150?u=r1" },
  { id: 2, image: "https://picsum.photos/seed/reelB/300/500", user: "https://i.pravatar.cc/150?u=r2" },
  { id: 3, image: "https://picsum.photos/seed/reelC/300/500", user: "https://i.pravatar.cc/150?u=r3" },
  { id: 4, image: "https://picsum.photos/seed/reelD/300/500", user: "https://i.pravatar.cc/150?u=r4" },
];

const INITIAL_POSTS = [
  {
    id: 1,
    user: { name: "Sarah Chanda", avatar: "https://i.pravatar.cc/150?u=sarah", verified: true },
    time: "2h ago",
    content: "Just launched the new Kleench Masterclass series! 🎓 Dive deep into the ZMW ecosystem and start earning today. Check out the link in bio for more details.",
    image: "https://picsum.photos/seed/post1/800/600",
    likes: 124,
    comments: [
      { id: 101, user: "David Mwale", avatar: "https://i.pravatar.cc/150?u=david", text: "This is exactly what the community needed. Pure fire! 🔥" }
    ],
    shares: 5
  },
  {
    id: 2,
    user: { name: "Lungu Joseph", avatar: "https://i.pravatar.cc/150?u=joseph", verified: false },
    time: "5h ago",
    content: "Zambia's digital economy is growing at an incredible rate. Grateful to be part of this innovative journey with @Kleench. Support local builders! 🏗️",
    image: "https://picsum.photos/seed/post2/800/600",
    likes: 89,
    comments: [
      { id: 102, user: "Chola K.", avatar: "https://i.pravatar.cc/150?u=chola", text: "Let's build together! 🚀" }
    ],
    shares: 2
  }
];

export function Socials() {
  const [searchQuery, setSearchQuery] = useState("");
  const [posts, setPosts] = useState(INITIAL_POSTS);
  
  const filteredPostsView = posts.filter(p => 
    p.content.toLowerCase().includes(searchQuery.toLowerCase()) || 
    p.user.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const [likedPosts, setLikedPosts] = useState<Set<number>>(new Set());
  const [activeCommentId, setActiveCommentId] = useState<number | null>(null);
  const [commentText, setCommentText] = useState("");
  const [showCreatePost, setShowCreatePost] = useState(false);
  const [newPostText, setNewPostText] = useState("");
  const [activeTipPostId, setActiveTipPostId] = useState<number | null>(null);
  const [tipAmount, setTipAmount] = useState<number>(50);
  const [customTip, setCustomTip] = useState("");
  const [repeatTip, setRepeatTip] = useState<"once" | "weekly" | "monthly">("once");
  const [showTipPassword, setShowTipPassword] = useState(false);
  const [tipPin, setTipPin] = useState("");

  const handleTipConfirm = () => {
    setShowTipPassword(true);
  };

  const handleTipSubmit = () => {
    if (tipPin.length !== 4) return;
    alert(`Successfully sent tip!`);
    setShowTipPassword(false);
    setActiveTipPostId(null);
    setTipPin("");
  };

  const toggleLike = (postId: number) => {
    setLikedPosts(prev => {
      const next = new Set(prev);
      if (next.has(postId)) next.delete(postId);
      else next.add(postId);
      return next;
    });
    
    setPosts(prev => prev.map(p => {
      if (p.id === postId) {
        return { ...p, likes: likedPosts.has(postId) ? p.likes - 1 : p.likes + 1 };
      }
      return p;
    }));
  };

  const handleAddComment = (postId: number) => {
    if (!commentText.trim()) return;
    
    const newComment = {
      id: Date.now(),
      user: "Me",
      avatar: localStorage.getItem("userProfilePhoto") || "https://i.pravatar.cc/150?u=me",
      text: commentText
    };

    setPosts(prev => prev.map(p => {
      if (p.id === postId) {
        return { ...p, comments: [...p.comments, newComment] };
      }
      return p;
    }));
    
    setCommentText("");
    setActiveCommentId(null);
  };

  const handleCreatePost = () => {
    if (!newPostText.trim()) return;

    const newPost = {
      id: Date.now(),
      user: { 
        name: JSON.parse(localStorage.getItem("userKyc") || "{}").fullName || "My Wallet", 
        avatar: localStorage.getItem("userProfilePhoto") || "https://i.pravatar.cc/150?u=user", 
        verified: true 
      },
      time: "Just now",
      content: newPostText,
      image: "https://picsum.photos/seed/" + Date.now() + "/800/600",
      likes: 0,
      comments: [],
      shares: 0
    };

    setPosts([newPost, ...posts]);
    setNewPostText("");
    setShowCreatePost(false);
  };

  return (
    <div className="w-full relative min-h-[100dvh] bg-transparent overflow-x-hidden font-sans pb-32">
      
      {/* ── Standardized Header ── */}
      <PageHeader 
        title="SOCIALS" 
        useLogo
        searchValue={searchQuery}
        onSearchChange={setSearchQuery}
      />

      {/* ACTION BAR MOVED OUT OF HEADER (EXACTLY BELOW) */}
      <div className="flex w-full bg-[var(--app-bg)] border-y border-[var(--color-primary)] items-stretch h-[46px] z-20 relative shadow-sm">
         <Link to="/learning/go-live" className="flex-1 flex items-center justify-center gap-2 border-r border-[var(--color-primary)]/40 text-[var(--color-primary)] active:bg-[var(--color-primary)]/5 transition-colors">
            <Radio size={18} className="animate-pulse" />
            <span className="text-[13px] font-black uppercase tracking-widest mt-[2px]">Live</span>
         </Link>
         <button onClick={() => setShowCreatePost(true)} className="flex-1 flex items-center justify-center gap-2 border-r border-[var(--color-primary)]/40 text-[var(--app-text)] active:bg-[var(--app-shape-accent)]/5 transition-colors">
            <PlusCircle size={18} primary="var(--color-primary)" />
            <span className="text-[13px] font-black uppercase tracking-widest mt-[2px]">Post</span>
         </button>
         <Link to="/friends" className="flex-1 flex items-center justify-center gap-2 text-[var(--app-text)] active:bg-[var(--app-shape-accent)]/5 transition-colors">
            <UserPlus size={18} primary="var(--color-primary)" />
            <span className="text-[13px] font-black uppercase tracking-widest mt-[2px]">Friends</span>
         </Link>
      </div>

      <div className="px-5 mt-6 relative z-10 space-y-6 pb-20">

        {/* SECTION 02. REELS */}
        <section className="space-y-3">
           <h3 className="font-black text-[18px] text-[var(--app-text)] tracking-tight ml-1">Reels</h3>
           
           <div className="flex gap-2.5 overflow-x-auto pb-6 pt-1 -mx-5 px-5 scrollbar-hide no-scrollbar appearance-none">
              {MOCK_REELS.map((reel) => {
                 if (reel.isCreate) {
                    return (
                       <button key={reel.id} onClick={() => setShowCreatePost(true)} className="min-w-[95px] w-[28vw] max-w-[120px] h-[155px] flex-shrink-0 flex flex-col items-center justify-between bg-[var(--app-bg)] border border-[var(--app-text)] rounded-xl active:scale-95 transition-transform overflow-hidden relative">
                          <div className="flex-1 flex items-center justify-center w-full">
                             <div className="w-12 h-12 rounded-full bg-[var(--app-shape-accent)] flex items-center justify-center text-white">
                                <Plus size={32} primary="#fff" />
                             </div>
                          </div>
                          <div className="w-full bg-[var(--app-bg)] border-t-2 border-[var(--app-text)]/20 py-2.5 flex items-center justify-center">
                             <span className="text-[9px] font-black text-[var(--app-text)] leading-tight uppercase tracking-widest text-center">Create<br/>Content</span>
                          </div>
                       </button>
                    )
                 }
                 return (
                    <div key={reel.id} className="min-w-[95px] w-[28vw] max-w-[120px] h-[155px] flex-shrink-0 relative active:scale-95 transition-transform cursor-pointer">
                       <div className="w-full h-full rounded-xl overflow-hidden bg-[var(--app-text-slate)] border border-[var(--app-text)]/10 relative">
                           <img src={reel.image} alt="" className="w-full h-full object-cover opacity-90" />
                           <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                              <div className="w-10 h-10 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center border border-white/20">
                                 <Play size={16} primary="#fff" className="ml-0.5" />
                              </div>
                           </div>
                       </div>
                       <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 z-10">
                          <img src={reel.user} alt="" className="w-7 h-7 rounded-full border border-white object-cover" />
                       </div>
                    </div>
                 )
              })}
           </div>
        </section>

        {/* SECTION 03. BROADCAST FEED */}
        <section className="space-y-8">
           <div className="flex items-center gap-3">
              <span className="text-[var(--app-orange)] font-black text-xs tracking-[0.3em]">03.</span>
              <h3 className="font-black text-[10px] uppercase tracking-[0.4em] text-[var(--app-text)]/40">Global Feed</h3>
              <div className="flex-1 h-[2px] bg-[var(--app-shape-accent)]/5" />
           </div>

           <div className="flex flex-col gap-10">
              {filteredPostsView.map((post) => (
                <motion.article 
                  key={post.id} 
                  initial={{ opacity: 0, y: 30 }} 
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.1 }}
                  className="bg-[var(--app-bg)] border-x-4 border-[var(--app-text)]/5"
                >
                  <div className="flex items-center justify-between px-4 pt-4 mb-3">
                    <div className="flex items-center gap-2">
                      <Link to={`/creator/${post.user.name.toLowerCase().replace(/ /g, "-")}`} className="shrink-0 active:scale-95 transition-transform">
                         <img src={post.user.avatar} alt={post.user.name} className="w-10 h-10 rounded-full object-cover shadow-sm" />
                      </Link>
                      <div className="flex items-center gap-1">
                         <Link to={`/creator/${post.user.name.toLowerCase().replace(/ /g, "-")}`} className="font-black text-[13px] text-[var(--app-text)] hover:underline">
                            {post.user.name}
                         </Link>
                         {post.user.verified && <ShieldCheck size={12} primary="var(--app-orange)" />}
                         <span className="text-[var(--app-text)]/30 text-xs mx-0.5">•</span>
                         <span className="text-[11px] font-bold text-[var(--app-text)]/40">{post.time}</span>
                      </div>
                    </div>
                    <button className="w-8 h-8 flex items-center justify-center text-[var(--app-text)]/40 transition-colors">
                       <MoreVertical size={20} />
                    </button>
                  </div>

                  <div className="space-y-4">
                    <p className="px-4 text-[13px] font-medium leading-[1.6] text-[var(--app-text)]/80 text-justify">
                      {post.content}
                    </p>
                    <div className="bg-gray-100 overflow-hidden border-y border-[var(--app-text)]/10">
                       <img src={post.image} alt="Content" className="w-full aspect-[4/5] object-cover" />
                    </div>
                  </div>

                  {/* Action Bar */}
                  <div className="flex flex-col border-b border-[var(--app-text)]/5 bg-[var(--app-bg)]">
                     <div className="flex items-center justify-between px-4 py-3">
                        <div className="flex items-center gap-6">
                           <button onClick={() => toggleLike(post.id)} className={`transition-colors ${likedPosts.has(post.id) ? "text-[var(--app-orange)]" : "text-[var(--app-text)]/80"} active:scale-95`}>
                               <ThumbsUp size={24} primary={likedPosts.has(post.id) ? "var(--app-orange)" : undefined} />
                           </button>
                           <button onClick={() => setActiveCommentId(activeCommentId === post.id ? null : post.id)} className="text-[var(--app-text)]/80 active:scale-95 transition-transform">
                               <MessageSquare size={24} />
                           </button>
                           <button className="text-[var(--app-text)]/80 active:scale-95 transition-transform">
                               <Share size={24} />
                           </button>
                        </div>
                        <button onClick={() => setActiveTipPostId(post.id)} className="bg-[var(--color-primary)] text-white px-5 py-1.5 rounded-[20px] font-black text-[10px] uppercase tracking-widest shadow-sm active:scale-95 transition-all">
                           Tip
                        </button>
                     </div>
                     <div className="px-4 py-2 bg-[var(--app-shape-accent)]/[0.02] border-t border-[var(--app-text)]/[0.05] flex items-center gap-4 text-[var(--app-text)]/60 text-[10px] font-black uppercase tracking-widest">
                        <span>Like | {post.likes}</span>
                        <span>Comments | {post.comments.length}</span>
                        <span>Share | {post.shares}</span>
                     </div>
                  </div>

                  {/* Comments Section */}
                  <AnimatePresence>
                    {activeCommentId === post.id && (
                      <motion.div 
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="bg-[var(--app-bg-muted)]/50 overflow-hidden"
                      >
                        <div className="p-4 space-y-4">
                           <div className="flex gap-3">
                              <input 
                                type="text"
                                placeholder="Add a comment..."
                                value={commentText}
                                onChange={(e) => setCommentText(e.target.value)}
                                onKeyDown={(e) => e.key === "Enter" && handleAddComment(post.id)}
                                className="flex-1 bg-[var(--app-bg)] border border-[var(--app-text)]/10 px-4 py-2 text-sm font-medium outline-none focus:border-[var(--app-orange)]"
                              />
                              <button 
                                onClick={() => handleAddComment(post.id)}
                                className="bg-[var(--app-shape-accent)] text-white px-4 flex items-center justify-center shadow-[3px_3px_0px_var(--app-orange)] active:translate-x-0.5 active:translate-y-0.5"
                              >
                                <Send size={16} primary="#fff" />
                              </button>
                           </div>
                           <div className="space-y-3">
                             {post.comments.map(c => (
                               <div key={c.id} className="flex gap-3">
                                  <img src={c.avatar} alt="" className="w-8 h-8 rounded-full object-cover shrink-0" />
                                  <div className="flex flex-col">
                                     <span className="text-[11px] font-black text-[var(--app-text)]">{c.user}</span>
                                     <p className="text-[12px] text-[var(--app-text)]/70 leading-tight">{c.text}</p>
                                  </div>
                               </div>
                             ))}
                           </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Inline Comment Preview (if not expanded) */}
                  {activeCommentId !== post.id && post.comments.length > 0 && (
                    <div className="mt-4 px-2 py-4 bg-[var(--app-shape-accent)]/[0.02] border-l-4 border-[var(--app-orange)]">
                      <div className="flex gap-3">
                        <img src={post.comments[0].avatar} alt="" className="w-7 h-7 rounded-full object-cover shrink-0" />
                        <div className="flex flex-col gap-0.5">
                          <span className="text-[11px] font-black text-[var(--app-text)]">{post.comments[0].user}</span>
                          <p className="text-[12px] text-[var(--app-text)]/60 leading-tight italic line-clamp-1">"{post.comments[0].text}"</p>
                        </div>
                      </div>
                    </div>
                  )}
                </motion.article>
              ))}
           </div>
        </section>
      </div>

      {/* TIP MODAL */}
      <AnimatePresence>
        {activeTipPostId !== null && (
          <>
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setActiveTipPostId(null)}
              className="fixed inset-0 z-[110] bg-black/60 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ y: "100%" }} animate={{ y: 0 }} exit={{ y: "100%" }} transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed bottom-0 left-0 right-0 z-[120] bg-[var(--app-bg)] rounded-t-[32px] border-t border-[var(--app-text)] p-6 shadow-[0_-20px_40px_rgba(0,0,0,0.2)] pb-[env(safe-area-inset-bottom,20px)]"
            >
              <div className="flex justify-between items-center mb-6">
                <h3 className="font-black text-[18px] uppercase tracking-tighter text-[var(--app-text)]">Send a Tip</h3>
                <button onClick={() => setActiveTipPostId(null)} className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-[var(--app-text)] active:scale-95"><X size={18}/></button>
              </div>

              <div className="mb-6">
                <div className="flex justify-between items-end mb-4">
                  <p className="text-[11px] font-bold text-[var(--app-text)]/60 uppercase tracking-widest">Select Amount</p>
                  <span className="text-4xl font-black text-[var(--app-orange)]">K{customTip || tipAmount}</span>
                </div>
                
                {!customTip && (
                  <div className="mb-8 relative pt-2">
                    <input 
                      type="range" min="1" max="100" step="1"
                      value={tipAmount}
                      onChange={(e) => setTipAmount(Number(e.target.value))}
                      className="w-full accent-[var(--app-orange)] h-3 bg-[var(--app-shape-accent)]/10 rounded-lg appearance-none cursor-pointer"
                    />
                    <div className="flex justify-between text-[9px] font-black text-[var(--app-text)]/40 mt-2 uppercase tracking-widest">
                      <span>K1</span>
                      <span>K50</span>
                      <span>K100</span>
                    </div>
                  </div>
                )}

                <div className="grid grid-cols-2 gap-4 mb-2">
                  <div>
                    <label className="text-[9px] font-black uppercase tracking-widest text-[var(--app-text)]/60 mb-1.5 block">Own Amount</label>
                    <input 
                      type="number" 
                      placeholder="Enter amount"
                      value={customTip}
                      onChange={(e) => {
                        setCustomTip(e.target.value);
                      }}
                      className="w-full py-3.5 px-4 rounded-xl border border-[var(--app-text)]/20 font-black text-[14px] outline-none focus:border-[var(--app-orange)] focus:shadow-[2px_2px_0px_var(--app-orange)] transition-all bg-[var(--app-bg-muted)]"
                    />
                  </div>
                  <div>
                    <label className="text-[9px] font-black uppercase tracking-widest text-[var(--app-text)]/60 mb-1.5 block">Frequency</label>
                    <select 
                      value={repeatTip}
                      onChange={(e) => setRepeatTip(e.target.value as "once" | "weekly" | "monthly")}
                      className="w-full py-3.5 px-4 rounded-xl border border-[var(--app-text)]/20 font-black text-[13px] outline-none focus:border-[var(--app-orange)] focus:shadow-[2px_2px_0px_var(--app-orange)] transition-all bg-[var(--app-bg-muted)] appearance-none uppercase tracking-wider"
                    >
                      <option value="once">One-time</option>
                      <option value="weekly">Weekly</option>
                      <option value="monthly">Monthly</option>
                    </select>
                  </div>
                </div>
              </div>

              <button 
                onClick={handleTipConfirm}
                className="w-full bg-[var(--app-shape-accent)] text-white py-4.5 rounded-xl font-black text-[14px] uppercase tracking-[0.2em] shadow-[4px_4px_0px_var(--app-orange)] active:translate-x-1 active:translate-y-1 active:shadow-none transition-all"
              >
                Confirm Tip
              </button>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* 6.1 TIP PASSWORD MODAL */}
      <AnimatePresence>
        {showTipPassword && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] bg-[var(--app-shape-accent)]/90 backdrop-blur-md flex items-center justify-center p-4"
          >
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}
              className="bg-[var(--app-bg)] w-full max-w-sm rounded-[32px] border border-[var(--app-orange)] shadow-[12px_12px_0px_#000] p-8 relative overflow-hidden"
            >
              <button onClick={() => setShowTipPassword(false)} className="absolute top-5 right-5 text-[var(--app-text)]/40 active:scale-90 bg-gray-100 rounded-full w-8 h-8 flex items-center justify-center"><X size={16}/></button>
              
              <div className="text-center mb-8 mt-2">
                 <div className="w-16 h-16 bg-[var(--app-orange)]/10 rounded-full flex items-center justify-center mx-auto mb-4 border border-[var(--app-orange)]">
                    <ShieldCheck size={32} primary="var(--app-orange)" />
                 </div>
                 <h3 className="font-black text-2xl uppercase tracking-tighter text-[var(--app-text)]">Put Password</h3>
                 <p className="text-[11px] font-bold text-[var(--app-text)]/50 uppercase tracking-widest mt-2">Enter your 4-digit PIN to authorize K{customTip || tipAmount}</p>
              </div>

              <div className="flex justify-center gap-3 mb-8">
                 {[1,2,3,4].map((_, i) => (
                    <div key={i} className={`w-14 h-16 rounded-xl border flex items-center justify-center text-3xl font-black transition-all ${tipPin.length > i ? 'border-[var(--app-orange)] bg-[var(--app-orange)]/10 text-[var(--app-text)]' : 'border-[var(--app-text)]/20 bg-[var(--app-bg-muted)]'}`}>
                       {tipPin.length > i ? '•' : ''}
                    </div>
                 ))}
              </div>
              <input 
                type="number" autoFocus maxLength={4}
                value={tipPin} onChange={(e) => setTipPin(e.target.value.slice(0, 4))}
                className="absolute inset-0 opacity-0 cursor-text"
              />

              <button 
                disabled={tipPin.length !== 4}
                onClick={handleTipSubmit}
                className="w-full bg-[var(--app-orange)] text-white py-4.5 rounded-xl font-black text-[14px] uppercase tracking-[0.2em] shadow-[4px_4px_0px_var(--app-text)] active:translate-x-1 active:translate-y-1 active:shadow-none transition-all disabled:opacity-50 disabled:active:translate-x-0 disabled:active:translate-y-0 disabled:shadow-[4px_4px_0px_var(--app-text)] border border-[var(--app-text)]"
              >
                Confirm Payment
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 2.0 CREATE POST MODAL */}
      <AnimatePresence>
        {showCreatePost && (
          <motion.div 
            initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 50 }}
            className="fixed inset-0 z-[150] bg-[var(--app-bg)] flex flex-col"
          >
            <div className="h-16 flex items-center justify-between px-4 border-b border-[var(--app-text)] bg-[var(--app-shape-accent)] text-white shadow-md z-10">
               <button onClick={() => setShowCreatePost(false)} className="w-10 h-10 flex items-center justify-center active:scale-90"><X size={24} /></button>
               <h3 className="font-black text-sm uppercase tracking-[0.2em] mt-1">Create Post</h3>
               <div className="w-10" />
            </div>

            <div className="flex-1 overflow-y-auto p-6 bg-[var(--color-neutral)]">
               <h2 className="font-black text-2xl uppercase tracking-tighter text-[var(--app-text)] mb-6 leading-tight" style={{ fontFamily: "var(--font-header)" }}>What's your story today?</h2>
               
               <div className="grid grid-cols-2 gap-4 mb-8">
                  {[
                    { id: 'media', icon: ImageIcon, label: 'Media' },
                    { id: 'video', icon: Video, label: 'Video' },
                    { id: 'audio', icon: Mic, label: 'Audio' },
                    { id: 'link', icon: LinkIcon, label: 'Link' },
                  ].map(t => (
                     <button key={t.id} className="flex flex-col items-center justify-center h-28 rounded-2xl border border-[var(--app-text)] bg-[var(--app-bg)] shadow-[4px_4px_0px_var(--app-orange)] active:translate-x-1 active:translate-y-1 active:shadow-none transition-all group">
                        <t.icon size={32} className="mb-2 text-[var(--app-text)] group-active:text-[var(--app-orange)] transition-colors" />
                        <span className="text-[12px] font-black uppercase tracking-widest text-[var(--app-text)] group-active:text-[var(--app-orange)] transition-colors">{t.label}</span>
                     </button>
                  ))}
               </div>

               <div className="space-y-6">
                  <div>
                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-[var(--app-text)]/60 mb-2 block">Caption</label>
                    <textarea 
                      placeholder="Share your thoughts..."
                      value={newPostText}
                      onChange={(e) => setNewPostText(e.target.value.slice(0, 200))}
                      className="w-full h-32 bg-[var(--app-bg)] border border-[var(--app-text)]/20 rounded-2xl p-4 text-[14px] font-bold text-[var(--app-text)] outline-none focus:border-[var(--app-orange)] focus:shadow-[2px_2px_0px_var(--app-orange)] resize-none transition-all"
                    />
                    <div className="text-right mt-1.5 text-[10px] font-black text-[var(--app-text)]/40 uppercase tracking-widest">{newPostText.length}/200 MAX</div>
                  </div>

                  <div className="space-y-4">
                     <div className="flex items-center justify-between p-4 rounded-xl border border-[var(--app-text)]/10 bg-[var(--app-bg)]">
                        <span className="text-[11px] font-black uppercase tracking-widest text-[var(--app-text)]">Location Tagging</span>
                        <div className="w-10 h-6 bg-gray-200 rounded-full relative cursor-pointer"><div className="w-5 h-5 bg-[var(--app-bg)] rounded-full absolute top-0.5 left-0.5 shadow-sm" /></div>
                     </div>
                     <div className="flex items-center justify-between p-4 rounded-xl border border-[var(--app-text)] bg-[var(--app-bg)] shadow-[2px_2px_0px_var(--app-orange)]">
                        <span className="text-[11px] font-black uppercase tracking-widest text-[var(--app-text)]">Allow Comments</span>
                        <div className="w-10 h-6 bg-[var(--app-orange)] rounded-full relative cursor-pointer"><div className="w-5 h-5 bg-[var(--app-bg)] rounded-full absolute top-0.5 right-0.5 shadow-sm border border-white" /></div>
                     </div>
                     <div className="flex items-center justify-between p-4 rounded-xl border border-[var(--app-text)]/10 bg-[var(--app-bg)]">
                        <span className="text-[11px] font-black uppercase tracking-widest text-[var(--app-text)]">Who can see this?</span>
                        <span className="text-[11px] font-black text-[var(--app-orange)] uppercase tracking-widest bg-[var(--app-orange)]/10 px-3 py-1 rounded-full">Public</span>
                     </div>
                  </div>
               </div>
            </div>

            <div className="p-6 border-t border-[var(--app-text)] bg-[var(--app-bg)] pb-[env(safe-area-inset-bottom,24px)]">
               <button 
                onClick={handleCreatePost}
                className="w-full bg-[var(--app-orange)] text-white py-4.5 rounded-xl font-black text-[14px] uppercase tracking-[0.2em] shadow-[4px_4px_0px_var(--app-text)] active:translate-x-1 active:translate-y-1 active:shadow-none transition-all border border-[var(--app-text)]"
               >
                 Share Story
               </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
