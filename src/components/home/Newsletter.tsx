'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import AnimatedSection from '@/components/ui/AnimatedSection';
import { Input } from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import { Mail, Check } from 'lucide-react';

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        setEmail('');
      }, 3000);
    }
  };

  return (
    <section className="relative py-20 md:py-32 bg-[var(--background)] overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[#33A1E0]/5 rounded-full blur-[120px] pointer-events-none" />
      </div>

      <div className="relative max-w-[1440px] mx-auto px-5 md:px-10 lg:px-16">
        <AnimatedSection className="max-w-xl mx-auto text-center">
          <span className="text-[#33A1E0] text-xs tracking-[0.3em] uppercase">Stay Connected</span>
          <h2
            className="text-3xl sm:text-4xl md:text-5xl font-medium leading-[1] mt-4 mb-4"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            Join Our Circle
          </h2>
          <p className="text-[var(--foreground)]/40 text-sm mb-8 leading-relaxed">
            Receive exclusive invitations to tasting events, seasonal menu previews, and members-only experiences.
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <div className="flex-1">
              <Input
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                icon={<Mail size={16} />}
                required
              />
            </div>
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button
                type="submit"
                variant="gold"
                size="md"
                className="w-full sm:w-auto whitespace-nowrap"
              >
                {submitted ? (
                  <span className="flex items-center gap-2">
                    <Check size={14} /> Subscribed
                  </span>
                ) : (
                  'Subscribe'
                )}
              </Button>
            </motion.div>
          </form>

          <p className="text-[10px] text-[var(--foreground)]/20 mt-4">
            By subscribing, you agree to our privacy policy. Unsubscribe anytime.
          </p>
        </AnimatedSection>
      </div>
    </section>
  );
}
