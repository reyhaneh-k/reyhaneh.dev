'use client';
import { toggleTheme } from '@/utils/theme';
import clsx from 'clsx';
import { Moon, SunMedium } from 'lucide-react';
import { FC, HTMLAttributes } from 'react';

type Props = HTMLAttributes<HTMLDivElement>;

const Toggle: FC<Props> = ({ className }) => {
  return (
    <div
      className={clsx(
        '*:transition-all *:duration-700 relative shadow-shadow shadow-xs transition-all duration-700 rounded-full bg-inverse-primary w-17 h-8 flex items-center',
        className
      )}
      onClick={() => {
        toggleTheme();
      }}
    >
      <SunMedium
        className={clsx(
          'inset-y-0 absolute bg-white rounded-full my-1 ml-1 dark:opacity-0 dark:translate-x-10 light:opacity-100 light:translate-x-0'
        )}
      />
      <Moon
        className={clsx(
          'inset-y-0 absolute bg-white rounded-full my-1 mr-1 light:opacity-0 light:translate-x-0 dark:opacity-100 dark:translate-x-10'
        )}
      />
    </div>
  );
};

export default Toggle;
