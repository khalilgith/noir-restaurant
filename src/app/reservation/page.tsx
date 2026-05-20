'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import AnimatedSection from '@/components/ui/AnimatedSection';
import { Input, Textarea, Select } from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import { availableTimes, occasions } from '@/lib/data';
import { generateId } from '@/lib/utils';
import { Calendar, Clock, Users, ChevronLeft, ChevronRight, Check } from 'lucide-react';

const today = new Date();
const maxDate = new Date(today);
maxDate.setMonth(maxDate.getMonth() + 3);

function getDaysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate();
}

function getMonthDays(year: number, month: number) {
  const days: (number | null)[] = [];
  const firstDay = new Date(year, month, 1).getDay();
  const total = getDaysInMonth(year, month);
  for (let i = 0; i < firstDay; i++) days.push(null);
  for (let d = 1; d <= total; d++) days.push(d);
  return days;
}

export default function ReservationPage() {
  const [step, setStep] = useState(1);
  const [calendarDate, setCalendarDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState('');
  const [guests, setGuests] = useState(2);
  const [occasion, setOccasion] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [notes, setNotes] = useState('');
  const [confirmed, setConfirmed] = useState(false);
  const [bookingId, setBookingId] = useState('');

  const year = calendarDate.getFullYear();
  const month = calendarDate.getMonth();
  const monthDays = getMonthDays(year, month);
  const monthName = calendarDate.toLocaleString('default', { month: 'long', year: 'numeric' });

  const isDateDisabled = (d: number) => {
    const date = new Date(year, month, d);
    const day = date.getDay();
    if (day === 1) return true;
    date.setHours(0, 0, 0, 0);
    return date < new Date(today.getFullYear(), today.getMonth(), today.getDate()) || date > maxDate;
  };

  const handleConfirm = () => {
    setBookingId(generateId().toUpperCase());
    setConfirmed(true);
  };

  if (confirmed) {
    return (
      <main className="min-h-screen bg-[#0C0A08] pt-32">
        <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-16">
          <AnimatedSection>
            <div className="max-w-lg mx-auto text-center py-20">
              <div className="w-16 h-16 mx-auto mb-6 bg-[#D4A574] flex items-center justify-center">
                <Check size={28} className="text-[#0C0A08]" />
              </div>
              <h1 className="font-[family-name:var(--font-display)] text-3xl md:text-4xl text-white">
                Reservation Confirmed
              </h1>
              <p className="mt-4 text-sm text-white/40">
                Your table at NOIR has been reserved. A confirmation has been sent to your email.
              </p>
              <div className="mt-8 inline-flex items-center gap-2 bg-white/[0.03] border border-white/[0.06] px-6 py-3">
                <span className="text-[10px] tracking-[0.2em] uppercase text-white/30">Booking ID:</span>
                <span className="text-sm text-[#D4A574] font-mono tracking-wider">{bookingId}</span>
              </div>
              {selectedDate && (
                <p className="mt-4 text-xs text-white/30">
                  {selectedDate.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
                  {' at '}{selectedTime} · {guests} guest{guests > 1 ? 's' : ''}
                </p>
              )}
            </div>
          </AnimatedSection>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#0C0A08]">
      <section className="relative pt-32 pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#D4A574]/[0.02] to-transparent" />
        <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-16">
          <AnimatedSection>
            <span className="text-[10px] tracking-[0.3em] uppercase text-[#D4A574]/60">
              Reservations
            </span>
            <h1 className="mt-4 font-[family-name:var(--font-display)] text-4xl sm:text-5xl md:text-6xl lg:text-[85px] leading-[0.9] text-white">
              Book Your <span className="text-gradient">Table</span>
            </h1>
            <p className="mt-4 text-sm text-white/30 max-w-md font-light">
              Reserve your experience at NOIR. We look forward to hosting you.
            </p>
          </AnimatedSection>
        </div>
      </section>

      <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-16 pb-24">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center gap-3 mb-12">
            {[1, 2, 3].map((s) => (
              <div key={s} className="flex items-center gap-3 flex-1">
                <div className={`w-8 h-8 flex items-center justify-center text-xs ${
                  step >= s ? 'bg-[#D4A574] text-[#0C0A08]' : 'bg-white/[0.03] text-white/30 border border-white/10'
                }`}>
                  {step > s ? <Check size={14} /> : s}
                </div>
                {s < 3 && (
                  <div className={`flex-1 h-[1px] ${step > s ? 'bg-[#D4A574]/50' : 'bg-white/[0.06]'}`} />
                )}
              </div>
            ))}
          </div>

          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div key="step1" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-lg font-medium text-white">Select Date & Time</h2>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => setCalendarDate(new Date(year, month - 1))}
                      className="w-8 h-8 flex items-center justify-center text-white/30 hover:text-white transition-colors"
                    >
                      <ChevronLeft size={16} />
                    </button>
                    <span className="text-xs text-white/60 w-32 text-center">{monthName}</span>
                    <button
                      onClick={() => setCalendarDate(new Date(year, month + 1))}
                      className="w-8 h-8 flex items-center justify-center text-white/30 hover:text-white transition-colors"
                    >
                      <ChevronRight size={16} />
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-7 gap-1 mb-2">
                  {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((d) => (
                    <div key={d} className="text-center text-[10px] tracking-[0.1em] uppercase text-white/20 py-2">
                      {d}
                    </div>
                  ))}
                </div>
                <div className="grid grid-cols-7 gap-1 mb-8">
                  {monthDays.map((d, i) => {
                    if (d === null) return <div key={`e-${i}`} />;
                    const disabled = isDateDisabled(d);
                    const dateObj = new Date(year, month, d);
                    const isSelected = selectedDate && dateObj.toDateString() === selectedDate.toDateString();
                    return (
                      <button
                        key={d}
                        disabled={disabled}
                        onClick={() => setSelectedDate(dateObj)}
                        className={`h-10 text-xs transition-all duration-300 ${
                          isSelected
                            ? 'bg-[#D4A574] text-[#0C0A08]'
                            : disabled
                              ? 'text-white/10 cursor-not-allowed'
                              : 'text-white/40 hover:bg-white/[0.04] hover:text-white/60'
                        }`}
                      >
                        {d}
                      </button>
                    );
                  })}
                </div>

                {selectedDate && (
                  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                    <h3 className="text-xs tracking-[0.15em] uppercase text-white/40 mb-4 flex items-center gap-2">
                      <Clock size={12} /> Available Times
                    </h3>
                    <div className="grid grid-cols-4 sm:grid-cols-5 gap-2 mb-8">
                      {availableTimes.map((t) => (
                        <button
                          key={t}
                          onClick={() => setSelectedTime(t)}
                          className={`py-2.5 text-xs transition-all duration-300 ${
                            selectedTime === t
                              ? 'bg-[#D4A574] text-[#0C0A08]'
                              : 'bg-white/[0.03] text-white/40 border border-white/10 hover:border-white/20'
                          }`}
                        >
                          {t}
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}

                <div className="flex justify-end">
                  <Button
                    onClick={() => setStep(2)}
                    disabled={!selectedDate || !selectedTime}
                  >
                    Continue
                  </Button>
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div key="step2" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
                <h2 className="text-lg font-medium text-white mb-6 flex items-center gap-2">
                  <Users size={16} className="text-[#D4A574]" /> Guests & Occasion
                </h2>

                <div className="mb-8">
                  <label className="text-[11px] tracking-[0.15em] uppercase text-white/40 mb-3 block">
                    Number of Guests
                  </label>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => setGuests(Math.max(1, guests - 1))}
                      className="w-10 h-10 bg-white/[0.03] border border-white/10 flex items-center justify-center text-white/60 hover:border-white/20 transition-colors"
                    >
                      −
                    </button>
                    <span className="w-12 text-center text-lg text-white font-medium">{guests}</span>
                    <button
                      onClick={() => setGuests(Math.min(12, guests + 1))}
                      className="w-10 h-10 bg-white/[0.03] border border-white/10 flex items-center justify-center text-white/60 hover:border-white/20 transition-colors"
                    >
                      +
                    </button>
                  </div>
                </div>

                <div className="mb-8">
                  <Select
                    label="Occasion (optional)"
                    value={occasion}
                    onChange={(e) => setOccasion(e.target.value)}
                    options={occasions}
                  />
                </div>

                <div className="flex justify-between">
                  <Button variant="ghost" onClick={() => setStep(1)}>
                    Back
                  </Button>
                  <Button onClick={() => setStep(3)}>
                    Continue
                  </Button>
                </div>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div key="step3" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
                <h2 className="text-lg font-medium text-white mb-6">Your Details</h2>

                <div className="space-y-4 mb-8">
                  <Input label="Full Name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Your name" />
                  <Input label="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="your@email.com" />
                  <Input label="Phone" type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+33 6 12 34 56 78" />
                  <Textarea label="Special Requests (optional)" value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="Allergies, preferences, celebration notes..." />
                </div>

                {selectedDate && selectedTime && (
                  <div className="bg-white/[0.02] border border-white/[0.04] p-4 mb-8">
                    <h4 className="text-[10px] tracking-[0.2em] uppercase text-white/40 mb-3">Summary</h4>
                    <div className="grid grid-cols-2 gap-3 text-xs">
                      <div>
                        <span className="text-white/30">Date</span>
                        <p className="text-white mt-0.5">{selectedDate.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}</p>
                      </div>
                      <div>
                        <span className="text-white/30">Time</span>
                        <p className="text-white mt-0.5">{selectedTime}</p>
                      </div>
                      <div>
                        <span className="text-white/30">Guests</span>
                        <p className="text-white mt-0.5">{guests}</p>
                      </div>
                      <div>
                        <span className="text-white/30">Occasion</span>
                        <p className="text-white mt-0.5">{occasion || 'None specified'}</p>
                      </div>
                    </div>
                  </div>
                )}

                <div className="flex justify-between">
                  <Button variant="ghost" onClick={() => setStep(2)}>
                    Back
                  </Button>
                  <Button
                    onClick={handleConfirm}
                    disabled={!name || !email}
                  >
                    Confirm Reservation
                  </Button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </main>
  );
}
