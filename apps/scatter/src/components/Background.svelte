<script lang="ts">
	import { Rectangle, Sprite } from 'pixi-svelte';
	import { FadeContainer } from 'components-pixi';
	import { SECOND } from 'constants-shared/time';

	import { BACKGROUND_RATIO, PORTRAIT_BACKGROUND_RATIO } from '../game/constants';
	import { getContext } from '../game/context';
	import BackgroundLayers from './BackgroundLayers.svelte';

	const context = getContext();
	const backgroundLayout = $derived(
		context.stateLayoutDerived.layoutType() === 'portrait'
			? context.stateLayoutDerived.portraitBackgroundLayout({ scale: 1 })
			: context.stateLayoutDerived.normalBackgroundLayout({ scale: 1 }),
	);
	const backgroundRatio = $derived(
		context.stateLayoutDerived.layoutType() === 'portrait'
			? PORTRAIT_BACKGROUND_RATIO
			: BACKGROUND_RATIO,
	);
	const backgroundSizes = $derived(() => {
		const layout = backgroundLayout as { width?: number; height?: number };
		if (layout.width !== undefined) {
			return {
				width: layout.width,
				height: layout.width / backgroundRatio,
			};
		}
		const height = layout.height ?? 0;
		return {
			width: height * backgroundRatio,
			height,
		};
	});
	const canvasSizes = $derived(context.stateLayoutDerived.canvasSizes());
	const canvasCenter = $derived({
		x: canvasSizes.width * 0.5,
		y: canvasSizes.height * 0.5,
	});
	const showBaseBackground = $derived(context.stateGame.gameType === 'basegame');
	const showFeatureBackground = $derived(context.stateGame.gameType === 'freeSpins');
</script>

<Rectangle {...context.stateLayoutDerived.canvasSizes()} backgroundColor={0x000000} zIndex={-3} />

<FadeContainer show={showBaseBackground} duration={SECOND} zIndex={-2}>
	<Sprite
		key="bgstatic"
		x={backgroundLayout.x}
		y={backgroundLayout.y}
		anchor={0.5}
		{...backgroundSizes}
	/>
</FadeContainer>

<FadeContainer show={showFeatureBackground} duration={SECOND} zIndex={-3}>
	<Sprite
		key="bgstatic"
		x={backgroundLayout.x}
		y={backgroundLayout.y}
		anchor={0.5}
		{...backgroundSizes}
	/>
</FadeContainer>

<BackgroundLayers
	x={canvasCenter.x}
	y={canvasCenter.y}
	width={canvasSizes.width}
	height={canvasSizes.height}
/>
