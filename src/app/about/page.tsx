'use client';

import Image from 'next/image';
import AnimatedSection from '@/components/ui/AnimatedSection';
import { Award, Heart, Leaf, Sparkles } from 'lucide-react';

const values = [
  { icon: Award, title: 'Excellence', desc: 'Every dish is held to the highest standard of culinary perfection.' },
  { icon: Heart, title: 'Passion', desc: 'Driven by an unwavering love for the art of gastronomy.' },
  { icon: Leaf, title: 'Sustainability', desc: 'Committed to responsible sourcing and zero-waste practices.' },
  { icon: Sparkles, title: 'Innovation', desc: 'Pushing boundaries while honoring classical French technique.' },
];

const team = [
  { name: 'Laurent Moreau', role: 'Executive Chef & Founder', avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=200&q=80', desc: 'A graduate of Le Cordon Bleu with 20 years of experience across Michelin-starred kitchens in Paris, London, and Tokyo.' },
  { name: 'Sophie Bernard', role: 'Head Sommelier', avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&q=80', desc: 'Award-winning sommelier with an encyclopedic knowledge of French and Italian wines. Curates our 500+ label wine cellar.' },
  { name: 'Pierre Dubois', role: 'Pastry Chef', avatar: 'https://images.unsplash.com/photo-1540569014015-19a7be504e3a?w=200&q=80', desc: 'Former pastry chef at Le Meurice. Known for delicate, architectural desserts.' },
  { name: 'Camille Fontaine', role: 'Restaurant Director', avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200&q=80', desc: 'With over 15 years in luxury hospitality, ensures every guest experience at NOIR is flawless.' },
];

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[#0A0A0A]">
      <section className="relative pt-32 pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#C8A97E]/[0.02] to-transparent" />
        <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-16">
          <AnimatedSection>
            <span className="text-[10px] tracking-[0.3em] uppercase text-[#C8A97E]/60">
              About NOIR
            </span>
            <h1 className="mt-4 font-[family-name:var(--font-display)] text-4xl sm:text-5xl md:text-6xl lg:text-[85px] leading-[0.9] text-white">
              Our <span className="text-gradient">Story</span>
            </h1>
          </AnimatedSection>
        </div>
      </section>

      <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-16 pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-24">
          <AnimatedSection>
            <div className="relative h-[400px] md:h-[500px] overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&q=80"
                alt="NOIR restaurant interior"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-transparent to-transparent" />
            </div>
          </AnimatedSection>
          <AnimatedSection delay={0.1}>
            <p className="text-sm text-white/35 leading-relaxed font-light">
              Founded in 2009, NOIR emerged from Chef Laurent Moreau&apos;s vision to redefine
              fine dining in Paris. What began as an intimate 24-seat restaurant has grown into
              one of the city&apos;s most celebrated culinary destinations.
            </p>
            <p className="mt-4 text-sm text-white/35 leading-relaxed font-light">
              Our philosophy is simple: respect the ingredient, honor the technique, and
              create moments that linger long after the last bite. Every element — from the
              hand-selected linens to the curated wine list — is a reflection of our
              commitment to excellence.
            </p>
            <p className="mt-4 text-sm text-white/35 leading-relaxed font-light">
              Today, NOIR holds two Michelin stars and is recognized as one of the world&apos;s
              finest dining experiences. But our true reward is the quiet smile of a guest
              who has tasted something unforgettable.
            </p>
          </AnimatedSection>
        </div>

        <AnimatedSection className="mb-24">
          <div className="text-center mb-12">
            <span className="text-[10px] tracking-[0.3em] uppercase text-[#C8A97E]/60">Our Values</span>
            <h2 className="mt-3 font-[family-name:var(--font-display)] text-3xl md:text-5xl text-white">
              What We <span className="text-gradient">Stand For</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-white/[0.04]">
            {values.map((v) => (
              <div key={v.title} className="bg-[#0A0A0A] p-8 text-center group hover:bg-white/[0.02] transition-colors duration-500">
                <div className="w-12 h-12 mx-auto mb-4 border border-white/10 flex items-center justify-center group-hover:border-[#C8A97E]/30 transition-colors duration-500">
                  <v.icon size={18} className="text-[#C8A97E]/60" />
                </div>
                <h3 className="text-sm font-medium text-white">{v.title}</h3>
                <p className="text-xs text-white/30 mt-2 leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </AnimatedSection>

        <AnimatedSection>
          <div className="text-center mb-12">
            <span className="text-[10px] tracking-[0.3em] uppercase text-[#C8A97E]/60">Our Team</span>
            <h2 className="mt-3 font-[family-name:var(--font-display)] text-3xl md:text-5xl text-white">
              Meet the <span className="text-gradient">Artisans</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-white/[0.04]">
            {team.map((m) => (
              <div key={m.name} className="bg-[#0A0A0A] p-8 group hover:bg-white/[0.02] transition-colors duration-500">
                <div className="relative w-24 h-24 mx-auto mb-5 overflow-hidden border border-white/[0.06]">
                  <Image src={m.avatar} alt={m.name} fill className="object-cover" sizes="96px" />
                </div>
                <h3 className="text-sm font-medium text-white text-center">{m.name}</h3>
                <p className="text-[10px] tracking-[0.15em] uppercase text-[#C8A97E]/60 text-center mt-1">{m.role}</p>
                <p className="text-xs text-white/30 text-center mt-3 leading-relaxed">{m.desc}</p>
              </div>
            ))}
          </div>
        </AnimatedSection>
      </div>
    </main>
  );
}
