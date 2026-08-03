"use client";

import dynamic from 'next/dynamic';

const HeroScene = dynamic(() => import('@/components/3d/HeroScene'), {
    ssr: false,
    loading: () => <div className="absolute inset-0 bg-background/50 animate-pulse -z-10" />
});

export default function HeroSceneWrapper() {
    return <HeroScene />;
}
