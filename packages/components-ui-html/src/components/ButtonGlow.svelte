<script lang="ts">
	interface Props {
		/**
		 * The content to display inside the button
		 */
		children?: import('svelte').Snippet;
		/**
		 * Button click handler
		 */
		onclick?: () => void;
		/**
		 * Whether the button is disabled
		 */
		disabled?: boolean;
		/**
		 * Additional CSS classes
		 */
		class?: string;
		/**
		 * Button size variant
		 */
		size?: 'small' | 'medium' | 'large';
		/**
		 * Color theme variant
		 */
		variant?: 'green' | 'blue' | 'purple' | 'orange' | 'red';
		/**
		 * Shape variant
		 */
		shape?: 'default' | 'round' | 'square' | 'pill' | 'rounded-square';
	}

	let {
		children,
		onclick,
		disabled = false,
		class: className = '',
		size = 'medium',
		variant = 'green',
		shape = 'default'
	}: Props = $props();

	const sizeClasses = {
		small: 'glow-button--small',
		medium: 'glow-button--medium',
		large: 'glow-button--large'
	};

	const variantClasses = {
		green: 'glow-button--green',
		blue: 'glow-button--blue',
		purple: 'glow-button--purple',
		orange: 'glow-button--orange',
		red: 'glow-button--red'
	};

	const shapeClasses = {
		default: '',
		round: 'glow-button--round',
		square: 'glow-button--square',
		pill: 'glow-button--pill',
		'rounded-square': 'glow-button--rounded-square'
	};
</script>

<button
	class="glow-button {sizeClasses[size]} {variantClasses[variant]} {shapeClasses[shape]} {className}"
	{onclick}
	{disabled}
	type="button"
