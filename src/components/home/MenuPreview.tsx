'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import AnimatedSection from '@/components/ui/AnimatedSection';
import { menuItems, categoryLabels } from '@/lib/data';
import { formatPrice } from '@/lib/utils';
import { MenuCategory } from '@/types';

const categories: MenuCategory[] = ['starters', 'mains', 'seafood', 'desserts', 'drinks'];

export default function MenuPreview() {
  const [active, setActive] = useState<MenuCategory>('starters');
  const filtered = menuItems.filter((i) => i.category === active);

  return (
    <section className="relative py-20 md:py-32 bg-[var(--background)] overflow-hidden">
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-[#33A1E0]/4 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-[1440px] mx-auto px-5 md:px-10 lg:px-16">
        <AnimatedSection className="text-center mb-12">
          <span className="text-[#33A1E0] text-xs tracking-[0.3em] uppercase">Explore</span>
          <h2
            className="text-3xl sm:text-4xl md:text-5xl lg:text-[62px] font-medium leading-[1] mt-4 mb-6"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            Our Menu
          </h2>
        </AnimatedSection>

        {/* Category tabs */}
        <AnimatedSection delay={0.2} className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className={`relative px-5 py-2 text-xs tracking-wider uppercase rounded-full transition-all duration-300 ${
                active === cat
                  ? 'text-white'
                  : 'text-[var(--foreground)]/50 hover:text-[var(--foreground)]/80 border border-[var(--glass-light)]'
              }`}
            >
              {active === cat && (
                <motion.div
                  layoutId="menu-tab"
                  className="absolute inset-0 bg-gradient-to-r from-[#33A1E0] to-[#154D71] rounded-full"
                  transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                />
              )}
              <span className="relative z-10">{categoryLabels[cat]}</span>
            </button>
          ))}
        </AnimatedSection>

        {/* Menu items grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filtered.map((dish, i) => (
              <motion.div
                key={dish.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="group flex gap-4 p-4 rounded-xl border border-[var(--glass-light)] hover:border-[#33A1E0]/30 transition-all duration-300 hover:shadow-[0_4px_12px_rgba(0,0,0,0.08)]"
              >
                <div className="relative w-20 h-20 rounded-lg overflow-hidden shrink-0">
                  <Image
                    src={dish.image}
                    alt={dish.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                    sizes="80px"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <h4 className="text-sm font-medium truncate">{dish.name}</h4>
                    <span className="text-sm font-semibold text-[#33A1E0] shrink-0">
                      {formatPrice(dish.price)}
                    </span>
                  </div>
                  <p className="text-xs text-[var(--foreground)]/40 mt-1 line-clamp-2 leading-relaxed">
                    {dish.description}
                  </p>
                  <div className="flex items-center gap-2 mt-2">
                    {dish.tags.slice(0, 2).map((tag) => (
                      <span
                        key={tag}
                        className="text-[9px] tracking-wider uppercase px-2 py-0.5 rounded-full bg-[#33A1E0]/10 text-[#33A1E0]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
