"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";

interface AnimatedCounterProps {
    /** The target value to count up to */
    end: number;
    /** Label displayed below the counter */
    label: string;
    /** Duration of the animation in milliseconds (default: 2000) */
    duration?: number;
}

/**
 * AnimatedCounter component that counts from 0 to a target value.
 * Animation triggers when the component enters the viewport.
 *
 * Validates: Requirements 6.2, 6.3
 */
export function AnimatedCounter({
    end,
    label,
    duration = 2000,
}: AnimatedCounterProps) {
    const ref = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, { once: true, margin: "-50px" });
    const [count, setCount] = useState(0);
    const [hasStarted, setHasStarted] = useState(false);

    useEffect(() => {
        if (!isInView || hasStarted) return;
        setHasStarted(true);
    }, [isInView, hasStarted]);

    useEffect(() => {
        if (!hasStarted) return;

        const startTime = Date.now();
        const startValue = 0;
        const endValue = end;

        // Easing function: ease-out cubic
        const easeOutCubic = (t: number): number => {
            return 1 - Math.pow(1 - t, 3);
        };

        const animate = () => {
            const elapsed = Date.now() - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const easedProgress = easeOutCubic(progress);
            const currentValue = Math.round(
                startValue + (endValue - startValue) * easedProgress
            );

            setCount(currentValue);

            if (progress < 1) {
                requestAnimationFrame(animate);
            }
        };

        requestAnimationFrame(animate);
    }, [hasStarted, end, duration]);

    return (
        <motion.div
            ref={ref}
            className="flex flex-col items-center text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 20 }}
            transition={{ duration: 0.5 }}
        >
            <span className="text-5xl md:text-6xl font-bold font-playfair" style={{ color: '#174143' }}>
                {count.toLocaleString('th-TH')}
            </span>
            <span className="mt-2 text-sm md:text-base" style={{ color: '#427A76' }}>
                {label}
            </span>
        </motion.div>
    );
}

export default AnimatedCounter;
