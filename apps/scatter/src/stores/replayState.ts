import { writable } from 'svelte/store';

export const isReplayMode = writable<boolean>(false);
export const lastReplayGameId = writable<string | number | null>(null);
export const replayLoading = writable<boolean>(false);
export const replayError = writable<string | null>(null);
export const replayData = writable<any>(null);
export const replayReady = writable<boolean>(false);

// Initialize from URL on load, but skip if running in Storybook
if (typeof window !== 'undefined' && !window.__STORYBOOK__) {
	const params = new URLSearchParams(window.location.search);
	const isReplay = params.get('replay') === 'true';
	const gameId = params.get('game');

	isReplayMode.set(isReplay);
	if (gameId) {
		lastReplayGameId.set(gameId);
	}
}
