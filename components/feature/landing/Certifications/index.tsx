import Section from '@/components/common/Section';
import { FC } from 'react';
export interface ExperienceProps {
  className?: string;
}

const Certifications: FC<ExperienceProps> = () => {
  return (
    <Section
      id="Certifications"
      className="bg-secondary-container text-on-secondary-container"
    >
      Certifications
    </Section>
  );
};

export default Certifications;
