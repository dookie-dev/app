"use client";

import { motion } from "framer-motion";
import { TimelineCard } from "./TimelineCard";
import { timelinePhotos } from "@/data/photos";

/**
 * Timeline section - Wedding elegant style
 * Color palette: Blush #F5E5E1, Peach #F9B487, Sage #427A76, Forest #174143
 */
export function TimelineSection() {
    return (
        <section
            className="relative py-20 md:py-32 px-4 md:px-8"
            style={{ background: "linear-gradient(180deg, #F5E5E1 0%, #fefcfb 50%, #F5E5E1 100%)" }}
        >
            {/* Decorative top border */}
            <div className="absolute top-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(to right, transparent, #427A76, transparent)' }} />

            {/* Section Header */}
            <motion.div
                className="text-center mb-16 md:mb-20"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
            >
                <div className="flex items-center justify-center gap-4 mb-6">
                    <div className="h-px w-16" style={{ background: 'linear-gradient(to right, transparent, #427A76)' }} />
                    <span className="text-2xl" style={{ color: '#F9B487' }}>✦</span>
                    <div className="h-px w-16" style={{ background: 'linear-gradient(to left, transparent, #427A76)' }} />
                </div>
                <h2 className="font-playfair text-3xl md:text-5xl mb-4" style={{ color: '#174143' }}>
                    Our Journey Together
                </h2>
                <p className="text-sm tracking-[0.2em] uppercase" style={{ color: '#427A76' }}>
                    Every Moment is a Treasure
                </p>
            </motion.div>

            {/* Timeline container */}
            <div className="relative max-w-4xl mx-auto">
                {/* Vertical connecting line */}
                <div
                    className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2"
                    style={{ background: "linear-gradient(180deg, transparent, #427A76 10%, #427A76 90%, transparent)" }}
                    aria-hidden="true"
                />

                {/* Timeline cards */}
                <div className="relative">
                    {timelinePhotos.map((item, index) => (
                        <TimelineCard key={item.photo.id} item={item} index={index} />
                    ))}
                </div>
            </div>

            {/* Decorative bottom border */}
            <div className="absolute bottom-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(to right, transparent, #427A76, transparent)' }} />
        </section>
    );
}

export default TimelineSection;
