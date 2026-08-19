"use client";

interface MorseTreeProps {
    currentDecoded: string;
}

const lines = [
    // T-junction at top
    { x1: 50, y1: 15, x2: 50, y2: 20 },
    { x1: 13, y1: 20, x2: 92, y2: 20 }, // Main Trunk

    // Left G-line (between M & T)
    { x1: 32, y1: 20, x2: 32, y2: 35 },
    { x1: 13, y1: 35, x2: 32, y2: 35 },
    { x1: 32, y1: 35, x2: 32, y2: 50 },

    // Left N-line (between Antenna & T)
    { x1: 44, y1: 20, x2: 44, y2: 85 }, // Trunk -> B
    { x1: 26, y1: 52, x2: 44, y2: 52 }, // K -> N
    { x1: 13, y1: 52, x2: 26, y2: 52 }, // Y -> K
    { x1: 26, y1: 52, x2: 26, y2: 65 }, // K -> C
    { x1: 22, y1: 72, x2: 44, y2: 72 }, // X -> D

    // Right U/V-lines
    { x1: 72, y1: 20, x2: 72, y2: 35 },
    { x1: 72, y1: 35, x2: 72, y2: 46 }, // U -> F
    { x1: 82, y1: 20, x2: 82, y2: 35 },

    // Right A-line (between E & Antenna)
    { x1: 56, y1: 20, x2: 56, y2: 85 }, // Trunk -> J
    { x1: 56, y1: 52, x2: 88, y2: 52 }, // A -> R -> L
    { x1: 56, y1: 72, x2: 69, y2: 72 }, // W -> P
];

const nodes = [
    { id: 'O', type: 'dash', L: 13, T: 20, pos: 't' },
    { id: 'M', type: 'dash', L: 26, T: 20, pos: 't' },
    { id: 'T', type: 'dash', L: 38, T: 20, pos: 't' },
    { id: 'E', type: 'dot', L: 60, T: 20, pos: 't' },
    { id: 'I', type: 'dot', L: 72, T: 20, pos: 't' },
    { id: 'S', type: 'dot', L: 82, T: 20, pos: 't' },
    { id: 'H', type: 'dot', L: 92, T: 20, pos: 't' },

    { id: 'Q', type: 'dash', L: 13, T: 35, pos: 'b' },
    { id: 'G', type: 'dot', L: 32, T: 35, pos: 'r' },
    { id: 'U', type: 'dash', L: 72, T: 35, pos: 'l' },
    { id: 'V', type: 'dash', L: 82, T: 35, pos: 'r' },

    { id: 'Z', type: 'dot', L: 32, T: 50, pos: 'r' },
    { id: 'F', type: 'dot', L: 72, T: 46, pos: 'r' },

    { id: 'Y', type: 'dash', L: 13, T: 52, pos: 't' },
    { id: 'K', type: 'dash', L: 26, T: 52, pos: 't' },
    { id: 'N', type: 'dot', L: 44, T: 52, pos: 'r' },
    { id: 'A', type: 'dash', L: 56, T: 52, pos: 'l' },
    { id: 'R', type: 'dot', L: 69, T: 52, pos: 'b' },
    { id: 'L', type: 'dot', L: 88, T: 52, pos: 'r' },

    { id: 'C', type: 'dot', L: 26, T: 65, pos: 'r' },

    { id: 'X', type: 'dash', L: 22, T: 72, pos: 'l' },
    { id: 'D', type: 'dot', L: 44, T: 72, pos: 'r' },
    { id: 'W', type: 'dash', L: 56, T: 72, pos: 'l' },
    { id: 'P', type: 'dot', L: 69, T: 72, pos: 'r' },

    { id: 'B', type: 'dot', L: 44, T: 85, pos: 'r' },
    { id: 'J', type: 'dash', L: 56, T: 85, pos: 'r' }
];

