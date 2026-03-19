import {
  Search,
  X,
  Check,
  Video,
  MessageCircle,
  MoreHorizontal,
  UserPlus,
} from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";

const SARAH_IMG = "https://images.unsplash.com/photo-1594318223885-20dc4b889f9e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b21hbiUyMHNtaWxpbmclMjBwb3J0cmFpdHxlbnwxfHx8fDE3NzM4OTgwMjF8MA&ixlib=rb-4.1.0&q=80&w=400";
const MARCUS_IMG = "https://images.unsplash.com/photo-1770894807442-108cc33c0a7a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx5b3VuZyUyMG1hbiUyMHBvcnRyYWl0JTIwcHJvZmVzc2lvbmFsfGVufDF8fHx8MTc3Mzg3NTg3OHww&ixlib=rb-4.1.0&q=80&w=400";
const ELENA_IMG = "https://images.unsplash.com/photo-1675894666694-133d7406b636?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b21hbiUyMGdsYXNzZXMlMjBwb3J0cmFpdHxlbnwxfHx8fDE3NzM5MDkyNzl8MA&ixlib=rb-4.1.0&q=80&w=400";
const DAVID_IMG = "https://images.unsplash.com/photo-1701094385504-12928745d1c0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYW4lMjBjbG9zZSUyMHVwJTIwcG9ydHJhaXR8ZW58MXx8fHwxNzczOTA5Mjc5fDA&ixlib=rb-4.1.0&q=80&w=400";
const JASMINE_IMG = "https://images.unsplash.com/photo-1606752445153-beb5c9d03ae8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b21hbiUyMGN1cmx5JTIwaGFpciUyMHBvcnRyYWl0fGVufDF8fHx8MTc3Mzg0ODk3MXww&ixlib=rb-4.1.0&q=80&w=400";
const COMM1_IMG = "https://images.unsplash.com/photo-1588443418198-b03405cc586f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkaXZlcnNlJTIwZ3JvdXAlMjBwZW9wbGUlMjBoZWFkc2hvdHN8ZW58MXx8fHwxNzczOTA5MjgwfDA&ixlib=rb-4.1.0&q=80&w=400";
const COMM2_IMG = "https://images.unsplash.com/photo-1722270608841-35d7372a2e85?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b21hbiUyMGF2YXRhciUyMHByb2ZpbGUlMjBwaG90b3xlbnwxfHx8fDE3NzM4NzA0NzB8MA&ixlib=rb-4.1.0&q=80&w=400";
const COMM3_IMG = "https://images.unsplash.com/photo-1769961982389-bb243681421a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx5b3VuZyUyMGFzaWFuJTIwbWFuJTIwaGVhZHNob3R8ZW58MXx8fHwxNzczOTA5MjgzfDA&ixlib=rb-4.1.0&q=80&w=400";

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

const fadeUp = {
  initial: { opacity: 0, y: 18 },
  animate: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
  }),
};

function StatusDot({ status }: { status: FriendStatus }) {
  if (status === "live") {
    return (
      <span className="absolute bottom-0 right-0 w-4 h-4 rounded-full bg-[var(--action-gold)] border-2 border-[var(--clean-slate)] animate-pulse" />
    );
  }
  if (status === "online") {
    return (
      <span className="absolute bottom-0 right-0 w-4 h-4 rounded-full bg-emerald-500 border-2 border-[var(--clean-slate)]" />
    );
  }
  return null;
}

function FriendAction({ status, friendId }: { status: FriendStatus; friendId: number }) {
  const navigate = useNavigate();
  if (status === "live") {
    return (
      <motion.button
        whileTap={{ scale: 0.9 }}
        onClick={() => navigate(`/profile/friend-${friendId}`)}
        className="w-9 h-9 rounded-full bg-[var(--trust-blue)]/10 flex items-center justify-center text-[var(--trust-blue)]"
      >
        <Video size={16} strokeWidth={2} />
      </motion.button>
    );
  }
  if (status === "online") {
    return (
      <motion.button
        whileTap={{ scale: 0.9 }}
        onClick={() => navigate(`/profile/friend-${friendId}`)}
        className="w-9 h-9 rounded-full bg-[var(--trust-blue)]/10 flex items-center justify-center text-[var(--trust-blue)]"
      >
        <MessageCircle size={16} strokeWidth={2} />
      </motion.button>
    );
  }
  return (
    <motion.button
      whileTap={{ scale: 0.9 }}
      onClick={() => navigate(`/profile/friend-${friendId}`)}
      className="w-9 h-9 rounded-full bg-[var(--surface-raised)] flex items-center justify-center text-[var(--ink-muted)]"
    >
      <MoreHorizontal size={16} strokeWidth={2} />
    </motion.button>
  );
}

