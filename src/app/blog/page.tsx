import BlogSection from '@/components/sections/BlogSection';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Blog | Md Mahid Raza — Web Design Tips & Insights',
    description: 'Read tips on web design, digital growth strategies, and how local businesses can win online — by Md Mahid Raza (mrmahid).',
    alternates: {
        canonical: 'https://www.mrmahid.com/blog',
    },
    openGraph: {
        title: 'Blog & Insights | Md Mahid Raza',
        description: 'Read tips on web design, digital growth strategies, and how local businesses can win online.',
        url: 'https://www.mrmahid.com/blog',
    }
};

export const dynamic = 'force-dynamic';

export default function BlogPage() {
    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'Blog',
        name: 'Md Mahid Raza Blog',
        description: 'Web design tips, digital growth strategies, and tutorials for local businesses.',
        url: 'https://www.mrmahid.com/blog',
        publisher: {
            '@type': 'Person',
            name: 'Md Mahid Raza'
        }
    };

    return (
        <main className="flex flex-col min-h-screen pt-24">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <BlogSection />
        </main>
    );
}
