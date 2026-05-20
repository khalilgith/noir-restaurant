'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import AnimatedSection from '@/components/ui/AnimatedSection';
import { testimonials } from '@/lib/data';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';

export default function Testimonials() {
  const [current, setCurrent] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const start = () => {
    intervalRef.current = setInterval(() => {
      setCurrent((p) => (p + 1) % testimonials.length);
    }, 6000);
  };

  useEffect(() => {
    start();
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, []);

  const go = (dir: number) => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    setCurrent((p) => (p + dir + testimonials.length) % testimonials.length);
    start();
  };

  const t = testimonials[current];

  return (
    <section className="relative py-20 md:py-32 bg-[#0A0A0A] text-white overflow-hidden">
      <div className="absolute inset-0 grain-overlay opacity-15" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#C8A97E]/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-[1440px] mx-auto px-5 md:px-10 lg:px-16">
        <AnimatedSection className="text-center mb-16">
          <span className="text-[#C8A97E] text-xs tracking-[0.3em] uppercase">Testimonials</span>
          <h2
            className="text-3xl sm:text-4xl md:text-5xl lg:text-[62px] font-medium leading-[1] mt-4"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            Guest Voices
          </h2>
        </AnimatedSection>

        <div className="relative max-w-3xl mx-auto">
          {/* Quote icon */}
          <Quote size={48} className="text-[#C8A97E]/10 absolute -top-4 left-0 md:-left-8" />

          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="text-center"
            >
              <div className="flex items-center justify-center gap-1 mb-6">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    size={14}
                    className={i < t.rating ? 'text-[#C8A97E] fill-[#C8A97E]' : 'text-white/20'}
                  />
                ))}
              </div>

              <p
                className="text-lg md:text-xl lg:text-2xl font-light leading-relaxed text-white/80 mb-8 italic"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                &ldquo;{t.content}&rdquo;
              </p>

              <div className="flex flex-col items-center gap-3">
                <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-[#C8A97E]/30">
                  <Image
                    src={t.avatar}
                    alt={t.name}
                    width={48}
                    height={48}
                    className="object-cover w-full h-full"
                  />
                </div>
                <div>
                  <div className="text-sm font-medium">{t.name}</div>
                  <div className="text-xs text-white/40">{t.role}</div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-4 mt-10">
            <button
              onClick={() => go(-1)}
              className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-white/5 transition-colors"
              aria-label="Previous"
            >
              <ChevronLeft size={16} className="text-white/60" />
            </button>
            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => {
                    if (intervalRef.current) clearInterval(intervalRef.current);
                    setCurrent(i);
                    start();
                  }}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    i === current ? 'bg-[#C8A97E] w-6' : 'bg-white/20 hover:bg-white/40'
                  }`}
                  aria-label={`Go to testimonial ${i + 1}`}
                />
              ))}
            </div>
            <button
              onClick={() => go(1)}
              className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-white/5 transition-colors"
              aria-label="Next"
            >
              <ChevronRight size={16} className="text-white/60" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
