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
        <div className="w-full h-full min-h-[calc(100vh-73px)] border-4 border-[#1a1a1a] rounded-[40px] bg-gradient-to-br from-[#121212] via-[#0a0a0a] to-[#050505] p-6 lg:p-10 flex flex-col font-mono relative shadow-[0_0_50px_rgba(0,0,0,0.8),_inset_0_2px_10px_rgba(255,255,255,0.05)]">

            {/* Structural screws */}
            <div className="absolute top-6 left-6 w-4 h-4 rounded-full bg-[#111] border border-[#222] shadow-[inset_0_2px_5px_rgba(0,0,0,0.8)] flex items-center justify-center"><div className="w-full h-px bg-black rotate-45" /></div>
            <div className="absolute top-6 right-6 w-4 h-4 rounded-full bg-[#111] border border-[#222] shadow-[inset_0_2px_5px_rgba(0,0,0,0.8)] flex items-center justify-center"><div className="w-full h-px bg-black -rotate-12" /></div>

            {/* Header */}
            <header className="flex justify-between items-center mb-8 pl-8 pr-8">
                <div>
                    <h1 className="text-2xl font-bold tracking-[0.3em] text-[#cccccc] uppercase">
                        MORSE <span className="text-[#1eff00]" style={{ textShadow: "0 0 10px rgba(30, 255, 0, 0.4)" }}>CODE</span>
                    </h1>
                    <p className="text-[10px] uppercase tracking-[0.4em] text-[#666] mt-1">PRACTICE PAD</p>
                </div>
                <div className="flex space-x-4">
                    <button
                        onClick={() => setIsSoundEnabled(!isSoundEnabled)}
                        className={`flex items-center space-x-2 px-4 py-2 rounded-lg border border-[#222] shadow-[0_5px_10px_rgba(0,0,0,0.5),_inset_0_1px_1px_rgba(255,255,255,0.1)] transition-all active:scale-95 ${isSoundEnabled ? 'bg-gradient-to-b from-[#222] to-[#111] text-[#1eff00]' : 'bg-gradient-to-b from-[#1a1a1a] to-[#0a0a0a] text-gray-600'}`}
                    >
                        {isSoundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
                        <span className="text-[10px] font-bold tracking-widest">SOUND</span>
                    </button>
                    <button
                        onClick={() => setShowHelp(true)}
                        className="flex items-center space-x-2 px-4 py-2 rounded-lg border border-[#222] bg-gradient-to-b from-[#1a1a1a] to-[#0a0a0a] text-[#888] hover:text-white shadow-[0_5px_10px_rgba(0,0,0,0.5),_inset_0_1px_1px_rgba(255,255,255,0.1)] transition-all active:scale-95"
                    >
                        <HelpCircle className="w-4 h-4" />
                        <span className="text-[10px] font-bold tracking-widest">HELP</span>
                    </button>
                </div>
            </header>

            {/* Main Grid Setup */}
            <div className="flex-1 grid grid-cols-1 lg:grid-cols-[1fr_350px] gap-8 px-2 lg:px-8">

                {/* Left Side: Morse Tree */}
                <div className="hidden lg:block order-2 lg:order-1 h-[450px]">
                    <MorseTree currentDecoded={latestDecodedChar} />
                </div>

                {/* Right Side: Displays & Outputs */}
                <div className="flex flex-col order-1 lg:order-2 self-start w-full space-y-5">

                    <SignalDisplay currentSignal={currentSignal} />

                    {/* OUTPUT DISPLAY */}
                    <div className="bg-[#121212] rounded-[20px] shadow-[inset_0_4px_15px_rgba(0,0,0,0.8),_0_5px_15px_rgba(0,0,0,0.5)] border-t border-[#222] border-l border-r border-[#1a1a1a] p-5 relative overflow-hidden flex-1 flex flex-col justify-center items-center h-[120px]">
                        <h3 className="absolute top-4 left-5 text-[10px] font-mono font-bold uppercase tracking-[0.2em] text-[#888]">Output</h3>
                        <div className="text-5xl font-mono font-bold text-[#1eff00] tracking-[0.2em] break-all self-center mt-2" style={{ textShadow: "0 0 15px rgba(30, 255, 0, 0.6)" }}>
                            {decodedOutput || <span className="text-white/5 uppercase">SOS</span>}
                        </div>
                    </div>

                    {/* SEQUENCE DISPLAY */}
                    <div className="bg-[#121212] rounded-[20px] shadow-[inset_0_4px_15px_rgba(0,0,0,0.8),_0_5px_15px_rgba(0,0,0,0.5)] border-t border-[#222] border-l border-r border-[#1a1a1a] p-5 relative overflow-hidden h-[100px]">
                        <h3 className="text-[10px] font-mono font-bold uppercase tracking-[0.2em] text-[#888] mb-2">Morse Code</h3>
                        <div className="text-xl text-[#1eff00] font-bold tracking-[0.3em] font-mono break-all opacity-90" style={{ textShadow: "0 0 10px rgba(30, 255, 0, 0.4)" }}>
                            {completedMorse || <span className="text-white/5">... --- ...</span>}
                        </div>
                    </div>

                    {/* STATUS PANEL */}
                    <div className="bg-[#121212] rounded-[20px] shadow-[inset_0_4px_15px_rgba(0,0,0,0.8),_0_5px_15px_rgba(0,0,0,0.5)] border-t border-[#222] border-l border-r border-[#1a1a1a] p-5 flex items-center justify-between">
                        <div>
                            <h3 className="text-[10px] font-mono font-bold uppercase tracking-[0.2em] text-[#888] mb-1">Status</h3>
                            <span className={`text-[11px] font-bold tracking-widest uppercase ${status === 'TRANSMITTING' ? 'text-[#1eff00]' : 'text-[#555]'}`}>
                                {status === 'TRANSMITTING' ? 'Transmitting' : 'Practicing'}
                            </span>
                        </div>
                        <div className="flex space-x-1 opacity-50">
                            {/* Visual Waveform decorative */}
                            {[1, 2, 3, 4, 5, 4, 3, 2, 1].map((h, i) => (
                                <div key={i} className={`w-1 rounded-full ${status === 'TRANSMITTING' ? 'bg-[#1eff00] animate-pulse' : 'bg-[#444]'}`} style={{ height: `${h * 4}px` }} />
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Area: Controls Panel */}
            <div className="mt-8 mx-auto w-full max-w-4xl bg-[#111] rounded-[30px] shadow-[0_5px_20px_rgba(0,0,0,0.5),_inset_0_1px_2px_rgba(255,255,255,0.05)] border border-[#1a1a1a] p-6 flex flex-col md:flex-row items-center justify-between relative">

                {/* Beep Side Toggle */}
                <div className="hidden md:flex flex-col items-center justify-center w-[120px] h-[100px] bg-[#0c0c0c] rounded-2xl shadow-[inset_0_5px_15px_rgba(0,0,0,0.8)] border border-[#1a1a1a] cursor-pointer group" onClick={() => setIsSoundEnabled(!isSoundEnabled)}>
                    <div className={`w-16 h-12 rounded-xl flex items-center justify-center shadow-[0_5px_10px_rgba(0,0,0,0.5),_inset_0_1px_1px_rgba(255,255,255,0.1)] border border-[#222] transition-colors ${isSoundEnabled ? 'bg-gradient-to-b from-[#222] to-[#111]' : 'bg-gradient-to-b from-[#1a1a1a] to-[#0a0a0a]'}`}>
                        {isSoundEnabled ? <Volume2 className="w-5 h-5 text-[#1eff00]" /> : <VolumeX className="w-5 h-5 text-[#555]" />}
                    </div>
                    <span className={`text-[9px] font-bold mt-3 tracking-[0.2em] transition-colors ${isSoundEnabled ? 'text-[#1eff00]' : 'text-[#555]'}`}>BEEP</span>
                </div>

                {/* Center Morse Lever */}
                <div className="w-full flex justify-center flex-1 mx-4">
                    <MorseKey
                        onSignal={handleSignal}
                        onPressStart={handlePressStart}
                        onPressEnd={handlePressEnd}
                        isSoundEnabled={isSoundEnabled}
                    />
                </div>

                {/* Clear Button */}
                <div className="hidden md:flex flex-col items-center justify-center w-[120px] h-[100px] bg-[#0c0c0c] rounded-2xl shadow-[inset_0_5px_15px_rgba(0,0,0,0.8)] border border-[#1a1a1a] cursor-pointer group active:scale-95 transition-all" onClick={handleClear}>
                    <div className="w-auto px-6 h-10 rounded-full flex items-center justify-center space-x-2 bg-gradient-to-b from-[#1a1a1a] to-[#0a0a0a] shadow-[0_5px_10px_rgba(0,0,0,0.5),_inset_0_1px_1px_rgba(255,255,255,0.1)] border border-[#222] group-hover:border-[#444] transition-colors">
                        <RotateCcw className="w-3 h-3 text-[#1eff00]" />
                        <span className="text-[10px] font-bold tracking-[0.2em] text-[#1eff00]">CLEAR</span>
                    </div>
                </div>
            </div>

            <div className="text-center mt-6">
                <p className="text-[9px] tracking-[0.3em] text-[#555] uppercase font-bold">
                    TIP: SHORT = . <span className="mx-2 text-[#1eff00]">•</span> LONG = - <span className="mx-2 text-[#1eff00]">•</span> USE SPACEBAR
                </p>
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
                            className="bg-[#111] border border-[#222] rounded-3xl p-8 max-w-sm w-full shadow-2xl"
                            onClick={e => e.stopPropagation()}
                        >
                            <h2 className="text-lg font-bold tracking-widest text-white mb-6 border-b border-[#222] pb-4">HOW TO PRACTICE</h2>
                            <ul className="space-y-4 text-xs font-mono text-gray-400">
                                <li className="flex justify-between items-center bg-[#0a0a0a] p-3 rounded-lg border border-[#222]"><span className="text-white uppercase tracking-wider">Short Press</span> <span className="text-[#1eff00] font-bold text-lg leading-none" style={{ textShadow: "0 0 10px rgba(30,255,0,0.5)" }}>.</span></li>
                                <li className="flex justify-between items-center bg-[#0a0a0a] p-3 rounded-lg border border-[#222]"><span className="text-white uppercase tracking-wider">Long Press</span> <span className="text-[#1eff00] font-bold text-lg leading-none" style={{ textShadow: "0 0 10px rgba(30,255,0,0.5)" }}>-</span></li>
                            </ul>
                            <div className="mt-8 pt-6 border-t border-[#222] flex flex-col space-y-6">
                                <div>
                                    <p className="text-[10px] uppercase tracking-widest text-[#666] mb-2 font-bold">Desktop</p>
                                    <p className="text-[#aaa] text-xs">Press & hold <kbd className="px-2 py-1 bg-[#222] rounded border border-[#333] font-mono text-[#1eff00]">SPACEBAR</kbd></p>
                                </div>
                                <div>
                                    <p className="text-[10px] uppercase tracking-widest text-[#666] mb-2 font-bold">Mobile</p>
                                    <p className="text-[#aaa] text-xs">Tap & hold the interactive lever on screen.</p>
                                </div>
                            </div>
                            <button
                                onClick={() => setShowHelp(false)}
                                className="w-full mt-8 py-3 bg-[#111] text-[#1eff00] border border-[#222] rounded-xl hover:bg-[#1a1a1a] transition-colors uppercase text-[10px] font-bold tracking-widest shadow-[0_0_15px_rgba(30,255,0,0.1)]"
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
