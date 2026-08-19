import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import ThemeProvider from '@/components/layout/ThemeProvider';
import ThemeToggle from '@/components/ui/ThemeToggle';
export const metadata = {
    title: 'Client Services | Md Mahid Raza',
    description: 'Premium web design and development client portal.',
};

export default function ServicesLayout({ children }: { children: React.ReactNode }) {
    return (
        <ThemeProvider>
            <div className="min-h-screen dark:bg-[#050505] bg-gray-50 text-foreground flex flex-col antialiased selection:bg-primary/30 transition-colors duration-300">
                <header className="fixed top-0 w-full z-50 border-b dark:border-white/5 border-black/5 dark:bg-[#050505]/70 bg-white/70 backdrop-blur-xl px-6 flex items-center justify-between h-[73px] transition-colors duration-300">
                    <Link href="/" className="inline-flex items-center space-x-2 px-5 py-2 bg-primary text-black font-semibold text-sm rounded-full shadow-[0_0_15px_rgba(59,130,246,0.3)] hover:shadow-[0_0_25px_rgba(59,130,246,0.5)] transition-all group active:scale-95">
                        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                    </Link>
                    <ThemeToggle />
                </header>

                {/* Main Content Area */}
                <main className="flex-1 mt-[73px]">
                    {children}
                </main>
            </div>
        </ThemeProvider>
    );
}
