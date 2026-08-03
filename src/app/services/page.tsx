"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { LayoutDashboard, Code, Smartphone, Monitor, Palette, ChevronRight, Activity, Zap, Shield } from "lucide-react";

const SERVICES = [
    {
        id: "web-dev",
        title: "Web Development",
        icon: <Monitor className="w-5 h-5" />,
        description: "Custom, high-performance websites built with Next.js, React, and modern architectures.",
        features: ["SEO Optimized", "Server-Side Rendering", "CMS Integration", "Animations"],
    },
    {
        id: "app-dev",
        title: "App Development",
        icon: <Smartphone className="w-5 h-5" />,
        description: "Cross-platform mobile applications focused on smooth user experiences and speed.",
        features: ["React Native", "API Integrations", "Offline Support", "Push Notifications"],
    },
    {
        id: "ui-ux",
        title: "UI/UX Design",
        icon: <Palette className="w-5 h-5" />,
        description: "Premium, modern interfaces designed to convert and engage users effectively.",
        features: ["Wireframing", "Prototyping", "Design Systems", "User Testing"],
    },
    {
        id: "architecture",
        title: "Systems Architecture",
        icon: <Code className="w-5 h-5" />,
        description: "Scalable backend solutions and database structures tailored for your business.",
        features: ["Node.js / Express", "PostgreSQL / MongoDB", "Microservices", "Cloud Deployments"],
    },
];

export default function ServicesPage() {
    const [activeTab, setActiveTab] = useState(SERVICES[0].id);

    const activeContent = SERVICES.find(s => s.id === activeTab) || SERVICES[0];

    return (
        <div className="flex h-[calc(100vh-73px)] w-full overflow-hidden bg-[#050505]">

            {/* Sidebar Navigation */}
            <aside className="w-64 border-r border-white/5 bg-[#0a0a0a] flex-shrink-0 hidden md:flex flex-col">
                <div className="px-6 py-8">
                    <div className="flex items-center space-x-3 mb-8">
                        <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center border border-primary/50">
                            <LayoutDashboard className="w-4 h-4 text-primary" />
                        </div>
                        <h2 className="text-white font-semibold tracking-wide">Modules</h2>
                    </div>

                    <nav className="space-y-2">
                        {SERVICES.map((service) => (
                            <button
                                key={service.id}
                                onClick={() => setActiveTab(service.id)}
                                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-300 group ${activeTab === service.id
                                    ? "bg-white/10 text-white shadow-[inset_2px_0_0_0_rgba(59,130,246,1)]"
                                    : "text-gray-500 hover:text-gray-300 hover:bg-white/5"
                                    }`}
                            >
                                <div className={`transition-colors ${activeTab === service.id ? "text-primary" : "group-hover:text-gray-400"}`}>
                                    {service.icon}
                                </div>
                                <span className="text-sm font-medium tracking-wide">{service.title}</span>
                            </button>
                        ))}
                    </nav>
                </div>
            </aside>

            {/* Main Content Area */}
            <main className="flex-1 overflow-y-auto p-6 lg:p-12 relative">
                <div className="max-w-4xl mx-auto">

                    {/* Top Stats Banner */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12">
                        {[
                            { label: "System Status", val: "Operational", icon: <Activity className="w-4 h-4 text-emerald-400" /> },
                            { label: "Performance", val: "99.9%", icon: <Zap className="w-4 h-4 text-amber-400" /> },
                            { label: "Security", val: "Active", icon: <Shield className="w-4 h-4 text-primary" /> },
                        ].map((stat, i) => (
                            <div key={i} className="bg-white/5 border border-white/5 rounded-2xl p-5 flex items-center space-x-4">
                                <div className="p-3 bg-white/5 rounded-full">
                                    {stat.icon}
                                </div>
                                <div>
                                    <p className="text-gray-500 text-xs font-semibold uppercase tracking-wider">{stat.label}</p>
                                    <p className="text-white font-medium mt-1">{stat.val}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeTab}
                            initial={{ opacity: 0, y: 15 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -15 }}
                            transition={{ duration: 0.4, ease: "easeOut" }}
                            className="bg-gradient-to-b from-[#111] to-[#0a0a0a] border border-white/10 rounded-3xl p-8 lg:p-12 shadow-2xl relative overflow-hidden"
                        >
                            {/* Background Glow */}
                            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-[80px] -z-10 pointer-events-none translate-x-1/2 -translate-y-1/2" />

                            <div className="flex items-center space-x-4 mb-6">
                                <div className="p-4 bg-primary/10 rounded-2xl border border-primary/20 text-primary">
                                    {activeContent.icon}
                                </div>
                                <h1 className="text-3xl font-bold tracking-tight text-white">{activeContent.title}</h1>
                            </div>

                            <p className="text-gray-400 text-lg mb-10 max-w-2xl leading-relaxed">
                                {activeContent.description}
                            </p>

                            <div>
                                <h3 className="text-sm font-semibold uppercase tracking-widest text-gray-500 mb-6">Core Features</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {activeContent.features.map((feature, idx) => (
                                        <motion.div
                                            key={idx}
                                            initial={{ opacity: 0, x: -10 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: 0.1 + idx * 0.05 }}
                                            className="flex items-center space-x-3 bg-white/5 border border-white/5 rounded-xl p-4 hover:bg-white/10 transition-colors"
                                        >
                                            <ChevronRight className="w-4 h-4 text-primary flex-shrink-0" />
                                            <span className="text-gray-300 text-sm font-medium">{feature}</span>
                                        </motion.div>
                                    ))}
                                </div>
                            </div>

                            <div className="mt-12 pt-8 border-t border-white/10">
                                <button className="px-8 py-4 bg-white text-black font-semibold rounded-full hover:bg-gray-200 transition-colors shadow-[0_0_20px_rgba(255,255,255,0.15)] hover:scale-105 active:scale-95 duration-200">
                                    Request Configuration
                                </button>
                            </div>

                        </motion.div>
                    </AnimatePresence>

                    {/* Quick Nav for Mobile */}
                    <div className="md:hidden mt-8 grid grid-cols-2 gap-3">
                        {SERVICES.map((service) => (
                            <button
                                key={service.id}
                                onClick={() => setActiveTab(service.id)}
                                className={`flex flex-col items-center justify-center p-4 rounded-2xl border transition-all ${activeTab === service.id
                                    ? "bg-primary/10 border-primary text-primary"
                                    : "bg-white/5 border-white/5 text-gray-500"
                                    }`}
                            >
                                {service.icon}
                                <span className="text-xs font-semibold mt-2 text-center">{service.title}</span>
                            </button>
                        ))}
                    </div>

                </div>
            </main>
        </div>
    );
}
