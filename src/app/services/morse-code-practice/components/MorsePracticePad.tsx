"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { Volume2, VolumeX, RotateCcw, HelpCircle, Copy, Check } from "lucide-react";
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
    const [copiedOutput, setCopiedOutput] = useState(false);
    const [copiedMorse, setCopiedMorse] = useState(false);

    const inactivityTimer = useRef<NodeJS.Timeout | null>(null);

    const handleCopyOutput = () => {
        navigator.clipboard.writeText(decodedOutput || "SOS");
        setCopiedOutput(true);
        setTimeout(() => setCopiedOutput(false), 2000);
    };

    const handleCopyMorse = () => {
        navigator.clipboard.writeText(completedMorse || "... --- ...");
        setCopiedMorse(true);
        setTimeout(() => setCopiedMorse(false), 2000);
    };

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

    const handleClear = useCallback(() => {
        setCurrentSignal("");
        setCompletedMorse("");
        setDecodedOutput("");
        setStatus("READY");
        if (inactivityTimer.current) clearTimeout(inactivityTimer.current);
    }, []);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'c') {
                if (window.getSelection()?.toString().length === 0) {
                    e.preventDefault();
                    handleClear();
                }
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [handleClear]);

    const latestDecodedChar = decodedOutput.length > 0 ? decodedOutput[decodedOutput.length - 1] : "";

    return (
        <div className="w-full h-full border-0 md:border-4 dark:border-[#1a1a1a] border-gray-200 rounded-none md:rounded-[30px] lg:rounded-[40px] dark:bg-gradient-to-br dark:from-[#121212] dark:via-[#0a0a0a] dark:to-[#050505] bg-white p-2 sm:p-4 lg:p-4 flex flex-col font-mono relative shadow-none md:dark:shadow-[0_0_50px_rgba(0,0,0,0.8),_inset_0_2px_10px_rgba(255,255,255,0.05)] md:shadow-2xl pt-16 md:pt-4 overflow-hidden transition-colors">

            {/* Structural screws (desktop only) */}
            <div className="hidden md:flex absolute top-4 left-4 w-3 h-3 rounded-full dark:bg-[#111] bg-gray-300 border dark:border-[#222] border-gray-400 dark:shadow-[inset_0_2px_5px_rgba(0,0,0,0.8)] shadow-inner items-center justify-center transition-colors"><div className="w-full h-px dark:bg-black bg-gray-500 rotate-45" /></div>
            <div className="hidden md:flex absolute top-4 right-4 w-3 h-3 rounded-full dark:bg-[#111] bg-gray-300 border dark:border-[#222] border-gray-400 dark:shadow-[inset_0_2px_5px_rgba(0,0,0,0.8)] shadow-inner items-center justify-center transition-colors"><div className="w-full h-px dark:bg-black bg-gray-500 -rotate-12" /></div>

            {/* Header */}
            <header className="flex justify-between items-center mb-2 md:mb-3 pl-2 pr-2 md:px-4 flex-shrink-0">
                <div className="shrink-0">
                    <h1 className="text-xl md:text-2xl font-bold tracking-[0.2em] md:tracking-[0.3em] dark:text-[#cccccc] text-gray-800 uppercase leading-tight transition-colors">
                        MORSE <span className="dark:text-[#1eff00] text-emerald-600" style={{ textShadow: "0 0 10px rgba(30, 255, 0, 0.4)" }}>CODE</span>
                    </h1>
                    <p className="text-[8px] md:text-[10px] uppercase tracking-[0.2em] md:tracking-[0.4em] dark:text-[#666] text-gray-500 mt-0.5 transition-colors">PRACTICE PAD</p>
                </div>

                <div className="flex-1 flex justify-center px-2 md:px-4 z-10 w-full overflow-hidden">
                    <AnimatePresence>
                        {!isAwake && (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                className="flex items-center justify-center animate-pulse"
                            >
                                <div className="w-1.5 h-1.5 md:w-2.5 md:h-2.5 rounded-full dark:bg-[#1eff00] bg-emerald-500 mr-2 md:mr-3 shrink-0" style={{ boxShadow: "0 0 10px #1eff00" }} />
                                <h2 className="text-xs sm:text-sm md:text-lg lg:text-xl font-bold tracking-widest dark:text-[#1eff00] text-emerald-600 uppercase leading-tight text-center" style={{ textShadow: "0 0 15px rgba(30,255,0,0.6)" }}>
                                    <span className="hidden lg:inline">PRESS SPACE OR TAP TO START</span>
                                    <span className="hidden sm:inline lg:hidden">TAP / SPACE TO START</span>
                                    <span className="sm:hidden">TAP TO START</span>
                                </h2>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                <div className="flex space-x-2 md:space-x-4 shrink-0">
                    <button
                        onClick={() => setIsSoundEnabled(!isSoundEnabled)}
                        className={`flex items-center space-x-1 md:space-x-2 px-2 md:px-4 py-1.5 md:py-2 rounded-lg border dark:border-[#222] border-gray-200 dark:shadow-[0_5px_10px_rgba(0,0,0,0.5),_inset_0_1px_1px_rgba(255,255,255,0.1)] shadow-sm transition-all active:scale-95 ${isSoundEnabled ? 'dark:bg-gradient-to-b dark:from-[#222] dark:to-[#111] bg-gray-100 dark:text-[#1eff00] text-emerald-600' : 'dark:bg-gradient-to-b dark:from-[#1a1a1a] dark:to-[#0a0a0a] bg-white text-gray-400'}`}
                    >
                        {isSoundEnabled ? <Volume2 className="w-3.5 h-3.5 md:w-4 md:h-4" /> : <VolumeX className="w-3.5 h-3.5 md:w-4 md:h-4" />}
                        <span className="hidden sm:inline text-[10px] font-bold tracking-widest">SOUND</span>
                    </button>
                    <button
                        onClick={() => setShowHelp(true)}
                        className="flex items-center space-x-1 md:space-x-2 px-2 md:px-4 py-1.5 md:py-2 rounded-lg border dark:border-[#222] border-gray-200 dark:bg-gradient-to-b dark:from-[#1a1a1a] dark:to-[#0a0a0a] bg-white dark:text-[#888] text-gray-500 dark:hover:text-white hover:text-gray-900 dark:shadow-[0_5px_10px_rgba(0,0,0,0.5),_inset_0_1px_1px_rgba(255,255,255,0.1)] shadow-sm transition-all active:scale-95"
                    >
                        <HelpCircle className="w-3.5 h-3.5 md:w-4 md:h-4" />
                        <span className="hidden sm:inline text-[10px] font-bold tracking-widest">HELP</span>
                    </button>
                </div>
            </header>

            {/* Main Layout Area */}
            <div className="flex-1 w-full flex flex-col lg:grid lg:grid-cols-[1fr_320px] xl:grid-cols-[1fr_350px] gap-2 md:gap-4 lg:gap-4 px-0 lg:px-2 xl:px-4 min-h-0 overflow-hidden pb-0 lg:pb-1">

                {/* Left/Top Area: Morse Tree */}
                <div className="order-1 lg:order-1 min-h-[220px] lg:min-h-0 flex-1 lg:h-full w-full relative">
                    <MorseTree currentDecoded={latestDecodedChar} />
                </div>

                {/* Right/Middle Area: Displays */}
                <div className="order-2 lg:order-2 flex flex-col w-full space-y-2 lg:space-y-3 shrink-0 lg:shrink lg:h-full overflow-hidden">

                    <div className="hidden lg:block shrink-0">
                        <SignalDisplay currentSignal={currentSignal} />
                    </div>

                    {/* Mobile combined row for Output and Morse Code */}
                    <div className="flex flex-row lg:flex-col gap-2 lg:gap-3 shrink-0 lg:flex-1 overflow-hidden lg:h-full">
                        {/* OUTPUT DISPLAY */}
                        <div className="dark:bg-[#121212] bg-gray-50 rounded-[16px] md:rounded-[20px] dark:shadow-[inset_0_4px_15px_rgba(0,0,0,0.8),_0_5px_15px_rgba(0,0,0,0.5)] shadow-inner border-t dark:border-[#222] border-gray-200 border-l border-r dark:border-[#1a1a1a] p-3 md:p-4 lg:p-5 relative overflow-hidden flex-[1] lg:flex-[1.5] xl:flex-[2] flex flex-col h-[75px] sm:h-[90px] lg:h-auto lg:min-h-[80px] transition-colors">
                            <div className="flex justify-between items-center dark:bg-[#121212] bg-gray-50 z-10 w-full mb-1 lg:mb-2 shrink-0 transition-colors">
                                <h3 className="text-[8px] md:text-[10px] font-mono font-bold uppercase tracking-[0.2em] dark:text-[#888] text-gray-500">Output</h3>
                                <button onClick={handleCopyOutput} className="dark:text-[#555] text-gray-400 dark:hover:text-[#1eff00] hover:text-emerald-500 transition-colors" title="Copy Output">
                                    {copiedOutput ? <Check className="w-3 h-3 md:w-3.5 md:h-3.5 dark:text-[#1eff00] text-emerald-600" /> : <Copy className="w-3 h-3 md:w-3.5 md:h-3.5" />}
                                </button>
                            </div>
                            <div className="w-full flex-1 overflow-y-auto overflow-x-hidden flex items-start">
                                <div className="text-xl sm:text-3xl lg:text-5xl font-mono font-bold dark:text-[#1eff00] text-emerald-600 tracking-[0.2em] break-words text-left w-full leading-tight" style={{ textShadow: "0 0 15px rgba(30, 255, 0, 0.6)" }}>
                                    {decodedOutput || <span className="dark:text-white/5 text-black/10 uppercase">SOS</span>}
                                    {status !== 'READY' && <span className="inline-block w-2 md:w-3 lg:w-4 h-4 sm:h-5 lg:h-8 dark:bg-[#1eff00] bg-emerald-500 animate-pulse ml-1 align-baseline translate-y-1 lg:translate-y-0" style={{ boxShadow: "0 0 10px #1eff00" }} />}
                                </div>
                            </div>
                        </div>

                        {/* SEQUENCE DISPLAY */}
                        <div className="dark:bg-[#121212] bg-gray-50 rounded-[16px] md:rounded-[20px] dark:shadow-[inset_0_4px_15px_rgba(0,0,0,0.8),_0_5px_15px_rgba(0,0,0,0.5)] shadow-inner border-t dark:border-[#222] border-gray-200 border-l border-r dark:border-[#1a1a1a] p-3 md:p-4 lg:p-5 relative overflow-hidden flex-[0.8] lg:flex-[1] xl:flex-[1.5] flex flex-col h-[75px] sm:h-[90px] lg:h-auto lg:min-h-[60px] transition-colors">
                            <div className="flex justify-between items-center dark:bg-[#121212] bg-gray-50 z-10 w-full mb-1 lg:mb-2 shrink-0 transition-colors">
                                <h3 className="text-[8px] md:text-[10px] font-mono font-bold uppercase tracking-[0.2em] dark:text-[#888] text-gray-500">Morse Sequence</h3>
                                <button onClick={handleCopyMorse} className="dark:text-[#555] text-gray-400 dark:hover:text-[#1eff00] hover:text-emerald-500 transition-colors" title="Copy Sequence">
                                    {copiedMorse ? <Check className="w-3 h-3 md:w-3.5 md:h-3.5 dark:text-[#1eff00] text-emerald-600" /> : <Copy className="w-3 h-3 md:w-3.5 md:h-3.5" />}
                                </button>
                            </div>
                            <div className="flex-1 w-full overflow-y-auto overflow-x-hidden shrink flex items-start">
                                <div className="text-xs sm:text-sm md:text-xl dark:text-[#1eff00] text-emerald-600 font-bold tracking-[0.2em] md:tracking-[0.3em] font-mono break-words opacity-90 w-full pl-1 leading-snug" style={{ textShadow: "0 0 10px rgba(30, 255, 0, 0.4)" }}>
                                    {completedMorse || <span className="dark:text-white/5 text-black/10">... --- ...</span>}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* STATUS PANEL */}
                    <div className="hidden sm:flex dark:bg-[#121212] bg-gray-50 rounded-[16px] md:rounded-[20px] dark:shadow-[inset_0_4px_15px_rgba(0,0,0,0.8),_0_5px_15px_rgba(0,0,0,0.5)] shadow-inner border-t dark:border-[#222] border-gray-200 border-l border-r dark:border-[#1a1a1a] p-2 lg:p-3 items-center justify-between mt-auto shrink-0 transition-colors">
                        <div>
                            <h3 className="text-[9px] md:text-[10px] font-mono font-bold uppercase tracking-[0.2em] dark:text-[#888] text-gray-500 mb-1 transition-colors">Status</h3>
                            <span className={`text-[10px] md:text-[11px] font-bold tracking-widest uppercase transition-colors ${status === 'TRANSMITTING' ? 'dark:text-[#1eff00] text-emerald-600' : 'dark:text-[#555] text-gray-400'}`}>
                                {status === 'TRANSMITTING' ? 'Transmitting' : 'Practicing'}
                            </span>
                        </div>
                        <div className="flex space-x-1 opacity-50">
                            {[1, 2, 3, 4, 5, 4, 3, 2, 1].map((h, i) => (
                                <div key={i} className={`w-1 rounded-full transition-colors ${status === 'TRANSMITTING' ? 'dark:bg-[#1eff00] bg-emerald-500 animate-pulse' : 'dark:bg-[#444] bg-gray-300'}`} style={{ height: `${h * 4}px` }} />
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Area: Controls Panel */}
            <div className="mt-2 md:mt-3 mx-0 md:mx-auto w-full max-w-4xl dark:bg-[#111] bg-white rounded-[20px] md:rounded-[30px] dark:shadow-[0_5px_20px_rgba(0,0,0,0.5),_inset_0_1px_2px_rgba(255,255,255,0.05)] shadow-xl border dark:border-[#1a1a1a] border-gray-200 p-2 flex flex-row items-center justify-between relative shrink-0 transition-colors">

                {/* Beep Side Toggle (Always visible now) */}
                <div className="flex flex-col items-center justify-center w-[50px] sm:w-[80px] lg:w-[100px] xl:w-[120px] h-[60px] sm:h-[80px] lg:h-[80px] xl:h-[90px] dark:bg-[#0c0c0c] bg-gray-50 rounded-xl lg:rounded-2xl dark:shadow-[inset_0_5px_15px_rgba(0,0,0,0.8)] shadow-inner border dark:border-[#1a1a1a] border-gray-200 cursor-pointer group shrink-0 transition-colors" onClick={() => setIsSoundEnabled(!isSoundEnabled)}>
                    <div className={`w-10 sm:w-12 lg:w-16 h-8 sm:h-10 lg:h-12 rounded-lg lg:rounded-xl flex items-center justify-center dark:shadow-[0_5px_10px_rgba(0,0,0,0.5),_inset_0_1px_1px_rgba(255,255,255,0.1)] shadow-sm border dark:border-[#222] border-gray-300 transition-colors ${isSoundEnabled ? 'dark:bg-gradient-to-b dark:from-[#222] dark:to-[#111] bg-gray-200' : 'dark:bg-gradient-to-b dark:from-[#1a1a1a] dark:to-[#0a0a0a] bg-white'}`}>
                        {isSoundEnabled ? <Volume2 className="w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5 dark:text-[#1eff00] text-emerald-600" /> : <VolumeX className="w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5 dark:text-[#555] text-gray-400" />}
                    </div>
                    <span className={`text-[7px] sm:text-[8px] lg:text-[9px] font-bold mt-1.5 lg:mt-3 tracking-[0.2em] transition-colors ${isSoundEnabled ? 'dark:text-[#1eff00] text-emerald-600' : 'dark:text-[#555] text-gray-400'}`}>BEEP</span>
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
                <div className="flex flex-col items-center justify-center w-[50px] sm:w-[80px] lg:w-[120px] h-[60px] sm:h-[80px] lg:h-[80px] dark:bg-[#0c0c0c] bg-gray-50 rounded-xl lg:rounded-2xl dark:shadow-[inset_0_5px_15px_rgba(0,0,0,0.8)] shadow-inner border dark:border-[#1a1a1a] border-gray-200 cursor-pointer group active:scale-95 transition-all shrink-0" onClick={handleClear}>
                    <div className="w-10 sm:w-14 lg:w-auto lg:px-6 h-8 sm:h-10 rounded-lg lg:rounded-full flex items-center justify-center space-x-0 lg:space-x-2 dark:bg-gradient-to-b dark:from-[#1a1a1a] dark:to-[#0a0a0a] bg-white dark:shadow-[0_5px_10px_rgba(0,0,0,0.5),_inset_0_1px_1px_rgba(255,255,255,0.1)] shadow-sm border dark:border-[#222] dark:group-hover:border-[#444] border-gray-300 hover:bg-gray-100 transition-colors">
                        <RotateCcw className="w-3 h-3 lg:w-3 lg:h-3 dark:text-[#1eff00] text-emerald-600" />
                        <span className="hidden lg:inline text-[10px] font-bold tracking-[0.2em] dark:text-[#1eff00] text-emerald-600">CLEAR</span>
                    </div>
                    <span className="lg:hidden text-[7px] sm:text-[8px] font-bold mt-1.5 tracking-[0.1em] dark:text-[#1eff00] text-emerald-600">CLR</span>
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
