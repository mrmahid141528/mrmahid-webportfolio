"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { Volume2, VolumeX, RotateCcw, HelpCircle } from "lucide-react";
import MorseKey from "./MorseKey";
import SignalDisplay from "./SignalDisplay";
import MorseTree from "./MorseTree";
import { decodeMorse } from "./MorseDecoder";
import { AnimatePresence, motion } from "framer-motion";

const INACTIVITY_TIMEOUT = 700; // ms gap to convert signal to char

export default function MorsePracticePad() {
    const [isSoundEnabled, setIsSoundEnabled] = useState(true);
    const [currentSignal, setCurrentSignal] = useState("");
    const [completedMorse, setCompletedMorse] = useState("");
    const [decodedOutput, setDecodedOutput] = useState("");
    const [showHelp, setShowHelp] = useState(false);
    const [status, setStatus] = useState<"READY" | "TRANSMITTING" | "DECODING">("READY");

    const inactivityTimer = useRef<NodeJS.Timeout | null>(null);

    const handleSignal = useCallback((signal: "." | "-") => {
        setCurrentSignal(prev => {
            const updated = prev + signal;
            // Start/reset timer to decode
            if (inactivityTimer.current) clearTimeout(inactivityTimer.current);
            inactivityTimer.current = setTimeout(() => {
                finalizeSignal(updated);
            }, INACTIVITY_TIMEOUT);

            return updated;
        });
    }, []);

    const finalizeSignal = (signalSeq: string) => {
        setStatus("DECODING");

        // Attempt Decode
        const char = decodeMorse(signalSeq);

        if (char) {
            setDecodedOutput(prev => prev + char);
            setCompletedMorse(prev => prev + (prev ? " " : "") + signalSeq);
        } else {
            // Invalid char or not recognized
            setCompletedMorse(prev => prev + (prev ? " " : "") + "?");
        }

        setCurrentSignal("");

        setTimeout(() => {
            setStatus("READY");
        }, 300);
    };

    const handlePressStart = () => {
        setStatus("TRANSMITTING");
        if (inactivityTimer.current) clearTimeout(inactivityTimer.current);
    };

    const handlePressEnd = () => {
        if (status !== "DECODING") {
            setStatus("READY");
        }
    };

    const handleClear = () => {
        setCurrentSignal("");
        setCompletedMorse("");
        setDecodedOutput("");
        setStatus("READY");
        if (inactivityTimer.current) clearTimeout(inactivityTimer.current);
    };

    // Get the absolute latest decoded character for the glow effect
    const latestDecodedChar = decodedOutput.length > 0 ? decodedOutput[decodedOutput.length - 1] : "";

    return (
        <div className="w-full h-full min-h-[calc(100vh-73px)] border border-white/5 rounded-3xl bg-[#0a0a0a] p-4 lg:p-8 flex flex-col font-sans">

            {/* Header */}
            <header className="flex justify-between items-center mb-8 border-b border-white/5 pb-4">
                <div>
                    <h1 className="text-xl font-bold tracking-widest text-[#aaaaaa]">
                        MORSE <span className="text-primary">CODE</span>
                    </h1>
                    <p className="text-xs uppercase tracking-widest text-[#555] mt-1">PRACTICE PAD</p>
                </div>
                <div className="flex space-x-3">
                    <button
                        onClick={() => setIsSoundEnabled(!isSoundEnabled)}
                        className={`p-3 rounded-xl border transition-all ${isSoundEnabled ? 'bg-primary/10 border-primary/30 text-primary hover:bg-primary/20' : 'bg-white/5 border-white/10 text-gray-500 hover:text-white'}`}
                        title="Toggle Sound"
                    >
                        {isSoundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
                    </button>
                    <button
                        onClick={() => setShowHelp(true)}
                        className="p-3 rounded-xl border border-white/5 bg-white/5 text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
                        title="Help"
                    >
                        <HelpCircle className="w-4 h-4" />
                    </button>
                </div>
            </header>

            {/* Main Grid Setup */}
            <div className="flex-1 grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-6">

                {/* Left Side: Decorate Morse Tree */}
                <div className="hidden lg:block order-2 lg:order-1 h-[400px] lg:h-auto">
                    <MorseTree currentDecoded={latestDecodedChar} />
                </div>

                {/* Right Side: Displays & Controls */}
                <div className="flex flex-col order-1 lg:order-2 self-start w-full">

                    <SignalDisplay currentSignal={currentSignal} />

                    {/* OUTPUT DISPLAYS */}
                    <div className="bg-[#111] border border-white/5 rounded-2xl p-5 mb-4 relative overflow-hidden flex-1">
                        <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#555] mb-2">Decoded Output</h3>
                        <div className="text-4xl lg:text-5xl font-mono text-primary min-h-[60px] tracking-widest break-all">
                            {decodedOutput || <span className="text-white/10">...</span>}
                        </div>
                    </div>

                    <div className="bg-[#111] border border-white/5 rounded-2xl p-5 mb-6 relative overflow-hidden">
                        <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#555] mb-2">Morse Sequence</h3>
                        <div className="text-xl text-emerald-400 min-h-[30px] font-mono break-all opacity-80">
                            {completedMorse || <span className="text-white/10">-.-.</span>}
                        </div>
                    </div>

                    {/* Status */}
                    <div className="flex items-center justify-between px-4 mb-4">
                        <div className="flex items-center space-x-2">
                            <div className={`w-2 h-2 rounded-full ${status === 'TRANSMITTING' ? 'bg-primary animate-ping' : 'bg-white/20'}`} />
                            <span className={`text-[10px] font-bold tracking-widest ${status === 'TRANSMITTING' ? 'text-primary' : 'text-gray-500'}`}>
                                ● {status}
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Area: Controls (Clear & Morse Key) */}
            <div className="mt-8 flex flex-col md:flex-row items-center justify-center gap-6 pb-6 relative z-10 w-full">

                <div className="hidden md:block absolute left-4 bottom-4">
                    {/* Keeping it simple without left side duplicated buttons, just clear and key */}
                </div>

                <div className="w-full flex flex-col items-center justify-center">
                    <MorseKey
                        onSignal={handleSignal}
                        onPressStart={handlePressStart}
                        onPressEnd={handlePressEnd}
                        isSoundEnabled={isSoundEnabled}
                    />
                </div>

                <button
                    onClick={handleClear}
                    className="absolute right-4 bottom-[20%] md:bottom-[30%] px-4 py-3 bg-[#151515] hover:bg-[#222] border border-white/10 rounded-xl text-gray-400 hover:text-white flex items-center space-x-2 transition-all active:scale-95 shadow-md"
                >
                    <RotateCcw className="w-4 h-4" />
                    <span className="text-xs font-semibold uppercase tracking-wider">Clear</span>
                </button>
            </div>

            <div className="text-center mt-auto border-t border-white/5 pt-4">
                <p className="text-[10px] tracking-widest text-gray-600 uppercase">
                    Tip: Spacebar = Key  •  Short = .  •  Long = -
                </p>
            </div>

            {/* Help Modal */}
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
                            className="bg-[#111] border border-white/10 rounded-3xl p-8 max-w-sm w-full"
                            onClick={e => e.stopPropagation()}
                        >
                            <h2 className="text-xl font-bold tracking-widest text-white mb-6 border-b border-white/10 pb-4">HOW TO PRACTICE</h2>
                            <ul className="space-y-4 text-sm text-gray-400">
                                <li className="flex justify-between items-center bg-white/5 p-3 rounded-lg"><span className="text-white">Short Press</span> <span className="font-mono text-primary font-bold text-xl">.</span></li>
                                <li className="flex justify-between items-center bg-white/5 p-3 rounded-lg"><span className="text-white">Long Press</span> <span className="font-mono text-primary font-bold text-xl">-</span></li>
                            </ul>
                            <div className="mt-8 pt-6 border-t border-white/10 flex flex-col space-y-6">
                                <div>
                                    <p className="text-xs uppercase tracking-widest text-[#666] mb-2 font-bold">Desktop</p>
                                    <p className="text-white/80">Press & hold <kbd className="px-2 py-1 bg-white/10 rounded border border-white/20 text-xs font-mono ml-1">SPACEBAR</kbd></p>
                                </div>
                                <div>
                                    <p className="text-xs uppercase tracking-widest text-[#666] mb-2 font-bold">Mobile</p>
                                    <p className="text-white/80">Tap & hold the interactive key on screen.</p>
                                </div>
                            </div>
                            <button
                                onClick={() => setShowHelp(false)}
                                className="w-full mt-8 py-3 bg-primary/20 text-primary border border-primary/30 rounded-xl hover:bg-primary/30 transition-colors uppercase text-xs font-bold tracking-widest"
                            >
                                Close
                            </button>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

        </div>
    );
}
