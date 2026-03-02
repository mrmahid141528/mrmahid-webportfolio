"use client"

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ArrowUpRight, Clock, Tag } from 'lucide-react';

const blogPosts = [
    {
        id: 1,
        title: 'How a Good Website Can 10x Your Local Business',
        excerpt: 'Most local businesses lose customers because they have no online presence. In this post, I break down exactly how a professional website builds trust and drives real sales.',
        category: 'Business',
        readTime: '4 min read',
        date: 'Feb 2026',
        gradient: 'from-primary to-accent',
        // 🔄 Add real link when blog post is ready
        link: '#',
    },
    {
        id: 2,
        title: 'Top 5 Web Design Mistakes That Kill Conversions',
        excerpt: 'Slow load times, unclear CTAs, bad mobile layouts — I see these mistakes every day. Here\'s how to fix them and turn your website into a client-generating machine.',
        category: 'Design',
        readTime: '5 min read',
        date: 'Feb 2026',
        gradient: 'from-accent to-secondary',
        link: '#',
    },
    {
        id: 3,
        title: 'Why Every Gym Needs a Website in 2026',
        excerpt: 'WhatsApp groups and Instagram pages are not enough. A proper website gives your gym credibility, SEO visibility, and a 24/7 lead generation machine.',
        category: 'Case Study',
        readTime: '6 min read',
        date: 'Mar 2026',
        gradient: 'from-secondary to-primary',
        link: '#',
    },
];

const categoryColors: Record<string, string> = {
    Business: 'text-primary bg-primary/10',
    Design: 'text-accent bg-accent/10',
    'Case Study': 'text-secondary bg-secondary/10',
};

export default function BlogSection() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

    return (
        <section id="blog" className="relative py-32 bg-[#0F172A] z-10 overflow-hidden" ref={sectionRef}>
            {/* Background Glow */}
            <div className="absolute top-1/3 left-0 w-[500px] h-[500px] bg-accent/10 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-primary/10 rounded-full blur-[100px] pointer-events-none" />

            <div className="container mx-auto px-6 max-w-7xl relative z-10">

                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.7 }}
                    className="flex flex-col items-center text-center mb-16"
                >
                    <span className="text-accent text-sm font-semibold tracking-widest uppercase mb-4 block">Blog</span>
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
                        Thoughts &{' '}
                        <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                            Insights
                        </span>
                    </h2>
                    <p className="text-gray-400 max-w-2xl text-lg">
                        Tips on web design, digital growth, and how to help local businesses win online.
                    </p>
                </motion.div>

                {/* Blog Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {blogPosts.map((post, index) => (
                        <motion.a
                            key={post.id}
                            href={post.link}
                            initial={{ opacity: 0, y: 60 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.6, delay: index * 0.15 }}
                            className="group relative rounded-2xl overflow-hidden glass-panel border border-white/10 bg-white/5 backdrop-blur-sm flex flex-col cursor-hover hover:shadow-[0_0_30px_rgba(6,182,212,0.12)] transition-all duration-500 hover:-translate-y-2"
                        >
                            {/* Top Gradient Bar */}
                            <div className={`h-1 w-full bg-gradient-to-r ${post.gradient}`} />

                            {/* Hover Glow */}
                            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                            {/* Content */}
                            <div className="p-8 flex flex-col flex-grow">

                                {/* Meta */}
                                <div className="flex items-center justify-between mb-5">
                                    <span className={`flex items-center gap-1.5 text-xs font-semibold px-3 py-1 rounded-full ${categoryColors[post.category]}`}>
                                        <Tag className="w-3 h-3" />
                                        {post.category}
                                    </span>
                                    <span className="flex items-center gap-1.5 text-xs text-gray-500">
                                        <Clock className="w-3 h-3" />
                                        {post.readTime}
                                    </span>
                                </div>

                                {/* Title */}
                                <h3 className="text-xl font-bold text-white mb-4 leading-snug group-hover:text-primary transition-colors duration-300">
                                    {post.title}
                                </h3>

                                {/* Excerpt */}
                                <p className="text-gray-400 text-sm leading-relaxed flex-grow">
                                    {post.excerpt}
                                </p>

                                {/* Footer */}
                                <div className="flex items-center justify-between mt-8 pt-6 border-t border-white/10">
                                    <span className="text-xs text-gray-500">{post.date}</span>
                                    <span className="flex items-center gap-1 text-sm font-medium text-primary group-hover:text-white transition-colors">
                                        Read More
                                        <ArrowUpRight className="w-4 h-4 group-hover:rotate-45 transition-transform duration-300" />
                                    </span>
                                </div>
                            </div>
                        </motion.a>
                    ))}
                </div>

                {/* Coming Soon Note */}
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : {}}
                    transition={{ delay: 0.8, duration: 0.5 }}
                    className="text-center text-gray-600 text-sm mt-12"
                >
                    📝 Full blog posts coming soon — stay tuned!
                </motion.p>

            </div>
        </section>
    );
}
