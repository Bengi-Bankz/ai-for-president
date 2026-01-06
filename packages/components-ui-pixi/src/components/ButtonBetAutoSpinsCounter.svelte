<script lang="ts">
	import { Text } from 'pixi-svelte';
	import { stateBet } from 'state-shared';
	import { WHITE } from 'constants-shared/colors';

	import UiSprite from './UiSprite.svelte';
	import { UI_BASE_SIZE } from '../constants';

	const fontSizeMultiplier = $derived.by(() => {
		if (stateBet.autoSpinsCounter === Infinity) return 3;
		if (stateBet.autoSpinsCounter > 99) return 1.5;
		if (stateBet.autoSpinsCounter > 9) return 2;
		return 2.5;
	});

	// Calculate glow variant based on counter value
	const counterVariant = $derived(() => {
		if (stateBet.autoSpinsCounter === Infinity) return 'glow-orange'; // Infinite spins - special
		if (stateBet.autoSpinsCounter <= 5) return 'glow-pink'; // Low count - attention
		return 'glow-green'; // Normal count
	});
</script>

{#if stateBet.autoSpinsCounter > 0}
	<UiSprite
		anchor={0.5}
		width={UI_BASE_SIZE * 0.9}
		height={UI_BASE_SIZE * 0.9}
		borderRadius={50}
		variant={counterVariant()}
		state="normal"
		showBorder={true}
		showShadow={true}
	/>
	<Text
		anchor={0.5}
		text={stateBet.autoSpinsCounter === Infinity ? '∞' : stateBet.autoSpinsCounter}
		style={{
			fontFamily: 'BungeeSpice-Regular, sans-serif',
			fill: WHITE,
			fontWeight: 'bold',
			fontSize: fontSizeMultiplier * UI_BASE_SIZE * 0.2,
		}}
	/>
{/if}
