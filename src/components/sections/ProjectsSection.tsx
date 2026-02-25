"use client"

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Github } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const projectsData = [
    {
        id: 1,
        title: 'Al-Azeem E-Commerce',
        category: 'E-commerce',
        description: 'A complete B2B eCommerce platform with WhatsApp integration and admin panel.',
        tools: ['Next.js', 'Tailwind CSS', 'Supabase'],
        image: 'https://images.unsplash.com/photo-1557821552-17105176677c?q=80&w=1000&auto=format&fit=crop',
        link: '#',
    },
    {
        id: 2,
        title: 'Dr. Sharma Clinic',
        category: 'Website',
        description: 'Premium healthcare website with appointment scheduling and blog.',
        tools: ['React', 'Framer Motion', 'Firebase'],
        image: 'https://images.unsplash.com/photo-1538108149393-cebb51897b20?q=80&w=1000&auto=format&fit=crop',
        link: '#',
    },
    {
        id: 3,
        title: 'mrmahid Branding',
        category: 'Branding',
        description: 'Complete brand identity design including logo, typography, and color systems.',
        tools: ['Illustrator', 'Figma', 'Photoshop'],
        image: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?q=80&w=1000&auto=format&fit=crop',
        link: '#',
    },
    {
        id: 4,
        title: 'Urban Store UI',
        category: 'Graphics',
        description: 'Modern UI/UX design conceptualization for an urban clothing brand app.',
        tools: ['Figma', 'Protopie'],
        image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&w=1000&auto=format&fit=crop',
        link: '#',
    },
    {
        id: 5,
        title: 'TechStartup Landing',
        category: 'Website',
        description: 'High-converting landing page with 3D interactions and scroll animations.',
        tools: ['Next.js', 'Three.js', 'GSAP'],
        image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1000&auto=format&fit=crop',
        link: '#',
    },
    {
        id: 6,
        title: 'Local Mart Dashboard',
        category: 'E-commerce',
        description: 'Inventory and sales management dashboard for local retailers.',
        tools: ['React', 'Tailwind', 'Node.js'],
        image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1000&auto=format&fit=crop',
        link: '#',
    }
];

const categories = ['All', 'Website', 'E-commerce', 'Graphics', 'Branding'];

// Project Card Component with 3D Tilt
const ProjectCard = ({ project }: { project: typeof projectsData[0] }) => {
    const cardRef = useRef<HTMLDivElement>(null);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!cardRef.current) return;
        const { left, top, width, height } = cardRef.current.getBoundingClientRect();
        const x = (e.clientX - left) / width - 0.5;
        const y = (e.clientY - top) / height - 0.5;

        gsap.to(cardRef.current, {
            rotationY: x * 15,
            rotationX: -y * 15,
            duration: 0.5,
            ease: 'power2.out',
            transformPerspective: 1000,
        });
    };

    const handleMouseLeave = () => {
        if (!cardRef.current) return;
        gsap.to(cardRef.current, {
            rotationY: 0,
            rotationX: 0,
            duration: 1.5,
            ease: 'elastic.out(1, 0.3)',
        });
    };

    return (
        <motion.div
            layout
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.4 }}
            className="perspective-1000"
        >
            <div
                ref={cardRef}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                className="group relative rounded-2xl overflow-hidden glass-panel border border-white/10 bg-white/5 backdrop-blur-sm cursor-hover h-full flex flex-col transform-style-3d hover:shadow-[0_0_30px_rgba(6,182,212,0.15)] transition-shadow duration-500"
            >
                {/* Glow Hover effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0 pointer-events-none" />

                {/* Image Container */}
                <div className="relative h-56 w-full overflow-hidden z-10">
                    <div className="absolute inset-0 bg-gray-800 animate-pulse" /> {/* Placeholder loading */}
                    <div
                        className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                        style={{ backgroundImage: `url(${project.image})` }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A] via-transparent to-transparent opacity-80" />

                    <div className="absolute top-4 left-4">
                        <span className="px-3 py-1 text-xs font-semibold bg-white/10 backdrop-blur-md rounded-full text-white border border-white/20">
                            {project.category}
                        </span>
                    </div>
                </div>

                {/* Content */}
                <div className="p-6 relative z-10 flex flex-col flex-grow transform translate-z-10">
                    <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-primary transition-colors">{project.title}</h3>
                    <p className="text-gray-400 text-sm mb-6 flex-grow">{project.description}</p>

                    <div className="flex flex-wrap gap-2 mb-6">
                        {project.tools.map((tool, idx) => (
                            <span key={idx} className="text-xs text-accent bg-accent/10 px-2 py-1 rounded-md">
                                {tool}
                            </span>
                        ))}
                    </div>

                    <div className="flex items-center justify-between border-t border-white/10 pt-4 mt-auto">
                        <a href={project.link} className="flex items-center space-x-2 text-sm text-gray-300 hover:text-white transition-colors cursor-hover">
                            <span>Live Preview</span>
                            <ExternalLink className="w-4 h-4" />
                        </a>
                        <button className="text-gray-400 hover:text-white transition-colors cursor-hover">
                            <Github className="w-5 h-5" />
                        </button>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};


