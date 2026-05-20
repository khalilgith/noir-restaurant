'use client';

import Image from 'next/image';
import AnimatedSection from '@/components/ui/AnimatedSection';
import { Award, Heart, Users, Sparkles } from 'lucide-react';

const values = [
  {
    icon: Award,
    title: 'Excellence',
    desc: 'Uncompromising commitment to quality in every ingredient, technique, and presentation.',
  },
  {
    icon: Heart,
    title: 'Passion',
    desc: 'A labor of love shared by every member of the NOIR team, from kitchen to front-of-house.',
  },
  {
    icon: Users,
    title: 'Community',
    desc: 'Building relationships with local farmers, artisans, and the neighborhood we call home.',
  },
  {
    icon: Sparkles,
    title: 'Innovation',
    desc: 'Pushing culinary boundaries while honoring the timeless traditions of French gastronomy.',
  },
];

const team = [
  { name: 'Laurent Moreau', role: 'Executive Chef & Founder', avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=200&q=80', desc: 'A graduate of Le Cordon Bleu with 20 years of experience across Michelin-starred kitchens in Paris, London, and Tokyo.' },
  { name: 'Sophie Bernard', role: 'Head Sommelier', avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&q=80', desc: 'Award-winning sommelier with an encyclopedic knowledge of French and Italian wines. Curates our 500+ label wine cellar.' },
  { name: 'Pierre Dubois', role: 'Pastry Chef', avatar: 'https://images.unsplash.com/photo-1540569014015-19a7be504e3a?w=200&q=80', desc: 'Former pastry chef at Le Meurice. Known for delicate, architectural desserts that are as beautiful as they are delicious.' },
  { name: 'Camille Fontaine', role: 'Restaurant Director', avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200&q=80', desc: 'With over 15 years in luxury hospitality, ensures every guest experience at NOIR is flawless and memorable.' },
];

export default function AboutPage() {
  return (
    <main className="pt-24 md:pt-28 bg-[#0A0A0A] text-white min-h-screen">
      {/* Hero */}
      <section className="relative pb-12 md:pb-20">
        <div className="absolute inset-0 bg-gradient-to-b from-[#C8A97E]/5 to-transparent pointer-events-none" />
        <div className="max-w-[1440px] mx-auto px-5 md:px-10 lg:px-16">
          <AnimatedSection>
            <span className="text-[#C8A97E] text-xs tracking-[0.3em] uppercase">About NOIR</span>
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-[85px] font-medium leading-[0.9] mt-4 bg-gradient-to-b from-white to-white/60 bg-clip-text text-transparent" style={{ fontFamily: 'var(--font-display)' }}>
              A Philosophy<br />of <span className="text-gradient-gold">Flavor</span>
            </h1>
          </AnimatedSection>
        </div>
      </section>

      {/* Story */}
      <section className="py-12 md:py-20 border-t border-white/5">
        <div className="max-w-[1440px] mx-auto px-5 md:px-10 lg:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <AnimatedSection direction="left">
              <div className="relative aspect-[4/5] rounded-xl overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&q=80"
                  alt="Interior of NOIR"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
            </AnimatedSection>
            <div className="space-y-6">
              <AnimatedSection direction="right">
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-medium leading-tight" style={{ fontFamily: 'var(--font-display)' }}>
                  From Vision to <span className="text-gradient-gold">Reality</span>
                </h2>
              </AnimatedSection>
              <AnimatedSection delay={0.1} direction="right">
                <p className="text-white/50 text-sm leading-relaxed">
                  NOIR was born from a simple yet audacious vision: to create a dining experience that engages all the senses. Chef Laurent Moreau spent two years traveling the world, studying under master chefs, and sourcing the finest purveyors before opening the doors of NOIR in the heart of Paris.
                </p>
              </AnimatedSection>
              <AnimatedSection delay={0.2} direction="right">
                <p className="text-white/50 text-sm leading-relaxed">
                  Every element of NOIR — from the hand-blown glassware to the custom-made table linens, from the carefully curated playlist to the lighting designed to flatter every face — has been considered with the same meticulous care as the food on your plate.
                </p>
              </AnimatedSection>
              <AnimatedSection delay={0.3} direction="right">
                <p className="text-white/50 text-sm leading-relaxed">
                  Our name reflects our aesthetic: the beauty of darkness, the depth of shadow, and the way candlelight illuminates what matters most — the connection between people sharing a meal.
                </p>
              </AnimatedSection>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 md:py-24 border-t border-white/5">
        <div className="max-w-[1440px] mx-auto px-5 md:px-10 lg:px-16">
          <AnimatedSection className="text-center mb-16">
            <span className="text-[#C8A97E] text-xs tracking-[0.3em] uppercase">Our Principles</span>
            <h2 className="text-3xl md:text-4xl lg:text-[62px] font-medium leading-[1] mt-4" style={{ fontFamily: 'var(--font-display)' }}>
              What We Stand For
            </h2>
          </AnimatedSection>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v, i) => (
              <AnimatedSection key={v.title} delay={i * 0.1}>
                <div className="p-6 rounded-xl border border-white/5 hover:border-[#C8A97E]/30 transition-all duration-300 text-center group">
                  <div className="w-12 h-12 rounded-full bg-[#C8A97E]/10 flex items-center justify-center mx-auto mb-4 group-hover:bg-[#C8A97E]/20 transition-colors">
                    <v.icon size={20} className="text-[#C8A97E]" />
                  </div>
                  <h3 className="text-base font-medium mb-2">{v.title}</h3>
                  <p className="text-xs text-white/40 leading-relaxed">{v.desc}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-16 md:py-24 border-t border-white/5">
        <div className="max-w-[1440px] mx-auto px-5 md:px-10 lg:px-16">
          <AnimatedSection className="text-center mb-16">
            <span className="text-[#C8A97E] text-xs tracking-[0.3em] uppercase">The Team</span>
            <h2 className="text-3xl md:text-4xl lg:text-[62px] font-medium leading-[1] mt-4" style={{ fontFamily: 'var(--font-display)' }}>
              Meet Our Artisans
            </h2>
          </AnimatedSection>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map((m, i) => (
              <AnimatedSection key={m.name} delay={i * 0.1}>
                <div className="group text-center">
                  <div className="relative w-40 h-40 rounded-full overflow-hidden mx-auto mb-5 border-2 border-[#C8A97E]/20 group-hover:border-[#C8A97E]/50 transition-all duration-500">
                    <Image src={m.avatar} alt={m.name} fill className="object-cover" sizes="160px" />
                  </div>
                  <h3 className="text-base font-medium">{m.name}</h3>
                  <p className="text-[#C8A97E] text-xs tracking-wider uppercase mt-1 mb-3">{m.role}</p>
                  <p className="text-xs text-white/40 leading-relaxed max-w-xs mx-auto">{m.desc}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
