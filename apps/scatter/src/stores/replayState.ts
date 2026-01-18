import { writable } from 'svelte/store';

export const isReplayMode = writable<boolean>(false);
export const lastReplayGameId = writable<string | number | null>(null);

// Initialize from URL on load
if (typeof window !== 'undefined') {
	const params = new URLSearchParams(window.location.search);
	const isReplay = params.get('replay') === 'true';
	const gameId = params.get('game');
	
	isReplayMode.set(isReplay);
	if (gameId) {
		lastReplayGameId.set(gameId);
	}
}
