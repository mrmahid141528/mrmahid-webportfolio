import ContactSection from '@/components/sections/ContactSection';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Contact | Hire Md Mahid Raza — Web Designer',
    description: 'Get in touch with Md Mahid Raza (mrmahid) for premium web design, UI/UX, and digital creation services. Let\'s build your digital future.',
};

export default function ContactPage() {
    return (
        <main className="flex flex-col min-h-screen pt-24">
            <ContactSection />
        </main>
    );
}
