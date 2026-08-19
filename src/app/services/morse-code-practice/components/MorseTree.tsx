"use client";

import { motion } from "framer-motion";
import { Zap } from "lucide-react";

interface MorseTreeProps {
    currentDecoded: string;
}

// Map characters to their relative level for dynamic styling
const CHAR_MAP = ['E', 'I', 'S', 'H', 'T', 'M', 'O', 'A', 'N', 'D', 'U', 'R', 'K', 'W', 'G', 'B', 'L', 'F', 'P', 'V', 'C', 'X', 'Y', 'Z', 'J', 'Q'];

export default function MorseTree({ currentDecoded }: MorseTreeProps) {
    return (
        <div className="bg-[#111] rounded-3xl border border-white/5 p-6 h-full relative overflow-hidden flex flex-col items-center shadow-[inset_0_0_50px_rgba(0,0,0,0.5)]">

            {/* Small top antenna element */}
            <div className="absolute top-4 flex flex-col items-center">
                <Zap className="w-5 h-5 text-gray-600 mb-1" />
                <div className="w-px h-6 bg-gray-700" />
            </div>

            <div className="w-full h-full pt-16 pb-4 flex items-center justify-center relative">
                {/* Simple decorative background grid / lines */}
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-white/[0.03] to-transparent pointer-events-none" />
                <div className="absolute inset-0" style={{ backgroundSize: '30px 30px', backgroundImage: 'linear-gradient(to right, #333 1px, transparent 1px), linear-gradient(to bottom, #333 1px, transparent 1px)', opacity: 0.1 }} />

                {/* Since a perfect SVG tree is tedious, we create a visually appealing abstract "circuit board" node graph */}
                <div className="relative w-full max-w-[280px] h-[300px]">
                    {/* Center Trunk */}
                    <div className="absolute top-0 bottom-0 left-1/2 w-px bg-gray-700 -translate-x-1/2" />

                    {/* Nodes */}
                    {/* Example Layout for visual aesthetic simulating a circuit */}
                    {[
                        { char: 'E', l: '50%', t: '20%' },
                        { char: 'I', l: '70%', t: '20%' },
                        { char: 'S', l: '85%', t: '35%' },
                        { char: 'H', l: '95%', t: '50%' },

                        { char: 'T', l: '30%', t: '20%' },
                        { char: 'M', l: '15%', t: '35%' },
                        { char: 'O', l: '5%', t: '50%' },

                        { char: 'A', l: '60%', t: '45%' },
                        { char: 'W', l: '70%', t: '60%' },
                        { char: 'J', l: '80%', t: '75%' },

                        { char: 'N', l: '40%', t: '45%' },
                        { char: 'G', l: '30%', t: '60%' },
                        { char: 'Z', l: '20%', t: '75%' },
                    ].map((node) => {
                        const isActive = currentDecoded === node.char;
                        return (
                            <div key={node.char} className="absolute" style={{ left: node.l, top: node.t, transform: 'translate(-50%, -50%)' }}>
                                {/* Connection Line to center trunk (simplified visual) */}
                                <div className="absolute top-1/2 w-[50px] h-px bg-gray-700 -z-10" style={{
                                    left: parseInt(node.l) > 50 ? '-50px' : '100%',
                                    transform: 'translateY(-50%)'
                                }} />
                                <div
                                    className={`w-6 h-6 rounded-full border-2 flex items-center justify-center text-[9px] font-bold transition-all duration-300 ${isActive
                                            ? 'border-primary bg-primary text-[#050505] shadow-[0_0_15px_rgba(59,130,246,1)] scale-110 z-10'
                                            : 'border-white/20 bg-[#151515] text-gray-500 hover:border-white/50'
                                        }`}
                                >
                                    {node.char}
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>

            {/* Footer Decal */}
            <h2 className="absolute bottom-4 left-6 text-[10px] tracking-[0.2em] uppercase text-gray-600 font-bold mix-blend-screen">
                MORSE CODE <span className="text-primary/50">SYSTEM</span>
            </h2>
        </div>
    );
}
