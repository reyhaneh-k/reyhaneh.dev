import Section from '@/components/common/Section';
import { FC } from 'react';
export interface ExperienceProps {
  className?: string;
}

const Experience: FC<ExperienceProps> = ({ className }) => {
  return (
    <Section id="Experience" className={className}>
      Experince
    </Section>
  );
};

export default Experience;
