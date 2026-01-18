<script lang="ts">
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

	const introFacts = [
		{ title: 'RTP', detail: '97% base & bonus' },
		{ title: 'Max Award', detail: '30,000× potential' },
		{ title: 'Bonus Buy', detail: 'Jump in for 200×' },
	];

	const factWidth = 220;
	const factHeight = 220;
	const factGap = 16;
	const totalWidthRow = factWidth * introFacts.length + factGap * (introFacts.length - 1);

	// Generate array of frame keys for loading animation
	const loadingFrames = Array.from({ length: 36 }, (_, i) => `loading_000 (${i + 1}).png`);
</script>




<!-- logo and loading progress -->
<FadeContainer show={loadingType === 'start'}>
	<MainContainer>
		<Container
			x={context.stateLayoutDerived.mainLayout().width * 0.5 - 150}
			y={context.stateLayoutDerived.mainLayout().height * 0.5 - 150}
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

		{#if mode === 'intro'}
			<Container
				x={
					isPortrait
						? context.stateLayoutDerived.mainLayout().width * 0.5 - factWidth * 0.5
						: context.stateLayoutDerived.mainLayout().width * 0.5 - totalWidthRow * 0.5
				}
				y={context.stateLayoutDerived.mainLayout().height * 0.5 + 200}
			>
				{#each introFacts as fact, index}
					<Container
						x={isPortrait ? 0 : index * (factWidth + factGap)}
						y={isPortrait ? index * (factHeight + factGap) : 0}
					>
						<Sprite
							key="roundedrec.png"
							width={factWidth}
							height={factHeight}
							alpha={0.9}
						/>
						<Text
							x={factWidth * 0.5}
							y={factHeight * 0.5}
							anchor={{ x: 0.5, y: 0.5 }}
							style={{
								fontFamily: 'Arial',
								fontSize: 20,
								fontWeight: '700',
								fill: 0xffffff,
								align: 'center',
							}}
							text={`${fact.title}: ${fact.detail}`}
						/>
					</Container>
				{/each}
			</Container>
		{/if}
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
