"use client";

import { ReactNode } from "react";

interface GlassmorphismCardProps {
    children: ReactNode;
    className?: string;
}

/**
 * A glassmorphism-styled card component with backdrop blur,
 * semi-transparent background, rounded corners, and soft shadow.
 *
 * Validates: Requirements 1.1, 11.2
 */
export function GlassmorphismCard({
    children,
    className = "",
}: GlassmorphismCardProps) {
    return (
        <div
            className={`
        backdrop-blur-md
        bg-white/70
        rounded-2xl
        shadow-lg
        shadow-pink-200/30
        border
        border-white/50
        ${className}
      `.trim()}
        >
            {children}
        </div>
    );
}

export default GlassmorphismCard;
