"use client";

import { useState, useCallback, ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Sparkle {
    id: string;
    x: number;
    y: number;
    size: number;
    color: string;
    rotation: number;
}

interface SparkleEffectProps {
    /** Content to wrap with sparkle effect */
    children: ReactNode;
    /** Additional CSS classes for the wrapper */
    className?: string;
    /** Number of sparkles to generate on hover (default: 8) */
    sparkleCount?: number;
    /** Whether the sparkle effect is enabled (default: true) */
    enabled?: boolean;
}

const SPARKLE_COLORS = [
    "#f472b6", // pink-400
    "#f9a8d4", // pink-300
    "#fbbf24", // amber-400 (gold)
    "#fcd34d", // amber-300 (light gold)
    "#ec4899", // pink-500
    "#fde68a", // amber-200 (pale gold)
];

/**
 * SparkleEffect hover component that displays sparkle particles on hover.
 * Uses Framer Motion for sparkle animations (scale, opacity, position).
 * Sparkles appear around the hovered element in pink/gold colors.
 *
 * Validates: Requirements 4.4
 */
export function SparkleEffect({
    children,
    className = "",
    sparkleCount = 8,
    enabled = true,
}: SparkleEffectProps) {
    const [sparkles, setSparkles] = useState<Sparkle[]>([]);

    const generateSparkles = useCallback(() => {
        if (!enabled) return;

        const newSparkles: Sparkle[] = Array.from({ length: sparkleCount }, (_, i) => ({
            id: `sparkle-${Date.now()}-${i}`,
            // Position sparkles around the element edges
            x: Math.random() * 100,
            y: Math.random() * 100,
            size: 8 + Math.random() * 12, // 8-20px
            color: SPARKLE_COLORS[Math.floor(Math.random() * SPARKLE_COLORS.length)],
            rotation: Math.random() * 360,
        }));

        setSparkles(newSparkles);
    }, [enabled, sparkleCount]);

    const clearSparkles = useCallback(() => {
        setSparkles([]);
    }, []);

    return (
        <div
            className={`relative ${className}`}
            onMouseEnter={generateSparkles}
            onMouseLeave={clearSparkles}
        >
            {children}

            <AnimatePresence>
                {sparkles.map((sparkle) => (
                    <motion.div
                        key={sparkle.id}
                        className="absolute pointer-events-none z-10"
                        style={{
                            left: `${sparkle.x}%`,
                            top: `${sparkle.y}%`,
                        }}
                        initial={{
                            scale: 0,
                            opacity: 0,
                            rotate: sparkle.rotation,
                        }}
                        animate={{
                            scale: [0, 1.2, 1],
                            opacity: [0, 1, 0.8],
                            rotate: sparkle.rotation + 180,
                        }}
                        exit={{
                            scale: 0,
                            opacity: 0,
                        }}
                        transition={{
                            duration: 0.6,
                            ease: "easeOut",
                        }}
                    >
                        <SparkleIcon size={sparkle.size} color={sparkle.color} />
                    </motion.div>
                ))}
            </AnimatePresence>
        </div>
    );
}

interface SparkleIconProps {
    size: number;
    color: string;
}

/**
 * Sparkle/star SVG icon
 */
function SparkleIcon({ size, color }: SparkleIconProps) {
    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 24 24"
            fill={color}
            xmlns="http://www.w3.org/2000/svg"
        >
            {/* 4-pointed star sparkle shape */}
            <path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z" />
        </svg>
    );
}

export default SparkleEffect;
