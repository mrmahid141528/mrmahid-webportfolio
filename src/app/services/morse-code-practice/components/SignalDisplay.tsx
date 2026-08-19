"use client";

interface SignalDisplayProps {
    currentSignal: string;
}

export default function SignalDisplay({ currentSignal }: SignalDisplayProps) {
    return (
        <div className="bg-[#111] border border-white/5 rounded-2xl p-5 mb-4 relative overflow-hidden">
            <div className="flex items-center space-x-2 mb-3">
                <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#555]">Signal</h3>
                <div className="w-1.5 h-1.5 rounded-full bg-primary/50 animate-pulse" />
            </div>

            <div className="flex flex-wrap items-center gap-3 min-h-[40px]">
                {currentSignal.split("").map((char, index) => {
                    if (char === ".") {
                        return <div key={index} className="w-3 h-3 bg-primary rounded-full shadow-[0_0_10px_rgba(59,130,246,0.8)] animate-in fade-in zoom-in duration-200" />;
                    } else if (char === "-") {
                        return <div key={index} className="w-10 h-3 bg-primary rounded-full shadow-[0_0_10px_rgba(59,130,246,0.8)] animate-in fade-in zoom-in duration-200" />;
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
