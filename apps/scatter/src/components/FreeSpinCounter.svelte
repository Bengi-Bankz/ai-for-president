<script lang="ts" module>
	export type EmitterEventFreeSpinCounter =
		| { type: 'freeSpinCounterShow' }
		| { type: 'freeSpinCounterHide' }
		| { type: 'freeSpinCounterUpdate'; current?: number; total?: number };
</script>

<script lang="ts">
	import { MainContainer } from 'components-layout';
	import { FadeContainer } from 'components-pixi';

	import { getContext } from '../game/context';
	import { SYMBOL_SIZE } from '../game/constants';
	import { anchorToPivot, BitmapText, Container, Sprite, type Sizes } from 'pixi-svelte';

	const context = getContext();
	const PANEL_KEY_DESKTOP = 'Frame_FSCounter.png';
	const PANEL_RATIO_DESKTOP = 824 / 622;
	const panelKey = PANEL_KEY_DESKTOP;
	const panelWidth = $derived(SYMBOL_SIZE * 2);
	const panelSizes = $derived({
		width: panelWidth,
		height: panelWidth / PANEL_RATIO_DESKTOP,
	});
	const scale = 1;
	const position = $derived({
		x:
			context.stateGameDerived.boardLayout().x -
			context.stateGameDerived.boardLayout().width * 0.5 -
			panelSizes.width -
			SYMBOL_SIZE * 0.7,
		y:
			context.stateGameDerived.boardLayout().y -
			context.stateGameDerived.boardLayout().height * 0.5 + SYMBOL_SIZE * 1.5, // Lowered by 1.5 symbol heights
	});


	const fontSize = SYMBOL_SIZE * 0.3;

	const isFreeSpins = $derived(context.stateGame.gameType === 'freegame');

	let show = $state(false);
	let current = $state(0);
	let total = $state(0);
	let titleSizes: Sizes = $state({ width: 0, height: 0 });
	let counterSizes: Sizes = $state({ width: 0, height: 0 });

	const textContainerSizes = $derived({
		width: titleSizes.width,
		height: titleSizes.height + counterSizes.height,
	});
	const counterPosition = $derived({ x: titleSizes.width / 2, y: titleSizes.height });

	context.eventEmitter.subscribeOnMount({
		freeSpinCounterShow: () => (show = true),
		freeSpinCounterHide: () => (show = false),
		freeSpinCounterUpdate: (emitterEvent) => {
			if (emitterEvent.current !== undefined) current = emitterEvent.current;
			if (emitterEvent.total !== undefined) total = emitterEvent.total;
		},
	});
</script>

<MainContainer>
	<FadeContainer show={true} {...position} {scale}>
		<Sprite key={panelKey} {...panelSizes} />
		<Container
			x={panelSizes.width * 0.5}
			y={panelSizes.height * 0.32}
			pivot={anchorToPivot({
				sizes: textContainerSizes,
				anchor: { x: 0.5, y: 0.5 },
			})}
		>
			{#if isFreeSpins}
				<BitmapText
					text={'FREE\nSPIN'}
					style={{
						fontFamily: 'MildEast',
						fontSize,
						wordWrap: false,
					}}
					tint={0xff0000}
					onresize={(sizes) => (titleSizes = sizes)}
				/>
				<BitmapText
					text={`${current} OF ${total}`}
					{...counterPosition}
					anchor={{ x: 0.5, y: 0 }}
					style={{
						fontFamily: 'MildEast',
						fontSize,
					}}
				/>
			{:else}
				<BitmapText
					text={'MAX WIN\n30,000X'}
					anchor={{ x: 0.5, y: 0 }}
					style={{
						fontFamily: 'MildEast',
						fontSize: fontSize * 0.9,
						fontWeight: 'bold',
					}}
					tint={0xffd700}
				/>
			{/if}
		</Container>
	</FadeContainer>
</MainContainer>
