import type { Metadata } from "next";
import "./globals.css";
import { Menu } from "./components/menus/menu";

export const metadata: Metadata = {
  title: "Reyhaneh.dev",
  description: "Reyhaneh Khoshghadam Developer Portfolio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="w-screen h-screen bg-background font-code pt-32 ">
        <Menu />
        {children}
        <div className="h-[1000px]" id="about"></div>
      </body>
    </html>
  );
}
