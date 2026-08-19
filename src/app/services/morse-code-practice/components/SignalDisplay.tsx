"use client";

interface SignalDisplayProps {
    currentSignal: string;
}

export default function SignalDisplay({ currentSignal }: SignalDisplayProps) {
    return (
        <div className="dark:bg-[#121212] bg-gray-50 rounded-[16px] md:rounded-[20px] dark:shadow-[inset_0_4px_15px_rgba(0,0,0,0.8),_0_5px_15px_rgba(0,0,0,0.5)] shadow-inner border-t dark:border-[#222] border-gray-200 border-l border-r dark:border-[#1a1a1a] p-3 md:p-4 mb-2 md:mb-3 relative overflow-hidden transition-colors">
            <div className="flex items-center space-x-2 mb-2">
                <h3 className="text-[9px] md:text-[10px] font-mono font-bold uppercase tracking-[0.2em] dark:text-[#888] text-gray-500 transition-colors">Signal</h3>
                <div className="w-1.5 h-1.5 rounded-full dark:bg-[#1eff00] bg-emerald-500 animate-pulse shadow-[0_0_8px_rgba(30,255,0,0.8)] transition-colors" />
            </div>

            <div className="flex flex-wrap items-center gap-3 min-h-[40px]">
                {currentSignal.split("").map((char, index) => {
                    if (char === ".") {
                        return <div key={index} className="w-3 h-3 dark:bg-[#1eff00] bg-emerald-500 rounded-full dark:shadow-[0_0_10px_rgba(30,255,0,0.8)] shadow-[0_0_5px_rgba(16,185,129,0.4)] animate-in fade-in zoom-in duration-200 transition-colors" />;
                    } else if (char === "-") {
                        return <div key={index} className="w-10 h-3 dark:bg-[#1eff00] bg-emerald-500 rounded-full dark:shadow-[0_0_10px_rgba(30,255,0,0.8)] shadow-[0_0_5px_rgba(16,185,129,0.4)] animate-in fade-in zoom-in duration-200 transition-colors" />;
                    }
                    return null;
                })}
                {currentSignal.length === 0 && (
                    <span className="dark:text-white/20 text-gray-300 text-sm font-medium tracking-widest transition-colors">WAITING...</span>
                )}
            </div>
        </div>
    );
}
