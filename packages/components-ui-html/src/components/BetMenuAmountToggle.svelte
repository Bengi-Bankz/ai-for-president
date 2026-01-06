<script lang="ts">
	import { stateBet, stateConfig } from 'state-shared';
	import { Button, OptionsToggle } from 'components-shared';
	import { getContextEventEmitter } from 'utils-event-emitter';
	import { numberToCurrencyString } from 'utils-shared/amount';

	import type { EmitterEventModal } from '../types';

	const { eventEmitter } = getContextEventEmitter<EmitterEventModal>();
</script>

<OptionsToggle
	value={stateBet.betAmount}
	options={stateConfig.betAmountOptions}
	onchange={(value) => {
		stateBet.betAmount = value;
		eventEmitter.broadcast({ type: 'soundPressGeneral' });
	}}
>
	{#snippet children({ disabledDown, disabledUp, toggleDown, toggleUp })}
		<div class="toggle-wrap">
			<Button variant="blue" size="small" shape="rounded" data-test="down-button" disabled={disabledDown} onclick={toggleDown}>
				<span style="font-size: 1.5rem; font-weight: bold;">-</span>
			</Button>

			<span class="amount">{numberToCurrencyString(stateBet.betAmount)}</span>

			<Button variant="blue" size="small" shape="rounded" data-test="up-button" disabled={disabledUp} onclick={toggleUp}>
				<span style="font-size: 1.5rem; font-weight: bold;">+</span>
			</Button>
		</div>
	{/snippet}
</OptionsToggle>

<style lang="scss">
	.toggle-wrap {
		display: flex;
		flex-direction: row;
		align-items: center;
		gap: 0.5rem;
	}

	.amount {
		font-family: 'BungeeSpice-Regular', sans-serif;
		font-size: 1.2rem;
		font-weight: bold;
		text-shadow: 0 0 10px rgba(100, 149, 237, 0.5);
	}
</style>
