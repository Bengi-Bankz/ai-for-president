<script lang="ts">
	import { Sprite, Container } from 'pixi-svelte';
	import { onDestroy } from 'svelte';
	import { getContext } from '../game/context';

	type Winner = 'cowboy' | 'indian';

	type Props = {
		winner: Winner;
		x?: number;
		y?: number;
		width?: number;
		height?: number;
		spacing?: number;
		fps?: number;
		scale?: number;
		anchor?: { x: number; y: number };
		loop?: boolean;
		playSound?: boolean;
		oncomplete?: () => void;
	};

	const {
		winner,
		x = 0,
		y = 0,
		width = 132,
		height = 153,
		spacing = 150,
		fps = 24,
		scale = 1,
		anchor = { x: 0.5, y: 0.5 },
		loop = false,
		playSound = true,
		oncomplete,
	}: Props = $props();

	const context = getContext();

	// Frame counts for each animation (36 frames each based on file naming)
	const FRAME_COUNT = 36;

	// Get frame keys for cowboy and indian based on who wins
	function getCowboyFrameKeys(): string[] {
		const animType = winner === 'cowboy' ? 'cowboy_wins' : 'cowboy_dies';
		const frames: string[] = [];
		for (let i = 1; i <= FRAME_COUNT; i++) {
			frames.push(`${animType} (${i}).png`);
		}
		return frames;
	}

	function getIndianFrameKeys(): string[] {
		const animType = winner === 'indian' ? 'indian_wins' : 'indian_dies';
		const frames: string[] = [];
		for (let i = 1; i <= FRAME_COUNT; i++) {
			frames.push(`${animType} (${i}).png`);
		}
		return frames;
	}

	let cowboyFrameKeys = $derived(getCowboyFrameKeys());
	let indianFrameKeys = $derived(getIndianFrameKeys());
	let currentFrameIndex = $state(0);
	let interval: ReturnType<typeof setInterval> | null = null;

	$effect(() => {
		// Reset when winner changes
		currentFrameIndex = 0;
		startAnimation();
		
		// Play duel sound at start
		if (playSound) {
			context.eventEmitter?.broadcast({ type: 'soundOnce', name: 'duel' });
		}
		
		return () => {
			stopAnimation();
		};
	});

	function startAnimation() {
		stopAnimation();
		interval = setInterval(() => {
			currentFrameIndex++;
			if (currentFrameIndex >= FRAME_COUNT) {
				if (loop) {
					currentFrameIndex = 0;
				} else {
					stopAnimation();
					currentFrameIndex = FRAME_COUNT - 1;
					// Play winner sound when animation completes
					if (playSound) {
						const soundName = winner === 'cowboy' ? 'cowboywins' : 'indianwins';
						context.eventEmitter?.broadcast({ type: 'soundOnce', name: soundName });
					}
					oncomplete?.();
				}
			}
		}, 1000 / fps);
	}

	function stopAnimation() {
		if (interval) {
			clearInterval(interval);
			interval = null;
		}
	}

	onDestroy(() => {
		stopAnimation();
	});

	let cowboyKey = $derived(cowboyFrameKeys[currentFrameIndex] ?? cowboyFrameKeys[0]);
	let indianKey = $derived(indianFrameKeys[currentFrameIndex] ?? indianFrameKeys[0]);

	// Cowboy on left, Indian on right
	let cowboyX = $derived(-spacing / 2);
	let indianX = $derived(spacing / 2);
</script>

<Container {x} {y} {scale}>
	<!-- Cowboy (left side) -->
	<Sprite
		key={cowboyKey}
		x={cowboyX}
		y={0}
		{width}
		{height}
		{anchor}
	/>
	
	<!-- Indian (right side) -->
	<Sprite
		key={indianKey}
		x={indianX}
		y={0}
		{width}
		{height}
		{anchor}
	/>
</Container>
