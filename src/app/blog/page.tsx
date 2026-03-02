import BlogSection from '@/components/sections/BlogSection';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Blog | Md Mahid Raza — Web Design Tips & Insights',
    description: 'Read tips on web design, digital growth strategies, and how local businesses can win online — by Md Mahid Raza (mrmahid).',
};

export default function BlogPage() {
    return (
        <main className="flex flex-col min-h-screen pt-24">
            <BlogSection />
        </main>
    );
}
