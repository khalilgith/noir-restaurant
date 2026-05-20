'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import AnimatedSection, { StaggerChildren, StaggerItem } from '@/components/ui/AnimatedSection';
import { galleryImages } from '@/lib/data';

const categories = ['all', 'interior', 'food', 'events', 'team'] as const;
type Cat = (typeof categories)[number];

export default function GalleryPage() {
  const [active, setActive] = useState<Cat>('all');
  const [selected, setSelected] = useState<string | null>(null);

  const filtered = active === 'all' ? galleryImages : galleryImages.filter((img) => img.category === active);
  const selImage = selected ? galleryImages.find((img) => img.id === selected) : null;

  const categoryLabels: Record<Cat, string> = {
    all: 'All',
    interior: 'Interior',
    food: 'Food',
    events: 'Events',
    team: 'Team',
  };

  return (
    <main className="pt-24 md:pt-28 bg-[var(--background)] min-h-screen">
      {/* Header */}
      <section className="relative pb-8">
        <div className="absolute inset-0 bg-gradient-to-b from-[#C8A97E]/5 to-transparent pointer-events-none" />
        <div className="max-w-[1440px] mx-auto px-5 md:px-10 lg:px-16">
          <AnimatedSection>
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-[85px] font-medium leading-[0.9] text-gradient-gold" style={{ fontFamily: 'var(--font-display)' }}>
              Gallery
            </h1>
            <p className="text-[var(--foreground)]/40 text-sm max-w-md mt-4">
              A visual journey through the NOIR experience — our spaces, our cuisine, and the moments that define us.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Filters */}
      <div className="max-w-[1440px] mx-auto px-5 md:px-10 lg:px-16 pb-8">
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className={`px-5 py-2 text-xs tracking-wider uppercase rounded-full transition-all ${
                active === cat
                  ? 'bg-gradient-to-r from-[#C8A97E] to-[#A68B5B] text-white'
                  : 'border border-[var(--glass-light)] text-[var(--foreground)]/50 hover:text-[var(--foreground)]/80'
              }`}
            >
              {categoryLabels[cat]}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      <div className="max-w-[1440px] mx-auto px-5 md:px-10 lg:px-16 pb-20">
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
          >
            <StaggerChildren className="columns-2 md:columns-3 lg:columns-4 gap-3 md:gap-4 space-y-3 md:space-y-4">
              {filtered.map((img) => (
                <StaggerItem
                  key={img.id}
                  className="break-inside-avoid"
                >
                  <motion.div
                    layoutId={`gallery-${img.id}`}
                    onClick={() => setSelected(img.id)}
                    className="relative rounded-xl overflow-hidden cursor-pointer group"
                  >
                    <Image
                      src={img.src}
                      alt={img.alt}
                      width={img.width}
                      height={img.height}
                      className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-colors duration-500 flex items-center justify-center">
                      <span className="text-white text-xs tracking-wider uppercase opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                        View
                      </span>
                    </div>
                  </motion.div>
                </StaggerItem>
              ))}
            </StaggerChildren>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
          >
            <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setSelected(null)} />
            <motion.div
              layoutId={`gallery-${selImage.id}`}
              className="relative max-w-4xl w-full max-h-[85vh] rounded-2xl overflow-hidden"
            >
              <Image
                src={selImage.src}
                alt={selImage.alt}
                width={selImage.width}
                height={selImage.height}
                className="w-full h-auto max-h-[85vh] object-contain"
              />
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/60 to-transparent">
                <p className="text-white text-sm">{selImage.alt}</p>
              </div>
              <button
                onClick={() => setSelected(null)}
                className="absolute top-4 right-4 w-10 h-10 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center text-white hover:bg-black/60 transition-colors"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6L6 18M6 6l12 12"/></svg>
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
