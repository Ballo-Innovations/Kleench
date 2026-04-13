import { motion, AnimatePresence } from "motion/react";
import { 
  MoreVertical, 
  ShieldCheck,
  X,
  Image as ImageIcon,
  Send,
  Radio,
  PlusCircle,
  UserPlus,
  Play,
  Plus,
  ThumbsUp,
  MessageSquare,
  Share
} from "lucide-react";
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
      <div className="flex w-full bg-white border-y-[3px] border-[#E85D3F] items-stretch h-[46px] z-20 relative shadow-sm">
         <button className="flex-1 flex items-center justify-center gap-2 border-r-[2px] border-[#E85D3F]/40 text-[#E85D3F] active:bg-[#E85D3F]/5 transition-colors">
            <Radio size={18} strokeWidth={2.5} className="animate-pulse" />
            <span className="text-[13px] font-black uppercase tracking-widest mt-[2px]">Live</span>
         </button>
         <button onClick={() => setShowCreatePost(true)} className="flex-1 flex items-center justify-center gap-2 border-r-[2px] border-[#E85D3F]/40 text-[#003366] active:bg-[#003366]/5 transition-colors">
            <PlusCircle size={18} strokeWidth={2.5} className="text-[#E85D3F]" />
            <span className="text-[13px] font-black uppercase tracking-widest mt-[2px]">Post</span>
         </button>
         <Link to="/friends" className="flex-1 flex items-center justify-center gap-2 text-[#003366] active:bg-[#003366]/5 transition-colors">
            <UserPlus size={18} strokeWidth={2.5} className="text-[#E85D3F]" />
            <span className="text-[13px] font-black uppercase tracking-widest mt-[2px]">Friends</span>
         </Link>
      </div>

      <div className="px-5 mt-6 relative z-10 space-y-6 pb-20">

        {/* SECTION 02. REELS */}
        <section className="space-y-3">
           <h3 className="font-black text-[18px] text-[#003366] tracking-tight ml-1">Reels</h3>
           
           <div className="flex gap-2.5 overflow-x-auto pb-6 pt-1 -mx-5 px-5 scrollbar-hide no-scrollbar appearance-none">
              {MOCK_REELS.map((reel) => {
                 if (reel.isCreate) {
                    return (
                       <button key={reel.id} onClick={() => setShowCreatePost(true)} className="min-w-[95px] w-[28vw] max-w-[120px] h-[155px] flex-shrink-0 flex flex-col items-center justify-between bg-white border-2 border-[#003366] rounded-xl active:scale-95 transition-transform overflow-hidden relative">
                          <div className="flex-1 flex items-center justify-center w-full">
                             <div className="w-12 h-12 rounded-full bg-[#003366] flex items-center justify-center text-white">
                                <Plus size={32} strokeWidth={2.5} />
                             </div>
                          </div>
                          <div className="w-full bg-white border-t-2 border-[#003366]/20 py-2.5 flex items-center justify-center">
                             <span className="text-[9px] font-black text-[#003366] leading-tight uppercase tracking-widest text-center">Create<br/>Content</span>
                          </div>
                       </button>
                    )
                 }
                 return (
                    <div key={reel.id} className="min-w-[95px] w-[28vw] max-w-[120px] h-[155px] flex-shrink-0 relative active:scale-95 transition-transform cursor-pointer">
                       <div className="w-full h-full rounded-xl overflow-hidden bg-slate-900 border border-[#003366]/10 relative">
                           <img src={reel.image} alt="" className="w-full h-full object-cover opacity-90" />
                           <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                              <div className="w-10 h-10 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center border border-white/20">
                                 <Play size={16} className="text-white fill-white ml-0.5" />
                              </div>
                           </div>
                       </div>
                       <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 z-10">
                          <img src={reel.user} alt="" className="w-7 h-7 rounded-full border-[2px] border-white object-cover" />
                       </div>
                    </div>
                 )
              })}
           </div>
        </section>

        {/* SECTION 03. BROADCAST FEED */}
        <section className="space-y-8">
           <div className="flex items-center gap-3">
              <span className="text-[#FF8C00] font-black text-xs tracking-[0.3em]">03.</span>
              <h3 className="font-black text-[10px] uppercase tracking-[0.4em] text-[#003366]/40">Global Feed</h3>
              <div className="flex-1 h-[2px] bg-[#003366]/5" />
           </div>

           <div className="flex flex-col gap-10">
              {filteredPostsView.map((post) => (
                <motion.article 
                  key={post.id} 
                  initial={{ opacity: 0, y: 30 }} 
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.1 }}
                  className="bg-white border-x-4 border-[#003366]/5"
                >
                  <div className="flex items-center justify-between px-4 pt-4 mb-3">
                    <div className="flex items-center gap-2">
                      <img src={post.user.avatar} alt={post.user.name} className="w-10 h-10 rounded-full object-cover shadow-sm" />
                      <div className="flex items-center gap-1">
                         <span className="font-black text-[13px] text-[#003366]">{post.user.name}</span>
                         {post.user.verified && <ShieldCheck size={12} className="text-[#FF8C00]" />}
                         <span className="text-[#003366]/30 text-xs mx-0.5">•</span>
                         <span className="text-[11px] font-bold text-[#003366]/40">{post.time}</span>
                      </div>
                    </div>
                    <button className="w-8 h-8 flex items-center justify-center text-[#003366]/40 transition-colors">
                       <MoreVertical size={20} />
                    </button>
                  </div>

                  <div className="space-y-4">
                    <p className="px-4 text-[13px] font-medium leading-[1.6] text-[#003366]/80 text-justify">
                      {post.content}
                    </p>
                    <div className="bg-gray-100 overflow-hidden border-y border-[#003366]/10">
                       <img src={post.image} alt="Content" className="w-full aspect-[4/5] object-cover" />
                    </div>
                  </div>

                  {/* Action Bar */}
                  <div className="flex flex-col border-b border-[#003366]/5 bg-white">
                     <div className="flex items-center justify-between px-4 py-3">
                        <div className="flex items-center gap-6">
                           <button onClick={() => toggleLike(post.id)} className={`transition-colors ${likedPosts.has(post.id) ? "text-[#003366]" : "text-[#003366]/80"} active:scale-95`}>
                              <ThumbsUp size={24} strokeWidth={2.5} className={likedPosts.has(post.id) ? "fill-[#003366]" : ""} />
                           </button>
                           <button onClick={() => setActiveCommentId(activeCommentId === post.id ? null : post.id)} className="text-[#003366]/80 active:scale-95 transition-transform">
                              <MessageSquare size={24} strokeWidth={2.5} />
                           </button>
                           <button className="text-[#003366]/80 active:scale-95 transition-transform">
                              <Share size={24} strokeWidth={2.5} />
                           </button>
                        </div>
                        <button className="bg-[#E85D3F] text-white px-5 py-1.5 rounded-[20px] font-black text-[10px] uppercase tracking-widest shadow-sm active:scale-95 transition-all">
                           Tip
                        </button>
                     </div>
                     <div className="px-4 py-2 bg-[#003366]/[0.02] border-t border-[#003366]/[0.05] flex items-center gap-4 text-[#003366]/60 text-[10px] font-black uppercase tracking-widest">
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
                        className="bg-gray-50/50 overflow-hidden"
                      >
                        <div className="p-4 space-y-4">
                           <div className="flex gap-3">
                              <input 
                                type="text"
                                placeholder="Add a comment..."
                                value={commentText}
                                onChange={(e) => setCommentText(e.target.value)}
                                onKeyDown={(e) => e.key === "Enter" && handleAddComment(post.id)}
                                className="flex-1 bg-white border border-[#003366]/10 px-4 py-2 text-sm font-medium outline-none focus:border-[#FF8C00]"
                              />
                              <button 
                                onClick={() => handleAddComment(post.id)}
                                className="bg-[#003366] text-white px-4 flex items-center justify-center shadow-[3px_3px_0px_#FF8C00] active:translate-x-0.5 active:translate-y-0.5"
                              >
                                <Send size={16} />
                              </button>
                           </div>
                           <div className="space-y-3">
                             {post.comments.map(c => (
                               <div key={c.id} className="flex gap-3">
                                  <img src={c.avatar} alt="" className="w-8 h-8 rounded-full object-cover shrink-0" />
                                  <div className="flex flex-col">
                                     <span className="text-[11px] font-black text-[#003366]">{c.user}</span>
                                     <p className="text-[12px] text-[#003366]/70 leading-tight">{c.text}</p>
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
                    <div className="mt-4 px-2 py-4 bg-[#003366]/[0.02] border-l-4 border-[#FF8C00]">
                      <div className="flex gap-3">
                        <img src={post.comments[0].avatar} alt="" className="w-7 h-7 rounded-full object-cover shrink-0" />
                        <div className="flex flex-col gap-0.5">
                          <span className="text-[11px] font-black text-[#003366]">{post.comments[0].user}</span>
                          <p className="text-[12px] text-[#003366]/60 leading-tight italic line-clamp-1">"{post.comments[0].text}"</p>
                        </div>
                      </div>
                    </div>
                  )}
                </motion.article>
              ))}
           </div>
        </section>
      </div>

      {/* CREATE POST MODAL */}
      <AnimatePresence>
        {showCreatePost && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-[#003366]/90 backdrop-blur-md flex items-end justify-center p-4"
          >
            <motion.div 
              initial={{ y: 100 }} animate={{ y: 0 }} exit={{ y: 100 }}
              className="bg-white w-full max-w-lg border-4 border-[#003366] shadow-[12px_12px_0px_#FF8C00]"
            >
              <div className="p-6 space-y-6">
                <div className="flex items-center justify-between">
                   <h3 className="font-black text-xl uppercase tracking-tighter text-[#003366]">New Broadcast</h3>
                   <button onClick={() => setShowCreatePost(false)} className="text-[#003366]/40 h-10 w-10 flex items-center justify-center"><X /></button>
                </div>
                
                <textarea 
                  autoFocus
                  placeholder="What's happening in your network?"
                  value={newPostText}
                  onChange={(e) => setNewPostText(e.target.value)}
                  className="w-full h-40 bg-gray-50 border-2 border-[#003366]/5 p-4 text-sm font-medium outline-none focus:border-[#FF8C00] resize-none"
                />

                <div className="flex items-center justify-between bg-gray-50 p-4 border-2 border-[#003366]/5">
                   <button className="flex items-center gap-2 text-[#003366]/40 transition-colors">
                      <ImageIcon size={20} />
                      <span className="text-[10px] font-black uppercase tracking-widest">Add Media</span>
                   </button>
                   <button 
                    onClick={handleCreatePost}
                    className="bg-[#003366] text-white px-8 py-3 font-black text-[12px] uppercase tracking-widest shadow-[4px_4px_0px_#FF8C00] active:translate-x-1 active:translate-y-1 active:shadow-none transition-all"
                   >
                     Publish
                   </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
