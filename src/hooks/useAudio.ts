'use client';

import { useState, useRef, useEffect, useCallback } from 'react';

interface UseAudioReturn {
    isPlaying: boolean;
    isMuted: boolean;
    toggle: () => void;
    play: () => void;
    pause: () => void;
    setMuted: (muted: boolean) => void;
}

export function useAudio(src: string): UseAudioReturn {
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isMuted, setIsMuted] = useState(false);

    useEffect(() => {
        const audio = new Audio(src);
        audio.loop = true;
        audio.muted = false;
        audioRef.current = audio;

        audio.play().catch(() => {});

        return () => {
            audio.pause();
            audio.src = '';
        };
    }, [src]);

    const play = useCallback(() => {
        if (audioRef.current) {
            audioRef.current.play().catch(() => {
                // Autoplay was prevented, handle gracefully
            });
            setIsPlaying(true);
        }
    }, []);

    const pause = useCallback(() => {
        if (audioRef.current) {
            audioRef.current.pause();
            setIsPlaying(false);
        }
    }, []);

    const setMuted = useCallback((muted: boolean) => {
        if (audioRef.current) {
            audioRef.current.muted = muted;
            setIsMuted(muted);
        }
    }, []);

    const toggle = useCallback(() => {
        if (audioRef.current) {
            const newMuted = !audioRef.current.muted;
            audioRef.current.muted = newMuted;
            setIsMuted(newMuted);

            if (!newMuted && !isPlaying) {
                play();
            }
        }
    }, [isPlaying, play]);

    return { isPlaying, isMuted, toggle, play, pause, setMuted };
}
