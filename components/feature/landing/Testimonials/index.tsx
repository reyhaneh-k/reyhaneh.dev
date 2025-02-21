import Section from '@/components/common/Section';
import { FC } from 'react';
export interface TestimonialsProps {
  className?: string;
}

const Testimonials: FC<TestimonialsProps> = () => {
  return (
    <Section id="Testimonials" className="bg-surface">
      Testimonials
    </Section>
  );
};

export default Testimonials;
