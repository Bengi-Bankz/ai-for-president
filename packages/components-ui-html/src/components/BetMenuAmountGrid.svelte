<script lang="ts">
	import { OptionsGrid } from 'components-shared';
	import { getContextLayout } from 'utils-layout';
	import { stateBet, stateConfig } from 'state-shared';

	import { i18nDerived } from '../i18n/i18nDerived';

	const { stateLayoutDerived } = getContextLayout();
	// Use all available bet amounts from RGS, not limited by count
	const options = $derived(stateConfig.betMenuOptions);

	const isMaxValue = (value: number) => value === options[options.length - 1];
	const formatValue = (value: number) => {
		if (Math.abs(value) > 999999) {
			return `${(Math.abs(value) / 1000000).toFixed(2)}M`;
		}
		if (Math.abs(value) > 999) {
			return `${(Math.abs(value) / 1000).toFixed(2)}K`;
		}
		return Math.abs(value).toFixed(2);
	};
</script>

<OptionsGrid
	value={stateBet.betAmount}
	{options}
	variant="green"
	size="medium"
	shape="rounded"
	onchange={(value) => (stateBet.betAmount = value)}
>
	{#snippet option({ option })}
		<span style="font-size: 1rem; font-weight: bold;">
			{isMaxValue(option) ? i18nDerived.max() : formatValue(option)}
		</span>
	{/snippet}
</OptionsGrid>
