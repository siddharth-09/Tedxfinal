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
  title: "Your App",
  description: "App with smooth scroll",
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