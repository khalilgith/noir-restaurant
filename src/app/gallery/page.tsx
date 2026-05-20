'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import AnimatedSection from '@/components/ui/AnimatedSection';
import { galleryImages } from '@/lib/data';
import { X } from 'lucide-react';

const categories = ['all', 'interior', 'food', 'events', 'team'] as const;

export default function GalleryPage() {
  const [active, setActive] = useState<'all' | 'interior' | 'food' | 'events' | 'team'>('all');
  const [selected, setSelected] = useState<string | null>(null);

  const filtered = active === 'all' ? galleryImages : galleryImages.filter((img) => img.category === active);
  const selImage = selected ? galleryImages.find((img) => img.id === selected) : null;

  return (
    <main className="min-h-screen bg-[#0C0A08]">
      <section className="relative pt-32 pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#D4A574]/[0.02] to-transparent" />
        <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-16">
          <AnimatedSection>
            <span className="text-[10px] tracking-[0.3em] uppercase text-[#D4A574]/60">
              Visual Journey
            </span>
            <h1 className="mt-4 font-[family-name:var(--font-display)] text-4xl sm:text-5xl md:text-6xl lg:text-[85px] leading-[0.9] text-white">
              The <span className="text-gradient">Gallery</span>
            </h1>
            <p className="mt-4 text-sm text-white/30 max-w-md font-light">
              A visual journey through the world of NOIR — from our kitchen to your plate.
            </p>
          </AnimatedSection>
        </div>
      </section>

      <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-16 pb-24">
        <div className="flex gap-2 overflow-x-auto no-scrollbar mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className={`relative px-6 py-2.5 text-[10px] tracking-[0.2em] uppercase whitespace-nowrap transition-all duration-300 ${
                active === cat
                  ? 'text-[#0C0A08]'
                  : 'text-white/40 border border-white/10 hover:border-white/20'
              }`}
            >
              {active === cat && (
                <motion.div
                  layoutId="gallery-tab"
                  className="absolute inset-0 bg-[#D4A574]"
                  transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                />
              )}
              <span className="relative z-10">{cat}</span>
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-white/[0.04]"
          >
            {filtered.map((img) => (
              <motion.div
                key={img.id}
                layout
                className="group relative overflow-hidden bg-[#0C0A08] cursor-pointer aspect-[4/3]"
                onClick={() => setSelected(img.id)}
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  className="object-cover transition-all duration-700 group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-[#0C0A08]/0 group-hover:bg-[#0C0A08]/40 transition-all duration-500 flex items-center justify-center">
                  <span className="text-[10px] tracking-[0.2em] uppercase text-white/0 group-hover:text-white/80 border border-white/0 group-hover:border-white/20 px-4 py-2 transition-all duration-500">
                    {img.alt}
                  </span>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {selImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
          >
            <div className="absolute inset-0 bg-black/90 backdrop-blur-md" onClick={() => setSelected(null)} />
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative max-w-4xl w-full max-h-[90vh]"
            >
              <button
                onClick={() => setSelected(null)}
                className="absolute -top-12 right-0 text-white/50 hover:text-white transition-colors text-xs tracking-[0.15em] uppercase"
              >
                Close
              </button>
              <div className="relative w-full aspect-[4/3]">
                <Image
                  src={selImage.src}
                  alt={selImage.alt}
                  fill
                  className="object-contain"
                  sizes="100vw"
                />
              </div>
              <p className="text-center text-xs text-white/40 mt-4 tracking-[0.1em]">
                {selImage.alt}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
