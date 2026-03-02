"use client"

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { Sun, Moon } from 'lucide-react';

export default function ThemeToggle() {
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => setMounted(true), []);

    if (!mounted) return null;

    const isDark = theme === 'dark';

    return (
        <button
            onClick={() => setTheme(isDark ? 'light' : 'dark')}
            aria-label="Toggle theme"
            className="relative w-14 h-7 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 transition-all duration-300 cursor-hover flex items-center px-1 group overflow-hidden"
        >
            {/* Sliding pill */}
            <span
                className={`absolute w-5 h-5 rounded-full transition-all duration-300 flex items-center justify-center shadow-lg ${isDark
                        ? 'left-1 bg-primary/80'
                        : 'left-8 bg-yellow-400'
                    }`}
            />
            {/* Icons */}
            <Moon className={`w-3 h-3 absolute left-1.5 transition-all duration-300 ${isDark ? 'text-white opacity-100' : 'text-white/30 opacity-50'}`} />
            <Sun className={`w-3 h-3 absolute right-1.5 transition-all duration-300 ${!isDark ? 'text-yellow-800 opacity-100' : 'text-white/30 opacity-50'}`} />
        </button>
    );
}
