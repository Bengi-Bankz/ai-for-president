<script lang="ts">
	import { isReplayMode } from '../stores/replayState';
</script>

{#if $isReplayMode}
	<div class="replay-banner">
		<span class="replay-text">🔄 REPLAY MODE</span>
	</div>
{/if}

<style>
	.replay-banner {
		position: fixed;
		top: 20px;
		left: 50%;
		transform: translateX(-50%);
		background: linear-gradient(135deg, #00ff88 0%, #00ffcc 100%);
		color: #000;
		padding: 12px 32px;
		border-radius: 8px;
		font-family: 'BungeeSpice-Regular', sans-serif;
		font-weight: 700;
		font-size: 1.2rem;
		z-index: 1000;
		box-shadow: 0 4px 20px rgba(0, 255, 136, 0.4);
		animation: pulse 2s infinite;
	}

	.replay-text {
		display: flex;
		align-items: center;
		gap: 12px;
	}

	@keyframes pulse {
		0%, 100% {
			box-shadow: 0 4px 20px rgba(0, 255, 136, 0.4);
		}
		50% {
			box-shadow: 0 4px 30px rgba(0, 255, 136, 0.8);
		}
	}

	@media (max-width: 700px) {
		.replay-banner {
			top: 10px;
			padding: 8px 20px;
			font-size: 0.9rem;
		}
	}
</style>
