'use client';
import Certifications from '@/components/feature/landing/Certifications';
import Experience from '@/components/feature/landing/Experience';
import Footer from '@/components/feature/landing/Footer';
import Future from '@/components/feature/landing/Future';
import HeroSection from '@/components/feature/landing/Hero';
import Introduction from '@/components/feature/landing/Introduction';
import Projects from '@/components/feature/landing/Projects';
import TechStack from '@/components/feature/landing/Tech Stack';
import Testimonials from '@/components/feature/landing/Testimonials';
import { initializeTheme } from '@/utils/theme';
import { useEffect } from 'react';
export default function Home() {
  useEffect(() => {
    initializeTheme();
  }, []);
  return (
    <div className="snap-mandatory snap-y scroll-smooth h-screen overflow-y-scroll">
      <HeroSection />
      <Introduction />
      <TechStack />
      <Projects />
      <Experience />
      <Testimonials />
      <Future />
      <Certifications />
      <Footer />
    </div>
  );
}
