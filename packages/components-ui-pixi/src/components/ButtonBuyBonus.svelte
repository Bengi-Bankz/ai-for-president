<script lang="ts">
	import { Text, Sprite } from 'pixi-svelte';
	import { Button, type ButtonProps } from 'components-pixi';
	import { stateModal, stateBet, stateBetDerived } from 'state-shared';

	import UiSprite from './UiSprite.svelte';
	import { UI_BASE_FONT_SIZE, UI_BASE_SIZE } from '../constants';
	import { getContext } from '../context';
	import { i18nDerived } from '../i18n/i18nDerived';
	import { WHITE, DISABLED_SECONDARY } from 'constants-shared/colors';

	const props: Partial<Omit<ButtonProps, 'children'>> = $props();
	const { stateXstateDerived, eventEmitter } = getContext();
	const sizes = { width: UI_BASE_SIZE, height: UI_BASE_SIZE };
	// Removed disabled logic so button is always enabled
	const disabled = $derived(() => false);
	const active = $derived(stateBetDerived.activeBetMode()?.type === 'activate');

	// Calculate text color based on state
	const textColor = $derived(() => {
		return disabled ? DISABLED_SECONDARY : WHITE;
	});

	// Use fixed button variant for all states
	const buttonVariant = $derived(() => 'glow-blue');

	const openModal = () => (stateModal.modal = { name: 'buyBonus' });
	const disableActiveBetMode = () => (stateBet.activeBetModeKey = 'BASE');
	const onpress = () => {
		eventEmitter.broadcast({ type: 'soundPressGeneral' });

		if (active) {
			disableActiveBetMode();
		} else {
			openModal();
		}
	};

	const getState = (value: {
		active: boolean;
		disabled: boolean;
		hovered: boolean;
		pressed: boolean;
	}) => {
		if (value.disabled) return 'disabled' as const;
		if (value.pressed) return 'pressed' as const;
		if (value.hovered) return 'hovered' as const;
		if (value.active) return 'active' as const;
		return 'default' as const;
	};
</script>

<Button {...props} {sizes} {onpress} shape="pill">
	{#snippet children({ center, hovered, pressed })}
		{@const state = getState({
			active,
			hovered,
			pressed,
		})}

		<UiSprite
			key="buyBonus"
			{...center}
			anchor={0.5}
			width={sizes.width}
			height={sizes.height}
			variant={buttonVariant()}
			state={pressed ? 'pressed' : hovered ? 'hover' : 'normal'}
			showBorder={true}
			showShadow={true}
			borderRadius={18}
			{...active
				? {
						borderWidth: 6,
						borderColor: '#ffd700',
					}
				: {}}
		/>

		<Sprite
			key="beehive"
			width={sizes.width * 0.5}
			height={sizes.height * 0.5}
			anchor={-.5}
			y={-sizes.height * 0.15}
		/>

		<Text
			{...center}
			anchor={0.5}
			y={sizes.height * 0.78}
			text="Bonus"
			style={{
				align: 'center',
				fontFamily: 'BungeeSpice-Regular',
				fontSize: UI_BASE_SIZE * 0.25,
				fill: textColor(),
				dropShadow: true,
			}}
		/>
	{/snippet}
</Button>
