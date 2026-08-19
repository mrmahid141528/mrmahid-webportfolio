"use client";

import { motion } from "framer-motion";
import MorsePracticePad from "./components/MorsePracticePad";

export default function MorseCodePracticePage() {
    return (
        <div className="flex min-h-[100dvh] w-full bg-[#050505] p-0 sm:p-2 lg:p-4 items-center justify-center">
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
