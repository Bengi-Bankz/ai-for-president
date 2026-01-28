<script lang="ts">
	import { onDestroy, onMount } from 'svelte';
	import { Container, Sprite, getContextApp } from 'pixi-svelte';
	import AnimatedSprite from './AnimatedSprite.svelte';

	const { x = 0, y = 0, width = 0, height = 0 } = $props<{
		x?: number;
		y?: number;
		width?: number;
		height?: number;
	}>();

	const context = getContextApp();

	const fireFrames = [
		'flame (1).png',
		'flame (2).png',
		'flame (3).png',
		'flame (4).png',
		'flame (5).png',
		'flame (6).png',
		'flame (7).png',
		'flame (8).png',
		'flame (9).png',
		'flame (10).png',
		'flame (11).png',
		'flame (12).png',
		'flame (13).png',
		'flame (14).png',
		'flame (15).png',
		'flame (16).png',
		'flame (17).png',
		'flame (18).png',
		'flame (19).png',
		'flame (20).png',
		'flame (21).png',
		'flame (22).png',
		'flame (23).png',
		'flame (24).png',
		'flame (25).png',
		'flame (26).png',
		'flame (27).png',
		'flame (28).png',
		'flame (29).png',
		'flame (30).png',
		'flame (31).png',
		'flame (32).png',
		'flame (33).png',
		'flame (34).png',
		'flame (35).png',
		'flame (36).png',
	];
	const arrowFrames = [
		'arrow (1).png',
		'arrow (2).png',
		'arrow (3).png',
		'arrow (4).png',
		'arrow (5).png',
		'arrow (6).png',
		'arrow (7).png',
		'arrow (8).png',
		'arrow (9).png',
		'arrow (10).png',
		'arrow (11).png',
		'arrow (12).png',
		'arrow (13).png',
		'arrow (14).png',
		'arrow (15).png',
		'arrow (16).png',
		'arrow (17).png',
		'arrow (18).png',
		'arrow (19).png',
		'arrow (20).png',
		'arrow (21).png',
		'arrow (22).png',
		'arrow (23).png',
		'arrow (24).png',
		'arrow (25).png',
		'arrow (26).png',
		'arrow (27).png',
		'arrow (28).png',
		'arrow (29).png',
		'arrow (30).png',
		'arrow (31).png',
		'arrow (32).png',
		'arrow (33).png',
		'arrow (34).png',
		'arrow (35).png',
		'arrow (36).png',
	];

	const hasTexture = (key: string) => {
		const texture = context.stateApp.loadedAssets?.[key] as { orig?: unknown } | undefined;
		return Boolean(texture && texture.orig);
	};

	const missingKeysLogged = new Set<string>();
	const requiredKeys = [
		'cloud1.png',
		'cloud2.png',
		'cloud3.png',
		'cloud4.png',
		...fireFrames,
		'canyon.png',
		...arrowFrames,
	];

	$effect(() => {
		const loadedAssets = context.stateApp.loadedAssets;
		if (!loadedAssets) return;
		requiredKeys.forEach((key) => {
			if (!hasTexture(key) && !missingKeysLogged.has(key)) {
				missingKeysLogged.add(key);
				console.warn(`[BackgroundLayers] Missing sprite key: ${key}`);
			}
		});
	});

	const cloudWidth1 = $derived(width * 0.55);
	const cloudHeight1 = $derived(height * 0.22);
	const cloudWidth2 = $derived(width * 0.45);
	const cloudHeight2 = $derived(height * 0.18);

	let cloudOffset1 = $state(0);
	let cloudOffset2 = $state(0);
	let lastCloudTick = 0;
	let cloudRaf: number | undefined;

	const updateClouds = (now: number) => {
		if (!lastCloudTick) lastCloudTick = now;
		const dt = now - lastCloudTick;
		lastCloudTick = now;

		const speed1 = width * 0.008;
		const speed2 = width * 0.012;
		const track1 = width + cloudWidth1;
		const track2 = width + cloudWidth2;

		cloudOffset1 = (cloudOffset1 + (speed1 * dt) / 1000) % track1;
		cloudOffset2 = (cloudOffset2 + (speed2 * dt) / 1000) % track2;

		cloudRaf = requestAnimationFrame(updateClouds);
	};

	onMount(() => {
		cloudRaf = requestAnimationFrame(updateClouds);
	});

	onDestroy(() => {
		if (cloudRaf) cancelAnimationFrame(cloudRaf);
	});
</script>

<Container zIndex={-1}>
	<!-- clouds -->
	{#if hasTexture('cloud1.png')}
		<Sprite
			key="cloud1.png"
			x={x - width * 0.5 + cloudOffset1 + cloudWidth1 * 0.5}
			y={y - height * 0.35}
			width={cloudWidth1}
			height={cloudHeight1}
			alpha={0.65}
		/>
		<Sprite
			key="cloud1.png"
			x={x - width * 0.5 + cloudOffset1 - (width + cloudWidth1) + cloudWidth1 * 0.5}
			y={y - height * 0.35}
			width={cloudWidth1}
			height={cloudHeight1}
			alpha={0.65}
		/>
	{/if}
	{#if hasTexture('cloud3.png')}
		<Sprite
			key="cloud3.png"
			x={x - width * 0.5 + cloudOffset2 + cloudWidth2 * 0.5}
			y={y - height * 0.25}
			width={cloudWidth2}
			height={cloudHeight2}
			alpha={0.5}
		/>
		<Sprite
			key="cloud3.png"
			x={x - width * 0.5 + cloudOffset2 - (width + cloudWidth2) + cloudWidth2 * 0.5}
			y={y - height * 0.25}
			width={cloudWidth2}
			height={cloudHeight2}
			alpha={0.5}
		/>
	{/if}

	<!-- flames -->
	<AnimatedSprite
		frames={fireFrames}
		fps={16}
		x={x - width * 0.425}
		y={y - height * 0.05}
		width={width * 0.04}
		height={height * 0.07}
	/>
	<AnimatedSprite
		frames={fireFrames}
		fps={16}
		x={x + width * 0.4}
		y={y - height * 0.07}
		width={width * 0.04}
		height={height * 0.07}
	/>

	<!-- arrows -->
	<AnimatedSprite
		frames={arrowFrames}
		fps={18}
		x={x - width * 0.3}
		y={y + height * 0.2}
		width={width * 0.07}
		height={width * 0.07}
		rotation={-0.1}
	/>
	<AnimatedSprite
		frames={arrowFrames}
		fps={18}
		x={x}
		y={y + height * 0.38}
		width={width * 0.07}
		height={width * 0.07}
		zIndex={10}
	/>
	<AnimatedSprite
		frames={arrowFrames}
		fps={18}
		x={x + width * 0.3}
		y={y + height * 0.25}
		width={width * 0.07}
		height={width * 0.07}
		rotation={0.08}
	/>
</Container>
