"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";

interface TypewriterTextProps {
    /** The text to display with typewriter effect */
    text: string;
    /** Speed of typing in milliseconds per character (default: 50) */
    speed?: number;
    /** Delay before starting the animation in milliseconds (default: 0) */
    delay?: number;
    /** Additional CSS classes */
    className?: string;
    /** Callback when typing animation completes */
    onComplete?: () => void;
}

/**
 * TypewriterText component that reveals text character-by-character.
 * Animation triggers when the component enters the viewport.
 *
 * Validates: Requirements 5.1
 */
export function TypewriterText({
    text,
    speed = 50,
    delay = 0,
    className = "",
    onComplete,
}: TypewriterTextProps) {
    const ref = useRef<HTMLSpanElement>(null);
    const isInView = useInView(ref, { once: true, margin: "-50px" });
    const [displayedText, setDisplayedText] = useState("");
    const [hasStarted, setHasStarted] = useState(false);

    useEffect(() => {
        if (!isInView || hasStarted) return;

        // Start typing after the specified delay
        const delayTimeout = setTimeout(() => {
            setHasStarted(true);
        }, delay);

        return () => clearTimeout(delayTimeout);
    }, [isInView, delay, hasStarted]);

    useEffect(() => {
        if (!hasStarted) return;

        let currentIndex = 0;
        const intervalId = setInterval(() => {
            if (currentIndex < text.length) {
                setDisplayedText(text.slice(0, currentIndex + 1));
                currentIndex++;
            } else {
                clearInterval(intervalId);
                onComplete?.();
            }
        }, speed);

        return () => clearInterval(intervalId);
    }, [hasStarted, text, speed, onComplete]);

    return (
        <motion.span
            ref={ref}
            className={className}
            initial={{ opacity: 0 }}
            animate={{ opacity: isInView ? 1 : 0 }}
            transition={{ duration: 0.3 }}
        >
            {displayedText}
            {/* Blinking cursor while typing */}
            {hasStarted && displayedText.length < text.length && (
                <motion.span
                    className="inline-block w-0.5 h-[1em] bg-current ml-0.5 align-middle"
                    animate={{ opacity: [1, 0] }}
                    transition={{
                        duration: 0.5,
                        repeat: Infinity,
                        repeatType: "reverse",
                    }}
                    aria-hidden="true"
                />
            )}
        </motion.span>
    );
}

export default TypewriterText;
