import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.mrmahid.com"),
  title: {
    default: "Md Mahid Raza (mrmahid) | Premium Web Designer & Next.js Developer",
    template: "%s | Md Mahid Raza (mrmahid)",
  },
  description: "I build premium, high-converting digital experiences. Expert in Next.js, React, and modern UI/UX design. Based in West Bengal, India. Elevate your local business online today.",
  keywords: ["mrmahid", "mr mahid", "md mahid raza", "mahid raza", "graphixel", "web designer india", "Next.js Developer", "freelance web designer west bengal", "ui/ux designer"],
  applicationName: "mrmahid Portfolio",
  authors: [{ name: "Md Mahid Raza" }],
  creator: "Md Mahid Raza",
  alternates: {
    canonical: "https://www.mrmahid.com",
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://www.mrmahid.com",
    title: "Md Mahid Raza (mrmahid) | Premium Web Designer",
    description: "I build premium, high-converting digital experiences. Expert in Next.js, React, and modern UI/UX design.",
    siteName: "Md Mahid Raza Portfolio",
    images: [{
      url: "/star-gym-preview.png", // Must be fully qualified for OG or relative to metadataBase
      width: 1200,
      height: 630,
      alt: "Md Mahid Raza - Web Designer Portfolio",
    }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Md Mahid Raza | Premium Web Designer",
    description: "Premium Web Design & Development services using modern Next.js stack.",
    creator: "@mrmahid", // Optional: Update if you have a handle
    images: ["https://www.mrmahid.com/star-gym-preview.png"],
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
  verification: {
    google: "LLSVmF1O8whBOvNEvSxX5Xa282TK_C1v5Z9qBVVdtRw"
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-KZK1VCQRP9"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-KZK1VCQRP9');
          `}
        </Script>

        {/* Global JSON-LD Schema (Person & WebSite) */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "WebSite",
                  "@id": "https://www.mrmahid.com/#website",
                  "url": "https://www.mrmahid.com",
                  "name": "Md Mahid Raza Portfolio",
                  "description": "Premium Web Designer and Developer based in India.",
                  "publisher": {
                    "@id": "https://www.mrmahid.com/#person"
                  }
                },
                {
                  "@type": "Person",
                  "@id": "https://www.mrmahid.com/#person",
                  "name": "Md Mahid Raza",
                  "url": "https://www.mrmahid.com",
                  "image": "https://www.mrmahid.com/logo.png",
                  "jobTitle": "Web Designer & Developer",
                  "worksFor": {
                    "@type": "Organization",
                    "name": "Freelance"
                  },
                  "address": {
                    "@type": "PostalAddress",
                    "addressLocality": "West Bengal",
                    "addressCountry": "IN"
                  },
                  "sameAs": [
                    "https://www.github.com/mrmahid141528" // Update with your LinkedIn/Twitter links later
                  ]
                }
              ]
            })
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased selection:bg-primary/30 selection:text-primary z-0`}
      >
        {children}
      </body>
    </html>
  );
}
