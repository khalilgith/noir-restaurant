'use client';

import { useState } from 'react';
import AnimatedSection from '@/components/ui/AnimatedSection';
import { Input, Textarea } from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import { openingHours } from '@/lib/data';
import { MapPin, Phone, Mail, Clock, Send } from 'lucide-react';

const contactInfo = [
  { icon: MapPin, label: 'Address', value: '42 Rue de la Paix, 75002 Paris, France' },
  { icon: Phone, label: 'Phone', value: '+33 1 42 68 12 34', href: 'tel:+33142681234' },
  { icon: Mail, label: 'Email', value: 'reservations@noir-paris.com', href: 'mailto:reservations@noir-paris.com' },
];

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <main className="min-h-screen bg-[#0C0A08]">
      <section className="relative pt-32 pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#D4A574]/[0.02] to-transparent" />
        <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-16">
          <AnimatedSection>
            <span className="text-[10px] tracking-[0.3em] uppercase text-[#D4A574]/60">
              Get in Touch
            </span>
            <h1 className="mt-4 font-[family-name:var(--font-display)] text-4xl sm:text-5xl md:text-6xl lg:text-[85px] leading-[0.9] text-white">
              <span className="text-gradient">Contact</span> Us
            </h1>
            <p className="mt-4 text-sm text-white/30 max-w-md font-light">
              We&apos;d love to hear from you. Reach out for reservations, events, or any inquiries.
            </p>
          </AnimatedSection>
        </div>
      </section>

      <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-16 pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-16">
          <div>
            <AnimatedSection>
              <div className="space-y-6">
                {contactInfo.map((info) => {
                  const Icon = info.icon;
                  return (
                    <div key={info.label} className="flex items-start gap-4">
                      <div className="w-10 h-10 border border-white/10 flex items-center justify-center shrink-0 mt-0.5">
                        <Icon size={16} className="text-[#D4A574]/60" />
                      </div>
                      <div>
                        <p className="text-[10px] tracking-[0.15em] uppercase text-white/40">{info.label}</p>
                        {info.href ? (
                          <a
                            href={info.href}
                            className="text-sm text-white/70 hover:text-[#D4A574] transition-colors mt-0.5 block"
                          >
                            {info.value}
                          </a>
                        ) : (
                          <p className="text-sm text-white/70 mt-0.5">{info.value}</p>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="mt-10">
                <h3 className="text-[10px] tracking-[0.15em] uppercase text-white/40 flex items-center gap-2 mb-4">
                  <Clock size={12} /> Opening Hours
                </h3>
                <div className="space-y-2">
                  {openingHours.map((h) => (
                    <div key={h.day} className="flex justify-between text-xs border-b border-white/[0.03] pb-2">
                      <span className="text-white/40">{h.day}</span>
                      <span className="text-white/50">{h.hours}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-10">
                <div className="w-full h-[200px] bg-white/[0.02] border border-white/[0.04] overflow-hidden">
                  <iframe
                    src="https://www.openstreetmap.org/export/embed.html?bbox=2.2945%2C48.8742%2C2.2975%2C48.8762&amp;layer=mapnik"
                    width="100%"
                    height="100%"
                    style={{ border: 0, filter: 'invert(0.9) hue-rotate(180deg)' }}
                    title="NOIR Paris Location"
                  />
                </div>
              </div>
            </AnimatedSection>
          </div>

          <AnimatedSection delay={0.1}>
            <div className="border border-white/[0.06] p-8 md:p-10">
              <h2 className="text-lg font-medium text-white mb-6">Send a Message</h2>

              {submitted ? (
                <div className="text-center py-12">
                  <div className="w-12 h-12 mx-auto mb-4 bg-[#D4A574] flex items-center justify-center">
                    <Send size={20} className="text-[#0C0A08]" />
                  </div>
                  <p className="text-sm text-[#D4A574]">Message sent successfully.</p>
                  <p className="text-xs text-white/30 mt-2">We&apos;ll respond within 24 hours.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Input label="First Name" placeholder="John" required />
                    <Input label="Last Name" placeholder="Doe" required />
                  </div>
                  <Input label="Email" type="email" placeholder="john@example.com" required />
                  <Input label="Subject" placeholder="Reservation inquiry" />
                  <Textarea label="Message" placeholder="Tell us how we can help..." rows={5} required />
                  <Button type="submit" className="w-full">
                    Send Message
                  </Button>
                </form>
              )}
            </div>
          </AnimatedSection>
        </div>
      </div>
    </main>
  );
}
