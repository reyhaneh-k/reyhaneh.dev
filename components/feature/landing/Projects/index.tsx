import Section from '@/components/common/Section';
import { FC } from 'react';
export interface ProjectsProps {
  className?: string;
}

const Projects: FC<ProjectsProps> = ({ className }) => {
  return (
    <Section id="Projects" className={className}>
      Projects
    </Section>
  );
};

export default Projects;
