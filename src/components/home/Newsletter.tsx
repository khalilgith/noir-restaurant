'use client';

import { useState } from 'react';
import AnimatedSection from '@/components/ui/AnimatedSection';

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) setSubscribed(true);
  };

  return (
    <AnimatedSection className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-16 py-24 md:py-32">
      <div className="relative border border-white/[0.06] p-10 md:p-16 lg:p-20 text-center">
        <div className="absolute inset-0 bg-gradient-to-b from-white/[0.02] to-transparent pointer-events-none" />

        <span className="relative text-[10px] tracking-[0.3em] uppercase text-[#C8A97E]/60">
          Stay Connected
        </span>
        <h2 className="relative mt-4 font-[family-name:var(--font-display)] text-3xl md:text-5xl leading-[1.1] text-white">
          Join Our <span className="text-gradient">Connoisseur</span> Circle
        </h2>
        <p className="relative mt-4 text-sm text-white/30 max-w-md mx-auto font-light">
          Receive exclusive invitations, seasonal menu previews, and curated wine
          pairing notes from Chef Laurent.
        </p>

        {subscribed ? (
          <div className="relative mt-8 inline-flex items-center gap-2 text-sm text-[#C8A97E]">
            <span>✓</span> You&apos;ve been added to our list.
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="relative mt-8 flex flex-col sm:flex-row items-center gap-3 max-w-md mx-auto"
          >
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your email address"
              required
              className="flex-1 w-full bg-white/[0.03] border border-white/10 px-5 py-3.5 text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-[#C8A97E]/50 transition-colors"
            />
            <button
              type="submit"
              className="w-full sm:w-auto px-8 py-3.5 text-xs tracking-[0.2em] uppercase bg-[#C8A97E] text-[#0A0A0A] hover:bg-[#E8D5B5] transition-all duration-500 whitespace-nowrap"
            >
              Subscribe
            </button>
          </form>
        )}
      </div>
    </AnimatedSection>
  );
}
