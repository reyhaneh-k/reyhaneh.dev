'use client';
import { SectionIds } from '@/components/common/Section/types';
import { useInViewSection } from '@/hooks/useInViewSection';
import {
  BriefcaseBusiness,
  Clock,
  FolderGit2,
  Laptop,
  Mail,
  ShieldCheck,
  Signature,
  Terminal,
  User,
} from 'lucide-react';
import { FC, HTMLAttributes } from 'react';

const sectionsInfo: Array<{
  icon: FC<{ size: number }>;
  id: SectionIds;
}> = [
  {
    icon: ({ size }) => <Terminal size={size} />,
    id: 'Hero',
  },
  { icon: ({ size }) => <User size={size} />, id: 'Introduction' },
  { icon: ({ size }) => <Laptop size={size} />, id: 'TechStack' },
  { icon: ({ size }) => <FolderGit2 size={size} />, id: 'Projects' },
  { icon: ({ size }) => <BriefcaseBusiness size={size} />, id: 'Experience' },
  {
    icon: ({ size }) => <Mail size={size} />,
    id: 'Testimonials',
  },
  {
    icon: ({ size }) => <Clock size={size} />,
    id: 'Future',
  },
  { icon: ({ size }) => <ShieldCheck size={size} />, id: 'Certifications' },
  { icon: ({ size }) => <Signature size={size} />, id: 'Footer' },
];

const VerticalNavigation: FC<HTMLAttributes<HTMLDivElement>> = ({
  className,
  ...props
}) => {
  const inViewSection = useInViewSection();

  return (
    <div
      className={`fixed flex flex-col left-0 top-1/2 -translate-y-1/2 justify-center bg-surface-variant
         py-2 rounded-2xl shadow-lg shadow-shadow ${className}`}
      {...props}
    >
      {sectionsInfo.map((section, index) => (
        <span
          className="flex w-full items-center cursor-pointer"
          key={section.id}
          onClick={() => {
            document
              .querySelector(`#${section.id}`)
              ?.scrollIntoView({ behavior: 'smooth' });
          }}
        >
          <span
            className={`peer *:transition-all bg-surface-variant w-14 px-4 py-2  text-on-surface-variant ${index === 0 ? 'rounded-t-2xl' : index === sectionsInfo.length - 1 ? 'rounded-b-2xl' : ''}
             `}
          >
            <section.icon size={inViewSection === section.id ? 30 : 20} />
          </span>
          <span className="-translate-x-full -z-20 peer-hover:translate-x-8 transition-transform absolute left-10 text-nowrap">
            {section.id}
          </span>
        </span>
      ))}
    </div>
  );
};

export default VerticalNavigation;
