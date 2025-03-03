import Section from '@/components/common/Section';
import { FC } from 'react';
export interface TechStackProps {
  className?: string;
}

const TechStack: FC<TechStackProps> = ({ className }) => {
  return (
    <Section id="TechStack" className={className}>
      Tech Stack
    </Section>
  );
};

export default TechStack;
