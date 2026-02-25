"use client"

import { useEffect, useRef, useState } from 'react';
import { useInView } from 'framer-motion';
import { Trophy, Users, Clock } from 'lucide-react';

const StatCounter = ({ value, label, suffix = "", icon: Icon }: any) => {
    const [count, setCount] = useState(0);
    const ref = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    useEffect(() => {
        if (isInView) {
            let start = 0;
            const end = typeof value === "number" ? value : parseInt(value);
            if (start === end) return;

            const duration = 2000;
            let startTime: number | null = null;

            const animate = (currentTime: number) => {
                if (!startTime) startTime = currentTime;
                const progress = Math.min((currentTime - startTime) / duration, 1);

                // ease out Expo
                const easeProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);

                setCount(Math.floor(easeProgress * (end - start) + start));

                if (progress < 1) {
                    requestAnimationFrame(animate);
                }
            };
            requestAnimationFrame(animate);
        }
    }, [value, isInView]);

    return (
        <div ref={ref} className="flex flex-col items-center justify-center p-8 rounded-3xl glass-panel border border-white/5 bg-white/5 backdrop-blur-sm group hover:border-primary/20 transition-colors cursor-hover">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-6 group-hover:scale-110 transition-transform duration-300">
                <Icon strokeWidth={1.5} size={32} />
            </div>
            <div className="text-5xl md:text-6xl font-bold text-white mb-2">
                {count}
                <span className="text-accent">{suffix}</span>
            </div>
            <div className="text-gray-400 font-medium tracking-wide">{label}</div>
        </div>
    );
};

export default function StatsSection() {
    const stats = [
        { value: 50, suffix: "+", label: "Projects Completed", icon: Trophy },
        { value: 40, suffix: "+", label: "Happy Clients", icon: Users },
        { value: 3, suffix: "+", label: "Years Experience", icon: Clock },
    ];

    return (
        <section className="relative py-24 bg-[#0a101d] z-10 overflow-hidden border-y border-white/5">
            {/* Background elements */}
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-soft-light pointer-events-none" />

            <div className="container mx-auto px-6 max-w-7xl relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
                    {stats.map((stat, idx) => (
                        <StatCounter key={idx} {...stat} />
                    ))}
                </div>
            </div>
        </section>
    );
}
