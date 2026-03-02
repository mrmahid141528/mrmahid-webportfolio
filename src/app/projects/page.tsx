import ProjectsSection from '@/components/sections/ProjectsSection';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Projects | Md Mahid Raza — Portfolio',
    description: 'Browse the portfolio projects of Md Mahid Raza (mrmahid) — premium websites, UI/UX designs, and digital experiences built for real clients.',
};

export default function ProjectsPage() {
    return (
        <main className="flex flex-col min-h-screen pt-24">
            <ProjectsSection />
        </main>
    );
}
