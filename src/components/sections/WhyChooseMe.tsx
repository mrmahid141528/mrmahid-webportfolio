"use client"

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Zap, Paintbrush, Building2, BadgeDollarSign } from 'lucide-react';

const features = [
    {
        icon: Zap,
        title: 'Fast Delivery',
        description: 'I value your time. My optimized workflow ensures your project is delivered quickly without compromising on premium quality.',
        color: 'text-yellow-400',
        bgColor: 'bg-yellow-400/10'
    },
    {
        icon: Paintbrush,
        title: 'Modern Design',
        description: 'Aesthetics matter. I create visually stunning, dark-futuristic designs that instantly capture attention and build trust.',
        color: 'text-primary',
        bgColor: 'bg-primary/10'
    },
    {
        icon: Building2,
        title: 'Local Business Focus',
        description: 'Understanding the local market. I help West Bengal businesses establish a powerful digital presence that converts.',
        color: 'text-accent',
        bgColor: 'bg-accent/10'
    },
    {
        icon: BadgeDollarSign,
        title: 'Affordable Pricing',
        description: 'Premium doesn\'t always mean expensive. I offer competitive, transparent pricing tailored for startups and small businesses.',
        color: 'text-secondary',
        bgColor: 'bg-secondary/10'
    }
];

export default function WhyChooseMe() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    return (
        <section id="services" className="relative py-32 bg-[#0F172A] z-10" ref={ref}>
            <div className="container mx-auto px-6 max-w-7xl">

                {/* Header */}
                <div className="flex flex-col items-center mb-16 text-center">
                    <span className="text-secondary text-sm font-semibold tracking-widest uppercase mb-4 block">Advantages</span>
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                        Why Choose <span className="text-primary">mrmahid</span>
                    </h2>
                    <p className="text-gray-400 max-w-2xl text-lg">
                        I don't just build websites; I engineer digital experiences designed to grow your business and elevate your brand.
                    </p>
                </div>

                {/* Features Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {features.map((feature, index) => {
                        const Icon = feature.icon;
                        return (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 30 }}
                                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                                transition={{ duration: 0.6, delay: index * 0.15, ease: "easeOut" }}
                                className="group relative p-8 rounded-3xl glass-panel border border-white/5 bg-white/5 backdrop-blur-md hover:bg-white/10 transition-colors cursor-hover overflow-hidden"
                            >
                                {/* Hover Glow Background */}
                                <div className={`absolute -right-20 -top-20 w-48 h-48 rounded-full blur-[80px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none ${feature.bgColor}`} />

                                <div className="relative z-10 flex flex-col sm:flex-row sm:items-start gap-6">
                                    <div className={`shrink-0 w-16 h-16 rounded-2xl flex items-center justify-center ${feature.bgColor} ${feature.color} group-hover:scale-110 transition-transform duration-300 transform-style-3d group-hover:-rotate-6`}>
                                        <Icon size={32} strokeWidth={1.5} />
                                    </div>
                                    <div>
                                        <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-primary transition-colors">{feature.title}</h3>
                                        <p className="text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors">
                                            {feature.description}
                                        </p>
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>

            </div>
        </section>
    );
}
