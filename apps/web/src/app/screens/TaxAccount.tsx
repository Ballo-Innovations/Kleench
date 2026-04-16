import React from "react";
import { motion } from "motion/react";
import { useNavigate } from "react-router";
import { PageHeader } from "../components/PageHeader";

export function TaxAccount() {
  const navigate = useNavigate();

  return (
    <div className="w-full min-h-screen bg-transparent font-sans text-[#093463] pb-12 selection:bg-[#EE4D2D] selection:text-white">
      <PageHeader 
        showBack
        onBack={() => navigate(-1)}
        title="Tax Account"
      />

      <div className="px-5 mt-8 space-y-8 max-w-md mx-auto">
        {/* Kinetic Balance Card */}
        <section>
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="bg-[#093463] rounded-[32px] p-8 border-[3px] border-[#011427] shadow-[6px_6px_0px_#011427] transition-all"
          >
            <p className="text-[#FF8C00] text-[10px] font-black uppercase tracking-[0.4em] mb-2 text-left">
              AVAILABLE TAX BALANCE
            </p>
            <h2 className="text-white text-[32px] font-black tracking-tighter text-left leading-none">
              ZMW 2,450.00
            </h2>
            <div className="flex items-center gap-2 mt-4">
               <div className="h-1.5 w-1.5 rounded-full bg-[#00D97E] animate-pulse" />
               <p className="text-white/40 text-[9px] font-black uppercase tracking-widest leading-none">Kabista Mbuli</p>
            </div>
          </motion.div>
        </section>

        {/* Summary Card */}
        <section>
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-[32px] border-[3px] border-[#011427] p-6 shadow-[6px_6px_0px_rgba(1,20,39,0.05)]"
          >
            <div className="inline-flex bg-[#093463]/5 border-[2px] border-[#093463]/10 px-4 py-2 rounded-2xl mb-6">
              <span className="text-[#093463] text-[9px] font-black uppercase tracking-widest">05 Apr 2026 - 14 Apr 2026</span>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                 <h3 className="text-[#093463] font-black text-[11px] uppercase tracking-[0.2em] whitespace-nowrap">Summary Ledger</h3>
                 <div className="flex-1 h-[2px] bg-[#093463]/10" />
              </div>
              
              <div className="space-y-4 pt-2">
                 {[
                   { label: "Opening Balance", value: "275,142" },
                   { label: "Total Tax Charged", value: "8,072.41" },
                   { label: "Total Payments", value: "7,907" },
                   { label: "Closing Balance", value: "109,732" }
                 ].map((row, i) => (
                    <div key={i} className="flex justify-between items-center group/row">
                       <span className="text-[#6E7C91] text-[10px] font-black uppercase tracking-widest group-hover/row:text-[#093463] transition-colors">{row.label}</span>
                       <span className="text-[#093463] text-[14px] font-black tracking-tighter">{row.value}</span>
                    </div>
                 ))}
              </div>
            </div>
          </motion.div>
        </section>

        {/* Detailed Statement Card */}
        <section className="space-y-4">
           <div className="flex items-center gap-3 px-1">
              <h3 className="text-[#093463] font-black text-[11px] uppercase tracking-[0.2em] whitespace-nowrap">Detailed Statement</h3>
              <div className="flex-1 h-[2px] bg-[#093463]/10" />
           </div>

           <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-[32px] border-[3px] border-[#011427] overflow-hidden shadow-[8px_8px_0px_rgba(1,20,39,0.02)]"
           >
            <div className="divide-y-[2px] divide-[#011427]/5">
              {[
                { date: "05/04/26", time: "21:04 PM", desc: "Loan Repayment to ZANACO", id: "LR260405.D03376", tax: "77.28", bal: "197,862", pos: false },
                { date: "00:00 AM", time: "06/04/26", desc: "Money Sent to WENDY Sharon", id: "PP260406.U08333", tax: "53.24", bal: "144,622", pos: false },
                { date: "10:56 AM", time: "06/04/26", desc: "Money Withdrawn from Wallet", id: "CO260406.N72890", tax: "112.5", bal: "32,122", pos: false },
                { date: "15:49 PM", time: "06/04/26", desc: "Money Great North School", id: "PP260406.U76378", tax: "70.00", bal: "102,122", pos: true },
                { date: "15:49 PM", time: "06/04/26", desc: "Loan Repayment to FNB", id: "LR260406.Y05933", tax: "0.69", bal: "101,432", pos: false },
                { date: "19:16 PM", time: "06/04/26", desc: "Money Sent to Michael", id: "PP260406.O04568", tax: "500.00", bal: "601,432", pos: true }
              ].map((tx, i) => (
                <div key={i} className="p-5 flex items-center justify-between group cursor-pointer hover:bg-[#093463]/[0.02] transition-colors relative">
                  {/* Kinetic Edge Indicator */}
                  <div className={`absolute right-0 top-0 bottom-0 w-1.5 ${tx.pos ? 'bg-[#00D97E]' : 'bg-[#FF8C00]'}`} />

                  <div className="flex-1 pr-4">
                    <h4 className="text-[11px] font-black text-[#093463] uppercase tracking-tight mb-1 transition-transform group-hover:translate-x-1">{tx.desc}</h4>
                    <div className="flex items-center gap-3">
                       <span className="text-[8px] font-black text-[#093463]/40 uppercase tracking-widest">{tx.id}</span>
                       <span className="text-[8px] font-bold text-[#6E7C91] uppercase">{tx.date}</span>
                    </div>
                  </div>

                  <div className="text-right pr-2">
                    <p className={`text-[15px] font-black tracking-tighter ${tx.pos ? 'text-[#00D97E]' : 'text-[#093463]'}`}>
                       {tx.tax}
                    </p>
                    <p className="text-[8px] font-black text-[#6E7C91] uppercase tracking-widest opacity-40">Bal: {tx.bal}</p>
                  </div>
                </div>
              ))}
            </div>
           </motion.div>
        </section>

        {/* Back Button */}
        <div className="pt-4">
          <motion.button
            whileTap={{ scale: 0.95, x: 2, y: 2 }}
            onClick={() => navigate(-1)}
            style={{ backgroundColor: "#093463" }}
            className="w-full h-14 rounded-full text-white font-black uppercase tracking-[0.2em] text-xs shadow-[4px_4px_0px_#011427] border-2 border-[#011427] active:shadow-none transition-all"
          >
            Back
          </motion.button>
        </div>
      </div>
    </div>
  );
}
