"use client";

import { createElement } from "react";

interface MorseTreeProps {
    currentDecoded: string;
}

export default function MorseTree({ currentDecoded }: MorseTreeProps) {
    const neonGreen = "#1eff00";

    // Defining the exact coordinates for the circuit board lines and nodes.
    // We'll use a responsive 100x100 coordinate system with % left/top
    const nodes = [
        // Right side (Starts with E, Dots)
        { id: 'E', l: 60, t: 20 },
        { id: 'I', l: 70, t: 20 },
        { id: 'S', l: 80, t: 20 },
        { id: 'H', l: 90, t: 20 },

        { id: 'A', l: 60, t: 40 },
        { id: 'R', l: 70, t: 40 },
        { id: 'L', l: 80, t: 40 },

        { id: 'W', l: 60, t: 60 },
        { id: 'P', l: 70, t: 60 },
        { id: 'J', l: 60, t: 80 },

        { id: 'U', l: 65, t: 30 },
        { id: 'F', l: 65, t: 45 },
        { id: 'V', l: 75, t: 30 },

        // Left side (Starts with T, Dashes)
        { id: 'T', l: 40, t: 20 },
        { id: 'M', l: 25, t: 20 },
        { id: 'O', l: 10, t: 20 },

        { id: 'N', l: 40, t: 40 },
        { id: 'D', l: 40, t: 60 },
        { id: 'B', l: 40, t: 80 },

        { id: 'K', l: 25, t: 40 },
        { id: 'Y', l: 10, t: 40 },
        { id: 'C', l: 25, t: 55 },

        { id: 'G', l: 25, t: 30 },
        { id: 'Z', l: 25, t: 45 },
        { id: 'Q', l: 10, t: 30 },

        { id: 'X', l: 20, t: 70 },
    ];

    const lines = [
        // Trunk
        { x1: 50, y1: 5, x2: 50, y2: 90 },

        // Right Main Branch (E-I-S-H)
        { x1: 50, y1: 20, x2: 90, y2: 20 },
        // Right sub-branches
        { x1: 60, y1: 20, x2: 60, y2: 80 }, // A, W, J down from E
        { x1: 60, y1: 40, x2: 80, y2: 40 }, // A -> R -> L
        { x1: 60, y1: 60, x2: 70, y2: 60 }, // W -> P
        { x1: 70, y1: 20, x2: 70, y2: 30 }, // I -> U
        { x1: 65, y1: 30, x2: 75, y2: 30 }, // U -> V
        { x1: 65, y1: 30, x2: 65, y2: 45 }, // U -> F

        // Left Main Branch (T-M-O)
        { x1: 50, y1: 20, x2: 10, y2: 20 },
        // Left sub-branches
        { x1: 40, y1: 20, x2: 40, y2: 80 }, // N, D, B down from T
        { x1: 25, y1: 20, x2: 25, y2: 55 }, // G, M, K, C down from M
        { x1: 40, y1: 40, x2: 10, y2: 40 }, // N -> K -> Y
        { x1: 40, y1: 70, x2: 20, y2: 70 }, // D -> X
        { x1: 25, y1: 30, x2: 10, y2: 30 }, // G -> Q
    ];

    return (
        <div className="bg-[#121212] rounded-[24px] border-t border-b border-[#2a2a2a] border-l border-r border-[#1a1a1a] shadow-[inset_0_4px_20px_rgba(0,0,0,0.8),_0_10px_30px_rgba(0,0,0,0.5)] p-6 h-full relative overflow-hidden flex flex-col items-center">

            {/* Screw Heads for realism */}
            <div className="absolute top-4 left-4 w-3 h-3 rounded-full bg-gradient-to-br from-[#333] to-[#111] border border-[#222] shadow-inner flex items-center justify-center"><div className="w-full h-px bg-black rotate-45" /></div>
            <div className="absolute top-4 right-4 w-3 h-3 rounded-full bg-gradient-to-br from-[#333] to-[#111] border border-[#222] shadow-inner flex items-center justify-center"><div className="w-full h-px bg-black -rotate-12" /></div>
            <div className="absolute bottom-4 left-4 w-3 h-3 rounded-full bg-gradient-to-br from-[#333] to-[#111] border border-[#222] shadow-inner flex items-center justify-center"><div className="w-full h-px bg-black rotate-90" /></div>
            <div className="absolute bottom-4 right-4 w-3 h-3 rounded-full bg-gradient-to-br from-[#333] to-[#111] border border-[#222] shadow-inner flex items-center justify-center"><div className="w-full h-px bg-black rotate-180" /></div>

            {/* Header labels to match image EXACTLY: "MORSE" on left, Antenna center, "CODE" right */}
            <div className="absolute top-6 w-full flex items-center justify-center pointer-events-none z-10 px-12">
                <span className="text-[#888] font-mono tracking-[0.3em] font-medium text-sm flex-1 text-right pr-6 uppercase mix-blend-screen">Morse</span>

                {/* Antenna Shape */}
                <div className="relative w-8 h-12 flex flex-col items-center flex-shrink-0">
                    <svg viewBox="0 0 40 40" className="w-full h-full stroke-[#444] fill-none" strokeWidth="1.5">
                        <path d="M 5,10 L 20,30 L 35,10" />
                        <path d="M 20,10 L 20,40" />
                        <circle cx="20" cy="5" r="2" className="fill-[#444]" />
                        <path d="M 10,16 L 30,16" />
                    </svg>
                </div>

                <span className="text-[#1eff00] font-mono tracking-[0.3em] font-medium text-sm flex-1 pl-6 uppercase mix-blend-screen" style={{ textShadow: "0 0 10px rgba(30, 255, 0, 0.4)" }}>Code</span>
            </div>

            {/* Circuit Board Layout */}
            <div className="relative w-full h-full mt-12 bg-transparent">

                <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ filter: "drop-shadow(0px 2px 2px rgba(0,0,0,0.5))" }}>
                    {lines.map((line, idx) => (
                        <line
                            key={idx}
                            x1={`${line.x1}%`} y1={`${line.y1}%`}
                            x2={`${line.x2}%`} y2={`${line.y2}%`}
                            stroke="#333" strokeWidth="2" strokeLinecap="round"
                        />
                    ))}
                </svg>

                {nodes.map(node => {
                    const isActive = currentDecoded === node.id;
                    // E, I, S, H nodes appear more circular/LED like in reference
                    const isLED = ['E', 'I', 'S', 'H'].includes(node.id);

                    return (
                        <div key={node.id} className="absolute" style={{ left: `${node.l}%`, top: `${node.t}%`, transform: 'translate(-50%, -50%)' }}>
                            <div className="flex items-center space-x-2">
                                {/* Some letters are left of the node, others right, based on positioning */}
                                {node.l < 50 && <span className={`text-[11px] font-mono font-bold leading-none ${isActive ? 'text-[#1eff00]' : 'text-[#666]'}`} style={isActive ? { textShadow: `0 0 8px ${neonGreen}` } : {}}>{node.id}</span>}

                                <div
                                    className={`flex items-center justify-center transition-all duration-300 ${isLED
                                            ? 'w-4 h-4 rounded-full border-2 border-[#1a1a1a] '
                                            : 'w-4 h-4 rounded-sm border-2 border-[#333] '
                                        } ${isActive
                                            ? 'bg-[#1eff00] shadow-[0_0_15px_rgba(30,255,0,0.8),_inset_0_0_5px_rgba(255,255,255,0.8)] border-[#1eff00]'
                                            : (isLED ? 'bg-[#1a1a1a] shadow-[inset_0_2px_4px_rgba(0,0,0,0.5)]' : 'bg-[#111]')
                                        }`}
                                />

                                {node.l > 50 && <span className={`text-[11px] font-mono font-bold leading-none ${isActive ? 'text-[#1eff00]' : 'text-[#666]'}`} style={isActive ? { textShadow: `0 0 8px ${neonGreen}` } : {}}>{node.id}</span>}
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    );
}
