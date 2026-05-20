'use client';

import Link from 'next/link';
import AnimatedSection from '@/components/ui/AnimatedSection';
import { Calendar, Clock, Award } from 'lucide-react';

const features = [
  { icon: Calendar, label: 'Reserve Online', desc: 'Book your table in seconds' },
  { icon: Clock, label: 'Flexible Hours', desc: 'Lunch & dinner service' },
  { icon: Award, label: 'Private Events', desc: 'Exclusive dining experiences' },
];

export default function ReservationCTA() {
  return (
    <AnimatedSection className="relative py-24 md:py-32 overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center bg-fixed"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1920&q=80')`,
        }}
      >
        <div className="absolute inset-0 bg-[#0A0A0A]/80 backdrop-blur-sm" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0A0A0A] via-transparent to-[#0A0A0A]" />
      </div>

      <div className="relative z-10 max-w-[1440px] mx-auto px-6 md:px-10 lg:px-16">
        <div className="max-w-2xl">
          <span className="text-[10px] tracking-[0.3em] uppercase text-[#C8A97E]/60">
            Reserve Your Experience
          </span>
          <h2 className="mt-4 font-[family-name:var(--font-display)] text-3xl md:text-5xl lg:text-[62px] leading-[1.1] text-white">
            Claim Your<br />
            <span className="text-gradient">Table</span>
          </h2>
          <p className="mt-4 text-sm text-white/35 max-w-md leading-relaxed font-light">
            An evening at NOIR is more than a meal — it&apos;s an experience.
            Secure your reservation and let us craft an unforgettable night.
          </p>

          <div className="mt-8 flex flex-wrap gap-8">
            {features.map((f) => (
              <div key={f.label} className="flex items-center gap-3">
                <div className="w-10 h-10 border border-white/10 flex items-center justify-center">
                  <f.icon size={16} className="text-[#C8A97E]" />
                </div>
                <div>
                  <p className="text-xs font-medium text-white">{f.label}</p>
                  <p className="text-[10px] text-white/30">{f.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <Link
            href="/reservation"
            className="mt-10 inline-flex px-10 py-4 text-xs tracking-[0.2em] uppercase bg-[#C8A97E] text-[#0A0A0A] hover:bg-[#E8D5B5] transition-all duration-500"
          >
            Make a Reservation
          </Link>
        </div>
      </div>
    </AnimatedSection>
  );
}
