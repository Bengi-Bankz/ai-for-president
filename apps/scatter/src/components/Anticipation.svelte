
<script lang="ts">
import { getContext } from '../game/context';
import type { Reel } from '../game/stateGame.svelte';
import { REEL_PADDING, SYMBOL_SIZE } from '../game/constants';
import assets from '../game/assets';
import AnimatedSprite from './AnimatedSprite.svelte';

type Props = {
	reel: Reel;
	oncomplete: () => void;
};

const props: Props = $props();
const context = getContext();

// Calculate position for the anticipation effect on the reel
const boardLayout = context.stateGameDerived.boardLayout();
const anticipationX = boardLayout.x - boardLayout.width * 0.5 + (props.reel.reelIndex + REEL_PADDING) * SYMBOL_SIZE;
const anticipationY = boardLayout.y - SYMBOL_SIZE * 0.06;

// Use all frames from anticipation.webp.json
const anticipationData = assets.anticipation1;
const anticipationSrc = anticipationData?.src;
// List all frame keys in order
const anticipationFrames = anticipationSrc
	? [
		...Array(36).fill(0).map((_, i) => `anticipation (${i + 1}).png`)
	]
	: [];
const anticipationScale = {
	x: (SYMBOL_SIZE / 273) * 3.5, // wider
	y: (SYMBOL_SIZE / 273) * 6.0  // shorter
};

let visible = true;

$effect(() => {
	if (props.reel.reelState.motion === 'stopped') {
		visible = false;
		props.oncomplete();
	}
});
</script>

{#if visible}
	<AnimatedSprite
		src={anticipationSrc}
		frames={anticipationFrames}
		fps={30}
		x={anticipationX}
		y={anticipationY}
		anchor={{ x: 0.5, y: 0.5 }}
		scale={anticipationScale}
	/>
{/if}
