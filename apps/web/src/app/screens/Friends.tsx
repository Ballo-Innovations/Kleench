import {
  X,
  Check,
  Video,
  MessageCircle,
  MoreHorizontal,
  UserPlus,
  Zap,
  Users,
  ChevronRight,
  ChevronLeft
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useState } from "react";
import { useNavigate } from "react-router";
import { PageHeader } from "../components/PageHeader";
import { usePageLoading, PageSkeletons } from "../components/PageSkeletons";

const SARAH_IMG = "https://images.unsplash.com/photo-1594318223885-20dc4b889f9e?auto=format&fit=crop&w=400&q=80";
const MARCUS_IMG = "https://images.unsplash.com/photo-1770894807442-108cc33c0a7a?auto=format&fit=crop&w=400&q=80";
const ELENA_IMG = "https://images.unsplash.com/photo-1675894666694-133d7406b636?auto=format&fit=crop&w=400&q=80";
const DAVID_IMG = "https://images.unsplash.com/photo-1701094385504-12928745d1c0?auto=format&fit=crop&w=400&q=80";
const JASMINE_IMG = "https://images.unsplash.com/photo-1606752445153-beb5c9d03ae8?auto=format&fit=crop&w=400&q=80";
const COMM1_IMG = "https://images.unsplash.com/photo-1588443418198-b03405cc586f?auto=format&fit=crop&w=400&q=80";
const COMM2_IMG = "https://images.unsplash.com/photo-1722270608841-35d7372a2e85?auto=format&fit=crop&w=400&q=80";
const COMM3_IMG = "https://images.unsplash.com/photo-1769961982389-bb243681421a?auto=format&fit=crop&w=400&q=80";

type FriendStatus = "live" | "online" | "away" | "offline";

interface FriendItem {
  id: number;
  name: string;
  sub: string;
  img: string;
  status: FriendStatus;
}

const friendsList: FriendItem[] = [
  { id: 1, name: "Marcus Vance",    sub: "Live now",        img: MARCUS_IMG,  status: "live" },
  { id: 2, name: "Elena Rodriguez", sub: "Online",          img: ELENA_IMG,   status: "online" },
  { id: 3, name: "David Kim",       sub: "Last seen 2h ago",img: DAVID_IMG,   status: "away" },
  { id: 4, name: "Jasmine Thomas",  sub: "Last seen Yesterday", img: JASMINE_IMG, status: "offline" },
];

const pendingRequests = [
  { id: 1, name: "Sarah Jenkins", mutual: "Alex M.", img: SARAH_IMG },
];

