import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronLeft, Plus, Send } from "lucide-react";
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
              searchValue={searchQuery}
              onSearchChange={setSearchQuery}
            />

            <div className="px-5 -mt-4 relative z-10 space-y-10">

              {/* ── Theme-Synced Tabs (Swiss Style) ── */}
              <div className="flex border-4 border-[#003366] bg-[#003366] shadow-[4px_4px_0px_#FF8C00]">
                {(["all", "social", "market"] as MsgTab[]).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`flex-1 py-3 text-[9px] font-black uppercase tracking-[0.2em] transition-all ${
                      activeTab === tab 
                        ? "bg-[#FF8C00] text-white" 
                        : "bg-white text-[#003366] hover:bg-gray-50"
                    }`}
                  >
                    {tab === "all" ? "All" : tab === "social" ? "Circle" : "Market"}
                  </button>
                ))}
              </div>

              {/* ── Conversation List (Industrial Ledger) ── */}
              <div className="space-y-4 pt-2">
                {filtered.map((conv, idx) => (
                  <motion.div
                    key={conv.id}
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.04 }}
                    onClick={() => setSelectedConv(conv)}
                    className="flex gap-4 p-5 bg-white border-2 border-[#003366] shadow-[6px_6px_0px_#003366] hover:shadow-[6px_6px_0px_#FF8C00] group active:translate-x-1 active:translate-y-1 active:shadow-none transition-all cursor-pointer relative overflow-hidden"
                  >
                    <div className="absolute top-0 left-0 w-1.5 h-full bg-[#FF8C00] opacity-0 group-hover:opacity-100 transition-opacity" />
                    
                    <div className="relative shrink-0">
                      <div className="w-14 h-14 border-2 border-[#003366] overflow-hidden">
                        <img src={conv.avatar} alt="" className="w-full h-full object-cover" />
                      </div>
                      {conv.online && (
                        <div className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full bg-[#00C853] border-2 border-[#003366] shadow-sm z-10" />
                      )}
                    </div>

                    <div className="flex-1 min-w-0 flex flex-col justify-center">
                      <div className="flex justify-between items-start mb-1">
                        <h3 className="font-black text-[#003366] text-xs uppercase tracking-tight group-hover:text-[#FF8C00] transition-colors">{conv.name}</h3>
                        <span className="text-[9px] text-[#003366]/30 font-black uppercase tracking-widest">{conv.time}</span>
                      </div>
                      <p className={`text-[11px] uppercase tracking-tighter truncate ${conv.unread > 0 ? "text-[#003366] font-black" : "text-[#003366]/50 font-bold"}`}>
                        {conv.lastMsg}
                      </p>
                    </div>

                    {conv.unread > 0 && (
                      <div className="flex items-center">
                         <div className="w-6 h-6 border-2 border-[#003366] bg-[#FF8C00] text-white text-[9px] font-black flex items-center justify-center shrink-0 shadow-[2px_2px_0px_#003366]">
                           {conv.unread}
                         </div>
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
