'use client';

import Image from 'next/image';
import AnimatedSection from '@/components/ui/AnimatedSection';

export default function Story() {
  return (
    <section className="relative py-20 md:py-32 bg-[#0A0A0A] text-white overflow-hidden">
      {/* Background texture */}
      <div className="absolute inset-0 grain-overlay opacity-20" />
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[400px] h-[400px] bg-[#C8A97E]/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-[1440px] mx-auto px-5 md:px-10 lg:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Image side */}
          <AnimatedSection direction="left" className="relative">
            <div className="relative aspect-[4/5] rounded-xl overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=800&q=80"
                alt="Chef preparing a dish"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
            </div>
            {/* Floating stat card */}
            <div className="absolute -bottom-6 -right-4 md:right-8 glass rounded-xl p-5 shadow-[0_8px_24px_rgba(0,0,0,0.3)]">
              <div className="text-3xl font-bold text-[#C8A97E]" style={{ fontFamily: 'var(--font-display)' }}>15+</div>
              <div className="text-xs text-white/50 mt-1">Years of Excellence</div>
            </div>
          </AnimatedSection>

          {/* Text side */}
          <div className="space-y-8">
            <AnimatedSection direction="right">
              <span className="text-[#C8A97E] text-xs tracking-[0.3em] uppercase">Our Story</span>
              <h2
                className="text-3xl sm:text-4xl md:text-5xl lg:text-[62px] font-medium leading-[1] mt-4"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                A Legacy of
                <br />
                <span className="text-gradient-gold">Culinary Art</span>
              </h2>
            </AnimatedSection>

            <AnimatedSection direction="right" delay={0.2}>
              <p className="text-white/50 text-sm leading-relaxed">
                Founded in 2019 by Chef Laurent Moreau, NOIR emerged from a vision to create a dining experience that transcends the ordinary. Drawing inspiration from French culinary traditions and modern innovation, every dish is crafted with meticulous attention to detail and an unwavering commitment to excellence.
              </p>
            </AnimatedSection>

            <AnimatedSection direction="right" delay={0.3}>
              <p className="text-white/50 text-sm leading-relaxed">
                Our kitchen is a theater of precision, where the finest seasonal ingredients from local artisans and global purveyors are transformed into edible poetry. The name NOIR reflects our philosophy: finding beauty in depth, sophistication in simplicity, and light in darkness.
              </p>
            </AnimatedSection>

            <AnimatedSection direction="right" delay={0.4}>
              <div className="grid grid-cols-3 gap-6 pt-4">
                {[
                  { value: '2', label: 'Michelin Stars' },
                  { value: '40+', label: 'Awards Won' },
                  { value: '98%', label: 'Guest Satisfaction' },
                ].map((stat) => (
                  <div key={stat.label} className="text-center">
                    <div className="text-2xl md:text-3xl font-bold text-[#C8A97E]" style={{ fontFamily: 'var(--font-display)' }}>
                      {stat.value}
                    </div>
                    <div className="text-[10px] text-white/30 tracking-wider uppercase mt-1">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </AnimatedSection>
          </div>
        </div>
      </div>
    </section>
  );
}
