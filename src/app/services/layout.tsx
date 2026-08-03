import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import ThemeProvider from '@/components/layout/ThemeProvider';

export const metadata = {
    title: 'Client Services | Md Mahid Raza',
    description: 'Premium web design and development client portal.',
};

export default function ServicesLayout({ children }: { children: React.ReactNode }) {
    return (
        <ThemeProvider>
            <div className="min-h-screen bg-[#050505] text-foreground flex flex-col antialiased selection:bg-primary/30">
                {/* Top minimal bar */}
                <header className="fixed top-0 w-full z-50 border-b border-white/5 bg-[#050505]/70 backdrop-blur-xl px-6 py-4 flex items-center justify-between">
                    <Link href="/" className="inline-flex items-center space-x-2 text-sm text-gray-400 hover:text-white transition-colors group">
                        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                        <span>Back to Home</span>
                    </Link>

                    <div className="text-xs font-semibold tracking-widest uppercase text-primary/80">
                        Services Portal
                    </div>
                </header>

                {/* Main Content Area */}
                <main className="flex-1 mt-[73px]">
                    {children}
                </main>
            </div>
        </ThemeProvider>
    );
}
