"use client"

import { useEffect, useRef } from 'react';
import { motion, useInView, useAnimation } from 'framer-motion';
import { Download } from 'lucide-react';
import Image from 'next/image';
import MagneticButton from '@/components/ui/MagneticButton';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function ProfileSection() {
    const containerRef = useRef<HTMLDivElement>(null);
    const photoRef = useRef<HTMLDivElement>(null);
    const infoRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!containerRef.current) return;

        // Scroll reveal animation using GSAP
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: containerRef.current,
                start: 'top 75%',
                end: 'bottom 25%',
                toggleActions: 'play none none reverse',
            }
        });

        tl.fromTo(photoRef.current,
            { x: -50, opacity: 0, rotationY: -15 },
            { x: 0, opacity: 1, rotationY: 0, duration: 1, ease: 'power3.out' }
        ).fromTo(infoRef.current?.children || [],
            { y: 30, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.8, stagger: 0.15, ease: 'power3.out' },
            '-=0.6'
        );

        return () => {
            ScrollTrigger.getAll().forEach(t => t.kill());
        };
    }, []);

    // 3D Tilt effect on hover
    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!photoRef.current) return;
        const { left, top, width, height } = photoRef.current.getBoundingClientRect();
        const x = (e.clientX - left) / width - 0.5;
        const y = (e.clientY - top) / height - 0.5;

        gsap.to(photoRef.current, {
            rotationY: x * 20,
            rotationX: -y * 20,
            duration: 0.5,
            ease: 'power1.out',
            transformPerspective: 900,
        });
    };

    const handleMouseLeave = () => {
        if (!photoRef.current) return;
        gsap.to(photoRef.current, {
            rotationY: 0,
            rotationX: 0,
            duration: 1,
            ease: 'elastic.out(1, 0.3)',
        });
    };

    const skills = [
        { name: 'UI/UX Design', percent: 95 },
        { name: 'Frontend (React/Next)', percent: 90 },
        { name: 'Animation (GSAP)', percent: 85 },
        { name: '3D Web (Three.js)', percent: 75 },
    ];

    return (
        <section id="about" className="relative py-32 bg-[#0F172A] z-10 overflow-hidden" ref={containerRef}>
            {/* Background Soft Glow */}
            <div className="absolute top-1/2 left-1/4 -translate-y-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute top-1/2 right-1/4 -translate-y-1/2 translate-x-1/2 w-[400px] h-[400px] bg-secondary/10 rounded-full blur-[100px] pointer-events-none" />

            <div className="container mx-auto px-6 max-w-7xl relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

                    {/* Left: Premium Photo */}
                    <div
                        className="flex justify-center lg:justify-end perspective-1000 relative"
                        onMouseMove={handleMouseMove}
                        onMouseLeave={handleMouseLeave}
                    >
                        <div
                            ref={photoRef}
                            className="relative w-80 h-80 md:w-96 md:h-96"
                        >
                            {/* Animated Gradient Border Layer */}
                            <div className="absolute inset-0 rounded-[2rem] bg-gradient-to-tr from-primary via-accent to-secondary animate-spin-slow opacity-70 blur-sm pointer-events-none" style={{ animationDuration: '8s' }} />
                            <div className="absolute inset-[2px] rounded-[2rem] bg-[#0F172A] z-0" />

                            {/* Floating Animation Wrapper */}
                            <motion.div
                                animate={{ y: [-10, 10, -10] }}
                                transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
                                className="absolute inset-[4px] rounded-[2rem] overflow-hidden z-10 glass-panel border border-white/10 bg-white/5 backdrop-blur-xl flex items-center justify-center group cursor-hover"
                            >
                                {/* Profile Image */}
                                <div className="relative w-full h-full group-hover:scale-105 transition-transform duration-700">
                                    <Image
                                        src="/profile.jpg"
                                        alt="Md Mahid Raza"
                                        fill
                                        className="object-cover"
                                        priority
                                    />
                                </div>
                            </motion.div>
                        </div>
                    </div>

                    {/* Right: Info */}
                    <div ref={infoRef} className="flex flex-col space-y-8">
                        <div>
                            <h2 className="text-4xl md:text-5xl font-bold mb-2">
                                Hi, I'm <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Md Mahid Raza</span>
                            </h2>
                            <p className="text-xl text-primary font-medium tracking-wide">Web Designer & Digital Creator</p>
                        </div>

                        <p className="text-gray-400 leading-relaxed text-lg max-w-xl">
                            I specialize in crafting premium, high-performance digital experiences that elevate local businesses.
                            By blending stunning aesthetics with cutting-edge tech like Framer Motion and GSAP, I ensure your
                            brand leaves a lasting impact from the very first scroll.
                        </p>

                        {/* Skill Bars */}
                        <div className="space-y-5 max-w-md">
                            {skills.map((skill, index) => (
                                <div key={index} className="space-y-2">
                                    <div className="flex justify-between text-sm font-medium">
                                        <span className="text-gray-300">{skill.name}</span>
                                        <span className="text-accent">{skill.percent}%</span>
                                    </div>
                                    <div className="h-2 w-full bg-gray-800 rounded-full overflow-hidden">
                                        <motion.div
                                            initial={{ width: 0 }}
                                            whileInView={{ width: `${skill.percent}%` }}
                                            viewport={{ once: true }}
                                            transition={{ duration: 1.5, delay: 0.2 + index * 0.1, ease: "easeOut" }}
                                            className="h-full bg-gradient-to-r from-primary to-accent rounded-full relative"
                                        >
                                            <div className="absolute top-0 right-0 bottom-0 w-4 bg-white/30 blur-[2px]" />
                                        </motion.div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* CTA */}
                        <div className="pt-4 flex w-fit">
                            <a href="/Md_Mahid_Raza_CV.png" download="Md_Mahid_Raza_CV.png" className="w-full">
                                <MagneticButton className="cursor-hover group flex items-center space-x-2 px-8 py-4 bg-white/10 border border-white/20 text-white rounded-full font-medium hover:bg-white/20 hover:border-white/40 transition-all backdrop-blur-md w-fit">
                                    <Download className="w-5 h-5 group-hover:-translate-y-1 transition-transform" />
                                    <span>Download CV</span>
                                </MagneticButton>
                            </a>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}
