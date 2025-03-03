import Section from '@/components/common/Section';
import { FC } from 'react';
export interface ExperienceProps {
  className?: string;
}

const Certifications: FC<ExperienceProps> = ({ className }) => {
  return (
    <Section id="Certifications" className={className}>
      Certifications
    </Section>
  );
};

export default Certifications;
