'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, Sparkles, MessageCircle } from 'lucide-react';
import { AIChatMessage } from '@/types';
import { menuItems } from '@/lib/data';
import { generateId, formatPrice } from '@/lib/utils';

const suggestions = [
  'What do you recommend for a date night?',
  'Any gluten-free options?',
  'What pairs well with the ribeye?',
  "Tell me about the chef's specials",
];

function getAIResponse(message: string): string {
  const lower = message.toLowerCase();
  if (lower.includes('recommend') || lower.includes('suggestion') || lower.includes('best')) {
    const featured = menuItems.filter((i) => i.featured).slice(0, 3);
    return `Excellent taste! I'd recommend starting with our ${featured[0].name} (${formatPrice(featured[0].price)}), followed by the ${featured[1].name} (${formatPrice(featured[1].price)}). For a memorable finish, our ${featured[2]?.name || 'Chocolate Souffle'} is absolutely divine. Shall I suggest a wine pairing?`;
  }
  if (lower.includes('gluten') || lower.includes('allergy') || lower.includes('allergen')) {
    const gf = menuItems.filter((i) => i.tags.includes('gluten-free') || i.tags.includes('gluten-free option'));
    return `We take dietary needs very seriously. Our gluten-free highlights include: ${gf.map((i) => i.name).join(', ')}. Our kitchen team can also modify many dishes — just inform your server of any allergies when ordering.`;
  }
  if (lower.includes('pair') || lower.includes('wine') || lower.includes('drink')) {
    return `Our sommelier recommends the Chateau Margaux 2015 with red meats, or a crisp Sancerre with our seafood dishes. For cocktails, the Truffle Martini is a house signature that pairs beautifully with our starters. Would you like more specific pairing advice?`;
  }
  if (lower.includes('special') || lower.includes('chef') || lower.includes('signature')) {
    const sigs = menuItems.filter((i) => i.tags.includes('signature'));
    return `Chef Laurent's signature dishes are the pride of NOIR: ${sigs.map((i) => `${i.name} (${formatPrice(i.price)})`).join(', ')}. Each reflects his philosophy of combining classical French technique with contemporary innovation.`;
  }
  if (lower.includes('date') || lower.includes('romantic') || lower.includes('anniversary')) {
    return `For a romantic evening, I'd suggest our tasting menu experience. Begin with the Foie Gras Torchon, followed by the Pan-Seared Sea Bass or Dry-Aged Ribeye. Finish with our Chocolate Souffle for two. Request table 7 by the window — it has the best candlelit ambiance. Shall I help with a reservation?`;
  }
  if (lower.includes('vegetarian') || lower.includes('vegan') || lower.includes('plant')) {
    const veg = menuItems.filter((i) => i.tags.includes('vegetarian'));
    return `We celebrate plant-forward dining! Our vegetarian selections include the ${veg.map((i) => i.name).join(', ')}. Chef Laurent can also create a bespoke vegetarian tasting menu upon request — just mention it when reserving.`;
  }
  if (lower.includes('price') || lower.includes('cost') || lower.includes('budget')) {
    return `Our starters range from $18–$42, mains from $58–$95, and desserts from $18–$24. We also offer a prix fixe tasting menu at $145 per person (wine pairing additional $85). For special occasions, our Chef's Table experience is $250 per person for an intimate 8-course journey.`;
  }
  if (lower.includes('hour') || lower.includes('open') || lower.includes('close')) {
    return `NOIR is open Tuesday through Sunday. Weekday dinner service runs 5:00 PM – 11:00 PM. Weekend hours are extended: Saturday 12:00 PM – 12:00 AM and Sunday 12:00 PM – 10:00 PM. We're closed on Mondays. I'd recommend arriving by 7:30 PM for the full experience.`;
  }
  if (lower.includes('reserv') || lower.includes('book') || lower.includes('table')) {
    return `I'd be happy to help with reservations! You can book directly through our Reservations page. For parties of 8 or more, please call us at +33 1 42 68 12 34 so we can arrange our private dining room. We recommend booking at least 3 days in advance for weekend dining.`;
  }
  return `Thank you for your interest in NOIR! I can help you with menu recommendations, dietary accommodations, wine pairings, reservation assistance, and information about our chef's specials. What would you like to know?`;
}

