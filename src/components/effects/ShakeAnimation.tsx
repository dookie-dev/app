"use client";

import { ReactNode, useEffect, useState } from "react";
import { motion, useAnimation } from "framer-motion";

interface ShakeAnimationProps {
    /** Content to wrap with shake animation */
    children: ReactNode;
    /** Trigger the shake animation when true */
    shake: boolean;
    /** Callback fired when animation completes (for auto-reset) */
    onAnimationEnd?: () => void;
    /** Additional CSS classes for the wrapper */
    className?: string;
    /** Intensity of the shake in pixels (default: 10) */
    intensity?: number;
    /** Duration of the shake animation in seconds (default: 0.5) */
    duration?: number;
}

/**
 * ShakeAnimation wrapper component that applies a horizontal shake animation.
 * Triggered via the `shake` prop and auto-resets after animation completes.
 * Used for feedback on incorrect password entry.
 *
 * Validates: Requirements 1.5
 */
export function ShakeAnimation({
    children,
    shake,
    onAnimationEnd,
    className = "",
    intensity = 10,
    duration = 0.5,
}: ShakeAnimationProps) {
    const controls = useAnimation();
    const [isShaking, setIsShaking] = useState(false);

    useEffect(() => {
        if (shake && !isShaking) {
            setIsShaking(true);

            // Horizontal shake keyframe animation
            controls
                .start({
                    x: [0, -intensity, intensity, -intensity, intensity, -intensity / 2, intensity / 2, 0],
                    transition: {
                        duration,
                        ease: "easeInOut",
                    },
                })
                .then(() => {
                    setIsShaking(false);
                    onAnimationEnd?.();
                });
        }
    }, [shake, isShaking, controls, intensity, duration, onAnimationEnd]);

    return (
        <motion.div className={className} animate={controls}>
            {children}
        </motion.div>
    );
}

export default ShakeAnimation;
