import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Search, ChevronLeft, MoreHorizontal, Plus, Send } from "lucide-react";
import { useNavigate } from "react-router";
import { PageHeader } from "../components/PageHeader";

type MsgTab = "all" | "social" | "market";

interface Conversation {
  id: number;
  type: "social" | "market";
  name: string;
  avatar: string;
  lastMsg: string;
  time: string;
  unread: number;
  online?: boolean;
  itemImage?: string; // For marketplace inquiries
}

const CONVERSATIONS: Conversation[] = [
  { id: 1, type: "social", name: "Sarah Chanda", avatar: "https://picsum.photos/seed/sarah/200", lastMsg: "That looks amazing! How did you get that shot?", time: "2m", unread: 2, online: true },
  { id: 2, type: "market", name: "David Mvale", avatar: "https://picsum.photos/seed/david/200", lastMsg: "Is the solar light still available for purchase?", time: "15m", unread: 1, online: false, itemImage: "https://picsum.photos/seed/solar/100" },
  { id: 3, type: "social", name: "James Zulu", avatar: "https://picsum.photos/seed/james/200", lastMsg: "Check out this new campaign I found!", time: "1h", unread: 0, online: true },
  { id: 4, type: "market", name: "Kleench Support", avatar: "https://picsum.photos/seed/support/200", lastMsg: "Your withdrawal was successful. Transaction ID: #8821", time: "3h", unread: 0, online: true },
  { id: 5, type: "social", name: "Mercy Banda", avatar: "https://picsum.photos/seed/mercy/200", lastMsg: "Can you send me the link to that course?", time: "5h", unread: 0, online: false },
  { id: 6, type: "market", name: "Solar Pro Zambia", avatar: "https://picsum.photos/seed/solarpro/200", lastMsg: "We also have bundle deals for retailers.", time: "Yesterday", unread: 0, online: false, itemImage: "https://picsum.photos/seed/panel/100" },
];

