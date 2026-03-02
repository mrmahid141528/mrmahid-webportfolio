import ProjectsSection from '@/components/sections/ProjectsSection';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Projects | Md Mahid Raza — Portfolio',
    description: 'Browse the portfolio projects of Md Mahid Raza (mrmahid) — premium websites, UI/UX designs, and digital experiences built for real clients.',
    alternates: {
        canonical: 'https://www.mrmahid.com/projects',
    },
    openGraph: {
        title: 'Projects Portfolio | Md Mahid Raza',
        description: 'Browse the portfolio projects of Md Mahid Raza (mrmahid) — premium websites and digital experiences built for real clients.',
        url: 'https://www.mrmahid.com/projects',
    }
};

export default function ProjectsPage() {
    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'CollectionPage',
        name: 'Md Mahid Raza Projects Portfolio',
        description: 'A collection of premium web design projects, UI/UX work, and modern Next.js applications.',
        url: 'https://www.mrmahid.com/projects'
    };

    return (
        <main className="flex flex-col min-h-screen pt-24">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <ProjectsSection />
        </main>
    );
}
