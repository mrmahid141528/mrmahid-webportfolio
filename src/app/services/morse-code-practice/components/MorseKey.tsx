"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { audioEngine } from "./AudioEngine";

interface MorseKeyProps {
    onSignal: (signal: "." | "-") => void;
    onPressStart: () => void;
    onPressEnd: () => void;
    isSoundEnabled: boolean;
}

const DOT_THRESHOLD = 299; // ms

export default function MorseKey({ onSignal, onPressStart, onPressEnd, isSoundEnabled }: MorseKeyProps) {
    const [isPressed, setIsPressed] = useState(false);
    const pressStartTime = useRef<number>(0);

    const handlePressStart = useCallback(() => {
        if (isPressed) return;
        setIsPressed(true);
        pressStartTime.current = Date.now();
        onPressStart();

        if (isSoundEnabled) {
            audioEngine.init();
            audioEngine.startTone();
        }
    }, [isPressed, onPressStart, isSoundEnabled]);

    const handlePressEnd = useCallback(() => {
        if (!isPressed) return;
        setIsPressed(false);
        onPressEnd();

        if (isSoundEnabled) {
            audioEngine.stopTone();
        }

        const duration = Date.now() - pressStartTime.current;
        if (duration > 0) {
            onSignal(duration <= DOT_THRESHOLD ? "." : "-");
        }
    }, [isPressed, onPressEnd, isSoundEnabled, onSignal]);

    // Spacebar handling
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
        <div className="flex flex-col items-center select-none touch-none">
            <div
                className="relative w-64 h-32 bg-[#1a1a1a] rounded-3xl border border-white/10 shadow-inner flex items-center justify-center cursor-pointer group"
                onPointerDown={(e) => {
                    e.preventDefault(); // Prevent touch scroll
                    handlePressStart();
                }}
                onPointerUp={(e) => {
                    e.preventDefault();
                    handlePressEnd();
                }}
                onPointerLeave={handlePressEnd}
                onPointerCancel={handlePressEnd}
                onContextMenu={(e) => e.preventDefault()}
            >
                {/* Glow behind the key when idle/hover/pressed */}
                <div className={`absolute inset-0 rounded-3xl transition-opacity duration-300 ${isPressed ? 'opacity-100 bg-primary/20 shadow-[0_0_50px_rgba(59,130,246,0.3)]' : 'opacity-0 group-hover:opacity-50 bg-primary/5'}`} />

                {/* Physical Key Base */}
                <div className="w-48 h-16 bg-gradient-to-b from-[#2a2a2a] to-[#111] rounded-xl flex items-center justify-center shadow-lg relative border border-white/5">
                    {/* Key Knob (Moving Part) */}
                    <div
                        className={`w-32 h-10 bg-gradient-to-b from-[#333] to-[#222] rounded-lg border border-t-white/10 border-b-black/50 shadow-md flex items-center justify-center transition-all duration-75 ${isPressed ? 'translate-y-2 shadow-none border-primary/50 bg-[#252525]' : 'translate-y-0'}`}
                    >
                        {/* Metal Grip Detail */}
                        <div className="w-20 h-2 flex justify-between">
                            {[...Array(6)].map((_, i) => (
                                <div key={i} className="w-1 h-full bg-black/30 rounded-full" />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            <p className="mt-4 text-xs font-semibold tracking-widest text-[#555] uppercase">
                {isPressed ? (
                    <span className="text-primary animate-pulse transition-colors">Transmitting...</span>
                ) : (
                    "Press & Hold to Transmit"
                )}
            </p>
        </div>
    );
}
