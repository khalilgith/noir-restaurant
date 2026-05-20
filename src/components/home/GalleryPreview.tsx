'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import AnimatedSection, { StaggerChildren, StaggerItem } from '@/components/ui/AnimatedSection';
import { galleryImages } from '@/lib/data';

export default function GalleryPreview() {
  const images = galleryImages.slice(0, 6);

  return (
    <section className="relative py-20 md:py-32 bg-[var(--background)] overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-5 md:px-10 lg:px-16">
        <AnimatedSection className="text-center mb-16">
          <span className="text-[#C8A97E] text-xs tracking-[0.3em] uppercase">Visual Journey</span>
          <h2
            className="text-3xl sm:text-4xl md:text-5xl lg:text-[62px] font-medium leading-[1] mt-4"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            Gallery
          </h2>
        </AnimatedSection>

        <StaggerChildren className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
          {images.map((img, i) => (
            <StaggerItem
              key={img.id}
              className={i === 0 ? 'col-span-2 row-span-2' : ''}
            >
              <motion.div
                whileHover={{ scale: 1.02 }}
                transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                className="relative overflow-hidden rounded-xl group cursor-pointer"
                style={{ aspectRatio: i === 0 ? '1' : '4/3' }}
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  sizes={i === 0 ? '(max-width: 768px) 100vw, 66vw' : '(max-width: 768px) 50vw, 33vw'}
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-500" />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <span className="text-white text-xs tracking-[0.2em] uppercase border border-white/30 px-4 py-2 rounded-full backdrop-blur-sm">
                    View
                  </span>
                </div>
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerChildren>

        <AnimatedSection delay={0.4} className="text-center mt-12">
          <Link
            href="/gallery"
            className="inline-flex items-center gap-2 text-sm text-[#C8A97E] hover:text-[#A68B5B] transition-colors tracking-wider uppercase"
          >
            View Full Gallery &rarr;
          </Link>
        </AnimatedSection>
      </div>
    </section>
  );
}
