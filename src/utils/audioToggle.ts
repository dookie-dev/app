/**
 * Pure function to calculate audio muted state after K toggle operations.
 * Starting from muted state (true), each toggle inverts the state.
 * 
 * @param toggleCount - Number of toggle operations
 * @param initialMuted - Initial muted state (default: true)
 * @returns Final muted state after all toggles
 */
export function calculateMutedState(toggleCount: number, initialMuted: boolean = true): boolean {
    // Each toggle inverts the state
    // If toggleCount is even, state returns to initial
    // If toggleCount is odd, state is inverted from initial
    return toggleCount % 2 === 0 ? initialMuted : !initialMuted;
}
