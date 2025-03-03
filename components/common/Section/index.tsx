import { FC } from 'react';
import { SectionProps } from './types';

const Section: FC<SectionProps> = ({ children, className, id }) => {
  return (
    <div
      id={id}
      className={`pt-20 pb-10 sm:px-20 px-5 h-dvh flex justify-center items-center snap-start snap-always ${className}`}
    >
      {children}
    </div>
  );
};

export default Section;
