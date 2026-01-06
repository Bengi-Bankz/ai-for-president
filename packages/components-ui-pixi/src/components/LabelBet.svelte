<script lang="ts">
	import { Container } from 'pixi-svelte';
	import { stateBetDerived, stateModal } from 'state-shared';
	import { numberToCurrencyString } from 'utils-shared/amount';

	import UiLabel from './UiLabel.svelte';
	import { getContext } from '../context';
	import { i18nDerived } from '../i18n/i18nDerived';

	type Props = {
		stacked?: boolean;
	};

	const props: Props = $props();
	const context = getContext();
	const label = $derived(stateBetDerived.activeBetMode()?.text.betAmountLabel || i18nDerived.bet());
	const value = $derived(numberToCurrencyString(stateBetDerived.betCost()));
	// Always enabled
	const disabled = $derived(() => false);

	// Calculate glow variant based on bet mode
	const glowVariant = $derived(() => {
		const activeBetMode = stateBetDerived.activeBetMode();
		if (activeBetMode?.key === 'ANTEBET') return 'glow-orange';
		if (activeBetMode?.type === 'activate') return 'glow-purple';
		return 'glow-purple';
	});

	// Always normal state
	const labelState = $derived(() => 'normal');

	const onpress = () => {
		context.eventEmitter.broadcast({ type: 'soundPressGeneral' });
		stateModal.modal = { name: 'betAmountMenu' };
	};
</script>

<Container eventMode="static" cursor="pointer" onpointerup={onpress}>
	<UiLabel
		{label}
		{value}
		stacked={props.stacked}
		glowVariant={glowVariant()}
		state={labelState()}
		small={false}
		spriteKey="spin"
	/>
</Container>
