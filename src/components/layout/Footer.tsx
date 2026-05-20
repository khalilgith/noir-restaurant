'use client';

import Link from 'next/link';
import { Mail, Phone, MapPin } from 'lucide-react';
import { openingHours } from '@/lib/data';

export default function Footer() {
  return (
    <footer className="border-t border-white/[0.04] mt-24">
      <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-16 py-16 md:py-20">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 md:gap-12">
          <div className="col-span-2 md:col-span-1">
            <Link href="/">
              <span className="font-[family-name:var(--font-display)] text-xl tracking-[0.3em] text-white">
                NOIR
              </span>
            </Link>
            <p className="mt-4 text-xs text-white/30 leading-relaxed max-w-xs font-light">
              An immersive culinary journey through the finest ingredients,
              masterful technique, and timeless elegance.
            </p>
            <div className="mt-6 flex flex-col gap-2">
              <a href="tel:+33142681234" className="flex items-center gap-2 text-xs text-white/30 hover:text-[#C8A97E] transition-colors">
                <Phone size={12} /> +33 1 42 68 12 34
              </a>
              <a href="mailto:reservations@noir-paris.com" className="flex items-center gap-2 text-xs text-white/30 hover:text-[#C8A97E] transition-colors">
                <Mail size={12} /> reservations@noir-paris.com
              </a>
              <span className="flex items-center gap-2 text-xs text-white/30">
                <MapPin size={12} /> 42 Rue de la Paix, 75002 Paris
              </span>
            </div>
          </div>

          <div>
            <h4 className="text-[10px] tracking-[0.2em] uppercase text-white/40 mb-4">
              Navigation
            </h4>
            <div className="flex flex-col gap-2.5">
              {[
                { href: '/', label: 'Home' },
                { href: '/menu', label: 'Menu' },
                { href: '/reservation', label: 'Reservations' },
                { href: '/about', label: 'Our Story' },
                { href: '/gallery', label: 'Gallery' },
                { href: '/contact', label: 'Contact' },
              ].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-xs text-white/30 hover:text-[#C8A97E] transition-colors duration-300"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-[10px] tracking-[0.2em] uppercase text-white/40 mb-4">
              Hours
            </h4>
            <div className="flex flex-col gap-2.5">
              {openingHours.map((h) => (
                <div key={h.day} className="flex justify-between gap-4 text-xs">
                  <span className="text-white/30">{h.day}</span>
                  <span className="text-white/20">{h.hours}</span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-[10px] tracking-[0.2em] uppercase text-white/40 mb-4">
              Experiences
            </h4>
            <div className="flex flex-col gap-2.5">
              <span className="text-xs text-white/30">Chef&apos;s Table</span>
              <span className="text-xs text-white/30">Wine Pairing</span>
              <span className="text-xs text-white/30">Private Dining</span>
              <span className="text-xs text-white/30">Seasonal Tasting</span>
              <span className="text-xs text-white/30">Cooking Classes</span>
              <span className="text-xs text-white/30">Corporate Events</span>
            </div>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-white/[0.04] flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-[10px] text-white/20 tracking-[0.1em]">
            &copy; {new Date().getFullYear()} NOIR Paris. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <span className="text-[10px] text-white/20 tracking-[0.1em]">Privacy Policy</span>
            <span className="text-[10px] text-white/20 tracking-[0.1em]">Terms of Service</span>
            <span className="text-[10px] text-white/20 tracking-[0.1em]">Accessibility</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
