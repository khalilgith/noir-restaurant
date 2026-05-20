'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import AnimatedSection from '@/components/ui/AnimatedSection';
import { menuItems, categoryLabels } from '@/lib/data';
import { formatPrice } from '@/lib/utils';
import { MenuCategory } from '@/types';

const categories: (MenuCategory | 'all')[] = ['all', 'starters', 'mains', 'seafood', 'desserts'];

export default function MenuPreview() {
  const [active, setActive] = useState<MenuCategory | 'all'>('all');

  const filtered = active === 'all'
    ? menuItems.slice(0, 6)
    : menuItems.filter((i) => i.category === active).slice(0, 6);

  return (
    <AnimatedSection className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-16 py-24 md:py-32">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div>
          <span className="text-[10px] tracking-[0.3em] uppercase text-[#C8A97E]/60">
            Curated Selection
          </span>
          <h2 className="mt-4 font-[family-name:var(--font-display)] text-3xl md:text-5xl lg:text-[62px] leading-[1.1] text-white">
            Explore the <span className="text-gradient">Menu</span>
          </h2>
        </div>
        <Link
          href="/menu"
          className="text-[11px] tracking-[0.2em] uppercase text-white/40 hover:text-[#C8A97E] transition-colors duration-300 shrink-0"
        >
          View Full Menu →
        </Link>
      </div>

      <div className="flex gap-2 overflow-x-auto no-scrollbar pb-4 mb-8">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActive(cat)}
            className={`relative px-6 py-2.5 text-[10px] tracking-[0.2em] uppercase whitespace-nowrap transition-all duration-300 ${
              active === cat
                ? 'text-[#0A0A0A]'
                : 'text-white/40 border border-white/10 hover:border-white/20'
            }`}
          >
            {active === cat && (
              <motion.div
                layoutId="menu-tab"
                className="absolute inset-0 bg-[#C8A97E]"
                transition={{ type: 'spring', stiffness: 400, damping: 30 }}
              />
            )}
            <span className="relative z-10">
              {cat === 'all' ? 'All' : categoryLabels[cat]}
            </span>
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={active}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-white/[0.04]"
        >
          {filtered.map((dish, i) => (
            <motion.div
              key={dish.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.04 }}
              className="group relative bg-[#0A0A0A] overflow-hidden"
            >
              <div className="relative h-48 md:h-56 overflow-hidden">
                <Image
                  src={dish.image}
                  alt={dish.name}
                  fill
                  className="object-cover transition-all duration-700 group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-transparent to-transparent" />
                {dish.featured && (
                  <span className="absolute top-3 left-3 text-[8px] tracking-[0.2em] uppercase bg-[#C8A97E] text-[#0A0A0A] px-3 py-1">
                    Signature
                  </span>
                )}
              </div>
              <div className="p-5">
                <div className="flex items-start justify-between gap-2 mb-1.5">
                  <h3 className="text-sm font-medium text-white">{dish.name}</h3>
                  <span className="text-sm text-[#C8A97E] shrink-0">{formatPrice(dish.price)}</span>
                </div>
                <p className="text-xs text-white/30 line-clamp-2 leading-relaxed">
                  {dish.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>
    </AnimatedSection>
  );
}
