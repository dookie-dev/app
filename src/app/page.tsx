"use client";

import { useState, useRef, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { PasswordGate } from "@/components/sections/PasswordGate";
import { FloatingHearts } from "@/components/effects/FloatingHearts";
import { HeroSection } from "@/components/sections/HeroSection";
import { TimelineSection } from "@/components/sections/TimelineSection";
import { GallerySection } from "@/components/sections/GallerySection";
import { LoveLetterSection } from "@/components/sections/LoveLetterSection";
import { MemoryCounterSection } from "@/components/sections/MemoryCounterSection";
import { photos } from "@/data/photos";

/**
 * Main page component with PasswordGate and FloatingHearts.
 * Manages authentication state and conditionally renders
 * PasswordGate or photobook content.
 *
 * Validates: Requirements 1.1, 1.2
 */
export default function Home() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    audioRef.current = new Audio("/audio.mp3");
    audioRef.current.loop = true;
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  const handlePasswordSuccess = () => {
    setIsAuthenticated(true);
    // เล่นเพลงทันทีหลัง login (user interaction ทำให้ browser อนุญาต)
    if (audioRef.current) {
      audioRef.current.play().catch(() => { });
    }
  };

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !audioRef.current.muted;
      setIsMuted(audioRef.current.muted);
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-b from-pink-100 to-cream">
      {/* Floating hearts background - always visible */}
      <FloatingHearts />

      {/* Music toggle button - show only after authenticated */}
      {isAuthenticated && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, duration: 0.3 }}
          onClick={toggleMute}
          className="fixed bottom-6 right-6 z-50 w-12 h-12 rounded-full bg-white/80 backdrop-blur-sm shadow-lg flex items-center justify-center hover:bg-white transition-colors"
          aria-label={isMuted ? "Unmute" : "Mute"}
        >
          {isMuted ? (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-6 h-6 text-pink-400">
              <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
              <line x1="23" y1="9" x2="17" y2="15" />
              <line x1="17" y1="9" x2="23" y2="15" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-6 h-6 text-pink-500">
              <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
              <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
              <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
            </svg>
          )}
        </motion.button>
      )}

      <AnimatePresence mode="wait">
        {!isAuthenticated ? (
          <motion.div
            key="password-gate"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          >
            <PasswordGate onSuccess={handlePasswordSuccess} />
          </motion.div>
        ) : (
          <motion.div
            key="photobook"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          >
            {/* Hero Section */}
            <HeroSection />

            {/* Memory Counter Section */}
            <MemoryCounterSection />

            {/* Gallery Section */}
            <GallerySection photos={photos} title="ความทรงจำของเรา 💕📸" />

            {/* Love Letter Section */}
            <LoveLetterSection />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
