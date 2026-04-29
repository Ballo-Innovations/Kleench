import { useState } from "react";
import { useNavigate } from "react-router";
import { Video, Mic, Users, MicOff, PhoneOff, MessageSquare, UserPlus } from "lucide-react";
import { motion } from "motion/react";
import { PageHeader } from "../components/PageHeader";

type LiveMode = "video" | "audio";

const CONTACTS = [
  "Kuku Mbuli",
  "Mumbula Carol",
  "Munta",
  "Boss Fyoto",
  "Jelita Mulenga",
  "Mulemba Ruth",
  "Chibwiku",
  "Munyeyembe",
];

const AVATAR_COLORS = [
  "bg-orange-400",
  "bg-blue-400",
  "bg-green-400",
  "bg-purple-400",
  "bg-pink-400",
  "bg-yellow-400",
  "bg-teal-400",
  "bg-indigo-400",
];

function initials(name: string) {
  return name.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase();
}

export function GoLive() {
  const navigate = useNavigate();
  const [mode, setMode] = useState<LiveMode>("video");
  const [streamType, setStreamType] = useState<"free" | "paid">("free");
  const [selectedPeople, setSelectedPeople] = useState<string[]>([]);
  const [contactSearch, setContactSearch] = useState("");
  const [isLive, setIsLive] = useState(false);
  const [muted, setMuted] = useState(false);
  const [viewerCount] = useState(22);

  const filteredContacts = CONTACTS.filter((c) =>
    c.toLowerCase().includes(contactSearch.toLowerCase())
  );

  const toggleContact = (name: string) => {
    setSelectedPeople((prev) =>
      prev.includes(name) ? prev.filter((x) => x !== name) : [...prev, name]
    );
  };

  if (isLive) {
    return (
      <div className="fixed inset-0 bg-[var(--app-text-slate)] flex flex-col max-w-md mx-auto">
        {/* Simulated camera feed */}
        <div className="flex-1 relative bg-gradient-to-br from-slate-800 to-slate-950 flex items-center justify-center overflow-hidden">
          <div className="w-32 h-32 rounded-full bg-slate-700 flex items-center justify-center">
            <span className="text-white text-3xl font-black">YOU</span>
          </div>

          {/* Live badge */}
          <div className="absolute top-12 left-4 flex items-center gap-2 bg-red-500 px-3 py-1.5 rounded-full shadow-lg">
            <div className="w-2 h-2 rounded-full bg-[var(--app-bg)] animate-pulse" />
            <span className="text-white font-black text-[11px] uppercase tracking-widest">LIVE</span>
          </div>

          {/* Viewer count */}
          <div className="absolute top-12 right-4 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-full flex items-center gap-1.5 border border-white/10">
            <Users size={12} className="text-white" />
            <span className="text-white font-black text-[11px]">{viewerCount}</span>
          </div>

          {/* Invited people thumbnails */}
          {selectedPeople.length > 0 && (
            <div className="absolute bottom-24 left-4 flex gap-2 overflow-x-auto">
              {selectedPeople.map((name, i) => (
                <div key={name} className={`w-14 h-20 rounded-xl ${AVATAR_COLORS[i % AVATAR_COLORS.length]} flex flex-col items-center justify-center gap-1 border border-white/30 flex-shrink-0`}>
                  <span className="text-white font-black text-xs">{initials(name)}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Bottom controls */}
        <div className="bg-black/80 backdrop-blur-md px-4 py-4 pb-[env(safe-area-inset-bottom)] flex items-center justify-around">
          <button onClick={() => setMuted(!muted)} className={`flex flex-col items-center gap-1.5 ${muted ? "text-red-400" : "text-white"}`}>
            {muted ? <MicOff size={22} /> : <Mic size={22} />}
            <span className="text-[9px] font-black uppercase tracking-widest">{muted ? "Unmute" : "Mute Audio"}</span>
          </button>

          <button onClick={() => navigate(-1)} className="w-14 h-14 rounded-full bg-red-500 flex items-center justify-center shadow-xl shadow-red-500/40 active:scale-90 transition-all">
            <PhoneOff size={24} className="text-white" />
          </button>

          <button className="flex flex-col items-center gap-1.5 text-white">
            <UserPlus size={22} />
            <span className="text-[9px] font-black uppercase tracking-widest">Add More</span>
          </button>

          <button className="flex flex-col items-center gap-1.5 text-white">
            <MessageSquare size={22} />
            <span className="text-[9px] font-black uppercase tracking-widest">Respond</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-[var(--app-bg)] pb-32 font-sans text-[var(--color-secondary)]">
      <PageHeader title="Go Live" showBack onBack={() => navigate(-1)} />

      <div className="px-4 pt-3 space-y-5">
        <div className="text-center">
          <p className="text-[12px] font-black text-[var(--color-secondary)]/60 leading-relaxed uppercase tracking-widest">
            Go live with video or audio with friends or customers and interact in real-time.
          </p>
        </div>

        {/* Stream Type Toggle */}
        <div className="flex bg-[var(--color-secondary)]/5 backdrop-blur-md p-1 rounded-2xl border border-[var(--border)] shadow-sm">
          <button
            onClick={() => setStreamType("free")}
            className={`flex-1 py-3 rounded-xl font-black uppercase tracking-widest text-[11px] transition-all ${
              streamType === "free" ? "bg-[var(--color-primary)] text-white shadow-sm" : "text-[var(--color-secondary)]/50 hover:bg-[var(--color-primary)]/5"
            }`}
          >
            Free Stream
          </button>
          <button
            onClick={() => setStreamType("paid")}
            className={`flex-1 py-3 rounded-xl font-black uppercase tracking-widest text-[11px] transition-all ${
              streamType === "paid" ? "bg-[var(--color-primary)] text-white shadow-sm" : "text-[var(--color-secondary)]/50 hover:bg-[var(--color-primary)]/5"
            }`}
          >
            Paid Stream
          </button>
        </div>

        {/* Mode selector */}
        <div className="space-y-4 pt-2">
          {[
            { key: "video" as LiveMode, Icon: Video, title: "Video Broadcast", desc: "Go Live with Video and Audio" },
            { key: "audio" as LiveMode, Icon: Mic, title: "Audio Only", desc: "Go Live with only Audio" },
          ].map(({ key, Icon, title, desc }) => (
            <motion.button
              key={key}
              whileTap={{ scale: 0.97 }}
              onClick={() => setMode(key)}
              className={`w-full flex items-center gap-4 p-4 rounded-2xl border transition-all ${
                mode === key ? "border-[var(--color-primary)] bg-[var(--app-bg)] shadow-md" : "border-[var(--border)] bg-[var(--app-bg)]/50"
              }`}
            >
              <div className={`w-12 h-12 rounded-xl border flex items-center justify-center shadow-sm ${
                mode === key ? "bg-[var(--color-primary)] border-[var(--color-primary)] text-white" : "bg-[var(--app-bg)] border-[var(--color-secondary)]/20 text-[var(--color-secondary)]/60"
              }`}>
                <Icon size={22} />
              </div>
              <div className="flex-1 text-left">
                <p className={`font-black text-[14px] uppercase tracking-tight mb-0.5 ${mode === key ? "text-[var(--color-secondary)]" : "text-[var(--color-secondary)]/80"}`}>{title}</p>
                <p className="text-[10px] text-[var(--color-secondary)]/50 font-black uppercase tracking-widest">{desc}</p>
              </div>
              <div className={`w-6 h-6 rounded-full border flex items-center justify-center flex-shrink-0 ${
                mode === key ? "border-[var(--color-primary)] bg-[var(--color-primary)]" : "border-[var(--border)]"
              }`}>
                {mode === key && <div className="w-2.5 h-2.5 rounded-full bg-white shadow-sm" />}
              </div>
            </motion.button>
          ))}
        </div>

        <div className="pt-2">
          <p className="font-black text-[var(--color-secondary)] text-[12px] uppercase tracking-widest mb-3">Select People to Invite</p>
          <input
            value={contactSearch}
            onChange={(e) => setContactSearch(e.target.value)}
            placeholder="Search Network..."
            className="w-full h-12 bg-[var(--app-bg)] border border-[var(--border)] rounded-2xl px-5 text-[13px] font-black text-[var(--color-secondary)] outline-none focus:border-[var(--color-primary)] focus:shadow-md transition-all mb-5 uppercase tracking-widest"
          />

          <div className="grid grid-cols-4 gap-3">
            {filteredContacts.map((name, i) => {
              const selected = selectedPeople.includes(name);
              return (
                <motion.button
                  key={name}
                  whileTap={{ scale: 0.92 }}
                  onClick={() => toggleContact(name)}
                  className="flex flex-col items-center gap-1.5"
                >
                  <div className={`w-14 h-14 rounded-2xl ${AVATAR_COLORS[i % AVATAR_COLORS.length]} flex items-center justify-center border transition-all shadow-sm ${
                    selected ? "border-[var(--color-primary)] shadow-md -translate-y-1" : "border-transparent"
                  }`}>
                    <span className="text-white font-black text-[14px]">{initials(name)}</span>
                    {selected && (
                      <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-[var(--color-primary)] rounded-full flex items-center justify-center border border-white shadow-sm">
                        <span className="text-white text-[8px] font-black">✓</span>
                      </div>
                    )}
                  </div>
                  <span className="text-[10px] font-black uppercase tracking-wider text-[var(--color-secondary)]/80 text-center leading-tight mt-1">{name.split(" ")[0]}</span>
                </motion.button>
              );
            })}
          </div>
        </div>

        {selectedPeople.length > 0 && (
          <div className="flex items-center gap-2 flex-wrap pt-2">
            {selectedPeople.map((name) => (
              <span key={name} className="bg-[var(--color-secondary)] text-white px-3 py-1.5 rounded-xl text-[9px] font-black uppercase tracking-widest shadow-sm border border-white/10">{name.split(" ")[0]}</span>
            ))}
          </div>
        )}

        <div className="pt-4">
          <motion.button
            whileTap={{ scale: 0.97 }}
            onClick={() => setIsLive(true)}
            className="w-full h-14 bg-[var(--color-primary)] text-white rounded-2xl font-black uppercase tracking-[0.2em] text-[14px] shadow-lg active:scale-95 transition-all flex items-center justify-center gap-3 border border-white/20"
          >
            <div className="w-2.5 h-2.5 rounded-full bg-white animate-pulse shadow-sm" />
            Start Broadcast
          </motion.button>
        </div>
      </div>
    </div>
  );
}