export function Friends() {
  const [requests, setRequests] = useState(pendingRequests);
  const [search, setSearch] = useState("");
  const [acceptedIds, setAcceptedIds] = useState<Set<number>>(new Set());
  const navigate = useNavigate();

  const dismiss = (id: number) => setRequests((r) => r.filter((x) => x.id !== id));
  const accept = (id: number) => {
    setAcceptedIds(prev => new Set(prev).add(id));
    setTimeout(() => {
      setRequests((r) => r.filter((x) => x.id !== id));
    }, 800);
  };

  const filtered = friendsList.filter((f) =>
    f.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="w-full max-w-md mx-auto pb-4">
      {/* Page Header */}
      <motion.div
        custom={0}
        variants={fadeUp}
        initial="initial"
        animate="animate"
        className="flex items-center justify-between pt-2 pb-4"
      >
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full overflow-hidden border-2 border-[var(--trust-blue)]/20 shadow-sm">
            <ImageWithFallback
              src={localStorage.getItem("userProfilePhoto") || COMM2_IMG}
              alt="My profile"
              className="w-full h-full object-cover"
            />
          </div>
          <h1
            className="font-[var(--font-header)] font-bold text-[var(--ink-primary)] tracking-tight"
            style={{ fontSize: "1.25rem" }}
          >
            Friends
          </h1>
        </div>
        
      </motion.div>

      <div className="space-y-5">
        {/* Search */}
        <motion.div custom={1} variants={fadeUp} initial="initial" animate="animate">
          <div className="flex items-center gap-3 bg-white rounded-xl px-3 py-2.5 border border-black/[0.04] shadow-sm focus-within:border-[var(--trust-blue)]/40 transition-colors">
            <Search size={16} className="text-[var(--ink-muted)] shrink-0" strokeWidth={2} />
            <input
              type="text"
              placeholder="Find new connections..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="bg-transparent border-none outline-none w-full text-sm font-[var(--font-body)] text-[var(--ink-primary)] placeholder:text-[var(--ink-muted)]"
            />
          </div>
        </motion.div>

        {/* Pending Requests */}
        {requests.length > 0 && (
          <motion.section custom={2} variants={fadeUp} initial="initial" animate="animate">
            <div className="flex items-end justify-between mb-2.5">
              <h2
                className="font-[var(--font-header)] font-bold text-[var(--ink-primary)] tracking-tight"
                style={{ fontSize: "1.1rem" }}
              >
                Pending Requests
              </h2>
              <span className="text-[10px] font-[var(--font-body)] font-semibold text-[var(--trust-blue)] bg-[var(--trust-blue)]/10 px-2.5 py-0.5 rounded-full">
                {requests.length} New
              </span>
            </div>

            <div className="space-y-2">
              {requests.map((req) => (
                <motion.div
                  key={req.id}
                  layout
                  exit={{ opacity: 0, x: 40 }}
                  className="flex items-center justify-between bg-white rounded-2xl px-4 py-3 shadow-sm border border-black/[0.04]"
                >
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <div className="w-12 h-12 rounded-full overflow-hidden">
                        <ImageWithFallback
                          src={req.img}
                          alt={req.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      {/* Gold star badge */}
                      <div className="absolute -bottom-0.5 -right-0.5 w-4 h-4 rounded-full bg-[var(--action-gold)] border-2 border-white flex items-center justify-center">
                        <span className="text-[7px] font-bold text-[var(--ink-primary)]">★</span>
                      </div>
                    </div>
                    <div>
                      <p className="text-xs font-[var(--font-body)] font-bold text-[var(--ink-primary)]">
                        {req.name}
                      </p>
                      <p className="text-[9px] font-[var(--font-body)] text-[var(--ink-muted)] mt-0.5">
                        Mutual friend: {req.mutual}
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-1.5">
                    <motion.button
                      whileTap={{ scale: 0.88 }}
                      onClick={() => dismiss(req.id)}
                      className="w-9 h-9 rounded-full bg-[var(--surface-raised)] flex items-center justify-center text-[var(--ink-muted)] border border-black/[0.04]"
                    >
                      <X size={14} strokeWidth={2.5} />
                    </motion.button>
                    <motion.button
                      whileTap={{ scale: 0.88 }}
                      onClick={() => accept(req.id)}
                      className={`w-9 h-9 rounded-full flex items-center justify-center text-white shadow-sm ${
                        acceptedIds.has(req.id) ? "bg-emerald-500" : "bg-[var(--trust-blue)]"
                      }`}
                    >
                      <Check size={14} strokeWidth={2.5} />
                    </motion.button>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.section>
        )}

        {/* Friends List */}
        <motion.section custom={3} variants={fadeUp} initial="initial" animate="animate">
          <h2
            className="font-[var(--font-header)] font-bold text-[var(--ink-primary)] tracking-tight mb-2.5"
            style={{ fontSize: "1.1rem" }}
          >
            Your Friends
          </h2>

          <div className="space-y-1">
            {filtered.map((friend, i) => (
              <motion.div
                key={friend.id}
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.3 + i * 0.07 }}
                className={`flex items-center justify-between px-3 py-3 rounded-2xl transition-colors cursor-pointer ${
                  friend.status === "live"
                    ? "bg-white shadow-sm border border-black/[0.04]"
                    : "hover:bg-white/70"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="relative shrink-0">
                    <div
                      className={`w-12 h-12 rounded-full overflow-hidden ${
                        friend.status === "away" || friend.status === "offline"
                          ? "opacity-75"
                          : ""
                      }`}
                    >
                      <ImageWithFallback
                        src={friend.img}
                        alt={friend.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <StatusDot status={friend.status} />
                  </div>
                  <div>
                    <p
                      className={`text-xs font-[var(--font-body)] font-bold ${
                        friend.status === "away" || friend.status === "offline"
                          ? "text-[var(--ink-secondary)]"
                          : "text-[var(--ink-primary)]"
                      }`}
                    >
                      {friend.name}
                    </p>
                    {friend.status === "live" ? (
                      <div className="flex items-center gap-1 mt-0.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-[var(--action-gold-dark)] animate-pulse" />
                        <span className="text-[9px] font-[var(--font-body)] font-bold text-[var(--action-gold-dark)] uppercase tracking-wider">
                          Live
                        </span>
                      </div>
                    ) : (
                      <p className="text-[9px] font-[var(--font-body)] text-[var(--ink-muted)] mt-0.5">
                        {friend.sub}
                      </p>
                    )}
                  </div>
                </div>
                <FriendAction status={friend.status} friendId={friend.id} />
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Discovery / Communities Card */}
        <motion.section custom={4} variants={fadeUp} initial="initial" animate="animate">
          <div className="relative rounded-2xl overflow-hidden p-6 bg-gradient-to-br from-[var(--trust-blue)] via-[var(--trust-blue-dark)] to-[#003d5c] shadow-lg">
            <div className="absolute inset-0 noise" />
            {/* Blobs */}
            <div className="absolute -right-8 -bottom-8 w-40 h-40 bg-white/10 rounded-full blur-xl" />
            <div className="absolute -left-4 -top-4 w-24 h-24 bg-[var(--action-gold)]/10 rounded-full blur-xl" />

            {/* Stacked avatars top-right */}
            <div className="absolute right-5 top-5 flex -space-x-2.5 z-10">
              {[COMM1_IMG, COMM2_IMG, COMM3_IMG].map((src, i) => (
                <div
                  key={i}
                  className="w-9 h-9 rounded-full overflow-hidden border-2 border-[var(--trust-blue)] shadow-sm"
                >
                  <ImageWithFallback src={src} alt={`Community member ${i + 1}`} className="w-full h-full object-cover" />
                </div>
              ))}
            </div>

            <div className="relative z-10 space-y-2 mt-1">
              <h3
                className="font-[var(--font-header)] font-bold text-white leading-tight max-w-[160px]"
                style={{ fontSize: "1.1rem" }}
              >
                Meet expert shoppers near you.
              </h3>
              <p className="text-[11px] font-[var(--font-body)] text-white/70 max-w-[170px]">
                Join verified circles to get exclusive deals.
              </p>
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate("/marketplace")}
                className="mt-1 bg-[var(--action-gold)] text-[var(--ink-primary)] font-[var(--font-body)] font-bold text-[11px] py-2.5 px-5 rounded-lg shadow-md"
              >
                Explore Communities
              </motion.button>
            </div>
          </div>
        </motion.section>
      </div>

      {/* Floating Add Friend FAB */}
      <div className="fixed bottom-28 right-5 z-40 max-w-md mx-auto left-0 right-0 flex justify-end pointer-events-none">
        <div className="px-5 pointer-events-auto">
          <Link to="/marketplace">
            <motion.button
              whileTap={{ scale: 0.92 }}
              className="w-12 h-12 bg-[var(--trust-blue)] text-white rounded-full shadow-xl flex items-center justify-center glow-blue relative"
            >
              <UserPlus size={20} strokeWidth={2} />
              <motion.div
                className="absolute inset-0 rounded-full bg-[var(--trust-blue)]"
                animate={{ opacity: [0.35, 0, 0.35] }}
                transition={{ duration: 2.5, repeat: Infinity }}
                style={{ filter: "blur(8px)" }}
              />
            </motion.button>
          </Link>
        </div>
      </div>
    </div>
  );
}
