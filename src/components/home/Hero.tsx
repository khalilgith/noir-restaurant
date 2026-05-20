'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import Link from 'next/link';
import { ChevronDown } from 'lucide-react';
import { useRef } from 'react';

export default function Hero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);

  return (
    <section ref={ref} className="relative h-screen min-h-[700px] overflow-hidden flex items-center justify-center">
      {/* Background Image with Parallax */}
      <motion.div style={{ y, scale }} className="absolute inset-0 z-0">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1920&q=85')`,
          }}
        />
        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/80" />
        {/* Film grain */}
        <div className="absolute inset-0 grain-overlay opacity-30" />
      </motion.div>

      {/* Ambient glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#33A1E0]/8 rounded-full blur-[120px] pointer-events-none" />

      {/* Content */}
      <motion.div style={{ opacity }} className="relative z-10 text-center px-5 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="inline-flex items-center gap-3 text-[#33A1E0] text-xs tracking-[0.3em] uppercase mb-8">
            <span className="w-8 h-[1px] bg-[#33A1E0]" />
            Est. 2019 &middot; Paris
            <span className="w-8 h-[1px] bg-[#33A1E0]" />
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="font-[var(--font-display)] text-5xl sm:text-7xl md:text-8xl lg:text-[110px] text-white leading-[0.9] tracking-tight mb-8"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          Where Every
          <br />
          <span className="text-gradient-gold">Flavor</span> Tells
          <br />
          a Story
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="text-white/50 text-sm md:text-base max-w-md mx-auto mb-10 leading-relaxed"
        >
          An immersive culinary journey through the finest ingredients, masterful technique, and timeless elegance.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link
            href="/reservation"
            className="px-8 py-3.5 text-sm tracking-wider uppercase bg-gradient-to-r from-[#33A1E0] to-[#154D71] text-white rounded-full hover:from-[#154D71] hover:to-[#1C6EA4] transition-all duration-300 shadow-[0_4px_20px_rgba(51,161,224,0.3)]"
          >
            Reserve Your Table
          </Link>
          <Link
            href="/menu"
            className="px-8 py-3.5 text-sm tracking-wider uppercase border border-white/20 text-white rounded-full hover:bg-white/10 transition-all duration-300"
          >
            Explore Menu
          </Link>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
      >
        <span className="text-white/30 text-[10px] tracking-[0.2em] uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
        >
          <ChevronDown size={16} className="text-white/30" />
        </motion.div>
      </motion.div>
    </section>
  );
}