export default function Messages() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<MsgTab>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedConv, setSelectedConv] = useState<Conversation | null>(null);
  const [newMessage, setNewMessage] = useState("");
  const [messages, setMessages] = useState([
    { id: 1, text: "Hey! How's the project going?", sender: "them", time: "10:00 AM" },
    { id: 2, text: "It's going great, just finished the new UI!", sender: "me", time: "10:05 AM" },
    { id: 3, text: "Can't wait to see it!", sender: "them", time: "10:06 AM" },
  ]);

  const filtered = CONVERSATIONS.filter(c => {
    const matchesTab = activeTab === "all" || c.type === activeTab;
    const matchesSearch = c.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          c.lastMsg.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTab && matchesSearch;
  });

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;
    setMessages([...messages, { 
      id: Date.now(), 
      text: newMessage, 
      sender: "me", 
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) 
    }]);
    setNewMessage("");
  };

  return (
    <div className="w-full min-h-screen pb-32">
      <AnimatePresence mode="wait">
        {!selectedConv ? (
          <motion.div 
            key="inbox"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="flex flex-col"
          >
            {/* ── Standardized Header ── */}
            <PageHeader 
              title="Messages" 
              subtitle="Connect with your circle and market"
              showBack
            />

            <div className="px-5 -mt-8 relative z-10 space-y-6">
              {/* ── Theme-Synced Search ── */}
              <div className="relative glass-strong border border-black/[0.05] rounded-2xl shadow-sm">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input 
                  type="text" 
                  placeholder="Search interactions..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-11 pr-4 py-4 bg-transparent outline-none text-[#003366] font-medium placeholder:text-gray-400"
                />
              </div>

              {/* ── Theme-Synced Tabs ── */}
              <div className="flex gap-2 p-1 bg-gray-100/50 rounded-xl border border-black/[0.02]">
                {(["all", "social", "market"] as MsgTab[]).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`flex-1 py-2 rounded-lg text-[11px] font-black uppercase tracking-widest transition-all ${
                      activeTab === tab 
                        ? "bg-[#FF8C00] text-white shadow-md shadow-[#FF8C00]/20" 
                        : "text-gray-400 hover:text-gray-600"
                    }`}
                  >
                    {tab === "all" ? "All" : tab === "social" ? "Circle" : "Market"}
                  </button>
                ))}
              </div>

              {/* ── Conversation List ── */}
              <div className="space-y-3 pt-2">
                {filtered.map((conv, idx) => (
                  <motion.div
                    key={conv.id}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.04 }}
                    onClick={() => setSelectedConv(conv)}
                    className="flex gap-3 p-4 bg-white/70 backdrop-blur-md rounded-2xl border border-gray-100 shadow-sm active:scale-[0.98] transition-all cursor-pointer"
                  >
                    <div className="relative shink-0">
                      <img src={conv.avatar} alt="" className="w-12 h-12 rounded-xl object-cover" />
                      {conv.online && (
                        <div className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-[#00C853] border-2 border-white shadow-sm" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start">
                        <h3 className="font-black text-[#003366] text-sm truncate">{conv.name}</h3>
                        <span className="text-[10px] text-gray-400 font-bold ml-2">{conv.time}</span>
                      </div>
                      <p className={`text-[12px] truncate ${conv.unread > 0 ? "text-[#003366] font-bold" : "text-gray-500 font-medium"}`}>
                        {conv.lastMsg}
                      </p>
                    </div>
                    {conv.unread > 0 && (
                      <div className="w-5 h-5 rounded-full bg-[#FF8C00] text-white text-[9px] font-black flex items-center justify-center shrink-0">
                        {conv.unread}
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div 
            key="chatbox"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="flex flex-col h-screen fixed inset-y-0 w-full max-w-md left-1/2 -translate-x-1/2 z-[60] bg-[#fcfcfc] shadow-2xl"
          >
            {/* ── Chat Header ── */}
            <div className="px-5 pt-6 pb-4 bg-[#FF8C00] text-white rounded-b-[32px] shadow-lg relative overflow-hidden">
               {/* grid texture */}
               <div className="absolute inset-0 opacity-[0.1]">
                 <svg width="100%" height="100%">
                   <pattern id="chat-grid" width="20" height="20" patternUnits="userSpaceOnUse">
                     <path d="M 20 0 L 0 0 0 20" fill="none" stroke="white" strokeWidth="0.5"/>
                   </pattern>
                   <rect width="100%" height="100%" fill="url(#chat-grid)"/>
                 </svg>
               </div>

               <div className="relative z-10 flex items-center gap-4">
                  <button onClick={() => setSelectedConv(null)} className="p-2 -ml-2 rounded-full hover:bg-white/10 active:scale-90 transition-all">
                    <ChevronLeft size={24} />
                  </button>
                  <div className="flex items-center gap-3">
                    <img src={selectedConv.avatar} alt="" className="w-10 h-10 rounded-xl object-cover border border-white/20" />
                    <div>
                      <h2 className="font-black text-sm tracking-tight">{selectedConv.name}</h2>
                      <p className="text-[10px] font-medium opacity-80">{selectedConv.online ? "Online Now" : "Last seen recently"}</p>
                    </div>
                  </div>
               </div>
            </div>

            {/* ── Messages List ── */}
            <div className="flex-1 overflow-y-auto px-5 py-6 space-y-4">
              {messages.map((msg) => (
                <div key={msg.id} className={`flex ${msg.sender === "me" ? "justify-end" : "justify-start"}`}>
                  <div className={`max-w-[80%] px-4 py-3 rounded-2xl text-[13px] ${
                    msg.sender === "me" 
                      ? "bg-[#FF8C00] text-white rounded-tr-none shadow-md" 
                      : "bg-white text-[#003366] rounded-tl-none shadow-sm border border-gray-100"
                  }`}>
                    <p className="font-medium">{msg.text}</p>
                    <p className={`text-[9px] mt-1 opacity-60 text-right ${msg.sender === "me" ? "text-white" : "text-gray-400"}`}>
                      {msg.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* ── Chat Input ── */}
            <div className="p-5 pb-14 bg-white/80 backdrop-blur-xl border-t border-gray-100 relative z-[70]">
               <div className="flex items-center gap-2 bg-gray-100/80 rounded-2xl px-4 py-2 border border-black/[0.02]">
                  <input 
                    type="text" 
                    placeholder="Type a message..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                    className="flex-1 bg-transparent py-2 outline-none text-[#003366] text-sm font-medium" 
                  />
                  <motion.button 
                    whileTap={{ scale: 0.9 }}
                    onClick={handleSendMessage}
                    className="w-10 h-10 rounded-xl bg-[#FF8C00] text-white flex items-center justify-center shadow-lg shadow-[#FF8C00]/20"
                  >
                    <Send size={18} />
                  </motion.button>
               </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {!selectedConv && (
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="fixed bottom-28 right-6 w-14 h-14 rounded-2xl bg-[#FF8C00] text-white flex items-center justify-center shadow-[0_10px_25px_rgba(255,140,0,0.3)] z-50"
        >
          <Plus size={28} />
        </motion.button>
      )}
    </div>
  );
}
