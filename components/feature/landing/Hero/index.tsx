import Section from '@/components/common/Section';
import { FC } from 'react';
import { AboutMe } from './AboutMe';
import { Name } from './Name';
import { User2Icon } from 'lucide-react';
import clsx from 'clsx';
import { SectionsEnum } from '@/components/common/Section/types';
export interface HeroSectionProps {
  className?: string;
}

const HeroSection: FC<HeroSectionProps> = ({ className }) => {
  return (
    <Section
      id={SectionsEnum.Hero}
      className={clsx(
        'flex flex-col justify-start items-center gap-5 ',
        className
      )}
    >
      <div className="bg-gradient-to-l from-secondary-fixed-dim from-40% to-inverse-primary flex flex-col rounded-2xl p-1.5 grow w-full">
        <div className="bg-primary rounded-2xl p-5 flex md:flex-row flex-col gap-3 grow w-full md:items-start items-start justify-start">
          <User2Icon className="basis-3/5 grow" />
          <div className="flex flex-col gap-3 basis-2/5">
            <Name />
            <AboutMe />
          </div>
        </div>
      </div>
    </Section>
  );
};

export default HeroSection;
