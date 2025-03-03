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
    <div className="snap-mandatory snap-y scroll-smooth h-screen overflow-y-scroll ">
      <HeroSection className="bg-primary text-on-primary" />
      <Introduction className="bg-surface-container text-on-surface-container" />
      <TechStack className="bg-secondary text-on-secondary" />
      <Projects className="bg-surface-container-high text-on-surface" />
      <Experience className="bg-tertiary text-on-tertiary" />
      <Testimonials className="bg-surface-variant text-on-surface-variant" />
      <Future className="bg-secondary-container text-on-secondary-container" />
      <Certifications className="bg-surface-container text-on-surface" />
      <Footer className="bg-background text-on-background" />
    </div>
  );
}
