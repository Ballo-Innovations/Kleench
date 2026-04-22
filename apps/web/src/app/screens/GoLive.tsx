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
      <div className="fixed inset-0 bg-slate-900 flex flex-col max-w-md mx-auto">
        {/* Simulated camera feed */}
        <div className="flex-1 relative bg-gradient-to-br from-slate-800 to-slate-950 flex items-center justify-center overflow-hidden">
          <div className="w-32 h-32 rounded-full bg-slate-700 flex items-center justify-center">
            <span className="text-white text-3xl font-black">YOU</span>
          </div>

          {/* Live badge */}
          <div className="absolute top-12 left-4 flex items-center gap-2 bg-red-500 px-3 py-1.5 rounded-full shadow-lg">
            <div className="w-2 h-2 rounded-full bg-white animate-pulse" />
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
                <div key={name} className={`w-14 h-20 rounded-xl ${AVATAR_COLORS[i % AVATAR_COLORS.length]} flex flex-col items-center justify-center gap-1 border-2 border-white/30 flex-shrink-0`}>
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
    <div className="w-full min-h-screen bg-transparent pb-32 font-sans text-slate-800">
      <PageHeader title="Go Live" showBack onBack={() => navigate(-1)} />

      <div className="px-4 pt-3 space-y-5">
        <div className="text-center">
          <p className="text-[12px] text-slate-500 leading-relaxed">
            Go live with video or audio with friends or customers and interact in real-time.
          </p>
        </div>

        {/* Mode selector */}
        <div className="space-y-3">
          {[
            { key: "video" as LiveMode, Icon: Video, title: "Video", desc: "Go Live with Video and Audio" },
            { key: "audio" as LiveMode, Icon: Mic, title: "Audio", desc: "Go Live with only Audio" },
          ].map(({ key, Icon, title, desc }) => (
            <motion.button
              key={key}
              whileTap={{ scale: 0.97 }}
              onClick={() => setMode(key)}
              className={`w-full flex items-center gap-4 p-4 rounded-2xl border-2 transition-all ${
                mode === key ? "border-orange-500 bg-orange-50" : "border-slate-200 bg-white"
              }`}
            >
              <div className={`w-11 h-11 rounded-xl flex items-center justify-center ${
                mode === key ? "bg-orange-500 text-white" : "bg-slate-100 text-slate-500"
              }`}>
                <Icon size={20} />
              </div>
              <div className="flex-1 text-left">
                <p className="font-black text-slate-800 text-sm">{title}</p>
                <p className="text-[11px] text-slate-400 font-semibold">{desc}</p>
              </div>
              <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                mode === key ? "border-orange-500 bg-orange-500" : "border-slate-300"
              }`}>
                {mode === key && <div className="w-2 h-2 rounded-full bg-white" />}
              </div>
            </motion.button>
          ))}
        </div>

        {/* People to invite */}
        <div>
          <p className="font-black text-slate-800 text-sm mb-3">Select People to Invite</p>
          <input
            value={contactSearch}
            onChange={(e) => setContactSearch(e.target.value)}
            placeholder="Search......."
            className="w-full h-11 bg-white border border-slate-200 rounded-full px-5 text-sm font-semibold text-slate-700 outline-none focus:border-orange-400 transition-all mb-4"
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
                  <div className={`w-14 h-14 rounded-full ${AVATAR_COLORS[i % AVATAR_COLORS.length]} flex items-center justify-center border-2 transition-all ${
                    selected ? "border-orange-500 scale-105" : "border-transparent"
                  }`}>
                    <span className="text-white font-black text-xs">{initials(name)}</span>
                    {selected && (
                      <div className="absolute bottom-0 right-0 w-4 h-4 bg-orange-500 rounded-full flex items-center justify-center border-2 border-white">
                        <span className="text-white text-[7px] font-black">✓</span>
                      </div>
                    )}
                  </div>
                  <span className="text-[9px] font-semibold text-slate-600 text-center leading-tight">{name.split(" ")[0]}</span>
                </motion.button>
              );
            })}
          </div>
        </div>

        {selectedPeople.length > 0 && (
          <div className="flex items-center gap-2 flex-wrap">
            {selectedPeople.map((name) => (
              <span key={name} className="bg-orange-100 text-orange-600 px-2 py-1 rounded-full text-[10px] font-black">{name.split(" ")[0]}</span>
            ))}
          </div>
        )}

        <motion.button
          whileTap={{ scale: 0.97 }}
          onClick={() => setIsLive(true)}
          className="w-full h-14 bg-orange-500 text-white rounded-2xl font-black uppercase tracking-widest text-sm shadow-lg shadow-orange-500/30 active:scale-95 transition-all flex items-center justify-center gap-2"
        >
          <div className="w-2 h-2 rounded-full bg-white animate-pulse" />
          Go Live
        </motion.button>
      </div>
    </div>
  );
}
