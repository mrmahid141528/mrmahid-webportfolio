"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { LayoutDashboard, Code, Smartphone, Monitor, Palette, ChevronRight, Activity, Zap, Shield, PlayCircle, RotateCw, Keyboard, MessageSquare, Gamepad2, Lightbulb, Target } from "lucide-react";
import Image from "next/image";

const SERVICES = [
    {
        id: "morse-code",
        title: "Morse Code Practice",
        icon: <Zap className="w-5 h-5" />,
    },
];

export default function ServicesPage() {
    const [activeTab, setActiveTab] = useState(SERVICES[0].id);

    return (
        <div className="flex h-[calc(100vh-73px)] w-full overflow-hidden bg-[#050505]">

            {/* Sidebar Navigation */}
            <aside className="w-64 border-r border-white/5 bg-[#0a0a0a] flex-shrink-0 hidden md:flex flex-col">
                <div className="px-6 py-8">
                    <div className="flex items-center space-x-3 mb-8">
                        <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center border border-primary/50">
                            <LayoutDashboard className="w-4 h-4 text-primary" />
                        </div>
                        <h2 className="text-white font-semibold tracking-wide">Services</h2>
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
                                <div className={`transition-colors ${activeTab === service.id ? "text-[#1eff00]" : "group-hover:text-gray-400"}`}>
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
                <div className="max-w-[1400px] mx-auto">



                    <AnimatePresence mode="wait">
                        {activeTab === "morse-code" ? (
                            <MorseCodeDetailedPreview key="morse-code" />
                        ) : (
                            <GenericServicePreview key="generic" service={SERVICES.find(s => s.id === activeTab)} />
                        )}
                    </AnimatePresence>

                    {/* Quick Nav for Mobile */}
                    <div className="md:hidden mt-8 grid grid-cols-2 gap-3">
                        {SERVICES.map((service) => (
                            <button
                                key={service.id}
                                onClick={() => setActiveTab(service.id)}
                                className={`flex flex-col items-center justify-center p-4 rounded-2xl border transition-all ${activeTab === service.id
                                    ? "bg-[#1eff00]/10 border-[#1eff00] text-[#1eff00]"
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

// ------------------------------------------------------------------------------------------------ //
// COMPONENTS
// ------------------------------------------------------------------------------------------------ //

function MorseCodeDetailedPreview() {
    return (
        <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="flex flex-col gap-16 w-full"
        >
            <div className="grid grid-cols-1 xl:grid-cols-[1fr_minmax(0,1fr)] gap-16 xl:gap-20 items-center">
                {/* Left Column: Hero Content */}
                <div className="flex flex-col w-full">
                    <span className="inline-block self-start px-3 py-1 bg-[#1eff00]/10 border border-[#1eff00]/30 rounded-full text-[10px] font-bold tracking-widest text-[#1eff00] uppercase mb-6">
                        Interactive Tool
                    </span>

                    <h1 className="text-5xl sm:text-6xl font-bold tracking-tighter leading-[1.1] mb-6 text-white">
                        Morse <span className="text-[#1eff00]" style={{ textShadow: "0 0 20px rgba(30,255,0,0.3)" }}>Code</span><br />
                        Practice Pad
                    </h1>

                    <p className="text-gray-400 text-lg mb-8 leading-relaxed font-light">
                        Practice Morse code in a realistic way. Press or hold the key to send signals, hear the beep, and see the code decode instantly.
                    </p>

                    {/* Bullet Points */}
                    <ul className="space-y-4 mb-10 text-sm md:text-base text-gray-300 font-medium">
                        <li className="flex items-center space-x-3">
                            <Activity className="w-5 h-5 text-[#1eff00]" />
                            <span>Short press for <strong>Dot (.)</strong></span>
                        </li>
                        <li className="flex items-center space-x-3">
                            <span className="w-5 h-[2px] bg-[#1eff00] inline-block rounded-full shadow-[0_0_8px_rgba(30,255,0,0.8)]" />
                            <span>Long press for <strong>Dash (-)</strong></span>
                        </li>
                        <li className="flex items-center space-x-3">
                            <Keyboard className="w-5 h-5 text-[#1eff00]" />
                            <span>Use <strong>Spacebar</strong> on Desktop</span>
                        </li>
                    </ul>

                    {/* CTA Buttons */}
                    <div className="flex flex-col sm:flex-row items-center gap-4 mb-14">
                        <Link href="/services/morse-code-practice" className="w-full sm:w-auto px-8 py-4 bg-[#1eff00] text-black font-bold rounded-xl md:rounded-full hover:bg-[#1aff00]/90 transition-all flex items-center justify-center space-x-2 shadow-[0_0_20px_rgba(30,255,0,0.3)] hover:scale-105 active:scale-95 group">
                            <span>Start Practicing</span>
                            <Activity className="w-4 h-4 group-hover:rotate-12 transition-transform" />
                        </Link>
                        <button className="w-full sm:w-auto px-8 py-4 bg-transparent border border-[#333] text-white font-semibold rounded-xl md:rounded-full hover:bg-white/5 transition-colors flex items-center justify-center space-x-2 hover:border-[#555]">
                            <span>How It Works</span>
                            <PlayCircle className="w-4 h-4 text-gray-400" />
                        </button>
                    </div>

                    {/* Micro Features Row */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-8 border-t border-white/5">
                        {[
                            { icon: Activity, title: "Realistic Sound", sub: "Live Morse Beep" },
                            { icon: RotateCw, title: "Instant Decode", sub: "See Results Live" },
                            { icon: Keyboard, title: "Keyboard Support", sub: "Use Spacebar" },
                            { icon: Smartphone, title: "Mobile Friendly", sub: "Touch & Hold" }
                        ].map((feature, i) => (
                            <div key={i} className="flex flex-col items-center sm:items-start text-center sm:text-left group">
                                <feature.icon className="w-6 h-6 text-[#1eff00] mb-3 opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all" />
                                <h4 className="text-white font-semibold text-xs mb-1">{feature.title}</h4>
                                <p className="text-gray-500 text-[10px]">{feature.sub}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Right Column: Interactive App Thumbnail */}
                <div className="w-full max-w-[600px] mx-auto xl:mx-0 relative aspect-[4/5] sm:aspect-square xl:aspect-[4/5] shadow-[0_0_100px_rgba(0,0,0,0.5)] rounded-[40px] flex items-center justify-center border border-[#1a1a1a] bg-[#0c0c0c] overflow-hidden group">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-[#1eff00]/5 blur-[120px] rounded-full pointer-events-none -z-10" />

                    {/* Static Image Thumbnail */}
                    <div className="absolute inset-0">
                        <Image
                            src="/Service page img/Morse code thumbnail.png"
                            alt="Morse Code Practice Pad Thumbnail"
                            fill
                            className="object-cover object-center w-full h-full opacity-80 group-hover:opacity-60 transition-opacity duration-300"
                        />
                    </div>

                    {/* Overlay to catch clicks and redirect */}
                    <Link href="/services/morse-code-practice" className="absolute inset-0 bg-transparent flex items-center justify-center">
                        <div className="flex items-center space-x-2 px-6 py-3 bg-[#1eff00] text-black font-bold rounded-full shadow-[0_0_30px_rgba(30,255,0,0.4)] scale-0 opacity-0 group-hover:opacity-100 group-hover:scale-100 transition-all duration-300">
                            <PlayCircle className="w-5 h-5" />
                            <span>Launch Live Pad</span>
                        </div>
                    </Link>
                </div>
            </div>

            {/* Information Section */}
            <div>
                <div className="text-left mb-10">
                    <span className="text-[#1eff00] text-xs font-bold tracking-[0.2em] uppercase mb-4 inline-block">About This Service</span>
                    <h2 className="text-3xl md:text-5xl font-bold text-white">Why Practice <span className="text-[#1eff00]">Morse Code</span>?</h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {[
                        { icon: Target, title: "Boost Focus", desc: "Improve concentration and attention to detail." },
                        { icon: MessageSquare, title: "Learn Communication", desc: "Understand the fundamentals of classic communication." },
                        { icon: Gamepad2, title: "Fun & Engaging", desc: "A unique and enjoyable way to learn something new." },
                        { icon: Lightbulb, title: "Useful Skill", desc: "Morse code is still used in aviation, radio & more." },
                    ].map((card, i) => (
                        <div key={i} className="bg-gradient-to-br from-[#111] to-[#0a0a0a] border border-[#1a1a1a] rounded-3xl p-8 hover:border-[#333] transition-colors group">
                            <div className="w-12 h-12 rounded-full bg-[#1eff00]/10 flex items-center justify-center mb-6 group-hover:bg-[#1eff00]/20 transition-colors">
                                <card.icon className="w-6 h-6 text-[#1eff00]" />
                            </div>
                            <h3 className="text-lg font-bold text-white mb-2">{card.title}</h3>
                            <p className="text-sm text-gray-400 leading-relaxed">{card.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </motion.div>
    );
}

function GenericServicePreview({ service }: any) {
    if (!service) return null;
    return (
        <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="bg-gradient-to-b from-[#111] to-[#0a0a0a] border border-white/10 rounded-3xl p-8 lg:p-12 shadow-2xl relative overflow-hidden max-w-4xl"
        >
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-[80px] -z-10 pointer-events-none translate-x-1/2 -translate-y-1/2" />

            <div className="flex items-center space-x-4 mb-6">
                <div className="p-4 bg-primary/10 rounded-2xl border border-primary/20 text-primary">
                    {service.icon}
                </div>
                <h1 className="text-3xl font-bold tracking-tight text-white">{service.title}</h1>
            </div>

            <p className="text-gray-400 text-lg mb-10 max-w-2xl leading-relaxed">
                {service.description}
            </p>

            <div>
                <h3 className="text-sm font-semibold uppercase tracking-widest text-gray-500 mb-6">Core Features</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {service.features?.map((feature: any, idx: number) => (
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
    );
}
