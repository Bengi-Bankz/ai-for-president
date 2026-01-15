import { createAsset } from 'pixi-svelte';

export const m = createAsset({
	img: new URL('./m.png', import.meta.url).href,
	preload: true,
});

export default m;
