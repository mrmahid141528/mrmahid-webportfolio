"use client";

interface SignalDisplayProps {
    currentSignal: string;
}

export default function SignalDisplay({ currentSignal }: SignalDisplayProps) {
    return (
        <div className="bg-[#121212] rounded-[16px] md:rounded-[20px] shadow-[inset_0_4px_15px_rgba(0,0,0,0.8),_0_5px_15px_rgba(0,0,0,0.5)] border-t border-[#222] border-l border-r border-[#1a1a1a] p-3 md:p-4 mb-2 md:mb-3 relative overflow-hidden">
            <div className="flex items-center space-x-2 mb-2">
                <h3 className="text-[9px] md:text-[10px] font-mono font-bold uppercase tracking-[0.2em] text-[#888]">Signal</h3>
                <div className="w-1.5 h-1.5 rounded-full bg-[#1eff00] animate-pulse shadow-[0_0_8px_rgba(30,255,0,0.8)]" />
            </div>

            <div className="flex flex-wrap items-center gap-3 min-h-[40px]">
                {currentSignal.split("").map((char, index) => {
                    if (char === ".") {
                        return <div key={index} className="w-3 h-3 bg-[#1eff00] rounded-full shadow-[0_0_10px_rgba(30,255,0,0.8)] animate-in fade-in zoom-in duration-200" />;
                    } else if (char === "-") {
                        return <div key={index} className="w-10 h-3 bg-[#1eff00] rounded-full shadow-[0_0_10px_rgba(30,255,0,0.8)] animate-in fade-in zoom-in duration-200" />;
                    }
                    return null;
                })}
                {currentSignal.length === 0 && (
                    <span className="text-white/20 text-sm font-medium tracking-widest">WAITING...</span>
                )}
            </div>
        </div>
    );
}
