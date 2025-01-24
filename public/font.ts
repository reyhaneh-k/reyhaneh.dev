// variable font
import { M_PLUS_Code_Latin } from 'next/font/google';
import { Roboto_Mono } from 'next/font/google';

export const code = M_PLUS_Code_Latin({
  subsets: ['latin'],
  variable: '--font-code',
});
export const roboto = Roboto_Mono({
  subsets: ['latin'],
  variable: '--font-roboto',
});
