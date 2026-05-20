'use client';

import Image from 'next/image';
import Link from 'next/link';
import AnimatedSection from '@/components/ui/AnimatedSection';
import { galleryImages } from '@/lib/data';

const preview = galleryImages.slice(0, 4);

export default function GalleryPreview() {
  return (
    <AnimatedSection className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-16 py-24 md:py-32">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div>
          <span className="text-[10px] tracking-[0.3em] uppercase text-[#C8A97E]/60">
            Visual Journey
          </span>
          <h2 className="mt-4 font-[family-name:var(--font-display)] text-3xl md:text-5xl lg:text-[62px] leading-[1.1] text-white">
            The <span className="text-gradient">Ambiance</span>
          </h2>
        </div>
        <Link
          href="/gallery"
          className="text-[11px] tracking-[0.2em] uppercase text-white/40 hover:text-[#C8A97E] transition-colors duration-300 shrink-0"
        >
          View Gallery →
        </Link>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-white/[0.04]">
        {preview.map((img) => (
          <div
            key={img.id}
            className="group relative overflow-hidden bg-[#0A0A0A] aspect-[4/5]"
          >
            <Image
              src={img.src}
              alt={img.alt}
              fill
              className="object-cover transition-all duration-700 group-hover:scale-105"
              sizes="(max-width: 768px) 50vw, 25vw"
            />
            <div className="absolute inset-0 bg-[#0A0A0A]/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
              <span className="text-[10px] tracking-[0.2em] uppercase text-white/60 border border-white/20 px-4 py-2">
                {img.alt}
              </span>
            </div>
          </div>
        ))}
      </div>
    </AnimatedSection>
  );
}
