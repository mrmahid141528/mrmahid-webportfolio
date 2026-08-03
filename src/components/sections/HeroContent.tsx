"use client"

import { motion } from 'framer-motion';
import MagneticButton from '@/components/ui/MagneticButton';
import { ArrowUpRight } from 'lucide-react';
import { useEffect, useState } from 'react';
import Link from 'next/link';

// Typing effect helper
const TypewriterText = ({ text, delay = 0 }: { text: string; delay?: number }) => {
    const [displayedText, setDisplayedText] = useState("");

    useEffect(() => {
        let i = 0;
        const timeout = setTimeout(() => {
            const typingInterval = setInterval(() => {
                if (i < text.length) {
                    setDisplayedText(text.slice(0, i + 1));
                    i++;
                } else {
                    clearInterval(typingInterval);
                }
            }, 100);
            return () => clearInterval(typingInterval);
        }, delay * 1000);

        return () => clearTimeout(timeout);
    }, [text, delay]);

    return <span>{displayedText}</span>;
}

export default function HeroContent() {
    return (
        <div className="container mx-auto px-6 relative z-10 text-center flex flex-col items-center mt-16">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="mb-8 inline-flex items-center space-x-2 px-4 py-2 rounded-full border border-border bg-card backdrop-blur-md"
            >
                <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                <span className="text-sm text-gray-300 tracking-wide uppercase">MD MAHID Raza</span>
            </motion.div>

            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter mb-6 leading-tight max-w-5xl">
                <span className="block text-foreground opacity-90"><TypewriterText text="I Build" /></span>
                <span className="block bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent pb-2">
                    <TypewriterText text="Digital Experiences" delay={1} />
                </span>
            </h1>

            <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 3, duration: 1 }}
                className="text-lg md:text-xl text-muted mb-10 max-w-2xl font-light"
            >
                Helping Local Businesses Go Digital. Premium web design that converts visitors into clients.
            </motion.p>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 3.5, duration: 0.8 }}
                className="flex flex-col sm:flex-row items-center gap-6"
            >
                <Link href="/projects" className="w-full sm:w-auto">
                    <MagneticButton className="cursor-hover group flex items-center justify-center space-x-2 px-8 py-4 bg-primary text-foreground rounded-full font-medium hover:bg-primary/90 transition-colors shadow-[0_0_20px_rgba(59,130,246,0.4)] hover:shadow-[0_0_30px_rgba(59,130,246,0.6)] w-full sm:w-auto">
                        <span>View Projects</span>
                        <ArrowUpRight className="w-4 h-4 group-hover:rotate-45 transition-transform" />
                    </MagneticButton>
                </Link>

                <Link href="/contact" className="w-full sm:w-auto">
                    <MagneticButton className="cursor-hover group flex items-center justify-center space-x-2 px-8 py-4 bg-card border border-border text-foreground rounded-full font-medium hover:bg-white/10 transition-colors backdrop-blur-md w-full sm:w-auto">
                        <span>Hire Me</span>
                    </MagneticButton>
                </Link>
            </motion.div>
        </div>
    );
}
