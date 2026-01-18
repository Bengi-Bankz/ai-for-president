import { createAsset } from 'pixi-svelte';

export const boardguy = createAsset({
	img: new URL('./sprite-256px-36 (3).png', import.meta.url).href,
	atlas: new URL('./boardguy.webp.json', import.meta.url).href,
	preload: true,
});

export const vsanimation = createAsset({
	atlas: new URL('./vsanimation.png.json', import.meta.url).href,
	preload: true,
});

export const copwins = createAsset({
	atlas: new URL('./copwins.png.json', import.meta.url).href,
	preload: true,
});

export const robberwins = createAsset({
	atlas: new URL('./robberwins.png.json', import.meta.url).href,
	preload: true,
});

export default {
	boardguy,
	vsanimation,
	copwins,
	robberwins,
};
