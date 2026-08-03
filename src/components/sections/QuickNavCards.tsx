"use client"

import { motion } from 'framer-motion';
import Link from 'next/link';

export default function QuickNavCards() {
    return (
        <div className="container mx-auto px-6 max-w-7xl">
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="text-center mb-12"
            >
                <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                    Explore My <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Work</span>
                </h2>
                <p className="text-muted">Navigate to see everything I do</p>
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
                            className="group block glass-panel border border-border bg-card backdrop-blur-sm rounded-2xl p-6 hover:shadow-[0_0_25px_rgba(59,130,246,0.12)] hover:-translate-y-2 transition-all duration-300 cursor-hover"
                        >
                            <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${card.gradient} flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform`}>
                                {card.icon}
                            </div>
                            <h3 className="text-lg font-bold text-foreground mb-1 group-hover:text-primary transition-colors">{card.label}</h3>
                            <p className="text-gray-500 text-sm">{card.desc}</p>
                        </Link>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
