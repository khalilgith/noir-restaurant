'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import AnimatedSection from '@/components/ui/AnimatedSection';
import { menuItems } from '@/lib/data';

const featured = menuItems.filter((i) => i.featured).slice(0, 4);

export default function FeaturedDishes() {
  return (
    <AnimatedSection className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-16 py-24 md:py-32">
      <div className="text-center mb-16">
        <span className="text-[10px] tracking-[0.3em] uppercase text-[#C8A97E]/60">
          Signature Selection
        </span>
        <h2 className="mt-4 font-[family-name:var(--font-display)] text-3xl md:text-5xl lg:text-[62px] leading-[1.1] text-white">
          Chef&apos;s <span className="text-gradient">Masterpieces</span>
        </h2>
        <p className="mt-4 text-sm text-white/30 max-w-md mx-auto font-light">
          Each dish is a composition of flavor, texture, and presentation —
          meticulously crafted by Chef Laurent and his team.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-white/[0.04]">
        {featured.map((dish, i) => (
          <motion.div
            key={dish.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="group relative overflow-hidden bg-[#0A0A0A]"
          >
            <div className="relative h-[320px] md:h-[400px] overflow-hidden">
              <Image
                src={dish.image}
                alt={dish.name}
                fill
                className="object-cover transition-all duration-700 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/20 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-500" />
              <div className="absolute inset-0 bg-[#C8A97E]/0 group-hover:bg-[#C8A97E]/5 transition-colors duration-500" />
            </div>
            <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-[family-name:var(--font-display)] text-xl md:text-2xl text-white">
                  {dish.name}
                </h3>
                <span className="text-sm text-[#C8A97E] font-medium">
                  ${dish.price}
                </span>
              </div>
              <p className="text-xs text-white/40 line-clamp-2 leading-relaxed max-w-md">
                {dish.description}
              </p>
              <div className="flex items-center gap-2 mt-3">
                {dish.tags.slice(0, 2).map((tag) => (
                  <span
                    key={tag}
                    className="text-[8px] tracking-[0.2em] uppercase text-[#C8A97E]/50 border border-[#C8A97E]/10 px-3 py-1"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </AnimatedSection>
  );
}
