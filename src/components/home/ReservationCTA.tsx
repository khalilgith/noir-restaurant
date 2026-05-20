'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import AnimatedSection from '@/components/ui/AnimatedSection';
import { Calendar, Clock, Users } from 'lucide-react';

export default function ReservationCTA() {
  return (
    <section className="relative py-20 md:py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <div
          className="absolute inset-0 bg-cover bg-center bg-fixed"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1920&q=80')`,
          }}
        />
        <div className="absolute inset-0 bg-black/75 backdrop-blur-sm" />
        <div className="absolute inset-0 grain-overlay opacity-20" />
      </div>

      <div className="relative z-10 max-w-[1440px] mx-auto px-5 md:px-10 lg:px-16">
        <div className="max-w-2xl mx-auto text-center">
          <AnimatedSection>
            <span className="text-[#33A1E0] text-xs tracking-[0.3em] uppercase">Experience</span>
            <h2
              className="text-3xl sm:text-4xl md:text-5xl lg:text-[62px] text-white font-medium leading-[1] mt-4 mb-6"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              Your Table
              <br />
              <span className="text-gradient-gold">Awaits</span>
            </h2>
            <p className="text-white/50 text-sm max-w-md mx-auto mb-10 leading-relaxed">
              Reserve your place for an unforgettable evening. Whether an intimate dinner for two or a grand celebration, we curate every detail.
            </p>
          </AnimatedSection>

          <AnimatedSection delay={0.2}>
            <div className="grid grid-cols-3 gap-4 mb-10 max-w-sm mx-auto">
              {[
                { icon: Calendar, label: 'Any Evening' },
                { icon: Clock, label: '5 PM – 12 AM' },
                { icon: Users, label: '2 – 20 Guests' },
              ].map(({ icon: Icon, label }) => (
                <div key={label} className="flex flex-col items-center gap-2">
                  <div className="w-12 h-12 rounded-full border border-[#33A1E0]/30 flex items-center justify-center">
                    <Icon size={18} className="text-[#33A1E0]" />
                  </div>
                  <span className="text-[10px] text-white/40 tracking-wider uppercase">{label}</span>
                </div>
              ))}
            </div>
          </AnimatedSection>

          <AnimatedSection delay={0.4}>
            <Link href="/reservation">
              <motion.span
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center px-10 py-4 text-sm tracking-wider uppercase bg-gradient-to-r from-[#33A1E0] to-[#154D71] text-white rounded-full shadow-[0_4px_20px_rgba(51,161,224,0.35)] hover:shadow-[0_8px_30px_rgba(51,161,224,0.45)] transition-shadow duration-300"
              >
                Make a Reservation
              </motion.span>
            </Link>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}
