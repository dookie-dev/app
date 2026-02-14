import * as fc from "fast-check";
import { navigateNext, navigatePrev } from "./galleryNavigation";

/**
 * Property-based tests for gallery navigation
 * **Validates: Requirements 4.3**
 */
describe("galleryNavigation", () => {
    /**
     * Property 5: Gallery Navigation Wraparound
     * For any gallery with N photos (N > 0), navigating forward from index N-1
     * SHALL result in index 0, and navigating backward from index 0 SHALL result in index N-1.
     *
     * **Validates: Requirements 4.3**
     */
    describe("Property 5: Gallery Navigation Wraparound", () => {
        it("navigating forward from last index (N-1) should wrap to index 0", () => {
            fc.assert(
                fc.property(
                    fc.integer({ min: 1, max: 10000 }),
                    (totalPhotos) => {
                        const lastIndex = totalPhotos - 1;
                        const result = navigateNext(lastIndex, totalPhotos);
                        return result === 0;
                    }
                ),
                { numRuns: 1000 }
            );
        });

        it("navigating backward from index 0 should wrap to last index (N-1)", () => {
            fc.assert(
                fc.property(
                    fc.integer({ min: 1, max: 10000 }),
                    (totalPhotos) => {
                        const result = navigatePrev(0, totalPhotos);
                        return result === totalPhotos - 1;
                    }
                ),
                { numRuns: 1000 }
            );
        });

        it("navigating forward then backward should return to original index", () => {
            fc.assert(
                fc.property(
                    fc.integer({ min: 1, max: 10000 }),
                    fc.integer({ min: 0, max: 9999 }),
                    (totalPhotos, rawIndex) => {
                        const currentIndex = rawIndex % totalPhotos;
                        const nextIndex = navigateNext(currentIndex, totalPhotos);
                        const backIndex = navigatePrev(nextIndex, totalPhotos);
                        return backIndex === currentIndex;
                    }
                ),
                { numRuns: 1000 }
            );
        });

        it("navigating backward then forward should return to original index", () => {
            fc.assert(
                fc.property(
                    fc.integer({ min: 1, max: 10000 }),
                    fc.integer({ min: 0, max: 9999 }),
                    (totalPhotos, rawIndex) => {
                        const currentIndex = rawIndex % totalPhotos;
                        const prevIndex = navigatePrev(currentIndex, totalPhotos);
                        const forwardIndex = navigateNext(prevIndex, totalPhotos);
                        return forwardIndex === currentIndex;
                    }
                ),
                { numRuns: 1000 }
            );
        });

        it("result of navigateNext should always be within valid bounds [0, N-1]", () => {
            fc.assert(
                fc.property(
                    fc.integer({ min: 1, max: 10000 }),
                    fc.integer({ min: 0, max: 9999 }),
                    (totalPhotos, rawIndex) => {
                        const currentIndex = rawIndex % totalPhotos;
                        const result = navigateNext(currentIndex, totalPhotos);
                        return result >= 0 && result < totalPhotos;
                    }
                ),
                { numRuns: 1000 }
            );
        });

        it("result of navigatePrev should always be within valid bounds [0, N-1]", () => {
            fc.assert(
                fc.property(
                    fc.integer({ min: 1, max: 10000 }),
                    fc.integer({ min: 0, max: 9999 }),
                    (totalPhotos, rawIndex) => {
                        const currentIndex = rawIndex % totalPhotos;
                        const result = navigatePrev(currentIndex, totalPhotos);
                        return result >= 0 && result < totalPhotos;
                    }
                ),
                { numRuns: 1000 }
            );
        });

        it("navigating forward N times from any index should return to original index", () => {
            fc.assert(
                fc.property(
                    fc.integer({ min: 1, max: 100 }),
                    fc.integer({ min: 0, max: 99 }),
                    (totalPhotos, rawIndex) => {
                        const startIndex = rawIndex % totalPhotos;
                        let currentIndex = startIndex;
                        for (let i = 0; i < totalPhotos; i++) {
                            currentIndex = navigateNext(currentIndex, totalPhotos);
                        }
                        return currentIndex === startIndex;
                    }
                ),
                { numRuns: 500 }
            );
        });

        it("navigating backward N times from any index should return to original index", () => {
            fc.assert(
                fc.property(
                    fc.integer({ min: 1, max: 100 }),
                    fc.integer({ min: 0, max: 99 }),
                    (totalPhotos, rawIndex) => {
                        const startIndex = rawIndex % totalPhotos;
                        let currentIndex = startIndex;
                        for (let i = 0; i < totalPhotos; i++) {
                            currentIndex = navigatePrev(currentIndex, totalPhotos);
                        }
                        return currentIndex === startIndex;
                    }
                ),
                { numRuns: 500 }
            );
        });
    });
});
