<script lang="ts">
	interface Props {
		/**
		 * The content to display inside the button
		 */
		children?: import('svelte').Snippet;
		/**
		 * Icon to display (can be text, emoji, or icon name)
		 */
		icon?: string;
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
		variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'danger';
	}

	let {
		children,
		icon,
		onclick,
		disabled = false,
		class: className = '',
		size = 'medium',
		variant = 'primary'
	}: Props = $props();

	const sizeClasses = {
		small: 'button-3d--small',
		medium: 'button-3d--medium', 
		large: 'button-3d--large'
	};

	const variantClasses = {
		primary: 'button-3d--primary',
		secondary: 'button-3d--secondary',
		success: 'button-3d--success',
		warning: 'button-3d--warning',
		danger: 'button-3d--danger'
	};
</script>

<button
	class="button-3d {sizeClasses[size]} {variantClasses[variant]} {className}"
	{onclick}
	{disabled}
	type="button"
>
	<div class="button-top">
		{#if icon}
			<span class="button-icon">{icon}</span>
		{/if}
		{#if children}
			{@render children()}
		{/if}
	</div>
	<div class="button-bottom"></div>
	<div class="button-base"></div>
</button>

<style>
	.button-3d {
		-webkit-appearance: none;
		appearance: none;
		position: relative;
		border-width: 0;
		padding: 0;
		box-sizing: border-box;
		background: transparent;
		font: inherit;
		cursor: pointer;
		margin: 0;
		border-radius: 20px;
		transition: all 0.2s ease;
	}

	.button-3d:disabled {
		cursor: not-allowed;
		opacity: 0.6;
	}

	.button-3d:disabled .button-top {
		transform: translateY(2px) !important;
		background-image: linear-gradient(145deg, #666, #999) !important;
	}

	/* Size variants */
	.button-3d--small {
		min-width: 3em;
		min-height: 3em;
		border-radius: 15px;
	}

	.button-3d--medium {
		min-width: 4em;
		min-height: 4em;
		border-radius: 20px;
	}

	.button-3d--large {
		min-width: 5em;
		min-height: 5em;
		border-radius: 25px;
	}

	.button-top {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 0.5rem;
		position: relative;
		z-index: 2;
		padding: 8px 16px;
		transform: translateY(0);
		color: #fff;
		text-shadow: 0 -1px rgba(0, 0, 0, 0.25);
		border-radius: inherit;
		transition: transform 0.3s, border-radius 0.3s, background 0.3s;
		font-weight: 600;
		width: 100%;
		height: 100%;
		box-sizing: border-box;
	}

	.button-icon {
		font-size: 1.2em;
		line-height: 1;
	}

	/* Color variants */
	.button-3d--primary .button-top {
		background-image: linear-gradient(145deg, #6a11cb, #2575fc);
	}

	.button-3d--secondary .button-top {
		background-image: linear-gradient(145deg, #6c757d, #495057);
	}

	.button-3d--success .button-top {
		background-image: linear-gradient(145deg, #28a745, #20c997);
	}

	.button-3d--warning .button-top {
		background-image: linear-gradient(145deg, #ffc107, #fd7e14);
	}

	.button-3d--danger .button-top {
		background-image: linear-gradient(145deg, #dc3545, #e83e8c);
	}

	.button-3d:active:not(:disabled) .button-top {
		border-radius: 10px 10px 8px 8px / 8px;
		transform: translateY(2px);
	}

	/* Reverse gradients on active */
	.button-3d--primary:active:not(:disabled) .button-top {
		background-image: linear-gradient(145deg, #2575fc, #6a11cb);
	}

	.button-3d--secondary:active:not(:disabled) .button-top {
		background-image: linear-gradient(145deg, #495057, #6c757d);
	}

	.button-3d--success:active:not(:disabled) .button-top {
		background-image: linear-gradient(145deg, #20c997, #28a745);
	}

	.button-3d--warning:active:not(:disabled) .button-top {
		background-image: linear-gradient(145deg, #fd7e14, #ffc107);
	}

	.button-3d--danger:active:not(:disabled) .button-top {
		background-image: linear-gradient(145deg, #e83e8c, #dc3545);
	}

	.button-bottom {
		position: absolute;
		z-index: 1;
		bottom: 2px;
		left: 2px;
		border-radius: inherit;
		padding-top: 4px;
		width: calc(100% - 4px);
		height: calc(100% - 6px);
		box-shadow: 0px 2px 3px 0px rgba(0, 0, 0, 0.3);
		transition: border-radius 0.2s, padding-top 0.2s;
	}

	/* Color variants for bottom layer */
	.button-3d--primary .button-bottom {
		background-image: linear-gradient(145deg, #2575fc, #6a11cb);
	}

	.button-3d--secondary .button-bottom {
		background-image: linear-gradient(145deg, #495057, #6c757d);
	}

	.button-3d--success .button-bottom {
		background-image: linear-gradient(145deg, #20c997, #28a745);
	}

	.button-3d--warning .button-bottom {
		background-image: linear-gradient(145deg, #fd7e14, #ffc107);
	}

	.button-3d--danger .button-bottom {
		background-image: linear-gradient(145deg, #e83e8c, #dc3545);
	}

	.button-base {
		position: absolute;
		z-index: 0;
		top: 2px;
		left: 0;
		border-radius: inherit;
		width: 100%;
		height: calc(100% - 2px);
		background-color: rgba(0, 0, 0, 0.1);
		box-shadow: 0 1px 1px 0 rgba(255, 255, 255, 0.5),
			inset 0 1px 2px rgba(0, 0, 0, 0.15);
		transition: border-radius 0.2s, padding-top 0.2s;
	}

	.button-3d:active:not(:disabled) .button-bottom {
		border-radius: 10px 10px 8px 8px / 8px;
		padding-top: 0;
	}

	.button-3d:active:not(:disabled) .button-base {
		border-radius: 10px 10px 8px 8px / 8px;
	}

	/* Size-specific adjustments for small buttons */
	.button-3d--small .button-top {
		padding: 6px 12px;
	}

	.button-3d--small .button-bottom {
		bottom: 3px;
		left: 3px;
		width: calc(100% - 6px);
		height: calc(100% - 8px);
		padding-top: 4px;
	}

	.button-3d--small .button-base {
		top: 3px;
		height: calc(100% - 3px);
	}

	/* Size-specific adjustments for large buttons */
	.button-3d--large .button-top {
		padding: 12px 20px;
	}

	.button-3d--large .button-bottom {
		bottom: 5px;
		left: 5px;
		width: calc(100% - 10px);
		height: calc(100% - 12px);
		padding-top: 8px;
	}

	.button-3d--large .button-base {
		top: 5px;
		height: calc(100% - 5px);
	}

	/* Hover effects */
	.button-3d:hover:not(:disabled):not(:active) .button-top {
		transform: translateY(-1px);
	}

	.button-3d:hover:not(:disabled):not(:active) .button-bottom {
		padding-top: 8px;
	}

	.button-3d--small:hover:not(:disabled):not(:active) .button-bottom {
		padding-top: 6px;
	}

	.button-3d--large:hover:not(:disabled):not(:active) .button-bottom {
		padding-top: 10px;
	}
</style>