export default function AIChatAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<AIChatMessage[]>([
    {
      id: '0',
      role: 'assistant',
      content: "Welcome to NOIR. I'm your personal dining concierge. I can help with menu recommendations, wine pairings, dietary needs, or reservation assistance. How may I help you today?",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = (text: string) => {
    if (!text.trim()) return;
    const userMsg: AIChatMessage = {
      id: generateId(),
      role: 'user',
      content: text.trim(),
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);
    setTimeout(() => {
      const response = getAIResponse(text);
      const aiMsg: AIChatMessage = {
        id: generateId(),
        role: 'assistant',
        content: response,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, aiMsg]);
      setIsTyping(false);
    }, 1000 + Math.random() * 1000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(input);
  };

  return (
    <>
      <motion.button
        onClick={() => setIsOpen(true)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className={`fixed bottom-6 right-6 z-50 w-14 h-14 bg-[#C8A97E] text-[#0A0A0A] flex items-center justify-center transition-all duration-300 ${
          isOpen ? 'opacity-0 pointer-events-none scale-90' : 'opacity-100'
        }`}
        aria-label="Open AI Chef Assistant"
      >
        <MessageCircle size={20} />
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.96 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="fixed bottom-6 right-6 z-50 w-[380px] max-w-[calc(100vw-48px)] h-[560px] max-h-[calc(100vh-100px)] bg-[#0A0A0A] border border-white/[0.06] flex flex-col overflow-hidden shadow-[0_16px_40px_rgba(0,0,0,0.5)]"
          >
            <div className="flex items-center justify-between px-5 py-4 border-b border-white/[0.04]">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-[#C8A97E] flex items-center justify-center">
                  <Sparkles size={14} className="text-[#0A0A0A]" />
                </div>
                <div>
                  <h4 className="text-white text-sm font-medium">Ask the Chef</h4>
                  <p className="text-white/20 text-[10px]">AI Dining Concierge</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="w-8 h-8 flex items-center justify-center text-white/30 hover:text-white/60 transition-colors"
                aria-label="Close chat"
              >
                <X size={16} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-5 py-4 space-y-4">
              {messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[85%] px-4 py-3 text-xs leading-relaxed ${
                      msg.role === 'user'
                        ? 'bg-[#C8A97E] text-[#0A0A0A]'
                        : 'bg-white/[0.04] text-white/70 border border-white/[0.04]'
                    }`}
                  >
                    {msg.content}
                  </div>
                </motion.div>
              ))}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-white/[0.04] px-4 py-3 border border-white/[0.04]">
                    <div className="flex gap-1">
                      {[0, 1, 2].map((i) => (
                        <motion.div
                          key={i}
                          animate={{ opacity: [0.3, 1, 0.3] }}
                          transition={{ repeat: Infinity, duration: 1, delay: i * 0.2 }}
                          className="w-1.5 h-1.5 rounded-full bg-[#C8A97E]/50"
                        />
                      ))}
                    </div>
                  </div>
                </div>
              )}
              <div ref={endRef} />
            </div>

            {messages.length <= 1 && (
              <div className="px-5 pb-3 flex flex-wrap gap-2">
                {suggestions.map((s) => (
                  <button
                    key={s}
                    onClick={() => sendMessage(s)}
                    className="text-[10px] text-[#C8A97E]/70 border border-[#C8A97E]/20 px-3 py-1.5 hover:bg-[#C8A97E]/10 transition-colors"
                  >
                    {s}
                  </button>
                ))}
              </div>
            )}

            <form onSubmit={handleSubmit} className="px-5 py-4 border-t border-white/[0.04]">
              <div className="flex items-center gap-2">
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask anything about dining..."
                  className="flex-1 bg-white/[0.03] border border-white/10 px-4 py-2.5 text-xs text-white placeholder:text-white/20 focus:outline-none focus:border-[#C8A97E]/50"
                />
                <button
                  type="submit"
                  disabled={!input.trim()}
                  className="w-9 h-9 bg-[#C8A97E] flex items-center justify-center text-[#0A0A0A] disabled:opacity-30 transition-opacity shrink-0"
                >
                  <Send size={14} />
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
