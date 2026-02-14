export interface Photo {
    id: string;
    src: string;
    alt: string;
    date: string;
    caption: string;
    type?: "image" | "video";
}

export interface TimelineItem {
    photo: Photo;
    position: "left" | "right";
}

export interface GameState {
    score: number;
    isPlaying: boolean;
    hasWon: boolean;
}

export interface AuthState {
    isAuthenticated: boolean;
    isShaking: boolean;
}
