import Section from '@/components/common/Section';
import { FC } from 'react';
export interface HeroSectionProps {
  className?: string;
}

const HeroSection: FC<HeroSectionProps> = () => {
  return (
    <Section id="Hero" className="bg-background text-on-background">
      HeroSection
    </Section>
  );
};

export default HeroSection;
