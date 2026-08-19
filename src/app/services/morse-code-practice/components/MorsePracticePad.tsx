"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { Volume2, VolumeX, RotateCcw, HelpCircle } from "lucide-react";
import MorseKey from "./MorseKey";
import SignalDisplay from "./SignalDisplay";
import MorseTree from "./MorseTree";
import { decodeMorse } from "./MorseDecoder";
import { AnimatePresence, motion } from "framer-motion";

const INACTIVITY_TIMEOUT = 700;

export default function MorsePracticePad() {
    const [isSoundEnabled, setIsSoundEnabled] = useState(true);
    const [currentSignal, setCurrentSignal] = useState("");
    const [completedMorse, setCompletedMorse] = useState("");
    const [decodedOutput, setDecodedOutput] = useState("");
    const [showHelp, setShowHelp] = useState(false);
    const [status, setStatus] = useState<"READY" | "TRANSMITTING" | "DECODING">("READY");
    const [isAwake, setIsAwake] = useState(false);

    const inactivityTimer = useRef<NodeJS.Timeout | null>(null);

    const handleSignal = useCallback((signal: "." | "-") => {
        setCurrentSignal(prev => {
            const updated = prev + signal;
            if (inactivityTimer.current) clearTimeout(inactivityTimer.current);
            inactivityTimer.current = setTimeout(() => {
                finalizeSignal(updated);
            }, INACTIVITY_TIMEOUT);

            return updated;
        });
    }, []);

    const finalizeSignal = (signalSeq: string) => {
        setStatus("DECODING");
        const char = decodeMorse(signalSeq);

        if (char) {
            setDecodedOutput(prev => prev + char);
            setCompletedMorse(prev => prev + (prev ? " " : "") + signalSeq);
        } else {
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

    const latestDecodedChar = decodedOutput.length > 0 ? decodedOutput[decodedOutput.length - 1] : "";

    return (
        <div className="w-full h-[100dvh] md:h-full md:min-h-[calc(100vh-73px)] border-0 md:border-4 border-[#1a1a1a] rounded-none md:rounded-[40px] bg-gradient-to-br from-[#121212] via-[#0a0a0a] to-[#050505] p-2 sm:p-4 lg:p-10 flex flex-col font-mono relative shadow-none md:shadow-[0_0_50px_rgba(0,0,0,0.8),_inset_0_2px_10px_rgba(255,255,255,0.05)] pt-16 md:pt-10 overflow-hidden">

            {/* Structural screws (desktop only) */}
            <div className="hidden md:flex absolute top-6 left-6 w-4 h-4 rounded-full bg-[#111] border border-[#222] shadow-[inset_0_2px_5px_rgba(0,0,0,0.8)] items-center justify-center"><div className="w-full h-px bg-black rotate-45" /></div>
            <div className="hidden md:flex absolute top-6 right-6 w-4 h-4 rounded-full bg-[#111] border border-[#222] shadow-[inset_0_2px_5px_rgba(0,0,0,0.8)] items-center justify-center"><div className="w-full h-px bg-black -rotate-12" /></div>

            {/* Header */}
            <header className="flex justify-between items-center mb-2 md:mb-5 pl-2 pr-2 md:pl-8 md:pr-8 flex-shrink-0">
                <div className="shrink-0">
                    <h1 className="text-xl md:text-2xl font-bold tracking-[0.2em] md:tracking-[0.3em] text-[#cccccc] uppercase leading-tight">
                        MORSE <span className="text-[#1eff00]" style={{ textShadow: "0 0 10px rgba(30, 255, 0, 0.4)" }}>CODE</span>
                    </h1>
                    <p className="text-[8px] md:text-[10px] uppercase tracking-[0.2em] md:tracking-[0.4em] text-[#666] mt-0.5">PRACTICE PAD</p>
                </div>

                <div className="flex-1 flex justify-center px-1 md:px-2 z-10 w-0 overflow-visible">
                    <AnimatePresence>
                        {!isAwake && (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                className="flex items-center justify-center px-2 md:px-4 py-1.5 md:py-2 bg-[#1eff00]/10 border border-[#1eff00]/30 rounded-full shadow-[0_0_15px_rgba(30,255,0,0.1)] whitespace-nowrap min-w-max"
                            >
                                <div className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-[#1eff00] animate-pulse mr-1.5 md:mr-2" style={{ boxShadow: "0 0 8px #1eff00" }} />
                                <span className="text-[8px] sm:text-[9px] md:text-xs font-bold font-mono tracking-[0.1em] md:tracking-widest text-[#1eff00] text-center" style={{ textShadow: "0 0 5px rgba(30,255,0,0.5)" }}>
                                    <span className="hidden sm:inline">PRESS SPACE OR TAP TO WAKE</span>
                                    <span className="sm:hidden">TAP TO WAKE</span>
                                </span>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                <div className="flex space-x-2 md:space-x-4 shrink-0">
                    <button
                        onClick={() => setIsSoundEnabled(!isSoundEnabled)}
                        className={`flex items-center space-x-1 md:space-x-2 px-2 md:px-4 py-1.5 md:py-2 rounded-lg border border-[#222] shadow-[0_5px_10px_rgba(0,0,0,0.5),_inset_0_1px_1px_rgba(255,255,255,0.1)] transition-all active:scale-95 ${isSoundEnabled ? 'bg-gradient-to-b from-[#222] to-[#111] text-[#1eff00]' : 'bg-gradient-to-b from-[#1a1a1a] to-[#0a0a0a] text-gray-600'}`}
                    >
                        {isSoundEnabled ? <Volume2 className="w-3.5 h-3.5 md:w-4 md:h-4" /> : <VolumeX className="w-3.5 h-3.5 md:w-4 md:h-4" />}
                        <span className="hidden sm:inline text-[10px] font-bold tracking-widest">SOUND</span>
                    </button>
                    <button
                        onClick={() => setShowHelp(true)}
                        className="flex items-center space-x-1 md:space-x-2 px-2 md:px-4 py-1.5 md:py-2 rounded-lg border border-[#222] bg-gradient-to-b from-[#1a1a1a] to-[#0a0a0a] text-[#888] hover:text-white shadow-[0_5px_10px_rgba(0,0,0,0.5),_inset_0_1px_1px_rgba(255,255,255,0.1)] transition-all active:scale-95"
                    >
                        <HelpCircle className="w-3.5 h-3.5 md:w-4 md:h-4" />
                        <span className="hidden sm:inline text-[10px] font-bold tracking-widest">HELP</span>
                    </button>
                </div>
            </header>

            {/* Main Layout Area */}
            <div className="flex-1 flex flex-col lg:grid lg:grid-cols-[1fr_350px] gap-2 md:gap-8 px-0 lg:px-8 min-h-0 overflow-hidden pb-4">

                {/* Left/Top Area: Morse Tree */}
                <div className="order-1 lg:order-1 min-h-[160px] h-[30vh] sm:h-[40vh] lg:h-auto max-h-[450px] w-full relative">
                    <MorseTree currentDecoded={latestDecodedChar} />
                </div>

                {/* Right/Middle Area: Displays */}
                <div className="order-2 lg:order-2 flex flex-col w-full space-y-2 lg:space-y-5 h-auto lg:h-full shrink-0">

                    <div className="hidden lg:block">
                        <SignalDisplay currentSignal={currentSignal} />
                    </div>

                    {/* Mobile combined row for Output and Morse Code */}
                    <div className="flex flex-row lg:flex-col gap-2 lg:gap-5">
                        {/* OUTPUT DISPLAY */}
                        <div className="bg-[#121212] rounded-[16px] md:rounded-[20px] shadow-[inset_0_4px_15px_rgba(0,0,0,0.8),_0_5px_15px_rgba(0,0,0,0.5)] border-t border-[#222] border-l border-r border-[#1a1a1a] p-3 md:p-5 relative overflow-hidden flex-1 flex flex-col justify-center items-center h-[60px] sm:h-[80px] lg:h-[120px]">
                            <h3 className="absolute top-2 left-3 md:top-4 md:left-5 text-[8px] md:text-[10px] font-mono font-bold uppercase tracking-[0.2em] text-[#888]">Output</h3>
                            <div className="text-2xl sm:text-3xl lg:text-5xl font-mono font-bold text-[#1eff00] tracking-[0.2em] break-all self-center mt-2 md:mt-4 truncate" style={{ textShadow: "0 0 15px rgba(30, 255, 0, 0.6)" }}>
                                {decodedOutput || <span className="text-white/5 uppercase">SOS</span>}
                            </div>
                        </div>

                        {/* SEQUENCE DISPLAY */}
                        <div className="bg-[#121212] rounded-[16px] md:rounded-[20px] shadow-[inset_0_4px_15px_rgba(0,0,0,0.8),_0_5px_15px_rgba(0,0,0,0.5)] border-t border-[#222] border-l border-r border-[#1a1a1a] p-3 md:p-5 relative overflow-hidden flex-1 h-[60px] sm:h-[80px] lg:h-[100px] flex flex-col justify-end">
                            <h3 className="absolute top-2 left-3 text-[8px] md:text-[10px] font-mono font-bold uppercase tracking-[0.2em] text-[#888] mb-1 md:mb-2">History</h3>
                            <div className="text-sm md:text-xl text-[#1eff00] font-bold tracking-[0.2em] md:tracking-[0.3em] font-mono break-all opacity-90 truncate w-full pl-1" style={{ textShadow: "0 0 10px rgba(30, 255, 0, 0.4)" }}>
                                {completedMorse || <span className="text-white/5">... --- ...</span>}
                            </div>
                        </div>
                    </div>

                    {/* STATUS PANEL */}
                    <div className="hidden sm:flex bg-[#121212] rounded-[20px] shadow-[inset_0_4px_15px_rgba(0,0,0,0.8),_0_5px_15px_rgba(0,0,0,0.5)] border-t border-[#222] border-l border-r border-[#1a1a1a] p-3 lg:p-5 items-center justify-between mt-auto">
                        <div>
                            <h3 className="text-[9px] md:text-[10px] font-mono font-bold uppercase tracking-[0.2em] text-[#888] mb-1">Status</h3>
                            <span className={`text-[10px] md:text-[11px] font-bold tracking-widest uppercase ${status === 'TRANSMITTING' ? 'text-[#1eff00]' : 'text-[#555]'}`}>
                                {status === 'TRANSMITTING' ? 'Transmitting' : 'Practicing'}
                            </span>
                        </div>
                        <div className="flex space-x-1 opacity-50">
                            {[1, 2, 3, 4, 5, 4, 3, 2, 1].map((h, i) => (
                                <div key={i} className={`w-1 rounded-full ${status === 'TRANSMITTING' ? 'bg-[#1eff00] animate-pulse' : 'bg-[#444]'}`} style={{ height: `${h * 4}px` }} />
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Area: Controls Panel */}
            <div className="mt-0 lg:mt-8 mx-0 md:mx-auto w-full max-w-4xl bg-[#111] rounded-[20px] md:rounded-[30px] shadow-[0_5px_20px_rgba(0,0,0,0.5),_inset_0_1px_2px_rgba(255,255,255,0.05)] border border-[#1a1a1a] p-2 sm:p-4 lg:p-6 flex flex-row items-center justify-between relative shrink-0">

                {/* Beep Side Toggle (Always visible now) */}
                <div className="flex flex-col items-center justify-center w-[50px] sm:w-[80px] lg:w-[120px] h-[60px] sm:h-[80px] lg:h-[100px] bg-[#0c0c0c] rounded-xl lg:rounded-2xl shadow-[inset_0_5px_15px_rgba(0,0,0,0.8)] border border-[#1a1a1a] cursor-pointer group shrink-0" onClick={() => setIsSoundEnabled(!isSoundEnabled)}>
                    <div className={`w-10 sm:w-12 lg:w-16 h-8 sm:h-10 lg:h-12 rounded-lg lg:rounded-xl flex items-center justify-center shadow-[0_5px_10px_rgba(0,0,0,0.5),_inset_0_1px_1px_rgba(255,255,255,0.1)] border border-[#222] transition-colors ${isSoundEnabled ? 'bg-gradient-to-b from-[#222] to-[#111]' : 'bg-gradient-to-b from-[#1a1a1a] to-[#0a0a0a]'}`}>
                        {isSoundEnabled ? <Volume2 className="w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5 text-[#1eff00]" /> : <VolumeX className="w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5 text-[#555]" />}
                    </div>
                    <span className={`text-[7px] sm:text-[8px] lg:text-[9px] font-bold mt-1.5 lg:mt-3 tracking-[0.2em] transition-colors ${isSoundEnabled ? 'text-[#1eff00]' : 'text-[#555]'}`}>BEEP</span>
                </div>

                {/* Center Morse Lever */}
                <div className="w-full flex justify-center flex-1 mx-2 sm:mx-4 shrink min-w-0">
                    <MorseKey
                        onSignal={handleSignal}
                        onPressStart={handlePressStart}
                        onPressEnd={handlePressEnd}
                        isSoundEnabled={isSoundEnabled}
                        isAwake={isAwake}
                        setIsAwake={setIsAwake}
                    />
                </div>

                {/* Clear Button (Always visible now) */}
                <div className="flex flex-col items-center justify-center w-[50px] sm:w-[80px] lg:w-[120px] h-[60px] sm:h-[80px] lg:h-[100px] bg-[#0c0c0c] rounded-xl lg:rounded-2xl shadow-[inset_0_5px_15px_rgba(0,0,0,0.8)] border border-[#1a1a1a] cursor-pointer group active:scale-95 transition-all shrink-0" onClick={handleClear}>
                    <div className="w-10 sm:w-14 lg:w-auto lg:px-6 h-8 sm:h-10 rounded-lg lg:rounded-full flex items-center justify-center space-x-0 lg:space-x-2 bg-gradient-to-b from-[#1a1a1a] to-[#0a0a0a] shadow-[0_5px_10px_rgba(0,0,0,0.5),_inset_0_1px_1px_rgba(255,255,255,0.1)] border border-[#222] group-hover:border-[#444] transition-colors">
                        <RotateCcw className="w-3 h-3 lg:w-3 lg:h-3 text-[#1eff00]" />
                        <span className="hidden lg:inline text-[10px] font-bold tracking-[0.2em] text-[#1eff00]">CLEAR</span>
                    </div>
                    <span className="lg:hidden text-[7px] sm:text-[8px] font-bold mt-1.5 tracking-[0.1em] text-[#1eff00]">CLR</span>
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
                            className="bg-[#111] border border-[#222] rounded-3xl p-6 md:p-8 max-w-sm w-full shadow-2xl"
                            onClick={e => e.stopPropagation()}
                        >
                            <h2 className="text-base md:text-lg font-bold tracking-widest text-white mb-4 md:mb-6 border-b border-[#222] pb-3 md:pb-4">HOW TO PRACTICE</h2>
                            <ul className="space-y-3 md:space-y-4 text-[10px] md:text-xs font-mono text-gray-400">
                                <li className="flex justify-between items-center bg-[#0a0a0a] p-2.5 md:p-3 rounded-lg border border-[#222]"><span className="text-white uppercase tracking-wider">Short Press</span> <span className="text-[#1eff00] font-bold text-lg md:text-xl leading-none" style={{ textShadow: "0 0 10px rgba(30,255,0,0.5)" }}>.</span></li>
                                <li className="flex justify-between items-center bg-[#0a0a0a] p-2.5 md:p-3 rounded-lg border border-[#222]"><span className="text-white uppercase tracking-wider">Long Press</span> <span className="text-[#1eff00] font-bold text-lg md:text-xl leading-none" style={{ textShadow: "0 0 10px rgba(30,255,0,0.5)" }}>-</span></li>
                            </ul>
                            <div className="mt-6 md:mt-8 pt-4 md:pt-6 border-t border-[#222] flex flex-col space-y-4 md:space-y-6">
                                <div>
                                    <p className="text-[9px] md:text-[10px] uppercase tracking-widest text-[#666] mb-1.5 md:mb-2 font-bold">Desktop</p>
                                    <p className="text-[#aaa] text-[10px] md:text-xs">Press & hold <kbd className="px-1.5 py-0.5 md:px-2 md:py-1 bg-[#222] rounded border border-[#333] font-mono text-[#1eff00]">SPACEBAR</kbd></p>
                                </div>
                                <div>
                                    <p className="text-[9px] md:text-[10px] uppercase tracking-widest text-[#666] mb-1.5 md:mb-2 font-bold">Mobile</p>
                                    <p className="text-[#aaa] text-[10px] md:text-xs">Tap & hold the interactive lever on screen.</p>
                                </div>
                            </div>
                            <button
                                onClick={() => setShowHelp(false)}
                                className="w-full mt-6 md:mt-8 py-2.5 md:py-3 bg-[#111] text-[#1eff00] border border-[#222] rounded-xl hover:bg-[#1a1a1a] transition-colors uppercase text-[10px] font-bold tracking-widest shadow-[0_0_15px_rgba(30,255,0,0.1)]"
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
