"use client";

import { useState, useEffect } from "react";

interface HeartParticle {
    id: number;
    size: "small" | "medium" | "large";
    left: number;
    animationDuration: number;
    animationDelay: number;
    opacity: number;
}

interface FloatingHeartsProps {
    /** Number of heart particles to render (default: 15 for mobile performance) */
    particleCount?: number;
    /** Additional CSS classes */
    className?: string;
}

/**
 * FloatingHearts background component that displays floating heart animations.
 * Uses CSS animations for performance (not JS-driven).
 * Particle count is limited for mobile performance.
 *
 * Validates: Requirements 1.2, 2.3, 7.1, 7.3
 */
export function FloatingHearts({
    particleCount = 15,
    className = "",
}: FloatingHeartsProps) {
    // Generate hearts only on client to avoid hydration mismatch from Math.random()
    const [hearts, setHearts] = useState<HeartParticle[]>([]);

    useEffect(() => {
        setHearts(Array.from({ length: particleCount }, (_, i) => generateHeart(i)));
    }, [particleCount]);

    return (
        <div
            className={`fixed inset-0 overflow-hidden pointer-events-none z-0 ${className}`}
            aria-hidden="true"
        >
            <style jsx>{`
        @keyframes float-up {
          0% {
            transform: translateY(100vh) rotate(0deg);
            opacity: 0;
          }
          10% {
            opacity: var(--heart-opacity);
          }
          90% {
            opacity: var(--heart-opacity);
          }
          100% {
            transform: translateY(-100px) rotate(360deg);
            opacity: 0;
          }
        }

        .heart-particle {
          position: absolute;
          animation: float-up var(--duration) var(--delay) infinite ease-in-out;
          will-change: transform, opacity;
        }
      `}</style>

            {hearts.map((heart) => (
                <div
                    key={heart.id}
                    className="heart-particle"
                    style={{
                        left: `${heart.left}%`,
                        "--duration": `${heart.animationDuration}s`,
                        "--delay": `${heart.animationDelay}s`,
                        "--heart-opacity": heart.opacity,
                    } as React.CSSProperties}
                >
                    <HeartIcon size={heart.size} />
                </div>
            ))}
        </div>
    );
}

/**
 * Generates a random heart particle configuration
 */
function generateHeart(id: number): HeartParticle {
    const sizes: Array<"small" | "medium" | "large"> = ["small", "medium", "large"];
    const sizeIndex = Math.floor(Math.random() * sizes.length);

    return {
        id,
        size: sizes[sizeIndex],
        left: Math.random() * 100,
        animationDuration: 10 + Math.random() * 15, // 10-25 seconds
        animationDelay: Math.random() * 10, // 0-10 seconds delay
        opacity: 0.3 + Math.random() * 0.4, // 0.3-0.7 opacity
    };
}

interface HeartIconProps {
    size: "small" | "medium" | "large";
}

/**
 * Heart SVG icon with size variants
 */
function HeartIcon({ size }: HeartIconProps) {
    const sizeMap = {
        small: "w-4 h-4",
        medium: "w-6 h-6",
        large: "w-8 h-8",
    };

    const colorMap = {
        small: "text-pink-300",
        medium: "text-pink-400",
        large: "text-pink-500",
    };

    return (
        <svg
            className={`${sizeMap[size]} ${colorMap[size]}`}
            viewBox="0 0 24 24"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
        </svg>
    );
}

export default FloatingHearts;
