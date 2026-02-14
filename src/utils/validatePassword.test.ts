import * as fc from "fast-check";
import { validatePassword } from "./validatePassword";
import { PASSWORD } from "@/constants";

/**
 * Property-based tests for password validation
 * **Validates: Requirements 1.6**
 */
describe("validatePassword", () => {
    /**
     * Property 1: Password Validation Correctness
     * For any input string, the password validation function SHALL return true
     * if and only if the input exactly equals "180861".
     *
     * **Validates: Requirements 1.6**
     */
    describe("Property 1: Password Validation Correctness", () => {
        it("should return true only for the correct password", () => {
            // The correct password should always return true
            expect(validatePassword(PASSWORD)).toBe(true);
            expect(validatePassword("180861")).toBe(true);
        });

        it("should return false for any arbitrary string that is not the password", () => {
            fc.assert(
                fc.property(
                    fc.string().filter((s) => s !== PASSWORD),
                    (input) => {
                        return validatePassword(input) === false;
                    }
                ),
                { numRuns: 1000 }
            );
        });

        it("should return false for strings that are similar but not exact matches", () => {
            fc.assert(
                fc.property(
                    fc.oneof(
                        // Strings with extra characters
                        fc.constant("180861 "),
                        fc.constant(" 180861"),
                        fc.constant("180861a"),
                        fc.constant("a180861"),
                        // Partial matches
                        fc.constant("18086"),
                        fc.constant("80861"),
                        fc.constant("1808"),
                        // Different numbers
                        fc.constant("180862"),
                        fc.constant("180860"),
                        fc.constant("280861"),
                        // Empty and whitespace
                        fc.constant(""),
                        fc.constant(" "),
                        // Case variations (though it's numeric)
                        fc.constant("ABCDEF")
                    ),
                    (input) => {
                        return validatePassword(input) === false;
                    }
                )
            );
        });

        it("should correctly distinguish the password from random numeric strings", () => {
            fc.assert(
                fc.property(
                    fc.stringMatching(/^[0-9]{1,10}$/),
                    (numericString) => {
                        const result = validatePassword(numericString);
                        const expected = numericString === PASSWORD;
                        return result === expected;
                    }
                ),
                { numRuns: 1000 }
            );
        });
    });
});
