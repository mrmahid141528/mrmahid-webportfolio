"use client";

interface MorseTreeProps {
    currentDecoded: string;
}

type MorseNode = {
    id: string,
    type: 'dot' | 'dash',
    L: number,
    T: number,
    pos: string,
    parentId: string
};

const ROOT = { L: 50, T: 20 };

const nodes: MorseNode[] = [
    // Right Trunk (Dots)
    { id: 'E', type: 'dot', L: 60, T: 20, pos: 't', parentId: 'ROOT' },
    { id: 'I', type: 'dot', L: 70, T: 20, pos: 't', parentId: 'E' },
    { id: 'S', type: 'dot', L: 80, T: 20, pos: 't', parentId: 'I' },
    { id: 'H', type: 'dot', L: 90, T: 20, pos: 't', parentId: 'S' },

    // Right Side Branches
    { id: 'A', type: 'dash', L: 60, T: 55, pos: 'l', parentId: 'E' },
    { id: 'W', type: 'dash', L: 60, T: 75, pos: 'l', parentId: 'A' },
    { id: 'J', type: 'dash', L: 60, T: 85, pos: 'r', parentId: 'W' },

    { id: 'R', type: 'dot', L: 70, T: 55, pos: 'b', parentId: 'A' },
    { id: 'L', type: 'dot', L: 80, T: 55, pos: 'r', parentId: 'R' },
    { id: 'P', type: 'dot', L: 70, T: 75, pos: 'r', parentId: 'W' },

    { id: 'U', type: 'dash', L: 70, T: 35, pos: 'l', parentId: 'I' },
    { id: 'F', type: 'dot', L: 77, T: 35, pos: 'r', parentId: 'U' },

    { id: 'V', type: 'dash', L: 80, T: 35, pos: 'r', parentId: 'S' },

    // Left Trunk (Dashes)
    { id: 'T', type: 'dash', L: 40, T: 20, pos: 't', parentId: 'ROOT' },
    { id: 'M', type: 'dash', L: 30, T: 20, pos: 't', parentId: 'T' },
    { id: 'O', type: 'dash', L: 20, T: 20, pos: 't', parentId: 'M' },

    // Left Side Branches
    { id: 'N', type: 'dot', L: 40, T: 55, pos: 'r', parentId: 'T' },
    { id: 'D', type: 'dot', L: 40, T: 75, pos: 'r', parentId: 'N' },
    { id: 'B', type: 'dot', L: 40, T: 85, pos: 'r', parentId: 'D' },

    { id: 'K', type: 'dash', L: 30, T: 55, pos: 't', parentId: 'N' },
    { id: 'Y', type: 'dash', L: 20, T: 55, pos: 't', parentId: 'K' },
    { id: 'C', type: 'dot', L: 30, T: 66, pos: 'r', parentId: 'K' },

    { id: 'X', type: 'dash', L: 30, T: 75, pos: 'l', parentId: 'D' },

    { id: 'G', type: 'dot', L: 30, T: 35, pos: 'r', parentId: 'M' },
    { id: 'Q', type: 'dash', L: 20, T: 35, pos: 'b', parentId: 'G' },
    { id: 'Z', type: 'dot', L: 30, T: 45, pos: 'r', parentId: 'G' },
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
                <div className="absolute inset-0 w-full h-full pointer-events-none">
                    <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-full overflow-visible" style={{ filter: "drop-shadow(0px 2px 2px rgba(0,0,0,0.5))" }}>

                        {/* Antenna drop line explicitly to ROOT */}
                        <path d={`M 50 15 L 50 20`} fill="none" stroke="#2a2a2a" strokeWidth="0.8" />

                        {nodes.map(node => {
                            const parent = node.parentId === 'ROOT' ? ROOT : nodes.find(n => n.id === node.parentId);
                            if (!parent) return null;

                            const isActive = currentDecoded === node.id;

                            return (
                                <path
                                    key={`line-${node.id}`}
                                    d={`M ${parent.L} ${parent.T} L ${node.L} ${node.T}`}
                                    fill="none"
                                    stroke={isActive ? neonGreen : "#2a2a2a"}
                                    strokeWidth={isActive ? "0.8" : "0.5"}
                                    className="transition-colors duration-300"
                                    style={isActive ? { filter: `drop-shadow(0 0 3px ${neonGreen})` } : {}}
                                />
                            );
                        })}
                    </svg>
                </div>

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
