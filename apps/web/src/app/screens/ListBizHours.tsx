import { useState } from "react";
import { useNavigate, useLocation } from "react-router";
import { Clock } from "lucide-react";
import { PageHeader } from "../components/PageHeader";
import { CtaButton } from "../components/CtaButton";

const STEPS = 6;
const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const TIMES = ["6:00 AM", "7:00 AM", "8:00 AM", "9:00 AM", "10:00 AM", "12:00 PM", "1:00 PM", "2:00 PM", "3:00 PM", "4:00 PM", "5:00 PM", "6:00 PM", "8:00 PM", "10:00 PM", "12:00 AM"];

export function ListBizHours() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const [days, setDays] = useState<string[]>(["Mon", "Tue", "Wed", "Thu", "Fri"]);
  const [openTime, setOpenTime] = useState("8:00 AM");
  const [closeTime, setCloseTime] = useState("5:00 PM");
  const [is24hrs, setIs24hrs] = useState(false);

  const toggleDay = (d: string) => setDays((p) => p.includes(d) ? p.filter((x) => x !== d) : [...p, d]);

  return (
    <div className="w-full max-w-md mx-auto bg-transparent font-sans pb-24">
      <PageHeader title="LIST YOUR BUSINESS" subtitle="Step 6 of 6 — Operating Hours" showBack />

      <div className="px-5 pt-5 space-y-5">
        <div className="flex gap-1.5">
          {Array.from({ length: STEPS }).map((_, i) => (
            <div key={i} className="h-1.5 flex-1 rounded-full bg-[var(--color-primary)]" />
          ))}
        </div>

        <div className="bg-[var(--app-bg)] border border-[var(--border)] rounded-2xl shadow-sm p-5 space-y-4">
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[var(--color-secondary)]/50">Open Days</p>
          <div className="flex gap-2 flex-wrap">
            {DAYS.map((d) => (
              <button key={d} onClick={() => toggleDay(d)}
                className={`w-12 h-12 rounded-xl border text-[11px] font-black uppercase tracking-wide transition-all ${days.includes(d) ? "border-[var(--color-primary)] bg-[var(--color-primary)]/10 text-[var(--color-primary)]" : "border-[var(--border)] text-[var(--color-secondary)]/50"}`}>
                {d}
              </button>
            ))}
          </div>
        </div>

        <div className="bg-[var(--app-bg)] border border-[var(--border)] rounded-2xl shadow-sm p-5 space-y-4">
          <div className="flex items-center justify-between">
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[var(--color-secondary)]/50">Operating Hours</p>
            <button onClick={() => setIs24hrs(!is24hrs)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-[9px] font-black uppercase tracking-wide transition-all ${is24hrs ? "border-[var(--color-primary)] bg-[var(--color-primary)]/10 text-[var(--color-primary)]" : "border-[var(--border)] text-[var(--color-secondary)]/50"}`}>
              <Clock size={9} strokeWidth={2.5} /> 24 Hours
            </button>
          </div>

          {!is24hrs && (
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-[10px] font-black uppercase tracking-wider text-[var(--color-secondary)]/60">Opens At</label>
                <select value={openTime} onChange={(e) => setOpenTime(e.target.value)}
                  className="w-full border border-[var(--border)] rounded-xl px-3 py-2.5 text-[12px] font-semibold text-[var(--app-text)] bg-[var(--app-bg)] outline-none focus:border-[var(--app-text)] transition-all">
                  {TIMES.map((t) => <option key={t} value={t}>{t}</option>)}
                </select>
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-black uppercase tracking-wider text-[var(--color-secondary)]/60">Closes At</label>
                <select value={closeTime} onChange={(e) => setCloseTime(e.target.value)}
                  className="w-full border border-[var(--border)] rounded-xl px-3 py-2.5 text-[12px] font-semibold text-[var(--app-text)] bg-[var(--app-bg)] outline-none focus:border-[var(--app-text)] transition-all">
                  {TIMES.map((t) => <option key={t} value={t}>{t}</option>)}
                </select>
              </div>
            </div>
          )}

          {is24hrs && (
            <div className="flex items-center gap-2 bg-[#059669]/10 border border-[#059669]/20 rounded-xl px-3 py-2.5">
              <div className="w-1.5 h-1.5 rounded-full bg-[#059669] animate-pulse" />
              <span className="text-[10px] font-black text-[#059669] uppercase tracking-widest">Open 24 Hours / 7 Days</span>
            </div>
          )}
        </div>
      </div>

      <div className="px-5 pt-4 pb-8">
        <CtaButton onClick={() => navigate("/marketplace/list/success", { state: { ...state, days, openTime: is24hrs ? "24hrs" : openTime, closeTime: is24hrs ? "24hrs" : closeTime, is24hrs } })} disabled={days.length === 0}>Publish Listing</CtaButton>
      </div>
    </div>
  );
}
