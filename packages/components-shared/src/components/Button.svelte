<script lang="ts">
	import type { Snippet } from 'svelte';

	type Props = {
		debug?: boolean;
		disabled?: boolean;
		onclick: () => any;
		children: Snippet;
		'data-test'?: string;
		shape?: 'pill' | 'rounded';
	};

	const { debug, disabled = false, onclick, children, shape, ...rest }: Props = $props();
</script>

<button class="button" class:debug class:disabled class:rounded={shape === 'rounded'} class:pill={shape === 'pill'} {disabled} {onclick} {...rest}>
	{@render children()}
</button>

<style lang="scss">
	.button {
		width: 100%;
		position: relative;
		font-family: 'BungeeSpice-Regular', sans-serif;
		cursor: pointer;
		display: inline-flex;
		justify-content: center;
		background-color: transparent;
		border-color: transparent;
		padding: 0;

        /* Glow effect for modal buttons */
        box-shadow: 0 0 8px 2px rgba(37, 99, 235, 0.5), 0 0 24px 8px rgba(251, 191, 36, 0.2);
        transition: box-shadow 0.2s, color 0.2s;
	}

	.button.rounded {
		border-radius: 50%;
		width: 2.5rem;
		height: 2.5rem;
		padding: 0;
		align-items: center;
		justify-content: center;
		font-size: 1.5rem;
	}

	.button.pill {
		border-radius: 9999px;
	}

	.button.debug {
		border-color: white;
		border-width: 2px;
	}

	.button.disabled {
		cursor: not-allowed;
		opacity: 0.5;
	}

    .button:not(.disabled):hover,
    .button:not(.disabled):focus {
        box-shadow: 0 0 16px 4px rgba(37, 99, 235, 0.8), 0 0 32px 12px rgba(251, 191, 36, 0.4);
        color: #fff;
    }
</style>
