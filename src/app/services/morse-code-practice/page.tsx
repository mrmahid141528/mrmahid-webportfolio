"use client";

import { motion } from "framer-motion";
import MorsePracticePad from "./components/MorsePracticePad";

export default function MorseCodePracticePage() {
    return (
        <div className="flex min-h-screen w-full bg-[#050505] p-4 lg:p-12 items-center justify-center">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="w-full max-w-6xl mx-auto h-[90vh] lg:h-[80vh] flex flex-col"
            >
                <MorsePracticePad />
            </motion.div>
        </div>
    );
}
