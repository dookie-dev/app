"use client";

import { useState, FormEvent, useRef } from "react";
import { ShakeAnimation } from "@/components/effects/ShakeAnimation";
import { validatePassword } from "@/utils";
import { photos } from "@/data/photos";
import { motion } from "framer-motion";

// Get only image photos for background
const backgroundPhotos = photos.filter(p => p.type === "image").slice(0, 9);

interface PasswordGateProps {
    onSuccess: () => void;
}

/**
 * PasswordGate - Wedding elegant style
 * Color palette: Blush #F5E5E1, Peach #F9B487, Sage #427A76, Forest #174143
 */
export function PasswordGate({ onSuccess }: PasswordGateProps) {
    const [password, setPassword] = useState("");
    const [isShaking, setIsShaking] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        if (validatePassword(password)) {
            onSuccess();
        } else {
            setIsShaking(true);
            setPassword("");
        }
    };

    const handleShakeEnd = () => {
        setIsShaking(false);
        inputRef.current?.focus();
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
            {/* Photo Grid Background - 3x3 Full Screen */}
            <div className="absolute inset-0 grid grid-cols-3 grid-rows-3">
                {backgroundPhotos.map((photo, index) => (
                    <motion.div
                        key={photo.id}
                        className="relative overflow-hidden"
                        initial={{ opacity: 0, scale: 1.05 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.6, delay: index * 0.08 }}
                    >
                        <img src={photo.src} alt="" className="w-full h-full object-cover" />
                    </motion.div>
                ))}
            </div>

            {/* Overlay - Blush tones */}
            <div
                className="absolute inset-0"
                style={{
                    background: "linear-gradient(180deg, rgba(245, 229, 225, 0.88) 0%, rgba(254, 252, 251, 0.85) 50%, rgba(245, 229, 225, 0.88) 100%)",
                }}
            />

            <ShakeAnimation shake={isShaking} onAnimationEnd={handleShakeEnd}>
                <motion.div
                    className="w-full max-w-md p-10 relative z-10 bg-white/80 backdrop-blur-sm"
                    style={{
                        border: '1px solid #F9B487',
                        boxShadow: "0 0 0 1px #fefcfb, 0 0 0 4px #F5E5E1, 0 0 0 5px #F9B48730, 0 25px 50px -12px rgba(0, 0, 0, 0.1)",
                    }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                >
                    {/* Inner decorative border */}
                    <div className="absolute inset-3 pointer-events-none" style={{ border: '1px solid #F9B48740' }} />

                    <form onSubmit={handleSubmit} className="flex flex-col items-center gap-6 relative z-10">
                        {/* Decorative top */}
                        <div className="flex items-center justify-center gap-4 mb-2">
                            <div className="h-px w-12" style={{ background: 'linear-gradient(to right, transparent, #427A76)' }} />
                            <span className="text-xl" style={{ color: '#F9B487' }}>✦</span>
                            <div className="h-px w-12" style={{ background: 'linear-gradient(to left, transparent, #427A76)' }} />
                        </div>

                        {/* Heart Icon */}
                        <div className="text-5xl" aria-hidden="true">💕</div>

                        {/* Title */}
                        <h1 className="text-2xl font-playfair text-center" style={{ color: '#174143' }}>
                            ใส่วันพิเศษของเรา
                        </h1>
                        <p className="text-xs tracking-[0.2em] uppercase -mt-4" style={{ color: '#427A76' }}>
                            Enter Our Special Date
                        </p>

                        {/* Password Input */}
                        <input
                            ref={inputRef}
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="ใส่รหัสผ่าน..."
                            className="w-full px-4 py-3 bg-white/80 text-center text-lg transition-all focus:outline-none"
                            style={{
                                border: '1px solid #F9B487',
                                color: '#174143',
                            }}
                            aria-label="Password"
                        />

                        {/* Unlock Button */}
                        <button
                            type="submit"
                            className="w-full py-3 text-white font-medium tracking-wider transition-all hover:opacity-90"
                            style={{ backgroundColor: '#427A76' }}
                        >
                            เปิดความทรงจำของเรา
                        </button>

                        {/* Decorative bottom */}
                        <div className="flex items-center justify-center gap-4 mt-2">
                            <div className="h-px w-12" style={{ background: 'linear-gradient(to right, transparent, #427A76)' }} />
                            <span className="text-xl" style={{ color: '#F9B487' }}>✦</span>
                            <div className="h-px w-12" style={{ background: 'linear-gradient(to left, transparent, #427A76)' }} />
                        </div>
                    </form>
                </motion.div>
            </ShakeAnimation>
        </div>
    );
}

export default PasswordGate;
