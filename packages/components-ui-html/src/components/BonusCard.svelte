<script lang="ts">
	import type { Snippet } from 'svelte';
	import bonusImg from '../../assets/2.png';

	type Props = {
		title: Snippet;
		description: Snippet;
		price: Snippet;
		button: Snippet;
	};

	const props: Props = $props();
</script>

<div class="bonus-card-wrap">
	<div class="card-image">
		<img src={bonusImg} alt="Bonus" />
	</div>
	<div class="info">
		{@render props.title()}
		{@render props.description()}
		{@render props.price()}
	</div>
	{@render props.button()}
</div>

<style lang="scss">
	.bonus-card-wrap {
		position: relative;
		padding: 1rem;
		flex-direction: column;
		display: flex;
		justify-content: space-between;
		align-items: center;

		border-radius: 12px;
		background: linear-gradient(
			180deg,
			rgba(30, 15, 5, 0.95) 0%,
			rgba(50, 25, 10, 0.9) 50%,
			rgba(30, 15, 5, 0.95) 100%
		);
		border: 3px solid #8B4513;
		box-shadow:
			0 0 20px rgba(139, 69, 19, 0.5),
			0 0 40px rgba(210, 105, 30, 0.2),
			inset 0 0 20px rgba(0, 0, 0, 0.5);
		text-align: center;
		min-width: 170px;
		max-width: 200px;
		gap: 0.75rem;
		transition: all 0.3s ease;
		overflow: hidden;
	}

	.bonus-card-wrap::before {
		content: '';
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		height: 4px;
		background: linear-gradient(90deg,
			transparent 0%,
			#D2691E 20%,
			#FFD700 50%,
			#D2691E 80%,
			transparent 100%
		);
		opacity: 0.8;
	}

	.bonus-card-wrap::after {
		content: '';
		position: absolute;
		bottom: 0;
		left: 0;
		right: 0;
		height: 4px;
		background: linear-gradient(90deg,
			transparent 0%,
			#8B0000 20%,
			#DC143C 50%,
			#8B0000 80%,
			transparent 100%
		);
		opacity: 0.8;
	}

	.bonus-card-wrap:hover {
		background: linear-gradient(
			180deg,
			rgba(50, 25, 10, 0.98) 0%,
			rgba(70, 35, 15, 0.95) 50%,
			rgba(50, 25, 10, 0.98) 100%
		);
		border-color: #CD853F;
		box-shadow:
			0 0 30px rgba(210, 105, 30, 0.6),
			0 0 60px rgba(255, 215, 0, 0.3),
			inset 0 0 25px rgba(0, 0, 0, 0.4);
		transform: translateY(-4px) scale(1.02);
	}

	.card-image {
		width: 100px;
		height: 100px;
		display: flex;
		align-items: center;
		justify-content: center;
		margin-bottom: 0.5rem;

		img {
			max-width: 100%;
			max-height: 100%;
			object-fit: contain;
			filter: drop-shadow(0 0 10px rgba(255, 215, 0, 0.4));
			transition: transform 0.3s ease;
		}
	}

	.bonus-card-wrap:hover .card-image img {
		transform: scale(1.1);
	}

	.info {
		display: flex;
		flex-direction: column;
		gap: 0.6em;
		z-index: 1;
	}
</style>
