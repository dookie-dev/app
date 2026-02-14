"use client";

import { ReactNode } from "react";

interface MasonryGridProps {
    /** Children elements (typically GalleryImage components) */
    children: ReactNode;
    /** Optional additional CSS classes */
    className?: string;
}

/**
 * MasonryGrid component for arranging images in a masonry layout.
 * Uses CSS columns for the masonry effect with responsive column count:
 * - 1 column on mobile (< 640px)
 * - 2 columns on tablet (640px - 1024px)
 * - 3 columns on desktop (> 1024px)
 *
 * Validates: Requirements 4.1, 11.4
 */
export function MasonryGrid({ children, className = "" }: MasonryGridProps) {
    return (
        <div
            className={`
                columns-1 sm:columns-2 lg:columns-3
                gap-4 sm:gap-6
                space-y-4 sm:space-y-6
                ${className}
            `.trim()}
        >
            {children}
        </div>
    );
}

export default MasonryGrid;
