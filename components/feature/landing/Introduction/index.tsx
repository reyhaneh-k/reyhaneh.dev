import Section from '@/components/common/Section';
import { SectionsEnum } from '@/components/common/Section/types';
import { FC } from 'react';
export interface IntroductionProps {
  className?: string;
}

const Introduction: FC<IntroductionProps> = ({ className }) => {
  return (
    <Section id={SectionsEnum.Introduction} className={className}>
      <div className="md:text-2xl text-xl text-text tracking-normal leading-normal md:tracking-wider md:leading-loose lg:max-w-[60vw]">
        <h1 className="text-secondary text-3xl tracking-wider m-5">Hello!</h1>
        I&apos;m Reyhaneh, a <span>self-driven</span>
        frontend developer who began through self-directed learning. Leveraging
        technical expertise gained through
        <span>intensive training</span>
        at Rahnema College, I have a strong foundation in
        <span>modern web technologies</span>& I thrive in Agile environments.
        I&apos;m passionate about creating <span>intuitive, responsive</span>
        user interfaces.
      </div>
    </Section>
  );
};

export default Introduction;