export default function ProjectsSection() {
    const [activeFilter, setActiveFilter] = useState('All');
    const sectionRef = useRef<HTMLDivElement>(null);
    const headerRef = useRef<HTMLDivElement>(null);

    const filteredProjects = projectsData.filter(project =>
        activeFilter === 'All' ? true : project.category === activeFilter
    );

    useEffect(() => {
        if (!headerRef.current) return;

        gsap.fromTo(headerRef.current.children,
            { y: 50, opacity: 0 },
            {
                y: 0,
                opacity: 1,
                duration: 0.8,
                stagger: 0.2,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: 'top 80%',
                }
            }
        );
    }, []);

    return (
        <section id="projects" className="relative py-32 bg-[#0F172A] z-10" ref={sectionRef}>
            <div className="container mx-auto px-6 max-w-7xl">

                {/* Header */}
                <div ref={headerRef} className="flex flex-col items-center mb-16 text-center">
                    <span className="text-accent text-sm font-semibold tracking-widest uppercase mb-4 block">Portfolio</span>
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
                        Featured <span className="bg-gradient-to-r from-secondary to-primary bg-clip-text text-transparent">Works</span>
                    </h2>
                    <p className="text-gray-400 max-w-2xl text-lg">
                        A selection of my recent projects. From complex web applications to stunning brand identities.
                    </p>
                </div>

                {/* Filters */}
                <div className="flex flex-wrap justify-center gap-4 mb-16">
                    {categories.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setActiveFilter(cat)}
                            className={`px-6 py-2 rounded-full font-medium transition-all duration-300 cursor-hover border ${activeFilter === cat
                                ? 'bg-primary border-primary text-white shadow-[0_0_15px_rgba(59,130,246,0.5)]'
                                : 'bg-white/5 border-white/10 text-gray-400 hover:text-white hover:bg-white/10'
                                }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                {/* Project Grid */}
                <motion.div
                    layout
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                >
                    <AnimatePresence mode="popLayout">
                        {filteredProjects.map((project) => (
                            <ProjectCard key={project.id} project={project} />
                        ))}
                    </AnimatePresence>
                </motion.div>

                {/* View All CTA */}
                <div className="mt-16 flex justify-center">
                    <button className="flex items-center space-x-2 text-primary font-medium hover:text-white transition-colors cursor-hover group">
                        <div className="w-12 h-[1px] bg-primary group-hover:bg-white transition-colors" />
                        <span>View All Projects</span>
                        <div className="w-12 h-[1px] bg-primary group-hover:bg-white transition-colors" />
                    </button>
                </div>

            </div>
        </section>
    );
}
