'use client';
import { SectionIds } from '@/components/common/Section/types';
import { useInViewSection } from '@/hooks/useInViewSection';
import {
  BriefcaseBusiness,
  Clock,
  FolderGit2,
  Laptop,
  Mail,
  Minus,
  ShieldCheck,
  Signature,
  Terminal,
  User,
} from 'lucide-react';
import { FC, HTMLAttributes, useState } from 'react';
import Toggle from '../Toggle';
import clsx from 'clsx';

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
const HamburgerMenu: FC<HTMLAttributes<HTMLDivElement>> = ({
  className,
  ...props
}) => {
  const [isMenuOpen, openMenu] = useState(false);
  const inViewSection = useInViewSection();

  return (
    <div
      className={`fixed top-0 inset-x-0 flex items-center ${className}`}
      {...props}
    >
      <div
        className="cursor-pointer z-20 absolute right-8 top-2"
        onClick={() => {
          openMenu((isMenuOpen) => !isMenuOpen);
        }}
      >
        <Minus
          className={`absolute top-0 text-tertiary  transition-all ${
            isMenuOpen ? 'rotate-45 translate-y-2' : ''
          }`}
        />
        <Minus
          className={`absolute top-3 text-tertiary  transition-all ${
            isMenuOpen ? '-rotate-45  -translate-y-1 ' : ''
          }`}
        />
      </div>
      <Toggle
        className={clsx(
          'top-2 left-2 transition-all duration-700 ',
          isMenuOpen && 'opacity-0 -translate-x-full',
          !isMenuOpen && 'translate-x-0  opacity-100'
        )}
      />

      <div
        className={`absolute top-0 items-center flex flex-wrap  p-2 gap-2 rounded-br-xl max-w-6/7 justify-start
          bg-surface-variant shadow-shadow shadow transition-all duration-700
          ${isMenuOpen ? 'translate-x-0' : '-translate-x-[110%]'}`}
      >
        {sectionsInfo.map((section) => (
          <span
            className={`*:transition-all text-on-surface-variant cursor-pointer
             `}
            key={section.id}
            onClick={() => {
              document
                .querySelector(`#${section.id}`)
                ?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            <section.icon size={inViewSection === section.id ? 30 : 20} />
          </span>
        ))}
      </div>
    </div>
  );
};

export default HamburgerMenu;
