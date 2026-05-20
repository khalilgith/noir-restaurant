'use client';

import { useState } from 'react';
import Image from 'next/image';
import AnimatedSection from '@/components/ui/AnimatedSection';
import Button from '@/components/ui/Button';
import { menuItems, testimonials } from '@/lib/data';
import { formatPrice } from '@/lib/utils';
import { Search, Users, CalendarDays, TrendingUp, Star, Clock, DollarSign } from 'lucide-react';

type Tab = 'overview' | 'menu' | 'reservations';

const tabs: { id: Tab; label: string }[] = [
  { id: 'overview', label: 'Overview' },
  { id: 'menu', label: 'Menu' },
  { id: 'reservations', label: 'Reservations' },
];

const sampleReservations = [
  { id: 'R001', name: 'James Wilson', date: '2025-05-22', time: '19:30', guests: 4, status: 'confirmed' },
  { id: 'R002', name: 'Maria Garcia', date: '2025-05-22', time: '20:00', guests: 2, status: 'confirmed' },
  { id: 'R003', name: 'Alexander Chen', date: '2025-05-23', time: '18:45', guests: 6, status: 'pending' },
  { id: 'R004', name: 'Sarah Mitchell', date: '2025-05-23', time: '21:00', guests: 2, status: 'confirmed' },
  { id: 'R005', name: 'David Thompson', date: '2025-05-24', time: '19:00', guests: 3, status: 'cancelled' },
];

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState<Tab>('overview');
  const [menuSearch, setMenuSearch] = useState('');

  const filteredItems = menuItems.filter(
    (i) =>
      i.name.toLowerCase().includes(menuSearch.toLowerCase()) ||
      i.category.toLowerCase().includes(menuSearch.toLowerCase())
  );

  const stats = [
    { icon: TrendingUp, label: 'Revenue Today', value: '$4,280', change: '+12%' },
    { icon: Users, label: 'Guests Today', value: '64', change: '+8%' },
    { icon: CalendarDays, label: 'Reservations', value: '18', change: '+3' },
    { icon: Star, label: 'Avg. Rating', value: '4.8', change: '+0.1' },
  ];

  return (
    <main className="min-h-screen bg-[#0C0A08]">
      <section className="relative pt-32 pb-12 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#D4A574]/[0.02] to-transparent" />
        <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-16">
          <AnimatedSection>
            <span className="text-[10px] tracking-[0.3em] uppercase text-[#D4A574]/60">
              Admin
            </span>
            <h1 className="mt-4 font-[family-name:var(--font-display)] text-4xl sm:text-5xl lg:text-[62px] leading-[1.1] text-white">
              <span className="text-gradient">Dashboard</span>
            </h1>
          </AnimatedSection>
        </div>
      </section>

      <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-16 pb-24">
        <div className="flex gap-2 mb-10">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-6 py-2.5 text-[10px] tracking-[0.2em] uppercase transition-all duration-300 ${
                activeTab === tab.id
                  ? 'bg-[#D4A574] text-[#0C0A08]'
                  : 'text-white/40 border border-white/10 hover:border-white/20'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {activeTab === 'overview' && (
          <div>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-white/[0.04] mb-10">
              {stats.map((stat) => {
                const Icon = stat.icon;
                return (
                  <div key={stat.label} className="bg-[#0C0A08] p-6">
                    <div className="flex items-center gap-2 mb-3">
                      <Icon size={14} className="text-[#D4A574]/60" />
                      <span className="text-[10px] tracking-[0.15em] uppercase text-white/30">{stat.label}</span>
                    </div>
                    <p className="text-2xl text-white font-medium">{stat.value}</p>
                    <p className="text-[10px] text-[#5A8F5A] mt-1">{stat.change}</p>
                  </div>
                );
              })}
            </div>

            <h3 className="text-xs tracking-[0.15em] uppercase text-white/40 mb-4">Recent Reservations</h3>
            <div className="border border-white/[0.04] overflow-hidden">
              <table className="w-full text-xs">
                <thead>
                  <tr className="border-b border-white/[0.04] text-white/30 text-[10px] tracking-[0.15em] uppercase">
                    <th className="text-left p-4 font-normal">Guest</th>
                    <th className="text-left p-4 font-normal">Date</th>
                    <th className="text-left p-4 font-normal">Time</th>
                    <th className="text-left p-4 font-normal">Guests</th>
                    <th className="text-left p-4 font-normal">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {sampleReservations.map((r) => (
                    <tr key={r.id} className="border-b border-white/[0.02] hover:bg-white/[0.01] transition-colors">
                      <td className="p-4 text-white">{r.name}</td>
                      <td className="p-4 text-white/50">{r.date}</td>
                      <td className="p-4 text-white/50">{r.time}</td>
                      <td className="p-4 text-white/50">{r.guests}</td>
                      <td className="p-4">
                        <span className={`text-[10px] tracking-[0.1em] uppercase px-2 py-1 ${
                          r.status === 'confirmed' ? 'text-[#5A8F5A] border border-[#5A8F5A]/20' :
                          r.status === 'pending' ? 'text-[#C49E45] border border-[#C49E45]/20' :
                          'text-red-400/60 border border-red-400/20'
                        }`}>
                          {r.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'menu' && (
          <div>
            <div className="relative max-w-xs mb-6">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/20" />
              <input
                value={menuSearch}
                onChange={(e) => setMenuSearch(e.target.value)}
                placeholder="Search menu..."
                className="w-full bg-white/[0.03] border border-white/10 pl-10 pr-4 py-2 text-xs text-white placeholder:text-white/20 focus:outline-none focus:border-[#D4A574]/50 transition-colors"
              />
            </div>

            <div className="border border-white/[0.04] overflow-hidden">
              <table className="w-full text-xs">
                <thead>
                  <tr className="border-b border-white/[0.04] text-white/30 text-[10px] tracking-[0.15em] uppercase">
                    <th className="text-left p-4 font-normal">Dish</th>
                    <th className="text-left p-4 font-normal">Category</th>
                    <th className="text-left p-4 font-normal">Price</th>
                    <th className="text-left p-4 font-normal">Rating</th>
                    <th className="text-left p-4 font-normal">Prep</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredItems.map((dish) => (
                    <tr key={dish.id} className="border-b border-white/[0.02] hover:bg-white/[0.01] transition-colors">
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <div className="relative w-8 h-8 overflow-hidden bg-white/[0.03] shrink-0">
                            <Image src={dish.image} alt={dish.name} fill className="object-cover" sizes="32px" />
                          </div>
                          <div>
                            <span className="text-white">{dish.name}</span>
                            {dish.featured && <span className="ml-2 text-[8px] tracking-[0.15em] uppercase text-[#D4A574]/60">Signature</span>}
                          </div>
                        </div>
                      </td>
                      <td className="p-4 text-white/50 capitalize">{dish.category}</td>
                      <td className="p-4 text-[#D4A574]">{formatPrice(dish.price)}</td>
                      <td className="p-4">
                        <div className="flex items-center gap-1">
                          <Star size={10} className="text-[#D4A574] fill-[#D4A574]" />
                          <span className="text-white">{dish.rating}</span>
                        </div>
                      </td>
                      <td className="p-4 text-white/40 flex items-center gap-1">
                        <Clock size={10} /> {dish.prepTime}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'reservations' && (
          <div className="text-center py-16 text-white/20 text-sm">
            <CalendarDays size={32} className="mx-auto mb-4 opacity-30" />
            <p>Reservation management system</p>
            <p className="text-xs text-white/10 mt-1">Full CRUD coming in next release</p>
          </div>
        )}
      </div>
    </main>
  );
}
