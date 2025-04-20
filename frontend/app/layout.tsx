import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import SharedBackground from "./components/SharedBackground";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "BookMyEvent",
  description: "Book and manage events seamlessly",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <SharedBackground />
        {children}
      </body>
    </html>
  );
}