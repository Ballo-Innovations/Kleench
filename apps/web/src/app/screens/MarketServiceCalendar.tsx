import { useState } from "react";
import { useNavigate, useLocation, useParams } from "react-router";
import { motion } from "motion/react";
import { ChevronLeft, ChevronRight, Clock, Users, ArrowRight } from "lucide-react";
import { PageHeader } from "../components/PageHeader";

const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const TIMES = ["08:00", "09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00"];
const BOOKED = [5, 12, 19, 22];

function getDaysInMonth(month: number, year: number) {
  return new Date(year, month + 1, 0).getDate();
}
function getFirstDayOfMonth(month: number, year: number) {
  return new Date(year, month, 1).getDay();
}

export function MarketServiceCalendar() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { state } = useLocation();

  const today = new Date();
  const [month, setMonth] = useState(today.getMonth());
  const [year, setYear] = useState(today.getFullYear());
  const [selectedDate, setSelectedDate] = useState<number | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [guests, setGuests] = useState("1");

  const daysInMonth = getDaysInMonth(month, year);
  const firstDay = getFirstDayOfMonth(month, year);

  const prevMonth = () => {
    if (month === 0) { setMonth(11); setYear((y) => y - 1); }
    else setMonth((m) => m - 1);
    setSelectedDate(null);
  };
  const nextMonth = () => {
    if (month === 11) { setMonth(0); setYear((y) => y + 1); }
    else setMonth((m) => m + 1);
    setSelectedDate(null);
  };

  const canContinue = selectedDate && selectedTime;

  return (
    <div className="w-full max-w-md mx-auto min-h-screen bg-transparent font-sans pb-32">
      <PageHeader title="AVAILABILITY" showBack />

      <div className="px-5 pt-5 space-y-5">
        <div className="bg-[var(--app-bg)] rounded-3xl border-[3px] border-[var(--app-text)] shadow-[6px_6px_0_var(--app-text)] p-5">
          <div className="flex items-center justify-between mb-5">
            <button onClick={prevMonth} className="w-9 h-9 rounded-xl border-2 border-[var(--border)] flex items-center justify-center active:scale-90 transition-all">
              <ChevronLeft size={16} className="text-[var(--color-secondary)]" strokeWidth={2.5} />
            </button>
            <p className="text-[13px] font-black text-[var(--app-text)] uppercase tracking-wider">
              {MONTHS[month]} {year}
            </p>
            <button onClick={nextMonth} className="w-9 h-9 rounded-xl border-2 border-[var(--border)] flex items-center justify-center active:scale-90 transition-all">
              <ChevronRight size={16} className="text-[var(--color-secondary)]" strokeWidth={2.5} />
            </button>
          </div>

          <div className="grid grid-cols-7 gap-1 mb-2">
            {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((d) => (
              <div key={d} className="flex items-center justify-center h-8">
                <span className="text-[9px] font-black uppercase tracking-wide text-[var(--color-secondary)]/40">{d}</span>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-1">
            {Array.from({ length: firstDay }).map((_, i) => <div key={`empty-${i}`} />)}
            {Array.from({ length: daysInMonth }).map((_, i) => {
              const day = i + 1;
              const isPast = new Date(year, month, day) < today;
              const isBooked = BOOKED.includes(day);
              const isSelected = selectedDate === day;
              return (
                <motion.button
                  key={day}
                  whileTap={isPast || isBooked ? {} : { scale: 0.9 }}
                  onClick={() => !isPast && !isBooked && setSelectedDate(day)}
                  disabled={isPast || isBooked}
                  className={`h-9 w-full rounded-xl text-[12px] font-black transition-all ${
                    isSelected ? "bg-[var(--color-secondary)] text-white shadow-md"
                    : isBooked ? "bg-[#DC2626]/10 text-[#DC2626]/40 cursor-not-allowed"
                    : isPast ? "text-[var(--color-secondary)]/25 cursor-not-allowed"
                    : "text-[var(--app-text)] hover:bg-[var(--color-primary)]/10"
                  }`}
                >
                  {day}
                </motion.button>
              );
            })}
          </div>

          <div className="flex items-center gap-3 mt-4 pt-3 border-t border-[var(--border)]">
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded-full bg-[var(--color-secondary)]" />
              <span className="text-[9px] font-black uppercase tracking-wide text-[var(--color-secondary)]/50">Selected</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded-full bg-[#DC2626]/20" />
              <span className="text-[9px] font-black uppercase tracking-wide text-[var(--color-secondary)]/50">Booked</span>
            </div>
          </div>
        </div>

        {selectedDate && (
          <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
            className="bg-[var(--app-bg)] rounded-3xl border-[3px] border-[var(--app-text)] shadow-[6px_6px_0_var(--app-text)] p-5 space-y-3">
            <div className="flex items-center gap-2">
              <Clock size={14} className="text-[var(--color-primary)]" strokeWidth={2.5} />
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[var(--color-secondary)]/50">Select Time</p>
            </div>
            <div className="flex flex-wrap gap-2">
              {TIMES.map((t) => (
                <button key={t} onClick={() => setSelectedTime(t)}
                  className={`px-3 py-2 rounded-xl border-2 text-[10px] font-black uppercase tracking-wide transition-all ${selectedTime === t ? "border-[var(--color-primary)] bg-[var(--color-primary)]/10 text-[var(--color-primary)]" : "border-[var(--border)] text-[var(--color-secondary)]/60"}`}>
                  {t}
                </button>
              ))}
            </div>
          </motion.div>
        )}

        <div className="bg-[var(--app-bg)] rounded-3xl border-[3px] border-[var(--app-text)] shadow-[6px_6px_0_var(--app-text)] p-5">
          <div className="flex items-center gap-2 mb-3">
            <Users size={14} className="text-[var(--color-secondary)]" strokeWidth={2} />
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[var(--color-secondary)]/50">Guest Count</p>
          </div>
          <div className="flex items-center gap-4">
            <button onClick={() => setGuests((g) => String(Math.max(1, parseInt(g) - 1)))}
              className="w-10 h-10 rounded-xl border-2 border-[var(--border)] flex items-center justify-center text-[var(--color-secondary)] active:scale-90 text-lg font-black">−</button>
            <span className="flex-1 text-center text-[20px] font-black text-[var(--app-text)]">{guests}</span>
            <button onClick={() => setGuests((g) => String(parseInt(g) + 1))}
              className="w-10 h-10 rounded-xl border-2 border-[var(--border)] flex items-center justify-center text-[var(--color-secondary)] active:scale-90 text-lg font-black">+</button>
          </div>
        </div>
      </div>

      <div className="px-5 pt-4 pb-8">
        <button
          onClick={() => navigate(`/marketplace/service/${id}/inquiry`, {
            state: { ...state, booking: { date: `${MONTHS[month]} ${selectedDate}, ${year}`, time: selectedTime, guests } }
          })}
          disabled={!canContinue}
          className="w-full py-4 rounded-2xl bg-[var(--color-secondary)] text-white font-black uppercase tracking-widest text-[12px] flex items-center justify-center gap-3 disabled:opacity-40 disabled:cursor-not-allowed active:scale-95 transition-all"
        >
          Check Availability <ArrowRight size={18} />
        </button>
      </div>
    </div>
  );
}
