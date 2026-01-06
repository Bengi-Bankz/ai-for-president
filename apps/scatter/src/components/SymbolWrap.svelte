<script lang="ts">
	import type { Snippet } from 'svelte';
	import { tweened } from 'svelte/motion';
	import { Container } from 'pixi-svelte';
	import { getContextBoard } from 'components-shared';

	import { SYMBOL_SIZE, BOARD_DIMENSIONS } from '../game/constants';
	import type { SymbolState } from '../game/types';

	type Props = {
		x: number;
		y: number;
		animating: boolean;
		state: SymbolState;
		children: Snippet;
	};

	const props: Props = $props();
	const boardContext = getContextBoard();
	const show = $derived(
		(boardContext.animate && props.animating) || (!boardContext.animate && !props.animating),
	);
	const top = 0;
	const bottom = SYMBOL_SIZE * BOARD_DIMENSIONS.y;
	const inFrame = $derived(props.y >= top && props.y <= bottom);

	const scale = tweened(1, { duration: 300 });
	let pulseInterval: number;

	$effect(() => {
		if (props.state === 'win') {
			let direction = 1;
			pulseInterval = setInterval(() => {
				const target = direction === 1 ? 1.2 : 1;
				scale.set(target);
				direction = -direction;
			}, 300);
		} else {
			if (pulseInterval) clearInterval(pulseInterval);
			scale.set(1);
		}

		return () => {
			if (pulseInterval) clearInterval(pulseInterval);
		};
	});
</script>

{#if show && inFrame}
	<Container x={props.x} y={props.y} scale={$scale}>
		{@render props.children()}
	</Container>
{/if}
