<script lang="ts">
	import { OnMount } from 'components-shared';
	import { SECOND } from 'constants-shared/time';
	import { createEventDispatcher } from 'svelte';

	import { getContext } from '../game/context';
	import Anticipation from './Anticipation.svelte';

	const context = getContext();
	const dispatch = createEventDispatcher();

	const hasAnticipation = $derived(
		context.stateGame.board.some((reel) => reel.reelState.anticipating),
	);

	$effect(() => {
		const scatterCount = context.stateGame.board
			.flatMap((r) => r.reelState.symbols)
			.filter((s) => s.rawSymbol.name === 'S').length;
		if (scatterCount >= 3) {
			dispatch('shake');
		}
	});

	// Dispatch anticipationShake when anticipation starts
	$effect(() => {
		if (hasAnticipation) {
			dispatch('anticipationShake');
		}
	});
</script>

{#if hasAnticipation}
	<OnMount
		onmount={() => {
			context.eventEmitter.broadcast({ type: 'soundLoop', name: 'sfx_anticipation' });
			context.eventEmitter.broadcast({
				type: 'soundFade',
				name: 'sfx_anticipation',
				from: 0,
				to: 1,
				duration: SECOND,
			});

			return () => {
				context.eventEmitter.broadcast({ type: 'soundStop', name: 'sfx_anticipation' });
			};
		}}
	/>
{/if}

{#each context.stateGame.board as reel}
	{#if reel.reelState.anticipating}
		<Anticipation {reel} oncomplete={() => (reel.reelState.anticipating = false)} />
	{/if}
{/each}
