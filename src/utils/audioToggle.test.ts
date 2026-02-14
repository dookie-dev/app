import fc from 'fast-check';
import { calculateMutedState } from './audioToggle';

/**
 * Property 7: Audio Toggle State Consistency
 * For any sequence of K toggle operations on the Audio_Controller starting from muted state,
 * the final state SHALL be unmuted if K is odd, and muted if K is even.
 * 
 * **Validates: Requirements 8.3, 8.4**
 */
describe('Audio Toggle State Consistency', () => {
    it('should return muted (true) when toggle count is even, starting from muted', () => {
        fc.assert(
            fc.property(
                fc.nat(1000).map(n => n * 2), // Even numbers only
                (evenCount) => {
                    const result = calculateMutedState(evenCount, true);
                    return result === true;
                }
            )
        );
    });

    it('should return unmuted (false) when toggle count is odd, starting from muted', () => {
        fc.assert(
            fc.property(
                fc.nat(1000).map(n => n * 2 + 1), // Odd numbers only
                (oddCount) => {
                    const result = calculateMutedState(oddCount, true);
                    return result === false;
                }
            )
        );
    });

    it('should correctly alternate state for any sequence of toggles', () => {
        fc.assert(
            fc.property(
                fc.nat(100),
                (toggleCount) => {
                    const result = calculateMutedState(toggleCount, true);
                    const expectedMuted = toggleCount % 2 === 0;
                    return result === expectedMuted;
                }
            )
        );
    });

    it('should handle zero toggles (no change from initial state)', () => {
        expect(calculateMutedState(0, true)).toBe(true);
        expect(calculateMutedState(0, false)).toBe(false);
    });
});
