import GameReplayWrapper from './GameReplayWrapper.svelte';

export default {
	title: 'Game/Replay',
	component: GameReplayWrapper,
	argTypes: {
		isReplayMode: { control: 'boolean' },
		game: { control: 'text' },
		version: { control: 'text' },
		mode: { control: 'text' },
		event: { control: 'text' },
		rgs_url: { control: 'text' },
		currency: { control: 'text' },
		amount: { control: 'text' },
		lang: { control: 'text' },
		device: { control: 'text' },
		social: { control: 'text' },
	},
};

export const Replay = {
	args: {
		isReplayMode: true,
		game: 'scatter',
		version: '1',
		mode: 'BASE',
		event: '7',
		rgs_url: 'https://rgs.stake-engine.com',
		currency: 'USD',
		amount: '100',
		lang: 'en',
		device: 'desktop',
		social: 'false',
	},
};
