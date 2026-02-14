"use client";

import { useState, useCallback } from "react";
import { motion } from "framer-motion";
import { Photo } from "@/types";
import { MasonryGrid } from "./MasonryGrid";
import { GalleryImage } from "./GalleryImage";
import { FullscreenModal } from "./FullscreenModal";
import { navigateNext, navigatePrev } from "@/utils/galleryNavigation";

interface GallerySectionProps {
    photos: Photo[];
    title?: string;
    className?: string;
}

/**
 * GallerySection - Wedding elegant style
 * Color palette: Blush #F5E5E1, Peach #F9B487, Sage #427A76, Forest #174143
 */
export function GallerySection({
    photos,
    title = "Our Gallery",
    className = "",
}: GallerySectionProps) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState(0);

    const handleImageClick = useCallback((index: number) => {
        setSelectedIndex(index);
        setIsModalOpen(true);
    }, []);

    const handleCloseModal = useCallback(() => setIsModalOpen(false), []);
    const handleNext = useCallback(() => setSelectedIndex((c) => navigateNext(c, photos.length)), [photos.length]);
    const handlePrev = useCallback(() => setSelectedIndex((c) => navigatePrev(c, photos.length)), [photos.length]);

    if (photos.length === 0) return null;

    return (
        <section
            className={`py-20 md:py-32 px-4 sm:px-6 lg:px-8 relative ${className}`}
            style={{ background: "linear-gradient(180deg, #F5E5E1 0%, #fefcfb 50%, #F5E5E1 100%)" }}
        >
            {/* Decorative top border */}
            <div className="absolute top-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(to right, transparent, #427A76, transparent)' }} />

            <div className="max-w-6xl mx-auto">
                {/* Section Header */}
                <motion.div
                    className="text-center mb-16"
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
                        {title}
                    </h2>
                    <p className="text-sm tracking-[0.2em] uppercase" style={{ color: '#427A76' }}>
                        Captured Moments of Love
                    </p>
                </motion.div>

                {/* Masonry Grid */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                >
                    <MasonryGrid>
                        {photos.map((photo, index) => (
                            <div key={photo.id} className="mb-4 sm:mb-6 break-inside-avoid">
                                <GalleryImage photo={photo} onClick={() => handleImageClick(index)} />
                            </div>
                        ))}
                    </MasonryGrid>
                </motion.div>
            </div>

            <FullscreenModal
                photos={photos}
                currentIndex={selectedIndex}
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                onNext={handleNext}
                onPrev={handlePrev}
            />

            {/* Decorative bottom border */}
            <div className="absolute bottom-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(to right, transparent, #427A76, transparent)' }} />
        </section>
    );
}

export default GallerySection;
