'use client';

import Image from 'next/image';
import AnimatedSection from '@/components/ui/AnimatedSection';

const stats = [
  { number: '15+', label: 'Years of Excellence' },
  { number: '2', label: 'Michelin Stars' },
  { number: '500+', label: 'Wine Labels' },
  { number: '1', label: 'Unforgettable Experience' },
];

export default function Story() {
  return (
    <section className="relative py-24 md:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/[0.01] to-transparent" />

      <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-16 items-center">
          <AnimatedSection>
            <div className="relative">
              <div className="relative h-[400px] md:h-[500px] overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&q=80"
                  alt="NOIR Restaurant interior"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-transparent to-transparent" />
              </div>
              <div className="absolute -bottom-8 -right-8 w-48 md:w-64 h-48 md:h-64 bg-[#C8A97E]/5 border border-[#C8A97E]/10 p-6 md:p-8 hidden md:flex flex-col justify-center">
                <p className="font-[family-name:var(--font-display)] text-4xl text-[#C8A97E]">2009</p>
                <p className="text-[10px] tracking-[0.15em] uppercase text-white/30 mt-2">
                  Founded in Paris
                </p>
              </div>
            </div>
          </AnimatedSection>

          <AnimatedSection delay={0.15}>
            <span className="text-[10px] tracking-[0.3em] uppercase text-[#C8A97E]/60">
              Our Story
            </span>
            <h2 className="mt-4 font-[family-name:var(--font-display)] text-3xl md:text-5xl lg:text-[62px] leading-[1.1] text-white">
              Where Passion<br />
              <span className="text-gradient">Meets Precision</span>
            </h2>
            <p className="mt-6 text-sm text-white/35 leading-relaxed font-light">
              Founded in 2009 by Chef Laurent Moreau, NOIR was born from a singular vision:
              to create a dining experience that transcends the ordinary. Nestled in the heart
              of Paris, our restaurant is a sanctuary for those who appreciate the art of fine
              gastronomy.
            </p>
            <p className="mt-4 text-sm text-white/35 leading-relaxed font-light">
              Every ingredient is sourced with intention, every plate composed with precision,
              and every detail — from the lighting to the service — calibrated to transport
              our guests into a world of sensory elegance.
            </p>
            <div className="mt-8 w-12 h-[1px] bg-[#C8A97E]/40" />
            <p className="mt-4 text-xs italic text-white/30">
              &ldquo;Cooking is not about convenience — it&apos;s about respect for the ingredient.&rdquo;
            </p>
            <p className="text-[10px] tracking-[0.15em] uppercase text-white/20 mt-2">
              — Chef Laurent Moreau
            </p>
          </AnimatedSection>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-white/[0.04] mt-24">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="bg-[#0A0A0A] py-10 md:py-14 text-center"
            >
              <p className="font-[family-name:var(--font-display)] text-3xl md:text-4xl text-[#C8A97E]">
                {stat.number}
              </p>
              <p className="text-[10px] tracking-[0.15em] uppercase text-white/25 mt-2">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
