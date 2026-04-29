import { motion } from "motion/react";
import { ChevronRight } from "lucide-react";
import { useNavigate } from "react-router";
import { useState, useEffect } from "react";
import { Skeleton } from 'boneyard-js/react';
import { Transaction } from "@repo/shared";

// Mock Data
const TRANSACTIONS: Transaction[] = [
  {
    id: "1",
    title: "PROJECT MILESTONE: LOGO DESIGN",
    category: "EARNING",
    timestamp: "Today, 2:45 PM",
    amount: 1200.00,
    currency: "ZMW",
    expandable: true,
  },
  {
    id: "2",
    title: "ELECTRICITY BILL (ZESCO)",
    category: "PAYMENT",
    timestamp: "Today, 11:10 AM",
    amount: -450.00,
    currency: "ZMW",
    expandable: true,
  },
  {
    id: "3",
    title: "TO: SARAH CHANDA",
    category: "TRANSFER",
    timestamp: "Yesterday",
    amount: -200.00,
    currency: "ZMW",
    expandable: false,
  },
];

export function BalanceOverview() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<"ALL" | "EARNINGS" | "PAYMENTS" | "TRANSFERS">("ALL");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  const filteredTransactions = TRANSACTIONS.filter(tx => {
    if (activeTab === "ALL") return true;
    if (activeTab === "EARNINGS") return tx.category === "EARNING";
    if (activeTab === "PAYMENTS") return tx.category === "PAYMENT";
    if (activeTab === "TRANSFERS") return tx.category === "TRANSFER";
    return true;
  });

  return (
    <div className="w-full min-h-screen bg-transparent pb-32 font-sans text-[var(--color-secondary)]">
      {/* Screen Header */}
      <header className="pt-8 pb-4 flex justify-center">
        <motion.h1 
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="text-2xl font-black text-[var(--color-secondary)] uppercase tracking-widest"
        >
          Balance
        </motion.h1>
      </header>

      <div className="px-5 space-y-10">
        {/* Neo-Brutalist Total Balance Card */}
        <Skeleton name="balance-card" loading={isLoading} stagger animate="shimmer">
          <motion.div 
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            className="bg-[var(--app-bg)] rounded-[32px] p-8 border border-[var(--border)] shadow-md transition-all"
          >
            <p className="text-[10px] font-black text-[var(--color-primary)] uppercase tracking-[0.4em] mb-2">Total Ledger</p>
            <h2 className="text-4xl font-black text-[var(--color-secondary)] tracking-tight mb-1">ZMW 2,450.00</h2>
            <div className="flex items-center gap-2 mt-4">
              <div className="h-1.5 w-1.5 rounded-full bg-[#00D97E] animate-pulse" />
              <span className="text-[9px] font-black text-[var(--color-secondary)]/40 uppercase tracking-widest">Live Verified Balance</span>
            </div>
          </motion.div>
        </Skeleton>

        {/* Kinetic Ledger Header */}
        <div className="flex items-center gap-4">
          <motion.span 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-[10px] font-black text-[var(--color-secondary)] uppercase tracking-[0.4em] whitespace-nowrap"
          >
            Statement Ledger
          </motion.span>
          <div className="flex-1 h-[1px] bg-[var(--border)]" />
        </div>

        {/* Filter Navigation */}
        <div className="relative">
          <div className="absolute inset-x-0 top-0 h-10 opacity-[0.05] pointer-events-none" style={{ backgroundImage: "radial-gradient(var(--color-secondary) 1.5px, transparent 1.5px)", backgroundSize: "16px 16px" }} />
          
          <div className="relative flex bg-[var(--app-bg)] border border-[var(--border)] rounded-2xl p-1.5 w-full justify-between items-center shadow-sm">
            {["ALL", "EARNINGS", "PAYMENTS", "TRANSFERS"].map((tab) => {
              const isActive = activeTab === tab;
              return (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab as "ALL" | "EARNINGS" | "PAYMENTS" | "TRANSFERS")}
                  className={`relative flex-1 py-2.5 text-[9px] font-black transition-all ${
                    isActive ? "text-white" : "text-[#001F33]/50"
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeTabBrutal"
                      className="absolute inset-0 bg-[var(--color-secondary)] rounded-xl"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.5 }}
                    />
                  )}
                  <span className="relative z-10">{tab}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Kinetic Transaction List Container */}
        <Skeleton name="transaction-list" loading={isLoading} stagger transition>
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="bg-[var(--app-bg)] rounded-[32px] border border-[var(--border)] shadow-sm overflow-hidden"
          >
            <div className="divide-y divide-[var(--border)]">
              {filteredTransactions.map((tx, idx) => (
                <TransactionItem key={tx.id} tx={tx} index={idx} />
              ))}
            </div>
          </motion.div>
        </Skeleton>

        {/* Back Pill Button */}
        <div className="flex justify-center pt-2">
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate(-1)}
            className="w-full h-14 rounded-full bg-[var(--color-secondary)] text-white font-black uppercase tracking-[0.2em] text-[10px] shadow-md border border-white/10 transition-all"
          >
            Back
          </motion.button>
        </div>
      </div>
    </div>
  );
}

function TransactionItem({ tx, index }: { tx: Transaction; index: number }) {
  const getEdgeColor = () => {
    switch (tx.category) {
      case "EARNING": return "bg-[#00D97E]";
      case "PAYMENT": return "bg-[var(--color-primary)]";
      case "TRANSFER": return "bg-[var(--color-secondary-dim)]";
      default: return "bg-[var(--color-secondary-dim)]";
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ backgroundColor: "var(--color-secondary-dim)/5" }}
      className="relative p-6 flex items-center justify-between group cursor-pointer transition-colors"
    >
      {/* Kinetic Edge Indicator */}
      <motion.div 
        className={`absolute right-0 top-0 bottom-0 w-2 ${getEdgeColor()}`}
        whileHover={{ width: 8 }}
      />

      <div className="flex-1 pr-6">
        <h4 className="text-[12px] font-black text-[var(--color-secondary)] uppercase tracking-tight mb-2 group-hover:translate-x-1 transition-transform">{tx.title}</h4>
        
        <div className="flex items-center gap-4">
          <div className="bg-[var(--color-secondary)]/5 border border-[var(--border)] px-2.5 py-1 rounded-lg">
            <span className="text-[8px] font-black text-[var(--color-secondary)] uppercase tracking-widest">{tx.category}</span>
          </div>
          <span className="text-[9px] font-bold text-[var(--color-secondary)]/30 uppercase tracking-tighter">{tx.timestamp}</span>
        </div>
      </div>

      <div className="text-right">
        <motion.span 
          className={`text-[18px] font-black ${tx.category === "EARNING" ? "text-[#00D97E]" : "text-[var(--color-secondary)]"}`}
          whileHover={{ scale: 1.1 }}
        >
          {tx.amount > 0 ? "+" : ""}{tx.amount.toLocaleString(undefined, { minimumFractionDigits: 2 })}
        </motion.span>
        {tx.expandable && (
          <div className="flex items-center justify-end gap-1.5 mt-1 opacity-20 group-hover:opacity-100 transition-opacity">
            <span className="text-[7px] font-black uppercase tracking-widest text-[var(--color-secondary)]">Details</span>
            <ChevronRight size={10} className="rotate-90" />
          </div>
        )}
      </div>
    </motion.div>
  );
}
