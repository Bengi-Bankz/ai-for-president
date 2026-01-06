<script lang="ts">
	import { Container, Sprite } from 'pixi-svelte';
	import type { ButtonProps } from 'components-pixi';
	import { stateBet, stateBetDerived, stateModal } from 'state-shared';

	import UiButton from './UiButton.svelte';
	import { getContext } from '../context';
	import { UI_BASE_SIZE } from '../constants';
	import ButtonBetAutoSpinsCounter from './ButtonBetAutoSpinsCounter.svelte';

	const props: Partial<Omit<ButtonProps, 'children'>> = $props();
	const context = getContext();
	const sizes = { width: UI_BASE_SIZE, height: UI_BASE_SIZE };
	const active = $derived(stateBetDerived.hasAutoBetCounter());
	// Always enabled
	const disabled = $derived(() => false);

	const stopAutoSpin = () => (stateBet.autoSpinsCounter = 0);
	const openModal = () => (stateModal.modal = { name: 'autoSpin' });
	const onpress = () => {
		context.eventEmitter.broadcast({ type: 'soundPressGeneral' });
		stateBetDerived.hasAutoBetCounter() ? stopAutoSpin() : openModal();
	};

	// Use fixed blue glow variant
	const buttonVariant = $derived(() => 'glow-blue');
</script>
<UiButton
	{...props}
	{sizes}
	{active}
	{onpress}
	variant={buttonVariant()}
>
	<Sprite key="auto" width={sizes.width} height={sizes.height} anchor={0} />
	<Container x={sizes.width * 0.4} y={sizes.height * 0.4}>
		<ButtonBetAutoSpinsCounter />
	</Container>
</UiButton>