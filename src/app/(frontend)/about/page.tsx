import ProfileSection from '@/components/sections/ProfileSection';
import WhyChooseMe from '@/components/sections/WhyChooseMe';
import TestimonialsSection from '@/components/sections/TestimonialsSection';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'About | Md Mahid Raza — Web Designer & Digital Creator',
    description: 'Learn about Md Mahid Raza (mrmahid) — a premium web designer from India specializing in Next.js, React, UI/UX, and animated digital experiences.',
    alternates: {
        canonical: 'https://www.mrmahid.com/about',
    },
    openGraph: {
        title: 'About | Md Mahid Raza',
        description: 'Learn about Md Mahid Raza (mrmahid) — a premium web designer from India specializing in Next.js, React, UI/UX, and animated digital experiences.',
        url: 'https://www.mrmahid.com/about',
    }
};

export default function AboutPage() {
    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'ProfilePage',
        dateCreated: '2024-01-01T08:00:00+08:00',
        dateModified: new Date().toISOString(),
        mainEntity: {
            '@type': 'Person',
            name: 'Md Mahid Raza',
            alternateName: 'mrmahid',
            identifier: 'mrmahid141528',
            interactive: true,
            description: 'A premium web designer from India specializing in Next.js, React, UI/UX, and animated digital experiences.',
            image: "https://www.mrmahid.com/logo.png",
        }
    };

    return (
        <main className="flex flex-col min-h-screen pt-24">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <ProfileSection />
            <WhyChooseMe />
            <TestimonialsSection />
        </main>
    );
}
