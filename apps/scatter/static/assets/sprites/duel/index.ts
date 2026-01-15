import { createAsset } from 'pixi-svelte';

export const grenadeRobber = createAsset({
	img: new URL('./grenadeRobber.png', import.meta.url).href,
	preload: true,
});

export const donutCop = createAsset({
	img: new URL('./donutCop.png', import.meta.url).href,
	preload: true,
});

export default {
	grenadeRobber,
	donutCop,
};
