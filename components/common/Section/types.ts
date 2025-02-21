import { ReactNode } from 'react';

export type SectionProps = {
  children: ReactNode;
  className?: string;
  id: SectionIds;
};

export type SectionIds =
  | 'Hero'
  | 'Introduction'
  | 'TechStack'
  | 'Projects'
  | 'Certifications'
  | 'Experience'
  | 'Testimonials'
  | 'Future'
  | 'Footer';
