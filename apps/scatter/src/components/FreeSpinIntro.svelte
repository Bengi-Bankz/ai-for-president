<script lang="ts" module>
	export type EmitterEventFreeSpinIntro =
		| { type: 'freeSpinIntroShow' }
		| { type: 'freeSpinIntroHide' }
		| { type: 'freeSpinIntroUpdate'; totalFreeSpins: number };
</script>

<script lang="ts">
	import { CanvasSizeRectangle } from 'components-layout';
	import { stateUrlDerived } from 'state-shared';
	import { FadeContainer } from 'components-pixi';
	import { waitForResolve } from 'utils-shared/wait';
	import { BitmapText, SpineProvider, SpineSlot, SpineTrack, Sprite } from 'pixi-svelte';

	import { getContext } from '../game/context';
	import PressToContinue from './PressToContinue.svelte';
	import FreeSpinAnimation from './FreeSpinAnimation.svelte';

	type AnimationName = 'intro' | 'idle';

	const context = getContext();

	let show = $state(false);
	let animationName = $state<AnimationName>('intro');
	let freeSpinsFromEvent = $state(0);
	let oncomplete = $state(() => {});

	context.eventEmitter.subscribeOnMount({
		freeSpinIntroShow: () => (show = true),
		freeSpinIntroHide: () => (show = false),
		freeSpinIntroUpdate: async (emitterEvent) => {
			// if (emitterEvent.extraSpins) {
			// 	context.eventEmitter.broadcast({ type: 'soundOnce', name: 'sfx_fs_respins' });
			// }
			// freeSpinsFromEvent = emitterEvent.extraSpins ?? emitterEvent.totalFreeSpins;
			freeSpinsFromEvent = emitterEvent.totalFreeSpins;
			await waitForResolve((resolve) => (oncomplete = resolve));
		},
	});
</script>

<FadeContainer {show}>
	<CanvasSizeRectangle backgroundColor={0x000000} backgroundAlpha={0.5} />

	<FreeSpinAnimation>
		{#snippet children({ sizes })}
				<!-- Wanted poster - 1024x1024 square, fit to container maintaining aspect ratio -->
				{@const posterSize = Math.min(sizes.width, sizes.height) * 1.1}
				<Sprite
					key="fs_intro.png"
					anchor={{ x: 0.5, y: 0.5 }}
					x={sizes.width * 0.5}
					y={sizes.height * 0.5}
					width={posterSize}
					height={posterSize}
				/>

				<!-- Number of spins - positioned in the box below "SPINS AWARDED" (roughly 75% down the poster) -->
				<BitmapText
					anchor={{ x: 0.5, y: 0.5 }}
					x={sizes.width * 0.5}
					y={sizes.height * 0.5 + posterSize * 0.35}
					text={freeSpinsFromEvent}
					style={{
						fontFamily: 'MildEast',
						fontSize: posterSize * 0.15,
						fontWeight: 'bold',
					}}
					tint={0x000000}
				/>
		{/snippet}
	</FreeSpinAnimation>

	<PressToContinue onpress={() => oncomplete()} />
</FadeContainer>
