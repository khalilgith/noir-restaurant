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

function CalendarWidget({ selected, onChange }: { selected: Date | null; onChange: (d: Date) => void }) {
  const [viewDate, setViewDate] = useState(new Date());
  const year = viewDate.getFullYear();
  const month = viewDate.getMonth();
  const daysInMonth = getDaysInMonth(year, month);
  const firstDay = new Date(year, month, 1).getDay();

  const prev = () => setViewDate(new Date(year, month - 1, 1));
  const next = () => setViewDate(new Date(year, month + 1, 1));

  const isPast = (day: number) => {
    const d = new Date(year, month, day);
    d.setHours(23, 59, 59, 999);
    return d < today;
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <button onClick={prev} className="w-8 h-8 rounded-full hover:bg-white/5 flex items-center justify-center transition-colors">
          <ChevronLeft size={16} className="text-white/60" />
        </button>
        <span className="text-sm text-white font-medium">
          {viewDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
        </span>
        <button onClick={next} className="w-8 h-8 rounded-full hover:bg-white/5 flex items-center justify-center transition-colors">
          <ChevronRight size={16} className="text-white/60" />
        </button>
      </div>

      <div className="grid grid-cols-7 gap-1 mb-2">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((d) => (
          <div key={d} className="text-[10px] text-white/30 text-center py-1 uppercase tracking-wider">{d}</div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1">
        {Array.from({ length: firstDay }).map((_, i) => (
          <div key={`empty-${i}`} />
        ))}
        {Array.from({ length: daysInMonth }).map((_, i) => {
          const day = i + 1;
          const past = isPast(day);
          const isSelected =
            selected &&
            selected.getDate() === day &&
            selected.getMonth() === month &&
            selected.getFullYear() === year;
          return (
            <button
              key={day}
              disabled={past}
              onClick={() => onChange(new Date(year, month, day))}
              className={`w-full aspect-square rounded-full text-xs flex items-center justify-center transition-all duration-200 ${
                isSelected
                  ? 'bg-gradient-to-br from-[#C8A97E] to-[#A68B5B] text-white'
                  : past
                  ? 'text-white/10 cursor-not-allowed'
                  : 'text-white/60 hover:bg-white/10 hover:text-white'
              }`}
            >
              {day}
            </button>
          );
        })}
      </div>
    </div>
  );
}

interface FormData {
  name: string;
  email: string;
  phone: string;
  date: Date | null;
  time: string;
  guests: number;
  occasion: string;
  specialRequests: string;
}

export default function ReservationPage() {
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    date: null,
    time: '',
    guests: 2,
    occasion: '',
    specialRequests: '',
  });

  const update = (key: keyof FormData, value: any) => setForm((p) => ({ ...p, [key]: value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <main className="pt-24 md:pt-28 bg-[var(--background)] min-h-screen flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center max-w-md px-5"
        >
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#C8A97E] to-[#A68B5B] flex items-center justify-center mx-auto mb-6">
            <Check size={28} className="text-white" />
          </div>
          <h2 className="text-3xl font-medium mb-3" style={{ fontFamily: 'var(--font-display)' }}>
            Reservation Confirmed
          </h2>
          <p className="text-[var(--foreground)]/40 text-sm mb-6 leading-relaxed">
            Thank you, {form.name}! We&apos;re excited to welcome you on{' '}
            {form.date?.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })} at{' '}
            {form.time} for {form.guests} {form.guests === 1 ? 'guest' : 'guests'}.
          </p>
          <p className="text-[var(--foreground)]/30 text-xs">
            A confirmation has been sent to {form.email}. Please arrive 15 minutes before your reservation time.
          </p>
        </motion.div>
      </main>
    );
  }

  const progress = (step / 3) * 100;

  return (
    <main className="pt-24 md:pt-28 bg-[var(--background)] min-h-screen">
      {/* Header */}
      <section className="relative pb-8">
        <div className="absolute inset-0 bg-gradient-to-b from-[#C8A97E]/5 to-transparent pointer-events-none" />
        <div className="max-w-[1440px] mx-auto px-5 md:px-10 lg:px-16">
          <AnimatedSection>
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-[85px] font-medium leading-[0.9] text-gradient-gold" style={{ fontFamily: 'var(--font-display)' }}>
              Reserve
            </h1>
            <p className="text-[var(--foreground)]/40 text-sm max-w-md mt-4">
              Book your table at NOIR. We look forward to hosting you for an unforgettable evening.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Progress bar */}
      <div className="max-w-[1440px] mx-auto px-5 md:px-10 lg:px-16 mb-8">
        <div className="w-full h-[2px] bg-[var(--glass-light)] rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-[#C8A97E] to-[#A68B5B]"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.4 }}
          />
        </div>
        <div className="flex justify-between mt-2 text-[10px] text-[var(--foreground)]/30 uppercase tracking-wider">
          <span className={step >= 1 ? 'text-[#C8A97E]' : ''}>Date & Time</span>
          <span className={step >= 2 ? 'text-[#C8A97E]' : ''}>Details</span>
          <span className={step >= 3 ? 'text-[#C8A97E]' : ''}>Confirm</span>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-5 md:px-10 lg:px-16 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Calendar & Time */}
          <div>
            <AnimatedSection key={`step-${step}`} direction="left">
              {step === 1 && (
                <div className="space-y-8">
                  <CalendarWidget selected={form.date} onChange={(d) => update('date', d)} />
                  {form.date && (
                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                      <h4 className="text-xs font-medium text-white/60 mb-3 flex items-center gap-2">
                        <Clock size={14} /> Available Times
                      </h4>
                      <div className="grid grid-cols-4 gap-2">
                        {availableTimes.map((t) => (
                          <button
                            key={t}
                            onClick={() => update('time', t)}
                            className={`py-2 text-xs rounded-lg border transition-all ${
                              form.time === t
                                ? 'border-[#C8A97E] bg-[#C8A97E]/10 text-[#C8A97E]'
                                : 'border-white/10 text-white/50 hover:border-white/20'
                            }`}
                          >
                            {t}
                          </button>
                        ))}
                      </div>
                    </motion.div>
                  )}
                  {!form.date && (
                    <p className="text-xs text-white/30 text-center">Please select a date to see available times.</p>
                  )}
                </div>
              )}

              {step === 2 && (
                <div className="space-y-6" style={{ maxWidth: 400 }}>
                  <Input
                    label="Full Name"
                    value={form.name}
                    onChange={(e) => update('name', e.target.value)}
                    placeholder="Your name"
                    required
                  />
                  <Input
                    label="Email"
                    type="email"
                    value={form.email}
                    onChange={(e) => update('email', e.target.value)}
                    placeholder="your@email.com"
                    required
                  />
                  <Input
                    label="Phone"
                    type="tel"
                    value={form.phone}
                    onChange={(e) => update('phone', e.target.value)}
                    placeholder="+1 234 567 890"
                    required
                  />
                  <div>
                    <label className="text-xs font-medium text-white/70 mb-1.5 block">Number of Guests</label>
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => update('guests', Math.max(1, form.guests - 1))}
                        className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white/60 hover:border-white/30 transition-colors"
                      >
                        –
                      </button>
                      <span className="text-lg font-medium text-white w-8 text-center">{form.guests}</span>
                      <button
                        onClick={() => update('guests', Math.min(20, form.guests + 1))}
                        className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white/60 hover:border-white/30 transition-colors"
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <Select
                    label="Occasion (Optional)"
                    value={form.occasion}
                    onChange={(e) => update('occasion', e.target.value)}
                    options={[
                      { value: '', label: 'Select occasion...' },
                      ...occasions.map((o) => ({ value: o, label: o })),
                    ]}
                  />
                </div>
              )}

              {step === 3 && (
                <div className="space-y-6" style={{ maxWidth: 400 }}>
                  <h4 className="text-sm font-medium text-white">Review Your Reservation</h4>
                  <div className="space-y-4">
                    <div className="flex justify-between text-sm">
                      <span className="text-white/40">Date</span>
                      <span className="text-white">{form.date?.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-white/40">Time</span>
                      <span className="text-white">{form.time}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-white/40">Guests</span>
                      <span className="text-white">{form.guests}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-white/40">Name</span>
                      <span className="text-white">{form.name}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-white/40">Email</span>
                      <span className="text-white">{form.email}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-white/40">Phone</span>
                      <span className="text-white">{form.phone}</span>
                    </div>
                    {form.occasion && (
                      <div className="flex justify-between text-sm">
                        <span className="text-white/40">Occasion</span>
                        <span className="text-white">{form.occasion}</span>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </AnimatedSection>
          </div>

          {/* Buttons */}
          <div className="flex flex-col justify-end">
            <div className="space-y-4">
              {step > 1 && (
                <Button variant="ghost" onClick={() => setStep(step - 1)} size="md" className="!justify-start">
                  &larr; Back
                </Button>
              )}
              {step < 3 ? (
                <Button
                  variant="gold"
                  size="lg"
                  fullWidth
                  onClick={() => setStep(step + 1)}
                  disabled={
                    (step === 1 && (!form.date || !form.time)) ||
                    (step === 2 && (!form.name || !form.email))
                  }
                >
                  Continue
                </Button>
              ) : (
                <Button variant="gold" size="lg" fullWidth onClick={handleSubmit}>
                  Confirm Reservation
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
