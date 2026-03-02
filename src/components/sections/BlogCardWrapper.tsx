"use client"

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

export default function BlogCardWrapper({
    children,
    type,
    index = 0
}: {
    children: React.ReactNode;
    type: 'header' | 'card';
    index?: number;
}) {
    const ref = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, { once: true, margin: '-100px' });

    if (type === 'header') {
        return (
            <motion.div
                ref={ref}
                initial={{ opacity: 0, y: 40 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7 }}
                className="flex flex-col items-center text-center mb-16"
            >
                {children}
            </motion.div>
        );
    }

    // Default to card animation
    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 60 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: index * 0.15 }}
            style={{ height: '100%' }} // Ensures cards fill grid properly
        >
            {children}
        </motion.div>
    );
}
