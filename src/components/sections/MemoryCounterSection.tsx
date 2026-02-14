"use client";

import { motion } from "framer-motion";
import { AnimatedCounter } from "./AnimatedCounter";
import { DAYS_TOGETHER } from "@/constants";

/**
 * MemoryCounterSection - Wedding elegant style
 * Color palette: Blush #F5E5E1, Peach #F9B487, Sage #427A76, Forest #174143
 */
export function MemoryCounterSection() {
    const memoriesCount = 9999;

    return (
        <section
            className="py-20 md:py-32 px-4 relative"
            style={{ background: "linear-gradient(180deg, #F5E5E1 0%, #fefcfb 50%, #F5E5E1 100%)" }}
        >
            {/* Decorative top border */}
            <div className="absolute top-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(to right, transparent, #427A76, transparent)' }} />

            <div className="max-w-4xl mx-auto text-center">
                {/* Section Header */}
                <motion.div
                    className="mb-16"
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
                    <h2 className="font-playfair text-3xl md:text-4xl mb-4" style={{ color: '#174143' }}>
                        Our Moments Together
                    </h2>
                    <p className="text-sm tracking-[0.2em] uppercase" style={{ color: '#427A76' }}>
                        Counting Every Precious Second
                    </p>
                </motion.div>

                {/* Counters */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16">
                    <motion.div
                        className="p-8 rounded-2xl backdrop-blur-sm"
                        style={{
                            backgroundColor: 'rgba(255, 255, 255, 0.6)',
                            border: '1px solid #F9B487'
                        }}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        <AnimatedCounter
                            end={DAYS_TOGETHER}
                            label="วันที่อยู่ด้วยกัน"
                            duration={2000}
                        />
                        <p className="text-sm mt-2" style={{ color: '#427A76' }}>Days of Love 💕</p>
                    </motion.div>
                    <motion.div
                        className="p-8 rounded-2xl backdrop-blur-sm"
                        style={{
                            backgroundColor: 'rgba(255, 255, 255, 0.6)',
                            border: '1px solid #F9B487'
                        }}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                    >
                        <AnimatedCounter
                            end={memoriesCount}
                            label="ความทรงจำดีๆ"
                            duration={2500}
                        />
                        <p className="text-sm mt-2" style={{ color: '#427A76' }}>Beautiful Memories ✨</p>
                    </motion.div>
                </div>
            </div>

            {/* Decorative bottom border */}
            <div className="absolute bottom-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(to right, transparent, #427A76, transparent)' }} />
        </section>
    );
}

export default MemoryCounterSection;
