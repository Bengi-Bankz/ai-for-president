<script lang="ts">
	import type { Snippet } from 'svelte';

	type Props = {
		title: Snippet;
		description: Snippet;
		price: Snippet;
		button: Snippet;
	};

	const props: Props = $props();
</script>

<div class="bonus-card-wrap">
	<div class="info">
		{@render props.title()}
		{@render props.description()}
		{@render props.price()}
	</div>
	{@render props.button()}
</div>

<style lang="scss">
	.bonus-card-wrap {
		padding: 0.5rem;
		flex-direction: column;
		display: flex;
		justify-content: space-between;

		border-radius: 10px;
		background: rgba(0, 0, 0, 0.7);
		border: 2px solid rgba(255, 165, 0, 0.3);
		box-shadow: 
			0 0 15px rgba(255, 165, 0, 0.2),
			inset 0 0 10px rgba(255, 165, 0, 0.1);
		text-align: left;
		min-width: 155px;
		max-width: 180px;
		gap: 0.5rem;
		transition: all 0.3s ease;
	}

	.bonus-card-wrap:hover {
		background: rgba(0, 0, 0, 0.8);
		border-color: rgba(255, 165, 0, 0.5);
		box-shadow: 
			0 0 25px rgba(255, 165, 0, 0.4),
			inset 0 0 15px rgba(255, 165, 0, 0.2);
		transform: translateY(-2px);
	}

	.info {
		display: flex;
		flex-direction: column;
		gap: 0.5em;
	}
</style>
