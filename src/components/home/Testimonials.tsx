'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import AnimatedSection from '@/components/ui/AnimatedSection';
import { testimonials } from '@/lib/data';

export default function Testimonials() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <AnimatedSection className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-16 py-24 md:py-32">
      <div className="text-center mb-16">
        <span className="text-[10px] tracking-[0.3em] uppercase text-[#D4A574]/60">
          Guest Reflections
        </span>
        <h2 className="mt-4 font-[family-name:var(--font-display)] text-3xl md:text-5xl lg:text-[62px] leading-[1.1] text-white">
          Voices of <span className="text-gradient">NOIR</span>
        </h2>
      </div>

      <div className="relative max-w-3xl mx-auto">
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="text-center"
          >
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-[#D4A574]/20">
                <Image
                  src={testimonials[current].avatar}
                  alt={testimonials[current].name}
                  width={64}
                  height={64}
                  className="object-cover w-full h-full"
                />
              </div>
            </div>
            <p className="text-lg md:text-xl text-white/70 leading-relaxed font-light italic">
              &ldquo;{testimonials[current].content}&rdquo;
            </p>
            <div className="mt-6">
              <p className="text-sm font-medium text-white">
                {testimonials[current].name}
              </p>
              <p className="text-[10px] tracking-[0.15em] uppercase text-white/30 mt-1">
                {testimonials[current].role}
              </p>
            </div>
          </motion.div>
        </AnimatePresence>

        <div className="flex justify-center gap-2 mt-10">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`transition-all duration-500 ${
                i === current
                  ? 'w-8 h-[2px] bg-[#D4A574]'
                  : 'w-4 h-[2px] bg-white/10 hover:bg-white/20'
              }`}
              aria-label={`Testimonial ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </AnimatedSection>
  );
}
