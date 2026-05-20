'use client';

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function Hero() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!ref.current) return;
      const scrolled = window.scrollY;
      const rate = scrolled * 0.4;
      ref.current.style.transform = `translateY(${rate}px) scale(${1 + scrolled * 0.0003})`;
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section className="relative h-screen min-h-[700px] overflow-hidden">
      <div
        ref={ref}
        className="absolute inset-0 will-change-transform"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1920&q=85')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-[#0A0A0A]" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-black/40" />
        <div className="grain-overlay absolute inset-0" />
      </div>

      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="mb-6"
        >
          <span className="inline-block text-[10px] md:text-xs tracking-[0.3em] uppercase text-[#C8A97E]/70 border border-[#C8A97E]/20 px-5 py-2">
            Michelin-Star Dining · Paris
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="font-[family-name:var(--font-display)] text-5xl sm:text-6xl md:text-7xl lg:text-[85px] xl:text-[110px] leading-[0.9] tracking-[-0.02em] text-white max-w-4xl mx-auto"
        >
          An<br className="sm:hidden" />{' '}
          <span className="text-gradient">Art<br className="hidden sm:inline" /></span>{' '}
          of Dining
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mt-6 text-sm md:text-base text-white/40 max-w-xl mx-auto leading-relaxed font-light"
        >
          Chef Laurent Moreau invites you to experience an unforgettable culinary journey
          where tradition meets innovation, in the heart of Paris.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mt-10 flex flex-col sm:flex-row items-center gap-4"
        >
          <Link
            href="/reservation"
            className="px-10 py-4 text-xs tracking-[0.2em] uppercase bg-[#C8A97E] text-[#0A0A0A] hover:bg-[#E8D5B5] transition-all duration-500 font-medium"
          >
            Reserve a Table
          </Link>
          <Link
            href="/menu"
            className="px-10 py-4 text-xs tracking-[0.2em] uppercase border border-white/20 text-white/70 hover:bg-white/5 hover:border-white/40 transition-all duration-500"
          >
            Explore Menu
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
        >
          <div className="w-[1px] h-16 bg-gradient-to-b from-[#C8A97E]/50 to-transparent mx-auto" />
          <p className="text-[8px] tracking-[0.3em] uppercase text-white/20 mt-3">
            Scroll
          </p>
        </motion.div>
      </div>
    </section>
  );
}
