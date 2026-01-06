<script lang="ts">
	import { Text } from 'pixi-svelte';
	import { WHITE } from 'constants-shared/colors';

	import UiSprite from './UiSprite.svelte';
	import { UI_BASE_FONT_SIZE } from '../constants';

	type Props = {
		label: string;
		value: string;
		tiled?: boolean;
		stacked?: boolean;
		glowVariant?: 'glow-green' | 'glow-blue' | 'glow-purple' | 'glow-orange' | 'glow-pink' | 'dark';
		state?: 'normal' | 'hover' | 'pressed' | 'disabled';
		small?: boolean;
	};

	const props: Props = $props();

	const labelStyle = {
		fontFamily: 'BungeeSpice-Regular',
		fontSize: props.small ? UI_BASE_FONT_SIZE * 0.6 : UI_BASE_FONT_SIZE,
		fill: WHITE,
	} as const;

	const valueStyle = {
		fontFamily: 'BungeeSpice-Regular',
		fontSize: props.small ? UI_BASE_FONT_SIZE * 0.5 : UI_BASE_FONT_SIZE * 0.9,
		fill: WHITE,
	} as const;
</script>

{#if props.stacked}
	{#if props.tiled}
		<UiSprite
			y={-20}
			anchor={{ x: 0.5, y: 0 }}
			key="base_ticker"
			width={(props.small ? UI_BASE_FONT_SIZE * 0.9 : UI_BASE_FONT_SIZE * 1.5) * (246 / 73)}
			height={props.small ? UI_BASE_FONT_SIZE * 0.9 : UI_BASE_FONT_SIZE * 1.5}
			borderRadius={35}
			variant={props.glowVariant || 'glow-purple'}
			state={props.state || 'normal'}
		/>
	{/if}
	<Text anchor={{ x: 0.5, y: 0 }} text={props.label} style={labelStyle} />
	<Text anchor={{ x: 0.5, y: 0 }} text={props.value} style={valueStyle} y={UI_BASE_FONT_SIZE * (props.small ? 0.7 : 1)} />
{:else}
	{#if props.tiled}
		<UiSprite
			x={-90}
			anchor={{ x: 0, y: 0.5 }}
			key="base_ticker"
			width={(props.small ? UI_BASE_FONT_SIZE * 1.2 : UI_BASE_FONT_SIZE * 3) * (326 / 73)}
			height={props.small ? UI_BASE_FONT_SIZE * 1.2 : UI_BASE_FONT_SIZE * 3}
			borderRadius={35}
			variant={props.glowVariant || 'dark'}
			state={props.state || 'normal'}
		/>
	{/if}
	<Text anchor={{ x: 0, y: 0.5 }} text={props.label} style={labelStyle} x={-50} />
	<Text
		anchor={{ x: 1, y: 0.5 }}
		text={props.value}
		style={valueStyle}
		x={props.small ? UI_BASE_FONT_SIZE * 2.2 : UI_BASE_FONT_SIZE * 4}
	/>
{/if}