<script lang="ts" module>
	import { Rectangle, type RectangleProps } from 'pixi-svelte';

	export type Props = RectangleProps & {
		variant?: 'dark' | 'light' | 'accent' | 'bonus-active' | 'glow-green' | 'glow-blue' | 'glow-purple' | 'glow-orange' | 'glow-pink';
		state?: 'normal' | 'hover' | 'pressed' | 'disabled';
		showShadow?: boolean;
		showBorder?: boolean;
		glowIntensity?: number;
	};
</script>

<script lang="ts">
	import {
		DARK_BUTTON_PRIMARY,
		DARK_BUTTON_HOVER,
		LIGHT_BUTTON_PRIMARY,
		LIGHT_BUTTON_HOVER,
		ACCENT_PRIMARY,
		ACCENT_SECONDARY,
		BONUS_ACTIVE_PRIMARY,
		BONUS_ACTIVE_SECONDARY,
		DISABLED_PRIMARY,
		BORDER_DARK,
		BORDER_LIGHT,
		BORDER_ACCENT,
		BORDER_BONUS_ACTIVE,
	} from 'constants-shared/colors';

	const {
		variant = 'dark',
		state = 'normal',
		showShadow = true,
		showBorder = true,
		glowIntensity = 0.8,
		backgroundColor,
		borderColor,
		borderWidth,
		...props
	}: Props = $props();

	// Glow colors for different variants
	const glowColors = {
		'glow-green': '#00ff41',
		'glow-blue': '#00ff41',
		'glow-purple': '#00ff41',
		'glow-orange': '#00ff41',
		'glow-pink': '#ec4899'
	};

	// Calculate background color based on variant and state
	const computedBackgroundColor = $derived(() => {
		if (backgroundColor !== undefined) return backgroundColor;

		if (state === 'disabled') return DISABLED_PRIMARY;

		// Glow variants with semi-transparent backgrounds
		if (variant.startsWith('glow-')) {
			const baseColor = glowColors[variant as keyof typeof glowColors];
			return state === 'hover' ? baseColor + '40' : baseColor + '10'; // 25% and 12.5% opacity
		}

		switch (variant) {
			case 'light':
				return state === 'hover' ? LIGHT_BUTTON_HOVER : LIGHT_BUTTON_PRIMARY;
			case 'accent':
				return state === 'hover' ? ACCENT_SECONDARY : ACCENT_PRIMARY;
			case 'bonus-active':
				return state === 'hover' ? BONUS_ACTIVE_SECONDARY : BONUS_ACTIVE_PRIMARY;
			case 'dark':
			default:
				return state === 'hover' ? DARK_BUTTON_HOVER : DARK_BUTTON_PRIMARY;
		}
	});

	// Calculate border color for glow effects
	const computedBorderColor = $derived(() => {
		if (borderColor !== undefined) return borderColor;
		
		if (variant.startsWith('glow-')) {
			return glowColors[variant as keyof typeof glowColors];
		}
		
		return '#fff';
	});
	
	// Calculate border width for glow effects
	const computedBorderWidth = $derived(() => {
		if (borderWidth !== undefined) return borderWidth;
		
		if (variant.startsWith('glow-')) {
			return state === 'hover' ? 6 : 4; // Thicker border on hover
		}
		
		return 4;
	});
</script>

<Rectangle
	borderRadius={18}
	backgroundColor={computedBackgroundColor()}
	borderColor={computedBorderColor()}
	borderWidth={computedBorderWidth()}
	{...props}
/>

<!-- ADD YOUR DESIGN -->

<!-- <script lang="ts" module>
	import { Sprite, type SpriteProps } from 'pixi-svelte';
	import type { sharedAssetsPixi } from 'constants-shared/assets';

	export type Props = SpriteProps & {
		key: keyof typeof sharedAssetsPixi;
	};
</script>

<script lang="ts">
	const props: Props = $props();
</script>

<Sprite {...props} /> -->
