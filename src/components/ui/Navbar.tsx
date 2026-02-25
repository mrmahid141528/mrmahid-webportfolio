"use client"

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = ['Home', 'About', 'Projects', 'Services'];

    return (
        <header
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 w-full ${scrolled
                ? 'py-4 bg-[#0F172A]/70 backdrop-blur-md border-b border-white/5 shadow-lg'
                : 'py-6 bg-transparent'
                }`}
        >
            <div className="container mx-auto px-6 max-w-7xl flex items-center justify-between">
                <Link
                    href="/"
                    className="transition-transform cursor-hover hover:scale-105 relative z-50"
                    onClick={() => setMobileMenuOpen(false)}
                >
                    <Image
                        src="/logo.png"
                        alt="mrmahid logo"
                        width={280}
                        height={80}
                        className="w-auto h-12 md:h-16 object-contain drop-shadow-[0_0_15px_rgba(255,255,255,0.2)]"
                        priority
                    />
                </Link>

                {/* Desktop Nav */}
                <nav className="hidden md:flex items-center space-x-8">
                    {navLinks.map((item) => (
                        <Link
                            key={item}
                            href={`#${item.toLowerCase()}`}
                            className="text-sm font-medium text-gray-300 hover:text-white transition-colors cursor-hover"
                        >
                            {item}
                        </Link>
                    ))}
                    <Link href="#contact" className="px-5 py-2.5 rounded-full bg-white/5 border border-white/10 hover:border-primary/50 text-white font-medium hover:bg-primary/10 transition-all cursor-hover group backdrop-blur-sm">
                        <span className="relative z-10">Hire Me</span>
                    </Link>
                </nav>

                {/* Mobile menu toggle button */}
                <button
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    className="md:hidden flex flex-col space-y-1.5 cursor-hover p-2 relative z-50"
                >
                    <span className={`w-6 h-0.5 bg-white block rounded-full transition-all duration-300 ${mobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
                    <span className={`w-6 h-0.5 bg-white block rounded-full transition-all duration-300 ${mobileMenuOpen ? 'opacity-0' : ''}`}></span>
                    <span className={`bg-white block rounded-full transition-all duration-300 ${mobileMenuOpen ? 'w-6 -rotate-45 -translate-y-2' : 'w-4 self-end'}`}></span>
                </button>

                {/* Mobile Menu Overlay */}
                <div className={`fixed inset-0 bg-[#0F172A] z-40 transition-all duration-500 flex flex-col items-center justify-center space-y-8 min-h-screen ${mobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'}`}>
                    {navLinks.map((item) => (
                        <Link
                            key={item}
                            href={`#${item.toLowerCase()}`}
                            onClick={() => setMobileMenuOpen(false)}
                            className="text-2xl font-bold tracking-widest text-white hover:text-primary transition-colors cursor-hover"
                        >
                            {item}
                        </Link>
                    ))}
                    <Link
                        href="#contact"
                        onClick={() => setMobileMenuOpen(false)}
                        className="px-8 py-3 mt-4 rounded-full bg-primary text-white font-medium hover:bg-primary/90 transition-all cursor-hover shadow-[0_0_20px_rgba(59,130,246,0.3)]"
                    >
                        Hire Me
                    </Link>
                </div>

            </div>
        </header>
    );
}
