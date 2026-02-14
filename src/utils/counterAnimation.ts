/**
 * Counter animation utility functions for calculating animated values.
 *
 * Validates: Requirements 6.2
 */

/**
 * Ease-out cubic easing function.
 * Provides a smooth deceleration effect.
 *
 * @param t - Progress value between 0 and 1
 * @returns Eased progress value between 0 and 1
 */
export function easeOutCubic(t: number): number {
    return 1 - Math.pow(1 - t, 3);
}

/**
 * Calculates the current counter value based on animation progress.
 *
 * @param startValue - The starting value (typically 0)
 * @param endValue - The target value to count to
 * @param progress - Animation progress between 0 and 1
 * @returns The current counter value (rounded to integer)
 *
 * Validates: Requirements 6.2
 */
export function calculateCounterValue(
    startValue: number,
    endValue: number,
    progress: number
): number {
    const clampedProgress = Math.min(Math.max(progress, 0), 1);
    const easedProgress = easeOutCubic(clampedProgress);
    return Math.round(startValue + (endValue - startValue) * easedProgress);
}

/**
 * Returns the final counter value after animation completes.
 * This is a pure function that guarantees the final value equals the target.
 *
 * @param endValue - The target value
 * @returns The final counter value (always equals endValue)
 *
 * Validates: Requirements 6.2
 */
export function getFinalCounterValue(endValue: number): number {
    return calculateCounterValue(0, endValue, 1);
}
