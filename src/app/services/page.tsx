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
        <div className="flex h-[calc(100vh-73px)] w-full overflow-hidden dark:bg-[#050505] bg-gray-50 transition-colors duration-300">

            {/* Sidebar Navigation */}
            <aside className="w-64 border-r dark:border-white/5 border-black/5 dark:bg-[#0a0a0a] bg-white flex-shrink-0 hidden md:flex flex-col transition-colors duration-300">
                <div className="px-6 py-8">
                    <div className="flex items-center space-x-3 mb-8">
                        <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center border border-primary/50">
                            <LayoutDashboard className="w-4 h-4 text-primary" />
                        </div>
                        <h2 className="dark:text-white text-gray-900 font-semibold tracking-wide transition-colors">Services</h2>
                    </div>

                    <nav className="space-y-2">
                        {SERVICES.map((service) => (
                            <button
                                key={service.id}
                                onClick={() => setActiveTab(service.id)}
                                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-300 group ${activeTab === service.id
                                    ? "dark:bg-white/10 dark:text-white bg-black/5 text-gray-900 shadow-[inset_2px_0_0_0_rgba(59,130,246,1)]"
                                    : "dark:text-gray-500 text-gray-600 dark:hover:text-gray-300 hover:text-gray-900 dark:hover:bg-white/5 hover:bg-black/5"
                                    }`}
                            >
                                <div className={`transition-colors flex-shrink-0 ${activeTab === service.id ? "dark:text-[#1eff00] text-emerald-600" : "dark:group-hover:text-gray-400 group-hover:text-gray-800"}`}>
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
                                    ? "dark:bg-[#1eff00]/10 bg-emerald-500/10 dark:border-[#1eff00] border-emerald-500 dark:text-[#1eff00] text-emerald-600"
                                    : "dark:bg-white/5 bg-black/5 dark:border-white/5 border-black/5 dark:text-gray-500 text-gray-600"
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
    const [showHelp, setShowHelp] = useState(false);

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

                    <h1 className="text-5xl sm:text-6xl font-bold tracking-tighter leading-[1.1] mb-6 dark:text-white text-gray-900 transition-colors">
                        Morse <span className="dark:text-[#1eff00] text-emerald-600" style={{ textShadow: "0 0 20px rgba(30,255,0,0.3)" }}>Code</span><br />
                        Practice Pad
                    </h1>

                    <p className="dark:text-gray-400 text-gray-600 text-lg mb-8 leading-relaxed font-light transition-colors">
                        Practice Morse code in a realistic way. Press or hold the key to send signals, hear the beep, and see the code decode instantly.
                    </p>

                    {/* Bullet Points */}
                    <ul className="space-y-4 mb-10 text-sm md:text-base dark:text-gray-300 text-gray-700 font-medium transition-colors">
                        <li className="flex items-center space-x-3">
                            <Activity className="w-5 h-5 dark:text-[#1eff00] text-emerald-600" />
                            <span>Short press for <strong className="dark:text-white text-black">Dot (.)</strong></span>
                        </li>
                        <li className="flex items-center space-x-3">
                            <span className="w-5 h-[2px] dark:bg-[#1eff00] bg-emerald-600 inline-block rounded-full dark:shadow-[0_0_8px_rgba(30,255,0,0.8)] shadow-[0_0_8px_rgba(5,150,105,0.4)]" />
                            <span>Long press for <strong className="dark:text-white text-black">Dash (-)</strong></span>
                        </li>
                        <li className="flex items-center space-x-3">
                            <Keyboard className="w-5 h-5 dark:text-[#1eff00] text-emerald-600" />
                            <span>Use <strong>Spacebar</strong> on Desktop</span>
                        </li>
                    </ul>

                    {/* CTA Buttons */}
                    <div className="flex flex-col sm:flex-row items-center gap-4 mb-14">
                        <Link href="/services/morse-code-practice" className="w-full sm:w-auto px-8 py-4 bg-[#1eff00] text-black font-bold rounded-xl md:rounded-full hover:bg-[#1aff00]/90 transition-all flex items-center justify-center space-x-2 shadow-[0_0_20px_rgba(30,255,0,0.3)] hover:scale-105 active:scale-95 group">
                            <span>Start Practicing</span>
                            <Activity className="w-4 h-4 group-hover:rotate-12 transition-transform" />
                        </Link>
                        <button onClick={() => setShowHelp(true)} className="w-full sm:w-auto px-8 py-4 bg-transparent border dark:border-[#333] border-gray-300 dark:text-white text-gray-900 font-semibold rounded-xl md:rounded-full dark:hover:bg-white/5 hover:bg-black/5 transition-colors flex items-center justify-center space-x-2 dark:hover:border-[#555] hover:border-gray-400">
                            <span>How It Works</span>
                            <PlayCircle className="w-4 h-4 dark:text-gray-400 text-gray-600" />
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
                                <feature.icon className="w-6 h-6 dark:text-[#1eff00] text-emerald-600 mb-3 opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all" />
                                <h4 className="dark:text-white text-gray-900 font-semibold text-xs mb-1 transition-colors">{feature.title}</h4>
                                <p className="dark:text-gray-500 text-gray-600 text-[10px] transition-colors">{feature.sub}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Right Column: Interactive App Thumbnail */}
                <div className="w-full max-w-[600px] mx-auto xl:mx-0 relative aspect-[4/5] sm:aspect-square xl:aspect-[4/5] dark:shadow-[0_0_100px_rgba(0,0,0,0.5)] shadow-2xl rounded-[40px] flex items-center justify-center border dark:border-[#1a1a1a] border-gray-200 dark:bg-[#0c0c0c] bg-white overflow-hidden group transition-colors">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] dark:bg-[#1eff00]/5 bg-emerald-500/5 blur-[120px] rounded-full pointer-events-none -z-10" />

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
                    <span className="dark:text-[#1eff00] text-emerald-600 text-xs font-bold tracking-[0.2em] uppercase mb-4 inline-block transition-colors">About This Service</span>
                    <h2 className="text-3xl md:text-5xl font-bold dark:text-white text-gray-900 transition-colors">Why Practice <span className="dark:text-[#1eff00] text-emerald-600">Morse Code</span>?</h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {[
                        { icon: Target, title: "Boost Focus", desc: "Improve concentration and attention to detail." },
                        { icon: MessageSquare, title: "Learn Communication", desc: "Understand the fundamentals of classic communication." },
                        { icon: Gamepad2, title: "Fun & Engaging", desc: "A unique and enjoyable way to learn something new." },
                        { icon: Lightbulb, title: "Useful Skill", desc: "Morse code is still used in aviation, radio & more." },
                    ].map((card, i) => (
                        <div key={i} className="dark:bg-gradient-to-br dark:from-[#111] dark:to-[#0a0a0a] bg-white border dark:border-[#1a1a1a] border-gray-200 shadow-sm rounded-3xl p-8 dark:hover:border-[#333] hover:shadow-md hover:border-gray-300 transition-all group">
                            <div className="w-12 h-12 rounded-full dark:bg-[#1eff00]/10 bg-emerald-500/10 flex items-center justify-center mb-6 dark:group-hover:bg-[#1eff00]/20 group-hover:bg-emerald-500/20 transition-colors">
                                <card.icon className="w-6 h-6 dark:text-[#1eff00] text-emerald-600 transition-colors" />
                            </div>
                            <h3 className="text-lg font-bold dark:text-white text-gray-900 mb-2 transition-colors">{card.title}</h3>
                            <p className="text-sm dark:text-gray-400 text-gray-600 leading-relaxed transition-colors">{card.desc}</p>
                        </div>
                    ))}
                </div>
            </div>

            <AnimatePresence>
                {showHelp && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
                        onClick={() => setShowHelp(false)}
                    >
                        <motion.div
                            initial={{ scale: 0.95, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.95, opacity: 0 }}
                            className="dark:bg-[#111] bg-white border dark:border-[#222] border-gray-200 rounded-3xl p-6 md:p-8 max-w-sm w-full shadow-2xl transition-colors"
                            onClick={e => e.stopPropagation()}
                        >
                            <h2 className="text-base md:text-lg font-bold tracking-widest dark:text-white text-gray-900 mb-4 md:mb-6 border-b dark:border-[#222] border-gray-200 pb-3 md:pb-4 transition-colors">HOW TO PRACTICE</h2>
                            <ul className="space-y-3 md:space-y-4 text-[10px] md:text-xs font-mono dark:text-gray-400 text-gray-600 transition-colors">
                                <li className="flex justify-between items-center dark:bg-[#0a0a0a] bg-gray-50 p-2.5 md:p-3 rounded-lg border dark:border-[#222] border-gray-200 transition-colors"><span className="dark:text-white text-gray-900 uppercase tracking-wider">Short Press</span> <span className="dark:text-[#1eff00] text-emerald-600 font-bold text-lg md:text-xl leading-none" style={{ textShadow: "0 0 10px rgba(30,255,0,0.5)" }}>.</span></li>
                                <li className="flex justify-between items-center dark:bg-[#0a0a0a] bg-gray-50 p-2.5 md:p-3 rounded-lg border dark:border-[#222] border-gray-200 transition-colors"><span className="dark:text-white text-gray-900 uppercase tracking-wider">Long Press</span> <span className="dark:text-[#1eff00] text-emerald-600 font-bold text-lg md:text-xl leading-none" style={{ textShadow: "0 0 10px rgba(30,255,0,0.5)" }}>-</span></li>
                            </ul>
                            <div className="mt-6 md:mt-8 pt-4 md:pt-6 border-t dark:border-[#222] border-gray-200 flex flex-col space-y-4 md:space-y-6 transition-colors">
                                <div>
                                    <p className="text-[9px] md:text-[10px] uppercase tracking-widest dark:text-[#666] text-gray-500 mb-1.5 md:mb-2 font-bold transition-colors">Desktop</p>
                                    <p className="dark:text-[#aaa] text-gray-600 text-[10px] md:text-xs transition-colors">Press & hold <kbd className="px-1.5 py-0.5 md:px-2 md:py-1 dark:bg-[#222] bg-gray-100 rounded border dark:border-[#333] border-gray-300 font-mono dark:text-[#1eff00] text-emerald-600">SPACEBAR</kbd></p>
                                </div>
                                <div>
                                    <p className="text-[9px] md:text-[10px] uppercase tracking-widest dark:text-[#666] text-gray-500 mb-1.5 md:mb-2 font-bold transition-colors">Mobile</p>
                                    <p className="dark:text-[#aaa] text-gray-600 text-[10px] md:text-xs transition-colors">Tap & hold the interactive lever on screen.</p>
                                </div>
                            </div>
                            <button
                                onClick={() => setShowHelp(false)}
                                className="w-full mt-6 md:mt-8 py-2.5 md:py-3 dark:bg-[#111] bg-gray-50 dark:text-[#1eff00] text-emerald-600 border dark:border-[#222] border-gray-200 rounded-xl dark:hover:bg-[#1a1a1a] hover:bg-gray-100 transition-colors uppercase text-[10px] font-bold tracking-widest shadow-[0_0_15px_rgba(30,255,0,0.1)]"
                            >
                                Close
                            </button>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
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
            className="dark:bg-gradient-to-b dark:from-[#111] dark:to-[#0a0a0a] bg-white border dark:border-white/10 border-gray-200 rounded-3xl p-8 lg:p-12 shadow-2xl relative overflow-hidden max-w-4xl transition-colors"
        >
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-[80px] -z-10 pointer-events-none translate-x-1/2 -translate-y-1/2" />

            <div className="flex items-center space-x-4 mb-6">
                <div className="p-4 bg-primary/10 rounded-2xl border border-primary/20 text-primary">
                    {service.icon}
                </div>
                <h1 className="text-3xl font-bold tracking-tight dark:text-white text-gray-900 transition-colors">{service.title}</h1>
            </div>

            <p className="dark:text-gray-400 text-gray-600 text-lg mb-10 max-w-2xl leading-relaxed transition-colors">
                {service.description}
            </p>

            <div>
                <h3 className="text-sm font-semibold uppercase tracking-widest dark:text-gray-500 text-gray-400 mb-6 transition-colors">Core Features</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {service.features?.map((feature: any, idx: number) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.1 + idx * 0.05 }}
                            className="flex items-center space-x-3 dark:bg-white/5 bg-gray-50 border dark:border-white/5 border-gray-200 rounded-xl p-4 dark:hover:bg-white/10 hover:bg-gray-100 transition-colors"
                        >
                            <ChevronRight className="w-4 h-4 text-primary flex-shrink-0" />
                            <span className="dark:text-gray-300 text-gray-700 text-sm font-medium transition-colors">{feature}</span>
                        </motion.div>
                    ))}
                </div>
            </div>

            <div className="mt-12 pt-8 border-t dark:border-white/10 border-gray-200 transition-colors">
                <button className="px-8 py-4 dark:bg-white bg-primary dark:text-black text-white font-semibold rounded-full dark:hover:bg-gray-200 hover:bg-primary/90 transition-colors dark:shadow-[0_0_20px_rgba(255,255,255,0.15)] shadow-md hover:scale-105 active:scale-95 duration-200">
                    Request Configuration
                </button>
            </div>
        </motion.div>
    );
}
