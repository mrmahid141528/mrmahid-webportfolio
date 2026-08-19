"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { audioEngine } from "./AudioEngine";

interface MorseKeyProps {
    onSignal: (signal: "." | "-") => void;
    onPressStart: () => void;
    onPressEnd: () => void;
    isSoundEnabled: boolean;
    isAwake: boolean;
    setIsAwake: (awake: boolean) => void;
}

const DOT_THRESHOLD = 299; // ms

export default function MorseKey({ onSignal, onPressStart, onPressEnd, isSoundEnabled, isAwake, setIsAwake }: MorseKeyProps) {
    const [isPressed, setIsPressed] = useState(false);
    const pressStartTime = useRef<number>(0);

    const handlePressStart = useCallback(() => {
        if (isPressed) return;
        setIsPressed(true);

        // Only track press time if the system is already awake
        if (isAwake) {
            pressStartTime.current = Date.now();
            onPressStart();
        }

        if (isSoundEnabled) {
            audioEngine.init();
            audioEngine.startTone();
        }
    }, [isPressed, isAwake, onPressStart, isSoundEnabled]);

    const handlePressEnd = useCallback(() => {
        if (!isPressed) return;
        setIsPressed(false);

        if (isSoundEnabled) {
            audioEngine.stopTone();
        }

        if (!isAwake) {
            // First press is purely an audio initialization / test beep
            setIsAwake(true);
            return;
        }

        onPressEnd();
        const duration = Date.now() - pressStartTime.current;
        if (duration > 0) {
            onSignal(duration <= DOT_THRESHOLD ? "." : "-");
        }
    }, [isPressed, isAwake, onPressEnd, isSoundEnabled, onSignal, setIsAwake]);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.code === "Space" && !e.repeat) {
                e.preventDefault();
                handlePressStart();
            }
        };
        const handleKeyUp = (e: KeyboardEvent) => {
            if (e.code === "Space") {
                e.preventDefault();
                handlePressEnd();
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        window.addEventListener("keyup", handleKeyUp);

        return () => {
            window.removeEventListener("keydown", handleKeyDown);
            window.removeEventListener("keyup", handleKeyUp);
        };
    }, [handlePressStart, handlePressEnd]);

    return (
        <div className="flex flex-col items-center w-full max-w-lg select-none touch-none transition-colors">

            {/* Container simulating a metallic recess inset */}
            <div
                className={`relative w-full h-[80px] md:h-[100px] lg:h-[120px] dark:bg-[#0c0c0c] bg-gray-100 rounded-[20px] md:rounded-[30px] lg:rounded-[40px] border dark:border-[#1a1a1a] border-gray-300 flex items-center justify-center cursor-pointer group transition-all ${isPressed ? 'dark:shadow-[inset_0_15px_30px_rgba(0,0,0,0.9),_0_0_40px_rgba(30,255,0,0.15),_0_2px_5px_rgba(255,255,255,0.05)] shadow-[inset_0_5px_15px_rgba(0,0,0,0.2),_0_0_40px_rgba(16,185,129,0.3)]' : 'dark:shadow-[inset_0_15px_30px_rgba(0,0,0,0.9),_0_2px_5px_rgba(255,255,255,0.05)] shadow-[inset_0_5px_15px_rgba(0,0,0,0.2),_0_2px_5px_rgba(0,0,0,0.05)]'}`}
                onPointerDown={(e) => {
                    e.preventDefault();
                    handlePressStart();
                }}
                onPointerUp={(e) => {
                    e.preventDefault();
                    handlePressEnd();
                }}
                onTouchStart={(e) => {
                    // Touch events fire faster on iOS than pointer events
                    // Default action (scroll/click) is handled via CSS touch-none, but we guarantee it here
                    handlePressStart();
                }}
                onTouchEnd={(e) => {
                    e.preventDefault();
                    handlePressEnd();
                }}
                onPointerLeave={handlePressEnd}
                onTouchCancel={handlePressEnd}
                onPointerCancel={handlePressEnd}
                onContextMenu={(e) => e.preventDefault()}
            >
                {/* Glow underneath the lever */}
                <div className={`absolute bottom-4 left-1/2 -translate-x-1/2 w-[70%] h-[20px] dark:bg-[#1eff00] bg-emerald-500 blur-[25px] transition-opacity duration-150 ${isPressed ? 'opacity-80' : 'opacity-0 glow-hover'}`} />
                <style jsx>{`
          .glow-hover { opacity: 0; }
          .group:hover .glow-hover { opacity: 0.15; }
        `}</style>

                {/* The 3D Lever Apparatus */}
                <div className="relative w-full h-full flex items-center">

                    {/* Left Screw Mount */}
                    <div className="absolute left-[15%] w-8 h-8 rounded-full dark:bg-gradient-to-br dark:from-[#2a2a2a] dark:to-[#0a0a0a] bg-gray-200 dark:shadow-[0_5px_10px_rgba(0,0,0,0.5),_inset_0_1px_1px_rgba(255,255,255,0.1)] shadow-sm border dark:border-[#1a1a1a] border-gray-300 flex justify-center items-center transition-colors">
                        <div className="w-4 h-4 rounded-full dark:bg-[#111] bg-gray-400 dark:shadow-[inset_0_2px_5px_rgba(0,0,0,0.8)] shadow-inner border dark:border-[#222] border-gray-400 transition-colors">
                            <div className="w-full h-px dark:bg-black bg-gray-600 mt-2 rotate-45 transition-colors" />
                        </div>
                    </div>

                    {/* Vertical pivot standing up from the inset floor (optical illusion using gradients) */}
                    <div className="absolute left-[25%] top-[50%] -translate-y-1/2 w-6 h-12 bg-gradient-to-r dark:from-[#444] dark:via-[#777] dark:to-[#222] from-gray-400 via-gray-200 to-gray-500 rounded-md dark:shadow-[0_10px_20px_rgba(0,0,0,0.8)] shadow-lg border dark:border-[#222] border-gray-400 transition-colors">
                        {/* Pivot shadow */}
                        <div className="w-full h-full bg-gradient-to-t dark:from-black/80 from-gray-900/40 to-transparent rounded-md transition-colors" />
                    </div>

                    {/* Main Horizontal Metallic Lever Bar */}
                    <div
                        className="absolute left-[27%] right-[25%] h-8 bg-gradient-to-b from-[#b3b3b3] via-[#e6e6e6] to-[#737373] dark:shadow-[0_10px_15px_rgba(0,0,0,0.8),_inset_0_2px_1px_rgba(255,255,255,0.9)] shadow-lg border-b dark:border-[#333] border-gray-400 transition-transform duration-[60ms] ease-out origin-left rounded-l-md rounded-r-3xl"
                        style={{ transform: isPressed ? 'perspective(500px) rotateX(-8deg) translateY(4px)' : 'perspective(500px) rotateX(0deg) translateY(0px)' }}
                    >
                        {/* Surface texture / Reflection highlight */}
                        <div className="absolute top-0 w-full h-[2px] bg-white/70 rounded-full" />
                        <div className="absolute bottom-0 w-full h-[4px] bg-gradient-to-r from-transparent dark:via-[#444] via-gray-400 to-transparent mix-blend-multiply transition-colors" />

                        {/* The Black Knob at the end of the lever */}
                        <div className="absolute -right-6 top-1/2 -translate-y-1/2 w-16 h-16 rounded-full dark:bg-gradient-to-br dark:from-[#333] dark:to-[#050505] bg-gradient-to-br from-gray-300 to-gray-50 dark:shadow-[0_10px_20px_rgba(0,0,0,0.9),_inset_-2px_-5px_15px_rgba(0,0,0,1),_inset_2px_5px_5px_rgba(255,255,255,0.1)] shadow-xl border dark:border-[#1a1a1a] border-gray-300 z-10 flex items-center justify-center transition-colors">
                            <div className="w-10 h-10 rounded-full dark:bg-gradient-to-br dark:from-[#111] dark:to-[#222] bg-gradient-to-br from-gray-100 to-gray-300 dark:shadow-[inset_0_2px_5px_rgba(0,0,0,0.8)] shadow-inner transition-colors" />
                        </div>
                    </div>

                    {/* Instruction Text Below the lever inside the recess */}
                    <p className={`absolute bottom-3 w-full text-center text-[9px] sm:text-[10px] lg:text-xs font-mono font-bold tracking-[0.2em] transition-colors duration-300 uppercase hidden sm:block ${isPressed ? 'dark:text-[#1eff00] text-emerald-600' : 'dark:text-[#666] text-gray-500'}`} style={isPressed ? { textShadow: '0 0 10px rgba(16, 185, 129, 0.3)' } : {}}>
                        PRESS & HOLD TO TRANSMIT
                    </p>
                </div>
            </div>

        </div>
    );
}
