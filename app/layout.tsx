import type { Metadata } from "next";
import "./globals.css";

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
      <body className="w-screen h-screen">{children}</body>
    </html>
  );
}
