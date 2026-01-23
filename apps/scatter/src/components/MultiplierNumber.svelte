<script lang="ts">
	import { Sprite } from 'pixi-svelte';

	type Props = {
		multiplier: number;
		color: 'blue' | 'red';
		x?: number;
		y?: number;
		scale?: number;
		width?: number;
		height?: number;
		anchor?: number | { x: number; y: number };
	};

	const props: Props = $props();

	// Map multiplier values to texture keys from the multinumbers spritesheet
	// The textures are named like "red_7.png", "blue_5.png", etc.
	const getTextureKey = (multiplier: number, color: 'blue' | 'red') => {
		return `${color}_${multiplier}.png`;
	};

	const textureKey = $derived(getTextureKey(props.multiplier, props.color));
</script>

<Sprite
	key={textureKey}
	anchor={props.anchor ?? 0.5}
	x={props.x}
	y={props.y}
	scale={props.scale}
	width={props.width}
	height={props.height}
/>
