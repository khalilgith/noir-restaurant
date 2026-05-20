export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: MenuCategory;
  image: string;
  tags: string[];
  featured: boolean;
  rating: number;
  prepTime: string;
  calories?: number;
  allergens?: string[];
}

export type MenuCategory =
  | 'starters'
  | 'mains'
  | 'seafood'
  | 'desserts'
  | 'drinks'
  | 'wine';

export interface Reservation {
  id: string;
  name: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  guests: number;
  occasion?: string;
  specialRequests?: string;
  status: 'pending' | 'confirmed' | 'cancelled';
  tableNumber?: number;
  createdAt: string;
}

export interface Testimonial {
  id: string;
  name: string;
  avatar: string;
  role: string;
  content: string;
  rating: number;
  date?: string;
}

export interface GalleryImage {
  id: string;
  src: string;
  alt: string;
  category: 'interior' | 'food' | 'events' | 'team';
  width: number;
  height: number;
}

export interface OpeningHours {
  day: string;
  hours: string;
}

export interface AIChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}
