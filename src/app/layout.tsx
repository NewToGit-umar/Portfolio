import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import type { Viewport } from 'next'

export const viewport: Viewport = {
  themeColor: '#0a0a0a',
}


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
   appleWebApp: {
    capable: true,
    title: 'Umar Farooq',
    statusBarStyle: 'black-translucent',
  },
  title: "Umar Farooq | Developer",
  description: "Umar Farooq builds high-performance software, secure architectures, and thoughtful digital experiences.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
