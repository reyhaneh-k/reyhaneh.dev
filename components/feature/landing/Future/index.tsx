import Section from '@/components/common/Section';
import { FC } from 'react';
export interface FutureProps {
  className?: string;
}

const Future: FC<FutureProps> = ({ className }) => {
  return (
    <Section id="Future" className={className}>
      Future
    </Section>
  );
};

export default Future;
