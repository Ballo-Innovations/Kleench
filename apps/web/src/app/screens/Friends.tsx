import {
    X,
  Check,
  Video,
  MessageCircle,
  MoreHorizontal,
  UserPlus,
  Zap
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useState } from "react";
import { useNavigate } from "react-router";
import { PageHeader } from "../components/PageHeader";
import { PageSkeletons, usePageLoading } from "../components/PageSkeletons";

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
        title="Social Circle" 
        subtitle="Manage your ecosystem connections."
        height={90}
        searchValue={searchQuery}
        onSearchChange={setSearchQuery}
      />

      {loading ? (
        <PageSkeletons.Social />
      ) : (
        <div className="px-5 mt-4 relative z-20 space-y-12">

        {/* ── SECTION 01: PENDING REQUESTS ── */}
        <AnimatePresence>
          {filteredRequests.length > 0 && (
            <motion.section 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="space-y-6"
            >
               <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                     <span className="text-[#FF8C00] font-black text-xs tracking-[0.3em]">01.</span>
                     <h3 className="font-black text-[10px] uppercase tracking-[0.4em] text-[#003366]/40">Incoming Link</h3>
                  </div>
                  <span className="bg-[#FF8C00] text-white text-[8px] font-black px-2 py-0.5 uppercase tracking-widest">{filteredRequests.length} REQUEST</span>
               </div>

               <div className="space-y-4">
                  {filteredRequests.map((req) => (
                    <motion.div 
                      key={req.id} 
                      className="bg-white border-2 border-[#003366] p-4 flex items-center justify-between shadow-[6px_6px_0px_#FF8C00] relative overflow-hidden group"
                    >
                       <div className="absolute top-0 left-0 w-1 h-full bg-[#003366]" />
                       <div className="flex items-center gap-4">
                          <div className="w-12 h-12 border-2 border-[#003366] overflow-hidden">
                             <img src={req.img} className="w-full h-full object-cover" />
                          </div>
                          <div>
                             <h4 className="text-[#003366] text-sm font-black uppercase tracking-tight leading-none mb-1">{req.name}</h4>
                             <p className="text-[9px] font-bold text-[#003366]/40 uppercase tracking-widest">Mutual: {req.mutual}</p>
                          </div>
                       </div>
                       <div className="flex gap-2">
                          <button onClick={() => dismiss(req.id)} className="w-10 h-10 border-2 border-[#003366] flex items-center justify-center text-[#003366]/5 active:translate-y-0.5 transition-all">
                             <X size={18} />
                          </button>
                          <button 
                            onClick={() => accept(req.id)} 
                            className={`w-10 h-10 border-2 border-[#003366] flex items-center justify-center text-white transition-all shadow-[2px_2px_0px_#003366] active:shadow-none ${acceptedIds.has(req.id) ? "bg-emerald-500" : "bg-[#003366]"}`}
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
              <span className="text-[#FF8C00] font-black text-xs tracking-[0.3em]">02.</span>
              <h3 className="font-black text-[10px] uppercase tracking-[0.4em] text-[#003366]/40">Active Circle</h3>
              <div className="flex-1 h-[2px] bg-[#003366]/5" />
           </div>

           <div className="space-y-2 border-2 border-[#003366] bg-[#003366]/5 divide-y-2 divide-[#003366]/10 shadow-[6px_6px_0px_#003366]">
              {filteredFriends.map((friend) => (
                <div key={friend.id} className="bg-white p-4 flex items-center justify-between group/[0.02] transition-all">
                   <div className="flex items-center gap-4">
                      <div className="relative">
                         <div className={`w-12 h-12 border-2 border-[#003366] overflow-hidden ${friend.status === 'offline' ? 'opacity-40 grayscale' : ''}`}>
                            <img src={friend.img} className="w-full h-full object-cover" />
                         </div>
                         {friend.status === 'live' && (
                           <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-[#FFC300] border-2 border-[#003366] rounded-full animate-pulse flex items-center justify-center">
                              <div className="w-1.5 h-1.5 rounded-full bg-[#003366]" />
                           </div>
                         )}
                      </div>
                      <div>
                         <h4 className={`text-[#003366] text-sm font-black uppercase tracking-tight leading-none mb-1 ${friend.status === 'offline' ? 'opacity-40' : ''}`}>{friend.name}</h4>
                         <div className="flex items-center gap-1.5">
                            {friend.status === 'live' ? (
                              <span className="text-[#FF8C00] text-[8px] font-black uppercase tracking-widest flex items-center gap-1">
                                 <Zap size={10} fill="#FF8C00" /> Live Discovery
                              </span>
                            ) : (
                              <p className="text-[9px] font-bold text-[#003366]/30 uppercase tracking-widest">{friend.sub}</p>
                            )}
                         </div>
                      </div>
                   </div>
                   <div className="flex gap-3">
                      {friend.status === 'live' ? (
                        <button className="w-9 h-9 border-2 border-[#003366] flex items-center justify-center text-[#003366]/5 active:scale-95 transition-all">
                           <Video size={16} />
                        </button>
                      ) : (
                        <button className="w-9 h-9 border-2 border-[#003366] flex items-center justify-center text-[#003366]/5 active:scale-95 transition-all">
                           <MessageCircle size={16} />
                        </button>
                      )}
                      <button className="w-9 h-9 border-2 border-[#003366]/20 flex items-center justify-center text-[#003366]/20">
                         <MoreHorizontal size={16} />
                      </button>
                   </div>
                </div>
              ))}
           </div>
        </motion.section>

        {/* ── SECTION 03: COMMUNITY HUD ── */}
        <motion.section initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={grace(0.5)} className="pb-12">
           <div className="bg-[#003366] p-8 shadow-[8px_8px_0px_#FF8C00] relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-48 h-48 bg-white/5 rounded-full -mr-24 -mt-24 blur-2xl transition-transform duration-1000" />
              
              <div className="flex items-center justify-between mb-8">
                 <div className="flex items-center gap-3">
                    <span className="text-[#FF8C00] font-black text-xs tracking-[0.3em]">03.</span>
                    <h3 className="font-black text-[10px] uppercase tracking-[0.4em] text-white/40">expert circles</h3>
                 </div>
                 <div className="flex -space-x-3">
                    {[COMM1_IMG, COMM2_IMG, COMM3_IMG].map((img, i) => (
                      <div key={i} className="w-10 h-10 border-2 border-[#003366] rounded-full overflow-hidden shadow-xl">
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
                className="w-full bg-[#FF8C00] text-white py-4 text-[11px] font-black uppercase tracking-[0.3em] shadow-[4px_4px_0px_white] active:shadow-none active:translate-x-[2px] active:translate-y-[2px] transition-all"
              >
                 Join Communities
              </button>
           </div>
        </motion.section>

      </div>
      )}

      {/* ── FLOATING ACTION LEDGER ── */}
      <div className="fixed bottom-28 right-5 z-40">
         <motion.button
           whileTap={{ scale: 0.9 }}
           className="w-14 h-14 bg-[#003366] border-2 border-white text-white flex items-center justify-center shadow-2xl active:bg-[#FF8C00] transition-colors group"
         >
            <UserPlus size={24} className="group-hover:scale-110 transition-transform" />
         </motion.button>
      </div>

    </div>
  );
}
