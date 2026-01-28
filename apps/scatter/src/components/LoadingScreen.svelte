<script lang="ts">
import { onMount, onDestroy } from 'svelte';
import FrameDisplay from '../framedisplay.svelte';
	import { Container, Sprite, Text } from 'pixi-svelte';
	import { FadeContainer, LoadingProgress } from 'components-pixi';
	import { MainContainer } from 'components-layout';

	import { getContext } from '../game/context';
	import TransitionAnimation from './TransitionAnimation.svelte';
	import PressToContinue from './PressToContinue.svelte';

	type Props = {
		onloaded: () => void;
		mode?: 'intro' | 'default';
	};

	const props: Props = $props();
	const context = getContext();
	const mode = $derived(props.mode ?? 'default');
	const layoutType = $derived(context.stateLayoutDerived.layoutType());
	const isPortrait = $derived(layoutType === 'portrait');

	let loadingType = $state<'start' | 'transition'>('start');
	let currentIndex = $state<number>(0);
	let carouselInterval: number | undefined;

	const introFrames = ['intro1.png', 'intro2.png', 'intro3.png'];

	const factWidth = 360;
	const factHeight = 500;
	const factGap = 16;
	const portraitRatio = 0.85; // percentage of main width for portrait card size
	const totalWidthRow = factWidth * introFrames.length + factGap * (introFrames.length - 1);

	// Use only the last 12 frames for loading animation
	const loadingFrames = Array.from({ length: 12 }, (_, i) => `loading_000 (${i + 25}).png`);

	onMount(() => {
		// auto-advance carousel every 3 seconds
		carouselInterval = window.setInterval(() => {
			currentIndex = (currentIndex + 1) % introFrames.length;
		}, 3000);
	});

	onDestroy(() => {
		if (carouselInterval) clearInterval(carouselInterval);
	});
</script>




<!-- logo and loading progress -->
<FadeContainer show={loadingType === 'start'}>
	<MainContainer>
		<Container
			x={context.stateLayoutDerived.mainLayout().width * 0.5 - 150}
			y={context.stateLayoutDerived.mainLayout().height * 0.25 - 150}
		>
			<FrameDisplay frameKeys={loadingFrames} assetKey="loading" width={300} height={300} loop />
			{#if !context.stateApp.loaded}
				<LoadingProgress y={250} width={1967 * 0.2} height={346 * 0.2}>
					{#snippet background(sizes)}
						<Sprite key="progressBarBackground.png" {...sizes} />
					{/snippet}
					{#snippet progress(sizes)}
						<Sprite key="progressBar.png" {...sizes} />
					{/snippet}
					{#snippet frame(sizes)}
						<Sprite key="progressBarFrame.png" {...sizes} />
					{/snippet}
				</LoadingProgress>
			{/if}
		</Container>

		<Container
			x={
				isPortrait
					? context.stateLayoutDerived.mainLayout().width * 0.5 - (context.stateLayoutDerived.mainLayout().width * portraitRatio) * 0.5
					: context.stateLayoutDerived.mainLayout().width * 0.5 - totalWidthRow * 0.5
			}
			y={context.stateLayoutDerived.mainLayout().height * 0.25 + 100}
		>
			<!-- carousel track: slides horizontally in portrait -->
			<Container x={isPortrait ? -currentIndex * (context.stateLayoutDerived.mainLayout().width * portraitRatio + factGap) : 0}>
				{#each introFrames as spriteKey, index}
					<Container x={index * (isPortrait ? (context.stateLayoutDerived.mainLayout().width * portraitRatio + factGap) : (factWidth + factGap))} y={0}>
						<Sprite
							assetKey={spriteKey}
							key={spriteKey}
							x={(isPortrait ? (context.stateLayoutDerived.mainLayout().width * portraitRatio) : factWidth) * 0.5}
							y={(isPortrait ? (context.stateLayoutDerived.mainLayout().width * portraitRatio) : factHeight) * 0.5}
							anchor={{ x: 0.5, y: 0.5 }}
							width={isPortrait ? context.stateLayoutDerived.mainLayout().width * portraitRatio : factWidth}
							height={isPortrait ? context.stateLayoutDerived.mainLayout().width * portraitRatio : factHeight}
						/>
					</Container>
				{/each}
			</Container>

			<!-- pagination dots (centered) -->
			<Container
				x={isPortrait ? (context.stateLayoutDerived.mainLayout().width * portraitRatio) * 0.5 - (introFrames.length * 16) * 0.5 : totalWidthRow * 0.5 - (introFrames.length * 16) * 0.5}
				y={isPortrait ? context.stateLayoutDerived.mainLayout().width * portraitRatio + 24 : factHeight + 24}
			>
				{#each introFrames as _, i}
					<Text
						x={i * 16}
						y={0}
						anchor={{ x: 0.5, y: 0.5 }}
						style={{ fontFamily: 'Crimes Times Six', fontSize: 18, fill: i === currentIndex ? 0xffffff : 0x888888 }}
						text={i === currentIndex ? '●' : '○'}
					/>
				{/each}
			</Container>
		</Container>

		<!-- Press to continue text between loader and info cards -->
		<Text
			x={context.stateLayoutDerived.mainLayout().width * 0.5}
			y={context.stateLayoutDerived.mainLayout().height * 0.25 + 60}
			anchor={{ x: 0.5, y: 0.5 }}
			style={{
				fontFamily: 'Crimes Times Six',
				fontSize: 28,
				fontWeight: '700',
				fill: 0xffffff,
				align: 'center',
			}}
			text="PRESS TO CONTINUE"
		/>
	</MainContainer>
</FadeContainer>

<!-- press to continue -->
<FadeContainer show={loadingType === 'start' && context.stateApp.loaded}>
	<PressToContinue onpress={() => (loadingType = 'transition')} />
</FadeContainer>

<!-- transition between the loading screen and the game -->
<FadeContainer show={loadingType === 'transition'}>
	<TransitionAnimation oncomplete={props.onloaded} />
</FadeContainer>
