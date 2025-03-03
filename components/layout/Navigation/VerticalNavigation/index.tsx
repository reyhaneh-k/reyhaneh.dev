'use client';
import { SectionsEnum } from '@/components/common/Section/types';
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
  icon: FC<{ size: number; className?: string }>;
  id: SectionsEnum;
}> = [
  {
    icon: ({ size }) => <Terminal size={size} />,
    id: SectionsEnum.Hero,
  },
  {
    icon: ({ size, className }) => <User size={size} className={className} />,
    id: SectionsEnum.Introduction,
  },
  {
    icon: ({ size, className }) => <Laptop size={size} className={className} />,
    id: SectionsEnum.TechStack,
  },
  {
    icon: ({ size, className }) => (
      <FolderGit2 size={size} className={className} />
    ),
    id: SectionsEnum.Projects,
  },
  {
    icon: ({ size, className }) => (
      <BriefcaseBusiness size={size} className={className} />
    ),
    id: SectionsEnum.Experience,
  },
  {
    icon: ({ size, className }) => <Mail size={size} className={className} />,
    id: SectionsEnum.Testimonials,
  },
  {
    icon: ({ size, className }) => <Clock size={size} className={className} />,
    id: SectionsEnum.Future,
  },
  {
    icon: ({ size, className }) => (
      <ShieldCheck size={size} className={className} />
    ),
    id: SectionsEnum.Certifications,
  },
  {
    icon: ({ size, className }) => (
      <Signature size={size} className={className} />
    ),
    id: SectionsEnum.Footer,
  },
];

const VerticalNavigation: FC<HTMLAttributes<HTMLDivElement>> = ({
  className,
  ...props
}) => {
  const inViewSection = useInViewSection();

  return (
    <div
      className={`fixed flex flex-col left-0 top-1/2 -translate-y-1/2 justify-center bg-inverse-primary
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
            className={`peer *:transition-all bg-inverse-primary w-14 px-4 py-2 text-primary ${index === 0 ? 'rounded-t-2xl pt-5' : index === sectionsInfo.length - 1 ? 'rounded-b-2xl pb-5' : ''}
             `}
          >
            <section.icon size={inViewSection === section.id ? 35 : 25} />
          </span>
          <span className="-translate-x-7/8 -z-20 peer-hover:translate-x-8 transition-transform absolute left-10 text-nowrap bg-surface-container-low text-on-surface p-1 rounded-sm">
            {section.id}
          </span>
        </span>
      ))}
    </div>
  );
};

export default VerticalNavigation;
