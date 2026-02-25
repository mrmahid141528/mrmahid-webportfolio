"use client"

import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float, Stats, Preload, Points, PointMaterial } from '@react-three/drei'
import * as THREE from 'three'

// Particle field helper
const ParticleField = () => {
    const ref = useRef<THREE.Points>(null)

    // Generate random particles
    const [positions, colors] = useMemo(() => {
        const count = 3000
        const positions = new Float32Array(count * 3)
        const colors = new Float32Array(count * 3)
        const colorPrimary = new THREE.Color("#3B82F6")
        const colorAccent = new THREE.Color("#06B6D4")
        const colorSecondary = new THREE.Color("#8B5CF6")
        const palette = [colorPrimary, colorAccent, colorSecondary]

        for (let i = 0; i < count; i++) {
            // Create a large sphere distribution
            const r = 15 + Math.random() * 10
            const theta = 2 * Math.PI * Math.random()
            const phi = Math.acos(2 * Math.random() - 1)
            const x = r * Math.sin(phi) * Math.cos(theta)
            const y = r * Math.sin(phi) * Math.sin(theta)
            const z = r * Math.cos(phi)

            positions[i * 3] = x
            positions[i * 3 + 1] = y
            positions[i * 3 + 2] = z

            // Pick random color from palette
            const color = palette[Math.floor(Math.random() * palette.length)]
            colors[i * 3] = color.r
            colors[i * 3 + 1] = color.g
            colors[i * 3 + 2] = color.b
        }

        return [positions, colors]
    }, [])

    useFrame((state) => {
        if (!ref.current) return
        ref.current.rotation.y = state.clock.getElapsedTime() * 0.05
        ref.current.rotation.z = state.clock.getElapsedTime() * 0.02
    })

    return (
        <Points ref={ref} positions={positions} colors={colors} stride={3} frustumCulled={false}>
            <PointMaterial
                transparent
                vertexColors
                size={0.15}
                sizeAttenuation={true}
                depthWrite={false}
                blending={THREE.AdditiveBlending}
            />
        </Points>
    )
}

// Main 3D Scene Component
export default function HeroScene() {
    return (
        <div className="absolute inset-0 z-0 h-full w-full pointer-events-none">
            <Canvas camera={{ position: [0, 0, 15], fov: 60 }}>
                {/* Ambient Light */}
                <ambientLight intensity={0.5} />

                {/* Particle Field */}
                <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
                    <ParticleField />
                </Float>

                <Preload all />
            </Canvas>
        </div>
    )
}
