"use client"

import { motion } from 'framer-motion';
import HeroScene from '@/components/3d/HeroScene';
import StatsSection from '@/components/sections/StatsSection';
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

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">

      {/* Hero Section */}
      <section id="home" className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden">
        {/* 3D Background */}
        <HeroScene />

        {/* Content */}
        <div className="container mx-auto px-6 relative z-10 text-center flex flex-col items-center mt-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="mb-8 inline-flex items-center space-x-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-md"
          >
            <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
            <span className="text-sm text-gray-300 tracking-wide uppercase">MD MAHID Raza</span>
          </motion.div>

          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter mb-6 leading-tight max-w-5xl">
            <span className="block text-white opacity-90"><TypewriterText text="I Build" /></span>
            <span className="block bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent pb-2">
              <TypewriterText text="Digital Experiences" delay={1} />
            </span>
          </h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 3, duration: 1 }}
            className="text-lg md:text-xl text-gray-400 mb-10 max-w-2xl font-light"
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
              <MagneticButton className="cursor-hover group flex items-center justify-center space-x-2 px-8 py-4 bg-primary text-white rounded-full font-medium hover:bg-primary/90 transition-colors shadow-[0_0_20px_rgba(59,130,246,0.4)] hover:shadow-[0_0_30px_rgba(59,130,246,0.6)] w-full sm:w-auto">
                <span>View Projects</span>
                <ArrowUpRight className="w-4 h-4 group-hover:rotate-45 transition-transform" />
              </MagneticButton>
            </Link>

            <Link href="/contact" className="w-full sm:w-auto">
              <MagneticButton className="cursor-hover group flex items-center justify-center space-x-2 px-8 py-4 bg-white/5 border border-white/10 text-white rounded-full font-medium hover:bg-white/10 transition-colors backdrop-blur-md w-full sm:w-auto">
                <span>Hire Me</span>
              </MagneticButton>
            </Link>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 4, duration: 1 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center space-y-2 opacity-60"
        >
          <span className="text-xs uppercase tracking-widest text-gray-400">Scroll</span>
          <div className="w-[1px] h-12 bg-gradient-to-b from-gray-400 to-transparent" />
        </motion.div>
      </section>

      {/* Stats Counter */}
      <StatsSection />

      {/* Quick Nav Cards */}
      <section className="py-20 bg-[#0F172A]">
        <div className="container mx-auto px-6 max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Explore My <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Work</span>
            </h2>
            <p className="text-gray-400">Navigate to see everything I do</p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { label: 'About Me', desc: 'Skills, story & testimonials', href: '/about', gradient: 'from-primary to-accent', icon: '👤' },
              { label: 'Projects', desc: 'Real websites I built', href: '/projects', gradient: 'from-accent to-secondary', icon: '💻' },
              { label: 'Blog', desc: 'Tips on web design & growth', href: '/blog', gradient: 'from-secondary to-primary', icon: '📝' },
              { label: 'Contact', desc: 'Let\'s build together', href: '/contact', gradient: 'from-primary to-secondary', icon: '🤝' },
            ].map((card, i) => (
              <motion.div
                key={card.href}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <Link
                  href={card.href}
                  className="group block glass-panel border border-white/10 bg-white/5 backdrop-blur-sm rounded-2xl p-6 hover:shadow-[0_0_25px_rgba(59,130,246,0.12)] hover:-translate-y-2 transition-all duration-300 cursor-hover"
                >
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${card.gradient} flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform`}>
                    {card.icon}
                  </div>
                  <h3 className="text-lg font-bold text-white mb-1 group-hover:text-primary transition-colors">{card.label}</h3>
                  <p className="text-gray-500 text-sm">{card.desc}</p>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
