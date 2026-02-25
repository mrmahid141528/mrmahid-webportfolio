import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import LenisProvider from "@/components/layout/LenisProvider";
import CustomCursor from "@/components/ui/CustomCursor";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";
import WhatsAppButton from "@/components/ui/WhatsAppButton";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Md Mahid Raza (mrmahid) | Premium Web Designer & Digital Creator",
  description: "Advanced animated portfolio of Md Mahid Raza (mrmahid). Expert in Next.js, React, UI/UX, and 3D Web experiences. Hire me for premium web design.",
  keywords: ["mrmahid", "mr mahid", "md mahid raza", "mahid raza", "graphixel", "web designer", "ui ux designer", "next.js developer", "freelance web designer india", "mrmahid portfolio"],
  applicationName: "mrmahid Portfolio",
  authors: [{ name: "Md Mahid Raza" }],
  creator: "Md Mahid Raza",
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://mrmahid-webportfolio.netlify.app", // User can change this later when connecting custom domain
    title: "Md Mahid Raza (mrmahid) | Premium Web Designer",
    description: "Advanced animated portfolio showcasing premium web design, 3D experiences, and digital creation by Md Mahid Raza (mrmahid).",
    siteName: "mrmahid Studio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Md Mahid Raza (mrmahid) | Premium Web Designer",
    description: "Let's build your digital future. View the portfolio of Md Mahid Raza.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased selection:bg-primary/30 selection:text-primary z-0`}
      >
        <LenisProvider>
          <CustomCursor />
          <Navbar />
          <WhatsAppButton />
          <main className="relative z-10 w-full min-h-screen">
            {children}
          </main>
          <Footer />
        </LenisProvider>
      </body>
    </html>
  );
}
