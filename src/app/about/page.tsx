import ProfileSection from '@/components/sections/ProfileSection';
import WhyChooseMe from '@/components/sections/WhyChooseMe';
import TestimonialsSection from '@/components/sections/TestimonialsSection';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'About | Md Mahid Raza — Web Designer & Digital Creator',
    description: 'Learn about Md Mahid Raza (mrmahid) — a premium web designer from India specializing in Next.js, React, UI/UX, and animated digital experiences.',
};

export default function AboutPage() {
    return (
        <main className="flex flex-col min-h-screen pt-24">
            <ProfileSection />
            <WhyChooseMe />
            <TestimonialsSection />
        </main>
    );
}
