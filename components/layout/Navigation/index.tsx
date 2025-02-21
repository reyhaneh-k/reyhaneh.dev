'use client';
import { SectionIds } from '@/components/common/Section/types';
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
import { FC, ReactNode } from 'react';

const sectionsInfo: Array<{
  icon: ReactNode;
  id: SectionIds;
}> = [
  { icon: <Terminal />, id: 'Hero' },
  { icon: <User />, id: 'Introduction' },
  { icon: <Laptop />, id: 'TechStack' },
  { icon: <FolderGit2 />, id: 'Projects' },
  { icon: <BriefcaseBusiness />, id: 'Experience' },
  {
    icon: <Mail />,
    id: 'Testimonials',
  },
  {
    icon: <Clock />,
    id: 'Future',
  },
  { icon: <ShieldCheck />, id: 'Certifications' },
  { icon: <Signature />, id: 'Footer' },
];
const Navigation: FC = () => {
  return (
    <div className="fixed flex flex-col left-0 top-1/2 -translate-y-1/2 justify-center bg-surface-variant  py-2 rounded-2xl shadow-2xl shadow-shadow ">
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
            className={`peer bg-surface-variant w-full  px-4 py-2  text-on-surface-variant ${index === 0 ? 'rounded-t-2xl' : index === sectionsInfo.length - 1 ? 'rounded-b-2xl' : ''}`}
          >
            {section.icon}
          </span>
          <span className="-translate-x-full -z-20 peer-hover:translate-x-8 transition-transform absolute left-10 text-nowrap">
            {section.id}
          </span>
        </span>
      ))}
    </div>
  );
};

export default Navigation;
