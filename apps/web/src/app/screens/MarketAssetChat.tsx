import { useState, useRef, useEffect } from "react";
import { useNavigate, useLocation, useParams } from "react-router";
import { Send, Calendar, Phone, ArrowRight } from "lucide-react";
import { PageHeader } from "../components/PageHeader";
import { toast } from "sonner";

type Message = { id: number; from: "me" | "seller"; text: string; time: string };

const INITIAL_MESSAGES: Message[] = [
  { id: 1, from: "seller", text: "Hello! Thank you for your interest in the Caterpillar 320. How can I help you?", time: "10:02" },
  { id: 2, from: "me", text: "Hi, I'm interested in purchasing. Is the price negotiable?", time: "10:05" },
  { id: 3, from: "seller", text: "The price is K850,000. For serious buyers we can discuss a slight adjustment. When would you like to view the unit?", time: "10:07" },
];

export function MarketAssetChat() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { state } = useLocation();
  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES);
  const [input, setInput] = useState("");
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const send = () => {
    if (!input.trim()) return;
    const newMsg: Message = { id: Date.now(), from: "me", text: input.trim(), time: new Date().toLocaleTimeString("en", { hour: "2-digit", minute: "2-digit" }) };
    setMessages((p) => [...p, newMsg]);
    setInput("");
    setTimeout(() => {
      setMessages((p) => [...p, { id: Date.now() + 1, from: "seller", text: "Thank you for your message. I'll get back to you shortly.", time: new Date().toLocaleTimeString("en", { hour: "2-digit", minute: "2-digit" }) }]);
    }, 1200);
  };

  return (
    <div className="w-full max-w-md mx-auto bg-transparent font-sans flex flex-col">
      <PageHeader title="CHAT SELLER" showBack />

      <div className="px-4 py-3 bg-[var(--app-bg)] border-b border-[var(--border)] flex items-center gap-3">
        <div className="w-9 h-9 rounded-full bg-[var(--color-secondary)] flex items-center justify-center text-white text-[11px] font-black">CB</div>
        <div className="flex-1">
          <p className="text-[12px] font-black text-[var(--app-text)] uppercase tracking-wide">Copperbelt Heavy Eq.</p>
          <div className="flex items-center gap-1">
            <div className="w-1.5 h-1.5 rounded-full bg-[#059669] animate-pulse" />
            <span className="text-[9px] font-semibold text-[#059669]">Online</span>
          </div>
        </div>
        <div className="flex gap-2">
          <button onClick={() => toast.info("Scheduling inspection...")}
            className="flex items-center gap-1 px-3 py-1.5 rounded-xl border-2 border-[var(--border)] text-[var(--color-secondary)] active:scale-95 transition-all">
            <Calendar size={12} strokeWidth={2} />
            <span className="text-[9px] font-black uppercase">Inspect</span>
          </button>
          <button onClick={() => toast.info("Calling seller...")}
            className="flex items-center gap-1 px-3 py-1.5 rounded-xl border-2 border-[var(--color-primary)]/30 bg-[var(--color-primary)]/8 text-[var(--color-primary)] active:scale-95 transition-all">
            <Phone size={12} strokeWidth={2} />
            <span className="text-[9px] font-black uppercase">Call</span>
          </button>
        </div>
      </div>

      <div className="flex-1 px-4 py-4 space-y-3 overflow-y-auto" style={{ minHeight: "300px" }}>
        {messages.map((msg) => (
          <div key={msg.id} className={`flex ${msg.from === "me" ? "justify-end" : "justify-start"}`}>
            <div className={`max-w-[75%] rounded-2xl px-4 py-3 ${msg.from === "me" ? "bg-[var(--color-secondary)] text-white rounded-tr-sm" : "bg-[var(--app-bg)] border-2 border-[var(--border)] text-[var(--app-text)] rounded-tl-sm"}`}>
              <p className="text-[12px] font-semibold leading-snug">{msg.text}</p>
              <p className={`text-[9px] font-black mt-1 ${msg.from === "me" ? "text-white/50 text-right" : "text-[var(--color-secondary)]/40"}`}>{msg.time}</p>
            </div>
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      <div className="px-4 py-4 border-t border-[var(--border)] bg-[var(--app-bg)] space-y-3">
        <div className="flex items-center gap-2">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && send()}
            placeholder="Type a message..."
            className="flex-1 border-2 border-[var(--border)] rounded-2xl px-4 py-3 text-[13px] font-semibold text-[var(--app-text)] bg-[var(--app-bg)] outline-none focus:border-[var(--app-text)] transition-all placeholder:text-[var(--color-secondary)]/30"
          />
          <button onClick={send}
            className="w-12 h-12 rounded-2xl bg-[var(--color-secondary)] flex items-center justify-center active:scale-90 transition-all shadow-md">
            <Send size={18} className="text-white" strokeWidth={2} />
          </button>
        </div>
        <button
          onClick={() => navigate(`/marketplace/asset/${id}/order`, { state })}
          className="w-full py-3.5 rounded-2xl bg-[var(--color-primary)] text-white font-black uppercase tracking-widest text-[11px] flex items-center justify-center gap-3 active:scale-95 transition-all"
        >
          Proceed To Order <ArrowRight size={16} />
        </button>
      </div>
    </div>
  );
}
