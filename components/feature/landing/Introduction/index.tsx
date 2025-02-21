import Section from '@/components/common/Section';
import { FC } from 'react';
export interface IntroductionProps {
  className?: string;
}

const Introduction: FC<IntroductionProps> = () => {
  return (
    <Section
      id="Introduction"
      className="bg-surface-variant text-on-surface-variant"
    >
      Introduction
    </Section>
  );
};

export default Introduction;
