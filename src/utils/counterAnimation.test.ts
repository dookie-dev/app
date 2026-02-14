import * as fc from "fast-check";
import {
    easeOutCubic,
    calculateCounterValue,
    getFinalCounterValue,
} from "./counterAnimation";

/**
 * Property-based tests for counter animation
 * **Validates: Requirements 6.2**
 */
describe("counterAnimation", () => {
    /**
     * Property 6: Counter Animation Target Accuracy
     * For any AnimatedCounter with target value N, after the animation completes,
     * the displayed value SHALL equal exactly N.
     *
     * **Validates: Requirements 6.2**
     */
    describe("Property 6: Counter Animation Target Accuracy", () => {
        it("final counter value should equal target value for any integer", () => {
            fc.assert(
                fc.property(
                    fc.integer({ min: 0, max: 1000000 }),
                    (targetValue) => {
                        const finalValue = getFinalCounterValue(targetValue);
                        return finalValue === targetValue;
                    }
                ),
                { numRuns: 1000 }
            );
        });

        it("calculateCounterValue at progress=1 should equal end value", () => {
            fc.assert(
                fc.property(
                    fc.integer({ min: 0, max: 1000000 }),
                    (endValue) => {
                        const result = calculateCounterValue(0, endValue, 1);
                        return result === endValue;
                    }
                ),
                { numRuns: 1000 }
            );
        });

        it("calculateCounterValue at progress=0 should equal start value", () => {
            fc.assert(
                fc.property(
                    fc.integer({ min: 0, max: 1000 }),
                    fc.integer({ min: 0, max: 1000000 }),
                    (startValue, endValue) => {
                        const result = calculateCounterValue(startValue, endValue, 0);
                        return result === startValue;
                    }
                ),
                { numRuns: 1000 }
            );
        });

        it("counter value should be monotonically increasing during animation", () => {
            fc.assert(
                fc.property(
                    fc.integer({ min: 1, max: 10000 }),
                    (endValue) => {
                        let previousValue = 0;
                        // Check at 10 progress points
                        for (let i = 0; i <= 10; i++) {
                            const progress = i / 10;
                            const currentValue = calculateCounterValue(0, endValue, progress);
                            if (currentValue < previousValue) {
                                return false;
                            }
                            previousValue = currentValue;
                        }
                        return true;
                    }
                ),
                { numRuns: 500 }
            );
        });

        it("counter value should always be within [start, end] range", () => {
            fc.assert(
                fc.property(
                    fc.integer({ min: 0, max: 1000000 }),
                    fc.float({ min: 0, max: 1, noNaN: true }),
                    (endValue, progress) => {
                        const result = calculateCounterValue(0, endValue, progress);
                        return result >= 0 && result <= endValue;
                    }
                ),
                { numRuns: 1000 }
            );
        });
    });

    describe("easeOutCubic", () => {
        it("should return 0 when input is 0", () => {
            expect(easeOutCubic(0)).toBe(0);
        });

        it("should return 1 when input is 1", () => {
            expect(easeOutCubic(1)).toBe(1);
        });

        it("should return values between 0 and 1 for inputs between 0 and 1", () => {
            fc.assert(
                fc.property(
                    fc.float({ min: 0, max: 1, noNaN: true }),
                    (t) => {
                        const result = easeOutCubic(t);
                        return result >= 0 && result <= 1;
                    }
                ),
                { numRuns: 500 }
            );
        });

        it("should be monotonically increasing", () => {
            fc.assert(
                fc.property(
                    fc.float({ min: 0, max: Math.fround(0.99), noNaN: true }),
                    (t1) => {
                        const t2 = t1 + 0.01;
                        return easeOutCubic(t2) >= easeOutCubic(t1);
                    }
                ),
                { numRuns: 500 }
            );
        });
    });
});
