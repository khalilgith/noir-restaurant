'use client';

import ThemeProvider from '@/components/layout/ThemeProvider';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import AIChatAssistant from '@/components/ai/AIChatAssistant';

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
      <AIChatAssistant />
    </ThemeProvider>
  );
}
