"use client";

import { motion } from "framer-motion";
import MorsePracticePad from "./components/MorsePracticePad";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function MorseCodePracticePage() {
    return (
        <div className="fixed inset-0 z-[100] flex min-h-[100dvh] w-full dark:bg-[#050505] bg-gray-50 p-0 sm:p-2 lg:p-4 items-center justify-center overflow-hidden transition-colors duration-300">
            <Link
                href="/services"
                className="absolute top-6 left-6 z-[110] px-4 py-2 dark:bg-white/5 bg-black/5 dark:hover:bg-white/10 hover:bg-black/10 border dark:border-white/10 border-black/10 rounded-full dark:text-white/70 text-gray-700 dark:hover:text-white hover:text-black flex items-center space-x-2 transition-all backdrop-blur-md"
            >
                <ArrowLeft className="w-4 h-4" />
                <span className="text-sm font-medium">Back to Services</span>
            </Link>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="w-full max-w-6xl mx-auto h-[100dvh] sm:h-[calc(100dvh-1rem)] lg:h-[calc(100dvh-2rem)] max-h-[900px] flex flex-col"
            >
                <MorsePracticePad />
            </motion.div>
        </div>
    );
}
