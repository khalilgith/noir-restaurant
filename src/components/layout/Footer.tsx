'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { MapPin, Phone, Mail, ArrowUp } from 'lucide-react';
import AnimatedSection from '@/components/ui/AnimatedSection';
import { openingHours } from '@/lib/data';

export default function Footer() {
  const pathname = usePathname();
  if (pathname.startsWith('/admin')) return null;

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-[#0A0A0A] text-white border-t border-white/5">
      {/* Decorative top line */}
      <div className="h-[1px] bg-gradient-to-r from-transparent via-[#33A1E0] to-transparent" />

      <div className="max-w-[1440px] mx-auto px-5 md:px-10 lg:px-16 py-16 md:py-20">
        <AnimatedSection>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
            {/* Brand */}
            <div className="space-y-6">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#33A1E0] to-[#154D71] flex items-center justify-center text-white text-sm font-bold tracking-wider">
                  N
                </div>
                <span className="text-xl tracking-[0.2em] uppercase font-light">Noir</span>
              </div>
              <p className="text-sm text-white/50 leading-relaxed max-w-xs">
                A culinary sanctuary where artistry meets flavor. Experience dining elevated to its most exquisite form.
              </p>
              <div className="flex items-center gap-4">
                <a
                  href="#"
                  className="w-9 h-9 rounded-full border border-white/10 flex items-center justify-center hover:bg-white/10 hover:border-[#33A1E0] transition-all duration-300"
                  aria-label="Instagram"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-white/60"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
                </a>
                <a
                  href="#"
                  className="w-9 h-9 rounded-full border border-white/10 flex items-center justify-center hover:bg-white/10 hover:border-[#33A1E0] transition-all duration-300"
                  aria-label="Facebook"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-white/60"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
                </a>
              </div>
            </div>

            {/* Navigation */}
            <div className="space-y-6">
              <h4 className="text-xs tracking-[0.2em] uppercase text-[#33A1E0]">Navigate</h4>
              <ul className="space-y-3">
                {[
                  { href: '/', label: 'Home' },
                  { href: '/menu', label: 'Menu' },
                  { href: '/reservation', label: 'Reservations' },
                  { href: '/about', label: 'Our Story' },
                  { href: '/gallery', label: 'Gallery' },
                  { href: '/contact', label: 'Contact' },
                ].map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-white/40 hover:text-white transition-colors duration-300"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Hours */}
            <div className="space-y-6">
              <h4 className="text-xs tracking-[0.2em] uppercase text-[#33A1E0]">Hours</h4>
              <ul className="space-y-2">
                {openingHours.map((h) => (
                  <li key={h.day} className="flex justify-between text-sm">
                    <span className="text-white/40">{h.day}</span>
                    <span className={h.closed ? 'text-white/20 italic' : 'text-white/60'}>
                      {h.closed ? 'Closed' : `${h.open} – ${h.close}`}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div className="space-y-6">
              <h4 className="text-xs tracking-[0.2em] uppercase text-[#33A1E0]">Contact</h4>
              <ul className="space-y-4">
                <li className="flex items-start gap-3 text-sm">
                  <MapPin size={16} className="text-[#33A1E0] mt-0.5 shrink-0" />
                  <span className="text-white/50">
                    42 Rue de la Gastronomie<br />
                    Paris, 75008, France
                  </span>
                </li>
                <li className="flex items-center gap-3 text-sm">
                  <Phone size={16} className="text-[#33A1E0] shrink-0" />
                  <a href="tel:+33142681234" className="text-white/50 hover:text-white transition-colors">
                    +33 1 42 68 12 34
                  </a>
                </li>
                <li className="flex items-center gap-3 text-sm">
                  <Mail size={16} className="text-[#33A1E0] shrink-0" />
                  <a href="mailto:reservations@noir.com" className="text-white/50 hover:text-white transition-colors">
                    reservations@noir.com
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </AnimatedSection>

        {/* Bottom bar */}
        <div className="mt-16 pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/30">
            &copy; {new Date().getFullYear()} NOIR Restaurant. All rights reserved.
          </p>
          <div className="flex items-center gap-6 text-xs text-white/30">
            <a href="#" className="hover:text-white/60 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white/60 transition-colors">Terms of Service</a>
          </div>
          <button
            onClick={scrollToTop}
            className="w-9 h-9 rounded-full border border-white/10 flex items-center justify-center hover:bg-white/10 hover:border-[#33A1E0] transition-all duration-300"
            aria-label="Back to top"
          >
            <ArrowUp size={14} className="text-white/60" />
          </button>
        </div>
      </div>
    </footer>
  );
}
