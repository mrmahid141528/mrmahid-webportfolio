"use client";

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';

const HeroScene = dynamic(() => import('@/components/3d/HeroScene'), {
    ssr: false,
    loading: () => <div className="absolute inset-0 bg-background/50 animate-pulse -z-10" />
});

export default function HeroSceneWrapper() {
    const [shouldRender, setShouldRender] = useState(false);

    useEffect(() => {
        // Defer 3D scene load by 600ms to allow critical UI to hydrate instantly
        const timer = setTimeout(() => {
            setShouldRender(true);
        }, 600);
        return () => clearTimeout(timer);
    }, []);

    return shouldRender ? <HeroScene /> : <div className="absolute inset-0 bg-background/50 animate-pulse -z-10" />;
}