export default function MorseTree({ currentDecoded }: MorseTreeProps) {
    const neonGreen = "#1eff00";

    return (
        <div className="bg-[#121212] rounded-[24px] border-t border-b border-[#2a2a2a] border-l border-r border-[#1a1a1a] shadow-[inset_0_4px_20px_rgba(0,0,0,0.8),_0_10px_30px_rgba(0,0,0,0.5)] p-4 h-full relative overflow-hidden flex flex-col items-center select-none font-mono">

            {/* Decorative Screws */}
            <div className="absolute top-4 left-4 w-3 h-3 rounded-full bg-gradient-to-br from-[#333] to-[#111] border border-[#222] shadow-[inset_0_2px_4px_rgba(0,0,0,0.8)]"><div className="w-full h-px bg-black rotate-45 mt-1.5" /></div>
            <div className="absolute top-4 right-4 w-3 h-3 rounded-full bg-gradient-to-br from-[#333] to-[#111] border border-[#222] shadow-[inset_0_2px_4px_rgba(0,0,0,0.8)]"><div className="w-full h-px bg-black -rotate-12 mt-1.5" /></div>
            <div className="absolute bottom-4 left-4 w-3 h-3 rounded-full bg-gradient-to-br from-[#333] to-[#111] border border-[#222] shadow-[inset_0_2px_4px_rgba(0,0,0,0.8)]"><div className="w-full h-px bg-black rotate-90 mt-1.5" /></div>
            <div className="absolute bottom-4 right-4 w-3 h-3 rounded-full bg-gradient-to-br from-[#333] to-[#111] border border-[#222] shadow-[inset_0_2px_4px_rgba(0,0,0,0.8)]"><div className="w-full h-px bg-black rotate-180 mt-1.5" /></div>

            {/* Head Antenna & Header */}
            <div className="absolute top-4 w-full flex items-center justify-center z-10 pointer-events-none">
                <span className="text-[#6bb] font-sans tracking-[0.3em] font-medium text-xs flex-1 text-right pr-5 uppercase opacity-60">MORSE</span>

                <div className="w-8 h-8 flex flex-col items-center">
                    <svg viewBox="0 0 40 40" className="w-full h-full stroke-[#444] fill-none" strokeWidth="1.5">
                        <path d="M 5,10 L 20,30 L 35,10" />
                        <path d="M 20,10 L 20,40" />
                        <circle cx="20" cy="5" r="3" className="fill-[#1a1a1a] stroke-[#666]" />
                        <path d="M 12,18 L 28,18" />
                    </svg>
                </div>

                <span className="text-[#1eff00] font-sans tracking-[0.3em] font-medium text-xs flex-1 pl-5 uppercase" style={{ textShadow: "0 0 10px rgba(30, 255, 0, 0.4)" }}>CODE</span>
            </div>

            {/* Circuit Layer & Nodes */}
            <div className="relative w-full h-[calc(100%-2rem)] mt-6 pointer-events-none">

                {/* SVG Circuit Lines */}
                <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute top-0 left-0 w-full h-full overflow-visible" style={{ filter: "drop-shadow(0px 2px 2px rgba(0,0,0,0.5))" }}>
                    {lines.map((l, i) => (
                        <line
                            key={`fixed-line-${i}`}
                            x1={`${l.x1}%`} y1={`${l.y1}%`}
                            x2={`${l.x2}%`} y2={`${l.y2}%`}
                            stroke="#444"
                            strokeWidth="0.8"
                        />
                    ))}
                </svg>

                {/* Nodes Layer */}
                {nodes.map(node => {
                    const isActive = currentDecoded === node.id;
                    const isDash = node.type === 'dash';

                    return (
                        <div
                            key={node.id}
                            className="absolute flex items-center justify-center transform -translate-x-1/2 -translate-y-1/2"
                            style={{ left: `${node.L}%`, top: `${node.T}%` }}
                        >
                            {/* Node Geometric Shape */}
                            <div className={`relative transition-all duration-300 z-10 ${isDash ? 'w-6 h-3 rounded-[3px]' : 'w-4 h-4 rounded-full'} ${isActive ? 'bg-[#1eff00] shadow-[0_0_15px_rgba(30,255,0,0.8),_inset_0_0_5px_rgba(255,255,255,0.8)] border-[#1eff00]'
                                    : 'bg-[#1c1c1c] shadow-[0_2px_4px_rgba(0,0,0,0.8),_inset_0_1px_2px_rgba(255,255,255,0.05)] border border-[#333]'
                                }`}>

                                {/* Positioned Label */}
                                <div className={`absolute select-none font-bold text-[10px] sm:text-[11px] font-sans ${isActive ? 'text-[#1eff00]' : 'text-[#888]'
                                    }`} style={{
                                        ...(isActive ? { textShadow: `0 0 8px ${neonGreen}` } : {}),
                                        ...(node.pos === 't' ? { bottom: '100%', left: '50%', transform: 'translate(-50%, -4px)' } :
                                            node.pos === 'b' ? { top: '100%', left: '50%', transform: 'translate(-50%, +4px)' } :
                                                node.pos === 'l' ? { right: '100%', top: '50%', transform: 'translate(-6px, -50%)' } :
                                                    { left: '100%', top: '50%', transform: 'translate(6px, -50%)' })
                                    }}>
                                    {node.id}
                                </div>

                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    );
}