export function Friends() {
  const loading = usePageLoading(650);
  const [tab, setTab] = useState<"menu" | "friends" | "groups" | "businesses">("menu");
  const [searchQuery, setSearchQuery] = useState("");
  const [requests, setRequests] = useState(pendingRequests);
  const [acceptedIds, setAcceptedIds] = useState<Set<number>>(new Set());
  
  const filteredRequests = requests.filter(r => r.name.toLowerCase().includes(searchQuery.toLowerCase()));
  const filteredFriends = friendsList.filter(f => f.name.toLowerCase().includes(searchQuery.toLowerCase()));
  const navigate = useNavigate();



  const dismiss = (id: number) => setRequests((r) => r.filter((x) => x.id !== id));
  const accept = (id: number) => {
    setAcceptedIds(prev => new Set(prev).add(id));
    setTimeout(() => {
      setRequests((r) => r.filter((x) => x.id !== id));
    }, 800);
  };

  const grace = (delay = 0) => ({
    duration: 0.62,
    delay,
    ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
  });

  return (
    <div className="w-full relative min-h-[100dvh] bg-transparent font-sans pb-32">
      
      {/* ── Standardized Friends Header ── */}
      <PageHeader 
        title="Communities" 
        subtitle="Manage your ecosystem connections."
        searchValue={searchQuery}
        onSearchChange={setSearchQuery}
      />

      {loading ? (
        <div className="mt-4"><PageSkeletons.Social /></div>
      ) : (
        <div className="relative z-20">
        
        {tab === "menu" ? (
          <div className="px-5 mt-6 space-y-4">
             {[{ id: 'friends', label: 'Friends', icon: Users, desc: 'Manage your social circle' },
               { id: 'groups', label: 'Groups', icon: UserPlus, desc: 'Your active communities' },
               { id: 'businesses', label: 'Businesses', icon: Zap, desc: 'Connected merchants' }].map(cat => (
                <button key={cat.id} onClick={() => setTab(cat.id as "menu" | "friends" | "groups" | "businesses")} className="w-full flex items-center justify-between p-5 bg-[var(--app-bg)] border border-[var(--app-text)] rounded-2xl shadow-[4px_4px_0px_var(--app-orange)] active:translate-x-1 active:translate-y-1 active:shadow-none transition-all">
                   <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-[var(--app-orange)]/10 border border-[var(--app-orange)] rounded-xl flex items-center justify-center">
                         <cat.icon size={24} className="text-[var(--app-orange)]" />
                      </div>
                      <div className="text-left">
                         <h3 className="font-black text-[16px] text-[var(--app-text)] uppercase tracking-widest leading-none mb-1">{cat.label}</h3>
                         <p className="text-[9px] font-black text-[var(--app-text)]/40 uppercase tracking-widest">{cat.desc}</p>
                      </div>
                   </div>
                   <div className="w-8 h-8 rounded-full border border-[var(--app-text)]/20 flex items-center justify-center">
                      <ChevronRight size={16} className="text-[var(--app-text)]" />
                   </div>
                </button>
             ))}
          </div>
        ) : (
          <div className="px-5 mt-6 space-y-12 pb-12">
            <button onClick={() => setTab("menu")} className="flex items-center gap-2 text-white font-black text-[12px] uppercase tracking-widest mb-2 bg-[#E85D3F] border border-[var(--app-text)] px-5 py-2.5 rounded-xl shadow-[4px_4px_0px_var(--app-text)] active:translate-x-1 active:translate-y-1 active:shadow-none transition-all w-fit">
               <ChevronLeft size={18} /> Back
            </button>

        {tab === "friends" && (
          <>
        {/* ── SECTION 01: PENDING REQUESTS ── */}
        <AnimatePresence>
          {filteredRequests.length > 0 && (
            <motion.section 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="space-y-6"
            >
               <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                     <span className="text-[var(--app-orange)] font-black text-xs tracking-[0.3em]">01.</span>
                     <h3 className="font-black text-[10px] uppercase tracking-[0.4em] text-[var(--app-text)]/40">Incoming Link</h3>
                  </div>
                  <span className="bg-[var(--app-orange)] text-white text-[8px] font-black px-2 py-0.5 uppercase tracking-widest">{filteredRequests.length} REQUEST</span>
               </div>

               <div className="space-y-4">
                  {filteredRequests.map((req) => (
                    <motion.div 
                      key={req.id} 
                      className="bg-[var(--app-bg)] border border-[var(--app-text)] p-4 flex items-center justify-between shadow-[6px_6px_0px_var(--app-orange)] relative overflow-hidden group"
                    >
                       <div className="absolute top-0 left-0 w-1 h-full bg-[var(--app-text)]" />
                       <div className="flex items-center gap-4">
                          <div className="w-12 h-12 border border-[var(--app-text)] overflow-hidden">
                             <img src={req.img} className="w-full h-full object-cover" />
                          </div>
                          <div>
                             <h4 className="text-[var(--app-text)] text-sm font-black uppercase tracking-tight leading-none mb-1">{req.name}</h4>
                             <p className="text-[9px] font-bold text-[var(--app-text)]/40 uppercase tracking-widest">Mutual: {req.mutual}</p>
                          </div>
                       </div>
                       <div className="flex gap-2">
                          <button onClick={() => dismiss(req.id)} className="w-10 h-10 border border-[var(--app-text)] flex items-center justify-center text-[var(--app-text)]/5 active:translate-y-0.5 transition-all">
                             <X size={18} />
                          </button>
                          <button 
                            onClick={() => accept(req.id)} 
                            className={`w-10 h-10 border border-[var(--app-text)] flex items-center justify-center text-white transition-all shadow-[2px_2px_0px_var(--app-text)] active:shadow-none ${acceptedIds.has(req.id) ? "bg-emerald-500" : "bg-[var(--app-text)]"}`}
                          >
                             <Check size={18} />
                          </button>
                       </div>
                    </motion.div>
                  ))}
               </div>
            </motion.section>
          )}
        </AnimatePresence>

        {/* ── SECTION 02: ACTIVE CIRCLE ── */}
        <motion.section initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={grace(0.3)} className="space-y-6">
           <div className="flex items-center gap-3">
              <span className="text-[var(--app-orange)] font-black text-xs tracking-[0.3em]">02.</span>
              <h3 className="font-black text-[10px] uppercase tracking-[0.4em] text-[var(--app-text)]/40">Active Circle</h3>
              <div className="flex-1 h-[2px] bg-[var(--app-text)]/5" />
           </div>

           <div className="space-y-2 border border-[var(--app-text)] bg-[var(--app-text)]/5 divide-y-2 divide-[var(--app-text)]/10 shadow-[6px_6px_0px_var(--app-text)]">
              {filteredFriends.map((friend) => (
                <div key={friend.id} className="bg-[var(--app-bg)] p-4 flex items-center justify-between group/[0.02] transition-all">
                   <div className="flex items-center gap-4">
                      <div className="relative">
                         <div className={`w-12 h-12 border border-[var(--app-text)] overflow-hidden ${friend.status === 'offline' ? 'opacity-40 grayscale' : ''}`}>
                            <img src={friend.img} className="w-full h-full object-cover" />
                         </div>
                         {friend.status === 'live' && (
                           <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-[#FFC300] border border-[var(--app-text)] rounded-full animate-pulse flex items-center justify-center">
                              <div className="w-1.5 h-1.5 rounded-full bg-[var(--app-text)]" />
                           </div>
                         )}
                      </div>
                      <div>
                         <h4 className={`text-[var(--app-text)] text-sm font-black uppercase tracking-tight leading-none mb-1 ${friend.status === 'offline' ? 'opacity-40' : ''}`}>{friend.name}</h4>
                         <div className="flex items-center gap-1.5">
                            {friend.status === 'live' ? (
                              <span className="text-[var(--app-orange)] text-[8px] font-black uppercase tracking-widest flex items-center gap-1">
                                 <Zap size={10} fill="var(--app-orange)" /> Live Discovery
                              </span>
                            ) : (
                              <p className="text-[9px] font-bold text-[var(--app-text)]/30 uppercase tracking-widest">{friend.sub}</p>
                            )}
                         </div>
                      </div>
                   </div>
                   <div className="flex gap-3">
                      {friend.status === 'live' ? (
                        <button className="w-9 h-9 border border-[var(--app-text)] flex items-center justify-center text-[var(--app-text)]/5 active:scale-95 transition-all">
                           <Video size={16} />
                        </button>
                      ) : (
                        <button className="w-9 h-9 border border-[var(--app-text)] flex items-center justify-center text-[var(--app-text)]/5 active:scale-95 transition-all">
                           <MessageCircle size={16} />
                        </button>
                      )}
                      <button className="w-9 h-9 border border-[var(--app-text)]/20 flex items-center justify-center text-[var(--app-text)]/20">
                         <MoreHorizontal size={16} />
                      </button>
                   </div>
                </div>
              ))}
           </div>
        </motion.section>

        {/* ── SECTION 03: COMMUNITY HUD ── */}
        <motion.section initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={grace(0.5)} className="pb-12">
           <div className="bg-[var(--app-text)] p-8 shadow-[8px_8px_0px_var(--app-orange)] relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-48 h-48 bg-[var(--app-bg)]/5 rounded-full -mr-24 -mt-24 blur-2xl transition-transform duration-1000" />
              
              <div className="flex items-center justify-between mb-8">
                 <div className="flex items-center gap-3">
                    <span className="text-[var(--app-orange)] font-black text-xs tracking-[0.3em]">03.</span>
                    <h3 className="font-black text-[10px] uppercase tracking-[0.4em] text-white/40">expert circles</h3>
                 </div>
                 <div className="flex -space-x-3">
                    {[COMM1_IMG, COMM2_IMG, COMM3_IMG].map((img, i) => (
                      <div key={i} className="w-10 h-10 border border-[var(--app-text)] rounded-full overflow-hidden shadow-xl">
                        <img src={img} className="w-full h-full object-cover" />
                      </div>
                    ))}
                 </div>
              </div>

              <h4 className="text-white text-2xl font-black uppercase tracking-tighter leading-tight mb-3">Meet Verified<br />Alpha Shoppers</h4>
              <p className="text-white/50 text-[10px] font-black uppercase tracking-[0.2em] leading-relaxed mb-8 max-w-[240px]">
                 Join high-fidelity financial communities to discover exclusive marketplace yield.
              </p>

              <button 
                onClick={() => navigate("/marketplace")}
                className="w-full bg-[var(--app-orange)] text-white py-4 text-[11px] font-black uppercase tracking-[0.3em] shadow-[4px_4px_0px_white] active:shadow-none active:translate-x-[2px] active:translate-y-[2px] transition-all"
              >
                 Join Communities
              </button>
           </div>
        </motion.section>
        </>
        )}

        {tab === "groups" && (
           <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col items-center justify-center py-20 text-center space-y-4">
             <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center text-[var(--app-text)]/20 border border-[var(--app-text)]/10 mb-4">
               <UserPlus size={32} />
             </div>
             <h3 className="text-xl font-black text-[var(--app-text)] uppercase tracking-tighter">No Active Groups</h3>
             <p className="text-[12px] font-bold text-[var(--app-text)]/40 uppercase tracking-widest max-w-[200px]">You haven't joined any discussion groups yet.</p>
             <button className="bg-[var(--app-text)] text-white px-8 py-3 rounded-xl font-black text-[12px] uppercase tracking-widest shadow-[4px_4px_0px_var(--app-orange)] active:translate-x-1 active:translate-y-1 active:shadow-none mt-4 transition-all">Explore Groups</button>
           </motion.div>
        )}

        {tab === "businesses" && (
           <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col items-center justify-center py-20 text-center space-y-4">
             <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center text-[var(--app-text)]/20 border border-[var(--app-text)]/10 mb-4">
               <Zap size={32} />
             </div>
             <h3 className="text-xl font-black text-[var(--app-text)] uppercase tracking-tighter">No Business Links</h3>
             <p className="text-[12px] font-bold text-[var(--app-text)]/40 uppercase tracking-widest max-w-[200px]">Connect with merchants to get exclusive Alpha yields.</p>
             <button className="bg-[var(--app-orange)] text-white px-8 py-3 rounded-xl font-black text-[12px] uppercase tracking-widest shadow-[4px_4px_0px_var(--app-text)] active:translate-x-1 active:translate-y-1 active:shadow-none mt-4 transition-all border border-[var(--app-text)]">Find Businesses</button>
           </motion.div>
        )}

          </div>
        )}
        </div>
      )}

      {/* ── FLOATING ACTION LEDGER ── */}
      <div className="fixed bottom-28 right-5 z-40">
         <motion.button
           whileTap={{ scale: 0.9 }}
           className="w-14 h-14 bg-[var(--app-text)] border border-white text-white flex items-center justify-center shadow-2xl active:bg-[var(--app-orange)] transition-colors group"
         >
            <UserPlus size={24} className="group-hover:scale-110 transition-transform" />
         </motion.button>
      </div>

    </div>
  );
}
