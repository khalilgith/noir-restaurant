'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { menuItems, testimonials } from '@/lib/data';
import { formatPrice } from '@/lib/utils';
import { MenuItem, Reservation } from '@/types';
import { 
  LayoutDashboard, 
  UtensilsCrossed, 
  CalendarCheck, 
  Users, 
  Star, 
  TrendingUp, 
  Plus, 
  Search,
  ChevronDown,
  Edit3,
  Trash2,
  BarChart3,
  Clock,
  DollarSign
} from 'lucide-react';

const navItems = [
  { id: 'overview', label: 'Overview', icon: LayoutDashboard },
  { id: 'menu', label: 'Menu Items', icon: UtensilsCrossed },
  { id: 'reservations', label: 'Reservations', icon: CalendarCheck },
  { id: 'customers', label: 'Customers', icon: Users },
  { id: 'analytics', label: 'Analytics', icon: BarChart3 },
];

const sampleReservations: Reservation[] = [
  { id: '1', name: 'Isabella Montgomery', email: 'isabella@email.com', phone: '+33 6 12 34 56 78', date: '2024-05-20', time: '19:30', guests: 4, occasion: 'Birthday', status: 'confirmed', createdAt: '2024-05-10' },
  { id: '2', name: 'James Whitfield', email: 'james@email.com', phone: '+33 6 23 45 67 89', date: '2024-05-21', time: '20:00', guests: 2, occasion: 'Date Night', status: 'confirmed', createdAt: '2024-05-11' },
  { id: '3', name: 'Sophie Chen', email: 'sophie@email.com', phone: '+33 6 34 56 78 90', date: '2024-05-22', time: '18:30', guests: 6, status: 'pending', createdAt: '2024-05-12' },
  { id: '4', name: 'Marcus Beaumont', email: 'marcus@email.com', phone: '+33 6 45 67 89 01', date: '2024-05-18', time: '21:00', guests: 2, status: 'cancelled', createdAt: '2024-05-08' },
  { id: '5', name: 'Alice Renard', email: 'alice@email.com', phone: '+33 6 56 78 90 12', date: '2024-05-23', time: '20:30', guests: 3, occasion: 'Celebration', status: 'confirmed', createdAt: '2024-05-13' },
];

const categoryColors: Record<string, string> = {
  starters: 'bg-emerald-400/10 text-emerald-400',
  mains: 'bg-orange-400/10 text-orange-400',
  seafood: 'bg-cyan-400/10 text-cyan-400',
  desserts: 'bg-pink-400/10 text-pink-400',
  drinks: 'bg-purple-400/10 text-purple-400',
  wine: 'bg-rose-400/10 text-rose-400',
};

