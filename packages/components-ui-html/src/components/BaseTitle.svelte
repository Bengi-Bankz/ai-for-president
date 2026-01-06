<script lang="ts">
	import type { Snippet } from 'svelte';

	type Props = {
		children: Snippet;
	};

	const props: Props = $props();
</script>

<div class="ui-modal-title-wrap">
	{@render props.children()}
</div>

<style lang="scss">
	.ui-modal-title-wrap {
		text-align: center;
		font-family: 'BungeeSpice-Regular', sans-serif;
		font-size: 1.8rem;
		font-weight: bold;
		text-shadow: 0 0 15px rgba(100, 149, 237, 0.8);
		margin-bottom: 0.5rem;
	}
</style>