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
				<!-- Grenade mug shot sprite with sign - sized to fill board -->
				   <Sprite
					   texture="/assets/fonts/trashcan/trashcan.png"
					   anchor={{ x: 0.5, y: 0.5 }}
					   x={sizes.width * 0.5}
					   y={sizes.height * 0.5}
					   width={sizes.width * 1.2}
					   height={sizes.width * 1.2}
					   key="trashcan"
				   />

				<!-- Text on the sign (centered horizontally, positioned on sign vertically) -->
					<BitmapText
						anchor={{ x: 0.5, y: 0.5 }}
						x={sizes.width * 0.5}
						y={sizes.height * 0.38}
						text={freeSpinsFromEvent}
						style={{
							fontFamily: 'MildEast',
							fontSize: sizes.width * 0.09,
							fontWeight: 'bold',
						}}
						tint={0xffefe}
					/>

				<!-- "FREE" text below the number -->
					<BitmapText
						anchor={{ x: 0.5, y: 0.5 }}
						x={sizes.width * 0.5}
						y={sizes.height * 0.38 + sizes.width * 0.07}
						text="FREE"
						style={{
							fontFamily: 'MildEast',
							fontSize: sizes.width * 0.06,
							fontWeight: 'bold',
						}}
						tint={0xff0000}
					/>

				<!-- "SPINS" text below FREE -->
					<BitmapText
						anchor={{ x: 0.5, y: 0.5 }}
						x={sizes.width * 0.5}
						y={sizes.height * 0.38 + sizes.width * 0.13}
						text="SPINS"
						style={{
							fontFamily: 'MildEast',
							fontSize: sizes.width * 0.06,
							fontWeight: 'bold',
						}}
						tint={0xff0000}
					/>
		{/snippet}
	</FreeSpinAnimation>

	<PressToContinue onpress={() => oncomplete()} />
</FadeContainer>
