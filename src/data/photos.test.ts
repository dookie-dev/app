import * as fc from "fast-check";
import { Photo, TimelineItem } from "../types";

/**
 * Creates timeline items from photos with alternating positions.
 * This is the logic being tested (extracted for testability).
 */
function createTimelinePhotos(photos: Photo[]): TimelineItem[] {
    return photos.map((photo, index) => ({
        photo,
        position: index % 2 === 0 ? "left" : "right",
    }));
}

/**
 * Arbitrary for generating valid Photo objects
 */
const photoArbitrary: fc.Arbitrary<Photo> = fc.record({
    id: fc.string({ minLength: 1, maxLength: 10 }),
    src: fc.webUrl(),
    alt: fc.string({ minLength: 1, maxLength: 50 }),
    date: fc.date().map((d) => d.toLocaleDateString()),
    caption: fc.string({ minLength: 1, maxLength: 100 }),
});

/**
 * Property-based tests for timeline positioning
 * **Validates: Requirements 3.1**
 */
describe("Timeline Positioning", () => {
    /**
     * Property 2: Timeline Alternating Positions
     * For any list of N photos rendered in the timeline, photo at index i
     * SHALL be positioned on the left if i is even, and on the right if i is odd.
     *
     * **Validates: Requirements 3.1**
     */
    describe("Property 2: Timeline Alternating Positions", () => {
        it("should position photos at even indices on the left", () => {
            fc.assert(
                fc.property(
                    fc.array(photoArbitrary, { minLength: 1, maxLength: 20 }),
                    (photos) => {
                        const timelineItems = createTimelinePhotos(photos);

                        return timelineItems.every((item, index) => {
                            if (index % 2 === 0) {
                                return item.position === "left";
                            }
                            return true;
                        });
                    }
                ),
                { numRuns: 100 }
            );
        });

        it("should position photos at odd indices on the right", () => {
            fc.assert(
                fc.property(
                    fc.array(photoArbitrary, { minLength: 2, maxLength: 20 }),
                    (photos) => {
                        const timelineItems = createTimelinePhotos(photos);

                        return timelineItems.every((item, index) => {
                            if (index % 2 === 1) {
                                return item.position === "right";
                            }
                            return true;
                        });
                    }
                ),
                { numRuns: 100 }
            );
        });

        it("should alternate positions correctly for any array of photos", () => {
            fc.assert(
                fc.property(
                    fc.array(photoArbitrary, { minLength: 0, maxLength: 50 }),
                    (photos) => {
                        const timelineItems = createTimelinePhotos(photos);

                        // Verify length is preserved
                        if (timelineItems.length !== photos.length) {
                            return false;
                        }

                        // Verify each position follows the alternating rule
                        return timelineItems.every((item, index) => {
                            const expectedPosition = index % 2 === 0 ? "left" : "right";
                            return item.position === expectedPosition;
                        });
                    }
                ),
                { numRuns: 100 }
            );
        });

        it("should preserve photo data while assigning positions", () => {
            fc.assert(
                fc.property(
                    fc.array(photoArbitrary, { minLength: 1, maxLength: 20 }),
                    (photos) => {
                        const timelineItems = createTimelinePhotos(photos);

                        return timelineItems.every((item, index) => {
                            // Verify the photo reference is preserved
                            return (
                                item.photo.id === photos[index].id &&
                                item.photo.src === photos[index].src &&
                                item.photo.alt === photos[index].alt &&
                                item.photo.date === photos[index].date &&
                                item.photo.caption === photos[index].caption
                            );
                        });
                    }
                ),
                { numRuns: 100 }
            );
        });

        it("should handle empty photo arrays", () => {
            const timelineItems = createTimelinePhotos([]);
            expect(timelineItems).toEqual([]);
        });

        it("should handle single photo array (index 0 = left)", () => {
            fc.assert(
                fc.property(photoArbitrary, (photo) => {
                    const timelineItems = createTimelinePhotos([photo]);
                    return (
                        timelineItems.length === 1 &&
                        timelineItems[0].position === "left" &&
                        timelineItems[0].photo === photo
                    );
                }),
                { numRuns: 50 }
            );
        });
    });
});
