"use client";

import Image from "next/image";
import { Photo } from "@/types";
import { SparkleEffect } from "@/components/effects/SparkleEffect";

interface GalleryImageProps {
    /** Photo data to display */
    photo: Photo;
    /** Click handler to open modal */
    onClick: () => void;
}

/**
 * GalleryImage component with sparkle hover effect.
 * Displays an image or video with rounded corners and soft shadow.
 * Shows SparkleEffect on hover and triggers modal on click.
 *
 * Validates: Requirements 4.1, 4.4
 */
export function GalleryImage({ photo, onClick }: GalleryImageProps) {
    const isVideo = photo.type === "video" || photo.src.endsWith(".mp4");

    return (
        <SparkleEffect className="w-full">
            <button
                type="button"
                onClick={onClick}
                className="relative w-full overflow-hidden rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 cursor-pointer focus:outline-none focus:ring-2 focus:ring-pink-300 focus:ring-offset-2"
                aria-label={`View ${photo.alt} in fullscreen`}
            >
                {isVideo ? (
                    <div className="relative w-full">
                        <video
                            src={photo.src}
                            className="w-full h-auto object-cover"
                            muted
                            playsInline
                            preload="metadata"
                        />
                        <div className="absolute inset-0 flex items-center justify-center bg-black/20 hover:bg-black/30 transition-colors">
                            <svg className="w-16 h-16 text-white drop-shadow-lg" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" />
                            </svg>
                        </div>
                    </div>
                ) : (
                    <Image
                        src={photo.src}
                        alt={photo.alt}
                        width={400}
                        height={300}
                        className="w-full h-auto object-cover transition-transform duration-300 hover:scale-105"
                    />
                )}
            </button>
        </SparkleEffect>
    );
}

export default GalleryImage;
