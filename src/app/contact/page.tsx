'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import AnimatedSection from '@/components/ui/AnimatedSection';
import { Input, Textarea } from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import { openingHours } from '@/lib/data';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';

export default function ContactPage() {
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <main className="pt-24 md:pt-28 bg-[var(--background)] min-h-screen">
      {/* Header */}
      <section className="relative pb-8">
        <div className="absolute inset-0 bg-gradient-to-b from-[#33A1E0]/5 to-transparent pointer-events-none" />
        <div className="max-w-[1440px] mx-auto px-5 md:px-10 lg:px-16">
          <AnimatedSection>
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-[85px] font-medium leading-[0.9] text-gradient-gold" style={{ fontFamily: 'var(--font-display)' }}>
              Contact
            </h1>
            <p className="text-[var(--foreground)]/40 text-sm max-w-md mt-4">
              We&apos;d love to hear from you. Whether for reservations, private events, or just to say hello.
            </p>
          </AnimatedSection>
        </div>
      </section>

      <div className="max-w-[1440px] mx-auto px-5 md:px-10 lg:px-16 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Left - Info */}
          <div className="space-y-10">
            {/* Address */}
            <AnimatedSection>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-[#33A1E0]/10 flex items-center justify-center shrink-0">
                  <MapPin size={16} className="text-[#33A1E0]" />
                </div>
                <div>
                  <h3 className="text-sm font-medium mb-1">Address</h3>
                  <p className="text-sm text-[var(--foreground)]/40">
                    42 Rue de la Gastronomie<br />
                    75008 Paris, France
                  </p>
                </div>
              </div>
            </AnimatedSection>

            {/* Phone */}
            <AnimatedSection delay={0.1}>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-[#33A1E0]/10 flex items-center justify-center shrink-0">
                  <Phone size={16} className="text-[#33A1E0]" />
                </div>
                <div>
                  <h3 className="text-sm font-medium mb-1">Phone</h3>
                  <a href="tel:+33142681234" className="text-sm text-[var(--foreground)]/40 hover:text-[#33A1E0] transition-colors">
                    +33 1 42 68 12 34
                  </a>
                </div>
              </div>
            </AnimatedSection>

            {/* Email */}
            <AnimatedSection delay={0.2}>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-[#33A1E0]/10 flex items-center justify-center shrink-0">
                  <Mail size={16} className="text-[#33A1E0]" />
                </div>
                <div>
                  <h3 className="text-sm font-medium mb-1">Email</h3>
                  <a href="mailto:reservations@noir.com" className="text-sm text-[var(--foreground)]/40 hover:text-[#33A1E0] transition-colors">
                    reservations@noir.com
                  </a>
                </div>
              </div>
            </AnimatedSection>

            {/* Hours */}
            <AnimatedSection delay={0.3}>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-[#33A1E0]/10 flex items-center justify-center shrink-0">
                  <Clock size={16} className="text-[#33A1E0]" />
                </div>
                <div className="flex-1">
                  <h3 className="text-sm font-medium mb-3">Opening Hours</h3>
                  <ul className="space-y-2">
                    {openingHours.map((h) => (
                      <li key={h.day} className="flex justify-between text-sm">
                        <span className="text-[var(--foreground)]/50">{h.day}</span>
                        <span className={h.closed ? 'text-[var(--foreground)]/20 italic' : 'text-[var(--foreground)]/70'}>
                          {h.closed ? 'Closed' : `${h.open} – ${h.close}`}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </AnimatedSection>

            {/* Map */}
            <AnimatedSection delay={0.4}>
              <div className="rounded-xl overflow-hidden border border-[var(--glass-light)] h-64">
                <iframe
                  src="https://www.openstreetmap.org/export/embed.html?bbox=2.2945%2C48.8742%2C2.2975%2C48.8762&amp;layer=mapnik"
                  width="100%"
                  height="100%"
                  style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg)' }}
                  loading="lazy"
                  title="Map"
                />
              </div>
            </AnimatedSection>
          </div>

          {/* Right - Form */}
          <AnimatedSection direction="right">
            {sent ? (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col items-center justify-center h-full py-20 text-center"
              >
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#33A1E0] to-[#154D71] flex items-center justify-center mx-auto mb-6">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5"><path d="M20 6L9 17l-5-5"/></svg>
                </div>
                <h3 className="text-xl font-medium mb-2">Message Sent</h3>
                <p className="text-sm text-[var(--foreground)]/40 max-w-xs">
                  Thank you for reaching out. We&apos;ll respond within 24 hours during business days.
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <h3 className="text-lg font-medium">Send a Message</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Input label="Full Name" placeholder="Your name" required />
                  <Input label="Email" type="email" placeholder="your@email.com" required />
                </div>
                <Input label="Subject" placeholder="How can we help?" />
                <Textarea label="Message" placeholder="Tell us more about your inquiry..." rows={5} />
                <Button type="submit" variant="gold" size="lg">
                  Send Message
                </Button>
              </form>
            )}
          </AnimatedSection>
        </div>
      </div>
    </main>
  );
}
