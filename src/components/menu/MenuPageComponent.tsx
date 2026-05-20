'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import AnimatedSection from '@/components/ui/AnimatedSection';
import Button from '@/components/ui/Button';
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
    <main className="pt-24 md:pt-28 bg-[var(--background)] min-h-screen">
      {/* Header */}
      <section className="relative pb-8 md:pb-16">
        <div className="absolute inset-0 bg-gradient-to-b from-[#33A1E0]/5 to-transparent pointer-events-none" />
        <div className="max-w-[1440px] mx-auto px-5 md:px-10 lg:px-16">
          <AnimatedSection>
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-[85px] font-medium leading-[0.9] text-gradient-gold" style={{ fontFamily: 'var(--font-display)' }}>
              The Menu
            </h1>
            <p className="text-[var(--foreground)]/40 text-sm max-w-md mt-4">
              A meticulously crafted selection of dishes, each a testament to our passion for exceptional gastronomy.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Filters */}
      <div className="sticky top-16 md:top-[72px] z-20 bg-[var(--background)]/80 backdrop-blur-xl border-b border-[var(--glass-light)]">
        <div className="max-w-[1440px] mx-auto px-5 md:px-10 lg:px-16 py-4">
          <div className="flex flex-col md:flex-row md:items-center gap-4">
            {/* Search */}
            <div className="relative flex-1 max-w-xs">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--foreground)]/30" />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search menu..."
                className="w-full bg-transparent border border-[var(--glass-light)] rounded-full pl-10 pr-4 py-2 text-xs text-[var(--foreground)] placeholder:text-[var(--foreground)]/30 focus:outline-none focus:border-[#33A1E0]/50 transition-colors"
              />
            </div>

            {/* Sort */}
            <div className="flex items-center gap-2 text-xs">
              <SlidersHorizontal size={14} className="text-[var(--foreground)]/30" />
              {(['default', 'price-low', 'price-high', 'rating'] as const).map((s) => (
                <button
                  key={s}
                  onClick={() => setSortBy(s)}
                  className={`px-3 py-1.5 rounded-full border transition-all ${
                    sortBy === s
                      ? 'border-[#33A1E0] text-[#33A1E0] bg-[#33A1E0]/10'
                      : 'border-[var(--glass-light)] text-[var(--foreground)]/40 hover:text-[var(--foreground)]/70'
                  }`}
                >
                  {s === 'default' ? 'Default' : s === 'price-low' ? 'Price ↑' : s === 'price-high' ? 'Price ↓' : 'Rating'}
                </button>
              ))}
            </div>
          </div>

          {/* Categories */}
          <div className="flex gap-2 overflow-x-auto no-scrollbar pt-4 pb-1">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCat(cat)}
                className={`relative px-5 py-2 text-xs tracking-wider uppercase rounded-full whitespace-nowrap transition-all duration-300 ${
                  activeCat === cat
                    ? 'text-white'
                    : 'text-[var(--foreground)]/50 hover:text-[var(--foreground)]/80 border border-[var(--glass-light)]'
                }`}
              >
                {activeCat === cat && (
                  <motion.div
                    layoutId="menu-page-tab"
                    className="absolute inset-0 bg-gradient-to-r from-[#33A1E0] to-[#154D71] rounded-full"
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{cat === 'all' ? 'All' : categoryLabels[cat]}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Menu Grid */}
      <div className="max-w-[1440px] mx-auto px-5 md:px-10 lg:px-16 py-8 md:py-12">
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
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
                <p className="text-[var(--foreground)]/30 text-sm">
                  No dishes found. Try a different search or category.
                </p>
              </motion.div>
            ) : (
              <motion.div
                key={activeCat + search + sortBy}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                {filtered.map((dish, i) => (
                  <motion.div
                    key={dish.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.06, duration: 0.4 }}
                    layout
                  >
                    <div
                      onClick={() => setSelectedItem(dish)}
                      className="group relative rounded-xl overflow-hidden bg-[var(--background)] border border-[var(--glass-light)] cursor-pointer hover:shadow-[0_8px_24px_rgba(0,0,0,0.08)] hover:border-[#33A1E0]/30 transition-all duration-300 h-full"
                    >
                      {/* Image */}
                      <div className="relative h-52 overflow-hidden">
                        <Image
                          src={dish.image}
                          alt={dish.name}
                          fill
                          className="object-cover transition-transform duration-700 group-hover:scale-110"
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                        {dish.featured && (
                          <span className="absolute top-3 left-3 px-3 py-1 text-[9px] tracking-wider uppercase bg-gradient-to-r from-[#33A1E0] to-[#154D71] text-white rounded-full">
                            Chef&apos;s Pick
                          </span>
                        )}
                        <div className="absolute bottom-3 right-3 flex items-center gap-1.5 bg-black/50 backdrop-blur-sm px-2 py-1 rounded-full">
                          <Star size={10} className="text-[#33A1E0] fill-[#33A1E0]" />
                          <span className="text-white text-[10px]">{dish.rating}</span>
                        </div>
                      </div>

                      {/* Content */}
                      <div className="p-5">
                        <div className="flex items-start justify-between gap-2 mb-1.5">
                          <h3 className="text-sm font-medium">{dish.name}</h3>
                          <span className="text-sm font-semibold text-[#33A1E0] shrink-0">{formatPrice(dish.price)}</span>
                        </div>
                        <p className="text-xs text-[var(--foreground)]/40 line-clamp-2 leading-relaxed mb-3">
                          {dish.description}
                        </p>
                        <div className="flex items-center gap-3">
                          <div className="flex items-center gap-1 text-[10px] text-[var(--foreground)]/30">
                            <Clock size={12} />
                            {dish.prepTime}
                          </div>
                          {dish.tags.slice(0, 2).map((tag) => (
                            <span key={tag} className="text-[9px] tracking-wider uppercase px-2 py-0.5 rounded-full bg-[#33A1E0]/10 text-[#33A1E0]">
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

      {/* Detail Modal */}
      <AnimatePresence>
        {selectedItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
          >
            <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={() => setSelectedItem(null)} />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative bg-[var(--background)] rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto shadow-[0_16px_40px_rgba(0,0,0,0.3)]"
            >
              <button
                onClick={() => setSelectedItem(null)}
                className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center text-white hover:bg-black/60 transition-colors"
              >
                <X size={16} />
              </button>
              <div className="relative h-64">
                <Image src={selectedItem.image} alt={selectedItem.name} fill className="object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              </div>
              <div className="p-6 space-y-4">
                <div className="flex items-start justify-between">
                  <h3 className="text-xl font-medium">{selectedItem.name}</h3>
                  <span className="text-xl font-semibold text-[#33A1E0]">{formatPrice(selectedItem.price)}</span>
                </div>
                <p className="text-sm text-[var(--foreground)]/50 leading-relaxed">{selectedItem.description}</p>
                <div className="flex flex-wrap gap-2">
                  {selectedItem.tags.map((tag) => (
                    <span key={tag} className="text-[10px] px-3 py-1 rounded-full bg-[#33A1E0]/10 text-[#33A1E0] uppercase tracking-wider">
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="grid grid-cols-2 gap-4 pt-2 border-t border-[var(--glass-light)]">
                  <div>
                    <span className="text-[10px] uppercase tracking-wider text-[var(--foreground)]/30">Rating</span>
                    <div className="flex items-center gap-1 mt-1">
                      <Star size={14} className="text-[#33A1E0] fill-[#33A1E0]" />
                      <span className="text-sm">{selectedItem.rating}</span>
                    </div>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase tracking-wider text-[var(--foreground)]/30">Prep Time</span>
                    <p className="text-sm mt-1">{selectedItem.prepTime}</p>
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
