"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { TimelineItem } from "@/types";

interface TimelineCardProps {
    item: TimelineItem;
    index: number;
}

/**
 * Timeline card component displaying a photo with date and caption.
 * Features alternating left/right positioning and scroll-reveal animations.
 *
 * Validates: Requirements 3.1, 3.2, 3.3
 */
export function TimelineCard({ item, index }: TimelineCardProps) {
    const ref = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    const { photo, position } = item;
    const isLeft = position === "left";

    // Animation variants for scroll-reveal
    const cardVariants = {
        hidden: {
            opacity: 0,
            x: isLeft ? -50 : 50,
        },
        visible: {
            opacity: 1,
            x: 0,
            transition: {
                duration: 0.6,
                ease: [0.25, 0.1, 0.25, 1] as const, // easeOut cubic-bezier
            },
        },
    };

    return (
        <div
            ref={ref}
            className={`
                flex
                items-center
                w-full
                mb-8
                md:mb-12
                ${isLeft ? "justify-start" : "justify-end"}
            `}
        >
            <motion.div
                className={`
                    relative
                    w-full
                    max-w-sm
                    md:max-w-md
                    ${isLeft ? "md:mr-auto md:ml-0" : "md:ml-auto md:mr-0"}
                `}
                variants={cardVariants}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
            >
                {/* Card container */}
                <div
                    className="
                        bg-white/80
                        backdrop-blur-sm
                        rounded-2xl
                        shadow-lg
                        shadow-pink-200/30
                        overflow-hidden
                        border
                        border-white/50
                    "
                >
                    {/* Photo */}
                    <div className="relative aspect-4/3 w-full">
                        <Image
                            src={photo.src}
                            alt={photo.alt}
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 100vw, 400px"
                        />
                    </div>

                    {/* Content */}
                    <div className="p-4 md:p-5">
                        {/* Date */}
                        <p
                            className="
                                font-inter
                                text-sm
                                text-pink-400
                                mb-2
                            "
                        >
                            {photo.date}
                        </p>

                        {/* Caption */}
                        <p
                            className="
                                font-inter
                                text-base
                                md:text-lg
                                text-pink-600
                            "
                        >
                            {photo.caption}
                        </p>
                    </div>
                </div>

                {/* Timeline dot connector */}
                <div
                    className={`
                        hidden
                        md:block
                        absolute
                        top-1/2
                        -translate-y-1/2
                        w-4
                        h-4
                        bg-pink-400
                        rounded-full
                        border-4
                        border-white
                        shadow-md
                        ${isLeft ? "-right-8" : "-left-8"}
                    `}
                    aria-hidden="true"
                />
            </motion.div>
        </div>
    );
}

export default TimelineCard;
