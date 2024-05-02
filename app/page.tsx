'use client';

import StarsCanvas from '@/components/home/StarBackground';
import Navbar from '@/components/home/Navbar';
import Hero from '@/components/home/Hero';
import Footer from '@/components/home/Footer';
import { inter } from '@/app/ui/fonts';

export default function Page() {
  return (
    <div className={`bg-[#030014] ${inter.className}`}>
      <StarsCanvas />
      <Navbar />
      <Hero />
      <Footer />
    </div>
  );
}
