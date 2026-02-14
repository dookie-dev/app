"use client";

import { motion } from "framer-motion";
import { DAYS_TOGETHER } from "@/constants";
import { photos } from "@/data/photos";

/**
 * Hero section component with elegant wedding style.
 * Color palette: Blush #F5E5E1, Peach #F9B487, Sage #427A76, Forest #174143
 */
export function HeroSection() {
    const imagePhotos = photos.filter(p => p.type === "image").slice(0, 12);

    return (
        <section className="relative min-h-screen flex flex-col items-center justify-center px-4 py-16 overflow-hidden">
            {/* Photo Gallery Background */}
            <div className="absolute inset-0 grid grid-cols-4 grid-rows-3 gap-1 opacity-25">
                {imagePhotos.map((photo, index) => (
                    <motion.div
                        key={photo.id}
                        className="relative w-full h-full overflow-hidden"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.6, delay: index * 0.1 }}
                    >
                        <img src={photo.src} alt={photo.alt} className="w-full h-full object-cover" />
                    </motion.div>
                ))}
            </div>

            {/* Gradient Overlay - Blush tones */}
            <div
                className="absolute inset-0"
                style={{
                    background: "linear-gradient(180deg, rgba(245, 229, 225, 0.92) 0%, rgba(254, 252, 251, 0.88) 50%, rgba(245, 229, 225, 0.92) 100%)",
                }}
            />

            {/* Decorative Corner Flourishes - Sage color */}
            <div className="absolute top-8 left-8 text-4xl opacity-40" style={{ color: '#427A76' }} aria-hidden="true">❧</div>
            <div className="absolute top-8 right-8 text-4xl opacity-40 scale-x-[-1]" style={{ color: '#427A76' }} aria-hidden="true">❧</div>
            <div className="absolute bottom-8 left-8 text-4xl opacity-40 scale-y-[-1]" style={{ color: '#427A76' }} aria-hidden="true">❧</div>
            <div className="absolute bottom-8 right-8 text-4xl opacity-40 scale-[-1]" style={{ color: '#427A76' }} aria-hidden="true">❧</div>

            {/* Content */}
            <div className="relative z-10 text-center">
                {/* Top Decorative Line */}
                <motion.div
                    className="flex items-center justify-center gap-4 mb-8"
                    initial={{ opacity: 0, scaleX: 0 }}
                    animate={{ opacity: 1, scaleX: 1 }}
                    transition={{ duration: 1, delay: 0.2 }}
                >
                    <div className="h-px w-16 sm:w-24" style={{ background: 'linear-gradient(to right, transparent, #427A76)' }} />
                    <span className="text-2xl" style={{ color: '#427A76' }}>✦</span>
                    <div className="h-px w-16 sm:w-24" style={{ background: 'linear-gradient(to left, transparent, #427A76)' }} />
                </motion.div>

                {/* Small Title */}
                <motion.p
                    className="text-sm sm:text-base tracking-[0.3em] uppercase mb-4"
                    style={{ color: '#427A76' }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                >
                    The Love Story of
                </motion.p>

                {/* Main Names */}
                <motion.div
                    className="mb-6"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1, delay: 0.4 }}
                >
                    <h1 className="font-playfair text-5xl sm:text-6xl md:text-7xl lg:text-8xl mb-2" style={{ color: '#174143' }}>
                        โย
                    </h1>
                    <div className="flex items-center justify-center gap-4 my-4">
                        <div className="h-px w-12" style={{ backgroundColor: '#F9B487' }} />
                        <span className="text-3xl sm:text-4xl">💕</span>
                        <div className="h-px w-12" style={{ backgroundColor: '#F9B487' }} />
                    </div>
                    <h1 className="font-playfair text-5xl sm:text-6xl md:text-7xl lg:text-8xl" style={{ color: '#174143' }}>
                        มีน
                    </h1>
                </motion.div>

                {/* Date Badge */}
                <motion.div
                    className="inline-block px-6 py-3 rounded-full backdrop-blur-sm mb-6"
                    style={{
                        border: '1px solid #F9B487',
                        backgroundColor: 'rgba(255, 255, 255, 0.5)'
                    }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                >
                    <p className="text-sm sm:text-base tracking-wider" style={{ color: '#174143' }}>
                        18 สิงหาคม 2561
                    </p>
                </motion.div>

                {/* Days Counter */}
                <motion.div
                    className="mb-8"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.8 }}
                >
                    <p className="text-lg sm:text-xl mb-2" style={{ color: '#427A76' }}>
                        เราอยู่ด้วยกันมาแล้ว
                    </p>
                    <p className="font-playfair text-4xl sm:text-5xl md:text-6xl" style={{ color: '#174143' }}>
                        {DAYS_TOGETHER.toLocaleString('th-TH')}
                    </p>
                    <p className="text-lg sm:text-xl mt-2" style={{ color: '#427A76' }}>
                        วัน ✨
                    </p>
                </motion.div>

                {/* Bottom Decorative Line */}
                <motion.div
                    className="flex items-center justify-center gap-4"
                    initial={{ opacity: 0, scaleX: 0 }}
                    animate={{ opacity: 1, scaleX: 1 }}
                    transition={{ duration: 1, delay: 1 }}
                >
                    <div className="h-px w-16 sm:w-24" style={{ background: 'linear-gradient(to right, transparent, #427A76)' }} />
                    <span className="text-2xl" style={{ color: '#427A76' }}>✦</span>
                    <div className="h-px w-16 sm:w-24" style={{ background: 'linear-gradient(to left, transparent, #427A76)' }} />
                </motion.div>

                {/* Scroll Indicator */}
                <motion.div
                    className="mt-12"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1, y: [0, 10, 0] }}
                    transition={{
                        opacity: { delay: 1.2, duration: 0.5 },
                        y: { delay: 1.5, duration: 1.5, repeat: Infinity }
                    }}
                >
                    <p className="text-sm mb-2" style={{ color: '#427A76' }}>เลื่อนลงเพื่อดูเรื่องราวของเรา</p>
                    <span className="text-2xl" style={{ color: '#F9B487' }}>↓</span>
                </motion.div>
            </div>
        </section>
    );
}

export default HeroSection;
