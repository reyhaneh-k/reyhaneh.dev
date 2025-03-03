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

export enum SectionsEnum {
  Hero = 'Hero',
  Introduction = 'Introduction',
  TechStack = 'TechStack',
  Projects = 'Projects',
  Certifications = 'Certifications',
  Experience = 'Experience',
  Testimonials = 'Testimonials',
  Future = 'Future',
  Footer = 'Footer',
}
