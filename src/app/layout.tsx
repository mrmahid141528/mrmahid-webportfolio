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
    default: "Mr Mahid | Freelance Web Designer & Next.js Developer India",
    template: "%s | Mr Mahid",
  },
  description: "I build premium, high-converting digital experiences. Expert in Next.js, React, and modern UI/UX design. Based in West Bengal, India. Elevate your local business online today.",
  keywords: ["Mr Mahid", "Website Design", "Freelance Web Designer India", "Next.js Development Services", "React.js Developer", "UI/UX Design Services", "md mahid raza", "mahid raza", "graphixel", "web designer india"],
  applicationName: "mrmahid Portfolio",
  authors: [{ name: "Md Mahid Raza" }],
  creator: "Md Mahid Raza",
  icons: {
    icon: "/icon.png",
  },
  alternates: {
    canonical: "https://www.mrmahid.com",
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://www.mrmahid.com",
    title: "Mr Mahid | Freelance Web Designer & Next.js Developer India",
    description: "I build premium, high-converting digital experiences. Expert in Next.js, React, and modern UI/UX design.",
    siteName: "Mr Mahid Web Design Portfolio",
    images: [{
      url: "/Mr%20Mahid%20DP.png", // Must be fully qualified for OG or relative to metadataBase
      width: 1200,
      height: 630,
      alt: "Mr Mahid - Web Designer Portfolio",
    }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Mr Mahid | Premium Web Designer",
    description: "Premium Web Design & Development services using modern Next.js stack.",
    creator: "@mrmahid", // Optional: Update if you have a handle
    images: ["https://www.mrmahid.com/Mr%20Mahid%20DP.png"],
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

        {/* Global JSON-LD Schema (Person, WebSite, & LocalBusiness) */}
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
                  "name": "Md Mahid Raza | Premium Web Developer & Designer",
                  "description": "I build high-converting websites, web applications, and digital experiences using Next.js, React, Node.js, and modern UI/UX design.",
                  "publisher": {
                    "@id": "https://www.mrmahid.com/#person"
                  }
                },
                {
                  "@type": "Person",
                  "@id": "https://www.mrmahid.com/#person",
                  "name": "Md Mahid Raza",
                  "alternateName": "Mr Mahid",
                  "url": "https://www.mrmahid.com",
                  "image": "https://www.mrmahid.com/logo.png",
                  "jobTitle": "Full-Stack Web Developer & UI/UX Designer",
                  "description": "Expert Web Developer specializing in Next.js, React, Node.js, Tailwind CSS, TypeScript, and SEO Optimization. I craft custom, premium websites that turn visitors into loyal customers.",
                  "knowsAbout": [
                    "Web Development",
                    "Frontend Development",
                    "Backend Development",
                    "Next.js",
                    "React.js",
                    "Node.js",
                    "TypeScript",
                    "Tailwind CSS",
                    "UI/UX Design",
                    "SEO Optimization",
                    "E-commerce Development",
                    "CMS Integration (Sanity)",
                    "Web Performance Optimization"
                  ],
                  "worksFor": {
                    "@type": "Organization",
                    "name": "Freelance Web Developer"
                  },
                  "address": {
                    "@type": "PostalAddress",
                    "addressLocality": "West Bengal",
                    "addressCountry": "IN"
                  },
                  "sameAs": [
                    "https://www.github.com/mrmahid141528",
                    "https://www.instagram.com/mrmahid141",
                    "https://youtube.com/@mrmahid9783?si=r8r7FMEK5W4v171R"
                  ]
                },
                {
                  "@type": "LocalBusiness",
                  "@id": "https://www.mrmahid.com/#localbusiness",
                  "name": "Md Mahid Raza Web Development Services",
                  "image": "https://www.mrmahid.com/star-gym-preview.png",
                  "telephone": "+918372932895",
                  "email": "mrmahid141@gmail.com",
                  "address": {
                    "@type": "PostalAddress",
                    "addressLocality": "Kolkata",
                    "addressRegion": "West Bengal",
                    "addressCountry": "IN"
                  },
                  "priceRange": "$$",
                  "description": "Premium Web Design and Development agency based in West Bengal, India. Specializing in high-performance React and Next.js applications.",
                  "url": "https://www.mrmahid.com"
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
