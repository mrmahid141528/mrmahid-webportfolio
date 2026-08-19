import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Morse Code Practice Pad | Free Interactive Trainer | Md Mahid Raza',
    description: 'Master Morse Code for free with this cinematic, interactive practice pad. Features sound feedback, visual decoding tree, realistic telegraph key, and SOS macros.',
    keywords: [
        'learn morse code online',
        'morse code practice pad',
        'free morse code trainer',
        'interactive morse code',
        'morse code translator',
        'send SOS in morse code',
        'telegraph key simulator',
        'morse code interactive tree',
        'learn morse',
        'morse code decoder',
        'morse code audio practice',
        'morse code game online',
        'morse code typing'
    ],
    openGraph: {
        title: 'Morse Code Practice Pad | Free Interactive Trainer',
        description: 'Master Morse code with this free, interactive, cinematic learning tool. Features sound, decoding tree, and realistic telegraph UI.',
        url: 'https://mrmahid.com/services/morse-code-practice',
        siteName: 'Md Mahid Raza Portfolio',
        locale: 'en_US',
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Learn Morse Code Interactively | Free Practice Pad',
        description: 'Master Morse code with this free, interactive, cinematic learning tool. Features sound, decoding tree, and realistic telegraph UI.',
    },
    alternates: {
        canonical: 'https://mrmahid.com/services/morse-code-practice',
    }
};

const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Morse Code Practice Pad",
    "description": "An interactive, cinematic web application to learn and practice Morse Code with real-time sound feedback and visual decoding.",
    "url": "https://mrmahid.com/services/morse-code-practice",
    "applicationCategory": "EducationalApplication",
    "genre": "Education",
    "browserRequirements": "Requires JavaScript. Requires HTML5 Audio for sound playback.",
    "operatingSystem": "All",
    "author": {
        "@type": "Person",
        "name": "Md Mahid Raza",
        "url": "https://mrmahid.com"
    },
    "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD"
    }
};

export default function MorseCodeLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            {children}
        </>
    );
}
