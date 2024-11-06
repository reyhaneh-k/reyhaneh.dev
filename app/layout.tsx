import type { Metadata } from "next";
import "./globals.css";
import { MenuBar } from "./components/menu-bar/menu-bar";
import { VerticalIndicator } from "./components/vertical-indicator-menu";

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
      <body className="w-screen h-screen bg-background font-code">
        <VerticalIndicator />
        <MenuBar />
        {children}
        <div className="h-[1000px]" id="about"></div>
      </body>
    </html>
  );
}
