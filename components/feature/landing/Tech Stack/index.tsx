import Section from '@/components/common/Section';
import { FC } from 'react';
export interface TechStackProps {
  className?: string;
}

const TechStack: FC<TechStackProps> = () => {
  return (
    <Section
      id="TechStack"
      className="bg-primary-container text-on-primary-container"
    >
      Tech Stack
    </Section>
  );
};

export default TechStack;
