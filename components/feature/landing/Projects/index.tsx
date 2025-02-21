import Section from '@/components/common/Section';
import { FC } from 'react';
export interface ProjectsProps {
  className?: string;
}

const Projects: FC<ProjectsProps> = () => {
  return (
    <Section id="Projects" className="bg-surface text-on-surface">
      Projects
    </Section>
  );
};

export default Projects;
