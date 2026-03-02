"use client"

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Preloader() {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Automatically hide the preloader after 2 seconds
        // This gives the "premium feel" while ensuring it doesn't block users for too long
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 2000);

        return () => clearTimeout(timer);
    }, []);

    // Also listen for Next.js router load event just in case
    useEffect(() => {
        if (document.readyState === 'complete') {
            // Already loaded
        } else {
            window.addEventListener('load', () => {
                // Keep it visible for at least a minimum time for smooth animation
                setTimeout(() => setIsLoading(false), 800);
            });
        }
    }, []);

    return (
        <AnimatePresence>
            {isLoading && (
                <motion.div
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
                    className="fixed inset-0 z-[100] bg-[#0F172A] flex flex-col items-center justify-center overflow-hidden"
                >
                    {/* Background glows */}
                    <div className="absolute top-1/4 left-1/4 w-[300px] h-[300px] bg-primary/20 rounded-full blur-[100px] animate-pulse pointer-events-none" />
                    <div className="absolute bottom-1/4 right-1/4 w-[300px] h-[300px] bg-accent/20 rounded-full blur-[100px] pointer-events-none animate-pulse" style={{ animationDelay: '1s' }} />

                    {/* Logo / Animation Content */}
                    <div className="relative z-10 flex flex-col items-center">
                        {/* Animated Diamond */}
                        <motion.div
                            initial={{ scale: 0.8, rotate: 45, opacity: 0 }}
                            animate={{ scale: 1, rotate: 225, opacity: 1 }}
                            transition={{ duration: 1.5, ease: "easeInOut", repeat: Infinity, repeatType: "reverse" }}
                            className="w-16 h-16 rounded-xl border border-primary/50 flex items-center justify-center bg-white/5 backdrop-blur-md shadow-[0_0_30px_rgba(59,130,246,0.3)] mb-8"
                        >
                            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-accent" />
                        </motion.div>

                        {/* Name Reveal */}
                        <motion.div className="flex h-[32px] overflow-hidden">
                            {"mrmahid.".split('').map((char, index) => (
                                <motion.span
                                    key={index}
                                    initial={{ y: 32 }}
                                    animate={{ y: 0 }}
                                    transition={{
                                        duration: 0.5,
                                        ease: [0.76, 0, 0.24, 1],
                                        delay: index * 0.05
                                    }}
                                    className={`text-2xl font-bold tracking-widest ${index > 6 ? 'text-primary' : 'text-white'}`}
                                >
                                    {char}
                                </motion.span>
                            ))}
                        </motion.div>

                        {/* Loading Bar */}
                        <div className="mt-8 w-48 h-[2px] bg-white/10 rounded-full overflow-hidden relative">
                            <motion.div
                                initial={{ width: "0%" }}
                                animate={{ width: "100%" }}
                                transition={{ duration: 1.8, ease: "easeInOut" }}
                                className="absolute top-0 left-0 h-full bg-gradient-to-r from-primary to-accent"
                            />
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
