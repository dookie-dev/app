import { PASSWORD } from "@/constants";

/**
 * Validates the input password against the hardcoded password.
 * Client-side validation without any backend calls.
 *
 * @param input - The password string to validate
 * @returns true if the input exactly equals the correct password, false otherwise
 *
 * Validates: Requirements 1.6, 1.7
 */
export function validatePassword(input: string): boolean {
    return input === PASSWORD;
}
