<script lang="ts">
	import type { ButtonProps } from 'components-pixi';
	import { stateBet, stateBetDerived } from 'state-shared';
	import UiButton from './UiButton.svelte';
	import { UI_BASE_SIZE } from '../constants';
	import { getContext } from '../context';
	import { Sprite } from 'pixi-svelte';

	const props: Partial<Omit<ButtonProps, 'children'>> = $props();
	const context = getContext();
	const sizes = { width: UI_BASE_SIZE, height: UI_BASE_SIZE };
	const active = $derived(stateBet.isTurbo);
	const disabled = $derived(stateBet.isSpaceHold);
	const spriteKey = $derived(active ? "turboon" : "turbooff");

	const onpress = () => {
		context.eventEmitter.broadcast({ type: 'soundPressGeneral' });
		stateBetDerived.updateIsTurbo(!stateBet.isTurbo, { persistent: true });
	};

	// Calculate glow variant based on turbo state
	const buttonVariant = $derived(() => {
		if (disabled) return 'dark';
		return active ? 'glow-orange' : 'glow-blue';
	});

	context.eventEmitter.subscribeOnMount({
		stopButtonClick: () => stateBetDerived.updateIsTurbo(true, { persistent: false }),
		stopButtonEnable: () => stateBetDerived.updateIsTurbo(false, { persistent: false }),
	});
</script>

<UiButton {...props} {sizes} {active} {onpress} {disabled} variant={buttonVariant()}>
	<Sprite key={spriteKey} width={sizes.width * 1} height={sizes.height * 1} anchor={0} />
</UiButton>
