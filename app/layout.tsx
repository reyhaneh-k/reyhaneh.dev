import type { Metadata } from "next";
import "./globals.css";
import { Menu } from "./components/menus/menu";
import { CursorLight } from "./components/cursorLight";
import { M_PLUS_Code_Latin } from "next/font/google";
import { Roboto } from "next/font/google";

export const metadata: Metadata = {
  title: "Reyhaneh.dev",
  description: "Reyhaneh Khoshghadam Developer Portfolio",
};
const code = M_PLUS_Code_Latin({
  subsets: ["latin"],
  variable: "--font-code",
});
export const roboto = Roboto({
  subsets: ["latin"],
  variable: "--font-roboto",
  weight: ["100", "300", "500", "700"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`h-screen overflow-x-hidden relative bg-background pt-32  ${code.variable} font-code`}
      >
        <Menu />
        {/* <CursorLight /> */}
        {children}
      </body>
    </html>
  );
}
