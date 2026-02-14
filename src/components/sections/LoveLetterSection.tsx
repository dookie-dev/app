"use client";

import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState, useCallback } from "react";
import { TypewriterText } from "./TypewriterText";
import { DAYS_TOGETHER } from "@/constants";

// Pre-defined rose positions for the explosion effect
const roseEmojis = ['🌹', '🌷', '💐', '🌸', '🏵️', '💮', '🌺', '🪻', '🪷'];
const rosePositions = [
    { x: -120, y: -180, rotate: -25, scale: 1.2 },
    { x: 130, y: -160, rotate: 20, scale: 1.0 },
    { x: -80, y: -220, rotate: -15, scale: 0.9 },
    { x: 90, y: -200, rotate: 30, scale: 1.1 },
    { x: -150, y: -120, rotate: -35, scale: 0.8 },
    { x: 160, y: -100, rotate: 25, scale: 1.0 },
    { x: 0, y: -250, rotate: 0, scale: 1.3 },
    { x: -40, y: -280, rotate: -10, scale: 0.9 },
    { x: 50, y: -240, rotate: 15, scale: 1.0 },
    { x: -100, y: -80, rotate: -20, scale: 0.85 },
    { x: 110, y: -60, rotate: 35, scale: 0.9 },
    { x: -60, y: -300, rotate: 5, scale: 1.1 },
];

/**
 * LoveLetterSection - Wedding elegant style
 * Color palette: Blush #F5E5E1, Peach #F9B487, Sage #427A76, Forest #174143
 */