export default function AdminDashboard() {
  const [activeNav, setActiveNav] = useState('overview');
  const [menuSearch, setMenuSearch] = useState('');

  const filteredMenu = menuItems.filter(
    (i) =>
      i.name.toLowerCase().includes(menuSearch.toLowerCase()) ||
      i.category.toLowerCase().includes(menuSearch.toLowerCase())
  );

  const statusColors: Record<string, string> = {
    confirmed: 'bg-emerald-400/10 text-emerald-400',
    pending: 'bg-amber-400/10 text-amber-400',
    cancelled: 'bg-red-400/10 text-red-400',
  };

  const stats = [
    { label: 'Total Revenue', value: '$48,290', change: '+12.5%', icon: DollarSign, positive: true },
    { label: 'Reservations', value: '184', change: '+8.2%', icon: CalendarCheck, positive: true },
    { label: 'Avg. Rating', value: '4.8', change: '+0.3', icon: Star, positive: true },
    { label: 'Popular Dishes', value: '6', change: '+2', icon: TrendingUp, positive: true },
  ];

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white">
      {/* Top bar */}
      <header className="fixed top-0 left-0 right-0 z-50 h-16 bg-[#0A0A0A]/90 backdrop-blur-xl border-b border-white/5 flex items-center px-5 md:px-10">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-full bg-gradient-to-br from-[#C8A97E] to-[#A68B5B] flex items-center justify-center text-white text-[10px] font-bold tracking-wider">
            N
          </div>
          <span className="text-sm tracking-[0.2em] uppercase font-light">Noir</span>
          <span className="text-[10px] text-white/30 ml-2 tracking-wider uppercase bg-white/5 px-2 py-0.5 rounded-full">Admin</span>
        </div>
      </header>

      {/* Layout */}
      <div className="flex pt-16">
        {/* Sidebar */}
        <aside className="fixed left-0 top-16 bottom-0 w-56 border-r border-white/5 p-4 hidden md:block overflow-y-auto">
          <nav className="space-y-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveNav(item.id)}
                className={`relative w-full flex items-center gap-3 px-4 py-2.5 text-sm rounded-xl transition-colors ${
                  activeNav === item.id ? 'text-white' : 'text-white/40 hover:text-white/70'
                }`}
              >
                <AnimatePresence>
                  {activeNav === item.id && (
                    <motion.div
                      layoutId="admin-nav"
                      className="absolute inset-0 bg-white/5 rounded-xl"
                      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                    />
                  )}
                </AnimatePresence>
                <item.icon size={16} className="relative z-10 shrink-0" />
                <span className="relative z-10">{item.label}</span>
              </button>
            ))}
          </nav>
        </aside>

        {/* Main */}
        <main className="flex-1 md:ml-56 p-5 md:p-8 lg:p-10">
          {/* Mobile nav */}
          <div className="flex md:hidden gap-2 mb-6 overflow-x-auto">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveNav(item.id)}
                className={`flex items-center gap-2 px-4 py-2 text-xs rounded-full whitespace-nowrap ${
                  activeNav === item.id
                    ? 'bg-gradient-to-r from-[#C8A97E] to-[#A68B5B] text-white'
                    : 'border border-white/10 text-white/50'
                }`}
              >
                <item.icon size={14} />
                {item.label}
              </button>
            ))}
          </div>

          {/* Overview */}
          {activeNav === 'overview' && (
            <div className="space-y-8">
              <div>
                <h1 className="text-2xl font-medium">Dashboard</h1>
                <p className="text-sm text-white/30 mt-1">Welcome back, Chef. Here&apos;s your restaurant at a glance.</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {stats.map((stat) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-5 rounded-xl border border-white/5 hover:border-white/10 transition-colors"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs text-white/30 tracking-wider uppercase">{stat.label}</span>
                      <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center">
                        <stat.icon size={14} className="text-[#C8A97E]" />
                      </div>
                    </div>
                    <div className="text-2xl font-semibold">{stat.value}</div>
                    <div className={`text-xs mt-1 ${stat.positive ? 'text-emerald-400' : 'text-red-400'}`}>
                      {stat.change} from last month
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Popular dishes */}
              <div>
                <h2 className="text-sm font-medium mb-4 tracking-wider uppercase text-white/50">Popular Dishes</h2>
                <div className="space-y-3">
                  {menuItems.filter((i) => i.featured).slice(0, 5).map((dish, i) => (
                    <div key={dish.id} className="flex items-center gap-4 p-3 rounded-xl border border-white/5">
                      <span className="text-xs text-white/20 w-5">{String(i + 1).padStart(2, '0')}</span>
                      <div className="relative w-10 h-10 rounded-lg overflow-hidden shrink-0">
                        <Image src={dish.image} alt={dish.name} fill className="object-cover" sizes="40px" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-sm truncate">{dish.name}</div>
                        <div className="text-xs text-white/30">{dish.category}</div>
                      </div>
                      <div className="flex items-center gap-1 text-xs text-amber-400">
                        <Star size={12} fill="currentColor" /> {dish.rating}
                      </div>
                      <div className="text-sm text-[#C8A97E]">{formatPrice(dish.price)}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Menu Management */}
          {activeNav === 'menu' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-2xl font-medium">Menu Items</h1>
                  <p className="text-sm text-white/30 mt-1">Manage your restaurant&apos;s menu.</p>
                </div>
                <button className="flex items-center gap-2 px-4 py-2 text-xs tracking-wider uppercase bg-gradient-to-r from-[#C8A97E] to-[#A68B5B] text-white rounded-full hover:from-[#A68B5B] hover:to-[#8B7249] transition-all">
                  <Plus size={14} /> Add Dish
                </button>
              </div>

              {/* Search */}
              <div className="relative max-w-xs">
                <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" />
                <input
                  value={menuSearch}
                  onChange={(e) => setMenuSearch(e.target.value)}
                  placeholder="Search menu..."
                  className="w-full bg-transparent border border-white/10 rounded-full pl-10 pr-4 py-2 text-xs text-white placeholder:text-white/30 focus:outline-none focus:border-[#C8A97E]/50 transition-colors"
                />
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-white/5 text-xs text-white/30 uppercase tracking-wider">
                      <th className="text-left py-3 pr-4">Dish</th>
                      <th className="text-left py-3 pr-4">Category</th>
                      <th className="text-left py-3 pr-4">Price</th>
                      <th className="text-left py-3 pr-4">Rating</th>
                      <th className="text-left py-3 pr-4">Prep Time</th>
                      <th className="text-right py-3">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredMenu.map((dish) => (
                      <tr key={dish.id} className="border-b border-white/5 hover:bg-white/[0.02] transition-colors">
                        <td className="py-3 pr-4">
                          <div className="flex items-center gap-3">
                            <div className="relative w-10 h-10 rounded-lg overflow-hidden shrink-0">
                              <Image src={dish.image} alt={dish.name} fill className="object-cover" sizes="40px" />
                            </div>
                            <div>
                              <div className="text-sm">{dish.name}</div>
                              <div className="text-xs text-white/30 line-clamp-1">{dish.description}</div>
                            </div>
                          </div>
                        </td>
                        <td className="py-3 pr-4">
                          <span className={`text-[10px] px-2 py-0.5 rounded-full tracking-wider uppercase ${categoryColors[dish.category] || 'bg-white/5 text-white/50'}`}>
                            {dish.category}
                          </span>
                        </td>
                        <td className="py-3 pr-4 text-[#C8A97E]">{formatPrice(dish.price)}</td>
                        <td className="py-3 pr-4">
                          <div className="flex items-center gap-1 text-xs">
                            <Star size={12} className="text-amber-400" fill="currentColor" /> {dish.rating}
                          </div>
                        </td>
                        <td className="py-3 pr-4 text-xs text-white/40">{dish.prepTime}</td>
                        <td className="py-3 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <button className="w-8 h-8 rounded-full hover:bg-white/5 flex items-center justify-center transition-colors">
                              <Edit3 size={14} className="text-white/40" />
                            </button>
                            <button className="w-8 h-8 rounded-full hover:bg-white/5 flex items-center justify-center transition-colors">
                              <Trash2 size={14} className="text-red-400/60" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Reservations */}
          {activeNav === 'reservations' && (
            <div className="space-y-6">
              <div>
                <h1 className="text-2xl font-medium">Reservations</h1>
                <p className="text-sm text-white/30 mt-1">Manage upcoming reservations.</p>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-white/5 text-xs text-white/30 uppercase tracking-wider">
                      <th className="text-left py-3 pr-4">Guest</th>
                      <th className="text-left py-3 pr-4">Date</th>
                      <th className="text-left py-3 pr-4">Time</th>
                      <th className="text-left py-3 pr-4">Guests</th>
                      <th className="text-left py-3 pr-4">Occasion</th>
                      <th className="text-left py-3">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {sampleReservations.map((r) => (
                      <tr key={r.id} className="border-b border-white/5 hover:bg-white/[0.02] transition-colors">
                        <td className="py-3 pr-4">
                          <div>
                            <div className="text-sm">{r.name}</div>
                            <div className="text-xs text-white/30">{r.email}</div>
                          </div>
                        </td>
                        <td className="py-3 pr-4 text-sm">{r.date}</td>
                        <td className="py-3 pr-4 text-sm">{r.time}</td>
                        <td className="py-3 pr-4 text-sm">{r.guests}</td>
                        <td className="py-3 pr-4 text-sm text-white/40">{r.occasion || '—'}</td>
                        <td className="py-3">
                          <span className={`text-[10px] px-2 py-0.5 rounded-full tracking-wider uppercase ${statusColors[r.status] || 'bg-white/5 text-white/50'}`}>
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

          {/* Customers */}
          {activeNav === 'customers' && (
            <div className="space-y-6">
              <div>
                <h1 className="text-2xl font-medium">Customers</h1>
                <p className="text-sm text-white/30 mt-1">Your valued guests.</p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {testimonials.map((t) => (
                  <div key={t.id} className="p-4 rounded-xl border border-white/5 hover:border-white/10 transition-colors">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="relative w-10 h-10 rounded-full overflow-hidden">
                        <Image src={t.avatar} alt={t.name} fill className="object-cover" sizes="40px" />
                      </div>
                      <div>
                        <div className="text-sm">{t.name}</div>
                        <div className="text-xs text-white/30">{t.role}</div>
                      </div>
                    </div>
                    <p className="text-xs text-white/40 leading-relaxed line-clamp-3">{t.content}</p>
                    <div className="flex items-center gap-1 mt-2">
                      {Array.from({ length: t.rating }).map((_, i) => (
                        <Star key={i} size={10} className="text-amber-400" fill="currentColor" />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Analytics */}
          {activeNav === 'analytics' && (
            <div className="space-y-6">
              <div>
                <h1 className="text-2xl font-medium">Analytics</h1>
                <p className="text-sm text-white/30 mt-1">Track your restaurant&apos;s performance.</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="p-6 rounded-xl border border-white/5">
                  <h3 className="text-sm font-medium mb-4 flex items-center gap-2">
                    <TrendingUp size={16} className="text-[#C8A97E]" />
                    Revenue Trend
                  </h3>
                  <div className="flex items-end gap-2 h-32">
                    {[40, 55, 45, 70, 60, 80, 75, 90, 85, 95, 88, 100].map((h, i) => (
                      <div key={i} className="flex-1 flex flex-col items-center gap-1">
                        <motion.div
                          initial={{ height: 0 }}
                          animate={{ height: `${h}%` }}
                          transition={{ duration: 0.6, delay: i * 0.05 }}
                          className="w-full bg-gradient-to-t from-[#C8A97E]/50 to-[#C8A97E]/20 rounded-t"
                        />
                      </div>
                    ))}
                  </div>
                  <div className="flex justify-between mt-2 text-[10px] text-white/30">
                    <span>Jan</span><span>Feb</span><span>Mar</span><span>Apr</span><span>May</span><span>Jun</span>
                  </div>
                </div>

                <div className="p-6 rounded-xl border border-white/5">
                  <h3 className="text-sm font-medium mb-4 flex items-center gap-2">
                    <Clock size={16} className="text-[#C8A97E]" />
                    Peak Hours
                  </h3>
                  <div className="flex items-end gap-2 h-32">
                    {[20, 15, 25, 35, 50, 70, 85, 100, 90, 75, 40, 25].map((h, i) => (
                      <div key={i} className="flex-1 flex flex-col items-center">
                        <motion.div
                          initial={{ height: 0 }}
                          animate={{ height: `${h}%` }}
                          transition={{ duration: 0.6, delay: i * 0.05 }}
                          className="w-full bg-gradient-to-t from-[#A68B5B]/50 to-[#A68B5B]/20 rounded-t"
                        />
                      </div>
                    ))}
                  </div>
                  <div className="flex justify-between mt-2 text-[10px] text-white/30">
                    <span>11</span><span>12</span><span>13</span><span>14</span><span>15</span><span>16</span><span>17</span><span>18</span><span>19</span><span>20</span><span>21</span><span>22</span>
                  </div>
                </div>
              </div>

              {/* Top dishes */}
              <div>
                <h2 className="text-sm font-medium mb-4">Top-Rated Dishes</h2>
                <div className="space-y-3">
                  {[...menuItems].sort((a, b) => b.rating - a.rating).slice(0, 5).map((dish, i) => (
                    <div key={dish.id} className="flex items-center gap-4 p-3 rounded-xl border border-white/5">
                      <span className="text-lg font-bold text-[#C8A97E] w-8">{i + 1}</span>
                      <div className="relative w-10 h-10 rounded-lg overflow-hidden shrink-0">
                        <Image src={dish.image} alt={dish.name} fill className="object-cover" sizes="40px" />
                      </div>
                      <div className="flex-1">
                        <div className="text-sm">{dish.name}</div>
                        <div className="text-xs text-white/30">{formatPrice(dish.price)}</div>
                      </div>
                      <div className="flex items-center gap-1 text-sm text-amber-400">
                        <Star size={14} fill="currentColor" /> {dish.rating}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