>
	{#if children}
		{@render children()}
	{/if}
</button>

<style>
	.glow-button {
		font-size: 15px;
		padding: 0.7em 2.7em;
		letter-spacing: 0.06em;
		position: relative;
		font-family: inherit;
		border-radius: 0.6em;
		overflow: hidden;
		transition: all 0.3s;
		line-height: 1.4em;
		border: 2px solid var(--glow-color);
		background: linear-gradient(to right, var(--glow-bg-start) 1%, transparent 40%, transparent 60%, var(--glow-bg-end) 100%);
		color: var(--glow-color);
		box-shadow: inset 0 0 10px var(--glow-shadow-inner), 0 0 9px 3px var(--glow-shadow-outer);
		cursor: pointer;
		font-weight: 600;
		text-transform: uppercase;
	}

	.glow-button:disabled {
		cursor: not-allowed;
		opacity: 0.5;
		pointer-events: none;
	}

	.glow-button:hover:not(:disabled) {
		color: var(--glow-color-hover);
		box-shadow: inset 0 0 10px var(--glow-shadow-inner-hover), 0 0 9px 3px var(--glow-shadow-outer-hover);
	}

	.glow-button:before {
		content: "";
		position: absolute;
		left: -4em;
		width: 4em;
		height: 100%;
		top: 0;
		transition: transform 0.4s ease-in-out;
		background: linear-gradient(to right, transparent 1%, var(--glow-sweep-start) 40%, var(--glow-sweep-end) 60%, transparent 100%);
	}

	.glow-button:hover:not(:disabled):before {
		transform: translateX(15em);
	}

	/* Size variants */
	.glow-button--small {
		font-size: 12px;
		padding: 0.5em 2em;
		border-radius: 0.5em;
	}

	.glow-button--medium {
		font-size: 15px;
		padding: 0.7em 2.7em;
		border-radius: 0.6em;
	}

	.glow-button--large {
		font-size: 18px;
		padding: 1em 3.5em;
		border-radius: 0.8em;
	}

	/* Green variant (original) */
	.glow-button--green {
		--glow-color: #1BFD9C;
		--glow-color-hover: #82ffc9;
		--glow-bg-start: rgba(27, 253, 156, 0.1);
		--glow-bg-end: rgba(27, 253, 156, 0.1);
		--glow-shadow-inner: rgba(27, 253, 156, 0.4);
		--glow-shadow-outer: rgba(27, 253, 156, 0.1);
		--glow-shadow-inner-hover: rgba(27, 253, 156, 0.6);
		--glow-shadow-outer-hover: rgba(27, 253, 156, 0.2);
		--glow-sweep-start: rgba(27, 253, 156, 0.1);
		--glow-sweep-end: rgba(27, 253, 156, 0.1);
	}

	/* Blue variant */
	.glow-button--blue {
		--glow-color: #1BAAFD;
		--glow-color-hover: #82D4FF;
		--glow-bg-start: rgba(27, 170, 253, 0.1);
		--glow-bg-end: rgba(27, 170, 253, 0.1);
		--glow-shadow-inner: rgba(27, 170, 253, 0.4);
		--glow-shadow-outer: rgba(27, 170, 253, 0.1);
		--glow-shadow-inner-hover: rgba(27, 170, 253, 0.6);
		--glow-shadow-outer-hover: rgba(27, 170, 253, 0.2);
		--glow-sweep-start: rgba(27, 170, 253, 0.1);
		--glow-sweep-end: rgba(27, 170, 253, 0.1);
	}

	/* Purple variant */
	.glow-button--purple {
		--glow-color: #A91BFD;
		--glow-color-hover: #D182FF;
		--glow-bg-start: rgba(169, 27, 253, 0.1);
		--glow-bg-end: rgba(169, 27, 253, 0.1);
		--glow-shadow-inner: rgba(169, 27, 253, 0.4);
		--glow-shadow-outer: rgba(169, 27, 253, 0.1);
		--glow-shadow-inner-hover: rgba(169, 27, 253, 0.6);
		--glow-shadow-outer-hover: rgba(169, 27, 253, 0.2);
		--glow-sweep-start: rgba(169, 27, 253, 0.1);
		--glow-sweep-end: rgba(169, 27, 253, 0.1);
	}

	/* Orange variant */
	.glow-button--orange {
		--glow-color: #FD9C1B;
		--glow-color-hover: #FFC982;
		--glow-bg-start: rgba(253, 156, 27, 0.1);
		--glow-bg-end: rgba(253, 156, 27, 0.1);
		--glow-shadow-inner: rgba(253, 156, 27, 0.4);
		--glow-shadow-outer: rgba(253, 156, 27, 0.1);
		--glow-shadow-inner-hover: rgba(253, 156, 27, 0.6);
		--glow-shadow-outer-hover: rgba(253, 156, 27, 0.2);
		--glow-sweep-start: rgba(253, 156, 27, 0.1);
		--glow-sweep-end: rgba(253, 156, 27, 0.1);
	}

	/* Red variant */
	.glow-button--red {
		--glow-color: #FD1B1B;
		--glow-color-hover: #FF8282;
		--glow-bg-start: rgba(253, 27, 27, 0.1);
		--glow-bg-end: rgba(253, 27, 27, 0.1);
		--glow-shadow-inner: rgba(253, 27, 27, 0.4);
		--glow-shadow-outer: rgba(253, 27, 27, 0.1);
		--glow-shadow-inner-hover: rgba(253, 27, 27, 0.6);
		--glow-shadow-outer-hover: rgba(253, 27, 27, 0.2);
		--glow-sweep-start: rgba(253, 27, 27, 0.1);
		--glow-sweep-end: rgba(253, 27, 27, 0.1);
	}

	/* Active/pressed state */
	.glow-button:active:not(:disabled) {
		transform: scale(0.98);
		box-shadow: inset 0 0 15px var(--glow-shadow-inner-hover), 0 0 5px 1px var(--glow-shadow-outer-hover);
	}

	/* Shape variants */
	.glow-button--round {
		border-radius: 50%;
		padding: 1em;
		min-width: 3em;
		min-height: 3em;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.glow-button--square {
		border-radius: 0;
		padding: 1em;
		min-width: 3em;
		min-height: 3em;
	}

	.glow-button--pill {
		border-radius: 2em;
		padding: 0.7em 2em;
	}

	.glow-button--rounded-square {
		border-radius: 0.2em;
		padding: 1em;
		min-width: 3em;
		min-height: 3em;
	}

	/* Size adjustments for round buttons */
	.glow-button--round.glow-button--small {
		padding: 0.8em;
		min-width: 2.5em;
		min-height: 2.5em;
	}

	.glow-button--round.glow-button--large {
		padding: 1.5em;
		min-width: 4em;
		min-height: 4em;
	}

	/* Size adjustments for square buttons */
	.glow-button--square.glow-button--small {
		padding: 0.8em;
		min-width: 2.5em;
		min-height: 2.5em;
	}

	.glow-button--square.glow-button--large {
		padding: 1.5em;
		min-width: 4em;
		min-height: 4em;
	}
</style>