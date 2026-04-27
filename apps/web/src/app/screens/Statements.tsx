import { motion } from "motion/react";
import { PageHeader } from "../components/PageHeader";

const SUMMARY_DATA = [
  { label: "Total Money Debited", value: "8,072.41" },
  { label: "Total Money Credited", value: "7,907.00" },
  { label: "Opening Balance", value: "275.142" },
  { label: "Closing Balance", value: "109.732" },
];

const DETAILED_DATA = [
  { date: "05/04/26", time: "21:04 PM", details: "Loan Repayment to ZANACO", id: "LR260405.2104.D03376", credited: "--", debited: "150.00", balance: "2,300.00" },
  { date: "06/04/26", time: "10:15 AM", details: "Salary Deposit - KLEENCH", id: "SD260406.1015.C88219", credited: "5,000.00", debited: "--", balance: "7,300.00" },
  { date: "07/04/26", time: "14:22 PM", details: "Airtel Mobile Money Transfer", id: "MT260407.1422.D11042", credited: "--", debited: "200.00", balance: "7,100.00" },
  { date: "09/04/26", time: "09:00 AM", details: "MTN Airtime Purchase", id: "AP260409.0900.D44312", credited: "--", debited: "50.00", balance: "7,050.00" },
  { date: "12/04/26", time: "18:45 PM", details: "Zamtel Data Subscription", id: "DS260412.1845.D00921", credited: "--", debited: "100.00", balance: "6,950.00" },
  { date: "14/04/26", time: "11:30 AM", details: "Cashback: Promo-WIN", id: "CB260414.1130.C22341", credited: "25.00", debited: "--", balance: "6,975.00" },
];

export function Statements() {
  // Retrieve user profile info
  const localKycRaw = localStorage.getItem("userKyc");
  const localKyc = localKycRaw ? JSON.parse(localKycRaw) : null;
  const userEmail = localStorage.getItem("userEmail") || "";
  const profileName = localKyc?.fullName || (userEmail ? userEmail.split("@")[0] : "Kleench User");

  return (
    <div className="min-h-screen bg-transparent text-[var(--app-text)] font-sans pb-32">
      <PageHeader showBack title="Statement" />

      <div className="px-5 pt-4 space-y-8">
        {/* Balance Card Section */}
        <div className="space-y-3">
            <div className="relative group">
                <div className="absolute inset-0 bg-[var(--app-shape-accent)]/30 rounded-2xl translate-x-1 translate-y-1 blur-sm" />
                <div className="relative bg-[var(--app-shape-accent)] rounded-2xl p-6 shadow-lg shadow-[var(--app-text)]/25">
                    <p className="text-[10px] font-black text-[var(--app-orange)] uppercase tracking-[0.2em] mb-1">BALANCE</p>
                    <h2 className="text-3xl font-black text-white tracking-tighter">ZMW 2,450.00</h2>
                </div>
            </div>
            <p className="text-[11px] font-bold text-[var(--app-text)]/60 tracking-wide ml-1">{profileName}</p>
        </div>

        {/* Summary Card */}
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="bg-[var(--app-bg)] rounded-3xl p-5 border-2 border-slate-100 shadow-[0_20px_50px_rgba(0,51,102,0.06)] space-y-5"
        >
          <div className="bg-[#5D56D8]/10 py-2.5 px-4 rounded-full flex items-center justify-center border border-[#5D56D8]/20">
            <span className="text-[10px] font-black text-[#5D56D8] uppercase tracking-widest text-center">05 Apr 2026 to 14 Apr 2026</span>
          </div>
          
          <div className="space-y-4">
            <h3 className="text-sm font-black uppercase tracking-tight">Summary</h3>
            <div className="h-[1px] bg-slate-100 w-full" />
            
            <div className="space-y-3 px-1">
              <div className="flex justify-between items-center text-[10px] font-bold text-[var(--app-text)]/40 uppercase tracking-widest pb-1">
                 <span>Transaction Type</span>
                 <span>Amount(ZMW)</span>
              </div>
              {SUMMARY_DATA.map((item, i) => (
                <div key={i} className="flex justify-between items-center">
                  <span className="text-[11px] font-bold text-[var(--app-text)]/60">{item.label}</span>
                  <span className="text-[12px] font-black text-[var(--app-text)]">{item.value}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Detailed Statement Card */}
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="bg-[var(--app-bg)] rounded-3xl p-5 border-2 border-slate-100 shadow-[0_20px_50px_rgba(0,51,102,0.06)] space-y-5"
        >
          <div className="space-y-4">
            <h3 className="text-sm font-black uppercase tracking-tight">Detailed Statement</h3>
            <div className="h-[1px] bg-slate-100 w-full" />
          </div>

          <div className="overflow-x-auto -mx-1">
            <table className="w-full text-left">
              <thead>
                <tr className="text-[9px] font-black text-[var(--app-text)] uppercase tracking-tighter">
                  <th className="pb-4 pr-2">Date & Time</th>
                  <th className="pb-4 pr-2">Details</th>
                  <th className="pb-4 pr-1 text-right">Credited</th>
                  <th className="pb-4 pr-1 text-right">Debited</th>
                  <th className="pb-4 text-right">Balance</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {DETAILED_DATA.map((row, i) => (
                  <tr key={i} className="group">
                    <td className="py-4 pr-2 align-top">
                      <div className="flex flex-col">
                        <span className="text-[10px] font-bold text-[var(--app-text)]">{row.date}</span>
                        <span className="text-[8px] font-bold text-[var(--app-text)]/40">{row.time}</span>
                      </div>
                    </td>
                    <td className="py-4 pr-2 align-top min-w-[100px]">
                      <div className="flex flex-col">
                        <span className="text-[10px] font-black text-[var(--app-text)] leading-tight mb-0.5">{row.details}</span>
                        <span className="text-[8px] font-bold text-[var(--app-text)]/40 tracking-tighter truncate max-w-[80px]">({row.id})</span>
                      </div>
                    </td>
                    <td className="py-4 pr-1 text-right align-top text-[10px] font-black text-[var(--app-text)]">{row.credited}</td>
                    <td className="py-4 pr-1 text-right align-top text-[10px] font-black text-[var(--app-text)]">{row.debited}</td>
                    <td className="py-4 text-right align-top text-[10px] font-black text-[var(--app-text)]">{row.balance}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
