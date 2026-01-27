<script lang="ts" module>
	import type { WinLevelData } from '../game/winLevelMap';

	export type EmitterEventFreeSpinOutro =
		| { type: 'freeSpinOutroShow' }
		| { type: 'freeSpinOutroHide' }
		| { type: 'freeSpinOutroCountUp'; amount: number; winLevelData: WinLevelData };
</script>

<script lang="ts">
	import { Sprite, BitmapText } from 'pixi-svelte';
	import { FadeContainer, WinCountUpProvider, ResponsiveBitmapText } from 'components-pixi';
	import { bookEventAmountToCurrencyString } from 'utils-shared/amount';
	import { waitForResolve } from 'utils-shared/wait';
	import { CanvasSizeRectangle } from 'components-layout';
	import { OnMount } from 'components-shared';
	import { stateUrlDerived } from 'state-shared';

	import { getContext } from '../game/context';
	import FreeSpinAnimation from './FreeSpinAnimation.svelte';
	import PressToContinue from './PressToContinue.svelte';
	import WinCoins from './WinCoins.svelte';

	type AnimationName = 'intro' | 'idle';

	const context = getContext();

	let show = $state(true);
	let animationName = $state<AnimationName>('intro');
	let amount = $state(0);
	let winLevelData = $state<WinLevelData>();
	let oncomplete = $state(() => {});
	let onCountUpComplete = $state(() => {});

	context.eventEmitter.subscribeOnMount({
		freeSpinOutroShow: () => (show = true),
		freeSpinOutroHide: async () => (show = false),
		freeSpinOutroCountUp: async (emitterEvent) => {
			amount = emitterEvent.amount;
			winLevelData = emitterEvent.winLevelData;
			await waitForResolve((resolve) => (oncomplete = resolve));
		},
	});
</script>

<FadeContainer {show}>
	{#if winLevelData}
		{@const duration = winLevelData.presentDuration}
		{@const isBigWin = winLevelData.type === 'big'}
		<WinCountUpProvider {amount} {duration} oncomplete={() => onCountUpComplete()}>
			{#snippet children({ countUpAmount, startCountUp, finishCountUp, countUpCompleted })}
				<OnMount onmount={() => startCountUp()} />

				<CanvasSizeRectangle backgroundColor={0x000000} backgroundAlpha={0.5} />

				<FreeSpinAnimation>
					{#snippet children({ sizes })}
						<!-- Grenade mug shot sprite with sign - sized to fill board -->
						<Sprite
							anchor={{ x: 0.15, y: 0 }}
							width={sizes.width*1.5}
							height={sizes.height*1.5}
							key="trashcan"
						/>

						<!-- Winning amount text on the sign (same positioning as intro) -->
						<ResponsiveBitmapText
							anchor={{ x: 0.5, y: 0.5 }}
							x={sizes.width * 0.5}
							y={sizes.height * 0.5 + sizes.width * 0.206}
							style={{
								fontFamily: 'MildEast',
								fontSize: sizes.width * 0.12,
								fontWeight: 'bold',
							}}
							tint={0xff0000}
							text={bookEventAmountToCurrencyString(countUpAmount)}
							maxWidth={sizes.width * 0.5}
						/>

						<!-- "YOU WON" text below the amount -->
						<BitmapText
							anchor={{ x: 0.5, y: 0.5 }}
							x={sizes.width * 0.5}
							y={sizes.height * 0.5 + sizes.width * 0.206 + sizes.width * 0.14}
							text="YOU WON"
							style={{
								fontFamily: 'MildEast',
								fontSize: sizes.width * 0.05,
								fontWeight: 'bold',
							}}
							tint={0xff0000}
						/>
					{/snippet}
				</FreeSpinAnimation>

				<WinCoins emit={!countUpCompleted} levelAlias={winLevelData?.alias} />

				<PressToContinue onpress={() => (countUpCompleted ? oncomplete() : finishCountUp())} />
			{/snippet}
		</WinCountUpProvider>
	{/if}
</FadeContainer>
