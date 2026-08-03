"use client"

import { motion } from 'framer-motion';

export default function ScrollIndicator() {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 4, duration: 1 }}
            className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center space-y-2 opacity-60"
        >
            <span className="text-xs uppercase tracking-widest text-muted">Scroll</span>
            <div className="w-[1px] h-12 bg-gradient-to-b from-gray-400 to-transparent" />
        </motion.div>
    );
}
