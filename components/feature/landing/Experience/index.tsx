import Section from '@/components/common/Section';
import { FC } from 'react';
export interface ExperienceProps {
  className?: string;
}

const Experience: FC<ExperienceProps> = () => {
  return (
    <Section
      id="Experience"
      className="bg-secondary-container text-on-secondary-container"
    >
      Experince
    </Section>
  );
};

export default Experience;
