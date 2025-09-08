import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import SmoothScrollProvider from '@/components/SmoothScrollProvider';
import Navbar from "@/components/Navbar";
import { Host_Grotesk } from 'next/font/google';
// import MobileNavPopup from "@/components/MobilePopup";



const inter = Inter({ subsets: ["latin"] });

const hostGrotesk = Host_Grotesk({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-host-grotesk',
});
export const metadata: Metadata = {
  title: "TEDxSVIT",
  description: "Official Website for TEDxSVIT",
  icons: {
    icon: "/favicon.ico", // Place favicon.ico in your public/ folder
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png", // Optional: for iOS
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={hostGrotesk.variable}>
      
      <body className={inter.className}>
        <SmoothScrollProvider>
          {/* <MobileNavPopup /> */}
          <Navbar/>
          {children}
        </SmoothScrollProvider>
      </body>
    </html>
  );
}