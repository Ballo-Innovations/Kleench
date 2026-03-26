import { motion, AnimatePresence } from "motion/react";
import { 
  Users, 
  Plus, 
  MessageCircle, 
  MoreVertical, 
  Heart, 
  MessageSquare, 
  Share2, 
  Coins, 
  ShieldCheck,
  X,
  Image as ImageIcon,
  Send
} from "lucide-react";
import { Link } from "react-router";
import { useState } from "react";
import { PageHeader } from "../components/PageHeader";

// --- MOCKS FOR FEED ---
const HOT_DEALS = [
  { id: 1, title: "Vintage Lens Kit", price: "ZMW 1,200", image: "https://picsum.photos/seed/lens/400/400" },
  { id: 2, title: "Solar Inverter 5kW", price: "ZMW 8,500", image: "https://picsum.photos/seed/solarinv/400/400" },
  { id: 3, title: "NFT Collectible #44", price: "ZMW 450", image: "https://picsum.photos/seed/nft44/400/400" },
  { id: 4, title: "Pro Studio Mic", price: "ZMW 2,100", image: "https://picsum.photos/seed/mic/400/400" },
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
        title="Socials" 
        subtitle="Network & Discover Rewards" 
        showBack 
        searchValue={searchQuery}
        onSearchChange={setSearchQuery}
      />

      <div className="px-5 mt-6 relative z-10 space-y-10">
        
        {/* SECTION 01. NETWORK ACTIONS */}
        <section className="space-y-4">
          <div className="flex gap-0 border-4 border-[#003366] bg-[#003366] shadow-[6px_6px_0px_#FF8C00]">
            <Link to="/friends" className="flex-1 bg-white hover:bg-[#003366] hover:text-white transition-all py-4 flex items-center justify-center gap-3 border-r-2 border-[#003366]/10 group">
              <Users size={18} className="text-[#FF8C00]" />
              <span className="text-[10px] font-black uppercase tracking-[0.2em]">Find Friends</span>
            </Link>
            <button 
              onClick={() => setShowCreatePost(true)}
              className="flex-1 bg-white hover:bg-[#003366] hover:text-white transition-all py-4 flex items-center justify-center gap-3 group"
            >
              <Plus size={18} className="text-[#FF8C00]" />
              <span className="text-[10px] font-black uppercase tracking-[0.2em]">Create Post</span>
            </button>
          </div>
        </section>

        {/* SECTION 02. DISCOVER HOT DEALS */}
        <section className="space-y-6">
          <div className="flex items-center justify-between gap-3">
             <div className="flex items-center gap-3">
                <span className="text-[#FF8C00] font-black text-xs tracking-[0.3em]">02.</span>
                <h3 className="font-black text-[10px] uppercase tracking-[0.4em] text-[#003366]/40">Hot Deals</h3>
             </div>
             <Link to="/marketplace" className="text-[8px] font-black uppercase tracking-[0.2em] text-[#FF8C00] border-b-2 border-[#FF8C00]/20 pb-0.5">View All</Link>
          </div>

          <div className="flex overflow-x-auto gap-4 pb-4 -mx-5 px-5 scrollbar-hide no-scrollbar">
            {HOT_DEALS.map((item) => (
              <motion.div 
                key={item.id}
                whileTap={{ scale: 0.98 }}
                className="min-w-[160px] bg-white border-2 border-[#003366] relative flex flex-col group shadow-sm"
              >
                <div className="aspect-square bg-gray-100 overflow-hidden relative">
                   <img src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                   <Link to="/messages" className="absolute top-2 right-2 z-20">
                     <button className="w-9 h-9 bg-white border-2 border-[#003366] shadow-[3px_3px_0px_#FF8C00] flex items-center justify-center text-[#003366] hover:bg-[#FF8C00] hover:text-white transition-all">
                       <MessageCircle size={18} strokeWidth={2.5} />
                     </button>
                   </Link>
                </div>
                <div className="p-3 bg-white">
                  <h4 className="text-[11px] font-black uppercase tracking-tight text-[#003366] line-clamp-1">{item.title}</h4>
                  <p className="text-[12px] font-black text-[#FF8C00] mt-1">{item.price}</p>
                </div>
              </motion.div>
            ))}
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
                  <div className="flex items-center justify-between px-2 mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-11 h-11 rounded-full border-2 border-[#FF8C00] overflow-hidden p-0.5">
                        <img src={post.user.avatar} alt={post.user.name} className="w-full h-full rounded-full object-cover" />
                      </div>
                      <div className="flex flex-col">
                        <div className="flex items-center gap-1.5">
                           <span className="font-black text-sm text-[#003366] tracking-tight">{post.user.name}</span>
                           {post.user.verified && <ShieldCheck size={14} className="text-[#FF8C00]" />}
                        </div>
                        <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">{post.time}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-1">
                       <Link to="/messages">
                         <button className="w-10 h-10 flex items-center justify-center text-[#003366]/40 hover:text-[#FF8C00] transition-colors">
                            <MessageCircle size={20} />
                         </button>
                       </Link>
                       <button className="w-10 h-10 flex items-center justify-center text-[#003366]/40 hover:text-[#003366] transition-colors">
                          <MoreVertical size={20} />
                       </button>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <p className="px-5 text-[14px] font-medium leading-[1.6] text-[#003366]/80 text-justify">
                      {post.content}
                    </p>
                    <div className="bg-gray-100 overflow-hidden border-y-2 border-[#003366]">
                       <img src={post.image} alt="Content" className="w-full aspect-video object-cover" />
                    </div>
                  </div>

                  {/* Action Bar */}
                  <div className="flex items-center justify-between py-5 px-2 border-b-2 border-[#003366]/5">
                    <div className="flex items-center gap-6">
                       <button 
                        onClick={() => toggleLike(post.id)}
                        className="flex items-center gap-2 group"
                       >
                          <Heart 
                            size={20} 
                            className={`transition-all ${likedPosts.has(post.id) ? "text-[#FF3000] fill-[#FF3000]" : "text-[#003366]/30 group-hover:text-[#FF3000]"}`} 
                          />
                          <span className="text-[12px] font-black text-[#003366]">{post.likes}</span>
                       </button>
                       <button 
                        onClick={() => setActiveCommentId(activeCommentId === post.id ? null : post.id)}
                        className="flex items-center gap-2 group"
                       >
                          <MessageSquare size={20} className="text-[#003366]/30 group-hover:text-[#003366] transition-colors" />
                          <span className="text-[12px] font-black text-[#003366]">{post.comments.length}</span>
                       </button>
                       <button className="flex items-center gap-2 group">
                          <Share2 size={20} className="text-[#003366]/30 group-hover:text-[#003366] transition-colors" />
                          <span className="text-[10px] font-black text-[#003366] uppercase tracking-widest">Share</span>
                       </button>
                    </div>
                    <button className="bg-[#FF8C00] text-white px-5 py-2.5 font-black text-[10px] uppercase tracking-[0.2em] shadow-[4px_4px_0px_#003366] active:shadow-none active:translate-x-1 active:translate-y-1 transition-all flex items-center gap-2">
                       <Coins size={14} /> Tip
                    </button>
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
            className="fixed inset-0 z-[100] bg-[#003366]/90 backdrop-blur-md flex items-end sm:items-center justify-center p-4"
          >
            <motion.div 
              initial={{ y: 100 }} animate={{ y: 0 }} exit={{ y: 100 }}
              className="bg-white w-full max-w-lg border-4 border-[#003366] shadow-[12px_12px_0px_#FF8C00]"
            >
              <div className="p-6 space-y-6">
                <div className="flex items-center justify-between">
                   <h3 className="font-black text-xl uppercase tracking-tighter text-[#003366]">New Broadcast</h3>
                   <button onClick={() => setShowCreatePost(false)} className="text-[#003366]/40 hover:text-[#FF3000] h-10 w-10 flex items-center justify-center"><X /></button>
                </div>
                
                <textarea 
                  autoFocus
                  placeholder="What's happening in your network?"
                  value={newPostText}
                  onChange={(e) => setNewPostText(e.target.value)}
                  className="w-full h-40 bg-gray-50 border-2 border-[#003366]/5 p-4 text-sm font-medium outline-none focus:border-[#FF8C00] resize-none"
                />

                <div className="flex items-center justify-between bg-gray-50 p-4 border-2 border-[#003366]/5">
                   <button className="flex items-center gap-2 text-[#003366]/40 hover:text-[#003366] transition-colors">
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
