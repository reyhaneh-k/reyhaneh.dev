import Section from '@/components/common/Section';
import { FC } from 'react';
export interface TestimonialsProps {
  className?: string;
}

const Testimonials: FC<TestimonialsProps> = ({ className }) => {
  return (
    <Section id="Testimonials" className={className}>
      Testimonials
    </Section>
  );
};

export default Testimonials;
