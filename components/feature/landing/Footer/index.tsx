import Section from '@/components/common/Section';
import { FC } from 'react';
export interface FooterProps {
  className?: string;
}

const Footer: FC<FooterProps> = ({ className }) => {
  return (
    <Section id="Footer" className={className}>
      Footer
    </Section>
  );
};

export default Footer;
