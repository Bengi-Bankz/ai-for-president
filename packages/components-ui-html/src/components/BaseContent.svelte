<script lang="ts">
	import type { Snippet } from 'svelte';

	type Props = {
		maxWidth: '100%' | '500px';
		children: Snippet;
	};

	const props: Props = $props();
</script>

<div class="ui-popup-standard-content-wrap" style="--maxWidth: {props.maxWidth}; --zIndex: {100}">
	{@render props.children()}
</div>

<style lang="scss">
	.ui-popup-standard-content-wrap {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		z-index: var(--zIndex);
		max-width: var(--maxWidth);
		gap: 1rem;
		
		/* Subtle glow background for enhanced appearance */
		padding: 1rem;
		border-radius: 15px;
		background: rgba(0, 0, 0, 0.2);
		border: 1px solid rgba(100, 149, 237, 0.2);
		box-shadow: 
			0 0 20px rgba(100, 149, 237, 0.1),
			inset 0 0 15px rgba(100, 149, 237, 0.05);
	}
</style>
