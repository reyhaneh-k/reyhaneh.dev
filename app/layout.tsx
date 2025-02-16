import type { Metadata } from 'next';
import './globals.css';
import { roboto, code } from '@/public/font';

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${roboto.variable} ${code.variable} antialiased`}>
        {children}
        {'testing husky'}
      </body>
    </html>
  );
}
