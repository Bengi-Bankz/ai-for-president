<script lang="ts">
	import { isReplayMode } from '../stores/replayState';

	interface Props {
		onPlayAgain?: () => void;
	}

	let { onPlayAgain }: Props = $props();

	function handlePlayAgain() {
		if (onPlayAgain) {
			onPlayAgain();
		} else {
			window.location.reload();
		}
	}
</script>

{#if $isReplayMode}
	<div class="replay-button-container">
		<button class="replay-button" onclick={handlePlayAgain} title="Play replay again">
			<div class="replay-icon">🎬</div>
			<span class="replay-label">Play Again</span>
		</button>
	</div>
{/if}

<style>
	.replay-button-container {
		position: fixed;
		bottom: 60px;
		right: 30px;
		z-index: 999;
	}

	.replay-button {
		background: linear-gradient(135deg, #ff6b35 0%, #f7931e 100%);
		border: 2px solid #fff;
		padding: 12px 24px;
		border-radius: 12px;
		display: flex;
		align-items: center;
		gap: 12px;
		cursor: pointer;
		transition: all 0.3s ease;
		box-shadow: 0 4px 15px rgba(255, 107, 53, 0.4);
		font-family: 'Crimes Times Six', sans-serif;
		font-weight: 700;
		font-size: 1rem;
		color: #fff;
	}

	.replay-button:hover {
		transform: scale(1.08);
		box-shadow: 0 6px 25px rgba(255, 107, 53, 0.6);
	}

	.replay-button:active {
		transform: scale(0.95);
	}

	.replay-icon {
		width: 32px;
		height: 32px;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 1.5rem;
	}

	.replay-label {
		font-size: 1rem;
		text-transform: uppercase;
		letter-spacing: 1px;
	}
</style>
