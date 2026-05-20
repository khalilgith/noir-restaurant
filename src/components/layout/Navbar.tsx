'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';

const links = [
  { href: '/', label: 'Home' },
  { href: '/menu', label: 'Menu' },
  { href: '/reservation', label: 'Reservations' },
  { href: '/about', label: 'Our Story' },
  { href: '/gallery', label: 'Gallery' },
  { href: '/contact', label: 'Contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${
        scrolled
          ? 'bg-[#0C0A08]/90 backdrop-blur-2xl border-b border-white/5 shadow-[0_1px_0_rgba(255,255,255,0.05)]'
          : 'bg-transparent'
      }`}
    >
      <nav className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-16 h-[72px] md:h-[80px] flex items-center justify-between">
        <Link href="/" className="relative z-10">
          <span className="font-[family-name:var(--font-display)] text-xl md:text-2xl tracking-[0.3em] text-white">
            NOIR
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="relative text-xs tracking-[0.15em] uppercase text-white/60 hover:text-white transition-colors duration-300 py-2 group"
            >
              {link.label}
              <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-[#D4A574] transition-all duration-300 group-hover:w-full" />
            </Link>
          ))}
          <Link
            href="/reservation"
            className="ml-4 px-6 py-2.5 text-xs tracking-[0.15em] uppercase bg-white/5 border border-white/10 text-white/80 hover:bg-[#D4A574] hover:text-[#0C0A08] hover:border-[#D4A574] transition-all duration-500 rounded-none"
          >
            Reserve
          </Link>
        </div>

        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden relative z-10 w-10 h-10 flex items-center justify-center text-white/70 hover:text-white transition-colors"
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="md:hidden absolute top-[72px] left-0 right-0 bg-[#0C0A08]/95 backdrop-blur-2xl border-b border-white/5"
          >
            <div className="px-6 py-6 flex flex-col gap-1">
              {links.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className="block py-3 text-sm tracking-[0.15em] uppercase text-white/50 hover:text-white transition-colors border-b border-white/5"
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
              <Link
                href="/reservation"
                onClick={() => setMobileOpen(false)}
                className="mt-4 px-6 py-3 text-sm tracking-[0.15em] uppercase bg-[#D4A574] text-[#0C0A08] text-center transition-all"
              >
                Reserve a Table
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
