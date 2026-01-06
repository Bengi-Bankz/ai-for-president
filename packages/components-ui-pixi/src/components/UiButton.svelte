<script lang="ts">
	import { Text } from 'pixi-svelte';
	import { Button, type ButtonProps } from 'components-pixi';

	import UiSprite from './UiSprite.svelte';
	import type { ButtonIcon } from '../types';
	import type { Snippet } from 'svelte';
	import { i18nDerived } from '../i18n/i18nDerived';
	import { UI_BASE_FONT_SIZE } from '../constants';
	import { WHITE, BLACK, DISABLED_SECONDARY } from 'constants-shared/colors';

	type Props = Omit<ButtonProps, 'children'> & {
		icon: ButtonIcon;
		sizes: { width: number; height: number };
		active?: boolean;
		children?: Snippet;
		variant?: 'dark' | 'light' | 'accent' | 'glow-green' | 'glow-blue' | 'glow-purple' | 'glow-orange' | 'glow-pink';
	};

	const {
		icon,
		active,
		variant = 'dark',
		children: childrenFromParent,
		disabled,
		...buttonProps
	}: Props = $props();

	// Calculate text color based on variant and state
	const textColor = $derived(() => {
		if (disabled) return DISABLED_SECONDARY;
		
		// For glow variants, use white text
		if (variant.startsWith('glow-')) return WHITE;
		
		switch (variant) {
			case 'light':
				return BLACK;
			case 'dark':
			case 'accent':
			default:
				return WHITE;
		}
	});
</script>

<Button {...buttonProps} disabled={disabled}>
	{#snippet children({ center, hovered, pressed })}
		<UiSprite
			{...center}
			anchor={0.5}
			width={buttonProps.sizes.width}
			height={buttonProps.sizes.height}
			{variant}
			state={disabled ? 'disabled' : pressed ? 'pressed' : hovered ? 'hover' : 'normal'}
			showBorder={true}
			showShadow={true}
			{...active
				? {
						borderWidth: 4,
						borderColor: variant === 'light' ? BLACK : WHITE,
					}
				: {}}
		/>

	<Text
    {...center}
    anchor={0.5}
    text={typeof i18nDerived[icon] === 'function' ? i18nDerived[icon]() : ''}
    style={{
        align: 'center',
        wordWrap: true,
        wordWrapWidth: buttonProps.sizes.width + 20,
        fontFamily: 'BungeeSpice-Regular',
        fontWeight: '600',
        fontSize: UI_BASE_FONT_SIZE * .95,
        fill: textColor(),
    }}
/>
		{@render childrenFromParent?.()}
	{/snippet}
</Button>
