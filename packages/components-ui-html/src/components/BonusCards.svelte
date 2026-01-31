<script lang="ts">
	import { stateBet, stateModal, type BetModeData } from 'state-shared';
	import { Button } from 'components-shared';
	import { getContextEventEmitter } from 'utils-event-emitter';
	import { numberToCurrencyString } from 'utils-shared/amount';

	import BonusCard from './BonusCard.svelte';
	import { stateBonus } from '../stateBonus.svelte';
	import type { EmitterEventModal } from '../types';

	type Props = {
		list: BetModeData[];
		label?: string;
	};

	const props: Props = $props();
	const { eventEmitter } = getContextEventEmitter<EmitterEventModal>();
</script>

{#each props.list as betModeData}
	{#if betModeData.type !== 'default'}
		<BonusCard>
			{#snippet title()}
				<div class="title">
					{betModeData.text.title}
				</div>
			{/snippet}

			{#snippet description()}
				{#if betModeData?.text?.description}
					<div class="description">
						{betModeData.text.description}
					</div>
				{/if}
			{/snippet}

			{#snippet price()}
				<div class="price">
					{`${numberToCurrencyString(stateBet.betAmount * betModeData.costMultiplier)}`}
				</div>
			{/snippet}

			{#snippet button()}
				<Button
					variant="orange"
					size="medium"
					shape="pill"
					onclick={() => {
						stateBonus.selectedBetModeKey = betModeData.mode;
						eventEmitter.broadcast({ type: 'buyBonusConfirm' });
						eventEmitter.broadcast({ type: 'soundPressGeneral' });
					}}
					disabled={stateBet.betAmount <= 0 ||
						stateBet.balanceAmount < stateBet.betAmount * betModeData.costMultiplier}
				>
					<span class="button-text">
						{props.label ?? betModeData.text.button}
					</span>
				</Button>
			{/snippet}
		</BonusCard>
	{/if}
{/each}

<style lang="scss">
	.title {
		font-size: 1.1rem;
		line-height: 1.2rem;
		text-align: center;
		font-family: 'Crimes Times Six', sans-serif;
		color: #FFD700;
		text-shadow: 0 0 10px rgba(255, 215, 0, 0.5);
		font-weight: bold;
		text-transform: uppercase;
		letter-spacing: 1px;
	}

	.description {
		font-size: 0.8rem;
		text-align: center;
		min-height: 3.5rem;
		white-space: pre-line;
		display: inline-flex;
		align-items: center;
		justify-content: center;
		font-family: 'Crimes Times Six', sans-serif;
		color: #E8DCC4;
		line-height: 1.3;
	}

	.description:empty {
		display: none;
	}

	.price {
		font-size: 1.2rem;
		line-height: 1.2rem;
		text-align: center;
		white-space: nowrap;
		color: #00FF00;
		text-shadow: 0 0 8px rgba(0, 255, 0, 0.4);
		font-weight: bold;
		font-family: 'Crimes Times Six', sans-serif;
	}

	.button-text {
		font-size: 1rem;
		font-weight: bold;
		text-transform: uppercase;
		letter-spacing: 1px;
	}
</style>
