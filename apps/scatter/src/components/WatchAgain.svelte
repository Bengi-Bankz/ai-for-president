<script lang="ts">
	import { isReplayMode, lastReplayGameId } from '../stores/replayState';

	function watchAgain() {
		// Reload the page to replay again
		window.location.reload();
	}
</script>

{#if $isReplayMode && $lastReplayGameId}
	<div class="watch-again-container">
		<button class="watch-again-button" onclick={watchAgain}>
			🎬 Watch Again
		</button>
	</div>
{/if}

<style>
	.watch-again-container {
		position: fixed;
		bottom: 40px;
		left: 50%;
		transform: translateX(-50%);
		z-index: 1000;
	}

	.watch-again-button {
		background: linear-gradient(135deg, #00ffcc 0%, #00ff88 100%);
		color: #000;
		border: none;
		padding: 16px 40px;
		border-radius: 12px;
		font-family: 'BungeeSpice-Regular', sans-serif;
		font-weight: 700;
		font-size: 1.1rem;
		cursor: pointer;
		transition: all 0.3s;
		box-shadow: 0 4px 20px rgba(0, 255, 200, 0.4);
	}

	.watch-again-button:hover {
		transform: scale(1.05);
		box-shadow: 0 6px 30px rgba(0, 255, 200, 0.8);
	}

	.watch-again-button:active {
		transform: scale(0.98);
	}

	@media (max-width: 700px) {
		.watch-again-button {
			padding: 12px 30px;
			font-size: 0.95rem;
		}
	}
</style>