export function LoveLetterSection() {
    const ref = useRef<HTMLElement>(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });
    const [showSignature, setShowSignature] = useState(false);
    const [showRoses, setShowRoses] = useState(false);
    const [buttonClicked, setButtonClicked] = useState(false);

    const handleLoveClick = (e: React.MouseEvent) => {
        e.preventDefault();
        setShowRoses(true);
        setButtonClicked(true);
        setTimeout(() => setShowRoses(false), 2500);
    };

    const handleTypewriterComplete = useCallback(() => {
        setShowSignature(true);
    }, []);

    const loveMessage = `ถึงมีนที่รักของโย 💕

จำได้ไหมวันที่ 18 สิงหาคม 2561 วันที่เราตกลงเป็นแฟนกัน ตอนนั้นโยไม่รู้เลยว่าชีวิตจะเปลี่ยนไปขนาดนี้ 

ทุกวันที่ได้อยู่กับมีน มันดีจริงๆ นะ ไม่ว่าจะเป็นวันที่เราทำอะไรสนุกๆ หรือแค่นั่งเฉยๆ ด้วยกัน มันก็มีความสุขแล้ว

มีนทำให้โยรู้สึกว่าทุกอย่างมันง่ายขึ้น ทุกวันมันสดใสขึ้น แม้แต่วันที่แย่ๆ ก็กลายเป็นวันดีๆ ได้เพราะมีมีนอยู่ข้างๆ

ขอบคุณนะที่เป็นทั้งแฟน เพื่อน และคนที่โยไว้ใจที่สุด ขอบคุณที่ทำให้โยยิ้มได้ทุกวัน

${DAYS_TOGETHER} วันที่ผ่านมา มันเป็นช่วงเวลาที่ดีที่สุดในชีวิตเลย และโยก็อยากให้เรามีวันแบบนี้ไปด้วยกันอีกนานๆ นะ

รักมีนมากๆ เลยนะ 💖`;

    return (
        <section
            ref={ref}
            className="relative py-20 sm:py-32 px-4 flex items-center justify-center"
            style={{ background: "linear-gradient(180deg, #F5E5E1 0%, #fefcfb 50%, #F5E5E1 100%)" }}
        >
            {/* Decorative top border */}
            <div className="absolute top-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(to right, transparent, #427A76, transparent)' }} />

            {/* Decorative corners - Sage color */}
            <div className="absolute top-8 left-8 text-3xl opacity-40" style={{ color: '#427A76' }}>❧</div>
            <div className="absolute top-8 right-8 text-3xl opacity-40 scale-x-[-1]" style={{ color: '#427A76' }}>❧</div>
            <div className="absolute bottom-8 left-8 text-3xl opacity-40 scale-y-[-1]" style={{ color: '#427A76' }}>❧</div>
            <div className="absolute bottom-8 right-8 text-3xl opacity-40 scale-[-1]" style={{ color: '#427A76' }}>❧</div>

            <motion.div
                className="w-full max-w-2xl bg-white/80 backdrop-blur-sm p-10 sm:p-14 relative"
                style={{
                    border: '1px solid #F9B487',
                    boxShadow: "0 0 0 1px #fefcfb, 0 0 0 4px #F5E5E1, 0 0 0 5px #F9B48730, 0 25px 50px -12px rgba(0, 0, 0, 0.05)",
                }}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
            >
                {/* Inner decorative border */}
                <div className="absolute inset-4 pointer-events-none" style={{ border: '1px solid #F9B48740' }} />

                {/* Decorative header */}
                <motion.div
                    className="text-center mb-10 relative z-10"
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                >
                    <div className="flex items-center justify-center gap-4 mb-4">
                        <div className="h-px w-12" style={{ background: 'linear-gradient(to right, transparent, #427A76)' }} />
                        <span className="text-2xl" style={{ color: '#F9B487' }}>✦</span>
                        <div className="h-px w-12" style={{ background: 'linear-gradient(to left, transparent, #427A76)' }} />
                    </div>
                    <span className="text-4xl" aria-hidden="true">💌</span>
                    <h2 className="font-playfair text-2xl sm:text-3xl mt-4" style={{ color: '#174143' }}>
                        A Letter For You
                    </h2>
                    <p className="text-xs tracking-[0.2em] uppercase mt-2" style={{ color: '#427A76' }}>
                        From My Heart to Yours
                    </p>
                </motion.div>

                {/* Love letter content */}
                <div className="text-base sm:text-lg leading-relaxed whitespace-pre-line relative z-10" style={{ color: '#174143' }}>
                    <TypewriterText
                        text={loveMessage}
                        speed={30}
                        delay={500}
                        onComplete={handleTypewriterComplete}
                    />
                </div>

                {/* Signature */}
                <motion.div
                    className="mt-10 text-right relative z-10"
                    initial={{ opacity: 0 }}
                    animate={showSignature ? { opacity: 1 } : { opacity: 0 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                >
                    <div className="flex items-center justify-end gap-4 mb-4">
                        <div className="h-px w-16" style={{ background: 'linear-gradient(to right, transparent, #427A76)' }} />
                    </div>
                    <p className="font-playfair text-xl sm:text-2xl italic" style={{ color: '#427A76' }}>
                        ด้วยรักนะจ่ะ
                    </p>
                    <p className="font-playfair text-2xl sm:text-3xl mt-2" style={{ color: '#174143' }}>
                        โย
                    </p>
                </motion.div>

                {/* Love Button with Rose Explosion */}
                <motion.div
                    className="mt-12 flex justify-center relative z-10"
                    initial={{ opacity: 0, y: 20 }}
                    animate={showSignature ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                >
                    <motion.button
                        onClick={handleLoveClick}
                        type="button"
                        className="relative px-10 py-4 bg-transparent text-lg font-medium overflow-visible tracking-wider"
                        style={{
                            color: '#174143',
                            border: '2px solid #F9B487',
                            boxShadow: "0 0 0 1px #fefcfb, 0 0 0 3px #F9B48730",
                        }}
                        whileHover={{ scale: 1.02, backgroundColor: "rgba(249, 180, 135, 0.1)" }}
                        whileTap={{ scale: 0.98 }}
                    >
                        {buttonClicked ? "💕 Forever Yours 💕" : "✦ Click Here ✦"}

                        {/* Rose Explosion Effect */}
                        <AnimatePresence>
                            {showRoses && (
                                <>
                                    {rosePositions.map((pos, index) => (
                                        <motion.span
                                            key={index}
                                            className="absolute text-2xl sm:text-3xl pointer-events-none"
                                            style={{ left: '50%', top: '50%' }}
                                            initial={{ x: 0, y: 0, opacity: 1, scale: 0, rotate: 0 }}
                                            animate={{
                                                x: pos.x, y: pos.y,
                                                opacity: [1, 1, 0],
                                                scale: pos.scale,
                                                rotate: pos.rotate
                                            }}
                                            exit={{ opacity: 0 }}
                                            transition={{ duration: 1.5, ease: [0.25, 0.46, 0.45, 0.94], delay: index * 0.05 }}
                                        >
                                            {roseEmojis[index % roseEmojis.length]}
                                        </motion.span>
                                    ))}
                                </>
                            )}
                        </AnimatePresence>
                    </motion.button>
                </motion.div>
            </motion.div>

            {/* Decorative bottom border */}
            <div className="absolute bottom-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(to right, transparent, #427A76, transparent)' }} />
        </section>
    );
}

export default LoveLetterSection;
