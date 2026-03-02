import ContactSection from '@/components/sections/ContactSection';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Contact | Hire Md Mahid Raza — Web Designer',
    description: "Get in touch with Md Mahid Raza (mrmahid) for premium web design, UI/UX, and digital creation services. Let's build your digital future.",
    alternates: {
        canonical: 'https://www.mrmahid.com/contact',
    },
    openGraph: {
        title: 'Contact Md Mahid Raza',
        description: "Get in touch with Md Mahid Raza (mrmahid) for premium web design, UI/UX, and digital creation services.",
        url: 'https://www.mrmahid.com/contact',
    }
};

export default function ContactPage() {
    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'ContactPage',
        name: 'Contact Md Mahid Raza',
        description: 'Contact information and inquiry form for Md Mahid Raza web design services.',
        url: 'https://www.mrmahid.com/contact',
        mainEntity: {
            '@type': 'Person',
            name: 'Md Mahid Raza',
            email: 'mrmahid141528@gmail.com',
            telephone: '+917865055431'
        }
    };

    return (
        <main className="flex flex-col min-h-screen pt-24">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <ContactSection />
        </main>
    );
}
