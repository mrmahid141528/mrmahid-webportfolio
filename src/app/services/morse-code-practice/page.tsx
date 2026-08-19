"use client";

import { motion } from "framer-motion";
import MorsePracticePad from "./components/MorsePracticePad";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function MorseCodePracticePage() {
    return (
        <div className="fixed inset-0 z-[100] flex min-h-[100dvh] w-full bg-[#050505] p-0 sm:p-2 lg:p-4 items-center justify-center overflow-hidden">
            <Link
                href="/services"
                className="absolute top-6 left-6 z-[110] px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full text-white/70 hover:text-white flex items-center space-x-2 transition-all backdrop-blur-md"
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
