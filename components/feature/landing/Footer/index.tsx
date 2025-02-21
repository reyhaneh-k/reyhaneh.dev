import Section from '@/components/common/Section';
import { FC } from 'react';
export interface FooterProps {
  className?: string;
}

const Footer: FC<FooterProps> = () => {
  return (
    <Section id="Footer" className="bg-surface-dim text-on-surface">
      Footer
    </Section>
  );
};

export default Footer;
