'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import AnimatedSection from '@/components/ui/AnimatedSection';
import { MenuCardSkeleton } from '@/components/ui/Skeleton';
import { menuItems, categoryLabels } from '@/lib/data';
import { formatPrice } from '@/lib/utils';
import { MenuItem, MenuCategory } from '@/types';
import { Search, SlidersHorizontal, Star, Clock, X } from 'lucide-react';

const categories: (MenuCategory | 'all')[] = ['all', 'starters', 'mains', 'seafood', 'desserts', 'drinks', 'wine'];

export default function MenuPageComponent() {
  const [activeCat, setActiveCat] = useState<MenuCategory | 'all'>('all');
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);
  const [sortBy, setSortBy] = useState<'default' | 'price-low' | 'price-high' | 'rating'>('default');

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  let filtered = activeCat === 'all'
    ? menuItems
    : menuItems.filter((i) => i.category === activeCat);

  if (search) {
    const q = search.toLowerCase();
    filtered = filtered.filter(
      (i) =>
        i.name.toLowerCase().includes(q) ||
        i.description.toLowerCase().includes(q) ||
        i.tags.some((t) => t.toLowerCase().includes(q))
    );
  }

  if (sortBy === 'price-low') filtered = [...filtered].sort((a, b) => a.price - b.price);
  if (sortBy === 'price-high') filtered = [...filtered].sort((a, b) => b.price - a.price);
  if (sortBy === 'rating') filtered = [...filtered].sort((a, b) => b.rating - a.rating);

  return (
    <main className="min-h-screen bg-[#0A0A0A]">
      <section className="relative pt-32 pb-16 md:pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#C8A97E]/[0.02] to-transparent pointer-events-none" />
        <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-16">
          <AnimatedSection>
            <span className="text-[10px] tracking-[0.3em] uppercase text-[#C8A97E]/60">
              Gastronomy
            </span>
            <h1 className="mt-4 font-[family-name:var(--font-display)] text-4xl sm:text-5xl md:text-6xl lg:text-[85px] leading-[0.9] text-white">
              The <span className="text-gradient">Menu</span>
            </h1>
            <p className="mt-4 text-sm text-white/30 max-w-md font-light">
              A meticulously crafted selection of dishes, each a testament to our
              passion for exceptional gastronomy.
            </p>
          </AnimatedSection>
        </div>
      </section>

      <div className="sticky top-[72px] md:top-[80px] z-20 bg-[#0A0A0A]/80 backdrop-blur-2xl border-b border-white/[0.04]">
        <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-16 py-4">
          <div className="flex flex-col md:flex-row md:items-center gap-4">
            <div className="relative flex-1 max-w-xs">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/20" />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search menu..."
                className="w-full bg-white/[0.03] border border-white/10 pl-10 pr-4 py-2 text-xs text-white placeholder:text-white/20 focus:outline-none focus:border-[#C8A97E]/50 transition-colors"
              />
            </div>
            <div className="flex items-center gap-2 text-xs">
              <SlidersHorizontal size={14} className="text-white/20" />
              {(['default', 'price-low', 'price-high', 'rating'] as const).map((s) => (
                <button
                  key={s}
                  onClick={() => setSortBy(s)}
                  className={`px-3 py-1.5 border transition-all ${
                    sortBy === s
                      ? 'border-[#C8A97E] text-[#C8A97E] bg-[#C8A97E]/10'
                      : 'border-white/10 text-white/30 hover:text-white/50'
                  }`}
                >
                  {s === 'default' ? 'Default' : s === 'price-low' ? 'Price ↑' : s === 'price-high' ? 'Price ↓' : 'Rating'}
                </button>
              ))}
            </div>
          </div>

          <div className="flex gap-2 overflow-x-auto no-scrollbar pt-4 pb-1">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCat(cat)}
                className={`relative px-5 py-2 text-[10px] tracking-[0.2em] uppercase whitespace-nowrap transition-all duration-300 ${
                  activeCat === cat
                    ? 'text-[#0A0A0A]'
                    : 'text-white/40 border border-white/10 hover:border-white/20'
                }`}
              >
                {activeCat === cat && (
                  <motion.div
                    layoutId="menu-page-tab"
                    className="absolute inset-0 bg-[#C8A97E]"
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{cat === 'all' ? 'All' : categoryLabels[cat]}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-16 py-10 md:py-16">
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-white/[0.04]">
            {Array.from({ length: 6 }).map((_, i) => (
              <MenuCardSkeleton key={i} />
            ))}
          </div>
        ) : (
          <AnimatePresence mode="wait">
            {filtered.length === 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-20"
              >
                <p className="text-sm text-white/20">No dishes found. Try a different search or category.</p>
              </motion.div>
            ) : (
              <motion.div
                key={activeCat + search + sortBy}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-white/[0.04]"
              >
                {filtered.map((dish, i) => (
                  <motion.div
                    key={dish.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.03 }}
                    layout
                  >
                    <div
                      onClick={() => setSelectedItem(dish)}
                      className="group relative bg-[#0A0A0A] overflow-hidden cursor-pointer hover:bg-white/[0.02] transition-colors duration-500 h-full"
                    >
                      <div className="relative h-52 overflow-hidden">
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
                        <div className="absolute bottom-3 right-3 flex items-center gap-1.5 bg-black/50 backdrop-blur-sm px-2 py-1">
                          <Star size={10} className="text-[#C8A97E] fill-[#C8A97E]" />
                          <span className="text-white text-[10px]">{dish.rating}</span>
                        </div>
                      </div>
                      <div className="p-5">
                        <div className="flex items-start justify-between gap-2 mb-1.5">
                          <h3 className="text-sm font-medium text-white">{dish.name}</h3>
                          <span className="text-sm text-[#C8A97E] shrink-0">{formatPrice(dish.price)}</span>
                        </div>
                        <p className="text-xs text-white/30 line-clamp-2 leading-relaxed mb-3">
                          {dish.description}
                        </p>
                        <div className="flex items-center gap-3">
                          <div className="flex items-center gap-1 text-[10px] text-white/20">
                            <Clock size={12} />
                            {dish.prepTime}
                          </div>
                          {dish.tags.slice(0, 2).map((tag) => (
                            <span key={tag} className="text-[8px] tracking-[0.2em] uppercase px-2 py-0.5 border border-[#C8A97E]/10 text-[#C8A97E]/50">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        )}
      </div>

      <AnimatePresence>
        {selectedItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
          >
            <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setSelectedItem(null)} />
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative bg-[#0A0A0A] border border-white/[0.06] max-w-lg w-full max-h-[90vh] overflow-y-auto shadow-[0_16px_40px_rgba(0,0,0,0.5)]"
            >
              <button
                onClick={() => setSelectedItem(null)}
                className="absolute top-4 right-4 z-10 w-8 h-8 bg-black/50 flex items-center justify-center text-white/60 hover:text-white transition-colors"
              >
                <X size={16} />
              </button>
              <div className="relative h-64">
                <Image src={selectedItem.image} alt={selectedItem.name} fill className="object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A]/60 to-transparent" />
              </div>
              <div className="p-6 space-y-4">
                <div className="flex items-start justify-between">
                  <h3 className="text-xl font-medium text-white">{selectedItem.name}</h3>
                  <span className="text-xl text-[#C8A97E]">{formatPrice(selectedItem.price)}</span>
                </div>
                <p className="text-sm text-white/40 leading-relaxed">{selectedItem.description}</p>
                <div className="flex flex-wrap gap-2">
                  {selectedItem.tags.map((tag) => (
                    <span key={tag} className="text-[10px] px-3 py-1 border border-[#C8A97E]/10 text-[#C8A97E]/60 uppercase tracking-wider">
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/[0.04]">
                  <div>
                    <span className="text-[10px] uppercase tracking-wider text-white/20">Rating</span>
                    <div className="flex items-center gap-1 mt-1">
                      <Star size={14} className="text-[#C8A97E] fill-[#C8A97E]" />
                      <span className="text-sm text-white">{selectedItem.rating}</span>
                    </div>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase tracking-wider text-white/20">Prep Time</span>
                    <p className="text-sm text-white mt-1">{selectedItem.prepTime}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
