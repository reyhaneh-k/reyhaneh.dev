'use client';
import { getTheme, ThemeEnum, toggleTheme } from '@/utils/theme';
import clsx from 'clsx';
import { Moon, SunMedium } from 'lucide-react';
import { FC, HTMLAttributes, useState } from 'react';

type Props = HTMLAttributes<HTMLDivElement>;

const Toggle: FC<Props> = ({ className }) => {
  const [isLight, setIsLight] = useState(getTheme() === ThemeEnum.light);
  return (
    <div
      className={clsx(
        '*:transition-all *:duration-700 absolute shadow-shadow shadow-xs transition-all duration-700 rounded-full bg-inverse-primary w-17 h-8 flex items-center',
        className
      )}
      onClick={() => {
        setIsLight((isLight) => !isLight);
        toggleTheme();
      }}
    >
      <SunMedium
        className={clsx('inset-y-0 absolute bg-white rounded-full my-1 ml-1', {
          'opacity-100 translate-x-0': isLight,
          'opacity-0 translate-x-10': !isLight,
        })}
      />
      <Moon
        className={clsx('inset-y-0 absolute bg-white rounded-full my-1 mr-1', {
          'opacity-100 translate-x-10': !isLight,
          'opacity-0 translate-x-0': isLight,
        })}
      />
    </div>
  );
};

export default Toggle;
