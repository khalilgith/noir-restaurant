'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import AnimatedSection, { StaggerChildren, StaggerItem } from '@/components/ui/AnimatedSection';
import { menuItems } from '@/lib/data';
import { formatPrice } from '@/lib/utils';
import { Star } from 'lucide-react';

export default function FeaturedDishes() {
  const featured = menuItems.filter((item) => item.featured).slice(0, 4);

  return (
    <section className="relative py-20 md:py-32 bg-[var(--background)] overflow-hidden">
      {/* Subtle ambient */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#33A1E0]/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-[1440px] mx-auto px-5 md:px-10 lg:px-16">
        <AnimatedSection className="text-center mb-16">
          <span className="text-[#33A1E0] text-xs tracking-[0.3em] uppercase">Curated Selection</span>
          <h2
            className="text-3xl sm:text-4xl md:text-5xl lg:text-[62px] font-medium leading-[1] mt-4 mb-6"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            Signature Dishes
          </h2>
          <p className="text-[var(--foreground)]/50 text-sm max-w-md mx-auto">
            Each dish is a carefully composed masterpiece, reflecting our commitment to exceptional ingredients and artful presentation.
          </p>
        </AnimatedSection>

        <StaggerChildren className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featured.map((dish) => (
            <StaggerItem key={dish.id}>
              <motion.div
                whileHover={{ y: -8 }}
                transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                className="group relative rounded-xl overflow-hidden bg-[var(--background)] border border-[var(--glass-light)] shadow-[0_2px_8px_rgba(0,0,0,0.06)]"
              >
                {/* Image */}
                <div className="relative h-56 overflow-hidden">
                  <Image
                    src={dish.image}
                    alt={dish.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  {dish.tags[0] && (
                    <span className="absolute top-3 left-3 px-3 py-1 text-[10px] tracking-wider uppercase bg-[#33A1E0] text-white rounded-full">
                      {dish.tags[0]}
                    </span>
                  )}
                  <div className="absolute bottom-3 right-3 flex items-center gap-1 bg-black/50 backdrop-blur-sm px-2 py-1 rounded-full">
                    <Star size={10} className="text-[#33A1E0] fill-[#33A1E0]" />
                    <span className="text-white text-[10px]">{dish.rating}</span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5">
                  <h3 className="text-base font-medium mb-1.5">{dish.name}</h3>
                  <p className="text-xs text-[var(--foreground)]/40 leading-relaxed mb-4 line-clamp-2">
                    {dish.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-semibold text-[#33A1E0]">
                      {formatPrice(dish.price)}
                    </span>
                    <span className="text-[10px] text-[var(--foreground)]/30 tracking-wide uppercase">
                      {dish.prepTime}
                    </span>
                  </div>
                </div>
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerChildren>

        <AnimatedSection delay={0.4} className="text-center mt-12">
          <Link
            href="/menu"
            className="inline-flex items-center gap-2 text-sm text-[#33A1E0] hover:text-[#154D71] transition-colors tracking-wider uppercase group"
          >
            View Full Menu
            <motion.span
              className="inline-block"
              animate={{ x: [0, 4, 0] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
            >
              &rarr;
            </motion.span>
          </Link>
        </AnimatedSection>
      </div>
    </section>
  );
}
