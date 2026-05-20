import Hero from '@/components/home/Hero';
import FeaturedDishes from '@/components/home/FeaturedDishes';
import Story from '@/components/home/Story';
import MenuPreview from '@/components/home/MenuPreview';
import ReservationCTA from '@/components/home/ReservationCTA';
import Testimonials from '@/components/home/Testimonials';
import GalleryPreview from '@/components/home/GalleryPreview';
import Newsletter from '@/components/home/Newsletter';

export default function Home() {
  return (
    <main>
      <Hero />
      <FeaturedDishes />
      <Story />
      <MenuPreview />
      <Testimonials />
      <GalleryPreview />
      <ReservationCTA />
      <Newsletter />
    </main>
  );
}
