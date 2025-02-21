import Section from '@/components/common/Section';
import { FC } from 'react';
export interface FutureProps {
  className?: string;
}

const Future: FC<FutureProps> = () => {
  return (
    <Section id="Future" className="bg-surface">
      Future
    </Section>
  );
};

export default Future;
