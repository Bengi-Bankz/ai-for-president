<script lang="ts">
	import { SpineProvider, SpineTrack } from 'pixi-svelte';
	import { getContext } from '../game/context';
	import FramedDisplay from '../framedisplay.svelte';
	import { writable } from 'svelte/store';

	type Props = {
		oncomplete: () => void;
	};

	const props: Props = $props();
	const context = getContext();

	const spriteX = writable(-300);
	let animationActive = true;

	function animateAcross() {
		const endX = context.stateLayoutDerived.canvasSizes().width * 0.5 - 137;
		const duration = 1200;
		const start = performance.now();
		function step(now: number) {
			const elapsed = now - start;
			if (elapsed < duration) {
				spriteX.set(-300 + ((endX + 300) * (elapsed / duration)));
				requestAnimationFrame(step);
			} else {
				spriteX.set(endX);
				setTimeout(() => {
					animationActive = false;
					props.oncomplete();
				}, 800);
			}
		}
		requestAnimationFrame(step);
	}

	$effect(() => {
		if (animationActive) animateAcross();
	});
</script>

<SpineProvider
	key="transition"
	x={context.stateLayoutDerived.canvasSizes().width * 0.5}
	y={context.stateLayoutDerived.canvasSizes().height * 0.5}
	height={context.stateLayoutDerived.canvasSizes().height * 1.7}
>
	<SpineTrack
		trackIndex={0}
		animationName={'animation'}
		listener={{
			complete: props.oncomplete,
		}}
	/>
</SpineProvider>

<FramedDisplay
	frameKeys={[
		"1.png", "2.png", "3.png", "4.png", "5.png", "6.png", "7.png", "8.png", "9.png", "10.png",
		"11.png", "12.png", "13.png", "14.png", "15.png", "16.png", "17.png", "18.png", "19.png", "20.png",
		"21.png", "22.png", "23.png", "24.png", "25.png", "26.png", "27.png", "28.png"
	]}
	x={context.stateLayoutDerived.canvasSizes().width * 0.5 - 137}
	y={context.stateLayoutDerived.canvasSizes().height * 0.5 - 144}
	width={275}
	height={288}
	fps={20}
	scale={2}
/>
