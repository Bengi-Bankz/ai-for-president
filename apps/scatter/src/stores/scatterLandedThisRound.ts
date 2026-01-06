import { writable } from 'svelte/store';

// Tracks the number of scatters landed in the current round
export const scatterLandedThisRound = writable(0);

// Call scatterLandedThisRound.set(0) to reset at the start of each round
// Call scatterLandedThisRound.update(n => n + 1) when a scatter lands
