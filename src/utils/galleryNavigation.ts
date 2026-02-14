/**
 * Gallery navigation utility functions for handling wraparound behavior.
 *
 * Validates: Requirements 4.3
 */

/**
 * Calculates the next index when navigating forward in a gallery.
 * Wraps around to 0 when at the last index.
 *
 * @param currentIndex - The current photo index
 * @param totalPhotos - Total number of photos in the gallery (must be > 0)
 * @returns The next index with wraparound behavior
 *
 * Validates: Requirements 4.3
 */
export function navigateNext(currentIndex: number, totalPhotos: number): number {
    if (totalPhotos <= 0) {
        return 0;
    }
    return (currentIndex + 1) % totalPhotos;
}

/**
 * Calculates the previous index when navigating backward in a gallery.
 * Wraps around to N-1 when at index 0.
 *
 * @param currentIndex - The current photo index
 * @param totalPhotos - Total number of photos in the gallery (must be > 0)
 * @returns The previous index with wraparound behavior
 *
 * Validates: Requirements 4.3
 */
export function navigatePrev(currentIndex: number, totalPhotos: number): number {
    if (totalPhotos <= 0) {
        return 0;
    }
    return (currentIndex - 1 + totalPhotos) % totalPhotos;
}
