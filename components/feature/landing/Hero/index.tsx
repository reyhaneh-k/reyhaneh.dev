import Section from '@/components/common/Section';
import { FC } from 'react';
import { AboutMe } from './AboutMe';
import { Name } from './Name';
import { User2Icon } from 'lucide-react';
export interface HeroSectionProps {
  className?: string;
}

const HeroSection: FC<HeroSectionProps> = () => {
  return (
    <Section
      id="Hero"
      className="bg-background text-on-background flex flex-col justify-start items-center gap-5 "
    >
      <div className="bg-gradient-to-b from-primary to-inverse-primary flex flex-col rounded-2xl p-1.5 grow w-full">
        <div className="bg-background rounded-2xl p-3 flex md:flex-row flex-col gap-3 grow w-full md:items-center items-start justify-start">
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
